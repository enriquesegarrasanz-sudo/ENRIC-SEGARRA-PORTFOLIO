import {
  site,
  works,
  albums,
  chapters,
  categories,
  albumRedirects,
} from "./content.js?v=20261026-gatos";
import { collections } from "./collections.js?v=20261026-gatos";
import { journeyEntries } from "./journey.js";
import { redirects } from "./catalogue.js?v=20261026-gatos";

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
import { applyTranslations, initLanguage } from "./i18n.js?v=20261026-portada-curatorial";
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
  const total = String(slides.length).padStart(2, "0");
  return `<section class="home-hero" data-home-carousel aria-roledescription="carrusel" aria-label="Selección de obra de ENRIC SEGARRA I GARIBO"><div class="home-introduction"><p class="eyebrow">Escultura · Pintura · Dibujo</p><h1>ENRIC SEGARRA I GARIBO</h1><p class="home-intro-lead">${esc(site.intro)}</p><div class="home-carousel-meta"><div class="home-carousel-bar"><span class="home-carousel-counter" data-home-carousel-counter>01 / ${total}</span><span class="home-carousel-kinds">${slides.map((slide, i) => `<span class="home-carousel-kind${i === 0 ? " is-active" : ""}" data-home-kind>${esc(slide.kind)}</span>`).join("")}</span><div class="home-carousel-controls"><button type="button" data-home-carousel-prev aria-label="Anterior obra"><span aria-hidden="true">←</span></button><button type="button" data-home-carousel-next aria-label="Siguiente obra"><span aria-hidden="true">→</span></button></div></div><div class="home-carousel-captions">${slides.map((slide, i) => `<p class="home-carousel-caption${i === 0 ? " is-active" : ""}" data-home-caption>${esc(slide.alt)}</p>`).join("")}</div><div class="home-carousel-dots" role="tablist" aria-label="Obras en portada">${slides.map((slide, i) => `<button type="button" class="home-carousel-dot${i === 0 ? " is-active" : ""}" data-home-carousel-dot="${i}" aria-label="${esc(slide.alt)}" aria-current="${i === 0 ? "true" : "false"}"></button>`).join("")}</div></div></div><div class="home-carousel-hero"><div class="home-carousel-stage" data-home-carousel-stage title="Siguiente obra"><div class="home-carousel-slides">${slides.map((slide, i) => `<figure class="home-carousel-slide${i === 0 ? " is-active" : ""}" data-home-slide aria-hidden="${i === 0 ? "false" : "true"}"><img src="assets/${slide.image}" alt="${esc(slide.alt)}" loading="${i < 2 ? "eager" : "lazy"}" decoding="async"><figcaption class="home-carousel-label"><span>${esc(slide.kind)}</span></figcaption></figure>`).join("")}</div></div></div></section>${homeDirectory()}`;
}


