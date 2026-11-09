/**
 * 연구 많이 된다: reader app.
 *
 * Every page is prerendered by scripts/build.mjs; this script hydrates it and
 * then navigates in place with the History API.
 *
 *   /thinkmany/                 home (#part-2 scrolls to a part)
 *   /thinkmany/ch05/            chapter
 *   /thinkmany/ch05/#섹션        chapter, scrolled to a heading
 *   /thinkmany/#ch05, #ch05/섹션 old links, redirected to the paths above
 */
import { ROOT, loadBook, fetchChapter } from './book.js';
import { enhance, highlightTerms, clearHighlights } from './enhance.js';
import { initSearch } from './search.js';
import { initSync } from './sync.js';
import { mount, icon, html } from './lib/html.js';
import { setBase, getBase, chapterHref, partHref } from './lib/paths.js';
import { sidebarView, homeView, chapterView, chapterHead, missingView } from './views.js';
import * as store from './lib/store.js';

setBase(ROOT.pathname);

const $ = (sel, root = document) => root.querySelector(sel);
const view = $('#view');

// Make a prerendered chapter interactive right away (tabs, code copy, math,
// checklists) instead of waiting for the book index to arrive.
if (view.dataset.prerendered && view.dataset.prerendered !== 'home' && $('#prose')) {
  enhance($('#prose'), view.dataset.prerendered);
}
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const desktop = matchMedia('(min-width: 1024px)');

const readerState = {
  isBookmarked: store.isBookmarked,
  progress: store.getProgress,
  readCount: store.readCount,
  bookmarkCount: store.bookmarkCount,
};

let book;
let search;
let sync;
let current = { kind: null };
let pendingTerms = [];
let searchWanted = false;
let sidebarFilter = 'all';

/* ================================================================== */
/* Theme and text size                                                */
/* ================================================================== */

function effectiveTheme() {
  return document.documentElement.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function initTheme() {
  const btn = $('#theme-btn');
  const label = () => {
    const text = effectiveTheme() === 'dark' ? '밝은 테마로 전환' : '어두운 테마로 전환';
    btn.setAttribute('aria-label', text);
    btn.title = `${text} (D)`;
  };
  btn.addEventListener('click', () => {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.setTheme(next);
    label();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', label);
  label();
}

function applySize(size) {
  if (size === 'md') delete document.documentElement.dataset.size;
  else document.documentElement.dataset.size = size;
  for (const b of document.querySelectorAll('#display-menu [data-size]')) b.setAttribute('aria-pressed', String(b.dataset.size === size));
}

function setSize(size) {
  store.setSize(size);
  applySize(size);
  toast(`글자 크기: ${{ sm: '작게', md: '보통', lg: '크게', xl: '아주 크게' }[size]}`);
}

function stepSize(dir) {
  const i = store.SIZES.indexOf(store.getSize());
  const next = store.SIZES[Math.min(store.SIZES.length - 1, Math.max(0, i + dir))];
  if (next !== store.SIZES[i]) setSize(next);
}

function initDisplayMenu() {
  const btn = $('#display-btn');
  const menu = $('#display-menu');
  const open = (on) => {
    menu.hidden = !on;
    btn.setAttribute('aria-expanded', String(on));
    if (on) sync?.refresh();
    if (on) menu.querySelector('[aria-pressed="true"]')?.focus();
  };
  btn.addEventListener('click', () => open(menu.hidden));
  menu.addEventListener('click', (e) => {
    const b = e.target.closest('[data-size]');
    if (b) setSize(b.dataset.size);
  });
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !e.target.closest('.popover-anchor')) open(false);
  });
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      open(false);
      btn.focus();
    }
  });
  applySize(store.getSize());
}

/* ================================================================== */
/* Chrome: sidebar, shortcuts, scroll                                 */
/* ================================================================== */

function initChrome() {
  $('#menu-btn').addEventListener('click', () => toggleSidebar());
  $('#scrim').addEventListener('click', () => toggleSidebar(false));
  $('#to-top').addEventListener('click', () => scrollTo({ top: 0, behavior: smooth() }));
  desktop.addEventListener('change', resetSidebar);
  resetSidebar();

  const help = $('#help-dialog');
  help.querySelector('[data-close]').addEventListener('click', () => help.close());
  help.addEventListener('click', (e) => e.target === help && help.close());
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-help]')) help.showModal();
  });

  document.addEventListener('keydown', onKey);
  let ticking = false;
  addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        onScroll();
      });
    },
    { passive: true },
  );
  addEventListener('resize', onScroll, { passive: true });
  document.addEventListener('visibilitychange', () => document.hidden && persistProgress());
  addEventListener('pagehide', persistProgress);
}

