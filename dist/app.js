import {
  site,
  works,
  albums,
  chapters,
  categories,
  albumRedirects,
} from "./content.js?v=20260918-obra-integrada-5006c21";
import { redirects } from "./catalogue.js?v=20260918-obra-integrada-5006c21";

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
import {
  buildPhotoIndex,
  filterPhotos,
  archiveSections,
  normalize,
} from "./archive.js";
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
const assetExtension = (name) =>
  name.endsWith("-cool-neutral-v2") ? ".png" : ".webp";
const asset = (name, local = false) =>
  `${local ? "review" : "assets"}/${encodeURIComponent(name)}${name.endsWith("-cool-neutral-v2") ? ".png" : name === "retrato-artista" ? ".jpg" : ".webp"}?v=20260918-moviles-blanco-frio`;
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
  `<article class="album-card reveal">${a("/archivo/" + al.id, `<div class="album-image">${img(al.image, al.title)}</div><div class="caption"><span class="reference">${esc(al.section === "exposiciones" ? [{ obra: "Obra propia", colectiva: "Colectiva", infantil: "Arte infantil", formacion: "Formación docente", sala: "Archivo de sala" }[al.exhibitionKind], al.date].filter(Boolean).join(" · ") : al.audience === "educacion" ? educationSections.find((s) => s.id === al.section)?.label : al.type)}</span><h3>${esc(al.title)}</h3><p>${al.gallery.length} fotografías ${arrow}</p></div>`)}</article>`;
const exhibitionKind = {
  obra: "Obra propia",
  colectiva: "Muestra colectiva",
  infantil: "Arte infantil",
  formacion: "Formación docente",
  sala: "Archivo de sala",
};
const exhibitionCard = (al) => {
  const details = [al.date, al.place].filter(Boolean).join(" · ");
  return `<article class="exhibition-card reveal">${a("/archivo/" + al.id, `<div class="exhibition-image">${img(al.image, al.title)}<span class="exhibition-count">${al.gallery.length} fotografías</span></div><div class="exhibition-copy"><p class="eyebrow">${esc(exhibitionKind[al.exhibitionKind] || "Exposición")}</p><h2>${esc(al.title)}</h2>${details ? `<p class="exhibition-details">${esc(details)}</p>` : ""}<p class="exhibition-text">${esc(al.text)}</p><span class="exhibition-link">Recorrer el archivo <b aria-hidden="true">${arrow}</b></span></div><span class="exhibition-arrow" aria-hidden="true">${arrow}</span>`)}</article>`;
};
const workGrid = (ws) =>
    `<div class="works-grid">${ws.map(workCard).join("")}</div>`,
  albumGrid = (list) =>
    `<div class="albums-grid">${list.map(albumCard).join("")}</div>`,
  exhibitionList = (list) =>
    `<div class="exhibition-list">${list.map(exhibitionCard).join("")}</div>`;
const educationAlbums = () =>
  albums.filter((al) => al.audience === "educacion");
const visibleAlbums = () => albums.filter((al) => al.section !== "proceso");
let currentGallery = [],
  galleryLabel = "",
  selectedPhoto = 0,
  activeFilters = null,
  routeKey = "",
  familySlideStops = [],
  homeCarouselStop = null;

// The catalogue keeps the original series names for traceability, while the
// public-facing sculpture index groups closely related bodies of work together.
const sculptureFamilyGroups = [
  { label: "Relieves y ensamblajes", series: ["Relieves y ensamblajes"] },
  { label: "Volúmenes", series: ["Volúmenes", "Volúmenes abiertos"] },
  {
    label: "Estructuras y ensamblajes",
    series: ["Archivo de escultura", "Estructuras y ensamblajes"],
  },
  { label: "Intervenciones en el entorno", series: ["Intervenciones en el entorno"] },
];

function sculptureFamilyFor(work) {
  return (
    sculptureFamilyGroups.find((group) => group.series.includes(work.series))?.label ||
    work.series
  );
}

function familyOptions(pool, category) {
  if (category === "escultura") {
    return sculptureFamilyGroups
      .filter((group) => pool.some((work) => group.series.includes(work.series)))
      .map((group) => group.label);
  }
  return [...new Set(pool.map((work) => work.series))];
}

function home() {
  const slides = [
    {
      image: "hero-portrait-real-neutral-v3.webp",
      alt: "SEGARRA Y GARIBO sostiene una escultura de madera",
      kind: "presentación",
    },
    { image: "hero-work-circle-real-neutral-v3.webp", alt: "Escultura circular de metal y piezas articuladas", kind: "escultura" },
    { image: "hero-work-figure-real-neutral-v3.webp", alt: "Escultura vertical de piedra clara", kind: "escultura" },
    { image: "hero-work-arcs-real-neutral-v3.webp", alt: "Escultura oscura de brazos curvos sobre una peana", kind: "escultura" },
    { image: "hero-work-corrugated-real-neutral-v3.webp", alt: "Móvil suspendido de tubos corrugados", kind: "móvil" },
    { image: "hero-work-baskets-real-neutral-v3.webp", alt: "Móvil suspendido compuesto por cestas y elementos de color", kind: "móvil" },
    { image: "hero-work-wire-real-neutral-v3.webp", alt: "Estructura suspendida de alambre y esferas de madera", kind: "móvil" },
    { image: "hero-work-blue-green-drawing-real-neutral-v3.webp", alt: "Dibujo abstracto azul y verde", kind: "dibujo" },
    { image: "hero-work-painted-relief-real-neutral-v3.webp", alt: "Relieve pintado multicolor", kind: "pintura" },
  ];
  return `<section class="home-carousel-hero"><div class="home-carousel-stage" data-home-carousel aria-roledescription="carrusel" aria-label="Selección de obra de SEGARRA Y GARIBO"><div class="home-carousel-slides">${slides.map((slide, i) => `<figure class="home-carousel-slide${i === 0 ? " is-active" : ""}" data-home-slide aria-hidden="${i === 0 ? "false" : "true"}"><img src="assets/${slide.image}" alt="${esc(slide.alt)}" loading="${i < 2 ? "eager" : "lazy"}" decoding="async">${i === 0 ? `<figcaption class="home-carousel-intro"><p class="eyebrow">Archivo de obra</p><h1>SEGARRA<br>Y GARIBO</h1><p>Arte, materia y memoria en movimiento.</p><a href="#/obra/escultura">Entrar en la obra <span aria-hidden="true">↗</span></a></figcaption>` : `<figcaption class="home-carousel-label"><span>${esc(slide.kind)}</span></figcaption>`}</figure>`).join("")}</div><div class="home-carousel-nav"><button type="button" data-home-carousel-next aria-label="Siguiente obra"><span aria-hidden="true">→</span></button></div></div></section>`;
}

