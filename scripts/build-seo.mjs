import { writeFile } from "node:fs/promises";
import { site, works, albums, chapters } from "../dist/content.js";
import { collections } from "../dist/collections.js";
import { educationIntro, educationPrinciples, educationSections, readings } from "../dist/education.js";

const DOMAIN = "https://enricsegarraigaribo.com";
const TODAY = "2026-11-13";
const VERSION = "20261113-live3d-v25";

const esc = (s = "") =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const artistSchema = {
  "@type": ["Person", "VisualArtist"],
  "@id": `${DOMAIN}/#artist`,
  name: "Enric Segarra i Garibo",
  alternateName: [
    "Segarra y Garibo",
    "SEGARRA Y GARIBO",
    "Enric Segarra",
    "Enrique Segarra Garibo",
    "Enric Segarra Garibo",
  ],
  birthDate: "1959",
  birthPlace: {
    "@type": "Place",
    name: "Barcelona, España",
  },
  workLocation: [
    {
      "@type": "Place",
      name: "Valencia, España",
    },
    {
      "@type": "Place",
      name: "Jardín de las Lagartijas (Jardí de les Sargantanes), Partida Collado dels Llops, Náquera, Valencia",
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Facultad de Bellas Artes de San Carlos, Valencia",
  },
  jobTitle: "Escultor, pintor, dibujante y educador artístico",
  description:
    "Escultor, pintor, dibujante y educador artístico nacido en Barcelona (1959) y formado en Bellas Artes en Valencia. Autor de móviles y esculturas suspendidas, escultura en hierro, madera y piedra, el espacio natural Jardín de las Lagartijas en Náquera, series pictóricas (Gatos, Tauromaquia, Arcas de Noé) y proyectos de arte infantil.",
  knowsAbout: [
    "Escultura contemporánea",
    "Móviles cinéticos y esculturas suspendidas",
    "Jardín de las Lagartijas (Jardí de les Sargantanes)",
    "Escultura en hierro forjado, madera y piedra",
    "Pintura contemporánea",
    "Dibujo y obra sobre papel",
    "Arte infantil y educación artística",
  ],
  url: `${DOMAIN}/`,
  image: `${DOMAIN}/assets/retrato.webp`,
  email: `mailto:${site.contactEmail}`,
  telephone: site.contactPhone,
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${DOMAIN}/#website`,
  url: `${DOMAIN}/`,
  name: "ENRIC SEGARRA I GARIBO · Obra, presente y memoria",
  alternateName: ["SEGARRA Y GARIBO", "Enric Segarra Portfolio Oficial"],
  description:
    "Web oficial, catálogo razonado de 217 obras, museo virtual 3D y memoria artística de Enric Segarra i Garibo (Segarra y Garibo).",
  inLanguage: ["es", "ca", "en", "fr", "zh", "ja"],
  publisher: { "@id": `${DOMAIN}/#artist` },
};

function buildPageHtml({
  filename,
  defaultRoute,
  title,
  description,
  keywords,
  ogImage = "assets/retrato.webp",
  ogImageAlt = "Enric Segarra i Garibo (Segarra y Garibo) junto a su obra escultórica",
  schemaGraph = [],
  bodyHtml = "",
}) {
  const canonicalUrl = filename === "index.html" ? `${DOMAIN}/` : `${DOMAIN}/${filename}`;
  const fullJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [artistSchema, websiteSchema, ...schemaGraph],
  });

  return `<!doctype html>
<html lang="es"${defaultRoute && defaultRoute !== "/" ? ` data-default-route="${esc(defaultRoute)}"` : ""}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="description" content="${esc(description)}" />
    <meta name="keywords" content="${esc(keywords)}" />
    <meta name="author" content="Enric Segarra i Garibo (Segarra y Garibo)" />
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="geo.region" content="ES-VC" />
    <meta name="geo.placename" content="Valencia, Náquera" />
    <link rel="canonical" href="${esc(canonicalUrl)}" />
    <link rel="sitemap" type="application/xml" title="Sitemap" href="sitemap.xml" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:locale:alternate" content="ca_ES" />
    <meta property="og:locale:alternate" content="en_US" />
    <meta property="og:locale:alternate" content="fr_FR" />
    <meta property="og:locale:alternate" content="zh_CN" />
    <meta property="og:locale:alternate" content="ja_JP" />
    <meta property="og:site_name" content="ENRIC SEGARRA I GARIBO · SEGARRA Y GARIBO" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${esc(canonicalUrl)}" />
    <meta property="og:image" content="${DOMAIN}/${esc(ogImage)}" />
    <meta property="og:image:alt" content="${esc(ogImageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${DOMAIN}/${esc(ogImage)}" />
    <meta name="color-scheme" content="light" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'"
    />
    <title>${esc(title)}</title>
    <link
      rel="icon"
      type="image/svg+xml"
      href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23ffffff'/%3E%3Ctext x='13' y='47' font-family='Arial,sans-serif' font-size='46' fill='%23222222'%3Ee%3C/text%3E%3C/svg%3E"
    />
    <link rel="stylesheet" href="styles.css?v=${VERSION}" />
    <script type="application/ld+json">${fullJsonLd}</script>
    <script type="module" src="app.js?v=${VERSION}"></script>
  </head>
  <body>
    <a class="skip" href="#contenido">Saltar al contenido</a>
    <header class="header">
      <a class="brand" href="#/" aria-label="ENRIC SEGARRA I GARIBO, inicio"
        >ENRIC SEGARRA I GARIBO</a
      >
      <button
        id="menu-toggle"
        class="menu-toggle"
        aria-expanded="false"
        aria-controls="nav"
      >
        Menú <span aria-hidden="true">+</span>
      </button>
      <nav id="nav" aria-label="Navegación principal">
        <a href="#/" data-nav="inicio">Inicio</a>
        <a href="#/exposicion-3d" data-nav="exposicion-3d">Salas 3D</a>
        <a href="#/moviles" data-nav="moviles">Móviles</a>
        <a href="#/escultura" data-nav="escultura">Escultura</a>
        <a href="#/jardin" data-nav="jardin">Jardín de las Lagartijas</a>
        <a href="#/pintura" data-nav="pintura">Pintura</a>
        <a href="#/dibujo" data-nav="dibujo">Dibujo</a>
        <a href="#/arte-infantil" data-nav="arte-infantil">Arte infantil</a>
        <a href="#/exposiciones" data-nav="exposiciones">Exposiciones</a>
        <a href="#/trayectoria-contacto" data-nav="trayectoria-contacto">Trayectoria y contacto</a>
      </nav>
      <label class="language-switcher">
        <span class="sr-only">Idioma</span>
        <select data-language-select aria-label="Idioma">
          <option data-language-option value="es">ES</option>
          <option data-language-option value="ca">CA</option>
          <option data-language-option value="en">EN</option>
          <option data-language-option value="fr">FR</option>
          <option data-language-option value="zh">中文</option>
          <option data-language-option value="ja">日本語</option>
        </select>
      </label>
      <p class="sidebar-note">
        OBRA · VIDA · EDUCACIÓN<br />Un archivo en movimiento.
      </p>
    </header>
    <main id="contenido" tabindex="-1">
${bodyHtml}
    </main>
    <footer class="footer">
      <a class="footer-brand" href="#/">ENRIC SEGARRA I GARIBO</a>
      <p>Obra, presente y memoria · Segarra y Garibo</p>
      <nav aria-label="Enlaces directos de archivo e indexación" class="seo-footer-links">
        <a href="moviles.html">Móviles</a> ·
        <a href="escultura.html">Escultura</a> ·
        <a href="jardin-de-las-lagartijas.html">Jardín de las Lagartijas</a> ·
        <a href="pintura.html">Pintura</a> ·
        <a href="dibujo.html">Dibujo</a> ·
        <a href="arte-infantil.html">Arte infantil</a> ·
        <a href="exposiciones.html">Exposiciones</a> ·
        <a href="biografia-enric-segarra.html">Biografía y contacto</a> ·
        <a href="galeria-3d/index.html">Museo 3D</a>
      </nav>
      <small>Selección en desarrollo · Archivo familiar</small>
    </footer>
    <dialog id="image-dialog" aria-labelledby="image-caption">
      <div class="dialog-top-bar">
        <button type="button" id="lightbox-animatica-toggle" class="lightbox-animatica-btn" aria-pressed="false">Presentación</button>
        <button class="close-image" aria-label="Cerrar imagen">
          Cerrar <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="lightbox-progress" id="lightbox-progress" hidden>
        <div class="lightbox-progress-fill" id="lightbox-progress-fill"></div>
      </div>
      <img id="large-image" alt="" />
      <div class="dialog-bottom">
        <button data-step="-1" aria-label="Fotografía anterior">
          ← Anterior
        </button>
        <div><p id="image-caption" aria-live="polite"></p><div id="image-context"></div></div>
        <button data-step="1" aria-label="Fotografía siguiente">
          Siguiente →
        </button>
      </div>
    </dialog>
    <noscript>
      <p>Archivo público de obra y memoria artística de Enric Segarra i Garibo (Segarra y Garibo). Puedes recorrer directamente los apartados de <a href="moviles.html">Móviles</a>, <a href="escultura.html">Escultura</a>, <a href="jardin-de-las-lagartijas.html">Jardín de las Lagartijas</a>, <a href="pintura.html">Pintura</a>, <a href="dibujo.html">Dibujo</a>, <a href="arte-infantil.html">Arte infantil</a>, <a href="exposiciones.html">Exposiciones</a> y <a href="biografia-enric-segarra.html">Trayectoria y contacto</a>.</p>
    </noscript>
  </body>
</html>
`;
}

