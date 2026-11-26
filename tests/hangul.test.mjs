import test from 'node:test';
import assert from 'node:assert/strict';
import { initialOf, findKo, matchRanges, hasConsonant } from '../js/lib/hangul.js';

test('initialOf gives the initial consonant of a syllable', () => {
  assert.equal(initialOf('논'), 'ㄴ');
  assert.equal(initialOf('까'), 'ㄲ');
  assert.equal(initialOf('힣'), 'ㅎ');
  assert.equal(initialOf('a'), 'a');
});

test('consonants match syllables, syllables match exactly', () => {
  assert.equal(findKo('논문 읽기', 'ㄴㅁ'), 0);
  assert.equal(findKo('논문 읽기', '논ㅁ'), 0, 'half-typed syllable while composing');
  assert.equal(findKo('논문 읽기', 'ㅇㄱ'), 3);
  assert.equal(findKo('지도교수', 'ㄱㅅ'), 2);
  assert.equal(findkoMiss(), -1);
  assert.equal(findKo('pinn 디버깅', 'pinn'), 0, 'plain terms use indexOf');
});

function findkoMiss() {
  return findKo('논문', 'ㄱ');
}

test('matchRanges needs every term unless asked for any', () => {
  assert.deepEqual(matchRanges('논문 읽기의 기술', ['ㄴㅁ', 'ㄱㅅ']), [[0, 2], [7, 9]]);
  assert.equal(matchRanges('논문', ['ㄴㅁ', 'zz']), null);
  assert.deepEqual(matchRanges('논문', ['ㄴㅁ', 'zz'], { all: false }), [[0, 2]]);
  assert.deepEqual(matchRanges('Zotero와 zotero', ['zotero']), [[0, 6], [8, 14]], 'case-insensitive, every occurrence');
  assert.deepEqual(matchRanges('논문논문', ['논', '논문']), [[0, 4]], 'overlaps are merged');
});

test('hasConsonant spots bare consonants only', () => {
  assert.ok(hasConsonant('논ㅁ'));
  assert.ok(!hasConsonant('논문'));
  assert.ok(!hasConsonant('PINN'));
});

test('while composing, the last syllable may still gain its final consonant', () => {
  assert.equal(findKo('논문 읽기', '논무', 0, { open: true }), 0, '논무 on the way to 논문');
  assert.equal(findKo('논문 읽기', '논무'), -1, 'only when asked');
  assert.equal(findKo('번아웃', '번아우', 0, { open: true }), 0);
  assert.equal(findKo('학회', '하', 0, { open: true }), -1, 'one syllable alone stays exact');
  assert.equal(findKo('논문', '논마', 0, { open: true }), -1, 'a different vowel does not match');
  assert.deepEqual(matchRanges('논문 읽기의 기술', ['읽기', '기수']), [[3, 5], [7, 9]], 'only the last term is open');
  assert.equal(matchRanges('논문 읽기', ['논무', '읽기']), null, 'earlier terms are complete');
});
