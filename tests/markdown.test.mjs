import test from 'node:test';
import assert from 'node:assert/strict';
import { slugify, lexChapter, renderTokens, analyzeChapter, configureChapterRefs } from '../js/lib/markdown.js';
import { setBase } from '../js/lib/paths.js';
import { html } from '../js/lib/html.js';

const render = (md) => renderTokens(lexChapter(md).tokens);

test('slugify keeps Hangul and drops punctuation', () => {
  assert.equal(slugify('3-Pass 읽기 방법'), '3-pass-읽기-방법');
  assert.equal(slugify('마지막: 지원은 박사 학위의 첫 시험이다'), '마지막-지원은-박사-학위의-첫-시험이다');
  assert.equal(slugify('**IF**의 한계 (2년)'), 'if의-한계-2년');
});

test('a leading "# title" becomes the chapter lead, not a heading', () => {
  const { lead, headings } = lexChapter('# 논문에도 종류가 있다\n\n본문\n\n## 첫 섹션\n\n### 하위\n');
  assert.equal(lead, '논문에도 종류가 있다');
  assert.deepEqual(headings.map((h) => [h.depth, h.id]), [[2, '첫-섹션'], [3, '하위']]);
});

test('outline lists every heading level in order', () => {
  const { outline } = lexChapter('# 리드\n\n## 둘\n\n#### 넷\n\n### 셋\n');
  assert.deepEqual(outline.map((h) => h.depth), [2, 4, 3]);
});

test('duplicate headings get unique ids', () => {
  const { headings } = lexChapter('## 체크리스트\n\n## 체크리스트\n');
  assert.deepEqual(headings.map((h) => h.id), ['체크리스트', '체크리스트-2']);
});

test('inline and display math are tokenized, prices are not', () => {
  assert.match(render('계수 $k = 45.3 \\pm 2.1$ 이다'), /<span class="math">k = 45.3 \\pm 2.1<\/span>/);
  assert.match(render('$$\nJ(\\theta) = \\sum_i x_i\n$$\n'), /<div class="math math-display">J\(\\theta\) = \\sum_i x_i<\/div>/);
  assert.doesNotMatch(render('가격은 $5-$10 사이'), /class="math"/);
  assert.doesNotMatch(render('`$HOME` 경로'), /class="math"/);
});

test('chapter references link to existing chapters only', () => {
  setBase('/thinkmany/');
  configureChapterRefs({ titles: new Map([['ch05', '논문 읽기의 기술'], ['ch27', '교과서']]), current: 'ch27' });
  const out = render('ch05에서 보았듯이, ch27 자신, ch99 없음, `ch05` 코드, content/ch05-x.md, [ch05 링크](https://x.y)');
  configureChapterRefs();
  assert.match(out, /<a class="xref" href="\/thinkmany\/ch05\/" title="논문 읽기의 기술">ch05<\/a>에서/);
  assert.equal((out.match(/class="xref"/g) ?? []).length, 1);
});

test('chapter references inside raw HTML blocks link too, but not in tags, links or code', () => {
  setBase('/thinkmany/');
  configureChapterRefs({ titles: new Map([['ch05', '다섯'], ['ch06', '여섯'], ['ch07', '일곱']]), current: 'ch07' });
  const md = '<div class="card" data-x="ch05">\n정신 건강(ch05), <code>ch06</code>, <a href="#a">ch06</a>, ch07 자신, ch99<br>ch06\n</div>\n';
  const out = render(md);
  const { refs } = analyzeChapter(md);
  configureChapterRefs();
  assert.match(out, /^<div class="card" data-x="ch05">/);
  assert.match(out, /정신 건강\(<a class="xref" href="\/thinkmany\/ch05\/" title="다섯">ch05<\/a>\)/);
  assert.match(out, /<code>ch06<\/code>, <a href="#a">ch06<\/a>, ch07 자신, ch99<br><a class="xref"[^>]*>ch06<\/a>/);
  assert.equal((out.match(/class="xref"/g) ?? []).length, 2);
  assert.deepEqual(refs, ['ch05', 'ch06'], 'raw HTML mentions count in the reference graph');
});

test('analyzeChapter lists referenced chapters, most mentioned first', () => {
  configureChapterRefs({ titles: new Map([['ch01', 'a'], ['ch02', 'b'], ['ch03', 'c']]), current: 'ch03' });
  const { refs } = analyzeChapter('ch02와 ch01, 다시 ch02. ch03은 자기 자신.');
  configureChapterRefs();
  assert.deepEqual(refs, ['ch02', 'ch01']);
});

test('analyzeChapter splits sections and counts readable characters', () => {
  const info = analyzeChapter('# 리드\n\n들어가며 문단.\n\n## 하나\n\n가나다라\n\n```\ncode is not counted\n```\n');
  assert.deepEqual(info.sections.map((s) => s.id), ['', '하나']);
  assert.equal(info.chars, '들어가며문단.'.length + '하나'.length + '가나다라'.length);
  assert.equal(info.minutes, 1);
});

test('html template escapes values and keeps nested templates', () => {
  const name = '<b>"x"</b>';
  assert.equal(String(html`<p title="${name}">${html`<i>${name}</i>`}</p>`), '<p title="&lt;b&gt;&quot;x&quot;&lt;/b&gt;"><i>&lt;b&gt;&quot;x&quot;&lt;/b&gt;</i></p>');
});
