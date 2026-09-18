import { writeFile } from "node:fs/promises";
import { site, categories, albums, chapters, documents, works } from "../dist/content.js";
import { educationSections, educationIntro, educationPrinciples, educationDescriptions, readings } from "../dist/education.js";
import { bellasArtsGallery } from "../dist/bellas-arts.js";

const fields = new Set([
  "contactText", "intro", "label", "series", "alt", "text", "title", "type",
  "short", "imageAlt", "caption", "paragraphs", "credit", "place", "source",
  "authors", "subtitle", "kind", "sections", "galleryGroup", "attribution", "date",
]);
const strings = new Set();

function visit(value, key = "") {
  if (typeof value === "string") {
    if (fields.has(key) && value.trim()) strings.add(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) visit(item, key);
    return;
  }
  if (value && typeof value === "object")
    for (const [childKey, child] of Object.entries(value)) visit(child, childKey);
}

[site, categories, works, albums, chapters, documents, educationSections, educationIntro,
  educationPrinciples, educationDescriptions, readings, bellasArtsGallery].forEach((value) => visit(value));

// These two structures are editorial text collections keyed by section rather
// than by a translatable field name. Include their values explicitly so the
// public language switch covers the education landing page as well.
educationIntro.forEach((text) => strings.add(text));
Object.values(educationDescriptions).forEach((text) => strings.add(text));

// Interface copy assembled directly by the education templates. Keeping it in
// the same source list prevents these small labels from being left in Spanish.
[
  "Crear con las manos, descubrir el volumen y dar espacio a la imaginación.",
  "La colección: materiales cotidianos, soluciones propias.",
  "Ver las imágenes de obras infantiles",
  "Una manera de acompañar la creación",
  "Ver las fotografías con filtros",
  "salas",
  "Archivo educativo",
  "Relieve realizado en una actividad de arte infantil",
].forEach((text) => strings.add(text));

await writeFile(
  new URL("../dist/content-translation-source.json", import.meta.url),
  JSON.stringify([...strings].sort(), null, 2) + "\n",
);
console.log(`${strings.size} textos editoriales preparados para traducción.`);