function smooth() {
  return reduceMotion.matches ? 'auto' : 'smooth';
}

function resetSidebar() {
  document.body.classList.remove('nav-open');
  $('#scrim').hidden = true;
  $('#main').inert = false;
  $('#menu-btn').setAttribute('aria-expanded', String(desktop.matches && !document.body.classList.contains('sidebar-collapsed')));
}

function toggleSidebar(force) {
  const body = document.body;
  if (desktop.matches) {
    const collapsed = typeof force === 'boolean' ? !force : !body.classList.contains('sidebar-collapsed');
    body.classList.toggle('sidebar-collapsed', collapsed);
    $('#menu-btn').setAttribute('aria-expanded', String(!collapsed));
    return;
  }
  const open = typeof force === 'boolean' ? force : !body.classList.contains('nav-open');
  body.classList.toggle('nav-open', open);
  $('#menu-btn').setAttribute('aria-expanded', String(open));
  $('#scrim').hidden = !open;
  $('#main').inert = open;
  if (open) {
    ($('#sidebar .toc-link[aria-current="page"]') ?? $('#sidebar a'))?.focus({ preventScroll: true });
    revealInSidebar();
  }
}

/** Open search now, or as soon as the book has loaded (keys work before that). */
function openSearch() {
  if (search) search.open();
  else searchWanted = true;
}

function onKey(e) {
  if (e.isComposing || e.defaultPrevented) return;
  const typing = e.target.closest?.('input, textarea, select, [contenteditable="true"]');

  if ((e.metaKey || e.ctrlKey) && e.code === 'KeyK') {
    e.preventDefault();
    openSearch();
    return;
  }
  if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
    toggleSidebar(false);
    $('#menu-btn').focus();
    return;
  }
  if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
  if (document.querySelector('dialog[open]')) return;

  const ch = current.kind === 'chapter' ? current.ch : null;
  const go = (target) => target && navigate(chapterHref(target.id));
  const actions = {
    Slash: () => (e.shiftKey ? $('#help-dialog').showModal() : openSearch()),
    KeyJ: () => ch && jumpSection(1),
    KeyK: () => ch && jumpSection(-1),
    BracketRight: () => ch && go(book.next(ch)),
    BracketLeft: () => ch && go(book.prev(ch)),
    Equal: () => stepSize(1),
    NumpadAdd: () => stepSize(1),
    Minus: () => stepSize(-1),
    NumpadSubtract: () => stepSize(-1),
    KeyT: () => toggleSidebar(),
    KeyD: () => $('#theme-btn').click(),
    KeyB: () => ch && $('[data-action="bookmark"]')?.click(),
  };
  const act = actions[e.code];
  if (act) {
    e.preventDefault();
    act();
  }
}

function jumpSection(dir) {
  const hs = [...document.querySelectorAll('#prose h2[id]')];
  const y = topOffset() + 4;
  let i = hs.findIndex((h) => h.getBoundingClientRect().top > y);
  if (i === -1) i = hs.length;
  const target = dir > 0 ? hs[i] : hs[Math.max(0, i - 2)];
  target?.scrollIntoView({ behavior: smooth(), block: 'start' });
}

/**
 * Scroll to an element (or a y offset) and keep it there while late layout
 * settles (web fonts, KaTeX, images), until the reader scrolls on their own.
 */
let unpin = null;
function pin(target, block = 'start') {
  unpin?.();
  if (target == null) return;
  const go = () => (typeof target === 'number' ? scrollTo(0, target) : target.isConnected && target.scrollIntoView({ block }));
  go();
  let moved = false;
  const stop = () => (moved = true);
  const events = ['wheel', 'touchstart', 'keydown', 'mousedown'];
  for (const e of events) addEventListener(e, stop, { passive: true });
  const ro = new ResizeObserver(() => !moved && go());
  ro.observe(view);
  const timer = setTimeout(() => unpin?.(), 3000);
  unpin = () => {
    ro.disconnect();
    clearTimeout(timer);
    for (const e of events) removeEventListener(e, stop);
    unpin = null;
  };
}

