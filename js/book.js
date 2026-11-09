/**
 * Browser side of the book model: fetches config.json + index.json once and
 * caches chapter markdown for the session.
 */
import { createBook, applyToc } from './lib/book-model.js';

/** Site root, derived from where this module is served (…/js/book.js -> …/). */
export const ROOT = new URL('../', import.meta.url);

export async function loadBook() {
  const [config, index] = await Promise.all([
    fetchJSON(new URL('content/config.json', ROOT)),
    fetchJSON(new URL('content/index.json', ROOT)).catch(() => null),
  ]);
  const book = createBook(config, index);
  let tocLoad = null;
  /** Outlines of every chapter, for heading search. Fetched once, on demand. */
  book.ensureToc = () => (tocLoad ??= fetchJSON(new URL('content/toc.json', ROOT)).then((toc) => applyToc(book, toc)).catch(() => {}));
  return book;
}

const cache = new Map();

export function chapterUrl(ch) {
  return new URL(`content/${ch.file}`, ROOT).href;
}

/** Fetch a chapter's markdown once per session. */
export function fetchChapter(ch) {
  if (!cache.has(ch.id)) {
    const p = fetch(chapterUrl(ch)).then((r) => {
      if (!r.ok) throw new Error(`${r.status} ${ch.file}`);
      return r.text();
    });
    p.catch(() => cache.delete(ch.id));
    cache.set(ch.id, p);
  }
  return cache.get(ch.id);
}

async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}
