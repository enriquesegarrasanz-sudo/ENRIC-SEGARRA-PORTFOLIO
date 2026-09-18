import { writeFile } from "node:fs/promises";
import { site, categories, albums, chapters, documents, works } from "../dist/content.js";
import { educationSections, educationIntro, educationPrinciples, educationDescriptions, readings } from "../dist/education.js";
import { bellasArtsGallery } from "../dist/bellas-arts.js";

const fields = new Set([
  "contactText", "intro", "label", "series", "alt", "text", "title", "type",
  "short", "imageAlt", "caption", "paragraphs", "credit", "place", "source",
  "authors", "subtitle", "kind", "sections", "galleryGroup", "attribution",
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

await writeFile(
  new URL("../dist/content-translation-source.json", import.meta.url),
  JSON.stringify([...strings].sort(), null, 2) + "\n",
);
console.log(`${strings.size} textos editoriales preparados para traducción.`);