function topOffset() {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--topbar-h')) + 16 || 72;
}

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('is-visible');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('is-visible'), 2000);
}

/* ================================================================== */
/* Sidebar                                                            */
/* ================================================================== */

function renderSidebar() {
  const nav = $('#book-toc');
  const currentId = current.kind === 'chapter' ? current.ch.id : null;
  mount(nav, sidebarView(book, { state: readerState, filter: sidebarFilter, currentId }));
  revealInSidebar();
}

function initSidebar() {
  const nav = $('#book-toc');
  nav.addEventListener('click', (e) => {
    const f = e.target.closest('[data-filter]');
    if (f) {
      sidebarFilter = f.dataset.filter;
      renderSidebar();
    } else if (e.target.closest('a') && !desktop.matches) {
      toggleSidebar(false);
    }
  });
}

function markSidebar() {
  const id = current.kind === 'chapter' ? current.ch.id : null;
  for (const a of document.querySelectorAll('#book-toc .toc-link')) {
    if (a.dataset.id === id) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  revealInSidebar();
}

function revealInSidebar() {
  const sb = $('#sidebar');
  const a = sb.querySelector('.toc-link[aria-current="page"]');
  if (!a) return;
  if (a.offsetTop < sb.scrollTop + 80 || a.offsetTop > sb.scrollTop + sb.clientHeight - 80) {
    sb.scrollTop = Math.max(0, a.offsetTop - sb.clientHeight / 3);
  }
}

/* ================================================================== */
/* Router                                                             */
/* ================================================================== */

/** What a URL points at, or 'external' for anything the reader doesn't own. */
function parse(url) {
  const base = getBase();
  const path = decodeURIComponent(url.pathname);
  if (!path.startsWith(base)) return { kind: 'external' };
  const rest = path.slice(base.length).replace(/(^|\/)index\.html$/, '').replace(/\/$/, '');
  const hash = decodeURIComponent(url.hash.slice(1));

  if (rest === '' || rest === 'app.html') {
    if (!hash) return { kind: 'home' };
    const [head, ...tail] = hash.replace(/^\//, '').split('/');
    const legacy = book.chapter(head);
    if (legacy) return { kind: 'redirect', to: chapterHref(legacy.id, tail.join('/')) };
    const part = book.part(head);
    if (part) return part.id === head ? { kind: 'home', part } : { kind: 'redirect', to: partHref(part.id) };
    return { kind: 'home' };
  }
  if (rest.includes('/')) return { kind: 'external' };
  const ch = book.chapter(rest);
  if (ch) return { kind: 'chapter', ch, anchor: hash };
  return /^[a-z0-9-]+$/.test(rest) ? { kind: 'missing', id: rest } : { kind: 'external' };
}

function rememberScroll() {
  history.replaceState({ ...(history.state ?? {}), y: scrollY }, '');
}

function navigate(href, { terms = [], replace = false } = {}) {
  if (!replace) rememberScroll();
  pendingTerms = terms;
  history[replace ? 'replaceState' : 'pushState']({}, '', href);
  route();
}

function interceptLinks() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.classList.contains('skip-link') || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    const r = parse(url);
    if (r.kind === 'external' || r.kind === 'missing') return;
    e.preventDefault();
    if (url.href === location.href && r.kind === 'chapter' && r.anchor) {
      scrollToAnchor(r.anchor, true);
      return;
    }
    navigate(url.href);
  });
}

async function route({ initial = false, pop = false } = {}) {
  unpin?.();
  const next = parse(location);
  if (next.kind === 'redirect') {
    history.replaceState(history.state, '', next.to);
    return route({ initial, pop });
  }
  if (next.kind === 'external') {
    // Only reachable on first load (e.g. the offline shell at an odd path); never reload in a loop.
    if (initial) showMissing(decodeURIComponent(location.pathname));
    else location.reload();
    return;
  }

  persistProgress();
  if (!desktop.matches) toggleSidebar(false);
  const y = pop ? history.state?.y : undefined;
  const terms = pendingTerms;
  pendingTerms = [];

  if (!initial && next.kind === 'chapter' && current.kind === 'chapter' && current.ch === next.ch) {
    if (y != null) pin(y);
    else scrollToAnchor(next.anchor, true, terms);
    return;
  }
  if (!initial && next.kind === 'home' && current.kind === 'home') {
    if (next.part) document.getElementById(next.part.id)?.scrollIntoView({ block: 'start', behavior: smooth() });
    else pin(y ?? 0);
    return;
  }

  const hydrate = initial && view.dataset.prerendered === (next.kind === 'chapter' ? next.ch.id : next.kind);
  view.dataset.prerendered = '';
  if (next.kind === 'chapter') await showChapter(next.ch, { anchor: next.anchor, terms, y, hydrate });
  else if (next.kind === 'home') showHome({ part: next.part, y, hydrate });
  else showMissing(next.id);
}

