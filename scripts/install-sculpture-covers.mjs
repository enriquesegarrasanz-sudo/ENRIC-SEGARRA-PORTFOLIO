import { readFile, writeFile } from "node:fs/promises";
import { catalogue } from "../dist/catalogue.js";

const editedNumbers = [...Array.from({ length: 46 }, (_, index) => index + 1), 53, 54, 55];
const editedReferences = editedNumbers.map(
  (number) => `ESC-${String(number).padStart(3, "0")}`,
);

const cataloguePath = new URL("../dist/catalogue.js", import.meta.url);
let source = await readFile(cataloguePath, "utf8");

for (const reference of editedReferences) {
  const number = reference.slice(4);
  const marker = `"reference": "${reference}"`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`No se encuentra ${reference}`);

  const next = source.indexOf('\n  {\n    "id":', start + marker.length);
  const end = next < 0 ? source.indexOf("\n];", start) : next;
  let block = source.slice(start, end);
  const image = `gallery-esc-${number}`;
  const thumb = `thumb-gallery-esc-${number}`;

  block = block.replace(
    /("image": ")[^"]+(",\r?\n\s+"thumb": ")[^"]+(")/,
    `$1${image}$2${thumb}$3`,
  );

  const galleryStart = block.indexOf('"gallery": [');
  if (galleryStart < 0) throw new Error(`No se encuentra la galería de ${reference}`);
  const beforeGallery = block.slice(0, galleryStart);
  const gallery = block.slice(galleryStart).replace(
    /("image": ")[^"]+(",\r?\n\s+"thumb": ")[^"]+(")/,
    `$1${image}$2${thumb}$3`,
  );
  block = beforeGallery + gallery;
  source = source.slice(0, start) + block + source.slice(end);
}

await writeFile(cataloguePath, source);

const provenancePath = new URL("../docs/procedencia-imagenes.json", import.meta.url);
const provenance = JSON.parse(await readFile(provenancePath, "utf8"));
const provenanceByAsset = new Map(provenance.map((item) => [item.asset, item]));

for (const reference of editedReferences) {
  const number = reference.slice(4);
  const work = catalogue.find((item) => item.reference === reference);
  if (!work) throw new Error(`No se encuentra la ficha ${reference}`);
  const originalAsset = `assets/${work.image}.webp`;
  const original = provenanceByAsset.get(originalAsset);
  if (!original) throw new Error(`No se encuentra la procedencia de ${originalAsset}`);

  const fullAsset = `assets/gallery-esc-${number}.webp`;
  const thumbAsset = `assets/thumb-gallery-esc-${number}.webp`;
  if (!provenanceByAsset.has(fullAsset)) {
    provenance.push({
      asset: fullAsset,
      archivo_id: original.archivo_id,
      original: original.original,
      transformacion:
        reference === "ESC-030"
          ? "Versión editorial derivada de la fotografía fuente: extracción exacta de la obra, fondo blanco neutro, sombra de montaje, lienzo 1536 × 1024 y grano fotográfico fino; sin regeneración de la pieza."
          : "Versión editorial derivada de la fotografía fuente mediante edición generativa de fondo, iluminación y encuadre; obra preservada, fondo blanco neutro, lienzo 1536 × 1024 y grano fotográfico fino.",
      width: 1536,
      height: 1024,
    });
  }
  if (!provenanceByAsset.has(thumbAsset)) {
    provenance.push({
      asset: thumbAsset,
      archivo_id: original.archivo_id,
      original: original.original,
      transformacion:
        "Miniatura proporcional de la versión editorial de galería; lienzo 768 × 512 y grano fotográfico fino.",
      width: 768,
      height: 512,
    });
  }
}

await writeFile(provenancePath, `${JSON.stringify(provenance, null, 2)}\n`);
