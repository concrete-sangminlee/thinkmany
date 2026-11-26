/**
 * Full-text search worker. Loads the book's sections once (content/search.json,
 * written by the build) and answers queries off the main thread. If that file
 * cannot be had, it falls back to downloading each chapter's markdown and
 * splitting it here. Scoring lives in js/lib/search-core.js.
 */
import { makeSection, search } from './lib/search-core.js';

const sections = [];
let indexing = null;

async function fromSearchData(url, chapters) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(String(r.status));
  const data = await r.json();
  const order = new Map(chapters.map((c) => [c.id, c.order]));
  let count = 0;
  for (const c of data.chapters) {
    if (!order.has(c.id)) continue; // a chapter the reader's book no longer has
    for (const [id, title, text] of c.sections) sections.push(makeSection(c.id, order.get(c.id), { id, title, text }));
    count++;
  }
  return chapters.length - count;
}

async function fromMarkdown(chapters) {
  const { analyzeChapter } = await import('./lib/markdown.js');
  let done = 0;
  let failed = 0;
  const queue = [...chapters];
  const worker = async () => {
    while (queue.length) {
      const c = queue.shift();
      try {
        const r = await fetch(c.url);
        if (!r.ok) throw new Error(String(r.status)); // never index an error page as a chapter
        for (const s of analyzeChapter(await r.text()).sections) sections.push(makeSection(c.id, c.order, s));
      } catch {
        failed++; // skip a chapter that failed to load; the dialog says so
      }
      done++;
      postMessage({ type: 'progress', done, total: chapters.length });
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  return failed;
}

async function buildIndex({ chapters, searchUrl }) {
  let failed;
  try {
    failed = await fromSearchData(searchUrl, chapters);
  } catch {
    sections.length = 0;
    failed = await fromMarkdown(chapters);
  }
  sections.sort((a, b) => a.order - b.order);
  postMessage({ type: 'ready', failed });
}

onmessage = (e) => {
  const msg = e.data;
  if (msg.type === 'index') {
    indexing ??= buildIndex(msg);
  } else if (msg.type === 'query') {
    postMessage({ type: 'results', seq: msg.seq, ...search(sections, msg.q) });
  }
};
