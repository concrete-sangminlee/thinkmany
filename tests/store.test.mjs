import test from 'node:test';
import assert from 'node:assert/strict';

/** A localStorage stand-in; `broken` makes every call throw, as in a locked-down browser. */
function storage(entries = {}, { broken = false } = {}) {
  const mem = new Map(Object.entries(entries));
  const guard = (fn) => (...a) => {
    if (broken) throw new Error('SecurityError');
    return fn(...a);
  };
  return {
    mem,
    getItem: guard((k) => (mem.has(k) ? mem.get(k) : null)),
    setItem: guard((k, v) => mem.set(k, String(v))),
    removeItem: guard((k) => mem.delete(k)),
    key: guard((i) => [...mem.keys()][i] ?? null),
    get length() {
      return mem.size;
    },
  };
}

// store.js listens for 'storage' events on the global object, as in a browser.
const events = new EventTarget();
globalThis.addEventListener = events.addEventListener.bind(events);

let instance = 0;
/** A fresh copy of store.js, as a new tab would load it, over `ls`. */
async function load(ls) {
  globalThis.localStorage = ls;
  return import(`../js/lib/store.js?tab=${++instance}`);
}

test('damaged or foreign stored values read as empty instead of breaking the page', async () => {
  const ls = storage({
    'tm:migrated': '1',
    'tm:bookmarks': '5',
    'tm:progress': '["x"]',
    'tm:last': '{"a":1}',
    'tm:checks:ch01': '"oops"',
    'tm:size': 'not json',
  });
  const store = await load(ls);
  assert.equal(store.bookmarkCount(), 0);
  assert.equal(store.readCount(), 0);
  assert.equal(store.lastChapter(), null);
  assert.deepEqual([...store.getChecks('ch01')], []);
  assert.equal(store.getSize(), 'md');
  assert.deepEqual(store.summarize(), { done: 0, reading: 0, bookmarks: 0, checks: 0 });

  const odd = await load(storage({ 'tm:migrated': '1', 'tm:progress': JSON.stringify({ ch01: { p: 'lots', done: 'yes' }, '../x': { p: 1 }, ch02: null }) }));
  assert.deepEqual(odd.getProgress('ch01'), { p: 0, at: '', done: false, t: 0 }, 'only a real true marks a chapter done');
  assert.equal(odd.getProgress('../x'), null);
  assert.equal(odd.getProgress('ch02'), null);
});

test('two tabs add to each other\'s history instead of overwriting it', async () => {
  const ls = storage({ 'tm:migrated': '1' });
  const a = await load(ls);
  const b = await load(ls);
  a.saveProgress('ch01', { p: 0.5, at: 'x' });
  b.saveProgress('ch02', { p: 0.3, at: 'y' });
  a.toggleBookmark('ch05');
  b.toggleBookmark('ch06');
  a.saveProgress('ch01', { p: 0.6, at: 'z' });
  const stored = JSON.parse(ls.mem.get('tm:progress'));
  assert.deepEqual(Object.keys(stored).sort(), ['ch01', 'ch02']);
  assert.equal(stored.ch01.p, 0.6);
  assert.deepEqual(JSON.parse(ls.mem.get('tm:bookmarks')).sort(), ['ch05', 'ch06']);
});

test('another tab\'s change is picked up and reported', async () => {
  const ls = storage({ 'tm:migrated': '1' });
  const a = await load(ls);
  const seen = [];
  const off = a.onExternalChange((key) => seen.push(key));
  ls.mem.set('tm:bookmarks', JSON.stringify(['ch09']));
  ls.mem.set('tm:progress', JSON.stringify({ ch09: { p: 1, done: true, at: '', t: 1 } }));
  events.dispatchEvent(Object.assign(new Event('storage'), { key: 'tm:progress' }));
  events.dispatchEvent(Object.assign(new Event('storage'), { key: 'other-app' }));
  off();
  events.dispatchEvent(Object.assign(new Event('storage'), { key: 'tm:bookmarks' }));
  assert.deepEqual(seen, ['progress'], 'one report for our key, none for other keys or after unsubscribing');
  assert.ok(a.isBookmarked('ch09'));
  assert.equal(a.readCount(), 1);
});

test('without usable storage, reading still works in memory', async () => {
  const store = await load(storage({}, { broken: true }));
  assert.equal(store.toggleBookmark('ch03'), true);
  assert.ok(store.isBookmarked('ch03'));
  const p = store.saveProgress('ch03', { p: 0.98, at: 'end' });
  assert.equal(p.done, true);
  assert.equal(store.readCount(), 1);
  assert.equal(store.lastChapter(), null, 'nothing remembered across loads, and no error');
});

test('progress keeps the furthest point and marks a chapter done near its end', async () => {
  const store = await load(storage({ 'tm:migrated': '1' }));
  store.saveProgress('ch04', { p: 0.5, at: 'a' });
  const back = store.saveProgress('ch04', { p: 0.2, at: 'b' });
  assert.equal(back.p, 0.5, 'scrolling back up does not lose the furthest point');
  assert.equal(back.at, 'b', 'but "where I was" follows the reader');
  assert.equal(store.saveProgress('ch04', { p: 0.97 }).done, true);
  assert.equal(store.lastChapter(), 'ch04');
  store.resetProgress('ch04');
  assert.equal(store.getProgress('ch04'), null);
});
