import { contentTranslations } from "./content-translations.js?v=20261026-ja";

const STORAGE_KEY = "segarra-language";
const originalText = new WeakMap();
const originalAttributes = new WeakMap();

export const LANGUAGES = [
  { code: "es", label: "Castellano", short: "ES" },
  { code: "ca", label: "Català", short: "CA" },
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "zh", label: "中文", short: "中文" },
  { code: "ja", label: "日本語", short: "日本語" },
];

const copy = {
  "Rostros y personajes": ["Rostres i personatges","Faces and figures","Visages et personnages","面孔与人物","顔と人物","顔と人物","顔と人物","顔と人物"],
  "Relatos e iconografía": ["Relats i iconografia","Stories and iconography","Récits et iconographie","故事与图像主题","物語と図像","物語と図像","物語と図像","物語と図像"],
  "Figuras y símbolos": ["Figures i símbols","Figures and symbols","Figures et symboles","形象与符号","形象と象徴","形象と象徴","形象と象徴","形象と象徴"],
  "Letras y signos": ["Lletres i signes","Letters and signs","Lettres et signes","字母与符号","文字と記号","文字と記号","文字と記号","文字と記号"],
  "Planos curvos y volúmenes abiertos": ["Plans corbs i volums oberts","Curved planes and open volumes","Plans courbes et volumes ouverts","曲面与开放体积","曲面と開かれた立体","曲面と開かれた立体","曲面と開かれた立体","曲面と開かれた立体"],
  "Formas orgánicas": ["Formes orgàniques","Organic forms","Formes organiques","有机形态","有機的な形態","有機的な形態","有機的な形態","有機的な形態"],
  "Relieves de planos recortados": ["Relleus de plans retallats","Cut-out plane reliefs","Reliefs de plans découpés","切割平面浮雕","切り抜かれた平面のレリーフ","切り抜かれた平面のレリーフ","切り抜かれた平面のレリーフ","切り抜かれた平面のレリーフ"],
  "Relieves de textura": ["Relleus de textura","Textured reliefs","Reliefs de texture","肌理浮雕","テクスチャーのレリーフ","テクスチャーのレリーフ","テクスチャーのレリーフ","テクスチャーのレリーフ"],
  "Relieves y ensamblajes murales": ["Relleus i assemblatges murals","Wall reliefs and assemblages","Reliefs et assemblages muraux","壁面浮雕与组合","壁面レリーフとアサンブラージュ","壁面レリーフとアサンブラージュ","壁面レリーフとアサンブラージュ","壁面レリーフとアサンブラージュ"],
  "Estructuras y objetos ensamblados": ["Estructures i objectes assemblats","Structures and assembled objects","Structures et objets assemblés","结构与组装物件","構造体とアサンブラージュ・オブジェ","構造体とアサンブラージュ・オブジェ","構造体とアサンブラージュ・オブジェ","構造体とアサンブラージュ・オブジェ"],
  "Intervenciones en el entorno": ["Intervencions en l’entorn","Works in the landscape","Interventions dans l’environnement","环境中的作品","環境の中の作品","環境の中の作品","環境の中の作品","環境の中の作品"],
  "Dibujo y espacio": ["Dibuix i espai","Drawing and space","Dessin et espace","素描与空间","ドローイングと空間","ドローイングと空間","ドローイングと空間","ドローイングと空間"],
  "Serie o conjunto": ["Sèrie o conjunt","Series or group","Série ou ensemble","系列或分组","シリーズ・作品群","シリーズ・作品群","シリーズ・作品群","シリーズ・作品群"],
  "Series y conjuntos": ["Sèries i conjunts","Series and groups","Séries et ensembles","系列与分组","シリーズと作品群","シリーズと作品群","シリーズと作品群","シリーズと作品群"],
  "Todas las obras": ["Totes les obres","All works","Toutes les œuvres","全部作品","すべての作品","すべての作品","すべての作品","すべての作品"],
  "Buscar descripción o referencia": ["Cerca descripció o referència","Search description or reference","Rechercher une description ou une référence","搜索描述或编号","説明または参照番号を検索","説明または参照番号を検索","説明または参照番号を検索","説明または参照番号を検索"],
  "Descripciones visuales de las obras": ["Descripcions visuals de les obres","Visual descriptions of the works","Descriptions visuelles des œuvres","作品的视觉描述","作品の視覚的記述","作品の視覚的記述","作品の視覚的記述","作品の視覚的記述"],
  "Descripción visual": ["Descripció visual","Visual description","Description visuelle","视觉描述","視覚的記述","視覚的記述","視覚的記述","視覚的記述"],
  "Descripción visual para identificar la pieza. Título, fecha y técnica pendientes de documentación.": ["Descripció visual per identificar la peça. Títol, data i tècnica pendents de documentació.","Visual description to identify the piece. Title, date and technique await documentation.","Description visuelle pour identifier la pièce. Titre, date et technique en attente de documentation.","用于识别作品的视觉描述。标题、日期与技法尚待文献确认。","作品を識別するための視覚的記述。タイトル、制作年、技法は記録確認中です。","作品を識別するための視覚的記述。タイトル、制作年、技法は記録確認中です。","作品を識別するための視覚的記述。タイトル、制作年、技法は記録確認中です。","作品を識別するための視覚的記述。タイトル、制作年、技法は記録確認中です。"],
  "Ver toda la pintura": ["Veure tota la pintura","View all paintings","Voir toutes les peintures","查看全部绘画","すべての絵画を見る","すべての絵画を見る","すべての絵画を見る","すべての絵画を見る"],
  "Ver todos los dibujos": ["Veure tots els dibuixos","View all drawings","Voir tous les dessins","查看全部素描","すべてのドローイングを見る","すべてのドローイングを見る","すべてのドローイングを見る","すべてのドローイングを見る"],
  "Tauromaquia, Gatos y Arcas de Noé, junto a otros conjuntos de pintura y obra sobre papel.": ["Tauromàquia, Gats i Arques de Noè, amb altres conjunts de pintura i obra sobre paper.","Bullfighting, Cats and Noah’s Arks, alongside other groups of paintings and works on paper.","Tauromachie, Chats et Arches de Noé, aux côtés d’autres ensembles de peintures et d’œuvres sur papier.","斗牛、猫与诺亚方舟，以及其他绘画与纸上作品分组。","闘牛、猫、ノアの方舟、およびその他の絵画・紙上作品群。","闘牛、猫、ノアの方舟、およびその他の絵画・紙上作品群。","闘牛、猫、ノアの方舟、およびその他の絵画・紙上作品群。","闘牛、猫、ノアの方舟、およびその他の絵画・紙上作品群。"],
  "Obras reunidas por su construcción, sus formas y su relación con el espacio.": ["Obres reunides per la construcció, les formes i la relació amb l’espai.","Works grouped by construction, form and relationship with space.","Œuvres regroupées selon leur construction, leurs formes et leur rapport à l’espace.","按构造、形态及与空间的关系分组的作品。","構造、形態、そして空間との関係によってまとめられた作品群。","構造、形態、そして空間との関係によってまとめられた作品群。","構造、形態、そして空間との関係によってまとめられた作品群。","構造、形態、そして空間との関係によってまとめられた作品群。"],
  "Series y conjuntos de pintura organizados por sus motivos y su lenguaje visual.": ["Sèries i conjunts de pintura organitzats pels motius i el llenguatge visual.","Painting series and groups organised by subject and visual language.","Séries et ensembles de peintures organisés par motifs et langage visuel.","按主题和视觉语言整理的绘画系列与分组。","モチーフと視覚言語によって整理された絵画のシリーズと作品群。","モチーフと視覚言語によって整理された絵画のシリーズと作品群。","モチーフと視覚言語によって整理された絵画のシリーズと作品群。","モチーフと視覚言語によって整理された絵画のシリーズと作品群。"],
  "Líneas, planos y figuras sobre papel.": ["Línies, plans i figures sobre paper.","Lines, planes and figures on paper.","Lignes, plans et figures sur papier.","纸上的线条、平面与形象。","紙の上の線、面、形象。","紙の上の線、面、形象。","紙の上の線、面、形象。","紙の上の線、面、形象。"],
  "Móviles, escultura, pintura y dibujo.": ["Mòbils, escultura, pintura i dibuix.","Mobiles, sculpture, painting and drawing.","Mobiles, sculpture, peinture et dessin.","悬挂艺术、雕塑、绘画与素描。","モビール、彫刻、絵画、ドローイング。","モビール、彫刻、絵画、ドローイング。","モビール、彫刻、絵画、ドローイング。","モビール、彫刻、絵画、ドローイング。"],
  "Toros, figuras del ruedo y manolas con abanicos.": ["Bous, figures de la plaça i manoles amb ventalls.","Bulls, bullring figures and women with fans.","Taureaux, figures de l’arène et manolas aux éventails.","公牛、斗牛场人物与持扇女子。","闘牛、闘牛場の人物、扇を持つ女性たち。","闘牛、闘牛場の人物、扇を持つ女性たち。","闘牛、闘牛場の人物、扇を持つ女性たち。","闘牛、闘牛場の人物、扇を持つ女性たち。"],
  "Figuras felinas, solas o acompañadas de personajes.": ["Figures felines, soles o acompanyades de personatges.","Feline figures, alone or alongside human figures.","Figures félines, seules ou accompagnées de personnages.","独立或与人物共同出现的猫科形象。","単独または人物とともに描かれた猫の姿。","単独または人物とともに描かれた猫の姿。","単独または人物とともに描かれた猫の姿。","単独または人物とともに描かれた猫の姿。"],
  "Arcas y embarcaciones simbólicas.": ["Arques i embarcacions simbòliques.","Arks and symbolic vessels.","Arches et embarcations symboliques.","方舟与象征性船只。","方舟と象徴的な舟。","方舟と象徴的な舟。","方舟と象徴的な舟。","方舟と象徴的な舟。"],
  "Rostros estilizados y escenas de personajes.": ["Rostres estilitzats i escenes de personatges.","Stylised faces and scenes with figures.","Visages stylisés et scènes de personnages.","风格化面孔与人物场景。","様式化された顔と人物の場面。","様式化された顔と人物の場面。","様式化された顔と人物の場面。","様式化された顔と人物の場面。"],
  "Dragones, figuras a caballo y escenas de iconografía religiosa.": ["Dracs, figures a cavall i escenes d’iconografia religiosa.","Dragons, figures on horseback and religious imagery.","Dragons, figures à cheval et scènes d’iconographie religieuse.","龙、骑马人物与宗教图像场景。","竜、騎馬像、宗教図像の場面。","竜、騎馬像、宗教図像の場面。","竜、騎馬像、宗教図像の場面。","竜、騎馬像、宗教図像の場面。"],
  "Ojos, astros, arquitecturas y composiciones simbólicas.": ["Ulls, astres, arquitectures i composicions simbòliques.","Eyes, celestial bodies, architecture and symbolic compositions.","Yeux, astres, architectures et compositions symboliques.","眼睛、星体、建筑与象征性构图。","目、天体、建築、象徴的なコンポジション。","目、天体、建築、象徴的なコンポジション。","目、天体、建築、象徴的なコンポジション。","目、天体、建築、象徴的なコンポジション。"],
  "Composiciones de planos, curvas y color.": ["Composicions de plans, corbes i color.","Compositions of planes, curves and colour.","Compositions de plans, de courbes et de couleurs.","平面、曲线与色彩的构图。","面、曲線、色彩によるコンポジション。","面、曲線、色彩によるコンポジション。","面、曲線、色彩によるコンポジション。","面、曲線、色彩によるコンポジション。"],
  "Letras y signos como motivo principal de la composición.": ["Lletres i signes com a motiu principal de la composició.","Letters and signs as the central subject.","Lettres et signes comme motif principal de la composition.","以字母与符号为主要主题的构图。","文字と記号を主要モチーフとするコンポジション。","文字と記号を主要モチーフとするコンポジション。","文字と記号を主要モチーフとするコンポジション。","文字と記号を主要モチーフとするコンポジション。"],
  "Retratos de tratamiento figurativo.": ["Retrats de tractament figuratiu.","Figurative portraits.","Portraits de facture figurative.","具象肖像。","具象的な表現による肖像。","具象的な表現による肖像。","具象的な表現による肖像。","具象的な表現による肖像。"],
  "Planos que se pliegan o curvan para construir volúmenes y vacíos.": ["Plans que es pleguen o corben per construir volums i buits.","Planes folded or curved to create volumes and voids.","Plans pliés ou courbés pour construire des volumes et des vides.","通过折叠或弯曲平面构成体积与空隙。","折り曲げられ、あるいは湾曲して立体と空間を形づくる平面。","折り曲げられ、あるいは湾曲して立体と空間を形づくる平面。","折り曲げられ、あるいは湾曲して立体と空間を形づくる平面。","折り曲げられ、あるいは湾曲して立体と空間を形づくる平面。"],
  "Formas compactas, onduladas o procedentes de elementos naturales.": ["Formes compactes, ondulades o procedents d’elements naturals.","Compact, undulating forms or forms derived from natural elements.","Formes compactes, ondulées ou issues d’éléments naturels.","紧凑、起伏或源自自然元素的形态。","凝縮された形態、波打つ形態、あるいは自然の要素に由来する形態。","凝縮された形態、波打つ形態、あるいは自然の要素に由来する形態。","凝縮された形態、波打つ形態、あるいは自然の要素に由来する形態。","凝縮された形態、波打つ形態、あるいは自然の要素に由来する形態。"],
  "Siluetas y líneas recortadas sobre un plano de fondo.": ["Siluetes i línies retallades sobre un pla de fons.","Cut-out silhouettes and lines against a background plane.","Silhouettes et lignes découpées sur un plan de fond.","背景平面上的切割轮廓与线条。","背景の平面上に切り抜かれたシルエットと線。","背景の平面上に切り抜かれたシルエットと線。","背景の平面上に切り抜かれたシルエットと線。","背景の平面上に切り抜かれたシルエットと線。"],
  "Superficies claras con incisiones, huellas y tramas.": ["Superfícies clares amb incisions, empremtes i trames.","Light surfaces with incisions, impressions and patterns.","Surfaces claires avec incisions, empreintes et trames.","带刻痕、印迹和纹理的浅色表面。","刻み目、痕跡、網目模様のある明るい表面。","刻み目、痕跡、網目模様のある明るい表面。","刻み目、痕跡、網目模様のある明るい表面。","刻み目、痕跡、網目模様のある明るい表面。"],
  "Composiciones sobre soporte plano con capas y elementos superpuestos.": ["Composicions sobre suport pla amb capes i elements superposats.","Compositions on flat supports with layers and overlapping elements.","Compositions sur support plat avec couches et éléments superposés.","平面底板上由层次与叠加元素组成的构图。","平面の支持体の上に層や要素を重ねたコンポジション。","平面の支持体の上に層や要素を重ねたコンポジション。","平面の支持体の上に層や要素を重ねたコンポジション。","平面の支持体の上に層や要素を重ねたコンポジション。"],
  "Ejes, retículas, espirales y objetos reunidos en estructuras.": ["Eixos, retícules, espirals i objectes reunits en estructures.","Axes, grids, spirals and objects assembled into structures.","Axes, grilles, spirales et objets réunis en structures.","由轴、网格、螺旋与物件组合而成的结构。","軸、格子、螺旋、オブジェが組み合わされた構造体。","軸、格子、螺旋、オブジェが組み合わされた構造体。","軸、格子、螺旋、オブジェが組み合わされた構造体。","軸、格子、螺旋、オブジェが組み合わされた構造体。"],
  "Obras instaladas en árboles y en el espacio exterior.": ["Obres instal·lades en arbres i a l’espai exterior.","Works installed in trees and outdoor spaces.","Œuvres installées dans les arbres et en extérieur.","安装于树木和户外空间的作品。","樹木や屋外空間に設置された作品。","樹木や屋外空間に設置された作品。","樹木や屋外空間に設置された作品。","樹木や屋外空間に設置された作品。"],
  "Líneas, planos y curvas que construyen volumen sobre el papel.": ["Línies, plans i corbes que construeixen volum sobre el paper.","Lines, planes and curves that build volume on paper.","Lignes, plans et courbes qui construisent le volume sur le papier.","通过线条、平面与曲线在纸上构建体积。","紙の上に立体感を築き上げる線、面、曲線。","紙の上に立体感を築き上げる線、面、曲線。","紙の上に立体感を築き上げる線、面、曲線。","紙の上に立体感を築き上げる線、面、曲線。"],
  "Escultura y móviles": ["Escultura i mòbils","Sculpture and mobiles","Sculpture et mobiles","雕塑与悬挂艺术","彫刻とモビール","彫刻とモビール","彫刻とモビール","彫刻とモビール"],
  "Jardín de las Lagartijas": ["Jardí de les Sargantanes","Garden of the Lizards","Jardin des Lézards","蜥蜴花园","トカゲの庭","トカゲの庭","トカゲの庭","トカゲの庭"],
  "Pintura y dibujo": ["Pintura i dibuix","Painting and drawing","Peinture et dessin","绘画与绘图","絵画とドローイング","絵画とドローイング","絵画とドローイング","絵画とドローイング"],
  "Trayectoria y contacto": ["Trajectòria i contacte","Biography and contact","Parcours et contact","艺术历程与联系","歩みと連絡先","歩みと連絡先","歩みと連絡先","歩みと連絡先"],
  "Arcas de Noé": ["Arques de Noè","Noah’s arks","Arches de Noé","诺亚方舟","ノアの方舟","ノアの方舟","ノアの方舟","ノアの方舟"],
  "Espacio escultórico": ["Espai escultòric","Sculpture garden","Espace sculptural","雕塑空间","彫刻空間","彫刻空間","彫刻空間","彫刻空間"],
  "Toda la pintura": ["Tota la pintura","All paintings","Toutes les peintures","全部绘画","すべての絵画","すべての絵画","すべての絵画","すべての絵画"],
  "Una etapa de la trayectoria artística": ["Una etapa de la trajectòria artística","A chapter in the artistic journey","Une étape du parcours artistique","艺术历程的一个阶段","芸術の歩みにおける一つの章","芸術の歩みにおける一つの章","芸術の歩みにおける一つの章","芸術の歩みにおける一つの章"],
  "Series pictóricas y obras sobre papel.": ["Sèries pictòriques i obres sobre paper.","Painting series and works on paper.","Séries picturales et œuvres sur papier.","绘画系列与纸上作品。","絵画シリーズと紙上作品。","絵画シリーズと紙上作品。","絵画シリーズと紙上作品。","絵画シリーズと紙上作品。"],
  "Escultura · Pintura · Dibujo": ["Escultura · Pintura · Dibuix","Sculpture · Painting · Drawing","Sculpture · Peinture · Dessin","雕塑 · 绘画 · 素描","彫刻 · 絵画 · ドローイング","彫刻 · 絵画 · ドローイング","彫刻 · 絵画 · ドローイング","彫刻 · 絵画 · ドローイング"],
  "Una misma serie, instalada en el jardín de casa y en el Jardín de las Lagartijas.": ["Una mateixa sèrie, instal·lada al jardí de casa i al Jardí de les Sargantanes.","One series, installed in the home garden and the Garden of the Lizards.","Une même série, installée dans le jardin de la maison et le Jardin des Lézards.","同一系列，分别陈列于住宅花园和蜥蜴花园。","自宅の庭と「トカゲの庭」に設置された同一のシリーズ。","自宅の庭と「トカゲの庭」に設置された同一のシリーズ。","自宅の庭と「トカゲの庭」に設置された同一のシリーズ。","自宅の庭と「トカゲの庭」に設置された同一のシリーズ。"],
  "Ver la serie de móviles": ["Veure la sèrie de mòbils","View the mobile series","Voir la série de mobiles","查看悬挂艺术系列","モビールのシリーズを見る","モビールのシリーズを見る","モビールのシリーズを見る","モビールのシリーズを見る"],
  "Volumen, equilibrio y movimiento. La obra escultórica y las piezas suspendidas, reunidas en un mismo recorrido.": ["Volum, equilibri i moviment. L’obra escultòrica i les peces suspeses, reunides en un mateix recorregut.","Volume, balance and movement. Sculptures and suspended works brought together in one collection.","Volume, équilibre et mouvement. Sculptures et pièces suspendues réunies dans un même parcours.","体积、平衡与运动。雕塑与悬挂作品汇集于同一展览路径。","量感、均衡、動き。彫刻作品と吊り下げられた作品を一つの道筋にまとめています。","量感、均衡、動き。彫刻作品と吊り下げられた作品を一つの道筋にまとめています。","量感、均衡、動き。彫刻作品と吊り下げられた作品を一つの道筋にまとめています。","量感、均衡、動き。彫刻作品と吊り下げられた作品を一つの道筋にまとめています。"],
  "Una etapa de la trayectoria artística: obras de participantes, talleres, formación y exposiciones infantiles reunidos en un solo lugar.": ["Una etapa de la trajectòria artística: obres de participants, tallers, formació i exposicions infantils reunits en un sol lloc.","A chapter in the artistic journey: participants’ works, workshops, training and children’s exhibitions gathered in one place.","Une étape du parcours artistique : œuvres des participants, ateliers, formation et expositions enfantines réunis en un seul lieu.","艺术历程的一个阶段：参与者作品、工作坊、培训和儿童艺术展览汇集一处。","芸術の歩みにおける一つの章：参加者の作品、ワークショップ、教員研修、子どもの美術展を一堂に集めています。","芸術の歩みにおける一つの章：参加者の作品、ワークショップ、教員研修、子どもの美術展を一堂に集めています。","芸術の歩みにおける一つの章：参加者の作品、ワークショップ、教員研修、子どもの美術展を一堂に集めています。","芸術の歩みにおける一つの章：参加者の作品、ワークショップ、教員研修、子どもの美術展を一堂に集めています。"],
  "Un proyecto en un terreno rústico donde esculturas, árboles y móviles dialogan con el entorno natural. Se encuentra aproximadamente a un kilómetro del jardín de casa.": ["Un projecte en un terreny rústic on escultures, arbres i mòbils dialoguen amb l’entorn natural. Es troba aproximadament a un quilòmetre del jardí de casa.","A project on rural land where sculptures, trees and mobiles interact with nature. It is approximately one kilometre from the home garden.","Un projet sur un terrain rural où sculptures, arbres et mobiles dialoguent avec la nature. Il se situe à environ un kilomètre du jardin de la maison.","在一片乡村土地上，雕塑、树木与悬挂作品和自然环境相互呼应。这里距住宅花园约一公里。","自然環境の中で彫刻、樹木、モビールが対話する田園地帯のプロジェクト。自宅の庭から約1キロメートルの場所にあります。","自然環境の中で彫刻、樹木、モビールが対話する田園地帯のプロジェクト。自宅の庭から約1キロメートルの場所にあります。","自然環境の中で彫刻、樹木、モビールが対話する田園地帯のプロジェクト。自宅の庭から約1キロメートルの場所にあります。","自然環境の中で彫刻、樹木、モビールが対話する田園地帯のプロジェクト。自宅の庭から約1キロメートルの場所にあります。"],
  "Los móviles de tarjetas recicladas forman una misma serie artística, aunque se instalen en los dos espacios. Este recorrido reúne el archivo del entorno y las esculturas suspendidas, sin convertir sus distintas vistas en obras diferentes.": ["Els mòbils de targetes reciclades formen una mateixa sèrie artística, encara que s’instal·len als dos espais. Aquest recorregut reuneix l’arxiu de l’entorn i les escultures suspeses, sense convertir les diferents vistes en obres diferents.","The mobiles made from recycled cards form a single artistic series, installed across both spaces. This collection brings together photographs of the surroundings and suspended sculptures; different views do not represent separate works.","Les mobiles en cartes recyclées constituent une même série artistique, installée dans les deux espaces. Ce parcours réunit les photographies de l’environnement et les sculptures suspendues, sans présenter leurs différentes vues comme des œuvres distinctes.","再生卡片制作的悬挂作品虽安装在两处空间，却属于同一艺术系列。本展览汇集环境和悬挂雕塑的影像，不将同一作品的不同视角视为不同作品。","再生カードで作られたモビールは、二つの空間に設置されていても一つの芸術シリーズをなしています。このセクションでは、異なる角度からの写真を別の作品として扱うことなく、周囲の風景のアーカイブと吊り下げられた彫刻をまとめています。","再生カードで作られたモビールは、二つの空間に設置されていても一つの芸術シリーズをなしています。このセクションでは、異なる角度からの写真を別の作品として扱うことなく、周囲の風景のアーカイブと吊り下げられた彫刻をまとめています。","再生カードで作られたモビールは、二つの空間に設置されていても一つの芸術シリーズをなしています。このセクションでは、異なる角度からの写真を別の作品として扱うことなく、周囲の風景のアーカイブと吊り下げられた彫刻をまとめています。","再生カードで作られたモビールは、二つの空間に設置されていても一つの芸術シリーズをなしています。このセクションでは、異なる角度からの写真を別の作品として扱うことなく、周囲の風景のアーカイブと吊り下げられた彫刻をまとめています。"],
  "Una misma serie de esculturas suspendidas, presente en el jardín de casa y en el Jardín de las Lagartijas. Equilibrio, color y materiales recuperados en diálogo con el aire.": ["Una mateixa sèrie d’escultures suspeses, present al jardí de casa i al Jardí de les Sargantanes. Equilibri, color i materials recuperats en diàleg amb l’aire.","One series of suspended sculptures, displayed in the home garden and the Garden of the Lizards. Balance, colour and reclaimed materials in dialogue with the air.","Une même série de sculptures suspendues, présente dans le jardin de la maison et le Jardin des Lézards. Équilibre, couleur et matériaux récupérés dialoguent avec l’air.","同一悬挂雕塑系列，分别陈列于住宅花园和蜥蜴花园。平衡、色彩与再利用材料和空气相互呼应。","自宅の庭と「トカゲの庭」に展示された、吊り下げられた彫刻の同一シリーズ。均衡、色彩、そして再生素材が空気と対話します。","自宅の庭と「トカゲの庭」に展示された、吊り下げられた彫刻の同一シリーズ。均衡、色彩、そして再生素材が空気と対話します。","自宅の庭と「トカゲの庭」に展示された、吊り下げられた彫刻の同一シリーズ。均衡、色彩、そして再生素材が空気と対話します。","自宅の庭と「トカゲの庭」に展示された、吊り下げられた彫刻の同一シリーズ。均衡、色彩、そして再生素材が空気と対話します。"],
  "Idioma": ["Idioma","Language","Langue","语言","言語","言語","言語","言語"],
  "Menú": ["Menú","Menu","Menu","菜单","メニュー","メニュー","メニュー","メニュー"],
  "Navegación principal": ["Navegació principal","Main navigation","Navigation principale","主导航","メインナビゲーション","メインナビゲーション","メインナビゲーション","メインナビゲーション"],
  "SEGARRA Y GARIBO, inicio": ["SEGARRA Y GARIBO, inici","SEGARRA Y GARIBO, home","SEGARRA Y GARIBO, accueil","SEGARRA Y GARIBO，首页","SEGARRA Y GARIBO、ホーム","SEGARRA Y GARIBO、ホーム","SEGARRA Y GARIBO、ホーム","SEGARRA Y GARIBO、ホーム"],
  "ENRIC SEGARRA I GARIBO, inicio": ["ENRIC SEGARRA I GARIBO, inici","ENRIC SEGARRA I GARIBO, home","ENRIC SEGARRA I GARIBO, accueil","ENRIC SEGARRA I GARIBO，首页","ENRIC SEGARRA I GARIBO、ホーム","ENRIC SEGARRA I GARIBO、ホーム","ENRIC SEGARRA I GARIBO、ホーム","ENRIC SEGARRA I GARIBO、ホーム"],
  "07 apartados": ["07 apartats","07 sections","07 sections","07 个部分","07 セクション","07 セクション","07 セクション","07 セクション"],
  "Archivo de muestras": ["Arxiu de mostres","Exhibition archive","Archives d’expositions","展览档案","展覧会アーカイブ","展覧会アーカイブ","展覧会アーカイブ","展覧会アーカイブ"],
  "Perfil y práctica": ["Perfil i pràctica","Profile and practice","Profil et pratique","简介与实践","プロフィールと実践","プロフィールと実践","プロフィールと実践","プロフィールと実践"],
  "Información profesional": ["Informació professional","Professional information","Informations professionnelles","专业信息","専門情報","専門情報","専門情報","専門情報"],
  "Obra y memoria": ["Obra i memòria","Works and memory","Œuvre et mémoire","作品与记忆","作品と記憶","作品と記憶","作品と記憶","作品と記憶"],
  "Inicio": ["Inici","Home","Accueil","首页","ホーム","ホーム","ホーム","ホーム"],
  "Obra": ["Obra","Works","Œuvre","作品","作品","作品","作品","作品"],
  "Arte infantil": ["Art infantil","Children's art","Art enfantin","儿童艺术","子どもの美術","子どもの美術","子どもの美術","子どもの美術"],
  "Exposiciones": ["Exposicions","Exhibitions","Expositions","展览","展覧会","展覧会","展覧会","展覧会"],
  "Trayectoria": ["Trajectòria","Journey","Parcours","艺术历程","歩み","歩み","歩み","歩み"],
  "Archivo visual": ["Arxiu visual","Visual archive","Archives visuelles","视觉档案","ビジュアルアーカイブ","ビジュアルアーカイブ","ビジュアルアーカイブ","ビジュアルアーカイブ"],
  "Artista": ["Artista","Artist","Artiste","艺术家","アーティスト","アーティスト","アーティスト","アーティスト"],
  "Contacto": ["Contacte","Contact","Contact","联系","連絡先","連絡先","連絡先","連絡先"],
  "OBRA Y MEMORIA": ["OBRA I MEMÒRIA","WORK AND MEMORY","ŒUVRE ET MÉMOIRE","作品与记忆","作品と記憶","作品と記憶","作品と記憶","作品と記憶"],
  "Saltar al contenido": ["Salta al contingut","Skip to content","Aller au contenu","跳转到内容","コンテンツへスキップ","コンテンツへスキップ","コンテンツへスキップ","コンテンツへスキップ"],
  "Obra, presente y memoria.": ["Obra, present i memòria.","Works, present and memory.","Œuvre, présent et mémoire.","作品、当下与记忆。","作品、現在、そして記憶。","作品、現在、そして記憶。","作品、現在、そして記憶。","作品、現在、そして記憶。"],
  "Una historia que sigue creciendo": ["Una història que continua creixent","A story that keeps growing","Une histoire qui continue de grandir","一段不断生长的故事","成長し続ける物語","成長し続ける物語","成長し続ける物語","成長し続ける物語"],
  "Selección en desarrollo · Archivo familiar": ["Selecció en desenvolupament · Arxiu familiar","Selection in progress · Family archive","Sélection en cours · Archives familiales","持续整理中 · 家庭档案","選定進行中 · ファミリーアーカイブ","選定進行中 · ファミリーアーカイブ","選定進行中 · ファミリーアーカイブ","選定進行中 · ファミリーアーカイブ"],
  "Cerrar imagen": ["Tanca la imatge","Close image","Fermer l’image","关闭图片","画像を閉じる","画像を閉じる","画像を閉じる","画像を閉じる"],
  "Fotografía anterior": ["Fotografia anterior","Previous photograph","Photographie précédente","上一张照片","前の写真","前の写真","前の写真","前の写真"],
  "Fotografía siguiente": ["Fotografia següent","Next photograph","Photographie suivante","下一张照片","次の写真","次の写真","次の写真","次の写真"],
  "Ruta": ["Ruta","Breadcrumb","Fil d’Ariane","路径","パンくずリスト","パンくずリスト","パンくずリスト","パンくずリスト"],
  "Ver todo": ["Veure-ho tot","View all","Voir tout","查看全部","すべて見る","すべて見る","すべて見る","すべて見る"],
  "Obra propia": ["Obra pròpia","Own work","Œuvre personnelle","个人作品","自身の作品","自身の作品","自身の作品","自身の作品"],
  "Muestra colectiva": ["Mostra col·lectiva","Group exhibition","Exposition collective","群展","グループ展","グループ展","グループ展","グループ展"],
  "Colectiva": ["Col·lectiva","Group show","Collective","集体展览","グループ展","グループ展","グループ展","グループ展"],
  "Formación docente": ["Formació docent","Teacher training","Formation des enseignants","教师培训","教員研修","教員研修","教員研修","教員研修"],
  "Formación de adultos": ["Formació d’adults","Adult education","Formation des adultes","成人教育","成人教育","成人教育","成人教育","成人教育"],
  "Archivo de sala": ["Arxiu de sala","Gallery archive","Archives de salle","展厅档案","展示室アーカイブ","展示室アーカイブ","展示室アーカイブ","展示室アーカイブ"],
  "Exposición": ["Exposició","Exhibition","Exposition","展览","展覧会","展覧会","展覧会","展覧会"],
  "Recorrer el archivo": ["Recórrer l’arxiu","Explore the archive","Parcourir les archives","浏览档案","アーカイブを巡る","アーカイブを巡る","アーカイブを巡る","アーカイブを巡る"],
  "Obra destacada": ["Obra destacada","Featured work","Œuvre à la une","精选作品","注目の作品","注目の作品","注目の作品","注目の作品"],
  "Archivo vivo · 1959 — presente": ["Arxiu viu · 1959 — present","Living archive · 1959 — present","Archives vivantes · 1959 — aujourd’hui","活档案 · 1959 — 至今","生きたアーカイブ · 1959年 — 現在","生きたアーカイブ · 1959年 — 現在","生きたアーカイブ · 1959年 — 現在","生きたアーカイブ · 1959年 — 現在"],
  "Escultura, pintura, dibujo y educación artística.": ["Escultura, pintura, dibuix i educació artística.","Sculpture, painting, drawing and art education.","Sculpture, peinture, dessin et éducation artistique.","雕塑、绘画、绘图与艺术教育。","彫刻、絵画、ドローイング、美術教育。","彫刻、絵画、ドローイング、美術教育。","彫刻、絵画、ドローイング、美術教育。","彫刻、絵画、ドローイング、美術教育。"],
  "Una obra hecha de formas, materiales, color y curiosidad. Un archivo familiar para mirar, recordar y seguir descubriendo.": ["Una obra feta de formes, materials, color i curiositat. Un arxiu familiar per mirar, recordar i continuar descobrint.","A body of work made of forms, materials, colour and curiosity. A family archive to look at, remember and keep discovering.","Une œuvre faite de formes, de matières, de couleurs et de curiosité. Des archives familiales à regarder, à se rappeler et à continuer de découvrir.","一组由形态、材料、色彩与好奇心构成的作品。一个可以观看、回忆并不断发现的家庭档案。","形、素材、色彩、そして好奇心から生まれた作品群。見つめ、記憶し、発見し続けるためのファミリーアーカイブ。","形、素材、色彩、そして好奇心から生まれた作品群。見つめ、記憶し、発見し続けるためのファミリーアーカイブ。","形、素材、色彩、そして好奇心から生まれた作品群。見つめ、記憶し、発見し続けるためのファミリーアーカイブ。","形、素材、色彩、そして好奇心から生まれた作品群。見つめ、記憶し、発見し続けるためのファミリーアーカイブ。"],
  "Explorar la obra": ["Explorar l’obra","Explore the work","Explorer l’œuvre","探索作品","作品を探索する","作品を探索する","作品を探索する","作品を探索する"],
  "Conocer al artista": ["Conèixer l’artista","Meet the artist","Découvrir l’artiste","了解艺术家","アーティストを知る","アーティストを知る","アーティストを知る","アーティストを知る"],
  "Entrar en el archivo": ["Entrar a l’arxiu","Enter the archive","Entrer dans les archives","进入档案","アーカイブに入る","アーカイブに入る","アーカイブに入る","アーカイブに入る"],
  "Obra propia, muestras colectivas y educación.": ["Obra pròpia, mostres col·lectives i educació.","Own work, group exhibitions and education.","Œuvre personnelle, expositions collectives et éducation.","个人作品、群展与教育。","自身の作品、グループ展、教育活動。","自身の作品、グループ展、教育活動。","自身の作品、グループ展、教育活動。","自身の作品、グループ展、教育活動。"],
  "La obra, por dentro": ["L’obra, per dins","Inside the work","L’œuvre, de l’intérieur","作品的内部","作品の内側","作品の内側","作品の内側","作品の内側"],
  "Cuatro maneras de construir una imagen.": ["Quatre maneres de construir una imatge.","Four ways of building an image.","Quatre façons de construire une image.","构成一幅图像的四种方式。","イメージを構築する4つの方法。","イメージを構築する4つの方法。","イメージを構築する4つの方法。","イメージを構築する4つの方法。"],
  "Ver todo el catálogo": ["Veure tot el catàleg","View the full catalogue","Voir tout le catalogue","查看完整目录","カタログをすべて見る","カタログをすべて見る","カタログをすべて見る","カタログをすべて見る"],
  "Todas las imágenes,": ["Totes les imatges,","Every image,","Toutes les images,","所有图像，","すべての画像、","すべての画像、","すべての画像、","すべての画像、"],
  "muchas formas de mirar.": ["moltes maneres de mirar.","many ways of looking.","de nombreuses façons de regarder.","多种观看方式。","多様なまなざし。","多様なまなざし。","多様なまなざし。","多様なまなざし。"],
  "Busca una pieza, recorre una exposición o reúne las imágenes de un taller. Cada fotografía conserva el acceso a su contexto.": ["Busca una peça, recorre una exposició o reuneix les imatges d’un taller. Cada fotografia conserva l’accés al seu context.","Find a piece, explore an exhibition or gather images from a workshop. Every photograph keeps a path back to its context.","Trouvez une pièce, parcourez une exposition ou réunissez les images d’un atelier. Chaque photographie conserve l’accès à son contexte.","查找一件作品、浏览展览或汇集工作坊图像。每张照片都保留通往其背景的路径。","作品を探し、展覧会を巡り、ワークショップの画像を集める。すべての写真からその背景へと辿ることができます。","作品を探し、展覧会を巡り、ワークショップの画像を集める。すべての写真からその背景へと辿ることができます。","作品を探し、展覧会を巡り、ワークショップの画像を集める。すべての写真からその背景へと辿ることができます。","作品を探し、展覧会を巡り、ワークショップの画像を集める。すべての写真からその背景へと辿ることができます。"],
  "Abrir el archivo de imágenes": ["Obrir l’arxiu d’imatges","Open the image archive","Ouvrir les archives d’images","打开图像档案","画像アーカイブを開く","画像アーカイブを開く","画像アーカイブを開く","画像アーカイブを開く"],
  "Catálogo de obra": ["Catàleg d’obra","Works catalogue","Catalogue des œuvres","作品目录","作品カタログ","作品カタログ","作品カタログ","作品カタログ"],
  "Móviles, escultura, pintura y dibujo. Un catálogo organizado por familias de obras, con distintas vistas reunidas en cada ficha.": ["Mòbils, escultura, pintura i dibuix. Un catàleg organitzat per famílies d’obres, amb diverses vistes reunides a cada fitxa.","Mobiles, sculpture, painting and drawing. A catalogue organised by families of works, with different views gathered in each record.","Mobiles, sculpture, peinture et dessin. Un catalogue organisé par familles d’œuvres, avec plusieurs vues réunies dans chaque fiche.","悬挂装置、雕塑、绘画与绘图。按作品家族整理的目录，每个条目汇集不同视角。","モビール、彫刻、絵画、ドローイング。作品群ごとに整理され、各項目に複数の角度からの写真を収めたカタログ。","モビール、彫刻、絵画、ドローイング。作品群ごとに整理され、各項目に複数の角度からの写真を収めたカタログ。","モビール、彫刻、絵画、ドローイング。作品群ごとに整理され、各項目に複数の角度からの写真を収めたカタログ。","モビール、彫刻、絵画、ドローイング。作品群ごとに整理され、各項目に複数の角度からの写真を収めたカタログ。"],
  "Equilibrio, color y movimiento. Piezas suspendidas que cambian con el aire, la luz y el lugar que las acoge.": ["Equilibri, color i moviment. Peces suspeses que canvien amb l’aire, la llum i el lloc que les acull.","Balance, colour and movement. Suspended pieces that change with air, light and the place that hosts them.","Équilibre, couleur et mouvement. Des pièces suspendues qui changent avec l’air, la lumière et le lieu qui les accueille.","平衡、色彩与运动。悬挂的作品随着空气、光线与空间而变化。","均衡、色彩、動き。空気や光、そして迎え入れる場所とともに変化する吊り下げられた作品。","均衡、色彩、動き。空気や光、そして迎え入れる場所とともに変化する吊り下げられた作品。","均衡、色彩、動き。空気や光、そして迎え入れる場所とともに変化する吊り下げられた作品。","均衡、色彩、動き。空気や光、そして迎え入れる場所とともに変化する吊り下げられた作品。"],
  "El volumen como punto de partida. Tallas, ensamblajes, relieves y construcciones presentes en el archivo.": ["El volum com a punt de partida. Talles, assemblatges, relleus i construccions presents a l’arxiu.","Volume as a starting point. Carvings, assemblages, reliefs and constructions in the archive.","Le volume comme point de départ. Tailles, assemblages, reliefs et constructions présentes dans les archives.","以体积为起点。档案中的雕刻、组装、浮雕与构造。","出発点としての立体。アーカイブに収められた彫像、アサンブラージュ、レリーフ、構造体。","出発点としての立体。アーカイブに収められた彫像、アサンブラージュ、レリーフ、構造体。","出発点としての立体。アーカイブに収められた彫像、アサンブラージュ、レリーフ、構造体。","出発点としての立体。アーカイブに収められた彫像、アサンブラージュ、レリーフ、構造体。"],
  "Animales, personajes y mundos imaginados. Un recorrido por las distintas familias del archivo de pintura.": ["Animals, personatges i mons imaginats. Un recorregut per les diferents famílies de l’arxiu de pintura.","Animals, characters and imagined worlds. A journey through the different families in the painting archive.","Animaux, personnages et mondes imaginés. Un parcours parmi les différentes familles des archives de peinture.","动物、人物与想象的世界。穿行于绘画档案的不同家族。","動物、人物、想像の世界。絵画アーカイブのさまざまな作品群を巡る。","動物、人物、想像の世界。絵画アーカイブのさまざまな作品群を巡る。","動物、人物、想像の世界。絵画アーカイブのさまざまな作品群を巡る。","動物、人物、想像の世界。絵画アーカイブのさまざまな作品群を巡る。"],
  "Líneas, manchas y formas que construyen el espacio sobre el papel.": ["Línies, taques i formes que construeixen l’espai sobre el paper.","Lines, marks and forms that build space on paper.","Lignes, taches et formes qui construisent l’espace sur le papier.","在纸上构成空间的线条、色块与形态。","紙の上に空間を構築する線、色彩の斑点、形態。","紙の上に空間を構築する線、色彩の斑点、形態。","紙の上に空間を構築する線、色彩の斑点、形態。","紙の上に空間を構築する線、色彩の斑点、形態。"],
  "Disciplinas": ["Disciplines","Disciplines","Disciplines","类别","分野","分野","分野","分野"],
  "Toda la obra": ["Tota l’obra","All works","Toute l’œuvre","全部作品","すべての作品","すべての作品","すべての作品","すべての作品"],
  "Móviles": ["Mòbils","Mobiles","Mobiles","悬挂装置","モビール","モビール","モビール","モビール"],
  "Escultura": ["Escultura","Sculpture","Sculpture","雕塑","彫刻","彫刻","彫刻","彫刻"],
  "Pintura": ["Pintura","Painting","Peinture","绘画","絵画","絵画","絵画","絵画"],
  "Dibujo": ["Dibuix","Drawing","Dessin","绘图","ドローイング","ドローイング","ドローイング","ドローイング"],
  "Obras infantiles": ["Obres infantils","Children’s works","Œuvres enfantines","儿童作品","子どもの作品","子どもの作品","子どもの作品","子どもの作品"],
  "Talleres": ["Tallers","Workshops","Ateliers","工作坊","ワークショップ","ワークショップ","ワークショップ","ワークショップ"],
  "Buscar obras": ["Cerca obres","Search works","Rechercher des œuvres","搜索作品","作品を検索","作品を検索","作品を検索","作品を検索"],
  "Buscar título, familia o referencia": ["Cerca títol, família o referència","Search title, family or reference","Rechercher un titre, une famille ou une référence","搜索标题、家族或编号","タイトル、シリーズ、参照番号を検索","タイトル、シリーズ、参照番号を検索","タイトル、シリーズ、参照番号を検索","タイトル、シリーズ、参照番号を検索"],
  "Familia": ["Família","Family","Famille","家族","シリーズ","シリーズ","シリーズ","シリーズ"],
  "Todas las familias": ["Totes les famílies","All families","Toutes les familles","所有家族","すべてのシリーズ","すべてのシリーズ","すべてのシリーズ","すべてのシリーズ"],
  "Presentación": ["Presentació","View","Présentation","显示方式","表示形式","表示形式","表示形式","表示形式"],
  "Cuadrícula": ["Quadrícula","Grid","Grille","网格","グリッド","グリッド","グリッド","グリッド"],
  "Recorrido ↓": ["Recorregut ↓","Walkthrough ↓","Parcours ↓","浏览 ↓","一覧 ↓","一覧 ↓","一覧 ↓","一覧 ↓"],
  "Nombres descriptivos provisionales": ["Noms descriptius provisionals","Provisional descriptive names","Noms descriptifs provisoires","临时描述性名称","暫定的な記述名","暫定的な記述名","暫定的な記述名","暫定的な記述名"],
  "Ver más obras": ["Veure més obres","View more works","Voir plus d’œuvres","查看更多作品","さらに作品を見る","さらに作品を見る","さらに作品を見る","さらに作品を見る"],
  "No hay obras con esa búsqueda.": ["No hi ha obres amb aquesta cerca.","No works match that search.","Aucune œuvre ne correspond à cette recherche.","没有找到符合搜索条件的作品。","検索条件に一致する作品はありません。","検索条件に一致する作品はありません。","検索条件に一致する作品はありません。","検索条件に一致する作品はありません。"],
  "Restablecer filtros": ["Restablir filtres","Reset filters","Réinitialiser les filtres","重置筛选","フィルターをリセット","フィルターをリセット","フィルターをリセット","フィルターをリセット"],
  "Ver la obra": ["Veure l’obra","View the work","Voir l’œuvre","查看作品","作品を見る","作品を見る","作品を見る","作品を見る"],
  "Ampliar fotografía": ["Ampliar fotografia","Enlarge photograph","Agrandir la photographie","放大照片","写真を拡大","写真を拡大","写真を拡大","写真を拡大"],
  "Ampliar": ["Ampliar","Enlarge","Agrandir","放大","拡大","拡大","拡大","拡大"],
  "Ver perspectiva": ["Veure perspectiva","View perspective","Voir la perspective","查看视角","別角度を見る","別角度を見る","別角度を見る","別角度を見る"],
  "Autor": ["Autor","Artist","Auteur","作者","作者","作者","作者","作者"],
  "Identificación": ["Identificació","Identification","Identification","识别信息","識別情報","識別情報","識別情報","識別情報"],
  "Descripción provisional": ["Descripció provisional","Provisional description","Description provisoire","临时描述","暫定的な記述","暫定的な記述","暫定的な記述","暫定的な記述"],
  "Título original, fecha, materiales y medidas por documentar.": ["Títol original, data, materials i mides pendents de documentar.","Original title, date, materials and measurements to be documented.","Titre original, date, matériaux et dimensions à documenter.","原题、日期、材料与尺寸待记录。","原題、制作年、素材、寸法は記録確認中です。","原題、制作年、素材、寸法は記録確認中です。","原題、制作年、素材、寸法は記録確認中です。","原題、制作年、素材、寸法は記録確認中です。"],
  "Continuar por esta familia": ["Continuar per aquesta família","Continue through this family","Continuer dans cette famille","继续浏览此家族","このシリーズを続けて見る","このシリーズを続けて見る","このシリーズを続けて見る","このシリーズを続けて見る"],
  "En relación": ["En relació","Related works","En relation","相关作品","関連する作品","関連する作品","関連する作品","関連する作品"],
  "Lugar": ["Lloc","Place","Lieu","地点","場所","場所","場所","場所"],
  "Abrir con filtros": ["Obrir amb filtres","Open with filters","Ouvrir avec les filtres","打开筛选","フィルター付きで開く","フィルター付きで開く","フィルター付きで開く","フィルター付きで開く"],
  "Seguir viendo": ["Continuar veient","Keep viewing","Continuer à regarder","继续查看","さらに見る","さらに見る","さらに見る","さらに見る"],
  "Documentación": ["Documentació","Documentation","Documentation","文档","資料・記録","資料・記録","資料・記録","資料・記録"],
  "Volver a": ["Tornar a","Back to","Retour à","返回","戻る：","戻る：","戻る：","戻る："],
  "Educación artística": ["Educació artística","Art education","Éducation artistique","艺术教育","美術教育","美術教育","美術教育","美術教育"],
  "Todas": ["Totes","All","Toutes","全部","すべて","すべて","すべて","すべて"],
  "Explorar": ["Explorar","Explore","Explorer","探索","探索する","探索する","探索する","探索する"],
  "lecturas": ["lectures","readings","lectures","篇阅读","件の読み物","件の読み物","件の読み物","件の読み物"],
  "fotografías": ["fotografies","photographs","photographies","张照片","枚の写真","枚の写真","枚の写真","枚の写真"],
  "imágenes": ["imatges","images","images","张图像","枚の画像","枚の画像","枚の画像","枚の画像"],
  "obras": ["obres","works","œuvres","件作品","点の作品","点の作品","点の作品","点の作品"],
  "colecciones": ["col·leccions","collections","collections","个收藏","件のコレクション","件のコレクション","件のコレクション","件のコレクション"],
  "álbumes": ["àlbums","albums","albums","个相册","件のアルバム","件のアルバム","件のアルバム","件のアルバム"],
  "entradas": ["entrades","entries","entrées","条记录","件の項目","件の項目","件の項目","件の項目"],
  "fichas": ["fitxes","records","fiches","条目","件の項目","件の項目","件の項目","件の項目"],
  "vistas": ["vistes","views","vues","个视角","カット","カット","カット","カット"],
  "de": ["de","of","de","共","/","/","/","/"],
  "Recorre la lista para cambiar de imagen": ["Recorre la llista per canviar d’imatge","Scroll the list to change the image","Parcourez la liste pour changer d’image","滚动列表切换图像","リストをスクロールして画像を切り替え","リストをスクロールして画像を切り替え","リストをスクロールして画像を切り替え","リストをスクロールして画像を切り替え"],
  "exposiciones": ["exposicions","exhibitions","expositions","场展览","件の展覧会","件の展覧会","件の展覧会","件の展覧会"],
  "Fotografías y documentos": ["Fotografies i documents","Photographs and documents","Photographies et documents","照片与文档","写真と資料","写真と資料","写真と資料","写真と資料"],
  "Todas las fotografías incorporadas a la web. Obras, perspectivas, exposiciones y actividades, con acceso a la ficha o al álbum de cada imagen.": ["Totes les fotografies incorporades a la web. Obres, perspectives, exposicions i activitats, amb accés a la fitxa o a l’àlbum de cada imatge.","All photographs included on the site. Works, perspectives, exhibitions and activities, with access to each image’s record or album.","Toutes les photographies intégrées au site. Œuvres, perspectives, expositions et activités, avec accès à la fiche ou à l’album de chaque image.","网站收录的全部照片。作品、视角、展览与活动，每张图像都可进入对应条目或相册。","ウェブサイトに収録されたすべての写真。作品、別カット、展覧会、教育活動など、各画像の項目やアルバムへアクセスできます。","ウェブサイトに収録されたすべての写真。作品、別カット、展覧会、教育活動など、各画像の項目やアルバムへアクセスできます。","ウェブサイトに収録されたすべての写真。作品、別カット、展覧会、教育活動など、各画像の項目やアルバムへアクセスできます。","ウェブサイトに収録されたすべての写真。作品、別カット、展覧会、教育活動など、各画像の項目やアルバムへアクセスできます。"],
  "Título, lugar, año, archivo o referencia": ["Títol, lloc, any, arxiu o referència","Title, place, year, archive or reference","Titre, lieu, année, archive ou référence","标题、地点、年份、档案或编号","タイトル、場所、年、アーカイブ、参照番号","タイトル、場所、年、アーカイブ、参照番号","タイトル、場所、年、アーカイブ、参照番号","タイトル、場所、年、アーカイブ、参照番号"],
  "Todos los ámbitos": ["Tots els àmbits","All areas","Tous les domaines","所有范围","すべての領域","すべての領域","すべての領域","すべての領域"],
  "Todas las disciplinas": ["Totes les disciplines","All disciplines","Toutes les disciplines","所有类别","すべての分野","すべての分野","すべての分野","すべての分野"],
  "Todas las colecciones": ["Totes les col·leccions","All collections","Toutes les collections","所有收藏","すべてのコレクション","すべてのコレクション","すべてのコレクション","すべてのコレクション"],
  "Quitar filtros ×": ["Treure filtres ×","Clear filters ×","Supprimer les filtres ×","清除筛选 ×","フィルターを解除 ×","フィルターを解除 ×","フィルターを解除 ×","フィルターを解除 ×"],
  "Una imagen puede pertenecer a varios recorridos": ["Una imatge pot pertànyer a diversos recorreguts","An image can belong to several paths","Une image peut appartenir à plusieurs parcours","一张图像可以属于多个浏览路径","1枚の画像が複数のセクションに属する場合があります","1枚の画像が複数のセクションに属する場合があります","1枚の画像が複数のセクションに属する場合があります","1枚の画像が複数のセクションに属する場合があります"],
  "No hay imágenes con esos filtros.": ["No hi ha imatges amb aquests filtres.","No images match those filters.","Aucune image ne correspond à ces filtres.","没有符合这些筛选条件的图像。","フィルター条件に一致する画像はありません。","フィルター条件に一致する画像はありません。","フィルター条件に一致する画像はありません。","フィルター条件に一致する画像はありません。"],
  "Tipo de exposición": ["Tipus d’exposició","Exhibition type","Type d’exposition","展览类型","展覧会の種類","展覧会の種類","展覧会の種類","展覧会の種類"],
  "Encuentros con el público": ["Trobades amb el públic","Encounters with the public","Rencontres avec le public","与公众相遇","観客との出会い","観客との出会い","観客との出会い","観客との出会い"],
  "La obra en las salas y la memoria de los encuentros. Montajes, vistas del espacio y documentos, organizados por el contexto de cada exposición.": ["L’obra a les sales i la memòria de les trobades. Muntatges, vistes de l’espai i documents, organitzats pel context de cada exposició.","Works in exhibition spaces and the record of these encounters. Installations, views of the space and documents, organised by the context of each exhibition.","L’œuvre dans les salles et la mémoire des rencontres. Installations, vues de l’espace et documents, organisés selon le contexte de chaque exposition.","展厅中的作品与相遇的记忆。布展、空间视图和文献资料，均按每场展览的背景整理。","展示室における作品と出会いの記憶。各展覧会の文脈に沿って整理された展示風景、空間の記録、資料。","展示室における作品と出会いの記憶。各展覧会の文脈に沿って整理された展示風景、空間の記録、資料。","展示室における作品と出会いの記憶。各展覧会の文脈に沿って整理された展示風景、空間の記録、資料。","展示室における作品と出会いの記憶。各展覧会の文脈に沿って整理された展示風景、空間の記録、資料。"],
  "Ver todas las fotografías": ["Veure totes les fotografies","View all photographs","Voir toutes les photographies","查看所有照片","すべての写真を見る","すべての写真を見る","すべての写真を見る","すべての写真を見る"],
  "Buscar exposición, lugar o año": ["Cerca exposició, lloc o any","Search exhibition, place or year","Rechercher une exposition, un lieu ou une année","搜索展览、地点或年份","展覧会、場所、年を検索","展覧会、場所、年を検索","展覧会、場所、年を検索","展覧会、場所、年を検索"],
  "Buscar exposición": ["Cerca exposició","Search exhibition","Rechercher une exposition","搜索展览","展覧会を検索","展覧会を検索","展覧会を検索","展覧会を検索"],
  "Mosaico": ["Mosaic","Mosaic","Mosaïque","拼贴","モザイク","モザイク","モザイク","モザイク"],
  "Vista amplia": ["Vista àmplia","Wide view","Vue large","宽幅视图","ワイド表示","ワイド表示","ワイド表示","ワイド表示"],
  "No hay exposiciones con esa búsqueda.": ["No hi ha exposicions amb aquesta cerca.","No exhibitions match that search.","Aucune exposition ne correspond à cette recherche.","没有找到符合搜索条件的展览。","検索条件に一致する展覧会はありません。","検索条件に一致する展覧会はありません。","検索条件に一致する展覧会はありません。","検索条件に一致する展覧会はありません。"],
  "Las fechas documentadas se indican en cada archivo. Las muestras colectivas conservan diferenciadas las obras de sus participantes.": ["Les dates documentades s’indiquen a cada arxiu. Les mostres col·lectives mantenen diferenciades les obres dels seus participants.","Documented dates are given in each archive. Group exhibitions keep participants’ works distinct.","Les dates documentées sont indiquées dans chaque archive. Les expositions collectives distinguent les œuvres de leurs participants.","每份档案标注有文献依据的日期。群展中参与者的作品保持区分。","記録が確認された日付は各アーカイブに記載されています。グループ展では参加者の作品が区別して保存されています。","記録が確認された日付は各アーカイブに記載されています。グループ展では参加者の作品が区別して保存されています。","記録が確認された日付は各アーカイブに記載されています。グループ展では参加者の作品が区別して保存されています。","記録が確認された日付は各アーカイブに記載されています。グループ展では参加者の作品が区別して保存されています。"],
  "Vida y obra": ["Vida i obra","Life and work","Vie et œuvre","生平与作品","生涯と作品","生涯と作品","生涯と作品","生涯と作品"],
  "Índice del archivo": ["Índex de l’arxiu","Archive index","Index des archives","档案索引","アーカイブ索引","アーカイブ索引","アーカイブ索引","アーカイブ索引"],
  "Capítulos y álbumes de la memoria artística.": ["Capítols i àlbums de la memòria artística.","Chapters and albums from the artistic record.","Chapitres et albums de la mémoire artistique.","艺术记忆的章节与相册。","芸術の記憶を辿る章とアルバム。","芸術の記憶を辿る章とアルバム。","芸術の記憶を辿る章とアルバム。","芸術の記憶を辿る章とアルバム。"],
  "Abrir todas las fotografías con filtros": ["Obrir totes les fotografies amb filtres","Open all photographs with filters","Ouvrir toutes les photographies avec les filtres","打开全部照片并筛选","すべての写真をフィルター付きで開く","すべての写真をフィルター付きで開く","すべての写真をフィルター付きで開く","すべての写真をフィルター付きで開く"],
  "Buscar una etapa o un año": ["Cerca una etapa o un any","Search a period or year","Rechercher une étape ou une année","搜索阶段或年份","時期または年を検索","時期または年を検索","時期または年を検索","時期または年を検索"],
  "Buscar en la trayectoria": ["Cerca en la trajectòria","Search the journey","Rechercher dans le parcours","搜索艺术历程","歩みを検索","歩みを検索","歩みを検索","歩みを検索"],
  "Etapa anterior": ["Etapa anterior","Previous stage","Étape précédente","上一阶段","前の時期","前の時期","前の時期","前の時期"],
  "Etapa siguiente": ["Etapa següent","Next stage","Étape suivante","下一阶段","次の時期","次の時期","次の時期","次の時期"],
  "Etapas y acontecimientos": ["Etapes i esdeveniments","Stages and events","Étapes et événements","阶段与事件","時期と出来事","時期と出来事","時期と出来事","時期と出来事"],
  "No hay entradas con esa búsqueda. Prueba otro año, lugar o tema.": ["No hi ha entrades amb aquesta cerca. Prova un altre any, lloc o tema.","No entries match that search. Try another year, place or topic.","Aucune entrée ne correspond à cette recherche. Essayez une autre année, un autre lieu ou un autre thème.","没有找到符合搜索条件的记录。请尝试其他年份、地点或主题。","検索条件に一致する項目はありません。別の年、場所、テーマをお試しください。","検索条件に一致する項目はありません。別の年、場所、テーマをお試しください。","検索条件に一致する項目はありません。別の年、場所、テーマをお試しください。","検索条件に一致する項目はありません。別の年、場所、テーマをお試しください。"],
  "Anterior": ["Anterior","Previous","Précédent","上一项","前へ","前へ","前へ","前へ"],
  "Siguiente": ["Següent","Next","Suivant","下一项","次へ","次へ","次へ","次へ"],
  "En este capítulo": ["En aquest capítol","In this chapter","Dans ce chapitre","本章内容","この章の内容","この章の内容","この章の内容","この章の内容"],
  "La memoria": ["La memòria","The record","La mémoire","记忆","記憶","記憶","記憶","記憶"],
  "La obra": ["L’obra","The work","L’œuvre","作品","作品","作品","作品","作品"],
  "Imágenes y documentos": ["Imatges i documents","Images and documents","Images et documents","图像与文档","画像と資料","画像と資料","画像と資料","画像と資料"],
  "Explorar imágenes": ["Explorar imatges","Explore images","Explorer les images","探索图像","画像を探索する","画像を探索する","画像を探索する","画像を探索する"],
  "Explorar el archivo de arte infantil": ["Explorar l’arxiu d’art infantil","Explore the children’s art archive","Explorer les archives d’art enfantin","探索儿童艺术档案","子どもの美術アーカイブを探索する","子どもの美術アーカイブを探索する","子どもの美術アーカイブを探索する","子どもの美術アーカイブを探索する"],
  "El artista": ["L’artista","The artist","L’artiste","艺术家","アーティスト","アーティスト","アーティスト","アーティスト"],
  "Escultor, pintor y dibujante. Una práctica que atraviesa el oficio, la experimentación con los materiales y la educación artística.": ["Escultor, pintor i dibuixant. Una pràctica que travessa l’ofici, l’experimentació amb els materials i l’educació artística.","Sculptor, painter and draughtsman. A practice shaped by craft, material experimentation and art education.","Sculpteur, peintre et dessinateur. Une pratique traversée par le métier, l’expérimentation des matériaux et l’éducation artistique.","雕塑家、画家和素描艺术家。他的创作贯穿工艺、材料实验与艺术教育。","彫刻家、画家、ドローイング作家。手仕事、素材の実験、そして美術教育を横断する創作実践。","彫刻家、画家、ドローイング作家。手仕事、素材の実験、そして美術教育を横断する創作実践。","彫刻家、画家、ドローイング作家。手仕事、素材の実験、そして美術教育を横断する創作実践。","彫刻家、画家、ドローイング作家。手仕事、素材の実験、そして美術教育を横断する創作実践。"],
  "Nacido en Barcelona en 1959 y formado en Bellas Artes en Valencia, ENRIC SEGARRA I GARIBO desarrolla una práctica que se mueve entre la escultura, la pintura y el dibujo. El conocimiento del oficio convive con la curiosidad por los materiales y con una atención constante a las formas de la naturaleza.": ["Nascut a Barcelona el 1959 i format en Belles Arts a València, ENRIC SEGARRA I GARIBO desenvolupa una pràctica que es mou entre l’escultura, la pintura i el dibuix. El coneixement de l’ofici conviu amb la curiositat pels materials i amb una atenció constant a les formes de la natura.","Born in Barcelona in 1959 and trained in Fine Arts in Valencia, ENRIC SEGARRA I GARIBO works across sculpture, painting and drawing. His knowledge of craft goes hand in hand with curiosity about materials and sustained attention to forms found in nature.","Né à Barcelone en 1959 et formé aux Beaux-Arts de Valence, ENRIC SEGARRA I GARIBO développe une pratique entre sculpture, peinture et dessin. La connaissance du métier s’allie à la curiosité pour les matériaux et à une attention constante aux formes de la nature.","ENRIC SEGARRA I GARIBO 于1959年出生于巴塞罗那，毕业于瓦伦西亚美术学院，创作涵盖雕塑、绘画与素描。他对工艺的理解与对材料的好奇，以及对自然形态的持续关注并行不悖。","1959年にバルセロナに生まれ、バレンシアで美術を学んだ ENRIC SEGARRA I GARIBO は、彫刻、絵画、ドローイングを横断する創作を展開しています。確かな技術と素材への好奇心、そして自然の造形への絶え間ないまなざしが共存しています。","1959年にバルセロナに生まれ、バレンシアで美術を学んだ ENRIC SEGARRA I GARIBO は、彫刻、絵画、ドローイングを横断する創作を展開しています。確かな技術と素材への好奇心、そして自然の造形への絶え間ないまなざしが共存しています。","1959年にバルセロナに生まれ、バレンシアで美術を学んだ ENRIC SEGARRA I GARIBO は、彫刻、絵画、ドローイングを横断する創作を展開しています。確かな技術と素材への好奇心、そして自然の造形への絶え間ないまなざしが共存しています。","1959年にバルセロナに生まれ、バレンシアで美術を学んだ ENRIC SEGARRA I GARIBO は、彫刻、絵画、ドローイングを横断する創作を展開しています。確かな技術と素材への好奇心、そして自然の造形への絶え間ないまなざしが共存しています。"],
  "Su trayectoria incluye la educación artística, los proyectos compartidos y la actividad expositiva. En los talleres, el volumen y la experimentación se convierten en una manera de acompañar la imaginación de los participantes.": ["La seva trajectòria inclou l’educació artística, els projectes compartits i l’activitat expositiva. Als tallers, el volum i l’experimentació esdevenen una manera d’acompanyar la imaginació dels participants.","His career includes art education, collaborative projects and exhibition work. In workshops, volume and experimentation become ways of supporting participants’ imagination.","Son parcours comprend l’éducation artistique, les projets partagés et l’activité d’exposition. Dans les ateliers, le volume et l’expérimentation accompagnent l’imagination des participants.","他的经历包括艺术教育、合作项目和展览活动。在工作坊中，体积与实验成为陪伴参与者想象力的一种方式。","その歩みには、美術教育、共同プロジェクト、展覧会活動が含まれます。ワークショップでは、立体造形と実験が参加者の想像力に寄り添う手段となります。","その歩みには、美術教育、共同プロジェクト、展覧会活動が含まれます。ワークショップでは、立体造形と実験が参加者の想像力に寄り添う手段となります。","その歩みには、美術教育、共同プロジェクト、展覧会活動が含まれます。ワークショップでは、立体造形と実験が参加者の想像力に寄り添う手段となります。","その歩みには、美術教育、共同プロジェクト、展覧会活動が含まれます。ワークショップでは、立体造形と実験が参加者の想像力に寄り添う手段となります。"],
  "En su trabajo actual, las esculturas suspendidas mantienen abierta esa búsqueda. Piezas, colores y elementos recuperados se encuentran en composiciones que dialogan con el aire y el entorno.": ["En el seu treball actual, les escultures suspeses mantenen oberta aquesta recerca. Peces, colors i elements recuperats es troben en composicions que dialoguen amb l’aire i l’entorn.","In his current work, suspended sculptures keep this enquiry open. Pieces, colours and recovered elements meet in compositions that engage with air and their surroundings.","Dans son travail actuel, les sculptures suspendues maintiennent cette recherche ouverte. Pièces, couleurs et éléments récupérés se rencontrent dans des compositions qui dialoguent avec l’air et l’environnement.","在他目前的创作中，悬挂雕塑延续着这项探索。部件、色彩与回收元素在与空气和环境对话的构成中相遇。","現在の制作では、吊り下げられた彫刻がその探求を広げ続けています。パーツ、色彩、回収された素材が、空気や周囲の環境と対話するコンポジションの中で出会います。","現在の制作では、吊り下げられた彫刻がその探求を広げ続けています。パーツ、色彩、回収された素材が、空気や周囲の環境と対話するコンポジションの中で出会います。","現在の制作では、吊り下げられた彫刻がその探求を広げ続けています。パーツ、色彩、回収された素材が、空気や周囲の環境と対話するコンポジションの中で出会います。","現在の制作では、吊り下げられた彫刻がその探求を広げ続けています。パーツ、色彩、回収された素材が、空気や周囲の環境と対話するコンポジションの中で出会います。"],
  "ENRIC SEGARRA I GARIBO en un retrato de estudio": ["ENRIC SEGARRA I GARIBO en un retrat d’estudi","ENRIC SEGARRA I GARIBO in a studio portrait","ENRIC SEGARRA I GARIBO dans un portrait en studio","ENRIC SEGARRA I GARIBO 的工作室肖像","ENRIC SEGARRA I GARIBO のスタジオポートレート","ENRIC SEGARRA I GARIBO のスタジオポートレート","ENRIC SEGARRA I GARIBO のスタジオポートレート","ENRIC SEGARRA I GARIBO のスタジオポートレート"],
  "Información": ["Informació","Information","Informations","信息","情報","情報","情報","情報"],
  "Recorrer su trayectoria": ["Recórrer la seva trajectòria","Explore the journey","Parcourir son parcours","浏览艺术历程","その歩みを辿る","その歩みを辿る","その歩みを辿る","その歩みを辿る"],
  "Distintas formas de una misma búsqueda": ["Diferents formes d’una mateixa recerca","Different forms of the same search","Différentes formes d’une même recherche","同一探索的不同形式","一つの探求のさまざまな形","一つの探求のさまざまな形","一つの探求のさまざまな形","一つの探求のさまざまな形"],
  "Escultura y materia": ["Escultura i matèria","Sculpture and matter","Sculpture et matière","雕塑与材料","彫刻と素材","彫刻と素材","彫刻と素材","彫刻と素材"],
  "Este espacio reúne la obra y la memoria artística de SEGARRA Y GARIBO. El archivo sigue creciendo con la identificación de piezas, documentos y fotografías.": ["Aquest espai reuneix l’obra i la memòria artística de SEGARRA Y GARIBO. L’arxiu continua creixent amb la identificació de peces, documents i fotografies.","This space brings together the work and artistic record of SEGARRA Y GARIBO. The archive continues to grow as works, documents and photographs are identified.","Cet espace réunit l’œuvre et la mémoire artistique de SEGARRA Y GARIBO. Les archives continuent de s’enrichir avec l’identification des pièces, documents et photographies.","这里汇集 SEGARRA Y GARIBO 的作品与艺术记忆。随着作品、文档与照片的识别，档案仍在不断增长。","この空間は SEGARRA Y GARIBO の作品と芸術の記憶を集めたものです。作品、資料、写真の特定が進むにつれて、アーカイブは成長し続けています。","この空間は SEGARRA Y GARIBO の作品と芸術の記憶を集めたものです。作品、資料、写真の特定が進むにつれて、アーカイブは成長し続けています。","この空間は SEGARRA Y GARIBO の作品と芸術の記憶を集めたものです。作品、資料、写真の特定が進むにつれて、アーカイブは成長し続けています。","この空間は SEGARRA Y GARIBO の作品と芸術の記憶を集めたものです。作品、資料、写真の特定が進むにつれて、アーカイブは成長し続けています。"],
  "Volver a la obra": ["Tornar a l’obra","Back to the work","Retour à l’œuvre","返回作品","作品へ戻る","作品へ戻る","作品へ戻る","作品へ戻る"],
  "Página no encontrada": ["Pàgina no trobada","Page not found","Page introuvable","页面未找到","ページが見つかりません","ページが見つかりません","ページが見つかりません","ページが見つかりません"],
  "Este enlace no corresponde a una ficha del archivo.": ["Aquest enllaç no correspon a una fitxa de l’arxiu.","This link does not match an archive record.","Ce lien ne correspond pas à une fiche des archives.","此链接不对应档案条目。","このリンクはアーカイブの項目に対応していません。","このリンクはアーカイブの項目に対応していません。","このリンクはアーカイブの項目に対応していません。","このリンクはアーカイブの項目に対応していません。"],
  "OBRA · VIDA · EDUCACIÓN": ["OBRA · VIDA · EDUCACIÓ","WORK · LIFE · EDUCATION","ŒUVRE · VIE · ÉDUCATION","作品 · 生平 · 教育","作品 · 生涯 · 教育",null,null,null],
  "Un archivo en movimiento.": ["Un arxiu en moviment.","An archive in motion.","Des archives en mouvement.","不断生长的档案。","動き続けるアーカイブ。",null,null,null],
  "Cerrar": ["Tancar","Close","Fermer","关闭","閉じる",null,null,null],
  "← Anterior": ["← Anterior","← Previous","← Précédent","← 上一项","← 前へ",null,null,null],
  "Siguiente →": ["Següent →","Next →","Suivant →","下一项 →","次へ →",null,null,null],
  "← Trayectoria": ["← Trajectòria","← Journey","← Parcours","← 艺术历程","← 歩み",null,null,null],
  "presentación": ["presentació","presentation","présentation","展示","紹介",null,null,null],
  "escultura": ["escultura","sculpture","sculpture","雕塑","彫刻",null,null,null],
  "móvil": ["mòbil","mobile","mobile","悬挂艺术","モビール",null,null,null],
  "dibujo": ["dibuix","drawing","dessin","素描","ドローイング",null,null,null],
  "pintura": ["pintura","painting","peinture","绘画","絵画",null,null,null],
  "ENRIC SEGARRA I GARIBO sostiene una escultura de madera": ["ENRIC SEGARRA I GARIBO sosté una escultura de fusta","ENRIC SEGARRA I GARIBO holding a wooden sculpture","ENRIC SEGARRA I GARIBO tenant une sculpture en bois","ENRIC SEGARRA I GARIBO 手持木雕作品","木彫作品を手に持つ ENRIC SEGARRA I GARIBO",null,null,null],
  "Escultura circular de metal y piezas articuladas": ["Escultura circular de metall i peces articulades","Circular metal sculpture with articulated pieces","Sculpture circulaire en métal et pièces articulées","金属与活动部件构成的圆形雕塑","金属と可動パーツによる円形の彫刻",null,null,null],
  "Escultura vertical de piedra clara": ["Escultura vertical de pedra clara","Vertical sculpture in light stone","Sculpture verticale en pierre claire","浅色石材垂直雕塑","明るい石材の垂直な彫刻",null,null,null],
  "Escultura oscura de brazos curvos sobre una peana": ["Escultura fosca de braços corbs sobre una peana","Dark sculpture with curved arms on a base","Sculpture sombre aux bras courbes sur un socle","底座上的深色曲臂雕塑","台座の上の湾曲したアームを持つ暗い色の彫刻",null,null,null],
  "Móvil suspendido de tubos corrugados": ["Mòbil suspès de tubs corrugats","Suspended mobile of corrugated tubes","Mobile suspendu en tubes annelés","波纹管悬挂装置","波状チューブの吊り下げモビール",null,null,null],
  "Móvil suspendido compuesto por cestas y elementos de color": ["Mòbil suspès compost per cistelles i elements de color","Suspended mobile made of baskets and coloured elements","Mobile suspendu composé de paniers et d’éléments colorés","由篮子与彩色元素组成的悬挂装置","籠と色彩のパーツで構成された吊り下げモビール",null,null,null],
  "Estructura suspendida de alambre y esferas de madera": ["Estructura suspesa de filferro i esferes de fusta","Suspended structure of wire and wooden spheres","Structure suspendue en fil de fer et sphères en bois","铁丝与木球构成的悬挂结构","針金と木の球体による吊り下げ構造",null,null,null],
  "Dibujo abstracto azul y verde": ["Dibuix abstracte blau i verd","Blue and green abstract drawing","Dessin abstrait bleu et vert","蓝绿抽象素描","青と緑の抽象ドローイング",null,null,null],
  "Relieve pintado multicolor": ["Relleu pintat multicolor","Multicoloured painted relief","Relief peint multicolore","多彩彩绘浮雕","多色着彩のレリーフ",null,null,null],
  "Selección de obra de ENRIC SEGARRA I GARIBO": ["Selecció d’obra d’ENRIC SEGARRA I GARIBO","Selected works by ENRIC SEGARRA I GARIBO","Sélection d’œuvres d’ENRIC SEGARRA I GARIBO","ENRIC SEGARRA I GARIBO 作品精选","ENRIC SEGARRA I GARIBO 作品セレクション",null,null,null],
  "Siguiente obra": ["Obra següent","Next work","Œuvre suivante","下一件作品","次の作品",null,null,null],
  "Jardí de les Sargantanes · Espacio escultórico": ["Jardí de les Sargantanes · Espai escultòric","Jardí de les Sargantanes · Sculpture garden","Jardí de les Sargantanes · Espace sculptural","蜥蜴花园 · 雕塑空间","トカゲの庭 · 彫刻空間",null,null,null],
  "Jardí de les Sargantanes": ["Jardí de les Sargantanes","Garden of the Lizards","Jardin des Lézards","蜥蜴花园","トカゲの庭",null,null,null],
  "Jardín de las Lagartijas — Jardí de les Sargantanes": ["Jardí de les Sargantanes","Garden of the Lizards — Jardí de les Sargantanes","Jardin des Lézards — Jardí de les Sargantanes","蜥蜴花园 — Jardí de les Sargantanes","トカゲの庭 — Jardí de les Sargantanes",null,null,null],
  "Obras en el espacio": ["Obres a l’espai","Works in the space","Œuvres dans l’espace","空间中的作品","空間の中の作品",null,null,null],
  "Otra obra en este espacio": ["Una altra obra en aquest espai","Another work in this space","Une autre œuvre dans cet espace","此空间中的另一件作品","この空間の別の作品",null,null,null],
  "Volver al Jardín de las Lagartijas": ["Tornar al Jardí de les Sargantanes","Back to the Garden of the Lizards","Retour au Jardin des Lézards","返回蜥蜴花园","トカゲの庭へ戻る",null,null,null],
  "Ver exposiciones": ["Veure exposicions","View exhibitions","Voir les expositions","查看展览","展覧会を見る",null,null,null],
  "Buscar": ["Cerca","Search","Rechercher","搜索","検索",null,null,null],
  "Buscar ↗": ["Cerca ↗","Search ↗","Rechercher ↗","搜索 ↗","検索 ↗",null,null,null],
  "Ámbito": ["Àmbit","Area","Domaine","范围","領域",null,null,null],
  "Disciplina": ["Disciplina","Discipline","Discipline","类别","分野",null,null,null],
  "Colección o ficha": ["Col·lecció o fitxa","Collection or record","Collection ou fiche","收藏或条目","コレクション・項目",null,null,null],
  "Ver más imágenes": ["Veure més imatges","View more images","Voir plus d’images","查看更多图像","さらに画像を見る",null,null,null],
  "Participantes de las exposiciones": ["Participants de les exposicions","Exhibition participants","Participants des expositions","展览参与者","展覧会の参加者",null,null,null],
  "Leer la propuesta": ["Llegir la proposta","Read the proposal","Lire la proposition","阅读方案","提案を読む",null,null,null],
  "Ideas para crear": ["Idees per crear","Ideas for creating","Idées pour créer","创作启发","創造のためのアイデア",null,null,null],
  "Síntesis editorial del documento conservado en el archivo. No es una transcripción.": ["Síntesi editorial del document conservat a l’arxiu. No és una transcripció.","Editorial summary of the document preserved in the archive. Not a transcript.","Synthèse éditoriale du document conservé dans les archives. Ce n’est pas une transcription.","档案保存文献的编辑摘要，非原文照录。","アーカイブに保存されている資料の編集要約（全文の書き起こしではありません）。",null,null,null],
  "Ver las imágenes relacionadas": ["Veure les imatges relacionades","View related images","Voir les images associées","查看相关图像","関連する画像を見る",null,null,null],
  "Vida, obra y encuentros. Las fechas corresponden a episodios documentados; los demás recorridos son temáticos.": ["Vida, obra i trobades. Les dates corresponen a episodis documentats; la resta de recorreguts són temàtics.","Life, work and encounters. Dates correspond to documented events; the remaining paths are thematic.","Vie, œuvre et rencontres. Les dates correspondent à des épisodes documentés ; les autres parcours sont thématiques.","生平、作品与相遇。日期对应有文献记载的事件，其余路径按主题展开。","生涯、作品、そして出会い。日付は記録が確認された出来事を示し、その他の道筋はテーマ別に構成されています。",null,null,null],
  "Colectivas": ["Col·lectives","Group shows","Collectives","群展","グループ展",null,null,null],
  "Sala": ["Sala","Gallery","Salle","展厅","展示室",null,null,null],
  "Exposiciones y proyectos": ["Exposicions i projectes","Exhibitions and projects","Expositions et projets","展览与项目","展覧会とプロジェクト",null,null,null],
  "Este espacio reúne la obra y la memoria artística de ENRIC SEGARRA I GARIBO. El archivo sigue creciendo con la identificación de piezas, documentos y fotografías.": ["Aquest espai reuneix l’obra i la memòria artística d’ENRIC SEGARRA I GARIBO. L’arxiu continua creixent amb la identificació de peces, documents i fotografies.","This space brings together the work and artistic record of ENRIC SEGARRA I GARIBO. The archive continues to grow as works, documents and photographs are identified.","Cet espace réunit l’œuvre et la mémoire artistique d’ENRIC SEGARRA I GARIBO. Les archives continuent de s’enrichir avec l’identification des pièces, documents et photographies.","这里汇集 ENRIC SEGARRA I GARIBO 的作品与艺术记忆。随着作品、文档与照片的识别，档案仍在不断增长。","この空間は ENRIC SEGARRA I GARIBO の作品と芸術の記憶を集めたものです。作品、資料、写真の特定が進むにつれて、アーカイブは成長し続けています。",null,null,null],
  "Archivo": ["Arxiu","Archive","Archives","档案","アーカイブ",null,null,null],
  "Obra de ENRIC SEGARRA I GARIBO": ["Obra d’ENRIC SEGARRA I GARIBO","Work by ENRIC SEGARRA I GARIBO","Œuvre d’ENRIC SEGARRA I GARIBO","ENRIC SEGARRA I GARIBO 的作品","ENRIC SEGARRA I GARIBO の作品",null,null,null],
  "Orígenes": ["Orígens","Origins","Origines","起源","原点",null,null,null],
  "Barcelona, 1959. La formación en Bellas Artes en Valencia y el aprendizaje del oficio abren una vida dedicada a crear.": ["Barcelona, 1959. La formació en Belles Arts a València i l’aprenentatge de l’ofici obren una vida dedicada a crear.","Barcelona, 1959. Fine Arts studies in Valencia and learning the craft open a life dedicated to creating.","Barcelone, 1959. La formation aux Beaux-Arts à Valence et l’apprentissage du métier ouvrent une vie consacrée à la création.","1959年，巴塞罗那。在瓦伦西亚美术学院的求学与对技艺的钻研，开启了致力于创作的一生。","1959年、バルセロナ。バレンシアでの美術教育と技術の習得が、創造に捧げられた人生を切り開く。",null,null,null],
  "Construir el espacio sobre el papel": ["Construir l’espai sobre el paper","Building space on paper","Construire l’espace sur le papier","在纸上构建空间","紙の上に空間を構築する",null,null,null],
  "Líneas, curvas y planos de color. El dibujo investiga una presencia que se relaciona con el volumen.": ["Línies, corbes i plans de color. El dibuix investiga una presència que es relaciona amb el volum.","Lines, curves and planes of colour. Drawing explores a presence connected to volume.","Lignes, courbes et plans de couleur. Le dessin explore une présence liée au volume.","线条、曲线与色面。素描探索着与体积相关的存在感。","線、曲線、色彩の面。ドローイングは立体と結びつく存在感を探求する。",null,null,null],
  "Educación": ["Educació","Education","Éducation","教育","教育",null,null,null],
  "El agua": ["L’aigua","Water","L’eau","水","水",null,null,null],
  "Las salas": ["Les sales","Exhibition spaces","Les salles","展厅","展示室",null,null,null],
  "Presente": ["Present","Present","Présent","当下","現在",null,null,null],
  "obra": ["obra","work","œuvre","件作品","点の作品",null,null,null],
  "fotografía": ["fotografia","photograph","photographie","张照片","枚の写真",null,null,null],
  "recorridos": ["recorreguts","paths","parcours","个路径","つのセクション",null,null,null],
  "Volver a arte infantil": ["Tornar a art infantil","Back to children's art","Retour à l’art enfantin","返回儿童艺术","子どもの美術へ戻る",null,null,null],
  "Volver a jardín de las lagartijas": ["Tornar al Jardí de les Sargantanes","Back to the Garden of the Lizards","Retour au Jardin des Lézards","返回蜥蜴花园","トカゲの庭へ戻る",null,null,null],
  "Volver a exposiciones": ["Tornar a exposicions","Back to exhibitions","Retour aux expositions","返回展览","展覧会へ戻る",null,null,null],
  "Abrir con filtros ↗": ["Obrir amb filtres ↗","Open with filters ↗","Ouvrir avec les filtres ↗","打开筛选 ↗","フィルター付きで開く ↗",null,null,null],
};