/* ================================================================== */
/* Home                                                               */
/* ================================================================== */

function showHome({ part, y, hydrate }) {
  current = { kind: 'home' };
  document.title = '연구 많이 된다 · 대학원생 연구 가이드';
  document.body.dataset.view = 'home';

  let resume = store.lastChapter() ? book.chapter(store.lastChapter()) : null;
  if (resume && store.getProgress(resume.id)?.done) resume = book.next(resume);

  mount(view, homeView(book, { state: readerState, resume }));
  view.querySelector('[data-action="search"]').addEventListener('click', openSearch);
  markSidebar();

  if (part) pin(document.getElementById(part.id));
  else if (y != null) pin(y);
  else if (!hydrate) scrollTo(0, 0);
  onScroll();
}

function showMissing(id) {
  current = { kind: 'missing' };
  document.body.dataset.view = 'missing';
  document.title = '찾을 수 없음 · 연구 많이 된다';
  mount(view, missingView(id));
  view.querySelector('[data-action="search"]').addEventListener('click', openSearch);
  markSidebar();
  scrollTo(0, 0);
}

/* ================================================================== */
/* Chapter                                                            */
/* ================================================================== */

let renderToken = 0;

async function showChapter(ch, { anchor = '', terms = [], y, hydrate = false }) {
  const token = ++renderToken;
  current = { kind: 'chapter', ch, headings: [], saved: 0 };
  leftText = '';
  document.body.dataset.view = 'chapter';
  document.title = `${ch.title} · 연구 많이 된다`;
  markSidebar();

  const prose = hydrate ? $('#prose') : null;
  if (prose) {
    // The page arrived prerendered: keep its prose, refresh the header with reader state.
    if (!ch.toc.length) ch.toc = tocFromDom(prose);
    refreshChapterHead(ch);
  } else {
    mount(view, chapterView(book, ch, { state: readerState }));
    if (y == null) scrollTo(0, 0);
    let md;
    let renderMarkdown;
    try {
      // The markdown and the renderer (parser + sanitizer) download in parallel.
      [md, { renderMarkdown }] = await Promise.all([fetchChapter(ch), import('./render.js')]);
    } catch {
      if (token !== renderToken) return;
      const why = navigator.onLine ? '네트워크 상태를 확인한 뒤 다시 시도해 주세요.' : '오프라인에서는 한 번 열어 본 장만 읽을 수 있습니다.';
      mount($('#prose'), html`<div class="state-message"><h2>이 장을 불러오지 못했습니다</h2><p>${why}</p><p><button class="btn btn-ghost" type="button" data-retry>다시 시도</button></p></div>`);
      $('[data-retry]').addEventListener('click', () => showChapter(ch, { anchor, terms }));
      return;
    }
    if (token !== renderToken) return;

    const { html: body, lead: rawLead, headings } = renderMarkdown(md, { titles: book.titles, current: ch.id });
    const lead = rawLead && rawLead !== ch.title ? rawLead : '';
    const ids = (list) => list.map((h) => h.id).join('\n');
    if (lead !== ch.lead || ids(headings) !== ids(ch.toc)) {
      // index.json is stale (e.g. right after an edit in /admin): trust the chapter itself.
      ch.lead = lead;
      ch.toc = headings;
      mount(view, chapterView(book, ch, { state: readerState }));
    }
    const el = $('#prose');
    el.innerHTML = body;
    el.removeAttribute('aria-busy');
  }

  const el = $('#prose');
  enhance(el, ch.id);
  current.headings = [...el.querySelectorAll('h2[id], h3[id]')];
  wireChapter(ch);

  if (y != null) pin(y);
  else if (anchor || terms.length) scrollToAnchor(anchor, false, terms);
  else showResume(ch);

  if (!hydrate) $('.chapter-title').focus({ preventScroll: true });
  onScroll();
}

