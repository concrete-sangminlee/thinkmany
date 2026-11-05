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
