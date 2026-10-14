import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { works } from "../dist/content.js";
import { collections } from "../dist/collections.js";

const audit = JSON.parse(await readFile(new URL("../docs/REVISION-SERIES-20261014.json", import.meta.url), "utf8"));
assert.equal(audit.length, works.length, "La revisión debe cubrir todas las fichas");
assert.equal(new Set(audit.map(w => w.reference)).size, works.length);
for (const [category, groups] of Object.entries(collections)) {
  const members = works.filter(w => w.category === category);
  assert.equal(new Set(groups.map(g => g.series)).size, groups.length);
  for (const work of members) {
    assert.equal(groups.filter(g => g.series === work.series).length, 1, `Grupo único para ${work.reference}`);
  }
  for (const group of groups) {
    const cover = members.find(w => w.reference === group.cover);
    assert(cover && cover.series === group.series, `Portada ajena a ${group.series}`);
    assert(["serie", "conjunto"].includes(group.kind));
  }
}
for (const work of works) {
  const reviewed = audit.find(w => w.reference === work.reference);
  assert.equal(reviewed.id, work.id, `Referencia estable: ${work.reference}`);
  assert.equal(reviewed.series, work.series);
  assert.equal(reviewed.description, work.label);
}
const expected = { "PIN-064": "Gatos", "PIN-039": "Tauromaquia", "PIN-078": "Tauromaquia", "PIN-079": "Relatos e iconografía", "PIN-080": "Rostros y personajes", "PIN-053": "Letras y signos" };
for (const [reference, series] of Object.entries(expected)) assert.equal(works.find(w => w.reference === reference).series, series);
assert(works.filter(w => w.category === "moviles").every(w => w.series === "Móviles"));
const owners = works.filter(w => w.gallery.some(p => p.archiveId === "ARC-008829"));
assert.deepEqual(owners.map(w => w.reference), ["ESC-055"], "La estructura de tres ejes no pertenece a la pareja de espirales");
console.log(`Series verificadas: ${works.length} fichas, ${Object.values(collections).flat().length} grupos y portadas coherentes.`);
