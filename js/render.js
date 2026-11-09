/**
 * Client-side chapter rendering: markdown -> sanitized HTML. Loaded only when
 * the reader opens a chapter in-app (prerendered pages never need it).
 */
import DOMPurify from './vendor/purify.es.mjs';
import { lexChapter, renderTokens, configureChapterRefs } from './lib/markdown.js';

export function renderMarkdown(md, { titles, current }) {
  configureChapterRefs({ titles, current });
  const { tokens, lead, headings } = lexChapter(md);
  const html = DOMPurify.sanitize(renderTokens(tokens));
  return { html, lead, headings };
}
