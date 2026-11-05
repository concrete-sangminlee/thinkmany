/**
 * Search dialog. Chapter titles and headings are matched instantly from
 * index.json; body text is searched by a worker that indexes in the
 * background the first time the dialog opens.
 */
import { html, mount, icon } from './lib/html.js';
import { chapterHref } from './lib/paths.js';
import { chapterUrl } from './book.js';

const MAX_CHAPTERS = 5;
const MAX_HEADINGS = 10;

export function initSearch(book, { onOpenResult }) {
  const dialog = document.getElementById('search-dialog');
  const input = dialog.querySelector('#search-input');
  const list = dialog.querySelector('#search-results');
  const empty = dialog.querySelector('#search-empty');
  const status = dialog.querySelector('#search-status');

  let worker = null;
  let indexState = { done: 0, total: book.chapters.length, ready: false };
  let seq = 0;
  let body = { total: 0, results: [] };
  let active = -1;
  let timer = 0;

  function startIndexing() {
    if (worker) return;
    try {
      worker = new Worker(new URL('./search-worker.js', import.meta.url), { type: 'module' });
    } catch {
      indexState.ready = true;
      return;
    }
    worker.onmessage = (e) => {
      const m = e.data;
      if (m.type === 'progress') {
        indexState = { ...indexState, done: m.done };
        if (input.value.trim()) refreshSoon();
        else renderStatus();
      } else if (m.type === 'ready') {
        indexState = { ...indexState, ready: true };
        if (input.value.trim()) query();
        else renderStatus();
      } else if (m.type === 'results' && m.seq === seq) {
        body = m;
        render();
      }
    };
    worker.postMessage({
      type: 'index',
      chapters: book.chapters.map((c) => ({ id: c.id, order: c.order, url: chapterUrl(c) })),
    });
  }

  function terms() {
    return input.value.toLowerCase().split(/\s+/).filter(Boolean);
  }

  function instantMatches(ts) {
    const hit = (s) => ts.every((t) => s.toLowerCase().includes(t));
    const chapters = book.chapters.filter((c) => hit(`${c.id} ${c.title} ${c.lead} ${c.part.title}`)).slice(0, MAX_CHAPTERS);
    const headings = [];
    for (const c of book.chapters) {
      for (const h of c.toc) {
        if (hit(h.text)) headings.push({ c, h });
        if (headings.length >= MAX_HEADINGS) break;
      }
      if (headings.length >= MAX_HEADINGS) break;
    }
    return { chapters, headings };
  }

  function schedule(ms = 120) {
    clearTimeout(timer);
    timer = setTimeout(query, ms);
  }

  // Index progress refreshes body results at most every 400 ms, on its own
  // timer, so it never postpones the query the reader just typed.
  let refreshTimer = 0;
  function refreshSoon() {
    if (refreshTimer) return;
    refreshTimer = setTimeout(() => {
      refreshTimer = 0;
      query();
    }, 400);
  }

  function query() {
    const q = input.value.trim();
    seq++;
    if (q.length < 2 || !worker) {
      body = { total: 0, results: [] };
      render();
      return;
    }
    worker.postMessage({ type: 'query', q, seq });
    render(); // show instant matches right away
  }

  function mark(text, ts) {
    if (!ts.length) return html`${text}`;
    const re = new RegExp(`(${ts.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    return text.split(re).map((part, i) => (i % 2 ? html`<mark>${part}</mark>` : html`${part}`));
  }

  function renderStatus(extra = '') {
    const { done, total, ready } = indexState;
    const indexing = worker && !ready ? `본문 색인 중… ${done}/${total}` : '';
    status.textContent = [extra, indexing].filter(Boolean).join(' · ');
  }

  function showEmpty(message) {
    list.hidden = true;
    list.replaceChildren();
    empty.hidden = false;
    mount(empty, message);
  }

  function render() {
    const ts = terms();
    const q = input.value.trim();
    // Results re-render while the body index fills in; keep the reader's selection.
    const keep = options()[active]?.getAttribute('href');
    active = -1;
    input.removeAttribute('aria-activedescendant');

    if (!q) {
      showEmpty(html`챕터 제목, 섹션 제목, 본문을 모두 찾습니다.<br><span>예: 리뷰어, Zotero, 지도교수, PINN</span>`);
      renderStatus();
      return;
    }

    const { chapters, headings } = instantMatches(ts);
    const seen = new Set(headings.map(({ c, h }) => `${c.id}/${h.id}`));
    const bodyHits = body.results.filter((r) => !seen.has(`${r.ch}/${r.id}`));

    const groups = [];
    if (chapters.length) {
      groups.push(group('챕터', '', chapters.map((c) => item(chapterHref(c.id), html`${c.part.number} · ${c.part.title}`, mark(c.title, ts), c.lead ? mark(c.lead, ts) : ''))));
    }
    if (headings.length) {
      groups.push(group('섹션', '', headings.map(({ c, h }) => item(chapterHref(c.id, h.id), html`${c.title}`, mark(h.text, ts), ''))));
    }
    const bodyItems = bodyHits
      .map((r) => [r, book.chapter(r.ch)])
      .filter(([, c]) => c)
      .map(([r, c]) => item(chapterHref(c.id, r.id), html`${c.title}`, r.title ? mark(r.title, ts) : html`들어가며`, mark(r.snippet, ts), true));
    if (bodyItems.length) groups.push(group('본문', `${body.total}곳`, bodyItems));

    if (!groups.length) {
      const waiting = worker && !indexState.ready;
      showEmpty(html`${waiting ? '본문을 색인하는 중입니다. 잠시 후 결과가 나타납니다.' : `“${q}”에 대한 결과가 없습니다.`}`);
    } else {
      empty.hidden = true;
      list.hidden = false;
      mount(list, html`${groups}`);
      const i = keep ? options().findIndex((o) => o.getAttribute('href') === keep) : -1;
      if (i >= 0) setActive(i, false);
    }
    renderStatus();
  }

  function group(label, count, items) {
    return html`<div role="group" aria-label="${label}${count ? ` ${count}` : ''}">
      <div class="search-group" aria-hidden="true">${label}${count ? html` <span>${count}</span>` : ''}</div>
      ${items}
    </div>`;
  }

  let uid = 0;
  function item(href, kicker, title, snippet, isBody = false) {
    const id = `sr-${++uid}`;
    return html`<a role="option" id="${id}" aria-selected="false" href="${href}" tabindex="-1" data-body="${isBody ? '1' : ''}">
      <span class="sr-kicker">${kicker}</span>
      <span class="sr-title">${title}</span>
      ${snippet ? html`<span class="sr-snippet">${snippet}</span>` : ''}
    </a>`;
  }

  function options() {
    return [...list.querySelectorAll('[role="option"]')];
  }

  function setActive(i, reveal = true) {
    const opts = options();
    if (!opts.length) return;
    active = (i + opts.length) % opts.length;
    opts.forEach((o, j) => o.setAttribute('aria-selected', String(j === active)));
    const el = opts[active];
    input.setAttribute('aria-activedescendant', el.id);
    if (reveal) el.scrollIntoView({ block: 'nearest' });
  }

  function choose(a) {
    if (!a) return;
    const ts = a.dataset.body ? terms() : [];
    close();
    onOpenResult(a.getAttribute('href'), ts);
  }

  input.addEventListener('input', () => schedule());
  input.addEventListener('keydown', (e) => {
    if (e.isComposing) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(active + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(active - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(options()[active] ?? options()[0]);
    }
  });
  list.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    choose(a);
  });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
  dialog.querySelector('[data-close]').addEventListener('click', close);
  dialog.querySelector('[data-close]').innerHTML = String(icon('x'));

  function open() {
    if (dialog.open) return;
    dialog.showModal();
    input.select();
    startIndexing();
    render();
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  return { open, close };
}
