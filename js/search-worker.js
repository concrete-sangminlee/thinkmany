/**
 * Full-text search worker. Downloads every chapter once, splits it into
 * sections (h2/h3) and answers queries off the main thread. Scoring lives in
 * js/lib/search-core.js.
 */
import { analyzeChapter } from './lib/markdown.js';
import { makeSection, search } from './lib/search-core.js';

const sections = [];
let indexing = null;

async function buildIndex(chapters) {
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
  sections.sort((a, b) => a.order - b.order);
  postMessage({ type: 'ready', failed });
}

onmessage = (e) => {
  const msg = e.data;
  if (msg.type === 'index') {
    indexing ??= buildIndex(msg.chapters);
  } else if (msg.type === 'query') {
    postMessage({ type: 'results', seq: msg.seq, ...search(sections, msg.q) });
  }
};
