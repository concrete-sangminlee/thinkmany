import test from 'node:test';
import assert from 'node:assert/strict';

// A minimal in-memory localStorage, set up before store.js loads.
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  key: (i) => [...mem.keys()][i] ?? null,
  get length() {
    return mem.size;
  },
};
mem.set('tm:migrated', '1');
mem.set('tm:bookmarks', JSON.stringify(['ch10']));
mem.set('tm:progress', JSON.stringify({ ch02: { p: 0.7, at: 'old', done: false, t: 500 } }));

const store = await import('../js/lib/store.js');
const { pack, unpack } = await import('../js/lib/sync-codec.js');

const other = {
  app: 'thinkmany',
  v: 1,
  bookmarks: ['ch05', 'ch10', '../evil', 42],
  progress: {
    ch01: { p: 1, at: '', done: true, t: 1000 },
    ch02: { p: 0.4, at: 'newer', done: false, t: 2000 },
    'bad id': { p: 1, done: true, t: 1 },
  },
  checks: { ch03: [0, 2, -1, 'x'] },
  last: 'ch02',
};

test('a history link round-trips through compression', async () => {
  const text = await pack(other);
  assert.match(text, /^z[A-Za-z0-9_-]+$/);
  assert.deepEqual(await unpack(text), other);
});

test('importing merges without losing local history', () => {
  const after = store.importData(other);
  assert.deepEqual(after, { done: 1, reading: 1, bookmarks: 2, checks: 2 });
  assert.ok(store.isBookmarked('ch05') && store.isBookmarked('ch10'));
  assert.ok(!store.isBookmarked('../evil'));
  assert.equal(store.getProgress('ch02').p, 0.7, 'furthest point is kept');
  assert.equal(store.getProgress('ch02').at, 'newer', 'position comes from the side that read last');
  assert.equal(store.getProgress('ch01').done, true);
  assert.equal(store.getProgress('bad id'), null, 'invalid ids are ignored');
  assert.deepEqual([...store.getChecks('ch03')].sort(), [0, 2]);
});

test('importing is idempotent and rejects foreign data', () => {
  const before = JSON.stringify(store.exportData().progress);
  store.importData(other);
  assert.equal(JSON.stringify(store.exportData().progress), before);
  assert.throws(() => store.importData({ app: 'other', v: 1 }));
  assert.throws(() => store.importData(null));
});

test('a history link far bigger than any real history is refused, before and after inflating', async () => {
  const { MAX_PACKED, MAX_JSON } = await import('../js/lib/sync-codec.js');
  await assert.rejects(unpack('z' + 'A'.repeat(MAX_PACKED)), /너무 큰 기록/);
  // A small link that inflates past the limit (a run of spaces compresses a thousandfold).
  const bomb = await pack({ app: 'thinkmany', v: 1, pad: ' '.repeat(MAX_JSON + 10) });
  assert.ok(bomb.length < MAX_PACKED, `${bomb.length} chars`);
  await assert.rejects(unpack(bomb), /너무 큰 기록/);
});

test('import and its preview count only chapters this book has', () => {
  const isKnown = (id) => /^ch0[1-5]$/.test(id);
  const data = {
    app: 'thinkmany',
    v: 1,
    bookmarks: ['ch04', 'ch77'],
    progress: { ch04: { p: 1, done: true, t: 9 }, ch77: { p: 1, done: true, t: 9 }, ch05: { p: 0.5, done: 'yes', t: 9 } },
    checks: { ch04: [1, 2], ch77: [1] },
  };
  assert.deepEqual(store.summarize(data, { isKnown }), { done: 1, reading: 1, bookmarks: 1, checks: 2 });
  store.importData(data, { isKnown });
  assert.ok(store.isBookmarked('ch04') && !store.isBookmarked('ch77'));
  assert.equal(store.getProgress('ch77'), null);
  assert.equal(store.getProgress('ch05').done, false, 'only a real true marks done');
  assert.throws(() => store.importData({ ...data, v: 2 }), 'a newer format is not merged half-understood');
});
