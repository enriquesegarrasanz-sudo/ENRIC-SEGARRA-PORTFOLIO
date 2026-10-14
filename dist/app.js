import {
  site,
  works,
  albums,
  chapters,
  categories,
  albumRedirects,
} from "./content.js?v=20261014-series";
import { collections } from "./collections.js?v=20261014-series";
import { journeyEntries } from "./journey.js";
import { redirects } from "./catalogue.js?v=20261014-series";

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
import { applyTranslations, initLanguage } from "./i18n.js?v=20261014-series";
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
const asset = (name, local = false) => {
  const extension = ".webp";
  return `${local ? "review" : "assets"}/${encodeURIComponent(name)}${extension}?v=20260918-pintura-regenerada`;
};
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
  `<article class="work-card reveal">${a("/obra/" + w.id, `<div class="image-space">${img(w.thumb, w.alt)}</div><div class="caption"><span class="reference">${esc(w.reference)}</span><h3>${esc(w.label)}</h3><p>${esc(w.category === "moviles" ? "Móviles" : w.series === "Arcas" ? "Arcas de Noé" : w.series)}${w.gallery.length > 1 ? ` · ${w.gallery.length} vistas` : ""}</p></div>`)}</article>`;
const albumCard = (al) => {
  const reference = al.section === "exposiciones"
    ? [{ obra: "Obra propia", colectiva: "Colectiva", infantil: "Arte infantil", formacion: "Formación docente", sala: "Archivo de sala" }[al.exhibitionKind], al.date]
        .filter(Boolean)
        .map((value) => `<span>${esc(value)}</span>`)
        .join('<span aria-hidden="true"> · </span>')
    : `<span>${esc(al.audience === "educacion" ? educationSections.find((s) => s.id === al.section)?.label : al.type)}</span>`;
  return `<article class="album-card reveal">${a("/archivo/" + al.id, `<div class="album-image">${img(al.image, al.title)}</div><div class="caption"><span class="reference">${reference}</span><h3>${esc(al.title)}</h3><p>${al.gallery.length} fotografías ${arrow}</p></div>`)}</article>`;
};
const exhibitionKind = {
  obra: "Obra propia",
  colectiva: "Muestra colectiva",
  infantil: "Arte infantil",
  formacion: "Formación docente",
  sala: "Archivo de sala",
};
const exhibitionCard = (al) => {
  const details = [al.date, al.place]
    .filter(Boolean)
    .map((value) => `<span>${esc(value)}</span>`)
    .join('<span aria-hidden="true"> · </span>');
  return `<article class="exhibition-card reveal">${a("/archivo/" + al.id, `<div class="exhibition-image">${img(al.image, al.title)}<span class="exhibition-count">${al.gallery.length} fotografías</span></div><div class="exhibition-copy"><p class="eyebrow">${esc(exhibitionKind[al.exhibitionKind] || "Exposición")}</p><h2>${esc(al.title)}</h2>${details ? `<p class="exhibition-details">${details}</p>` : ""}<p class="exhibition-text">${esc(al.text)}</p><span class="exhibition-link">Recorrer el archivo <b aria-hidden="true">${arrow}</b></span></div><span class="exhibition-arrow" aria-hidden="true">${arrow}</span>`)}</article>`;
};
const workGrid = (ws) =>
    `<div class="works-grid">${ws.map(workCard).join("")}</div>`,
  albumGrid = (list) =>
    `<div class="albums-grid">${list.map(albumCard).join("")}</div>`,
  exhibitionList = (list) =>
    `<div class="exhibition-list">${list.map(exhibitionCard).join("")}</div>`;
const educationAlbums = () =>
  albums.filter((al) => al.audience === "educacion");
const visibleAlbums = () => albums;
let currentGallery = [],
  galleryLabel = "",
  selectedPhoto = 0,
  activeFilters = null,
  routeKey = "",
  familySlideStops = [],
  homeCarouselStop = null;