/** A chapter's outline read from its rendered headings (when toc.json is not loaded). */
function tocFromDom(prose) {
  return [...prose.querySelectorAll('h2[id], h3[id]')].map((h) => ({ depth: Number(h.tagName[1]), text: h.textContent.trim(), id: h.id }));
}

function refreshChapterHead(ch) {
  $('.chapter-head').outerHTML = String(chapterHead(book, ch, { state: readerState }));
}

/** After importing history from another device, redraw everything that shows it. */
function refreshReaderState() {
  renderSidebar();
  if (current.kind === 'home') showHome({ hydrate: true });
  else if (current.kind === 'chapter') {
    refreshChapterHead(current.ch);
    wireChapter(current.ch);
    showResume(current.ch);
  }
}

function wireChapter(ch) {
  const bm = view.querySelector('[data-action="bookmark"]');
  bm.addEventListener('click', () => {
    const on = store.toggleBookmark(ch.id);
    bm.classList.toggle('is-on', on);
    bm.setAttribute('aria-pressed', String(on));
    toast(on ? '북마크에 추가했습니다' : '북마크에서 뺐습니다');
    renderSidebar();
  });
  view.querySelector('[data-action="copy-link"]').addEventListener('click', async () => {
    const url = new URL(chapterHref(ch.id), location.origin).href;
    try {
      await navigator.clipboard.writeText(url);
      toast('링크를 복사했습니다');
    } catch {
      toast(url);
    }
  });
  view.querySelector('[data-action="print"]').addEventListener('click', () => print());
  view.querySelector('.toc-inline')?.addEventListener('click', (e) => {
    if (e.target.closest('a')) e.currentTarget.open = false;
  });
}

function scrollToAnchor(anchor, animate, terms = []) {
  const prose = $('#prose');
  if (!prose) return;
  clearHighlights(prose);
  const heading = anchor ? prose.querySelector(`#${CSS.escape(anchor)}`) : null;
  const target = terms.length ? (highlightTerms(prose, heading, terms) ?? heading) : heading;
  if (!target) {
    if (anchor) toast('해당 섹션을 찾지 못해 장의 처음으로 이동했습니다');
    scrollTo({ top: 0 });
    return;
  }
  const block = target === heading ? 'start' : 'center';
  if (animate) target.scrollIntoView({ block, behavior: smooth() });
  else pin(target, block);
}

function showResume(ch) {
  const pr = store.getProgress(ch.id);
  const box = $('#resume');
  if (!box || !pr || pr.done || pr.p < 0.04 || !pr.at) return;
  const h = $('#prose').querySelector(`#${CSS.escape(pr.at)}`);
  if (!h) return;
  const label = ch.toc.find((t) => t.id === pr.at)?.text ?? h.textContent;
  mount(
    box,
    html`<span>지난번 <strong>${label}</strong>까지 읽었습니다 (${Math.round(pr.p * 100)}%)</span>
    <span class="resume-actions">
      <button type="button" class="btn btn-small btn-primary" data-go>이어 읽기</button>
      <button type="button" class="icon-btn" data-dismiss aria-label="닫기">${icon('x')}</button>
    </span>`,
  );
  box.hidden = false;
  box.querySelector('[data-go]').addEventListener('click', () => {
    box.hidden = true;
    pin(h);
  });
  box.querySelector('[data-dismiss]').addEventListener('click', () => (box.hidden = true));
}

/* ---------- scroll-driven state ---------- */

function chapterFraction() {
  const prose = $('#prose');
  if (!prose) return 0;
  const r = prose.getBoundingClientRect();
  return Math.min(1, Math.max(0, (innerHeight - r.top) / Math.max(1, r.height)));
}

function updateProgressBar() {
  let f;
  if (current.kind === 'chapter') f = chapterFraction();
  else {
    const max = document.documentElement.scrollHeight - innerHeight;
    f = max > 0 ? scrollY / max : 0;
  }
  $('#progress span').style.transform = `scaleX(${f})`;
}

