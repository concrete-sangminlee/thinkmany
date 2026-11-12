import test from 'node:test';
import assert from 'node:assert/strict';
import { createBook } from '../js/lib/book-model.js';
import { homeView, readingStats, NO_STATE } from '../js/views.js';

const book = createBook(
  {
    sections: [
      { id: 'part-1', title: '하나', subsections: [{ id: 'ch01', file: 'ch01-a.md', title: '가' }, { id: 'ch02', file: 'ch02-b.md', title: '나' }] },
      { id: 'part-2', title: '둘', subsections: [{ id: 'ch03', file: 'ch03-c.md', title: '다' }] },
    ],
  },
  { totals: { sections: 9, minutes: 300 }, chapters: { ch01: { minutes: 100 }, ch02: { minutes: 100 }, ch03: { minutes: 100 } } },
);

const stateOf = (progress, bookmarks = []) => ({
  ...NO_STATE,
  progress: (id) => progress[id] ?? null,
  isBookmarked: (id) => bookmarks.includes(id),
  bookmarkCount: () => bookmarks.length,
});

test('readingStats: none without history, else done, in progress and time left', () => {
  assert.equal(readingStats(book, NO_STATE), null);
  assert.equal(readingStats(book, stateOf({ ch01: { p: 0.01, done: false } })), null, 'a glance is not reading');
  assert.deepEqual(readingStats(book, stateOf({ ch01: { p: 1, done: true }, ch02: { p: 0.25, done: false } })), {
    done: 1,
    reading: 1,
    total: 3,
    minutesLeft: 175, // 75 of ch02 + all of ch03
    share: 1 / 3,
  });
});

test('home page: the book for a newcomer, their own numbers for a returning reader', () => {
  const fresh = String(homeView(book));
  assert.match(fresh, /<dt>섹션<\/dt><dd>9<\/dd>/);
  assert.ok(!fresh.includes('읽은 장') && !fresh.includes('part-done'));

  const back = String(homeView(book, { state: stateOf({ ch01: { p: 1, done: true }, ch02: { p: 0.25, done: false } }, ['ch03']) }));
  assert.match(back, /<dl class="hero-stats" data-reader style="--p:0\.3333">/);
  assert.match(back, /<dt>읽은 장<\/dt><dd>1<small>\/ 3<\/small><\/dd>/);
  assert.match(back, /<dt>읽는 중<\/dt><dd>1<\/dd>/);
  assert.match(back, /<dt>북마크<\/dt><dd>1<\/dd>/);
  assert.match(back, /<dt>남은 분량<\/dt><dd>약 3<small>시간<\/small><\/dd>/);
  assert.match(back, /Part 01<span class="part-done">1\/2 읽음<\/span>/);
  assert.ok(!/Part 02<span class="part-done">/.test(back), 'nothing finished in part 2');
  assert.ok(!/<dl[^>]*>\s*<span/.test(back), 'a dl holds only its groups');

  const all = String(homeView(book, { state: stateOf({ ch01: { p: 1, done: true }, ch02: { p: 1, done: true }, ch03: { p: 1, done: true } }) }));
  assert.match(all, /<dt>남은 분량<\/dt><dd>완독<\/dd>/);
});