const collectionFor = (category, series) => collections[category]?.find(c => c.series === series);
const seriesLabel = (category, series) => collectionFor(category, series)?.label || series;
const sculptureFamilyFor = (work) => work.series;
function familyOptions(pool, category) {
  if (category === "moviles") return [];
  return collections[category]?.filter(c => pool.some(w => w.series === c.series)).map(c => c.series) || [...new Set(pool.map(w => w.series))];
}
function collectionCards(category) {
  return `<div class="section-directory collection-directory">${(collections[category] || []).map(c => {
    const cover = works.find(w => w.reference === c.cover);
    const count = works.filter(w => w.category === category && w.series === c.series).length;
    return directoryCard("/obra/" + category + "?serie=" + encodeURIComponent(c.series), c.label, cover.thumb, c.description).replace('</a>', `<small>${count} obras</small></a>`);
  }).join("")}</div>`;
}
function groupedWorks(list, category, view) {
  const groups = collections[category] || [];
  return groups.filter(c => list.some(w => w.series === c.series)).map(c => {
    const items = list.filter(w => w.series === c.series);
    return `<section class="catalogue-group"><div class="section-head"><h2>${esc(c.label)}</h2><span>${items.length} obras</span></div>${renderWorks(items, view)}</section>`;
  }).join("");
}

