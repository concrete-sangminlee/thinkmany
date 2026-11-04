/**
 * Chapter rendering: markdown -> sanitized HTML -> progressive enhancements.
 */
import DOMPurify from './vendor/purify.es.mjs';
import { lexChapter, renderTokens } from './lib/markdown.js';
import { getChecks, setChecks } from './lib/store.js';
import { icon } from './lib/html.js';

const KATEX = 'https://cdn.jsdelivr.net/npm/katex@0.19.0/dist/';
const MERMAID = 'https://cdn.jsdelivr.net/npm/mermaid@11.12.0/dist/mermaid.esm.min.mjs';

export function renderMarkdown(md) {
  const { tokens, lead, headings } = lexChapter(md);
  const html = DOMPurify.sanitize(renderTokens(tokens));
  return { html, lead, headings };
}

/** Upgrade rendered markdown inside `root` for chapter `chapterId`. */
export function enhance(root, chapterId) {
  anchors(root, chapterId);
  tables(root);
  codeBlocks(root);
  tabs(root);
  checklists(root, chapterId);
  links(root);
  for (const img of root.querySelectorAll('img')) {
    img.loading = 'lazy';
    img.decoding = 'async';
  }
  if (root.querySelector('.math')) math(root);
  if (root.querySelector('code.language-mermaid')) mermaid(root);
}

function anchors(root, chapterId) {
  for (const h of root.querySelectorAll('[data-slug]')) {
    h.id = h.dataset.slug;
    h.removeAttribute('data-slug');
  }
  for (const h of root.querySelectorAll('h2[id], h3[id]')) {
    const a = document.createElement('a');
    a.className = 'anchor';
    a.href = `#${chapterId}/${h.id}`;
    a.setAttribute('aria-label', '이 섹션 링크');
    a.innerHTML = String(icon('hash'));
    h.append(a);
  }
}

function tables(root) {
  for (const table of root.querySelectorAll('table')) {
    if (table.parentElement.classList.contains('table-wrap')) continue;
    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    wrap.tabIndex = 0;
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', '표 (가로 스크롤 가능)');
    table.before(wrap);
    wrap.append(table);
  }
}

function codeBlocks(root) {
  for (const pre of root.querySelectorAll('pre')) {
    const code = pre.querySelector('code');
    if (!code || code.classList.contains('language-mermaid')) continue;
    const lang = [...code.classList].find((c) => c.startsWith('language-'))?.slice(9) ?? '';

    const figure = document.createElement('figure');
    figure.className = 'codeblock';
    const bar = document.createElement('figcaption');
    bar.innerHTML = `<span class="codeblock-lang"></span>`;
    bar.firstChild.textContent = lang || 'text';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'codeblock-copy';
    btn.innerHTML = `${icon('copy')}<span>복사</span>`;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        btn.classList.add('is-done');
        btn.lastChild.textContent = '복사됨';
      } catch {
        btn.lastChild.textContent = '복사 실패';
      }
      setTimeout(() => {
        btn.classList.remove('is-done');
        btn.lastChild.textContent = '복사';
      }, 1800);
    });
    bar.append(btn);

    pre.before(figure);
    figure.append(bar, pre);
  }
}

/* Content tabs: <div class="tab-container"> with .tab-btn[data-tab] + .tab-content#id */
function tabs(root) {
  for (const box of root.querySelectorAll('.tab-container')) {
    const list = box.querySelector('.tab-buttons');
    const buttons = [...box.querySelectorAll('.tab-btn[data-tab]')];
    if (!list || !buttons.length) continue;
    list.setAttribute('role', 'tablist');

    const select = (btn, focus = false) => {
      for (const b of buttons) {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
        const panel = box.querySelector(`#${CSS.escape(b.dataset.tab)}`);
        if (panel) {
          panel.classList.toggle('active', on);
          panel.hidden = !on;
        }
      }
      if (focus) btn.focus();
    };

    buttons.forEach((b, i) => {
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.id ||= `${b.dataset.tab}-tab`;
      const panel = box.querySelector(`#${CSS.escape(b.dataset.tab)}`);
      if (panel) {
        b.setAttribute('aria-controls', panel.id);
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', b.id);
        panel.dataset.label = b.textContent.trim(); // shown when printing
      }
      b.addEventListener('click', () => select(b));
      b.addEventListener('keydown', (e) => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (step) {
          e.preventDefault();
          select(buttons[(i + step + buttons.length) % buttons.length], true);
        }
      });
    });

    select(buttons.find((b) => b.classList.contains('active')) ?? buttons[0]);
  }
}

