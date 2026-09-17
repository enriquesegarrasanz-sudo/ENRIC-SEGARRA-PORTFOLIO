import { site, categories, works, chapters, documents } from "./content.js";
const main = document.querySelector("main");
const headerNav = document.querySelector("#nav");
const menu = document.querySelector("#menu-toggle");
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  headerNav.classList.toggle("open", open);
});
function home() {
  return `<div class="wrap"><section class="hero"><div class="hero-copy"><span class="eyebrow">Escultura · materia · movimiento</span><h1>La forma<br>sigue <em>viva.</em></h1><p>Encontrar, transformar, volver a mirar. La obra de Enric Segarra y una vida dedicada a explorar las posibilidades de la materia.</p><div class="hero-links"><a class="text-link" href="#/obra">Explorar la obra <span aria-hidden="true">↗</span></a><a class="text-link secondary" href="#/memoria">Recorrer su historia <span aria-hidden="true">↗</span></a></div></div><figure class="hero-image"><img src="assets/movil-naturaleza.webp" alt="Escultura suspendida de formas curvas y colores vivos entre las ramas de un árbol" fetchpriority="high" width="1600" height="1067"><figcaption><span>El presente, en movimiento</span><span>En el entorno del artista</span></figcaption></figure></section><section class="intro-line"><span class="eyebrow">Una búsqueda que continúa</span><p>Del trazo al volumen. De la pintura al objeto encontrado. Del taller a las ramas de un árbol.</p></section><section class="section"><div class="section-head"><h2>Obra en el presente</h2><a class="text-link" href="#/obra">Ver la selección <span aria-hidden="true">↗</span></a></div><div class="art-grid"><a class="art-card" href="#/obra"><div class="art-image"><img src="assets/movil-rosa.webp" alt="Escultura suspendida de elementos rosas" loading="lazy"></div><div class="card-meta"><h3>Formas suspendidas</h3><span>↗</span></div><p>Móviles y esculturas suspendidas</p></a><a class="art-card" href="#/obra"><div class="art-image"><img src="assets/movil-aros.webp" alt="Escultura suspendida compuesta por aros" loading="lazy"></div><div class="card-meta"><h3>Materia y equilibrio</h3><span>↗</span></div><p>Móviles y esculturas suspendidas</p></a><a class="art-card" href="#/proceso"><div class="art-image"><img src="assets/artista-entorno.webp" alt="El artista junto a una pieza suspendida en un árbol" loading="lazy"></div><div class="card-meta"><h3>Entre los árboles</h3><span>↗</span></div><p>Proceso y entorno</p></a></div></section><section class="section memory-feature"><img src="assets/retrato.webp" alt="Retrato del artista junto a una de sus esculturas" loading="lazy"><div><span class="eyebrow">Trayectoria y memoria</span><h2>Una vida.<br>Muchos caminos.</h2><p>El oficio de escultor, los mundos de la pintura, la libertad de crear con otros. Una historia hecha de obras, encuentros, aprendizajes y nuevos comienzos.</p><a class="text-link" href="#/memoria">Entrar en la memoria <span aria-hidden="true">↗</span></a></div></section></div>`;
}
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const photo = (name, alt, classes = "", eager = false) =>
  `<img src="assets/${esc(name)}.webp" alt="${esc(alt)}" class="${esc(classes)}" loading="${eager ? "eager" : "lazy"}">`;
const link = (href, label) =>
  `<a class="text-link" href="${esc(href)}">${esc(label)} <span aria-hidden="true">↗</span></a>`;
const heading = (label, title, desc = "") =>
  `<div class="page-head"><span class="eyebrow">${esc(label)}</span><h1>${esc(title)}</h1>${desc ? `<p>${esc(desc)}</p>` : ""}</div>`;
const card = (w) =>
  `<a class="art-card" href="#/obra/${w.id}"><div class="art-image">${photo(w.image, w.alt)}</div><div class="card-meta"><h3>${esc(w.label)}</h3><span aria-hidden="true">↗</span></div><p>${esc(w.series)}</p></a>`;