function directoryCard(path, title, image, description = "") {
  return a(path, `<div class="image-space">${img(image, title)}</div><h2>${esc(title)}</h2>${description ? `<p>${esc(description)}</p>` : ""}<span aria-hidden="true">↗</span>`, "section-card");
}
function homeDirectory() {
  const sections = [
    {
      num: "01",
      path: "/moviles",
      title: "Móviles",
      meta: "33 obras · Escultura suspendida",
      description: "Una misma serie, instalada en el jardín de casa y en el Jardín de las Lagartijas.",
      highlights: "Equilibrio · Aire · Materiales recuperados",
      frames: [
        { src: "gallery-015021-cool-neutral-v2", alt: "Círculo abierto de muchos colores (MOV-028)", mode: "studio" },
        { src: "hero-work-corrugated-real-neutral-v3", alt: "Móvil suspendido de tubos corrugados", mode: "studio" },
        { src: "hero-work-baskets-real-neutral-v3", alt: "Móvil suspendido compuesto por cestas y elementos de color", mode: "studio" },
      ],
    },
    {
      num: "02",
      path: "/escultura",
      title: "Escultura",
      meta: "55 obras · 7 conjuntos",
      description: "Planos plegados, madera, hierro, piedra y relieves murales",
      highlights: "Hierro forjado · Planos curvos · Talla en madera",
      frames: [
        { src: "hero-work-circle-real-neutral-v3", alt: "Escultura circular de metal y piezas articuladas", mode: "studio" },
        { src: "gallery-esc-031", alt: "Plano abierto con curvas ascendentes (ESC-031)", mode: "studio" },
        { src: "gallery-esc-009", alt: "Forma curva con veta (ESC-009)", mode: "studio" },
      ],
    },
    {
      num: "03",
      path: "/jardin",
      title: "Jardín de las Lagartijas",
      meta: "Espacio escultórico en la naturaleza",
      description: "Jardí de les Sargantanes · Espacio escultórico",
      highlights: "Árboles · Viento · Paisaje rústico",
      frames: [
        { src: "nature-014851", alt: "Planos de color entre los árboles (MOV-017)", mode: "cover" },
        { src: "arc-014873", alt: "Obras suspendidas bajo la encina en el Jardín de las Lagartijas", mode: "cover" },
        { src: "arc-014957", alt: "Cestas suspendidas entre las ramas (MOV-022)", mode: "cover" },
      ],
    },
    {
      num: "04",
      path: "/pintura",
      title: "Pintura",
      meta: "80 obras · 8 series pictóricas",
      description: "Tauromaquia, Gatos y Arcas de Noé, junto a otras series",
      highlights: "Arcas de Noé · Tauromaquia · Gatos",
      frames: [
        { src: "pin-001-estudio-v3", alt: "Arca en composición circular (PIN-001)", mode: "studio" },
        { src: "pin-069-estudio-v3", alt: "Toro y figuras (PIN-069)", mode: "studio" },
        { src: "pin-023-estudio-v3", alt: "Gato de cuerpo violeta (PIN-023)", mode: "studio" },
      ],
    },
    {
      num: "05",
      path: "/dibujo",
      title: "Dibujo",
      meta: "53 obras · Papel y espacio",
      description: "Líneas, planos y figuras sobre papel",
      highlights: "Dibujo y espacio · Color · Figura",
      frames: [
        { src: "drawing-015081-catalogue", alt: "Estudio de formas en rojo (DIB-003)", mode: "studio" },
        { src: "drawing-015098-catalogue", alt: "Planos azules, verdes y amarillos (DIB-019)", mode: "studio" },
        { src: "hero-work-blue-green-drawing-real-neutral-v3", alt: "Dibujo abstracto azul y verde", mode: "studio" },
      ],
    },
    {
      num: "06",
      path: "/arte-infantil",
      title: "Arte infantil",
      meta: "20 colecciones · Pedagogía y creación",
      description: "Una etapa de la trayectoria artística",
      highlights: "Exposiciones · Talleres · Creación colectiva",
      frames: [
        { src: "bellas-arc-012548", alt: "Arte infantil en la Sala de Bellas Artes", mode: "cover" },
        { src: "arc-002472", alt: "Exposición de arte infantil en Casa Abadía", mode: "cover" },
        { src: "arc-000043", alt: "Pintar y construir en común", mode: "cover" },
      ],
    },
    {
      num: "07",
      path: "/exposiciones",
      title: "Exposiciones",
      meta: "Archivo de muestras y salas",
      description: "La obra en las salas y la memoria de los encuentros.",
      highlights: "Palacio Colomina · Bellas Artes · Caixa Castelló",
      frames: [
        { src: "colomina-009086-professional", alt: "Exposición de escultura en el Palacio Colomina", mode: "cover" },
        { src: "evolucion-013392-restored", alt: "Sala d’Exposicions de les Belles Arts · Evolución 1984–2004", mode: "cover" },
        { src: "arc-009490", alt: "Exposición de dibujo y escultura en Caixa Castelló", mode: "cover" },
      ],
    },
    {
      num: "08",
      path: "/trayectoria-contacto",
      title: "Trayectoria y contacto",
      meta: "Biografía · 1959 — presente",
      description: "Vida, taller, capítulos de creación y contacto directo.",
      highlights: "Orígenes · Taller · Contacto",
      frames: [
        { src: "hero-portrait-real-neutral-v3", alt: "ENRIC SEGARRA I GARIBO sostiene una escultura de madera", mode: "studio" },
        { src: "retrato-artista", alt: "Retrato de ENRIC SEGARRA I GARIBO", mode: "cover" },
        { src: "arc-014923", alt: "ENRIC SEGARRA I GARIBO junto a un móvil en el jardín", mode: "cover" },
      ],
    },
  ];
  return `<section class="home-sections" aria-label="Apartados del archivo"><div class="home-sections-head"><p class="eyebrow">Recorrido por el archivo</p><span>08 apartados</span></div><div class="home-sections-grid">${sections.map((s) => {
    const [mainFrame, ...sideFrames] = s.frames;
    return a(
      s.path,
      `<div class="home-section-topline"><span class="home-section-num">${s.num}</span><span class="home-section-meta">${esc(s.meta)}</span><span class="home-section-arrow" aria-hidden="true">↗</span></div><div class="home-section-triptych"><div class="home-section-frame is-main is-${mainFrame.mode}">${img(mainFrame.src, mainFrame.alt)}</div><div class="home-section-side">${sideFrames.map((f) => `<div class="home-section-frame is-secondary is-${f.mode}">${img(f.src, f.alt)}</div>`).join("")}</div></div><div class="home-section-body"><div class="home-section-title-row"><h2>${esc(s.title)}</h2><span class="home-section-highlights">${esc(s.highlights)}</span></div><p>${esc(s.description)}</p></div>`,
      "home-section-card",
    );
  }).join("")}</div></section>`;
}
function sculpture() {
  return head("Obra", "Escultura", "Planos plegados, madera, hierro, piedra y relieves murales.") + collectionCards("escultura") + `<div class="end-link">${a("/obra/escultura", "Ver toda la escultura " + arrow)}</div>`;
}
function mobiles(params) {
  return workIndex("moviles", params);
}
function sculptureAndMobiles() {
  return sculpture();
}
function painting() {
  return head("Obra", "Pintura", "Tauromaquia, Gatos y Arcas de Noé, junto a otros conjuntos de pintura.") + collectionCards("pintura") + `<div class="end-link">${a("/obra/pintura", "Ver toda la pintura " + arrow)}</div>`;
}
function drawing() {
  return head("Obra", "Dibujo", "Líneas, planos y figuras sobre papel.") + collectionCards("dibujo") + `<div class="end-link">${a("/obra/dibujo", "Ver todos los dibujos " + arrow)}</div>`;
}
function paintingAndDrawing() {
  return painting();
}
function garden() {
  const mov17 = works.find(w => w.reference === "MOV-017");
  const rawMov22 = works.find(w => w.reference === "MOV-022");
  const mov22 = rawMov22 ? { ...rawMov22, thumb: "arc-014957", image: "arc-014957" } : null;
  const allowed = ["ARC-014916", "ARC-014923", "ARC-014849", "ARC-014851", "ARC-014957"];
  const allPhotos = ["arboles", "naturaleza-moviles"].flatMap(id => albums.find(al => al.id === id)?.gallery || []);
  const photos = allowed.map(id => {
    if (id === "ARC-014851" && mov17) {
      return {
        ...mov17.gallery[0],
        alt: `${mov17.label} (${mov17.reference})`,
        owners: [{ id: mov17.id, label: `${mov17.label} (${mov17.reference})`, path: `/obra/${mov17.id}`, scope: "obra" }]
      };
    }
    if (id === "ARC-014957" && rawMov22) {
      const p3 = rawMov22.gallery.find(p => p.archiveId === "ARC-014957") || rawMov22.gallery[2] || rawMov22.gallery[0];
      return {
        ...p3,
        alt: `${rawMov22.label} (${rawMov22.reference}) · vista 3`,
        owners: [{ id: rawMov22.id, label: `${rawMov22.label} (${rawMov22.reference})`, path: `/obra/${rawMov22.id}`, scope: "obra" }]
      };
    }
    return allPhotos.find(p => p.archiveId === id);
  }).filter(Boolean);
  setGallery(photos, "Jardín de las Lagartijas");
  const gardenWorks = [mov17, mov22].filter(Boolean);
  return (
    head("Espacio escultórico", "Jardín de las Lagartijas", "Jardí de les Sargantanes") +
    `<blockquote class="artist-statement">` +
      `<p class="statement-eyebrow">Reflexión sobre la naturaleza</p>` +
      `<div class="statement-body">` +
        `<p>En el silencio y el recogimiento, hablar a la naturaleza con gratitud, respeto y amor es volver a tender un puente hacia ella. Escucharla, reconocer su presencia y dejarnos tocar por su misterio quizá sea la forma más íntima de recuperar el vínculo que nos une.</p>` +
        `<p>Mi obra escultórica transita por diversos lenguajes y materiales. En estos espacios de móviles, sin embargo, es la propia naturaleza quien ofrece la materia: ramas, formas y elementos nacidos del lugar, cargados de su tiempo y de su memoria.</p>` +
        `<p>La obra se despliega en diálogo con el entorno. Se mueve con el aire, respira con el paisaje y parece surgir de la tierra que la sostiene. No llega para imponerse, sino para pertenecer: una presencia viva en la que arte y naturaleza encuentran su armonía.</p>` +
        `<p>Cada móvil recoge el impulso invisible del viento y lo convierte en movimiento. Así, la naturaleza se expresa, y la escultura se vuelve cauce, escucha y celebración de su energía.</p>` +
      `</div>` +
      `<footer class="statement-author">— Enric Segarra</footer>` +
    `</blockquote>` +
    prose([
      "Un proyecto en un terreno rústico donde esculturas, árboles y móviles dialogan con el entorno natural. Se encuentra aproximadamente a un kilómetro del jardín de casa.",
      "Los móviles de tarjetas recicladas forman una misma serie artística, aunque se instalen en los dos espacios. Este recorrido reúne el archivo del entorno y las esculturas suspendidas, sin convertir sus distintas vistas en obras diferentes."
    ]) +
    `<div class="gallery-grid" id="album-photos">${galleryGrid(photos)}</div>` +
    (gardenWorks.length ? `<section class="section">${sectionHead("Obras en el espacio")}${workGrid(gardenWorks)}</section>` : "")
  );
}
function trajectoryContact() {
  return artist().replace('<h1>ENRIC SEGARRA I GARIBO</h1>', '<h1>Trayectoria y contacto</h1>') + `<section class="section" id="contacto">${sectionHead("Contacto")}${site.contactEmail ? `<a class="text-link" href="mailto:${esc(site.contactEmail)}">${esc(site.contactEmail)}</a><p><a class="text-link" href="tel:${esc(site.contactPhone)}">615 224 258</a></p>` : `<p>${esc(site.contactText)}</p>`}</section>`;
}

