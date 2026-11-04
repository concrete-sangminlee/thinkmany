/**
 * Book model: content/config.json (structure, edited from /admin) merged with
 * content/index.json (generated outline and reading times).
 */
const LEGACY_PART_IDS = { 'tools-software': 'part-4' };

export async function loadBook() {
  const [config, index] = await Promise.all([
    fetchJSON('content/config.json'),
    fetchJSON('content/index.json').catch(() => null),
  ]);

  const chapters = [];
  const parts = config.sections.map((s, pi) => {
    const part = { id: s.id, number: s.number ?? String(pi + 1).padStart(2, '0'), title: s.title, desc: s.desc ?? '', color: s.color ?? 'purple', chapters: [] };
    for (const sub of s.subsections) {
      const meta = index?.chapters?.[sub.id];
      const ch = {
        id: sub.id,
        file: sub.file,
        title: sub.title,
        part,
        num: /^ch(\d+)$/.exec(sub.id)?.[1] ?? '',
        lead: meta?.lead ?? '',
        minutes: meta?.minutes ?? null,
        toc: (meta?.toc ?? []).map(([depth, text, id]) => ({ depth, text, id })),
        order: chapters.length,
      };
      chapters.push(ch);
      part.chapters.push(ch);
    }
    return part;
  });

  const byId = new Map(chapters.map((c) => [c.id, c]));
  const partById = new Map(parts.map((p) => [p.id, p]));

  return {
    parts,
    chapters,
    paths: (config.paths ?? []).map((p) => ({ ...p, chapters: p.chapters.map((id) => byId.get(id)).filter(Boolean) })),
    totals: index?.totals ?? null,
    chapter: (id) => byId.get(id) ?? null,
    part: (id) => partById.get(LEGACY_PART_IDS[id] ?? id) ?? null,
    prev: (ch) => chapters[ch.order - 1] ?? null,
    next: (ch) => chapters[ch.order + 1] ?? null,
  };
}

const cache = new Map();

/** Fetch a chapter's markdown once per session. */
export function fetchChapter(ch) {
  if (!cache.has(ch.id)) {
    const p = fetch(`content/${ch.file}`).then((r) => {
      if (!r.ok) throw new Error(`${r.status} ${ch.file}`);
      return r.text();
    });
    p.catch(() => cache.delete(ch.id));
    cache.set(ch.id, p);
  }
  return cache.get(ch.id);
}

async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}
