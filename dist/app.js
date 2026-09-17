import { site, works, albums, chapters, categories } from "./content.js";
import { redirects } from "./catalogue.js";
import {
  educationSections,
  educationIntro,
  educationPrinciples,
  educationDescriptions,
  readings,
} from "./education.js";
const main = document.querySelector("main"),
  dialog = document.querySelector("#image-dialog");
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const num = (n) => String(n).padStart(2, "0"),
  catName = (id) => categories.find((c) => c.id === id)?.label || id;
const photoRef = (p) =>
  `${p.archiveId}${p.sourcePage ? " · p. " + p.sourcePage : ""}`;
const asset = (name, local = false) =>
  `${local ? "review" : "assets"}/${encodeURIComponent(name)}.webp`;
const img = (name, alt, eager = false, local = false) =>
  `<img src="${asset(name, local)}" alt="${esc(alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async">`;
const a = (path, text, cls = "") =>
    `<a class="${cls}" href="#${path}">${text}</a>`,
  arrow = '<span aria-hidden="true">↗</span>';
const prose = (ps) =>
  `<div class="prose">${ps.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`;
const head = (eyebrow, title, description = "") =>
  `<header class="page-head"><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1>${description ? `<p class="lead">${esc(description)}</p>` : ""}</header>`;
const trail = (path, label, current) =>
  `<nav class="breadcrumb" aria-label="Ruta">${a(path, esc(label))}<span aria-hidden="true">/</span><span>${esc(current)}</span></nav>`;
const sectionHead = (label, path, text = "Ver todo") =>
  `<div class="section-head"><h2>${esc(label)}</h2>${path ? a(path, esc(text) + " " + arrow) : ""}</div>`;
const workCard = (w) =>
  `<article class="work-card reveal">${a("/obra/" + w.id, `<div class="image-space">${img(w.thumb, w.alt)}</div><div class="caption"><span class="reference">${esc(w.reference)}</span><h3>${esc(w.label)}</h3><p>${esc(w.series)}${w.gallery.length > 1 ? ` · ${w.gallery.length} vistas` : ""}</p></div>`)}</article>`;
const albumCard = (al) =>
  `<article class="album-card reveal">${a("/archivo/" + al.id, `<div class="album-image">${img(al.image, al.title)}</div><div class="caption"><span class="reference">${esc(al.date || (al.audience === "educacion" ? educationSections.find((s) => s.id === al.section)?.label : al.type))}</span><h3>${esc(al.title)}</h3><p>${al.gallery.length} fotografías ${arrow}</p></div>`)}</article>`;
const workGrid = (ws) =>
    `<div class="works-grid">${ws.map(workCard).join("")}</div>`,
  albumGrid = (list) =>
    `<div class="albums-grid">${list.map(albumCard).join("")}</div>`;
const educationAlbums = () =>
  albums.filter((al) => al.audience === "educacion");
let currentGallery = [],
  galleryLabel = "",
  selectedPhoto = 0,
  activeFilters = null,
  observer,
  routeKey = "";

function home() {
  const hero = works.find((w) => w.id === "suspension-rosa") || works[0];
  return `<section class="home-intro"><div><p class="eyebrow">Escultura · pintura · educación artística</p><h1>La forma,<br>en movimiento.</h1><p class="lead">Una vida entre la materia, la imaginación y el placer de crear.</p>${a("/obra/moviles", "Explorar los móviles " + arrow, "text-link")}</div>${a("/obra/" + hero.id, `<figure class="hero-work">${img(hero.image, hero.alt, true)}<figcaption><span>${esc(hero.label)}</span><span>${esc(hero.reference)} ${arrow}</span></figcaption></figure>`)}</section><section class="section">${sectionHead("Obra", "/obra", "Explorar el catálogo")}<div class="category-index">${categories
    .slice(1)
    .map((c, i) => {
      const w = works.find((w) => w.category === c.id);
      return a(
        "/obra/" + c.id,
        `<span class="reference">${num(i + 1)}</span><h3>${esc(c.label)}</h3><span>${works.filter((w) => w.category === c.id).length} obras ${arrow}</span>${img(w.thumb, w.alt)}`,
      );
    })
    .join(
      "",
    )}</div></section><section class="feature section"><div>${img("arc-002472", "Vista de la exposición de arte infantil en Casa Abadía")}</div><div><p class="eyebrow">Arte infantil</p><h2>Crear también<br>es descubrir.</h2><p>Obras de niños y niñas, talleres, formación docente y exposiciones. Un archivo para mirar la educación artística desde lo que sucede al hacer.</p>${a("/arte-infantil", "Entrar en el archivo educativo " + arrow, "text-link")}</div></section><section class="section">${sectionHead("Una trayectoria abierta", "/memoria", "Recorrer la memoria")}<p class="section-intro">El oficio, las imágenes, los proyectos compartidos y los espacios de encuentro. Siete entradas a una historia que continúa.</p>${albumGrid([albums.find((x) => x.id === "arboles"), albums.find((x) => x.id === "colomina")])}</section>`;
}

