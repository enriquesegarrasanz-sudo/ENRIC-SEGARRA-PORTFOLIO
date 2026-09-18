import { contentTranslations } from "./content-translations.js";

const STORAGE_KEY = "segarra-language";
const originalText = new WeakMap();
const originalAttributes = new WeakMap();

export const LANGUAGES = [
  { code: "es", label: "Castellano", short: "ES" },
  { code: "ca", label: "Català", short: "CA" },
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "zh", label: "中文", short: "中文" },
];

const copy = {
  "Idioma": ["Idioma", "Language", "Langue", "语言"],
  "Menú": ["Menú", "Menu", "Menu", "菜单"],
  "Navegación principal": ["Navegació principal", "Main navigation", "Navigation principale", "主导航"],
  "SEGARRA Y GARIBO, inicio": ["SEGARRA Y GARIBO, inici", "SEGARRA Y GARIBO, home", "SEGARRA Y GARIBO, accueil", "SEGARRA Y GARIBO，首页"],
  "07 apartados": ["07 apartats", "07 sections", "07 sections", "07 个部分"],
  "Archivo de muestras": ["Arxiu de mostres", "Exhibition archive", "Archives d’expositions", "展览档案"],
  "Perfil y práctica": ["Perfil i pràctica", "Profile and practice", "Profil et pratique", "简介与实践"],
  "Información profesional": ["Informació professional", "Professional information", "Informations professionnelles", "专业信息"],
  "Obra y memoria": ["Obra i memòria", "Works and memory", "Œuvre et mémoire", "作品与记忆"],
  "Inicio": ["Inici", "Home", "Accueil", "首页"],
  "Obra": ["Obra", "Works", "Œuvre", "作品"],
  "Arte infantil": ["Art infantil", "Children's art", "Art enfantin", "儿童艺术"],
  "Exposiciones": ["Exposicions", "Exhibitions", "Expositions", "展览"],
  "Trayectoria": ["Trajectòria", "Journey", "Parcours", "艺术历程"],
  "Archivo visual": ["Arxiu visual", "Visual archive", "Archives visuelles", "视觉档案"],
  "Artista": ["Artista", "Artist", "Artiste", "艺术家"],
  "Contacto": ["Contacte", "Contact", "Contact", "联系"],
  "OBRA Y MEMORIA": ["OBRA I MEMÒRIA", "WORK AND MEMORY", "ŒUVRE ET MÉMOIRE", "作品与记忆"],
  "Saltar al contenido": ["Salta al contingut", "Skip to content", "Aller au contenu", "跳转到内容"],
  "Obra, presente y memoria.": ["Obra, present i memòria.", "Works, present and memory.", "Œuvre, présent et mémoire.", "作品、当下与记忆。"],
  "Una historia que sigue creciendo": ["Una història que continua creixent", "A story that keeps growing", "Une histoire qui continue de grandir", "一段不断生长的故事"],
  "Selección en desarrollo · Archivo familiar": ["Selecció en desenvolupament · Arxiu familiar", "Selection in progress · Family archive", "Sélection en cours · Archives familiales", "持续整理中 · 家庭档案"],
  "Cerrar imagen": ["Tanca la imatge", "Close image", "Fermer l’image", "关闭图片"],
  "Fotografía anterior": ["Fotografia anterior", "Previous photograph", "Photographie précédente", "上一张照片"],
  "Fotografía siguiente": ["Fotografia següent", "Next photograph", "Photographie suivante", "下一张照片"],
  "Ruta": ["Ruta", "Breadcrumb", "Fil d’Ariane", "路径"],
  "Ver todo": ["Veure-ho tot", "View all", "Voir tout", "查看全部"],
  "Obra propia": ["Obra pròpia", "Own work", "Œuvre personnelle", "个人作品"],
  "Muestra colectiva": ["Mostra col·lectiva", "Group exhibition", "Exposition collective", "群展"],
  "Colectiva": ["Col·lectiva", "Group show", "Collective", "集体展览"],
  "Formación docente": ["Formació docent", "Teacher training", "Formation des enseignants", "教师培训"],
  "Formación de adultos": ["Formació d’adults", "Adult education", "Formation des adultes", "成人教育"],
  "Archivo de sala": ["Arxiu de sala", "Gallery archive", "Archives de salle", "展厅档案"],
  "Exposición": ["Exposició", "Exhibition", "Exposition", "展览"],
  "Recorrer el archivo": ["Recórrer l’arxiu", "Explore the archive", "Parcourir les archives", "浏览档案"],
  "Obra destacada": ["Obra destacada", "Featured work", "Œuvre à la une", "精选作品"],
  "Archivo vivo · 1959 — presente": ["Arxiu viu · 1959 — present", "Living archive · 1959 — present", "Archives vivantes · 1959 — aujourd’hui", "活档案 · 1959 — 至今"],
  "Escultura, pintura, dibujo y educación artística.": ["Escultura, pintura, dibuix i educació artística.", "Sculpture, painting, drawing and art education.", "Sculpture, peinture, dessin et éducation artistique.", "雕塑、绘画、绘图与艺术教育。"],
  "Una obra hecha de formas, materiales, color y curiosidad. Un archivo familiar para mirar, recordar y seguir descubriendo.": ["Una obra feta de formes, materials, color i curiositat. Un arxiu familiar per mirar, recordar i continuar descobrint.", "A body of work made of forms, materials, colour and curiosity. A family archive to look at, remember and keep discovering.", "Une œuvre faite de formes, de matières, de couleurs et de curiosité. Des archives familiales à regarder, à se rappeler et à continuer de découvrir.", "一组由形态、材料、色彩与好奇心构成的作品。一个可以观看、回忆并不断发现的家庭档案。"],
  "Explorar la obra": ["Explorar l’obra", "Explore the work", "Explorer l’œuvre", "探索作品"],
  "Conocer al artista": ["Conèixer l’artista", "Meet the artist", "Découvrir l’artiste", "了解艺术家"],
  "Entrar en el archivo": ["Entrar a l’arxiu", "Enter the archive", "Entrer dans les archives", "进入档案"],
  "Obra propia, muestras colectivas y educación.": ["Obra pròpia, mostres col·lectives i educació.", "Own work, group exhibitions and education.", "Œuvre personnelle, expositions collectives et éducation.", "个人作品、群展与教育。"],
  "La obra, por dentro": ["L’obra, per dins", "Inside the work", "L’œuvre, de l’intérieur", "作品的内部"],
  "Cuatro maneras de construir una imagen.": ["Quatre maneres de construir una imatge.", "Four ways of building an image.", "Quatre façons de construire une image.", "构成一幅图像的四种方式。"],
  "Ver todo el catálogo": ["Veure tot el catàleg", "View the full catalogue", "Voir tout le catalogue", "查看完整目录"],
  "Todas las imágenes,": ["Totes les imatges,", "Every image,", "Toutes les images,", "所有图像，"],
  "muchas formas de mirar.": ["moltes maneres de mirar.", "many ways of looking.", "de nombreuses façons de regarder.", "多种观看方式。"],
  "Busca una pieza, recorre una exposición o reúne las imágenes de un taller. Cada fotografía conserva el acceso a su contexto.": ["Busca una peça, recorre una exposició o reuneix les imatges d’un taller. Cada fotografia conserva l’accés al seu context.", "Find a piece, explore an exhibition or gather images from a workshop. Every photograph keeps a path back to its context.", "Trouvez une pièce, parcourez une exposition ou réunissez les images d’un atelier. Chaque photographie conserve l’accès à son contexte.", "查找一件作品、浏览展览或汇集工作坊图像。每张照片都保留通往其背景的路径。"],
  "Abrir el archivo de imágenes": ["Obrir l’arxiu d’imatges", "Open the image archive", "Ouvrir les archives d’images", "打开图像档案"],
  "Catálogo de obra": ["Catàleg d’obra", "Works catalogue", "Catalogue des œuvres", "作品目录"],
  "Móviles, escultura, pintura y dibujo. Un catálogo organizado por familias de obras, con distintas vistas reunidas en cada ficha.": ["Mòbils, escultura, pintura i dibuix. Un catàleg organitzat per famílies d’obres, amb diverses vistes reunides a cada fitxa.", "Mobiles, sculpture, painting and drawing. A catalogue organised by families of works, with different views gathered in each record.", "Mobiles, sculpture, peinture et dessin. Un catalogue organisé par familles d’œuvres, avec plusieurs vues réunies dans chaque fiche.", "悬挂装置、雕塑、绘画与绘图。按作品家族整理的目录，每个条目汇集不同视角。"],
  "Equilibrio, color y movimiento. Piezas suspendidas que cambian con el aire, la luz y el lugar que las acoge.": ["Equilibri, color i moviment. Peces suspeses que canvien amb l’aire, la llum i el lloc que les acull.", "Balance, colour and movement. Suspended pieces that change with air, light and the place that hosts them.", "Équilibre, couleur et mouvement. Des pièces suspendues qui changent avec l’air, la lumière et le lieu qui les accueille.", "平衡、色彩与运动。悬挂的作品随着空气、光线与空间而变化。"],
  "El volumen como punto de partida. Tallas, ensamblajes, relieves y construcciones presentes en el archivo.": ["El volum com a punt de partida. Talles, assemblatges, relleus i construccions presents a l’arxiu.", "Volume as a starting point. Carvings, assemblages, reliefs and constructions in the archive.", "Le volume comme point de départ. Tailles, assemblages, reliefs et constructions présentes dans les archives.", "以体积为起点。档案中的雕刻、组装、浮雕与构造。"],
  "Animales, personajes y mundos imaginados. Un recorrido por las distintas familias del archivo de pintura.": ["Animals, personatges i mons imaginats. Un recorregut per les diferents famílies de l’arxiu de pintura.", "Animals, characters and imagined worlds. A journey through the different families in the painting archive.", "Animaux, personnages et mondes imaginés. Un parcours parmi les différentes familles des archives de peinture.", "动物、人物与想象的世界。穿行于绘画档案的不同家族。"],
  "Líneas, manchas y formas que construyen el espacio sobre el papel.": ["Línies, taques i formes que construeixen l’espai sobre el paper.", "Lines, marks and forms that build space on paper.", "Lignes, taches et formes qui construisent l’espace sur le papier.", "在纸上构成空间的线条、色块与形态。"],
  "Disciplinas": ["Disciplines", "Disciplines", "Disciplines", "类别"],
  "Toda la obra": ["Tota l’obra", "All works", "Toute l’œuvre", "全部作品"],
  "Móviles": ["Mòbils", "Mobiles", "Mobiles", "悬挂装置"],
  "Escultura": ["Escultura", "Sculpture", "Sculpture", "雕塑"],
  "Pintura": ["Pintura", "Painting", "Peinture", "绘画"],
  "Dibujo": ["Dibuix", "Drawing", "Dessin", "绘图"],
  "Obras infantiles": ["Obres infantils", "Children’s works", "Œuvres enfantines", "儿童作品"],
  "Talleres": ["Tallers", "Workshops", "Ateliers", "工作坊"],
  "Buscar obras": ["Cerca obres", "Search works", "Rechercher des œuvres", "搜索作品"],
  "Buscar título, familia o referencia": ["Cerca títol, família o referència", "Search title, family or reference", "Rechercher un titre, une famille ou une référence", "搜索标题、家族或编号"],
  "Familia": ["Família", "Family", "Famille", "家族"],
  "Todas las familias": ["Totes les famílies", "All families", "Toutes les familles", "所有家族"],
  "Presentación": ["Presentació", "View", "Présentation", "显示方式"],
  "Cuadrícula": ["Quadrícula", "Grid", "Grille", "网格"],
  "Recorrido ↓": ["Recorregut ↓", "Walkthrough ↓", "Parcours ↓", "浏览 ↓"],
  "Nombres descriptivos provisionales": ["Noms descriptius provisionals", "Provisional descriptive names", "Noms descriptifs provisoires", "临时描述性名称"],
  "Ver más obras": ["Veure més obres", "View more works", "Voir plus d’œuvres", "查看更多作品"],
  "No hay obras con esa búsqueda.": ["No hi ha obres amb aquesta cerca.", "No works match that search.", "Aucune œuvre ne correspond à cette recherche.", "没有找到符合搜索条件的作品。"],
  "Restablecer filtros": ["Restablir filtres", "Reset filters", "Réinitialiser les filtres", "重置筛选"],
  "Ver la obra": ["Veure l’obra", "View the work", "Voir l’œuvre", "查看作品"],
  "Ampliar fotografía": ["Ampliar fotografia", "Enlarge photograph", "Agrandir la photographie", "放大照片"],
  "Ampliar": ["Ampliar", "Enlarge", "Agrandir", "放大"],
  "Ver perspectiva": ["Veure perspectiva", "View perspective", "Voir la perspective", "查看视角"],
  "Autor": ["Autor", "Artist", "Auteur", "作者"],
  "Identificación": ["Identificació", "Identification", "Identification", "识别信息"],
  "Descripción provisional": ["Descripció provisional", "Provisional description", "Description provisoire", "临时描述"],
  "Título original, fecha, materiales y medidas por documentar.": ["Títol original, data, materials i mides pendents de documentar.", "Original title, date, materials and measurements to be documented.", "Titre original, date, matériaux et dimensions à documenter.", "原题、日期、材料与尺寸待记录。"],
  "Continuar por esta familia": ["Continuar per aquesta família", "Continue through this family", "Continuer dans cette famille", "继续浏览此家族"],
  "En relación": ["En relació", "Related works", "En relation", "相关作品"],
  "Lugar": ["Lloc", "Place", "Lieu", "地点"],
  "Abrir con filtros": ["Obrir amb filtres", "Open with filters", "Ouvrir avec les filtres", "打开筛选"],
  "Seguir viendo": ["Continuar veient", "Keep viewing", "Continuer à regarder", "继续查看"],
  "Documentación": ["Documentació", "Documentation", "Documentation", "文档"],
  "Volver a": ["Tornar a", "Back to", "Retour à", "返回"],
  "Educación artística": ["Educació artística", "Art education", "Éducation artistique", "艺术教育"],
  "Todas": ["Totes", "All", "Toutes", "全部"],
  "Explorar": ["Explorar", "Explore", "Explorer", "探索"],
  "lecturas": ["lectures", "readings", "lectures", "篇阅读"],
  "fotografías": ["fotografies", "photographs", "photographies", "张照片"],
  "imágenes": ["imatges", "images", "images", "张图像"],
  "obras": ["obres", "works", "œuvres", "件作品"],
  "colecciones": ["col·leccions", "collections", "collections", "个收藏"],
  "álbumes": ["àlbums", "albums", "albums", "个相册"],
  "entradas": ["entrades", "entries", "entrées", "条记录"],
  "fichas": ["fitxes", "records", "fiches", "条目"],
  "vistas": ["vistes", "views", "vues", "个视角"],
  "de": ["de", "of", "de", "共"],
  "Recorre la lista para cambiar de imagen": ["Recorre la llista per canviar d’imatge", "Scroll the list to change the image", "Parcourez la liste pour changer d’image", "滚动列表切换图像"],
  "exposiciones": ["exposicions", "exhibitions", "expositions", "场展览"],
  "Archivo visual": ["Arxiu visual", "Visual archive", "Archives visuelles", "视觉档案"],
  "Fotografías y documentos": ["Fotografies i documents", "Photographs and documents", "Photographies et documents", "照片与文档"],
  "Todas las fotografías incorporadas a la web. Obras, perspectivas, exposiciones y actividades, con acceso a la ficha o al álbum de cada imagen.": ["Totes les fotografies incorporades a la web. Obres, perspectives, exposicions i activitats, amb accés a la fitxa o a l’àlbum de cada imatge.", "All photographs included on the site. Works, perspectives, exhibitions and activities, with access to each image’s record or album.", "Toutes les photographies intégrées au site. Œuvres, perspectives, expositions et activités, avec accès à la fiche ou à l’album de chaque image.", "网站收录的全部照片。作品、视角、展览与活动，每张图像都可进入对应条目或相册。"],
  "Título, lugar, año, archivo o referencia": ["Títol, lloc, any, arxiu o referència", "Title, place, year, archive or reference", "Titre, lieu, année, archive ou référence", "标题、地点、年份、档案或编号"],
  "Todos los ámbitos": ["Tots els àmbits", "All areas", "Tous les domaines", "所有范围"],
  "Todas las disciplinas": ["Totes les disciplines", "All disciplines", "Toutes les disciplines", "所有类别"],
  "Todas las colecciones": ["Totes les col·leccions", "All collections", "Toutes les collections", "所有收藏"],
  "Quitar filtros ×": ["Treure filtres ×", "Clear filters ×", "Supprimer les filtres ×", "清除筛选 ×"],
  "Una imagen puede pertenecer a varios recorridos": ["Una imatge pot pertànyer a diversos recorreguts", "An image can belong to several paths", "Une image peut appartenir à plusieurs parcours", "一张图像可以属于多个浏览路径"],
  "No hay imágenes con esos filtros.": ["No hi ha imatges amb aquests filtres.", "No images match those filters.", "Aucune image ne correspond à ces filtres.", "没有符合这些筛选条件的图像。"],
  "Tipo de exposición": ["Tipus d’exposició", "Exhibition type", "Type d’exposition", "展览类型"],
  "Encuentros con el público": ["Trobades amb el públic", "Encounters with the public", "Rencontres avec le public", "与公众相遇"],
  "Buscar exposición, lugar o año": ["Cerca exposició, lloc o any", "Search exhibition, place or year", "Rechercher une exposition, un lieu ou une année", "搜索展览、地点或年份"],
  "Buscar exposición": ["Cerca exposició", "Search exhibition", "Rechercher une exposition", "搜索展览"],
  "Mosaico": ["Mosaic", "Mosaic", "Mosaïque", "拼贴"],
  "Vista amplia": ["Vista àmplia", "Wide view", "Vue large", "宽幅视图"],
  "No hay exposiciones con esa búsqueda.": ["No hi ha exposicions amb aquesta cerca.", "No exhibitions match that search.", "Aucune exposition ne correspond à cette recherche.", "没有找到符合搜索条件的展览。"],
  "Las fechas documentadas se indican en cada archivo. Las muestras colectivas conservan diferenciadas las obras de sus participantes.": ["Les dates documentades s’indiquen a cada arxiu. Les mostres col·lectives mantenen diferenciades les obres dels seus participants.", "Documented dates are given in each archive. Group exhibitions keep participants’ works distinct.", "Les dates documentées sont indiquées dans chaque archive. Les expositions collectives distinguent les œuvres de leurs participants.", "每份档案标注有文献依据的日期。群展中参与者的作品保持区分。"],
  "Vida y obra": ["Vida i obra", "Life and work", "Vie et œuvre", "生平与作品"],
  "Índice del archivo": ["Índex de l’arxiu", "Archive index", "Index des archives", "档案索引"],
  "Capítulos y álbumes de la memoria artística.": ["Capítols i àlbums de la memòria artística.", "Chapters and albums from the artistic record.", "Chapitres et albums de la mémoire artistique.", "艺术记忆的章节与相册。"],
  "Abrir todas las fotografías con filtros": ["Obrir totes les fotografies amb filtres", "Open all photographs with filters", "Ouvrir toutes les photographies avec les filtres", "打开全部照片并筛选"],
  "Buscar una etapa o un año": ["Cerca una etapa o un any", "Search a period or year", "Rechercher une étape ou une année", "搜索阶段或年份"],
  "Buscar en la trayectoria": ["Cerca en la trajectòria", "Search the journey", "Rechercher dans le parcours", "搜索艺术历程"],
  "Etapa anterior": ["Etapa anterior", "Previous stage", "Étape précédente", "上一阶段"],
  "Etapa siguiente": ["Etapa següent", "Next stage", "Étape suivante", "下一阶段"],
  "Etapas y acontecimientos": ["Etapes i esdeveniments", "Stages and events", "Étapes et événements", "阶段与事件"],
  "No hay entradas con esa búsqueda. Prueba otro año, lugar o tema.": ["No hi ha entrades amb aquesta cerca. Prova un altre any, lloc o tema.", "No entries match that search. Try another year, place or topic.", "Aucune entrée ne correspond à cette recherche. Essayez une autre année, un autre lieu ou un autre thème.", "没有找到符合搜索条件的记录。请尝试其他年份、地点或主题。"],
  "Anterior": ["Anterior", "Previous", "Précédent", "上一项"],
  "Siguiente": ["Següent", "Next", "Suivant", "下一项"],
  "En este capítulo": ["En aquest capítol", "In this chapter", "Dans ce chapitre", "本章内容"],
  "La memoria": ["La memòria", "The record", "La mémoire", "记忆"],
  "La obra": ["L’obra", "The work", "L’œuvre", "作品"],
  "Imágenes y documentos": ["Imatges i documents", "Images and documents", "Images et documents", "图像与文档"],
  "Explorar imágenes": ["Explorar imatges", "Explore images", "Explorer les images", "探索图像"],
  "Explorar el archivo de arte infantil": ["Explorar l’arxiu d’art infantil", "Explore the children’s art archive", "Explorer les archives d’art enfantin", "探索儿童艺术档案"],
  "El artista": ["L’artista", "The artist", "L’artiste", "艺术家"],
  "Escultor, pintor y dibujante. Una práctica que atraviesa el oficio, la experimentación con los materiales y la educación artística.": ["Escultor, pintor i dibuixant. Una pràctica que travessa l’ofici, l’experimentació amb els materials i l’educació artística.", "Sculptor, painter and draughtsman. A practice shaped by craft, material experimentation and art education.", "Sculpteur, peintre et dessinateur. Une pratique traversée par le métier, l’expérimentation des matériaux et l’éducation artistique.", "雕塑家、画家和素描艺术家。他的创作贯穿工艺、材料实验与艺术教育。"],
  "Nacido en Barcelona en 1959 y formado en Bellas Artes en Valencia, ENRIC SEGARRA I GARIBO desarrolla una práctica que se mueve entre la escultura, la pintura y el dibujo. El conocimiento del oficio convive con la curiosidad por los materiales y con una atención constante a las formas de la naturaleza.": ["Nascut a Barcelona el 1959 i format en Belles Arts a València, ENRIC SEGARRA I GARIBO desenvolupa una pràctica que es mou entre l’escultura, la pintura i el dibuix. El coneixement de l’ofici conviu amb la curiositat pels materials i amb una atenció constant a les formes de la natura.", "Born in Barcelona in 1959 and trained in Fine Arts in Valencia, ENRIC SEGARRA I GARIBO works across sculpture, painting and drawing. His knowledge of craft goes hand in hand with curiosity about materials and sustained attention to forms found in nature.", "Né à Barcelone en 1959 et formé aux Beaux-Arts de Valence, ENRIC SEGARRA I GARIBO développe une pratique entre sculpture, peinture et dessin. La connaissance du métier s’allie à la curiosité pour les matériaux et à une attention constante aux formes de la nature.", "ENRIC SEGARRA I GARIBO 于1959年出生于巴塞罗那，毕业于瓦伦西亚美术学院，创作涵盖雕塑、绘画与素描。他对工艺的理解与对材料的好奇，以及对自然形态的持续关注并行不悖。"],
  "Su trayectoria incluye la educación artística, los proyectos compartidos y la actividad expositiva. En los talleres, el volumen y la experimentación se convierten en una manera de acompañar la imaginación de los participantes.": ["La seva trajectòria inclou l’educació artística, els projectes compartits i l’activitat expositiva. Als tallers, el volum i l’experimentació esdevenen una manera d’acompanyar la imaginació dels participants.", "His career includes art education, collaborative projects and exhibition work. In workshops, volume and experimentation become ways of supporting participants’ imagination.", "Son parcours comprend l’éducation artistique, les projets partagés et l’activité d’exposition. Dans les ateliers, le volume et l’expérimentation accompagnent l’imagination des participants.", "他的经历包括艺术教育、合作项目和展览活动。在工作坊中，体积与实验成为陪伴参与者想象力的一种方式。"],
  "En su trabajo actual, las esculturas suspendidas mantienen abierta esa búsqueda. Piezas, colores y elementos recuperados se encuentran en composiciones que dialogan con el aire y el entorno.": ["En el seu treball actual, les escultures suspeses mantenen oberta aquesta recerca. Peces, colors i elements recuperats es troben en composicions que dialoguen amb l’aire i l’entorn.", "In his current work, suspended sculptures keep this enquiry open. Pieces, colours and recovered elements meet in compositions that engage with air and their surroundings.", "Dans son travail actuel, les sculptures suspendues maintiennent cette recherche ouverte. Pièces, couleurs et éléments récupérés se rencontrent dans des compositions qui dialoguent avec l’air et l’environnement.", "在他目前的创作中，悬挂雕塑延续着这项探索。部件、色彩与回收元素在与空气和环境对话的构成中相遇。"],
  "ENRIC SEGARRA I GARIBO en un retrato de estudio": ["ENRIC SEGARRA I GARIBO en un retrat d’estudi", "ENRIC SEGARRA I GARIBO in a studio portrait", "ENRIC SEGARRA I GARIBO dans un portrait en studio", "ENRIC SEGARRA I GARIBO 的工作室肖像"],
  "Información": ["Informació", "Information", "Informations", "信息"],
  "Recorrer su trayectoria": ["Recórrer la seva trajectòria", "Explore the journey", "Parcourir son parcours", "浏览艺术历程"],
  "Distintas formas de una misma búsqueda": ["Diferents formes d’una mateixa recerca", "Different forms of the same search", "Différentes formes d’une même recherche", "同一探索的不同形式"],
  "Escultura y materia": ["Escultura i matèria", "Sculpture and matter", "Sculpture et matière", "雕塑与材料"],
  "Pintura y dibujo": ["Pintura i dibuix", "Painting and drawing", "Peinture et dessin", "绘画与绘图"],
  "Este espacio reúne la obra y la memoria artística de SEGARRA Y GARIBO. El archivo sigue creciendo con la identificación de piezas, documentos y fotografías.": ["Aquest espai reuneix l’obra i la memòria artística de SEGARRA Y GARIBO. L’arxiu continua creixent amb la identificació de peces, documents i fotografies.", "This space brings together the work and artistic record of SEGARRA Y GARIBO. The archive continues to grow as works, documents and photographs are identified.", "Cet espace réunit l’œuvre et la mémoire artistique de SEGARRA Y GARIBO. Les archives continuent de s’enrichir avec l’identification des pièces, documents et photographies.", "这里汇集 SEGARRA Y GARIBO 的作品与艺术记忆。随着作品、文档与照片的识别，档案仍在不断增长。"],
  "Volver a la obra": ["Tornar a l’obra", "Back to the work", "Retour à l’œuvre", "返回作品"],
  "Página no encontrada": ["Pàgina no trobada", "Page not found", "Page introuvable", "页面未找到"],
  "Este enlace no corresponde a una ficha del archivo.": ["Aquest enllaç no correspon a una fitxa de l’arxiu.", "This link does not match an archive record.", "Ce lien ne correspond pas à une fiche des archives.", "此链接不对应档案条目。"],
};

