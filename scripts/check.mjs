import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { works, chapters, categories, documents } from "../dist/content.js";
const root = new URL("../", import.meta.url);
for (const [name, records] of Object.entries({ works, chapters, documents })) {
  assert.equal(
    new Set(records.map((x) => x.id)).size,
    records.length,
    `IDs repetidos en ${name}`,
  );
  for (const record of records)
    if (record.image)
      await access(new URL(`dist/assets/${record.image}.webp`, root));
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
assert(!/https?:\/\//.test(app), "Revisar llamadas o enlaces externos nuevos");
console.log(
  `Correcto: ${works.length} fichas, ${chapters.length} capítulos, ${documents.length} documentos, ${assets.length} imágenes trazables.`,
);
console.log(
  "Relaciones, recursos, política de seguridad y estado de revisión comprobados.",
);