const quote = (q) =>
  q
    ? `<blockquote class="quote">«${esc(q.text)}»<cite>${esc(q.source)}</cite></blockquote>`
    : "";
const notFound = () =>
  `<div class="wrap empty"><span class="eyebrow">Obra y memoria</span><h1>Este camino no existe.</h1><p>Puedes volver a la selección de obra o recorrer la memoria del artista.</p>${link("#/", "Volver al inicio")}</div>`;

function fullHome() {
  let html = home();
  html = html.replace(
    'href="#/obra"><div class="art-image"><img src="assets/movil-rosa.webp"',
    'href="#/obra/suspension-rosa"><div class="art-image"><img src="assets/movil-rosa.webp"',
  );
  html = html.replace(
    'href="#/obra"><div class="art-image"><img src="assets/movil-aros.webp"',
    'href="#/obra/aros"><div class="art-image"><img src="assets/movil-aros.webp"',
  );
  return (
    html.slice(0, -6) +
    `<section class="section"><div class="section-head"><div><span class="eyebrow">Otros caminos</span><h2>Un universo de formas</h2></div><p>La obra se extiende entre disciplinas. Cada una conserva su manera de mirar.</p></div><div class="category-row">${[
      {
        type: "escultura",
        name: "Escultura",
        image: "escultura-clara",
        alt: "Volumen claro con aberturas",
      },
      {
        type: "pintura",
        name: "Pintura",
        image: "gatos",
        alt: "Pintura con figura de gato",
      },
      {
        type: "dibujo",
        name: "Dibujo",
        image: "dibujo",
        alt: "Dibujo de formas rojas sobre papel",
      },
    ]
      .map(
        (c) =>
          `<a class="category-card" href="#/obra?tipo=${c.type}">${photo(c.image, c.alt)}<h3>${c.name} <span aria-hidden="true">↗</span></h3></a>`,
      )
      .join(
        "",
      )}</div></section><section class="section process-strip">${photo("naturaleza-conjunto", "Piezas de colores suspendidas de un árbol en el entorno del artista")}<div><span class="eyebrow">Proceso y entorno</span><h2>El taller se abre<br>al paisaje.</h2><p>Encontrar materiales, construir una forma y observarla en el lugar. La naturaleza acompaña la creación.</p>${link("#/proceso", "Acercarse al proceso")}</div></section></div>`
  );
}