function workIndex(category = "todas", params = new URLSearchParams()) {
  const query = params.get("q") || "",
    series = params.get("serie") || "",
    view = params.get("vista") === "recorrido" ? "recorrido" : "catalogo",
    pool = works.filter((w) => category === "todas" || w.category === category),
    seriesList = [...new Set(pool.map((w) => w.series))];
  const norm = (s) =>
    s
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  const filtered = pool.filter(
    (w) =>
      (!series || w.series === series) &&
      norm(
        [
          w.label,
          w.series,
          w.reference,
          ...w.gallery.map((p) => p.archiveId),
        ].join(" "),
      ).includes(norm(query)),
  );
  activeFilters = { category, query, series, view, filtered };
  const descriptions = {
    todas:
      "Móviles, escultura, pintura y dibujo. Un catálogo organizado por familias de obras, con distintas vistas reunidas en cada ficha.",
    moviles:
      "Equilibrio, color y movimiento. Piezas suspendidas que cambian con el aire, la luz y el lugar que las acoge.",
    escultura:
      "El volumen como punto de partida. Tallas, ensamblajes, relieves y construcciones presentes en el archivo.",
    pintura:
      "Animales, personajes y mundos imaginados. Un recorrido por las distintas familias del archivo de pintura.",
    dibujo:
      "Líneas, manchas y formas que construyen el espacio sobre el papel.",
  };
  return (
    head(
      "Catálogo de obra",
      category === "todas" ? "Obra" : catName(category),
      descriptions[category],
    ) +
    `<nav class="tabs" aria-label="Disciplinas">${categories.map((c) => a(c.id === "todas" ? "/obra" : "/obra/" + c.id, `${esc(c.label)} <sup>${works.filter((w) => c.id === "todas" || w.category === c.id).length}</sup>`, c.id === category ? "active" : "")).join("")}</nav><form class="catalogue-tools" id="catalogue-filters"><label class="search"><span class="sr-only">Buscar obras</span><input type="search" name="q" placeholder="Buscar título, familia o referencia" value="${esc(query)}"><button aria-label="Buscar">↗</button></label><label class="select-label">Familia<select name="serie"><option value="">Todas las familias</option>${seriesList.map((s) => `<option ${s === series ? "selected" : ""} value="${esc(s)}">${esc(s)}</option>`).join("")}</select></label><div class="view-toggle" aria-label="Presentación"><button type="button" data-view="catalogo" aria-pressed="${view === "catalogo"}">Cuadrícula</button><button type="button" data-view="recorrido" aria-pressed="${view === "recorrido"}">Recorrido ↓</button></div></form><div class="result-line"><p role="status">${filtered.length} ${filtered.length === 1 ? "obra" : "obras"}${series ? " · " + esc(series) : ""}</p><p>Nombres descriptivos provisionales</p></div><div id="catalogue-results">${renderWorks(filtered.slice(0, 24), view)}</div>${filtered.length > 24 ? `<button class="load-more" id="more-works" data-shown="24">Ver más obras <span>24 / ${filtered.length}</span></button>` : ""}${!filtered.length ? `<div class="empty"><h2>No hay obras con esa búsqueda.</h2>${a(category === "todas" ? "/obra" : "/obra/" + category, "Restablecer filtros " + arrow)}</div>` : ""}`
  );
}
function renderWorks(list, view) {
  return view === "catalogo"
    ? workGrid(list)
    : `<div class="work-walk">${list.map((w) => `<article class="walk-item reveal"><div><span class="reference">${esc(w.reference)}</span><h2>${esc(w.label)}</h2><p>${esc(w.series)}</p>${a("/obra/" + w.id, "Ver la obra" + (w.gallery.length > 1 ? ` · ${w.gallery.length} vistas` : "") + " " + arrow, "text-link")}</div>${a("/obra/" + w.id, img(w.image, w.alt))}</article>`).join("")}</div>`;
}
function setGallery(list, label) {
  currentGallery = list;
  galleryLabel = label;
}
function galleryGrid(list, start = 0) {
  return list
    .map(
      (p, i) =>
        `<figure class="gallery-item reveal"><button class="photo-button" data-photo="${start + i}" aria-label="Ampliar fotografía ${start + i + 1}: ${esc(p.alt)}">${img(p.thumb, p.alt, false, p.local)}<span class="zoom-mark" aria-hidden="true">↗</span></button><figcaption><span>${num(start + i + 1)}</span><span>${esc(photoRef(p))}</span></figcaption></figure>`,
    )
    .join("");
}
function workDetail(w) {
  setGallery(w.gallery, w.label);
  const related = works
    .filter((x) => x.series === w.series && x.id !== w.id)
    .slice(0, 3);
  return (
    trail("/obra/" + w.category, catName(w.category), w.reference) +
    `<section class="work-detail"><div class="work-stage"><button class="photo-button main-photo" data-photo="0" aria-label="Ampliar: ${esc(w.label)}">${img(w.image, w.alt, true)}<span class="zoom-mark" aria-hidden="true">↗</span></button>${w.gallery.length > 1 ? `<div class="thumbnails">${w.gallery.map((p, i) => `<button data-preview="${i}" aria-label="Ver perspectiva ${i + 1}" aria-pressed="${i === 0}">${img(p.thumb, p.alt)}</button>`).join("")}</div>` : ""}</div><div class="work-info"><p class="eyebrow">${esc(catName(w.category))} / ${esc(w.reference)}</p><h1>${esc(w.label)}</h1><p class="work-series">${esc(w.series)}</p>${prose([w.text])}<dl><div><dt>Autor</dt><dd>Enric Segarra</dd></div><div><dt>Archivo visual</dt><dd>${w.gallery.length} ${w.gallery.length === 1 ? "fotografía" : "fotografías"}</dd></div><div><dt>Identificación</dt><dd>Descripción provisional</dd></div></dl><p class="note">Título original, fecha, materiales y medidas por documentar.</p>${a("/obra/" + w.category + "?serie=" + encodeURIComponent(w.series), "Continuar por esta familia " + arrow, "text-link")}</div></section>${related.length ? `<section class="section">${sectionHead("En relación")}${workGrid(related)}</section>` : ""}`
  );
}
function albumPage(al) {
  setGallery(al.gallery, al.title);
  const parent =
      al.audience === "educacion"
        ? "/arte-infantil?seccion=" + al.section
        : al.section === "exposiciones"
          ? "/exposiciones"
          : "/proceso",
    label =
      al.audience === "educacion"
        ? "Arte infantil"
        : al.section === "exposiciones"
          ? "Exposiciones"
          : "Proceso y entorno";
  return (
    trail(parent, label, al.title) +
    head(al.date || al.type, al.title, al.text) +
    `<div class="album-intro">${prose(al.paragraphs || [al.text])}<aside>${al.place ? `<p class="eyebrow">Lugar</p><p>${esc(al.place)}</p>` : ""}<p class="eyebrow">Archivo visual</p><p>${al.gallery.length} fotografías</p>${al.credit ? `<p class="credit">${esc(al.credit)}</p>` : ""}</aside></div><div class="gallery-grid" id="album-photos">${galleryGrid(al.gallery.slice(0, 36))}</div>${al.gallery.length > 36 ? `<button class="load-more" id="more-photos" data-shown="36">Seguir viendo <span>36 / ${al.gallery.length}</span></button>` : ""}${al.source ? `<div class="source-note"><p class="eyebrow">Documentación</p><p>${esc(al.source)}</p></div>` : ""}<div class="end-link">${a(parent, "Volver a " + label.toLowerCase() + " " + arrow)}</div>`
  );
}