function home() {
  const slides = [
    {
      image: "hero-portrait-real-neutral-v3.webp",
      alt: "ENRIC SEGARRA I GARIBO sostiene una escultura de madera",
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
  return `<section class="home-introduction"><p class="eyebrow">Escultura · Pintura · Dibujo</p><h1>ENRIC SEGARRA I GARIBO</h1><p>${esc(site.intro)}</p></section><section class="home-carousel-hero"><div class="home-carousel-stage" data-home-carousel aria-roledescription="carrusel" aria-label="Selección de obra de ENRIC SEGARRA I GARIBO"><div class="home-carousel-slides">${slides.map((slide, i) => `<figure class="home-carousel-slide${i === 0 ? " is-active" : ""}" data-home-slide aria-hidden="${i === 0 ? "false" : "true"}"><img src="assets/${slide.image}" alt="${esc(slide.alt)}" loading="${i < 2 ? "eager" : "lazy"}" decoding="async"><figcaption class="home-carousel-label"><span>${esc(slide.kind)}</span></figcaption></figure>`).join("")}</div><div class="home-carousel-nav"><button type="button" data-home-carousel-next aria-label="Siguiente obra"><span aria-hidden="true">→</span></button></div></div></section>${homeDirectory()}`;
}


function directoryCard(path, title, image, description = "") {
  return a(path, `<div class="image-space">${img(image, title)}</div><h2>${esc(title)}</h2>${description ? `<p>${esc(description)}</p>` : ""}<span aria-hidden="true">↗</span>`, "section-card");
}
function homeDirectory() {
  return `<div class="section-directory">${directoryCard("/escultura-moviles", "Escultura y móviles", "escultura-madera")}${directoryCard("/jardin", "Jardín de las Lagartijas", "arc-014873", "Jardí de les Sargantanes · Espacio escultórico")}${directoryCard("/pintura-dibujo", "Pintura y dibujo", works.find(w => w.reference === "PIN-036").thumb)}${directoryCard("/arte-infantil", "Arte infantil", "arc-014341", "Una etapa de la trayectoria artística")}</div>`;
}
function sculptureAndMobiles() {
  return head("Obra", "Escultura y móviles", "Volumen, equilibrio y movimiento. La obra escultórica y las piezas suspendidas, reunidas en un mismo recorrido.") + `<div class="section-directory">${directoryCard("/obra/escultura", "Escultura", "escultura-madera")}${directoryCard("/obra/moviles", "Móviles", works.find(w => w.category === "moviles").thumb, "Una misma serie, instalada en el jardín de casa y en el Jardín de las Lagartijas.")}</div><div class="end-link">${a("/jardin", "Jardín de las Lagartijas — Jardí de les Sargantanes " + arrow)}</div>`;
}
function paintingAndDrawing() {
  return head("Obra", "Pintura y dibujo", "Tauromaquia, Gatos y Arcas de Noé, junto a otros conjuntos de pintura y obra sobre papel.") + collectionCards("pintura") + `<div class="end-link">${a("/obra/pintura", "Ver toda la pintura " + arrow)}</div><section class="section">${sectionHead("Dibujo", "/obra/dibujo", "Ver todos los dibujos")}${collectionCards("dibujo")}</section>`;
}
function garden() {
  const seen = new Set();
  const photos = ["arboles", "naturaleza-moviles"].flatMap(id => albums.find(al => al.id === id)?.gallery || []).filter(p => {
    const key = p.contentKey || p.archiveId + ":" + (p.sourcePage || "");
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
  setGallery(photos, "Jardín de las Lagartijas");
  return head("Espacio escultórico", "Jardín de las Lagartijas", "Jardí de les Sargantanes") + prose([
    "Un proyecto en un terreno rústico donde esculturas, árboles y móviles dialogan con el entorno natural. Se encuentra aproximadamente a un kilómetro del jardín de casa.",
    "Los móviles de tarjetas recicladas forman una misma serie artística, aunque se instalen en los dos espacios. Este recorrido reúne el archivo del entorno y las esculturas suspendidas, sin convertir sus distintas vistas en obras diferentes."
  ]) + `<div class="end-link">${a("/obra/moviles", "Ver la serie de móviles " + arrow)}</div><div class="gallery-grid" id="album-photos">${galleryGrid(photos.slice(0,36))}</div>${photos.length > 36 ? `<button class="load-more" id="more-photos" data-shown="36">Seguir viendo <span>36 / ${photos.length}</span></button>` : ""}`;
}
function trajectoryContact() {
  return artist().replace('<h1>ENRIC SEGARRA I GARIBO</h1>', '<h1>Trayectoria y contacto</h1>') + `<section class="section">${sectionHead("Exposiciones", "/exposiciones", "Ver exposiciones")}${albumGrid(albums.filter(al => al.section === "exposiciones" && al.audience !== "educacion").slice(0,3))}</section><section class="section" id="contacto">${sectionHead("Contacto")}${site.contactEmail ? `<a class="text-link" href="mailto:${esc(site.contactEmail)}">${esc(site.contactEmail)}</a><p><a class="text-link" href="tel:${esc(site.contactPhone)}">615 224 258</a></p>` : `<p>${esc(site.contactText)}</p>`}</section>`;
}

function workIndex(category = "todas", params = new URLSearchParams()) {
  const pool = works.filter(w => category === "todas" || w.category === category);
  const query = params.get("q") || "";
  const view = params.get("vista") === "recorrido" ? "recorrido" : "catalogo";
  const aliases = { "Arcas de Noé": "Arcas", "Rostros": "Rostros y personajes", "Dragones y relatos": "Relatos e iconografía", "Línea y color": "Dibujo y espacio" };
  const requested = params.get("serie") || "";
  const seriesList = familyOptions(pool, category);
  const candidate = aliases[requested] || requested;
  const series = seriesList.includes(candidate) ? candidate : "";
  const filtered = pool.filter(w => (!series || w.series === series) && normalize([w.label, w.series, w.reference, ...w.gallery.map(p => p.archiveId)].join(" ")).includes(normalize(query)));
  activeFilters = { category, query, series, view, filtered };
  const descriptions = {
    todas: "Móviles, escultura, pintura y dibujo.",
    moviles: "Una misma serie de esculturas suspendidas, presente en el jardín de casa y en el Jardín de las Lagartijas. Equilibrio, color y materiales recuperados en diálogo con el aire.",
    escultura: "Obras reunidas por su construcción, sus formas y su relación con el espacio.",
    pintura: "Series y conjuntos de pintura organizados por sus motivos y su lenguaje visual.",
    dibujo: "Líneas, planos y figuras sobre papel."
  };
  const collection = collectionFor(category, series);
  const showDirectory = !!collections[category] && !series && !query;
  const catalogue = category === "todas" ? categories.filter(c => c.id !== "todas").map(c => {
    const items = filtered.filter(w => w.category === c.id);
    return items.length ? `<section class="catalogue-group">${sectionHead(c.label, "/obra/" + c.id)}${renderWorks(items, view)}</section>` : "";
  }).join("") : collections[category] && !series ? groupedWorks(filtered, category, view) : renderWorks(filtered, view);
  return head(series ? catName(category) : "Catálogo de obra", collection?.label || (category === "todas" ? "Obra" : catName(category)), collection?.description || descriptions[category]) +
    `<nav class="tabs" aria-label="Disciplinas">${categories.map(c => a(c.id === "todas" ? "/obra" : "/obra/" + c.id, `${esc(c.label)} <sup>${works.filter(w => c.id === "todas" || w.category === c.id).length}</sup>`, c.id === category ? "active" : "")).join("")}</nav>` +
    (showDirectory ? `<section aria-label="Series y conjuntos">${collectionCards(category)}</section>` : "") +
    `<form class="catalogue-tools" id="catalogue-filters"><label class="search"><span class="sr-only">Buscar obras</span><input type="search" name="q" placeholder="Buscar descripción o referencia" value="${esc(query)}"><button aria-label="Buscar">↗</button></label>${seriesList.length ? `<label class="select-label">Serie o conjunto<select name="serie"><option value="">Todas las obras</option>${seriesList.map(name => `<option value="${esc(name)}" ${name === series ? "selected" : ""}>${esc(seriesLabel(category,name))}</option>`).join("")}</select></label>` : ""}<div class="view-toggle" aria-label="Presentación"><button type="button" data-view="catalogo" aria-pressed="${view === "catalogo"}">Cuadrícula</button><button type="button" data-view="recorrido" aria-pressed="${view === "recorrido"}">Recorrido ↓</button></div></form><div class="result-line"><p role="status">${filtered.length} ${filtered.length === 1 ? "obra" : "obras"}</p><p>Descripciones visuales de las obras</p></div><div id="catalogue-results">${catalogue}</div>${!filtered.length ? `<div class="empty"><h2>No hay obras con esa búsqueda.</h2>${a(category === "todas" ? "/obra" : "/obra/" + category, "Restablecer filtros " + arrow)}</div>` : ""}`;
}
function renderWorks(list, view) {
  return view === "catalogo"
    ? workGrid(list)
    : `<div class="work-walk">${list.map((w) => `<article class="walk-item reveal"><div><span class="reference">${esc(w.reference)}</span><h2>${esc(w.label)}</h2><p>${esc(w.series)}</p>${a("/obra/" + w.id, "Ver la obra" + (w.gallery.length > 1 ? ` · ${w.gallery.length} vistas` : "") + " " + arrow, "text-link")}</div>${a("/obra/" + w.id, img(w.image, w.alt))}</article>`).join("")}</div>`;
}
function setGallery(list, label) {
  currentGallery = list.slice();
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
  const related = works
    .filter(
      (x) =>
        (w.category === "escultura"
          ? sculptureFamilyFor(x) === sculptureFamilyFor(w)
          : x.series === w.series) && x.category === w.category && x.id !== w.id,
    )
    .slice(0, 3);
  return (
    trail("/obra/" + w.category, catName(w.category), w.reference) +
    `<section class="work-detail"><div class="work-stage"><button class="photo-button main-photo" data-photo="0" aria-label="Ampliar: ${esc(w.label)}">${img(w.image, w.alt, true)}<span class="zoom-mark" aria-hidden="true">↗</span></button>${w.gallery.length > 1 ? `<div class="thumbnails">${w.gallery.map((p, i) => `<button data-preview="${i}" aria-label="Ver perspectiva ${i + 1}" aria-pressed="${i === 0}">${img(p.thumb, p.alt)}</button>`).join("")}</div>` : ""}</div><div class="work-info"><p class="eyebrow">${esc(catName(w.category))} / ${esc(w.reference)}</p><h1>${esc(w.label)}</h1><p class="work-series">${esc(seriesLabel(w.category,w.series))}</p>${w.text && w.text !== w.label + "." ? prose([w.text]) : ""}<dl><div><dt>Autor</dt><dd>ENRIC SEGARRA I GARIBO</dd></div><div><dt>Archivo visual</dt><dd>${w.gallery.length} ${w.gallery.length === 1 ? "fotografía" : "fotografías"}</dd></div><div><dt>Identificación</dt><dd>Descripción visual</dd></div></dl><p class="note">Descripción visual para identificar la pieza. Título, fecha y técnica pendientes de documentación.</p>${a("/obra/" + w.category + "?serie=" + encodeURIComponent(w.category === "escultura" ? sculptureFamilyFor(w) : w.series), "Continuar por esta familia " + arrow, "text-link")}</div></section>${related.length ? `<section class="section">${sectionHead("En relación")}${workGrid(related)}</section>` : ""}`
  );
}
function albumPage(al) {
  setGallery(al.gallery, al.title);
  const parent =
      al.audience === "educacion"
        ? "/arte-infantil?seccion=" + al.section
        : al.section === "proceso" ? "/jardin" : "/exposiciones",
    label =
      al.audience === "educacion"
        ? "Arte infantil"
        : al.section === "proceso" ? "Jardín de las Lagartijas" : "Exposiciones";
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
      "Una etapa de la trayectoria artística: obras de participantes, talleres, formación y exposiciones infantiles reunidos en un solo lugar.",
    ) +
    tabs +
    `<section class="education-opening"><figure>${img("arc-014341", "Relieve realizado en una actividad de arte infantil", true)}<figcaption>La colección: materiales cotidianos, soluciones propias.</figcaption></figure><div>${prose(educationIntro.slice(0, 2))}${a("/imagenes?ambito=infantil", "Ver las imágenes de obras infantiles " + arrow, "text-link")}</div></section><div class="education-directory">${educationSections
      .slice(1)
      .map((item, i) => {
        const als = educationAlbums().filter((al) => al.section === item.id);
        const count = item.id === "textos"
          ? `<span>${readings.length} lecturas</span>`
          : `<span>${als.length} colecciones</span><span aria-hidden="true"> · </span><span>${als.reduce((n, al) => n + al.gallery.length, 0)} fotografías</span>`;
        return a(
          "/arte-infantil?seccion=" + item.id,
          `<div class="education-directory-image">${img(covers[item.id], item.label)}<span class="directory-count">${count}</span></div><div class="education-directory-copy"><span class="reference">${num(i + 1)}</span><h2>${item.label}</h2><p>${esc(educationDescriptions[item.id])}</p><span class="directory-link">Explorar ${arrow}</span></div>`,
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
  if (["infantil", "formacion", "educacion"].includes(params.get("tipo"))) {
    const group = params.get("tipo") === "educacion" ? "todas" : params.get("tipo");
    location.replace("#/arte-infantil?seccion=exposiciones&grupo=" + group);
    return "";
  }
  const f = params.get("tipo") || "todas",
    q = params.get("q") || "",
    view = params.get("vista") === "ampliada" ? "ampliada" : "mosaico",
    all = albums.filter((al) => al.section === "exposiciones" && al.audience !== "educacion");
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
    head("El artista", "ENRIC SEGARRA I GARIBO", site.intro) +
    `<section class="artist-layout">${img("retrato-artista", "ENRIC SEGARRA I GARIBO en un retrato de estudio", true)}<div>${prose(["Nacido en Barcelona en 1959 y formado en Bellas Artes en Valencia, ENRIC SEGARRA I GARIBO desarrolla una práctica que se mueve entre la escultura, la pintura y el dibujo. El conocimiento del oficio convive con la curiosidad por los materiales y con una atención constante a las formas de la naturaleza.", "Su trayectoria incluye la educación artística, los proyectos compartidos y la actividad expositiva. En los talleres, el volumen y la experimentación se convierten en una manera de acompañar la imaginación de los participantes.", "En su trabajo actual, las esculturas suspendidas mantienen abierta esa búsqueda. Piezas, colores y elementos recuperados se encuentran en composiciones que dialogan con el aire y el entorno."])}${a("/memoria", "Recorrer su trayectoria " + arrow, "text-link")}</div></section><section class="section">${sectionHead("Distintas formas de una misma búsqueda")}<div class="principles">${["Escultura y materia", "Pintura y dibujo", "Educación artística", "Exposiciones y proyectos"].map((t, i) => `<article><span class="reference">${num(i + 1)}</span><h3>${t}</h3>${a(["/obra/escultura", "/obra/pintura", "/arte-infantil", "/exposiciones"][i], "Explorar " + arrow)}</article>`).join("")}</div></section>`
  );
}
function contact() {
  return (
    head("Información", "Contacto", site.contactText) + `<p><a href="mailto:${esc(site.contactEmail)}">${esc(site.contactEmail)}</a></p><p><a href="tel:${esc(site.contactPhone)}">615 224 258</a></p>` +
    `<div class="prose"><p>Este espacio reúne la obra y la memoria artística de ENRIC SEGARRA I GARIBO. El archivo sigue creciendo con la identificación de piezas, documentos y fotografías.</p></div><div class="end-link">${a("/obra", "Volver a la obra " + arrow)}</div>`
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
    title = "ENRIC SEGARRA I GARIBO";
  } else if (section === "escultura-moviles") {
    html = sculptureAndMobiles(); title = "Escultura y móviles";
  } else if (section === "pintura-dibujo") {
    html = paintingAndDrawing(); title = "Pintura y dibujo";
  } else if (section === "jardin") {
    html = garden(); title = "Jardín de las Lagartijas";
  } else if (section === "trayectoria-contacto") {
    html = trajectoryContact(); title = "Trayectoria y contacto";
  } else if (section === "obra") {
    if (!id || categories.some((c) => c.id === id)) {
      html = workIndex(id || "todas", params);
      title = id ? catName(id) : "Obra";
    } else {
      const w = works.find((w) => w.id === id);
      html = w ? workDetail(w) : notFound();
      title = w?.label;
    }
  } else if (section === "imagenes") {
    html = imageArchive(params); title = "Archivo visual";
  } else if (section === "memoria") {
    const chapter = chapters.find(c => c.id === id);
    html = id ? (chapter ? chapterPage(chapter) : notFound()) : memory(new URLSearchParams("vista=archivo"));
    title = chapter?.title || "Trayectoria";
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
  document.documentElement.dataset.baseTitle = document.title;
  const al =
      section === "archivo" ? visibleAlbums().find((al) => al.id === id) : null,
    active =
      section === "textos" || al?.audience === "educacion"
        ? "arte-infantil"
        : al
          ? "exposiciones"
          : section;
  document.querySelectorAll("[data-nav]").forEach((el) => {
    const group = section === "obra" ? (["pintura", "dibujo"].includes(id) || ["pintura", "dibujo"].includes(works.find(w => w.id === id)?.category) ? "pintura-dibujo" : "escultura-moviles") : ["memoria", "artista", "contacto", "exposiciones"].includes(active) ? "trayectoria-contacto" : active;
    if (el.dataset.nav === group) el.setAttribute("aria-current", "page");
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
  attachJourneyEvents();
  attachHomeCarousel();
  applyTranslations(document);
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
      }, 4000);
    }
  };
  const pause = () => { paused = true; stop(); };
  const resume = () => { paused = false; schedule(); };
  next.addEventListener("click", () => { show(index + 1); schedule(); });
  carousel.addEventListener("mouseenter", pause);
  carousel.addEventListener("mouseleave", resume);
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
initLanguage();
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
