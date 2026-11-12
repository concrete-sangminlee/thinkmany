/**
 * Page templates shared by the browser and scripts/build.mjs.
 *
 * The build calls these with an empty reader state to prerender every page;
 * the browser calls them again with the reader's bookmarks and progress. Both
 * produce the same markup, so hydration never shifts the layout.
 * Pure functions only: no DOM, no storage.
 */
import { html, raw, icon } from './lib/html.js';
import { homeHref, partHref, chapterHref, assetHref } from './lib/paths.js';

/** Reader state as seen by templates. The build uses this empty one. */
export const NO_STATE = {
  isBookmarked: () => false,
  progress: () => null,
  readCount: () => 0,
  bookmarkCount: () => 0,
};

const fmtDate = (iso) => (iso ? iso.slice(0, 10).replaceAll('-', '.') : '');

/* ------------------------------------------------------------------ */
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */

export function sidebarView(book, { state = NO_STATE, filter = 'all', currentId = null } = {}) {
  const total = book.chapters.length;
  const read = state.readCount();
  const parts = book.parts
    .map((p) => ({ p, chs: filter === 'bookmarks' ? p.chapters.filter((c) => state.isBookmarked(c.id)) : p.chapters }))
    .filter(({ chs }) => chs.length);

  return html`
    <div class="sidebar-head">
      <div class="reading-summary" aria-label="읽은 장 ${read}개, 전체 ${total}개">
        <span><strong>${read}</strong> / ${total}장 완독</span>
        <span class="meter" aria-hidden="true"><span style="width:${(read / total) * 100}%"></span></span>
      </div>
      <div class="segmented" role="group" aria-label="목차 보기">
        <button type="button" data-filter="all" aria-pressed="${String(filter === 'all')}">전체</button>
        <button type="button" data-filter="bookmarks" aria-pressed="${String(filter === 'bookmarks')}">북마크 <span class="count">${state.bookmarkCount()}</span></button>
      </div>
    </div>
    <nav class="toc-parts" aria-label="책 목차">
      ${
        parts.length
          ? parts.map(
              ({ p, chs }) => html`<div class="toc-part" data-color="${p.color}">
              <a class="toc-part-title" href="${partHref(p.id)}"><span class="toc-part-num">${p.number}</span>${p.title}</a>
              <ol>${chs.map((c) => html`<li>${tocLink(c, state, currentId)}</li>`)}</ol>
            </div>`,
            )
          : html`<p class="toc-empty">북마크한 장이 없습니다.<br>장 제목 옆의 ${icon('bookmark')} 버튼으로 추가하세요.</p>`
      }
    </nav>`;
}

