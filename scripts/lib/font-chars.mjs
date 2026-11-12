/**
 * The characters the reader's font has to cover: everything in the book and
 * in the reader's own interface. scripts/subset-font.py cuts the font down
 * to this set, and the build compares the same set against what the font
 * file actually holds (assets/fonts/thinkmany-sans.json).
 *
 *   node scripts/lib/font-chars.mjs     prints the set as a JSON string
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** Files whose text reaches the screen in the reader. */
const SOURCES = [
  { dir: 'content', match: /\.(md|json)$/ },
  { dir: 'templates', match: /^(page|404)\.html$/ },
  { dir: 'js', match: /\.js$/ },
  { dir: 'js/lib', match: /\.js$/ },
];

/**
 * Always included, whatever the book says today: printable ASCII, and the
 * Hangul consonants and vowels a reader types on the way to a syllable
 * (search also takes 초성 such as "ㄴㅁ").
 */
const ALWAYS = [
  [0x20, 0x7e],
  [0x3131, 0x3163],
];

export function neededChars(root = ROOT) {
  const set = new Set();
  for (const [from, to] of ALWAYS) for (let c = from; c <= to; c++) set.add(String.fromCodePoint(c));
  for (const { dir, match } of SOURCES) {
    const abs = path.join(root, dir);
    if (!fs.existsSync(abs)) continue;
    for (const name of fs.readdirSync(abs).sort()) {
      if (!match.test(name)) continue;
      for (const ch of fs.readFileSync(path.join(abs, name), 'utf8')) {
        const c = ch.codePointAt(0);
        // Skip controls, the BOM and lone surrogates: nothing to draw.
        if (c <= 0x20 || (c >= 0x7f && c <= 0xa0) || c === 0xfeff || (c >= 0xd800 && c <= 0xdfff)) continue;
        set.add(ch);
      }
    }
  }
  return [...set].sort((a, b) => a.codePointAt(0) - b.codePointAt(0)).join('');
}

/**
 * What the font file covers, from the JSON written next to it:
 * { chars, unavailable } (unavailable: needed, but the source font has no
 * glyph for it, so regenerating would not help). Null when there is no font.
 */
export function fontCoverage(root = ROOT) {
  try {
    const meta = JSON.parse(fs.readFileSync(path.join(root, 'assets/fonts/thinkmany-sans.json'), 'utf8'));
    if (!fs.existsSync(path.join(root, 'assets/fonts/thinkmany-sans.woff2'))) return null;
    return { chars: new Set(meta.chars), unavailable: new Set(meta.unavailable ?? '') };
  } catch {
    return null;
  }
}

/** Characters the site needs that the font file lacks but a fresh subset would have. */
export function missingChars(root = ROOT) {
  const coverage = fontCoverage(root);
  if (!coverage) return null;
  return [...neededChars(root)].filter((ch) => !coverage.chars.has(ch) && !coverage.unavailable.has(ch));
}

if (import.meta.url === `file://${process.argv[1]}`) process.stdout.write(JSON.stringify(neededChars()));
