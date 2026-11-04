/**
 * 연구 많이 된다: reader app.
 *
 * Routes (hash based, so GitHub Pages needs no rewrites):
 *   #            home
 *   #part-2      home, scrolled to a part (legacy #tools-software works too)
 *   #ch05        chapter
 *   #ch05/slug   chapter, scrolled to a heading
 */
import { loadBook, fetchChapter } from './book.js';
import { renderMarkdown, enhance, highlightTerms, clearHighlights } from './render.js';
import { initSearch } from './search.js';
import { html, mount, icon } from './lib/html.js';
import * as store from './lib/store.js';

const $ = (sel, root = document) => root.querySelector(sel);
const view = $('#view');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const desktop = matchMedia('(min-width: 1024px)');

let book;
let search;
let current = { kind: null };
let pendingTerms = [];

/* ================================================================== */
/* Theme                                                              */
/* ================================================================== */

function effectiveTheme() {
  return document.documentElement.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function initTheme() {
  const btn = $('#theme-btn');
  const paint = () => {
    const dark = effectiveTheme() === 'dark';
    btn.innerHTML = String(icon(dark ? 'sun' : 'moon'));
    btn.setAttribute('aria-label', dark ? '밝은 테마로 전환' : '어두운 테마로 전환');
    btn.title = btn.getAttribute('aria-label') + ' (D)';
  };
  btn.addEventListener('click', () => {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.setTheme(next);
    paint();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', paint);
  paint();
}

/* ================================================================== */
/* Chrome: sidebar, shortcuts, scroll                                 */
/* ================================================================== */

function initChrome() {
  $('#menu-btn').innerHTML = String(icon('menu'));
  $('#search-btn .icon-slot').outerHTML = String(icon('search'));
  $('#to-top').innerHTML = String(icon('arrowUp'));

  $('#menu-btn').addEventListener('click', toggleSidebar);
  $('#scrim').addEventListener('click', () => toggleSidebar(false));
  $('#to-top').addEventListener('click', () => scrollTo({ top: 0, behavior: smooth() }));
  desktop.addEventListener('change', resetSidebar);
  resetSidebar();

  const help = $('#help-dialog');
  help.querySelector('[data-close]').innerHTML = String(icon('x'));
  help.querySelector('[data-close]').addEventListener('click', () => help.close());
  help.addEventListener('click', (e) => e.target === help && help.close());

  document.addEventListener('keydown', onKey);
  let ticking = false;
  window.addEventListener(
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
  window.addEventListener('resize', onScroll, { passive: true });
  document.addEventListener('visibilitychange', () => document.hidden && persistProgress());
  window.addEventListener('pagehide', persistProgress);
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
    body.classList.remove('nav-open');
    $('#menu-btn').setAttribute('aria-expanded', String(!collapsed));
    $('#main').inert = false;
    return;
  }
  const open = typeof force === 'boolean' ? force : !body.classList.contains('nav-open');
  body.classList.toggle('nav-open', open);
  $('#menu-btn').setAttribute('aria-expanded', String(open));
  $('#scrim').hidden = !open;
  $('#main').inert = open;
  if (open) {
    const active = $('#sidebar .toc-link[aria-current="page"]') ?? $('#sidebar a');
    active?.focus({ preventScroll: true });
    revealInSidebar();
  }
}

function onKey(e) {
  if (e.isComposing || e.defaultPrevented) return;
  const typing = e.target.closest?.('input, textarea, select, [contenteditable="true"]');

  if ((e.metaKey || e.ctrlKey) && e.code === 'KeyK') {
    e.preventDefault();
    search.open();
    return;
  }
  if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
    toggleSidebar(false);
    $('#menu-btn').focus();
    return;
  }
  if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
  if (document.querySelector('dialog[open]')) return;

  const chapter = current.kind === 'chapter' ? current.ch : null;
  const actions = {
    Slash: () => (e.shiftKey ? $('#help-dialog').showModal() : search.open()),
    KeyJ: () => chapter && jumpSection(1),
    KeyK: () => chapter && jumpSection(-1),
    BracketRight: () => chapter && book.next(chapter) && (location.hash = book.next(chapter).id),
    BracketLeft: () => chapter && book.prev(chapter) && (location.hash = book.prev(chapter).id),
    KeyT: () => toggleSidebar(),
    KeyD: () => $('#theme-btn').click(),
    KeyB: () => chapter && $('[data-action="bookmark"]')?.click(),
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
  if (target) target.scrollIntoView({ behavior: smooth(), block: 'start' });
}

/**
 * Scroll to `el` and keep it anchored while late layout settles (web fonts,
 * KaTeX, images), until the reader scrolls on their own.
 */
let unpin = null;
function pin(el, block = 'start') {
  unpin?.();
  if (!el) return;
  el.scrollIntoView({ block });
  let moved = false;
  const stop = () => (moved = true);
  const events = ['wheel', 'touchstart', 'keydown', 'mousedown'];
  for (const e of events) addEventListener(e, stop, { passive: true });
  const ro = new ResizeObserver(() => !moved && el.isConnected && el.scrollIntoView({ block }));
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

let sidebarFilter = 'all';

function renderSidebar() {
  const nav = $('#book-toc');
  const marks = store.bookmarkCount();
  const read = store.readCount();
  const total = book.chapters.length;

  const filter = html`
    <div class="sidebar-head">
      <div class="reading-summary" aria-label="읽은 장 ${read}개, 전체 ${total}개">
        <span><strong>${read}</strong> / ${total}장 완독</span>
        <span class="meter" aria-hidden="true"><span style="width:${(read / total) * 100}%"></span></span>
      </div>
      <div class="segmented" role="group" aria-label="목차 보기">
        <button type="button" data-filter="all" aria-pressed="${sidebarFilter === 'all'}">전체</button>
        <button type="button" data-filter="bookmarks" aria-pressed="${sidebarFilter === 'bookmarks'}">북마크 <span class="count">${marks}</span></button>
      </div>
    </div>`;

  const parts = book.parts
    .map((p) => ({ p, chs: sidebarFilter === 'bookmarks' ? p.chapters.filter((c) => store.isBookmarked(c.id)) : p.chapters }))
    .filter(({ chs }) => chs.length);

  const body = parts.length
    ? parts.map(
        ({ p, chs }) => html`
        <div class="toc-part" data-color="${p.color}">
          <a class="toc-part-title" href="#${p.id}"><span class="toc-part-num">${p.number}</span>${p.title}</a>
          <ol>
            ${chs.map((c) => html`<li>${tocLink(c)}</li>`)}
          </ol>
        </div>`,
      )
    : html`<p class="toc-empty">북마크한 장이 없습니다.<br>장 제목 옆의 ${icon('bookmark')} 버튼으로 추가하세요.</p>`;

  mount(nav, html`${filter}<nav class="toc-parts" aria-label="책 목차">${body}</nav>`);

  nav.querySelectorAll('[data-filter]').forEach((b) =>
    b.addEventListener('click', () => {
      sidebarFilter = b.dataset.filter;
      renderSidebar();
    }),
  );
  nav.querySelector('.toc-parts').addEventListener('click', (e) => {
    if (e.target.closest('a') && !desktop.matches) toggleSidebar(false);
  });
  markSidebar();
}

function tocLink(c) {
  const pr = store.getProgress(c.id);
  const state = pr?.done ? 'done' : pr?.p > 0.02 ? 'started' : '';
  return html`<a class="toc-link" href="#${c.id}" data-id="${c.id}" data-state="${state}">
    <span class="toc-num">${c.num}</span>
    <span class="toc-title">${c.title}</span>
    ${store.isBookmarked(c.id) ? html`<span class="toc-mark" aria-label="북마크">${icon('bookmark')}</span>` : ''}
    <span class="toc-state" aria-hidden="true"></span>
  </a>`;
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
  const top = a.offsetTop - sb.clientHeight / 3;
  if (a.offsetTop < sb.scrollTop + 80 || a.offsetTop > sb.scrollTop + sb.clientHeight - 80) sb.scrollTop = Math.max(0, top);
}

/* ================================================================== */
/* Router                                                             */
/* ================================================================== */

function parseHash() {
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  if (!raw) return { kind: 'home' };
  const [head, ...rest] = raw.split('/');
  const ch = book.chapter(head);
  if (ch) return { kind: 'chapter', ch, anchor: rest.join('/') };
  const part = book.part(head);
  if (part) return { kind: 'home', part };
  return { kind: 'missing', id: raw };
}

let homeScroll = 0;

async function route() {
  unpin?.();
  const next = parseHash();
  persistProgress();
  if (current.kind === 'home') homeScroll = scrollY;
  if (!desktop.matches) toggleSidebar(false);

  if (next.kind === 'chapter' && current.kind === 'chapter' && current.ch === next.ch) {
    current.anchor = next.anchor;
    const terms = pendingTerms;
    pendingTerms = [];
    scrollToAnchor(next.anchor, true, terms);
    return;
  }
  if (next.kind === 'home' && current.kind === 'home' && next.part) {
    document.getElementById(next.part.id)?.scrollIntoView({ block: 'start', behavior: smooth() });
    return;
  }

  if (next.kind === 'chapter') await showChapter(next.ch, next.anchor);
  else if (next.kind === 'home') showHome(next.part);
  else showMissing(next.id);
}

/* ================================================================== */
/* Home                                                               */
/* ================================================================== */

function showHome(part) {
  current = { kind: 'home' };
  document.title = '연구 많이 된다 · 대학원생 연구 가이드';
  document.body.dataset.view = 'home';

  const t = book.totals;
  const hours = t ? Math.round(t.minutes / 60) : null;
  const first = book.chapters[0];
  const lastId = store.lastChapter();
  let resume = lastId ? book.chapter(lastId) : null;
  let resumePr = resume ? store.getProgress(resume.id) : null;
  if (resume && resumePr?.done) {
    resume = book.next(resume);
    resumePr = resume ? store.getProgress(resume.id) : null;
  }

  mount(
    view,
    html`
    <section class="hero">
      <p class="eyebrow">한국 공학 대학원 실전 가이드</p>
      <h1 class="hero-title">연구 많이 된다<span>잘 때도 생각날 거야</span></h1>
      <p class="hero-lede">박사 과정의 시행착오를 줄이는 ${book.chapters.length}개의 장. 논문, 실험, AI, 멘탈, 커리어를 한국 연구실의 현실에 맞춰 한 흐름으로 엮었습니다.</p>
      <div class="hero-actions">
        ${
          resume
            ? html`<a class="btn btn-primary" href="#${resume.id}">${icon('book')}<span>이어 읽기 <small>${resume.num ? resume.num + '. ' : ''}${resume.title}${resumePr?.p ? ` · ${Math.round(resumePr.p * 100)}%` : ''}</small></span></a>
                   <a class="btn btn-ghost" href="#${first.id}">처음부터</a>`
            : html`<a class="btn btn-primary" href="#${first.id}">${icon('book')}<span>처음부터 읽기</span></a>`
        }
        <button class="btn btn-ghost" type="button" data-action="search">${icon('search')}<span>검색</span></button>
      </div>
      <dl class="hero-stats">
        <div><dt>장</dt><dd>${book.chapters.length}</dd></div>
        <div><dt>파트</dt><dd>${book.parts.length}</dd></div>
        ${t ? html`<div><dt>섹션</dt><dd>${t.sections.toLocaleString('ko-KR')}</dd></div>` : ''}
        ${hours ? html`<div><dt>분량</dt><dd>약 ${hours}<small>시간</small></dd></div>` : ''}
      </dl>
    </section>

    ${
      book.paths.length
        ? html`<section class="home-block" aria-labelledby="paths-title">
      <div class="block-head">
        <h2 id="paths-title">어디서 시작할까</h2>
        <p>처음부터 읽지 않아도 됩니다. 지금 있는 자리에서 시작하세요.</p>
      </div>
      <div class="paths">
        ${book.paths.map(
          (p) => html`<article class="path-card">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <ol>${p.chapters.map((c) => html`<li><a href="#${c.id}"><span class="num">${c.num}</span>${c.title}</a></li>`)}</ol>
        </article>`,
        )}
      </div>
    </section>`
        : ''
    }

    <section class="home-block" aria-labelledby="contents-title">
      <div class="block-head">
        <h2 id="contents-title">차례</h2>
        <p>${book.parts.length}개 파트 · ${book.chapters.length}개 장${hours ? ` · 약 ${hours}시간 분량` : ''}</p>
      </div>
      <div class="parts">
        ${book.parts.map(
          (p) => html`<section class="part" id="${p.id}" data-color="${p.color}" aria-labelledby="${p.id}-title">
          <header class="part-head">
            <span class="part-num">Part ${p.number}</span>
            <h3 id="${p.id}-title">${p.title}</h3>
            ${p.desc ? html`<p>${p.desc}</p>` : ''}
          </header>
          <ol class="chapter-list">
            ${p.chapters.map((c) => chapterRow(c))}
          </ol>
        </section>`,
        )}
      </div>
    </section>
    ${footer()}`,
  );

  view.querySelector('[data-action="search"]').addEventListener('click', () => search.open());
  markSidebar();
  updateProgressBar();

  if (part) {
    pin(document.getElementById(part.id));
  } else {
    scrollTo(0, homeScroll);
  }
}

function chapterRow(c) {
  const pr = store.getProgress(c.id);
  const pct = pr ? Math.round(pr.p * 100) : 0;
  const state = pr?.done ? html`<span class="row-state is-done" title="완독">${icon('check')}</span>` : pct > 2 ? html`<span class="row-state" title="${pct}% 읽음">${pct}%</span>` : '';
  return html`<li>
    <a class="chapter-row" href="#${c.id}">
      <span class="num">${c.num}</span>
      <span class="body">
        <span class="title">${c.title}${store.isBookmarked(c.id) ? html` <span class="row-mark" aria-label="북마크">${icon('bookmark')}</span>` : ''}</span>
        ${c.lead ? html`<span class="lead">${c.lead}</span>` : ''}
      </span>
      <span class="meta">${c.minutes ? `${c.minutes}분` : ''}</span>
      ${state}
    </a>
  </li>`;
}

function footer() {
  return html`<footer class="site-footer">
    <div>
      <p class="footer-title">연구 많이 된다</p>
      <p>Sang Min Lee · 계속 자라는 문서</p>
    </div>
    <nav aria-label="사이트 링크">
      <a href="https://github.com/concrete-sangminlee/thinkmany" rel="noopener">GitHub</a>
      <button type="button" class="link-btn" data-help>단축키</button>
      <a href="admin/">관리</a>
    </nav>
  </footer>`;
}

function showMissing(id) {
  current = { kind: 'missing' };
  document.body.dataset.view = 'missing';
  document.title = '찾을 수 없음 · 연구 많이 된다';
  mount(
    view,
    html`<div class="state-message">
      <p class="eyebrow">404</p>
      <h1>“${id}”에 해당하는 장이 없습니다</h1>
      <p>링크가 바뀌었거나 잘못 입력된 주소일 수 있습니다.</p>
      <p><a class="btn btn-primary" href="#">차례로 돌아가기</a> <button class="btn btn-ghost" type="button" data-action="search">검색하기</button></p>
    </div>`,
  );
  view.querySelector('[data-action="search"]').addEventListener('click', () => search.open());
  markSidebar();
  scrollTo(0, 0);
}

/* ================================================================== */
/* Chapter                                                            */
/* ================================================================== */

let renderToken = 0;

async function showChapter(ch, anchor) {
  const token = ++renderToken;
  current = { kind: 'chapter', ch, anchor, headings: [], saved: 0 };
  document.body.dataset.view = 'chapter';
  document.title = `${ch.title} · 연구 많이 된다`;
  markSidebar();

  mount(view, chapterShell(ch, ch.lead, ch.toc));
  scrollTo(0, 0);
  updateProgressBar();

  let md;
  try {
    md = await fetchChapter(ch);
  } catch {
    if (token !== renderToken) return;
    const why = navigator.onLine ? '네트워크 상태를 확인한 뒤 다시 시도해 주세요.' : '오프라인에서는 한 번 열어 본 장만 읽을 수 있습니다.';
    mount($('#prose'), html`<div class="state-message"><h2>이 장을 불러오지 못했습니다</h2><p>${why}</p><p><button class="btn btn-ghost" type="button" data-retry>다시 시도</button></p></div>`);
    $('[data-retry]').addEventListener('click', () => showChapter(ch, anchor));
    return;
  }
  if (token !== renderToken) return;

  const { html: body, lead: rawLead, headings } = renderMarkdown(md);
  const lead = rawLead && rawLead !== ch.title ? rawLead : '';
  const ids = (list) => list.map((h) => h.id).join('\n');
  if (lead !== ch.lead || ids(headings) !== ids(ch.toc)) {
    // index.json is stale (e.g. right after an edit in /admin): trust the chapter itself.
    ch.lead = lead;
    ch.toc = headings;
    mount(view, chapterShell(ch, ch.lead, ch.toc));
  }

  const prose = $('#prose');
  prose.innerHTML = body;
  prose.removeAttribute('aria-busy');
  enhance(prose, ch.id);
  current.headings = [...prose.querySelectorAll('h2[id], h3[id]')];
  wireChapter(ch);

  const terms = pendingTerms;
  pendingTerms = [];
  if (anchor || terms.length) scrollToAnchor(anchor, false, terms);
  else showResume(ch);

  $('.chapter-title').focus({ preventScroll: true });
  onScroll();
}

function chapterShell(ch, lead, toc) {
  const prev = book.prev(ch);
  const next = book.next(ch);
  const h2 = toc.filter((t) => t.depth === 2).length;
  const pr = store.getProgress(ch.id);
  const marked = store.isBookmarked(ch.id);

  return html`
  <div class="chapter-layout">
    <article class="chapter" data-color="${ch.part.color}">
      <header class="chapter-head">
        <a class="crumb" href="#${ch.part.id}">Part ${ch.part.number} · ${ch.part.title}</a>
        <h1 class="chapter-title" tabindex="-1">${ch.num ? html`<span class="chapter-num">${ch.num}</span>` : ''}${ch.title}</h1>
        ${lead ? html`<p class="chapter-lead">${lead}</p>` : ''}
        <div class="chapter-meta">
          <span>${[ch.minutes ? `약 ${ch.minutes}분` : '', h2 ? `${h2}개 섹션` : '', pr?.done ? '완독' : ''].filter(Boolean).join(' · ')}</span>
          <span class="chapter-actions">
            <button type="button" class="icon-btn${marked ? ' is-on' : ''}" data-action="bookmark" aria-pressed="${marked}" aria-label="북마크" title="북마크 (B)">${icon('bookmark')}</button>
            <button type="button" class="icon-btn" data-action="copy-link" aria-label="링크 복사" title="링크 복사">${icon('link')}</button>
            <button type="button" class="icon-btn" data-action="print" aria-label="인쇄 또는 PDF로 저장" title="인쇄 / PDF 저장">${icon('printer')}</button>
          </span>
        </div>
        <div class="resume" id="resume" hidden></div>
        ${
          toc.length
            ? html`<details class="toc-inline">
          <summary>${icon('list')}<span>이 장의 차례</span></summary>
          ${pageToc(toc)}
        </details>`
            : ''
        }
      </header>

      <div class="prose" id="prose" aria-busy="true">
        <div class="skeleton" aria-label="불러오는 중">${Array.from({ length: 7 }, () => html`<span></span>`)}</div>
      </div>

      <nav class="pager" aria-label="장 이동">
        ${prev ? html`<a class="pager-link prev" href="#${prev.id}" rel="prev"><span class="pager-dir">${icon('arrowLeft')} 이전 장</span><span class="pager-title">${prev.title}</span></a>` : html`<span></span>`}
        ${next ? html`<a class="pager-link next" href="#${next.id}" rel="next"><span class="pager-dir">다음 장 ${icon('arrowRight')}</span><span class="pager-title">${next.title}</span></a>` : html`<a class="pager-link next" href="#"><span class="pager-dir">마지막 장입니다</span><span class="pager-title">차례로 돌아가기</span></a>`}
      </nav>
    </article>

    ${toc.length ? html`<aside class="page-toc" aria-label="이 장의 차례"><p class="page-toc-title">이 장의 차례</p>${pageToc(toc)}</aside>` : ''}
  </div>
  ${footer()}`;
}

function pageToc(toc) {
  const groups = [];
  for (const t of toc) {
    if (t.depth === 2 || !groups.length) groups.push({ h: t, children: [] });
    else groups[groups.length - 1].children.push(t);
  }
  return html`<ol class="toc-tree">
    ${groups.map(
      (g) => html`<li data-id="${g.h.id}">
      <a href="#${current.ch.id}/${g.h.id}" data-id="${g.h.id}">${g.h.text}</a>
      ${g.children.length ? html`<ol>${g.children.map((c) => html`<li><a href="#${current.ch.id}/${c.id}" data-id="${c.id}">${c.text}</a></li>`)}</ol>` : ''}
    </li>`,
    )}
  </ol>`;
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
    const url = new URL(`#${ch.id}`, location.href).href;
    try {
      await navigator.clipboard.writeText(url);
      toast('링크를 복사했습니다');
    } catch {
      toast(url);
    }
  });
  view.querySelector('[data-action="print"]').addEventListener('click', () => window.print());
  view.querySelector('.toc-inline')?.addEventListener('click', (e) => {
    if (e.target.closest('a')) e.currentTarget.open = false;
  });
}

function scrollToAnchor(anchor, animate, terms = []) {
  const prose = $('#prose');
  if (!prose) return;
  clearHighlights(prose);
  const heading = anchor ? prose.querySelector(`#${CSS.escape(anchor)}`) : null;
  let target = heading;
  if (terms.length) target = highlightTerms(prose, heading, terms) ?? heading;

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
  const read = innerHeight - r.top;
  return Math.min(1, Math.max(0, read / Math.max(1, r.height)));
}

function updateProgressBar() {
  const bar = $('#progress span');
  let f;
  if (current.kind === 'chapter') f = chapterFraction();
  else {
    const max = document.documentElement.scrollHeight - innerHeight;
    f = max > 0 ? scrollY / max : 0;
  }
  bar.style.transform = `scaleX(${f})`;
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
  if (a) {
    const y = a.offsetTop;
    if (y < rail.scrollTop + 40 || y > rail.scrollTop + rail.clientHeight - 60) rail.scrollTop = Math.max(0, y - rail.clientHeight / 3);
  }
}

function findParentH2(h3) {
  const i = current.headings.indexOf(h3);
  for (let j = i; j >= 0; j--) if (current.headings[j].tagName === 'H2') return current.headings[j];
  return null;
}

function onScroll() {
  updateProgressBar();
  document.body.classList.toggle('is-scrolled', scrollY > 8);
  $('#to-top').classList.toggle('is-visible', scrollY > 1600);
  if (current.kind !== 'chapter' || !current.headings.length) return;
  spy();
  if (Date.now() - current.saved > 1500) persistProgress();
}

function persistProgress() {
  if (current.kind !== 'chapter' || !current.headings?.length) return;
  current.saved = Date.now();
  const f = chapterFraction();
  if (f < 0.02 || scrollY < innerHeight / 2) return;
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
  initChrome();

  try {
    book = await loadBook();
  } catch (err) {
    mount(view, html`<div class="state-message"><h1>목차를 불러오지 못했습니다</h1><p>네트워크 상태를 확인한 뒤 새로고침해 주세요.</p><p class="muted">${String(err.message ?? err)}</p></div>`);
    throw err;
  }

  renderSidebar();
  search = initSearch(book, {
    onOpenResult(href, terms) {
      pendingTerms = terms;
      if (location.hash === href) route();
      else location.hash = href;
    },
  });
  $('#search-btn').addEventListener('click', () => search.open());
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-help]')) $('#help-dialog').showModal();
  });

  // The router owns scroll positions; the browser's own restoration would
  // scroll the outgoing chapter before hashchange and corrupt its progress.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('hashchange', route);
  route();

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

boot();
