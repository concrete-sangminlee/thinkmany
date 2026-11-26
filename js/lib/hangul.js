/**
 * Korean-aware matching for search. A consonant typed on its own matches any
 * syllable that starts with it, so "ㄴㅁ" finds 논문 and so does the
 * half-typed "논ㅁ" a reader sees while the IME is still composing. The IME
 * then shows "논무" before "논문": with `open`, a final syllable typed without
 * its last consonant matches any syllable it can still become.
 */
const INITIALS = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const isConsonant = (c) => c >= 'ㄱ' && c <= 'ㅎ';

export const hasConsonant = (s) => /[ㄱ-ㅎ]/.test(s);

/** Initial consonant of a Hangul syllable ("논" -> "ㄴ"); other characters unchanged. */
export function initialOf(ch) {
  const code = ch.charCodeAt(0) - 0xac00;
  return code >= 0 && code < 11172 ? INITIALS[Math.floor(code / 588)] : ch;
}

const SYLLABLE = (c) => {
  const code = c.charCodeAt(0) - 0xac00;
  return code >= 0 && code < 11172 ? code : -1;
};

/** "무" can still become 묵, 문, 물...: same initial and vowel, any final consonant. */
const grows = (a, b) => {
  const x = SYLLABLE(a);
  const y = SYLLABLE(b);
  return y >= 0 && y % 28 === 0 && x >= 0 && Math.floor(x / 28) === Math.floor(y / 28);
};

/**
 * Index of `term` in `text` from `from`, both already lowercased; -1 if absent.
 * With `open`, the term's last syllable may still be missing its final consonant.
 */
export function findKo(text, term, from = 0, { open = false } = {}) {
  const last = term.length - 1;
  const tail = SYLLABLE(term[last] ?? '');
  const growing = open && term.length >= 2 && tail >= 0 && tail % 28 === 0; // ends in a syllable with no final consonant
  if (!hasConsonant(term) && !growing) return text.indexOf(term, from);
  outer: for (let i = from; i + term.length <= text.length; i++) {
    for (let j = 0; j < term.length; j++) {
      const a = text[i + j];
      const b = term[j];
      if (a === b || (isConsonant(b) && initialOf(a) === b) || (growing && j === last && grows(a, b))) continue;
      continue outer;
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
  terms.forEach((t, k) => {
    const opts = { open: k === terms.length - 1 }; // the term still being typed
    let i = findKo(lower, t, 0, opts);
    if (i === -1) {
      if (all) ranges.missing = true;
      return;
    }
    for (; i !== -1; i = findKo(lower, t, i + t.length, opts)) ranges.push([i, i + t.length]);
  });
  if (ranges.missing) return null;
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([...r]);
  }
  return merged;
}
