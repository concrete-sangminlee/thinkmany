import test from 'node:test';
import assert from 'node:assert/strict';
import { makeSection, search, snippet, queryTerms } from '../js/lib/search-core.js';

const sections = [
  makeSection('ch01', 0, { id: 'a', title: '지도교수와 첫 면담', text: '면담 전에 질문을 정리한다.' }),
  makeSection('ch02', 1, { id: 'b', title: '연구 노트', text: '지도교수 지도교수 지도교수에게 매주 보고한다. 지도교수의 피드백.' }),
  makeSection('ch03', 2, { id: 'c', title: '실험 계획', text: '장비 예약과 지도교수 승인.' }),
  makeSection('ch04', 3, { id: '', title: '', text: 'Python의 numpy.random.seed(42)로 시드를 고정한다.' }),
];

test('every term must appear; title hits outrank body repetition; ties keep book order', () => {
  const r = search(sections, '지도교수');
  assert.equal(r.total, 3);
  assert.deepEqual(r.results.map((x) => x.ch), ['ch01', 'ch02', 'ch03']);
  assert.deepEqual(search(sections, '지도교수 승인').results.map((x) => x.ch), ['ch03']);
  assert.equal(search(sections, '지도교수 없는말').total, 0);
});

test('queries are case-insensitive and treat regex characters literally', () => {
  assert.deepEqual(search(sections, 'PYTHON').results.map((x) => x.ch), ['ch04']);
  assert.equal(search(sections, 'seed(42)').total, 1);
  assert.equal(search(sections, '.*').total, 0);
  assert.equal(search(sections, '   ').total, 0);
  assert.deepEqual(queryTerms('  A  b '), ['a', 'b']);
});

test('snippets centre on the first term and mark cut ends', () => {
  const long = `${'가'.repeat(100)} 핵심 문장 ${'나'.repeat(200)}`;
  const s = snippet(long, ['핵심']);
  assert.ok(s.startsWith('…') && s.endsWith('…') && s.includes('핵심 문장'));
  assert.ok(s.length < 150);
  assert.equal(snippet('짧은 글', ['없음']), '짧은 글');
});

test('the result limit caps the list but not the count', () => {
  const many = Array.from({ length: 60 }, (_, i) => makeSection(`ch${i}`, i, { id: `s${i}`, title: '', text: '논문' }));
  const r = search(many, '논문', 40);
  assert.equal(r.total, 60);
  assert.equal(r.results.length, 40);
});