function workIndex(params) {
  const type = categories.some((c) => c.id === params.get("tipo"))
    ? params.get("tipo")
    : "todas";
  const list = works.filter((w) => type === "todas" || w.category === type);
  return `<div class="wrap">${heading("Una selección de obra", "La materia, en sus formas.", "Móviles, escultura, pintura y dibujo. Distintos caminos de una misma búsqueda, reunidos en una selección abierta.")}<div class="tabs" role="group" aria-label="Filtrar por disciplina">${categories.map((c) => `<button data-category="${c.id}" aria-pressed="${c.id === type}">${c.label}</button>`).join("")}</div><p class="count" aria-live="polite">${list.length} piezas en esta selección · Las denominaciones son descriptivas</p><div class="art-grid">${list.map(card).join("")}</div></div>`;
}
function workDetail(id) {
  const w = works.find((w) => w.id === id);
  if (!w) return notFound();
  const related = works
    .filter((x) => x.category === w.category && x.id !== id)
    .slice(0, 3);
  return `<div class="wrap"><div class="breadcrumbs"><a href="#/obra">Obra</a> / <a href="#/obra?tipo=${w.category}">${categories.find((c) => c.id === w.category).label}</a></div><article class="detail"><div><button class="primary-image" data-enlarge="${w.image}" data-alt="${esc(w.alt)}" data-caption="${esc(w.label)}" aria-label="Ampliar imagen: ${esc(w.label)}">${photo(w.image, w.alt, "", true)}<span class="zoom-label">Ver imagen completa +</span></button></div><div class="detail-copy"><span class="eyebrow">${esc(w.series)}</span><h1>${esc(w.label)}</h1><p>${esc(w.text)}</p><dl><div><dt>Título original</dt><dd>Por documentar</dd></div><div><dt>Fecha</dt><dd>Por documentar</dd></div><div><dt>Imagen</dt><dd>Archivo familiar</dd></div></dl><p class="caption-note">La denominación de esta ficha describe la imagen. El título, los materiales y las dimensiones se incorporarán cuando estén identificados.</p>${link("#/memoria/" + w.chapter, "Su lugar en la trayectoria")}</div></article>${related.length ? `<section class="section"><div class="section-head"><h2>Continuar mirando</h2></div><div class="art-grid">${related.map(card).join("")}</div></section>` : ""}</div>`;
}
function memory(params) {
  const view = ["capitulos", "cronologia", "archivo"].includes(
    params.get("vista"),
  )
    ? params.get("vista")
    : "capitulos";
  let inner = "";
  if (view === "capitulos")
    inner = `<div class="chapter-list">${chapters.map((c, i) => `<a class="chapter-row" href="#/memoria/${c.id}"><span class="number">${String(i + 1).padStart(2, "0")}</span><h3>${esc(c.title)}</h3><p>${esc(c.short)}</p><span class="arrow" aria-hidden="true">↗</span></a>`).join("")}</div><p class="notice">Estos capítulos reúnen líneas de trabajo que pueden convivir en el tiempo. La memoria crecerá con las obras, los documentos y los recuerdos del artista.</p>`;
  if (view === "cronologia")
    inner = `<p class="notice">Una cronología en construcción a partir de su testimonio y del archivo familiar. Las fechas se incorporan cuando tienen una fuente identificada.</p><div class="timeline-row"><strong>1959</strong><div><h3>Nacer en Barcelona</h3><p>Enrique sitúa su nacimiento en Barcelona en 1959, según la entrevista familiar.</p></div></div><div class="timeline-row"><strong>Formación</strong><div><h3>Estudiar en Valencia</h3><p>Realizó sus estudios, incluida la formación en Bellas Artes, en Valencia. El periodo concreto está por documentar.</p></div></div><div class="timeline-row"><strong>Recorrido</strong><div><h3>Crear, enseñar, compartir</h3><p>Escultura, pintura, dibujo, educación y gestión cultural atraviesan su trayectoria. Los capítulos conservan estos recorridos mientras se reconstruyen sus fechas.</p>${link("#/memoria", "Leer los capítulos")}</div></div><div class="timeline-row"><strong>Presente</strong><div><h3>Los móviles y el entorno</h3><p>El trabajo actual se centra en móviles y esculturas suspendidas, junto con la creación al aire libre.</p>${link("#/memoria/seguir-creando", "Seguir creando")}</div></div>`;
  if (view === "archivo")
    inner = `<p class="count">Documentos visuales · Primera selección del fondo familiar</p><div class="document-grid">${documents.map((d) => `<article><button class="primary-image" data-enlarge="${d.image}" data-alt="${esc(d.alt)}" data-caption="${esc(d.title)}" aria-label="Ampliar documento: ${esc(d.title)}">${photo(d.image, d.alt)}</button><span class="eyebrow">${d.type}</span><h3>${d.title}</h3><p>${d.text}</p>${link("#/memoria/crear-con-otros", "Leer el capítulo relacionado")}</article>`).join("")}</div><p class="notice">El archivo seguirá incorporando fotografías, catálogos, carteles y escritos con su contexto. Las obras de los participantes en talleres conservan una autoría distinta de la del artista.</p>`;
  return `<div class="wrap">${heading("Trayectoria y memoria", "Una vida dedicada a crear.", "Las obras y lo que sucede alrededor de ellas: el oficio, los encuentros, los talleres y los lugares. Una memoria que conserva el pasado y permanece abierta.")}<div class="tabs" role="group" aria-label="Recorridos de la memoria">${[
    { id: "capitulos", label: "Leer su historia" },
    { id: "cronologia", label: "Recorrer los años" },
    { id: "archivo", label: "Explorar el archivo" },
  ]
    .map(
      (v) =>
        `<button data-memory="${v.id}" aria-pressed="${view === v.id}">${v.label}</button>`,
    )
    .join("")}</div>${inner}</div>`;
}
function chapter(id) {
  const index = chapters.findIndex((c) => c.id === id);
  if (index < 0) return notFound();
  const c = chapters[index];
  const related = works.filter((w) => w.chapter === id).slice(0, 3);
  const body = `<div class="chapter-text">${c.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`;
  return `<div class="wrap"><div class="breadcrumbs"><a href="#/memoria">Trayectoria y memoria</a> / Capítulo ${String(index + 1).padStart(2, "0")}</div>${heading("Capítulo " + String(index + 1).padStart(2, "0"), c.title, c.short)}<article>${c.image ? `<div class="chapter-layout"><figure>${photo(c.image, c.imageAlt, "", true)}<figcaption class="image-note">${esc(c.caption)}</figcaption></figure>${body}</div>` : `<div class="chapter-layout">${body}<aside class="notice">Este capítulo se ampliará con documentos identificados del archivo familiar. El relato actual procede de la entrevista con el artista.</aside></div>`}${quote(c.quote)}<p class="small-label">Relato editado a partir de la entrevista familiar. Identificaciones y cronología en desarrollo.</p></article>${related.length ? `<section class="section"><div class="section-head"><h2>Obras para seguir el relato</h2></div><div class="art-grid">${related.map(card).join("")}</div></section>` : ""}<div class="chapter-nav">${link(index > 0 ? "#/memoria/" + chapters[index - 1].id : "#/memoria", index > 0 ? "Capítulo anterior" : "Todos los capítulos")}${link(index < chapters.length - 1 ? "#/memoria/" + chapters[index + 1].id : "#/obra", index < chapters.length - 1 ? "Siguiente capítulo" : "Volver a la obra")}</div></div>`;
}
function processPage() {
  return `<div class="wrap">${heading("Proceso y entorno", "Encontrar. Transformar. Observar.", "La creación comienza en la atención a lo que nos rodea. Una forma, un material o un objeto pueden abrir un nuevo camino.")}<div class="process-pair"><article>${photo("movil-verde", "Vista de una escultura suspendida en interior")}<h3>La posibilidad de un material</h3><p>Enrique describe el ensamblaje y la reutilización como procedimientos recurrentes. Combinar elementos, probar una unión y observar el resultado forman parte de esa exploración.</p></article><article>${photo("movil-naturaleza", "Pieza suspendida entre ramas")}<h3>La obra encuentra un lugar</h3><p>Las piezas suspendidas se relacionan con los árboles, los espacios y la luz. En su casa, colgar y mirar las obras es también una manera de seguir experimentando.</p></article></div><section class="section process-strip">${photo("naturaleza-conjunto", "Conjunto de piezas suspendidas de un árbol")}<div><span class="eyebrow">Creación al aire libre</span><h2>Un paisaje<br>en proceso.</h2><p>El artista cuenta que está desarrollando poco a poco un parque escultórico en un terreno rural. Las imágenes y los relatos permitirán documentar este proyecto y distinguirlo del jardín de su casa.</p>${link("#/memoria/seguir-creando", "Leer el capítulo del presente")}</div></section>${quote({ text: "Es una forma de ir experimentando y ver el efecto que puede causar.", source: "Enrique · entrevista familiar, apartado Móviles" })}</div>`;
}
function artist() {
  return `<div class="wrap">${heading("El artista", site.name, site.intro)}<div class="chapter-layout"><figure>${photo("retrato", "Retrato de Enric Segarra junto a una escultura", "", true)}<figcaption class="image-note">Retrato del archivo familiar.</figcaption></figure><div class="chapter-text"><p>Enrique nació en Barcelona en 1959 y realizó su formación en Valencia, incluida la carrera de Bellas Artes, según relata en la entrevista familiar.</p><p>La escultura es un punto de referencia en su trayectoria. A ella se suman el dibujo, la pintura, la educación artística y una dedicación prolongada a la exposición y promoción de la obra de otros artistas.</p><p>La naturaleza, los materiales encontrados y la construcción de formas reaparecen en distintas etapas. Hoy, los móviles y las esculturas suspendidas abren nuevas posibilidades de experimentación.</p><p>Esta web reúne una selección de su obra y una memoria de su recorrido, para conservar lo vivido y acompañar lo que continúa creando.</p>${link("#/memoria", "Conocer su recorrido completo")}</div></div>${quote({ text: "Era pues la sensación esa de ir buscando nuevas formas.", source: "Enrique · entrevista familiar, apartado Arte infantil" })}</div>`;
}
function contact() {
  return `<div class="wrap">${heading("Contacto", "Una conversación<br>sobre la obra.".replace("<br>", " "))}<div class="contact-block"><p>Para conversaciones sobre la obra, proyectos expositivos y colaboraciones.</p>${site.contactEmail ? `<p>${link("mailto:" + site.contactEmail, site.contactEmail)}</p>` : `<p class="notice">${esc(site.contactText)}</p>`}${link("#/obra", "Seguir explorando la obra")}</div></div>`;
}

