/**
 * Book model shared by the browser and the build: content/config.json
 * (structure, edited from /admin) merged with content/index.json (outline,
 * reading times and last-update dates generated at build time).
 */
const LEGACY_PART_IDS = { 'tools-software': 'part-4' };

export function createBook(config, index = null) {
  const chapters = [];
  const parts = config.sections.map((s, pi) => {
    const part = {
      id: s.id,
      number: s.number ?? String(pi + 1).padStart(2, '0'),
      title: s.title,
      desc: s.desc ?? '',
      color: s.color ?? 'purple',
      chapters: [],
    };
    for (const sub of s.subsections) {
      const meta = index?.chapters?.[sub.id];
      const ch = {
        id: sub.id,
        file: sub.file,
        title: sub.title,
        part,
        num: /^ch(\d+)$/.exec(sub.id)?.[1] ?? '',
        lead: meta?.lead ?? '',
        summary: meta?.summary ?? '',
        minutes: meta?.minutes ?? null,
        updated: meta?.updated ?? '',
        toc: (meta?.toc ?? []).map(([depth, text, id]) => ({ depth, text, id })),
        refs: meta?.refs ?? [],
        backrefs: [],
        order: chapters.length,
      };
      chapters.push(ch);
      part.chapters.push(ch);
    }
    return part;
  });

  const byId = new Map(chapters.map((c) => [c.id, c]));
  // The reference graph: c.refs = chapters c mentions, c.backrefs = chapters that mention c.
  for (const c of chapters) {
    c.refs = c.refs.map((id) => byId.get(id)).filter(Boolean);
    for (const r of c.refs) r.backrefs.push(c);
  }
  const partById = new Map(parts.map((p) => [p.id, p]));
  const recent = chapters
    .filter((c) => c.updated)
    .sort((a, b) => b.updated.localeCompare(a.updated) || a.order - b.order)
    .slice(0, 6);

  return {
    siteUrl: config.siteUrl ?? '',
    parts,
    chapters,
    recent,
    paths: (config.paths ?? []).map((p) => ({ ...p, chapters: p.chapters.map((id) => byId.get(id)).filter(Boolean) })),
    totals: index?.totals ?? null,
    titles: new Map(chapters.map((c) => [c.id, c.title])),
    chapter: (id) => byId.get(id) ?? null,
    part: (id) => partById.get(LEGACY_PART_IDS[id] ?? id) ?? null,
    prev: (ch) => chapters[ch.order - 1] ?? null,
    next: (ch) => chapters[ch.order + 1] ?? null,
  };
}
