/**
 * Small persistence layer over localStorage. Every access is guarded: private
 * windows and blocked storage must never break reading.
 */
const PREFIX = 'tm:';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable: keep working in memory */
  }
}

/* One-time migration from the pre-2026-11 keys. */
(function migrate() {
  try {
    if (localStorage.getItem(PREFIX + 'migrated')) return;
    const oldBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (Array.isArray(oldBookmarks) && oldBookmarks.length) write('bookmarks', oldBookmarks);
    // The old site always stored "light" by default, so only an explicit dark choice carries over.
    if (localStorage.getItem('theme') === 'dark') write('theme', 'dark');
    localStorage.removeItem('bookmarks');
    localStorage.removeItem('readProgress');
    localStorage.removeItem('theme');
    localStorage.setItem(PREFIX + 'migrated', '1');
  } catch {
    /* ignore */
  }
})();

/* ---------- theme ---------- */
export function getTheme() {
  const t = read('theme', null);
  return t === 'dark' || t === 'light' ? t : null;
}

export function setTheme(t) {
  write('theme', t);
}

/* ---------- reading size ---------- */
export const SIZES = ['sm', 'md', 'lg', 'xl'];

export function getSize() {
  const v = read('size', 'md');
  return SIZES.includes(v) ? v : 'md';
}

export function setSize(v) {
  write('size', SIZES.includes(v) ? v : 'md');
}

/* ---------- bookmarks ---------- */
let bookmarks = new Set(read('bookmarks', []));

export const isBookmarked = (id) => bookmarks.has(id);
export const bookmarkCount = () => bookmarks.size;

export function toggleBookmark(id) {
  if (bookmarks.has(id)) bookmarks.delete(id);
  else bookmarks.add(id);
  write('bookmarks', [...bookmarks]);
  return bookmarks.has(id);
}

/* ---------- reading progress ---------- */
// { [chapterId]: { p: 0..1 furthest point, at: heading id, done: bool, t: epoch ms } }
let progress = read('progress', {});

export const getProgress = (id) => progress[id] ?? null;
export const readCount = () => Object.values(progress).filter((p) => p.done).length;

export function saveProgress(id, { p, at }) {
  const prev = progress[id] ?? { p: 0, done: false };
  const next = {
    p: Math.max(prev.p, p),
    at: at ?? prev.at ?? '',
    done: prev.done || p >= 0.97,
    t: Date.now(),
  };
  progress = { ...progress, [id]: next };
  write('progress', progress);
  write('last', id);
  return next;
}

export function resetProgress(id) {
  const { [id]: _, ...rest } = progress;
  progress = rest;
  write('progress', progress);
}

export function lastChapter() {
  const id = read('last', null);
  return id && progress[id] ? id : null;
}

/* ---------- checklists inside chapters ---------- */
export const getChecks = (id) => new Set(read(`checks:${id}`, []));
export const setChecks = (id, set) => write(`checks:${id}`, [...set]);

/* ---------- moving reading history between devices ---------- */
const CHECKS = 'checks:';
const validId = (id) => typeof id === 'string' && /^[a-z0-9][a-z0-9-]{0,40}$/.test(id);

function allChecks() {
  const out = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(PREFIX + CHECKS)) {
        const id = k.slice(PREFIX.length + CHECKS.length);
        const list = read(CHECKS + id, []);
        if (list.length) out[id] = list;
      }
    }
  } catch {
    /* storage unavailable */
  }
  return out;
}

/** This device's reading history, as moved by a link or a file. */
export function exportData() {
  return { app: 'thinkmany', v: 1, exportedAt: new Date().toISOString(), bookmarks: [...bookmarks], progress, checks: allChecks(), last: read('last', null) };
}

export function summarize(data = exportData()) {
  const prog = Object.values(data.progress ?? {});
  return {
    done: prog.filter((p) => p?.done).length,
    reading: prog.filter((p) => p && !p.done && p.p > 0.02).length,
    bookmarks: (data.bookmarks ?? []).length,
    checks: Object.values(data.checks ?? {}).reduce((n, list) => n + (Array.isArray(list) ? list.length : 0), 0),
  };
}

/**
 * Merge another device's history into this one; nothing here is lost.
 * Bookmarks and checklist ticks are united, progress keeps the furthest point
 * read, and the "where I was" heading comes from whichever side read last.
 */
export function importData(data) {
  if (!data || data.app !== 'thinkmany' || data.v !== 1) throw new Error('읽기 기록이 아닙니다');

  for (const id of Array.isArray(data.bookmarks) ? data.bookmarks : []) if (validId(id)) bookmarks.add(id);
  write('bookmarks', [...bookmarks]);

  const merged = { ...progress };
  for (const [id, q] of Object.entries(data.progress ?? {})) {
    if (!validId(id) || !q || typeof q !== 'object') continue;
    const cur = merged[id];
    const t = Number.isFinite(q.t) ? q.t : 0;
    const theirs = !cur || t > (cur.t ?? 0);
    merged[id] = {
      p: Math.max(cur?.p ?? 0, Math.min(1, Math.max(0, Number(q.p) || 0))),
      at: (theirs ? String(q.at ?? '').slice(0, 120) : cur.at) || cur?.at || '',
      done: Boolean(cur?.done || q.done),
      t: Math.max(cur?.t ?? 0, t),
    };
  }
  progress = merged;
  write('progress', progress);

  for (const [id, list] of Object.entries(data.checks ?? {})) {
    if (!validId(id) || !Array.isArray(list)) continue;
    const set = getChecks(id);
    for (const i of list) if (Number.isInteger(i) && i >= 0 && i < 1000) set.add(i);
    setChecks(id, set);
  }
  if (!read('last', null) && validId(data.last)) write('last', data.last);
  return summarize();
}