const dynamic = [
  [/^(\d+) fichas$/, (n) => `${n} ${term("fichas")}`],
  [/^(\d+) colecciones$/, (n) => `${n} ${term("colecciones")}`],
  [/^(\d+) fotografías$/, (n) => `${n} ${term("fotografías")}`],
  [/^(\d+) fotografía$/, (n) => `${n} ${term("fotografía")}`],
  [/^(\d+) imágenes$/, (n) => `${n} ${term("imágenes")}`],
  [/^(\d+) obras$/, (n) => `${n} ${term("obras")}`],
  [/^(\d+) obra$/, (n) => `${n} ${term("obra")}`],
  [/^(\d+) álbumes$/, (n) => `${n} ${term("álbumes")}`],
  [/^(\d+) lecturas$/, (n) => `${n} ${term("lecturas")}`],
  [/^(\d+) entradas · Recorre la lista para cambiar de imagen$/, (n) => `${n} ${term("entradas")} · ${phrase("Recorre la lista para cambiar de imagen")}`],
  [/^(\d+) exposiciones$/, (n) => `${n} ${term("exposiciones")}`],
  [/^(\d+) de (\d+) fotografías$/, (a, b) => `${a} ${phrase("de")} ${b} ${term("fotografías")}`],
  [/^(\d+) fotografías · (\d+) salas$/, (a, b) => `${a} ${term("fotografías")} · ${b} ${phrase("salas")}`],
  [/^· (\d+) vistas$/, (n) => `· ${n} ${term("vistas")}`],
  [/^· (\d+) recorridos$/, (n) => `· ${n} ${term("recorridos")}`],
  [/^(.+) · (\d+) vistas$/, (prefix, n) => `${translateText(prefix)} · ${n} ${term("vistas")}`],
  [/^(.+) · (\d+) recorridos$/, (prefix, n) => `${translateText(prefix)} · ${n} ${term("recorridos")}`],
  [/^(.+) \(([A-Z]{3}-\d{3})\)(?: · vista (\d+))?$/, (label, ref, v) => `${translateText(label)} (${ref})${v ? ` · ${term("Ver perspectiva")} ${v}` : ""}`],
  [/^Ampliar fotografía (\d+): (.+)$/, (n, alt) => `${phrase("Ampliar fotografía")} ${n}: ${translateText(alt)}`],
  [/^Ampliar: (.+)$/, (alt) => `${phrase("Ampliar")}: ${translateText(alt)}`],
  [/^Ver perspectiva (\d+)$/, (n) => `${phrase("Ver perspectiva")} ${n}`],
  [/^(\d+) \/ (.+)$/, (n, kind) => `${n} / ${translateText(kind)}`],
  [/^(.+) \/ ([A-Z]{3}-\d{3})$/, (cat, ref) => `${translateText(cat)} / ${ref}`],
  [/^(.+) · (\d+) \/ (\d+) · (.+)$/, (label, a, b, ref) => `${translateText(label)} · ${a} / ${b} · ${ref}`],
  [/^Documento (ARC-\d+)$/, (ref) => `${phrase("Documentación")} ${ref}`],
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
  return { es: -1, ca: 0, en: 1, fr: 2, zh: 3, ja: 4 }[language] ?? -1;
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
  let clean = value.trim();
  if (!clean) return value;
  let arrowSuffix = "";
  if (clean.endsWith(" ↗")) {
    arrowSuffix = " ↗";
    clean = clean.slice(0, -2).trim();
  }
  if (copy[clean] || contentTranslations[clean])
    return leading + phrase(clean) + arrowSuffix + trailing;
  for (const [pattern, render] of dynamic) {
    const match = clean.match(pattern);
    if (match) return leading + render(...match.slice(1)) + arrowSuffix + trailing;
  }
  return value;
}

