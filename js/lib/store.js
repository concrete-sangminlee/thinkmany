/**
 * Small persistence layer over localStorage. Every access is guarded: private
 * windows and blocked storage must never break reading.
 *
 * localStorage is the source of truth. Each change re-reads what is stored
 * before writing, so two open tabs add to each other's history instead of
 * overwriting it, and onExternalChange() hears about changes made in another
 * tab. Stored values are checked on the way in: a damaged or foreign value is
 * treated as empty, never thrown.
 */
const PREFIX = 'tm:';
const validId = (id) => typeof id === 'string' && /^[a-z0-9][a-z0-9-]{0,40}$/.test(id);
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

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
const cleanBookmarks = (v) => new Set(Array.isArray(v) ? v.filter(validId) : []);
let bookmarks = cleanBookmarks(read('bookmarks', []));

/** Pick up what another tab stored since we last looked (memory stays if storage is unavailable). */
function freshBookmarks() {
  const v = read('bookmarks', null);
  if (v !== null) bookmarks = cleanBookmarks(v);
  return bookmarks;
}

export const isBookmarked = (id) => bookmarks.has(id);
export const bookmarkCount = () => bookmarks.size;

export function toggleBookmark(id) {
  freshBookmarks();
  if (bookmarks.has(id)) bookmarks.delete(id);
  else bookmarks.add(id);
  write('bookmarks', [...bookmarks]);
  return bookmarks.has(id);
}

/* ---------- reading progress ---------- */
// { [chapterId]: { p: 0..1 furthest point, at: heading id, done: bool, t: epoch ms } }
function cleanProgress(v) {
  const out = {};
  if (!isObject(v)) return out;
  for (const [id, q] of Object.entries(v)) {
    if (!validId(id) || !isObject(q)) continue;
    out[id] = {
      p: Math.min(1, Math.max(0, Number(q.p) || 0)),
      at: typeof q.at === 'string' ? q.at.slice(0, 120) : '',
      done: q.done === true,
      t: Number.isFinite(q.t) ? q.t : 0,
    };
  }
  return out;
}
let progress = cleanProgress(read('progress', {}));

function freshProgress() {
  const v = read('progress', null);
  if (v !== null) progress = cleanProgress(v);
  return progress;
}

export const getProgress = (id) => progress[id] ?? null;
export const readCount = () => Object.values(progress).filter((p) => p.done).length;

export function saveProgress(id, { p, at }) {
  freshProgress();
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
  freshProgress();
  const { [id]: _, ...rest } = progress;
  progress = rest;
  write('progress', progress);
}

export function lastChapter() {
  const id = read('last', null);
  return validId(id) && progress[id] ? id : null;
}

/* ---------- checklists inside chapters ---------- */
const cleanChecks = (v) => new Set(Array.isArray(v) ? v.filter((i) => Number.isInteger(i) && i >= 0 && i < 1000) : []);
export const getChecks = (id) => cleanChecks(read(`checks:${id}`, []));
export const setChecks = (id, set) => write(`checks:${id}`, [...set]);

/* ---------- changes made in another tab ---------- */
const listeners = new Set();

/** Call fn when another tab changes bookmarks, progress or checklists. Returns an unsubscribe function. */
export function onExternalChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

if (typeof addEventListener === 'function') {
  addEventListener('storage', (e) => {
    if (e.key !== null && !e.key.startsWith(PREFIX)) return;
    freshBookmarks();
    freshProgress();
    for (const fn of listeners) fn(e.key === null ? null : e.key.slice(PREFIX.length));
  });
}

/* ---------- moving reading history between devices ---------- */
const CHECKS = 'checks:';

function allChecks() {
  const out = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(PREFIX + CHECKS)) {
        const id = k.slice(PREFIX.length + CHECKS.length);
        const list = [...getChecks(id)];
        if (validId(id) && list.length) out[id] = list;
      }
    }
  } catch {
    /* storage unavailable */
  }
  return out;
}

/** Whether `data` is a reading history this version understands. */
export const isHistory = (data) => isObject(data) && data.app === 'thinkmany' && data.v === 1;

/** This device's reading history, as moved by a link or a file. */
export function exportData() {
  return { app: 'thinkmany', v: 1, exportedAt: new Date().toISOString(), bookmarks: [...bookmarks], progress, checks: allChecks(), last: read('last', null) };
}

/**
 * Counts in a history: chapters done and in progress, bookmarks, ticks.
 * `isKnown(id)` limits it to chapters the book has (a history may name
 * chapters since removed, or come from somewhere else).
 */
export function summarize(data = exportData(), { isKnown = validId } = {}) {
  const known = (id) => validId(id) && isKnown(id);
  const prog = Object.entries(isObject(data.progress) ? data.progress : {}).filter(([id, p]) => known(id) && isObject(p)).map(([, p]) => p);
  return {
    done: prog.filter((p) => p.done === true).length,
    reading: prog.filter((p) => p.done !== true && Number(p.p) > 0.02).length,
    bookmarks: (Array.isArray(data.bookmarks) ? data.bookmarks : []).filter(known).length,
    checks: Object.entries(isObject(data.checks) ? data.checks : {})
      .filter(([id]) => known(id))
      .reduce((n, [, list]) => n + (Array.isArray(list) ? list.filter((i) => Number.isInteger(i) && i >= 0 && i < 1000).length : 0), 0),
  };
}

/**
 * Merge another device's history into this one; nothing here is lost.
 * Bookmarks and checklist ticks are united, progress keeps the furthest point
 * read, and the "where I was" heading comes from whichever side read last.
 */
export function importData(data, { isKnown = validId } = {}) {
  if (!isHistory(data)) throw new Error('읽기 기록이 아닙니다');
  const known = (id) => validId(id) && isKnown(id);

  freshBookmarks();
  for (const id of Array.isArray(data.bookmarks) ? data.bookmarks : []) if (known(id)) bookmarks.add(id);
  write('bookmarks', [...bookmarks]);

  const merged = { ...freshProgress() };
  for (const [id, q] of Object.entries(isObject(data.progress) ? data.progress : {})) {
    if (!known(id) || !isObject(q)) continue;
    const cur = merged[id];
    const t = Number.isFinite(q.t) ? q.t : 0;
    const theirs = !cur || t > (cur.t ?? 0);
    merged[id] = {
      p: Math.max(cur?.p ?? 0, Math.min(1, Math.max(0, Number(q.p) || 0))),
      at: (theirs ? String(q.at ?? '').slice(0, 120) : cur.at) || cur?.at || '',
      done: cur?.done === true || q.done === true,
      t: Math.max(cur?.t ?? 0, t),
    };
  }
  progress = merged;
  write('progress', progress);

  for (const [id, list] of Object.entries(isObject(data.checks) ? data.checks : {})) {
    if (!known(id) || !Array.isArray(list)) continue;
    const set = getChecks(id);
    for (const i of list) if (Number.isInteger(i) && i >= 0 && i < 1000) set.add(i);
    setChecks(id, set);
  }
  if (!read('last', null) && known(data.last)) write('last', data.last);
  return summarize(exportData(), { isKnown });
}
