/**
 * Full-text search over chapter sections: scoring and snippets. Pure, so the
 * worker (js/search-worker.js) and the tests share it.
 *
 * A section matches when it contains every term. Its score counts how often
 * the terms appear (at most 20 times each) and adds a bonus for a term in
 * the section title; ties keep book order.
 */
const TITLE_BONUS = 15;
const MAX_COUNT = 20;

/** Split a query into lower-case terms. */
export const queryTerms = (q) => q.toLowerCase().split(/\s+/).filter(Boolean);

/** A searchable section: { ch, order, id, title, text } plus a lower-cased copy. */
export function makeSection(ch, order, s) {
  return { ch, order, id: s.id, title: s.title, text: s.text, lower: `${s.title}\n${s.text}`.toLowerCase(), titleLower: s.title.toLowerCase() };
}

/** Up to about 140 characters of `text` around the first term found. */
export function snippet(text, terms) {
  const lower = text.toLowerCase();
  let at = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1 && (at === -1 || i < at)) at = i;
  }
  if (at === -1) return text.slice(0, 120).replace(/\s+/g, ' ');
  const start = Math.max(0, at - 50);
  const end = Math.min(text.length, at + 90);
  return (start > 0 ? '…' : '') + text.slice(start, end).replace(/\s+/g, ' ') + (end < text.length ? '…' : '');
}

export function search(sections, q, limit = 40) {
  const terms = queryTerms(q);
  if (!terms.length) return { total: 0, results: [] };
  const hits = [];
  for (const s of sections) {
    let score = 0;
    let ok = true;
    for (const t of terms) {
      const first = s.lower.indexOf(t);
      if (first === -1) {
        ok = false;
        break;
      }
      let count = 0;
      for (let i = first; i !== -1 && count < MAX_COUNT; i = s.lower.indexOf(t, i + t.length)) count++;
      score += count + (s.titleLower.includes(t) ? TITLE_BONUS : 0);
    }
    if (ok) hits.push({ s, score });
  }
  hits.sort((a, b) => b.score - a.score || a.s.order - b.s.order);
  return {
    total: hits.length,
    results: hits.slice(0, limit).map(({ s }) => ({ ch: s.ch, id: s.id, title: s.title, snippet: snippet(s.text, terms) })),
  };
}
