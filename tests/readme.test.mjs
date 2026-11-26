import test from 'node:test';
import assert from 'node:assert/strict';
import { createBook } from '../js/lib/book-model.js';
import { readmeBlocks, fillReadme, expectedReadme } from '../scripts/readme.mjs';

const book = createBook(
  {
    sections: [{ id: 'part-1', title: '하나', desc: '첫 파트.', subsections: [{ id: 'ch01', file: 'a.md', title: '가' }, { id: 'ch02', file: 'b.md', title: '나' }] }],
    paths: [{ title: '입문', chapters: ['ch02', 'ch01'] }],
  },
  { totals: { sections: 1234, chars: 123456, minutes: 150 }, chapters: { ch01: { minutes: 100 }, ch02: { minutes: 50 } } },
);

test('the generated blocks come from the book', () => {
  const b = readmeBlocks(book, 'https://x.test/b/');
  assert.equal(b.stats, '1개 파트 · 2개 장 · 1,234개 섹션 · 약 12만 자 (읽는 데 약 3시간)');
  assert.equal(b.paths, '- **입문**: [02 나](https://x.test/b/ch02/), [01 가](https://x.test/b/ch01/)');
  assert.match(b.toc, /<summary><b>Part 01\. 하나<\/b> \(2장 · 약 3시간\)<\/summary>\n\n첫 파트\.\n\n\| 장 \| 제목 \| 분량 \|/);
  assert.match(b.toc, /\| 01 \| \[가\]\(https:\/\/x\.test\/b\/ch01\/\) \| 100분 \|/);
});

test('only the marked blocks change, and a missing marker is an error', () => {
  const text = '머리\n<!-- generated:stats -->\n옛 숫자\n<!-- /generated:stats -->\n꼬리 <!-- generated:stats --> 아님\n';
  assert.equal(fillReadme(text, { stats: '새 숫자' }), '머리\n<!-- generated:stats -->\n새 숫자\n<!-- /generated:stats -->\n꼬리 <!-- generated:stats --> 아님\n');
  assert.throws(() => fillReadme('표시 없음', { toc: 'x' }), /generated:toc/);
});

test('README.md carries every marker (whether its numbers are current is a build warning, not a failure)', () => {
  const { current } = expectedReadme();
  for (const name of ['stats', 'paths', 'toc']) assert.ok(current.includes(`<!-- generated:${name} -->`), name);
});