const dynamic = [
  [/^(\d+) fichas$/, (n) => `${n} ${term("fichas")}`],
  [/^(\d+) colecciones$/, (n) => `${n} ${term("colecciones")}`],
  [/^(\d+) fotografías$/, (n) => `${n} ${term("fotografías")}`],
  [/^(\d+) imágenes$/, (n) => `${n} ${term("imágenes")}`],
  [/^(\d+) obras$/, (n) => `${n} ${term("obras")}`],
  [/^(\d+) álbumes$/, (n) => `${n} ${term("álbumes")}`],
  [/^(\d+) lecturas$/, (n) => `${n} ${term("lecturas")}`],
  [/^(\d+) entradas · Recorre la lista para cambiar de imagen$/, (n) => `${n} ${term("entradas")} · ${phrase("Recorre la lista para cambiar de imagen")}`],
  [/^(\d+) exposiciones$/, (n) => `${n} ${term("exposiciones")}`],
  [/^(\d+) de (\d+) fotografías$/, (a, b) => `${a} ${phrase("de")} ${b} ${term("fotografías")}`],
];

let current = "es";

export function getLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return LANGUAGES.some((language) => language.code === saved) ? saved : "es";
}

export function setLanguage(language) {
  if (!LANGUAGES.some((item) => item.code === language)) return;
  if (language === getLanguage()) return;
  localStorage.setItem(STORAGE_KEY, language);
  current = language;
  applyTranslations(document);
}