/* Checklists keep their state per chapter. */
function checklists(root, chapterId) {
  const boxes = [...root.querySelectorAll('.check-list input[type="checkbox"], li input[type="checkbox"]')];
  if (!boxes.length) return;
  const checked = getChecks(chapterId);
  boxes.forEach((box, i) => {
    box.disabled = false;
    box.checked = checked.has(i);
    box.addEventListener('change', () => {
      if (box.checked) checked.add(i);
      else checked.delete(i);
      setChecks(chapterId, checked);
    });
  });
}

function links(root) {
  for (const a of root.querySelectorAll('a[href]')) {
    if (/^https?:\/\//.test(a.getAttribute('href')) && a.host !== location.host) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  }
}

/* ---------- lazy third-party renderers ---------- */

let katexReady;
function loadKatex() {
  katexReady ??= (async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = KATEX + 'katex.min.css';
    document.head.append(link);
    return (await import(KATEX + 'katex.mjs')).default;
  })();
  return katexReady;
}

async function math(root) {
  let katex;
  try {
    katex = await loadKatex();
  } catch {
    return; // offline: the TeX source stays readable
  }
  for (const el of root.querySelectorAll('.math:not([data-rendered])')) {
    el.dataset.rendered = '';
    const tex = el.textContent;
    try {
      katex.render(tex, el, {
        displayMode: el.classList.contains('math-display'),
        throwOnError: false,
        output: 'htmlAndMathml',
      });
      el.title = tex;
    } catch {
      el.textContent = tex;
    }
  }
}

async function mermaid(root) {
  try {
    const { default: m } = await import(MERMAID);
    const dark = document.documentElement.dataset.theme === 'dark' ||
      (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    m.initialize({ startOnLoad: false, theme: dark ? 'dark' : 'neutral' });
    const nodes = [];
    for (const code of root.querySelectorAll('code.language-mermaid')) {
      const div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = code.textContent;
      code.parentElement.replaceWith(div);
      nodes.push(div);
    }
    await m.run({ nodes });
  } catch {
    /* leave the source visible */
  }
}

/**
 * Highlight `terms` inside the section that starts at `heading` (or the
 * chapter intro when null) up to the next h2/h3, and return the first hit so
 * a search result lands on the actual match.
 */
export function highlightTerms(root, heading, terms) {
  if (!terms.length) return null;
  const re = new RegExp(terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gi');
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.parentElement.closest('.anchor, mark, .katex, svg, figcaption')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });
  walker.currentNode = heading ?? root;

  const hits = [];
  for (let n = walker.nextNode(); n && hits.length < 60; n = walker.nextNode()) {
    const h = n.parentElement.closest('h2, h3');
    if (h && h !== heading) break;
    re.lastIndex = 0;
    if (re.test(n.nodeValue)) hits.push(n);
  }

  let first = null;
  for (const textNode of hits) {
    const value = textNode.nodeValue;
    const frag = document.createDocumentFragment();
    let last = 0;
    for (const m of value.matchAll(re)) {
      frag.append(value.slice(last, m.index));
      const mark = document.createElement('mark');
      mark.className = 'search-hit';
      mark.textContent = m[0];
      frag.append(mark);
      first ??= mark;
      last = m.index + m[0].length;
    }
    frag.append(value.slice(last));
    textNode.replaceWith(frag);
  }
  // Prefer a hit in the body over the heading itself.
  return [...root.querySelectorAll('mark.search-hit')].find((m) => !m.closest('h2, h3')) ?? first;
}

export function clearHighlights(root) {
  for (const mark of root.querySelectorAll('mark.search-hit')) mark.replaceWith(mark.textContent);
  root.normalize();
}
