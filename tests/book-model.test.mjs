import test from 'node:test';
import assert from 'node:assert/strict';
import { createBook, applyToc } from '../js/lib/book-model.js';
import { setBase, homeHref, partHref, chapterHref, assetHref } from '../js/lib/paths.js';

const config = {
  siteUrl: 'https://example.test/book/',
  sections: [
    { id: 'part-1', title: '하나', color: 'blue', subsections: [{ id: 'ch01', file: 'ch01-a.md', title: '가' }, { id: 'ch05', file: 'ch05-b.md', title: '나' }] },
    { id: 'part-4', title: '넷', subsections: [{ id: 'ch02', file: 'ch02-c.md', title: '다' }] },
  ],
  paths: [{ title: '입문', desc: '', chapters: ['ch02', 'ch99', 'ch01'] }],
};
const index = {
  totals: { chapters: 3 },
  chapters: {
    ch01: { minutes: 10, updated: '2026-01-01T00:00:00+09:00', refs: ['ch02', 'ch99'] },
    ch05: { minutes: 20, updated: '2026-03-01T00:00:00+09:00', refs: ['ch02'] },
    ch02: { minutes: 30, refs: [] },
  },
};

test('book order follows config.json, not chapter numbers', () => {
  const book = createBook(config, index);
  assert.deepEqual(book.chapters.map((c) => c.id), ['ch01', 'ch05', 'ch02']);
  assert.equal(book.next(book.chapter('ch05')).id, 'ch02');
  assert.equal(book.prev(book.chapter('ch01')), null);
  assert.equal(book.chapter('ch05').num, '05');
  assert.equal(book.chapter('ch05').part.number, '01');
  assert.equal(book.parts[1].number, '02');
});

test('references become a two-way graph; unknown ids are dropped', () => {
  const book = createBook(config, index);
  assert.deepEqual(book.chapter('ch01').refs.map((c) => c.id), ['ch02']);
  assert.deepEqual(book.chapter('ch02').backrefs.map((c) => c.id), ['ch01', 'ch05']);
});

test('recent edits are newest first; reading paths skip missing chapters; old part ids still resolve', () => {
  const book = createBook(config, index);
  assert.deepEqual(book.recent.map((c) => c.id), ['ch05', 'ch01']);
  assert.deepEqual(book.paths[0].chapters.map((c) => c.id), ['ch02', 'ch01']);
  assert.equal(book.part('tools-software')?.id, 'part-4');
  assert.equal(book.part('nope'), null);
});

test('works without index.json, and outlines arrive later from toc.json', () => {
  const book = createBook(config, null);
  assert.equal(book.chapter('ch01').minutes, null);
  assert.deepEqual(book.chapter('ch01').toc, []);
  applyToc(book, { ch01: [[2, '시작', '시작']], ch02: [[3, '세부', '세부']] });
  assert.deepEqual(book.chapter('ch01').toc, [{ depth: 2, text: '시작', id: '시작' }]);
  applyToc(book, { ch01: [[2, '다른', '다른']] });
  assert.equal(book.chapter('ch01').toc[0].id, '시작', 'an outline already known is kept');
});

test('every URL is built from one base path', () => {
  setBase('/thinkmany');
  assert.equal(homeHref(), '/thinkmany/');
  assert.equal(partHref('part-2'), '/thinkmany/#part-2');
  assert.equal(chapterHref('ch05'), '/thinkmany/ch05/');
  assert.equal(chapterHref('ch05', '3-pass'), '/thinkmany/ch05/#3-pass');
  assert.equal(assetHref('feed.xml'), '/thinkmany/feed.xml');
  setBase('/');
  assert.equal(chapterHref('ch01'), '/ch01/');
});