function workIndex(category = "todas", params = new URLSearchParams()) {
  const query = params.get("q") || "",
    view = params.get("vista") === "recorrido" ? "recorrido" : "catalogo",
    pool = works.filter((w) => category === "todas" || w.category === category),
    requestedSeries = params.get("serie") || "",
    series =
      category === "escultura"
        ? sculptureFamilyGroups.find(
            (group) =>
              group.label === requestedSeries || group.series.includes(requestedSeries),
          )?.label || requestedSeries
        : requestedSeries,
    seriesList = familyOptions(pool, category);
  const norm = (s) =>
    s
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  const filtered = pool.filter(
    (w) =>
      (!series ||
        (category === "escultura" ? sculptureFamilyFor(w) : w.series) === series) &&
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
  const sculptureFamilies =
    category === "escultura"
      ? `<section class="sculpture-families" aria-labelledby="sculpture-families-title"><div class="section-head"><div><p class="eyebrow">Clasificación provisional</p><h2 id="sculpture-families-title">Familias de la escultura</h2></div><p class="sculpture-families-note">Una entrada visual a los distintos modos de trabajar el volumen presentes en el archivo.</p></div><div class="family-grid">${seriesList.map((family) => { const familyWorks = pool.filter((w) => sculptureFamilyFor(w) === family); const selected = series === family ? " active" : ""; const countLabel = familyWorks.length === 1 ? "obra" : "obras"; const slides = familyWorks.slice(0, 6); return `<a class="family-card${selected}" href="#/obra/escultura?serie=${encodeURIComponent(family)}" aria-label="Ver ${familyWorks.length} ${countLabel} de ${esc(family)}"><div class="family-image"><div class="family-slideshow" data-family-slideshow aria-label="Imágenes de ${esc(family)}">${slides.map((w, i) => `<span class="family-slide${i === 0 ? " is-visible" : ""}" aria-hidden="${i === 0 ? "false" : "true"}">${img(w.thumb, w.alt, i === 0)}</span>`).join("")}</div></div><div class="family-copy"><span class="reference">${String(familyWorks.length).padStart(2, "0")} ${countLabel}</span><h3>${esc(family)}</h3><span class="family-link">Ver las obras <span aria-hidden="true">↗</span></span></div></a>`; }).join("")}</div></section>`
      : "";
  return (
    head(
      "Catálogo de obra",
      category === "todas" ? "Obra" : catName(category),
      descriptions[category],
    ) +
    `<nav class="tabs" aria-label="Disciplinas">${categories.map((c) => a(c.id === "todas" ? "/obra" : "/obra/" + c.id, `${esc(c.label)} <sup>${works.filter((w) => c.id === "todas" || w.category === c.id).length}</sup>`, c.id === category ? "active" : "")).join("")}</nav>${sculptureFamilies}<form class="catalogue-tools" id="catalogue-filters"><label class="search"><span class="sr-only">Buscar obras</span><input type="search" name="q" placeholder="Buscar título, familia o referencia" value="${esc(query)}"><button aria-label="Buscar">↗</button></label><label class="select-label">Familia<select name="serie"><option value="">Todas las familias</option>${seriesList.map((s) => `<option ${s === series ? "selected" : ""} value="${esc(s)}">${esc(s)}</option>`).join("")}</select></label><div class="view-toggle" aria-label="Presentación"><button type="button" data-view="catalogo" aria-pressed="${view === "catalogo"}">Cuadrícula</button><button type="button" data-view="recorrido" aria-pressed="${view === "recorrido"}">Recorrido ↓</button></div></form><div class="result-line"><p role="status">${filtered.length} ${filtered.length === 1 ? "obra" : "obras"}${series ? " · " + esc(series) : ""}</p><p>Nombres descriptivos provisionales</p></div><div id="catalogue-results">${renderWorks(category === "escultura" ? filtered : filtered.slice(0, 24), view)}</div>${category !== "escultura" && filtered.length > 24 ? `<button class="load-more" id="more-works" data-shown="24">Ver más obras <span>24 / ${filtered.length}</span></button>` : ""}${!filtered.length ? `<div class="empty"><h2>No hay obras con esa búsqueda.</h2>${a(category === "todas" ? "/obra" : "/obra/" + category, "Restablecer filtros " + arrow)}</div>` : ""}`
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
  let previousGroup = start ? currentGallery[start - 1]?.galleryGroup || "" : "";
  return list
    .map(
      (p, i) => {
        const group =
          p.galleryGroup && p.galleryGroup !== previousGroup
            ? `<header class="gallery-group"><p class="eyebrow">${esc(p.galleryGroup)}</p>${p.attribution ? `<p>${esc(p.attribution)}</p>` : ""}</header>`
            : "";
        previousGroup = p.galleryGroup || previousGroup;
        return `${group}<figure class="gallery-item reveal"><button class="photo-button" data-photo="${start + i}" aria-label="Ampliar fotografía ${start + i + 1}: ${esc(p.alt)}">${img(p.thumb, p.alt, false, p.local)}<span class="zoom-mark" aria-hidden="true">↗</span></button><figcaption><span>${num(start + i + 1)}</span><span>${esc(photoRef(p))}</span></figcaption></figure>`;
      },
    )
    .join("");
}
function educationPhotoIndex(section, list) {
  const label = educationSections.find((item) => item.id === section)?.label || "Arte infantil";
  const photos = list.flatMap((album) =>
    album.gallery.map((photo) => ({ ...photo, galleryGroup: album.title })),
  );
  setGallery(photos, label);
  return `<div class="result-line"><p>${photos.length} fotografías · ${list.length} salas</p>${a("/imagenes?ambito=" + (section === "obras" ? "infantil" : section), "Ver las fotografías con filtros " + arrow)}</div><div class="gallery-grid education-photo-grid">${galleryGrid(photos)}</div>`;
}

function workDetail(w) {
  setGallery(w.gallery, w.label);
  return `<section class="work-detail"><div class="work-stage"><button class="photo-button main-photo" data-photo="0" aria-label="Ampliar: ${esc(w.label)}">${img(w.image, w.alt, true)}<span class="zoom-mark" aria-hidden="true">↗</span></button>${w.gallery.length > 1 ? `<div class="thumbnails">${w.gallery.map((p, i) => `<button data-preview="${i}" aria-label="Ver perspectiva ${i + 1}" aria-pressed="${i === 0}">${img(p.thumb, p.alt)}</button>`).join("")}</div>` : ""}</div><div class="work-info"><h1>${esc(w.label)}</h1>${prose([w.text])}<dl><div><dt>Autor</dt><dd>SEGARRA Y GARIBO</dd></div></dl></div></section>`;
  const related = works
    .filter(
      (x) =>
        (w.category === "escultura"
          ? sculptureFamilyFor(x) === sculptureFamilyFor(w)
          : x.series === w.series) && x.id !== w.id,
    )
    .slice(0, 3);
  return (
    trail("/obra/" + w.category, catName(w.category), w.reference) +
    `<section class="work-detail"><div class="work-stage"><button class="photo-button main-photo" data-photo="0" aria-label="Ampliar: ${esc(w.label)}">${img(w.image, w.alt, true)}<span class="zoom-mark" aria-hidden="true">↗</span></button>${w.gallery.length > 1 ? `<div class="thumbnails">${w.gallery.map((p, i) => `<button data-preview="${i}" aria-label="Ver perspectiva ${i + 1}" aria-pressed="${i === 0}">${img(p.thumb, p.alt)}</button>`).join("")}</div>` : ""}</div><div class="work-info"><p class="eyebrow">${esc(catName(w.category))} / ${esc(w.reference)}</p><h1>${esc(w.label)}</h1><p class="work-series">${esc(w.category === "escultura" ? sculptureFamilyFor(w) : w.series)}</p>${prose([w.text])}<dl><div><dt>Autor</dt><dd>ENRIQUE SEGARRA I GARIBO</dd></div><div><dt>Archivo visual</dt><dd>${w.gallery.length} ${w.gallery.length === 1 ? "fotografía" : "fotografías"}</dd></div><div><dt>Identificación</dt><dd>Descripción provisional</dd></div></dl><p class="note">Título original, fecha, materiales y medidas por documentar.</p>${a("/obra/" + w.category + "?serie=" + encodeURIComponent(w.category === "escultura" ? sculptureFamilyFor(w) : w.series), "Continuar por esta familia " + arrow, "text-link")}</div></section>${related.length ? `<section class="section">${sectionHead("En relación")}${workGrid(related)}</section>` : ""}`
  );
}
function albumPage(al) {
  setGallery(al.gallery, al.title);
  const parent =
      al.audience === "educacion"
        ? "/arte-infantil?seccion=" + al.section
        : "/exposiciones",
    label =
      al.audience === "educacion"
        ? "Arte infantil"
        : "Exposiciones";
  return (
    trail(parent, label, al.title) +
    head(al.date || al.type, al.title, al.text) +
    `<div class="album-intro">${prose(al.paragraphs || [al.text])}<aside>${al.place ? `<p class="eyebrow">Lugar</p><p>${esc(al.place)}</p>` : ""}<p class="eyebrow">Archivo visual</p><p>${al.gallery.length} fotografías</p>${a("/imagenes?coleccion=" + al.id, "Abrir con filtros ↗", "text-link")}${al.credit ? `<p class="credit">${esc(al.credit)}</p>` : ""}</aside></div><div class="gallery-grid" id="album-photos">${galleryGrid(al.gallery.slice(0, 36))}</div>${al.gallery.length > 36 ? `<button class="load-more" id="more-photos" data-shown="36">Seguir viendo <span>36 / ${al.gallery.length}</span></button>` : ""}${al.source ? `<div class="source-note"><p class="eyebrow">Documentación</p><p>${esc(al.source)}</p></div>` : ""}<div class="end-link">${a(parent, "Volver a " + label.toLowerCase() + " " + arrow)}</div>`
  );
}

function education(params) {
  let section = params.get("seccion") || "proyecto";
  if (!educationSections.some((s) => s.id === section)) section = "proyecto";
  const list = educationAlbums().filter((al) => al.section === section);
  const tabs = `<nav class="tabs education-tabs" aria-label="Archivo educativo">${educationSections.map((s) => a("/arte-infantil" + (s.id === "proyecto" ? "" : "?seccion=" + s.id), esc(s.label), s.id === section ? "active" : "")).join("")}</nav>`;
  if (section !== "proyecto") {
    const intro =
      head(
        "Educación artística",
        educationSections.find((s) => s.id === section).label,
        educationDescriptions[section],
      ) + tabs;
    if (section === "textos") return intro + readingIndex();
    const group =
      section === "exposiciones" ? params.get("grupo") || "todas" : "";
    const shown = list.filter(
      (al) => group === "todas" || !group || al.exhibitionKind === group,
    );
    const filters =
      section === "exposiciones"
        ? `<nav class="subfilters" aria-label="Participantes de las exposiciones">${[
            ["todas", "Todas"],
            ["infantil", "Arte infantil"],
            ["formacion", "Formación de adultos"],
          ]
            .map(([v, t]) =>
              a(
                "/arte-infantil?seccion=exposiciones&grupo=" + v,
                t,
                v === group ? "active" : "",
              ),
            )
            .join("")}</nav>`
        : "";
    if (["obras", "talleres", "formacion"].includes(section)) {
      return intro + educationPhotoIndex(section, shown);
    }
    return (
      intro +
      filters +
      `<div class="result-line"><p>${shown.length} álbumes</p>${a("/imagenes?ambito=exposiciones", "Ver las fotografías con filtros " + arrow)}</div>` +
      albumGrid(shown)
    );
  }
  const covers = {
    obras: "arc-006379",
    talleres: "arc-005506",
    exposiciones: "arc-002472",
    formacion: "arc-005944",
    textos: "arc-000043",
  };
  return (
    head(
      "Educación artística",
      "Arte infantil",
      "Crear con las manos, descubrir el volumen y dar espacio a la imaginación.",
    ) +
    tabs +
    `<section class="education-opening"><figure>${img("arc-014341", "Relieve realizado en una actividad de arte infantil", true)}<figcaption>La colección: materiales cotidianos, soluciones propias.</figcaption></figure><div>${prose(educationIntro.slice(0, 2))}${a("/imagenes?ambito=infantil", "Ver las imágenes de obras infantiles " + arrow, "text-link")}</div></section><div class="education-directory">${educationSections
      .slice(1)
      .map((item, i) => {
        const als = educationAlbums().filter((al) => al.section === item.id);
        return a(
          "/arte-infantil?seccion=" + item.id,
          `<div class="education-directory-image">${img(covers[item.id], item.label)}<span class="directory-count">${item.id === "textos" ? readings.length + " lecturas" : als.length + " colecciones · " + als.reduce((n, al) => n + al.gallery.length, 0) + " fotografías"}</span></div><div class="education-directory-copy"><span class="reference">${num(i + 1)}</span><h2>${item.label}</h2><p>${esc(educationDescriptions[item.id])}</p><span class="directory-link">Explorar ${arrow}</span></div>`,
        );
      })
      .join(
        "",
      )}</div><section class="section">${sectionHead("Una manera de acompañar la creación")}<div class="principles">${educationPrinciples.map((p, i) => `<article><span class="reference">${num(i + 1)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></article>`).join("")}</div></section>`
  );
}

function readingIndex() {
  return `<div class="reading-index">${readings.map((r, i) => a("/textos/" + r.id, `<div class="reading-image">${img(r.image, r.title)}</div><div class="reading-copy"><span class="reference">${num(i + 1)} / ${esc(r.kind)}</span><h2>${esc(r.title)}</h2><p>${esc(r.authors)}</p><span class="reading-link">Leer la propuesta ${arrow}</span></div>`)).join("")}</div>`;
}
function readingPage(r) {
  return (
    trail("/arte-infantil?seccion=textos", "Ideas para crear", r.kind) +
    head(r.kind, r.title, r.subtitle) +
    `<div class="article-layout"><aside>${img(r.image, r.title)}<p>${esc(r.authors)}</p><p class="reference">Documento ${esc(r.reference)}</p><p class="note">Síntesis editorial del documento conservado en el archivo. No es una transcripción.</p></aside><article class="reading-body"><p class="article-intro">${esc(r.intro)}</p>${r.sections.map(([t, p]) => `<section><h2>${esc(t)}</h2><p>${esc(p)}</p></section>`).join("")}${a("/archivo/" + r.related, "Ver las imágenes relacionadas " + arrow, "text-link")}</article></div>`
  );
}
const chapterImages = {
  "aprender-oficio": "retrato",
  "construir-formas": "escultura-madera",
  "pintar-mundos": "gatos",
  "crear-con-otros": "arc-002472",
  "exponer-abrir-espacios": "arc-009086",
  "seguir-creando": "arc-014873",
};
function memory(params) {
  if (params.get("vista") === "archivo")
    return (
      head(
        "Vida y obra",
        "Índice del archivo",
        "Capítulos y álbumes de la memoria artística.",
      ) +
      `<div class="end-link">${a("/imagenes", "Abrir todas las fotografías con filtros " + arrow)}</div><div class="archive-index">${chapters.map((c, i) => a("/memoria/" + c.id, `<span>${num(i + 1)}</span><h2>${esc(c.title)}</h2><p>${esc(c.short)}</p>${arrow}`)).join("")}</div>` +
      albumGrid(visibleAlbums())
    );
  const entries = journeyEntries(chapters, visibleAlbums(), works),
    first = entries[0];
  return `<header class="journey-heading"><h1>Trayectoria</h1><p>Vida, obra y encuentros. Las fechas corresponden a episodios documentados; los demás recorridos son temáticos.</p></header><div class="journey"><aside class="journey-preview"><form id="journey-search" role="search"><label for="journey-query" class="sr-only">Buscar una etapa o un año</label><input id="journey-query" type="search" placeholder="Buscar una etapa o un año"><button aria-label="Buscar en la trayectoria">↗</button></form><p class="journey-help" id="journey-status">${entries.length} entradas · Recorre la lista para cambiar de imagen</p><a id="journey-image-link" href="#${first.path}"><figure><div class="journey-image">${img(first.image, first.title, true)}</div><figcaption><span id="journey-caption">${esc(first.title)}</span><span aria-hidden="true">→</span></figcaption></figure></a><div class="journey-controls"><button type="button" data-journey-step="-1" aria-label="Etapa anterior">←</button><span id="journey-position">01 / ${num(entries.length)}</span><button type="button" data-journey-step="1" aria-label="Etapa siguiente">→</button></div></aside><div class="journey-list" aria-label="Etapas y acontecimientos">${entries.map((e, i) => `<article class="journey-entry${i === 0 ? " selected" : ""}" data-entry="${i}"><a href="#${e.path}"><h2>${esc(e.label)}</h2><div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></div></a></article>`).join("")}<p id="journey-empty" hidden>No hay entradas con esa búsqueda. Prueba otro año, lugar o tema.</p></div></div>`;
}

function chapterPage(c) {
  const relatedWorks = works.filter((w) => w.chapter === c.id),
    relatedAlbums = visibleAlbums().filter((al) => al.chapter === c.id),
    i = chapters.indexOf(c);
  return `<div class="chapter-top">${a("/memoria", "← Trayectoria")}<span>${num(i + 1)} / ${num(chapters.length)}</span><div>${i > 0 ? a("/memoria/" + chapters[i - 1].id, "← Anterior") : ""}${i < chapters.length - 1 ? a("/memoria/" + chapters[i + 1].id, "Siguiente →") : ""}</div></div><header class="chapter-title"><p class="eyebrow">${esc(c.short)}</p><h1>${esc(c.title)}</h1></header><div class="chapter-reader"><aside class="chapter-contents"><p class="eyebrow">En este capítulo</p><button data-anchor="chapter-story">La memoria</button>${relatedWorks.length ? '<button data-anchor="chapter-works">La obra</button>' : ""}${relatedAlbums.length ? '<button data-anchor="chapter-albums">Imágenes y documentos</button>' : ""}</aside><div><section id="chapter-story"><figure class="chapter-hero">${img(chapterImages[c.id], c.imageAlt || c.title, true)}${c.caption ? `<figcaption>${esc(c.caption)}</figcaption>` : ""}</figure>${prose(c.paragraphs)}</section>${c.id === "crear-con-otros" ? `<div class="end-link">${a("/arte-infantil", "Explorar el archivo de arte infantil " + arrow)}</div>` : ""}${relatedWorks.length ? `<section class="section" id="chapter-works">${sectionHead("La obra", "/imagenes?q=" + encodeURIComponent(c.id === "construir-formas" ? "línea" : c.id === "seguir-creando" ? "móviles" : c.id === "pintar-mundos" ? "pintura" : ""), "Explorar imágenes")}${workGrid(relatedWorks.slice(0, 9))}</section>` : ""}${relatedAlbums.length ? `<section class="section" id="chapter-albums">${sectionHead("Imágenes y documentos")}${albumGrid(relatedAlbums)}</section>` : ""}</div></div>`;
}

function exhibitions(params) {
  const f = params.get("tipo") || "todas",
    q = params.get("q") || "",
    view = params.get("vista") === "ampliada" ? "ampliada" : "mosaico",
    all = albums.filter((al) => al.section === "exposiciones");
  const list = all.filter(
    (al) =>
      (f === "todas" ||
        al.exhibitionKind === f ||
        (f === "educacion" && al.audience === "educacion")) &&
      normalize([al.title, al.place, al.date, al.searchTerms].join(" ")).includes(
        normalize(q),
      ),
  );
  const types = [
    ["todas", "Todas"],
    ["obra", "Obra propia"],
    ["colectiva", "Colectivas"],
    ["infantil", "Arte infantil"],
    ["formacion", "Formación docente"],
    ["sala", "Sala"],
  ];
  return (
    head(
      "Encuentros con el público",
      "Exposiciones",
      "La obra en las salas y la memoria de los encuentros. Montajes, vistas del espacio y documentos, organizados por el contexto de cada exposición.",
    ) +
    `<nav class="tabs" aria-label="Tipo de exposición">${types.map(([id, t]) => a("/exposiciones?tipo=" + id, t + ` <sup>${all.filter((al) => id === "todas" || al.exhibitionKind === id).length}</sup>`, id === f ? "active" : "")).join("")}</nav><form class="exhibition-search" id="exhibition-search"><label class="search"><span class="sr-only">Buscar exposición, lugar o año</span><input type="search" name="q" placeholder="Buscar exposición, lugar o año" value="${esc(q)}"><button aria-label="Buscar exposición">↗</button></label><input type="hidden" name="tipo" value="${esc(f)}"><div class="view-toggle" aria-label="Presentación"><button type="button" data-exhibition-view="mosaico" aria-pressed="${view === "mosaico"}">Mosaico</button><button type="button" data-exhibition-view="ampliada" aria-pressed="${view === "ampliada"}">Vista amplia</button></div></form><div class="result-line"><p role="status">${list.length} exposiciones</p>${a("/imagenes?ambito=exposiciones", "Ver todas las fotografías " + arrow)}</div>${list.length ? `<div class="exhibition-results ${view === "ampliada" ? "is-expanded" : "is-grid"}">${exhibitionList(list)}</div>` : `<div class="empty"><h2>No hay exposiciones con esa búsqueda.</h2>${a("/exposiciones", "Restablecer filtros")}</div>`}<div class="source-note"><p>Las fechas documentadas se indican en cada archivo. Las muestras colectivas conservan diferenciadas las obras de sus participantes.</p></div>`
  );
}

function imageArchive(params) {
  const pool = buildPhotoIndex(works, visibleAlbums()),
    scope = params.get("ambito") || "",
    discipline = params.get("disciplina") || "",
    collection = params.get("coleccion") || "",
    query = params.get("q") || "";
  const filtered = filterPhotos(pool, { scope, discipline, collection, query });
  const opts = [
    ...new Map(
      pool
        .flatMap((p) => p.owners)
        .filter(
          (o) =>
            (!scope || o.scope === scope) &&
            (!discipline || o.discipline === discipline),
        )
        .map((o) => [o.id, o]),
    ).values(),
  ].sort((a, b) => a.label.localeCompare(b.label, "es"));
  setGallery(filtered, "Archivo visual");
  const option = (id, label, current) =>
    `<option value="${esc(id)}" ${id === current ? "selected" : ""}>${esc(label)}</option>`;
  return (
    head(
      "Fotografías y documentos",
      "Archivo visual",
      "Todas las fotografías incorporadas a la web. Obras, perspectivas, exposiciones y actividades, con acceso a la ficha o al álbum de cada imagen.",
    ) +
    `<form class="image-filters" id="image-filters"><label class="image-search">Buscar<input type="search" name="q" placeholder="Título, lugar, año, archivo o referencia" value="${esc(query)}"></label><label>Ámbito<select name="ambito">${option("", "Todos los ámbitos", scope)}${archiveSections.map(([id, t]) => option(id, t, scope)).join("")}</select></label><label>Disciplina<select name="disciplina">${option("", "Todas las disciplinas", discipline)}${categories
      .slice(1)
      .map((c) => option(c.id, c.label, discipline))
      .join(
        "",
      )}</select></label><label>Colección o ficha<select name="coleccion">${option("", "Todas las colecciones", collection)}${opts.map((o) => option(o.id, o.label, collection)).join("")}</select></label><button class="archive-search-button" type="submit">Buscar ↗</button></form><div class="result-line"><p role="status">${filtered.length} de ${pool.length} fotografías</p>${scope || discipline || collection || query ? a("/imagenes", "Quitar filtros ×") : "<p>Una imagen puede pertenecer a varios recorridos</p>"}</div><div class="photo-archive-grid" id="archive-photos">${archiveGrid(filtered.slice(0, 48))}</div>${filtered.length > 48 ? `<button class="load-more" id="more-archive" data-shown="48">Ver más imágenes <span>48 / ${filtered.length}</span></button>` : ""}${!filtered.length ? `<div class="empty"><h2>No hay imágenes con esos filtros.</h2>${a("/imagenes", "Ver todas las fotografías " + arrow)}</div>` : ""}`
  );
}
function archiveGrid(list, start = 0) {
  return list
    .map(
      (p, i) =>
        `<figure class="archive-photo"><button class="photo-button" data-photo="${start + i}" aria-label="Ampliar: ${esc(p.owners[0].label)} · ${esc(photoRef(p))}">${img(p.thumb, p.alt, false, p.local)}<span class="zoom-mark" aria-hidden="true">↗</span></button><figcaption><span class="reference">${esc(photoRef(p))}</span>${a(p.owners[0].path, esc(p.owners[0].label) + " " + arrow)}<span class="archive-context">${esc(archiveSections.find(([id]) => id === p.owners[0].scope)?.[1] || "Archivo")}${p.owners.length > 1 ? " · " + p.owners.length + " recorridos" : ""}</span></figcaption></figure>`,
    )
    .join("");
}
let pageEvents;
function attachArchiveEvents() {
  const form = document.querySelector("#image-filters");
  function filter(changed) {
    const data = new FormData(form),
      p = new URLSearchParams();
    if (changed === "ambito") {
      data.set("coleccion", "");
      if (data.get("ambito") !== "obra") data.set("disciplina", "");
    }
    if (changed === "disciplina") {
      data.set("coleccion", "");
      if (data.get("disciplina")) data.set("ambito", "obra");
    }
    for (const [k, v] of data) if (v) p.set(k, v);
    location.hash = "/imagenes" + (p.size ? "?" + p : "");
  }
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    filter();
  });
  form
    ?.querySelectorAll("select")
    .forEach((el) => el.addEventListener("change", () => filter(el.name)));
  document.querySelector("#more-archive")?.addEventListener("click", (e) => {
    const b = e.currentTarget,
      n = +b.dataset.shown,
      list = currentGallery.slice(n, n + 48);
    document
      .querySelector("#archive-photos")
      .insertAdjacentHTML("beforeend", archiveGrid(list, n));
    b.dataset.shown = n + list.length;
    b.innerHTML = `Ver más imágenes <span>${b.dataset.shown} / ${currentGallery.length}</span>`;
    if (+b.dataset.shown >= currentGallery.length) b.remove();
  });
  document
    .querySelector("#exhibition-search")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      location.hash =
        "/exposiciones?" + new URLSearchParams(new FormData(e.currentTarget));
    });
  document
    .querySelectorAll("[data-anchor]")
    .forEach((b) =>
      b.addEventListener("click", () =>
        document
          .getElementById(b.dataset.anchor)
          ?.scrollIntoView({ behavior: "instant" }),
      ),
    );
}
function attachJourneyEvents() {
  const list = document.querySelector(".journey-list");
  if (!list) return;
  const entries = journeyEntries(chapters, albums, works),
    rows = [...list.querySelectorAll("[data-entry]")];
  let active = 0,
    sequence = 0;
  const select = (i) => {
    active = i;
    const e = entries[i],
      token = ++sequence,
      link = document.querySelector("#journey-image-link"),
      image = link.querySelector("img");
    rows.forEach((row, j) => row.classList.toggle("selected", i === j));
    // Decode before swapping so scrolling never blanks the fixed photograph.
    const next = new Image();
    next.src = asset(e.image);
    next
      .decode()
      .catch(() => {})
      .then(() => {
        if (token !== sequence || !link.isConnected) return;
        image.src = next.src;
        image.alt = e.title;
        link.href = "#" + e.path;
        document.querySelector("#journey-caption").textContent = e.title;
      });
    document.querySelector("#journey-position").textContent =
      `${num(i + 1)} / ${num(entries.length)}`;
  };
  rows.forEach((row, i) => {
    row.addEventListener("pointerenter", () => select(i));
    row.addEventListener("focusin", () => select(i));
  });
  const search = document.querySelector("#journey-query");
  const applySearch = () => {
    const q = normalize(search.value);
    rows.forEach(
      (r, i) =>
        (r.hidden = !normalize(
          [entries[i].label, entries[i].title, entries[i].text].join(" "),
        ).includes(q)),
    );
    const visible = rows.filter((r) => !r.hidden);
    document.querySelector("#journey-empty").hidden = visible.length > 0;
    document.querySelector("#journey-status").textContent =
      `${visible.length} entradas · Recorre la lista para cambiar de imagen`;
    document.querySelector("#journey-image-link").hidden = !visible.length;
    document.querySelector(".journey-controls").hidden = !visible.length;
    if (visible.length) select(+visible[0].dataset.entry);
  };
  search.addEventListener("input", applySearch);
  document.querySelector("#journey-search").addEventListener("submit", (e) => {
    e.preventDefault();
    applySearch();
  });
  document.querySelectorAll("[data-journey-step]").forEach((b) =>
    b.addEventListener("click", () => {
      const visible = rows.filter((r) => !r.hidden),
        n = visible.indexOf(rows[active]),
        row =
          visible[
            (n + Number(b.dataset.journeyStep) + visible.length) %
              visible.length
          ];
      if (row) {
        select(+row.dataset.entry);
        row.scrollIntoView({ block: "center", behavior: "instant" });
      }
    }),
  );
  let scheduled = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        if (!list.isConnected) return;
        const line =
          innerWidth <= 760
            ? document.querySelector(".journey-preview").getBoundingClientRect()
                .bottom + 50
            : innerHeight * 0.45;
        const visible = rows.filter((r) => !r.hidden);
        const closest = visible.reduce(
          (best, r) =>
            Math.abs(
              r.getBoundingClientRect().top + r.offsetHeight / 2 - line,
            ) <
            Math.abs(
              best.getBoundingClientRect().top + best.offsetHeight / 2 - line,
            )
              ? r
              : best,
          visible[0],
        );
        if (closest && +closest.dataset.entry !== active)
          select(+closest.dataset.entry);
      });
    },
    { passive: true, signal: pageEvents.signal },
  );
}

