/**
 * Markdown pipeline shared by the browser and scripts/build.mjs.
 *
 * Heading ids, the chapter outline, chapter cross-links and the reading-time
 * estimate all come from here, so the prerendered pages, content/index.json
 * and what the reader renders always agree. Keep this module free of DOM APIs.
 */
import { Marked } from '../vendor/marked.esm.js';
import { chapterHref } from './paths.js';
import { escapeHtml, decodeEntities } from './escape.js';

export { escapeHtml, decodeEntities };

/** Korean reading speed used for "약 N분" (non-whitespace characters per minute). */
export const CHARS_PER_MINUTE = 500;

function stripTags(s) {
  return s.replace(/<[^>]*>/g, ' ');
}

/** URL-safe-ish id that keeps Hangul: "3-Pass 읽기 방법" -> "3-pass-읽기-방법". */
export function slugify(text) {
  return text
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/[\s-]+/g, '-')
    .slice(0, 64)
    .replace(/^-+|-+$/g, '');
}

/* ------------------------------------------------------------------ */
/* Math: $inline$, $$display$$ and fenced $$ blocks.                  */
/* Rendered as escaped TeX; the reader upgrades them with KaTeX.      */
/* ------------------------------------------------------------------ */

const mathBlock = {
  name: 'mathBlock',
  level: 'block',
  start(src) {
    const m = /^ {0,3}\$\$/m.exec(src);
    return m ? m.index : undefined;
  },
  tokenizer(src) {
    const m = /^ {0,3}\$\$([\s\S]+?)\$\$[ \t]*(?:\n+|$)/.exec(src);
    if (m) return { type: 'mathBlock', raw: m[0], text: m[1].trim() };
    return undefined;
  },
  renderer(token) {
    return `<div class="math math-display">${escapeHtml(token.text)}</div>\n`;
  },
};

const mathInline = {
  name: 'mathInline',
  level: 'inline',
  start(src) {
    const i = src.indexOf('$');
    return i < 0 ? undefined : i;
  },
  tokenizer(src) {
    let m = /^\$\$(?!\$)([^\n]+?)\$\$/.exec(src);
    if (m) return { type: 'mathInline', raw: m[0], text: m[1].trim(), display: true };
    // Pandoc rule: no space after the opening $, none before the closing $,
    // and the closing $ is not followed by a digit (keeps "$5-$10" as text).
    m = /^\$(?![\s$])((?:\\\$|[^$\n])+?)(?<![\s\\])\$(?!\d)/.exec(src);
    if (m) return { type: 'mathInline', raw: m[0], text: m[1], display: false };
    return undefined;
  },
  renderer(token) {
    return `<span class="math${token.display ? ' math-display' : ''}">${escapeHtml(token.text)}</span>`;
  },
};

/* ------------------------------------------------------------------ */
/* Chapter references: "ch05" in prose becomes a link to that chapter. */
/* ------------------------------------------------------------------ */

let refs = { titles: new Map(), current: '' };

/** Tell the pipeline which chapters exist and which one is being rendered. */
export function configureChapterRefs({ titles = new Map(), current = '' } = {}) {
  refs = { titles, current };
}

