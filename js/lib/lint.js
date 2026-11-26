/**
 * The house rules for a chapter's markdown, shared by the build
 * (scripts/lib/book-data.mjs, which fails on errors) and the admin page
 * (which refuses to save what the build would reject).
 *
 *   lintChapter(md, outline) -> { errors: [{ line?, message }], warnings: [...] }
 *
 * `outline` is analyzeChapter(md).outline from js/lib/markdown.js: every
 * heading, any depth, in document order.
 */
const DASH = /[\u2013\u2014]/;

/** Raw HTML heading tags outside fenced code: [{ line, tag }]. */
export function rawHeadings(md) {
  const out = [];
  let fence = false;
  md.split('\n').forEach((l, i) => {
    if (/^\s*(```|~~~)/.test(l)) fence = !fence;
    else if (!fence) for (const m of l.matchAll(/<(h[1-6])[\s>]/gi)) out.push({ line: i + 1, tag: m[1].toLowerCase() });
  });
  return out;
}

export function countOutsideCode(md, re) {
  const prose = md.replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, '');
  return (prose.match(re) ?? []).length;
}

/** Lines with an em dash or en dash (the house style uses commas, colons or brackets). */
export function dashLines(text) {
  const out = [];
  text.split('\n').forEach((l, i) => DASH.test(l) && out.push(i + 1));
  return out;
}

export function lintChapter(md, outline) {
  const errors = [];
  const warnings = [];
  if (!md.trim()) warnings.push({ message: '내용이 비어 있음' });

  const opens = countOutsideCode(md, /<div\b/gi);
  const closes = countOutsideCode(md, /<\/div>/gi);
  if (opens !== closes) warnings.push({ message: `<div> ${opens}개 / </div> ${closes}개, 짝이 맞지 않음` });

  // Headings: the page title is the h1, sections go ## then ###, never skipping a level.
  // Card, Do/Don't and tab titles are labels (class="card-title" etc.), not headings.
  let prev = 1;
  for (const h of outline) {
    if (h.depth === 1) errors.push({ message: `본문 중간의 # 제목 "${h.text}" (장 제목이 h1이므로 ##부터 쓰세요)` });
    else if (h.depth > prev + 1) errors.push({ message: `제목 단계를 건너뜀 (${'#'.repeat(prev)} 다음 ${'#'.repeat(h.depth)}) "${h.text}"` });
    prev = h.depth;
  }
  for (const { line, tag } of rawHeadings(md)) {
    errors.push({ line, message: `HTML <${tag}> 제목 대신 class="card-title", "do-dont-title", "tab-title" 같은 이름표를 쓰세요` });
  }
  for (const line of dashLines(md)) {
    errors.push({ line, message: '긴 줄표(U+2014, U+2013) 사용 금지, 쉼표·콜론·괄호로 바꾸세요' });
  }

  const ids = [...md.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupIds.length) warnings.push({ message: `중복 HTML id ${[...new Set(dupIds)].join(', ')}` });
  return { errors, warnings };
}