function artist() {
  return (
    head("El artista", "ENRIQUE SEGARRA I GARIBO", site.intro) +
    `<section class="artist-layout">${img("retrato-artista", "ENRIQUE SEGARRA I GARIBO en un retrato de estudio", true)}<div>${prose(["Nacido en Barcelona en 1959 y formado en Bellas Artes en Valencia, ENRIQUE SEGARRA I GARIBO desarrolla una práctica que se mueve entre la escultura, la pintura y el dibujo. El conocimiento del oficio convive con la curiosidad por los materiales y con una atención constante a las formas de la naturaleza.", "Su trayectoria incluye la educación artística, los proyectos compartidos y la actividad expositiva. En los talleres, el volumen y la experimentación se convierten en una manera de acompañar la imaginación de los participantes.", "En su trabajo actual, las esculturas suspendidas mantienen abierta esa búsqueda. Piezas, colores y elementos recuperados se encuentran en composiciones que dialogan con el aire y el entorno."])}${a("/memoria", "Recorrer su trayectoria " + arrow, "text-link")}</div></section><section class="section">${sectionHead("Distintas formas de una misma búsqueda")}<div class="principles">${["Escultura y materia", "Pintura y dibujo", "Educación artística", "Exposiciones y proyectos"].map((t, i) => `<article><span class="reference">${num(i + 1)}</span><h3>${t}</h3>${a(["/obra/escultura", "/obra/pintura", "/arte-infantil", "/exposiciones"][i], "Explorar " + arrow)}</article>`).join("")}</div></section>`
  );
}
function contact() {
  return (
    head("Información", "Contacto", site.contactText) +
    `<div class="prose"><p>Este espacio reúne la obra y la memoria artística de ENRIQUE SEGARRA I GARIBO. El archivo sigue creciendo con la identificación de piezas, documentos y fotografías.</p></div><div class="end-link">${a("/obra", "Volver a la obra " + arrow)}</div>`
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
  pageEvents?.abort();
  pageEvents = new AbortController();
  activeFilters = null;
  currentGallery = [];
  if (section === "obra" && redirects[id]) {
    location.replace("#/obra/" + redirects[id]);
    return;
  }
  if (section === "inicio") {
    html = home();
    title = "ENRIQUE SEGARRA I GARIBO";
  } else if (section === "obra") {
    if (!id || categories.some((c) => c.id === id)) {
      html = workIndex(id || "todas", params);
      title = id ? catName(id) : "Obra";
    } else {
      const w = works.find((w) => w.id === id);
      html = w ? workDetail(w) : notFound();
      title = w?.label;
    }
  } else if (section === "imagenes" || section === "memoria") {
    html = notFound();
    title = "Página no encontrada";
  } else if (section === "arte-infantil") {
    html = education(params);
    title = "Arte infantil";
  } else if (section === "textos") {
    const r = readings.find((r) => r.id === id);
    html = r ? readingPage(r) : notFound();
    title = r?.title;
  } else if (section === "archivo") {
    if (albumRedirects[id]) {
      const destination = albumRedirects[id];
      location.replace(
        "#" +
          (destination.startsWith("/")
            ? destination
            : "/archivo/" + destination),
      );
      return;
    }
    const al = visibleAlbums().find((al) => al.id === id);
    html = al ? albumPage(al) : notFound();
    title = al?.title;
  } else if (section === "exposiciones") {
    html = exhibitions(params);
    title = "Exposiciones";
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
  document.title = title === site.name ? site.name : `${title || "Archivo"} — ${site.name}`;
  const al =
      section === "archivo" ? visibleAlbums().find((al) => al.id === id) : null,
    active =
      section === "textos" || al?.audience === "educacion"
        ? "arte-infantil"
        : al
          ? "exposiciones"
          : section;
  document.querySelectorAll("[data-nav]").forEach((el) => {
    if (el.dataset.nav === active) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
  closeMenu();
  const shouldRevealSculptureResults =
    !keepScroll &&
    section === "obra" &&
    id === "escultura" &&
    params.has("serie");
  if (!keepScroll && !shouldRevealSculptureResults) {
    const root = document.documentElement,
      previousScrollBehavior = root.style.scrollBehavior,
      resetScroll = () =>
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    root.style.scrollBehavior = "auto";
    resetScroll();
    requestAnimationFrame(() => {
      resetScroll();
      root.style.scrollBehavior = previousScrollBehavior;
    });
    if (routeKey) main.focus({ preventScroll: true });
  }
  routeKey = raw;
  attachPageEvents();
  attachArchiveEvents();
  attachFamilySlideshows();
  attachHomeCarousel();
  observe();
  if (shouldRevealSculptureResults) {
    requestAnimationFrame(() => {
      document.querySelector("#catalogue-results")?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    });
  }
}
function observe() {}

function attachFamilySlideshows() {
  familySlideStops.forEach((stop) => stop());
  familySlideStops = [];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll("[data-family-slideshow]").forEach((slideshow) => {
    const slides = [...slideshow.querySelectorAll(".family-slide")];
    if (slides.length < 2 || reduceMotion.matches) return;
    const card = slideshow.closest(".family-card");
    let index = 0,
      timer = null;
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };
    const show = (next) => {
      slides[index].classList.remove("is-visible");
      slides[index].setAttribute("aria-hidden", "true");
      slides[next].classList.add("is-visible");
      slides[next].setAttribute("aria-hidden", "false");
      index = next;
    };
    const start = () => {
      stop();
      if (!document.hidden) {
        timer = window.setInterval(
          () => show((index + 1) % slides.length),
          3600,
        );
      }
    };
    card?.addEventListener("mouseenter", stop);
    card?.addEventListener("mouseleave", start);
    card?.addEventListener("focusin", stop);
    card?.addEventListener("focusout", (event) => {
      if (!card.contains(event.relatedTarget)) start();
    });
    start();
    familySlideStops.push(stop);
  });
}

function attachHomeCarousel() {
  homeCarouselStop?.();
  homeCarouselStop = null;
  const carousel = document.querySelector("[data-home-carousel]");
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll("[data-home-slide]")];
  const next = carousel.querySelector("[data-home-carousel-next]");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0, timer = null, paused = false;
  const show = (target) => {
    slides[index].classList.remove("is-active");
    slides[index].setAttribute("aria-hidden", "true");
    index = (target + slides.length) % slides.length;
    slides[index].classList.add("is-active");
    slides[index].setAttribute("aria-hidden", "false");
  };
  const stop = () => {
    if (timer) window.clearTimeout(timer);
    timer = null;
  };
  const schedule = () => {
    stop();
    if (!paused && !reduceMotion.matches && !document.hidden) {
      timer = window.setTimeout(() => {
        show(index + 1);
        schedule();
      }, 4800);
    }
  };
  const pause = () => { paused = true; stop(); };
  const resume = () => { paused = false; schedule(); };
  next.addEventListener("click", () => { show(index + 1); schedule(); });
  carousel.addEventListener("focusin", pause);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) resume();
  });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : schedule(), { signal: pageEvents.signal });
  reduceMotion.addEventListener("change", schedule, { signal: pageEvents.signal });
  schedule();
  homeCarouselStop = stop;
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
  document.querySelector("#exhibition-search")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget), p = new URLSearchParams();
    if (data.get("tipo") && data.get("tipo") !== "todas") p.set("tipo", data.get("tipo"));
    if (data.get("q")) p.set("q", data.get("q"));
    const current = new URLSearchParams(location.hash.split("?")[1] || "");
    if (current.get("vista") === "ampliada") p.set("vista", "ampliada");
    location.hash = "/exposiciones" + (p.size ? "?" + p.toString() : "");
  });
  document.querySelectorAll("[data-exhibition-view]").forEach((b) =>
    b.addEventListener("click", () => {
      const current = new URLSearchParams(location.hash.split("?")[1] || "");
      current.set("vista", b.dataset.exhibitionView);
      location.hash = "/exposiciones?" + current.toString();
    }),
  );
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
    document.getElementById("etapa-" + jump.dataset.jump)?.scrollIntoView({
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
    `${p.owners?.[0]?.label || galleryLabel} · ${selectedPhoto + 1} / ${currentGallery.length} · ${photoRef(p)}`;
  document.querySelector("#image-context").innerHTML = p.owners
    ? p.owners
        .map(
          (o) =>
            a(o.path, esc(o.label) + " ↗") + `<span>${esc(o.credit)}</span>`,
        )
        .join("")
    : p.attribution
      ? `<span>${esc(p.attribution)}</span>`
      : "";
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
const artistName = "ENRIC SEGARRA I GARIBO";
const replaceArtistName = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    walker.currentNode.nodeValue = walker.currentNode.nodeValue.replaceAll("ENRIQUE SEGARRA I GARIBO", artistName);
  }
  document.querySelectorAll(".home-carousel-intro h1").forEach((heading) => {
    heading.innerHTML = "ENRIC SEGARRA<br>I GARIBO";
  });
};
replaceArtistName();
new MutationObserver(replaceArtistName).observe(document.body, { childList: true, subtree: true });
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