function renderStaticWorkList(list, limit = 80) {
  return `<div class="work-grid">${list
    .slice(0, limit)
    .map(
      (w) => `<article class="work-card">
        <a href="#/obra/${esc(w.id)}">
          <img src="assets/${esc(w.thumb)}.webp" alt="${esc(w.alt)} — ${esc(w.label)} (${esc(w.reference)}) de Enric Segarra i Garibo" loading="lazy" />
          <div class="card-body">
            <span class="reference">${esc(w.reference)} · ${esc(w.series)}</span>
            <h3>${esc(w.label)}</h3>
            <p>${esc(w.text)}</p>
          </div>
        </a>
      </article>`,
    )
    .join("\n")}</div>`;
}

function buildArtworkSchemaList(list, pageUrl, listName) {
  return {
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    url: pageUrl,
    name: listName,
    about: { "@id": `${DOMAIN}/#artist` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: list.length,
      itemListElement: list.slice(0, 40).map((w, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "VisualArtwork",
          "@id": `${DOMAIN}/#/obra/${w.id}`,
          name: `${w.label} (${w.reference})`,
          identifier: w.reference,
          artform: w.category === "moviles" ? "Móvil escultórico suspendido" : w.category,
          artMedium: w.series,
          description: w.text,
          image: `${DOMAIN}/assets/${w.image}.webp`,
          creator: { "@id": `${DOMAIN}/#artist` },
        },
      })),
    },
  };
}