function currentHeading() {
  const hs = current.headings;
  if (!hs?.length) return null;
  // A section counts as "current" once its heading crosses the upper quarter of the viewport.
  const y = Math.max(topOffset() + 8, innerHeight * 0.25);
  let lo = 0;
  let hi = hs.length - 1;
  let found = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (hs[mid].getBoundingClientRect().top <= y) {
      found = mid;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  return found >= 0 ? hs[found] : null;
}

let activeId = null;

function spy() {
  const h = currentHeading();
  const id = h?.id ?? null;
  if (id === activeId) return;
  activeId = id;
  const parentId = h?.tagName === 'H3' ? findParentH2(h)?.id : id;
  for (const toc of document.querySelectorAll('.toc-tree')) {
    for (const a of toc.querySelectorAll('a[aria-current]')) a.removeAttribute('aria-current');
    for (const li of toc.querySelectorAll(':scope > li.is-open')) li.classList.remove('is-open');
    if (!id) continue;
    toc.querySelector(`a[data-id="${CSS.escape(id)}"]`)?.setAttribute('aria-current', 'location');
    toc.querySelector(`:scope > li[data-id="${CSS.escape(parentId ?? '')}"]`)?.classList.add('is-open');
  }
  const rail = $('.page-toc');
  const a = rail?.querySelector('a[aria-current]');
  if (a && (a.offsetTop < rail.scrollTop + 40 || a.offsetTop > rail.scrollTop + rail.clientHeight - 60)) {
    rail.scrollTop = Math.max(0, a.offsetTop - rail.clientHeight / 3);
  }
}

function findParentH2(h3) {
  const i = current.headings.indexOf(h3);
  for (let j = i; j >= 0; j--) if (current.headings[j].tagName === 'H2') return current.headings[j];
  return null;
}

let leftText = '';
function updateReadingLeft() {
  const f = chapterFraction();
  const mins = current.ch.minutes;
  const text = !mins ? '' : f > 0.985 ? '다 읽었습니다' : `남은 시간 약 ${Math.max(1, Math.round(mins * (1 - f)))}분 · ${Math.round(f * 100)}%`;
  if (text === leftText) return;
  leftText = text;
  for (const el of document.querySelectorAll('[data-reading-left]')) el.textContent = text;
}

function onScroll() {
  updateProgressBar();
  document.body.classList.toggle('is-scrolled', scrollY > 8);
  $('#to-top').classList.toggle('is-visible', scrollY > 1600);
  if (current.kind !== 'chapter' || !current.headings.length) return;
  spy();
  updateReadingLeft();
  if (Date.now() - current.saved > 1500) persistProgress();
}

function persistProgress() {
  if (current.kind !== 'chapter' || !current.headings?.length) return;
  current.saved = Date.now();
  const f = chapterFraction();
  if (f < 0.02 || scrollY < innerHeight / 2) return; // opening a chapter is not reading it
  const before = store.getProgress(current.ch.id);
  const after = store.saveProgress(current.ch.id, { p: f, at: currentHeading()?.id });
  if (after.done && !before?.done) {
    renderSidebar();
    toast(`“${current.ch.title}” 완독`);
  } else if (!before) {
    renderSidebar();
  }
}

/* ================================================================== */
/* Boot                                                               */
/* ================================================================== */

async function boot() {
  initTheme();
  initDisplayMenu();
  initChrome();
  initSidebar();
  $('#search-btn').addEventListener('click', openSearch);

  try {
    book = await loadBook();
  } catch (err) {
    if (!view.dataset.prerendered) {
      mount(view, html`<div class="state-message"><h1>목차를 불러오지 못했습니다</h1><p>네트워크 상태를 확인한 뒤 새로고침해 주세요.</p><p class="muted">${String(err.message ?? err)}</p></div>`);
    }
    throw err;
  }

  search = initSearch(book, { onOpenResult: (href, terms) => navigate(href, { terms }) });
  if (searchWanted) search.open();
  sync = initSync({ root: ROOT, toast, onImported: refreshReaderState });
  await sync.takeFromUrl();

  // The router owns scroll positions (saved per history entry in history.state).
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  interceptLinks();
  addEventListener('popstate', () => route({ pop: true }));

  await route({ initial: true });
  // Warm the in-app renderer while the reader is reading, so the next chapter opens fast.
  const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 2000));
  idle(() => import('./render.js').catch(() => {}));
  renderSidebar();

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register(new URL('sw.js', ROOT).href, { scope: ROOT.pathname }).catch(() => {});
  }
}

boot();