function tocLink(c, state, currentId) {
  const pr = state.progress(c.id);
  const st = pr?.done ? 'done' : pr?.p > 0.02 ? 'started' : '';
  return html`<a class="toc-link" href="${chapterHref(c.id)}" data-id="${c.id}" data-state="${st}"${c.id === currentId ? html` aria-current="page"` : ''}>
    <span class="toc-num">${c.num}</span>
    <span class="toc-title">${c.title}</span>
    ${state.isBookmarked(c.id) ? html`<span class="toc-mark" aria-label="북마크">${icon('bookmark')}</span>` : ''}
    <span class="toc-state" aria-hidden="true"></span>
  </a>`;
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

/**
 * Where a reader stands in the book: chapters finished and in progress, and
 * the reading time left (a half-read chapter counts for the half not read).
 * Null for a reader with no history, so the home page shows the book itself.
 */
export function readingStats(book, state = NO_STATE) {
  let done = 0;
  let reading = 0;
  let minutesLeft = 0;
  for (const c of book.chapters) {
    const pr = state.progress(c.id);
    if (pr?.done) done++;
    else {
      if (pr?.p > 0.02) reading++;
      minutesLeft += (c.minutes ?? 0) * (1 - Math.min(1, pr?.p ?? 0));
    }
  }
  if (!done && !reading) return null;
  return { done, reading, total: book.chapters.length, minutesLeft: Math.round(minutesLeft), share: done / book.chapters.length };
}

const fmtDuration = (minutes) => (minutes >= 90 ? html`약 ${Math.round(minutes / 60)}<small>시간</small>` : html`약 ${Math.max(1, minutes)}<small>분</small>`);

export function homeView(book, { state = NO_STATE, resume = null } = {}) {
  const t = book.totals;
  const hours = t ? Math.round(t.minutes / 60) : null;
  const first = book.chapters[0];
  const resumePr = resume ? state.progress(resume.id) : null;
  const mine = readingStats(book, state);
  const marks = state.bookmarkCount();

  return html`
    <section class="hero">
      <p class="eyebrow">한국 공학 대학원 실전 가이드</p>
      <h1 class="hero-title">연구 많이 된다<span>잘 때도 생각날 거야</span></h1>
      <p class="hero-lede">박사 과정의 시행착오를 줄이는 ${book.chapters.length}개의 장. 논문, 실험, AI, 멘탈, 커리어를 한국 연구실의 현실에 맞춰 한 흐름으로 엮었습니다.</p>
      <div class="hero-actions">
        ${
          resume
            ? html`<a class="btn btn-primary" href="${chapterHref(resume.id)}">${icon('book')}<span>이어 읽기 <small>${resume.num ? `${resume.num}. ` : ''}${resume.title}${resumePr?.p ? ` · ${Math.round(resumePr.p * 100)}%` : ''}</small></span></a>
               <a class="btn btn-ghost" href="${chapterHref(first.id)}">처음부터</a>`
            : html`<a class="btn btn-primary" href="${chapterHref(first.id)}">${icon('book')}<span>처음부터 읽기</span></a>`
        }
        <button class="btn btn-ghost" type="button" data-action="search">${icon('search')}<span>검색</span></button>
      </div>
      ${
        mine
          ? html`<dl class="hero-stats" data-reader style="--p:${mine.share.toFixed(4)}">
        <div><dt>읽은 장</dt><dd>${mine.done}<small>/ ${mine.total}</small></dd></div>
        ${mine.reading ? html`<div><dt>읽는 중</dt><dd>${mine.reading}</dd></div>` : ''}
        ${marks ? html`<div><dt>북마크</dt><dd>${marks}</dd></div>` : ''}
        <div><dt>남은 분량</dt><dd>${mine.done === mine.total ? '완독' : fmtDuration(mine.minutesLeft)}</dd></div>
      </dl>`
          : html`<dl class="hero-stats">
        <div><dt>장</dt><dd>${book.chapters.length}</dd></div>
        <div><dt>파트</dt><dd>${book.parts.length}</dd></div>
        ${t ? html`<div><dt>섹션</dt><dd>${t.sections.toLocaleString('ko-KR')}</dd></div>` : ''}
        ${hours ? html`<div><dt>분량</dt><dd>약 ${hours}<small>시간</small></dd></div>` : ''}
      </dl>`
      }
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
          <ol>${p.chapters.map((c) => html`<li><a href="${chapterHref(c.id)}"><span class="num">${c.num}</span>${c.title}</a></li>`)}</ol>
        </article>`,
        )}
      </div>
    </section>`
        : ''
    }

    ${
      book.recent.length
        ? html`<section class="home-block" aria-labelledby="recent-title">
      <div class="block-head">
        <h2 id="recent-title">최근 보강된 장</h2>
        <p>이 책은 계속 자랍니다.</p>
      </div>
      <ol class="recent-list">
        ${book.recent.map(
          (c) => html`<li><a href="${chapterHref(c.id)}">
            <time datetime="${c.updated.slice(0, 10)}">${fmtDate(c.updated)}</time>
            <span class="num">${c.num}</span>
            <span class="title">${c.title}</span>
          </a></li>`,
        )}
      </ol>
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
            <span class="part-num">Part ${p.number}${partDone(p, state)}</span>
            <h3 id="${p.id}-title">${p.title}</h3>
            ${p.desc ? html`<p>${p.desc}</p>` : ''}
          </header>
          <ol class="chapter-list">${p.chapters.map((c) => chapterRow(c, state))}</ol>
        </section>`,
        )}
      </div>
    </section>
    ${footerView()}`;
}

