import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { neededChars, fontCoverage, missingChars } from '../scripts/lib/font-chars.mjs';
import { fontTags } from '../scripts/build.mjs';

const ROOT = new URL('..', import.meta.url).pathname;

/** A throwaway site root with one chapter and a font that covers `chars`. */
function fakeRoot(text, meta) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'thinkmany-font-'));
  fs.mkdirSync(path.join(root, 'content'));
  fs.mkdirSync(path.join(root, 'assets/fonts'), { recursive: true });
  fs.writeFileSync(path.join(root, 'content/ch01-x.md'), text);
  if (meta) {
    fs.writeFileSync(path.join(root, 'assets/fonts/thinkmany-sans.json'), JSON.stringify(meta));
    fs.writeFileSync(path.join(root, 'assets/fonts/thinkmany-sans.woff2'), 'wOF2');
  }
  return root;
}

test('neededChars: the book, ASCII and typed jamo, once each, in code point order', () => {
  const chars = [...neededChars(fakeRoot('연구 많이 된다\n\t연구 😀'))];
  for (const ch of ['A', '~', ' ', 'ㄴ', 'ㅏ', '연', '많', '😀']) assert.ok(chars.includes(ch), ch);
  assert.ok(!chars.includes('\n') && !chars.includes('\t'), 'no control characters');
  assert.equal(new Set(chars).size, chars.length);
  assert.deepEqual(chars, [...chars].sort((a, b) => a.codePointAt(0) - b.codePointAt(0)));
});

test('missingChars: what a rebuilt font would add, and nothing the source font lacks', () => {
  const text = '가나다 😀';
  const all = neededChars(fakeRoot(text));
  const without = (drop) => [...all].filter((ch) => !drop.includes(ch)).join('');
  assert.deepEqual(missingChars(fakeRoot(text, { chars: all })), []);
  assert.deepEqual(missingChars(fakeRoot(text, { chars: without('다😀') })), ['다', '😀']);
  assert.deepEqual(missingChars(fakeRoot(text, { chars: without('다😀'), unavailable: '😀' })), ['다']);
  assert.equal(missingChars(fakeRoot(text)), null, 'no font file at all');
});

test('fontTags: own font alone when it covers everything, CDN Pretendard as a fallback otherwise', () => {
  const own = fontTags('/book/', []);
  assert.match(own, /^<link rel="preload" href="\/book\/assets\/fonts\/thinkmany-sans\.woff2" as="font" type="font\/woff2" crossorigin>$/);
  const gaps = fontTags('/book/', ['뷁']);
  assert.ok(gaps.startsWith(own) && gaps.includes('pretendardvariable-dynamic-subset.min.css'));
  const none = fontTags('/book/', null);
  assert.ok(!none.includes('thinkmany-sans') && none.includes('pretendardvariable-dynamic-subset.min.css'));
});

test('the shipped font: one small woff2, renamed, with its license', () => {
  const font = fs.readFileSync(path.join(ROOT, 'assets/fonts/thinkmany-sans.woff2'));
  assert.equal(font.subarray(0, 4).toString('latin1'), 'wOF2');
  assert.ok(font.length < 300 * 1024, `${font.length} bytes`);
  const meta = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/fonts/thinkmany-sans.json'), 'utf8'));
  assert.ok(!/pretendard/i.test(meta.family), 'a modified OFL font may not use the reserved name');
  assert.ok([...meta.chars].length > 1000);
  const coverage = fontCoverage(ROOT);
  for (const ch of ['가', 'A', '0', '.', 'ㄱ']) assert.ok(coverage.chars.has(ch), ch);
  assert.match(fs.readFileSync(path.join(ROOT, 'assets/fonts/OFL.txt'), 'utf8'), /SIL OPEN FONT LICENSE Version 1\.1/);
});
