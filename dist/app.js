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
import { applyTranslations, initLanguage } from "./i18n.js?v=20261111-minimal-v1";
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
const room3dUrl = (space, query = "") => {
  const base = "galeria-3d/index.html";
  return `${base}${query ? "?" + query : ""}#${space}`;
};
const GARDEN_3D_REFS = new Set([
  "MOV-016", "MOV-017", "MOV-018", "MOV-019", "MOV-022", "MOV-023",
  "MOV-025", "MOV-026", "MOV-028", "MOV-032", "MOV-033",
  "ESC-047", "ESC-048", "ESC-049", "ESC-050", "ESC-051", "ESC-052",
]);
const SPACE_HASH_MAP = {
  gallery: "galeria",
  garden: "jardin",
  paintings: "pintura",
  drawings: "dibujo",
  organic: "formas-organicas",
  curvos: "planos-curvos",
  mobiles: "moviles",
};
const EXHIBITION_3D_LINKS = {
  colomina: {
    note: "Las vistas del Palacio Colomina recorren los móviles suspendidos y los relieves murales de Enric Segarra en el espacio expositivo, conectados hoy con la Sala de Móviles 3D, la Galería Blanca 3D y el Jardín de las Lagartijas 3D.",
    primaryRoom: { hash: "moviles", label: "Sala de Móviles 3D", query: "autoenter=1" },
    rooms: [
      { hash: "moviles", label: "Sala de Móviles 3D", query: "autoenter=1" },
      { hash: "galeria", label: "Galería Blanca 3D · Relieves", query: "autoenter=1&serie=" + encodeURIComponent("Relieves y ensamblajes murales") },
      { hash: "jardin", label: "Jardín de las Lagartijas 3D", query: "autoenter=1" },
    ],
    catalogLinks: [
      { path: "/moviles", label: "Catálogo de Móviles (33)" },
      { path: "/obra/escultura?serie=" + encodeURIComponent("Relieves y ensamblajes murales"), label: "Relieves y ensamblajes murales" },
    ],
  },
  "caixa-castello": {
    note: "Muestra de dibujo y escultura en la Fundació Caixa Castelló–Bancaixa conectada con el pabellón de obra sobre papel y las tres salas escultóricas virtuales.",
    primaryRoom: { hash: "dibujo", label: "Sala de Dibujo 3D", query: "autoenter=1" },
    rooms: [
      { hash: "dibujo", label: "Sala de Dibujo 3D", query: "autoenter=1" },
      { hash: "formas-organicas", label: "Sala de Formas Orgánicas 3D", query: "autoenter=1" },
      { hash: "planos-curvos", label: "Sala de Planos Curvos 3D", query: "autoenter=1" },
      { hash: "galeria", label: "Galería Blanca 3D", query: "autoenter=1" },
    ],
    catalogLinks: [
      { path: "/obra/dibujo", label: "Catálogo de Dibujo (53)" },
      { path: "/obra/escultura", label: "Catálogo de Escultura (55)" },
    ],
  },
  "sala-bellas-artes": {
    note: "El archivo documental de la Sala d’Exposicions de les Belles Arts (Valencia) conecta con los recorridos principales de escultura, relieves, pintura y dibujo del museo virtual 3D.",
    primaryRoom: { hash: "galeria", label: "Galería Blanca 3D", query: "autoenter=1" },
    rooms: [
      { hash: "galeria", label: "Galería Blanca 3D", query: "autoenter=1" },
      { hash: "planos-curvos", label: "Sala de Planos Curvos 3D", query: "autoenter=1" },
      { hash: "pintura", label: "Sala de Pintura 3D", query: "autoenter=1" },
      { hash: "dibujo", label: "Sala de Dibujo 3D", query: "autoenter=1" },
    ],
    catalogLinks: [
      { path: "/obra/escultura", label: "Catálogo de Escultura" },
      { path: "/obra/pintura", label: "Catálogo de Pintura" },
      { path: "/obra/dibujo", label: "Catálogo de Dibujo" },
    ],
  },
  quatre: {
    note: "Muestra colectiva en la que conviven pintura y relieve sobre muros de piedra, vinculada con la Sala de Pintura 3D y los relieves de la Galería Blanca 3D.",
    primaryRoom: { hash: "pintura", label: "Sala de Pintura 3D", query: "autoenter=1" },
    rooms: [
      { hash: "pintura", label: "Sala de Pintura 3D", query: "autoenter=1" },
      { hash: "galeria", label: "Galería Blanca 3D", query: "autoenter=1" },
    ],
    catalogLinks: [
      { path: "/obra/pintura", label: "Catálogo de Pintura" },
      { path: "/obra/escultura", label: "Escultura y relieves" },
    ],
  },
  "sant-jordi-estivella": {
    note: "Muestra colectiva en torno al relato de Sant Jordi y el dragón en pinturas y dibujos, vinculada con «Relatos e iconografía» en la Sala de Pintura 3D y la Sala de Dibujo 3D.",
    primaryRoom: { hash: "pintura", label: "Sala de Pintura 3D · Relatos", query: "autoenter=1&serie=" + encodeURIComponent("Relatos e iconografía") },
    rooms: [
      { hash: "pintura", label: "Sala de Pintura 3D (Relatos e iconografía)", query: "autoenter=1&serie=" + encodeURIComponent("Relatos e iconografía") },
      { hash: "dibujo", label: "Sala de Dibujo 3D", query: "autoenter=1" },
    ],
    catalogLinks: [
      { path: "/obra/pintura?serie=" + encodeURIComponent("Relatos e iconografía"), label: "Serie Relatos e iconografía" },
      { path: "/obra/dibujo", label: "Catálogo de Dibujo" },
    ],
  },
  "dragonians-casa-libro": {
    note: "Exposición colectiva «San Jorge y el dragón» en la Casa del Libro en diálogo con las escenas narrativas de la serie «Relatos e iconografía» en la Sala de Pintura 3D.",
    primaryRoom: { hash: "pintura", label: "Sala de Pintura 3D · Relatos", query: "autoenter=1&serie=" + encodeURIComponent("Relatos e iconografía") },
    rooms: [
      { hash: "pintura", label: "Sala de Pintura 3D (Relatos e iconografía)", query: "autoenter=1&serie=" + encodeURIComponent("Relatos e iconografía") },
    ],
    catalogLinks: [
      { path: "/obra/pintura?serie=" + encodeURIComponent("Relatos e iconografía"), label: "Serie Relatos e iconografía" },
      { path: "/obra/pintura", label: "Toda la pintura" },
    ],
  },
  "signo-agua": {
    note: "El montaje documentado en «Signo de Agua» reúne en sala relieves de textura, ensamblajes verticales, pintura y la escultura «Forma articulada en un aro» (ESC-054), instalados a escala real en la Galería Blanca 3D y la Sala de Pintura 3D.",
    primaryRoom: { hash: "galeria", label: "Galería Blanca 3D", query: "obra=ESC-054&autoenter=1" },
    rooms: [
      { hash: "galeria", label: "Galería Blanca 3D (ESC-054 y relieves)", query: "obra=ESC-054&autoenter=1" },
      { hash: "pintura", label: "Sala de Pintura 3D", query: "autoenter=1" },
    ],
    catalogLinks: [
      { path: "/obra/escultura-008704", label: "Ficha ESC-054" },
      { path: "/obra/escultura?serie=" + encodeURIComponent("Relieves de textura"), label: "Relieves de textura" },
      { path: "/obra/pintura", label: "Catálogo de Pintura" },
    ],
  },
};
const ROOM_EXHIBITIONS_MAP = {
  galeria: [
    { id: "sala-bellas-artes", label: "Sala de Bellas Artes" },
    { id: "signo-agua", label: "Signo de Agua" },
    { id: "colomina", label: "Palacio Colomina" },
    { id: "caixa-castello", label: "Caixa Castelló" },
  ],
  jardin: [
    { id: "colomina", label: "Palacio Colomina" },
    { id: "sala-bellas-artes", label: "Sala de Bellas Artes" },
  ],
  pintura: [
    { id: "sala-bellas-artes", label: "Sala de Bellas Artes" },
    { id: "quatre", label: "Quatre" },
    { id: "signo-agua", label: "Signo de Agua" },
    { id: "sant-jordi-estivella", label: "Sant Jordi · Estivella" },
    { id: "dragonians-casa-libro", label: "Dragonians Cinc" },
  ],
  dibujo: [
    { id: "caixa-castello", label: "Caixa Castelló" },
    { id: "sala-bellas-artes", label: "Sala de Bellas Artes" },
    { id: "sant-jordi-estivella", label: "Sant Jordi · Estivella" },
  ],
  "formas-organicas": [
    { id: "caixa-castello", label: "Caixa Castelló" },
    { id: "sala-bellas-artes", label: "Sala de Bellas Artes" },
  ],
  "planos-curvos": [
    { id: "caixa-castello", label: "Caixa Castelló" },
    { id: "sala-bellas-artes", label: "Sala de Bellas Artes" },
  ],
  moviles: [
    { id: "colomina", label: "Palacio Colomina" },
    { id: "sala-bellas-artes", label: "Sala de Bellas Artes" },
  ],
};
function workExposiciones(w) {
  if (!w) return ROOM_EXHIBITIONS_MAP.galeria;
  if (w.category === "moviles" || w.series === "Intervenciones en el entorno") {
    return ROOM_EXHIBITIONS_MAP.moviles;
  }
  if (w.category === "dibujo") return ROOM_EXHIBITIONS_MAP.dibujo;
  if (w.category === "pintura") {
    if (w.series === "Relatos e iconografía") {
      return [
        { id: "sant-jordi-estivella", label: "Sant Jordi · Estivella" },
        { id: "dragonians-casa-libro", label: "Dragonians Cinc" },
        { id: "sala-bellas-artes", label: "Sala de Bellas Artes" },
      ];
    }
    return [
      { id: "sala-bellas-artes", label: "Sala de Bellas Artes" },
      { id: "quatre", label: "Quatre" },
      { id: "signo-agua", label: "Signo de Agua" },
    ];
  }
  if (w.series === "Formas orgánicas" || w.series === "Planos curvos y volúmenes abiertos") {
    return [
      { id: "caixa-castello", label: "Caixa Castelló" },
      { id: "sala-bellas-artes", label: "Sala de Bellas Artes" },
    ];
  }
  if (w.reference === "ESC-054" || w.series === "Relieves de textura") {
    return [
      { id: "signo-agua", label: "Signo de Agua" },
      { id: "sala-bellas-artes", label: "Sala de Bellas Artes" },
      { id: "caixa-castello", label: "Caixa Castelló" },
    ];
  }
  return ROOM_EXHIBITIONS_MAP.galeria;
}
function work3dInfo(w) {
  if (!w) return { hash: "galeria", roomLabel: "Galería Blanca 3D", shortRoom: "Galería 3D", gardenAlso: false };
  if (w.category === "moviles") {
    return {
      hash: "moviles",
      roomLabel: "Sala de Móviles 3D",
      shortRoom: "Móviles 3D",
      gardenAlso: GARDEN_3D_REFS.has(w.reference),
    };
  }
  if (w.category === "pintura") {
    return {
      hash: "pintura",
      roomLabel: "Sala de Pintura 3D",
      shortRoom: "Pintura 3D",
      gardenAlso: false,
    };
  }
  if (w.category === "dibujo") {
    return {
      hash: "dibujo",
      roomLabel: "Sala de Dibujo 3D",
      shortRoom: "Dibujo 3D",
      gardenAlso: false,
    };
  }
  if (w.series === "Formas orgánicas") {
    return {
      hash: "formas-organicas",
      roomLabel: "Sala de Formas Orgánicas 3D",
      shortRoom: "Formas Orgánicas 3D",
      gardenAlso: false,
    };
  }
  if (w.series === "Planos curvos y volúmenes abiertos") {
    return {
      hash: "planos-curvos",
      roomLabel: "Sala de Planos Curvos 3D",
      shortRoom: "Planos Curvos 3D",
      gardenAlso: false,
    };
  }
  return {
    hash: "galeria",
    roomLabel: "Galería Blanca 3D",
    shortRoom: "Galería 3D",
    gardenAlso: GARDEN_3D_REFS.has(w.reference),
  };
}
function series3dHash(category, series = "") {
  if (category === "moviles") return series === "Móviles en el jardín" ? "jardin" : "moviles";
  if (category === "pintura") return "pintura";
  if (category === "dibujo") return "dibujo";
  if (series === "Formas orgánicas") return "formas-organicas";
  if (series === "Planos curvos y volúmenes abiertos") return "planos-curvos";
  return "galeria";
}
function work3dUrl(w, hashOverride = "") {
  const info = work3dInfo(w);
  return room3dUrl(hashOverride || info.hash, `obra=${encodeURIComponent(w.reference)}&autoenter=1`);
}
function workAnimatica3dUrl(w, hashOverride = "") {
  const info = work3dInfo(w);
  return room3dUrl(hashOverride || info.hash, `obra=${encodeURIComponent(w.reference)}&autoenter=1&animatica=obras`);
}
const workCard = (w) =>
  `<article class="work-card reveal">${a("/obra/" + w.id, `<div class="image-space">${img(w.thumb, w.alt)}</div><div class="caption"><span class="reference">${esc(w.reference)}</span><h3>${esc(w.label)}</h3><p>${esc(w.category === "moviles" ? "Móviles" : w.series === "Arcas" ? "Arcas de Noé" : w.series)}${w.gallery.length > 1 ? ` · ${w.gallery.length} vistas` : ""}</p></div>`, "work-card-main")}</article>`;