/** "3/8 읽음" beside a part's number, once the reader has finished a chapter in it. */
function partDone(part, state) {
  const done = part.chapters.filter((c) => state.progress(c.id)?.done).length;
  return done ? html`<span class="part-done">${done}/${part.chapters.length} 읽음</span>` : '';
}

function chapterRow(c, state) {
  const pr = state.progress(c.id);
  const pct = pr ? Math.round(pr.p * 100) : 0;
  const status = pr?.done
    ? html`<span class="row-state is-done" title="완독">${icon('check')}</span>`
    : pct > 2
      ? html`<span class="row-state" title="${pct}% 읽음">${pct}%</span>`
      : '';
  return html`<li>
    <a class="chapter-row" href="${chapterHref(c.id)}">
      <span class="num">${c.num}</span>
      <span class="body">
        <span class="title">${c.title}${state.isBookmarked(c.id) ? html` <span class="row-mark" aria-label="북마크">${icon('bookmark')}</span>` : ''}</span>
        ${c.lead ? html`<span class="lead">${c.lead}</span>` : ''}
      </span>
      <span class="meta">${c.minutes ? `${c.minutes}분` : ''}</span>
      ${status}
    </a>
  </li>`;
}

export function footerView() {
  return html`<footer class="site-footer">
    <div>
      <p class="footer-title">연구 많이 된다</p>
      <p>Sang Min Lee · 계속 자라는 문서</p>
    </div>
    <nav aria-label="사이트 링크">
      <a href="https://github.com/concrete-sangminlee/thinkmany" rel="noopener">GitHub</a>
      <a href="${assetHref('feed.xml')}" type="application/atom+xml">보강 소식 피드</a>
      <button type="button" class="link-btn" data-help>단축키</button>
      <a href="${assetHref('admin/')}">관리</a>
    </nav>
  </footer>`;
}

