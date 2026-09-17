import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { works, chapters, categories, documents, albums } from "../dist/content.js";
const root = new URL("../", import.meta.url);
for (const [name, records] of Object.entries({ works, chapters, documents, albums })) {
  assert.equal(
    new Set(records.map((x) => x.id)).size,
    records.length,
    `IDs repetidos en ${name}`,
  );
  for (const record of records)
    if (record.image)
      await access(new URL(`dist/assets/${record.image}.webp`, root));
}
const photoOwners = new Map();
for (const item of [...works, ...albums]) {
  assert(item.gallery?.length, `Galería vacía: ${item.id}`);
  assert.equal(new Set(item.gallery.map(p => p.archiveId)).size, item.gallery.length, `Foto repetida: ${item.id}`);
  assert(chapters.some(c => c.id === item.chapter), `Capítulo del álbum o ficha: ${item.id}`);
  for (const p of item.gallery) {
    for (const name of [p.image, p.thumb]) await access(new URL(`dist/assets/${name}.webp`, root));
    assert(/^ARC-\d{6}$/.test(p.archiveId) && p.alt && p.sourceName, `Foto sin identificar: ${item.id}`);
    if (works.includes(item)) {
      assert(!photoOwners.has(p.archiveId), `La misma foto aparece en dos obras: ${p.archiveId}`);
      photoOwners.set(p.archiveId, item.id);
    }
  }
}
const groupings = JSON.parse(await readFile(new URL('docs/agrupacion-obras.json',root),'utf8'));
assert.equal(groupings.length, works.length);
const assigned = new Map();
for(const g of groupings) {
  assert(works.some(w => w.id === g.ficha));
  for(const id of g.identificados) {
    assert(!assigned.has(id), `Original asignado a dos obras: ${id} (${assigned.get(id)}, ${g.ficha})`);
    assigned.set(id,g.ficha);
  }
  assert(g.publicados.every(id=>g.identificados.includes(id)),`Selección sin original: ${g.ficha}`);
}
for (const w of works) {
  assert(
    categories.some((c) => c.id === w.category),
    `Categoría inexistente: ${w.id}`,
  );
  assert(
    chapters.some((c) => c.id === w.chapter),
    `Capítulo inexistente: ${w.id}`,
  );
  assert(w.alt && w.label && w.text, `Ficha incompleta: ${w.id}`);
}
const html = await readFile(new URL("dist/index.html", root), "utf8");
for (const ref of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)) {
  if (!ref[1].startsWith("data:"))
    await access(new URL("dist/" + ref[1], root));
}
assert(
  html.includes("noindex, nofollow"),
  "Mantener noindex durante la revisión",
);
assert(
  html.includes("Content-Security-Policy"),
  "Falta la política de recursos",
);
const manifest = JSON.parse(
  await readFile(new URL("docs/procedencia-imagenes.json", root), "utf8"),
);
for (const m of manifest) await access(new URL("dist/" + m.asset, root));
const assets = await readdir(new URL("dist/assets/", root));
assert.equal(
  assets.length,
  manifest.length,
  "Revisar trazabilidad de imágenes",
);
const app = await readFile(new URL("dist/app.js", root), "utf8");
for(const match of app.matchAll(/['"]((?:thumb|arc)-\d{6})['"]/g)) await access(new URL(`dist/assets/${match[1]}.webp`, root));
assert(!/https?:\/\//.test(app), "Revisar llamadas o enlaces externos nuevos");
console.log(
  `Correcto: ${works.length} fichas, ${chapters.length} capítulos, ${albums.length} álbumes, ${assets.length} archivos de imagen trazables (incluyen miniaturas).`,
);
console.log(
  "Relaciones, recursos, política de seguridad y estado de revisión comprobados.",
);