const movilesWorks = works.filter((w) => w.category === "moviles");
const esculturaWorks = works.filter((w) => w.category === "escultura");
const pinturaWorks = works.filter((w) => w.category === "pintura");
const dibujoWorks = works.filter((w) => w.category === "dibujo");

const pages = [
  {
    filename: "index.html",
    defaultRoute: "/",
    title: "ENRIC SEGARRA I GARIBO (Segarra y Garibo) · Escultor, Móviles, Pintura, Dibujo y Arte Infantil",
    description:
      "Web oficial y catálogo de obra de Enric Segarra i Garibo (Segarra y Garibo, Barcelona 1959 – Valencia). Escultor, móviles suspendidos, Jardín de las Lagartijas (Náquera), pintura (Gatos, Tauromaquia, Arcas de Noé), dibujo, arte infantil, exposiciones y museo virtual 3D.",
    keywords:
      "Enric Segarra i Garibo, Enric Segarra, Segarra y Garibo, Enrique Segarra, escultor Valencia, móviles esculturas suspendidas, Jardín de las Lagartijas, Jardí de les Sargantanes, Náquera, escultura hierro madera piedra, pintura contemporánea Valencia, serie Gatos, Tauromaquia, Arcas de Noé, arte infantil, educación artística, Sala d'Exposicions de les Belles Arts Valencia",
    ogImage: "assets/retrato.webp",
    schemaGraph: [
      buildArtworkSchemaList(
        [movilesWorks[0], esculturaWorks[0], pinturaWorks[0], dibujoWorks[0], ...movilesWorks.slice(1, 8), ...esculturaWorks.slice(1, 8)],
        `${DOMAIN}/`,
        "Catálogo general de obra de Enric Segarra i Garibo (Segarra y Garibo)",
      ),
    ],
    bodyHtml: `
      <section class="page-head">
        <p class="eyebrow">WEB OFICIAL · ARCHIVO DE OBRA Y MEMORIA ARTÍSTICA</p>
        <h1>ENRIC SEGARRA I GARIBO <span class="sr-only">(Segarra y Garibo · Enric Segarra)</span></h1>
        <p class="lead">${esc(site.intro)}</p>
      </section>
      <section class="prose">
        <p><strong>Enric Segarra i Garibo</strong> (firmado artísticamente como <strong>Segarra y Garibo</strong>, nacido en Barcelona en 1959 y formado en la Facultad de Bellas Artes de Valencia) desarrolla una obra que abarca la <strong>escultura en hierro forjado, madera tallada, piedra y ensamblaje</strong>, los <strong>móviles y esculturas cinéticas suspendidas</strong>, el espacio natural <strong>El Jardín de las Lagartijas (Jardí de les Sargantanes)</strong> en Náquera (Valencia), la <strong>pintura</strong> (series <em>Gatos</em>, <em>Tauromaquia</em>, <em>Arcas de Noé</em>, <em>Rostros y personajes</em>), el <strong>dibujo</strong> y los proyectos de <strong>arte infantil y educación artística</strong>.</p>
      </section>
      <section class="section" aria-label="Apartados principales del catálogo">
        <h2>Recorrido por disciplinas y espacios</h2>
        <ul>
          <li><a href="moviles.html"><strong>Móviles (33 obras suspendidas y Sala de Móviles 3D)</strong></a>: esculturas cinéticas en equilibrio con el viento y la gravedad.</li>
          <li><a href="escultura.html"><strong>Escultura (55 obras en hierro, madera y piedra + Salas 3D)</strong></a>: planos curvos y volúmenes abiertos, formas orgánicas, relieves, ensamblajes e intervenciones exteriores.</li>
          <li><a href="jardin-de-las-lagartijas.html"><strong>Jardín de las Lagartijas / Jardí de les Sargantanes (Náquera, Valencia)</strong></a>: espacio escultórico en la naturaleza y recreación topográfica 3D de la parcela en Partida Collado dels Llops.</li>
          <li><a href="pintura.html"><strong>Pintura (76 obras en ocho series + Sala de Pintura 3D)</strong></a>: Gatos, Tauromaquia, Arcas de Noé, Rostros y personajes, Figuras y símbolos, Relatos e iconografía, Letras y signos y Abstracciones.</li>
          <li><a href="dibujo.html"><strong>Dibujo y obra sobre papel (53 obras + Sala de Dibujo 3D)</strong></a>: Dibujo y espacio, Figuras y símbolos en ceras, carbón y pastel.</li>
          <li><a href="arte-infantil.html"><strong>Arte infantil y educación artística</strong></a>: proyecto pedagógico, talleres, formación docente, lecturas y exposiciones infantiles.</li>
          <li><a href="exposiciones.html"><strong>Exposiciones y Archivo de Sala</strong></a>: muestras individuales, colectivas, salas virtuales 3D vinculadas y archivo de la Sala d’Exposicions de les Belles Arts de Valencia («Evolución 1984–2004»).</li>
          <li><a href="biografia-enric-segarra.html"><strong>Trayectoria, biografía y contacto</strong></a>: seis capítulos documentales y contacto directo con el artista (${esc(site.contactEmail)} · 615 224 258).</li>
          <li><a href="galeria-3d/index.html"><strong>Museo y Espacios en Movimiento 3D</strong></a>: siete espacios virtuales interactivos (Galería blanca, Jardín de las Lagartijas, Sala de Pintura, Sala de Dibujo, Formas orgánicas, Planos curvos y Sala de Móviles 3D).</li>
        </ul>
      </section>
      <section class="section" aria-label="Selección destacada de obras">
        <h2>Obras representativas del catálogo (${works.length} fichas documentadas)</h2>
        ${renderStaticWorkList([
          ...movilesWorks.slice(0, 6),
          ...esculturaWorks.slice(0, 6),
          ...pinturaWorks.slice(0, 6),
          ...dibujoWorks.slice(0, 6),
        ], 24)}
      </section>`,
  },
  {
    filename: "moviles.html",
    defaultRoute: "/moviles",
    title: "Móviles y Esculturas Suspendidas · ENRIC SEGARRA I GARIBO (Segarra y Garibo)",
    description:
      "Catálogo de los 33 móviles y esculturas cinéticas suspendidas de Enric Segarra i Garibo (Segarra y Garibo) y Sala de Móviles 3D con cámara libre en altura (1.72m, 2.80m y 3.60m).",
    keywords:
      "móviles Enric Segarra, esculturas suspendidas, arte cinético Valencia, móviles jardín, Sala de Móviles 3D, Enric Segarra i Garibo, Segarra y Garibo",
    ogImage: `assets/${movilesWorks[0]?.image || "arc-014887"}.webp`,
    schemaGraph: [
      buildArtworkSchemaList(
        movilesWorks,
        `${DOMAIN}/moviles.html`,
        "Móviles y esculturas suspendidas de Enric Segarra i Garibo",
      ),
    ],
    bodyHtml: `
      <section class="page-head">
        <p class="eyebrow">CATÁLOGO DE OBRA · ESCULTURA CINÉTICA SUSPENDIDA</p>
        <h1>Móviles de Enric Segarra i Garibo (Segarra y Garibo)</h1>
        <p class="lead">Serie de 33 esculturas suspendidas realizadas con materiales recuperados, metal, madera y elementos encontrados que dialogan con el aire en el jardín de casa, en el Jardín de las Lagartijas (Náquera) y en la Sala de Móviles 3D.</p>
      </section>
      ${renderStaticWorkList(movilesWorks, 33)}`,
  },
  {
    filename: "escultura.html",
    defaultRoute: "/escultura",
    title: "Escultura en Hierro, Madera y Piedra · ENRIC SEGARRA I GARIBO (Segarra y Garibo)",
    description:
      "Catálogo de 55 esculturas de Enric Segarra i Garibo (Segarra y Garibo): planos curvos y volúmenes abiertos, formas orgánicas, relieves, ensamblajes e intervenciones exteriores, con salas virtuales 3D.",
    keywords:
      "escultura Enric Segarra, escultor Valencia, escultura hierro forjado, talla madera piedra, formas orgánicas, planos curvos, ensamblajes escultóricos, Enric Segarra i Garibo, Segarra y Garibo",
    ogImage: `assets/${esculturaWorks[0]?.image || "escultura-madera"}.webp`,
    schemaGraph: [
      buildArtworkSchemaList(
        esculturaWorks,
        `${DOMAIN}/escultura.html`,
        "Escultura en hierro, madera, piedra y ensamblaje de Enric Segarra i Garibo",
      ),
    ],
    bodyHtml: `
      <section class="page-head">
        <p class="eyebrow">CATÁLOGO DE OBRA · SIETE CONJUNTOS ESCULTÓRICOS</p>
        <h1>Escultura de Enric Segarra i Garibo (Segarra y Garibo)</h1>
        <p class="lead">55 obras escultóricas organizadas en siete conjuntos: Planos curvos y volúmenes abiertos, Formas orgánicas, Relieves y figuras recortadas, Relieves de textura y materia, Ensamblajes y relieves murales, Estructuras y objetos ensamblados e Intervenciones y figuras exteriores.</p>
      </section>
      ${renderStaticWorkList(esculturaWorks, 55)}`,
  },
  {
    filename: "jardin-de-las-lagartijas.html",
    defaultRoute: "/jardin",
    title: "El Jardín de las Lagartijas (Jardí de les Sargantanes) · Náquera · ENRIC SEGARRA I GARIBO",
    description:
      "El Jardín de las Lagartijas (Jardí de les Sargantanes) en Partida Collado dels Llops, Náquera (Valencia): espacio escultórico al aire libre, reflexión sobre la naturaleza y recreación 3D interactiva de la parcela de Enric Segarra i Garibo.",
    keywords:
      "Jardín de las Lagartijas, Jardí de les Sargantanes, Enric Segarra Náquera, Partida Collado dels Llops, escultura y naturaleza Valencia, móviles en árboles, Enric Segarra i Garibo",
    ogImage: "assets/arc-014916.webp",
    schemaGraph: [
      {
        "@type": ["Place", "TouristAttraction"],
        "@id": `${DOMAIN}/jardin-de-las-lagartijas.html#place`,
        name: "El Jardín de las Lagartijas (Jardí de les Sargantanes)",
        description:
          "Espacio escultórico y natural de Enric Segarra i Garibo en Partida Collado dels Llops, Náquera (Valencia), donde móviles suspendidos, algarrobos, almendros, olivos y piedra seca dialogan con el paisaje mediterráneo.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Náquera",
          addressRegion: "Valencia",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 39.65486,
          longitude: -0.44318,
        },
      },
    ],
    bodyHtml: `
      <section class="page-head">
        <p class="eyebrow">ESPACIO ESCULTÓRICO EN LA NATURALEZA · NÁQUERA (VALENCIA)</p>
        <h1>Jardín de las Lagartijas (Jardí de les Sargantanes) — Enric Segarra i Garibo</h1>
        <p class="lead">Un proyecto artístico en un terreno rústico de Náquera (Partida Collado dels Llops) donde esculturas, algarrobos, almendros, olivos y móviles dialogan con el viento y el paisaje mediterráneo.</p>
      </section>
      <blockquote class="artist-statement">
        <div class="statement-header">
          <p class="statement-eyebrow">Reflexión sobre la naturaleza</p>
          <footer class="statement-author">— Enric Segarra</footer>
        </div>
        <div class="statement-body">
          <div class="statement-col">
            <p>En el silencio y el recogimiento, hablar a la naturaleza con gratitud, respeto y amor es volver a tender un puente hacia ella. Escucharla, reconocer su presencia y dejarnos tocar por su misterio quizá sea la forma más íntima de recuperar el vínculo que nos une.</p>
            <p>Mi obra escultórica transita por diversos lenguajes y materiales. En estos espacios de móviles, sin embargo, es la propia naturaleza quien ofrece la materia: ramas, formas y elementos nacidos del lugar, cargados de su tiempo y de su memoria.</p>
          </div>
          <div class="statement-col">
            <p>La obra se despliega en diálogo con el entorno. Se mueve con el aire, respira con el paisaje y parece surgir de la tierra que la sostiene. No llega para imponerse, sino para pertenecer: una presencia viva en la que arte y naturaleza encuentran su armonía.</p>
            <p>Cada móvil recoge el impulso invisible del viento y lo convierte en movimiento. Así, la naturaleza se expresa, y la escultura se vuelve cauce, escucha y celebración de su energía.</p>
          </div>
        </div>
      </blockquote>`,
  },
  {
    filename: "pintura.html",
    defaultRoute: "/pintura",
    title: "Pintura: Gatos, Tauromaquia, Arcas de Noé y Rostros · ENRIC SEGARRA I GARIBO",
    description:
      "Catálogo de 76 pinturas de Enric Segarra i Garibo (Segarra y Garibo) organizadas en ocho series y conjuntos: Gatos, Tauromaquia, Arcas de Noé, Rostros y personajes, Figuras y símbolos, Relatos e iconografía, Letras y signos y Abstracciones, con Sala de Pintura 3D.",
    keywords:
      "pintura Enric Segarra, serie Gatos Enric Segarra, Tauromaquia pintura, Arcas de Noé pintura, pintor Valencia, Segarra y Garibo, Enric Segarra i Garibo",
    ogImage: `assets/${pinturaWorks[0]?.image || "gatos"}.webp`,
    schemaGraph: [
      buildArtworkSchemaList(
        pinturaWorks,
        `${DOMAIN}/pintura.html`,
        "Pintura de Enric Segarra i Garibo: Gatos, Tauromaquia, Arcas de Noé y Rostros",
      ),
    ],
    bodyHtml: `
      <section class="page-head">
        <p class="eyebrow">CATÁLOGO DE OBRA · OCHO SERIES Y CONJUNTOS PICTÓRICOS</p>
        <h1>Pintura de Enric Segarra i Garibo (Segarra y Garibo)</h1>
        <p class="lead">76 obras pictóricas reunidas por sus imaginarios y motivos visuales: Gatos, Tauromaquia, Arcas de Noé, Rostros y personajes, Figuras y símbolos, Relatos e iconografía, Letras y signos y Abstracciones, acompañadas de la Sala de Pintura 3D.</p>
      </section>
      ${renderStaticWorkList(pinturaWorks, 76)}`,
  },
  {
    filename: "dibujo.html",
    defaultRoute: "/dibujo",
    title: "Dibujo y Obra sobre Papel · ENRIC SEGARRA I GARIBO (Segarra y Garibo)",
    description:
      "Catálogo de 53 dibujos y obras sobre papel en ceras, carbón y pastel de Enric Segarra i Garibo (Segarra y Garibo): series Dibujo y espacio y Figuras y símbolos, con pabellón virtual 3D.",
    keywords:
      "dibujo Enric Segarra, obra sobre papel, Dibujo y espacio, ceras carbón pastel, dibujante Valencia, Enric Segarra i Garibo, Segarra y Garibo",
    ogImage: `assets/${dibujoWorks[0]?.image || "arc-013422"}.webp`,
    schemaGraph: [
      buildArtworkSchemaList(
        dibujoWorks,
        `${DOMAIN}/dibujo.html`,
        "Dibujo y obra sobre papel de Enric Segarra i Garibo",
      ),
    ],
    bodyHtml: `
      <section class="page-head">
        <p class="eyebrow">CATÁLOGO DE OBRA · TRAZO Y VOLUMEN EN EL PAPEL</p>
        <h1>Dibujo de Enric Segarra i Garibo (Segarra y Garibo)</h1>
        <p class="lead">53 dibujos y obras sobre papel en ceras, carbón y pastel organizados en los conjuntos «Dibujo y espacio» y «Figuras y símbolos», acompañados de una gran Sala de Dibujo 3D.</p>
      </section>
      ${renderStaticWorkList(dibujoWorks, 53)}`,
  },
  {
    filename: "arte-infantil.html",
    defaultRoute: "/arte-infantil",
    title: "Arte Infantil, Talleres y Educación Artística · ENRIC SEGARRA I GARIBO",
    description:
      "Proyecto educativo, talleres de arte infantil, formación de profesorado, exposiciones escolares y textos sobre creatividad infantil impulsados por Enric Segarra i Garibo en Valencia.",
    keywords:
      "arte infantil Enric Segarra, educación artística Valencia, talleres creatividad infantil, Sala Bellas Artes exposición infantil, Enric Segarra i Garibo",
    ogImage: "assets/bellas-arc-012548.webp",
    schemaGraph: [],
    bodyHtml: `
      <section class="page-head">
        <p class="eyebrow">EDUCACIÓN ARTÍSTICA · PROYECTO PEDAGÓGICO Y TALLERES</p>
        <h1>Arte infantil y educación artística — Enric Segarra i Garibo</h1>
        <p class="lead">${esc(educationIntro[0])}</p>
      </section>
      <section class="prose">
        ${educationIntro.slice(1).map((p) => `<p>${esc(p)}</p>`).join("\n")}
        <h2>Principios educativos</h2>
        <ul>
          ${educationPrinciples.map((p) => `<li><strong>${esc(p.title)}</strong>: ${esc(p.text)}</li>`).join("\n")}
        </ul>
        <h2>Apartados de educación artística</h2>
        <ul>
          ${educationSections.map((s) => `<li><strong>${esc(s.label)}</strong></li>`).join("\n")}
        </ul>
        <h2>Lecturas y documentos sobre arte infantil</h2>
        <ul>
          ${readings.map((r) => `<li><strong>${esc(r.title)}</strong> (${esc(r.authors)} · ${esc(r.reference)})</li>`).join("\n")}
        </ul>
      </section>`,
  },
  {
    filename: "exposiciones.html",
    defaultRoute: "/exposiciones",
    title: "Exposiciones y Sala de Bellas Artes (Valencia) · ENRIC SEGARRA I GARIBO",
    description:
      "Archivo de exposiciones individuales, muestras colectivas y proyectos en salas de Enric Segarra i Garibo (Segarra y Garibo), incluyendo «Evolución 1984–2004» en la Sala d’Exposicions de les Belles Arts de Valencia.",
    keywords:
      "exposiciones Enric Segarra, Evolución 1984-2004, Sala d'Exposicions de les Belles Arts Valencia, exposiciones escultura pintura Valencia, Enric Segarra i Garibo, Segarra y Garibo",
    ogImage: "assets/evolucion-013392-restored.webp",
    schemaGraph: [],
    bodyHtml: `
      <section class="page-head">
        <p class="eyebrow">MEMORIA DOCUMENTAL · SALAS, MUESTRAS E INTERVENCIONES</p>
        <h1>Exposiciones de Enric Segarra i Garibo (Segarra y Garibo)</h1>
        <p class="lead">Archivo visual de exposiciones de obra propia, muestras colectivas y documentación de sala en Valencia y otros espacios culturales.</p>
      </section>
      <section class="prose">
        <ul>
          ${albums
            .filter((a) => a.section === "exposiciones")
            .map(
              (a) =>
                `<li><strong>${esc(a.title)}</strong> (${esc(a.type)}${a.place ? ` · ${esc(a.place)}` : ""}): ${esc(a.text)}</li>`,
            )
            .join("\n")}
        </ul>
      </section>`,
  },
  {
    filename: "biografia-enric-segarra.html",
    defaultRoute: "/trayectoria-contacto",
    title: "Biografía, Trayectoria y Contacto · ENRIC SEGARRA I GARIBO (Segarra y Garibo)",
    description:
      "Biografía, trayectoria artística en seis capítulos y datos de contacto directo de Enric Segarra i Garibo (Segarra y Garibo), escultor, pintor y educador artístico nacido en Barcelona (1959) y afincado en Valencia.",
    keywords:
      "biografía Enric Segarra i Garibo, quién es Enric Segarra, Segarra y Garibo contacto, escultor Barcelona 1959 Valencia, teléfono correo Enric Segarra",
    ogImage: "assets/retrato.webp",
    schemaGraph: [
      {
        "@type": "ProfilePage",
        "@id": `${DOMAIN}/biografia-enric-segarra.html#profile`,
        url: `${DOMAIN}/biografia-enric-segarra.html`,
        name: "Biografía y trayectoria de Enric Segarra i Garibo (Segarra y Garibo)",
        mainEntity: { "@id": `${DOMAIN}/#artist` },
      },
    ],
    bodyHtml: `
      <section class="page-head">
        <p class="eyebrow">BIOGRAFÍA, MEMORIA ARTÍSTICA Y CONTACTO DIRECTO</p>
        <h1>Trayectoria y contacto — Enric Segarra i Garibo (Segarra y Garibo)</h1>
        <p class="lead">${esc(site.intro)}</p>
      </section>
      <section class="prose">
        ${chapters
          .map(
            (c) =>
              `<article><h2>${esc(c.title)}</h2><p><em>${esc(c.short)}</em></p>${c.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</article>`,
          )
          .join("\n")}
        <section id="contacto-estatico">
          <h2>Contacto directo con Enric Segarra i Garibo</h2>
          <p>${esc(site.contactText)}</p>
          <p>Correo electrónico: <a href="mailto:${esc(site.contactEmail)}">${esc(site.contactEmail)}</a></p>
          <p>Teléfono: <a href="tel:${esc(site.contactPhone)}">615 224 258</a></p>
        </section>
      </section>`,
  },
];

