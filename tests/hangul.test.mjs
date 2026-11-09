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