/** A mention like "ch05" (not part of a word, path, anchor or file name). */
const REF = /(?<![A-Za-z0-9_./#-])ch\d{2}(?![A-Za-z0-9_-])/;
const REF_ALL = new RegExp(REF.source, 'g');

const isRef = (id) => refs.titles.has(id) && id !== refs.current;

function refLink(id) {
  return `<a class="xref" href="${escapeHtml(chapterHref(id))}" title="${escapeHtml(refs.titles.get(id))}">${id}</a>`;
}

const chapterRef = {
  name: 'chapterRef',
  level: 'inline',
  start(src) {
    return REF.exec(src)?.index;
  },
  tokenizer(src) {
    if (this.lexer.state.inLink) return undefined;
    const m = /^ch\d{2}(?![A-Za-z0-9_-])/.exec(src);
    if (!m || !isRef(m[0])) return undefined;
    return { type: 'chapterRef', raw: m[0], text: m[0], id: m[0] };
  },
  renderer(token) {
    return refLink(token.id);
  },
};

/** Elements whose text is never linked: existing links and code. */
const NO_LINK = /^<(\/?)(a|code|pre|kbd|samp|script|style|textarea)\b/i;

/**
 * Link chapter mentions in a raw HTML block (markdown isn't parsed inside
 * one, so the inline extension above never sees them). Only text between
 * tags changes; attributes, links and code stay as they are. onRef is
 * called with each linked id.
 */
function linkHtmlRefs(html, onRef = () => {}) {
  let skip = 0;
  return html
    .split(/(<[^>]*>)/)
    .map((part, i) => {
      if (i % 2) {
        const m = NO_LINK.exec(part);
        if (m && !part.endsWith('/>')) skip = Math.max(0, skip + (m[1] ? -1 : 1));
        return part;
      }
      if (skip) return part;
      return part.replace(REF_ALL, (id) => {
        if (!isRef(id)) return id;
        onRef(id);
        return refLink(id);
      });
    })
    .join('');
}

/* ------------------------------------------------------------------ */

const marked = new Marked({ gfm: true, breaks: false });

marked.use({
  extensions: [mathBlock, mathInline, chapterRef],
  renderer: {
    heading(token) {
      const inner = this.parser.parseInline(token.tokens);
      // The reader turns data-slug into an id after sanitizing (see enhance.js).
      const id = token.slug ? ` data-slug="${escapeHtml(token.slug)}"` : '';
      return `<h${token.depth}${id}>${inner}</h${token.depth}>\n`;
    },
    html(token) {
      return token.block ? linkHtmlRefs(token.text) : token.text;
    },
  },
});

/** Plain text of an inline token list (used for heading labels). */
function inlineText(tokens = []) {
  let out = '';
  for (const t of tokens) {
    if (t.type === 'html' || t.type === 'br') continue;
    out += t.tokens ? inlineText(t.tokens) : (t.text ?? '');
  }
  return decodeEntities(out).replace(/\s+/g, ' ').trim();
}

/** Plain text of any block token, for search and character counts. */
export function tokenText(t) {
  switch (t.type) {
    case 'space':
    case 'hr':
      return '';
    case 'html':
      return decodeEntities(stripTags(t.raw ?? t.text ?? ''));
    case 'code':
    case 'mathBlock':
    case 'mathInline':
    case 'codespan':
      return t.text ?? '';
    case 'list':
      return t.items.map(tokenText).join('\n');
    case 'table':
      return [t.header, ...t.rows]
        .map((row) => row.map((cell) => tokenText({ type: 'cell', tokens: cell.tokens })).join(' '))
        .join('\n');
    default:
      if (t.tokens) return t.tokens.map(tokenText).join(t.type === 'blockquote' || t.type === 'list_item' ? '\n' : '');
      return decodeEntities(stripTags(t.text ?? ''));
  }
}

/**
 * Lex a chapter. Pulls a leading "# Title" out as the chapter lead (it is a
 * hook line, the real title lives in config.json) and gives every heading a
 * stable, de-duplicated id.
 */
export function lexChapter(md) {
  const tokens = marked.lexer(md.replace(/\r\n?/g, '\n'));

  let lead = '';
  const first = tokens.findIndex((t) => t.type !== 'space');
  if (first !== -1 && tokens[first].type === 'heading' && tokens[first].depth === 1) {
    lead = inlineText(tokens[first].tokens);
    tokens.splice(first, 1);
  }

  const seen = new Map();
  const headings = [];
  const outline = []; // every heading, any depth, in document order
  marked.walkTokens(tokens, (t) => {
    if (t.type !== 'heading') return;
    const text = inlineText(t.tokens);
    const base = slugify(text) || 'section';
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    t.slug = n > 1 ? `${base}-${n}` : base;
    t.plain = text;
    if (t.depth === 2 || t.depth === 3) headings.push({ depth: t.depth, text, id: t.slug });
    outline.push({ depth: t.depth, text });
  });

  return { tokens, lead, headings, outline };
}

/** Render lexed tokens to (unsanitized) HTML. */
export function renderTokens(tokens) {
  return marked.parser(tokens);
}

/**
 * Split a chapter into searchable sections (one per h2/h3) and count the
 * readable characters (code excluded) for the reading-time estimate.
 */
export function analyzeChapter(md) {
  const { tokens, lead, headings, outline } = lexChapter(md);
  const sections = [{ id: '', title: '', text: '' }];
  let chars = 0;

  for (const t of tokens) {
    if (t.type === 'heading' && (t.depth === 2 || t.depth === 3)) {
      sections.push({ id: t.slug, title: t.plain, text: '' });
      chars += t.plain.replace(/\s/g, '').length;
      continue;
    }
    const text = tokenText(t);
    if (!text) continue;
    sections[sections.length - 1].text += text + '\n';
    if (t.type !== 'code') chars += text.replace(/\s/g, '').length;
  }

  for (const s of sections) s.text = s.text.replace(/[ \t]+/g, ' ').replace(/\n{2,}/g, '\n').trim();
  if (!sections[0].text) sections.shift();

  // Chapters this one mentions (needs configureChapterRefs), most mentioned first.
  const counts = new Map();
  const count = (id) => counts.set(id, (counts.get(id) ?? 0) + 1);
  marked.walkTokens(tokens, (t) => {
    if (t.type === 'chapterRef') count(t.id);
    else if (t.type === 'html' && t.block) linkHtmlRefs(t.text, count);
  });
  const refs = [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([id]) => id);

  return {
    lead,
    headings,
    outline,
    sections,
    refs,
    chars,
    minutes: Math.max(1, Math.round(chars / CHARS_PER_MINUTE)),
  };
}