export function missingView(id) {
  return html`<div class="state-message">
    <p class="eyebrow">404</p>
    <h1>“${id}”에 해당하는 장이 없습니다</h1>
    <p>링크가 바뀌었거나 잘못 입력된 주소일 수 있습니다.</p>
    <p><a class="btn btn-primary" href="${homeHref()}">차례로 돌아가기</a> <button class="btn btn-ghost" type="button" data-action="search">검색하기</button></p>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Chapter                                                             */
/* ------------------------------------------------------------------ */

/** The chapter header; re-rendered on its own when reader state changes. */
export function chapterHead(book, ch, { state = NO_STATE, lead = ch.lead, toc = ch.toc } = {}) {
  const h2 = toc.filter((t) => t.depth === 2).length;
  const pr = state.progress(ch.id);
  const marked = state.isBookmarked(ch.id);
  const meta = [ch.minutes ? `약 ${ch.minutes}분` : '', h2 ? `${h2}개 섹션` : '', ch.updated ? `${fmtDate(ch.updated)} 보강` : '', pr?.done ? '완독' : '']
    .filter(Boolean)
    .join(' · ');

  return html`<header class="chapter-head">
    <a class="crumb" href="${partHref(ch.part.id)}">Part ${ch.part.number} · ${ch.part.title}</a>
    <h1 class="chapter-title" tabindex="-1">${ch.num ? html`<span class="chapter-num">${ch.num}</span>` : ''}${ch.title}</h1>
    ${lead ? html`<p class="chapter-lead">${lead}</p>` : ''}
    <div class="chapter-meta">
      <span>${meta}</span>
      <span class="chapter-actions">
        <button type="button" class="icon-btn${marked ? ' is-on' : ''}" data-action="bookmark" aria-pressed="${String(marked)}" aria-label="북마크" title="북마크 (B)">${icon('bookmark')}</button>
        <button type="button" class="icon-btn" data-action="copy-link" aria-label="링크 복사" title="링크 복사">${icon('link')}</button>
        <button type="button" class="icon-btn" data-action="print" aria-label="인쇄 또는 PDF로 저장" title="인쇄 / PDF 저장">${icon('printer')}</button>
      </span>
    </div>
    <div class="resume" id="resume" hidden></div>
    ${
      toc.length
        ? html`<details class="toc-inline">
      <summary>${icon('list')}<span>이 장의 차례</span><span class="reading-left" data-reading-left></span></summary>
      ${pageToc(ch, toc)}
    </details>`
        : ''
    }
  </header>`;
}

/**
 * Whole chapter page body. `prose` is trusted, already-rendered HTML; when
 * it is null a loading skeleton is shown until the markdown arrives.
 */
export function chapterView(book, ch, { state = NO_STATE, lead = ch.lead, toc = ch.toc, prose = null } = {}) {
  const prev = book.prev(ch);
  const next = book.next(ch);
  return html`
  <div class="chapter-layout">
    <article class="chapter" data-color="${ch.part.color}">
      ${chapterHead(book, ch, { state, lead, toc })}
      ${
        prose == null
          ? html`<div class="prose" id="prose" aria-busy="true"><div class="skeleton" aria-label="불러오는 중">${Array.from({ length: 7 }, () => html`<span></span>`)}</div></div>`
          : html`<div class="prose" id="prose">${raw(prose)}</div>`
      }
      ${connectedView(ch)}
      <nav class="pager" aria-label="장 이동">
        ${prev ? html`<a class="pager-link prev" href="${chapterHref(prev.id)}" rel="prev"><span class="pager-dir">${icon('arrowLeft')} 이전 장</span><span class="pager-title">${prev.title}</span></a>` : html`<span></span>`}
        ${
          next
            ? html`<a class="pager-link next" href="${chapterHref(next.id)}" rel="next"><span class="pager-dir">다음 장 ${icon('arrowRight')}</span><span class="pager-title">${next.title}</span></a>`
            : html`<a class="pager-link next" href="${homeHref()}"><span class="pager-dir">마지막 장입니다</span><span class="pager-title">차례로 돌아가기</span></a>`
        }
      </nav>
    </article>
    ${toc.length ? html`<aside class="page-toc" aria-label="이 장의 차례"><p class="page-toc-title">이 장의 차례</p>${pageToc(ch, toc)}<p class="reading-left" data-reading-left></p></aside>` : ''}
  </div>
  ${footerView()}`;
}

/** Chapters this one mentions, and chapters that mention it (from the reference graph). */
function connectedView(ch) {
  if (!ch.refs?.length && !ch.backrefs?.length) return '';
  const item = (c) => html`<li><a href="${chapterHref(c.id)}"><span class="num">${c.num}</span><span class="title">${c.title}</span></a></li>`;
  const list = (chs) => {
    const shown = chs.slice(0, 6);
    const rest = chs.slice(6);
    return html`<ul>${shown.map(item)}</ul>${rest.length ? html`<details><summary>${rest.length}개 더 보기</summary><ul>${rest.map(item)}</ul></details>` : ''}`;
  };
  return html`<section class="connected" aria-labelledby="connected-title">
    <h2 id="connected-title">연결된 장</h2>
    <div class="connected-grid">
      ${ch.refs.length ? html`<div><h3>이 장에서 언급한 장</h3>${list(ch.refs)}</div>` : ''}
      ${ch.backrefs.length ? html`<div><h3>이 장을 언급한 장</h3>${list(ch.backrefs)}</div>` : ''}
    </div>
  </section>`;
}

export function pageToc(ch, toc) {
  const groups = [];
  for (const t of toc) {
    if (t.depth === 2 || !groups.length) groups.push({ h: t, children: [] });
    else groups[groups.length - 1].children.push(t);
  }
  return html`<ol class="toc-tree">
    ${groups.map(
      (g) => html`<li data-id="${g.h.id}">
      <a href="${chapterHref(ch.id, g.h.id)}" data-id="${g.h.id}">${g.h.text}</a>
      ${g.children.length ? html`<ol>${g.children.map((c) => html`<li><a href="${chapterHref(ch.id, c.id)}" data-id="${c.id}">${c.text}</a></li>`)}</ol>` : ''}
    </li>`,
    )}
  </ol>`;
}
