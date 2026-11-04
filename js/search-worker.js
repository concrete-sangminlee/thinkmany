/**
 * Full-text search worker. Downloads every chapter once, splits it into
 * sections (h2/h3) and answers queries off the main thread.
 */
import { analyzeChapter } from './lib/markdown.js';

const sections = []; // { ch, id, title, text, lower }
let indexing = null;

async function buildIndex(chapters) {
  let done = 0;
  const queue = [...chapters];
  const worker = async () => {
    while (queue.length) {
      const c = queue.shift();
      try {
        const md = await (await fetch(c.url)).text();
        for (const s of analyzeChapter(md).sections) {
          const lower = (s.title + '\n' + s.text).toLowerCase();
          sections.push({ ch: c.id, order: c.order, id: s.id, title: s.title, text: s.text, lower });
        }
      } catch {
        /* skip a chapter that failed to load */
      }
      done++;
      postMessage({ type: 'progress', done, total: chapters.length });
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  sections.sort((a, b) => a.order - b.order);
  postMessage({ type: 'ready' });
}

function snippet(text, terms) {
  const lower = text.toLowerCase();
  let at = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1 && (at === -1 || i < at)) at = i;
  }
  if (at === -1) return text.slice(0, 120);
  const start = Math.max(0, at - 50);
  const end = Math.min(text.length, at + 90);
  return (start > 0 ? '…' : '') + text.slice(start, end).replace(/\s+/g, ' ') + (end < text.length ? '…' : '');
}

function search(q, limit = 40) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return { total: 0, results: [] };
  const hits = [];
  for (const s of sections) {
    let score = 0;
    let ok = true;
    for (const t of terms) {
      const first = s.lower.indexOf(t);
      if (first === -1) {
        ok = false;
        break;
      }
      let count = 0;
      for (let i = first; i !== -1 && count < 20; i = s.lower.indexOf(t, i + t.length)) count++;
      score += count + (s.title.toLowerCase().includes(t) ? 15 : 0);
    }
    if (ok) hits.push({ s, score });
  }
  hits.sort((a, b) => b.score - a.score || a.s.order - b.s.order);
  return {
    total: hits.length,
    results: hits.slice(0, limit).map(({ s }) => ({ ch: s.ch, id: s.id, title: s.title, snippet: snippet(s.text, terms) })),
  };
}

onmessage = (e) => {
  const msg = e.data;
  if (msg.type === 'index') {
    indexing ??= buildIndex(msg.chapters);
  } else if (msg.type === 'query') {
    postMessage({ type: 'results', seq: msg.seq, ...search(msg.q) });
  }
};
