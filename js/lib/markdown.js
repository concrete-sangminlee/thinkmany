/**
 * Markdown pipeline shared by the browser and scripts/build-index.mjs.
 *
 * Heading ids, the chapter outline and the reading-time estimate all come
 * from here, so the generated content/index.json always agrees with what the
 * reader renders. Keep this module free of DOM APIs.
 */
import { Marked } from '../vendor/marked.esm.js';

/** Korean reading speed used for "약 N분" (non-whitespace characters per minute). */
export const CHARS_PER_MINUTE = 500;

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function decodeEntities(s) {
  return s.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m]);
}

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

const marked = new Marked({ gfm: true, breaks: false });

marked.use({
  extensions: [mathBlock, mathInline],
  renderer: {
    heading(token) {
      const inner = this.parser.parseInline(token.tokens);
      // The reader turns data-slug into an id after sanitizing (see render.js).
      const id = token.slug ? ` data-slug="${escapeHtml(token.slug)}"` : '';
      return `<h${token.depth}${id}>${inner}</h${token.depth}>\n`;
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
  marked.walkTokens(tokens, (t) => {
    if (t.type !== 'heading') return;
    const text = inlineText(t.tokens);
    const base = slugify(text) || 'section';
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    t.slug = n > 1 ? `${base}-${n}` : base;
    t.plain = text;
    if (t.depth === 2 || t.depth === 3) headings.push({ depth: t.depth, text, id: t.slug });
  });

  return { tokens, lead, headings };
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
  const { tokens, lead, headings } = lexChapter(md);
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

  return {
    lead,
    headings,
    sections,
    chars,
    minutes: Math.max(1, Math.round(chars / CHARS_PER_MINUTE)),
  };
}
