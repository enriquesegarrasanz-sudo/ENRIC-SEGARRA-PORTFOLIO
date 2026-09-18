// Contenido editable. Los nombres de piezas son descripciones provisionales,
// no títulos del artista. No completar fechas, técnicas o medidas por inferencia.
export const site = {
  name: "ENRIQUE SEGARRA I GARIBO",
  contactEmail: null,
  contactText: "El contacto profesional se incorporará próximamente.",
  intro:
    "Escultor, pintor y dibujante. Una práctica que atraviesa el oficio, la experimentación con los materiales y la educación artística.",
};
export const categories = [
  { id: "todas", label: "Toda la obra" },
  { id: "moviles", label: "Móviles" },
  { id: "escultura", label: "Escultura" },
  { id: "pintura", label: "Pintura" },
  { id: "dibujo", label: "Dibujo" },
];
// El catálogo amplio y sus galerías se editan en catalogue.js.
import { catalogue, albums as catalogueAlbums } from "./catalogue.js?v=20260918-escultura-vistas";
import { bellasArtsGallery } from "./bellas-arts.js";

export const works = catalogue;
const consolidatedBellasArts = new Set([
  "sala-compartida",
  "educacion-salas",
  "evolucion-belles-arts",
]);
const hiddenAlbums = new Set(["pineda"]);
export const albums = [
  ...catalogueAlbums.filter(
    (album) =>
      !consolidatedBellasArts.has(album.id) && !hiddenAlbums.has(album.id),
  ),
  {
    id: "sala-bellas-artes",
    title: "Sala d’Exposicions de les Belles Arts",
    chapter: "exponer-abrir-espacios",
    type: "Archivo de sala",
    section: "exposiciones",
    audience: "sala",
    exhibitionKind: "sala",
    text: "Archivo reunido de las exposiciones conservadas en la Sala d’Exposicions de les Belles Arts, en Valencia.",
    paragraphs: [
      "Las fotografías que antes aparecían como exposiciones separadas se reúnen aquí por su sede común: la Sala d’Exposicions de les Belles Arts.",
      "El archivo distingue la muestra de arte infantil, la muestra colectiva y «Evolución 1984–2004». Las obras de participantes y de otros artistas se presentan como contexto documental y no se atribuyen a Enric.",
      "La invitación de «Evolución 1984–2004» documenta su celebración entre el 3 de febrero y el 3 de marzo de 2005. Las fechas de los otros conjuntos continúan pendientes de confirmación.",
    ],
    image: "evolucion-013392-restored",
    gallery: bellasArtsGallery,
    credit:
      "La autoría se indica en cada bloque: obra de Enric en «Evolución 1984–2004»; obras de participantes en arte infantil; y contexto documental en la muestra colectiva.",
    place: "Sala d’Exposicions de les Belles Arts · Valencia",
    searchTerms: "Bellas Artes Valencia",
    source:
      "Reunión de los fondos «Exposición Arte Infantil», «Expo Galería d’art» y «dibujos y pinturas ENRIQUE SEGARRA I GARIBO». La invitación ARC-013418 documenta el título, la sede y las fechas de «Evolución 1984–2004».",
  },
];
export const albumRedirects = {
  pineda: "/exposiciones",
  "sala-compartida": "sala-bellas-artes",
  "educacion-salas": "sala-bellas-artes",
  "evolucion-belles-arts": "sala-bellas-artes",
};
export const chapters = [
  {
    id: "aprender-oficio",
    title: "Aprender el oficio",
    short: "Los comienzos, los materiales y el aprendizaje de una mirada.",
    image: "retrato",
    imageAlt: "Retrato del artista con una escultura",
    caption:
      "Retrato actual. Los documentos de formación se incorporarán al archivo a medida que se identifiquen.",
    paragraphs: [
      "Enric sitúa sus comienzos en Barcelona, donde nació en 1959, y su formación en Valencia, donde estudió Bellas Artes. En su relato, la escultura ocupa un lugar central desde el que se abren otras maneras de trabajar.",
      "Recuerda el aprendizaje junto a otros escultores, especialmente en relación con la talla. El conocimiento del oficio convive con la curiosidad por probar materiales, recoger elementos y encontrar posibilidades en sus formas.",
      "Esta parte de la memoria reunirá los documentos y recuerdos de formación, las primeras obras y las personas que acompañaron esos comienzos. Los nombres y periodos se incorporarán conforme se contrasten.",
    ],
    quote: null,
  },
  {
    id: "construir-formas",
    title: "Construir formas",
    short: "Escultura y dibujo: del trazo a la presencia de un volumen.",
    image: "escultura-madera",
    imageAlt: "Escultura vertical de perfil curvo",
    caption:
      "Una de las piezas de la selección de escultura. Título y fecha por documentar.",
    paragraphs: [
      "Talla, hierro, piedra, madera y ensamblaje aparecen en la explicación que Enric hace de su recorrido escultórico. El oficio se combina con la experimentación y con la atención a los elementos que encuentra a su paso.",
      "Un tronco o una piedra pueden convertirse en el punto de partida de una pieza. La naturaleza aporta formas y materiales, pero también una manera de observar antes de intervenir.",
      "En el dibujo intenta construir una presencia tridimensional. Habla de ceras, carbón y pastel como recursos para dar forma al espacio sobre el papel. Algunas investigaciones se trasladaron después a esculturas; sus relaciones concretas se irán documentando.",
    ],
    quote: {
      text: "Mi obsesión era sobre la naturaleza, las formas que tiene y todos los recursos que puede tener.",
      source: "Enric · entrevista familiar, apartado Escultura",
    },
  },
  {
    id: "pintar-mundos",
    title: "Pintar otros mundos",
    short: "Gatos, arcas y tauromaquia. Símbolos, animales y humor.",
    image: "gatos",
    imageAlt: "Pintura con figura de gato",
    caption:
      "La pintura se presenta por series, conservando las diferencias entre sus imaginarios.",
    paragraphs: [
      "La pintura abre otros caminos dentro de su obra. Enric recuerda varias series que conservan un carácter propio: los gatos, las arcas y la tauromaquia.",
      "En los gatos, la relación con los animales se cruza con un imaginario simbólico. Al hablar de esas obras menciona el óleo, los esmaltes y el uso de dorados y plateados. Cada pieza necesitará su ficha individual para precisar la técnica.",
      "Las arcas forman otra etapa vinculada a símbolos y relatos. En la tauromaquia, en cambio, el artista subraya la ironía: toros, toreros y otros personajes protagonizan escenas de humor y desplazamientos de los rituales del ruedo.",
    ],
    quote: {
      text: "Yo me lo pasé bien haciendo, creando todo eso.",
      source: "Enric · entrevista familiar, apartado Pintura",
    },
  },
  {
    id: "crear-con-otros",
    title: "Aprender y crear con otros",
    short:
      "La educación artística, la libertad y el descubrimiento del volumen.",
    image: "sala-educacion",
    imageAlt: "Vista de una exposición de trabajos de arte infantil",
    caption:
      "Exposición de trabajos de arte infantil. Obras de participantes; Enric desarrolló la actividad educativa. Fecha e identificación individual pendientes.",
    paragraphs: [
      "El trabajo educativo comenzó cuando le ofrecieron hacerse cargo del ámbito artístico de un colegio. Su experiencia como escultor orientó los talleres hacia el volumen, la construcción y la experimentación directa.",
      "Cajas, envases, piezas de madera y otros objetos se cortaban, pintaban y ensamblaban para descubrir nuevas formas. Los materiales cotidianos permitían imaginar sin depender de una única solución o de un modelo que copiar.",
      "La libertad de cada niño ocupaba un lugar central. Esta memoria conserva tanto las obras de los participantes como la experiencia de aprender a hacer, las exposiciones y los documentos pedagógicos. Las autorías se mantendrán diferenciadas.",
    ],
    quote: {
      text: "Era que ellos mismos aportaran cosas y elementos, cosas, desde ideas suyas, de una ensoñación que hayan tenido, cualquier cosa.",
      source: "Enric · entrevista familiar, apartado Arte infantil",
    },
  },
  {
    id: "exponer-abrir-espacios",
    title: "Exponer y abrir espacios",
    short: "Mostrar la obra propia y acompañar la de otros artistas.",
    image: null,
    paragraphs: [
      "La actividad expositiva forma parte importante de su recorrido. En la entrevista recuerda exposiciones y participaciones en distintos lugares de España y del extranjero. El archivo permitirá reconstruir sus títulos, sedes y fechas con mayor precisión.",
      "Su experiencia también incluye la dirección de la sala de exposiciones del Colegio de Licenciados en Bellas Artes en Valencia. Según su testimonio, dedicó doce años a esa labor, acompañando una programación de escultura, pintura, dibujo y otras propuestas.",
      "Aquí se reunirán las exposiciones propias y la actividad de gestión cultural, indicando siempre el papel que desempeñó. Invitaciones, catálogos, fotografías y recuerdos ayudarán a recuperar cada episodio.",
    ],
    quote: null,
  },
  {
    id: "seguir-creando",
    title: "Seguir creando",
    short: "Móviles, esculturas suspendidas y un entorno en transformación.",
    image: "artista-entorno",
    imageAlt:
      "El artista junto a una composición circular suspendida de un árbol",
    caption:
      "El artista y las piezas al aire libre. La creación actual mantiene abierto el recorrido.",
    paragraphs: [
      "Los móviles ocupan un lugar especialmente vivo en su presente. Enric habla de esta etapa con alegría y describe el uso de materiales recuperados, el juego con el color y las posibilidades que surgen al combinar elementos.",
      "En su casa cuelga piezas de árboles y observa cómo se relacionan con el entorno. Según cuenta, su mujer las compara con pendientes de los árboles: una imagen cercana para una práctica que sigue creciendo.",
      "También está desarrollando poco a poco un parque escultórico en un terreno rural. El jardín y ese proyecto se documentarán por separado cuando se precise la relación entre ambos espacios. Esta memoria permanece abierta a las nuevas obras y a lo que todavía está por venir.",
    ],
    quote: {
      text: "Es una forma de ir experimentando y ver el efecto que puede causar.",
      source: "Enric · entrevista familiar, apartado Móviles",
    },
  },
];
export const documents = [
  {
    id: "exposicion-infantil",
    title: "El trabajo sale del taller",
    image: "sala-educacion",
    alt: "Vista de sala con obras de participantes de talleres infantiles",
    text: "Una exposición de trabajos de arte infantil conservada en el archivo familiar. La sede, la fecha y las autorías individuales se incorporarán al completar su documentación.",
    type: "Fotografía de exposición",
  },
  {
    id: "materiales-taller",
    title: "El color como punto de partida",
    image: "taller-color",
    alt: "Recipientes de pintura de distintos colores preparados para un taller",
    text: "Materiales de trabajo dentro del fondo educativo. Un detalle cotidiano que ayuda a conservar la memoria del proceso, además de sus resultados.",
    type: "Fotografía de proceso",
  },
];
