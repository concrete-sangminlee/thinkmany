import test from 'node:test';
import assert from 'node:assert/strict';
import { lintChapter, rawHeadings, dashLines } from '../js/lib/lint.js';
import { analyzeChapter } from '../js/lib/markdown.js';

const lint = (md) => lintChapter(md, analyzeChapter(md).outline);

test('a clean chapter passes', () => {
  assert.deepEqual(lint('# 리드\n\n## 하나\n\n본문\n\n### 둘\n\n<div class="card"><div class="card-title">이름표</div></div>\n'), { errors: [], warnings: [] });
});

test('the rules the build enforces, with lines where they are known', () => {
  const md = '# 리드\n\n## 하나\n\n#### 건너뜀\n\n# 본문의 h1\n\n<h4>카드 제목</h4>\n\n쉼표 대신 \u2014 줄표\n';
  const { errors } = lint(md);
  assert.equal(errors.length, 4);
  assert.match(errors[0].message, /제목 단계를 건너뜀 \(## 다음 ####\)/);
  assert.match(errors[1].message, /본문 중간의 # 제목 "본문의 h1"/);
  assert.deepEqual([errors[2].line, errors[3].line], [9, 11]);
  assert.match(errors[2].message, /HTML <h4>/);
  assert.match(errors[3].message, /긴 줄표/);
});

test('code is not checked for headings, and warnings do not block', () => {
  assert.deepEqual(rawHeadings('```html\n<h2>예시</h2>\n```\n'), []);
  assert.deepEqual(dashLines('a\nb \u2013 c\n'), [2]);
  const { errors, warnings } = lint('## 하나\n\n<div>\n\n<span id="x"></span><span id="x"></span>\n');
  assert.deepEqual(errors, []);
  assert.equal(warnings.length, 2);
});