let previousRoute = "";
function render() {
  if (location.hash === "#contenido") return;
  const [path, query = ""] = (location.hash.slice(1) || "/").split("?");
  const parts = path.split("/").filter(Boolean),
    section = parts[0] || "inicio",
    id = parts[1];
  const params = new URLSearchParams(query);
  const base = parts.join("/");
  const builders = {
    inicio: () => fullHome(),
    obra: () => (id ? workDetail(id) : workIndex(params)),
    memoria: () => (id ? chapter(id) : memory(params)),
    proceso: processPage,
    artista: artist,
    contacto: contact,
  };
  main.innerHTML = (builders[section] || notFound)();
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.dataset.nav === section) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  const titles = {
    inicio: "Obra y memoria",
    obra: id ? works.find((w) => w.id === id)?.label || "Obra" : "Obra",
    memoria: id
      ? chapters.find((c) => c.id === id)?.title || "Memoria"
      : "Trayectoria y memoria",
    proceso: "Proceso y entorno",
    artista: "El artista",
    contacto: "Contacto",
  };
  document.title = `${titles[section] || "Página no encontrada"} — ${site.name}`;
  headerNav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  if (previousRoute !== base) {
    window.scrollTo({ top: 0, behavior: "instant" });
    main.focus({ preventScroll: true });
  }
  previousRoute = base;
}
window.addEventListener("hashchange", render);
const dialog = document.querySelector("#image-dialog");
document.addEventListener("click", (event) => {
  const category = event.target.closest("[data-category]");
  if (category) {
    location.hash = "/obra?tipo=" + category.dataset.category;
    return;
  }
  const memoryButton = event.target.closest("[data-memory]");
  if (memoryButton) {
    location.hash = "/memoria?vista=" + memoryButton.dataset.memory;
    return;
  }
  const button = event.target.closest("[data-enlarge]");
  if (button) {
    const img = document.querySelector("#large-image");
    img.src = "assets/" + button.dataset.enlarge + ".webp";
    img.alt = button.dataset.alt;
    document.querySelector("#image-caption").textContent =
      button.dataset.caption;
    dialog.showModal();
  }
  if (event.target.closest(".close-image")) dialog.close();
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    headerNav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.focus();
  }
});
render();