const albumCard = (al) => {
  const reference = al.section === "exposiciones"
    ? [{ obra: "Obra propia", colectiva: "Colectiva", infantil: "Arte infantil", formacion: "Formación docente", sala: "Archivo de sala" }[al.exhibitionKind], al.date]
        .filter(Boolean)
        .map((value) => `<span>${esc(value)}</span>`)
        .join('<span aria-hidden="true"> · </span>')
    : `<span>${esc(al.audience === "educacion" ? educationSections.find((s) => s.id === al.section)?.label : al.type)}</span>`;
  return `<article class="album-card reveal">${a("/archivo/" + al.id, `<div class="album-image">${img(al.image, al.title)}</div><div class="caption"><span class="reference">${reference}</span><h3>${esc(al.title)}</h3><p>${al.gallery.length} fotografías ${arrow}</p></div>`, "album-card-main")}</article>`;
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
  currentDetailWork = null,
  lightboxWorkPool = [],
  lightboxWorkIndex = -1,
  animaticaTimer = null,
  animaticaActive = false,
  pendingNavDirection = "",
  familySlideStops = [],
  homeCarouselStop = null;

const collectionFor = (category, series) => collections[category]?.find(c => c.series === series);
const seriesLabel = (category, series) => collectionFor(category, series)?.label || series;
const sculptureFamilyFor = (work) => work.series;
function getWorkNeighbors(w) {
  const isGardenWork = w.reference === "MOV-017" || w.reference === "MOV-022";
  const catPool = works.filter((x) => x.category === w.category);
  const catIdx = Math.max(0, catPool.findIndex((x) => x.id === w.id));
  const rawSeriesPool = works.filter(
    (x) =>
      x.category === w.category &&
      (w.category === "escultura"
        ? sculptureFamilyFor(x) === sculptureFamilyFor(w)
        : x.series === w.series),
  );
  const seriesPool = rawSeriesPool.length > 1 ? rawSeriesPool : catPool;
  const seriesIdx = Math.max(0, seriesPool.findIndex((x) => x.id === w.id));
  const prevWork = seriesPool[(seriesIdx - 1 + seriesPool.length) % seriesPool.length] || w;
  const nextWork = seriesPool[(seriesIdx + 1) % seriesPool.length] || w;
  const prevInCat = catPool[(catIdx - 1 + catPool.length) % catPool.length] || w;
  const nextInCat = catPool[(catIdx + 1) % catPool.length] || w;
  return {
    isGardenWork,
    seriesPool,
    seriesIdx,
    catPool,
    catIdx,
    prevWork,
    nextWork,
    prevInCat,
    nextInCat,
  };
}
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
    const hash3d = series3dHash(category, c.series);
    const url3d = room3dUrl(hash3d, "autoenter=1&serie=" + encodeURIComponent(c.series));
    return `<section class="catalogue-group"><div class="section-head"><h2>${esc(c.label)}</h2><div class="group-head-meta"><span>${items.length} obras</span><span aria-hidden="true">·</span><a class="quiet-3d-link" href="${url3d}">Sala 3D ↗</a></div></div>${renderWorks(items, view)}</section>`;
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
  const items = [
    {
      num: "01",
      meta: "33 obras · Escultura suspendida",
      path: "/moviles",
      title: "Móviles",
      image: "hero-work-baskets-real-neutral-v3",
      alt: "Móvil suspendido compuesto por cestas y elementos de color",
      fit: "contain",
      description: "Una misma serie, instalada en el jardín de casa y en el Jardín de las Lagartijas.",
    },
    {
      num: "02",
      meta: "55 obras · 7 conjuntos",
      path: "/escultura",
      title: "Escultura",
      image: "gallery-esc-009",
      alt: "Forma curva con veta (ESC-009)",
      fit: "contain",
      description: "Planos plegados, madera, hierro, piedra y relieves murales",
    },
    {
      num: "03",
      meta: "Espacio escultórico en la naturaleza",
      path: "/jardin",
      title: "Jardín de las Lagartijas",
      image: "arc-014873",
      alt: "Obras suspendidas bajo la encina en el Jardín de las Lagartijas",
      fit: "cover",
      description: "Jardí de les Sargantanes · Espacio escultórico",
    },
    {
      num: "04",
      meta: "76 obras · 8 series pictóricas",
      path: "/pintura",
      title: "Pintura",
      image: "pin-001-estudio-v3",
      alt: "Arca en composición circular (PIN-001)",
      fit: "contain",
      description: "Tauromaquia, Gatos y Arcas de Noé, junto a otras series",
    },
    {
      num: "05",
      meta: "53 obras · Papel y espacio",
      path: "/dibujo",
      title: "Dibujo",
      image: "drawing-015081-catalogue",
      alt: "Estudio de formas en rojo (DIB-003)",
      fit: "contain",
      description: "Líneas, planos y figuras sobre papel",
    },
    {
      num: "06",
      meta: "20 colecciones · Pedagogía y creación",
      path: "/arte-infantil",
      title: "Arte infantil",
      image: "bellas-arc-012548",
      alt: "Arte infantil en la Sala de Bellas Artes",
      fit: "cover",
      description: "Una etapa de la trayectoria artística",
    },
    {
      num: "07",
      meta: "Archivo de muestras y salas",
      path: "/exposiciones",
      title: "Exposiciones",
      image: "colomina-009086-professional",
      alt: "Exposición de escultura en el Palacio Colomina",
      fit: "cover",
      description: "La obra en las salas y la memoria de los encuentros.",
    },
    {
      num: "08",
      meta: "Biografía · 1959 — presente",
      path: "/trayectoria-contacto",
      title: "Trayectoria y contacto",
      image: "hero-portrait-real-neutral-v3",
      alt: "ENRIC SEGARRA I GARIBO sostiene una escultura de madera",
      fit: "contain",
      description: "Vida, taller, capítulos de creación y contacto directo.",
    },
  ];
  return (
    `<div class="section-directory home-directory">${items.map((item, idx) => a(
      item.path,
      `<div class="home-card-meta"><span>${item.num}</span><span>${esc(item.meta)}</span></div><div class="image-space is-${item.fit}">${img(item.image, item.alt, idx < 4)}</div><div class="home-card-head"><h2>${esc(item.title)}</h2><span class="home-card-arrow" aria-hidden="true">↗</span></div><p>${esc(item.description)}</p>`,
      "section-card home-editorial-card",
    )).join("")}</div>` +
    `<div class="home-3d-bar-wrap">${a(
      "/exposicion-3d",
      `<div class="home-3d-bar-text"><span class="home-3d-bar-kicker">Salas 3D</span><span class="home-3d-bar-copy">Siete espacios virtuales para recorrer las 217 obras a escala</span></div><span class="home-3d-bar-cta">Explorar salas <span aria-hidden="true">↗</span></span>`,
      "home-3d-bar",
    )}</div>`
  );
}
function sculpture(params = new URLSearchParams()) {
  if (params.has("serie") || params.has("q") || params.has("vista")) return workIndex("escultura", params);
  return head("Obra", "Escultura", "Planos plegados, madera, hierro, piedra y relieves murales.") + room3dBanner("", "escultura") + collectionCards("escultura") + `<div class="end-link">${a("/obra/escultura", "Ver toda la escultura " + arrow)}</div>`;
}
function mobiles(params) {
  return workIndex("moviles", params);
}
function sculptureAndMobiles(params = new URLSearchParams()) {
  return sculpture(params);
}
function painting(params = new URLSearchParams()) {
  if (params.has("serie") || params.has("q") || params.has("vista")) return workIndex("pintura", params);
  return head("Obra", "Pintura", "Tauromaquia, Gatos y Arcas de Noé, junto a otros conjuntos de pintura.") + room3dBanner("", "pintura") + collectionCards("pintura") + `<div class="end-link">${a("/obra/pintura", "Ver toda la pintura " + arrow)}</div>`;
}
function drawing(params = new URLSearchParams()) {
  if (params.has("serie") || params.has("q") || params.has("vista")) return workIndex("dibujo", params);
  return head("Obra", "Dibujo", "Líneas, planos y figuras sobre papel.") + room3dBanner("", "dibujo") + collectionCards("dibujo") + `<div class="end-link">${a("/obra/dibujo", "Ver todos los dibujos " + arrow)}</div>`;
}
function paintingAndDrawing(params = new URLSearchParams()) {
  return painting(params);
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
      `<div class="statement-header">` +
        `<p class="statement-eyebrow">Reflexión sobre la naturaleza</p>` +
        `<footer class="statement-author">— Enric Segarra</footer>` +
      `</div>` +
      `<div class="statement-body">` +
        `<div class="statement-col">` +
          `<p>En el silencio y el recogimiento, hablar a la naturaleza con gratitud, respeto y amor es volver a tender un puente hacia ella. Escucharla, reconocer su presencia y dejarnos tocar por su misterio quizá sea la forma más íntima de recuperar el vínculo que nos une.</p>` +
          `<p>Mi obra escultórica transita por diversos lenguajes y materiales. En estos espacios de móviles, sin embargo, es la propia naturaleza quien ofrece la materia: ramas, formas y elementos nacidos del lugar, cargados de su tiempo y de su memoria.</p>` +
        `</div>` +
        `<div class="statement-col">` +
          `<p>La obra se despliega en diálogo con el entorno. Se mueve con el aire, respira con el paisaje y parece surgir de la tierra que la sostiene. No llega para imponerse, sino para pertenecer: una presencia viva en la que arte y naturaleza encuentran su armonía.</p>` +
          `<p>Cada móvil recoge el impulso invisible del viento y lo convierte en movimiento. Así, la naturaleza se expresa, y la escultura se vuelve cauce, escucha y celebración de su energía.</p>` +
        `</div>` +
      `</div>` +
    `</blockquote>` +
    prose([
      "Un proyecto en un terreno rústico donde esculturas, árboles y móviles dialogan con el entorno natural. Se encuentra aproximadamente a un kilómetro del jardín de casa.",
      "Los móviles de tarjetas recicladas forman una misma serie artística, aunque se instalen en los dos espacios. Este recorrido reúne el archivo del entorno y las esculturas suspendidas, sin convertir sus distintas vistas en obras diferentes."
    ]) +
    garden3dShowcase() +
    `<div class="gallery-grid" id="album-photos">${galleryGrid(photos)}</div>` +
    (gardenWorks.length ? `<section class="section">${sectionHead("Obras en el espacio")}${workGrid(gardenWorks)}</section>` : "")
  );
}
function trajectoryContact() {
  return artist().replace('<h1>ENRIC SEGARRA I GARIBO</h1>', '<h1>Trayectoria y contacto</h1>') + `<section class="section" id="contacto">${sectionHead("Contacto")}${site.contactEmail ? `<a class="text-link" href="mailto:${esc(site.contactEmail)}">${esc(site.contactEmail)}</a><p><a class="text-link" href="tel:${esc(site.contactPhone)}">615 224 258</a></p>` : `<p>${esc(site.contactText)}</p>`}</section>`;
}