const room3dUrl = (space, query = "") => {
  const base = location.port === "4173" ? `${location.protocol}//${location.hostname}:5188/` : "galeria-3d/";
  return `${base}${query ? "?" + query : ""}#${space}`;
};
function mobiles3dShowcase() {
  const iframeSrc = room3dUrl("moviles", "autoenter=1");
  return `<section class="mobiles-3d-showcase" aria-label="El Mirador del Aire · Galería 3D y 2D-3D de Móviles">
    <div class="mobiles-3d-top">
      <div>
        <p class="eyebrow">Galería interactiva 3D y 2D-3D · Juego del Aire en tres alturas</p>
        <h2>El Mirador del Aire · Sala Aérea de Móviles</h2>
        <p>Al estar suspendidos en el espacio, este pabellón propone descubrir los 33 móviles combinando la <strong>mirada desde abajo</strong> con <strong>terrazas escalonadas (+1.70m)</strong>, una <strong>gran pasarela aérea (+3.20m)</strong> y el <strong>Juego del Aire</strong>, alternando en tiempo real entre <strong>Volumen 3D</strong> e <strong>Imagen 2D-3D</strong> de máxima nitidez.</p>
      </div>
      <a class="room-3d-cta" href="${room3dUrl("moviles")}" target="_blank" rel="noopener">Abrir sala 3D a pantalla completa <span aria-hidden="true">↗</span></a>
    </div>
    <div class="mobiles-3d-pillars">
      <article class="mobiles-3d-pillar">
        <strong>01 · Mirada Cenital desde abajo (0.0m)</strong>
        <p>Camina por el suelo principal y sitúate sobre los medallones cenitales bajo cada móvil para contemplar su constelación suspendida contra los lucernarios.</p>
        <button type="button" data-mob3d-cmd='{"elev":0,"action":"lookup"}'>👀 Mirar desde abajo ↑</button>
      </article>
      <article class="mobiles-3d-pillar">
        <strong>02 · Subir a Terrazas (+1.7m) y Pasarela (+3.2m)</strong>
        <p>Sube por las rampas escalonadas a las terrazas laterales o a la pasarela central suspendida en el cielo para ver las obras cara a cara a la altura de tus ojos.</p>
        <button type="button" data-mob3d-cmd='{"elev":2}'>🌉 Subir a la Pasarela Aérea +3.2m</button>
      </article>
      <article class="mobiles-3d-pillar">
        <strong>03 · Juego del Aire + Formato 3D / 2D-3D</strong>
        <p>Sopla corrientes de brisa para despertar los 33 móviles y ponlos en danza mientras cambias entre Volumen 3D texturizado e Imagen 2D-3D multi-ángulo.</p>
        <button type="button" data-mob3d-cmd='{"action":"breeze"}'>🌬️ Soplar corriente de aire</button>
      </article>
    </div>
    <div class="mobiles-3d-controls" role="toolbar" aria-label="Controles rápidos de la galería 3D de móviles">
      <div class="mobiles-3d-btn-group">
        <span>Altura:</span>
        <button type="button" class="mobiles-3d-btn" data-mob3d-elev="0" data-mob3d-cmd='{"elev":0}' aria-pressed="true">Suelo Cenital (0.0m)</button>
        <button type="button" class="mobiles-3d-btn" data-mob3d-elev="1" data-mob3d-cmd='{"elev":1}' aria-pressed="false">Terrazas (+1.70m)</button>
        <button type="button" class="mobiles-3d-btn" data-mob3d-elev="2" data-mob3d-cmd='{"elev":2}' aria-pressed="false">Pasarela Aérea (+3.20m)</button>
      </div>
      <div class="mobiles-3d-btn-group">
        <span>Renderizado:</span>
        <button type="button" class="mobiles-3d-btn" data-mob3d-mode="ai3d" data-mob3d-cmd='{"mode":"ai3d"}' aria-pressed="true">🧊 Volumen 3D</button>
        <button type="button" class="mobiles-3d-btn" data-mob3d-mode="billboard" data-mob3d-cmd='{"mode":"billboard"}' aria-pressed="false">🖼️ Imagen 2D-3D</button>
      </div>
      <div class="mobiles-3d-btn-group">
        <button type="button" class="mobiles-3d-btn accent" data-mob3d-cmd='{"action":"lookup"}'>👀 Mirar arriba ↑</button>
        <button type="button" class="mobiles-3d-btn accent" data-mob3d-cmd='{"action":"breeze"}'>🌬️ Soplar brisa</button>
        <button type="button" class="mobiles-3d-btn" data-mob3d-cmd='{"action":"next"}'>🎯 Siguiente móvil ↗</button>
      </div>
    </div>
    <div class="mobiles-3d-stage" id="mobiles-3d-stage">
      <iframe id="mobiles-3d-iframe" class="mobiles-3d-iframe" src="${iframeSrc}" title="Galería 3D y 2D-3D interactiva de Móviles de Enric Segarra" loading="lazy" allow="fullscreen"></iframe>
    </div>
  </section>`;
}
function room3dBanner(series) {
  const spaces = {
    "Formas orgánicas": {
      hash: "formas-organicas",
      eyebrow: "Sala de exposición 3D · Visión amplia 360°",
      title: "Sala de Formas orgánicas",
      copy: "Recorre una sala amplia dedicada a las 8 esculturas de «Formas orgánicas» con visión interactiva tanto en Volumen 3D como en Imagen en 3D (2D/3D de estudio bien renderizado).",
      cta: "Entrar en la sala 3D de Formas orgánicas"
    },
    "Planos curvos y volúmenes abiertos": {
      hash: "planos-curvos",
      eyebrow: "Sala de exposición 3D · Visión amplia 360°",
      title: "Sala de Planos curvos y volúmenes abiertos 3D",
      copy: "Explora las 12 esculturas de «Planos curvos y volúmenes abiertos» en su gran salón virtual 3D, alternando entre Volumen 3D e Imagen en 3D multi-ángulo.",
      cta: "Entrar en la sala 3D de Planos curvos"
    },
    "Estructuras y objetos ensamblados": {
      hash: "galeria",
      eyebrow: "Sala de exposición 3D · Visión amplia 360°",
      title: "Galería blanca 3D",
      copy: "Explora las esculturas de «Estructuras y objetos ensamblados» en el espacio virtual 3D, tanto en Volumen 3D como en Imagen en 3D de estudio.",
      cta: "Abrir en la galería 3D"
    },
    "Dibujo y espacio": {
      hash: "dibujo",
      eyebrow: "Sala de exposición 3D · Pabellón longitudinal",
      title: "Sala de Dibujo 3D",
      copy: "Recorre sin prisa el gran pabellón virtual dedicado a las 48 obras originales sobre papel de la serie «Dibujo y espacio».",
      cta: "Entrar en la Sala de Dibujo 3D"
    }
  };
  const info = spaces[series];
  if (!info) return "";
  return `<aside class="room-3d-banner" aria-label="${esc(info.title)}"><div><p class="eyebrow">${esc(info.eyebrow)}</p><h2>${esc(info.title)}</h2><p>${esc(info.copy)}</p></div><a class="room-3d-cta" href="${room3dUrl(info.hash)}" target="_blank" rel="noopener">${esc(info.cta)} <span aria-hidden="true">↗</span></a></aside>`;
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
    (showDirectory ? `<section aria-label="Series y conjuntos">${collectionCards(category)}</section>` : "") +
    (category === "moviles" ? mobiles3dShowcase() : room3dBanner(series)) +
    `<form class="catalogue-tools" id="catalogue-filters"><label class="search"><span class="sr-only">Buscar obras</span><input type="search" name="q" placeholder="Buscar descripción o referencia" value="${esc(query)}"><button aria-label="Buscar">↗</button></label>${seriesList.length ? `<label class="select-label">Serie o conjunto<select name="serie"><option value="">Todas las series</option>${seriesList.map(name => `<option value="${esc(name)}" ${name === series ? "selected" : ""}>${esc(seriesLabel(category,name))}</option>`).join("")}</select></label>` : ""}<div class="view-toggle" aria-label="Presentación"><button type="button" data-view="catalogo" aria-pressed="${view === "catalogo"}">Cuadrícula</button><button type="button" data-view="recorrido" aria-pressed="${view === "recorrido"}">Recorrido ↓</button></div></form><div class="result-line"><p role="status">${filtered.length} ${filtered.length === 1 ? "obra" : "obras"}</p><p>Descripciones visuales de las obras</p></div><div id="catalogue-results">${catalogue}</div>${!filtered.length ? `<div class="empty"><h2>No hay obras con esa búsqueda.</h2>${a("/obra/" + category, "Restablecer filtros " + arrow)}</div>` : ""}`;
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
  const isGardenWork = w.reference === "MOV-017" || w.reference === "MOV-022";
  const related = isGardenWork
    ? works.filter(x => (x.reference === "MOV-017" || x.reference === "MOV-022") && x.id !== w.id)
    : works.filter((x) => (w.category === "escultura" ? sculptureFamilyFor(x) === sculptureFamilyFor(w) : x.series === w.series) && x.category === w.category && x.id !== w.id).slice(0, 3);
  const parentPath = isGardenWork ? "/jardin" : "/obra/" + w.category;
  const parentLabel = isGardenWork ? "Jardín de las Lagartijas" : catName(w.category);
  return (
    trail(parentPath, parentLabel, w.reference) +
    `<section class="work-detail"><div class="work-stage"><button class="photo-button main-photo" data-photo="0" aria-label="Ampliar: ${esc(w.label)}">${img(w.image, w.alt, true)}<span class="zoom-mark" aria-hidden="true">↗</span></button>${w.gallery.length > 1 ? `<div class="thumbnails">${w.gallery.map((p, i) => `<button data-preview="${i}" aria-label="Ver perspectiva ${i + 1}" aria-pressed="${i === 0}">${img(p.thumb, p.alt)}</button>`).join("")}</div>` : ""}</div><div class="work-info"><p class="eyebrow">${esc(catName(w.category))} / ${esc(w.reference)}</p><h1>${esc(w.label)}</h1><p class="work-series">${esc(seriesLabel(w.category,w.series))}</p>${w.text && w.text !== w.label + "." ? prose([w.text]) : ""}<dl><div><dt>Autor</dt><dd>ENRIC SEGARRA I GARIBO</dd></div><div><dt>Archivo visual</dt><dd>${w.gallery.length} ${w.gallery.length === 1 ? "fotografía" : "fotografías"}</dd></div><div><dt>Identificación</dt><dd>Descripción visual</dd></div></dl><p class="note">Descripción visual para identificar la pieza. Título, fecha y técnica pendientes de documentación.</p>${isGardenWork ? a("/jardin", "Volver al Jardín de las Lagartijas " + arrow, "text-link") : a("/obra/" + w.category + "?serie=" + encodeURIComponent(w.category === "escultura" ? sculptureFamilyFor(w) : w.series), "Continuar por esta familia " + arrow, "text-link")}</div></section>${related.length ? `<section class="section">${sectionHead(isGardenWork ? "Otra obra en este espacio" : "En relación")}${workGrid(related)}</section>` : ""}`
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
    `<nav class="tabs" aria-label="Tipo de exposición">${types.map(([id, t]) => a("/exposiciones?tipo=" + id, t + ` <sup>${all.filter((al) => id === "todas" || al.exhibitionKind === id).length}</sup>`, id === f ? "active" : "")).join("")}</nav><form class="exhibition-search" id="exhibition-search"><label class="search"><span class="sr-only">Buscar exposición, lugar o año</span><input type="search" name="q" placeholder="Buscar exposición, lugar o año" value="${esc(q)}"><button aria-label="Buscar exposición">↗</button></label><input type="hidden" name="tipo" value="${esc(f)}"><div class="view-toggle" aria-label="Presentación"><button type="button" data-exhibition-view="mosaico" aria-pressed="${view === "mosaico"}">Mosaico</button><button type="button" data-exhibition-view="ampliada" aria-pressed="${view === "ampliada"}">Vista amplia</button></div></form><div class="result-line"><p role="status">${list.length} exposiciones</p>${a("/imagenes?ambito=exposiciones", "Ver todas las fotografías " + arrow)}</div>${list.length ? (view === "ampliada" ? `<div class="exhibition-results is-expanded">${exhibitionList(list)}</div>` : albumGrid(list)) : `<div class="empty"><h2>No hay exposiciones con esa búsqueda.</h2>${a("/exposiciones", "Restablecer filtros")}</div>`}<div class="source-note"><p>Las fechas documentadas se indican en cada archivo. Las muestras colectivas conservan diferenciadas las obras de sus participantes.</p></div>`
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
    applyTranslations(document);
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
        applyTranslations(link);
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
    applyTranslations(document.querySelector("#journey-status"));
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
    `<div class="prose"><p>Este espacio reúne la obra y la memoria artística de ENRIC SEGARRA I GARIBO. El archivo sigue creciendo con la identificación de piezas, documentos y fotografías.</p></div><div class="end-link">${a("/", "Volver al inicio " + arrow)}</div>`
  );
}
function notFound() {
  return (
    head(
      "Archivo",
      "Página no encontrada",
      "Este enlace no corresponde a una ficha del archivo.",
    ) + a("/obra/moviles", "Explorar la obra " + arrow, "text-link")
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
  } else if (section === "moviles") {
    html = mobiles(params); title = "Móviles";
  } else if (section === "escultura") {
    html = sculpture(); title = "Escultura";
  } else if (section === "escultura-moviles") {
    location.replace("#/escultura");
    return;


  } else if (section === "pintura") {
    html = painting(); title = "Pintura";
  } else if (section === "dibujo") {
    html = drawing(); title = "Dibujo";
  } else if (section === "pintura-dibujo") {
    location.replace("#/pintura");
    return;
  } else if (section === "jardin") {
    html = garden(); title = "Jardín de las Lagartijas";
  } else if (section === "trayectoria-contacto") {
    html = trajectoryContact(); title = "Trayectoria y contacto";
  } else if (section === "obra") {
    if (!id || id === "todas") {
    location.replace("#/obra/moviles");
    return;
  }
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
    if (id === "arboles" || id === "naturaleza-moviles") {
      location.replace("#/jardin");
      return;
    }
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
    const group = section === "obra" ? (id === "moviles" || works.find(w => w.id === id)?.category === "moviles" ? "moviles" : id === "escultura" || works.find(w => w.id === id)?.category === "escultura" ? "escultura" : id === "pintura" || works.find(w => w.id === id)?.category === "pintura" ? "pintura" : id === "dibujo" || works.find(w => w.id === id)?.category === "dibujo" ? "dibujo" : "") : active === "exposiciones" ? "exposiciones" : ["memoria", "artista", "contacto"].includes(active) ? "trayectoria-contacto" : active;
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
      (document.querySelector(".room-3d-banner") || document.querySelector("#catalogue-results"))?.scrollIntoView({
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
  const kinds = [...carousel.querySelectorAll("[data-home-kind]")];
  const captions = [...carousel.querySelectorAll("[data-home-caption]")];
  const dots = [...carousel.querySelectorAll("[data-home-carousel-dot]")];
  const counter = carousel.querySelector("[data-home-carousel-counter]");
  const prev = carousel.querySelector("[data-home-carousel-prev]");
  const next = carousel.querySelector("[data-home-carousel-next]");
  const stage = carousel.querySelector("[data-home-carousel-stage]");
  const total = String(slides.length).padStart(2, "0");
  let index = 0, timer = null;
  const show = (target) => {
    slides[index]?.classList.remove("is-active");
    slides[index]?.setAttribute("aria-hidden", "true");
    kinds[index]?.classList.remove("is-active");
    captions[index]?.classList.remove("is-active");
    dots[index]?.classList.remove("is-active");
    dots[index]?.setAttribute("aria-current", "false");
    index = (target + slides.length) % slides.length;
    slides[index]?.classList.add("is-active");
    slides[index]?.setAttribute("aria-hidden", "false");
    kinds[index]?.classList.add("is-active");
    captions[index]?.classList.add("is-active");
    dots[index]?.classList.add("is-active");
    dots[index]?.setAttribute("aria-current", "true");
    if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${total}`;
  };
  const stop = () => {
    if (timer) window.clearTimeout(timer);
    timer = null;
  };
  const schedule = () => {
    stop();
    if (!document.hidden && slides.length > 1) {
      timer = window.setTimeout(() => {
        show(index + 1);
        schedule();
      }, 3400);
    }
  };
  prev?.addEventListener("click", () => { show(index - 1); schedule(); });
  next?.addEventListener("click", () => { show(index + 1); schedule(); });
  stage?.addEventListener("click", () => { show(index + 1); schedule(); });
  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      show(dotIndex);
      schedule();
    });
  });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : schedule(), { signal: pageEvents.signal });
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
    applyTranslations(document);
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
    applyTranslations(document);
    observe();
  });
}
main.addEventListener("click", (e) => {
  const mobBtn = e.target.closest("[data-mob3d-cmd]");
  if (mobBtn) {
    try {
      const cmd = JSON.parse(mobBtn.dataset.mob3dCmd);
      const iframe = document.querySelector("#mobiles-3d-iframe");
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({ type: "mobiles-cmd", ...cmd }, "*");
      }
      if (typeof cmd.elev === "number") {
        document.querySelectorAll("[data-mob3d-elev]").forEach((b) =>
          b.setAttribute("aria-pressed", String(Number(b.dataset.mob3dElev) === cmd.elev))
        );
      }
      if (cmd.mode) {
        document.querySelectorAll("[data-mob3d-mode]").forEach((b) =>
          b.setAttribute("aria-pressed", String(b.dataset.mob3dMode === cmd.mode))
        );
      }
      document.querySelector("#mobiles-3d-stage")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch {}
    return;
  }
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
  applyTranslations(dialog);
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
