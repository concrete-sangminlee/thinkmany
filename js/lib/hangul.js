/**
 * Korean-aware matching for search. A consonant typed on its own matches any
 * syllable that starts with it, so "ㄴㅁ" finds 논문 and so does the
 * half-typed "논ㅁ" a reader sees while the IME is still composing.
 */
const INITIALS = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const isConsonant = (c) => c >= 'ㄱ' && c <= 'ㅎ';

export const hasConsonant = (s) => /[ㄱ-ㅎ]/.test(s);

/** Initial consonant of a Hangul syllable ("논" -> "ㄴ"); other characters unchanged. */
export function initialOf(ch) {
  const code = ch.charCodeAt(0) - 0xac00;
  return code >= 0 && code < 11172 ? INITIALS[Math.floor(code / 588)] : ch;
}

/** Index of `term` in `text` from `from`, both already lowercased; -1 if absent. */
export function findKo(text, term, from = 0) {
  if (!hasConsonant(term)) return text.indexOf(term, from);
  outer: for (let i = from; i + term.length <= text.length; i++) {
    for (let j = 0; j < term.length; j++) {
      const a = text[i + j];
      const b = term[j];
      if (a !== b && !(isConsonant(b) && initialOf(a) === b)) continue outer;
    }
    return i;
  }
  return -1;
}

/**
 * Sorted, merged [start, end) ranges where the terms occur in `text`.
 * With `all` (the default) returns null unless every term occurs.
 */
export function matchRanges(text, terms, { all = true } = {}) {
  const lower = text.toLowerCase();
  const ranges = [];
  for (const t of terms) {
    let i = findKo(lower, t);
    if (i === -1) {
      if (all) return null;
      continue;
    }
    for (; i !== -1; i = findKo(lower, t, i + t.length)) ranges.push([i, i + t.length]);
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([...r]);
  }
  return merged;
}