function room3dStrip(label, meta, href, cta = "Ver en sala 3D") {
  return `<aside class="room-3d-strip" aria-label="${esc(label)}"><div class="room-3d-strip-copy"><strong>${esc(label)}</strong>${meta ? `<span>${esc(meta)}</span>` : ""}</div><a class="room-3d-strip-link" href="${href}">${esc(cta)} <span aria-hidden="true">↗</span></a></aside>`;
}
function garden3dShowcase() {
  return room3dStrip(
    "Jardín de las Lagartijas en 3D",
    "Recreación interactiva de la parcela en Náquera con ciclo de luz y sonido",
    room3dUrl("jardin", "autoenter=1"),
    "Entrar al Jardín 3D",
  );
}
function mobiles3dShowcase() {
  return room3dStrip(
    "Sala de Móviles 3D",
    "33 obras suspendidas a tres alturas con brisa interactiva",
    room3dUrl("moviles", "autoenter=1"),
    "Entrar en sala 3D",
  );
}
function room3dBanner(series = "", category = "") {
  const spaces = {
    "Formas orgánicas": { hash: "formas-organicas", title: "Sala de Formas orgánicas 3D", meta: "8 esculturas en visión 360°" },
    "Planos curvos y volúmenes abiertos": { hash: "planos-curvos", title: "Sala de Planos curvos 3D", meta: "12 esculturas en visión 360°" },
    "Estructuras y objetos ensamblados": { hash: "galeria", title: "Galería Blanca 3D · Estructuras", meta: "9 obras sobre peana" },
    "Relieves y ensamblajes murales": { hash: "galeria", title: "Galería Blanca 3D · Relieves murales", meta: "11 obras a escala" },
    "Relieves de planos recortados": { hash: "galeria", title: "Galería Blanca 3D · Planos recortados", meta: "4 relieves murales" },
    "Relieves de textura": { hash: "galeria", title: "Galería Blanca 3D · Relieves de textura", meta: "5 obras en sala" },
    "Intervenciones en el entorno": { hash: "jardin", title: "Jardín de las Lagartijas 3D", meta: "6 intervenciones en piedra y árbol" },
    "Dibujo y espacio": { hash: "dibujo", title: "Sala de Dibujo 3D · Dibujo y espacio", meta: "48 obras sobre papel" },
    "Figuras y símbolos": {
      hash: category === "dibujo" ? "dibujo" : "pintura",
      title: category === "dibujo" ? "Sala de Dibujo 3D · Figuras y símbolos" : "Sala de Pintura 3D · Figuras y símbolos",
      meta: category === "dibujo" ? "5 obras sobre papel" : "12 lienzos en sala",
    },
    "Arcas": { hash: "pintura", title: "Sala de Pintura 3D · Arcas de Noé", meta: "7 lienzos a escala" },
    "Gatos": { hash: "pintura", title: "Sala de Pintura 3D · Gatos", meta: "9 pinturas en sala" },
    "Rostros y personajes": { hash: "pintura", title: "Sala de Pintura 3D · Rostros y personajes", meta: "16 obras en sala" },
    "Tauromaquia": { hash: "pintura", title: "Sala de Pintura 3D · Tauromaquia", meta: "9 lienzos en sala" },
    "Abstracciones": { hash: "pintura", title: "Sala de Pintura 3D · Abstracciones", meta: "13 pinturas en sala" },
    "Letras y signos": { hash: "pintura", title: "Sala de Pintura 3D · Letras y signos", meta: "3 obras en sala" },
    "Relatos e iconografía": { hash: "pintura", title: "Sala de Pintura 3D · Relatos e iconografía", meta: "7 pinturas en sala" },
  };
  const categoryDefaults = {
    escultura: { hash: "galeria", title: "Salas de Escultura 3D", meta: "55 esculturas distribuidas en cuatro espacios" },
    pintura: { hash: "pintura", title: "Sala de Pintura 3D", meta: "76 obras organizadas en ocho series" },
    dibujo: { hash: "dibujo", title: "Sala de Dibujo 3D", meta: "53 obras sobre papel" },
  };
  const info = spaces[series] || categoryDefaults[category];
  if (!info) return "";
  const query = series ? `autoenter=1&serie=${encodeURIComponent(series)}` : "autoenter=1";
  return room3dStrip(info.title, info.meta, room3dUrl(info.hash, query), "Ver en sala 3D");
}
function getRooms3dCatalog() {
  const orgCover = works.find((w) => w.series === "Formas orgánicas")?.thumb || "gallery-esc-009";
  const curvosCover = works.find((w) => w.series === "Planos curvos y volúmenes abiertos")?.thumb || "gallery-esc-009";
  const galCover = works.find((w) => w.reference === "ESC-054")?.thumb || "gallery-esc-009";
  return [
    { hash: "galeria", num: "01", label: "Galería Blanca", count: "41 obras", cover: galCover, fit: "contain", sectionPath: "/obra/escultura", sectionLabel: "Escultura", desc: "Estructuras sobre peana, relieves murales, planos recortados y relieves de textura." },
    { hash: "jardin", num: "02", label: "Jardín de las Lagartijas", count: "17 obras", cover: "arc-014873", fit: "cover", sectionPath: "/jardin", sectionLabel: "Jardín de las Lagartijas", desc: "Parcela natural en Náquera con móviles en los árboles, intervenciones, luz diurna y nocturna." },
    { hash: "pintura", num: "03", label: "Sala de Pintura", count: "76 obras", cover: "pin-001-estudio-v3", fit: "contain", sectionPath: "/obra/pintura", sectionLabel: "Pintura", desc: "Pabellón con las ocho series pictóricas: Arcas de Noé, Gatos, Tauromaquia, Rostros y más." },
    { hash: "dibujo", num: "04", label: "Sala de Dibujo", count: "53 obras", cover: "drawing-015081-catalogue", fit: "contain", sectionPath: "/obra/dibujo", sectionLabel: "Dibujo", desc: "Obra sobre papel de las series «Dibujo y espacio» y «Figuras y símbolos»." },
    { hash: "formas-organicas", num: "05", label: "Formas Orgánicas", count: "8 obras", cover: orgCover, fit: "contain", sectionPath: "/obra/escultura?serie=" + encodeURIComponent("Formas orgánicas"), sectionLabel: "Formas orgánicas", desc: "Esculturas de madera tallada, piedra y volúmenes orgánicos en recorrido 360°." },
    { hash: "planos-curvos", num: "06", label: "Planos Curvos", count: "12 obras", cover: curvosCover, fit: "contain", sectionPath: "/obra/escultura?serie=" + encodeURIComponent("Planos curvos y volúmenes abiertos"), sectionLabel: "Planos curvos", desc: "Hierro forjado, chapa plegada y volúmenes abiertos a escala real." },
    { hash: "moviles", num: "07", label: "Sala de Móviles", count: "33 obras", cover: "hero-work-baskets-real-neutral-v3", fit: "contain", sectionPath: "/moviles", sectionLabel: "Móviles", desc: "Nave diáfana con los 33 móviles suspendidos a tres alturas y brisa interactiva." },
  ];
}
function renderSalas3dGrid(rooms, highlightHash = "") {
  return `<div class="salas3d-grid">${rooms.map((r) => `<article class="sala3d-card reveal${r.hash === highlightHash ? " is-highlighted" : ""}" data-sala3d-card="${r.hash}"><a class="sala3d-card-main" href="${room3dUrl(r.hash, "autoenter=1")}"><div class="sala3d-card-meta"><span>${r.num}</span><span>${esc(r.count)}</span></div><div class="image-space is-${r.fit}">${img(r.cover, r.label)}</div><div class="sala3d-card-head"><h2>${esc(r.label)}</h2><span aria-hidden="true">↗</span></div><p>${esc(r.desc)}</p></a><div class="sala3d-card-foot"><a class="sala3d-enter-link" href="${room3dUrl(r.hash, "autoenter=1")}">Entrar en sala <span aria-hidden="true">↗</span></a>${a(r.sectionPath, "Catálogo: " + esc(r.sectionLabel) + " " + arrow, "quiet-3d-link")}</div></article>`).join("")}</div>`;
}
function exposicion3dPage(params = new URLSearchParams()) {
  const requestedRoom = params.get("sala") || "";
  const rooms = getRooms3dCatalog();
  return (
    head(
      "Museo virtual · 7 espacios",
      "Salas 3D",
      "Recorrido tridimensional por las 217 obras del catálogo y el Jardín de las Lagartijas. Toca cualquier sala para entrar a pantalla completa.",
    ) +
    `<section class="expo3d-hub" aria-label="Salas virtuales 3D">${renderSalas3dGrid(rooms, requestedRoom)}</section>`
  );
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
    (category === "moviles" ? mobiles3dShowcase() : room3dBanner(series, category)) +
    (showDirectory ? `<section aria-label="Series y conjuntos">${collectionCards(category)}</section>` : "") +
    `<form class="catalogue-tools" id="catalogue-filters"><label class="search"><span class="sr-only">Buscar obras</span><input type="search" name="q" placeholder="Buscar descripción o referencia" value="${esc(query)}"><button aria-label="Buscar">↗</button></label>${seriesList.length ? `<label class="select-label">Serie o conjunto<select name="serie"><option value="">Todas las series</option>${seriesList.map(name => `<option value="${esc(name)}" ${name === series ? "selected" : ""}>${esc(seriesLabel(category,name))}</option>`).join("")}</select></label>` : ""}<div class="view-toggle" aria-label="Presentación"><button type="button" data-view="catalogo" aria-pressed="${view === "catalogo"}">Cuadrícula</button><button type="button" data-view="recorrido" aria-pressed="${view === "recorrido"}">Recorrido ↓</button></div></form><div class="result-line"><p role="status">${filtered.length} ${filtered.length === 1 ? "obra" : "obras"}</p>${filtered.length ? `<button type="button" class="quiet-action-btn" data-start-animatica="filtered">Presentación</button>` : ""}</div><div id="catalogue-results">${catalogue}</div>${!filtered.length ? `<div class="empty"><h2>No hay obras con esa búsqueda.</h2>${a("/obra/" + category, "Restablecer filtros " + arrow)}</div>` : ""}`;
}
function renderWorks(list, view) {
  return view === "catalogo"
    ? workGrid(list)
    : `<div class="work-walk">${list.map((w) => `<article class="walk-item reveal"><div><span class="reference">${esc(w.reference)}</span><h2>${esc(w.label)}</h2><p>${esc(w.series)}</p><div class="walk-item-links">${a("/obra/" + w.id, "Ver la obra" + (w.gallery.length > 1 ? ` · ${w.gallery.length} vistas` : "") + " " + arrow, "text-link")}<a class="quiet-3d-link" href="${work3dUrl(w)}">Ver en sala 3D ↗</a></div></div>${a("/obra/" + w.id, img(w.image, w.alt))}</article>`).join("")}</div>`;
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
  currentDetailWork = w;
  const nav = getWorkNeighbors(w);
  lightboxWorkPool = nav.seriesPool;
  lightboxWorkIndex = nav.seriesIdx;
  setGallery(w.gallery, w.label);
  const isGardenWork = nav.isGardenWork;
  const related = isGardenWork
    ? works.filter(x => (x.reference === "MOV-017" || x.reference === "MOV-022") && x.id !== w.id)
    : works.filter((x) => (w.category === "escultura" ? sculptureFamilyFor(x) === sculptureFamilyFor(w) : x.series === w.series) && x.category === w.category && x.id !== w.id).slice(0, 3);
  const parentPath = isGardenWork ? "/jardin" : "/obra/" + w.category;
  const parentLabel = isGardenWork ? "Jardín de las Lagartijas" : catName(w.category);
  const info3d = work3dInfo(w);
  const direct3dUrl = work3dUrl(w);
  const garden3dUrl = work3dUrl(w, "jardin");
  const sLabel = seriesLabel(w.category, w.series);
  const seriesFilterPath = isGardenWork
    ? "/jardin"
    : "/obra/" + w.category + "?serie=" + encodeURIComponent(w.category === "escultura" ? sculptureFamilyFor(w) : w.series);
  const linkedExhs = workExposiciones(w);

  return (
    `<div class="work-top-nav">` +
      trail(parentPath, parentLabel, w.reference) +
      `<nav class="work-stepper-minimal" aria-label="Navegación de serie">` +
        `<a class="stepper-arrow" href="#/obra/${esc(nav.prevWork.id)}" data-nav-dir="backward" aria-label="Anterior obra: ${esc(nav.prevWork.reference)}" title="${esc(nav.prevWork.reference)} · ${esc(nav.prevWork.label)}">←</a>` +
        `<span class="stepper-count">${num(nav.seriesIdx + 1)} / ${num(nav.seriesPool.length)}</span>` +
        `<a class="stepper-arrow" href="#/obra/${esc(nav.nextWork.id)}" data-nav-dir="forward" aria-label="Siguiente obra: ${esc(nav.nextWork.reference)}" title="${esc(nav.nextWork.reference)} · ${esc(nav.nextWork.label)}">→</a>` +
      `</nav>` +
    `</div>` +
    `<section class="work-detail" data-work-detail="${esc(w.id)}">` +
      `<div class="work-stage">` +
        `<div class="main-photo-stage">` +
          `<a class="stage-step-arrow prev" href="#/obra/${esc(nav.prevWork.id)}" data-nav-dir="backward" aria-label="Anterior obra">←</a>` +
          `<button class="photo-button main-photo" data-photo="0" aria-label="Ampliar: ${esc(w.label)}">${img(w.image, w.alt, true)}<span class="zoom-mark" aria-hidden="true">↗</span></button>` +
          `<a class="stage-step-arrow next" href="#/obra/${esc(nav.nextWork.id)}" data-nav-dir="forward" aria-label="Siguiente obra">→</a>` +
        `</div>` +
        (w.gallery.length > 1 ? `<div class="thumbnails">${w.gallery.map((p, i) => `<button data-preview="${i}" aria-label="Ver perspectiva ${i + 1}" aria-pressed="${i === 0}">${img(p.thumb, p.alt)}</button>`).join("")}</div>` : "") +
      `</div>` +
      `<div class="work-info">` +
        `<p class="eyebrow">${esc(catName(w.category))} / ${esc(w.reference)}</p>` +
        `<h1>${esc(w.label)}</h1>` +
        `<p class="work-series">${a(seriesFilterPath, esc(sLabel) + " " + arrow)}</p>` +
        (w.text && w.text !== w.label + "." ? prose([w.text]) : "") +
        `<div class="work-actions-minimal">` +
          `<a class="btn-minimal-3d" href="${direct3dUrl}">Ver en ${esc(info3d.roomLabel)} <span aria-hidden="true">↗</span></a>` +
          `<button type="button" class="btn-minimal-secondary" data-start-animatica="series" data-work-id="${esc(w.id)}">Presentación</button>` +
          (info3d.gardenAlso ? `<a class="quiet-3d-link" href="${garden3dUrl}">Jardín 3D ↗</a>` : "") +
        `</div>` +
        `<div class="work-meta-minimal">` +
          `<p class="work-author-line">ENRIC SEGARRA I GARIBO${w.gallery.length > 1 ? ` · ${w.gallery.length} fotografías` : ""}</p>` +
          (linkedExhs.length ? `<p class="work-exh-line"><span>Exposiciones:</span> ${linkedExhs.map((ex) => a("/archivo/" + ex.id, esc(ex.label) + " " + arrow)).join('<span aria-hidden="true"> · </span>')}</p>` : "") +
          `<p class="note">Descripción visual para identificar la pieza. Título, fecha y técnica pendientes de documentación.</p>` +
        `</div>` +
      `</div>` +
    `</section>` +
    (related.length ? `<section class="section">${sectionHead(isGardenWork ? "Otra obra en este espacio" : "En relación")}${workGrid(related)}</section>` : "") +
    `<nav class="work-bottom-nav" aria-label="Siguiente o anterior">` +
      `<a href="#/obra/${esc(nav.prevWork.id)}" data-nav-dir="backward">← ${esc(nav.prevWork.reference)}</a>` +
      a(seriesFilterPath, isGardenWork ? "Volver al Jardín de las Lagartijas" : "Ver toda la serie") +
      `<a href="#/obra/${esc(nav.nextWork.id)}" data-nav-dir="forward">${esc(nav.nextWork.reference)} →</a>` +
    `</nav>`
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
  const link3d = al.audience !== "educacion" ? EXHIBITION_3D_LINKS[al.id] : null;
  return (
    trail(parent, label, al.title) +
    head(al.date || al.type, al.title, al.text) +
    `<div class="album-intro${al.paragraphs?.length ? "" : " is-compact"}">${al.paragraphs?.length ? prose(al.paragraphs) : ""}<aside>${al.place ? `<p class="eyebrow">Lugar</p><p>${esc(al.place)}</p>` : ""}<p class="eyebrow">Archivo visual</p><p>${al.gallery.length} fotografías</p>${a("/imagenes?coleccion=" + al.id, "Abrir con filtros ↗", "text-link")}${link3d ? `<p class="eyebrow">Sala virtual 3D</p><p><a class="text-link" href="${room3dUrl(link3d.primaryRoom.hash, link3d.primaryRoom.query)}">${esc(link3d.primaryRoom.label)} ↗</a></p>` : ""}${al.credit ? `<p class="credit">${esc(al.credit)}</p>` : ""}</aside></div><div class="gallery-grid" id="album-photos">${galleryGrid(al.gallery.slice(0, 36))}</div>${al.gallery.length > 36 ? `<button class="load-more" id="more-photos" data-shown="36">Seguir viendo <span>36 / ${al.gallery.length}</span></button>` : ""}${al.source ? `<div class="source-note"><p class="eyebrow">Documentación</p><p>${esc(al.source)}</p></div>` : ""}<div class="end-link">${a(parent, "Volver a " + label.toLowerCase() + " " + arrow)}</div>`
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
    all = albums.filter((al) => al.section === "exposiciones" && al.audience !== "educacion"),
    rooms3d = getRooms3dCatalog();
  const list = all.filter(
    (al) =>
      (f === "todas" ||
        al.exhibitionKind === f ||
        (f === "educacion" && al.audience === "educacion")) &&
      normalize([al.title, al.place, al.date, al.searchTerms].join(" ")).includes(
        normalize(q),
      ),
  );
  const filteredRooms3d = rooms3d.filter((r) => {
    const exhs = ROOM_EXHIBITIONS_MAP[r.hash] || [];
    return normalize([r.label, r.desc, r.sectionLabel, ...exhs.map((x) => x.label)].join(" ")).includes(normalize(q));
  });
  const types = [
    ["todas", "Todas", all.length],
    ["obra", "Obra propia", all.filter((al) => al.exhibitionKind === "obra").length],
    ["colectiva", "Colectivas", all.filter((al) => al.exhibitionKind === "colectiva").length],
    ["sala", "Sala", all.filter((al) => al.exhibitionKind === "sala").length],
    ["salas-3d", "Salas 3D", rooms3d.length],
  ];
  if (f === "salas-3d") {
    return (
      head(
        "Encuentros con el público",
        "Salas 3D",
        "Los siete espacios virtuales en relación con las exposiciones y el catálogo.",
      ) +
      `<nav class="tabs" aria-label="Tipo de exposición">${types.map(([id, t, count]) => a("/exposiciones" + (id === "todas" ? "" : "?tipo=" + id), t + ` <sup>${count}</sup>`, id === f ? "active" : "")).join("")}</nav>` +
      `<div class="result-line"><p role="status">${filteredRooms3d.length} salas 3D</p></div>` +
      renderSalas3dGrid(filteredRooms3d)
    );
  }
  return (
    head(
      "Encuentros con el público",
      "Exposiciones",
      "La obra en las salas y la memoria de los encuentros. Montajes, vistas del espacio y documentos organizados por el contexto de cada exposición.",
    ) +
    `<nav class="tabs" aria-label="Tipo de exposición">${types.map(([id, t, count]) => a("/exposiciones" + (id === "todas" ? "" : "?tipo=" + id), t + ` <sup>${count}</sup>`, id === f ? "active" : "")).join("")}</nav><form class="exhibition-search" id="exhibition-search"><label class="search"><span class="sr-only">Buscar exposición, lugar o año</span><input type="search" name="q" placeholder="Buscar exposición, lugar o año" value="${esc(q)}"><button aria-label="Buscar exposición">↗</button></label><input type="hidden" name="tipo" value="${esc(f)}"><div class="view-toggle" aria-label="Presentación"><button type="button" data-exhibition-view="mosaico" aria-pressed="${view === "mosaico"}">Mosaico</button><button type="button" data-exhibition-view="ampliada" aria-pressed="${view === "ampliada"}">Vista amplia</button></div></form><div class="result-line"><p role="status">${list.length} exposiciones</p>${a("/imagenes?ambito=exposiciones", "Ver todas las fotografías " + arrow)}</div>${list.length ? (view === "ampliada" ? `<div class="exhibition-results is-expanded">${exhibitionList(list)}</div>` : albumGrid(list)) : `<div class="empty"><h2>No hay exposiciones con esa búsqueda.</h2>${a("/exposiciones", "Restablecer filtros")}</div>`}<div class="source-note"><p>Las fechas documentadas se indican en cada archivo. Las muestras colectivas conservan diferenciadas las obras de sus participantes.</p></div>`
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
  const raw = location.hash.slice(1) || document.documentElement.dataset.defaultRoute || "/",
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
  currentDetailWork = null;
  lightboxWorkPool = [];
  lightboxWorkIndex = -1;
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
    html = sculpture(params); title = "Escultura";
  } else if (section === "escultura-moviles") {
    location.replace("#/escultura");
    return;


  } else if (section === "pintura") {
    html = painting(params); title = "Pintura";
  } else if (section === "dibujo") {
    html = drawing(params); title = "Dibujo";
  } else if (section === "pintura-dibujo") {
    location.replace("#/pintura");
    return;
  } else if (section === "jardin") {
    html = garden(); title = "Jardín de las Lagartijas";
  } else if (section === "exposicion-3d" || section === "galeria-3d" || section === "salas-3d") {
    html = exposicion3dPage(params); title = "Salas 3D";
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
  const fullTitle = title === site.name ? `${site.name} (Segarra y Garibo) · Escultor, Móviles, Pintura, Dibujo y Arte Infantil` : `${title || "Archivo"} — ${site.name} (Segarra y Garibo)`;
  document.title = fullTitle;
  document.documentElement.dataset.baseTitle = fullTitle;
  const seoDescriptions = {
    inicio: "Web oficial y catálogo de obra de Enric Segarra i Garibo (Segarra y Garibo, Barcelona 1959 – Valencia): escultor, móviles suspendidos, Jardín de las Lagartijas (Náquera), pintura, dibujo, arte infantil, exposiciones y museo virtual 3D.",
    moviles: "Catálogo de 33 móviles y esculturas cinéticas suspendidas de Enric Segarra i Garibo (Segarra y Garibo) y Sala de Móviles 3D interactiva.",
    escultura: "Catálogo de 55 esculturas en hierro forjado, madera tallada, piedra y ensamblaje de Enric Segarra i Garibo (Segarra y Garibo), con salas virtuales 3D.",
    jardin: "El Jardín de las Lagartijas (Jardí de les Sargantanes) en Náquera, Valencia: espacio escultórico en la naturaleza y recreación 3D de la parcela de Enric Segarra i Garibo.",
    pintura: "Catálogo de 76 pinturas de Enric Segarra i Garibo (Segarra y Garibo) en ocho series: Gatos, Tauromaquia, Arcas de Noé, Rostros y personajes, Figuras y símbolos, Relatos, Letras y Abstracciones.",
    dibujo: "Catálogo de 53 dibujos y obras sobre papel de Enric Segarra i Garibo (Segarra y Garibo): series Dibujo y espacio, Figuras y símbolos y Sala de Dibujo 3D.",
    "arte-infantil": "Proyecto educativo, talleres de arte infantil, formación docente y exposiciones de educación artística de Enric Segarra i Garibo en Valencia.",
    exposiciones: "Exposiciones individuales, muestras colectivas, archivo de la Sala d’Exposicions de les Belles Arts (Valencia) y salas virtuales 3D vinculadas de Enric Segarra i Garibo.",
    "exposicion-3d": "Exposición Virtual 3D interactiva con las 217 obras de Enric Segarra i Garibo distribuidas en 7 salas virtuales y el Jardín de las Lagartijas.",
    "trayectoria-contacto": "Biografía, memoria artística en seis etapas y contacto directo de Enric Segarra i Garibo (Segarra y Garibo), escultor y pintor en Valencia."
  };
  const metaDesc = seoDescriptions[section] || seoDescriptions.inicio;
  document.querySelector('meta[name="description"]')?.setAttribute("content", metaDesc);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", fullTitle);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", metaDesc);
  const al =
      section === "archivo" ? visibleAlbums().find((al) => al.id === id) : null,
    active =
      section === "textos" || al?.audience === "educacion"
        ? "arte-infantil"
        : al
          ? "exposiciones"
          : section;
  document.querySelectorAll("[data-nav]").forEach((el) => {
    const group = section === "obra" ? (id === "moviles" || works.find(w => w.id === id)?.category === "moviles" ? "moviles" : id === "escultura" || works.find(w => w.id === id)?.category === "escultura" ? "escultura" : id === "pintura" || works.find(w => w.id === id)?.category === "pintura" ? "pintura" : id === "dibujo" || works.find(w => w.id === id)?.category === "dibujo" ? "dibujo" : "") : active === "exposiciones" ? "exposiciones" : ["galeria-3d", "salas-3d"].includes(active) ? "exposicion-3d" : ["memoria", "artista", "contacto"].includes(active) ? "trayectoria-contacto" : active;
    if (el.dataset.nav === group) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
  closeMenu();
  const shouldRevealSeriesResults =
    !keepScroll &&
    ((section === "obra" && ["escultura", "pintura", "dibujo"].includes(id)) ||
      ["escultura", "pintura", "dibujo"].includes(section)) &&
    params.has("serie");
  const shouldRevealExpoStage =
    !keepScroll &&
    (section === "exposicion-3d" || section === "galeria-3d" || section === "salas-3d") &&
    params.has("sala");
  if (!keepScroll && !shouldRevealSeriesResults && !shouldRevealExpoStage) {
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
  if (shouldRevealSeriesResults) {
    requestAnimationFrame(() => {
      (document.querySelector(".room-3d-strip") || document.querySelector("#catalogue-results"))?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    });
  } else if (shouldRevealExpoStage) {
    requestAnimationFrame(() => {
      document.querySelector("[data-sala3d-card].is-highlighted")?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "center",
      });
    });
  }
}
let revealObserver = null;
function observe() {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = [...document.querySelectorAll(".reveal:not(.entered)")];
  if (!items.length) return;
  if (reduceMotion || typeof IntersectionObserver === "undefined") {
    items.forEach((el) => {
      el.classList.remove("will-reveal");
      el.classList.add("entered");
    });
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("entered");
            entry.target.classList.remove("will-reveal");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );
  }
  const vh = window.innerHeight || 800;
  let staggerIdx = 0;
  items.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.92 && rect.bottom > 0) {
      el.style.setProperty("--reveal-delay", `${Math.min(staggerIdx * 45, 220)}ms`);
      staggerIdx++;
      el.classList.add("will-reveal");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.add("entered");
          el.classList.remove("will-reveal");
        });
      });
    } else {
      el.style.setProperty("--reveal-delay", `${(staggerIdx % 4) * 55}ms`);
      staggerIdx++;
      el.classList.add("will-reveal");
      revealObserver.observe(el);
    }
  });
}

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
    const nextIdx = (target + slides.length) % slides.length;
    if (nextIdx === index) return;
    const nextImg = slides[nextIdx]?.querySelector("img");
    const activate = () => {
      slides[index]?.classList.remove("is-active");
      slides[index]?.setAttribute("aria-hidden", "true");
      kinds[index]?.classList.remove("is-active");
      captions[index]?.classList.remove("is-active");
      dots[index]?.classList.remove("is-active");
      dots[index]?.setAttribute("aria-current", "false");
      index = nextIdx;
      slides[index]?.classList.add("is-active");
      slides[index]?.setAttribute("aria-hidden", "false");
      kinds[index]?.classList.add("is-active");
      captions[index]?.classList.add("is-active");
      dots[index]?.classList.add("is-active");
      dots[index]?.setAttribute("aria-current", "true");
      if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${total}`;
    };
    if (nextImg && !nextImg.complete && nextImg.decode) {
      nextImg.decode().then(activate, activate);
    } else {
      activate();
    }
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
      }, 4800);
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
  const stageEl = document.querySelector(".main-photo-stage");
  if (stageEl && currentDetailWork) {
    let touchStartX = 0,
      touchStartY = 0;
    stageEl.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      },
      { passive: true, signal: pageEvents.signal },
    );
    stageEl.addEventListener(
      "touchend",
      (e) => {
        if (!touchStartX || !e.changedTouches.length || !currentDetailWork) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        touchStartX = 0;
        if (Math.abs(dx) > 54 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          const nav = getWorkNeighbors(currentDetailWork);
          if (dx < 0) {
            pendingNavDirection = "forward";
            location.hash = "/obra/" + nav.nextWork.id;
          } else {
            pendingNavDirection = "backward";
            location.hash = "/obra/" + nav.prevWork.id;
          }
        }
      },
      { passive: true, signal: pageEvents.signal },
    );
  }
}

function setLightboxWorkPoolFromWork(w, pool = null) {
  const nav = getWorkNeighbors(w);
  lightboxWorkPool = pool && pool.length ? pool.slice() : nav.seriesPool;
  lightboxWorkIndex = Math.max(0, lightboxWorkPool.findIndex((x) => x.id === w.id));
  const target = lightboxWorkPool[lightboxWorkIndex] || w;
  setGallery(
    target.gallery.map((p) => ({
      ...p,
      owners: [
        {
          id: target.id,
          label: `${target.label} (${target.reference})`,
          path: `/obra/${target.id}`,
          credit: seriesLabel(target.category, target.series),
          scope: "obra",
        },
      ],
    })),
    `${target.reference} · ${target.label}`,
  );
  selectedPhoto = 0;
}

function startLightboxAnimatica(pool, startIndex = 0) {
  if (!pool || !pool.length) return;
  lightboxWorkPool = pool.slice();
  lightboxWorkIndex = Math.max(0, Math.min(pool.length - 1, startIndex));
  const target = lightboxWorkPool[lightboxWorkIndex];
  setGallery(
    target.gallery.map((p) => ({
      ...p,
      owners: [
        {
          id: target.id,
          label: `${target.label} (${target.reference})`,
          path: `/obra/${target.id}`,
          credit: seriesLabel(target.category, target.series),
          scope: "obra",
        },
      ],
    })),
    `${target.reference} · ${target.label}`,
  );
  selectedPhoto = 0;
  animaticaActive = true;
  dialog.classList.add("is-animatica");
  if (!dialog.open) dialog.showModal();
  showImage({ immediate: true });
  setLightboxAnimaticaState(true);
}

const ANIMATICA_2D_DURATION_MS = 5200;
function scheduleLightboxAnimaticaTick() {
  if (animaticaTimer) window.clearTimeout(animaticaTimer);
  animaticaTimer = null;
  const progressWrap = document.querySelector("#lightbox-progress");
  const progressFill = document.querySelector("#lightbox-progress-fill");
  if (!animaticaActive || !dialog.open) {
    if (progressWrap) progressWrap.hidden = true;
    return;
  }
  if (progressWrap && progressFill) {
    progressWrap.hidden = false;
    progressFill.style.transition = "none";
    progressFill.style.width = "0%";
    void progressFill.offsetWidth;
    progressFill.style.transition = `width ${ANIMATICA_2D_DURATION_MS}ms linear`;
    progressFill.style.width = "100%";
  }
  animaticaTimer = window.setTimeout(() => {
    if (!animaticaActive || !dialog.open) return;
    if (selectedPhoto + 1 < currentGallery.length) {
      step(1);
    } else if (lightboxWorkPool.length > 1) {
      stepLightboxWork(1);
    } else {
      step(1);
    }
  }, ANIMATICA_2D_DURATION_MS);
}

function setLightboxAnimaticaState(active) {
  animaticaActive = Boolean(active);
  dialog.classList.toggle("is-animatica", animaticaActive);
  const image = document.querySelector("#large-image");
  if (image) {
    image.classList.remove("ken-burns-active", "kb-0", "kb-1", "kb-2", "kb-3");
    if (animaticaActive && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void image.offsetWidth;
      image.classList.add("ken-burns-active", `kb-${(lightboxWorkIndex + selectedPhoto) % 4}`);
    }
  }
  const btn = document.querySelector("#lightbox-animatica-toggle");
  const progressWrap = document.querySelector("#lightbox-progress");
  if (btn) {
    btn.setAttribute("aria-pressed", String(animaticaActive));
    btn.textContent = animaticaActive ? "Pausar" : "Presentación";
    applyTranslations(btn);
  }
  if (!animaticaActive) {
    if (animaticaTimer) window.clearTimeout(animaticaTimer);
    animaticaTimer = null;
    if (progressWrap) progressWrap.hidden = true;
  } else {
    scheduleLightboxAnimaticaTick();
  }
}

function stepLightboxWork(delta, lastPhoto = false) {
  if (lightboxWorkPool.length < 2) return;
  lightboxWorkIndex =
    (lightboxWorkIndex + delta + lightboxWorkPool.length) % lightboxWorkPool.length;
  const target = lightboxWorkPool[lightboxWorkIndex];
  if (!target) return;
  setGallery(
    target.gallery.map((p) => ({
      ...p,
      owners: [
        {
          id: target.id,
          label: `${target.label} (${target.reference})`,
          path: `/obra/${target.id}`,
          credit: seriesLabel(target.category, target.series),
          scope: "obra",
        },
      ],
    })),
    `${target.reference} · ${target.label}`,
  );
  selectedPhoto = lastPhoto ? Math.max(0, currentGallery.length - 1) : 0;
  showImage({ direction: delta });
}

main.addEventListener("click", (e) => {
  const navDirEl = e.target.closest("[data-nav-dir]");
  if (navDirEl) {
    pendingNavDirection = navDirEl.dataset.navDir || "forward";
  }
  const animBtn = e.target.closest("[data-start-animatica]");
  if (animBtn) {
    const mode = animBtn.dataset.startAnimatica;
    let pool = [];
    let startIdx = 0;
    if (mode === "series") {
      const workId = animBtn.dataset.workId;
      const w = works.find((x) => x.id === workId) || currentDetailWork || works[0];
      const nav = getWorkNeighbors(w);
      pool = nav.seriesPool;
      startIdx = nav.seriesIdx;
    } else if (mode === "series-group" || mode === "banner") {
      const cat = animBtn.dataset.seriesCat || "";
      const sName = animBtn.dataset.seriesName || "";
      pool = works.filter(
        (x) => (!cat || x.category === cat) && (!sName || x.series === sName),
      );
    } else if (mode === "filtered" && activeFilters?.filtered?.length) {
      pool = activeFilters.filtered;
    } else {
      pool = works;
    }
    startLightboxAnimatica(pool, startIdx);
    return;
  }
  const photo = e.target.closest("[data-photo]");
  if (photo) {
    if (currentDetailWork) {
      setLightboxWorkPoolFromWork(currentDetailWork);
    }
    selectedPhoto = +photo.dataset.photo;
    showImage({ immediate: true });
    dialog.showModal();
    return;
  }
  const preview = e.target.closest("[data-preview]");
  if (preview) {
    const i = +preview.dataset.preview,
      p = currentGallery[i],
      button = document.querySelector(".main-photo");
    if (!p || !button) return;
    button.dataset.photo = i;
    const image = button.querySelector("img:not(.main-photo-back)");
    const nextSrc = asset(p.image, p.local);
    document
      .querySelectorAll("[data-preview]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === preview)));
    if (image && image.getAttribute("src") !== nextSrc) {
      const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        image.src = nextSrc;
        image.alt = p.alt;
      } else {
        let backImg = button.querySelector(".main-photo-back");
        if (!backImg) {
          backImg = document.createElement("img");
          backImg.className = "main-photo-back";
          backImg.alt = "";
          backImg.setAttribute("aria-hidden", "true");
          button.insertBefore(backImg, image);
        }
        const prevSrc = image.getAttribute("src");
        const pre = new Image();
        pre.src = nextSrc;
        const commit = () => {
          if (prevSrc) {
            backImg.classList.remove("is-dissolving-out");
            backImg.src = prevSrc;
            backImg.style.opacity = "1";
          }
          image.classList.add("is-entering-frame");
          image.src = nextSrc;
          image.alt = p.alt;
          void image.offsetWidth;
          requestAnimationFrame(() => {
            image.classList.remove("is-entering-frame");
            if (prevSrc) backImg.classList.add("is-dissolving-out");
          });
        };
        if (pre.decode) pre.decode().then(commit, commit);
        else pre.onload = pre.onerror = commit;
      }
    }
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
let lightboxTransitionToken = 0;
function preloadNextLightboxAsset() {
  let nextP = null;
  if (selectedPhoto + 1 < currentGallery.length) {
    nextP = currentGallery[selectedPhoto + 1];
  } else if (lightboxWorkPool.length > 1) {
    const nextW = lightboxWorkPool[(lightboxWorkIndex + 1) % lightboxWorkPool.length];
    nextP = nextW?.gallery?.[0];
  }
  if (nextP) {
    const pre = new Image();
    pre.src = asset(nextP.image, nextP.local);
  }
}
function ensureLightboxBackLayer() {
  let back = document.querySelector("#large-image-back");
  if (!back && dialog) {
    const fg = document.querySelector("#large-image");
    if (fg) {
      back = document.createElement("img");
      back.id = "large-image-back";
      back.className = "large-image-back";
      back.alt = "";
      back.setAttribute("aria-hidden", "true");
      fg.parentNode.insertBefore(back, fg);
    }
  }
  return back;
}
function showImage(opts = {}) {
  const p = currentGallery[selectedPhoto];
  if (!p) return;
  const token = ++lightboxTransitionToken;
  const image = document.querySelector("#large-image");
  const backImage = ensureLightboxBackLayer();
  const captionEl = document.querySelector("#image-caption");
  const contextEl = document.querySelector("#image-context");
  const nextSrc = asset(p.image, p.local);
  const ownerWork =
    (lightboxWorkPool.length && lightboxWorkPool[lightboxWorkIndex]) ||
    works.find(
      (w) =>
        p.owners?.some((o) => o.path === "/obra/" + w.id || o.id === w.id) ||
        w.gallery.some((gp) => gp.archiveId === p.archiveId),
    );
  const viewPart =
    currentGallery.length > 1
      ? ` · ${selectedPhoto + 1} / ${currentGallery.length}`
      : "";
  const captionText = `${ownerWork ? `${ownerWork.reference} · ${ownerWork.label}` : p.owners?.[0]?.label || galleryLabel}${viewPart} · ${photoRef(p)}`;
  const link3d = ownerWork
    ? `<a class="lightbox-3d-link" href="${work3dUrl(ownerWork)}">Sala 3D ↗</a>`
    : "";
  const fichaLink =
    ownerWork && (!currentDetailWork || currentDetailWork.id !== ownerWork.id)
      ? `<a class="lightbox-ficha-link" href="#/obra/${esc(ownerWork.id)}">Ver ficha ↗</a>`
      : "";
  const contextHtml =
    (p.owners
      ? p.owners
          .map(
            (o) =>
              a(o.path, esc(o.label) + " ↗") + `<span>${esc(o.credit)}</span>`,
          )
          .join("")
      : p.attribution
        ? `<span>${esc(p.attribution)}</span>`
        : "") +
    fichaLink +
    link3d;
  document
    .querySelectorAll("[data-step]")
    .forEach((b) => (b.disabled = currentGallery.length < 2 && lightboxWorkPool.length < 2));

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const prevSrc = image.getAttribute("src");
  const kbClass = `kb-${(lightboxWorkIndex + selectedPhoto) % 4}`;

  const applyImmediate = () => {
    if (token !== lightboxTransitionToken) return;
    if (backImage) {
      backImage.classList.remove("is-dissolving-out");
      backImage.style.opacity = "0";
    }
    image.classList.remove("is-entering-frame", "is-transitioning-out", "ken-burns-active", "kb-0", "kb-1", "kb-2", "kb-3");
    image.src = nextSrc;
    image.alt = p.alt;
    if (captionEl) {
      captionEl.textContent = captionText;
      captionEl.classList.remove("is-transitioning-out");
    }
    if (contextEl) {
      contextEl.innerHTML = contextHtml;
      contextEl.classList.remove("is-transitioning-out");
    }
    applyTranslations(dialog);
    if (animaticaActive && !reduceMotion) {
      void image.offsetWidth;
      image.classList.add("ken-burns-active", kbClass);
    }
    preloadNextLightboxAsset();
    if (animaticaActive) {
      scheduleLightboxAnimaticaTick();
    }
  };

  if (opts.immediate || reduceMotion || !dialog.open || !prevSrc || prevSrc === nextSrc) {
    applyImmediate();
    return;
  }

  if (animaticaTimer) {
    window.clearTimeout(animaticaTimer);
    animaticaTimer = null;
  }

  const pre = new Image();
  pre.src = nextSrc;
  const decodePromise = pre.decode
    ? pre.decode().catch(() => {})
    : new Promise((res) => {
        pre.onload = pre.onerror = res;
      });

  decodePromise.then(() => {
    if (token !== lightboxTransitionToken) return;
    // True Dual-Layer Lap-Dissolve: keep previous artwork on backImage while new artwork emerges on image
    if (backImage && prevSrc) {
      backImage.classList.remove("is-dissolving-out");
      backImage.src = prevSrc;
      backImage.style.opacity = "1";
    }
    captionEl?.classList.add("is-transitioning-out");
    contextEl?.classList.add("is-transitioning-out");

    image.classList.remove("ken-burns-active", "kb-0", "kb-1", "kb-2", "kb-3");
    image.classList.add("is-entering-frame");
    image.src = nextSrc;
    image.alt = p.alt;
    void image.offsetWidth;

    requestAnimationFrame(() => {
      if (token !== lightboxTransitionToken) return;
      image.classList.remove("is-entering-frame");
      if (animaticaActive && !reduceMotion) {
        image.classList.add("ken-burns-active", kbClass);
      }
      if (backImage && prevSrc) {
        backImage.classList.add("is-dissolving-out");
      }
    });

    window.setTimeout(() => {
      if (token !== lightboxTransitionToken) return;
      if (captionEl) captionEl.textContent = captionText;
      if (contextEl) contextEl.innerHTML = contextHtml;
      applyTranslations(dialog);
      requestAnimationFrame(() => {
        captionEl?.classList.remove("is-transitioning-out");
        contextEl?.classList.remove("is-transitioning-out");
      });
    }, 170);

    preloadNextLightboxAsset();
    if (animaticaActive) {
      scheduleLightboxAnimaticaTick();
    }
  });
}
function step(n) {
  if (lightboxWorkPool.length > 1) {
    if (n > 0 && selectedPhoto + n >= currentGallery.length) {
      stepLightboxWork(1, false);
      return;
    }
    if (n < 0 && selectedPhoto + n < 0) {
      stepLightboxWork(-1, true);
      return;
    }
  }
  if (!currentGallery.length) return;
  selectedPhoto =
    (selectedPhoto + n + currentGallery.length) % currentGallery.length;
  showImage({ direction: n });
}
document
  .querySelector(".close-image")
  .addEventListener("click", () => dialog.close());
document
  .querySelectorAll("[data-step]")
  .forEach((b) => b.addEventListener("click", () => step(+b.dataset.step)));
document
  .querySelector("#lightbox-animatica-toggle")
  ?.addEventListener("click", () => setLightboxAnimaticaState(!animaticaActive));
dialog.addEventListener("close", () => {
  setLightboxAnimaticaState(false);
});
dialog.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    if (e.shiftKey && lightboxWorkPool.length > 1) stepLightboxWork(1);
    else step(1);
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    if (e.shiftKey && lightboxWorkPool.length > 1) stepLightboxWork(-1);
    else step(-1);
  }
  if (e.key === "]") {
    e.preventDefault();
    stepLightboxWork(1);
  }
  if (e.key === "[") {
    e.preventDefault();
    stepLightboxWork(-1);
  }
  if (e.key === " ") {
    e.preventDefault();
    setLightboxAnimaticaState(!animaticaActive);
  }
});
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
  if (e.target.closest(".lightbox-ficha-link")) {
    dialog.close();
  }
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
  if (dialog.open || !currentDetailWork) return;
  const tag = document.activeElement?.tagName || "";
  if (["INPUT", "TEXTAREA", "SELECT", "IFRAME"].includes(tag)) return;
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === "ArrowRight" || e.key === "]") {
    e.preventDefault();
    const nav = getWorkNeighbors(currentDetailWork);
    pendingNavDirection = "forward";
    location.hash = "/obra/" + nav.nextWork.id;
  } else if (e.key === "ArrowLeft" || e.key === "[") {
    e.preventDefault();
    const nav = getWorkNeighbors(currentDetailWork);
    pendingNavDirection = "backward";
    location.hash = "/obra/" + nav.prevWork.id;
  }
});
let lastHeaderScrollY = window.scrollY;
window.addEventListener(
  "scroll",
  () => {
    const headerEl = document.querySelector(".header");
    if (!headerEl) return;
    const y = window.scrollY;
    if (innerWidth > 900 || headerEl.classList.contains("menu-open") || y < 48) {
      headerEl.classList.remove("is-scroll-hidden");
      lastHeaderScrollY = y;
      return;
    }
    const delta = y - lastHeaderScrollY;
    if (delta > 10) {
      headerEl.classList.add("is-scroll-hidden");
      lastHeaderScrollY = y;
    } else if (delta < -6) {
      headerEl.classList.remove("is-scroll-hidden");
      lastHeaderScrollY = y;
    }
  },
  { passive: true },
);
function renderWithViewTransition() {
  const direction = pendingNavDirection || "forward";
  pendingNavDirection = "";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shiftFocusAfterNav = () => {
    const heading = main.querySelector("h1");
    if (heading) {
      if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  };
  if (typeof document.startViewTransition === "function" && !reduceMotion) {
    try {
      const vt = document.startViewTransition({
        update: () => render(),
        types: [direction],
      });
      vt.finished?.then(shiftFocusAfterNav).catch(() => {});
      return;
    } catch {
      try {
        const vt = document.startViewTransition(() => render());
        vt.finished?.then(shiftFocusAfterNav).catch(() => {});
        return;
      } catch {}
    }
  }
  render();
  shiftFocusAfterNav();
}
window.addEventListener("hashchange", () => renderWithViewTransition());
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