function translateAttribute(element, name) {
  let attributes = originalAttributes.get(element);
  if (!attributes) {
    attributes = new Map();
    originalAttributes.set(element, attributes);
  }
  const currentAttr = element.getAttribute(name);
  if (!currentAttr) return;
  const renderedKey = name + ":rendered";
  if (!attributes.has(name) || currentAttr !== attributes.get(renderedKey)) {
    attributes.set(name, currentAttr);
  }
  const value = attributes.get(name);
  if (!value) return;
  const translated = (copy[value] || contentTranslations[value]) ? phrase(value) : translateText(value);
  attributes.set(renderedKey, translated);
  element.setAttribute(name, translated);
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
    if (!originalText.has(node) || node.nodeValue !== node._i18nRendered) {
      originalText.set(node, node.nodeValue);
    }
    const translated = translateText(originalText.get(node));
    node._i18nRendered = translated;
    node.nodeValue = translated;
  });
  root.querySelectorAll?.("[aria-label], [placeholder], [title], [alt]").forEach((element) => {
    translateAttribute(element, "aria-label");
    translateAttribute(element, "placeholder");
    translateAttribute(element, "title");
    translateAttribute(element, "alt");
  });
  root.querySelectorAll?.("option:not([data-language-option])").forEach((option) => {
    if (!option.closest("[data-language-select]")) {
      if (!originalText.has(option)) originalText.set(option, option.textContent);
      option.textContent = translateText(originalText.get(option));
    }
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