for (const page of pages) {
  const html = buildPageHtml(page);
  await writeFile(new URL(`../dist/${page.filename}`, import.meta.url), html, "utf8");
}

// Generate comprehensive sitemap.xml with Google Image Sitemap extension
const sitemapEntries = [
  {
    loc: `${DOMAIN}/`,
    priority: "1.0",
    changefreq: "weekly",
    images: [
      { loc: `${DOMAIN}/assets/retrato.webp`, title: "Enric Segarra i Garibo (Segarra y Garibo)", caption: "Retrato del escultor y pintor Enric Segarra i Garibo con su obra" },
      ...movilesWorks.slice(0, 8).map((w) => ({
        loc: `${DOMAIN}/assets/${w.image}.webp`,
        title: `${w.label} (${w.reference}) — Móvil de Enric Segarra i Garibo`,
        caption: `${w.text} (${w.alt})`,
      })),
      ...esculturaWorks.slice(0, 8).map((w) => ({
        loc: `${DOMAIN}/assets/${w.image}.webp`,
        title: `${w.label} (${w.reference}) — Escultura de Enric Segarra i Garibo`,
        caption: `${w.text} (${w.alt})`,
      })),
    ],
  },
  {
    loc: `${DOMAIN}/moviles.html`,
    priority: "0.9",
    changefreq: "weekly",
    images: movilesWorks.map((w) => ({
      loc: `${DOMAIN}/assets/${w.image}.webp`,
      title: `${w.label} (${w.reference}) — Móvil suspendido de Enric Segarra i Garibo`,
      caption: w.text,
    })),
  },
  {
    loc: `${DOMAIN}/escultura.html`,
    priority: "0.9",
    changefreq: "weekly",
    images: esculturaWorks.map((w) => ({
      loc: `${DOMAIN}/assets/${w.image}.webp`,
      title: `${w.label} (${w.reference}) — Escultura de Enric Segarra i Garibo`,
      caption: `${w.series}: ${w.text}`,
    })),
  },
  {
    loc: `${DOMAIN}/jardin-de-las-lagartijas.html`,
    priority: "0.9",
    changefreq: "weekly",
    images: [
      { loc: `${DOMAIN}/assets/arc-014916.webp`, title: "El Jardín de las Lagartijas (Jardí de les Sargantanes) · Náquera", caption: "Espacio escultórico y natural de Enric Segarra i Garibo en Náquera, Valencia" },
      { loc: `${DOMAIN}/assets/arc-014923.webp`, title: "Árboles y móviles en el Jardín de las Lagartijas", caption: "Intervención escultórica en la naturaleza por Enric Segarra i Garibo" },
    ],
  },
  {
    loc: `${DOMAIN}/pintura.html`,
    priority: "0.9",
    changefreq: "weekly",
    images: pinturaWorks.map((w) => ({
      loc: `${DOMAIN}/assets/${w.image}.webp`,
      title: `${w.label} (${w.reference}) — Pintura serie ${w.series} de Enric Segarra i Garibo`,
      caption: w.text,
    })),
  },
  {
    loc: `${DOMAIN}/dibujo.html`,
    priority: "0.85",
    changefreq: "weekly",
    images: dibujoWorks.map((w) => ({
      loc: `${DOMAIN}/assets/${w.image}.webp`,
      title: `${w.label} (${w.reference}) — Dibujo serie ${w.series} de Enric Segarra i Garibo`,
      caption: w.text,
    })),
  },
  {
    loc: `${DOMAIN}/arte-infantil.html`,
    priority: "0.85",
    changefreq: "monthly",
    images: [
      { loc: `${DOMAIN}/assets/bellas-arc-012548.webp`, title: "Exposición de Arte Infantil · Sala de Bellas Artes", caption: "Proyecto de educación artística coordinado por Enric Segarra i Garibo" },
    ],
  },
  {
    loc: `${DOMAIN}/exposiciones.html`,
    priority: "0.85",
    changefreq: "monthly",
    images: [
      { loc: `${DOMAIN}/assets/evolucion-013392-restored.webp`, title: "Exposición Evolución 1984–2004 · Sala d’Exposicions de les Belles Arts (Valencia)", caption: "Archivo de exposiciones de Enric Segarra i Garibo en Valencia" },
    ],
  },
  {
    loc: `${DOMAIN}/biografia-enric-segarra.html`,
    priority: "0.9",
    changefreq: "monthly",
    images: [
      { loc: `${DOMAIN}/assets/retrato.webp`, title: "Enric Segarra i Garibo (Segarra y Garibo)", caption: "Retrato de Enric Segarra i Garibo con una escultura" },
    ],
  },
  {
    loc: `${DOMAIN}/galeria-3d/`,
    priority: "0.9",
    changefreq: "weekly",
    images: [],
  },
  {
    loc: `${DOMAIN}/galeria-3d/personajes.html`,
    priority: "0.75",
    changefreq: "monthly",
    images: [],
  },
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${esc(entry.loc)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${
      entry.images.length
        ? "\n" +
          entry.images
            .map(
              (img) => `    <image:image>
      <image:loc>${esc(img.loc)}</image:loc>
      <image:title>${esc(img.title)}</image:title>
      <image:caption>${esc(img.caption)}</image:caption>
    </image:image>`,
            )
            .join("\n")
        : ""
    }
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await writeFile(new URL("../dist/sitemap.xml", import.meta.url), sitemapXml, "utf8");

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;
await writeFile(new URL("../dist/robots.txt", import.meta.url), robotsTxt, "utf8");

const llmsTxt = `# ENRIC SEGARRA I GARIBO (Segarra y Garibo) — Web Oficial y Catálogo de Obra

> Portfolio oficial, archivo documental de 217 obras y museo virtual 3D del escultor, pintor, dibujante y educador artístico Enric Segarra i Garibo (nacido en Barcelona en 1959 y formado en la Facultad de Bellas Artes de Valencia).

## Identidad del artista
- **Nombre completo**: Enric Segarra i Garibo
- **Nombre artístico**: Segarra y Garibo / Enric Segarra
- **Nacimiento y formación**: Barcelona (1959); licenciado en Bellas Artes en Valencia.
- **Ámbitos de creación**: Escultura (hierro, madera, piedra y ensamblaje), Móviles cinéticos suspendidos, Pintura, Dibujo, Intervención en la naturaleza (El Jardín de las Lagartijas, Náquera, Valencia) y Educación artística / Arte infantil.
- **Contacto directo**: ${site.contactEmail} · Teléfono: +34 615 224 258
- **Web oficial**: ${DOMAIN}/

## Secciones principales e índice de URLs
- [Inicio y Portada](${DOMAIN}/): Presentación general, siete salas virtuales 3D y catálogo completo.
- [Móviles y Esculturas Suspendidas](${DOMAIN}/moviles.html): 33 móviles cinéticos (MOV-001 a MOV-033) y Sala de Móviles 3D interactiva.
- [Escultura](${DOMAIN}/escultura.html): 55 esculturas en 7 conjuntos (Planos curvos y volúmenes abiertos, Formas orgánicas, Relieves, Ensamblajes e Intervenciones) con salas 3D.
- [El Jardín de las Lagartijas / Jardí de les Sargantanes](${DOMAIN}/jardin-de-las-lagartijas.html): Espacio escultórico al aire libre en Partida Collado dels Llops, Náquera (Valencia) y recreación topográfica 3D.
- [Pintura](${DOMAIN}/pintura.html): 76 pinturas organizadas en 8 series (Gatos, Tauromaquia, Arcas de Noé, Rostros y personajes, Figuras y símbolos, Relatos e iconografía, Letras y signos y Abstracciones) y Sala de Pintura 3D.
- [Dibujo](${DOMAIN}/dibujo.html): 53 dibujos en ceras, carbón y pastel (Dibujo y espacio, Figuras y símbolos) y Sala de Dibujo 3D.
- [Arte Infantil y Educación Artística](${DOMAIN}/arte-infantil.html): Proyecto pedagógico, talleres, formación docente y lecturas documentadas.
- [Exposiciones](${DOMAIN}/exposiciones.html): Exposiciones individuales, muestras colectivas, salas virtuales 3D vinculadas y archivo de la Sala d’Exposicions de les Belles Arts de Valencia («Evolución 1984–2004»).
- [Biografía, Trayectoria y Contacto](${DOMAIN}/biografia-enric-segarra.html): Recorrido biográfico en 6 etapas y contacto directo.
- [Museo y Espacios en Movimiento 3D](${DOMAIN}/galeria-3d/): Siete espacios virtuales 3D navegables en WebGL.
`;
await writeFile(new URL("../dist/llms.txt", import.meta.url), llmsTxt, "utf8");

console.log(`SEO generado: ${pages.length} páginas HTML estáticas, sitemap.xml con ${sitemapEntries.length} URLs e imágenes, robots.txt y llms.txt.`);