function indexFor(language = current) {
  return { es: -1, ca: 0, en: 1, fr: 2, zh: 3 }[language] ?? -1;
}

function phrase(value) {
  const row = copy[value] || contentTranslations[value];
  if (!row) return value;
  return Array.isArray(row) ? row[indexFor()] ?? value : row[current] ?? value;
}

function term(value) {
  return phrase(value);
}

function translateText(value) {
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  const clean = value.trim();
  if (!clean) return value;
  if (copy[clean]) return leading + phrase(clean) + trailing;
  for (const [pattern, render] of dynamic) {
    const match = clean.match(pattern);
    if (match) return leading + render(...match.slice(1)) + trailing;
  }
  return value;
}

function translateAttribute(element, name) {
  let attributes = originalAttributes.get(element);
  if (!attributes) {
    attributes = new Map();
    originalAttributes.set(element, attributes);
  }
  if (!attributes.has(name)) attributes.set(name, element.getAttribute(name));
  const value = attributes.get(name);
  if (!value) return;
  if (copy[value]) element.setAttribute(name, phrase(value));
  else if (name === "placeholder") element.setAttribute(name, translateText(value));
}

export function applyTranslations(root = document) {
  current = getLanguage();
  document.documentElement.lang = current === "zh" ? "zh-CN" : current;
  document.querySelectorAll("[data-language-select]").forEach((select) => {
    select.value = current;
  });
  const walker = document.createTreeWalker(root.body || root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (node.parentElement?.closest("script, style, select")) return;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    node.nodeValue = translateText(originalText.get(node));
  });
  root.querySelectorAll?.("[aria-label], [placeholder], [title]").forEach((element) => {
    translateAttribute(element, "aria-label");
    translateAttribute(element, "placeholder");
    translateAttribute(element, "title");
  });
  root.querySelectorAll?.("option:not([data-language-option])").forEach((option) => {
    if (!option.closest("[data-language-select]")) option.textContent = translateText(option.textContent);
  });
  if (document.title) {
    const baseTitle = document.documentElement.dataset.baseTitle || document.title;
    const [pageTitle, suffix] = baseTitle.split(" — ");
    document.title = `${translateText(pageTitle)}${suffix ? ` — ${suffix}` : ""}`;
  }
}

export function initLanguage() {
  current = getLanguage();
  document.documentElement.lang = current === "zh" ? "zh-CN" : current;
  const select = document.querySelector("[data-language-select]");
  if (select) {
    select.value = current;
    select.addEventListener("change", () => setLanguage(select.value));
  }
  applyTranslations(document);
}
