// A photograph can belong to a work and to several documentary albums.
// Keep those contexts together; a PDF page is a separate photographic record.
export const normalize = (value) =>
  String(value ?? "")
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
export const archiveSections = [
  ["obra", "Obra propia"],
  ["infantil", "Obras infantiles"],
  ["talleres", "Talleres"],
  ["formacion", "Formación docente"],
  ["exposiciones", "Exposiciones"],
];
export function buildPhotoIndex(works, albums) {
  const index = new Map();
  for (const item of [...works, ...albums]) {
    const own = Boolean(item.category);
    const scope = own
      ? "obra"
      : item.section === "obras"
        ? "infantil"
        : item.section;
    const owner = {
      id: item.id,
      label: item.label || item.title,
      path: `/${own ? "obra" : "archivo"}/${item.id}`,
      scope,
      discipline: item.category || "",
      series: item.series || "",
      credit: own ? "Obra de ENRIQUE SEGARRA I GARIBO" : item.credit || "",
      place: item.place || "",
      date: item.date || "",
      reference: item.reference || "",
    };
    for (const p of item.gallery) {
      const key = p.sourcePage
        ? `${p.archiveId}:p${p.sourcePage}`
        : p.contentKey || p.archiveId;
      let record = index.get(key);
      if (!record) {
        record = { ...p, key, owners: [], references: [], sourceNames: [] };
        index.set(key, record);
      }
      if (!record.owners.some((o) => o.path === owner.path))
        record.owners.push(owner);
      if (!record.references.includes(p.archiveId))
        record.references.push(p.archiveId);
      if (!record.sourceNames.includes(p.sourceName))
        record.sourceNames.push(p.sourceName);
    }
  }
  return [...index.values()];
}
export function filterPhotos(
  photos,
  { scope = "", discipline = "", collection = "", query = "" } = {},
) {
  const q = normalize(query.trim());
  return photos.filter((p) => {
    // All facets must match the same context; do not combine unrelated owners.
    const context = p.owners.some(
      (o) =>
        (!scope || o.scope === scope) &&
        (!discipline || o.discipline === discipline) &&
        (!collection || o.id === collection),
    );
    return (
      context &&
      (!q ||
        normalize(
          [
            p.alt,
            ...p.references,
            ...p.sourceNames,
            ...p.owners.flatMap((o) => [
              o.label,
              o.reference,
              o.series,
              o.place,
              o.date,
            ]),
          ].join(" "),
        ).includes(q))
    );
  });
}