function education(params) {
  let section = params.get("seccion") || "proyecto";
  if (!educationSections.some((s) => s.id === section)) section = "proyecto";
  const list = educationAlbums().filter((al) => al.section === section),
    title = educationSections.find((s) => s.id === section).label,
    tabs = `<nav class="tabs education-tabs" aria-label="Archivo educativo">${educationSections.map((s) => a("/arte-infantil" + (s.id === "proyecto" ? "" : "?seccion=" + s.id), esc(s.label), s.id === section ? "active" : "")).join("")}</nav>`;
  if (section !== "proyecto")
    return (
      head("Arte infantil", title, educationDescriptions[section]) +
      tabs +
      (section === "textos" ? readingIndex() : albumGrid(list))
    );
  return (
    head(
      "Educación artística",
      "Arte infantil",
      "Un lugar para la imaginación, la materia y el aprendizaje compartido.",
    ) +
    tabs +
    `<section class="education-hero">${img("arc-002472", "La colección de arte infantil en Casa Abadía", true)}<div><p class="eyebrow">Hacer para descubrir</p><h2>Muchas manos.<br>Muchas maneras<br>de mirar.</h2><p>Las obras de los participantes, la experiencia de los talleres y la memoria de sus exposiciones.</p>${a("/arte-infantil?seccion=obras", "Explorar las obras infantiles " + arrow, "text-link")}</div></section>${prose(educationIntro)}<div class="principles">${educationPrinciples.map((p, i) => `<article><span class="reference">${num(i + 1)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></article>`).join("")}</div>${educationSections
      .slice(1, 5)
      .map(
        (s) =>
          `<section class="section">${sectionHead(s.label, "/arte-infantil?seccion=" + s.id)}<p class="section-intro">${esc(educationDescriptions[s.id])}</p>${albumGrid(
            educationAlbums()
              .filter((al) => al.section === s.id)
              .slice(0, 2),
          )}</section>`,
      )
      .join(
        "",
      )}<section class="section">${sectionHead("Textos y propuestas", "/arte-infantil?seccion=textos")}${readingIndex()}</section>`
  );
}
function readingIndex() {
  return `<div class="reading-index">${readings.map((r, i) => a("/textos/" + r.id, `<span class="reference">${num(i + 1)} / ${esc(r.kind)}</span><div><h2>${esc(r.title)}</h2><p>${esc(r.authors)}</p></div>${arrow}`)).join("")}</div>`;
}
function readingPage(r) {
  return (
    trail("/arte-infantil?seccion=textos", "Textos y propuestas", r.kind) +
    head(r.kind, r.title, r.subtitle) +
    `<div class="article-layout"><aside>${img(r.image, r.title)}<p>${esc(r.authors)}</p><p class="reference">Documento ${esc(r.reference)}</p><p class="note">Síntesis editorial del documento conservado en el archivo. No es una transcripción.</p></aside><article class="reading-body"><p class="article-intro">${esc(r.intro)}</p>${r.sections.map(([t, p]) => `<section><h2>${esc(t)}</h2><p>${esc(p)}</p></section>`).join("")}${a("/archivo/" + r.related, "Ver las imágenes relacionadas " + arrow, "text-link")}</article></div>`
  );
}
const chapterImages = {
  "aprender-oficio": "retrato",
  "construir-formas": "escultura-madera",
  "pintar-mundos": "gatos",
  "crear-con-otros": "arc-002472",
  "proyectos-compartidos": "arc-009962",
  "exponer-abrir-espacios": "arc-009086",
  "seguir-creando": "arc-014873",
};
function memory(params) {
  const archive = params.get("vista") === "archivo";
  return (
    head(
      "Vida y obra",
      "Trayectoria",
      "Un recorrido por el oficio, la creación y los encuentros. Los capítulos se organizan por afinidades y experiencias; sus caminos se cruzan.",
    ) +
    `<nav class="tabs" aria-label="Vista de la trayectoria">${a("/memoria", "Recorrido visual", !archive ? "active" : "")}${a("/memoria?vista=archivo", "Índice del archivo", archive ? "active" : "")}</nav>` +
    (archive
      ? `<div class="archive-index">${chapters.map((c, i) => a("/memoria/" + c.id, `<span>${num(i + 1)}</span><h2>${esc(c.title)}</h2><p>${esc(c.short)}</p>${arrow}`)).join("")}</div><section class="section">${sectionHead("Álbumes documentales")}${albumGrid(albums)}</section>`
      : `<div class="timeline"><nav class="chapter-rail" aria-label="Capítulos del recorrido">${chapters.map((c, i) => `<a href="#/memoria" data-jump="${c.id}"><span>${num(i + 1)}</span>${esc(c.title)}</a>`).join("")}</nav><div>${chapters.map((c, i) => `<article class="timeline-step reveal" id="etapa-${c.id}"><div class="step-top"><span class="reference">${num(i + 1)} / ${i === 0 ? "Orígenes" : i === 6 ? "Presente" : "Trayectoria"}</span>${a("/memoria/" + c.id, "Abrir capítulo " + arrow)}</div>${a("/memoria/" + c.id, img(chapterImages[c.id], c.imageAlt || c.title))}<div class="step-copy"><h2>${esc(c.title)}</h2><p>${esc(c.short)}</p>${a("/memoria/" + c.id, "Obras, imágenes y memoria " + arrow)}</div></article>`).join("")}</div></div>`)
  );
}
function chapterPage(c) {
  const relatedWorks = works.filter((w) => w.chapter === c.id).slice(0, 6),
    relatedAlbums = albums.filter((al) => al.chapter === c.id);
  return (
    trail("/memoria", "Trayectoria", c.title) +
    head("Un capítulo de la memoria", c.title, c.short) +
    `<figure class="chapter-hero">${img(chapterImages[c.id], c.imageAlt || c.title, true)}${c.caption ? `<figcaption>${esc(c.caption)}</figcaption>` : ""}</figure>${prose(c.paragraphs)}${c.id === "crear-con-otros" ? `<div class="end-link">${a("/arte-infantil", "Explorar el archivo completo de arte infantil " + arrow)}</div>` : ""}${relatedWorks.length ? `<section class="section">${sectionHead("Obras relacionadas")}${workGrid(relatedWorks)}</section>` : ""}${relatedAlbums.length ? `<section class="section">${sectionHead("Imágenes y documentos")}${albumGrid(relatedAlbums)}</section>` : ""}<div class="chapter-pagination">${chapters
      .filter((_, i) => Math.abs(i - chapters.indexOf(c)) === 1)
      .map((x) => a("/memoria/" + x.id, esc(x.title) + " " + arrow))
      .join("")}</div>`
  );
}

function processPage() {
  return (
    head(
      "Materia · espacio · movimiento",
      "Proceso y entorno",
      "Mirar de cerca. Construir, suspender y volver a mirar. Las piezas se transforman con el lugar, la luz y el punto de vista.",
    ) +
    `<section class="process-opening"><figure>${img("arc-014873", "Enric Segarra junto a sus esculturas suspendidas en los árboles", true)}<figcaption>El artista, las piezas y el entorno.</figcaption></figure><div><p class="eyebrow">Un trabajo que continúa</p><h2>La escultura<br>sale al encuentro<br>del paisaje.</h2><p>En los árboles, una composición encuentra otro equilibrio. El aire introduce movimiento y la luz cambia la relación entre sus partes. El archivo permite seguir esas variaciones, reuniendo las distintas vistas de una misma pieza.</p>${a("/archivo/arboles", "Recorrer las fotografías " + arrow, "text-link")}</div></section><div class="process-sequence">${[
      [
        "01",
        "Encontrar",
        "Texturas, ramas, piedras y restos de color. Observar es una parte del trabajo.",
        "mirar-materia",
      ],
      [
        "02",
        "Experimentar",
        "La fotografía conserva ensayos, variaciones y maneras distintas de mirar la materia.",
        "variaciones-fotograficas",
      ],
      [
        "03",
        "Habitar el entorno",
        "El cuerpo del artista, la escala de las piezas y el espacio que las rodea.",
        "arboles",
      ],
    ]
      .map(([n, t, p, id]) => {
        const al = albums.find((x) => x.id === id);
        return `<section class="process-step reveal"><div><span class="reference">${n}</span><h2>${t}</h2><p>${p}</p>${a("/archivo/" + id, "Abrir el cuaderno " + arrow, "text-link")}</div>${a("/archivo/" + id, img(al.image, al.title))}</section>`;
      })
      .join(
        "",
      )}</div><section class="section">${sectionHead("Formas suspendidas", "/obra/moviles")}${workGrid(works.filter((w) => w.category === "moviles").slice(0, 3))}</section><section class="section closing-note"><h2>El proceso también<br>se comparte.</h2><p>El trabajo con materiales continúa en los talleres de educación artística y en la formación docente.</p>${a("/arte-infantil?seccion=talleres", "Entrar en los talleres " + arrow, "text-link")}</section>`
  );
}
function exhibitions(params) {
  const f = params.get("tipo") || "todas",
    list = albums.filter(
      (al) =>
        al.section === "exposiciones" && (f === "todas" || al.audience === f),
    );
  return (
    head(
      "Encuentros con el público",
      "Exposiciones",
      "La obra en las salas, los patios y los centros educativos. Cada álbum conserva el montaje, las vistas del espacio y la documentación disponible.",
    ) +
    `<nav class="tabs" aria-label="Tipo de exposición">${[
      ["todas", "Todas"],
      ["obra", "Obra y encuentros"],
      ["educacion", "Educación artística"],
    ]
      .map(([id, t]) =>
        a("/exposiciones?tipo=" + id, t, id === f ? "active" : ""),
      )
      .join(
        "",
      )}</nav>${albumGrid(list)}<div class="source-note"><p>Las fechas se muestran cuando están documentadas. Las identificaciones procedentes de carpetas o dossieres se indican en cada álbum.</p></div>`
  );
}
function projects() {
  const c = chapters.find((x) => x.id === "proyectos-compartidos");
  return (
    head("Crear con otros", "Proyectos compartidos", c.short) +
    `<section class="feature"><div>${img("arc-009962", "Archivo expositivo de Signo de Agua", true)}</div><div><p class="eyebrow">Agua · creación · educación</p><h2>El agua como<br>punto de encuentro.</h2><p>${esc(c.paragraphs[0])}</p>${a("/archivo/signo-agua", "Ver el archivo de Signo de Agua " + arrow, "text-link")}</div></section><div class="prose"><h2>Signo de Agua y la memoria del proyecto</h2><p>Las fotografías conservadas bajo el nombre Signo de Agua muestran una exposición y sus encuentros. La denominación Propósito del Agua procede del relato del artista. Ambas referencias se mantienen visibles mientras se documenta su relación exacta.</p><h2>Dragonians</h2><p>${esc(c.paragraphs[1])}</p><p>Las piezas del catálogo vinculadas a dragones y relatos se reúnen a continuación. Los materiales de otros participantes se conservan como documentación del proyecto y no se atribuyen a Enric.</p></div><section class="section">${workGrid(works.filter((w) => w.series === "Dragones y relatos"))}</section><div class="end-link">${a("/memoria/exponer-abrir-espacios", "Exponer y abrir espacios " + arrow)}</div>`
  );
}
function artist() {
  return (
    head("El artista", "Enric Segarra", site.intro) +
    `<section class="artist-layout">${img("retrato", "Enric Segarra con una de sus esculturas", true)}<div>${prose(["Nacido en Barcelona en 1959 y formado en Bellas Artes en Valencia, Enric Segarra desarrolla una práctica que se mueve entre la escultura, la pintura y el dibujo. El conocimiento del oficio convive con la curiosidad por los materiales y con una atención constante a las formas de la naturaleza.", "Su trayectoria incluye la educación artística, los proyectos compartidos y la actividad expositiva. En los talleres, el volumen y la experimentación se convierten en una manera de acompañar la imaginación de los participantes.", "En su trabajo actual, las esculturas suspendidas mantienen abierta esa búsqueda. Piezas, colores y elementos recuperados se encuentran en composiciones que dialogan con el aire y el entorno."])}${a("/memoria", "Recorrer su trayectoria " + arrow, "text-link")}</div></section><section class="section">${sectionHead("Distintas formas de una misma búsqueda")}<div class="principles">${["Escultura y materia", "Pintura y dibujo", "Educación artística", "Exposiciones y proyectos"].map((t, i) => `<article><span class="reference">${num(i + 1)}</span><h3>${t}</h3>${a(["/obra/escultura", "/obra/pintura", "/arte-infantil", "/exposiciones"][i], "Explorar " + arrow)}</article>`).join("")}</div></section>`
  );
}
function contact() {
  return (
    head("Información", "Contacto", site.contactText) +
    `<div class="prose"><p>Este espacio reúne la obra y la memoria artística de Enric Segarra. El archivo sigue creciendo con la identificación de piezas, documentos y fotografías.</p></div><div class="end-link">${a("/obra", "Volver a la obra " + arrow)}</div>`
  );
}
function notFound() {
  return (
    head(
      "Archivo",
      "Página no encontrada",
      "Este enlace no corresponde a una ficha del archivo.",
    ) + a("/obra", "Explorar la obra " + arrow, "text-link")
  );
}

function render({ keepScroll = false } = {}) {
  const raw = location.hash.slice(1) || "/",
    [path, qs = ""] = raw.split("?"),
    parts = path.split("/").filter(Boolean),
    params = new URLSearchParams(qs),
    section = parts[0] || "inicio",
    id = parts[1];
  let html, title;
  activeFilters = null;
  currentGallery = [];
  if (section === "obra" && redirects[id]) {
    location.replace("#/obra/" + redirects[id]);
    return;
  }
  if (section === "inicio") {
    html = home();
    title = "Obra y memoria";
  } else if (section === "obra") {
    if (!id || categories.some((c) => c.id === id)) {
      html = workIndex(id || "todas", params);
      title = id ? catName(id) : "Obra";
    } else {
      const w = works.find((w) => w.id === id);
      html = w ? workDetail(w) : notFound();
      title = w?.label;
    }
  } else if (section === "arte-infantil") {
    html = education(params);
    title = "Arte infantil";
  } else if (section === "textos") {
    const r = readings.find((r) => r.id === id);
    html = r ? readingPage(r) : notFound();
    title = r?.title;
  } else if (section === "archivo") {
    const al = albums.find((al) => al.id === id);
    html = al ? albumPage(al) : notFound();
    title = al?.title;
  } else if (section === "memoria") {
    const c = chapters.find((c) => c.id === id);
    html = id ? (c ? chapterPage(c) : notFound()) : memory(params);
    title = c?.title || "Trayectoria";
  } else if (section === "proceso") {
    html = processPage();
    title = "Proceso y entorno";
  } else if (section === "exposiciones") {
    html = exhibitions(params);
    title = "Exposiciones";
  } else if (section === "proyectos") {
    html = projects();
    title = "Proyectos";
  } else if (section === "artista") {
    html = artist();
    title = "Artista";
  } else if (section === "contacto") {
    html = contact();
    title = "Contacto";
  } else {
    html = notFound();
    title = "Página no encontrada";
  }
  if (dialog.open) dialog.close();
  main.innerHTML = html;
  document.title = `${title || "Archivo"} — ${site.name}`;
  const al = section === "archivo" ? albums.find((al) => al.id === id) : null,
    active =
      section === "textos" || al?.audience === "educacion"
        ? "arte-infantil"
        : al
          ? al.section === "exposiciones"
            ? "exposiciones"
            : "proceso"
          : section;
  document.querySelectorAll("[data-nav]").forEach((el) => {
    if (el.dataset.nav === active) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
  closeMenu();
  if (!keepScroll) {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (routeKey) main.focus({ preventScroll: true });
  }
  routeKey = raw;
  attachPageEvents();
  observe();
}
function observe() {
  observer?.disconnect();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("entered");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.04 },
  );
  document.querySelectorAll(".reveal:not(.entered)").forEach((el) => {
    if (el.getBoundingClientRect().top > innerHeight) {
      el.classList.add("will-reveal");
      observer.observe(el);
    } else el.classList.add("entered");
  });
}
function updateFilters(view) {
  if (!activeFilters) return;
  const data = new FormData(document.querySelector("#catalogue-filters")),
    p = new URLSearchParams();
  if (data.get("q")) p.set("q", data.get("q"));
  if (data.get("serie")) p.set("serie", data.get("serie"));
  if ((view || activeFilters.view) === "recorrido") p.set("vista", "recorrido");
  location.hash =
    "/obra" +
    (activeFilters.category === "todas" ? "" : "/" + activeFilters.category) +
    (p.size ? "?" + p.toString() : "");
}
function attachPageEvents() {
  document
    .querySelector("#catalogue-filters")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      updateFilters();
    });
  document
    .querySelector('[name="serie"]')
    ?.addEventListener("change", () => updateFilters());
  document
    .querySelectorAll("[data-view]")
    .forEach((b) =>
      b.addEventListener("click", () => updateFilters(b.dataset.view)),
    );
  document.querySelector("#more-works")?.addEventListener("click", (e) => {
    const b = e.currentTarget,
      n = +b.dataset.shown,
      list = activeFilters.filtered.slice(n, n + 24);
    document
      .querySelector("#catalogue-results")
      .insertAdjacentHTML("beforeend", renderWorks(list, activeFilters.view));
    b.dataset.shown = n + list.length;
    b.innerHTML = `Ver más obras <span>${b.dataset.shown} / ${activeFilters.filtered.length}</span>`;
    if (+b.dataset.shown >= activeFilters.filtered.length) b.remove();
    observe();
  });
  document.querySelector("#more-photos")?.addEventListener("click", (e) => {
    const b = e.currentTarget,
      n = +b.dataset.shown,
      list = currentGallery.slice(n, n + 36);
    document
      .querySelector("#album-photos")
      .insertAdjacentHTML("beforeend", galleryGrid(list, n));
    b.dataset.shown = n + list.length;
    b.innerHTML = `Seguir viendo <span>${b.dataset.shown} / ${currentGallery.length}</span>`;
    if (+b.dataset.shown >= currentGallery.length) b.remove();
    observe();
  });
}
main.addEventListener("click", (e) => {
  const photo = e.target.closest("[data-photo]");
  if (photo) {
    selectedPhoto = +photo.dataset.photo;
    showImage();
    dialog.showModal();
    return;
  }
  const preview = e.target.closest("[data-preview]");
  if (preview) {
    const i = +preview.dataset.preview,
      p = currentGallery[i],
      button = document.querySelector(".main-photo");
    button.dataset.photo = i;
    const image = button.querySelector("img");
    image.src = asset(p.image, p.local);
    image.alt = p.alt;
    document
      .querySelectorAll("[data-preview]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === preview)));
    return;
  }
  const jump = e.target.closest("[data-jump]");
  if (jump) {
    e.preventDefault();
    document
      .getElementById("etapa-" + jump.dataset.jump)
      ?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
  }
});
function showImage() {
  const p = currentGallery[selectedPhoto];
  if (!p) return;
  const image = document.querySelector("#large-image");
  image.src = asset(p.image, p.local);
  image.alt = p.alt;
  document.querySelector("#image-caption").textContent =
    `${galleryLabel} · ${selectedPhoto + 1} / ${currentGallery.length} · ${photoRef(p)}`;
  document
    .querySelectorAll("[data-step]")
    .forEach((b) => (b.disabled = currentGallery.length < 2));
}
function step(n) {
  selectedPhoto =
    (selectedPhoto + n + currentGallery.length) % currentGallery.length;
  showImage();
}
document
  .querySelector(".close-image")
  .addEventListener("click", () => dialog.close());
document
  .querySelectorAll("[data-step]")
  .forEach((b) => b.addEventListener("click", () => step(+b.dataset.step)));
dialog.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    step(1);
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    step(-1);
  }
});
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});
const menu = document.querySelector("#menu-toggle");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  document.querySelector(".header").classList.remove("menu-open");
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  document.querySelector(".header").classList.toggle("menu-open", open);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
window.addEventListener("hashchange", () => render());
render();
// Fotografías de participantes: solo en la revisión local, fuera del repositorio público.
if (["127.0.0.1", "localhost", "[::1]"].includes(location.hostname)) {
  fetch("local-gallery.json")
    .then((r) => (r.ok ? r.json() : {}))
    .then((galleries) => {
      for (const [id, photos] of Object.entries(galleries)) {
        const al = albums.find((x) => x.id === id);
        if (al)
          al.gallery.push(
            ...photos.filter(
              (p) => !al.gallery.some((x) => photoRef(x) === photoRef(p)),
            ),
          );
      }
      render({ keepScroll: true });
    })
    .catch(() => {});
}
document.querySelector(".skip").addEventListener("click", (e) => {
  e.preventDefault();
  main.focus({ preventScroll: true });
  main.scrollIntoView({ behavior: "instant" });
});
