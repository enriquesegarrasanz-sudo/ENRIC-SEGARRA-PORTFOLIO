import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { works, albums, chapters } from "../dist/content.js";
import { buildPhotoIndex, filterPhotos } from "../dist/archive.js";
import { journeyEntries } from "../dist/journey.js";

const photos = buildPhotoIndex(works, albums);
assert.equal(new Set(photos.map((p) => p.key)).size, photos.length);
for (const item of [...works, ...albums]) {
  const found = filterPhotos(photos, { collection: item.id });
  for (const photo of item.gallery)
    assert(
      found.some(
        (p) =>
          p.references.includes(photo.archiveId) &&
          p.sourcePage === photo.sourcePage,
      ),
      `Registro omitido: ${item.id}/${photo.archiveId}`,
    );
}
const shared = photos.find(
  (p) =>
    p.owners.some((o) => o.scope === "obra") &&
    p.owners.some((o) => o.scope === "proceso"),
);
assert(shared, "Debe conservar los contextos compartidos entre obra y proceso");
assert(
  !filterPhotos([shared], { scope: "proceso", discipline: "moviles" }).length,
  "No cruzar disciplinas de una ficha con el contexto de otro álbum",
);
assert(
  filterPhotos(photos, { query: "evolucion" }).some((p) =>
    p.owners.some((o) => o.id === "evolucion-belles-arts"),
  ),
  "Búsqueda sin acentos",
);
assert.equal(filterPhotos(photos, { query: "zzzz-no-existe-zzzz" }).length, 0);
const sample = {
  image: "test",
  thumb: "test",
  archiveId: "ARC-000001",
  alt: "Prueba",
  sourceName: "documento.pdf",
};
const fixture = buildPhotoIndex(
  [
    {
      id: "w",
      category: "dibujo",
      label: "Obra",
      gallery: [{ ...sample, contentKey: "same" }],
    },
  ],
  [
    {
      id: "a",
      title: "Álbum",
      section: "proceso",
      gallery: [
        { ...sample, archiveId: "ARC-000002", contentKey: "same" },
        { ...sample, sourcePage: 1 },
        { ...sample, sourcePage: 2 },
      ],
    },
  ],
);
assert.equal(
  fixture.length,
  3,
  "Una copia exacta se reúne; dos páginas PDF se conservan separadas",
);
assert.equal(fixture[0].owners.length, 2);
assert.deepEqual(fixture[0].references, ["ARC-000001", "ARC-000002"]);
const entries = journeyEntries(chapters, albums, works);
assert.equal(new Set(entries.map((e) => e.id)).size, entries.length);
for (const e of entries) {
  await access(new URL(`../dist/assets/${e.image}.webp`, import.meta.url));
  const [type, id] = e.path.slice(1).split("/");
  assert(
    type === "memoria"
      ? chapters.some((c) => c.id === id)
      : type === "archivo"
        ? albums.some((a) => a.id === id)
        : type === "obra" && id === "dibujo",
    `Destino de trayectoria: ${e.path}`,
  );
}
console.log(
  `Archivo visual: ${photos.length} imágenes, contextos conservados, copias reunidas, filtros y ${entries.length} destinos de trayectoria verificados.`,
);
