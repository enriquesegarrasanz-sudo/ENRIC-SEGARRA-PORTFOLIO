import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  works,
  chapters,
  categories,
  documents,
  albums,
} from "../dist/content.js";
import { readings, educationSections } from "../dist/education.js";
const root = new URL("../", import.meta.url);
const assetExtension = (name) =>
  name.endsWith("-estudio-v3") ? ".png" : ".webp";
for (const [name, records] of Object.entries({
  works,
  chapters,
  documents,
  albums,
})) {
  assert.equal(
    new Set(records.map((x) => x.id)).size,
    records.length,
    `IDs repetidos en ${name}`,
  );
  for (const record of records)
    if (record.image)
      await access(new URL(`dist/assets/${record.image}${assetExtension(record.image)}`, root));
}
const photoOwners = new Map();
for (const item of [...works, ...albums]) {
  assert(item.gallery?.length, `Galería vacía: ${item.id}`);
  assert.equal(
    new Set(
      item.gallery.map(
        (p) => `${p.archiveId}:${p.sourcePage || ""}:${p.image}`,
      ),
    )
      .size,
    item.gallery.length,
    `Foto repetida: ${item.id}`,
  );
  assert(
    chapters.some((c) => c.id === item.chapter),
    `Capítulo del álbum o ficha: ${item.id}`,
  );
  for (const p of item.gallery) {
    for (const name of [p.image, p.thumb])
      await access(new URL(`dist/assets/${name}${assetExtension(name)}`, root));
    assert(
      /^ARC-\d{6}$/.test(p.archiveId) && p.alt && p.sourceName,
      `Foto sin identificar: ${item.id}`,
    );
    if (works.includes(item)) {
      assert(
        !photoOwners.has(p.archiveId) || photoOwners.get(p.archiveId) === item.id,
        `La misma foto aparece en dos obras: ${p.archiveId}`,
      );
      photoOwners.set(p.archiveId, item.id);
    }
  }
}
const groupings = JSON.parse(
  await readFile(new URL("docs/agrupacion-obras.json", root), "utf8"),
);
assert.equal(groupings.length, works.length);
const assigned = new Map();
for (const g of groupings) {
  assert(works.some((w) => w.id === g.ficha));
  for (const id of g.identificados) {
    assert(
      !assigned.has(id),
      `Original asignado a dos obras: ${id} (${assigned.get(id)}, ${g.ficha})`,
    );
    assigned.set(id, g.ficha);
  }
  assert(
    g.publicados.every((id) => g.identificados.includes(id)),
    `Selección sin original: ${g.ficha}`,
  );
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
for (const a of albums.filter((a) => a.audience === "educacion")) {
  assert(
    educationSections.some((s) => s.id === a.section),
    `Apartado educativo inexistente: ${a.id}`,
  );
  assert(a.credit, `Falta distinguir la autoría educativa: ${a.id}`);
}
for (const r of readings) {
  await access(new URL(`dist/assets/${r.image}.webp`, root));
  assert(
    albums.some((a) => a.id === r.related),
    `Lectura sin álbum relacionado: ${r.id}`,
  );
  assert(
    r.authors && r.reference && r.sections.length,
    `Lectura incompleta: ${r.id}`,
  );
}
const manifestNames = new Set(manifest.map((m) => m.asset));
assert.equal(manifestNames.size, manifest.length, "Procedencias duplicadas");
for (const item of [...works, ...albums])
  for (const p of item.gallery) {
    for (const name of [p.image, p.thumb])
      assert(
        manifestNames.has(`assets/${name}${assetExtension(name)}`),
        `Imagen sin procedencia: ${name}`,
      );
    if (p.sourcePage)
      assert(Number.isInteger(p.sourcePage) && p.sourcePage > 0);
  }
for (const match of app.matchAll(/['"]((?:thumb|arc)-\d{6})['"]/g))
  await access(new URL(`dist/assets/${match[1]}.webp`, root));
assert(!/https?:\/\//.test(app), "Revisar llamadas o enlaces externos nuevos");
console.log(
  `Correcto: ${works.length} fichas, ${chapters.length} capítulos, ${albums.length} álbumes, ${assets.length} archivos de imagen trazables (incluyen miniaturas).`,
);
console.log(
  "Relaciones, recursos, política de seguridad y estado de revisión comprobados.",
);
