import * as THREE from './vendor/three.module.min.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';
export {THREE};
const texLoader=new THREE.TextureLoader();
const gltfLoader=new GLTFLoader();
export const ART=[
 {id:'rose',code:'MOV-001',catalogId:'suspension-rosa',title:'Composición en rosa',kind:'mobile',image:'assets/movil-rosa.webp',glb:"assets/hy3d-mov-001.glb",views:[{src:"assets/cut-mov-001-1.webp",w:1.388,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-001-2.webp",w:1.401,h:2.15,label:"Ángulo 2"},{src:"assets/cut-mov-001-3.webp",w:1.414,h:2.15,label:"Ángulo 3"}],height:2.15,description:'Varillas claras y elementos rosas dibujan un equilibrio abierto. Acércate y descubre cómo cambia la composición al rodearla.'},
 {id:'green',code:'MOV-005',catalogId:'forma-verde',title:'Forma suspendida en verde',kind:'mobile',image:'assets/movil-verde.webp',glb:"assets/hy3d-mov-005.glb",views:[{src:"assets/cut-mov-005-1.webp",w:1.314,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-005-5.webp",w:1.226,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-005-3.webp",w:1.11,h:1.95,label:"Ángulo 3"},{src:"assets/cut-mov-005-4.webp",w:1.141,h:1.95,label:"Ángulo 4"},{src:"assets/cut-mov-005-2.webp",w:1.309,h:1.95,label:"Detalle de codos",cutout:false},{src:"assets/ctx-mov-005-1.webp",w:1.3,h:1.95,label:"En el entorno",cutout:false}],height:1.95,description:'Líneas curvas que se entrecruzan en el aire. El vacío también forma parte de la pieza.'},
 {id:'color',code:'MOV-016',catalogId:'ramas-y-color',title:'Color entre las ramas',kind:'mobile',image:'assets/movil-color.webp',glb:"assets/hy3d-mov-016.glb",views:[{src:"assets/cut-mov-016-1.webp",w:1.669,h:2.15,label:"Vista frontal"},{src:"assets/ctx-mov-016-1.webp",w:3.225,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-016-2.webp",w:1.434,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:'Tubos curvados y discos de colores. Una interpretación de la pieza fotografiada entre las ramas.'},
 {id:'sculpture1',code:'ESC-009',catalogId:'volumen-veta',title:'Volumen de formas curvas',kind:'sculpture',image:'assets/escultura-madera.webp',glb:'assets/hy3d-madera.glb',roughness:.74,metalness:.03,views:[{src:'assets/cut-madera-1.webp',w:0.102,h:0.30,label:'Vista frontal'},{src:'assets/cut-madera-2.webp',w:0.070,h:0.30,label:'Perfil lateral'},{src:'assets/cut-madera-3.webp',w:0.092,h:0.30,label:'Vista posterior'}],height:0.30,description:'Escultura orgánica en madera tallada del archivo de Enric Segarra. Alterna entre el Volumen 3D con textura fotográfica exacta o la Imagen en 3D multi-ángulo.'},
 {id:'sculpture2',code:'ESC-011',catalogId:'volumen-abierto',title:'Volumen claro con aberturas',kind:'sculpture',image:'assets/escultura-aberturas.webp',glb:'assets/hy3d-aberturas.glb',roughness:.8,metalness:.02,views:[{src:'assets/cut-aberturas-1.webp',w:0.300,h:0.38,label:'Vista frontal'},{src:'assets/cut-aberturas-2.webp',w:0.074,h:0.38,label:'Perfil lateral'},{src:'assets/cut-aberturas-3.webp',w:0.281,h:0.38,label:'Vista posterior'}],height:0.38,description:'Escultura de superficie clara y dos oquedades pasantes que dejan cruzar la luz de la galería. Alterna entre el Volumen 3D con textura real o la Imagen en 3D.'},
 {id:'sculpture3',code:'ESC-010',catalogId:'escultura-014523',title:'Volumen claro con abertura superior',kind:'sculpture',image:'assets/escultura-bifurcada.webp',glb:'assets/hy3d-bifurcada.glb',roughness:.74,metalness:.03,views:[{src:'assets/cut-esc-010-1.webp',w:0.119,h:0.31,label:'Vista frontal'},{src:'assets/cut-esc-010-2.webp',w:0.116,h:0.31,label:'Perfil lateral'},{src:'assets/cut-esc-010-3.webp',w:0.125,h:0.31,label:'Vista posterior'}],height:0.31,description:'Pieza escultórica vertical de remate bifurcado en madera cálida con nudos naturales (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D multi-ángulo.'},
 {id:'sculpture4',code:'ESC-012',catalogId:'escultura-014533',title:'Figura de perfiles ascendentes',kind:'sculpture',image:'assets/escultura-hierro.webp',glb:'assets/hy3d-esc-012.glb',roughness:.54,metalness:.32,views:[{src:'assets/cut-esc-012-1.webp',w:0.202,h:0.46,label:'Vista frontal'},{src:'assets/cut-esc-012-2.webp',w:0.197,h:0.46,label:'Perfil lateral'},{src:'assets/cut-esc-012-3.webp',w:0.191,h:0.46,label:'Vista posterior'},{src:'assets/cut-esc-012-4.webp',w:0.176,h:0.46,label:'Vista oblicua'}],height:0.46,description:'Escultura de planos curvos y perfiles ascendentes en hierro oxidado sobre base de hierro recortado (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica exacta o la Imagen en 3D multi-ángulo.'},
 {id:'esc005',code:'ESC-005',catalogId:'escultura-014502',title:'Volumen vertical de planos abiertos',kind:'sculpture',image:'assets/escultura-esc-005.webp',glb:'assets/hy3d-esc-005.glb',roughness:0.56,metalness:0.3,views:[{src:'assets/cut-esc-005-1.webp',w:0.191,h:0.48,label:'Vista frontal'}],height:0.48,description:'Volumen vertical de planos abiertos en hierro sobre peana de piedra clara (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc006',code:'ESC-006',catalogId:'escultura-014505',title:'Plano curvo con abertura',kind:'sculpture',image:'assets/escultura-esc-006.webp',glb:'assets/hy3d-esc-006.glb',roughness:0.56,metalness:0.28,views:[{src:'assets/cut-esc-006-1.webp',w:0.251,h:0.44,label:'Vista frontal'},{src:'assets/cut-esc-006-2.webp',w:0.216,h:0.44,label:'Perfil lateral'},{src:'assets/cut-esc-006-3.webp',w:0.243,h:0.44,label:'Vista posterior'}],height:0.44,description:'Plano curvo con abertura central sobre peana cúbica de piedra (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc007',code:'ESC-007',catalogId:'escultura-014507',title:'Volumen de planos envolventes',kind:'sculpture',image:'assets/escultura-esc-007.webp',glb:'assets/hy3d-esc-007.glb',roughness:0.54,metalness:0.32,views:[{src:'assets/cut-esc-007-1.webp',w:0.346,h:0.34,label:'Vista frontal'},{src:'assets/cut-esc-007-2.webp',w:0.288,h:0.34,label:'Vista posterior'}],height:0.34,description:'Volumen de planos envolventes sobre bloque de piedra travertino (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc008',code:'ESC-008',catalogId:'escultura-014509',title:'Volumen claro de formas onduladas',kind:'sculpture',image:'assets/escultura-esc-008.webp',glb:'assets/hy3d-esc-008.glb',roughness:0.84,metalness:0.02,views:[{src:'assets/cut-esc-008-1.webp',w:0.158,h:0.38,label:'Vista frontal'},{src:'assets/cut-esc-008-2.webp',w:0.190,h:0.38,label:'Perfil lateral'},{src:'assets/cut-esc-008-3.webp',w:0.158,h:0.38,label:'Vista posterior'}],height:0.38,description:'Volumen claro de formas onduladas (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc013',code:'ESC-013',catalogId:'escultura-014540',title:'Forma vertical ondulada',kind:'sculpture',image:'assets/escultura-esc-013.webp',glb:'assets/hy3d-esc-013.glb',roughness:0.72,metalness:0.03,views:[{src:'assets/cut-esc-013-1.webp',w:0.094,h:0.46,label:'Vista frontal'},{src:'assets/cut-esc-013-2.webp',w:0.105,h:0.46,label:'Perfil lateral'},{src:'assets/cut-esc-013-3.webp',w:0.093,h:0.46,label:'Vista posterior'}],height:0.46,description:'Forma vertical ondulada (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc014',code:'ESC-014',catalogId:'escultura-014547',title:'Forma alargada sobre peana',kind:'sculpture',image:'assets/escultura-esc-014.webp',glb:'assets/hy3d-esc-014.glb',roughness:0.7,metalness:0.03,views:[{src:'assets/cut-esc-014-1.webp',w:0.110,h:0.46,label:'Vista frontal'},{src:'assets/cut-esc-014-2.webp',w:0.101,h:0.46,label:'Perfil lateral'},{src:'assets/cut-esc-014-3.webp',w:0.098,h:0.46,label:'Vista posterior'}],height:0.46,description:'Forma alargada sobre peana (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc015',code:'ESC-015',catalogId:'escultura-014552',title:'Volumen redondeado con cavidades',kind:'sculpture',image:'assets/escultura-esc-015.webp',glb:'assets/hy3d-esc-015.glb',roughness:0.86,metalness:0.02,views:[{src:'assets/cut-esc-015-1.webp',w:0.233,h:0.22,label:'Vista frontal'},{src:'assets/cut-esc-015-2.webp',w:0.228,h:0.22,label:'Vista oblicua'},{src:'assets/cut-esc-015-3.webp',w:0.223,h:0.22,label:'Vista posterior'}],height:0.22,description:'Pequeño volumen redondeado con cavidades talladas en piedra porosa clara (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc031',code:'ESC-031',catalogId:'escultura-008507',title:'Plano abierto con curvas ascendentes',kind:'sculpture',image:'assets/escultura-esc-031.webp',glb:'assets/hy3d-esc-031.glb',roughness:0.56,metalness:0.3,views:[{src:'assets/cut-esc-031-1.webp',w:0.344,h:0.55,label:'Vista frontal'},{src:'assets/cut-esc-031-2.webp',w:0.291,h:0.55,label:'Perfil lateral'},{src:'assets/cut-esc-031-3.webp',w:0.272,h:0.55,label:'Vista posterior'}],height:0.55,description:'Plano abierto con curvas ascendentes (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc032',code:'ESC-032',catalogId:'escultura-008523',title:'Plano curvo sobre peana',kind:'sculpture',image:'assets/escultura-esc-032.webp',glb:'assets/hy3d-esc-032.glb',roughness:0.58,metalness:0.26,views:[{src:'assets/cut-esc-032-1.webp',w:0.311,h:0.38,label:'Vista frontal'}],height:0.38,description:'Plano curvo sobre peana (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc033',code:'ESC-033',catalogId:'escultura-008525',title:'Volumen envolvente con abertura',kind:'sculpture',image:'assets/escultura-esc-033.webp',glb:'assets/hy3d-esc-033.glb',roughness:0.62,metalness:0.24,views:[{src:'assets/cut-esc-033-1.webp',w:0.280,h:0.36,label:'Vista frontal'}],height:0.36,description:'Volumen envolvente con abertura (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc034',code:'ESC-034',catalogId:'escultura-008529',title:'Plano curvo con lazo central',kind:'sculpture',image:'assets/escultura-esc-034.webp',glb:'assets/hy3d-esc-034.glb',roughness:0.62,metalness:0.24,views:[{src:'assets/cut-esc-034-1.webp',w:0.328,h:0.45,label:'Vista frontal'},{src:'assets/cut-esc-034-2.webp',w:0.281,h:0.45,label:'Vista posterior'}],height:0.45,description:'Plano curvo con lazo central (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc035',code:'ESC-035',catalogId:'escultura-008532',title:'Plano abierto de contorno ovalado',kind:'sculpture',image:'assets/escultura-esc-035.webp',glb:'assets/hy3d-esc-035.glb',roughness:0.62,metalness:0.24,views:[{src:'assets/cut-esc-035-1.webp',w:0.325,h:0.48,label:'Vista frontal'},{src:'assets/cut-esc-035-2.webp',w:0.311,h:0.48,label:'Vista posterior'}],height:0.48,description:'Plano abierto de contorno ovalado (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc036',code:'ESC-036',catalogId:'escultura-008535',title:'Volumen de curvas en espiral',kind:'sculpture',image:'assets/escultura-esc-036.webp',glb:'assets/hy3d-esc-036.glb',roughness:0.62,metalness:0.24,views:[{src:'assets/cut-esc-036-1.webp',w:0.266,h:0.45,label:'Vista frontal'},{src:'assets/cut-esc-036-2.webp',w:0.247,h:0.45,label:'Vista posterior'}],height:0.45,description:'Volumen de curvas en espiral (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc038',code:'ESC-038',catalogId:'escultura-008768',title:'Forma natural sobre soporte',kind:'sculpture',image:'assets/escultura-esc-038.webp',glb:'assets/hy3d-esc-038.glb',roughness:0.78,metalness:0.05,views:[{src:'assets/cut-esc-038-1.webp',w:0.387,h:0.62,label:'Vista frontal'},{src:'assets/cut-esc-038-2.webp',w:0.395,h:0.62,label:'Vista posterior'}],height:0.62,description:'Forma natural sobre soporte (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc044',code:'ESC-044',catalogId:'escultura-007134',title:'Dos planos curvos ascendentes',kind:'sculpture',image:'assets/escultura-esc-044.webp',glb:'assets/hy3d-esc-044.glb',roughness:0.58,metalness:0.28,views:[{src:'assets/cut-esc-044-1.webp',w:0.247,h:0.48,label:'Vista frontal'},{src:'assets/cut-esc-044-2.webp',w:0.263,h:0.48,label:'Perfil lateral'},{src:'assets/cut-esc-044-3.webp',w:0.216,h:0.48,label:'Vista posterior'}],height:0.48,description:'Dos planos curvos ascendentes (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc053',code:'ESC-053',catalogId:'escultura-008659',title:'Volumen abierto de contorno ondulado',kind:'sculpture',image:'assets/escultura-esc-053.webp',glb:'assets/hy3d-esc-053.glb',roughness:0.58,metalness:0.28,views:[{src:'assets/cut-esc-053-2.webp',w:0.328,h:0.60,label:'Vista frontal'},{src:'assets/cut-esc-053-1.webp',w:0.243,h:0.60,label:'Perfil lateral'},{src:'assets/cut-esc-053-3.webp',w:0.298,h:0.60,label:'Vista posterior'},{src:'assets/cut-esc-053-4.webp',w:0.342,h:0.60,label:'Vista oblicua'},{src:'assets/cut-esc-053-5.webp',w:0.280,h:0.60,label:'Detalle oblicuo'}],height:0.60,description:'Volumen abierto de contorno ondulado sobre base cilíndrica de madera y pletina soldada (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc037',code:'ESC-037',catalogId:'escultura-008543',title:'Retícula con elementos claros',kind:'sculpture',image:'assets/escultura-esc-037.webp',glb:'assets/hy3d-esc-037.glb',roughness:.64,metalness:.22,views:[{src:'assets/cut-esc-037-1.webp',w:0.482,h:0.52,label:'Vista frontal'},{src:'assets/cut-esc-037-2.webp',w:0.467,h:0.52,label:'Vista posterior'}],height:0.52,description:'Estructura laberíntica de hierro oscuro con bloques pétreos claros, esfera central y bolas de acero en cascada (Estructuras y objetos ensamblados).'},
 {id:'esc039',code:'ESC-039',catalogId:'escultura-008788',title:'Estructura vertical con barras y esferas',kind:'sculpture',image:'assets/escultura-esc-039.webp',glb:'assets/hy3d-esc-039.glb',roughness:.50,metalness:.36,views:[{src:'assets/cut-esc-039-1.webp',w:0.307,h:0.84,label:'Vista frontal'},{src:'assets/cut-esc-039-2.webp',w:0.167,h:0.84,label:'Perfil lateral'},{src:'assets/cut-esc-039-3.webp',w:0.221,h:0.84,label:'Vista posterior'},{src:'assets/cut-esc-039-4.webp',w:0.248,h:0.84,label:'Vista oblicua'}],height:0.84,description:'Doble eje vertical de hierro sobre base dentada con barras transversales y elementos esféricos claros (Estructuras y objetos ensamblados).'},
 {id:'esc040',code:'ESC-040',catalogId:'escultura-008810',title:'Planos curvos sobre rueda dentada',kind:'sculpture',image:'assets/escultura-esc-040.webp',glb:'assets/hy3d-esc-040.glb',roughness:.52,metalness:.35,views:[{src:'assets/cut-esc-040-1.webp',w:0.350,h:0.45,label:'Vista frontal'},{src:'assets/cut-esc-040-2.webp',w:0.251,h:0.45,label:'Perfil lateral'},{src:'assets/cut-esc-040-3.webp',w:0.273,h:0.45,label:'Vista posterior'}],height:0.45,description:'Láminas curvas de hierro soldado de pátina cálida que se despliegan sobre una rueda dentada (Estructuras y objetos ensamblados).'},
 {id:'esc041',code:'ESC-041',catalogId:'escultura-008816',title:'Dos estructuras de espirales',kind:'sculpture',image:'assets/escultura-esc-041.webp',glb:'assets/hy3d-esc-041.glb',roughness:.48,metalness:.38,views:[{src:'assets/cut-esc-041-1.webp',w:0.473,h:0.78,label:'Vista frontal'},{src:'assets/cut-esc-041-2.webp',w:0.225,h:0.78,label:'Vista posterior'},{src:'assets/cut-esc-041-3.webp',w:0.210,h:0.78,label:'Perfil lateral'}],height:0.78,description:'Pareja de ejes verticales con espirales envolventes y bases de engranajes (Estructuras y objetos ensamblados).'},
 {id:'esc042',code:'ESC-042',catalogId:'escultura-008907',title:'Ensamblaje con herramienta y cadena',kind:'sculpture',image:'assets/escultura-esc-042.webp',glb:'assets/hy3d-esc-042.glb',roughness:.62,metalness:.18,views:[{src:'assets/cut-esc-042-1.webp',w:0.195,h:0.38,label:'Vista frontal'},{src:'assets/cut-esc-042-2.webp',w:0.121,h:0.38,label:'Vista posterior'}],height:0.38,description:'Bloque de madera tallada con hendidura de bolas de acero y tenaza abierta de forja en la cima (Estructuras y objetos ensamblados).'},
 {id:'esc043',code:'ESC-043',catalogId:'escultura-011828',title:'Estructura con espiral y ruedas dentadas',kind:'sculpture',image:'assets/escultura-esc-043.webp',glb:'assets/hy3d-esc-043.glb',roughness:.48,metalness:.40,views:[{src:'assets/cut-esc-043-1.webp',w:0.237,h:0.61,label:'Vista frontal'},{src:'assets/cut-esc-043-2.webp',w:0.248,h:0.61,label:'Vista posterior'},{src:'assets/cut-esc-043-3.webp',w:0.404,h:0.61,label:'Perfil lateral'},{src:'assets/cut-esc-043-4.webp',w:0.576,h:0.61,label:'Vista cenital',cutout:false}],height:0.61,description:'Composición vertical de hierro con espiral central y remate de ruedas dentadas (Estructuras y objetos ensamblados).'},
 {id:'esc045',code:'ESC-045',catalogId:'escultura-007158',title:'Eje vertical con elementos superpuestos',kind:'sculpture',image:'assets/escultura-esc-045.webp',glb:'assets/hy3d-esc-045.glb',roughness:.68,metalness:.08,views:[{src:'assets/cut-esc-045-1.webp',w:0.353,h:0.68,label:'Vista frontal'},{src:'assets/cut-esc-045-2.webp',w:0.317,h:0.68,label:'Vista posterior'}],height:0.68,description:'Dos tramos de tronco unidos por perno roscado central y cuñas ranuradas sobre disco de tablones (Estructuras y objetos ensamblados).'},
 {id:'esc054',code:'ESC-054',catalogId:'escultura-008704',title:'Forma articulada en un aro',kind:'sculpture',image:'assets/escultura-esc-054.webp',glb:'assets/hy3d-esc-054.glb',roughness:.52,metalness:.34,views:[{src:'assets/cut-esc-054-1.webp',w:0.500,h:0.54,label:'Vista frontal'},{src:'assets/cut-esc-054-2.webp',w:0.498,h:0.54,label:'Vista posterior'},{src:'assets/cut-esc-054-3.webp',w:0.497,h:0.54,label:'Perfil lateral'},{src:'assets/cut-esc-054-4.webp',w:0.496,h:0.54,label:'Vista oblicua'}],height:0.54,description:'Aro circular de hierro con pletina soldada sobre peana cilíndrica de madera que enmarca un volumen articulado de hierro forjado (Estructuras y objetos ensamblados).'},
 {id:'esc055',code:'ESC-055',catalogId:'escultura-009729',title:'Estructura de tres ejes y ruedas dentadas',kind:'sculpture',image:'assets/escultura-esc-055.webp',glb:'assets/hy3d-esc-055.glb',roughness:.48,metalness:.38,views:[{src:'assets/cut-esc-055-1.webp',w:0.651,h:0.76,label:'Vista frontal'},{src:'assets/cut-esc-055-2.webp',w:0.527,h:0.76,label:'Perfil lateral'},{src:'assets/cut-esc-055-3.webp',w:0.567,h:0.76,label:'Vista posterior'},{src:'assets/cut-esc-055-4.webp',w:0.499,h:0.76,label:'Vista oblicua'},{src:'assets/cut-esc-055-5.webp',w:0.579,h:0.76,label:'Detalle oblicuo'}],height:0.76,description:'Mesa escultura de tres columnas verticales, tirantes diagonales y engranajes de hierro dispuesta directamente sobre el suelo (Estructuras y objetos ensamblados).'},
 {id:'painting1',code:'PIN-014',catalogId:'pintura-015122',title:'Arca entre sol y luna',kind:'painting',mountType:'artistFrame',aspect:1.0,uvCrop:[0.248,0.089,0.564,0.846],image:'assets/pintura-01.webp',description:'Pintura del archivo del artista en su marco original. Alterna entre la Versión normal en 3D y la Versión fotografía.'},
 {id:'painting2',code:'PIN-036',catalogId:'pintura-015146',title:'Trío de músicos y personajes',kind:'painting',mountType:'artistFrame',aspect:0.804,uvCrop:[0.030,0.135,0.887,0.736],image:'assets/pintura-02.webp',description:'Figuras, música y color en su marco original. Fotografía de la obra real integrada en la sala virtual.'},
 {id:'painting3',code:'PIN-039',catalogId:'pintura-015149',title:'Toro rosa con copa y figura al fondo',kind:'painting',mountType:'artistFrame',aspect:0.788,uvCrop:[0.072,0.108,0.846,0.716],image:'assets/pintura-03.webp',description:'Obra enmarcada del archivo del artista. Alterna entre la Versión normal en 3D y la Versión fotografía.'},
 {id:'dib002',code:'DIB-002',catalogId:'dibujo-015080',title:'Planos de color rojo',kind:'drawing',image:'assets/drawing-015080-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib003',code:'DIB-003',catalogId:'trazo-rojo',title:'Estudio de formas en rojo',kind:'drawing',image:'assets/drawing-015081-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib004',code:'DIB-004',catalogId:'dibujo-015082',title:'Planos de sombra cálida',kind:'drawing',image:'assets/drawing-015082-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib005',code:'DIB-005',catalogId:'dibujo-015083',title:'Líneas y planos en naranja',kind:'drawing',image:'assets/drawing-015083-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib006',code:'DIB-006',catalogId:'dibujo-015084',title:'Formas rojas y centro circular',kind:'drawing',image:'assets/drawing-015084-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib007',code:'DIB-007',catalogId:'dibujo-015085',title:'Formas en negro y ocre',kind:'drawing',image:'assets/drawing-015085-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib008',code:'DIB-008',catalogId:'dibujo-015086',title:'Ritmos de color rojo',kind:'drawing',image:'assets/drawing-015086-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib009',code:'DIB-009',catalogId:'dibujo-015087',title:'Trazos azules sobre ocre',kind:'drawing',image:'assets/drawing-015087-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib010',code:'DIB-010',catalogId:'dibujo-015088',title:'Líneas azules y amarillas',kind:'drawing',image:'assets/drawing-015088-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib011',code:'DIB-011',catalogId:'dibujo-015089',title:'Composición sobre fondo ocre',kind:'drawing',image:'assets/drawing-015089-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib012',code:'DIB-012',catalogId:'dibujo-015090',title:'Composición verde sobre ocre',kind:'drawing',image:'assets/drawing-015090-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib013',code:'DIB-013',catalogId:'dibujo-015091',title:'Trazos sobre fondo rosa',kind:'drawing',image:'assets/drawing-015091-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib014',code:'DIB-014',catalogId:'dibujo-015092',title:'Líneas curvas rojas',kind:'drawing',image:'assets/drawing-015092-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib015',code:'DIB-015',catalogId:'dibujo-015093',title:'Trazos verdes y naranjas',kind:'drawing',image:'assets/drawing-015093-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib018',code:'DIB-018',catalogId:'dibujo-015096',title:'Dos figuras en rojo',kind:'drawing',image:'assets/drawing-015096-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib019',code:'DIB-019',catalogId:'dibujo-015098',title:'Planos azules, verdes y amarillos',kind:'drawing',image:'assets/drawing-015098-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib020',code:'DIB-020',catalogId:'trazo-negro',title:'Estudio de formas en negro',kind:'drawing',image:'assets/drawing-015099-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib021',code:'DIB-021',catalogId:'dibujo-015102',title:'Planos negros y rojos',kind:'drawing',image:'assets/drawing-015102-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib022',code:'DIB-022',catalogId:'dibujo-015103',title:'Figura de líneas negras',kind:'drawing',image:'assets/drawing-015103-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib023',code:'DIB-023',catalogId:'dibujo-015105',title:'Planos de color violeta',kind:'drawing',image:'assets/drawing-015105-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib024',code:'DIB-024',catalogId:'dibujo-015172',title:'Formas abiertas en azul y amarillo',kind:'drawing',image:'assets/drawing-015172-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib025',code:'DIB-025',catalogId:'dibujo-015173',title:'Curvas y planos cálidos',kind:'drawing',image:'assets/drawing-015173-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib026',code:'DIB-026',catalogId:'dibujo-015176',title:'Ritmos de color carmín',kind:'drawing',image:'assets/drawing-015176-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib027',code:'DIB-027',catalogId:'dibujo-015178',title:'Planos azules suspendidos',kind:'drawing',image:'assets/drawing-015178-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib028',code:'DIB-028',catalogId:'dibujo-015181',title:'Líneas de color ocre',kind:'drawing',image:'assets/drawing-015181-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib029',code:'DIB-029',catalogId:'dibujo-015182',title:'Espacio de líneas verdes',kind:'drawing',image:'assets/drawing-015182-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib030',code:'DIB-030',catalogId:'dibujo-015183',title:'Trazos oscuros y acentos de color',kind:'drawing',image:'assets/drawing-015183-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib033',code:'DIB-033',catalogId:'dibujo-015187',title:'Figuras y planos enmarcados',kind:'drawing',image:'assets/drawing-015187-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib034',code:'DIB-034',catalogId:'dibujo-008527',title:'Líneas azules y acentos amarillos',kind:'drawing',image:'assets/drawing-008527-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib035',code:'DIB-035',catalogId:'dibujo-008528',title:'Figuras de líneas negras',kind:'drawing',image:'assets/drawing-008528-catalogue.webp',description:'El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO.'},
 {id:'dib036',code:'DIB-036',catalogId:'dibujo-013422',title:'Curvas entrelazadas en rosa y gris',kind:'drawing',image:'assets/drawing-013422-catalogue.webp',description:'Curvas entrelazadas en rosa y gris. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib037',code:'DIB-037',catalogId:'dibujo-013423',title:'Planos angulares en gris',kind:'drawing',image:'assets/drawing-013423-catalogue.webp',description:'Planos angulares en gris. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib038',code:'DIB-038',catalogId:'dibujo-013426',title:'Formas azules que se encuentran',kind:'drawing',image:'assets/drawing-013426-catalogue.webp',description:'Formas azules que se encuentran. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib039',code:'DIB-039',catalogId:'dibujo-013427',title:'Un arco amarillo sobre trazos rojos',kind:'drawing',image:'assets/drawing-013427-catalogue.webp',description:'Un arco amarillo sobre trazos rojos. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib040',code:'DIB-040',catalogId:'dibujo-013430',title:'Dos formas curvas en azul',kind:'drawing',image:'assets/drawing-013430-catalogue.webp',description:'Dos formas curvas en azul. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib041',code:'DIB-041',catalogId:'dibujo-013431',title:'Encuentro de amarillos y rojos',kind:'drawing',image:'assets/drawing-013431-catalogue.webp',description:'Encuentro de amarillos y rojos. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib042',code:'DIB-042',catalogId:'dibujo-013434',title:'Una construcción de líneas azules y naranjas',kind:'drawing',image:'assets/drawing-013434-catalogue.webp',description:'Una construcción de líneas azules y naranjas. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib043',code:'DIB-043',catalogId:'dibujo-013435',title:'Trama de líneas azules y rojas',kind:'drawing',image:'assets/drawing-013435-catalogue.webp',description:'Trama de líneas azules y rojas. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib044',code:'DIB-044',catalogId:'dibujo-013436',title:'Una composición abierta en rojo',kind:'drawing',image:'assets/drawing-013436-catalogue.webp',description:'Una composición abierta en rojo. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib045',code:'DIB-045',catalogId:'dibujo-013439',title:'Ritmos grises y acentos naranjas',kind:'drawing',image:'assets/drawing-013439-catalogue.webp',description:'Ritmos grises y acentos naranjas. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib046',code:'DIB-046',catalogId:'dibujo-013440',title:'Planos grises atravesados por el amarillo',kind:'drawing',image:'assets/drawing-013440-catalogue.webp',description:'Planos grises atravesados por el amarillo. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib047',code:'DIB-047',catalogId:'dibujo-013441',title:'Una trama densa de líneas y color',kind:'drawing',image:'assets/drawing-013441-catalogue.webp',description:'Una trama densa de líneas y color. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib048',code:'DIB-048',catalogId:'dibujo-013443',title:'Curvas grises sobre el papel',kind:'drawing',image:'assets/drawing-013443-catalogue.webp',description:'Curvas grises sobre el papel. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib049',code:'DIB-049',catalogId:'dibujo-013447',title:'Dos curvas y una línea oblicua',kind:'drawing',image:'assets/drawing-013447-catalogue.webp',description:'Dos curvas y una línea oblicua. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib050',code:'DIB-050',catalogId:'dibujo-013448',title:'Trazos rojos entre planos grises',kind:'drawing',image:'assets/drawing-013448-catalogue.webp',description:'Trazos rojos entre planos grises. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib051',code:'DIB-051',catalogId:'dibujo-013449',title:'Formas superpuestas en marrón',kind:'drawing',image:'assets/drawing-013449-catalogue.webp',description:'Formas superpuestas en marrón. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib052',code:'DIB-052',catalogId:'dibujo-013452',title:'Planos azules y naranjas',kind:'drawing',image:'assets/drawing-013452-catalogue.webp',description:'Planos azules y naranjas. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:'dib053',code:'DIB-053',catalogId:'dibujo-013453',title:'Una forma angular en azul y violeta',kind:'drawing',image:'assets/drawing-013453-catalogue.webp',description:'Una forma angular en azul y violeta. Una pieza del archivo de ENRIC SEGARRA I GARIBO. El dibujo explora la relación entre línea, color y espacio sobre el papel. El nombre es una descripción provisional de la imagen.'},
 {id:"mov001",code:"MOV-001",catalogId:"suspension-rosa",title:"Composición suspendida en rosa",kind:'mobile',image:"assets/mov-001.webp",glb:"assets/hy3d-mov-001.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-001-1.webp",w:1.388,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-001-2.webp",w:1.401,h:2.15,label:"Ángulo 2"},{src:"assets/cut-mov-001-3.webp",w:1.414,h:2.15,label:"Ángulo 3"}],height:2.15,description:"Composición suspendida en rosa (MOV-001). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov002",code:"MOV-002",catalogId:"moviles-014603",title:"Una línea en suspensión",kind:'mobile',image:"assets/mov-002.webp",glb:"assets/hy3d-mov-002.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-002-1.webp",w:0.26,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-002-2.webp",w:0.326,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-002-3.webp",w:0.584,h:1.95,label:"Ángulo 3"}],height:1.95,description:"Una línea en suspensión (MOV-002). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov003",code:"MOV-003",catalogId:"moviles-014614",title:"Rama oscura, acentos rojos",kind:'mobile',image:"assets/mov-003.webp",glb:"assets/hy3d-mov-003.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-003-1.webp",w:0.349,h:2.3,label:"Vista frontal"},{src:"assets/cut-mov-003-2.webp",w:0.825,h:2.3,label:"Detalle central",cutout:false},{src:"assets/cut-mov-003-3.webp",w:1.193,h:2.3,label:"Detalle inferior",cutout:false}],height:2.3,description:"Rama oscura, acentos rojos (MOV-003). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov004",code:"MOV-004",catalogId:"moviles-014624",title:"Figuras sobre una barra roja",kind:'mobile',image:"assets/mov-004.webp",glb:"assets/hy3d-mov-004.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-004-1.webp",w:0.83,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-004-2.webp",w:0.846,h:2.15,label:"Ángulo 2"},{src:"assets/cut-mov-004-3.webp",w:0.93,h:2.15,label:"Ángulo 3"}],height:2.15,description:"Figuras sobre una barra roja (MOV-004). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov005",code:"MOV-005",catalogId:"forma-verde",title:"Forma suspendida en verde",kind:'mobile',image:"assets/mov-005.webp",glb:"assets/hy3d-mov-005.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-005-1.webp",w:1.314,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-005-5.webp",w:1.226,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-005-3.webp",w:1.11,h:1.95,label:"Ángulo 3"},{src:"assets/cut-mov-005-4.webp",w:1.141,h:1.95,label:"Ángulo 4"},{src:"assets/cut-mov-005-2.webp",w:1.309,h:1.95,label:"Detalle de codos",cutout:false},{src:"assets/ctx-mov-005-1.webp",w:1.3,h:1.95,label:"En el entorno",cutout:false}],height:1.95,description:"Forma suspendida en verde (MOV-005). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov006",code:"MOV-006",catalogId:"moviles-014659",title:"Tubos rosas sobre un arco",kind:'mobile',image:"assets/mov-006.webp",glb:"assets/hy3d-mov-006.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-006-1.webp",w:0.514,h:2.3,label:"Vista frontal"},{src:"assets/cut-mov-006-2.webp",w:0.421,h:2.3,label:"Ángulo 2"},{src:"assets/cut-mov-006-5.webp",w:0.446,h:2.3,label:"Ángulo 3"},{src:"assets/cut-mov-006-4.webp",w:0.738,h:2.3,label:"Ángulo 4"},{src:"assets/cut-mov-006-3.webp",w:1.533,h:2.3,label:"Detalle de tubos",cutout:false},{src:"assets/ctx-mov-006-1.webp",w:1.533,h:2.3,label:"En el entorno",cutout:false}],height:2.3,description:"Tubos rosas sobre un arco (MOV-006). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov007",code:"MOV-007",catalogId:"moviles-014678",title:"Estructura clara y elementos cilíndricos",kind:'mobile',image:"assets/mov-007.webp",glb:"assets/hy3d-mov-007.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-007-1.webp",w:0.796,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-007-2.webp",w:0.729,h:2.15,label:"Ángulo 2"},{src:"assets/cut-mov-007-3.webp",w:0.718,h:2.15,label:"Ángulo 3"}],height:2.15,description:"Estructura clara y elementos cilíndricos (MOV-007). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov008",code:"MOV-008",catalogId:"moviles-014691",title:"Pequeño volumen abierto en rosa",kind:'mobile',image:"assets/mov-008.webp",glb:"assets/hy3d-mov-008.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-008-1.webp",w:0.626,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-008-2.webp",w:0.956,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-008-3.webp",w:1.299,h:1.95,label:"Ángulo 3"},{src:"assets/cut-mov-008-4.webp",w:0.578,h:1.95,label:"Ángulo 4"}],height:1.95,description:"Pequeño volumen abierto en rosa (MOV-008). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov009",code:"MOV-009",catalogId:"moviles-014713",title:"Una columna de discos rosas",kind:'mobile',image:"assets/mov-009.webp",glb:"assets/hy3d-mov-009.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-009-1.webp",w:0.215,h:2.3,label:"Vista frontal"},{src:"assets/cut-mov-009-2.webp",w:0.285,h:2.3,label:"Segundo ángulo"}],height:2.3,description:"Una columna de discos rosas (MOV-009). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov010",code:"MOV-010",catalogId:"moviles-014720",title:"Escalera de elementos claros",kind:'mobile',image:"assets/mov-010.webp",glb:"assets/hy3d-mov-010.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-010-1.webp",w:0.266,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-010-2.webp",w:0.506,h:2.15,label:"Segundo ángulo"}],height:2.15,description:"Escalera de elementos claros (MOV-010). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov011",code:"MOV-011",catalogId:"moviles-014726",title:"Líneas rosas ramificadas",kind:'mobile',image:"assets/mov-011.webp",glb:"assets/hy3d-mov-011.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-011-1.webp",w:1.04,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-011-2.webp",w:1.099,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-011-3.webp",w:0.959,h:1.95,label:"Ángulo 3"},{src:"assets/cut-mov-011-4.webp",w:0.738,h:1.95,label:"Ángulo 4"}],height:1.95,description:"Líneas rosas ramificadas (MOV-011). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov012",code:"MOV-012",catalogId:"moviles-014748",title:"Curvas de tubo corrugado",kind:'mobile',image:"assets/mov-012.webp",glb:"assets/hy3d-mov-012.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-012-1.webp",w:1.187,h:2.3,label:"Vista frontal"},{src:"assets/cut-mov-012-2.webp",w:0.912,h:2.3,label:"Ángulo 2"},{src:"assets/cut-mov-012-3.webp",w:0.964,h:2.3,label:"Ángulo 3"}],height:2.3,description:"Curvas de tubo corrugado (MOV-012). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov013",code:"MOV-013",catalogId:"moviles-014764",title:"Discos rosas en dos recorridos",kind:'mobile',image:"assets/mov-013.webp",glb:"assets/hy3d-mov-013.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-013-1.webp",w:0.798,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-013-2.webp",w:0.81,h:2.15,label:"Detalle 1",cutout:false},{src:"assets/cut-mov-013-3.webp",w:0.74,h:2.15,label:"Detalle 2",cutout:false}],height:2.15,description:"Discos rosas en dos recorridos (MOV-013). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov014",code:"MOV-014",catalogId:"aros",title:"Composición de aros",kind:'mobile',image:"assets/mov-014.webp",glb:"assets/hy3d-mov-014.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-014-1.webp",w:1.273,h:1.95,label:"Vista frontal"}],height:1.95,description:"Composición de aros (MOV-014). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov015",code:"MOV-015",catalogId:"moviles-014821",title:"Una forma articulada",kind:'mobile',image:"assets/mov-015.webp",glb:"assets/hy3d-mov-015.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-015-4.webp",w:0.7,h:2.15,label:"Vista vertical"},{src:"assets/cut-mov-015-1.webp",w:2.155,h:1.24,label:"Vista horizontal 1"},{src:"assets/cut-mov-015-3.webp",w:1.905,h:1.24,label:"Vista horizontal 2"},{src:"assets/cut-mov-015-2.webp",w:1.691,h:2.15,label:"Detalle articulado",cutout:false},{src:"assets/ctx-mov-015-1.webp",w:3.224,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-015-2.webp",w:3.225,h:2.15,label:"En el entorno 2",cutout:false}],height:2.3,description:"Una forma articulada (MOV-015). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov016",code:"MOV-016",catalogId:"ramas-y-color",title:"Pieza entre las ramas",kind:'mobile',image:"assets/mov-016.webp",glb:"assets/hy3d-mov-016.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-016-1.webp",w:1.669,h:2.15,label:"Vista frontal"},{src:"assets/mov-016.webp",w:1.433,h:2.15,label:"Vista de estudio",cutout:false},{src:"assets/ctx-mov-016-1.webp",w:3.225,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-016-2.webp",w:1.434,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:"Pieza entre las ramas (MOV-016). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov017",code:"MOV-017",catalogId:"moviles-014850",title:"Planos de color entre los árboles",kind:'mobile',image:"assets/mov-017.webp",glb:"assets/hy3d-mov-017.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-017-1.webp",w:1.719,h:1.95,label:"Vista frontal"},{src:"assets/mov-017.webp",w:1.3,h:1.95,label:"Vista de estudio",cutout:false},{src:"assets/ctx-mov-017-1.webp",w:1.3,h:1.95,label:"En el entorno",cutout:false}],height:1.95,description:"Planos de color entre los árboles (MOV-017). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov018",code:"MOV-018",catalogId:"moviles-014879",title:"Líneas de color al aire libre",kind:'mobile',image:"assets/mov-018.webp",glb:"assets/hy3d-mov-018.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-018-1.webp",w:1.126,h:2.3,label:"Vista frontal"},{src:"assets/mov-018.webp",w:1.533,h:2.3,label:"Vista de estudio",cutout:false},{src:"assets/ctx-mov-018-1.webp",w:1.533,h:2.3,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-018-2.webp",w:1.534,h:2.3,label:"En el entorno 2",cutout:false}],height:2.3,description:"Líneas de color al aire libre (MOV-018). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov019",code:"MOV-019",catalogId:"moviles-014887",title:"Círculo azul y blanco",kind:'mobile',image:"assets/mov-019.webp",glb:"assets/hy3d-mov-019.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-019-1.webp",w:1.759,h:2.15,label:"Vista frontal"},{src:"assets/mov-019.webp",w:1.433,h:2.15,label:"Vista de estudio",cutout:false},{src:"assets/ctx-mov-019-1.webp",w:3.225,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-019-2.webp",w:1.434,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:"Círculo azul y blanco (MOV-019). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov020",code:"MOV-020",catalogId:"moviles-008941",title:"Estructura de líneas oscuras y esferas",kind:'mobile',image:"assets/mov-020.webp",glb:"assets/hy3d-mov-020.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-020-1.webp",w:1.544,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-020-2.webp",w:1.383,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-020-3.webp",w:1.479,h:1.95,label:"Ángulo 3"}],height:1.95,description:"Estructura de líneas oscuras y esferas (MOV-020). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov021",code:"MOV-021",catalogId:"moviles-008911",title:"Fragmentos de color suspendidos",kind:'mobile',image:"assets/mov-021.webp",glb:"assets/hy3d-mov-021.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-021-1.webp",w:2.236,h:2.3,label:"Vista frontal"},{src:"assets/ctx-mov-021-1.webp",w:1.725,h:2.3,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-021-2.webp",w:3.067,h:2.3,label:"En el entorno 2",cutout:false}],height:2.3,description:"Fragmentos de color suspendidos (MOV-021). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov022",code:"MOV-022",catalogId:"moviles-014955",title:"Arcos oscuros y pequeños acentos de color",kind:'mobile',image:"assets/mov-022.webp",glb:"assets/hy3d-mov-022.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-022-1.webp",w:1.456,h:2.15,label:"Vista frontal"},{src:"assets/mov-022.webp",w:1.433,h:2.15,label:"Vista de estudio",cutout:false},{src:"assets/ctx-mov-022-1.webp",w:1.612,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-022-2.webp",w:1.612,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:"Arcos oscuros y pequeños acentos de color (MOV-022). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov023",code:"MOV-023",catalogId:"moviles-014976",title:"Círculos rojos entrelazados",kind:'mobile',image:"assets/mov-023.webp",glb:"assets/hy3d-mov-023.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-023-1.webp",w:1.137,h:1.95,label:"Vista frontal"},{src:"assets/mov-023.webp",w:1.3,h:1.95,label:"Vista de estudio",cutout:false},{src:"assets/ctx-mov-023-1.webp",w:1.462,h:1.95,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-023-2.webp",w:1.462,h:1.95,label:"En el entorno 2",cutout:false}],height:1.95,description:"Círculos rojos entrelazados (MOV-023). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov024",code:"MOV-024",catalogId:"moviles-015000",title:"Curvas azules y verdes",kind:'mobile',image:"assets/mov-024.webp",glb:"assets/hy3d-mov-024.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-024-1.webp",w:1.803,h:2.3,label:"Vista frontal"},{src:"assets/ctx-mov-024-1.webp",w:1.725,h:2.3,label:"En el entorno",cutout:false}],height:2.3,description:"Curvas azules y verdes (MOV-024). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov025",code:"MOV-025",catalogId:"moviles-015002",title:"Trama oscura con flores de color",kind:'mobile',image:"assets/mov-025.webp",glb:"assets/hy3d-mov-025.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-025-1.webp",w:1.227,h:2.15,label:"Vista frontal"},{src:"assets/mov-025.webp",w:1.433,h:2.15,label:"Vista de estudio",cutout:false},{src:"assets/ctx-mov-025-1.webp",w:1.612,h:2.15,label:"En el entorno",cutout:false}],height:2.15,description:"Trama oscura con flores de color (MOV-025). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov026",code:"MOV-026",catalogId:"moviles-015006",title:"Arco rojo y discos azules",kind:'mobile',image:"assets/mov-026.webp",glb:"assets/hy3d-mov-026.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-026-1.webp",w:1.2,h:1.95,label:"Vista frontal"},{src:"assets/mov-026.webp",w:1.3,h:1.95,label:"Vista de estudio",cutout:false},{src:"assets/ctx-mov-026-1.webp",w:1.462,h:1.95,label:"En el entorno",cutout:false}],height:1.95,description:"Arco rojo y discos azules (MOV-026). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov027",code:"MOV-027",catalogId:"moviles-015011",title:"Un recorrido de pequeños discos",kind:'mobile',image:"assets/mov-027.webp",glb:"assets/hy3d-mov-027.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-027-1.webp",w:1.145,h:2.3,label:"Vista frontal"},{src:"assets/ctx-mov-027-1.webp",w:1.725,h:2.3,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-027-2.webp",w:1.725,h:2.3,label:"En el entorno 2",cutout:false}],height:2.3,description:"Un recorrido de pequeños discos (MOV-027). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov028",code:"MOV-028",catalogId:"moviles-015021",title:"Círculo abierto de muchos colores",kind:'mobile',image:"assets/mov-028.webp",glb:"assets/hy3d-mov-028.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-028-1.webp",w:1.58,h:2.15,label:"Vista frontal"},{src:"assets/mov-028.webp",w:1.433,h:2.15,label:"Vista de estudio",cutout:false},{src:"assets/ctx-mov-028-1.webp",w:1.813,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-028-2.webp",w:1.924,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:"Círculo abierto de muchos colores (MOV-028). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov029",code:"MOV-029",catalogId:"moviles-015045",title:"Estructura abierta y un aro de color",kind:'mobile',image:"assets/mov-029.webp",glb:"assets/hy3d-mov-029.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-029-1.webp",w:1.396,h:1.95,label:"Vista frontal"},{src:"assets/ctx-mov-029-1.webp",w:2.206,h:1.95,label:"En el entorno",cutout:false}],height:1.95,description:"Estructura abierta y un aro de color (MOV-029). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov030",code:"MOV-030",catalogId:"moviles-015051",title:"Columna de discos multicolores",kind:'mobile',image:"assets/mov-030.webp",glb:"assets/hy3d-mov-030.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-030-1.webp",w:1.236,h:2.3,label:"Vista frontal"},{src:"assets/ctx-mov-030-1.webp",w:1.725,h:2.3,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-030-2.webp",w:1.517,h:2.3,label:"En el entorno 2",cutout:false}],height:2.3,description:"Columna de discos multicolores (MOV-030). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov031",code:"MOV-031",catalogId:"moviles-015058",title:"Recipientes rosas, verdes y amarillos",kind:'mobile',image:"assets/mov-031.webp",glb:"assets/hy3d-mov-031.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-031-1.webp",w:2.295,h:2.15,label:"Vista frontal"},{src:"assets/ctx-mov-031-1.webp",w:2.862,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-031-2.webp",w:2.857,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:"Recipientes rosas, verdes y amarillos (MOV-031). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov032",code:"MOV-032",catalogId:"moviles-015062",title:"Ramas y figuras geométricas",kind:'mobile',image:"assets/mov-032.webp",glb:"assets/hy3d-mov-032.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-032-1.webp",w:0.999,h:1.95,label:"Vista frontal"},{src:"assets/mov-032.webp",w:1.3,h:1.95,label:"Vista de estudio",cutout:false},{src:"assets/ctx-mov-032-1.webp",w:1.468,h:1.95,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-032-2.webp",w:1.47,h:1.95,label:"En el entorno 2",cutout:false}],height:1.95,description:"Ramas y figuras geométricas (MOV-032). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov033",code:"MOV-033",catalogId:"moviles-015067",title:"Pequeños recipientes suspendidos",kind:'mobile',image:"assets/mov-033.webp",glb:"assets/hy3d-mov-033.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-033-1.webp",w:1.693,h:2.3,label:"Vista frontal"},{src:"assets/mov-033.webp",w:1.533,h:2.3,label:"Vista de estudio",cutout:false},{src:"assets/ctx-mov-033-1.webp",w:1.732,h:2.3,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-033-2.webp",w:1.725,h:2.3,label:"En el entorno 2",cutout:false}],height:2.3,description:"Pequeños recipientes suspendidos (MOV-033). Escultura móvil suspendida de Enric Segarra. Explórala en 360°, ajusta la altura de cámara (E/Q) para verla frente a frente y alterna entre Volumen 3D e Imagen en 3D."}
,
 {id:"dib001",code:"DIB-001",catalogId:"dibujo-015079",title:"Signos rojos en recorrido",kind:'drawing',category:"dibujo",series:"Figuras y símbolos",aspect:1.5,image:"../assets/drawing-015079-catalogue.webp",description:"El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO."},
 {id:"dib016",code:"DIB-016",catalogId:"dibujo-015094",title:"Pequeña composición de símbolos",kind:'drawing',category:"dibujo",series:"Figuras y símbolos",aspect:1.5,image:"../assets/drawing-015094-catalogue.webp",description:"El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO."},
 {id:"dib017",code:"DIB-017",catalogId:"dibujo-015095",title:"Pequeña composición enmarcada",kind:'drawing',category:"dibujo",series:"Figuras y símbolos",aspect:1.5,image:"../assets/drawing-015095-catalogue.webp",description:"El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO."},
 {id:"dib031",code:"DIB-031",catalogId:"dibujo-015185",title:"Símbolos sobre fondo amarillo",kind:'drawing',category:"dibujo",series:"Figuras y símbolos",aspect:1.5,image:"../assets/drawing-015185-catalogue.webp",description:"El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO."},
 {id:"dib032",code:"DIB-032",catalogId:"dibujo-015186",title:"Figura con forma de sol",kind:'drawing',category:"dibujo",series:"Figuras y símbolos",aspect:1.5,image:"../assets/drawing-015186-catalogue.webp",description:"El trazo, el color y las zonas de sombra construyen un espacio sobre el plano. Una obra del archivo de dibujo de ENRIC SEGARRA I GARIBO."},
 {id:"esc001",code:"ESC-001",catalogId:"escultura-014490",title:"Perfil recortado sobre fondo oscuro",kind:'sculpture',category:"escultura",series:"Relieves de planos recortados",aspect:1.618,image:"../assets/gallery-esc-001.webp",glb:"assets/hy3d-esc-001.glb",roughness:0.68,metalness:0.08,views:[{src:"assets/cut-esc-001-1.webp",w:0.583,h:0.36,label:'Vista frontal'},{src:"../assets/gallery-esc-001.webp",w:0.54,h:0.36,label:'Fotografía de archivo',cutout:false}],height:0.36,description:"Relieve mural de planos de madera recortada superpuestos sobre tablero oscuro."},
 {id:"esc002",code:"ESC-002",catalogId:"escultura-014492",title:"Relieve de líneas onduladas",kind:'sculpture',category:"escultura",series:"Relieves de planos recortados",aspect:1.017,image:"../assets/gallery-esc-002.webp",glb:"assets/hy3d-esc-002.glb",roughness:0.56,metalness:0.24,views:[{src:"assets/cut-esc-002-1.webp",w:0.793,h:0.78,label:'Vista frontal'},{src:"../assets/gallery-esc-002.webp",w:1.17,h:0.78,label:'Fotografía de archivo',cutout:false}],height:0.78,description:"Relieve mural de franjas y perfiles ondulados recortados con juegos de sombra."},
 {id:"esc003",code:"ESC-003",catalogId:"escultura-014494",title:"Plano recortado en diagonal",kind:'sculpture',category:"escultura",series:"Relieves de planos recortados",aspect:1.612,image:"../assets/gallery-esc-003.webp",glb:"assets/hy3d-esc-003.glb",roughness:0.68,metalness:0.08,views:[{src:"assets/cut-esc-003-1.webp",w:0.580,h:0.36,label:'Vista frontal'},{src:"../assets/gallery-esc-003.webp",w:0.54,h:0.36,label:'Fotografía de archivo',cutout:false}],height:0.36,description:"Relieve mural horizontal de madera recortada en diagonal con planos desplazados."},
 {id:"esc004",code:"ESC-004",catalogId:"escultura-014496",title:"Relieve de contornos angulares",kind:'sculpture',category:"escultura",series:"Relieves de planos recortados",aspect:1.377,image:"../assets/gallery-esc-004.webp",glb:"assets/hy3d-esc-004.glb",roughness:0.72,metalness:0.04,views:[{src:"assets/cut-esc-004-1.webp",w:1.019,h:0.74,label:'Vista frontal'},{src:"../assets/gallery-esc-004.webp",w:1.11,h:0.74,label:'Fotografía de archivo',cutout:false}],height:0.74,description:"Gran relieve mural de contornos angulares y planos escalonados en madera clara."},
 {id:"esc016",code:"ESC-016",catalogId:"escultura-014560",title:"Dos paneles con elementos superpuestos",kind:'sculpture',category:"escultura",series:"Relieves y ensamblajes murales",aspect:0.709,image:"../assets/gallery-esc-016.webp",glb:"assets/hy3d-esc-016.glb",roughness:0.74,metalness:0.06,views:[{src:"assets/cut-esc-016-1.webp",w:0.397,h:0.56,label:'Vista frontal'},{src:"../assets/gallery-esc-016.webp",w:0.84,h:0.56,label:'Fotografía de archivo',cutout:false}],height:0.56,description:"Díptico vertical de madera ensamblada con listones y piezas superpuestas."},
 {id:"esc017",code:"ESC-017",catalogId:"escultura-014562",title:"Relieve con forma circular abierta",kind:'sculpture',category:"escultura",series:"Relieves y ensamblajes murales",aspect:0.970,image:"../assets/gallery-esc-017.webp",glb:"assets/hy3d-esc-017.glb",roughness:0.78,metalness:0.04,views:[{src:"assets/cut-esc-017-1.webp",w:0.427,h:0.44,label:'Vista frontal'},{src:"../assets/gallery-esc-017.webp",w:0.66,h:0.44,label:'Fotografía de archivo',cutout:false}],height:0.44,description:"Relieve cuadrado con cavidad circular abierta y plano tallado."},
 {id:"esc018",code:"ESC-018",catalogId:"escultura-014564",title:"Relieve circular de capas concéntricas",kind:'sculpture',category:"escultura",series:"Relieves y ensamblajes murales",aspect:1.300,image:"../assets/gallery-esc-018.webp",glb:"assets/hy3d-esc-018.glb",roughness:0.72,metalness:0.14,views:[{src:"assets/cut-esc-018-1.webp",w:0.676,h:0.52,label:'Vista frontal'},{src:"../assets/gallery-esc-018.webp",w:0.78,h:0.52,label:'Fotografía de archivo',cutout:false}],height:0.52,description:"Relieve mural de anillos y capas concéntricas talladas y ensambladas."},
 {id:"esc019",code:"ESC-019",catalogId:"escultura-014565",title:"Ensamblaje circular con números",kind:'sculpture',category:"escultura",series:"Relieves y ensamblajes murales",aspect:1.000,image:"../assets/gallery-esc-019.webp",glb:"assets/hy3d-esc-019.glb",roughness:0.58,metalness:0.18,views:[{src:"assets/cut-esc-019-1.webp",w:0.520,h:0.52,label:'Vista frontal'},{src:"../assets/gallery-esc-019.webp",w:0.78,h:0.52,label:'Fotografía de archivo',cutout:false}],height:0.52,description:"Ensamblaje mural circular con esfera de números y piezas metálicas."},
 {id:"esc020",code:"ESC-020",catalogId:"escultura-014566",title:"Relieve circular con ruedas dentadas",kind:'sculpture',category:"escultura",series:"Relieves y ensamblajes murales",aspect:1.001,image:"../assets/gallery-esc-020.webp",glb:"assets/hy3d-esc-020.glb",roughness:0.48,metalness:0.38,views:[{src:"assets/cut-esc-020-1.webp",w:0.521,h:0.52,label:'Vista frontal'},{src:"../assets/gallery-esc-020.webp",w:0.78,h:0.52,label:'Fotografía de archivo',cutout:false}],height:0.52,description:"Relieve mural circular con coronas y ruedas dentadas de hierro ensambladas."},
 {id:"esc021",code:"ESC-021",catalogId:"escultura-014568",title:"Franja vertical con piezas superpuestas",kind:'sculpture',category:"escultura",series:"Relieves y ensamblajes murales",aspect:0.117,image:"../assets/gallery-esc-021.webp",glb:"assets/hy3d-esc-021.glb",roughness:0.80,metalness:0.04,views:[{src:"assets/cut-esc-021-1.webp",w:0.162,h:1.38,label:'Vista frontal'},{src:"../assets/gallery-esc-021.webp",w:2.07,h:1.38,label:'Fotografía de archivo',cutout:false}],height:1.38,description:"Estela vertical estrecha de madera con piezas talladas y superpuestas en columna."},
 {id:"esc022",code:"ESC-022",catalogId:"escultura-014570",title:"Relieve de contornos fragmentados",kind:'sculpture',category:"escultura",series:"Relieves y ensamblajes murales",aspect:0.910,image:"../assets/gallery-esc-022.webp",glb:"assets/hy3d-esc-022.glb",roughness:0.76,metalness:0.05,views:[{src:"assets/cut-esc-022-1.webp",w:0.564,h:0.62,label:'Vista frontal'},{src:"../assets/gallery-esc-022.webp",w:0.93,h:0.62,label:'Fotografía de archivo',cutout:false}],height:0.62,description:"Relieve mural de silueta recortada y volúmenes fragmentados."},
 {id:"esc023",code:"ESC-023",catalogId:"escultura-014571",title:"Relieve con arco circular",kind:'sculpture',category:"escultura",series:"Relieves y ensamblajes murales",aspect:0.843,image:"../assets/gallery-esc-023.webp",glb:"assets/hy3d-esc-023.glb",roughness:0.76,metalness:0.06,views:[{src:"assets/cut-esc-023-1.webp",w:0.506,h:0.60,label:'Vista frontal'},{src:"../assets/gallery-esc-023.webp",w:0.90,h:0.60,label:'Fotografía de archivo',cutout:false}],height:0.60,description:"Relieve mural con arco circular saliente y planos tallados."},
 {id:"esc024",code:"ESC-024",catalogId:"escultura-014572",title:"Relieve claro con dibujo inciso",kind:'sculpture',category:"escultura",series:"Relieves de textura",aspect:0.836,image:"../assets/gallery-esc-024.webp",glb:"assets/hy3d-esc-024.glb",roughness:0.84,metalness:0.02,views:[{src:"assets/cut-esc-024-1.webp",w:0.485,h:0.58,label:'Vista frontal'},{src:"../assets/gallery-esc-024.webp",w:0.87,h:0.58,label:'Fotografía de archivo',cutout:false}],height:0.58,description:"Placa mural de materia clara con surcos y dibujo inciso en la superficie."},
 {id:"esc025",code:"ESC-025",catalogId:"escultura-014573",title:"Relieve claro con trazos rojizos",kind:'sculpture',category:"escultura",series:"Relieves de textura",aspect:0.869,image:"../assets/gallery-esc-025.webp",glb:"assets/hy3d-esc-025.glb",roughness:0.84,metalness:0.02,views:[{src:"assets/cut-esc-025-1.webp",w:0.504,h:0.58,label:'Vista frontal'},{src:"../assets/gallery-esc-025.webp",w:0.87,h:0.58,label:'Fotografía de archivo',cutout:false}],height:0.58,description:"Placa mural texturada clara con incisiones y pigmentos rojizos."},
 {id:"esc026",code:"ESC-026",catalogId:"escultura-014574",title:"Relieve con rostro inciso",kind:'sculpture',category:"escultura",series:"Relieves de textura",aspect:0.876,image:"../assets/gallery-esc-026.webp",glb:"assets/hy3d-esc-026.glb",roughness:0.84,metalness:0.02,views:[{src:"assets/cut-esc-026-1.webp",w:0.456,h:0.52,label:'Vista frontal'},{src:"../assets/gallery-esc-026.webp",w:0.78,h:0.52,label:'Fotografía de archivo',cutout:false}],height:0.52,description:"Relieve de huella e incisión directa con perfil de rostro sobre placa clara."},
 {id:"esc027",code:"ESC-027",catalogId:"escultura-014575",title:"Relieve circular con tramas",kind:'sculpture',category:"escultura",series:"Relieves de textura",aspect:0.801,image:"../assets/gallery-esc-027.webp",glb:"assets/hy3d-esc-027.glb",roughness:0.78,metalness:0.10,views:[{src:"assets/cut-esc-027-1.webp",w:0.417,h:0.52,label:'Vista frontal'},{src:"../assets/gallery-esc-027.webp",w:0.78,h:0.52,label:'Fotografía de archivo',cutout:false}],height:0.52,description:"Relieve mural de composición circular y tramas de textura en relieve."},
 {id:"esc028",code:"ESC-028",catalogId:"escultura-014576",title:"Dos paneles verdes con bandas",kind:'sculpture',category:"escultura",series:"Relieves y ensamblajes murales",aspect:0.290,image:"../assets/gallery-esc-028.webp",glb:"assets/hy3d-esc-028.glb",roughness:0.72,metalness:0.03,views:[{src:"assets/cut-esc-028-1.webp",w:0.377,h:1.30,label:'Vista frontal'},{src:"../assets/gallery-esc-028.webp",w:1.95,h:1.30,label:'Fotografía de archivo',cutout:false}],height:1.30,description:"Díptico vertical alargado de dos paneles verdes policromados con bandas en relieve."},
 {id:"esc029",code:"ESC-029",catalogId:"escultura-014577",title:"Relieve claro con elementos rectangulares",kind:'sculpture',category:"escultura",series:"Relieves de textura",aspect:0.809,image:"../assets/gallery-esc-029.webp",glb:"assets/hy3d-esc-029.glb",roughness:0.82,metalness:0.06,views:[{src:"assets/cut-esc-029-1.webp",w:0.421,h:0.52,label:'Vista frontal'},{src:"../assets/gallery-esc-029.webp",w:0.78,h:0.52,label:'Fotografía de archivo',cutout:false}],height:0.52,description:"Relieve de pasta clara con huellas y elementos rectangulares impresos."},
 {id:"esc030",code:"ESC-030",catalogId:"escultura-014578",title:"Relieve rosa con figuras y piezas superpuestas",kind:'sculpture',category:"escultura",series:"Relieves y ensamblajes murales",aspect:1.072,image:"../assets/gallery-esc-030.webp",glb:"assets/hy3d-esc-030.glb",roughness:0.74,metalness:0.03,views:[{src:"assets/cut-esc-030-1.webp",w:0.622,h:0.58,label:'Vista frontal'},{src:"../assets/gallery-esc-030.webp",w:0.87,h:0.58,label:'Fotografía de archivo',cutout:false}],height:0.58,description:"Relieve policromado en rosa con figuras recortadas y piezas superpuestas."},
 {id:"esc046",code:"ESC-046",catalogId:"escultura-008728",title:"Ensamblaje rosa con círculo oscuro",kind:'sculpture',category:"escultura",series:"Relieves y ensamblajes murales",aspect:1.118,image:"../assets/gallery-esc-046.webp",glb:"assets/hy3d-esc-046.glb",roughness:0.58,metalness:0.22,views:[{src:"assets/cut-esc-046-1.webp",w:0.604,h:0.54,label:'Vista frontal'},{src:"../assets/gallery-esc-046.webp",w:0.81,h:0.54,label:'Fotografía de archivo',cutout:false}],height:0.54,description:"Ensamblaje mural en madera rosa con corona circular oscura en relieve."},
 {id:"esc047",code:"ESC-047",catalogId:"escultura-014959",title:"Árbol con elementos azules suspendidos",kind:'sculpture',category:"escultura",series:"Intervenciones en el entorno",aspect:0.650,image:"../assets/arc-014959.webp",views:[{src:"assets/cut-esc-047-1.webp",w:1.487,h:1.66,label:'Vista frontal'},{src:"../assets/arc-014959.webp",w:1.08,h:1.66,label:'Vista principal',cutout:false},{src:"../assets/gallery-esc-047-view-2-horizontal.webp",w:1.86,h:1.24,label:'Ángulo 2',cutout:false},{src:"../assets/gallery-esc-047-view-3-horizontal.webp",w:1.86,h:1.24,label:'Ángulo 3',cutout:false},{src:"../assets/gallery-esc-047-view-4-horizontal.webp",w:1.86,h:1.24,label:'Detalle',cutout:false}],height:1.66,description:"Árbol con elementos azules suspendidos en el entorno natural."},
 {id:"esc048",code:"ESC-048",catalogId:"escultura-014967",title:"Tres paneles de círculos de colores",kind:'sculpture',category:"escultura",series:"Intervenciones en el entorno",aspect:0.750,image:"../assets/arc-014967.webp",views:[{src:"assets/cut-esc-048-1.webp",w:0.376,h:1.52,label:'Vista frontal'},{src:"../assets/arc-014967.webp",w:1.20,h:1.60,label:'Vista principal',cutout:false},{src:"../assets/gallery-esc-048-view-2-horizontal.webp",w:1.86,h:1.24,label:'En el entorno',cutout:false}],height:1.60,description:"Tres paneles de círculos de colores suspendidos junto al tronco."},
 {id:"esc049",code:"ESC-049",catalogId:"escultura-014968",title:"Conjunto de cilindros y ramas",kind:'sculpture',category:"escultura",series:"Intervenciones en el entorno",aspect:0.750,image:"../assets/arc-014968.webp",views:[{src:"assets/cut-esc-049-1.webp",w:2.114,h:1.36,label:'Vista frontal'},{src:"../assets/arc-014968.webp",w:1.02,h:1.36,label:'Vista principal',cutout:false},{src:"../assets/gallery-esc-049-view-2-horizontal.webp",w:1.80,h:1.20,label:'Vista del conjunto',cutout:false},{src:"../assets/gallery-esc-049-view-3-horizontal.webp",w:1.80,h:1.20,label:'Ángulo 3',cutout:false},{src:"../assets/gallery-esc-049-view-4-horizontal.webp",w:1.80,h:1.20,label:'Detalle',cutout:false}],height:1.36,description:"Conjunto escultórico de suelo formado por cuatro bloques rústicos, cilindros graduados, tubos blancos y haces de ramas."},
 {id:"esc050",code:"ESC-050",catalogId:"escultura-014978",title:"Árbol con figuras de colores",kind:'sculpture',category:"escultura",series:"Intervenciones en el entorno",aspect:0.750,image:"../assets/arc-014978.webp",views:[{src:"assets/cut-esc-050-1.webp",w:1.893,h:1.60,label:'Vista frontal'},{src:"../assets/arc-014978.webp",w:1.20,h:1.60,label:'Vista principal',cutout:false},{src:"../assets/gallery-esc-050-view-2-horizontal.webp",w:1.86,h:1.24,label:'Ángulo 2',cutout:false},{src:"../assets/gallery-esc-050-view-3-horizontal.webp",w:1.86,h:1.24,label:'Ángulo 3',cutout:false}],height:1.60,description:"Árbol con figuras recortadas de colores suspendidas."},
 {id:"esc051",code:"ESC-051",catalogId:"escultura-015032",title:"Composición circular de piezas ensambladas",kind:'sculpture',category:"escultura",series:"Intervenciones en el entorno",aspect:0.716,image:"../assets/arc-015032.webp",views:[{src:"assets/cut-esc-051-1.webp",w:0.702,h:0.92,label:'Vista frontal'},{src:"../assets/arc-015032.webp",w:0.96,h:1.34,label:'Vista principal',cutout:false},{src:"../assets/gallery-esc-051-view-2-horizontal.webp",w:1.68,h:1.12,label:'Detalle frontal',cutout:false}],height:1.34,description:"Composición circular de engranajes y piezas metálicas ensambladas."},
 {id:"esc052",code:"ESC-052",catalogId:"escultura-015076",title:"Tronco vertical con elementos superpuestos",kind:'sculpture',category:"escultura",series:"Intervenciones en el entorno",aspect:0.754,image:"../assets/arc-015076.webp",views:[{src:"assets/cut-esc-052-1.webp",w:0.301,h:1.98,label:'Vista frontal'},{src:"../assets/arc-015076.webp",w:1.36,h:1.80,label:'Vista principal',cutout:false},{src:"../assets/gallery-esc-052-view-2-horizontal.webp",w:1.86,h:1.24,label:'En el entorno',cutout:false}],height:1.98,description:"Columna escultórica vertical de suelo en tronco rústico con fragmentos cerámicos salientes y herrajes de fundición."},
 {id:"pin001",code:"PIN-001",catalogId:"arca",title:"Arca en composición circular",kind:'painting',category:"pintura",series:"Arcas",aspect:1.5,image:"../assets/pin-001-estudio-v3.webp",description:"Arca en composición circular."},
 {id:"pin002",code:"PIN-002",catalogId:"pintura-015107",title:"Sol en composición circular",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-002-estudio-v3.webp",description:"Sol en composición circular."},
 {id:"pin003",code:"PIN-003",catalogId:"pintura-015108",title:"Arca sobre fondo oscuro",kind:'painting',category:"pintura",series:"Gatos",aspect:1.5,image:"../assets/pin-003-estudio-v3.webp",description:"Arca sobre fondo oscuro."},
 {id:"pin004",code:"PIN-004",catalogId:"pintura-015109",title:"Ojo en composición circular",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-004-estudio-v3.webp",description:"Ojo en composición circular."},
 {id:"pin005",code:"PIN-005",catalogId:"pintura-015110",title:"Arca y cielo claro",kind:'painting',category:"pintura",series:"Arcas",aspect:1.5,image:"../assets/pin-005-estudio-v3.webp",description:"Arca y cielo claro."},
 {id:"pin006",code:"PIN-006",catalogId:"pintura-015111",title:"Símbolos en círculo",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-006-estudio-v3.webp",description:"Símbolos en círculo."},
 {id:"pin007",code:"PIN-007",catalogId:"pintura-015112",title:"Arca sobre fondo azul",kind:'painting',category:"pintura",series:"Arcas",aspect:1.5,image:"../assets/pin-007-estudio-v3.webp",description:"Arca sobre fondo azul."},
 {id:"pin008",code:"PIN-008",catalogId:"pintura-015113",title:"Arca y formas azules",kind:'painting',category:"pintura",series:"Arcas",aspect:1.5,image:"../assets/pin-008-estudio-v3.webp",description:"Arca y formas azules."},
 {id:"pin009",code:"PIN-009",catalogId:"pintura-015114",title:"Composición circular con sol y montañas",kind:'painting',category:"pintura",series:"Gatos",aspect:1.5,image:"../assets/pin-009-estudio-v3.webp",description:"Composición circular con sol y montañas."},
 {id:"pin010",code:"PIN-010",catalogId:"pintura-015115",title:"Árbol en círculo violeta",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-010-estudio-v3.webp",description:"Árbol en círculo violeta."},
 {id:"pin011",code:"PIN-011",catalogId:"pintura-015118",title:"Arca sobre aguas rosas",kind:'painting',category:"pintura",series:"Arcas",aspect:1.5,image:"../assets/pin-011-estudio-v3.webp",description:"Arca sobre aguas rosas."},
 {id:"pin012",code:"PIN-012",catalogId:"pintura-015119",title:"Círculo naranja de figuras",kind:'painting',category:"pintura",series:"Gatos",aspect:1.5,image:"../assets/pin-012-estudio-v3.webp",description:"Círculo naranja de figuras."},
 {id:"pin013",code:"PIN-013",catalogId:"pintura-015120",title:"Figuras enlazadas en rosa",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-013-estudio-v3.webp",description:"Figuras enlazadas en rosa."},
 {id:"pin014",code:"PIN-014",catalogId:"pintura-015122",title:"Arca entre el sol y la luna",kind:'painting',category:"pintura",series:"Arcas",aspect:1.5,image:"../assets/pin-014-estudio-v3.webp",description:"Arca entre el sol y la luna."},
 {id:"pin015",code:"PIN-015",catalogId:"pintura-015123",title:"Rostro sobre fondo amarillo",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:0.667,image:"../assets/pin-015-estudio-v3.webp",description:"Rostro sobre fondo amarillo."},
 {id:"pin016",code:"PIN-016",catalogId:"pintura-015124",title:"Rostro coronado sobre fondo dorado",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:0.667,image:"../assets/pin-016-estudio-v3.webp",description:"Rostro coronado sobre fondo dorado."},
 {id:"pin017",code:"PIN-017",catalogId:"pintura-015125",title:"Figuras sobre fondo violeta",kind:'painting',category:"pintura",series:"Gatos",aspect:0.667,image:"../assets/pin-017-estudio-v3.webp",description:"Figuras sobre fondo violeta."},
 {id:"pin018",code:"PIN-018",catalogId:"pintura-015126",title:"Dos rostros y vegetación",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:0.667,image:"../assets/pin-018-estudio-v3.webp",description:"Dos rostros y vegetación."},
 {id:"pin019",code:"PIN-019",catalogId:"gato",title:"Rostro junto a un gato violeta",kind:'painting',category:"pintura",series:"Gatos",aspect:0.667,image:"../assets/pin-019-estudio-v3.webp",description:"Rostro junto a un gato violeta."},
 {id:"pin020",code:"PIN-020",catalogId:"pintura-015128",title:"Cabeza de toro de perfiles claros",kind:'painting',category:"pintura",series:"Tauromaquia",aspect:0.667,image:"../assets/pin-020-estudio-v3.webp",description:"Cabeza de toro de perfiles claros."},
 {id:"pin021",code:"PIN-021",catalogId:"pintura-015129",title:"Cabeza de toro naranja",kind:'painting',category:"pintura",series:"Tauromaquia",aspect:0.667,image:"../assets/pin-021-estudio-v3.webp",description:"Cabeza de toro naranja."},
 {id:"pin022",code:"PIN-022",catalogId:"pintura-015130",title:"Cabeza de toro de perfil",kind:'painting',category:"pintura",series:"Tauromaquia",aspect:0.667,image:"../assets/pin-022-estudio-v3.webp",description:"Cabeza de toro de perfil."},
 {id:"pin023",code:"PIN-023",catalogId:"pintura-015131",title:"Gato de cuerpo violeta",kind:'painting',category:"pintura",series:"Gatos",aspect:1.5,image:"../assets/pin-023-estudio-v3.webp",description:"Gato de cuerpo violeta."},
 {id:"pin024",code:"PIN-024",catalogId:"pintura-015132",title:"Forma trilobulada",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-024-estudio-v3.webp",description:"Forma trilobulada."},
 {id:"pin025",code:"PIN-025",catalogId:"pintura-015133",title:"Figura azul de perfil",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-025-estudio-v3.webp",description:"Figura azul de perfil."},
 {id:"pin026",code:"PIN-026",catalogId:"pintura-015134",title:"Tres figuras con abanicos",kind:'painting',category:"pintura",series:"Tauromaquia",aspect:1.5,image:"../assets/pin-026-estudio-v3.webp",description:"Tres figuras con abanicos."},
 {id:"pin027",code:"PIN-027",catalogId:"pintura-015135",title:"Rostro de líneas cálidas",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:1.5,image:"../assets/pin-027-estudio-v3.webp",description:"Rostro de líneas cálidas."},
 {id:"pin028",code:"PIN-028",catalogId:"pintura-015136",title:"Rostro y formas circulares",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:0.667,image:"../assets/pin-028-estudio-v3.webp",description:"Rostro y formas circulares."},
 {id:"pin029",code:"PIN-029",catalogId:"pintura-015137",title:"Perfil dorado",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-029-estudio-v3.webp",description:"Perfil dorado."},
 {id:"pin030",code:"PIN-030",catalogId:"pintura-015138",title:"Figuras en formato alargado",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-030-estudio-v3.webp",description:"Figuras en formato alargado."},
 {id:"pin031",code:"PIN-031",catalogId:"pintura-015139",title:"Rostro naranja y mano azul",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:1.5,image:"../assets/pin-031-estudio-v3.webp",description:"Rostro naranja y mano azul."},
 {id:"pin032",code:"PIN-032",catalogId:"pintura-015141",title:"Dos personajes vestidos de verde",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:0.667,image:"../assets/pin-032-estudio-v3.webp",description:"Dos personajes vestidos de verde."},
 {id:"pin033",code:"PIN-033",catalogId:"pintura-015142",title:"Figura en rosa y ocre",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:1.5,image:"../assets/pin-033-estudio-v3.webp",description:"Figura en rosa y ocre."},
 {id:"pin034",code:"PIN-034",catalogId:"pintura-015143",title:"Rostro naranja y líneas de color",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:0.667,image:"../assets/pin-034-estudio-v3.webp",description:"Rostro naranja y líneas de color."},
 {id:"pin035",code:"PIN-035",catalogId:"pintura-015145",title:"Rostro con figuras alrededor",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:1.5,image:"../assets/pin-035-estudio-v3.webp",description:"Rostro con figuras alrededor."},
 {id:"pin036",code:"PIN-036",catalogId:"pintura-015146",title:"Trío de músicos y personajes",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:0.667,image:"../assets/pin-036-estudio-v3.webp",description:"Trío de músicos y personajes."},
 {id:"pin037",code:"PIN-037",catalogId:"pintura-015147",title:"Personaje ante una mesa",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:0.667,image:"../assets/pin-037-estudio-v3.webp",description:"Personaje ante una mesa."},
 {id:"pin038",code:"PIN-038",catalogId:"pintura-015148",title:"Rostro con tocado y símbolos dorados",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:0.667,image:"../assets/pin-038-estudio-v3.webp",description:"Rostro con tocado y símbolos dorados."},
 {id:"pin039",code:"PIN-039",catalogId:"pintura-015149",title:"Toro rosa con copa y figura al fondo",kind:'painting',category:"pintura",series:"Tauromaquia",aspect:0.667,image:"../assets/pin-039-estudio-v3.webp",description:"Toro rosa con copa y figura al fondo."},
 {id:"pin040",code:"PIN-040",catalogId:"pintura-015150",title:"Figuras sobre fondo lila",kind:'painting',category:"pintura",series:"Gatos",aspect:1.5,image:"../assets/pin-040-estudio-v3.webp",description:"Figuras sobre fondo lila."},
 {id:"pin041",code:"PIN-041",catalogId:"pintura-015152",title:"Líneas y planos sobre naranja",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-041-estudio-v3.webp",description:"Líneas y planos sobre naranja."},
 {id:"pin042",code:"PIN-042",catalogId:"pintura-015153",title:"Curvas blancas sobre naranja",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-042-estudio-v3.webp",description:"Curvas blancas sobre naranja."},
 {id:"pin043",code:"PIN-043",catalogId:"pintura-015154",title:"Remolino de formas claras",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-043-estudio-v3.webp",description:"Remolino de formas claras."},
 {id:"pin044",code:"PIN-044",catalogId:"pintura-015155",title:"Planos de colores suaves",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-044-estudio-v3.webp",description:"Planos de colores suaves."},
 {id:"pin045",code:"PIN-045",catalogId:"pintura-015156",title:"Planos violetas y ocres",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-045-estudio-v3.webp",description:"Planos violetas y ocres."},
 {id:"pin046",code:"PIN-046",catalogId:"pintura-015157",title:"Giro de formas rojas",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-046-estudio-v3.webp",description:"Giro de formas rojas."},
 {id:"pin047",code:"PIN-047",catalogId:"pintura-015158",title:"Formas entrelazadas",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-047-estudio-v3.webp",description:"Formas entrelazadas."},
 {id:"pin048",code:"PIN-048",catalogId:"pintura-015159",title:"Ritmo rojo y blanco",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-048-estudio-v3.webp",description:"Ritmo rojo y blanco."},
 {id:"pin049",code:"PIN-049",catalogId:"pintura-015160",title:"Curvas blancas y naranjas",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-049-estudio-v3.webp",description:"Curvas blancas y naranjas."},
 {id:"pin050",code:"PIN-050",catalogId:"pintura-015161",title:"Volúmenes de color",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-050-estudio-v3.webp",description:"Volúmenes de color."},
 {id:"pin051",code:"PIN-051",catalogId:"pintura-015162",title:"Encuentro de signos y color",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-051-estudio-v3.webp",description:"Encuentro de signos y color."},
 {id:"pin052",code:"PIN-052",catalogId:"pintura-015163",title:"Recorrido rojo y circular",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-052-estudio-v3.webp",description:"Recorrido rojo y circular."},
 {id:"pin053",code:"PIN-053",catalogId:"pintura-015164",title:"Signos en rojo",kind:'painting',category:"pintura",series:"Letras y signos",aspect:1.5,image:"../assets/pin-053-estudio-v3.webp",description:"Signos en rojo."},
 {id:"pin054",code:"PIN-054",catalogId:"pintura-015165",title:"Letras y figuras rojas",kind:'painting',category:"pintura",series:"Letras y signos",aspect:1.5,image:"../assets/pin-054-estudio-v3.webp",description:"Letras y figuras rojas."},
 {id:"pin055",code:"PIN-055",catalogId:"pintura-015167",title:"Composición vertical de signos",kind:'painting',category:"pintura",series:"Letras y signos",aspect:0.667,image:"../assets/pin-055-estudio-v3.webp",description:"Composición vertical de signos."},
 {id:"pin058",code:"PIN-058",catalogId:"pintura-015199",title:"Composición horizontal de tonos claros",kind:'painting',category:"pintura",series:"Abstracciones",aspect:1.5,image:"../assets/pin-058-estudio-v3.webp",description:"Composición horizontal de tonos claros."},
 {id:"pin060",code:"PIN-060",catalogId:"pintura-015202",title:"Composición circular azul",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-060-estudio-v3.webp",description:"Composición circular azul."},
 {id:"pin061",code:"PIN-061",catalogId:"pintura-015204",title:"Rostro de contorno poligonal",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:1.5,image:"../assets/pin-061-estudio-v3.webp",description:"Rostro de contorno poligonal."},
 {id:"pin062",code:"PIN-062",catalogId:"pintura-015206",title:"Arca de contorno recortado",kind:'painting',category:"pintura",series:"Arcas",aspect:1.5,image:"../assets/pin-062-estudio-v3.webp",description:"Arca de contorno recortado."},
 {id:"pin063",code:"PIN-063",catalogId:"pintura-015211",title:"Figura con instrumento y gato violeta",kind:'painting',category:"pintura",series:"Gatos",aspect:1.5,image:"../assets/pin-063-estudio-v3.webp",description:"Figura con instrumento y gato violeta."},
 {id:"pin064",code:"PIN-064",catalogId:"pintura-015213",title:"Dos gatos azules ante una ciudad",kind:'painting',category:"pintura",series:"Gatos",aspect:0.667,image:"../assets/pin-064-estudio-v3.webp",description:"Dos gatos azules ante una ciudad."},
 {id:"pin065",code:"PIN-065",catalogId:"pintura-015218",title:"Figura y dragón sobre fondo verde",kind:'painting',category:"pintura",series:"Relatos e iconografía",aspect:1.5,image:"../assets/pin-065-estudio-v3.webp",description:"Figura y dragón sobre fondo verde."},
 {id:"pin066",code:"PIN-066",catalogId:"pintura-015221",title:"Figura con espada y dragón",kind:'painting',category:"pintura",series:"Relatos e iconografía",aspect:1.5,image:"../assets/pin-066-estudio-v3.webp",description:"Figura con espada y dragón."},
 {id:"pin067",code:"PIN-067",catalogId:"pintura-015223",title:"Figura, escudo y dragón",kind:'painting',category:"pintura",series:"Relatos e iconografía",aspect:0.667,image:"../assets/pin-067-estudio-v3.webp",description:"Figura, escudo y dragón."},
 {id:"pin068",code:"PIN-068",catalogId:"pintura-015226",title:"Personajes ante el teatro de títeres",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:0.667,image:"../assets/pin-068-estudio-v3.webp",description:"Personajes ante el teatro de títeres."},
 {id:"pin069",code:"PIN-069",catalogId:"pintura-015228",title:"Toro y figuras",kind:'painting',category:"pintura",series:"Tauromaquia",aspect:1.5,image:"../assets/pin-069-estudio-v3.webp",description:"Toro y figuras."},
 {id:"pin070",code:"PIN-070",catalogId:"pintura-015234",title:"Composición en forma de ojo",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-070-estudio-v3.webp",description:"Composición en forma de ojo."},
 {id:"pin071",code:"PIN-071",catalogId:"pintura-015236",title:"Figuras del ruedo",kind:'painting',category:"pintura",series:"Tauromaquia",aspect:0.667,image:"../assets/pin-071-estudio-v3.webp",description:"Figuras del ruedo."},
 {id:"pin072",code:"PIN-072",catalogId:"pintura-015240",title:"Figura ante una ciudad",kind:'painting',category:"pintura",series:"Relatos e iconografía",aspect:1.5,image:"../assets/pin-072-estudio-v3.webp",description:"Figura ante una ciudad."},
 {id:"pin073",code:"PIN-073",catalogId:"pintura-015243",title:"Composición horizontal de figuras",kind:'painting',category:"pintura",series:"Figuras y símbolos",aspect:1.5,image:"../assets/pin-073-estudio-v3.webp",description:"Composición horizontal de figuras."},
 {id:"pin074",code:"PIN-074",catalogId:"ruedo",title:"Escena de ruedo",kind:'painting',category:"pintura",series:"Tauromaquia",aspect:0.667,image:"../assets/pin-074-estudio-v3.webp",description:"Escena de ruedo."},
 {id:"pin075",code:"PIN-075",catalogId:"pintura-008492",title:"Figura a caballo y dragón",kind:'painting',category:"pintura",series:"Relatos e iconografía",aspect:1,image:"../assets/pin-075-estudio-v3.webp",description:"Figura a caballo y dragón."},
 {id:"pin077",code:"PIN-077",catalogId:"pintura-015250",title:"Personajes alrededor de una mesa y figura a caballo",kind:'painting',category:"pintura",series:"Relatos e iconografía",aspect:0.667,image:"../assets/pin-077-estudio-v3.webp",description:"Personajes alrededor de una mesa y figura a caballo."},
 {id:"pin078",code:"PIN-078",catalogId:"pintura-015251",title:"Cabeza de toro ante espectadores",kind:'painting',category:"pintura",series:"Tauromaquia",aspect:0.667,image:"../assets/pin-078-estudio-v3.webp",description:"Cabeza de toro ante espectadores."},
 {id:"pin079",code:"PIN-079",catalogId:"pintura-015257",title:"Crucifixión con figuras",kind:'painting',category:"pintura",series:"Relatos e iconografía",aspect:0.667,image:"../assets/pin-079-estudio-v3.webp",description:"Crucifixión con figuras."},
 {id:"pin080",code:"PIN-080",catalogId:"pintura-015263",title:"Dos figuras en amarillo y rosa",kind:'painting',category:"pintura",series:"Rostros y personajes",aspect:0.667,image:"../assets/pin-080-estudio-v3.webp",description:"Dos figuras en amarillo y rosa."}
];
const CATALOG_META_BY_CODE={"MOV-001":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"suspension-rosa"},"MOV-002":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014603"},"MOV-003":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014614"},"MOV-004":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014624"},"MOV-005":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"forma-verde"},"MOV-006":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014659"},"MOV-007":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014678"},"MOV-008":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014691"},"MOV-009":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014713"},"MOV-010":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014720"},"MOV-011":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014726"},"MOV-012":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014748"},"MOV-013":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014764"},"MOV-014":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"aros"},"MOV-015":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014821"},"MOV-016":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"ramas-y-color"},"MOV-017":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014850"},"MOV-018":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014879"},"MOV-019":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014887"},"MOV-020":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-008941"},"MOV-021":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-008911"},"ESC-001":{"category":"escultura","series":"Relieves de planos recortados","aspect":1.5,"catalogId":"escultura-014490"},"ESC-002":{"category":"escultura","series":"Relieves de planos recortados","aspect":1.5,"catalogId":"escultura-014492"},"ESC-003":{"category":"escultura","series":"Relieves de planos recortados","aspect":1.5,"catalogId":"escultura-014494"},"ESC-004":{"category":"escultura","series":"Relieves de planos recortados","aspect":1.5,"catalogId":"escultura-014496"},"ESC-005":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-014502"},"ESC-006":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-014505"},"ESC-007":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-014507"},"ESC-008":{"category":"escultura","series":"Formas orgánicas","aspect":1.5,"catalogId":"escultura-014509"},"ESC-009":{"category":"escultura","series":"Formas orgánicas","aspect":1.5,"catalogId":"volumen-veta"},"ESC-010":{"category":"escultura","series":"Formas orgánicas","aspect":1.5,"catalogId":"escultura-014523"},"ESC-011":{"category":"escultura","series":"Formas orgánicas","aspect":1.5,"catalogId":"volumen-abierto"},"ESC-012":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-014533"},"ESC-013":{"category":"escultura","series":"Formas orgánicas","aspect":1.5,"catalogId":"escultura-014540"},"ESC-014":{"category":"escultura","series":"Formas orgánicas","aspect":1.5,"catalogId":"escultura-014547"},"ESC-015":{"category":"escultura","series":"Formas orgánicas","aspect":1.5,"catalogId":"escultura-014552"},"ESC-016":{"category":"escultura","series":"Relieves y ensamblajes murales","aspect":1.5,"catalogId":"escultura-014560"},"ESC-017":{"category":"escultura","series":"Relieves y ensamblajes murales","aspect":1.5,"catalogId":"escultura-014562"},"ESC-018":{"category":"escultura","series":"Relieves y ensamblajes murales","aspect":1.5,"catalogId":"escultura-014564"},"ESC-019":{"category":"escultura","series":"Relieves y ensamblajes murales","aspect":1.5,"catalogId":"escultura-014565"},"ESC-020":{"category":"escultura","series":"Relieves y ensamblajes murales","aspect":1.5,"catalogId":"escultura-014566"},"ESC-021":{"category":"escultura","series":"Relieves y ensamblajes murales","aspect":1.5,"catalogId":"escultura-014568"},"ESC-022":{"category":"escultura","series":"Relieves y ensamblajes murales","aspect":1.5,"catalogId":"escultura-014570"},"ESC-023":{"category":"escultura","series":"Relieves y ensamblajes murales","aspect":1.5,"catalogId":"escultura-014571"},"ESC-024":{"category":"escultura","series":"Relieves de textura","aspect":1.5,"catalogId":"escultura-014572"},"ESC-025":{"category":"escultura","series":"Relieves de textura","aspect":1.5,"catalogId":"escultura-014573"},"ESC-026":{"category":"escultura","series":"Relieves de textura","aspect":1.5,"catalogId":"escultura-014574"},"ESC-027":{"category":"escultura","series":"Relieves de textura","aspect":1.5,"catalogId":"escultura-014575"},"ESC-028":{"category":"escultura","series":"Relieves y ensamblajes murales","aspect":1.5,"catalogId":"escultura-014576"},"ESC-029":{"category":"escultura","series":"Relieves de textura","aspect":1.5,"catalogId":"escultura-014577"},"ESC-030":{"category":"escultura","series":"Relieves y ensamblajes murales","aspect":1.5,"catalogId":"escultura-014578"},"ESC-031":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-008507"},"ESC-032":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-008523"},"ESC-033":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-008525"},"ESC-034":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-008529"},"ESC-035":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-008532"},"ESC-036":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-008535"},"ESC-037":{"category":"escultura","series":"Estructuras y objetos ensamblados","aspect":1.5,"catalogId":"escultura-008543"},"ESC-038":{"category":"escultura","series":"Formas orgánicas","aspect":1.5,"catalogId":"escultura-008768"},"ESC-039":{"category":"escultura","series":"Estructuras y objetos ensamblados","aspect":1.5,"catalogId":"escultura-008788"},"ESC-040":{"category":"escultura","series":"Estructuras y objetos ensamblados","aspect":1.5,"catalogId":"escultura-008810"},"ESC-041":{"category":"escultura","series":"Estructuras y objetos ensamblados","aspect":1.5,"catalogId":"escultura-008816"},"ESC-042":{"category":"escultura","series":"Estructuras y objetos ensamblados","aspect":1.5,"catalogId":"escultura-008907"},"ESC-043":{"category":"escultura","series":"Estructuras y objetos ensamblados","aspect":1.5,"catalogId":"escultura-011828"},"ESC-044":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-007134"},"ESC-045":{"category":"escultura","series":"Estructuras y objetos ensamblados","aspect":1.5,"catalogId":"escultura-007158"},"ESC-046":{"category":"escultura","series":"Relieves y ensamblajes murales","aspect":1.5,"catalogId":"escultura-008728"},"DIB-001":{"category":"dibujo","series":"Figuras y símbolos","aspect":1.5,"catalogId":"dibujo-015079"},"DIB-002":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015080"},"DIB-003":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"trazo-rojo"},"DIB-004":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015082"},"DIB-005":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015083"},"DIB-006":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015084"},"DIB-007":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015085"},"DIB-008":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015086"},"DIB-009":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015087"},"DIB-010":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015088"},"DIB-011":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015089"},"DIB-012":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015090"},"DIB-013":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015091"},"DIB-014":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015092"},"DIB-015":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015093"},"DIB-016":{"category":"dibujo","series":"Figuras y símbolos","aspect":1.5,"catalogId":"dibujo-015094"},"DIB-017":{"category":"dibujo","series":"Figuras y símbolos","aspect":1.5,"catalogId":"dibujo-015095"},"DIB-018":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015096"},"DIB-019":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015098"},"DIB-020":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"trazo-negro"},"DIB-021":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015102"},"DIB-022":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015103"},"DIB-023":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015105"},"DIB-024":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015172"},"DIB-025":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015173"},"DIB-026":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015176"},"DIB-027":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015178"},"DIB-028":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015181"},"DIB-029":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015182"},"DIB-030":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015183"},"DIB-031":{"category":"dibujo","series":"Figuras y símbolos","aspect":1.5,"catalogId":"dibujo-015185"},"DIB-032":{"category":"dibujo","series":"Figuras y símbolos","aspect":1.5,"catalogId":"dibujo-015186"},"DIB-033":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-015187"},"DIB-034":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-008527"},"DIB-035":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-008528"},"PIN-001":{"category":"pintura","series":"Arcas","aspect":1.5,"catalogId":"arca"},"PIN-002":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015107"},"PIN-003":{"category":"pintura","series":"Gatos","aspect":1.5,"catalogId":"pintura-015108"},"PIN-004":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015109"},"PIN-005":{"category":"pintura","series":"Arcas","aspect":1.5,"catalogId":"pintura-015110"},"PIN-006":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015111"},"PIN-007":{"category":"pintura","series":"Arcas","aspect":1.5,"catalogId":"pintura-015112"},"PIN-008":{"category":"pintura","series":"Arcas","aspect":1.5,"catalogId":"pintura-015113"},"PIN-009":{"category":"pintura","series":"Gatos","aspect":1.5,"catalogId":"pintura-015114"},"PIN-010":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015115"},"PIN-011":{"category":"pintura","series":"Arcas","aspect":1.5,"catalogId":"pintura-015118"},"PIN-012":{"category":"pintura","series":"Gatos","aspect":1.5,"catalogId":"pintura-015119"},"PIN-013":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015120"},"PIN-014":{"category":"pintura","series":"Arcas","aspect":1.5,"catalogId":"pintura-015122"},"PIN-015":{"category":"pintura","series":"Rostros y personajes","aspect":0.667,"catalogId":"pintura-015123"},"PIN-016":{"category":"pintura","series":"Rostros y personajes","aspect":0.667,"catalogId":"pintura-015124"},"PIN-017":{"category":"pintura","series":"Gatos","aspect":0.667,"catalogId":"pintura-015125"},"PIN-018":{"category":"pintura","series":"Rostros y personajes","aspect":0.667,"catalogId":"pintura-015126"},"PIN-019":{"category":"pintura","series":"Gatos","aspect":0.667,"catalogId":"gato"},"PIN-020":{"category":"pintura","series":"Tauromaquia","aspect":0.667,"catalogId":"pintura-015128"},"PIN-021":{"category":"pintura","series":"Tauromaquia","aspect":0.667,"catalogId":"pintura-015129"},"PIN-022":{"category":"pintura","series":"Tauromaquia","aspect":0.667,"catalogId":"pintura-015130"},"PIN-023":{"category":"pintura","series":"Gatos","aspect":1.5,"catalogId":"pintura-015131"},"PIN-024":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015132"},"PIN-025":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015133"},"PIN-026":{"category":"pintura","series":"Tauromaquia","aspect":1.5,"catalogId":"pintura-015134"},"PIN-027":{"category":"pintura","series":"Rostros y personajes","aspect":1.5,"catalogId":"pintura-015135"},"PIN-028":{"category":"pintura","series":"Rostros y personajes","aspect":0.667,"catalogId":"pintura-015136"},"PIN-029":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015137"},"PIN-030":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015138"},"PIN-031":{"category":"pintura","series":"Rostros y personajes","aspect":1.5,"catalogId":"pintura-015139"},"PIN-032":{"category":"pintura","series":"Rostros y personajes","aspect":0.667,"catalogId":"pintura-015141"},"PIN-033":{"category":"pintura","series":"Rostros y personajes","aspect":1.5,"catalogId":"pintura-015142"},"PIN-034":{"category":"pintura","series":"Rostros y personajes","aspect":0.667,"catalogId":"pintura-015143"},"PIN-035":{"category":"pintura","series":"Rostros y personajes","aspect":1.5,"catalogId":"pintura-015145"},"PIN-036":{"category":"pintura","series":"Rostros y personajes","aspect":0.667,"catalogId":"pintura-015146"},"PIN-037":{"category":"pintura","series":"Rostros y personajes","aspect":0.667,"catalogId":"pintura-015147"},"PIN-038":{"category":"pintura","series":"Rostros y personajes","aspect":0.667,"catalogId":"pintura-015148"},"PIN-039":{"category":"pintura","series":"Tauromaquia","aspect":0.667,"catalogId":"pintura-015149"},"PIN-040":{"category":"pintura","series":"Gatos","aspect":1.5,"catalogId":"pintura-015150"},"PIN-041":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015152"},"PIN-042":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015153"},"PIN-043":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015154"},"PIN-044":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015155"},"PIN-045":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015156"},"PIN-046":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015157"},"PIN-047":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015158"},"PIN-048":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015159"},"PIN-049":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015160"},"PIN-050":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015161"},"PIN-051":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015162"},"PIN-052":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015163"},"PIN-053":{"category":"pintura","series":"Letras y signos","aspect":1.5,"catalogId":"pintura-015164"},"PIN-054":{"category":"pintura","series":"Letras y signos","aspect":1.5,"catalogId":"pintura-015165"},"PIN-055":{"category":"pintura","series":"Letras y signos","aspect":0.667,"catalogId":"pintura-015167"},"PIN-058":{"category":"pintura","series":"Abstracciones","aspect":1.5,"catalogId":"pintura-015199"},"PIN-060":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015202"},"PIN-061":{"category":"pintura","series":"Rostros y personajes","aspect":1.5,"catalogId":"pintura-015204"},"PIN-062":{"category":"pintura","series":"Arcas","aspect":1.5,"catalogId":"pintura-015206"},"PIN-063":{"category":"pintura","series":"Gatos","aspect":1.5,"catalogId":"pintura-015211"},"PIN-064":{"category":"pintura","series":"Gatos","aspect":0.667,"catalogId":"pintura-015213"},"PIN-065":{"category":"pintura","series":"Relatos e iconografía","aspect":1.5,"catalogId":"pintura-015218"},"PIN-066":{"category":"pintura","series":"Relatos e iconografía","aspect":1.5,"catalogId":"pintura-015221"},"PIN-067":{"category":"pintura","series":"Relatos e iconografía","aspect":0.667,"catalogId":"pintura-015223"},"PIN-068":{"category":"pintura","series":"Rostros y personajes","aspect":0.667,"catalogId":"pintura-015226"},"PIN-069":{"category":"pintura","series":"Tauromaquia","aspect":1.5,"catalogId":"pintura-015228"},"PIN-070":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015234"},"PIN-071":{"category":"pintura","series":"Tauromaquia","aspect":0.667,"catalogId":"pintura-015236"},"PIN-072":{"category":"pintura","series":"Relatos e iconografía","aspect":1.5,"catalogId":"pintura-015240"},"PIN-073":{"category":"pintura","series":"Figuras y símbolos","aspect":1.5,"catalogId":"pintura-015243"},"PIN-074":{"category":"pintura","series":"Tauromaquia","aspect":0.667,"catalogId":"ruedo"},"PIN-075":{"category":"pintura","series":"Relatos e iconografía","aspect":1,"catalogId":"pintura-008492"},"PIN-077":{"category":"pintura","series":"Relatos e iconografía","aspect":0.667,"catalogId":"pintura-015250"},"PIN-078":{"category":"pintura","series":"Tauromaquia","aspect":0.667,"catalogId":"pintura-015251"},"PIN-079":{"category":"pintura","series":"Relatos e iconografía","aspect":0.667,"catalogId":"pintura-015257"},"PIN-080":{"category":"pintura","series":"Rostros y personajes","aspect":0.667,"catalogId":"pintura-015263"},"MOV-022":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014955"},"ESC-047":{"category":"escultura","series":"Intervenciones en el entorno","aspect":0.65,"catalogId":"escultura-014959"},"ESC-048":{"category":"escultura","series":"Intervenciones en el entorno","aspect":0.75,"catalogId":"escultura-014967"},"ESC-049":{"category":"escultura","series":"Intervenciones en el entorno","aspect":0.75,"catalogId":"escultura-014968"},"MOV-023":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-014976"},"ESC-050":{"category":"escultura","series":"Intervenciones en el entorno","aspect":0.75,"catalogId":"escultura-014978"},"MOV-024":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-015000"},"MOV-025":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-015002"},"MOV-026":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-015006"},"MOV-027":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-015011"},"MOV-028":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-015021"},"ESC-051":{"category":"escultura","series":"Intervenciones en el entorno","aspect":0.716,"catalogId":"escultura-015032"},"MOV-029":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-015045"},"MOV-030":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-015051"},"MOV-031":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-015058"},"MOV-032":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-015062"},"MOV-033":{"category":"moviles","series":"Móviles","aspect":0.667,"catalogId":"moviles-015067"},"ESC-052":{"category":"escultura","series":"Intervenciones en el entorno","aspect":0.754,"catalogId":"escultura-015076"},"ESC-053":{"category":"escultura","series":"Planos curvos y volúmenes abiertos","aspect":1.5,"catalogId":"escultura-008659"},"ESC-054":{"category":"escultura","series":"Estructuras y objetos ensamblados","aspect":1.5,"catalogId":"escultura-008704"},"ESC-055":{"category":"escultura","series":"Estructuras y objetos ensamblados","aspect":1.5,"catalogId":"escultura-009729"},"DIB-036":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013422"},"DIB-037":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013423"},"DIB-038":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013426"},"DIB-039":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013427"},"DIB-040":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013430"},"DIB-041":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013431"},"DIB-042":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013434"},"DIB-043":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013435"},"DIB-044":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013436"},"DIB-045":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013439"},"DIB-046":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013440"},"DIB-047":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013441"},"DIB-048":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013443"},"DIB-049":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013447"},"DIB-050":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013448"},"DIB-051":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013449"},"DIB-052":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013452"},"DIB-053":{"category":"dibujo","series":"Dibujo y espacio","aspect":1.5,"catalogId":"dibujo-013453"}};
const CALIBRATED_2D_META={"PIN-001":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.19076,0.06934,0.57096,0.85645]},"PIN-002":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.19922,0.04883,0.5931,0.89062]},"PIN-003":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.21029,0.05957,0.59049,0.88672]},"PIN-004":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.19401,0.06738,0.58464,0.87793]},"PIN-005":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.20768,0.0459,0.58789,0.88184]},"PIN-006":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.25716,0.13965,0.47331,0.71094]},"PIN-007":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.22266,0.1084,0.54102,0.81152]},"PIN-008":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.22005,0.07031,0.55859,0.83789]},"PIN-009":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.22005,0.08496,0.54622,0.81836]},"PIN-010":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.22461,0.09863,0.54167,0.81152]},"PIN-011":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.21615,0.08691,0.55013,0.8252]},"PIN-012":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.22461,0.07324,0.58398,0.87598]},"PIN-013":{"mountType":"canvas","aspect":2.3834,"uvCrop":[0.06315,0.21484,0.87826,0.55273]},"PIN-014":{"mountType":"artistFrame","aspect":1.0056,"uvCrop":[0.24089,0.07715,0.57943,0.86426]},"PIN-015":{"mountType":"canvas","aspect":0.7106,"uvCrop":[0.09961,0.13151,0.82715,0.77604]},"PIN-016":{"mountType":"canvas","aspect":0.8394,"uvCrop":[0.08691,0.16927,0.87305,0.69336]},"PIN-017":{"mountType":"canvas","aspect":0.8204,"uvCrop":[0.09375,0.16797,0.83398,0.67773]},"PIN-018":{"mountType":"canvas","aspect":0.8387,"uvCrop":[0.07617,0.17708,0.8584,0.68229]},"PIN-019":{"mountType":"canvas","aspect":0.7234,"uvCrop":[0.06055,0.11393,0.86328,0.79557]},"PIN-020":{"mountType":"shaped","aspect":0.9327,"cutImage":"assets/cut-pin-020.webp"},"PIN-021":{"mountType":"shaped","aspect":0.7607,"cutImage":"assets/cut-pin-021.webp"},"PIN-022":{"mountType":"shaped","aspect":0.7809,"cutImage":"assets/cut-pin-022.webp"},"PIN-023":{"mountType":"shaped","aspect":1.2552,"cutImage":"assets/cut-pin-023.webp"},"PIN-024":{"mountType":"shaped","aspect":1.0789,"cutImage":"assets/cut-pin-024.webp"},"PIN-025":{"mountType":"canvas","aspect":1.2764,"uvCrop":[0.12044,0.08984,0.72461,0.85156]},"PIN-026":{"mountType":"canvas","aspect":1.3164,"uvCrop":[0.12044,0.0918,0.72331,0.82422]},"PIN-027":{"mountType":"canvas","aspect":0.9046,"uvCrop":[0.21419,0.01758,0.58659,0.97266]},"PIN-028":{"mountType":"canvas","aspect":0.8893,"uvCrop":[0.02441,0.13411,0.93359,0.69987]},"PIN-029":{"mountType":"canvas","aspect":1.7639,"uvCrop":[0.07161,0.12402,0.86589,0.73633]},"PIN-030":{"mountType":"canvas","aspect":4.7643,"uvCrop":[0.03516,0.3457,0.92122,0.29004]},"PIN-031":{"mountType":"artistFrame","aspect":1.0866,"uvCrop":[0.16602,0.04004,0.67773,0.93555]},"PIN-032":{"mountType":"artistFrame","aspect":0.8459,"uvCrop":[0.05762,0.15951,0.85742,0.67578]},"PIN-033":{"mountType":"artistFrame","aspect":1.0,"uvCrop":[0.16732,0.03516,0.62565,0.93848]},"PIN-034":{"mountType":"artistFrame","aspect":0.8386,"uvCrop":[0.0293,0.11328,0.93848,0.74609]},"PIN-035":{"mountType":"artistFrame","aspect":0.9271,"uvCrop":[0.24935,0.0791,0.53841,0.87109]},"PIN-036":{"mountType":"artistFrame","aspect":0.8223,"uvCrop":[0.02441,0.1263,0.92188,0.7474]},"PIN-037":{"mountType":"artistFrame","aspect":0.8304,"uvCrop":[0.05664,0.16276,0.87012,0.69857]},"PIN-038":{"mountType":"canvas","aspect":0.7182,"uvCrop":[0.06152,0.11263,0.86133,0.79948]},"PIN-039":{"mountType":"artistFrame","aspect":0.8046,"uvCrop":[0.06445,0.11523,0.88867,0.73633]},"PIN-040":{"mountType":"canvas","aspect":1.6558,"uvCrop":[0.05339,0.10449,0.89258,0.80859]},"PIN-041":{"mountType":"canvas","aspect":2.1044,"uvCrop":[0.0599,0.17285,0.87956,0.62695]},"PIN-042":{"mountType":"canvas","aspect":2.1048,"uvCrop":[0.05534,0.16992,0.88932,0.63379]},"PIN-043":{"mountType":"canvas","aspect":2.1082,"uvCrop":[0.05273,0.18457,0.87565,0.62305]},"PIN-044":{"mountType":"canvas","aspect":2.0811,"uvCrop":[0.06055,0.18555,0.86849,0.62598]},"PIN-045":{"mountType":"canvas","aspect":2.1271,"uvCrop":[0.04036,0.17188,0.91536,0.64551]},"PIN-046":{"mountType":"canvas","aspect":2.0693,"uvCrop":[0.0931,0.20508,0.81641,0.5918]},"PIN-047":{"mountType":"canvas","aspect":2.0947,"uvCrop":[0.05143,0.17578,0.87826,0.62891]},"PIN-048":{"mountType":"canvas","aspect":2.0727,"uvCrop":[0.0599,0.18066,0.85417,0.61816]},"PIN-049":{"mountType":"canvas","aspect":2.1065,"uvCrop":[0.05143,0.18848,0.88867,0.63281]},"PIN-050":{"mountType":"canvas","aspect":1.1445,"uvCrop":[0.17318,0.11328,0.63411,0.83105]},"PIN-051":{"mountType":"canvas","aspect":2.2083,"uvCrop":[0.06445,0.20996,0.86979,0.59082]},"PIN-052":{"mountType":"canvas","aspect":1.7803,"uvCrop":[0.08138,0.15625,0.82292,0.69336]},"PIN-053":{"mountType":"canvas","aspect":0.9874,"uvCrop":[0.20443,0.07422,0.56055,0.85156]},"PIN-054":{"mountType":"canvas","aspect":1.034,"uvCrop":[0.18294,0.06641,0.61458,0.8916]},"PIN-055":{"mountType":"canvas","aspect":1.101,"uvCrop":[0.03906,0.2194,0.89453,0.54167]},"PIN-058":{"mountType":"canvas","aspect":5.1434,"uvCrop":[0.04362,0.37207,0.91081,0.26562]},"PIN-060":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.26628,0.16113,0.47591,0.71387]},"PIN-061":{"mountType":"shaped","aspect":0.9702,"cutImage":"assets/cut-pin-061.webp"},"PIN-062":{"mountType":"shaped","aspect":0.9845,"cutImage":"assets/cut-pin-062.webp"},"PIN-063":{"mountType":"artistFrame","aspect":0.9006,"uvCrop":[0.24935,0.09277,0.5013,0.83496]},"PIN-064":{"mountType":"artistFrame","aspect":0.7897,"uvCrop":[0.13281,0.20312,0.7334,0.61914]},"PIN-065":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.20312,0.10059,0.53711,0.80469]},"PIN-066":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.20247,0.07227,0.55404,0.83008]},"PIN-067":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.08496,0.24349,0.80469,0.53646]},"PIN-068":{"mountType":"artistFrame","aspect":0.7468,"uvCrop":[0.09277,0.14779,0.80371,0.71745]},"PIN-069":{"mountType":"artistFrame","aspect":1.0011,"uvCrop":[0.19727,0.06055,0.56836,0.85156]},"PIN-070":{"mountType":"shaped","aspect":2.3163,"cutImage":"assets/cut-pin-070.webp"},"PIN-071":{"mountType":"artistFrame","aspect":0.7584,"uvCrop":[0.06836,0.14128,0.8584,0.75456]},"PIN-072":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.19466,0.09766,0.55859,0.83691]},"PIN-073":{"mountType":"canvas","aspect":3.2833,"uvCrop":[0.05794,0.29883,0.89779,0.41016]},"PIN-074":{"mountType":"canvas","aspect":0.697,"uvCrop":[0.07227,0.07747,0.86035,0.82292]},"PIN-075":{"mountType":"tondo","aspect":1.0,"uvCrop":[0.04306,0.04705,0.9051,0.9051]},"PIN-077":{"mountType":"canvas","aspect":0.6972,"uvCrop":[0.07617,0.08333,0.84766,0.81055]},"PIN-078":{"mountType":"artistFrame","aspect":0.7401,"uvCrop":[0.0459,0.09701,0.89844,0.80924]},"PIN-079":{"mountType":"canvas","aspect":0.8135,"uvCrop":[0.05078,0.11719,0.89453,0.73307]},"PIN-080":{"mountType":"canvas","aspect":0.8113,"uvCrop":[0.06152,0.14714,0.88184,0.72461]},"DIB-001":{"aspect":1.6726,"uvCrop":[0.10091,0.14258,0.79818,0.71582]},"DIB-002":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-003":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-004":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-005":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-006":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-007":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-008":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-009":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-010":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-011":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-012":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-013":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-014":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-015":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-016":{"aspect":0.5613,"uvCrop":[0.33594,0.05566,0.33398,0.89258]},"DIB-017":{"aspect":0.5482,"uvCrop":[0.35612,0.1084,0.28516,0.78027]},"DIB-018":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-019":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-020":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-021":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-022":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-023":{"aspect":1.5151,"uvCrop":[0.05924,0.07031,0.88281,0.87402]},"DIB-024":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-025":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-026":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-027":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-028":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-029":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-030":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-031":{"aspect":1.0323,"uvCrop":[0.24089,0.12598,0.51953,0.75488]},"DIB-032":{"aspect":0.5368,"uvCrop":[0.34896,0.08008,0.30404,0.84961]},"DIB-033":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-034":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-035":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-036":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-037":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-038":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-039":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-040":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-041":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-042":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-043":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-044":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-045":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-046":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-047":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-048":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-049":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-050":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-051":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-052":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]},"DIB-053":{"aspect":1.52,"uvCrop":[0.048,0.054,0.904,0.892]}};
for(const a of ART){const cm=CATALOG_META_BY_CODE[a.code];if(cm){if(!a.category)a.category=cm.category;if(!a.series)a.series=cm.series;if(!a.aspect)a.aspect=cm.aspect;if(!a.catalogId)a.catalogId=cm.catalogId;}const c2d=CALIBRATED_2D_META[a.code];if(c2d&&a.id!=='painting1'&&a.id!=='painting2'&&a.id!=='painting3'){a.aspect=c2d.aspect;if(c2d.mountType)a.mountType=c2d.mountType;if(c2d.uvCrop)a.uvCrop=c2d.uvCrop;if(c2d.cutImage)a.cutImage=c2d.cutImage;if(c2d.artistFrame)a.artistFrame=true;}}
export const FIGURAS_DIB_IDS=['dib001','dib016','dib017','dib031','dib032'];
export const RELIEF_RECORTADOS_IDS=['esc001','esc002','esc003','esc004'];
export const RELIEF_MURALES_IDS=['esc016','esc017','esc018','esc019','esc020','esc021','esc022','esc023','esc028','esc030','esc046'];
export const RELIEF_TEXTURA_IDS=['esc024','esc025','esc026','esc027','esc029'];
export const INTERVENCIONES_IDS=['esc047','esc048','esc049','esc050','esc051','esc052'];
export const PAINTING_IDS=["pin001","pin002","pin003","pin004","pin005","pin006","pin007","pin008","pin009","pin010","pin011","pin012","pin013","pin014","pin015","pin016","pin017","pin018","pin019","pin020","pin021","pin022","pin023","pin024","pin025","pin026","pin027","pin028","pin029","pin030","pin031","pin032","pin033","pin034","pin035","pin036","pin037","pin038","pin039","pin040","pin041","pin042","pin043","pin044","pin045","pin046","pin047","pin048","pin049","pin050","pin051","pin052","pin053","pin054","pin055","pin058","pin060","pin061","pin062","pin063","pin064","pin065","pin066","pin067","pin068","pin069","pin070","pin071","pin072","pin073","pin074","pin075","pin077","pin078","pin079","pin080"];
export const MOBILE_GALLERY_IDS=["mov001", "mov002", "mov003", "mov004", "mov005", "mov006", "mov007", "mov008", "mov009", "mov010", "mov011", "mov012", "mov013", "mov014", "mov015", "mov016", "mov017", "mov018", "mov019", "mov020", "mov021", "mov022", "mov023", "mov024", "mov025", "mov026", "mov027", "mov028", "mov029", "mov030", "mov031", "mov032", "mov033"];
export const DRAWING_IDS=['dib002','dib003','dib004','dib005','dib006','dib007','dib008','dib009','dib010','dib011','dib012','dib013','dib014','dib015','dib018','dib019','dib020','dib021','dib022','dib023','dib024','dib025','dib026','dib027','dib028','dib029','dib030','dib033','dib034','dib035','dib036','dib037','dib038','dib039','dib040','dib041','dib042','dib043','dib044','dib045','dib046','dib047','dib048','dib049','dib050','dib051','dib052','dib053'];
export const ORGANIC_IDS=['esc008','sculpture1','sculpture3','sculpture2','esc013','esc014','esc015','esc038'];
export const CURVED_PLANE_IDS=['esc005','esc006','esc007','sculpture4','esc031','esc032','esc033','esc034','esc035','esc036','esc044','esc053'];
const materials=new Map();
let barkTexCache=null,plasterBumpCache=null,woodBumpCache=null,stoneBumpCache=null,canvasBumpCache=null;
let travertineFloorCache=null,pedestalStoneMatCache=null,oakFloorCache=null,wallShadowTexCache=null,wallWashTexCache=null,foliageTexCache=null;
function getPedestalTravertineMaterial(){
 if(pedestalStoneMatCache)return pedestalStoneMatCache;
 if(typeof document==='undefined')return mat('#dfd9ca',0.72,0.04);
 const c=document.createElement('canvas');c.width=c.height=512;
 const ctx=c.getContext('2d');
 ctx.fillStyle='#ded8c8';ctx.fillRect(0,0,512,512);
 const rand=rng(4021);
 for(let y=0;y<512;y+=3){
  const band=Math.sin(y*0.045)*5+Math.cos(y*0.13)*3+(rand()-0.5)*6;
  const v=Math.round(218+band);
  ctx.fillStyle=`rgba(${v},${v-5},${v-15},0.35)`;
  ctx.fillRect(0,y,512,3);
 }
 for(let i=0;i<180;i++){
  const vx=rand()*512,vy=rand()*512,vw=28+rand()*120,vh=1.2+rand()*2.8;
  const dark=rand()>0.45;
  ctx.fillStyle=dark?'rgba(168,158,138,0.22)':'rgba(242,238,228,0.24)';
  ctx.fillRect(vx,vy,vw,vh);
 }
 for(let p=0;p<2400;p++){
  const px=rand()*512,py=rand()*512,ps=1+rand()*2.5;
  const pv=195+Math.floor((rand()-0.5)*36);
  ctx.fillStyle=`rgba(${pv},${pv-5},${pv-14},0.18)`;
  ctx.fillRect(px,py,ps,ps*0.8);
 }
 const t=new THREE.CanvasTexture(c);
 t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.repeat.set(1,2);
 t.anisotropy=8;
 t.colorSpace=THREE.SRGBColorSpace;
 pedestalStoneMatCache=new THREE.MeshStandardMaterial({map:t,bumpMap:t,bumpScale:0.012,roughness:0.74,metalness:0.04,envMapIntensity:0.92});
 return pedestalStoneMatCache;
}
function getBarkTexture(){
 if(barkTexCache)return barkTexCache;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=512;
 const ctx=c.getContext('2d');
 ctx.fillStyle='#ded7cc';ctx.fillRect(0,0,512,512);
 const rand=rng(911);
 // TubeGeometry maps U (horizontal X) along branch length and V (vertical Y) around circumference:
 // Draw deep longitudinal bark fissures & ridges along X so furrows run along the trunk and branches
 for(let i=0;i<4600;i++){
  const x=rand()*512,y=rand()*512,w=24+rand()*92,h=1.4+rand()*4.4;
  const mode=i%3;
  ctx.fillStyle=mode===0?'rgba(38,28,22,0.48)':mode===1?'rgba(242,235,224,0.42)':'rgba(98,82,68,0.38)';
  ctx.fillRect(x,y,w,h);
  if(x+w>512)ctx.fillRect(x-512,y,w,h);
 }
 // Transverse bark plates & rugged Mediterranean almond/carob rhytidome cracks
 for(let cIdx=0;cIdx<900;cIdx++){
  const cx=rand()*512,cy=rand()*512,cw=1.5+rand()*3.5,ch=6+rand()*16;
  ctx.fillStyle=cIdx%2===0?'rgba(32,24,18,0.42)':'rgba(245,238,228,0.28)';
  ctx.fillRect(cx,cy,cw,ch);
 }
 for(let k=0;k<38;k++){
  const kx=rand()*512,ky=rand()*512,kr=6+rand()*16;
  const gr=ctx.createRadialGradient(kx,ky,1,kx,ky,kr);
  gr.addColorStop(0,'rgba(36,28,22,0.58)');
  gr.addColorStop(0.55,'rgba(210,200,186,0.36)');
  gr.addColorStop(1,'rgba(180,170,158,0)');
  ctx.fillStyle=gr;ctx.beginPath();ctx.arc(kx,ky,kr,0,Math.PI*2);ctx.fill();
 }
 const t=new THREE.CanvasTexture(c);
 t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.repeat.set(4,2);
 t.anisotropy=8;
 t.colorSpace=THREE.SRGBColorSpace;
 barkTexCache=t;
 return t;
}
function getFoliageTexture(){
 if(foliageTexCache)return foliageTexCache;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=256;
 const ctx=c.getContext('2d');
 ctx.fillStyle='#e4eae0';ctx.fillRect(0,0,256,256);
 const rand=rng(719);
 for(let i=0;i<1600;i++){
  const x=rand()*256,y=rand()*256,rx=3+rand()*7,ry=1.6+rand()*3.8,ang=rand()*Math.PI;
  ctx.save();ctx.translate(x,y);ctx.rotate(ang);
  ctx.fillStyle=i%3===0?'rgba(255,255,248,0.28)':i%3===1?'rgba(95,120,82,0.26)':'rgba(165,190,148,0.22)';
  ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2);ctx.fill();
  ctx.restore();
 }
 const t=new THREE.CanvasTexture(c);
 t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.repeat.set(3,3);
 t.colorSpace=THREE.SRGBColorSpace;
 foliageTexCache=t;
 return t;
}
function getPlasterBumpTexture(){
 if(plasterBumpCache)return plasterBumpCache;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=256;
 const ctx=c.getContext('2d');
 ctx.fillStyle='#808080';ctx.fillRect(0,0,256,256);
 const rand=rng(301);
 for(let i=0;i<5500;i++){
  const v=Math.floor(105+rand()*46);
  ctx.fillStyle=`rgba(${v},${v},${v},0.22)`;
  const s=1+rand()*4.5;
  ctx.fillRect(rand()*256,rand()*256,s,s);
 }
 const t=new THREE.CanvasTexture(c);
 t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.repeat.set(6,6);
 plasterBumpCache=t;
 return t;
}
function getWoodBumpTexture(){
 if(woodBumpCache)return woodBumpCache;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=256;
 const ctx=c.getContext('2d');
 ctx.fillStyle='#ebe6de';ctx.fillRect(0,0,256,256);
 const rand=rng(409);
 for(let i=0;i<2200;i++){
  ctx.fillStyle=i%2===0?'rgba(110,85,62,0.18)':'rgba(255,252,245,0.18)';
  ctx.fillRect(rand()*256,rand()*256,18+rand()*68,1+rand()*1.8);
 }
 const t=new THREE.CanvasTexture(c);
 t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.repeat.set(2,2);
 t.colorSpace=THREE.SRGBColorSpace;
 woodBumpCache=t;
 return t;
}
function getStoneBumpTexture(){
 if(stoneBumpCache)return stoneBumpCache;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=256;
 const ctx=c.getContext('2d');
 ctx.fillStyle='#eae6dc';ctx.fillRect(0,0,256,256);
 const rand=rng(613);
 // Subtle horizontal dry-stone masonry courses & vertical joints
 for(let y=16;y<256;y+=32){
  ctx.fillStyle='rgba(95,88,76,0.22)';
  ctx.fillRect(0,y+(rand()-0.5)*3,256,2.2);
  for(let x=12+rand()*24;x<256;x+=38+rand()*28){
   ctx.fillRect(x,y-30,2.0,32);
  }
 }
 for(let i=0;i<3600;i++){
  const v=Math.floor(110+rand()*135);
  ctx.fillStyle=`rgba(${v},${v-4},${v-10},0.20)`;
  ctx.fillRect(rand()*256,rand()*256,1.5+rand()*6,1+rand()*3.5);
 }
 const t=new THREE.CanvasTexture(c);
 t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.repeat.set(2,2);
 t.colorSpace=THREE.SRGBColorSpace;
 stoneBumpCache=t;
 return t;
}
function getCanvasBumpTexture(){
 if(canvasBumpCache)return canvasBumpCache;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=128;
 const ctx=c.getContext('2d');
 ctx.fillStyle='#808080';ctx.fillRect(0,0,128,128);
 ctx.fillStyle='rgba(165,165,165,0.28)';
 for(let x=0;x<128;x+=2)ctx.fillRect(x,0,1,128);
 ctx.fillStyle='rgba(95,95,95,0.28)';
 for(let y=0;y<128;y+=2)ctx.fillRect(0,y,128,1);
 const t=new THREE.CanvasTexture(c);
 t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.repeat.set(28,28);
 canvasBumpCache=t;
 return t;
}
function getTravertineFloorMaterial(repeatX=14,repeatY=28){
 if(!travertineFloorCache&&typeof document!=='undefined'){
  const c=document.createElement('canvas');c.width=c.height=1024;
  const ctx=c.getContext('2d');
  const bc=document.createElement('canvas');bc.width=bc.height=1024;
  const bctx=bc.getContext('2d');
  const rc=document.createElement('canvas');rc.width=rc.height=1024;
  const rctx=rc.getContext('2d');
  ctx.fillStyle='#e4e1d6';ctx.fillRect(0,0,1024,1024);
  bctx.fillStyle='#888888';bctx.fillRect(0,0,1024,1024);
  rctx.fillStyle='#626262';rctx.fillRect(0,0,1024,1024);
  const rand=rng(2026);
  const cols=4,rows=4,tw=1024/cols,th=1024/rows;
  for(let r=0;r<rows;r++){
   for(let col=0;col<cols;col++){
    const x0=col*tw,y0=r*th;
    const base=220+Math.floor((rand()-0.5)*14);
    ctx.fillStyle=`rgb(${base},${base-3},${base-11})`;
    ctx.fillRect(x0+2,y0+2,tw-4,th-4);
    const rSlab=92+Math.floor((rand()-0.5)*18);
    rctx.fillStyle=`rgb(${rSlab},${rSlab},${rSlab})`;
    rctx.fillRect(x0+2,y0+2,tw-4,th-4);
    // Sedimentary travertine veins & mineral pores inside each slab
    for(let v=0;v<42;v++){
     const vy=y0+8+rand()*(th-16),vx=x0+6+rand()*(tw*0.45),vw=40+rand()*(tw*0.52),vh=1.2+rand()*3.5;
     const shade=base+(rand()>0.5?8:-10);
     ctx.fillStyle=`rgba(${shade},${shade-3},${shade-10},${0.12+rand()*0.18})`;
     ctx.fillRect(vx,vy,vw,vh);
     rctx.fillStyle='rgba(165,165,165,0.22)';
     rctx.fillRect(vx,vy,vw,vh);
    }
    for(let p=0;p<650;p++){
     const px=x0+3+rand()*(tw-6),py=y0+3+rand()*(th-6),ps=1+rand()*3.2;
     const pv=base+Math.floor((rand()-0.5)*24);
     ctx.fillStyle=`rgba(${pv},${pv-3},${pv-10},0.16)`;
     ctx.fillRect(px,py,ps,ps*0.7);
     const bv=128+Math.floor((rand()-0.5)*36);
     bctx.fillStyle=`rgba(${bv},${bv},${bv},0.28)`;
     bctx.fillRect(px,py,ps,ps);
     rctx.fillStyle='rgba(210,210,210,0.35)';
     rctx.fillRect(px,py,ps,ps);
    }
   }
  }
  // Fine architectural stone tile joints (matte grout vs honed stone)
  ctx.fillStyle='#b8b4a6';
  bctx.fillStyle='#383838';
  rctx.fillStyle='#f2f2f2';
  for(let i=0;i<=4;i++){
   const pos=Math.min(1021,i*256);
   ctx.fillRect(pos,0,3,1024);ctx.fillRect(0,pos,1024,3);
   bctx.fillRect(pos,0,3,1024);bctx.fillRect(0,pos,1024,3);
   rctx.fillRect(pos,0,4,1024);rctx.fillRect(0,pos,1024,4);
  }
  travertineFloorCache={map:c,bump:bc,rough:rc};
 }
 const map=new THREE.CanvasTexture(travertineFloorCache.map);
 map.wrapS=map.wrapT=THREE.RepeatWrapping;map.repeat.set(repeatX,repeatY);map.anisotropy=8;map.colorSpace=THREE.SRGBColorSpace;
 const bump=new THREE.CanvasTexture(travertineFloorCache.bump);
 bump.wrapS=bump.wrapT=THREE.RepeatWrapping;bump.repeat.set(repeatX,repeatY);bump.anisotropy=4;
 const rough=new THREE.CanvasTexture(travertineFloorCache.rough);
 rough.wrapS=rough.wrapT=THREE.RepeatWrapping;rough.repeat.set(repeatX,repeatY);rough.anisotropy=4;
 return new THREE.MeshStandardMaterial({map,bumpMap:bump,bumpScale:0.012,roughnessMap:rough,roughness:0.88,metalness:0.05,envMapIntensity:1.05});
}
function getOakParquetFloorMaterial(repeatX=12,repeatY=36){
 if(!oakFloorCache&&typeof document!=='undefined'){
  const c=document.createElement('canvas');c.width=c.height=1024;
  const ctx=c.getContext('2d');
  const bc=document.createElement('canvas');bc.width=bc.height=1024;
  const bctx=bc.getContext('2d');
  const rc=document.createElement('canvas');rc.width=rc.height=1024;
  const rctx=rc.getContext('2d');
  ctx.fillStyle='#cbb494';ctx.fillRect(0,0,1024,1024);
  bctx.fillStyle='#848484';bctx.fillRect(0,0,1024,1024);
  rctx.fillStyle='#686868';rctx.fillRect(0,0,1024,1024);
  const rand=rng(1984);
  const strips=8,sw=1024/strips;
  for(let s=0;s<strips;s++){
   const x0=s*sw;
   const stagger=(s%2)*256 + (s%3)*128;
   for(let p=0;p<3;p++){
    const y0=((p*512+stagger)%1024);
    const tone=Math.floor((rand()-0.5)*16);
    const r=204+tone,g=181+tone,b=148+Math.floor(tone*0.8);
    ctx.fillStyle=`rgb(${r},${g},${b})`;
    ctx.fillRect(x0+1.5,0,sw-3,1024);
    const rPlank=96+Math.floor((rand()-0.5)*22);
    rctx.fillStyle=`rgb(${rPlank},${rPlank},${rPlank})`;
    rctx.fillRect(x0+1.5,0,sw-3,1024);
    // Longitudinal European oak grain fibers
    for(let f=0;f<240;f++){
     const fx=x0+2+rand()*(sw-4),fy=rand()*1024,fw=1+rand()*2.2,fh=28+rand()*95;
     const fd=Math.floor((rand()-0.48)*22);
     ctx.fillStyle=`rgba(${r+fd},${g+fd-2},${b+fd-4},0.22)`;
     ctx.fillRect(fx,fy,fw,fh);
     const bd=128+fd*2;
     bctx.fillStyle=`rgba(${bd},${bd},${bd},0.26)`;
     bctx.fillRect(fx,fy,fw,fh);
     rctx.fillStyle=`rgba(${130-fd},${130-fd},${130-fd},0.24)`;
     rctx.fillRect(fx,fy,fw,fh);
    }
    ctx.fillStyle='#967e5e';
    bctx.fillStyle='#3a3a3a';
    rctx.fillStyle='#f0f0f0';
    ctx.fillRect(x0,y0,sw,2.5);
    bctx.fillRect(x0,y0,sw,2.5);
    rctx.fillRect(x0,y0,sw,3.0);
   }
   ctx.fillStyle='#967e5e';
   bctx.fillStyle='#383838';
   rctx.fillStyle='#f0f0f0';
   ctx.fillRect(x0,0,2.5,1024);
   bctx.fillRect(x0,0,2.5,1024);
   rctx.fillRect(x0,0,3.0,1024);
  }
  oakFloorCache={map:c,bump:bc,rough:rc};
 }
 const map=new THREE.CanvasTexture(oakFloorCache.map);
 map.wrapS=map.wrapT=THREE.RepeatWrapping;map.repeat.set(repeatX,repeatY);map.anisotropy=8;map.colorSpace=THREE.SRGBColorSpace;
 const bump=new THREE.CanvasTexture(oakFloorCache.bump);
 bump.wrapS=bump.wrapT=THREE.RepeatWrapping;bump.repeat.set(repeatX,repeatY);bump.anisotropy=4;
 const rough=new THREE.CanvasTexture(oakFloorCache.rough);
 rough.wrapS=rough.wrapT=THREE.RepeatWrapping;rough.repeat.set(repeatX,repeatY);rough.anisotropy=4;
 return new THREE.MeshStandardMaterial({map,bumpMap:bump,bumpScale:0.011,roughnessMap:rough,roughness:0.86,metalness:0.04,envMapIntensity:0.98});
}
function getWallShadowTexture(){
 if(wallShadowTexCache)return wallShadowTexCache;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=256;
 const ctx=c.getContext('2d');
 ctx.clearRect?.(0,0,256,256);
 ctx.fillStyle='rgba(22,20,16,0.72)';
 ctx.filter='blur(14px)';
 ctx.fillRect(26,26,204,204);
 ctx.filter='none';
 wallShadowTexCache=new THREE.CanvasTexture(c);
 return wallShadowTexCache;
}
let circularWallShadowCache=null;
function getCircularWallShadowTexture(){
 if(circularWallShadowCache)return circularWallShadowCache;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=256;
 const ctx=c.getContext('2d');
 const gr=ctx.createRadialGradient(128,132,68,128,132,124);
 gr.addColorStop(0,'rgba(22,20,16,0.68)');
 gr.addColorStop(0.55,'rgba(22,20,16,0.28)');
 gr.addColorStop(1,'rgba(22,20,16,0)');
 ctx.fillStyle=gr;ctx.fillRect(0,0,256,256);
 circularWallShadowCache=new THREE.CanvasTexture(c);
 return circularWallShadowCache;
}
function addCircularWallDropShadow(parent,diameter,zOffset=0.003,opacity=0.34){
 const tex=getCircularWallShadowTexture();if(!tex)return null;
 const m=new THREE.Mesh(
  new THREE.PlaneGeometry(diameter*1.18,diameter*1.18),
  new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2})
 );
 m.position.set(0,-0.018,zOffset);
 parent.add(m);
 return m;
}
function addWallDropShadow(parent,w,h,zOffset=0.003,opacity=0.36){
 const tex=getWallShadowTexture();if(!tex)return null;
 const m=new THREE.Mesh(
  new THREE.PlaneGeometry(w*1.12,h*1.12),
  new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2})
 );
 m.position.set(0,-0.022,zOffset);
 parent.add(m);
 return m;
}
function getWallWashTexture(){
 if(wallWashTexCache)return wallWashTexCache;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=256;
 const ctx=c.getContext('2d');
 const gr=ctx.createRadialGradient(128,108,10,128,118,120);
 gr.addColorStop(0,'rgba(255,246,220,0.38)');
 gr.addColorStop(0.52,'rgba(255,241,204,0.14)');
 gr.addColorStop(1,'rgba(255,240,200,0)');
 ctx.fillStyle=gr;ctx.fillRect(0,0,256,256);
 wallWashTexCache=new THREE.CanvasTexture(c);
 return wallWashTexCache;
}
function addWallLightWash(world,parent,w,h,zOffset=0.002){
 const tex=getWallWashTexture();if(!tex)return null;
 const matWash=new THREE.MeshBasicMaterial({map:tex,color:'#fff4d6',transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-4});
 const m=new THREE.Mesh(new THREE.PlaneGeometry(w*1.22,h*1.22),matWash);
 m.position.set(0,0.08,zOffset);
 parent.add(m);
 if(world){
  if(!world.wallWashMats)world.wallWashMats=[];
  world.wallWashMats.push(matWash);
 }
 return m;
}
let radialGlowTexCache=null,waterRippleTexCache=null;
function getRadialGlowTexture(){
 if(radialGlowTexCache)return radialGlowTexCache;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=128;
 const ctx=c.getContext('2d');
 const grd=ctx.createRadialGradient(64,64,0,64,64,62);
 grd.addColorStop(0,'rgba(255,255,255,1)');
 grd.addColorStop(0.24,'rgba(255,252,240,0.78)');
 grd.addColorStop(0.58,'rgba(255,244,215,0.24)');
 grd.addColorStop(1,'rgba(255,240,200,0)');
 ctx.fillStyle=grd;ctx.fillRect(0,0,128,128);
 radialGlowTexCache=new THREE.CanvasTexture(c);
 return radialGlowTexCache;
}
function getWaterRippleTexture(){
 if(waterRippleTexCache)return waterRippleTexCache;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=512;
 const ctx=c.getContext('2d');
 ctx.fillStyle='#3d989e';ctx.fillRect(0,0,512,512);
 const rand=rng(509);
 for(let i=0;i<420;i++){
  const x=rand()*512,y=rand()*512,rx=14+rand()*42,ry=3+rand()*7.5;
  ctx.strokeStyle=i%2===0?'rgba(220,252,255,0.25)':'rgba(24,96,104,0.26)';
  ctx.lineWidth=1.6;
  ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.stroke();
  if(x+rx>512){ctx.beginPath();ctx.ellipse(x-512,y,rx,ry,0,0,Math.PI*2);ctx.stroke();}
  if(x-rx<0){ctx.beginPath();ctx.ellipse(x+512,y,rx,ry,0,0,Math.PI*2);ctx.stroke();}
 }
 const t=new THREE.CanvasTexture(c);
 t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.repeat.set(2,4);
 t.colorSpace=THREE.SRGBColorSpace;
 waterRippleTexCache=t;
 return t;
}
function mat(color,roughness=.78,metalness=0,useBark=false){
 const key=[color,roughness,metalness,useBark?1:0].join();
 if(!materials.has(key)){
  const opts={color,roughness,metalness};
  if(useBark){
   const bt=getBarkTexture();
   if(bt){opts.map=bt;opts.bumpMap=bt;opts.bumpScale=0.055;}
  }else if(typeof color==='string'&&color.startsWith('#')&&color.length===7){
   const r=parseInt(color.slice(1,3),16),g=parseInt(color.slice(3,5),16),b=parseInt(color.slice(5,7),16);
   if(r>225&&g>220&&b>205){
    opts.bumpMap=getPlasterBumpTexture();
    opts.bumpScale=0.0055;
   }else if(g>r+10&&g>b+10&&g>=68&&g<=178){
    // Mediterranean botanical foliage cluster texture & micro-relief
    const ft=getFoliageTexture();
    if(ft){opts.map=ft;opts.bumpMap=ft;opts.bumpScale=0.032;}
   }else if(r>g+16&&g>b+12&&r>75&&r<210){
    const wt=getWoodBumpTexture();
    if(wt){opts.map=wt;opts.bumpMap=wt;opts.bumpScale=0.018;}
   }else if(Math.abs(r-g)<18&&g>=b&&r>=165&&r<=225){
    const st=getStoneBumpTexture();
    if(st){opts.map=st;opts.bumpMap=st;opts.bumpScale=0.022;}
   }
  }
  materials.set(key,new THREE.MeshStandardMaterial(opts));
 }
 return materials.get(key);
}
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const boxGeo=new THREE.BoxGeometry(1,1,1), cylinderGeo=new THREE.CylinderGeometry(1,1,1,20), pebbleGeo=new THREE.IcosahedronGeometry(1,1);
function box(parent,size,pos,color,shadow=true,receive=shadow){const m=new THREE.Mesh(boxGeo,mat(color));m.scale.set(...size);m.position.set(...pos);m.castShadow=shadow;m.receiveShadow=receive;parent.add(m);return m;}
function rod(parent,a,b,r,color,r2=r){const from=V(...a),to=V(...b),d=to.clone().sub(from);const mesh=new THREE.Mesh(r===r2?cylinderGeo:new THREE.CylinderGeometry(r2/r,1,1,10),mat(color));mesh.scale.set(r,d.length(),r);mesh.position.copy(from.add(to).multiplyScalar(.5));mesh.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
function curve(parent,points,r,color,closed=false){const c=new THREE.CatmullRomCurve3(points.map(p=>V(...p)),closed,'centripetal');const mesh=new THREE.Mesh(new THREE.TubeGeometry(c,Math.max(24,points.length*7),r,10,closed),mat(color,.55));mesh.castShadow=true;parent.add(mesh);return mesh;}
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function textTexture(text,sub='',dark=false,compact=false){
 const w=compact?512:1024,h=compact?128:256,s=compact?0.5:1;
 const c=document.createElement('canvas');c.width=w;c.height=h;
 const ctx=c.getContext('2d');
 ctx.scale(s,s);
 ctx.fillStyle=dark?'#f2f4e6':'#252c22';
 ctx.font='600 38px Georgia, serif';
 ctx.textAlign='center';
 ctx.fillText(text,512,98);
 ctx.strokeStyle=dark?'rgba(216,222,195,0.38)':'rgba(84,96,76,0.28)';
 ctx.lineWidth=1.5;
 ctx.beginPath();ctx.moveTo(352,118);ctx.lineTo(672,118);ctx.stroke();
 ctx.font='600 15px Arial, sans-serif';
 ctx.fillStyle=dark?'#d6dcc4':'#5c6553';
 ctx.fillText(sub,512,152);
 const t=new THREE.CanvasTexture(c);
 t.colorSpace=THREE.SRGBColorSpace;
 t.anisotropy=4;
 return t;
}
function sign(parent,text,sub,pos,width=4,dark=false){
 const h=width/4;
 const g=new THREE.Group();
 g.position.set(...pos);
 const compact=width<=1.6;
 if(compact){
  // Physical 3D beveled museum cartel plaque for individual artworks & pedestals
  const pw=width*0.86,ph=h*0.72;
  const plate=new THREE.Mesh(boxGeo,mat(dark?'#2d3329':'#ebe8dc',0.48,0.08));
  plate.scale.set(pw,ph,0.008);
  plate.position.set(0,0,-0.008);
  g.add(plate);
  const rim=new THREE.Mesh(boxGeo,mat('#94876e',0.42,0.35));
  rim.scale.set(pw+0.014,ph+0.014,0.005);
  rim.position.set(0,0,-0.012);
  g.add(rim);
 }
 const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,h),new THREE.MeshBasicMaterial({map:textTexture(text,sub,dark,compact),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2}));
 mesh.position.z=0.002;
 g.add(mesh);
 parent.add(g);
 return g;
}
function groundTexture(garden=false){
 const size=garden?1024:512;
 const c=document.createElement('canvas');c.width=c.height=size;
 const ctx=c.getContext('2d');
 ctx.fillStyle=garden?'#bdaf89':'#dfded6';ctx.fillRect(0,0,size,size);
 const random=rng(17);
 const count=garden?68000:36000;
 for(let i=0;i<count;i++){
  const col=garden?Math.floor(90+random()*86):Math.floor(168+random()*62);
  ctx.fillStyle=`rgba(${col},${garden?col-8:col},${garden?col-26:col},${.05+random()*.14})`;
  const s=random()*3.4+.5;
  ctx.fillRect(random()*size,random()*size,s,s);
 }
 if(garden){
  for(let p=0;p<2200;p++){
   const px=random()*size,py=random()*size,pr=1.1+random()*3.2;
   const pv=Math.floor(138+random()*84);
   ctx.fillStyle=`rgba(${pv},${pv-8},${pv-22},0.26)`;
   ctx.beginPath();ctx.arc(px,py,pr,0,Math.PI*2);ctx.fill();
  }
 }
 const t=new THREE.CanvasTexture(c);
 t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.repeat.set(garden?42:9,garden?42:10);
 t.anisotropy=8;
 t.colorSpace=THREE.SRGBColorSpace;
 return t;
}
let shadowMap,studioEnvTex,gardenEnvTex,glassReflTex,beamAlphaTex;
function getStudioEnvMap(){
 if(!studioEnvTex){
  const c=document.createElement('canvas');c.width=1024;c.height=512;
  const ctx=c.getContext('2d');
  const g=ctx.createLinearGradient(0,0,0,512);
  g.addColorStop(0,'#ffffff');
  g.addColorStop(.18,'#f7fafe');
  g.addColorStop(.45,'#efe9dc');
  g.addColorStop(.51,'#b5aa90');
  g.addColorStop(.75,'#d8cfc0');
  g.addColorStop(1,'#8e8268');
  ctx.fillStyle=g;ctx.fillRect(0,0,1024,512);
  ctx.fillStyle='rgba(255,253,246,.98)';
  for(let x=28;x<1024;x+=168)ctx.fillRect(x,14,118,74);
  for(let x=64;x<1024;x+=204){
   const spotG=ctx.createRadialGradient(x,110,4,x,110,42);
   spotG.addColorStop(0,'rgba(255,248,224,0.95)');
   spotG.addColorStop(1,'rgba(255,248,224,0)');
   ctx.fillStyle=spotG;ctx.beginPath();ctx.arc(x,110,42,0,Math.PI*2);ctx.fill();
  }
  const sunGlow=ctx.createRadialGradient(280,128,12,280,128,195);
  sunGlow.addColorStop(0,'rgba(255,250,232,1)');
  sunGlow.addColorStop(0.4,'rgba(255,240,202,0.56)');
  sunGlow.addColorStop(1,'rgba(255,240,202,0)');
  ctx.fillStyle=sunGlow;ctx.fillRect(0,0,1024,320);
  const rimGlow=ctx.createRadialGradient(780,150,10,780,150,175);
  rimGlow.addColorStop(0,'rgba(232,243,255,0.88)');
  rimGlow.addColorStop(1,'rgba(232,243,255,0)');
  ctx.fillStyle=rimGlow;ctx.fillRect(520,0,504,320);
  studioEnvTex=new THREE.CanvasTexture(c);
  studioEnvTex.mapping=THREE.EquirectangularReflectionMapping;
  studioEnvTex.colorSpace=THREE.SRGBColorSpace;
 }
 return studioEnvTex;
}
function getGardenEnvMap(){
 if(!gardenEnvTex){
  const c=document.createElement('canvas');c.width=1024;c.height=512;
  const ctx=c.getContext('2d');
  const g=ctx.createLinearGradient(0,0,0,512);
  g.addColorStop(0,'#4f86c6');
  g.addColorStop(0.24,'#8abbe8');
  g.addColorStop(0.46,'#dfeef8');
  g.addColorStop(0.50,'#6d8058');
  g.addColorStop(0.58,'#8c986c');
  g.addColorStop(0.76,'#ccbca0');
  g.addColorStop(1,'#968568');
  ctx.fillStyle=g;ctx.fillRect(0,0,1024,512);
  const sun=ctx.createRadialGradient(310,118,8,310,118,210);
  sun.addColorStop(0,'rgba(255,252,235,1)');
  sun.addColorStop(0.25,'rgba(255,242,198,0.78)');
  sun.addColorStop(1,'rgba(255,242,198,0)');
  ctx.fillStyle=sun;ctx.fillRect(0,0,640,310);
  // Mediterranean tree canopy & cypress horizon silhouette for natural reflections on bronze, glass & water
  const rand=rng(912);
  ctx.fillStyle='rgba(72,96,54,0.55)';
  for(let x=0;x<1024;x+=22){
   const r=16+rand()*26;
   ctx.beginPath();ctx.arc(x,252+(rand()-0.5)*10,r,0,Math.PI*2);ctx.fill();
  }
  gardenEnvTex=new THREE.CanvasTexture(c);
  gardenEnvTex.mapping=THREE.EquirectangularReflectionMapping;
  gardenEnvTex.colorSpace=THREE.SRGBColorSpace;
 }
 return gardenEnvTex;
}
function getGlassReflectionTexture(){
 if(glassReflTex)return glassReflTex;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=c.height=256;
 const ctx=c.getContext('2d');
 ctx.clearRect?.(0,0,256,256);
 const g=ctx.createLinearGradient(0,0,256,256);
 g.addColorStop(0,'rgba(255,255,255,0.06)');
 g.addColorStop(0.36,'rgba(255,255,255,0.02)');
 g.addColorStop(0.47,'rgba(255,255,255,0.44)');
 g.addColorStop(0.53,'rgba(255,255,255,0.12)');
 g.addColorStop(0.64,'rgba(255,255,255,0.28)');
 g.addColorStop(0.70,'rgba(255,255,255,0.03)');
 g.addColorStop(1,'rgba(255,255,255,0.08)');
 ctx.fillStyle=g;ctx.fillRect(0,0,256,256);
 glassReflTex=new THREE.CanvasTexture(c);
 glassReflTex.colorSpace=THREE.SRGBColorSpace;
 return glassReflTex;
}
function getBeamAlphaTexture(){
 if(beamAlphaTex)return beamAlphaTex;
 if(typeof document==='undefined')return null;
 const c=document.createElement('canvas');c.width=32;c.height=128;
 const ctx=c.getContext('2d');
 const g=ctx.createLinearGradient(0,0,0,128);
 g.addColorStop(0,'#000000');
 g.addColorStop(0.15,'#bfbfbf');
 g.addColorStop(0.58,'#525252');
 g.addColorStop(1,'#000000');
 ctx.fillStyle=g;ctx.fillRect(0,0,32,128);
 beamAlphaTex=new THREE.CanvasTexture(c);
 return beamAlphaTex;
}
function softShadow(parent,x,z,size,opacity=.22,y=0){if(!shadowMap){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');const gr=ctx.createRadialGradient(64,64,4,64,64,64);gr.addColorStop(0,'rgba(20,24,14,.64)');gr.addColorStop(.5,'rgba(20,24,14,.24)');gr.addColorStop(1,'rgba(20,24,14,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,128,128);shadowMap=new THREE.CanvasTexture(c);}const m=new THREE.Mesh(new THREE.PlaneGeometry(size,size),new THREE.MeshBasicMaterial({map:shadowMap,transparent:true,opacity,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2}));m.rotation.x=-Math.PI/2;m.position.set(x,y+.022,z);parent.add(m);}
function makeRose(){const g=new THREE.Group();const points=[[0,0,0],[-.8,-.7,-.2],[1,-.42,.05],[.45,-1.45,.35],[-.4,-1.85,.2],[-1.1,-1,.45],[-.75,-2.05,.25],[.25,-2.3,-.18],[.85,-1.85,-.1],[.8,-2.65,.2],[.35,-2.45,-.3],[-.15,-2.8,-.12],[.2,-1.25,-.65],[-.7,-1.4,-.65],[.75,-1.7,-.5]];const pairs=[[0,1],[0,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[0,12],[12,13],[13,4],[12,14],[14,8],[1,5],[1,4],[4,8]];for(const [a,b]of pairs)rod(g,points[a],points[b],.012,'#eae9e1');const random=rng(6);points.slice(1).forEach((p,i)=>{const m=new THREE.Mesh(cylinderGeo,mat(['#e42e90','#b01f6c','#e9479d'][i%3],.83));m.scale.set(.09,.27,.09);m.position.set(...p);m.rotation.set(random(),random(),(random()-.5)*2);m.castShadow=true;g.add(m);const cap=new THREE.Mesh(new THREE.CircleGeometry(.086,12),mat('#af8b63'));cap.rotation.x=Math.PI/2;cap.position.y=-.136;m.add(new THREE.Object3D());});return g;}
function makeGreen(){const g=new THREE.Group();const loops=[[[0,0,0],[-.45,-.35,.08],[-.55,-1.25,.2],[-.85,-2.2,.1],[.4,-2.1,-.3],[.2,-1.1,-.15],[0,0,0]],[[0,0,0],[.7,-.8,-.15],[.95,-1.2,.25],[.1,-1.1,.45],[.3,-1.9,.6],[-.1,-2.8,.1],[-.5,-2.5,-.1],[-.75,-1.6,-.2],[-.5,-.6,-.15],[0,0,0]],[[0,0,0],[.12,-.65,-.4],[.5,-1.6,-.5],[.65,-2.15,.15],[-.55,-2.3,.45],[-.7,-1.4,.35]]];loops.forEach((p,i)=>curve(g,p,.045,['#3a9d52','#58b865','#458d43'][i]));rod(g,[0,0,0],[-.85,-2.2,.1],.012,'#426c36');rod(g,[.95,-1.2,.25],[-.1,-2.8,.1],.012,'#426c36');rod(g,[-.7,-1.4,.35],[.65,-2.15,.15],.012,'#426c36');return g;}
function makeColor(){const g=new THREE.Group(),random=rng(40),palette=['#edbf19','#e74671','#51b57b','#eaad13','#2b83ca'];for(let i=0;i<7;i++){const angle=i*2.399;const radial=V(Math.cos(angle),0,Math.sin(angle));const y=-.25-i*.29;const pts=[[0,Math.min(0,y+.6),0],[radial.x*.65,y,radial.z*.65],[radial.x*.75,y-.45,radial.z*.75],[-radial.z*.35,y-.65,radial.x*.35]];curve(g,pts,.035,i%2?'#397bc4':'#c26032');for(let j=1;j<4;j++){const disc=new THREE.Mesh(new THREE.TorusGeometry(.14,.055,8,20),mat(palette[(i+j)%palette.length],.8));disc.position.set(...pts[j]);disc.rotation.set(random()*2,random()*2,random()*2);disc.scale.z=1.5;disc.castShadow=true;g.add(disc);if(j===2){const m=new THREE.Mesh(cylinderGeo,mat(palette[(i+j+2)%palette.length]));m.scale.set(.15,.17,.15);m.position.set(...pts[j]);m.position.y-=.17;m.rotation.z=angle;m.castShadow=true;g.add(m);}}}return g;}
function addMobile(world,id,position,scale=1){return addHangingMobile3D(world,id,position,6.5,scale,'gallery');}
let sculpturePresentation='ai3d';
export function getSculpturePresentation(){return sculpturePresentation;}
export function setSculpturePresentation(world,mode){sculpturePresentation=mode;if(!world)return;world.works.forEach(w=>{if(w.applyMode)w.applyMode(mode);});world.dirty=true;}
function addWalkRing(world){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');ctx.strokeStyle='#4e6041';ctx.lineWidth=6;ctx.beginPath();ctx.arc(64,64,46,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(104,123,81,.18)';ctx.fill();ctx.beginPath();ctx.arc(64,64,10,0,Math.PI*2);ctx.fillStyle='#4e6041';ctx.fill();const tex=new THREE.CanvasTexture(c);const ring=new THREE.Mesh(new THREE.PlaneGeometry(.56,.56),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,opacity:.85}));ring.rotation.x=-Math.PI/2;ring.position.y=.028;ring.visible=false;world.scene.add(ring);world.walkRing=ring;}
function addMuseumBench(world,x,z,width=2.68,depth=0.66){
 const g=new THREE.Group();g.position.set(x,0,z);world.scene.add(g);
 // 7 solid European oak slats with architectural shadow gaps
 const slats=7,slatD=(depth-0.08)/slats;
 for(let i=0;i<slats;i++){
  const sz=-depth/2+0.04+(i+0.5)*slatD;
  const slat=new THREE.Mesh(boxGeo,mat(i%2===0?'#b89e78':'#ae946e',0.48,0.04));
  slat.scale.set(width,0.058,slatD*0.82);
  slat.position.set(0,0.465,sz);
  slat.castShadow=true;slat.receiveShadow=true;
  g.add(slat);
 }
 // Recessed dark-bronze under-frame & architectural legs
 const frameMat=mat('#383d35',0.42,0.55);
 const brassMat=mat('#948362',0.38,0.62);
 for(const lx of [-width*0.38,width*0.38]){
  const leg=new THREE.Mesh(boxGeo,frameMat);
  leg.scale.set(0.11,0.43,depth*0.78);
  leg.position.set(lx,0.225,0);
  leg.castShadow=true;leg.receiveShadow=true;
  g.add(leg);
  const foot=new THREE.Mesh(boxGeo,brassMat);
  foot.scale.set(0.14,0.022,depth*0.84);
  foot.position.set(lx,0.011,0);
  g.add(foot);
 }
 const beam=new THREE.Mesh(boxGeo,frameMat);
 beam.scale.set(width*0.82,0.048,0.14);
 beam.position.set(0,0.34,0);
 beam.castShadow=true;g.add(beam);
 softShadow(world.scene,x,z,width*1.22,0.28);
 world.colliders.push({x,z,r:width*0.48});
 return g;
}
function addFramedMolding(parent,innerW,innerH,barW,depth,zCenter,woodColor,innerTrimColor=null){
 const outerW=innerW+barW*2,outerH=innerH+barW*2;
 const fMat=mat(woodColor,0.46,0.05);
 const top=new THREE.Mesh(boxGeo,fMat);top.scale.set(outerW,barW,depth);top.position.set(0,(innerH+barW)/2,zCenter);top.castShadow=false;top.receiveShadow=false;parent.add(top);
 const bot=new THREE.Mesh(boxGeo,fMat);bot.scale.set(outerW,barW,depth);bot.position.set(0,-(innerH+barW)/2,zCenter);bot.castShadow=false;bot.receiveShadow=false;parent.add(bot);
 const left=new THREE.Mesh(boxGeo,fMat);left.scale.set(barW,innerH,depth);left.position.set(-(innerW+barW)/2,0,zCenter);left.castShadow=false;left.receiveShadow=false;parent.add(left);
 const right=new THREE.Mesh(boxGeo,fMat);right.scale.set(barW,innerH,depth);right.position.set((innerW+barW)/2,0,zCenter);right.castShadow=false;right.receiveShadow=false;parent.add(right);
 if(innerTrimColor){
  const tMat=mat(innerTrimColor,0.38,0.42),tw=0.012,td=depth*0.92;
  const tt=new THREE.Mesh(boxGeo,tMat);tt.scale.set(innerW+tw*2,tw,td);tt.position.set(0,(innerH+tw)/2,zCenter+0.003);parent.add(tt);
  const tb=new THREE.Mesh(boxGeo,tMat);tb.scale.set(innerW+tw*2,tw,td);tb.position.set(0,-(innerH+tw)/2,zCenter+0.003);parent.add(tb);
  const tl=new THREE.Mesh(boxGeo,tMat);tl.scale.set(tw,innerH,td);tl.position.set(-(innerW+tw)/2,0,zCenter+0.003);parent.add(tl);
  const tr=new THREE.Mesh(boxGeo,tMat);tr.scale.set(tw,innerH,td);tr.position.set((innerW+tw)/2,0,zCenter+0.003);parent.add(tr);
 }
}
function addPictureLightSconce(parent,w,h,zOffset=0.04){
 const sconceW=Math.min(0.68,Math.max(0.34,w*0.44));
 const brass=mat('#9e8656',0.32,0.72),darkBrass=mat('#52452d',0.42,0.65);
 const topY=h/2+0.085;
 const plate=new THREE.Mesh(boxGeo,darkBrass);
 plate.scale.set(0.14,0.032,0.024);plate.position.set(0,topY,zOffset);parent.add(plate);
 for(const sx of [-0.045,0.045]){
  const arm=new THREE.Mesh(cylinderGeo,brass);
  arm.rotation.x=Math.PI/2;arm.scale.set(0.007,0.16,0.007);
  arm.position.set(sx,topY+0.018,zOffset+0.08);parent.add(arm);
 }
 const shade=new THREE.Mesh(cylinderGeo,brass);
 shade.rotation.z=Math.PI/2;shade.scale.set(0.022,sconceW,0.022);
 shade.position.set(0,topY+0.014,zOffset+0.16);shade.castShadow=false;parent.add(shade);
 const bulb=new THREE.Mesh(boxGeo,new THREE.MeshBasicMaterial({color:'#fff4cf'}));
 bulb.scale.set(sconceW*0.92,0.008,0.016);
 bulb.position.set(0,topY+0.001,zOffset+0.16);parent.add(bulb);
}
function enhanceIndoorArchitecture(world,{width,length,height=6.8,railXs=[-10.2,10.2],skylightStep=6,pilasterStep=12,hasPortal=true}){
 const scene=world.scene;
 if(!world.skylightMats)world.skylightMats=[];
 if(!world.spotLensMats)world.spotLensMats=[];
 if(!world.wallWashMats)world.wallWashMats=[];
 if(!world.vestibuleMats)world.vestibuleMats=[];
 if(!world.focusLight){
  const fLight=new THREE.PointLight('#fff4d8',0,7.8,1.5);
  scene.add(fLight);world.focusLight=fLight;
 }
 // 1. Recessed dark-bronze shadow-gap baseboards & upper cornice frieze
 const darkTrim='#2d312b',stoneTrim='#dcd9cd',brassCol='#8e7d5c';
 box(scene,[width,0.036,0.045],[0,0.018,-length/2+0.02],darkTrim,false);
 box(scene,[width,0.036,0.045],[0,0.018,length/2-0.02],darkTrim,false);
 box(scene,[0.045,0.036,length],[-width/2+0.02,0.018,0],darkTrim,false);
 box(scene,[0.045,0.036,length],[width/2-0.02,0.018,0],darkTrim,false);
 // Upper architectural cornice reveal
 box(scene,[width,0.12,0.09],[0,height-0.12,-length/2+0.04],stoneTrim,false);
 box(scene,[width,0.12,0.09],[0,height-0.12,length/2-0.04],stoneTrim,false);
 box(scene,[0.09,0.12,length],[-width/2+0.04,height-0.12,0],stoneTrim,false);
 box(scene,[0.09,0.12,length],[width/2-0.04,height-0.12,0],stoneTrim,false);
 // 2. Luminous skylight diffuser panels above ceiling coffers
 const skyMat=new THREE.MeshBasicMaterial({color:'#fbf9e6'});
 world.skylightMats.push(skyMat);
 for(let z=-length/2+skylightStep*0.75;z<=length/2-skylightStep*0.75;z+=skylightStep){
  const panel=new THREE.Mesh(new THREE.PlaneGeometry(width*0.68,skylightStep*0.46),skyMat);
  panel.rotation.x=Math.PI/2;
  panel.position.set(0,height+0.08,z);
  scene.add(panel);
 }
 // 3. Articulated museum track spotlights with glowing warm lenses
 const canMat=mat('#2c302b',0.38,0.55);
 const lensMat=new THREE.MeshBasicMaterial({color:'#fff3cf'});
 world.spotLensMats.push(lensMat);
 const railY=height-0.48;
 const spotStep=Math.max(5.5,skylightStep*0.95);
 for(const rx of railXs){
  const tilt=rx<0?0.42:rx>0?-0.42:0.28;
  for(let z=-length/2+4.5;z<=length/2-4.5;z+=spotStep){
   const fix=new THREE.Group();
   fix.position.set(rx,railY,z);
   const stem=new THREE.Mesh(cylinderGeo,canMat);
   stem.scale.set(0.018,0.12,0.018);stem.position.y=-0.06;fix.add(stem);
   const head=new THREE.Group();
   head.position.y=-0.12;head.rotation.z=tilt;fix.add(head);
   const body=new THREE.Mesh(cylinderGeo,canMat);
   body.scale.set(0.058,0.19,0.058);body.castShadow=false;head.add(body);
   const lens=new THREE.Mesh(new THREE.CircleGeometry(0.052,14),lensMat);
   lens.rotation.x=Math.PI/2;lens.position.y=-0.097;head.add(lens);
   scene.add(fix);
  }
 }
 // 4. Brushed-brass linear floor climate grilles along perimeter
 const grilleMat=new THREE.MeshStandardMaterial({color:brassCol,roughness:0.38,metalness:0.65,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2});
 for(const sx of [-1,1]){
  const gx=sx*(width/2-0.78);
  for(let z=-length/2+5;z<=length/2-5;z+=8){
   const gr=new THREE.Mesh(new THREE.PlaneGeometry(0.22,2.4),grilleMat);
   gr.rotation.x=-Math.PI/2;gr.position.set(gx,0.012,z);
   scene.add(gr);
  }
 }
 // 5. Architectural bronze & tempered-glass museum entrance vestibule portal on South wall
 if(hasPortal){
  const pz=length/2-0.06;
  const pGroup=new THREE.Group();
  pGroup.position.set(0,0,pz);
  const portalW=3.4,portalH=3.35;
  // Backlit frosted vestibule glow behind the glass doors
  const vestMat=new THREE.MeshBasicMaterial({color:'#f4f1e4'});
  world.vestibuleMats.push(vestMat);
  const backdrop=new THREE.Mesh(new THREE.PlaneGeometry(portalW-0.16,portalH-0.12),vestMat);
  backdrop.rotation.y=Math.PI;backdrop.position.set(0,portalH/2,-0.02);pGroup.add(backdrop);
  // Dark-bronze outer frame, transom bar, and center mullion
  box(pGroup,[0.14,portalH+0.08,0.16],[-portalW/2,portalH/2,-0.04],'#2e302b',false);
  box(pGroup,[0.14,portalH+0.08,0.16],[portalW/2,portalH/2,-0.04],'#2e302b',false);
  box(pGroup,[portalW+0.22,0.14,0.18],[0,portalH+0.02,-0.04],'#2e302b',false);
  box(pGroup,[portalW,0.08,0.14],[0,2.52,-0.04],'#363832',false);
  box(pGroup,[0.05,2.52,0.12],[0,1.26,-0.04],'#363832',false);
  // Tempered architectural glass doors with skylight reflection sheen
  const reflTex=getGlassReflectionTexture();
  const doorGlassMat=new THREE.MeshStandardMaterial({color:'#dce8e6',map:reflTex,transparent:true,opacity:0.24,roughness:0.08,metalness:0.25,envMapIntensity:1.1,depthWrite:false,side:THREE.DoubleSide});
  const glassPane=new THREE.Mesh(new THREE.PlaneGeometry(portalW-0.18,portalH-0.14),doorGlassMat);
  glassPane.rotation.y=Math.PI;glassPane.position.set(0,portalH/2,-0.075);pGroup.add(glassPane);
  // Brushed-brass vertical museum door pull handles
  for(const hx of [-0.14,0.14]){
   const handle=new THREE.Mesh(cylinderGeo,grilleMat);
   handle.scale.set(0.014,0.78,0.014);
   handle.position.set(hx,1.18,-0.11);pGroup.add(handle);
  }
  for(const sx of [-1,1]){
   box(pGroup,[0.14,3.6,0.16],[sx*(width/2-0.95),1.8,0],'#3a3832',false);
  }
  scene.add(pGroup);
 }
 // 6. Subtle floating dust/light motes suspended in the museum air
 if(!world.windParticles&&!world.indoorMotes){
  const mCount=130,mGeo=new THREE.BufferGeometry(),mPos=new Float32Array(mCount*3);
  const rand=rng(width*17+length);
  for(let i=0;i<mCount;i++){
   mPos[i*3]=(rand()-0.5)*(width-2.2);
   mPos[i*3+1]=0.8+rand()*(height-1.4);
   mPos[i*3+2]=(rand()-0.5)*(length-2.5);
  }
  mGeo.setAttribute('position',new THREE.BufferAttribute(mPos,3));
  const mMat=new THREE.PointsMaterial({color:'#fff9e6',map:getRadialGlowTexture(),size:0.095,transparent:true,opacity:0.34,alphaTest:0.01,depthWrite:false,blending:THREE.AdditiveBlending});
  const motes=new THREE.Points(mGeo,mMat);
  scene.add(motes);
  world.indoorMotes=motes;
 }
}
const SCULPTURE_PED_DIMS={
 esc008:[.38,.38],sculpture1:[.34,.34],sculpture3:[.34,.34],sculpture2:[.42,.36],
 esc013:[.34,.34],esc014:[.36,.36],esc015:[.36,.34],esc038:[.46,.42],
 esc005:[.40,.38],esc006:[.40,.38],esc007:[.46,.42],sculpture4:[.40,.38],
 esc031:[.44,.40],esc032:[.42,.38],esc033:[.40,.38],esc034:[.42,.38],
 esc035:[.42,.38],esc036:[.40,.38],esc044:[.42,.38],esc053:[.44,.42],
 esc055:[.76,.68],esc045:[.44,.44],esc054:[.40,.38],esc039:[.44,.44],
 esc041:[.56,.42],esc043:[.46,.46],esc037:[.58,.40],esc040:[.44,.42],esc042:[.40,.40]
};
function addFloorLecternPlaque(parent,code,sub,pos=[0,0,0.45],width=0.38){
 const g=new THREE.Group();g.position.set(pos[0],0,pos[2]);
 const bronze=mat('#383c34',0.42,0.52);
 const foot=new THREE.Mesh(boxGeo,bronze);foot.scale.set(0.16,0.010,0.12);foot.position.set(0,0.005,0);g.add(foot);
 const stem=new THREE.Mesh(boxGeo,bronze);stem.scale.set(0.018,0.145,0.018);stem.position.set(0,0.075,-0.012);stem.rotation.x=0.18;g.add(stem);
 const tilt=new THREE.Group();tilt.position.set(0,0.148,0.006);tilt.rotation.x=-0.72;
 sign(tilt,code,sub,[0,0,0],width);
 g.add(tilt);parent.add(g);return g;
}
function addSculptureFloorHalo(scene,x,z,pedW=0.42,pedD=0.42){
 const brassInlay=mat('#9c8964',0.38,0.62),stoneInlay=mat('#cbc5b4',0.65,0.05);
 const rIn=Math.max(0.46,Math.hypot(pedW,pedD)*0.54+0.18);
 const ring=new THREE.Mesh(new THREE.RingGeometry(rIn+0.022,rIn+0.068,48),stoneInlay);
 ring.rotation.x=-Math.PI/2;ring.position.set(x,.008,z);scene.add(ring);
 const innerRing=new THREE.Mesh(new THREE.RingGeometry(rIn,rIn+0.018,48),brassInlay);
 innerRing.rotation.x=-Math.PI/2;innerRing.position.set(x,.009,z);scene.add(innerRing);
}
function populateEsc049Geometry(pivot){
 const units=[
  {bx:-0.66,bz:0.0,cylH:0.28,cylR:0.095,kind:'mixed'},
  {bx:-0.22,bz:0.0,cylH:0.46,cylR:0.092,kind:'tallA'},
  {bx:0.22,bz:0.0,cylH:0.52,cylR:0.094,kind:'tallB'},
  {bx:0.66,bz:0.0,cylH:0.31,cylR:0.095,kind:'shortFan'}
 ];
 const reedCols=['#8c3e24','#a64b2a','#72301b','#b55834','#682c18'];
 units.forEach((u,ui)=>{
  const blk=new THREE.Mesh(boxGeo,mat(ui%2?'#b6aea0':'#bdb5a6',0.92));
  blk.scale.set(0.34,0.095,0.28);blk.position.set(u.bx,0.0475,u.bz);
  blk.castShadow=true;blk.receiveShadow=true;pivot.add(blk);
  for(const hx of [-0.075,0.075]){
   const hole=new THREE.Mesh(boxGeo,mat('#746d62',0.95));
   hole.scale.set(0.085,0.045,0.286);hole.position.set(u.bx+hx,0.046,u.bz);pivot.add(hole);
  }
  const cyl=new THREE.Mesh(cylinderGeo,mat('#9ea2a4',0.78,0.05));
  cyl.scale.set(u.cylR,u.cylH,u.cylR);cyl.position.set(u.bx,0.095+u.cylH/2,u.bz);
  cyl.castShadow=true;cyl.receiveShadow=true;pivot.add(cyl);
  const rimDark=new THREE.Mesh(cylinderGeo,mat('#3a3835',0.92));
  rimDark.scale.set(u.cylR*0.86,0.012,u.cylR*0.86);rimDark.position.set(u.bx,0.095+u.cylH,u.bz);pivot.add(rimDark);
  const topY=0.095+u.cylH-0.02;
  if(u.kind==='mixed'){
   const pipes=[[-0.048,0.01,0.34,0.016],[-0.026,-0.02,0.28,0.015],[-0.055,-0.025,0.21,0.013],[-0.018,0.028,0.24,0.014],[-0.038,0.036,0.18,0.012]];
   for(const [px,pz,ph,pr] of pipes){
    const p=new THREE.Mesh(cylinderGeo,mat('#f2f0ea',0.42));
    p.scale.set(pr,ph,pr);p.position.set(u.bx+px,topY+ph/2,u.bz+pz);p.castShadow=true;pivot.add(p);
   }
   for(let r=0;r<22;r++){
    const ra=-0.9+(r/21)*1.8,rr=0.018+(r%3)*0.018;
    const sx=0.015+Math.cos(ra)*rr*0.7,sz=Math.sin(ra)*rr;
    const rh=0.32+(r%5)*0.065,sp=0.025+(r%4)*0.018;
    rod(pivot,[u.bx+sx,topY,u.bz+sz],[u.bx+sx+sp*0.6,topY+rh,u.bz+sz+Math.sin(ra)*sp],0.0036,reedCols[r%reedCols.length]);
   }
  }else{
   const rg=new THREE.Group();rg.position.set(u.bx,topY,u.bz);
   rg.userData.kineticSway={baseRotY:0,spinSpeed:0.82,phase:ui*1.7,amp:0.04,swayZ:0.025,swayX:0.02};
   const nReeds=u.kind==='shortFan'?34:40;
   const baseH=u.kind==='tallA'?0.76:u.kind==='tallB'?0.80:0.48;
   const fan=u.kind==='shortFan'?0.16:0.13;
   for(let r=0;r<nReeds;r++){
    const ra=(r/nReeds)*Math.PI*2+(r%3)*0.15,rr=0.012+(r%4)*0.016;
    const sx=Math.cos(ra)*rr,sz=Math.sin(ra)*rr;
    const spread=fan*(0.35+0.65*((r%5)/4));
    const rh=baseH+(r%6)*0.055;
    rod(rg,[sx,0,sz],[sx+Math.cos(ra)*spread,rh,sz+Math.sin(ra)*spread*0.75],0.0038,reedCols[r%reedCols.length]);
   }
   pivot.add(rg);
  }
 });
}
function populateEsc052Geometry(pivot,includeCactusPot=false){
 const trunkCol='#9e9284',barkDark='#6e6256',terraA='#b86c42',terraB='#9e5632',ironDark='#25272a';
 taperedBranch(pivot,[[0,0.01,0],[-0.01,0.65,0.01],[0.01,1.31,0],[0,1.93,0]],0.076,0.062,trunkCol,18,12,true);
 for(let b=0;b<10;b++){
  const by=0.14+b*0.175,ba=b*1.9;
  const ridge=new THREE.Mesh(boxGeo,mat(b%2?'#bdb4a6':barkDark,0.92));
  ridge.scale.set(0.028,0.14,0.018);
  ridge.position.set(Math.cos(ba)*0.062,by,Math.sin(ba)*0.062);
  ridge.rotation.y=-ba;pivot.add(ridge);
 }
 const topIron=new THREE.Group();topIron.position.set(0.032,1.94,0.02);topIron.rotation.set(0.15,0.2,-0.28);
 const tiBody=new THREE.Mesh(cylinderGeo,mat(ironDark,0.48,0.62));tiBody.scale.set(0.042,0.095,0.032);tiBody.castShadow=true;topIron.add(tiBody);
 const tiLip=new THREE.Mesh(boxGeo,mat(ironDark,0.48,0.62));tiLip.scale.set(0.075,0.028,0.045);tiLip.position.set(0.015,0.042,0);topIron.add(tiLip);
 pivot.add(topIron);
 const botIron=new THREE.Mesh(boxGeo,mat(ironDark,0.52,0.58));
 botIron.scale.set(0.078,0.092,0.068);botIron.position.set(-0.042,0.055,0.025);botIron.rotation.z=0.14;botIron.castShadow=true;pivot.add(botIron);
 for(let f=0;f<18;f++){
  const fy=0.16+f*0.096;
  const sideAng=(f%3===0?-0.85:f%3===1?0.82:0.08)+((f%2)-0.5)*0.28;
  const rad=0.066;
  const fg=new THREE.Group();
  fg.position.set(Math.sin(sideAng)*rad,fy,Math.cos(sideAng)*rad);
  fg.rotation.set((f%3-1)*0.25,sideAng,(f%2?0.35:-0.35));
  const sherd=new THREE.Mesh(new THREE.CylinderGeometry(0.036,0.028,0.048,8,1,false,0,Math.PI*1.15),mat(f%2?terraA:terraB,0.78));
  sherd.castShadow=true;fg.add(sherd);
  const pin=new THREE.Mesh(cylinderGeo,mat('#3a322c',0.6,0.5));
  pin.rotation.z=Math.PI/2;pin.scale.set(0.005,0.028,0.005);fg.add(pin);
  pivot.add(fg);
 }
 if(includeCactusPot){
  const pot=new THREE.Mesh(new THREE.CylinderGeometry(0.21,0.14,0.27,18),mat('#f0ede4',0.72));
  pot.position.set(-0.34,0.135,0.12);pot.castShadow=true;pot.receiveShadow=true;pivot.add(pot);
  const potRim=new THREE.Mesh(new THREE.TorusGeometry(0.21,0.016,8,20),mat('#f4f2ea',0.70));
  potRim.rotation.x=Math.PI/2;potRim.position.set(-0.34,0.27,0.12);pivot.add(potRim);
  const gravel=new THREE.Mesh(new THREE.CylinderGeometry(0.19,0.19,0.02,16),mat('#ded8ca',0.9));
  gravel.position.set(-0.34,0.26,0.12);pivot.add(gravel);
  const cactusMat=mat('#48723e',0.74);
  for(const [cx,cz,ch,cr,tx,tz] of [
   [-0.34,0.12,0.72,0.048,0,0],
   [-0.42,0.16,0.54,0.040,0.04,-0.06],
   [-0.26,0.15,0.48,0.038,-0.05,0.05],
   [-0.37,0.06,0.40,0.035,-0.04,-0.03]
  ]){
   const stem=new THREE.Mesh(new THREE.CapsuleGeometry(cr,ch,8,12),cactusMat);
   stem.position.set(cx,0.25+ch*0.5,cz);stem.rotation.set(tx,0,tz);stem.castShadow=true;pivot.add(stem);
  }
 }else{
  const basePlate=new THREE.Mesh(cylinderGeo,mat('#343632',0.58,0.42));
  basePlate.scale.set(0.15,0.012,0.15);basePlate.position.set(0,0.006,0);basePlate.receiveShadow=true;pivot.add(basePlate);
 }
}
function addFloorInstallationGallery(world,id,position,rotation=0){
 const data=ART.find(a=>a.id===id);if(!data)return null;
 const anchor=new THREE.Group();anchor.position.set(...position);anchor.rotation.y=rotation;world.scene.add(anchor);
 const pivot=new THREE.Group();anchor.add(pivot);
 const instScale=id==='esc049'?1.24:1.26;
 pivot.scale.setScalar(instScale);
 let centerY=0.95,inspectDist=2.15,viewY=1.52;
 if(id==='esc049'){
  populateEsc049Geometry(pivot);
  const ca=Math.cos(rotation),sa=Math.sin(rotation);
  for(const lx of [-0.68,0,0.68]){
   world.colliders.push({x:position[0]+lx*ca,z:position[2]-lx*sa,r:0.52});
  }
  addFloorLecternPlaque(anchor,data.code,(data.title||'ENRIC SEGARRA').slice(0,26).toUpperCase(),[0,0,0.52],0.40);
  addSculptureFloorHalo(world.scene,position[0],position[2],1.85,0.50);
  softShadow(world.scene,position[0],position[2],2.35,0.24);
  centerY=0.84;inspectDist=2.58;viewY=1.50;
 }else if(id==='esc052'){
  populateEsc052Geometry(pivot,false);
  world.colliders.push({x:position[0],z:position[2],r:0.54});
  addFloorLecternPlaque(anchor,data.code,(data.title||'ENRIC SEGARRA').slice(0,26).toUpperCase(),[0,0,0.46],0.40);
  addSculptureFloorHalo(world.scene,position[0],position[2],0.54,0.54);
  softShadow(world.scene,position[0],position[2],1.48,0.26);
  centerY=1.22;inspectDist=2.68;viewY=1.64;
 }
 const allViews=(data.views&&data.views.length)?data.views:[{src:data.image,w:1.35,h:1.35,cutout:false,label:'Vista frontal'}];
 const firstCutIdx=Math.max(0,allViews.findIndex(v=>v.cutout!==false));
 const textures=allViews.map(v=>{const t=texLoader.load(v.src,()=>{world.dirty=true;},undefined,()=>{world.assetErrors.push(v.src);});t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;});
 const v0=allViews[firstCutIdx]||allViews[0];
 const gBillboard=new THREE.Group();gBillboard.position.set(0,0.02,0);gBillboard.scale.setScalar(instScale);anchor.add(gBillboard);
 const billBack=new THREE.Mesh(boxGeo,mat('#232520',0.82,0.04));
 billBack.scale.set(v0.w+0.024,v0.h+0.024,0.012);billBack.position.set(0,v0.h/2,-0.008);
 billBack.visible=v0.cutout===false;gBillboard.add(billBack);
 const billMat=new THREE.MeshBasicMaterial({map:textures[firstCutIdx]||textures[0],toneMapped:false,transparent:v0.cutout!==false,alphaTest:v0.cutout===false?0:0.15,side:THREE.DoubleSide});
 const billPlane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),billMat);
 billPlane.scale.set(v0.w,v0.h,1);billPlane.position.set(0,v0.h/2,0);billPlane.castShadow=true;gBillboard.add(billPlane);
 const work={
  ...data,
  displayHeight:(data.height||v0.h)*instScale,
  displayWidth:v0.w*instScale,
  object:pivot,
  ai3dGroup:pivot,
  billboardGroup:gBillboard,
  plane:billPlane,
  isFloorInstallation:true,
  textures,
  viewIndex:0,
  anchor,
  center:V(position[0],centerY,position[2]),
  view:V(position[0]+Math.sin(rotation)*inspectDist,viewY,position[2]+Math.cos(rotation)*inspectDist),
  radius:inspectDist+0.25,
  spin:0,
  phase:world.works.length*1.65+0.3,
  baseRotation:rotation,
  setView:idx=>{
   const n=allViews.length,i=((idx%n)+n)%n;
   work.viewIndex=i;
   const cutIdx=allViews[i].cutout===false?firstCutIdx:i;
   const vc=allViews[cutIdx];
   billPlane.scale.set(vc.w,vc.h,1);billPlane.position.y=vc.h/2;
   billBack.scale.set(vc.w+0.024,vc.h+0.024,0.012);billBack.position.y=vc.h/2;
   billBack.visible=vc.cutout===false;
   billMat.map=textures[cutIdx];
   billMat.transparent=vc.cutout!==false;
   billMat.alphaTest=vc.cutout===false?0:0.15;
   billMat.needsUpdate=true;
   world.dirty=true;
  },
  applyMode:mode=>{
   pivot.visible=mode==='ai3d';
   gBillboard.visible=mode==='billboard';
   world.dirty=true;
  }
 };
 work.applyMode(sculpturePresentation);
 anchor.traverse(o=>{if(o.isMesh)o.userData.work=work;});
 world.works.push(work);world.pickables.push(anchor);world.mobiles.push(work);
 return work;
}
function addSculpture(world,id,position,rotation=0,pedestalH=.9,opts={}){
 const data=ART.find(a=>a.id===id),root=new THREE.Group();root.position.set(...position);root.rotation.y=rotation;world.scene.add(root);
 const firstCutIdx=Math.max(0,data.views.findIndex(v=>v.cutout!==false));
 const h=data.height||0.48,v0=data.views[firstCutIdx]||data.views[0];
 // Museum exhibition scale: give compact studio pieces (22–56 cm) commanding architectural presence in large halls while preserving real cm metadata in catalogue.js
 const displayScale=h<0.90?THREE.MathUtils.clamp((0.64+h*0.82)/h,1.22,3.20):1.20;
 const dispH=h*displayScale,dispW=v0.w*displayScale;
 const [rawPedW,rawPedD]=SCULPTURE_PED_DIMS[id]||[.40,.40];
 const pedBoost=pedestalH>0?Math.min(1.52,0.92+displayScale*0.20):1.0;
 const pedW=Math.max(rawPedW*pedBoost,Math.min(0.86,dispW*0.78));
 const pedD=Math.max(rawPedD*pedBoost,Math.min(0.82,pedW*0.92));
 const effPedH=pedestalH>0.55?Math.min(pedestalH,0.78):pedestalH;
 world.colliders.push({x:position[0],z:position[2],r:Math.max(.50,Math.hypot(pedW,pedD)*.56+.10)});
 let baseTopY=0.003;
 if(effPedH<=0){
  baseTopY=0.003;
  softShadow(root,0,0,Math.max(pedW,pedD)*1.38,.28,0);
  addFloorLecternPlaque(root,data.code,(data.title||'ENRIC SEGARRA').slice(0,26).toUpperCase(),[0,0,Math.max(pedD/2,dispW*0.36)+.28],0.40);
 }else if(opts.mount==='wood_stool'){
  baseTopY=effPedH;
  const stoolCol='#584332';
  const stoolR=Math.max(0.24,Math.min(0.36,dispW*0.42));
  const apron=new THREE.Mesh(cylinderGeo,mat('#4a3829',0.82,0.03));
  apron.scale.set(stoolR,0.030,stoolR);apron.position.set(0,effPedH-0.015,0);apron.castShadow=true;apron.receiveShadow=true;root.add(apron);
  const legCoords=[];
  for(const sx of [-1,1])for(const sz of [-1,1]){
   const topP=[sx*stoolR*0.68,effPedH-0.020,sz*stoolR*0.68],botP=[sx*stoolR*0.90,0.0,sz*stoolR*0.90];
   rod(root,botP,topP,0.022,stoolCol,0.025);
   legCoords.push([sx*stoolR*0.82,0.165,sz*stoolR*0.82]);
  }
  rod(root,legCoords[0],legCoords[1],0.014,stoolCol);
  rod(root,legCoords[2],legCoords[3],0.014,stoolCol);
  rod(root,legCoords[0],legCoords[2],0.014,stoolCol);
  rod(root,legCoords[1],legCoords[3],0.014,stoolCol);
  softShadow(root,0,0,stoolR*3.4,.26,0);
  addFloorLecternPlaque(root,data.code,(data.title||'ENRIC SEGARRA').slice(0,26).toUpperCase(),[0,0,stoolR+.26],0.40);
 }else{
  baseTopY=effPedH;
  const plinthMat=mat('#f3f1e9',0.84,0.02);
  box(root,[pedW-.024,.024,pedD-.024],[0,.012,0],'#2c2f2a');
  const pedCol=new THREE.Mesh(boxGeo,plinthMat);
  pedCol.scale.set(pedW,effPedH-.024,pedD);
  pedCol.position.set(0,.024+(effPedH-.024)/2,0);
  pedCol.castShadow=true;pedCol.receiveShadow=true;root.add(pedCol);
  softShadow(root,0,0,Math.min(pedW,pedD)*.94,.28,baseTopY);
  const glowTex=getRadialGlowTexture();
  if(glowTex){
   const pool=new THREE.Mesh(new THREE.PlaneGeometry(pedW-.02,pedD-.02),new THREE.MeshBasicMaterial({map:glowTex,color:'#fff4d2',transparent:true,opacity:.10,depthWrite:false,blending:THREE.AdditiveBlending,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-4}));
   pool.rotation.x=-Math.PI/2;pool.position.set(0,baseTopY+.003,0);root.add(pool);
  }
  if(effPedH>=0.62){
   sign(root,data.code,(data.title||'ENRIC SEGARRA').slice(0,26).toUpperCase(),[0,effPedH-.14,pedD/2+.009],Math.min(.42,pedW*.88));
  }else{
   addFloorLecternPlaque(root,data.code,(data.title||'ENRIC SEGARRA').slice(0,26).toUpperCase(),[0,0,pedD/2+.24],0.40);
  }
 }
 const textures=data.views.map(v=>{const t=texLoader.load(v.src,()=>{world.dirty=true;},undefined,()=>{world.assetErrors.push(v.src);});t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;});
 const gAi3d=new THREE.Group();gAi3d.position.set(0,baseTopY,0);gAi3d.scale.setScalar(displayScale);root.add(gAi3d);
 const gBillboard=new THREE.Group();gBillboard.position.set(0,baseTopY,0);gBillboard.scale.setScalar(displayScale);root.add(gBillboard);
 const billMat=new THREE.MeshBasicMaterial({map:textures[firstCutIdx]||textures[0],toneMapped:false,transparent:true,alphaTest:.15,side:THREE.DoubleSide});
 const billPlane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),billMat);billPlane.scale.set(v0.w,v0.h,1);billPlane.position.set(0,v0.h/2,0);billPlane.castShadow=true;gBillboard.add(billPlane);
 const centerY=baseTopY+dispH*.52;
 const inspectDist=Math.max(1.48,Math.min(2.65,0.96+Math.max(dispH,Math.max(dispW,Math.max(pedW,pedD)))*1.05));
 const viewY=Math.max(1.24,Math.min(1.76,baseTopY+dispH*.56+.12));
 const work={...data,displayHeight:dispH,displayWidth:dispW,displayScale,object:gBillboard,ai3dGroup:gAi3d,billboardGroup:gBillboard,plane:billPlane,textures,viewIndex:0,anchor:root,center:V(position[0],centerY,position[2]),view:V(position[0]+Math.sin(rotation)*inspectDist,viewY,position[2]+Math.cos(rotation)*inspectDist),radius:Math.max(1.55,inspectDist+0.28),spin:0,phase:world.works.length*1.7,baseRotation:rotation};
 work.setView=idx=>{const n=data.views.length,i=((idx%n)+n)%n;work.viewIndex=i;const planeIdx=data.views[i].cutout===false?firstCutIdx:i;const vp=data.views[planeIdx];billPlane.scale.set(vp.w,vp.h,1);billPlane.position.y=vp.h/2;billMat.map=textures[planeIdx];billMat.needsUpdate=true;world.dirty=true;};
 work.applyMode=mode=>{gAi3d.visible=mode==='ai3d';gBillboard.visible=mode==='billboard';world.dirty=true;};
 work.applyMode(sculpturePresentation);
 if(data.glb){const glbUrl=data.glb+(data.glb.includes('?')?'':'?v=25');gltfLoader.load(glbUrl,gltf=>{if(world.disposed){disposeDetachedTree(gltf.scene);return;}const model=gltf.scene;model.position.set(0,0,0);model.updateMatrixWorld(true);const mBox=new THREE.Box3().setFromObject(model);if(!mBox.isEmpty())model.position.y=-mBox.min.y;model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.userData.work=work;const tex=o.material?.map,nMap=o.material?.normalMap;if(tex){tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;if(nMap){nMap.colorSpace=THREE.NoColorSpace;nMap.anisotropy=4;}o.material=new THREE.MeshStandardMaterial({map:tex,normalMap:nMap||null,normalScale:new THREE.Vector2(1.26,1.26),emissive:'#ffffff',emissiveMap:tex,emissiveIntensity:.045,envMapIntensity:1.22,roughness:data.roughness??.64,metalness:data.metalness??.07,side:THREE.DoubleSide});}else{const hasVC=!!o.geometry.attributes.color;const baseCol=hasVC?'#ffffff':(o.material?.color?o.material.color:'#d8ccb8');o.material=new THREE.MeshStandardMaterial({vertexColors:hasVC,color:baseCol,envMapIntensity:1.05,roughness:o.material?.roughness??(data.roughness??.62),metalness:o.material?.metalness??(data.metalness??.06),side:THREE.DoubleSide});}}});gAi3d.add(model);world.dirty=true;},undefined,()=>{world.assetErrors.push(data.glb);});}
 root.traverse(o=>{if(o.isMesh)o.userData.work=work;});world.works.push(work);world.pickables.push(root);softShadow(world.scene,position[0],position[2],Math.max(1.18,Math.max(pedW,pedD)*2.08),.26);return work;
}
function mount2DArtwork(world,data,g,w,h,uvOverride=null){
 const mountType=data.kind==='drawing'?(data.mountType||'drawing'):(data.mountType||'canvas');
 const uv=uvOverride||data.uvCrop||null;
 const gAi3d=new THREE.Group();g.add(gAi3d);
 const gBillboard=new THREE.Group();g.add(gBillboard);
 if(mountType==='shaped'&&data.cutImage){
  const cutTex=texLoader.load(data.cutImage,()=>{world.dirty=true;},undefined,()=>{world.assetErrors.push(data.cutImage);});
  cutTex.colorSpace=THREE.SRGBColorSpace;cutTex.anisotropy=8;
  const silShadowMat=new THREE.MeshBasicMaterial({map:cutTex,color:'#14120e',transparent:true,opacity:0.28,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2});
  const s1=new THREE.Mesh(new THREE.PlaneGeometry(w*1.02,h*1.02),silShadowMat);
  s1.position.set(0.005,-0.018,-0.024);gAi3d.add(s1);
  addWallLightWash(world,gAi3d,Math.max(0.58,w),Math.max(0.58,h),-0.020);
  const edgeMat=new THREE.MeshStandardMaterial({map:cutTex,color:'#382b1f',roughness:0.84,metalness:0.02,alphaTest:0.14});
  for(const ez of [-0.016,-0.008,0.0,0.008,0.015]){
   const sl=new THREE.Mesh(new THREE.PlaneGeometry(w,h),edgeMat);
   sl.position.z=ez;gAi3d.add(sl);
  }
  const artMat=new THREE.MeshStandardMaterial({map:cutTex,bumpMap:getCanvasBumpTexture(),bumpScale:0.0040,roughness:0.48,metalness:0.03,envMapIntensity:0.65,emissive:'#ffffff',emissiveMap:cutTex,emissiveIntensity:0.20,transparent:true,alphaTest:0.06});
  const art=new THREE.Mesh(new THREE.PlaneGeometry(w,h),artMat);
  art.position.z=0.020;gAi3d.add(art);
  addPictureLightSconce(gAi3d,Math.max(0.44,Math.min(w*0.82,1.25)),h,0.016);
  const s2=new THREE.Mesh(new THREE.PlaneGeometry(w*1.01,h*1.01),new THREE.MeshBasicMaterial({map:cutTex,color:'#14120e',transparent:true,opacity:0.20,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2}));
  s2.position.set(0.004,-0.014,-0.024);gBillboard.add(s2);
  const billPlane=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:cutTex,toneMapped:false,transparent:true,alphaTest:0.06}));
  billPlane.position.z=0.014;gBillboard.add(billPlane);
 }else{
  const texture=texLoader.load(data.image,()=>{world.dirty=true;},undefined,()=>{world.assetErrors.push(data.image);});
  texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=8;
  if(uv){
   if(mountType==='tondo'){
    texture.offset.set(uv[0]+uv[2]*0.004,uv[1]+uv[3]*0.004);
    texture.repeat.set(uv[2]*0.992,uv[3]*0.992);
   }else{
    texture.offset.set(uv[0],uv[1]);
    texture.repeat.set(uv[2],uv[3]);
   }
  }
  if(mountType==='tondo'){
   addCircularWallDropShadow(gAi3d,w+0.04,-0.025,0.34);
   addWallLightWash(world,gAi3d,Math.max(0.65,w),Math.max(0.65,h),-0.021);
   const drum=new THREE.Mesh(new THREE.CylinderGeometry(w/2+0.004,w/2+0.006,0.038,64),mat('#35291e',0.76,0.04));
   drum.rotation.x=Math.PI/2;drum.position.z=0.0;gAi3d.add(drum);
   const artMat=new THREE.MeshStandardMaterial({map:texture,bumpMap:getCanvasBumpTexture(),bumpScale:0.0046,roughness:0.46,metalness:0.03,envMapIntensity:0.65,emissive:'#ffffff',emissiveMap:texture,emissiveIntensity:0.22});
   const art=new THREE.Mesh(new THREE.CircleGeometry(w/2,64),artMat);
   art.position.z=0.020;gAi3d.add(art);
   addPictureLightSconce(gAi3d,w*0.76,h,0.016);
   addCircularWallDropShadow(gBillboard,w+0.02,-0.025,0.22);
   const bDisc=new THREE.Mesh(new THREE.CylinderGeometry(w/2+0.002,w/2+0.002,0.008,64),mat('#262420',0.86,0.02));
   bDisc.rotation.x=Math.PI/2;bDisc.position.z=0.004;gBillboard.add(bDisc);
   const billPlane=new THREE.Mesh(new THREE.CircleGeometry(w/2,64),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));
   billPlane.position.z=0.010;gBillboard.add(billPlane);
  }else if(mountType==='artistFrame'){
   addWallDropShadow(gAi3d,w+0.06,h+0.06,-0.026,0.30);
   addWallLightWash(world,gAi3d,Math.max(0.62,w),Math.max(0.62,h),-0.022);
   box(gAi3d,[w,h,0.042],[0,0,0],'#382c20',false);
   const artMat=new THREE.MeshStandardMaterial({map:texture,bumpMap:getCanvasBumpTexture(),bumpScale:0.0045,roughness:0.48,metalness:0.03,envMapIntensity:0.62,emissive:'#ffffff',emissiveMap:texture,emissiveIntensity:0.22});
   const art=new THREE.Mesh(new THREE.PlaneGeometry(w,h),artMat);
   art.position.z=0.022;gAi3d.add(art);
   addPictureLightSconce(gAi3d,Math.min(w,1.35),h,0.018);
   addWallDropShadow(gBillboard,w+0.03,h+0.03,-0.026,0.20);
   box(gBillboard,[w+0.006,h+0.006,0.008],[0,0,0.004],'#262420',false);
   const billPlane=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));
   billPlane.position.z=0.010;gBillboard.add(billPlane);
  }else if(mountType==='drawing'){
   addWallDropShadow(gAi3d,w+.12,h+.12,-.024,.26);
   addWallLightWash(world,gAi3d,Math.max(0.46,w),Math.max(0.46,h),-.020);
   box(gAi3d,[w+.08,h+.08,.028],[0,0,0],'#f5f2e8',false);
   box(gAi3d,[w+.012,h+.012,.032],[0,0,.004],'#dcd6c6',false);
   addFramedMolding(gAi3d,w+.068,h+.068,.024,.044,.008,'#7c6448','#b09768');
   const artMat=new THREE.MeshStandardMaterial({map:texture,bumpMap:getCanvasBumpTexture(),bumpScale:0.0028,roughness:0.74,metalness:0.01,emissive:'#ffffff',emissiveMap:texture,emissiveIntensity:0.24});
   const art=new THREE.Mesh(new THREE.PlaneGeometry(w,h),artMat);
   art.position.z=.022;gAi3d.add(art);
   const reflTex=getGlassReflectionTexture();
   if(reflTex){
    const glass=new THREE.Mesh(new THREE.PlaneGeometry(w+.056,h+.056),new THREE.MeshBasicMaterial({map:reflTex,transparent:true,opacity:0.06,depthWrite:false}));
    glass.position.z=.027;gAi3d.add(glass);
   }
   addWallDropShadow(gBillboard,w+0.03,h+0.03,-0.024,0.18);
   box(gBillboard,[w+0.006,h+0.006,0.006],[0,0,0.003],'#dfdacf',false);
   const billPlane=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));
   billPlane.position.z=0.008;gBillboard.add(billPlane);
  }else{
   addWallDropShadow(gAi3d,w+.12,h+.12,-.026,.30);
   addWallLightWash(world,gAi3d,Math.max(0.60,w),Math.max(0.60,h),-.022);
   box(gAi3d,[w+.064,h+.064,.036],[0,0,0],'#211d19',false);
   box(gAi3d,[w+.016,h+.016,.046],[0,0,.008],'#f2ede2',false);
   addFramedMolding(gAi3d,w+.036,h+.036,.032,.058,.010,'#584533','#9c825a');
   addPictureLightSconce(gAi3d,Math.min(w,1.35),h,0.020);
   const artMat=new THREE.MeshStandardMaterial({map:texture,bumpMap:getCanvasBumpTexture(),bumpScale:0.0052,roughness:0.46,metalness:0.03,envMapIntensity:0.65,emissive:'#ffffff',emissiveMap:texture,emissiveIntensity:0.22});
   const art=new THREE.Mesh(new THREE.PlaneGeometry(w,h),artMat);
   art.position.z=.035;gAi3d.add(art);
   addWallDropShadow(gBillboard,w+0.03,h+0.03,-0.026,0.20);
   box(gBillboard,[w+0.006,h+0.006,0.008],[0,0,0.004],'#24211d',false);
   const billPlane=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));
   billPlane.position.z=0.010;gBillboard.add(billPlane);
  }
 }
 return {gAi3d,gBillboard,mountType};
}
function addPainting(world,id,position,rotation,w,h,uv=null){
 const data=ART.find(a=>a.id===id),g=new THREE.Group();g.position.set(...position);g.rotation.y=rotation;
 const {gAi3d,gBillboard,mountType}=mount2DArtwork(world,data,g,w,h,uv);
 const signOff=mountType==='canvas'?.16:.13;
 sign(g,data.code,(data.title||'ENRIC SEGARRA').slice(0,28).toUpperCase(),[0,-h/2-signOff,.020],.46);
 world.scene.add(g);
 const inspectDist=Math.max(1.48,Math.min(2.85,0.96+Math.max(w,h)*0.88));
 const work={...data,isWallWork:true,normalXZ:[Math.sin(rotation),Math.cos(rotation)],width:w,height:h,object:g,ai3dGroup:gAi3d,billboardGroup:gBillboard,center:V(...position),radius:inspectDist+0.25,view:V(Math.sin(rotation)*inspectDist+position[0],position[1],Math.cos(rotation)*inspectDist+position[2]),applyMode:mode=>{gAi3d.visible=mode==='ai3d';gBillboard.visible=mode==='billboard';world.dirty=true;}};
 work.applyMode(sculpturePresentation);
 g.traverse(o=>{if(o.isMesh)o.userData.work=work;});world.works.push(work);world.pickables.push(g);return work;
}
function addDrawing(world,id,position,rotation,w=0.82,h=0.54){
 const data=ART.find(a=>a.id===id);if(!data)return null;
 const g=new THREE.Group();g.position.set(...position);g.rotation.y=rotation;
 const {gAi3d,gBillboard}=mount2DArtwork(world,data,g,w,h,null);
 sign(g,data.code,data.title.slice(0,30).toUpperCase(),[0,-h/2-.14,.018],.44);
 world.scene.add(g);
 const inspectDist=Math.max(1.22,Math.min(1.88,0.86+Math.max(w,h)*0.88));
 const work={...data,isWallWork:true,normalXZ:[Math.sin(rotation),Math.cos(rotation)],width:w,height:h,object:g,ai3dGroup:gAi3d,billboardGroup:gBillboard,center:V(...position),radius:inspectDist+0.24,view:V(Math.sin(rotation)*inspectDist+position[0],position[1],Math.cos(rotation)*inspectDist+position[2]),applyMode:mode=>{gAi3d.visible=mode==='ai3d';gBillboard.visible=mode==='billboard';world.dirty=true;}};
 work.applyMode(sculpturePresentation);
 g.traverse(o=>{if(o.isMesh)o.userData.work=work;});world.works.push(work);world.pickables.push(g);return work;
}
function addCanvasPainting(world,id,position,rotation,targetH=0.92,maxW=1.65){
 const data=ART.find(a=>a.id===id);if(!data)return null;
 const asp=data.aspect||1.25;
 let h=targetH,w=+(h*asp).toFixed(2);
 if(w>maxW){w=maxW;h=+(w/asp).toFixed(2);}
 if(w<0.34){w=0.34;h=+(w/asp).toFixed(2);}
 const g=new THREE.Group();g.position.set(...position);g.rotation.y=rotation;
 const {gAi3d,gBillboard,mountType}=mount2DArtwork(world,data,g,w,h,null);
 const signOff=mountType==='canvas'?.16:.13;
 sign(g,data.code,data.title.slice(0,30).toUpperCase(),[0,-h/2-signOff,.020],.46);
 world.scene.add(g);
 const inspectDist=Math.max(1.36,Math.min(2.85,0.92+Math.max(w,h)*0.86));
 const work={...data,isWallWork:true,normalXZ:[Math.sin(rotation),Math.cos(rotation)],width:w,height:h,object:g,ai3dGroup:gAi3d,billboardGroup:gBillboard,center:V(...position),radius:inspectDist+0.25,view:V(Math.sin(rotation)*inspectDist+position[0],position[1],Math.cos(rotation)*inspectDist+position[2]),applyMode:mode=>{gAi3d.visible=mode==='ai3d';gBillboard.visible=mode==='billboard';world.dirty=true;}};
 work.applyMode(sculpturePresentation);
 g.traverse(o=>{if(o.isMesh)o.userData.work=work;});
 world.works.push(work);world.pickables.push(g);
 return work;
}
function addRelief(world,id,position,rotation){
 const data=ART.find(a=>a.id===id);if(!data)return null;
 const firstCutIdx=Math.max(0,(data.views||[]).findIndex(v=>v.cutout!==false));
 const v0=(data.views&&data.views[firstCutIdx])||(data.views&&data.views[0]);
 const rawH=v0?v0.h:(data.height||0.56);
 const rawW=v0?v0.w:+(rawH*(data.aspect||1)).toFixed(3);
 const relScale=rawH<0.68?Math.min(1.68,0.68/rawH):1.12;
 const h=rawH*relScale,w=rawW*relScale;
 const g=new THREE.Group();g.position.set(...position);g.rotation.y=rotation;
 addWallDropShadow(g,w+.05,h+.05,.001,.26);
 addWallLightWash(world,g,Math.max(.56,w),Math.max(.56,h),.002);
 const textures=(data.views||[]).map(v=>{const t=texLoader.load(v.src,()=>{world.dirty=true;},undefined,()=>{world.assetErrors.push(v.src);});t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;});
 const gAi3d=new THREE.Group();gAi3d.position.set(0,0,.003);gAi3d.scale.setScalar(relScale);g.add(gAi3d);
 const gBillboard=new THREE.Group();gBillboard.position.set(0,0,.014);g.add(gBillboard);
 const billMat=new THREE.MeshBasicMaterial({map:textures[firstCutIdx]||textures[0],toneMapped:false,transparent:true,alphaTest:.12,side:THREE.DoubleSide});
 const billPlane=new THREE.Mesh(new THREE.PlaneGeometry(w,h),billMat);
 billPlane.castShadow=true;gBillboard.add(billPlane);
 const signPos=h>1.12?[w/2+.28,-.18,.008]:[0,-h/2-.15,.008];
 sign(g,data.code,data.title.slice(0,28).toUpperCase(),signPos,h>1.12?.42:.44);
 world.scene.add(g);
 const inspectDist=Math.max(1.38,Math.min(2.25,0.92+Math.max(w,h)*0.92));
 const work={...data,displayHeight:h,displayWidth:w,displayScale:relScale,isWallRelief:true,isWallWork:true,normalXZ:[Math.sin(rotation),Math.cos(rotation)],width:w,height:h,object:g,ai3dGroup:gAi3d,billboardGroup:gBillboard,plane:billPlane,textures,viewIndex:0,anchor:g,center:V(...position),radius:Math.max(1.48,inspectDist+0.24),view:V(Math.sin(rotation)*inspectDist+position[0],position[1],Math.cos(rotation)*inspectDist+position[2]),baseRotation:rotation};
 work.setView=idx=>{if(!data.views?.length)return;const n=data.views.length,i=((idx%n)+n)%n;work.viewIndex=i;const planeIdx=data.views[i].cutout===false?firstCutIdx:i;billMat.map=textures[planeIdx];billMat.needsUpdate=true;world.dirty=true;};
 work.applyMode=mode=>{gAi3d.visible=mode==='ai3d';gBillboard.visible=mode==='billboard';world.dirty=true;};
 work.applyMode(sculpturePresentation);
 if(data.glb){
  const glbUrl=data.glb+(data.glb.includes('?')?'':'?v=25');
  gltfLoader.load(glbUrl,gltf=>{
   if(world.disposed){disposeDetachedTree(gltf.scene);return;}
   const model=gltf.scene;model.position.set(0,0,0);model.updateMatrixWorld(true);
   const mBox=new THREE.Box3().setFromObject(model);
   if(!mBox.isEmpty()){
    model.position.set(-(mBox.min.x+mBox.max.x)*.5,-(mBox.min.y+mBox.max.y)*.5,-mBox.min.z);
   }
   model.traverse(o=>{
    if(o.isMesh){
     o.castShadow=true;o.receiveShadow=true;o.userData.work=work;
     const tex=o.material?.map,nMap=o.material?.normalMap;
     if(tex){
      tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;
      if(nMap){nMap.colorSpace=THREE.NoColorSpace;nMap.anisotropy=4;}
      o.material=new THREE.MeshStandardMaterial({map:tex,normalMap:nMap||null,normalScale:new THREE.Vector2(1.24,1.24),emissive:'#ffffff',emissiveMap:tex,emissiveIntensity:.045,envMapIntensity:1.18,roughness:data.roughness??.72,metalness:data.metalness??.06,side:THREE.DoubleSide});
     }else{
      const hasVC=!!o.geometry.attributes.color;
      const baseCol=hasVC?'#ffffff':(o.material?.color?o.material.color:'#d8ccb8');
      o.material=new THREE.MeshStandardMaterial({vertexColors:hasVC,color:baseCol,envMapIntensity:1.05,roughness:o.material?.roughness??(data.roughness??.72),metalness:o.material?.metalness??(data.metalness??.05),side:THREE.DoubleSide});
     }
    }
   });
   gAi3d.add(model);world.dirty=true;
  },undefined,()=>{world.assetErrors.push(data.glb);});
 }
 g.traverse(o=>{if(o.isMesh)o.userData.work=work;});
 world.works.push(work);world.pickables.push(g);
 return work;
}
export function createDrawingsRoom(){const scene=new THREE.Scene();scene.background=new THREE.Color('#ecebe3');scene.environment=getStudioEnvMap();scene.fog=new THREE.Fog('#ecebe3',42,108);const world={id:'drawings',scene,works:[],mobiles:[],pickables:[],colliders:[],assetErrors:[],bounds:{minX:-11.1,maxX:11.1,minZ:-41.1,maxZ:41.1},dirty:true};
 const hemi=new THREE.HemisphereLight('#f8f9ff','#c9c4b4',2.3);scene.add(hemi);world.hemi=hemi;
 const sun=new THREE.DirectionalLight('#fff8eb',2.7);sun.position.set(6,24,10);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-26,right:26,top:44,bottom:-44,near:1,far:90});sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;scene.add(sun);world.sun=sun;
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(24,84),getOakParquetFloorMaterial(10,36));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.userData.isFloor=true;scene.add(floor);world.floor=floor;world.pickables.push(floor);addWalkRing(world);
 box(scene,[24.5,6.8,.4],[0,3.4,-42.1],'#f6f5ed',false);box(scene,[24.5,6.8,.4],[0,3.4,42.1],'#f6f5ed',false);box(scene,[.4,6.8,84.4],[-12.1,3.4,0],'#faf9f2',false);box(scene,[.4,6.8,84.4],[12.1,3.4,0],'#faf9f2',false);
 box(scene,[24,.08,.06],[0,.15,-41.88],'#e2e1d6',false);box(scene,[24,.08,.06],[0,.15,41.88],'#e2e1d6',false);box(scene,[.06,.08,84],[-11.88,.15,0],'#e2e1d6',false);box(scene,[.06,.08,84],[11.88,.15,0],'#e2e1d6',false);
 for(let z=-39;z<=39;z+=6){box(scene,[24,.24,.22],[0,6.6,z],'#e5e6dc',false);box(scene,[24,.05,.09],[0,6.45,z+.22],'#faf8df',false);}
 for(const x of [-10.2,-3.8,3.8,10.2])box(scene,[.08,.08,82],[x,6.32,0],'#363a33',false);
 enhanceIndoorArchitecture(world,{width:24,length:84,height:6.8,railXs:[-10.2,-3.8,3.8,10.2],skylightStep:6,pilasterStep:11.2,hasPortal:false});
 const entrySign=sign(scene,'SALA DE DIBUJO','DIBUJO Y ESPACIO (48) · FIGURAS Y SÍMBOLOS (5) · 53 OBRAS',[0,4.68,41.82],7.2);entrySign.rotation.y=Math.PI;
 const drawingDims=(id)=>{
  const d=ART.find(a=>a.id===id);
  const asp=d?.aspect||1.52;
  let h=(id==='dib016'||id==='dib017'||id==='dib032')?0.56:id==='dib031'?0.50:id==='dib001'?0.48:0.54;
  let w=+(h*asp).toFixed(2);
  if(w>1.04){w=1.04;h=+(w/asp).toFixed(2);}
  return [w,h];
 };
 const figPositions=[-6.4,-3.2,0,3.2,6.4];
 FIGURAS_DIB_IDS.forEach((fid,idx)=>{
  const [fw,fh]=drawingDims(fid,idx);
  addDrawing(world,fid,[figPositions[idx],1.60,41.82],Math.PI,fw,fh);
 });
 sign(scene,'ENRIC SEGARRA I GARIBO','EL TRAZO, EL COLOR Y EL ESPACIO SOBRE EL PAPEL',[0,4.6,-41.82],7.2);
 const wallZs=[36.4,30.8,25.2,19.6,14.0,8.4,2.8,-2.8,-8.4,-14.0,-19.6,-25.2,-30.8,-36.4];
 const leftIds=DRAWING_IDS.slice(0,14),rightIds=DRAWING_IDS.slice(14,28);
 for(let i=0;i<14;i++){
  const [lw,lh]=drawingDims(leftIds[i],i);
  const [rw,rh]=drawingDims(rightIds[i],i+3);
  addDrawing(world,leftIds[i],[-11.84,1.60,wallZs[i]],Math.PI/2,lw,lh);
  addDrawing(world,rightIds[i],[11.84,1.60,wallZs[i]],-Math.PI/2,rw,rh);
 }
 const panels=[
  {z:26.0,title:'SECCIÓN I · TRAZO Y COLOR CÁLIDO',sub:'DIBUJOS DEL ARCHIVO · TRAZO, SOMBRA Y SUPERFICIE',front:['dib034','dib035'],back:['dib036','dib037']},
  {z:10.0,title:'SECCIÓN II · LÍNEA Y COMPOSICIÓN',sub:'EQUILIBRIO DE FORMAS SOBRE EL PLANO',front:['dib038','dib039'],back:['dib040','dib041']},
  {z:-6.0,title:'SECCIÓN III · EL ESPACIO EN EL PAPEL',sub:'ENCUENTROS DE LÍNEAS AZULES, ROJAS Y AMARILLAS',front:['dib042','dib043'],back:['dib044','dib045']},
  {z:-22.0,title:'SECCIÓN IV · TRAMAS Y ACENTOS',sub:'RITMOS GRISES, PLANOS Y LÍNEAS OBLICUAS',front:['dib046','dib047'],back:['dib048','dib049']}
 ];
 panels.forEach((p,pi)=>{
  box(scene,[8.48,.038,.28],[0,.019,p.z],'#2d312b',false);
  box(scene,[8.6,3.62,.32],[0,1.84,p.z],'#f4f3eb',false);
  box(scene,[8.72,.08,.38],[0,.07,p.z],'#dbd9ce',false);
  box(scene,[8.76,.10,.40],[0,3.68,p.z],'#dfddd0',false);
  softShadow(scene,0,p.z,9.4,.26);
  for(const cx of [-3.6,-2.4,-1.2,0,1.2,2.4,3.6])world.colliders.push({x:cx,z:p.z,r:.52});
  sign(scene,p.title,p.sub,[0,3.06,p.z+.20],4.2);
  const backSign=sign(scene,p.title,p.sub,[0,3.06,p.z-.20],4.2);backSign.rotation.y=Math.PI;
  const [fw0,fh0]=drawingDims(p.front[0],pi*2),[fw1,fh1]=drawingDims(p.front[1],pi*2+1);
  const [bw0,bh0]=drawingDims(p.back[0],pi*2+2),[bw1,bh1]=drawingDims(p.back[1],pi*2+3);
  addDrawing(world,p.front[0],[-1.85,1.60,p.z+.20],0,fw0,fh0);addDrawing(world,p.front[1],[1.85,1.60,p.z+.20],0,fw1,fh1);
  addDrawing(world,p.back[0],[-1.85,1.60,p.z-.20],Math.PI,bw0,bh0);addDrawing(world,p.back[1],[1.85,1.60,p.z-.20],Math.PI,bw1,bh1);
 });
 ['dib050','dib051','dib052','dib053'].forEach((nid,ni)=>{
  const [nw,nh]=drawingDims(nid,ni+1);
  addDrawing(world,nid,[-6.0+ni*4.0,1.60,-41.82],0,nw,nh);
 });
 for(const bz of [34.0,18.0,2.0,-14.0,-31.0]){
  for(const bx of [-6.4,6.4])addMuseumBench(world,bx,bz,2.6,0.64);
 }
 world.stops=[
  {title:'Umbral · Serie Dibujo y espacio',series:'Dibujo y espacio',pos:[0,1.72,35.8],look:[-1.85,1.60,26.20],work:'dib034'},
  {title:'Serie Figuras y símbolos (DIB-001 · DIB-032)',series:'Figuras y símbolos',pos:[0,1.72,38.4],look:[0,1.60,41.82],work:'dib017'},
  {title:'Rojos y cálidos (DIB-002 · DIB-006)',series:'Dibujo y espacio',pos:[-8.8,1.72,30.8],look:[-11.84,1.60,30.8],work:'dib003'},
  {title:'Líneas y espacio (DIB-007 · DIB-015)',series:'Dibujo y espacio',pos:[-8.8,1.72,8.4],look:[-11.84,1.60,8.4],work:'dib007'},
  {title:'Pabellón central (DIB-038 · DIB-045)',series:'Dibujo y espacio',pos:[0,1.72,-2.2],look:[-1.85,1.60,-5.80],work:'dib042'},
  {title:'Acentos y tramas (DIB-024 · DIB-033)',series:'Dibujo y espacio',pos:[8.8,1.72,-8.4],look:[11.84,1.60,-8.4],work:'dib027'},
  {title:'Horizonte de papel (DIB-050 · DIB-053)',series:'Dibujo y espacio',pos:[0,1.72,-37.4],look:[-2.0,1.60,-41.82],work:'dib051'}
 ];
 world.stops.forEach((s,i)=>marker(world,i,s.pos[0],s.pos[2]));return world;}
export function createPaintingsRoom(){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#ece8df');scene.environment=getStudioEnvMap();scene.fog=new THREE.Fog('#ece8df',46,118);
 const world={id:'paintings',scene,works:[],mobiles:[],pickables:[],colliders:[],assetErrors:[],bounds:{minX:-12.1,maxX:12.1,minZ:-45.1,maxZ:45.1},dirty:true};
 const hemi=new THREE.HemisphereLight('#fffdf8','#c9c2b2',2.35);scene.add(hemi);world.hemi=hemi;
 const sun=new THREE.DirectionalLight('#fff8eb',2.8);sun.position.set(7,26,12);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
 Object.assign(sun.shadow.camera,{left:-28,right:28,top:48,bottom:-48,near:1,far:98});
 sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;scene.add(sun);world.sun=sun;
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(26,92),getOakParquetFloorMaterial(12,42));
 floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.userData.isFloor=true;scene.add(floor);world.floor=floor;world.pickables.push(floor);addWalkRing(world);
 box(scene,[26.5,6.8,.4],[0,3.4,-46.1],'#f6f4ec',false);box(scene,[26.5,6.8,.4],[0,3.4,46.1],'#f6f4ec',false);
 box(scene,[.4,6.8,92.4],[-13.1,3.4,0],'#faf8f0',false);box(scene,[.4,6.8,92.4],[13.1,3.4,0],'#faf8f0',false);
 box(scene,[26,.08,.06],[0,.15,-45.88],'#e2dfd4',false);box(scene,[26,.08,.06],[0,.15,45.88],'#e2dfd4',false);
 box(scene,[.06,.08,92],[-12.88,.15,0],'#e2dfd4',false);box(scene,[.06,.08,92],[12.88,.15,0],'#e2dfd4',false);
 for(let z=-42;z<=42;z+=6){box(scene,[26,.24,.22],[0,6.6,z],'#e5e4da',false);box(scene,[26,.05,.09],[0,6.45,z+.22],'#faf8df',false);}
 for(const x of [-11.0,-4.2,4.2,11.0])box(scene,[.08,.08,90],[x,6.32,0],'#363a33',false);
 enhanceIndoorArchitecture(world,{width:26,length:92,height:6.8,railXs:[-11.0,-4.2,4.2,11.0],skylightStep:6,pilasterStep:11.5,hasPortal:false});
 const entrySign=sign(scene,'SALA DE PINTURA · 76 OBRAS DEL ARCHIVO','TAUROMAQUIA · GATOS · ARCAS · ROSTROS · RELATOS · FIGURAS · ABSTRACCIONES · SIGNOS',[0,4.68,45.82],8.0);entrySign.rotation.y=Math.PI;
 sign(scene,'ENRIC SEGARRA I GARIBO','EL COLOR, LA MATERIA PICTÓRICA Y EL RELATO EN OCHO SERIES',[0,4.68,-45.82],7.6);
 const PIN_CALIB={
  pin053:[0.84,0.90],pin054:[0.86,0.94],pin055:[0.76,0.92],
  pin020:[0.72,0.80],pin021:[0.72,0.70],pin022:[0.72,0.70],pin026:[0.94,1.32],pin039:[0.98,0.90],pin069:[0.96,1.04],pin071:[0.96,0.86],pin074:[1.04,0.86],pin078:[0.96,0.84],
  pin003:[0.86,0.86],pin009:[0.88,0.88],pin012:[0.86,0.86],pin017:[0.92,0.86],pin019:[0.94,0.80],pin023:[0.72,0.96],pin040:[0.84,1.44],pin063:[0.94,0.92],pin064:[0.96,0.84],
  pin015:[0.88,0.72],pin016:[0.88,0.82],pin018:[0.96,0.88],pin027:[0.92,0.90],pin028:[0.88,0.86],pin031:[0.90,1.04],pin032:[1.02,0.92],pin033:[0.92,0.96],pin034:[0.88,0.82],pin035:[0.98,0.96],pin036:[1.04,0.92],pin037:[0.96,0.86],pin038:[0.90,0.74],pin061:[0.80,0.84],pin068:[1.06,0.86],pin080:[1.00,0.88],
  pin001:[0.86,0.86],pin005:[0.86,0.86],pin007:[0.86,0.86],pin008:[0.86,0.86],pin011:[0.86,0.86],pin014:[0.94,0.98],pin062:[0.84,0.86],
  pin065:[0.92,0.92],pin066:[0.92,0.92],pin067:[0.92,0.92],pin072:[0.92,0.92],pin075:[0.96,0.96],pin077:[1.14,0.90],pin079:[1.14,0.98],
  pin002:[0.86,0.86],pin004:[0.86,0.86],pin006:[0.86,0.86],pin010:[0.86,0.86],pin013:[0.68,1.64],pin024:[0.78,0.88],
  pin025:[0.90,1.18],pin029:[0.86,1.54],pin030:[0.48,2.30],pin060:[0.86,0.86],pin070:[0.58,1.38],pin073:[0.58,1.92],
  pin041:[0.76,1.62],pin042:[0.76,1.62],pin043:[0.76,1.62],pin044:[0.76,1.62],pin045:[0.76,1.62],pin046:[0.76,1.62],pin047:[0.76,1.62],pin048:[0.76,1.62],
  pin049:[0.78,1.66],pin050:[0.96,1.16],pin051:[0.78,1.74],pin052:[0.84,1.52],pin058:[0.48,2.48]
 };
 const pinDims=(id,defH=0.92,defMaxW=1.48)=>PIN_CALIB[id]||[defH,defMaxW];

 // 1. South Wall (z = 45.82, rot = Math.PI): Serie Letras y signos (3 obras)
 const letrasIds=["pin053","pin054","pin055"];
 const letrasXs=[-3.8,0.0,3.8];
 letrasIds.forEach((id,i)=>{const [th,mw]=pinDims(id,0.84,1.18);addCanvasPainting(world,id,[letrasXs[i],1.68,45.82],Math.PI,th,mw);});

 // 2. West Wall (x = -12.84, rot = Math.PI/2): Serie Tauromaquia (9 obras, Sur) + Serie Gatos (9 obras, Norte)
 const tauroSign=sign(scene,'SERIE TAUROMAQUIA · 09 OBRAS','EL RUEDO, EL TORO Y EL MOVIMIENTO DEL COLOR',[-12.84,4.15,22.0],5.2);tauroSign.rotation.y=Math.PI/2;
 const tauroIds=["pin020","pin021","pin022","pin026","pin039","pin069","pin071","pin074","pin078"];
 const tauroZs=[40.0,35.5,31.0,26.5,22.0,17.5,13.0,8.5,4.0];
 tauroIds.forEach((id,i)=>{const [th,mw]=pinDims(id,0.94,1.48);addCanvasPainting(world,id,[-12.84,1.68,tauroZs[i]],Math.PI/2,th,mw);});

 const gatosSign=sign(scene,'SERIE GATOS · 09 OBRAS','SILUETAS FELINAS, NOCHE Y TEXTURA',[-12.84,4.15,-22.0],5.0);gatosSign.rotation.y=Math.PI/2;
 const gatosIds=["pin003","pin009","pin012","pin017","pin019","pin023","pin040","pin063","pin064"];
 const gatosZs=[-4.0,-8.5,-13.0,-17.5,-22.0,-26.5,-31.0,-35.5,-40.0];
 gatosIds.forEach((id,i)=>{const [th,mw]=pinDims(id,0.88,1.46);addCanvasPainting(world,id,[-12.84,1.68,gatosZs[i]],Math.PI/2,th,mw);});

 // 3. East Wall (x = 12.84, rot = -Math.PI/2): Serie Rostros y personajes (16 obras)
 const rostrosSign=sign(scene,'SERIE ROSTROS Y PERSONAJES · 16 OBRAS','EXPRESIÓN, MIRADA Y RETRATO IMAGINARIO',[12.84,4.15,0.0],5.8);rostrosSign.rotation.y=-Math.PI/2;
 const rostrosIds=["pin015","pin016","pin018","pin027","pin028","pin031","pin032","pin033","pin034","pin035","pin036","pin037","pin038","pin061","pin068","pin080"];
 for(let i=0;i<16;i++){
  const rz=39.0-i*5.2;
  const [th,mw]=pinDims(rostrosIds[i],0.94,1.44);
  addCanvasPainting(world,rostrosIds[i],[12.84,1.68,rz],-Math.PI/2,th,mw);
 }

 // 4. Central Curatorial Panels (5 panels at z = 30.0, 15.0, 0.0, -15.0, -30.0)
 const panels=[
  {z:30.0,title:'SERIE ARCAS · 07 OBRAS',sub:'TRAVESÍAS, NAVES Y SIMBOLOGÍA DEL ARCA',defH:0.86,front:["pin001","pin005","pin007","pin008"],fXs:[-3.9,-1.3,1.3,3.9],back:["pin011","pin014","pin062"],bXs:[-3.3,0.0,3.3]},
  {z:15.0,title:'SERIE RELATOS E ICONOGRAFÍA · 07 OBRAS',sub:'ESCENAS NARRATIVAS Y COMPOSICIONES CORALES',defH:0.96,front:["pin065","pin066","pin067","pin072"],fXs:[-3.9,-1.3,1.3,3.9],back:["pin075","pin077","pin079"],bXs:[-3.3,0.0,3.3]},
  {z:0.0,title:'SERIE FIGURAS Y SÍMBOLOS I',sub:'EL CUERPO, EL SIGNO Y LA IMAGEN SIMBÓLICA',defH:0.86,front:["pin002","pin004","pin006"],fXs:[-3.3,0.0,3.3],back:["pin010","pin013","pin024"],bXs:[-3.55,0.0,3.55]},
  {z:-15.0,title:'SERIE FIGURAS Y SÍMBOLOS II',sub:'CONTRASTES DE COLOR Y PRESENCIA HUMANA',defH:0.86,front:["pin025","pin029","pin030"],fXs:[-3.85,-0.95,2.65],back:["pin060","pin070","pin073"],bXs:[-3.85,-1.05,2.55]},
  {z:-30.0,title:'SERIE ABSTRACCIONES · 13 OBRAS',sub:'MATERIA, RITMO Y COMPOSICIÓN NO FIGURATIVA',defH:0.76,front:["pin041","pin042","pin043","pin044"],fXs:[-3.95,-1.32,1.32,3.95],back:["pin045","pin046","pin047","pin048"],bXs:[-3.95,-1.32,1.32,3.95]}
 ];
 panels.forEach(p=>{
  box(scene,[10.86,.038,.28],[0,.019,p.z],'#2d312b',false);
  box(scene,[11.0,3.88,.32],[0,1.97,p.z],'#f4f2ea',false);
  box(scene,[11.12,.08,.38],[0,.07,p.z],'#dbd8cc',false);
  box(scene,[11.16,.10,.40],[0,3.94,p.z],'#dfdcd0',false);
  softShadow(scene,0,p.z,11.8,.26);
  for(const cx of [-4.8,-3.2,-1.6,0,1.6,3.2,4.8])world.colliders.push({x:cx,z:p.z,r:.55});
  sign(scene,p.title,p.sub,[0,3.28,p.z+.20],4.8);
  const backSign=sign(scene,p.title,p.sub,[0,3.28,p.z-.20],4.8);backSign.rotation.y=Math.PI;
  p.front.forEach((id,idx)=>{const [th,mw]=pinDims(id,p.defH,2.35);addCanvasPainting(world,id,[p.fXs[idx],1.68,p.z+.20],0,th,mw);});
  p.back.forEach((id,idx)=>{const [th,mw]=pinDims(id,p.defH,2.35);addCanvasPainting(world,id,[p.bXs[idx],1.68,p.z-.20],Math.PI,th,mw);});
 });

 // 5. North Wall (z = -45.82, rot = 0): Remaining 5 works of Serie Abstracciones
 const northAbsIds=["pin049","pin050","pin051","pin052","pin058"];
 const northXs=[-8.6,-4.6,-0.8,3.2,7.8];
 northAbsIds.forEach((id,i)=>{const [th,mw]=pinDims(id,0.84,2.50);addCanvasPainting(world,id,[northXs[i],1.70,-45.82],0,th,mw);});

 for(const bz of [37.5,22.5,7.5,-7.5,-22.5,-37.5]){
  for(const bx of [-7.4,7.4])addMuseumBench(world,bx,bz,2.6,0.64);
 }
 world.stops=[
  {title:'Umbral · Serie Arcas (PIN-001 · PIN-062)',series:'Arcas',pos:[0,1.72,36.2],look:[-1.3,1.68,30.20],work:'pin001'},
  {title:'Serie Letras y signos (PIN-053 · PIN-055)',series:'Letras y signos',pos:[0,1.72,42.2],look:[0,1.68,45.82],work:'pin054'},
  {title:'Serie Tauromaquia (PIN-020 · PIN-078)',series:'Tauromaquia',pos:[-9.2,1.72,22.0],look:[-12.84,1.68,22.0],work:'pin039'},
  {title:'Serie Relatos e iconografía (PIN-065 · PIN-079)',series:'Relatos e iconografía',pos:[0,1.72,21.0],look:[-1.3,1.68,15.20],work:'pin066'},
  {title:'Serie Figuras y símbolos (PIN-002 · PIN-073)',series:'Figuras y símbolos',pos:[0,1.72,6.0],look:[0,1.68,0.20],work:'pin004'},
  {title:'Serie Rostros y personajes (PIN-015 · PIN-080)',series:'Rostros y personajes',pos:[9.2,1.72,2.6],look:[12.84,1.68,2.6],work:'pin032'},
  {title:'Serie Gatos (PIN-003 · PIN-064)',series:'Gatos',pos:[-9.2,1.72,-22.0],look:[-12.84,1.68,-22.0],work:'pin012'},
  {title:'Serie Abstracciones (PIN-041 · PIN-058)',series:'Abstracciones',pos:[0,1.72,-24.0],look:[-1.3,1.68,-29.80],work:'pin046'},
  {title:'Horizonte Norte · Abstracciones (PIN-049 · PIN-058)',series:'Abstracciones',pos:[0,1.72,-40.6],look:[0,1.70,-45.82],work:'pin051'}
 ];
 world.stops.forEach((s,i)=>marker(world,i,s.pos[0],s.pos[2]));
 return world;
}
export function createOrganicRoom(){const scene=new THREE.Scene();scene.background=new THREE.Color('#edeae0');scene.environment=getStudioEnvMap();scene.fog=new THREE.Fog('#edeae0',36,92);const world={id:'organic',scene,works:[],mobiles:[],pickables:[],colliders:[],assetErrors:[],bounds:{minX:-10.8,maxX:10.8,minZ:-22.8,maxZ:22.8},dirty:true};
 const hemi=new THREE.HemisphereLight('#fffdf7','#c7bfa9',2.35);scene.add(hemi);world.hemi=hemi;
 const sun=new THREE.DirectionalLight('#fff6e4',2.85);sun.position.set(7,22,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-22,right:22,top:26,bottom:-26,near:1,far:75});sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;scene.add(sun);world.sun=sun;
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(24,48),getTravertineFloorMaterial(10,20));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.userData.isFloor=true;scene.add(floor);world.floor=floor;world.pickables.push(floor);addWalkRing(world);
 box(scene,[24.5,6.8,.4],[0,3.4,-24.1],'#f5f3ea',false);box(scene,[24.5,6.8,.4],[0,3.4,24.1],'#f5f3ea',false);box(scene,[.4,6.8,48.4],[-12.1,3.4,0],'#f9f7ef',false);box(scene,[.4,6.8,48.4],[12.1,3.4,0],'#f9f7ef',false);
 box(scene,[24,.08,.06],[0,.15,-23.88],'#dfddd1',false);box(scene,[24,.08,.06],[0,.15,23.88],'#dfddd1',false);box(scene,[.06,.08,48],[-11.88,.15,0],'#dfddd1',false);box(scene,[.06,.08,48],[11.88,.15,0],'#dfddd1',false);
 for(let z=-21;z<=21;z+=6){box(scene,[24,.24,.22],[0,6.6,z],'#e5e3d7',false);box(scene,[24,.05,.09],[0,6.45,z+.22],'#faf7df',false);}
 for(const x of [-9.8,-3.6,3.6,9.8])box(scene,[.08,.08,46],[x,6.32,0],'#363a33',false);
 enhanceIndoorArchitecture(world,{width:24,length:48,height:6.8,railXs:[-9.8,-3.6,3.6,9.8],skylightStep:6,pilasterStep:9.2,hasPortal:true});
 const entrySign=sign(scene,'SALA DE FORMAS ORGÁNICAS','ESCULTURA EN MADERA, PIEDRA Y MATERIA NATURAL · 08 OBRAS',[0,4.55,23.8],7.0);entrySign.rotation.y=Math.PI;
 sign(scene,'ENRIC SEGARRA I GARIBO','LA VETA, EL HUECO Y EL VOLUMEN ORGÁNICO EN 360°',[0,4.6,-23.8],7.2);
 const placements=[
  {id:'esc008',pos:[-4.6,0,14.0],rot:0.42,ped:.92},
  {id:'sculpture1',pos:[4.6,0,14.0],rot:-0.42,ped:.95},
  {id:'sculpture3',pos:[-4.6,0,4.8],rot:0.38,ped:.95},
  {id:'sculpture2',pos:[4.6,0,4.8],rot:-0.38,ped:.92},
  {id:'esc013',pos:[-4.6,0,-4.8],rot:0.38,ped:.90},
  {id:'esc014',pos:[4.6,0,-4.8],rot:-0.38,ped:.90},
  {id:'esc015',pos:[-4.6,0,-14.0],rot:0.42,ped:.96},
  {id:'esc038',pos:[4.6,0,-14.0],rot:-0.42,ped:.74}
 ];
 placements.forEach(p=>{
  addSculpture(world,p.id,p.pos,p.rot,p.ped);
  const [pw,pd]=SCULPTURE_PED_DIMS[p.id]||[.38,.38];
  addSculptureFloorHalo(scene,p.pos[0],p.pos[2],pw,pd);
 });
 for(const bz of [9.4,0,-9.4])addMuseumBench(world,0,bz,2.8,0.68);
 world.stops=[
  {title:'Umbral de las formas orgánicas',pos:[0,1.72,20.2],look:[0,1.25,6.0],work:'esc008'},
  {title:'Ondulación y veta (ESC-008 · ESC-009)',pos:[-2.2,1.72,14.8],look:[-4.6,1.12,14.0],work:'esc008'},
  {title:'Madera cálida (ESC-009)',pos:[2.2,1.72,14.6],look:[4.6,1.10,14.0],work:'sculpture1'},
  {title:'Aberturas y luz (ESC-010 · ESC-011)',pos:[2.2,1.72,5.6],look:[4.6,1.12,4.8],work:'sculpture2'},
  {title:'Verticalidad orgánica (ESC-013 · ESC-014)',pos:[-2.2,1.72,-4.0],look:[-4.6,1.14,-4.8],work:'esc013'},
  {title:'Cavidades y raíz natural (ESC-015 · ESC-038)',pos:[-2.2,1.72,-13.2],look:[-4.6,1.08,-14.0],work:'esc015'}
 ];
 world.stops.forEach((s,i)=>marker(world,i,s.pos[0],s.pos[2]));return world;}
export function createCurvedPlanesRoom(){const scene=new THREE.Scene();scene.background=new THREE.Color('#eae8df');scene.environment=getStudioEnvMap();scene.fog=new THREE.Fog('#eae8df',40,98);const world={id:'curvos',scene,works:[],mobiles:[],pickables:[],colliders:[],assetErrors:[],bounds:{minX:-10.8,maxX:10.8,minZ:-26.8,maxZ:26.8},dirty:true};
 const hemi=new THREE.HemisphereLight('#fffdf8','#c4bcab',2.35);scene.add(hemi);world.hemi=hemi;
 const sun=new THREE.DirectionalLight('#fff6e5',2.9);sun.position.set(7.5,23,11);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-24,right:24,top:30,bottom:-30,near:1,far:80});sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;scene.add(sun);world.sun=sun;
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(24,56),getTravertineFloorMaterial(10,24));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.userData.isFloor=true;scene.add(floor);world.floor=floor;world.pickables.push(floor);addWalkRing(world);
 box(scene,[24.5,6.8,.4],[0,3.4,-28.1],'#f5f3ea',false);box(scene,[24.5,6.8,.4],[0,3.4,28.1],'#f5f3ea',false);box(scene,[.4,6.8,56.4],[-12.1,3.4,0],'#f9f7ef',false);box(scene,[.4,6.8,56.4],[12.1,3.4,0],'#f9f7ef',false);
 box(scene,[24,.08,.06],[0,.15,-27.88],'#dfddd1',false);box(scene,[24,.08,.06],[0,.15,27.88],'#dfddd1',false);box(scene,[.06,.08,56],[-11.88,.15,0],'#dfddd1',false);box(scene,[.06,.08,56],[11.88,.15,0],'#dfddd1',false);
 for(let z=-24;z<=24;z+=6){box(scene,[24,.24,.22],[0,6.6,z],'#e5e3d7',false);box(scene,[24,.05,.09],[0,6.45,z+.22],'#faf7df',false);}
 for(const x of [-9.8,-3.6,3.6,9.8])box(scene,[.08,.08,54],[x,6.32,0],'#363a33',false);
 enhanceIndoorArchitecture(world,{width:24,length:56,height:6.8,railXs:[-9.8,-3.6,3.6,9.8],skylightStep:6,pilasterStep:7.2,hasPortal:true});
 const entrySign=sign(scene,'PLANOS CURVOS Y VOLÚMENES ABIERTOS','ESCULTURA EN HIERRO FORJADO Y PIEDRA · 12 OBRAS',[0,4.55,27.8],7.4);entrySign.rotation.y=Math.PI;
 sign(scene,'ENRIC SEGARRA I GARIBO','EL PLIEGUE, LA CURVA Y EL ESPACIO INTERIOR EN 360°',[0,4.6,-27.8],7.4);
 const placements=[
  {id:'esc005',pos:[-4.6,0,18.0],rot:0.42,ped:.90},
  {id:'esc006',pos:[4.6,0,18.0],rot:-0.42,ped:.90},
  {id:'esc007',pos:[-4.6,0,10.8],rot:0.38,ped:.92},
  {id:'sculpture4',pos:[4.6,0,10.8],rot:-0.38,ped:.90},
  {id:'esc031',pos:[-4.6,0,3.6],rot:0.38,ped:.88},
  {id:'esc032',pos:[4.6,0,3.6],rot:-0.38,ped:.92},
  {id:'esc033',pos:[-4.6,0,-3.6],rot:0.38,ped:.92},
  {id:'esc034',pos:[4.6,0,-3.6],rot:-0.38,ped:.90},
  {id:'esc035',pos:[-4.6,0,-10.8],rot:0.40,ped:.90},
  {id:'esc036',pos:[4.6,0,-10.8],rot:-0.40,ped:.90},
  {id:'esc044',pos:[-4.6,0,-18.0],rot:0.42,ped:.90},
  {id:'esc053',pos:[4.6,0,-18.0],rot:-0.42,ped:.86}
 ];
 placements.forEach(p=>{
  addSculpture(world,p.id,p.pos,p.rot,p.ped);
  const [pw,pd]=SCULPTURE_PED_DIMS[p.id]||[.42,.38];
  addSculptureFloorHalo(scene,p.pos[0],p.pos[2],pw,pd);
 });
 for(const bz of [14.4,7.2,0,-7.2,-14.4])addMuseumBench(world,0,bz,2.8,0.68);
 world.stops=[
  {title:'Umbral de los planos curvos',pos:[0,1.72,24.2],look:[0,1.25,10.0],work:'esc005'},
  {title:'Aberturas verticales (ESC-005 · ESC-006)',pos:[-2.2,1.72,18.8],look:[-4.6,1.15,18.0],work:'esc005'},
  {title:'Envolventes y perfiles (ESC-007 · ESC-012)',pos:[2.2,1.72,11.6],look:[4.6,1.14,10.8],work:'sculpture4'},
  {title:'Curvas ascendentes (ESC-031 · ESC-032)',pos:[-2.2,1.72,4.4],look:[-4.6,1.16,3.6],work:'esc031'},
  {title:'Lazos y oquedades (ESC-033 · ESC-034)',pos:[2.2,1.72,-2.8],look:[4.6,1.14,-3.6],work:'esc034'},
  {title:'Contorno ovalado y espiral (ESC-035 · ESC-036)',pos:[-2.2,1.72,-10.0],look:[-4.6,1.15,-10.8],work:'esc035'},
  {title:'Planos dobles y ondulación (ESC-044 · ESC-053)',pos:[2.2,1.72,-17.2],look:[4.6,1.18,-18.0],work:'esc053'}
 ];
 world.stops.forEach((s,i)=>marker(world,i,s.pos[0],s.pos[2]));return world;}
function lights(world,garden){world.scene.environment=garden?getGardenEnvMap():getStudioEnvMap();const hemi=new THREE.HemisphereLight(garden?'#eaf3f7':'#f1f4ff',garden?'#a38f5b':'#c4c2b4',garden?2.15:2.25);world.scene.add(hemi);world.hemi=hemi;const sun=new THREE.DirectionalLight(garden?'#fff1ce':'#fff8e9',garden?3.15:2.85);sun.position.set(garden?-16:6,garden?24:20,garden?12:8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,garden?{left:-38,right:38,top:32,bottom:-32,near:1,far:95}:{left:-20,right:20,top:22,bottom:-22,near:1,far:72});sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;world.scene.add(sun);world.sun=sun;}
function marker(world,index,x,z){const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');const grd=ctx.createRadialGradient(128,128,12,128,128,110);grd.addColorStop(0,'rgba(248,246,238,0.92)');grd.addColorStop(0.82,'rgba(236,232,218,0.84)');grd.addColorStop(1,'rgba(220,214,196,0)');ctx.fillStyle=grd;ctx.beginPath();ctx.arc(128,128,108,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#5a684b';ctx.lineWidth=5;ctx.beginPath();ctx.arc(128,128,104,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='rgba(156,134,88,0.78)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(128,128,90,0,Math.PI*2);ctx.stroke();for(let k=0;k<12;k++){const a=(k/12)*Math.PI*2;ctx.beginPath();ctx.moveTo(128+Math.cos(a)*90,128+Math.sin(a)*90);ctx.lineTo(128+Math.cos(a)*102,128+Math.sin(a)*102);ctx.stroke();}ctx.font='600 66px Georgia';ctx.fillStyle='#35402b';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(index+1).padStart(2,'0'),128,130);const tex=new THREE.CanvasTexture(c);const m=new THREE.Mesh(new THREE.PlaneGeometry(.72,.72),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;const gy=world.heightAt?world.heightAt(x,z):0;m.position.set(x,gy+.028,z);m.userData.stop=index;const ring=new THREE.Mesh(new THREE.RingGeometry(0.33,0.365,36),mat('#9e8452',0.36,0.62));ring.position.z=-0.012;ring.userData.stop=index;m.add(ring);world.scene.add(m);world.pickables.push(m);}
export function createGallery(){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#e8ece5');scene.fog=new THREE.Fog('#e8ece5',36,88);
 const world={id:'gallery',scene,works:[],mobiles:[],pickables:[],colliders:[],assetErrors:[],bounds:{minX:-10.2,maxX:10.2,minZ:-19.2,maxZ:19.2},dirty:true};
 lights(world,false);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(22.4,40.4),getTravertineFloorMaterial(10,18));
 floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.userData.isFloor=true;scene.add(floor);world.floor=floor;world.pickables.push(floor);addWalkRing(world);
 box(scene,[22.8,6.7,.38],[0,3.35,-20.1],'#f6f6ee',false);
 box(scene,[.38,6.7,40.4],[-11.15,3.35,0],'#faf9f3',false);
 box(scene,[.38,6.7,40.4],[11.15,3.35,0],'#faf9f3',false);
 box(scene,[22.8,6.7,.38],[0,3.35,20.1],'#f6f6ee',false);
 const entrySign=sign(scene,'GALERÍA PRINCIPAL · ESCULTURA Y ENSAMBLAJES','ESTRUCTURAS, ESCULTURAS DE SUELO, RELIEVES MURALES Y MÓVILES',[0,4.55,19.82],7.4);entrySign.rotation.y=Math.PI;
 box(scene,[22,.07,.05],[0,.15,-19.86],'#e3e3d9',false);box(scene,[22,.07,.05],[0,.15,19.86],'#e3e3d9',false);
 box(scene,[.05,.07,40],[-10.92,.15,0],'#e3e3d9',false);box(scene,[.05,.07,40],[10.92,.15,0],'#e3e3d9',false);
 for(let z=-18;z<=18;z+=4){box(scene,[22,.22,.19],[0,6.55,z],'#e5e7dd',false);box(scene,[22,.045,.07],[0,6.41,z+.2],'#faf8df',false);}
 for(const x of [-9.6,-4.2,4.2,9.6])box(scene,[.08,.08,39],[x,6.3,0],'#363a33',false);
 enhanceIndoorArchitecture(world,{width:22,length:40,height:6.7,railXs:[-9.6,-4.2,4.2,9.6],skylightStep:4,pilasterStep:6.6,hasPortal:false});
 sign(scene,'ENRIC SEGARRA I GARIBO','MATERIA  /  ENSAMBLAJE  /  RELIEVE  /  MOVIMIENTO',[0,4.65,-19.82],6.8);
 const rose=addMobile(world,'rose',[.6,5.15,-1.7],1.08);
 const green=addMobile(world,'green',[-4.3,4.7,-5.8],.94);
 const color=addMobile(world,'color',[4.7,4.9,-5],1.06);
 for(const w of world.mobiles)rod(scene,[w.anchor.position.x,6.5,w.anchor.position.z],w.anchor.position.toArray(),.006,'#999d8f');
 // 3 Featured paintings on the North wall at calibrated human museum scale
 addPainting(world,'painting1',[-4.8,1.72,-19.82],0,1.18,1.18);
 addPainting(world,'painting2',[0.0,1.72,-19.82],0,0.95,1.18);
 addPainting(world,'painting3',[4.8,1.72,-19.82],0,0.93,1.18);
 // 9 Estructuras y objetos ensamblados with calibrated floor-standing, wooden-stool, low-plinth & eye-level mounts
 const galSculptures=[
  ['esc037',[-5.8,0,6.8],.65,.88,{}],
  ['esc039',[-5.8,0,1.8],.48,.48,{}],
  ['esc040',[-5.8,0,-3.2],.45,.90,{}],
  ['esc041',[-3.0,0,-9.2],.18,.50,{}],
  ['esc042',[3.6,0,-9.2],-.32,.92,{}],
  ['esc043',[5.8,0,-4.4],-.52,.75,{}],
  ['esc045',[5.8,0,.6],-.48,.44,{mount:'wood_stool'}],
  ['esc054',[5.8,0,5.2],-.58,.88,{}],
  ['esc055',[5.8,0,9.8],-.72,0,{}]
 ];
 for(const [sid,spos,srot,sped,sopts] of galSculptures){
  addSculpture(world,sid,spos,srot,sped,sopts);
  const [pw,pd]=SCULPTURE_PED_DIMS[sid]||[.44,.44];
  addSculptureFloorHalo(scene,spos[0],spos[2],pw,pd);
 }
 // 2 Freestanding ground installations placed directly on the gallery floor (ESC-049 & ESC-052)
 addFloorInstallationGallery(world,'esc049',[-4.8,0,15.0],0.16);
 addFloorInstallationGallery(world,'esc052',[4.8,0,15.0],-0.18);
 // West Wall (x = -10.88, rot = Math.PI/2): 11 Relieves y ensamblajes murales mounted flush on the wall
 const westSign=sign(scene,'RELIEVES Y ENSAMBLAJES MURALES','11 OBRAS EN MADERA, HIERRO Y OBJETOS ENSAMBLADOS',[-10.88,4.15,0],5.8);westSign.rotation.y=Math.PI/2;
 const westZs=[16.5,13.2,9.9,6.6,3.3,0.0,-3.3,-6.6,-9.9,-13.2,-16.5];
 RELIEF_MURALES_IDS.forEach((id,i)=>{
  const ry=(id==='esc021'||id==='esc028')?1.66:1.60;
  addRelief(world,id,[-10.88,ry,westZs[i]],Math.PI/2);
 });
 // East Wall (x = 10.88, rot = -Math.PI/2): 4 Relieves de planos recortados + 5 Relieves de textura mounted flush
 const eastSign1=sign(scene,'RELIEVES DE PLANOS RECORTADOS','4 OBRAS EN MADERA Y SOMBRA',[10.88,4.15,10.8],4.6);eastSign1.rotation.y=-Math.PI/2;
 const recortadosZs=[16.2,12.6,9.0,5.4];
 RELIEF_RECORTADOS_IDS.forEach((id,i)=>addRelief(world,id,[10.88,1.60,recortadosZs[i]],-Math.PI/2));
 const eastSign2=sign(scene,'RELIEVES DE TEXTURA','5 OBRAS DE MATERIA Y HUELLA EN LA SUPERFICIE',[10.88,4.15,-8.4],4.8);eastSign2.rotation.y=-Math.PI/2;
 const texturaZs=[-1.2,-5.0,-8.8,-12.6,-16.4];
 RELIEF_TEXTURA_IDS.forEach((id,i)=>addRelief(world,id,[10.88,1.60,texturaZs[i]],-Math.PI/2));
 // South Wall curatorial inscription (outdoor tree interventions live in El Jardín)
 const southNote=sign(scene,'ESCULTURAS DE SUELO E INTERVENCIONES','ESC-049 · ESC-052 · ESC-055 EN SUELO DE SALA · INTERVENCIONES ARBÓREAS EN EL JARDÍN',[0,2.10,19.82],5.8);southNote.rotation.y=Math.PI;
 addMuseumBench(world,-4.5,3,2.75,0.65);
 addMuseumBench(world,1.8,9.8,2.6,0.64);
 world.stops=[
  {title:'El umbral y móviles centrales',series:'Estructuras y objetos ensamblados',pos:[1.9,1.72,13.5],look:[.6,3.2,-1.7],work:'rose'},
  {title:'Estructuras y mesa escultura (ESC-037 · ESC-055)',series:'Estructuras y objetos ensamblados',pos:[-2.8,1.72,6.8],look:[-5.8,1.15,6.8],work:'esc037'},
  {title:'Ruedas dentadas y espirales (ESC-041 · ESC-043)',series:'Estructuras y objetos ensamblados',pos:[0,1.72,-6.6],look:[-3.0,0.92,-9.2],work:'esc041'},
  {title:'Relieves de planos recortados (ESC-001 · ESC-004)',series:'Relieves de planos recortados',pos:[8.4,1.72,12.6],look:[10.88,1.60,12.6],work:'esc002'},
  {title:'Relieves y ensamblajes murales (ESC-016 · ESC-046)',series:'Relieves y ensamblajes murales',pos:[-8.4,1.72,3.3],look:[-10.88,1.60,3.3],work:'esc020'},
  {title:'Relieves de textura (ESC-024 · ESC-029)',series:'Relieves de textura',pos:[8.4,1.72,-8.8],look:[10.88,1.60,-8.8],work:'esc026'},
  {title:'Esculturas de suelo (ESC-049 · ESC-052 · ESC-055)',series:'Intervenciones en el entorno',pos:[-2.2,1.72,16.8],look:[-4.8,0.70,15.0],work:'esc049'}
 ];
 world.stops.forEach((s,i)=>marker(world,i,s.pos[0],s.pos[2]));
 return world;
}
function tree(world,x,z,height,seed,bare=false){const random=rng(seed),g=new THREE.Group();g.position.set(x,0,z);world.scene.add(g);world.colliders.push({x,z,r:.65});const lean=(random()-.5)*1.1;rod(g,[0,0,0],[lean,height*.62,0],.25,'#6e6250',.14);rod(g,[lean,height*.62,0],[lean+.3,height,0],.14,'#75684f',.045);const crowns=[];
 for(let i=0;i<6;i++){const a=i*2.4+seed,level=height*(.5+random()*.3),reach=1.7+random()*1.3;const end=[Math.cos(a)*reach,height*(.82+random()*.22),Math.sin(a)*reach];rod(g,[lean*.7,level,0],end,.10,'#73634b',.018);const mid=[end[0]*.63,(end[1]+level)*.5,end[2]*.63];rod(g,mid,[end[0]*1.15,end[1]+.5,end[2]*.85],.045,'#7d6d50',.008);crowns.push(end);}
 if(!bare){const count=125,foliage=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),mat('#69764a',1),count);const dummy=new THREE.Object3D();for(let i=0;i<count;i++){const p=crowns[i%crowns.length],a=random()*Math.PI*2,r=Math.sqrt(random())*1.6;dummy.position.set(p[0]+Math.cos(a)*r,p[1]+(random()-.25)*.9,p[2]+Math.sin(a)*r);dummy.scale.set(.45+random()*.6,.12+random()*.35,.4+random()*.6);dummy.rotation.set(random(),random()*6,random());dummy.updateMatrix();foliage.setMatrixAt(i,dummy.matrix);foliage.setColorAt(i,new THREE.Color().setHSL(.17+random()*.06,.18+random()*.17,.21+random()*.13));}foliage.castShadow=true;foliage.receiveShadow=true;g.add(foliage);}
 for(let i=0;i<9;i++){const a=i*.7;const rock=new THREE.Mesh(pebbleGeo,mat(i%2?'#b0a48b':'#d0c7ad'));rock.position.set(Math.cos(a)*.6,.12,Math.sin(a)*.6);rock.scale.set(.14+random()*.15,.12+random()*.12,.18+random()*.12);rock.rotation.set(random(),random(),random());rock.castShadow=true;g.add(rock);}softShadow(world.scene,x,z,7,.4);return g;}
function meadow(world){
 const random=rng(97),g=new THREE.BufferGeometry();
 g.setAttribute('position',new THREE.Float32BufferAttribute([
  -.028,0,0, .028,0,0, 0,.38,0,
  -.018,0,-.022, .018,0,.022, .04,.32,.03,
  -.022,0,.018, .022,0,-.018, -.04,.34,-.02
 ],3));
 g.computeVertexNormals();
 const grass=new THREE.InstancedMesh(g,new THREE.MeshStandardMaterial({color:'#9ca166',side:THREE.DoubleSide,roughness:0.92}),2600),dummy=new THREE.Object3D();
 const clearZones=[[2.2,-5.2,1.65],[-2.2,-4.3,1.45],[-1.2,2.4,1.45],[-5.2,3.2,1.65]];
 for(let i=0;i<2600;i++){
  let x=(random()-.5)*58-2,z=(random()-.5)*34;
  if(x>16.5&&x<25.5&&z>-6.2&&z<7.2){dummy.scale.setScalar(0);dummy.updateMatrix();grass.setMatrixAt(i,dummy.matrix);continue;}
  for(const [cx,cz,cr] of clearZones){
   const d=Math.hypot(x-cx,z-cz);
   if(d<cr){const ang=Math.atan2(z-cz,x-cx);x=cx+Math.cos(ang)*(cr+0.25);z=cz+Math.sin(ang)*(cr+0.25);}
  }
  const gy=world.heightAt?world.heightAt(x,z):0;
  dummy.position.set(x,gy+.004,z);
  dummy.scale.setScalar(.48+random()*1.05);
  dummy.rotation.y=random()*6.28;
  dummy.updateMatrix();
  grass.setMatrixAt(i,dummy.matrix);
  grass.setColorAt(i,new THREE.Color().setHSL(.14+random()*.09,.26,.32+random()*.16));
 }
 world.scene.add(grass);
 const stones=new THREE.InstancedMesh(pebbleGeo,mat('#c4baa2',0.86),240);
 for(let i=0;i<240;i++){
  const sx=(random()-.5)*56-2,sz=(random()-.5)*32;
  const sy=world.heightAt?world.heightAt(sx,sz):0;
  dummy.position.set(sx,sy+.032,sz);
  dummy.scale.set(.06+random()*.18,.03+random()*.10,.07+random()*.21);
  dummy.rotation.set(random(),random(),random());
  dummy.updateMatrix();
  stones.setMatrixAt(i,dummy.matrix);
 }
 stones.castShadow=true;stones.receiveShadow=true;
 world.scene.add(stones);
 // Mediterranean wildflower & lavender tufts (lavanda, romero en flor, manzanilla silvestre)
 const flowerGeo=new THREE.DodecahedronGeometry(0.028,0);
 const flowerMat=new THREE.MeshStandardMaterial({color:'#ffffff',roughness:0.82});
 const flowers=new THREE.InstancedMesh(flowerGeo,flowerMat,320);
 const fPalette=[new THREE.Color('#8a68bd'),new THREE.Color('#7858ad'),new THREE.Color('#f2cd3a'),new THREE.Color('#f5f2e6'),new THREE.Color('#9c7ad2')];
 for(let i=0;i<320;i++){
  let fx=(random()-.5)*52-2,fz=(random()-.5)*30;
  if(fx>16.0&&fx<25.8&&fz>-6.5&&fz<7.5){dummy.scale.setScalar(0);dummy.updateMatrix();flowers.setMatrixAt(i,dummy.matrix);continue;}
  for(const [cx,cz,cr] of clearZones){
   const d=Math.hypot(fx-cx,fz-cz);
   if(d<cr+0.4){const ang=Math.atan2(fz-cz,fx-cx);fx=cx+Math.cos(ang)*(cr+0.55);fz=cz+Math.sin(ang)*(cr+0.55);}
  }
  const fy=world.heightAt?world.heightAt(fx,fz):0;
  dummy.position.set(fx,fy+0.035+random()*0.03,fz);
  dummy.scale.set(0.85+random()*0.65,0.55+random()*0.45,0.85+random()*0.65);
  dummy.rotation.set((random()-0.5)*0.28,random()*6.28,(random()-0.5)*0.28);
  dummy.updateMatrix();
  flowers.setMatrixAt(i,dummy.matrix);
  flowers.setColorAt(i,fPalette[i%fPalette.length]);
 }
 world.scene.add(flowers);
}
// === RECREACIÓN 3D EXACTA DE LA PARCELA REAL (COLLADO DELS LLOPS, NÁQUERA · POLÍGONO 26, PARCELAS 690-691) ===
// Coordenadas reales: 39.65486° N, -0.44318° W. Versión embellecida "El Jardín de las Lagartijas":
// - Caseta de cemento (47 m², 12.32×3.84m, -20.4°) transformada en Pabellón-Taller de Madera Natural con porche y pérgola
// - Camino norte, las 2 entradas reales de piedra y forja (Este y Oeste), acequia del camino y acequia interior con agua
// - Terreno limpio sin escombros, senderos de albero, bancales de piedra seca, alcorques blancos y todos los árboles reales
function parcelaRoadZ(x){return -9.2-0.50*x+0.0018*x*x;}
export const sphereGeo=new THREE.SphereGeometry(1,18,14);
function parcelaHeightAt(x,z){
 // Smooth natural slope of Parcelas 690 & 691 in Partida Collado dels Llops (Náquera)
 const base = -0.020 * (x - 10) - 0.032 * (z + 6);
 const terrace = z > 3.5 ? -0.30 * Math.min(1, (z - 3.5) / 2.2) : 0;
 const micro = 0.04 * Math.sin(x * 0.17) * Math.cos(z * 0.15);
 return base + terrace + micro;
}
function registerCustomGardenWork(world,id,anchor,pivot,centerVec,radius=2.2,isTreeInstallation=true,extraPickRoot=null,opts={}){
 const data=ART.find(a=>a.id===id);if(!data)return null;
 const gy=parcelaHeightAt(centerVec.x,centerVec.z);
 const allViews=(data.views&&data.views.length)?data.views:[{src:data.image,w:1.45,h:1.85,cutout:false,label:'Vista frontal'}];
 const firstCutIdx=Math.max(0,allViews.findIndex(v=>v.cutout!==false));
 const textures=allViews.map(v=>{const t=texLoader.load(v.src,()=>{world.dirty=true;},undefined,()=>{world.assetErrors.push(v.src);});t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;});
 anchor.updateMatrixWorld(true);
 const localCenter=anchor.worldToLocal(centerVec.clone());
 const v0=allViews[firstCutIdx]||allViews[0];
 const bScale=opts.billboardScale??1.0;
 const groundCutout=!!opts.groundCutout;
 const gBillboard=new THREE.Group();
 gBillboard.position.set(localCenter.x,groundCutout?0.02:localCenter.y,localCenter.z);
 gBillboard.scale.setScalar(bScale);
 anchor.add(gBillboard);
 const billBack=new THREE.Mesh(boxGeo,mat('#232620',0.82,0.04));
 billBack.scale.set(v0.w+0.028,v0.h+0.028,0.014);billBack.position.set(0,groundCutout?v0.h/2:0,-0.010);
 billBack.visible=v0.cutout===false;gBillboard.add(billBack);
 const billMat=new THREE.MeshBasicMaterial({map:textures[firstCutIdx]||textures[0],toneMapped:false,transparent:v0.cutout!==false,alphaTest:v0.cutout===false?0:0.15,side:THREE.DoubleSide});
 const billPlane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),billMat);
 billPlane.scale.set(v0.w,v0.h,1);billPlane.position.y=groundCutout?v0.h/2:0;billPlane.castShadow=true;gBillboard.add(billPlane);
 const work={
  ...data,
  displayHeight:(data.height||v0.h)*(opts.displayScale??bScale),
  displayWidth:v0.w*(opts.displayScale??bScale),
  clampFrontAngle:!!opts.clampFrontAngle,
  object:pivot,
  ai3dGroup:pivot,
  billboardGroup:gBillboard,
  plane:billPlane,
  isGardenInstallation:true,
  isTreeInstallation,
  textures,
  viewIndex:0,
  anchor,
  center:centerVec,
  view:V(centerVec.x,parcelaHeightAt(centerVec.x,centerVec.z+2.2)+1.72,centerVec.z+2.2),
  groundY:gy,
  levelTag:'garden',
  awakened:false,
  radius,
  spin:0,
  phase:world.works.length*1.65+0.5,
  baseRotation:0,
  setView:idx=>{
   const n=allViews.length,i=((idx%n)+n)%n;
   work.viewIndex=i;
   const cutIdx=allViews[i].cutout===false?firstCutIdx:i;
   const vc=allViews[cutIdx];
   billPlane.scale.set(vc.w,vc.h,1);billPlane.position.y=groundCutout?vc.h/2:0;
   billBack.scale.set(vc.w+0.028,vc.h+0.028,0.014);billBack.position.y=groundCutout?vc.h/2:0;
   billBack.visible=vc.cutout===false;
   billMat.map=textures[cutIdx];
   billMat.transparent=vc.cutout!==false;
   billMat.alphaTest=vc.cutout===false?0:0.15;
   billMat.needsUpdate=true;
   world.dirty=true;
  },
  applyMode:mode=>{
   pivot.visible=mode==='ai3d';
   if(extraPickRoot)extraPickRoot.visible=opts.keepHostTreeInBillboard?true:(mode==='ai3d');
   gBillboard.visible=mode==='billboard';
   world.dirty=true;
  }
 };
 work.applyMode(sculpturePresentation);
 anchor.traverse(o=>{if(o.isMesh)o.userData.work=work;});
 if(extraPickRoot){
  extraPickRoot.traverse(o=>{if(o.isMesh&&!o.userData.critter)o.userData.work=work;});
  world.pickables.push(extraPickRoot);
 }
 world.works.push(work);
 world.pickables.push(anchor);
 world.mobiles.push(work);
 return work;
}
function taperedBranch(parent,points,rStart,rEnd,color,segs=18,radSegs=12,bluntEnd=false){
 const curveObj=new THREE.CatmullRomCurve3(points.map(p=>V(...p)),false,'centripetal');
 const geo=new THREE.TubeGeometry(curveObj,segs,1,radSegs,false);
 const pos=geo.attributes.position;
 const v=new THREE.Vector3(),c=new THREE.Vector3();
 for(let i=0;i<=segs;i++){
  const t=i/segs;
  const baseR=rStart*(1-t)+rEnd*t;
  const knotWave=1+0.042*Math.sin(t*Math.PI*3.0);
  curveObj.getPointAt(t,c);
  for(let j=0;j<=radSegs;j++){
   const ang=(j/radSegs)*Math.PI*2;
   const flute=1+0.055*Math.sin(ang*5+t*8.5)+0.035*Math.cos(ang*3-t*11.0);
   const r=baseR*knotWave*flute;
   const idx=i*(radSegs+1)+j;
   v.fromBufferAttribute(pos,idx).sub(c).multiplyScalar(r).add(c);
   pos.setXYZ(idx,v.x,v.y,v.z);
  }
 }
 geo.computeVertexNormals();
 const barkMat=mat(color,0.88,0,true);
 const mesh=new THREE.Mesh(geo,barkMat);
 mesh.castShadow=true;mesh.receiveShadow=true;
 parent.add(mesh);
 const tip=points[points.length-1];
 if(bluntEnd){
  const tan=curveObj.getTangentAt(1);
  const collar=new THREE.Mesh(cylinderGeo,barkMat);
  collar.scale.set(rEnd*1.08,rEnd*0.55,rEnd*1.08);
  collar.position.set(...tip);
  collar.quaternion.setFromUnitVectors(V(0,1,0),tan);
  collar.castShadow=true;
  parent.add(collar);
  const cutFace=new THREE.Mesh(cylinderGeo,mat('#7d6b58',0.85));
  cutFace.scale.set(rEnd*0.82,rEnd*0.60,rEnd*0.82);
  cutFace.position.set(...tip);
  cutFace.quaternion.setFromUnitVectors(V(0,1,0),tan);
  parent.add(cutFace);
 }else{
  const cap=new THREE.Mesh(sphereGeo,barkMat);
  cap.scale.setScalar(rEnd*0.80);
  cap.position.set(...tip);
  parent.add(cap);
 }
 return mesh;
}
function addFoliageCluster(parent,center,radius,palette,random,count=18,flatness=0.72){
 const [cx,cy,cz]=center;
 const cluster=new THREE.Group();
 cluster.position.set(cx,cy,cz);
 cluster.userData.swayFoliage={phase:random()*6.28,amp:0.015};
 parent.add(cluster);
 for(let i=0;i<count;i++){
  const a=random()*Math.PI*2,el=(random()-0.35)*Math.PI*0.7;
  const d=radius*(0.15+0.78*Math.pow(random(),0.6));
  const px=Math.cos(a)*Math.cos(el)*d;
  const py=Math.sin(el)*d*flatness+radius*0.12;
  const pz=Math.sin(a)*Math.cos(el)*d;
  const r=radius*(0.30+random()*0.26);
  const col=palette[i%palette.length];
  const puff=new THREE.Mesh(sphereGeo,mat(col,0.82));
  puff.position.set(px,py,pz);
  puff.scale.set(r*(0.95+random()*0.28),r*(flatness+random()*0.16),r*(0.92+random()*0.28));
  puff.rotation.set((random()-0.5)*0.5,random()*Math.PI,(random()-0.5)*0.5);
  puff.castShadow=(i%2===0);
  puff.receiveShadow=false;
  cluster.add(puff);
 }
}
function addLizard(parent,pos,rotY=0,scale=1,worldRef=null,variant=0){
 const g=new THREE.Group();g.position.set(...pos);g.rotation.y=rotY;g.scale.setScalar(scale);
 const palettes=[
  {body:'#568834',stripe:'#d2e268',leg:'#456c28'},
  {body:'#687e38',stripe:'#dce082',leg:'#52642a'},
  {body:'#488c42',stripe:'#b8e468',leg:'#387032'},
  {body:'#7d7442',stripe:'#d8c87a',leg:'#645c34'}
 ];
 const pal=palettes[variant%palettes.length];
 const bodyMat=mat(pal.body,0.52),stripeMat=mat(pal.stripe,0.58),eyeMat=mat('#141810',0.22);
 const bodyGroup=new THREE.Group();g.add(bodyGroup);
 const torso=new THREE.Mesh(new THREE.CapsuleGeometry(0.025,0.098,8,12),bodyMat);torso.rotation.x=Math.PI/2;torso.scale.set(1,1,0.62);torso.position.y=0.018;torso.castShadow=true;bodyGroup.add(torso);
 const stripe=new THREE.Mesh(new THREE.CapsuleGeometry(0.0095,0.094,4,8),stripeMat);stripe.rotation.x=Math.PI/2;stripe.position.set(0,0.028,0);bodyGroup.add(stripe);
 for(const sx of [-1,1]){
  const sideStripe=new THREE.Mesh(new THREE.CapsuleGeometry(0.0052,0.084,4,6),stripeMat);
  sideStripe.rotation.x=Math.PI/2;sideStripe.position.set(sx*0.019,0.021,0);bodyGroup.add(sideStripe);
 }
 const headPivot=new THREE.Group();headPivot.position.set(0,0.022,0.056);bodyGroup.add(headPivot);
 const head=new THREE.Mesh(new THREE.ConeGeometry(0.022,0.052,10),bodyMat);head.rotation.x=Math.PI/2;head.scale.set(1,1,0.66);head.position.set(0,0,0.020);head.castShadow=true;headPivot.add(head);
 const legs=[];
 for(const sx of [-1,1]){
  const eye=new THREE.Mesh(sphereGeo,eyeMat);eye.scale.setScalar(0.0052);eye.position.set(sx*0.013,0.006,0.016);headPivot.add(eye);
  for(const [lz,la,isFront] of [[0.032,0.52,true],[-0.032,-0.52,false]]){
   const legPiv=new THREE.Group();legPiv.position.set(sx*0.016,0.015,lz);
   rod(legPiv,[0,0,0],[sx*0.022,-0.007,la*0.014],0.0048,pal.leg);
   rod(legPiv,[sx*0.022,-0.007,la*0.014],[sx*0.034,-0.014,la*0.028],0.0038,pal.leg);
   bodyGroup.add(legPiv);
   legs.push({piv:legPiv,sx,isFront});
  }
 }
 const tailPivot=new THREE.Group();tailPivot.position.set(0,0.016,-0.048);bodyGroup.add(tailPivot);
 curve(tailPivot,[[0,0,0],[0.012,-0.005,-0.072],[-0.016,-0.010,-0.158],[0.009,-0.013,-0.245]],0.0062,pal.leg);
 const critterInfo={kind:'lizard',name:'Lagartija valenciana (Podarcis liolepis)',mesh:g,excitedUntil:0};
 g.userData.lizardRig={bodyGroup,headPivot,tailPivot,legs,basePos:[...pos],baseRotY:rotY,phase:Math.random()*6.28,critter:critterInfo};
 g.traverse(o=>{if(o.isMesh)o.userData.critter=critterInfo;});
 parent.add(g);
 if(worldRef){
  if(worldRef.lizards)worldRef.lizards.push(g);
  if(worldRef.pickables)worldRef.pickables.push(g);
 }
 return g;
}
function addStoneRing(world,x,z,radius=1.15,count=22,whitewashed=true){
 const gy=parcelaHeightAt(x,z),g=new THREE.Group();g.position.set(x,gy,z);world.scene.add(g);
 const random=rng(Math.round((x+50)*31+(z+50)*17));
 const cols=whitewashed?['#edeae0','#e2ddd0','#f4f1e8','#d8d2c3']:['#c4baa3','#b5aa92','#d2c9b4','#a89d86'];
 for(let i=0;i<count;i++){
  const a=(i/count)*Math.PI*2+(random()-0.5)*0.08;
  const rx=Math.cos(a)*radius,rz=Math.sin(a)*radius;
  const localY=parcelaHeightAt(x+rx,z+rz)-gy;
  const st=new THREE.Mesh(pebbleGeo,mat(cols[i%cols.length],0.88));
  const s=0.13+random()*0.07;
  st.scale.set(s*1.25,s*0.78,s*1.05);
  st.position.set(rx,localY+s*0.32,rz);
  st.rotation.set(random()*0.4,a+Math.PI/2,random()*0.4);
  st.castShadow=true;st.receiveShadow=true;
  g.add(st);
 }
 const mulch=new THREE.Mesh(new THREE.CircleGeometry(radius*0.94,24),mat('#8c7656',0.95));
 mulch.rotation.x=-Math.PI/2;mulch.position.y=0.015;mulch.receiveShadow=true;g.add(mulch);
 return g;
}
function addMediterraneanTree(world,x,z,height=4.8,seed=1,kind='pine',withStoneRing=false,lowBoughTarget=null){
 const gy=parcelaHeightAt(x,z),random=rng(seed),g=new THREE.Group();
 g.position.set(x,gy,z);world.scene.add(g);
 world.colliders.push({x,z,r:kind==='pine'?0.58:0.52});
 const barkCol=kind==='olive'?'#726558':kind==='almond'?'#645447':'#6d5846';
 const rBase=kind==='pine'?0.22:kind==='olive'?0.25:0.19;
 const forkY=height*(kind==='pine'?0.44:kind==='olive'?0.32:0.35);
 const leanX=(random()-0.5)*0.55,leanZ=(random()-0.5)*0.55;
 for(let k=0;k<4;k++){
  const ra=k*Math.PI/2+random()*0.5;
  taperedBranch(g,[[Math.cos(ra)*rBase*1.45,-0.06,Math.sin(ra)*rBase*1.45],[Math.cos(ra)*rBase*0.65,0.22,Math.sin(ra)*rBase*0.65],[0,0.52,0]],rBase*0.48,rBase*0.24,barkCol,6,6);
 }
 taperedBranch(g,[
  [0,-0.08,0],
  [leanX*0.38,forkY*0.36,leanZ*0.38],
  [leanX*0.78,forkY*0.72,leanZ*0.74],
  [leanX,forkY,leanZ]
 ],rBase*1.12,rBase*0.74,barkCol,14,8);
 const palette=kind==='pine'?['#4d7338','#5c8444','#41642e','#6b9450']:
               kind==='olive'?['#728861','#839a71','#637953','#92a97f']:
               ['#618645','#739a55','#537739','#82a962'];
 const nBranches=kind==='pine'?6:5;
 const flatness=kind==='pine'?0.60:0.74;
 for(let b=0;b<nBranches;b++){
  const ang=(b/nBranches)*Math.PI*2+(random()-0.5)*0.45;
  const spread=height*(kind==='pine'?0.36:0.44)*(0.82+random()*0.32);
  const midY=forkY+(height-forkY)*(0.42+random()*0.15);
  const topY=height*(0.80+random()*0.18);
  const mx=leanX+Math.cos(ang)*spread*0.52,mz=leanZ+Math.sin(ang)*spread*0.52;
  const tx=leanX+Math.cos(ang)*spread,tz=leanZ+Math.sin(ang)*spread;
  taperedBranch(g,[
   [leanX,forkY*0.94,leanZ],
   [mx,midY,mz],
   [tx,topY,tz]
  ],rBase*0.56,0.042,barkCol,12,7);
  const subAng=ang+(b%2?0.55:-0.55);
  const sx=mx+Math.cos(subAng)*spread*0.46,sz=mz+Math.sin(subAng)*spread*0.46,sy=midY+(topY-midY)*0.58;
  taperedBranch(g,[[mx,midY,mz],[(mx+sx)*0.5,(midY+sy)*0.5+0.12,(mz+sz)*0.5],[sx,sy,sz]],rBase*0.32,0.026,barkCol,8,6);
  addFoliageCluster(g,[tx,topY+0.12,tz],height*(kind==='pine'?0.24:0.26),palette,random,12,flatness);
  addFoliageCluster(g,[sx,sy+0.10,sz],height*0.19,palette,random,8,flatness);
 }
 addFoliageCluster(g,[leanX,height*0.94,leanZ],height*0.26,palette,random,14,flatness);
 if(lowBoughTarget){
  const lx=lowBoughTarget[0]-x,ly=lowBoughTarget[1]-gy,lz=lowBoughTarget[2]-z;
  const dist=Math.hypot(lx,lz)||1;
  const ux=lx/dist,uz=lz/dist;
  const startY=Math.min(forkY*0.92,ly+0.15);
  taperedBranch(g,[
   [leanX*0.6,startY,leanZ*0.6],
   [lx*0.55,ly+0.16,lz*0.55],
   [lx,ly+0.02,lz],
   [lx+ux*0.48,ly+0.12,lz+uz*0.48]
  ],rBase*0.46,0.032,barkCol,12,7);
  addFoliageCluster(g,[lx+ux*0.52,ly+0.28,lz+uz*0.52],0.58,palette,random,8,0.72);
 }
 if(withStoneRing)addStoneRing(world,x,z,0.98,18,true);
 softShadow(world.scene,x,z,height*0.88,0.22,gy);
 return g;
}
function addAlgarrobo(world,x,z){
 const gy=parcelaHeightAt(x,z),g=new THREE.Group();
 g.position.set(x,gy,z);world.scene.add(g);
 world.colliders.push({x,z,r:1.08});
 const random=rng(108);
 const bark='#5a4738',darkBark='#4a3a2c';
 taperedBranch(g,[[0,-0.12,0],[-0.05,0.45,0.04],[-0.02,0.92,0.02],[0,1.25,0]],0.56,0.44,darkBark,12,10);
 for(let r=0;r<6;r++){
  const a=r*Math.PI/3+0.2;
  taperedBranch(g,[
   [Math.cos(a)*0.56,-0.08,Math.sin(a)*0.56],
   [Math.cos(a)*0.36,0.52,Math.sin(a)*0.36],
   [Math.cos(a)*0.22,1.12,Math.sin(a)*0.22]
  ],0.22,0.12,bark,10,7);
 }
 const boughs=[
  [[0,1.08,0],[-0.75,1.68,0.18],[-1.45,2.06,0.35],[-2.35,2.42,0.52],[-3.05,2.85,0.62]],
  [[0,1.12,0],[0.08,1.72,0.62],[0.15,2.10,1.18],[0.24,2.48,1.95],[0.32,2.88,2.55]],
  [[0,1.10,0],[0.82,1.68,0.32],[1.55,2.06,0.65],[2.38,2.45,0.92],[3.02,2.88,1.12]],
  [[0,1.18,0],[-0.72,1.88,-0.68],[-1.58,2.48,-1.42],[-2.42,3.02,-2.12]],
  [[0,1.20,0],[0.68,1.92,-0.72],[1.52,2.55,-1.48],[2.28,3.08,-2.15]],
  [[0,1.24,0],[-0.12,2.18,-0.15],[-0.22,3.15,-0.25],[-0.28,3.95,-0.32]]
 ];
 const palette=['#3f632c','#4d7536','#355624','#5b8442','#68914d'];
 const podMat=mat('#382315',0.72);
 boughs.forEach((pts)=>{
  taperedBranch(g,pts,0.28,0.068,bark,18,8);
  const mid=pts[2],tip=pts[pts.length-1];
  taperedBranch(g,[mid,[mid[0]*1.12,mid[1]+0.65,mid[2]*1.12],[tip[0]*0.92,tip[1]+0.95,tip[2]*0.92]],0.13,0.038,bark,10,6);
  addFoliageCluster(g,[tip[0],tip[1]+0.42,tip[2]],1.35,palette,random,22,0.68);
  addFoliageCluster(g,[mid[0]*1.1,mid[1]+1.05,mid[2]*1.1],1.25,palette,random,18,0.68);
  // Algarrobas colgantes (hanging dark-brown carob pods under the boughs)
  for(let k=0;k<4;k++){
   const px=mid[0]+(tip[0]-mid[0])*(0.25+k*0.2)+(random()-0.5)*0.32;
   const py=mid[1]+(tip[1]-mid[1])*(0.25+k*0.2)-0.12;
   const pz=mid[2]+(tip[2]-mid[2])*(0.25+k*0.2)+(random()-0.5)*0.32;
   const pod=new THREE.Mesh(cylinderGeo,podMat);
   pod.scale.set(0.016,0.16,0.008);
   pod.position.set(px,py,pz);
   pod.rotation.set((random()-0.5)*0.35,random()*3.14,(random()-0.5)*0.35);
   g.add(pod);
  }
 });
 // Algarrobas caídas sobre el alcorque de tierra
 for(let f=0;f<14;f++){
  const fa=random()*Math.PI*2,fr=0.45+random()*0.95;
  const fPod=new THREE.Mesh(boxGeo,podMat);
  fPod.scale.set(0.14,0.012,0.022);
  fPod.position.set(Math.cos(fa)*fr,0.012,Math.sin(fa)*fr);
  fPod.rotation.y=random()*Math.PI;
  g.add(fPod);
 }
 addFoliageCluster(g,[0,4.15,0],1.85,palette,random,32,0.65);
 addStoneRing(world,x,z,1.55,26,false);
 addLizard(g,[0.48,0.28,0.25],0.4,1.25,world);
 softShadow(world.scene,x,z,8.2,0.34,gy);
 return g;
}
function addTallCompanionPine(world,x,z){
 const gy=parcelaHeightAt(x,z),g=new THREE.Group();
 g.position.set(x,gy,z);world.scene.add(g);
 world.colliders.push({x,z,r:0.65});
 const random=rng(284);
 const bark='#6b5544';
 taperedBranch(g,[[0,-0.08,0],[-0.08,1.2,0.04],[-0.16,2.35,0.08],[-0.22,3.4,0.12]],0.28,0.20,bark,16,8);
 taperedBranch(g,[[-0.14,2.22,0.08],[-0.62,2.26,0.48],[-1.05,2.24,0.85],[-1.52,2.32,1.18]],0.11,0.032,bark,12,7);
 taperedBranch(g,[[-0.14,2.38,0.08],[0.45,2.42,0.22],[1.05,2.40,0.35],[1.48,2.48,0.45]],0.10,0.028,bark,12,7);
 const upper=[
  [[-0.22,3.4,0.12],[-0.95,4.8,0.55],[-1.65,6.1,0.92]],
  [[-0.22,3.4,0.12],[0.55,4.9,-0.35],[1.15,6.3,-0.75]],
  [[-0.22,3.4,0.12],[-0.15,5.1,-0.65],[-0.25,6.5,-1.25]],
  [[-0.95,4.8,0.55],[-0.35,5.7,1.25]],
  [[0.55,4.9,-0.35],[1.28,5.8,0.45]]
 ];
 const pinePalette=['#4d7338','#5c8444','#41642e','#6b9450'];
 upper.forEach(pts=>{
  taperedBranch(g,pts,0.16,0.042,bark,12,7);
  const tip=pts[pts.length-1];
  addFoliageCluster(g,[tip[0],tip[1]+0.25,tip[2]],1.35,pinePalette,random,18,0.58);
 });
 addFoliageCluster(g,[-0.2,6.7,0],1.55,pinePalette,random,22,0.56);
 const mov22Anchor=new THREE.Group();
 mov22Anchor.position.set(x-1.05,gy+2.48,z+0.85);
 world.scene.add(mov22Anchor);
 const mov22Pivot=new THREE.Group();mov22Anchor.add(mov22Pivot);
 const gMob22=buildTrue3DMobileGeometry('mov022');
 if(gMob22){gMob22.scale.setScalar(0.86);mov22Pivot.add(gMob22);}
 const w22=registerCustomGardenWork(world,'mov022',mov22Anchor,mov22Pivot,V(x-1.05,gy+1.56,z+0.85),2.55,false,null,{billboardScale:0.86,displayScale:0.86});
 if(w22)w22.view=V(x-1.15,parcelaHeightAt(x-1.15,z+3.05)+1.68,z+3.05);
 softShadow(world.scene,x,z,4.8,0.26,gy);
 return g;
}
const perfStripGeoCache=new Map();
function buildPerforatedStrip3D(col,len,twist=0){
 const g=new THREE.Group();
 const key=`${len.toFixed(3)}_${twist.toFixed(3)}`;
 let geo=perfStripGeoCache.get(key);
 if(!geo){
  const w=0.088,hw=w/2,hl=len/2,cr=0.008;
  const shape=new THREE.Shape();
  shape.moveTo(-hw+cr,-hl);
  shape.lineTo(hw-cr,-hl);
  shape.quadraticCurveTo(hw,-hl,hw,-hl+cr);
  shape.lineTo(hw,hl-cr);
  shape.quadraticCurveTo(hw,hl,hw-cr,hl);
  shape.lineTo(-hw+cr,hl);
  shape.quadraticCurveTo(-hw,hl,-hw,hl-cr);
  shape.lineTo(-hw,-hl+cr);
  shape.quadraticCurveTo(-hw,-hl,-hw+cr,-hl);
  // Punch 3 columns x 12 rows of true 3D open circular perforations matching assets/mov-017.webp
  const rows=Math.max(10,Math.round(len/0.039));
  const stepY=(len-0.044)/(rows-1);
  const cols=[-w*0.285,0,w*0.285];
  for(let r=0;r<rows;r++){
   const cy=-hl+0.022+r*stepY;
   for(let ci=0;ci<3;ci++){
    const cx=cols[ci];
    const rad=ci===1?w*0.098:w*0.132;
    const hole=new THREE.Path();
    hole.absarc(cx,cy,rad,0,Math.PI*2,true);
    shape.holes.push(hole);
   }
  }
  geo=new THREE.ExtrudeGeometry(shape,{
   depth:0.0075,
   bevelEnabled:true,
   bevelThickness:0.0014,
   bevelSize:0.0010,
   bevelSegments:2,
   curveSegments:14
  });
  geo.translate(0,0,-0.00375);
  if(twist){
   const pos=geo.attributes.position;
   for(let i=0;i<pos.count;i++){
    const vy=pos.getY(i),vx=pos.getX(i),vz=pos.getZ(i);
    const t=(0.5-vy/len);
    const ang=twist*t;
    const ca=Math.cos(ang),sa=Math.sin(ang);
    pos.setX(i,vx*ca-vz*sa);
    pos.setZ(i,vx*sa+vz*ca+Math.sin(t*Math.PI)*twist*0.014);
   }
  }
  geo.computeVertexNormals();
  perfStripGeoCache.set(key,geo);
 }
 const stripMat=new THREE.MeshStandardMaterial({
  color:col,
  roughness:0.34,
  metalness:0.06
 });
 const mesh=new THREE.Mesh(geo,stripMat);
 mesh.castShadow=true;
 mesh.receiveShadow=true;
 g.add(mesh);
 return g;
}
const rockFacetedGeo=new THREE.DodecahedronGeometry(1,0);
function addAlmendroV(world,x,z){
 const gy=parcelaHeightAt(x,z),g=new THREE.Group();
 g.position.set(x,gy,z);world.scene.add(g);
 world.colliders.push({x,z,r:0.65});
 const bark='#6c5d50',upperBark='#78685a',twigBark='#847364';
 const barkMat=mat(bark,0.88,0,true);
 // Root flares gripping the limestone rock mound
 for(let r=0;r<5;r++){
  const ra=(r/5)*Math.PI*2+0.35;
  taperedBranch(g,[
   [Math.cos(ra)*0.25,0.02,Math.sin(ra)*0.25],
   [Math.cos(ra)*0.13,0.20,Math.sin(ra)*0.13],
   [-0.02,0.42,0]
  ],0.082,0.048,bark,8,10,false);
 }
 // Gnarled main almond trunk rising with the authentic S-curve of assets/mov-017.webp to the V-crotch at y=0.88
 taperedBranch(g,[
  [0,-0.05,0],
  [-0.04,0.26,0.01],
  [-0.03,0.58,0.01],
  [0.0,0.88,0]
 ],0.155,0.118,bark,20,14,false);
 // Left V-bough rising up-left with gnarled pruning burl & blunt pruned terminal stubs (matching mov-017.webp)
 taperedBranch(g,[
  [-0.01,0.84,0],
  [-0.18,1.18,0.01],
  [-0.35,1.48,0.02],
  [-0.58,1.68,0.03],
  [-0.78,1.76,0.04]
 ],0.102,0.044,bark,20,12,true);
 // Knobby pruning burl (nudo de poda) on the upper-inner side of the left bough at (-0.28, 1.48)
 taperedBranch(g,[[-0.33,1.43,0.02],[-0.25,1.52,0.03],[-0.21,1.55,0.02]],0.054,0.032,upperBark,8,10,true);
 taperedBranch(g,[[-0.27,1.49,0.03],[-0.28,1.57,0.04]],0.032,0.022,upperBark,6,8,true);
 // Crooked pruned terminal stubs at the outer end of the left V-bough
 taperedBranch(g,[[-0.58,1.68,0.03],[-0.55,1.81,0.01],[-0.52,1.88,-0.01]],0.038,0.024,twigBark,8,9,true);
 taperedBranch(g,[[-0.68,1.72,0.03],[-0.65,1.85,0.04]],0.034,0.022,twigBark,7,8,true);
 taperedBranch(g,[[-0.75,1.75,0.04],[-0.85,1.77,0.06]],0.034,0.022,twigBark,6,8,true);
 // Right V-bough rising up-right and bifurcating into the contorted S-branch + outer horizontal branch
 taperedBranch(g,[
  [0.01,0.84,0],
  [0.09,1.10,-0.01],
  [0.16,1.35,-0.01]
 ],0.108,0.088,bark,14,12,false);
 // Upper-Inner Contorted S-Branch (arches slightly left then sweeps up-right to the gnarled crown)
 taperedBranch(g,[
  [0.14,1.32,-0.01],
  [0.01,1.54,0.01],
  [0.05,1.68,0.0],
  [0.24,1.82,-0.01],
  [0.46,1.98,-0.02],
  [0.55,2.10,-0.02]
 ],0.074,0.042,upperBark,20,11,true);
 // Short spur on the inner S-branch from which the cobalt-blue strip hangs
 taperedBranch(g,[[0.16,1.76,0.0],[0.17,1.81,0.09]],0.032,0.020,twigBark,6,8,true);
 // Outer-Right Arching Branch (from which the lower pink, yellow, and far-right pink strips hang)
 taperedBranch(g,[
  [0.15,1.32,-0.02],
  [0.27,1.54,-0.03],
  [0.44,1.78,-0.02],
  [0.64,1.89,0.01],
  [0.82,1.92,0.03]
 ],0.074,0.036,bark,18,11,true);
 taperedBranch(g,[[0.78,1.91,0.04],[0.94,1.94,0.03]],0.030,0.020,twigBark,6,8,true);
 taperedBranch(g,[[0.82,1.92,0.04],[0.86,2.06,0.02]],0.026,0.016,twigBark,6,8,true);
 // Gnarled Multi-Twig Crown at the top of the right branch (y = 2.06..2.58, matching mov-017.webp)
 const crownTwigs=[
  [[0.52,2.06,-0.02],[0.46,2.26,-0.01],[0.41,2.46,0.0],[0.35,2.58,0.01],0.036,0.016],
  [[0.54,2.06,-0.02],[0.59,2.25,-0.03],[0.50,2.44,-0.01],[0.44,2.52,0.0],0.032,0.016],
  [[0.46,2.25,-0.01],[0.38,2.30,0.01],[0.29,2.35,0.02],0.024,0.014],
  [[0.48,2.14,-0.01],[0.39,2.18,0.0],[0.33,2.23,0.01],0.022,0.014],
  [[0.54,2.05,-0.02],[0.70,2.01,0.0],[0.84,2.05,0.02],0.034,0.018],
  [[0.68,2.01,0.0],[0.64,2.14,0.01],0.022,0.014],
  [[0.58,2.22,-0.02],[0.66,2.34,-0.01],0.020,0.013]
 ];
 for(const ct of crownTwigs){
  const r1=ct[ct.length-2],r2=ct[ct.length-1],pts=ct.slice(0,-2);
  taperedBranch(g,pts,r1,r2,twigBark,8,8,true);
 }
 // Knobby bark burls & almond blossom buds (yemas) along the upper crown and branches
 const budMat=mat('#6e6256',0.88);
 const random=rng(77);
 for(const [bx,by,bz,br] of [
  [0.0,0.86,0.04,0.068],[-0.26,1.50,0.03,0.048],[0.15,1.34,0.02,0.056],
  [0.02,1.55,0.02,0.044],[0.45,1.78,0.03,0.042],[-0.58,1.69,0.04,0.042]
 ]){
  const burl=new THREE.Mesh(sphereGeo,barkMat);
  burl.scale.set(br*1.25,br*0.95,br*1.1);
  burl.position.set(bx,by,bz);
  g.add(burl);
 }
 // 16 small crusty almond buds directly along the upper right crown twigs
 const budNodes=[
  [0.49,2.16,-0.01],[0.44,2.34,0.0],[0.38,2.50,0.01],[0.57,2.18,-0.02],
  [0.54,2.35,-0.02],[0.46,2.48,0.0],[0.38,2.30,0.01],[0.29,2.35,0.02],
  [0.33,2.23,0.01],[0.64,2.02,0.0],[0.78,2.04,0.01],[0.65,2.12,0.01],
  [0.62,2.28,-0.01],[0.84,2.05,0.02],[-0.53,1.84,0.0],[-0.66,1.82,0.03]
 ];
 for(let b=0;b<budNodes.length;b++){
  const [bx,by,bz]=budNodes[b];
  const bud=new THREE.Mesh(rockFacetedGeo,b%3===0?mat('#a6ac9a',0.9):budMat);
  bud.scale.setScalar(0.014+(b%3)*0.003);
  bud.position.set(bx,by,bz);
  g.add(bud);
 }
 // White-grey Mediterranean crustose lichen patches flush on the trunk & V-crotch (exact match to mov-017.webp)
 const lichenMat=mat('#c8ccb8',0.92);
 for(const [lx,ly,lz,ls] of [
  [-0.06,0.52,0.09,0.036],[0.01,0.84,0.10,0.042],[0.04,0.92,0.08,0.036],
  [-0.03,0.78,0.10,0.034],[-0.23,1.28,0.06,0.032],[-0.32,1.45,0.06,0.034]
 ]){
  const lc=new THREE.Mesh(rockFacetedGeo,lichenMat);
  lc.scale.set(ls*1.15,ls*1.45,ls*0.35);
  lc.position.set(lx,ly,lz);
  g.add(lc);
 }
 // Stacked angular limestone & pinkish-terracotta rodeno stone cairn (rocalla) at the trunk base (attached to mov17Anchor so it stays grounded in both 3D & cutout modes)
 const mov17Anchor=new THREE.Group();mov17Anchor.position.set(x,gy,z);world.scene.add(mov17Anchor);
 g.scale.setScalar(1.18);
 const stoneCols=['#dcd4c6','#cfa292','#c4baa8','#e6dfd2','#988e82','#d4a898','#b8ada0','#68625c'];
 for(let i=0;i<68;i++){
  const a=(i*2.39996)+(random()-0.5)*0.25;
  const tRad=Math.pow(i/68,0.62);
  const rad=0.09+tRad*0.58;
  const hLayer=Math.max(0.03,(0.64-rad)*0.56)+(random()-0.3)*0.05;
  const useFaceted=(i%3!==0);
  const st=new THREE.Mesh(useFaceted?rockFacetedGeo:pebbleGeo,mat(stoneCols[i%stoneCols.length],0.88));
  const s=0.082+random()*0.072;
  st.scale.set(s*(1.22+random()*0.35),s*(0.68+random()*0.25),s*(0.95+random()*0.30));
  st.position.set(Math.cos(a)*rad,hLayer,Math.sin(a)*rad);
  st.rotation.set(random()*3.14,random()*3.14,random()*3.14);
  st.castShadow=true;st.receiveShadow=true;
  mov17Anchor.add(st);
 }
 // 7 true-3D extruded perforated colored lattice strips matching assets/mov-017.webp in the clear foreground
 const mov17Pivot=new THREE.Group();mov17Pivot.scale.setScalar(1.18);mov17Anchor.add(mov17Pivot);
 const strips=[
  {pos:[-0.78,1.75,0.06],cord:0.15,len:0.44,col:'#f5c818',rotY:0.08,rotZ:0.14,twist:0.08},
  {pos:[-0.51,1.63,0.07],cord:0.13,len:0.42,col:'#e84a82',rotY:-0.06,rotZ:0.03,twist:-0.06},
  {pos:[-0.02,1.55,0.09],cord:0.11,len:0.46,col:'#1cb468',rotY:0.05,rotZ:0.02,twist:0.06},
  {pos:[0.17,1.80,0.10],cord:0.11,len:0.45,col:'#2678dc',rotY:-0.06,rotZ:0.02,twist:0.08},
  {pos:[0.33,1.62,0.06],cord:0.21,len:0.42,col:'#e84a82',rotY:0.10,rotZ:-0.05,twist:-0.08},
  {pos:[0.54,1.84,0.06],cord:0.15,len:0.48,col:'#f5c818',rotY:-0.06,rotZ:0.10,twist:0.08},
  {pos:[0.80,1.91,0.06],cord:0.08,len:0.56,col:'#e84a82',rotY:0.08,rotZ:0.06,twist:0.14}
 ];
 const cordCol='#d87828';
 const knotMat=mat(cordCol,0.58);
 strips.forEach((s,idx)=>{
  const loop=new THREE.Mesh(new THREE.TorusGeometry(0.022,0.0042,8,16),knotMat);
  loop.position.set(...s.pos);
  loop.rotation.y=idx*0.6;
  mov17Pivot.add(loop);
  const sp=new THREE.Group();
  sp.position.set(...s.pos);
  sp.rotation.y=s.rotY;
  sp.userData.kineticSway={baseRotY:s.rotY,baseRotZ:s.rotZ||0,spinSpeed:0.75+idx*0.09,phase:idx*1.35,amp:0.18,swayZ:0.035,swayX:0.025};
  const tiltGroup=new THREE.Group();
  tiltGroup.rotation.z=s.rotZ||0;
  sp.add(tiltGroup);
  rod(tiltGroup,[0,0,0],[0,-s.cord,0],0.0032,cordCol);
  const topRing=new THREE.Mesh(new THREE.TorusGeometry(0.011,0.0032,6,12),knotMat);
  topRing.position.set(0,-s.cord,0);
  tiltGroup.add(topRing);
  const stripMesh=buildPerforatedStrip3D(s.col,s.len,s.twist);
  stripMesh.position.set(0,-s.cord-s.len/2+0.010,0);
  tiltGroup.add(stripMesh);
  mov17Pivot.add(sp);
 });
 addLizard(mov17Anchor,[0.42,0.18,0.36],-0.8,1.38,world,0);
 softShadow(world.scene,x,z,3.6,0.24,gy);
 const w17=registerCustomGardenWork(world,'mov017',mov17Anchor,mov17Pivot,V(x+0.02,gy+1.48,z+0.06),3.05,true,g,{billboardScale:1.10,displayScale:1.18});
 if(w17)w17.view=V(x-0.32,parcelaHeightAt(x-0.32,z+3.10)+1.72,z+3.10);
 return g;
}
function addBlueBottleTree(world,x,z){
 const gy=parcelaHeightAt(x,z),g=new THREE.Group();
 g.position.set(x,gy,z);g.scale.setScalar(1.14);world.scene.add(g);
 world.colliders.push({x,z,r:0.82});
 const random=rng(604);
 const bark='#786c5c';
 taperedBranch(g,[[0,-0.06,0],[0.02,0.24,0],[0,0.48,0]],0.20,0.16,bark,14,10,true);
 const branches=[
  [[0,0.38,0],[-0.28,0.78,0.22],[-0.72,1.38,0.48],[-1.12,1.86,0.68]],
  [[0,0.40,0],[-0.18,0.82,-0.25],[-0.58,1.48,-0.62],[-0.92,1.98,-0.88]],
  [[0,0.42,0],[0.22,0.78,0.26],[0.64,1.42,0.62],[1.02,1.92,0.88]],
  [[0,0.40,0],[0.26,0.80,-0.20],[0.74,1.46,-0.52],[1.14,1.96,-0.76]],
  [[0,0.45,0],[0.05,0.95,0.04],[0.12,1.58,0.10],[0.18,2.14,0.14]],
  [[-0.28,0.78,0.22],[-0.64,1.22,-0.12],[-0.98,1.64,-0.32]],
  [[0.22,0.78,0.26],[0.62,1.24,-0.08],[0.96,1.68,-0.26]],
  [[-0.58,1.48,-0.62],[-0.32,1.84,-0.95]],
  [[0.64,1.42,0.62],[0.38,1.82,0.92]]
 ];
 const bottlePoints=[];
 const sprigCols=['#728861','#839a71','#637953'];
 for(const pts of branches){
  taperedBranch(g,pts,0.088,0.026,bark,14,8,true);
  for(let k=1;k<pts.length;k++)bottlePoints.push(pts[k]);
  const tip=pts[pts.length-1];
  for(let s=0;s<4;s++){
   const leaf=new THREE.Mesh(sphereGeo,mat(sprigCols[s%3],0.82));
   leaf.scale.set(0.085,0.036,0.042);
   leaf.position.set(tip[0]+(random()-0.5)*0.14,tip[1]+0.04+(random()-0.5)*0.08,tip[2]+(random()-0.5)*0.14);
   leaf.rotation.set(random(),random(),random());
   g.add(leaf);
  }
 }
 addStoneRing(world,x,z,1.04,18,false);
 const mov33Anchor=new THREE.Group();mov33Anchor.position.set(x,gy,z);world.scene.add(mov33Anchor);
 const mov33Pivot=new THREE.Group();mov33Anchor.add(mov33Pivot);
 const centralMob=buildTrue3DMobileGeometry('mov033');
 if(centralMob){
  centralMob.position.set(0.04,2.32,0.28);
  centralMob.scale.setScalar(0.82);
  mov33Pivot.add(centralMob);
 }
 softShadow(world.scene,x,z,3.5,0.22,gy);
 const w33=registerCustomGardenWork(world,'mov033',mov33Anchor,mov33Pivot,V(x+0.04,gy+1.40,z+0.34),2.55,true,g,{billboardScale:0.82,displayScale:0.82,keepHostTreeInBillboard:true});
 if(w33)w33.view=V(x+0.04,parcelaHeightAt(x+0.04,z+2.85)+1.56,z+2.85);
 return g;
}
function addGeometricFoamTree(world,x,z){
 const gy=parcelaHeightAt(x,z),g=new THREE.Group();
 g.position.set(x,gy,z);g.scale.setScalar(1.16);world.scene.add(g);
 world.colliders.push({x,z,r:0.74});
 const bark='#5e5042';
 taperedBranch(g,[[0,-0.05,0],[0.03,0.48,0.02],[-0.01,0.96,0]],0.15,0.11,bark,14,10,true);
 const arms=[
  [[-0.01,0.88,0],[-0.46,1.18,0.20],[-0.98,1.52,0.36]],
  [[-0.01,0.92,0],[-0.38,1.32,-0.26],[-0.84,1.68,-0.48]],
  [[-0.01,0.94,0],[0.44,1.26,0.24],[0.94,1.58,0.42]],
  [[-0.01,0.96,0],[0.40,1.34,-0.24],[0.88,1.72,-0.44]],
  [[-0.01,0.96,0],[-0.14,1.46,0.06],[-0.28,1.86,0.10]],
  [[-0.46,1.18,0.20],[-0.72,1.56,-0.05]],
  [[0.44,1.26,0.24],[0.68,1.62,-0.04]]
 ];
 arms.forEach(pts=>taperedBranch(g,pts,0.08,0.026,bark,14,8,true));
 const tileCols=['#c87d55','#d8cfb8','#c27048','#d2c7ae','#b86842','#cfc4ab'];
 for(let i=0;i<14;i++){
  const a=(i/14)*Math.PI*2;
  const r=0.28+(i%2)*0.11;
  const tile=new THREE.Mesh(boxGeo,mat(tileCols[i%tileCols.length],0.85));
  tile.scale.set(0.17,0.032,0.25);
  tile.position.set(Math.cos(a)*r,0.03,Math.sin(a)*r);
  tile.rotation.set(0.22,a,0.08);
  tile.castShadow=true;tile.receiveShadow=true;
  g.add(tile);
 }
 const mov32Anchor=new THREE.Group();mov32Anchor.position.set(x,gy,z);world.scene.add(mov32Anchor);
 const mov32Pivot=new THREE.Group();mov32Anchor.add(mov32Pivot);
 const mob32=buildTrue3DMobileGeometry('mov032');
 if(mob32){
  mob32.position.set(0.02,2.18,0.22);
  mob32.scale.setScalar(0.84);
  mov32Pivot.add(mob32);
 }
 softShadow(world.scene,x,z,3.1,0.22,gy);
 const w32=registerCustomGardenWork(world,'mov032',mov32Anchor,mov32Pivot,V(x+0.02,gy+1.36,z+0.28),2.48,true,g,{billboardScale:0.84,displayScale:0.84,keepHostTreeInBillboard:true});
 if(w32){
  w32.view=V(x+0.02,parcelaHeightAt(x+0.02,z+2.75)+1.52,z+2.75);
  gltfLoader.load('assets/hy3d-mov-032.glb?v=25',gltf=>{
   if(world.disposed){disposeDetachedTree(gltf.scene);return;}
   const swayGrp=new THREE.Group();
   swayGrp.position.set(0.02,2.18,0.22);
   swayGrp.scale.setScalar(0.84);
   swayGrp.userData.kineticSway={baseRotY:0.12,spinSpeed:0.68,phase:0.7,amp:0.26,swayZ:0.045,swayX:0.038};
   gltf.scene.traverse(o=>{
    if(o.isMesh){
     o.castShadow=true;o.receiveShadow=true;o.userData.work=w32;
     if(o.material){o.material.side=THREE.DoubleSide;o.material.envMapIntensity=1.15;}
    }
   });
   swayGrp.add(gltf.scene);
   if(mob32)mob32.visible=false;
   mov32Pivot.add(swayGrp);
   world.dirty=true;
  },undefined,()=>{world.assetErrors.push('assets/hy3d-mov-032.glb');});
 }
 return g;
}
function addChumbera(world,x,z,scale=1,seed=1){
 const gy=parcelaHeightAt(x,z),random=rng(seed),g=new THREE.Group();
 g.position.set(x,gy,z);g.scale.setScalar(scale);world.scene.add(g);
 world.colliders.push({x,z,r:0.65*scale});
 const padMat=mat('#587a45',0.82),fruitMat=mat('#d95b26',0.65);
 const pads=[
  [0,0.24,0,0,0,0.22,0.32],
  [-0.20,0.56,0.04,0.1,0.35,0.19,0.28],
  [0.22,0.54,-0.03,-0.1,-0.32,0.20,0.28],
  [-0.36,0.88,0.08,0.15,0.52,0.17,0.25],
  [-0.04,0.86,0.06,0.05,0.08,0.18,0.26],
  [0.34,0.86,-0.06,-0.12,-0.45,0.17,0.25]
 ];
 for(const [px,py,pz,rx,rz,w,h] of pads){
  const p=new THREE.Mesh(sphereGeo,padMat);
  p.scale.set(w,h,0.055);p.position.set(px,py,pz);p.rotation.set(rx,(random()-0.5)*0.4,rz);
  p.castShadow=true;p.receiveShadow=true;g.add(p);
  if(py>0.7){
   const f=new THREE.Mesh(sphereGeo,fruitMat);
   f.scale.set(0.035,0.048,0.035);f.position.set(px,py+h*0.85,pz);g.add(f);
  }
 }
 softShadow(world.scene,x,z,1.8*scale,0.2,gy);
}
function addAgave(world,x,z,scale=1,withStalk=false){
 const gy=parcelaHeightAt(x,z),g=new THREE.Group();
 g.position.set(x,gy,z);g.scale.setScalar(scale);world.scene.add(g);
 world.colliders.push({x,z,r:0.55*scale});
 const leafMat=mat('#527463',0.75);
 for(let i=0;i<14;i++){
  const a=(i/14)*Math.PI*2,tier=i%2;
  const len=0.72-tier*0.14,pitch=0.45+tier*0.28;
  const leaf=new THREE.Mesh(new THREE.ConeGeometry(0.09,len,5),leafMat);
  leaf.scale.set(1,1,0.28);
  leaf.position.set(Math.cos(a)*len*0.38,Math.sin(pitch)*len*0.45,Math.sin(a)*len*0.38);
  leaf.rotation.order='YXZ';
  leaf.rotation.y=-a+Math.PI/2;
  leaf.rotation.x=Math.PI/2-pitch;
  leaf.castShadow=true;leaf.receiveShadow=true;g.add(leaf);
 }
 if(withStalk){
  rod(g,[0,0.2,0],[0,2.8,0],0.045,'#6b634b',0.02);
  for(let k=0;k<5;k++){
   const sy=1.6+k*0.26,sa=k*1.3;
   rod(g,[0,sy,0],[Math.cos(sa)*0.28,sy+0.08,Math.sin(sa)*0.28],0.015,'#6b634b');
   const pan=new THREE.Mesh(sphereGeo,mat('#d6c656',0.8));
   pan.scale.set(0.14,0.06,0.14);pan.position.set(Math.cos(sa)*0.3,sy+0.11,Math.sin(sa)*0.3);
   g.add(pan);
  }
 }
 softShadow(world.scene,x,z,1.7*scale,0.2,gy);
}
function addYuccaTree(world,x,z,height=2.4,seed=1){
 const gy=parcelaHeightAt(x,z),random=rng(seed),g=new THREE.Group();
 g.position.set(x,gy,z);world.scene.add(g);
 world.colliders.push({x,z,r:0.45});
 const stems=[[0,height,0],[-0.28,height*0.76,0.18],[0.26,height*0.82,-0.15]];
 for(const [sx,sh,sz] of stems){
  taperedBranch(g,[[0,0,0],[sx*0.5,sh*0.5,sz*0.5],[sx,sh,sz]],0.10,0.065,'#7c6e58',8,6);
  for(let i=0;i<18;i++){
   const a=(i/18)*Math.PI*2+random()*0.2,p=(i%3)*0.35-0.15;
   const l=new THREE.Mesh(new THREE.ConeGeometry(0.032,0.52,4),mat('#48683a',0.78));
   l.scale.set(1,1,0.25);
   l.position.set(sx+Math.cos(a)*0.18,sh+p*0.18,sz+Math.sin(a)*0.18);
   l.rotation.order='YXZ';l.rotation.y=-a+Math.PI/2;l.rotation.x=Math.PI/2-p;
   l.castShadow=true;g.add(l);
  }
  const fl=new THREE.Mesh(new THREE.ConeGeometry(0.14,0.45,8),mat('#f2efe2',0.75));
  fl.position.set(sx,sh+0.34,sz);fl.castShadow=true;g.add(fl);
 }
 softShadow(world.scene,x,z,1.8,0.22,gy);
}
function addRedReedInstallation(world,x,z){
 const gy=parcelaHeightAt(x,z),g=new THREE.Group();
 g.position.set(x,gy,z);world.scene.add(g);
 const random=rng(968);
 const bases=[
  [-1.35,-0.35,0.42,'pipes'],
  [-0.35,0.15,0.54,'reeds'],
  [0.65,-0.25,0.50,'reeds'],
  [1.55,0.28,0.48,'reeds']
 ];
 for(const [bx,bz,bh,kind] of bases){
  const localY=parcelaHeightAt(x+bx,z+bz)-gy;
  box(g,[0.52,0.08,0.52],[bx,localY+0.04,bz],'#c8c2b4');
  const ped=new THREE.Mesh(cylinderGeo,mat('#9a968c',0.88));
  ped.scale.set(0.18,bh,0.18);ped.position.set(bx,localY+0.08+bh/2,bz);
  ped.castShadow=true;ped.receiveShadow=true;g.add(ped);
  if(kind==='pipes'){
   for(let p=0;p<7;p++){
    const pa=p*0.9,pr=p===0?0:0.075,ph=0.35+(p%3)*0.14;
    const pipe=new THREE.Mesh(cylinderGeo,mat('#e8e4da',0.6));
    pipe.scale.set(0.032,ph,0.032);
    pipe.position.set(bx+Math.cos(pa)*pr,localY+0.08+bh+ph/2,bz+Math.sin(pa)*pr);
    pipe.castShadow=true;g.add(pipe);
   }
  }else{
   const reedGroup=new THREE.Group();
   reedGroup.position.set(bx,localY+bh,bz);
   reedGroup.userData.swayFoliage={phase:random()*6.28,amp:0.052};
   g.add(reedGroup);
   for(let r=0;r<18;r++){
    const ra=random()*Math.PI*2,rr=random()*0.11;
    const rx=Math.cos(ra)*rr,rz=Math.sin(ra)*rr;
    const tiltX=(random()-0.5)*0.32,tiltZ=(random()-0.5)*0.32,rh=1.15+random()*0.52;
    rod(reedGroup,[rx,0,rz],[rx+tiltX,rh,rz+tiltZ],0.006,r%3===0?'#b8251e':'#d93829');
   }
  }
  world.colliders.push({x:x+bx,z:z+bz,r:0.35});
 }
 const tx=-0.85,tz=-1.25,ty=parcelaHeightAt(x+tx,z+tz)-gy;
 const wt=new THREE.Group();wt.position.set(tx,ty,tz);g.add(wt);
 const wArms=[
  [[0,0,0],[0.02,0.55,0],[-0.38,1.18,0.18],[-0.68,1.58,0.28]],
  [[0.02,0.55,0],[0.36,1.15,-0.15],[0.64,1.52,-0.25]],
  [[0.02,0.55,0],[-0.08,1.25,-0.28],[-0.15,1.65,-0.45]]
 ];
 wArms.forEach(pts=>taperedBranch(wt,pts,0.065,0.018,'#dcd5c5',10,6));
 const canPts=[[-0.52,1.38,0.22,'#d93829'],[-0.25,1.12,0.12,'#2458b8'],[0.48,1.35,-0.20,'#d93829'],[0.22,1.08,-0.10,'#d93829'],[-0.12,1.45,-0.36,'#2458b8']];
 canPts.forEach(([cx,cy,cz,cc],ci)=>{
  const cp=new THREE.Group();cp.position.set(cx,cy,cz);
  cp.userData.swayFoliage={phase:ci*1.3,amp:0.085};
  rod(cp,[0,0,0],[0,-0.22,0],0.002,'#888');
  const can=new THREE.Mesh(cylinderGeo,mat(cc,0.45));
  can.scale.set(0.036,0.12,0.036);can.position.set(0,-0.28,0);can.castShadow=true;cp.add(can);
  wt.add(cp);
 });
 const ox=1.85,oz=0.85,oy=parcelaHeightAt(x+ox,z+oz)-gy;
 const ot=new THREE.Group();ot.position.set(ox,oy,oz);g.add(ot);
 taperedBranch(ot,[[0,0,0],[0.05,0.58,0.02],[0.10,1.12,0.04]],0.055,0.028,'#6e6254',10,6);
 const saplingArms=[
  [[0.10,1.05,0.04],[-0.22,1.35,0.18],[-0.42,1.58,0.28]],
  [[0.10,1.08,0.04],[0.38,1.38,-0.14],[0.58,1.62,-0.24]],
  [[0.10,1.10,0.04],[0.06,1.45,-0.22],[0.02,1.72,-0.36]],
  [[0.10,1.10,0.04],[0.18,1.48,0.24],[0.26,1.74,0.38]]
 ];
 const saplingCols=['#788f65','#8aa176','#687e56'];
 saplingArms.forEach(pts=>{
  taperedBranch(ot,pts,0.028,0.012,'#6e6254',8,5);
  const tip=pts[pts.length-1];
  addFoliageCluster(ot,tip,0.28,saplingCols,random,6,0.75);
 });
 addStoneRing(world,x+ox,z+oz,0.52,12,false);
 const letterCols=['#e86590','#f29422','#3898d8','#f2c818','#48b862'];
 const letterOffsets=[[-0.28,1.18,0.18],[0.26,1.14,-0.16],[0.12,1.02,0.26],[-0.18,1.05,-0.22],[0.32,1.22,0.14]];
 letterOffsets.forEach(([lx,ly,lz],i)=>{
  rod(ot,[lx,ly+0.22,lz],[lx,ly,lz],0.002,'#999');
  const lt=new THREE.Mesh(new THREE.TorusGeometry(0.052,0.015,6,14),mat(letterCols[i%letterCols.length],0.55));
  lt.position.set(lx,ly-0.05,lz);lt.rotation.y=i*0.8;lt.castShadow=true;ot.add(lt);
 });
 softShadow(world.scene,x,z,3.8,0.22,gy);
}
function buildWoodenCaseta(world){
 // Exact Catastro footprint: center (21.86, 0.78), 12.32m × 3.84m (47.3 m2), rotated -20.4 deg
 const cx=21.86,cz=0.78,gy=parcelaHeightAt(cx,cz),rotY=-20.4*Math.PI/180;
 const root=new THREE.Group();root.position.set(cx,gy,cz);root.rotation.y=rotY;
 world.scene.add(root);
 const W=3.84,L=12.32,H=3.15;
 box(root,[W+0.24,0.22,L+0.24],[0,0.11,0],'#cdc3ae');
 box(root,[2.45,0.16,L+0.2],[-W/2-1.2,0.08,0],'#8b5e3b');
 for(let i=-5.8;i<=5.8;i+=0.45)box(root,[2.38,0.015,0.03],[-W/2-1.2,0.165,i],'#5e3d24',false);
 box(root,[0.55,0.09,3.4],[-W/2-2.55,0.045,-1.2],'#d4cab4');
 box(root,[0.18,H,L],[W/2-0.09,0.22+H/2,0],'#9e6b43');
 box(root,[W,H,0.18],[0,0.22+H/2,-L/2+0.09],'#96643d');
 box(root,[W,H,0.18],[0,0.22+H/2,L/2-0.09],'#96643d');
 box(root,[0.18,H,3.65],[-W/2+0.09,0.22+H/2,-4.33],'#a47148');
 box(root,[0.18,H,5.85],[-W/2+0.09,0.22+H/2,3.23],'#a47148');
 box(root,[0.18,0.68,2.85],[-W/2+0.09,0.22+H-0.34,-1.1],'#a47148');
 for(let y=0.55;y<=3.15;y+=0.26){
  box(root,[0.21,0.028,L+0.04],[W/2-0.09,y,0],'#6d472a',false);
  box(root,[W+0.04,0.028,0.21],[0,y,-L/2+0.09],'#6d472a',false);
  box(root,[W+0.04,0.028,0.21],[0,y,L/2-0.09],'#6d472a',false);
  box(root,[0.21,0.028,3.62],[-W/2+0.09,y,-4.33],'#6d472a',false);
  box(root,[0.21,0.028,5.82],[-W/2+0.09,y,3.23],'#6d472a',false);
 }
 for(const px of [-W/2+0.08,W/2-0.08])for(const pz of [-L/2+0.08,-2.5,0.3,3.2,L/2-0.08]){
  box(root,[0.24,H+0.08,0.24],[px,0.22+H/2,pz],'#4d331e');
 }
 const glassMat=new THREE.MeshStandardMaterial({color:'#d8e8ea',emissive:'#ff9c38',emissiveIntensity:0,roughness:0.15,metalness:0.25,transparent:true,opacity:0.56});
 world.casetaGlassMat=glassMat;
 for(const [side,zPivot,openAng] of [[-1,-2.42,0.55],[1,0.22,-0.55]]){
  const door=new THREE.Group();door.position.set(-W/2+0.09,0.22,zPivot);door.rotation.y=openAng;
  box(door,[0.08,2.45,1.28],[0,1.225,side*-0.64],'#593a22');
  const pane=new THREE.Mesh(new THREE.BoxGeometry(0.03,2.05,1.04),glassMat);
  pane.position.set(0,1.25,side*-0.64);door.add(pane);
  for(let r=0;r<3;r++)box(door,[0.09,0.04,1.12],[0,0.65+r*0.62,side*-0.64],'#593a22',false);
  root.add(door);
 }
 for(const wz of [-4.3,3.4]){
  box(root,[0.24,1.35,1.65],[-W/2+0.09,1.65,wz],'#543720');
  const winPane=new THREE.Mesh(new THREE.BoxGeometry(0.26,1.15,1.45),glassMat);
  winPane.position.set(-W/2+0.09,1.65,wz);root.add(winPane);
  box(root,[0.28,0.08,1.8],[-W/2+0.04,0.96,wz],'#4d331e');
  // Contraventanas mallorquinas de lamas de madera abiertas a ambos lados de la ventana
  for(const side of [-1,1]){
   const sh=new THREE.Group();
   sh.position.set(-W/2-0.02,1.65,wz+side*1.06);
   box(sh,[0.04,1.32,0.44],[0,0,0],'#4c5c42');
   for(let sl=-0.52;sl<=0.52;sl+=0.13){
    box(sh,[0.055,0.032,0.38],[0,sl,0],'#3d4c34',false);
   }
   root.add(sh);
  }
 }
 const roofGroup=new THREE.Group();roofGroup.position.set(-0.45,0.22+H+0.08,0);roofGroup.rotation.z=0.06;
 box(roofGroup,[W+1.4,0.16,L+0.8],[0.45,0,0],'#69462b');
 box(roofGroup,[W+1.5,0.08,L+0.9],[0.45,0.11,0],'#8c583a');
 // Filas de teja árabe cerámica sobre la cubierta de la Caseta-Taller
 const tileMatA=mat('#b5633e',0.76),tileMatB=mat('#9e5232',0.80);
 for(let tz=-L/2-0.32;tz<=L/2+0.32;tz+=0.42){
  const ridge=new THREE.Mesh(cylinderGeo,tz%0.84<0.42?tileMatA:tileMatB);
  ridge.rotation.z=Math.PI/2;ridge.scale.set(0.085,(W+1.48)*0.5,0.065);
  ridge.position.set(0.45,0.165,tz);ridge.castShadow=true;roofGroup.add(ridge);
 }
 root.add(roofGroup);
 for(const pz of [-5.6,-2.8,0,2.8,5.6]){
  box(root,[0.18,H-0.12,0.18],[-W/2-2.18,0.22+(H-0.12)/2,pz],'#543720');
  box(root,[0.28,0.12,0.28],[-W/2-2.18,0.26,pz],'#c7bca6');
 }
 box(root,[0.18,0.22,L+0.4],[-W/2-2.18,0.22+H-0.08,0],'#543720');
 for(let pz=-5.8;pz<=5.85;pz+=0.96){
  box(root,[W+3.0,0.14,0.10],[-0.6,0.22+H+0.04,pz],'#5e3e24');
 }
 for(let lx=-W/2-2.05;lx<=-W/2-0.25;lx+=0.36){
  box(root,[0.06,0.05,L+0.3],[lx,0.22+H+0.12,0],'#7a5232',false);
 }
 box(root,[W-0.3,0.06,L-0.3],[0,0.24,0],'#875c39',false);
 box(root,[1.1,0.08,2.6],[0.55,1.02,-1.1],'#b58352');
 for(const [tx,tz] of [[0.1,-2.2],[1.0,-2.2],[0.1,0.0],[1.0,0.0]])box(root,[0.1,0.78,0.1],[tx,0.62,tz],'#593a22');
 rod(root,[0.55,1.06,-1.4],[0.55,1.65,-1.4],0.015,'#3a352f');
 curve(root,[[0.35,1.45,-1.55],[0.55,1.62,-1.4],[0.75,1.38,-1.25]],0.022,'#d94b38');
 rod(root,[0.55,1.06,-0.7],[0.55,1.58,-0.7],0.015,'#3a352f');
 curve(root,[[0.42,1.32,-0.85],[0.55,1.55,-0.7],[0.68,1.35,-0.55]],0.022,'#2e7ab8');
 // Tarros con tapones de colores, rollos de alambre y mazo de escultor sobre el banco de trabajo
 const jarCols=['#185cc4','#e42824','#f5cc18','#18a858'];
 for(let j=0;j<4;j++){
  const jar=new THREE.Mesh(cylinderGeo,mat(jarCols[j],0.35,0.15));
  jar.scale.set(0.058,0.14,0.058);jar.position.set(0.28+j*0.14,1.13,-1.85);root.add(jar);
 }
 const wireCoil=new THREE.Mesh(new THREE.TorusGeometry(0.11,0.018,8,20),mat('#9e8656',0.38,0.68));
 wireCoil.rotation.x=Math.PI/2;wireCoil.position.set(0.75,1.08,-0.25);root.add(wireCoil);
 // Caballete de taller con lienzo en proceso y estantería de herramientas
 const easel=new THREE.Group();easel.position.set(0.35,0.24,2.15);easel.rotation.y=-0.42;root.add(easel);
 rod(easel,[-0.28,0,0.18],[0,1.72,-0.05],0.022,'#6e492c');
 rod(easel,[0.28,0,0.18],[0,1.72,-0.05],0.022,'#6e492c');
 rod(easel,[0,0,-0.32],[0,1.68,-0.05],0.022,'#6e492c');
 box(easel,[0.76,0.04,0.08],[0,0.78,0.08],'#593a22');
 box(easel,[0.68,0.86,0.035],[0,1.22,0.05],'#f4efe4');
 box(easel,[0.52,0.64,0.04],[0,1.22,0.055],'#c85a38');
 // Lámpara colgante de taller bajo el porche de madera
 rod(root,[-W/2-1.1,0.22+H+0.02,-1.1],[-W/2-1.1,0.22+H-0.38,-1.1],0.01,'#2d2a26');
 const shade=new THREE.Mesh(new THREE.ConeGeometry(0.22,0.14,16),mat('#3b423c',0.4,0.6));
 shade.position.set(-W/2-1.1,0.22+H-0.42,-1.1);root.add(shade);
 const pBulb=new THREE.Mesh(sphereGeo,new THREE.MeshBasicMaterial({color:'#ffefc2'}));
 pBulb.scale.setScalar(0.055);pBulb.position.set(-W/2-1.1,0.22+H-0.48,-1.1);root.add(pBulb);
 box(root,[0.52,0.07,2.1],[-W/2-0.55,0.62,2.2],'#9c6b42');
 box(root,[0.08,0.42,0.44],[-W/2-0.55,0.38,1.35],'#593a22');
 box(root,[0.08,0.42,0.44],[-W/2-0.55,0.38,3.05],'#593a22');
 const gerMatA=mat('#d93832',0.65),gerMatB=mat('#e86478',0.65);
 for(const pz of [-2.95,0.75,4.8]){
  const pot=new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.20,0.38,12),mat('#b86842',0.82));
  pot.position.set(-W/2-0.48,0.35,pz);pot.castShadow=true;root.add(pot);
  const bush=new THREE.Mesh(sphereGeo,mat('#4e6e42',0.88));
  bush.position.set(-W/2-0.48,0.65,pz);bush.scale.set(0.32,0.27,0.32);bush.castShadow=true;root.add(bush);
  // Flores de geranio mediterráneo sobre las macetas del porche
  for(let f=0;f<5;f++){
   const fa=f*1.25+pz;
   const fl=new THREE.Mesh(sphereGeo,f%2===0?gerMatA:gerMatB);
   fl.scale.setScalar(0.052);
   fl.position.set(-W/2-0.48+Math.cos(fa)*0.18,0.82+(f%2)*0.05,pz+Math.sin(fa)*0.18);
   root.add(fl);
  }
 }
 const signBoard=box(root,[0.05,0.48,2.68],[-W/2-2.29,2.92,-0.55],'#3e2817');
 const signMesh=sign(root,'EL JARDÍN DE LAS LAGARTIJAS','CASETA-TALLER DE MADERA · ENRIC SEGARRA',[-W/2-2.33,2.92,-0.55],2.55,true);
 signMesh.rotation.y=-Math.PI/2;
 addLizard(root,[-W/2-1.85,0.165,-3.6],0.45,1.2,world);
 addLizard(root,[-W/2-1.45,0.165,4.1],-1.2,1.15,world);
 const ca=Math.cos(rotY),sa=Math.sin(rotY);
 for(let lz=-5.6;lz<=5.6;lz+=1.4){
  const wx=cx+0.2*ca+lz*sa,wz=cz-0.2*sa+lz*ca;
  world.colliders.push({x:wx,z:wz,r:1.95});
 }
 softShadow(world.scene,cx-1.2,cz,15.5,0.36,gy);
 return root;
}
function buildEntrancesAndAcequias(world){
 const scene=world.scene;
 const wTex=getWaterRippleTexture();
 world.waterTex=wTex;
 const waterMat=new THREE.MeshStandardMaterial({color:'#58b8be',map:wTex,bumpMap:wTex,bumpScale:0.015,roughness:0.12,metalness:0.32,envMapIntensity:1.35,transparent:true,opacity:0.88});
 const mossMat=mat('#4a6b3b',0.92),cobbleMatA=mat('#d2c8b2',0.88),cobbleMatB=mat('#bfb49c',0.90);
 const acequiaPts=[];
 for(let x=-32;x<=12;x+=2.5){
  const rz=parcelaRoadZ(x)-3.85;
  acequiaPts.push([x,parcelaHeightAt(x,rz),rz]);
 }
 for(let i=0;i<acequiaPts.length-1;i++){
  const [x1,y1,z1]=acequiaPts[i],[x2,y2,z2]=acequiaPts[i+1];
  const mx=(x1+x2)/2,my=(y1+y2)/2,mz=(z1+z2)/2,dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),ang=Math.atan2(dx,dz);
  const seg=new THREE.Group();seg.position.set(mx,my,mz);seg.rotation.y=ang;
  box(seg,[0.16,0.48,len+0.06],[-0.34,0.24,0],'#d6ceb8');
  box(seg,[0.16,0.48,len+0.06],[0.34,0.24,0],'#d6ceb8');
  box(seg,[0.56,0.14,len+0.06],[0,0.07,0],'#b8ae96');
  const water=new THREE.Mesh(new THREE.BoxGeometry(0.52,0.04,len+0.04),waterMat);
  water.position.set(0,0.36,0);seg.add(water);
  scene.add(seg);
 }
 let wallIdx=0;
 for(let x=-14.5;x<=15.0;x+=0.95){
  if(Math.abs(x+3.2)<1.1||Math.abs(x-5.2)<1.15)continue;
  const bz=3.6-0.04*x,by=parcelaHeightAt(x,bz-0.45);
  const wSeg=new THREE.Group();wSeg.position.set(x,by,bz);wSeg.rotation.y=0.04;
  box(wSeg,[0.98,0.42,0.44],[0,0.21,0],'#c4b89e');
  box(wSeg,[1.02,0.08,0.50],[0,0.44,0],'#d8cfb8');
  // Mampostería en relieve de piedra seca (3D cobbles) y musgo húmedo en la base
  for(const cx of [-0.26,0.24])for(const cy of [0.14,0.31]){
   const cob=new THREE.Mesh(pebbleGeo,(wallIdx+Math.round(cy*10))%2===0?cobbleMatA:cobbleMatB);
   cob.scale.set(0.21,0.095,0.08);
   cob.position.set(cx+(cy>0.2?0.05:-0.04),cy,-0.21);
   wSeg.add(cob);
  }
  if(x>=-11.5&&x<=14.5){
   box(wSeg,[0.98,0.18,0.12],[0,0.09,-0.52],'#cbc0a8');
   const gw=new THREE.Mesh(new THREE.BoxGeometry(0.98,0.04,0.26),waterMat);
   gw.position.set(0,0.14,-0.36);wSeg.add(gw);
   if(wallIdx%2===0){
    const moss=new THREE.Mesh(sphereGeo,mossMat);
    moss.scale.set(0.22,0.045,0.08);moss.position.set(0,0.17,-0.22);wSeg.add(moss);
   }
  }
  wallIdx++;
  scene.add(wSeg);
 }
 for(const sx of [-3.2,5.2]){
  const sz=3.6-0.04*sx,sy=parcelaHeightAt(sx,sz-0.5);
  for(let s=0;s<3;s++)box(scene,[1.95,0.13,0.42],[sx,sy+0.065+s*0.12,sz-0.35+s*0.38],'#d6ccb4');
 }
 const aby=parcelaHeightAt(14.8,3.1),alberca=new THREE.Group();
 alberca.position.set(14.8,aby,3.1);scene.add(alberca);
 box(alberca,[1.65,0.42,1.35],[0,0.21,0],'#c8bda4');
 box(alberca,[1.74,0.06,1.44],[0,0.43,0],'#dcd3bc');
 const poolW=new THREE.Mesh(new THREE.BoxGeometry(1.35,0.06,1.05),waterMat);
 poolW.position.set(0,0.39,0);alberca.add(poolW);
 // Hojas flotantes y musgo húmedo en los bordes de la alberca
 for(const [lx,lz] of [[-0.32,0.18],[0.24,-0.22],[-0.12,-0.28],[0.38,0.20]]){
  const pad=new THREE.Mesh(new THREE.CircleGeometry(0.065,10),mossMat);
  pad.rotation.x=-Math.PI/2;pad.position.set(lx,0.425,lz);alberca.add(pad);
 }
 addLizard(alberca,[0.68,0.47,0.45],-2.2,1.25,world);
 world.colliders.push({x:14.8,z:3.1,r:0.95});
 const fenceNodes=[];
 for(let x=-32;x<=19.5;x+=2.8){
  const fz=parcelaRoadZ(x)+0.55;
  fenceNodes.push([x,parcelaHeightAt(x,fz),fz]);
 }
 for(let i=0;i<fenceNodes.length;i++){
  const [x,y,z]=fenceNodes[i];
  const atWestGate=Math.abs(x+28.0)<2.4;
  const atEastGate=Math.abs(x-15.8)<2.4;
  if(!atWestGate&&!atEastGate){
   box(scene,[0.13,1.18,0.13],[x,y+0.59,z],'#7d6b52');
   box(scene,[0.24,0.22,0.24],[x,y+0.11,z],'#cfc5ae');
  }
  if(i<fenceNodes.length-1){
   const [nx,ny,nz]=fenceNodes[i+1];
   const segMidX=(x+nx)/2;
   if(Math.abs(segMidX+28.0)<2.2||Math.abs(segMidX-15.8)<2.2)continue;
   rod(scene,[x,y+0.14,z],[nx,ny+0.14,nz],0.14,'#c7bca4');
   for(const wy of [0.46,0.76,1.06])rod(scene,[x,y+wy,z],[nx,ny+wy,nz],0.009,'#8e9488');
  }
 }
 const buildStoneGate=(gx,gz,headingRad,titleText,subText)=>{
  const gy=parcelaHeightAt(gx,gz),g=new THREE.Group();
  g.position.set(gx,gy,gz);g.rotation.y=headingRad;scene.add(g);
  for(const side of [-1,1]){
   const px=side*1.95;
   box(g,[0.62,1.72,0.62],[px,0.86,0],'#d8cfc0');
   box(g,[0.72,0.14,0.72],[px,1.76,0],'#c2b69f');
   box(g,[0.42,0.24,0.42],[px,1.92,0],'#b86e48');
   world.colliders.push({x:gx+Math.cos(headingRad)*px,z:gz-Math.sin(headingRad)*px,r:0.55});
   const leaf=new THREE.Group();leaf.position.set(px-side*0.28,0.18,0);
   leaf.rotation.y=side*1.18;
   const lw=1.55;
   box(leaf,[lw,0.07,0.06],[side*-lw/2,1.22,0],'#7d5233');
   box(leaf,[lw,0.07,0.06],[side*-lw/2,0.18,0],'#7d5233');
   for(let b=0;b<=5;b++){
    const bx=side*-(b/5)*lw;
    box(leaf,[0.045,1.12,0.045],[bx,0.70,0],b===0||b===5?'#7d5233':'#464d43');
   }
   g.add(leaf);
  }
  if(titleText){
   const s=sign(g,titleText,subText,[0,2.38,0],3.2,false);
   s.rotation.y=Math.PI;
  }
 };
 buildStoneGate(15.8,-17.2,-0.48,'JARDÍN DE LAS LAGARTIJAS','ENTRADA PRINCIPAL · PARCELA ENRIC SEGARRA');
 buildStoneGate(-28.0,1.2,-0.36,'ENTRADA OESTE','SENDERO DEL ALGARROBO Y LAS CHUMBERAS');
 buildStoneGate(24.0,12.8,-0.15,'','');
}
function buildSkyAndClouds(world){
 const scene=world.scene;
 // 1. Sky Dome with dynamic vertex-color gradient (Zenith -> Mid -> Horizon)
 const skyGeo=new THREE.SphereGeometry(108,32,20);
 const pos=skyGeo.attributes.position;
 const skyCols=new Float32Array(pos.count*3);
 skyGeo.setAttribute('color',new THREE.BufferAttribute(skyCols,3));
 const skyMat=new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide,depthWrite:false,fog:false});
 const skyDome=new THREE.Mesh(skyGeo,skyMat);
 scene.add(skyDome);
 // 2. Sun & Moon celestial bodies
 const celestialPivot=new THREE.Group();
 scene.add(celestialPivot);
 const sunMat=new THREE.MeshBasicMaterial({color:'#fff6d6',fog:false});
 const sunDisc=new THREE.Mesh(new THREE.SphereGeometry(3.8,20,16),sunMat);
 sunDisc.position.set(-42,58,28);
 celestialPivot.add(sunDisc);
 const glowMap=getRadialGlowTexture();
 const sunHaloMat=new THREE.SpriteMaterial({map:glowMap,color:'#ffe49e',transparent:true,opacity:0.65,depthWrite:false,blending:THREE.AdditiveBlending,fog:false});
 const sunHalo=new THREE.Sprite(sunHaloMat);
 sunHalo.scale.set(28,28,1);
 sunHalo.position.copy(sunDisc.position);
 celestialPivot.add(sunHalo);
 const moonMat=new THREE.MeshBasicMaterial({color:'#f4f6ff',fog:false});
 const moonDisc=new THREE.Mesh(new THREE.SphereGeometry(3.0,20,16),moonMat);
 moonDisc.position.set(38,54,-32);
 celestialPivot.add(moonDisc);
 const moonHaloMat=new THREE.SpriteMaterial({map:glowMap,color:'#9bb8ff',transparent:true,opacity:0.0,depthWrite:false,blending:THREE.AdditiveBlending,fog:false});
 const moonHalo=new THREE.Sprite(moonHaloMat);
 moonHalo.scale.set(21,21,1);
 moonHalo.position.copy(moonDisc.position);
 celestialPivot.add(moonHalo);
 // 3. Starfield (520 multi-toned twinkling stars + Milky Way band + Shooting Stars)
 const starCount=520,starGeo=new THREE.BufferGeometry(),starPos=new Float32Array(starCount*3),starCols=new Float32Array(starCount*3);
 const rand=rng(777);
 const sPal=[[1,0.96,0.86],[0.84,0.92,1],[1,1,1],[1,0.88,0.72],[0.78,0.88,1]];
 for(let i=0;i<starCount;i++){
  // Concentrate 40% of stars along a diagonal Milky Way band across the zenith
  const inBand=(i<210);
  const theta=inBand?(rand()*Math.PI*2):(rand()*Math.PI*2);
  const phi=inBand?Math.max(0.14,Math.min(1.45,0.78+Math.sin(theta)*0.42+(rand()-0.5)*0.24)):(0.12+rand()*Math.PI*0.38);
  const r=98;
  starPos[i*3]=Math.cos(theta)*Math.cos(phi)*r;
  starPos[i*3+1]=Math.sin(phi)*r;
  starPos[i*3+2]=Math.sin(theta)*Math.cos(phi)*r;
  const sc=sPal[i%sPal.length];
  starCols[i*3]=sc[0];starCols[i*3+1]=sc[1];starCols[i*3+2]=sc[2];
 }
 starGeo.setAttribute('position',new THREE.BufferAttribute(starPos,3));
 starGeo.setAttribute('color',new THREE.BufferAttribute(starCols,3));
 const starMat=new THREE.PointsMaterial({color:'#ffffff',vertexColors:true,map:glowMap,size:1.25,transparent:true,opacity:0.0,alphaTest:0.01,blending:THREE.AdditiveBlending,fog:false,depthWrite:false});
 const stars=new THREE.Points(starGeo,starMat);
 scene.add(stars);
 // 3b. Shooting Stars (Estrellas fugaces nocturnas)
 const shootingStars=[];
 const shootMat=new THREE.MeshBasicMaterial({color:'#fff8e0',transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,fog:false});
 for(let s=0;s<3;s++){
  const sMesh=new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.12,5.5,6),shootMat.clone());
  sMesh.rotation.z=Math.PI/2.4;
  sMesh.visible=false;
  scene.add(sMesh);
  shootingStars.push({mesh:sMesh,period:7.5+s*4.2,offset:s*3.1});
 }
 world.shootingStars=shootingStars;
 // 4. 18 Fluffy 3D Volumetric Clouds drifting across the sky
 const clouds=[];
 const cloudMat=new THREE.MeshStandardMaterial({color:'#ffffff',roughness:0.92,metalness:0.0,emissive:'#d8e6f2',emissiveIntensity:0.28,fog:false});
 for(let c=0;c<18;c++){
  const cg=new THREE.Group();
  const cx=(rand()-0.5)*135,cy=20+rand()*18,cz=(rand()-0.5)*110;
  cg.position.set(cx,cy,cz);
  const scale=0.85+rand()*0.95;
  cg.scale.setScalar(scale);
  const puffs=6+Math.floor(rand()*4);
  for(let p=0;p<puffs;p++){
   const pf=new THREE.Mesh(sphereGeo,cloudMat);
   const px=(p-(puffs-1)/2)*1.65+(rand()-0.5)*0.6;
   const py=(1-Math.abs(p-(puffs-1)/2)/puffs)*0.95+(rand()-0.5)*0.3;
   const pz=(rand()-0.5)*1.6;
   const pr=1.35+rand()*0.85;
   pf.position.set(px,py,pz);
   pf.scale.set(pr*1.35,pr*0.72,pr*1.05);
   cg.add(pf);
  }
  scene.add(cg);
  clouds.push({group:cg,speed:0.32+rand()*0.38,baseY:cy,phase:rand()*6.28});
 }
 world.skySystem={
  skyDome,skyGeo,sunDisc,sunHalo,sunHaloMat,moonDisc,moonHalo,moonHaloMat,
  stars,starMat,clouds,cloudMat,
  mode:'day', // 'day' | 'sunset' | 'night' | 'cycle'
  blend:0,    // 0 = day, 0.5 = sunset, 1.0 = night
  targetBlend:0
 };
}
const _cZenDay=new THREE.Color('#4a8fd4'),_cHorDay=new THREE.Color('#dcebf5');
const _cZenSun=new THREE.Color('#2d3968'),_cHorSun=new THREE.Color('#f08c55');
const _cZenNit=new THREE.Color('#070d1c'),_cHorNit=new THREE.Color('#13203d');
const _cZen=new THREE.Color(),_cHor=new THREE.Color(),_cTmp=new THREE.Color();
function applySkyBlend(world,b){
 if(!world||!world.skySystem)return;
 const sys=world.skySystem;
 sys.lastApplied=b;
 if(b<=0.5){
  const u=b*2;
  _cZen.lerpColors(_cZenDay,_cZenSun,u);
  _cHor.lerpColors(_cHorDay,_cHorSun,u);
 }else{
  const u=(b-0.5)*2;
  _cZen.lerpColors(_cZenSun,_cZenNit,u);
  _cHor.lerpColors(_cHorSun,_cHorNit,u);
 }
 const pos=sys.skyGeo.attributes.position,col=sys.skyGeo.attributes.color;
 for(let i=0;i<pos.count;i++){
  const ny=Math.max(0,Math.min(1,(pos.getY(i)+10)/95));
  _cTmp.lerpColors(_cHor,_cZen,Math.pow(ny,0.58));
  col.setXYZ(i,_cTmp.r,_cTmp.g,_cTmp.b);
 }
 col.needsUpdate=true;
 if(world.scene.background)world.scene.background.copy(_cHor);
 if(world.scene.fog)world.scene.fog.color.copy(_cHor);
 const sunElev=(1-b*1.65)*Math.PI*0.38;
 sys.sunDisc.position.set(-46*Math.cos(sunElev*0.5),Math.sin(sunElev)*68,28);
 sys.sunHalo.position.copy(sys.sunDisc.position);sys.sunHalo.lookAt(0,0,0);
 sys.sunDisc.visible=sys.sunHalo.visible=(b<0.78);
 sys.sunHaloMat.color.set(b>0.25?'#ff8c42':'#ffe49e');
 const moonElev=(b-0.35)*Math.PI*0.52;
 sys.moonDisc.position.set(42*Math.cos(moonElev*0.5),Math.sin(moonElev)*64,-32);
 sys.moonHalo.position.copy(sys.moonDisc.position);sys.moonHalo.lookAt(0,0,0);
 const nightAmt=Math.max(0,Math.min(1,(b-0.38)/0.52));
 sys.moonDisc.visible=sys.moonHalo.visible=(nightAmt>0.02);
 sys.moonHaloMat.opacity=nightAmt*0.36;
 sys.starMat.opacity=nightAmt*0.92;
 if(b<=0.5){
  const u=b*2;
  sys.cloudMat.color.set('#ffffff').lerp(new THREE.Color('#ffd0b0'),u);
  sys.cloudMat.emissive.set('#d8e6f2').lerp(new THREE.Color('#d96b43'),u);
 }else{
  const u=(b-0.5)*2;
  sys.cloudMat.color.set('#ffd0b0').lerp(new THREE.Color('#2a385c'),u);
  sys.cloudMat.emissive.set('#d96b43').lerp(new THREE.Color('#141e38'),u);
 }
 if('environmentIntensity' in world.scene){
  world.scene.environmentIntensity=Math.max(0.15,1.0-b*0.84);
 }
 if(world.hemi){
  world.hemi.intensity=b<=0.5?(2.15-b*1.6):(1.35-(b-0.5)*1.92);
  world.hemi.color.copy(_cHor);
  world.hemi.groundColor.set(b>0.6?'#10192b':b>0.25?'#6e4a35':'#a38f5b');
 }
 if(world.sun){
  world.sun.intensity=b<=0.5?(3.15-b*2.5):(1.90-(b-0.5)*2.95);
  world.sun.color.set(b>0.65?'#7aa6f0':b>0.25?'#ff9448':'#fff1ce');
  world.sun.position.set(b>0.65?22:-16,b>0.65?26:Math.max(6,24*(1-b*0.8)),b>0.65?-18:12);
 }
 if(world.nightLights){
  const nl=world.nightLights;
  const lampOn=Math.max(0,Math.min(1,(b-0.18)/0.38));
  nl.bulbMat.color.set('#d8cfc0').lerp(new THREE.Color('#fff2be'),lampOn);
  nl.glowMat.opacity=lampOn*0.94;
  if(world.casetaGlassMat){
   world.casetaGlassMat.emissiveIntensity=lampOn*1.35;
  }
  for(const gp of nl.glowPools){if(gp.isSpriteMat)gp.mat.opacity=lampOn*0.95;}
  for(const pl of nl.pointLights){
   pl.light.intensity=pl.maxInt*lampOn;
  }
 }
}
function buildGardenNightLights(world){
 const scene=world.scene;
 const bulbMat=new THREE.MeshBasicMaterial({color:'#ffdf9e'});
 const wireMat=mat('#38342e',0.8);
 // Soft radial ground glow texture for lanterns at night
 const gc=document.createElement('canvas');gc.width=gc.height=128;
 const gctx=gc.getContext('2d');
 const grd=gctx.createRadialGradient(64,64,2,64,64,62);
 grd.addColorStop(0,'rgba(255,190,95,0.68)');
 grd.addColorStop(0.45,'rgba(255,165,70,0.26)');
 grd.addColorStop(1,'rgba(255,150,55,0)');
 gctx.fillStyle=grd;gctx.fillRect(0,0,128,128);
 const glowTex=new THREE.CanvasTexture(gc);
 const glowMat=new THREE.MeshBasicMaterial({map:glowTex,transparent:true,opacity:0,depthWrite:false});
 const glowPools=[];
 const bulbs=[];
 const pointLights=[];
 // 1. Warm Festoon String Lights ("Guirnaldas de verbena") along the Wooden Caseta Pergola & Algarrobo Boughs
 const stringRoutes=[
  // Along Caseta front pergola
  [[19.2,parcelaHeightAt(19.2,-4.6)+2.85,-4.6],[18.0,parcelaHeightAt(18.0,0.2)+2.78,0.2],[16.8,parcelaHeightAt(16.8,5.0)+2.85,5.0]],
  // Under the Gran Algarrobo boughs illuminating MOV-016, MOV-019, MOV-018
  [[-8.2,parcelaHeightAt(-8.2,-1.8)+2.35,-1.8],[-6.2,parcelaHeightAt(-6.2,-0.8)+2.25,-0.8],[-4.2,parcelaHeightAt(-4.2,-1.4)+2.35,-1.4]],
  // Across the Algarrobo to the Companion Pine
  [[-6.2,parcelaHeightAt(-6.2,-2.0)+2.45,-2.0],[-8.4,parcelaHeightAt(-8.4,-2.3)+2.30,-2.3],[-10.5,parcelaHeightAt(-10.5,-2.6)+2.45,-2.6]]
 ];
 for(const route of stringRoutes){
  const cObj=new THREE.CatmullRomCurve3(route.map(p=>V(...p)));
  const wire=new THREE.Mesh(new THREE.TubeGeometry(cObj,20,0.008,6,false),wireMat);
  scene.add(wire);
  const spriteMat=new THREE.SpriteMaterial({map:glowTex,color:'#ffcf70',transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
  glowPools.push({isSpriteMat:true,mat:spriteMat});
  for(let k=1;k<=7;k++){
   const pt=cObj.getPointAt(k/8);
   const sock=new THREE.Mesh(cylinderGeo,wireMat);
   sock.scale.set(0.012,0.022,0.012);
   sock.position.set(pt.x,pt.y-0.012,pt.z);
   scene.add(sock);
   const bulb=new THREE.Mesh(sphereGeo,bulbMat);
   bulb.scale.set(0.024,0.034,0.024);
   bulb.position.set(pt.x,pt.y-0.035,pt.z);
   scene.add(bulb);
   bulbs.push(bulb);
   const halo=new THREE.Sprite(spriteMat);
   halo.scale.set(0.28,0.28,1);
   halo.position.set(pt.x,pt.y-0.035,pt.z);
   scene.add(halo);
  }
 }
 // 2. Stone & Wood Solar Garden Bollards / Lanterns along paths, entrances & hero trees
 const lanternSpots=[
  [13.5,-13.5],[10.8,-8.2],[4.8,-3.2],[-0.4,-2.4],
  [-5.2,0.2],[-10.0,-1.2],[-18.0,1.8],
  [-0.6,2.8],[-4.8,3.4],[8.4,4.6],[16.2,-1.5]
 ];
 for(const [lx,lz] of lanternSpots){
  const ly=parcelaHeightAt(lx,lz);
  const lg=new THREE.Group();lg.position.set(lx,ly,lz);
  box(lg,[0.14,0.48,0.14],[0,0.24,0],'#6b4c35');
  box(lg,[0.20,0.05,0.20],[0,0.62,0],'#4a3322');
  const glass=new THREE.Mesh(boxGeo,bulbMat);
  glass.scale.set(0.11,0.14,0.11);glass.position.set(0,0.53,0);
  lg.add(glass);bulbs.push(glass);
  if(glowPools[0]&&glowPools[0].isSpriteMat){
   const bHalo=new THREE.Sprite(glowPools[0].mat);
   bHalo.scale.set(0.52,0.52,1);bHalo.position.set(0,0.53,0);
   lg.add(bHalo);
  }
  scene.add(lg);
  const pool=new THREE.Mesh(new THREE.PlaneGeometry(3.8,3.8),glowMat);
  pool.rotation.x=-Math.PI/2;pool.position.set(lx,ly+0.032,lz);
  scene.add(pool);glowPools.push(pool);
 }
 // 3. Real Three.js PointLights for warm golden night illumination of the Caseta, Algarrobo & Artworks
 const lightConfigs=[
  {pos:[20.2,parcelaHeightAt(20.2,0.5)+2.2,0.5],col:'#ffaa44',maxInt:9.2,dist:20},    // Caseta Studio & Porch
  {pos:[17.8,parcelaHeightAt(17.8,-0.5)+2.5,-0.5],col:'#ffb85c',maxInt:7.8,dist:18},  // Caseta Pergola (MOV-025)
  {pos:[-6.1,parcelaHeightAt(-6.1,-1.2)+2.2,-1.2],col:'#ffb454',maxInt:9.5,dist:20},  // Gran Algarrobo (MOV-016, 019, 018)
  {pos:[-2.4,parcelaHeightAt(-2.4,2.5)+2.0,2.5],col:'#ffae52',maxInt:6.8,dist:16},    // Blue Bottle Tree & Red Reeds
  {pos:[0.5,parcelaHeightAt(0.5,-4.6)+2.1,-4.6],col:'#ffb458',maxInt:6.5,dist:16},    // Almendro en V & Foam Tree
  {pos:[9.2,parcelaHeightAt(9.2,4.8)+2.2,4.8],col:'#ffae52',maxInt:6.4,dist:16},      // East Bancal Olive (MOV-023)
  {pos:[9.8,parcelaHeightAt(9.8,-8.5)+2.2,-8.5],col:'#ffb458',maxInt:6.5,dist:16},    // East Entrance Almendro (MOV-028)
  {pos:[-11.2,parcelaHeightAt(-11.2,-2.0)+2.2,-2.0],col:'#ffb454',maxInt:6.8,dist:17} // Tall Pine (MOV-022) & West Path
 ];
 for(const lc of lightConfigs){
  const pl=new THREE.PointLight(lc.col,0,lc.dist,1.5);
  pl.position.set(...lc.pos);
  scene.add(pl);
  pointLights.push({light:pl,maxInt:lc.maxInt});
  const gy=parcelaHeightAt(lc.pos[0],lc.pos[2]);
  const pool=new THREE.Mesh(new THREE.PlaneGeometry(6.8,6.8),glowMat);
  pool.rotation.x=-Math.PI/2;pool.position.set(lc.pos[0],gy+0.035,lc.pos[2]);
  scene.add(pool);glowPools.push(pool);
 }
 world.nightLights={bulbMat,glowMat,bulbs,glowPools,pointLights};
 applySkyBlend(world,0);
}
function addGardenBirds(world){
 const scene=world.scene;
 const birds=[];
 // Species palettes: European Robin (petirrojo), Blue Tit (herrerillo), Golden Oriole (oropéndola), Hoopoe (abubilla), Swallow (golondrina)
 const palettes=[
  {body:'#6e5844',breast:'#d95b26',wing:'#4e3e30',crest:'#6e5844'},
  {body:'#3a6ea5',breast:'#f2c830',wing:'#2b527d',crest:'#244870'},
  {body:'#e8b824',breast:'#f2ca28',wing:'#242622',crest:'#e8b824'},
  {body:'#c87a48',breast:'#d88c5a',wing:'#262422',crest:'#d97838'},
  {body:'#243a5e',breast:'#f2ece0',wing:'#1a2942',crest:'#b83828'}
 ];
 const eyeMat=mat('#141614',0.25),ringMat=mat('#f4f2ec',0.7);
 const buildBirdMesh=(pal)=>{
  const root=new THREE.Group();
  const body=new THREE.Mesh(sphereGeo,mat(pal.body,0.72));
  body.scale.set(0.055,0.048,0.096);body.castShadow=true;root.add(body);
  const breast=new THREE.Mesh(sphereGeo,mat(pal.breast,0.75));
  breast.scale.set(0.048,0.042,0.066);breast.position.set(0,-0.008,0.032);root.add(breast);
  const head=new THREE.Group();head.position.set(0,0.036,0.072);root.add(head);
  const skull=new THREE.Mesh(sphereGeo,mat(pal.body,0.72));
  skull.scale.set(0.042,0.042,0.045);head.add(skull);
  for(const sx of [-1,1]){
   const eyeRing=new THREE.Mesh(sphereGeo,ringMat);
   eyeRing.scale.setScalar(0.009);eyeRing.position.set(sx*0.032,0.006,0.018);head.add(eyeRing);
   const eye=new THREE.Mesh(sphereGeo,eyeMat);
   eye.scale.setScalar(0.0065);eye.position.set(sx*0.035,0.006,0.020);head.add(eye);
  }
  const crest=new THREE.Mesh(new THREE.ConeGeometry(0.015,0.042,6),mat(pal.crest,0.72));
  crest.position.set(0,0.034,-0.008);crest.rotation.x=-0.55;head.add(crest);
  const beak=new THREE.Mesh(new THREE.ConeGeometry(0.012,0.044,8),mat('#e5a928',0.45));
  beak.rotation.x=Math.PI/2;beak.position.set(0,-0.002,0.048);head.add(beak);
  const tail=new THREE.Group();tail.position.set(0,0.008,-0.085);root.add(tail);
  for(const ta of [-0.18,0,0.18]){
   const tf=new THREE.Mesh(boxGeo,mat(pal.wing,0.78));
   tf.scale.set(0.024,0.006,0.088);tf.position.set(Math.sin(ta)*0.02,0,-0.035);tf.rotation.y=ta;
   tail.add(tf);
  }
  // Articulated 2-stage wings (inner wing + outer primary feather tip)
  const wingL=new THREE.Group();wingL.position.set(0.042,0.012,0.01);
  const wInnerL=new THREE.Mesh(boxGeo,mat(pal.wing,0.75));
  wInnerL.scale.set(0.082,0.008,0.078);wInnerL.position.set(0.041,0,-0.008);wInnerL.castShadow=true;wingL.add(wInnerL);
  const wingTipL=new THREE.Group();wingTipL.position.set(0.080,0,-0.008);wingL.add(wingTipL);
  const wOuterL=new THREE.Mesh(boxGeo,mat(pal.wing,0.75));
  wOuterL.scale.set(0.076,0.006,0.062);wOuterL.position.set(0.036,0,-0.008);wOuterL.rotation.y=-0.18;wOuterL.castShadow=true;wingTipL.add(wOuterL);

  const wingR=new THREE.Group();wingR.position.set(-0.042,0.012,0.01);
  const wInnerR=new THREE.Mesh(boxGeo,mat(pal.wing,0.75));
  wInnerR.scale.set(0.082,0.008,0.078);wInnerR.position.set(-0.041,0,-0.008);wInnerR.castShadow=true;wingR.add(wInnerR);
  const wingTipR=new THREE.Group();wingTipR.position.set(-0.080,0,-0.008);wingR.add(wingTipR);
  const wOuterR=new THREE.Mesh(boxGeo,mat(pal.wing,0.75));
  wOuterR.scale.set(0.076,0.006,0.062);wOuterR.position.set(-0.036,0,-0.008);wOuterR.rotation.y=0.18;wOuterR.castShadow=true;wingTipR.add(wOuterR);

  root.add(wingL,wingR);
  return {root,wingL,wingR,wingTipL,wingTipR,head,tail};
 };
 // 8 Soaring birds flying across the garden sky
 const flightCenters=[
  [-4.0,7.2,-1.0,9.5,5.5,0.52,0],
  [8.0,6.8,-4.0,11.0,6.2,0.46,1.8],
  [-12.0,7.6,2.0,8.5,5.0,0.58,3.2],
  [2.0,6.4,4.5,10.2,6.8,0.48,4.5],
  [14.0,7.0,1.0,7.5,5.2,0.54,2.4],
  [-2.0,8.2,-6.0,12.0,7.0,0.42,5.1],
  [-6.5,5.8,0.5,6.8,4.4,0.62,1.1],
  [11.5,6.2,-6.5,8.2,5.0,0.50,3.9]
 ];
 flightCenters.forEach(([cx,cy,cz,rx,rz,spd,ph],i)=>{
  const b=buildBirdMesh(palettes[i%palettes.length]);
  b.root.scale.setScalar(1.38);
  scene.add(b.root);
  const bNames=['Petirrojo europeo','Herrerillo azul','Oropéndola dorada','Abubilla mediterránea','Golondrina del jardín'];
  const bObj={kind:'fly',birdType:i%3,name:bNames[i%bNames.length],mesh:b,cx,cy,cz,rx,rz,speed:spd,phase:ph,excitedUntil:0};
  b.root.traverse(o=>{if(o.isMesh)o.userData.critter=bObj;});
  world.pickables.push(b.root);
  birds.push(bObj);
 });
 // 5 Perched birds on tree branches & the stone well-ring (brocal)
 const perchSpots=[
  [-4.65,parcelaHeightAt(-4.65,-1.35)+2.12,-1.35,0.6],   // Gran Algarrobo East bough
  [-7.40,parcelaHeightAt(-7.40,-1.60)+2.08,-1.60,-0.8],  // Gran Algarrobo West bough
  [1.64,parcelaHeightAt(2.2,-5.2)+1.96,-5.20,0.45],      // Almendro en V outer-left pruned bough tip
  [-2.75,parcelaHeightAt(-2.75,2.15)+0.36,2.15,1.2],     // Rim of the stone well-ring (brocal)
  [-0.56,parcelaHeightAt(-1.2,2.4)+1.44,3.02,-1.4]       // Blue Bottle Tree branch
 ];
 const pNames=['Herrerillo azul','Oropéndola dorada','Abubilla mediterránea','Golondrina del pozo','Petirrojo europeo'];
 perchSpots.forEach(([px,py,pz,rotY],i)=>{
  const b=buildBirdMesh(palettes[(i+1)%palettes.length]);
  b.root.scale.setScalar(0.80);
  b.root.position.set(px,py,pz);
  b.root.rotation.y=rotY;
  b.wingL.rotation.z=-1.15;b.wingR.rotation.z=1.15;
  scene.add(b.root);
  const bObj={kind:'perch',birdType:(i+1)%3,name:pNames[i%pNames.length],mesh:b,basePos:[px,py,pz],baseRotY:rotY,phase:i*1.7,excitedUntil:0};
  b.root.traverse(o=>{if(o.isMesh)o.userData.critter=bObj;});
  world.pickables.push(b.root);
  birds.push(bObj);
 });
 world.birds=birds;
}
function addGardenSquirrels(world){
 const scene=world.scene;
 const squirrels=[];
 const furMat=mat('#a84820',0.78),bellyMat=mat('#ede2cf',0.85),darkMat=mat('#1f1b18',0.35),nutMat=mat('#5c3a1e',0.65);
 const buildSquirrelMesh=()=>{
  const root=new THREE.Group();
  const body=new THREE.Group();root.add(body);
  const torso=new THREE.Mesh(new THREE.CapsuleGeometry(0.045,0.11,8,12),furMat);
  torso.rotation.x=Math.PI/2;torso.position.set(0,0.065,0);torso.castShadow=true;body.add(torso);
  const belly=new THREE.Mesh(new THREE.CapsuleGeometry(0.034,0.09,6,8),bellyMat);
  belly.rotation.x=Math.PI/2;belly.position.set(0,0.052,0.005);body.add(belly);
  const head=new THREE.Group();head.position.set(0,0.095,0.088);body.add(head);
  const skull=new THREE.Mesh(sphereGeo,furMat);
  skull.scale.set(0.042,0.040,0.048);skull.castShadow=true;head.add(skull);
  const legsF=[],legsB=[];
  for(const sx of [-1,1]){
   const ear=new THREE.Mesh(new THREE.ConeGeometry(0.012,0.038,6),furMat);
   ear.position.set(sx*0.024,0.037,-0.010);ear.rotation.x=-0.15;head.add(ear);
   const eye=new THREE.Mesh(sphereGeo,darkMat);
   eye.scale.setScalar(0.0065);eye.position.set(sx*0.026,0.007,0.030);head.add(eye);
   const legF=new THREE.Mesh(new THREE.CapsuleGeometry(0.014,0.045,4,8),furMat);
   legF.position.set(sx*0.032,0.032,0.052);body.add(legF);legsF.push(legF);
   const legB=new THREE.Mesh(new THREE.CapsuleGeometry(0.018,0.052,4,8),furMat);
   legB.position.set(sx*0.036,0.036,-0.048);body.add(legB);legsB.push(legB);
  }
  // Acorn / carob pod held when nibbling
  const nut=new THREE.Mesh(sphereGeo,nutMat);
  nut.scale.set(0.016,0.022,0.016);nut.position.set(0,0.055,0.105);nut.visible=false;body.add(nut);
  // Multi-stage articulated bushy S-curved squirrel tail
  const tailPivot=new THREE.Group();tailPivot.position.set(0,0.068,-0.075);body.add(tailPivot);
  const tailCurve=new THREE.CatmullRomCurve3([
   V(0,0,0),V(0,0.065,-0.045),V(0,0.145,-0.025),V(0,0.195,-0.065)
  ]);
  const tailMesh=new THREE.Mesh(new THREE.TubeGeometry(tailCurve,14,0.036,10,false),furMat);
  tailMesh.castShadow=true;tailPivot.add(tailMesh);
  const tailTip=new THREE.Mesh(sphereGeo,furMat);
  tailTip.scale.set(0.039,0.044,0.039);tailTip.position.set(0,0.195,-0.065);tailPivot.add(tailTip);
  return {root,body,head,legsF,legsB,nut,tailPivot,tailTip};
 };
 // 6 Squirrels scampering along boughs, stone bancal wall & paths
 const routes=[
  {pts:[[-2.2,parcelaHeightAt(-2.2,3.68)+0.46,3.68],[1.5,parcelaHeightAt(1.5,3.54)+0.46,3.54],[4.2,parcelaHeightAt(4.2,3.43)+0.46,3.43]],speed:0.42,phase:0.2},
  {pts:[[-10.5,parcelaHeightAt(-10.5,4.02)+0.46,4.02],[-7.2,parcelaHeightAt(-7.2,3.88)+0.46,3.88],[-4.5,parcelaHeightAt(-4.5,3.78)+0.46,3.78]],speed:0.38,phase:1.9},
  {pts:[[-6.2,parcelaHeightAt(-6.2,-2.0)+1.15,-2.0],[-6.95,parcelaHeightAt(-6.2,-2.0)+1.72,-1.82],[-7.65,parcelaHeightAt(-6.2,-2.0)+2.10,-1.65],[-8.55,parcelaHeightAt(-6.2,-2.0)+2.46,-1.48]],speed:0.35,phase:0.8},
  {pts:[[-6.2,parcelaHeightAt(-6.2,-2.0)+1.15,-2.0],[-5.38,parcelaHeightAt(-6.2,-2.0)+1.72,-1.68],[-4.65,parcelaHeightAt(-6.2,-2.0)+2.10,-1.35],[-3.82,parcelaHeightAt(-6.2,-2.0)+2.48,-1.08]],speed:0.36,phase:3.4},
  {pts:[[15.8,parcelaHeightAt(15.8,-2.8),-2.8],[14.8,parcelaHeightAt(14.8,-0.5),-0.5],[15.5,parcelaHeightAt(15.5,2.2),2.2]],speed:0.44,phase:2.5},
  {pts:[[-10.0,parcelaHeightAt(-10.0,-2.2),-2.2],[-8.2,parcelaHeightAt(-8.2,-1.6),-1.6],[-6.8,parcelaHeightAt(-6.8,-0.6),-0.6]],speed:0.40,phase:4.7}
 ];
 routes.forEach(r=>{
  const sq=buildSquirrelMesh();
  sq.root.scale.setScalar(1.32);
  scene.add(sq.root);
  const curveObj=new THREE.CatmullRomCurve3(r.pts.map(p=>V(...p)));
  const sObj={kind:'squirrel',name:'Ardilla roja mediterránea',sq,curve:curveObj,speed:r.speed,phase:r.phase,excitedUntil:0};
  sq.root.traverse(o=>{if(o.isMesh)o.userData.critter=sObj;});
  world.pickables.push(sq.root);
  squirrels.push(sObj);
 });
 world.squirrels=squirrels;
}
function addGardenAtmosphere(world){
 const scene=world.scene;
 const rand=rng(512);
 // 1. 14 Mediterranean 3D Butterflies (Swallowtail, Cleopatra, Azure, Painted Lady)
 const bCols=['#f7d538','#f48828','#4896f0','#e86442'];
 const butterflies=[];
 const wingSh=new THREE.Shape();
 wingSh.moveTo(0,0);
 wingSh.bezierCurveTo(0.016,0.022,0.032,0.020,0.028,0.003);
 wingSh.bezierCurveTo(0.024,-0.008,0.022,-0.022,0.008,-0.020);
 wingSh.bezierCurveTo(0.003,-0.018,0,-0.008,0,0);
 const wingGeo=new THREE.ShapeGeometry(wingSh,8);
 for(let i=0;i<14;i++){
  const root=new THREE.Group();
  const wMat=new THREE.MeshStandardMaterial({color:bCols[i%bCols.length],roughness:0.55,side:THREE.DoubleSide});
  const wL=new THREE.Mesh(wingGeo,wMat);wL.rotation.x=-Math.PI/2;
  const wR=new THREE.Mesh(wingGeo,wMat);wR.rotation.x=-Math.PI/2;wR.scale.x=-1;
  const pivL=new THREE.Group();pivL.rotation.z=0.46;pivL.add(wL);
  const pivR=new THREE.Group();pivR.rotation.z=-0.46;pivR.add(wR);
  root.add(pivL,pivR);
  let cx=(rand()-0.5)*34,cz=(rand()-0.5)*18;
  for(const w of world.works){
   if(w.center&&Math.hypot(cx-w.center.x,cz-w.center.z)<3.4){cx+=3.8;cz-=2.4;}
  }
  const cy=parcelaHeightAt(cx,cz)+0.85+rand()*1.25;
  root.position.set(cx,cy,cz);
  root.rotation.y=rand()*6.28;
  scene.add(root);
  butterflies.push({root,pivL,pivR,cx,cy,cz,rx:1.2+rand()*1.8,rz:1.2+rand()*1.8,speed:0.9+rand()*0.6,phase:rand()*6.28});
 }
 world.butterflies=butterflies;

 // 2. 68 Nocturnal Golden-Green Fireflies (Luciérnagas) for Sunset & Night
 const ffCount=68,ffGeo=new THREE.BufferGeometry(),ffPos=new Float32Array(ffCount*3),ffBase=new Float32Array(ffCount*3);
 for(let i=0;i<ffCount;i++){
  const fx=(rand()-0.5)*38,fz=(rand()-0.5)*22;
  const fy=parcelaHeightAt(fx,fz)+0.45+rand()*2.6;
  ffPos[i*3]=ffBase[i*3]=fx;
  ffPos[i*3+1]=ffBase[i*3+1]=fy;
  ffPos[i*3+2]=ffBase[i*3+2]=fz;
 }
 ffGeo.setAttribute('position',new THREE.BufferAttribute(ffPos,3));
 const glowMap=getRadialGlowTexture();
 const ffMat=new THREE.PointsMaterial({color:'#d8ff66',map:glowMap,size:0.34,transparent:true,opacity:0,alphaTest:0.01,blending:THREE.AdditiveBlending,depthWrite:false});
 const fireflies=new THREE.Points(ffGeo,ffMat);
 scene.add(fireflies);
 world.fireflies={points:fireflies,mat:ffMat,base:ffBase,count:ffCount};
 // Soft floating Mediterranean pollen / breeze motes
 const wpCount=180,wpGeo=new THREE.BufferGeometry(),wpPos=new Float32Array(wpCount*3);
 for(let i=0;i<wpCount;i++){
  const wx=(rand()-0.5)*46,wz=(rand()-0.5)*28;
  wpPos[i*3]=wx;
  wpPos[i*3+1]=parcelaHeightAt(wx,wz)+0.6+rand()*4.5;
  wpPos[i*3+2]=wz;
 }
 wpGeo.setAttribute('position',new THREE.BufferAttribute(wpPos,3));
 const wpMat=new THREE.PointsMaterial({color:'#fff8dc',map:glowMap,size:0.16,transparent:true,opacity:0.48,alphaTest:0.01,depthWrite:false});
 const windParticles=new THREE.Points(wpGeo,wpMat);
 scene.add(windParticles);
 world.windParticles=windParticles;
 world.windImpulse=0;

 // 3. Volumetric-style Golden Sunbeams (God-rays filtering through the tree canopies by Day/Sunset)
 const beamSpots=[
  [-6.2,-1.6,1.8,4.6],  // Gran Algarrobo canopy shaft
  [-10.2,-2.2,1.4,5.2], // Tall Companion Pine shaft
  [9.2,5.0,1.5,4.2],    // East Olive shaft
  [10.0,-8.6,1.4,4.2],  // East Entrance Almond shaft
  [-1.2,2.4,1.3,3.8]    // Claro Central shaft
 ];
 const sbCv=typeof document!=='undefined'?document.createElement('canvas'):null;
 let sbAlpha=null;
 if(sbCv){
  sbCv.width=16;sbCv.height=128;
  const sbCtx=sbCv.getContext('2d');
  const sbGrd=sbCtx.createLinearGradient(0,0,0,128);
  sbGrd.addColorStop(0,'#000000');
  sbGrd.addColorStop(0.28,'#d8d8d8');
  sbGrd.addColorStop(0.72,'#727272');
  sbGrd.addColorStop(1,'#000000');
  sbCtx.fillStyle=sbGrd;sbCtx.fillRect(0,0,16,128);
  sbAlpha=new THREE.CanvasTexture(sbCv);
 }
 const sunbeamMat=new THREE.MeshBasicMaterial({color:'#fff2be',alphaMap:sbAlpha,transparent:true,opacity:0.026,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending});
 const sunbeams=[];
 for(const [bx,bz,br,bh] of beamSpots){
  const by=parcelaHeightAt(bx,bz);
  const cone=new THREE.Mesh(new THREE.CylinderGeometry(br*0.42,br,bh,16,1,true),sunbeamMat);
  cone.position.set(bx,by+bh*0.52,bz);
  cone.rotation.z=-0.22;cone.rotation.x=0.12;
  scene.add(cone);
  sunbeams.push(cone);
 }
 world.sunbeams={meshes:sunbeams,mat:sunbeamMat};

 // 4. ~22 Active Mediterranean Running Lizards (Sargantanes / Lagartijas) darting along paths, bancal stones & sunny clearings
 const lizRoutes=[
  // Entrance & Almond Path
  {pts:[[13.4,-13.8,0.02],[11.8,-12.0,0.02],[10.0,-10.0,0.02]],speed:0.72,phase:0.2,sc:1.52,v:0},
  {pts:[[9.2,-9.0,0.02],[7.4,-7.3,0.02],[5.6,-5.8,0.02]],speed:0.68,phase:1.7,sc:1.46,v:2},
  {pts:[[11.2,-10.8,0.02],[9.8,-8.8,0.02],[8.4,-7.8,0.02]],speed:0.78,phase:3.1,sc:1.42,v:1},
  // North Sculptural Almonds (MOV-017 & MOV-032)
  {pts:[[3.6,-4.4,0.02],[1.6,-3.1,0.02],[-0.6,-2.2,0.02]],speed:0.75,phase:0.9,sc:1.56,v:0},
  {pts:[[-0.8,-4.6,0.02],[-2.6,-3.4,0.02],[-4.2,-2.2,0.02]],speed:0.70,phase:2.4,sc:1.48,v:2},
  {pts:[[2.8,-2.4,0.02],[0.6,-1.6,0.02],[-1.8,-1.0,0.02]],speed:0.82,phase:4.2,sc:1.50,v:3},
  {pts:[[1.4,-5.6,0.02],[-0.4,-5.0,0.02],[-1.8,-4.8,0.02]],speed:0.66,phase:5.1,sc:1.44,v:1},
  // Gran Algarrobo & West Path
  {pts:[[-3.8,0.4,0.02],[-6.0,1.2,0.02],[-8.6,1.0,0.02]],speed:0.76,phase:1.3,sc:1.58,v:0},
  {pts:[[-7.2,-0.6,0.02],[-9.6,-0.2,0.02],[-12.2,0.6,0.02]],speed:0.72,phase:3.6,sc:1.46,v:2},
  {pts:[[-11.8,1.2,0.02],[-14.8,0.8,0.02],[-17.6,0.9,0.02]],speed:0.69,phase:0.6,sc:1.52,v:1},
  {pts:[[-5.2,-2.8,0.02],[-7.8,-2.6,0.02],[-9.8,-1.8,0.02]],speed:0.74,phase:2.8,sc:1.42,v:3},
  // Dry-stone Bancal Central top & sunny south face
  {pts:[[-11.2,4.04,0.49],[-8.2,3.92,0.49],[-5.2,3.80,0.49]],speed:0.80,phase:0.4,sc:1.55,v:0},
  {pts:[[-4.4,3.77,0.49],[-1.2,3.64,0.49],[2.0,3.52,0.49]],speed:0.74,phase:2.1,sc:1.60,v:2},
  {pts:[[2.8,3.49,0.49],[6.2,3.36,0.49],[9.6,3.22,0.49]],speed:0.78,phase:3.9,sc:1.50,v:1},
  {pts:[[10.2,3.18,0.49],[12.6,3.09,0.49],[14.6,3.01,0.49]],speed:0.71,phase:1.1,sc:1.45,v:3},
  {pts:[[-2.6,4.35,0.02],[0.8,4.22,0.02],[4.0,4.10,0.02]],speed:0.84,phase:4.8,sc:1.54,v:0},
  // Claro Central & Intervenciones (ESC-047..051)
  {pts:[[-9.8,6.2,0.02],[-7.2,7.1,0.02],[-4.6,6.9,0.02]],speed:0.73,phase:1.5,sc:1.50,v:2},
  {pts:[[-3.4,6.7,0.02],[-0.4,6.9,0.02],[2.6,7.1,0.02]],speed:0.79,phase:3.3,sc:1.58,v:0},
  {pts:[[3.4,7.2,0.02],[6.2,7.3,0.02],[8.8,6.4,0.02]],speed:0.75,phase:0.8,sc:1.48,v:1},
  {pts:[[-2.4,2.0,0.02],[0.4,2.6,0.02],[2.6,4.2,0.02]],speed:0.77,phase:2.6,sc:1.52,v:2},
  // Caseta-Taller Porch & East Path (MOV-025 & ESC-052)
  {pts:[[15.0,-1.4,0.02],[13.4,1.2,0.02],[11.2,3.6,0.02]],speed:0.76,phase:1.9,sc:1.54,v:0},
  {pts:[[16.8,-3.8,0.02],[15.6,-1.6,0.02],[16.2,1.2,0.02]],speed:0.70,phase:4.4,sc:1.48,v:3}
 ];
 lizRoutes.forEach(lr=>{
  const cPts=lr.pts.map(([px,pz,dy])=>V(px,parcelaHeightAt(px,pz)+(dy||0.02),pz));
  const curveObj=new THREE.CatmullRomCurve3(cPts);
  const p0=cPts[0];
  const liz=addLizard(scene,[p0.x,p0.y,p0.z],0,lr.sc,world,lr.v);
  const rig=liz.userData.lizardRig;
  rig.routeCurve=curveObj;
  rig.routeSpeed=lr.speed;
  rig.phase=lr.phase;
  rig.startleBoost=0;
 });
}
export function setGardenTimeOfDay(world,mode,instant=false){
 if(!world)return;
 world.timeOfDayMode=mode;
 if(world.skySystem){
  world.skySystem.mode=mode;
  if(mode==='day')world.skySystem.targetBlend=0;
  else if(mode==='sunset')world.skySystem.targetBlend=0.5;
  else if(mode==='night')world.skySystem.targetBlend=1.0;
  if(instant){
   world.skySystem.blend=world.skySystem.targetBlend;
   applySkyBlend(world,world.skySystem.blend);
  }
 }else{
  const isNight=(mode==='night'),isSun=(mode==='sunset');
  const dayBg=world.id==='mobiles'?'#e8eee8':world.id==='curvos'?'#eae8df':'#e8ece5';
  const bg=isNight?'#161e2b':isSun?'#e2d2c3':dayBg;
  if(world.scene.background)world.scene.background.set(bg);
  if(world.scene.fog)world.scene.fog.color.set(bg);
  if(world.hemi){
   world.hemi.color.set(isNight?'#485e88':isSun?'#ffe2c4':'#f7fbf8');
   world.hemi.groundColor.set(isNight?'#2a241d':isSun?'#96826c':'#beb7a5');
   world.hemi.intensity=isNight?1.08:isSun?1.72:2.25;
  }
  if(world.sun){
   world.sun.color.set(isNight?'#ffdfa8':isSun?'#ffb478':'#fff8e9');
   world.sun.intensity=isNight?1.85:isSun?2.35:2.85;
  }
  if(world.skylightMats){
   for(const sm of world.skylightMats){
    sm.color.set(isNight?'#1e2b42':isSun?'#ffe0ba':'#fcfaf0');
    if(sm.emissive){
     sm.emissive.set(isNight?'#162238':isSun?'#ffb870':'#fff6db');
     sm.emissiveIntensity=isNight?0.22:isSun?0.52:0.38;
    }
   }
  }
  if(world.spotLensMats){
   for(const lm of world.spotLensMats){
    lm.color.set(isNight?'#ffe49e':isSun?'#ffebb5':'#fff3cf');
   }
  }
  if(world.wallWashMats){
   for(const wm of world.wallWashMats){
    wm.opacity=isNight?0.32:isSun?0.16:0;
   }
  }
  if(world.vestibuleMats){
   for(const vm of world.vestibuleMats){
    vm.color.set(isNight?'#1b2538':isSun?'#ffd9b0':'#f4f1e4');
   }
  }
  if(world.indoorBeams){
   world.indoorBeams.opacity=isNight?0.004:isSun?0.012:0;
   world.indoorBeams.color.set(isSun?'#ffcc8e':'#fff7da');
  }
 }
 world.dirty=true;
}
export function getGardenTimeOfDay(world){
 return world?.skySystem?.mode||world?.timeOfDayMode||'day';
}
export function setWorldNightMode(world,isNight){
 setGardenTimeOfDay(world,isNight===true?'night':typeof isNight==='string'?isNight:'day',true);
}

export function createGarden(){
 const scene=new THREE.Scene();
 scene.background=new THREE.Color('#dce9f2');
 scene.environment=getGardenEnvMap();
 scene.fog=new THREE.Fog('#dce9f2',48,118);
 const boundaryPolygon=[
  [-32.0,2.8],[-20.4,-1.55],[-11.8,-4.77],[-4.37,-7.66],[2.31,-10.10],[8.23,-12.66],
  [15.8,-17.2],[20.3,-20.9],[26.5,-8.5],[28.5,6.5],[22.1,16.5],[1.0,14.0],[-14.0,16.5],[-30.5,12.5]
 ];
 const world={
  id:'garden',scene,works:[],mobiles:[],pickables:[],colliders:[],lizards:[],assetErrors:[],
  bounds:{minX:-32,maxX:28,minZ:-21,maxZ:16.5},
  boundaryPolygon,
  heightAt:parcelaHeightAt,
  dirty:true
 };
 lights(world,true);
 const fLight=new THREE.PointLight('#fff4d8',0,7.8,1.5);
 scene.add(fLight);world.focusLight=fLight;
 const floorGeo=new THREE.PlaneGeometry(86,62,110,80);
 floorGeo.rotateX(-Math.PI/2);
 const posAttr=floorGeo.attributes.position;
 const colors=new Float32Array(posAttr.count*3);
 for(let i=0;i<posAttr.count;i++){
  const vx=posAttr.getX(i),vz=posAttr.getZ(i);
  const vy=parcelaHeightAt(vx,vz);
  posAttr.setY(i,vy);
  const rz=parcelaRoadZ(vx);
  const onRoad=Math.abs(vz-(rz-1.6))<2.1;
  const pathDist=Math.min(
   Math.hypot(vx-6,vz+5)*0.12,
   Math.abs(vz-(0.18*vx-1.5))*0.28,
   Math.hypot(vx+5,vz+1)*0.15
  );
  const isPath=onRoad||pathDist<0.48;
  const n=0.94+0.06*Math.sin(vx*0.7)*Math.cos(vz*0.7);
  colors[i*3]=(isPath?0.84:0.74)*n;
  colors[i*3+1]=(isPath?0.76:0.66)*n;
  colors[i*3+2]=(isPath?0.58:0.46)*n;
 }
 floorGeo.setAttribute('color',new THREE.BufferAttribute(colors,3));
 floorGeo.computeVertexNormals();
 const floorTex=groundTexture(true);
 const floor=new THREE.Mesh(floorGeo,new THREE.MeshStandardMaterial({map:floorTex,bumpMap:floorTex,bumpScale:0.028,vertexColors:true,roughness:0.93}));
 floor.receiveShadow=true;floor.userData.isFloor=true;
 scene.add(floor);world.floor=floor;world.pickables.push(floor);
 addWalkRing(world);
 meadow(world);
 // Lajas de piedra caliza natural a lo largo de los senderos principales del jardín
 const stoneWaypoints=[
  [15.0,-16.2],[13.6,-14.4],[12.0,-12.4],[10.2,-10.2],[8.2,-8.2],[5.8,-6.2],[3.4,-4.2],[1.0,-2.3],[-1.6,-0.8],[-4.0,0.4],[-6.2,1.2],[-9.2,1.0],[-12.5,0.8],[-15.8,0.7],[-19.5,0.8],[-23.5,1.0],
  [15.2,-0.8],[12.8,1.8],[10.2,4.4],[7.4,6.6],[4.2,7.2],[0.8,7.0],[-2.5,6.6],[-4.2,4.2]
 ];
 const slabMatA=mat('#d6ccb6',0.86),slabMatB=mat('#c8bca2',0.88);
 stoneWaypoints.forEach(([sx,sz],idx)=>{
  const sy=parcelaHeightAt(sx,sz);
  const slab=new THREE.Mesh(cylinderGeo,idx%2?slabMatA:slabMatB);
  slab.scale.set(0.42+(idx%3)*0.08,0.032,0.34+((idx+1)%3)*0.07);
  slab.position.set(sx,sy+0.012,sz);
  slab.rotation.y=idx*0.85;
  slab.receiveShadow=true;scene.add(slab);
 });
 for(const [hx,hz,rx,ry,rz,col] of [
  [-28,-38,34,6.5,16,'#8fa382'],[18,-42,32,7.2,15,'#839876'],
  [44,-8,22,5.8,28,'#8da07f'],[-44,12,24,6.2,28,'#869978'],[0,42,38,5.4,16,'#92a483']
 ]){
  const hill=new THREE.Mesh(sphereGeo,mat(col,0.95));
  hill.position.set(hx,parcelaHeightAt(0,0)-1.8,hz);hill.scale.set(rx,ry,rz);scene.add(hill);
 }
 buildWoodenCaseta(world);
 buildEntrancesAndAcequias(world);
 addAlgarrobo(world,-6.2,-2.0);
 addTallCompanionPine(world,-10.5,-2.6);
 addAlmendroV(world,2.2,-5.2);
 addGeometricFoamTree(world,-2.2,-4.3);
 addBlueBottleTree(world,-1.2,2.4);
 const mov28Anchor=[9.5,parcelaHeightAt(9.5,-8.5)+2.42,-8.5];
 const mov26Anchor=[12.3,parcelaHeightAt(12.3,-3.5)+2.38,-3.5];
 const mov23Anchor=[8.0,parcelaHeightAt(8.0,4.9)+2.38,4.9];
 addMediterraneanTree(world,10.3,-8.9,4.9,21,'almond',true,mov28Anchor);
 addMediterraneanTree(world,6.8,-11.5,4.5,22,'almond',true);
 addMediterraneanTree(world,14.5,-11.5,4.6,23,'almond',true);
 addMediterraneanTree(world,13.3,-3.9,5.0,24,'olive',true,mov26Anchor);
 addMediterraneanTree(world,9.0,5.3,4.8,31,'olive',true,mov23Anchor);
 addMediterraneanTree(world,3.8,1.8,4.2,32,'olive',true);
 addMediterraneanTree(world,15.5,6.8,4.5,33,'olive',false);
 addMediterraneanTree(world,-18.5,1.2,4.8,34,'olive',true);
 addMediterraneanTree(world,-23.0,5.5,4.5,35,'olive',false);
 const pines=[
  [-16.8,8.8,7.0,43],[-10.2,12.2,7.4,44],[-2.5,13.2,7.2,45],
  [5.5,12.6,6.8,46],[12.8,11.5,6.6,47],[20.2,9.8,6.4,48]
 ];
 for(const [px,pz,ph,ps] of pines)addMediterraneanTree(world,px,pz,ph,ps,'pine',false);
 addChumbera(world,-14.2,-3.8,1.15,51);
 addChumbera(world,-21.8,-0.8,1.05,52);
 addChumbera(world,-26.5,3.8,1.1,53);
 addChumbera(world,-2.8,-7.2,0.95,54);
 addAgave(world,-11.5,-4.2,1.1,true);
 addAgave(world,-17.5,-1.8,1.0,false);
 addAgave(world,4.5,-10.2,1.05,true);
 addAgave(world,13.2,-14.5,0.9,false);
 addYuccaTree(world,-15.2,3.5,2.4,61);
 addYuccaTree(world,-8.8,7.2,2.2,62);
 const rand=rng(404);
 const shrubCols=['#5a7848','#6c8856','#738264','#4e6b3e','#7e7894'];
 for(let i=0;i<75;i++){
  const sx=(rand()-0.5)*48-2,sz=(rand()-0.5)*26;
  if(sx>16.0&&sx<26.0&&sz>-6.5&&sz<7.5)continue;
  if(Math.hypot(sx+6.2,sz+2.0)<2.6)continue;
  if(Math.hypot(sx-2.2,sz+5.2)<2.8||Math.hypot(sx+2.2,sz+4.3)<2.4||Math.hypot(sx+1.2,sz-2.4)<2.4||Math.hypot(sx+5.2,sz-3.2)<2.4)continue;
  const sy=parcelaHeightAt(sx,sz);
  const sh=new THREE.Mesh(sphereGeo,mat(shrubCols[i%shrubCols.length],0.9));
  const r=0.22+rand()*0.30;
  sh.scale.set(r*1.3,r*0.62,r*(0.9+rand()*0.4));
  sh.position.set(sx,sy+r*0.24,sz);
  sh.castShadow=true;sh.receiveShadow=true;scene.add(sh);
 }
 const mov16=addHangingMobile3D(world,'mov016',[-7.65,parcelaHeightAt(-7.65,-1.65)+2.38,-1.65],parcelaHeightAt(-7.65,-1.65)+2.48,0.80,'branch');
 if(mov16){mov16.baseRotation=-0.38;mov16.object.rotation.y=mov16.baseRotation;mov16.view.set(-8.75,Math.max(1.72,mov16.center.y),1.05);}
 const mov19=addHangingMobile3D(world,'mov019',[-6.05,parcelaHeightAt(-6.05,-0.82)+2.42,-0.82],parcelaHeightAt(-6.05,-0.82)+2.52,0.80,'branch');
 if(mov19){mov19.baseRotation=0.08;mov19.object.rotation.y=mov19.baseRotation;mov19.view.set(-5.85,Math.max(1.72,mov19.center.y),1.95);}
 const mov18=addHangingMobile3D(world,'mov018',[-4.65,parcelaHeightAt(-4.65,-1.35)+2.42,-1.35],parcelaHeightAt(-4.65,-1.35)+2.52,0.76,'branch');
 if(mov18){mov18.baseRotation=0.45;mov18.object.rotation.y=mov18.baseRotation;mov18.view.set(-3.45,Math.max(1.72,mov18.center.y),1.25);}
 const mov25=addHangingMobile3D(world,'mov025',[18.0,parcelaHeightAt(18.0,0.2)+2.74,0.2],parcelaHeightAt(18.0,0.2)+3.05,0.82,'pergola');
 if(mov25){mov25.baseRotation=-Math.PI/2;mov25.object.rotation.y=mov25.baseRotation;mov25.view.set(15.15,Math.max(1.72,mov25.center.y),0.2);}
 const mov26=addHangingMobile3D(world,'mov026',[mov26Anchor[0],mov26Anchor[1]-0.04,mov26Anchor[2]],mov26Anchor[1]+0.04,0.84,'branch');
 if(mov26){mov26.baseRotation=-1.15;mov26.object.rotation.y=mov26.baseRotation;mov26.view.set(mov26Anchor[0]-2.55,Math.max(1.72,mov26.center.y),mov26Anchor[2]+1.15);}
 const mov28=addHangingMobile3D(world,'mov028',[mov28Anchor[0],mov28Anchor[1]-0.04,mov28Anchor[2]],mov28Anchor[1]+0.04,0.80,'branch');
 if(mov28){mov28.baseRotation=-1.15;mov28.object.rotation.y=mov28.baseRotation;mov28.view.set(mov28Anchor[0]-2.55,Math.max(1.72,mov28.center.y),mov28Anchor[2]+1.15);}
 const mov23=addHangingMobile3D(world,'mov023',[mov23Anchor[0],mov23Anchor[1]-0.04,mov23Anchor[2]],mov23Anchor[1]+0.04,0.84,'branch');
 if(mov23){mov23.baseRotation=-1.95;mov23.object.rotation.y=mov23.baseRotation;mov23.view.set(mov23Anchor[0]-2.55,Math.max(1.72,mov23.center.y),mov23Anchor[2]-1.05);}
 // 6 Intervenciones en el entorno (ESC-047 a ESC-052) integradas con geometría 3D 100% fiel a las fotografías reales del archivo
 const buildPuzzleFoamTile3D=(col,glyph='O')=>{
  const hs=0.086,tr=0.019;
  const sh=new THREE.Shape();
  // Square puzzle-mat tile outline with 2 interlocking puzzle tabs per edge (matching ARC-014978)
  sh.moveTo(-hs,-hs);
  sh.lineTo(-hs*0.38,-hs);sh.lineTo(-hs*0.42,-hs-tr);sh.lineTo(-hs*0.14,-hs-tr);sh.lineTo(-hs*0.18,-hs);
  sh.lineTo(hs*0.18,-hs);sh.lineTo(hs*0.14,-hs+tr*0.85);sh.lineTo(hs*0.42,-hs+tr*0.85);sh.lineTo(hs*0.38,-hs);
  sh.lineTo(hs,-hs);
  sh.lineTo(hs,-hs*0.38);sh.lineTo(hs+tr,-hs*0.42);sh.lineTo(hs+tr,-hs*0.14);sh.lineTo(hs,-hs*0.18);
  sh.lineTo(hs,hs*0.18);sh.lineTo(hs-tr*0.85,hs*0.14);sh.lineTo(hs-tr*0.85,hs*0.42);sh.lineTo(hs,hs*0.38);
  sh.lineTo(hs,hs);
  sh.lineTo(hs*0.38,hs);sh.lineTo(hs*0.42,hs+tr);sh.lineTo(hs*0.14,hs+tr);sh.lineTo(hs*0.18,hs);
  sh.lineTo(-hs*0.18,hs);sh.lineTo(-hs*0.14,hs-tr*0.85);sh.lineTo(-hs*0.42,hs-tr*0.85);sh.lineTo(-hs*0.38,hs);
  sh.lineTo(-hs,hs);
  sh.lineTo(-hs,hs*0.38);sh.lineTo(-hs-tr,hs*0.42);sh.lineTo(-hs-tr,hs*0.14);sh.lineTo(-hs,hs*0.18);
  sh.lineTo(-hs,-hs*0.18);sh.lineTo(-hs+tr*0.85,-hs*0.14);sh.lineTo(-hs+tr*0.85,-hs*0.42);sh.lineTo(-hs,-hs*0.38);
  sh.closePath();
  // Cut-out central letter/number stencil hole (CW winding for hole)
  const hole=new THREE.Path();
  if(glyph==='L'){
   hole.moveTo(-0.032,0.048);hole.lineTo(-0.012,0.048);hole.lineTo(-0.012,-0.026);hole.lineTo(0.034,-0.026);hole.lineTo(0.034,-0.046);hole.lineTo(-0.032,-0.046);hole.closePath();
  }else if(glyph==='E'){
   hole.moveTo(-0.034,0.048);hole.lineTo(0.034,0.048);hole.lineTo(0.034,0.030);hole.lineTo(-0.014,0.030);hole.lineTo(-0.014,0.008);hole.lineTo(0.026,0.008);hole.lineTo(0.026,-0.008);hole.lineTo(-0.014,-0.008);hole.lineTo(-0.014,-0.030);hole.lineTo(0.034,-0.030);hole.lineTo(0.034,-0.048);hole.lineTo(-0.034,-0.048);hole.closePath();
  }else if(glyph==='N'){
   hole.moveTo(-0.036,0.046);hole.lineTo(-0.016,0.046);hole.lineTo(0.016,-0.014);hole.lineTo(0.016,0.046);hole.lineTo(0.036,0.046);hole.lineTo(0.036,-0.046);hole.lineTo(0.016,-0.046);hole.lineTo(-0.016,0.014);hole.lineTo(-0.016,-0.046);hole.lineTo(-0.036,-0.046);hole.closePath();
  }else if(glyph==='2'){
   hole.moveTo(-0.032,0.030);hole.lineTo(-0.032,0.048);hole.lineTo(0.032,0.048);hole.lineTo(0.032,0.004);hole.lineTo(-0.012,-0.028);hole.lineTo(0.034,-0.028);hole.lineTo(0.034,-0.048);hole.lineTo(-0.034,-0.048);hole.lineTo(-0.034,-0.022);hole.lineTo(0.012,0.012);hole.lineTo(0.012,0.030);hole.closePath();
  }else if(glyph==='4'){
   hole.moveTo(0.008,0.048);hole.lineTo(0.028,0.048);hole.lineTo(0.028,-0.048);hole.lineTo(0.008,-0.048);hole.lineTo(0.008,-0.014);hole.lineTo(-0.034,-0.014);hole.lineTo(-0.034,0.006);hole.closePath();
  }else{
   hole.absarc(0,0,0.036,0,Math.PI*2,true);
  }
  sh.holes.push(hole);
  const geo=new THREE.ExtrudeGeometry(sh,{depth:0.014,bevelEnabled:true,bevelThickness:0.002,bevelSize:0.0015,bevelSegments:1,curveSegments:8});
  geo.translate(0,0,-0.007);
  const mesh=new THREE.Mesh(geo,mat(col,0.58,0.03));
  mesh.castShadow=true;mesh.receiveShadow=true;
  return mesh;
 };
 const buildHouseholdKey3D=(keyMat,darkMat)=>{
  const kg=new THREE.Group();
  // Round/hex key bow with lanyard hole
  const bow=new THREE.Mesh(cylinderGeo,keyMat);
  bow.rotation.x=Math.PI/2;bow.scale.set(0.021,0.0042,0.021);bow.position.y=0.056;bow.castShadow=true;kg.add(bow);
  const bowHole=new THREE.Mesh(cylinderGeo,darkMat);
  bowHole.rotation.x=Math.PI/2;bowHole.scale.set(0.007,0.0052,0.007);bowHole.position.y=0.064;kg.add(bowHole);
  // Key blade with bitting notches
  const blade=new THREE.Mesh(boxGeo,keyMat);
  blade.scale.set(0.010,0.050,0.0034);blade.position.y=0.016;blade.castShadow=true;kg.add(blade);
  for(const [ny,nw] of [[0.004,0.006],[0.018,0.008],[0.030,0.005]]){
   const tooth=new THREE.Mesh(boxGeo,keyMat);
   tooth.scale.set(nw,0.005,0.0034);tooth.position.set(0.004,ny,0);kg.add(tooth);
  }
  return kg;
 };
 const gardenIntervenciones=[
  {id:'esc047',x:-11.4,z:5.8,rot:0.12},
  {id:'esc048',x:-6.4,z:8.2,rot:0.05},
  {id:'esc049',x:-1.6,z:8.6,rot:0.02},
  {id:'esc050',x:3.2,z:8.4,rot:0.10},
  {id:'esc051',x:2.0,z:5.2,rot:-0.05},
  {id:'esc052',x:16.4,z:-2.6,rot:-0.12}
 ];
 gardenIntervenciones.forEach(gi=>{
  const gy=parcelaHeightAt(gi.x,gi.z);
  const anchor=new THREE.Group();anchor.position.set(gi.x,gy,gi.z);anchor.rotation.y=gi.rot||0;world.scene.add(anchor);
  const pivot=new THREE.Group();pivot.scale.setScalar(1.28);anchor.add(pivot);
  const bBark=(gi.id==='esc047'||gi.id==='esc050')?'#bdb5a4':'#6b5d4e';
  let customCenter=V(gi.x,gy+1.18,gi.z),customView=null,customRadius=2.65;
  let regOpts={billboardScale:1.28,displayScale:1.28,groundCutout:true};
  if(gi.id==='esc047'){
   // ESC-047: Árbol seco ramificado en alcorque de piedras ocres/terracota con 12 botellas cuadradas azul cobalto (fiel a ARC-014959..63)
   const stCols=['#d4b894','#c89672','#dcd0bc','#b88462','#c6b49a','#a87858'];
   for(let s=0;s<28;s++){
    const sa=(s/28)*Math.PI*2+(s%3)*0.08,sr=0.72+(s%2)*0.06;
    const rk=new THREE.Mesh(rockFacetedGeo,mat(stCols[s%stCols.length],0.88));
    rk.scale.set(0.11+(s%3)*0.025,0.075+(s%2)*0.02,0.095+(s%4)*0.018);
    rk.position.set(Math.cos(sa)*sr,0.055,Math.sin(sa)*sr);
    rk.rotation.set(s*0.7,s*1.1,s*0.4);rk.castShadow=true;rk.receiveShadow=true;pivot.add(rk);
   }
   taperedBranch(pivot,[[0,-0.04,0],[0.02,0.22,0],[-0.01,0.46,0]],0.12,0.09,bBark,12,10,false);
   const arms=[
    [[-0.01,0.42,0],[-0.30,0.82,0.16],[-0.62,1.22,0.28],[-0.88,1.56,0.36]],
    [[-0.01,0.44,0],[0.28,0.86,-0.14],[0.58,1.26,-0.24],[0.84,1.62,-0.32]],
    [[-0.01,0.45,0],[0.12,0.92,0.22],[0.24,1.34,0.42],[0.34,1.68,0.54]],
    [[-0.01,0.45,0],[-0.14,0.94,-0.20],[-0.28,1.36,-0.38],[-0.38,1.70,-0.48]],
    [[-0.30,0.82,0.16],[-0.54,1.18,-0.10],[-0.72,1.48,-0.22]],
    [[0.28,0.86,-0.14],[0.52,1.20,0.14],[0.70,1.50,0.26]],
    [[0.02,0.46,0],[-0.04,1.02,0.04],[-0.08,1.58,0.06]]
   ];
   arms.forEach(pts=>{
    taperedBranch(pivot,pts,0.056,0.016,bBark,12,8,false);
    const mid=pts[1],tip=pts[pts.length-1];
    taperedBranch(pivot,[mid,[mid[0]*1.15,mid[1]+0.28,mid[2]*1.15]],0.024,0.010,bBark,6,6,false);
    taperedBranch(pivot,[tip,[tip[0]*1.08,tip[1]+0.22,tip[2]*1.08]],0.016,0.008,bBark,5,6,false);
   });
   const bMat=new THREE.MeshStandardMaterial({color:'#1258c8',roughness:0.16,metalness:0.10,transparent:true,opacity:0.90});
   const capMat=mat('#dce4ee',0.32,0.35);
   const bLocs=[
    [-0.72,1.34,0.31,0.14],[-0.46,1.02,0.22,0.18],[-0.64,1.34,-0.18,0.16],
    [-0.28,1.34,-0.36,0.15],[-0.06,1.22,0.05,0.18],[0.20,1.24,0.36,0.16],
    [0.32,1.56,0.50,0.15],[0.46,1.10,-0.19,0.17],[0.74,1.48,-0.28,0.14],
    [0.62,1.38,0.22,0.16],[0.12,0.92,0.20,0.19],[-0.18,0.96,-0.18,0.17]
   ];
   bLocs.forEach(([bx,by,bz,drop],bi)=>{
    const sp=new THREE.Group();sp.position.set(bx,by,bz);
    sp.userData.kineticSway={baseRotY:bi*0.4,spinSpeed:0.82+(bi%4)*0.11,phase:bi*1.1,amp:0.20,swayZ:0.05,swayX:0.04};
    rod(sp,[0,0,0],[0,-drop,0],0.0020,'#9aa094');
    const bg=new THREE.Group();bg.position.set(0,-drop-0.105,0);
    const body=new THREE.Mesh(boxGeo,bMat);body.scale.set(0.056,0.165,0.056);body.castShadow=true;bg.add(body);
    const shoulder=new THREE.Mesh(new THREE.CylinderGeometry(0.016,0.036,0.032,4),bMat);
    shoulder.rotation.y=Math.PI/4;shoulder.position.y=0.098;bg.add(shoulder);
    const neck=new THREE.Mesh(cylinderGeo,bMat);neck.scale.set(0.013,0.038,0.013);neck.position.y=0.128;bg.add(neck);
    const cap=new THREE.Mesh(cylinderGeo,capMat);cap.scale.set(0.015,0.016,0.015);cap.position.y=0.150;bg.add(cap);
    sp.add(bg);pivot.add(sp);
   });
   customCenter=V(gi.x,gy+1.10,gi.z);
   customView=V(gi.x,parcelaHeightAt(gi.x,gi.z+3.10)+1.52,gi.z+3.10);
  }else if(gi.id==='esc048'){
   // ESC-048: Tronco anfitrión en anchor (permanece visible en modo fotografía) + 3 paneles curvados de tapones en pivot
   const hostTree=new THREE.Group();hostTree.scale.setScalar(1.28);anchor.add(hostTree);
   taperedBranch(hostTree,[[-0.26,-0.06,0],[-0.20,0.95,0.02],[-0.13,1.95,0.03],[-0.06,2.85,0.04]],0.21,0.145,'#6b5848',16,12,false);
   taperedBranch(hostTree,[[-0.14,2.12,0.03],[0.14,2.18,0.04],[0.36,2.22,0.05]],0.058,0.024,'#6b5848',10,8,true);
   const dp=new THREE.Group();dp.position.set(0.14,2.10,0.08);
   dp.userData.kineticSway={baseRotY:0,spinSpeed:0.68,phase:0.8,amp:0.18,swayZ:0.035,swayX:0.028};
   rod(dp,[0,0.06,0],[0,-1.48,0],0.0032,'#9e9a8e');
   const capPalette=['#e02824','#1860d0','#f2c414','#249e48','#f06818','#e44882','#22262a','#22a6e8','#8838b8'];
   const panelDefs=[
    {cy:-0.26,w:0.22,h:0.33,rz:-0.14,ry:0.08},
    {cy:-0.69,w:0.22,h:0.35,rz:0.06,ry:-0.06},
    {cy:-1.14,w:0.24,h:0.37,rz:0.01,ry:0.04}
   ];
   panelDefs.forEach((pd,pi)=>{
    const pg=new THREE.Group();pg.position.set(0,pd.cy,0);pg.rotation.set(0,pd.ry,pd.rz);
    const curvedPanel=new THREE.Mesh(
     new THREE.CylinderGeometry(pd.w*0.56,pd.w*0.56,pd.h,18,1,false,-Math.PI*0.48,Math.PI*0.96),
     new THREE.MeshStandardMaterial({color:'#f4f3ee',roughness:0.52,side:THREE.DoubleSide})
    );
    curvedPanel.castShadow=true;curvedPanel.receiveShadow=true;pg.add(curvedPanel);
    const rows=9,cols=7;
    for(let r=0;r<rows;r++){
     for(let c=0;c<cols;c++){
      if((r+c+pi)%11===0)continue;
      const ang=((c/(cols-1))-0.5)*Math.PI*0.84+(((r+pi)%2)-0.5)*0.05;
      const py=((r/(rows-1))-0.5)*(pd.h-0.042);
      const rad=pd.w*0.56+0.006;
      const col=capPalette[(r*5+c*3+pi*7)%capPalette.length];
      const capR=0.016+((r+c)%3)*0.0025;
      const cap=addBottleCap3D(pg,[Math.sin(ang)*rad,py,Math.cos(ang)*rad],null,col,capR,0.011);
      cap.quaternion.setFromUnitVectors(V(0,1,0),V(Math.sin(ang),0,Math.cos(ang)));
     }
    }
    dp.add(pg);
   });
   pivot.add(dp);
   regOpts={billboardScale:1.28,displayScale:1.28,groundCutout:false,clampFrontAngle:true};
   customCenter=V(gi.x+0.18,gy+1.66,gi.z+0.14);
   customView=V(gi.x+0.10,parcelaHeightAt(gi.x+0.10,gi.z+2.75)+1.58,gi.z+2.75);
  }else if(gi.id==='esc049'){
   populateEsc049Geometry(pivot);
   customCenter=V(gi.x,gy+0.86,gi.z);
   customView=V(gi.x,parcelaHeightAt(gi.x,gi.z+3.35)+1.18,gi.z+3.35);
   customRadius=2.95;
  }else if(gi.id==='esc050'){
   // ESC-050: Árbol de corteza clara podado con 9 losetas cuadradas dentadas de puzzle de goma EVA con letras/números calados (fiel a ARC-014978)
   taperedBranch(pivot,[[0,-0.02,0],[0.02,0.44,0.01],[0.03,0.88,0.02]],0.088,0.062,bBark,12,9,false);
   const sArms=[
    [[0.03,0.84,0.02],[-0.32,1.18,0.12],[-0.68,1.48,0.20]],
    [[0.03,0.86,0.02],[0.34,1.20,-0.08],[0.68,1.52,-0.14]],
    [[0.03,0.88,0.02],[-0.10,1.30,-0.14],[-0.20,1.66,-0.22]],
    [[0.03,0.88,0.02],[0.16,1.32,0.14],[0.26,1.68,0.22]],
    [[-0.32,1.18,0.12],[-0.48,1.52,-0.06]],
    [[0.34,1.20,-0.08],[0.52,1.54,0.10]]
   ];
   sArms.forEach(pts=>taperedBranch(pivot,pts,0.044,0.016,bBark,10,7,true));
   const tileSpecs=[
    {pos:[-0.64,1.44,0.18],col:'#8c6ad8',glyph:'E',drop:0.14,rz:0.12},
    {pos:[-0.44,1.46,-0.04],col:'#f08030',glyph:'O',drop:0.16,rz:-0.10},
    {pos:[-0.46,1.12,0.14],col:'#f5df38',glyph:'2',drop:0.22,rz:0.08},
    {pos:[-0.22,1.26,0.08],col:'#eb5a78',glyph:'3',drop:0.14,rz:-0.08},
    {pos:[-0.16,1.56,-0.18],col:'#16c2c8',glyph:'R',drop:0.13,rz:0.14},
    {pos:[0.04,1.08,0.10],col:'#f2648c',glyph:'4',drop:0.15,rz:0.06},
    {pos:[0.14,1.02,0.06],col:'#f5df38',glyph:'O',drop:0.19,rz:-0.12},
    {pos:[0.26,1.58,0.18],col:'#22d4b8',glyph:'L',drop:0.14,rz:-0.06},
    {pos:[0.50,1.46,0.08],col:'#b89ce0',glyph:'O',drop:0.18,rz:0.10},
    {pos:[0.62,1.44,-0.12],col:'#2c8ce8',glyph:'N',drop:0.22,rz:-0.08}
   ];
   tileSpecs.forEach((ts,fi)=>{
    const lp=new THREE.Group();lp.position.set(...ts.pos);
    lp.userData.kineticSway={baseRotY:fi*0.42,spinSpeed:0.84+fi*0.06,phase:fi*1.1,amp:0.26,swayZ:0.045,swayX:0.035};
    rod(lp,[0,0,0],[0,-ts.drop,0],0.0022,'#9e9a90');
    const fr=buildPuzzleFoamTile3D(ts.col,ts.glyph);
    fr.position.set(0,-ts.drop-0.088,0);
    fr.rotation.z=ts.rz;
    lp.add(fr);pivot.add(lp);
   });
   customCenter=V(gi.x,gy+1.08,gi.z);
   customView=V(gi.x,parcelaHeightAt(gi.x,gi.z+3.05)+1.42,gi.z+3.05);
  }else if(gi.id==='esc051'){
   // ESC-051: Plato y biela de bicicleta de acero plateado con piñón interior "ACERO TEMPLADO", 20 llaves domésticas radiales y 1 llave dorada de latón arriba (100% fiel a ARC-015032)
   const hostTree51=new THREE.Group();hostTree51.scale.setScalar(1.28);anchor.add(hostTree51);
   taperedBranch(hostTree51,[[-0.14,-0.04,0],[-0.05,0.62,0.01],[0.04,1.28,0.02],[0.12,1.92,0.03]],0.19,0.13,'#635648',14,12,false);
   taperedBranch(hostTree51,[[0.02,1.08,0.02],[-0.18,1.42,0.10],[-0.30,1.78,0.14]],0.10,0.062,'#635648',12,9,true);
   const med=new THREE.Group();med.position.set(-0.04,1.16,0.20);med.rotation.set(0.03,0.06,0);
   med.userData.kineticSway={baseRotY:0.06,spinSpeed:0.62,phase:0.5,amp:0.14,swayZ:0.025,swayX:0.02};
   rod(pivot,[-0.04,1.56,0.16],[-0.04,1.43,0.20],0.0030,'#1e7842');
   const steelMat=mat('#bcc2c0',0.32,0.82),nickelMat=mat('#cfd4d0',0.28,0.85),brassKeyMat=mat('#dbb03c',0.30,0.84),darkGearMat=mat('#2c3034',0.46,0.68);
   const R=0.205;
   // Outer silvery steel bicycle chainring + 48 sprocket teeth
   const outerRing=new THREE.Mesh(new THREE.RingGeometry(R-0.026,R+0.006,52),new THREE.MeshStandardMaterial({color:'#bcc2c0',roughness:0.32,metalness:0.82,side:THREE.DoubleSide}));
   outerRing.castShadow=true;med.add(outerRing);
   const outerRim=new THREE.Mesh(new THREE.TorusGeometry(R-0.010,0.0055,8,52),steelMat);
   med.add(outerRim);
   for(let t=0;t<48;t++){
    const ta=(t/48)*Math.PI*2;
    const tooth=new THREE.Mesh(boxGeo,steelMat);
    tooth.scale.set(0.008,0.013,0.005);
    tooth.position.set(Math.cos(ta)*(R+0.009),Math.sin(ta)*(R+0.009),0);
    tooth.rotation.z=ta-Math.PI/2;med.add(tooth);
   }
   // Central 24-tooth inner chainring ("ACERO TEMPLADO") + 5 bicycle crank spider arms
   const innerR=0.092;
   const innerRing=new THREE.Mesh(new THREE.RingGeometry(0.032,innerR,36),new THREE.MeshStandardMaterial({color:'#aeb4b2',roughness:0.36,metalness:0.78,side:THREE.DoubleSide}));
   innerRing.position.z=0.005;med.add(innerRing);
   for(let t=0;t<24;t++){
    const ta=(t/24)*Math.PI*2;
    const th=new THREE.Mesh(boxGeo,steelMat);
    th.scale.set(0.008,0.011,0.005);
    th.position.set(Math.cos(ta)*(innerR+0.005),Math.sin(ta)*(innerR+0.005),0.005);
    th.rotation.z=ta-Math.PI/2;med.add(th);
   }
   for(let sp=0;sp<5;sp++){
    const sa=Math.PI/2+(sp/5)*Math.PI*2;
    rod(med,[Math.cos(sa)*0.034,Math.sin(sa)*0.034,0.008],[Math.cos(sa)*(R-0.016),Math.sin(sa)*(R-0.016),0.003],0.011,'#c2c8c6');
    const chainBolt=new THREE.Mesh(cylinderGeo,darkGearMat);
    chainBolt.rotation.x=Math.PI/2;chainBolt.scale.set(0.007,0.012,0.007);
    chainBolt.position.set(Math.cos(sa)*(R-0.018),Math.sin(sa)*(R-0.018),0.006);med.add(chainBolt);
   }
   // Upright bicycle crank arm (biela) rising to 12 o'clock pedal boss + small 16-tooth cog on upper crank arm
   const crankArm=new THREE.Mesh(boxGeo,nickelMat);
   crankArm.scale.set(0.032,0.285,0.012);crankArm.position.set(0,0.132,0.015);crankArm.castShadow=true;med.add(crankArm);
   const hubBoss=new THREE.Mesh(cylinderGeo,nickelMat);
   hubBoss.rotation.x=Math.PI/2;hubBoss.scale.set(0.028,0.022,0.028);hubBoss.position.set(0,0,0.015);med.add(hubBoss);
   const pedalBoss=new THREE.Mesh(new THREE.TorusGeometry(0.018,0.0065,8,20),nickelMat);
   pedalBoss.position.set(0,0.278,0.015);med.add(pedalBoss);
   const topCog=new THREE.Mesh(cylinderGeo,darkGearMat);
   topCog.rotation.x=Math.PI/2;topCog.scale.set(0.038,0.012,0.038);topCog.position.set(0,0.196,0.022);med.add(topCog);
   for(let ct=0;ct<14;ct++){
    const ca=(ct/14)*Math.PI*2;
    const cth=new THREE.Mesh(boxGeo,darkGearMat);
    cth.scale.set(0.006,0.010,0.008);
    cth.position.set(Math.cos(ca)*0.042,0.196+Math.sin(ca)*0.042,0.022);
    cth.rotation.z=ca-Math.PI/2;med.add(cth);
   }
   // 18 radial silvery household keys bolted around the chainring perimeter + 4 inner hub keys
   for(let k=0;k<18;k++){
    const ka=(k/18)*Math.PI*2+0.16;
    if(Math.abs(Math.cos(ka))<0.18&&Math.sin(ka)>0.75)continue;
    const keyMesh=buildHouseholdKey3D(k%2?nickelMat:steelMat,darkGearMat);
    const kr=R-0.014;
    keyMesh.position.set(Math.cos(ka)*kr,Math.sin(ka)*kr,(k%2?0.007:-0.006));
    keyMesh.rotation.z=ka-Math.PI/2+((k%3)-1)*0.08;
    med.add(keyMesh);
   }
   for(let ik=0;ik<4;ik++){
    const ika=-0.35-ik*0.72;
    const iKey=buildHouseholdKey3D(nickelMat,darkGearMat);
    iKey.position.set(Math.cos(ika)*0.072,Math.sin(ika)*0.072,0.011);
    iKey.rotation.z=ika-Math.PI/2;
    med.add(iKey);
   }
   // Signature golden brass JMA key tucked vertically behind the upper crank arm at 12 o'clock (exact match to ARC-015032!)
   const goldKey=buildHouseholdKey3D(brassKeyMat,darkGearMat);
   goldKey.scale.setScalar(1.12);
   goldKey.position.set(-0.016,0.205,0.008);
   goldKey.rotation.z=0.08;
   med.add(goldKey);
   pivot.add(med);
   regOpts={billboardScale:1.28,displayScale:1.28,groundCutout:false,clampFrontAngle:true};
   customCenter=V(gi.x-0.05,gy+1.48,gi.z+0.26);
   customView=V(gi.x-0.05,parcelaHeightAt(gi.x-0.05,gi.z+2.25)+1.48,gi.z+2.25);
   customRadius=2.05;
  }else if(gi.id==='esc052'){
   populateEsc052Geometry(pivot,true);
   customCenter=V(gi.x-0.08,gy+1.24,gi.z);
   customView=V(gi.x-0.08,parcelaHeightAt(gi.x-0.08,gi.z+3.25)+1.42,gi.z+3.25);
  }
  world.colliders.push({x:gi.x,z:gi.z,r:0.64});
  softShadow(world.scene,gi.x,gi.z,2.5,0.22,gy);
  const gw=registerCustomGardenWork(world,gi.id,anchor,pivot,customCenter,customRadius,true,null,regOpts);
  if(gw&&customView)gw.view=customView;
 });
 world.mapFeatures={
  caseta:[21.86,0.78,3.84,12.32,-20.4],
  acequiaNorte:[[-32.0,2.2],[-16.0,-3.7],[-4.0,-8.1],[8.2,-12.8],[15.8,-17.2]],
  bancalCentral:[[-14.5,4.2],[-3.2,3.7],[5.2,3.4],[15.0,3.0]],
  senderos:[
   [[15.8,-17.2],[11.6,-11.8],[0.8,-2.2],[-5.8,1.2],[-16.8,0.6],[-28.0,1.2]],
   [[14.2,-1.2],[6.2,7.4],[-2.8,6.8],[-5.8,1.2]]
  ],
  trees:[
   [-6.2,-2.0,3.2,'algarrobo'],
   [-10.5,-2.6,2.2,'pine'],
   [2.2,-5.2,1.4,'almond'],
   [-2.2,-4.3,1.4,'almond'],
   [-1.2,2.4,1.5,'olive'],
   [-5.2,2.8,1.2,'reeds'],
   [10.3,-8.9,1.9,'almond'],[6.8,-11.5,1.8,'almond'],[14.5,-11.5,1.8,'almond'],
   [13.3,-3.9,1.9,'olive'],[9.0,5.3,1.9,'olive'],[3.8,1.8,1.8,'olive'],[15.5,6.8,1.9,'olive'],
   [-18.5,1.2,2.1,'olive'],[-23.0,5.5,2.0,'olive'],
   [-16.8,8.8,2.4,'pine'],[-10.2,12.2,2.5,'pine'],[-2.5,13.2,2.5,'pine'],
   [5.5,12.6,2.4,'pine'],[12.8,11.5,2.3,'pine'],[20.2,9.8,2.2,'pine']
  ]
 };
 const stopDefs=[
  {title:'Sendero de los Almendros y la Acequia (MOV-028)',x:7.5,z:-7.1,look:mov28?mov28.center.toArray():[9.5,1.6,-8.5],work:'mov028'},
  {title:'La Caseta-Taller de Madera y su Pérgola (MOV-025)',x:14.7,z:-0.6,look:mov25?mov25.center.toArray():[18.0,2.1,0.2],work:'mov025'},
  {title:'Los Almendros Escultóricos del Camino Norte (MOV-017 y MOV-032)',x:0.8,z:-2.2,look:[2.2,1.65,-5.2],work:'mov017'},
  {title:'Bajo la Copa del Gran Algarrobo (MOV-016, MOV-019 y MOV-018)',x:-5.8,z:1.2,look:mov19?mov19.center.toArray():[-6.05,1.6,-0.82],work:'mov019'},
  {title:'El Pino Alto (MOV-022), las Chumberas y la Entrada Oeste',x:-14.2,z:-0.3,look:[-11.55,1.7,-1.75],work:'mov022'},
  {title:'El Claro Central: Botellas Azules (MOV-033) y Juncos Rojos',x:-2.8,z:6.8,look:[-1.2,1.3,2.4],work:'mov033'},
  {title:'El Bancal de Piedra Seca y los Olivos del Este (MOV-023)',x:6.2,z:7.4,look:mov23?mov23.center.toArray():[8.0,1.6,4.9],work:'mov023'}
 ];
 world.stops=stopDefs.map(s=>({
  title:s.title,
  pos:[s.x,parcelaHeightAt(s.x,s.z)+1.72,s.z],
  look:s.look,
  work:s.work
 }));
 buildSkyAndClouds(world);
 buildGardenNightLights(world);
 addGardenBirds(world);
 addGardenSquirrels(world);
 addGardenAtmosphere(world);
 world.swayFoliage=[];
 scene.traverse(o=>{if(o.userData?.swayFoliage)world.swayFoliage.push(o);});
 world.stops.forEach((s,i)=>marker(world,i,s.pos[0],s.pos[2]));
 return world;
}
function addBottleCap3D(parent,pos,rot,color,radius=0.055,height=0.028){
 const g=new THREE.Group();
 g.position.set(...pos);
 if(rot)g.rotation.set(...rot);
 const capMat=mat(color,0.38,0.08);
 const innerMat=mat('#1f2421',0.75);
 const outer=new THREE.Mesh(cylinderGeo,capMat);
 outer.scale.set(radius,height,radius);
 outer.castShadow=true;outer.receiveShadow=true;
 g.add(outer);
 const recess=new THREE.Mesh(cylinderGeo,innerMat);
 recess.scale.set(radius*0.78,height*0.35,radius*0.78);
 recess.position.y=-height*0.36;
 g.add(recess);
 parent.add(g);
 return g;
}
function addFlowerGear3D(parent,pos,rot,color,radius=0.145){
 const g=new THREE.Group();
 g.position.set(...pos);
 if(rot)g.rotation.set(...rot);
 const m=mat(color,0.32,0.10);
 const hub=new THREE.Mesh(new THREE.TorusGeometry(radius*0.42,radius*0.16,10,20),m);
 hub.castShadow=true;g.add(hub);
 for(let i=0;i<8;i++){
  const a=(i/8)*Math.PI*2;
  const sx=Math.cos(a)*radius*0.86,sy=Math.sin(a)*radius*0.86;
  rod(g,[Math.cos(a)*radius*0.42,Math.sin(a)*radius*0.42,0],[sx,sy,0],radius*0.075,color);
  const ball=new THREE.Mesh(sphereGeo,m);
  ball.scale.setScalar(radius*0.26);
  ball.position.set(sx,sy,0);
  ball.castShadow=true;g.add(ball);
 }
 g.userData.kineticSpin=(pos[0]>=0?1:-1)*0.95;
 parent.add(g);
 return g;
}
function addCoiledSpring3D(parent,p1,p2,radius=0.032,turns=11,wireR=0.0055,color='#aeb4bc'){
 const v1=V(...p1),v2=V(...p2);
 const dir=v2.clone().sub(v1),len=dir.length();
 const g=new THREE.Group();
 g.position.copy(v1);
 g.quaternion.setFromUnitVectors(V(0,1,0),dir.clone().normalize());
 const m=mat(color,0.28,0.72);
 const hookTop=new THREE.Mesh(new THREE.TorusGeometry(radius*0.62,wireR*1.1,8,16),m);
 hookTop.position.set(0,radius*0.62,0);g.add(hookTop);
 const hookBot=new THREE.Mesh(new THREE.TorusGeometry(radius*0.62,wireR*1.1,8,16),m);
 hookBot.position.set(0,len-radius*0.62,0);g.add(hookBot);
 const pts=[];
 const nSteps=turns*8;
 const y0=radius*0.85,y1=len-radius*0.85;
 for(let i=0;i<=nSteps;i++){
  const t=i/nSteps;
  const a=t*turns*Math.PI*2;
  pts.push(V(Math.cos(a)*radius,y0+t*(y1-y0),Math.sin(a)*radius));
 }
 const helix=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),nSteps,wireR,7,false),m);
 helix.castShadow=true;g.add(helix);
 parent.add(g);
 return g;
}
function addMagentaRoller3D(parent,pos,rot,r=0.046,len=0.125,col='#dc2a7c'){
 const g=new THREE.Group();
 g.position.set(...pos);
 if(rot)g.rotation.set(...rot);
 const body=new THREE.Mesh(cylinderGeo,mat(col,0.52,0.06));
 body.scale.set(r,len,r);body.castShadow=true;body.receiveShadow=true;g.add(body);
 const capMat=mat('#d6b48e',0.72,0.04);
 const capEnds=new THREE.Mesh(cylinderGeo,capMat);
 capEnds.scale.set(r*0.92,len+0.004,r*0.92);g.add(capEnds);
 const bore=new THREE.Mesh(cylinderGeo,mat('#2b2420',0.85));
 bore.scale.set(r*0.28,len+0.008,r*0.28);g.add(bore);
 parent.add(g);
 return g;
}
function addWineCork3D(parent,pos,rot,r=0.040,len=0.115,col='#c8a67a'){
 const g=new THREE.Group();
 g.position.set(...pos);
 if(rot)g.rotation.set(...rot);
 const body=new THREE.Mesh(cylinderGeo,mat(col,0.78,0.02));
 body.scale.set(r,len,r);body.castShadow=true;body.receiveShadow=true;g.add(body);
 const bandMat=mat('#6e5236',0.82,0.02);
 for(const by of [-len*0.26,len*0.26]){
  const band=new THREE.Mesh(cylinderGeo,bandMat);
  band.scale.set(r*1.015,len*0.12,r*1.015);band.position.y=by;g.add(band);
 }
 const endMat=mat('#b59266',0.82,0.02);
 const endCap=new THREE.Mesh(cylinderGeo,endMat);
 endCap.scale.set(r*0.88,len+0.004,r*0.88);g.add(endCap);
 parent.add(g);
 return g;
}
function addFoosballPlayer3D(parent,pos,rotY=0,rotRoll=0,jerseyCol='#d42828'){
 const g=new THREE.Group();
 g.position.set(...pos);
 g.rotation.set(0,rotY,rotRoll);
 const skinMat=mat('#e29c52',0.55,0.04);
 const hairMat=mat('#181a1c',0.48,0.08);
 const jerseyMat=mat(jerseyCol,0.42,0.08);
 const shortsMat=mat('#1e2024',0.48,0.08);
 const whiteMat=mat('#f2f0ea',0.45,0.05);
 // Torso & shoulders (centered where the chrome rod pierces the chest)
 const torso=new THREE.Mesh(boxGeo,jerseyMat);
 torso.scale.set(0.068,0.095,0.042);torso.position.set(0,0.01,0);torso.castShadow=true;g.add(torso);
 const shoulders=new THREE.Mesh(cylinderGeo,jerseyMat);
 shoulders.rotation.z=Math.PI/2;shoulders.scale.set(0.024,0.092,0.024);shoulders.position.set(0,0.038,0);shoulders.castShadow=true;g.add(shoulders);
 const collar=new THREE.Mesh(cylinderGeo,whiteMat);
 collar.scale.set(0.020,0.018,0.020);collar.position.set(0,0.062,0);g.add(collar);
 // Sculpted 3D head + hair cap
 const head=new THREE.Mesh(sphereGeo,skinMat);
 head.scale.set(0.026,0.032,0.026);head.position.set(0,0.092,0);head.castShadow=true;g.add(head);
 const hair=new THREE.Mesh(sphereGeo,hairMat);
 hair.scale.set(0.027,0.022,0.028);hair.position.set(0,0.104,-0.003);g.add(hair);
 // Shorts + legs + boots block
 const shorts=new THREE.Mesh(boxGeo,shortsMat);
 shorts.scale.set(0.062,0.045,0.040);shorts.position.set(0,-0.056,0);shorts.castShadow=true;g.add(shorts);
 const legs=new THREE.Mesh(boxGeo,skinMat);
 legs.scale.set(0.048,0.058,0.034);legs.position.set(0,-0.102,0);legs.castShadow=true;g.add(legs);
 const socks=new THREE.Mesh(boxGeo,whiteMat);
 socks.scale.set(0.050,0.026,0.036);socks.position.set(0,-0.128,0);g.add(socks);
 const boots=new THREE.Mesh(boxGeo,hairMat);
 boots.scale.set(0.054,0.028,0.048);boots.position.set(0,-0.150,0.005);boots.castShadow=true;g.add(boots);
 parent.add(g);
 return g;
}
function addGoldDoubleRingLink3D(parent,pos,rot,scale=1,col='#cca650'){
 const g=new THREE.Group();
 g.position.set(...pos);
 if(rot)g.rotation.set(...rot);
 g.scale.setScalar(scale);
 const m=mat(col,0.34,0.68);
 const mDark=mat('#9e7a32',0.42,0.58);
 for(const sy of [-0.088,0.088]){
  const rOuter=new THREE.Mesh(new THREE.TorusGeometry(0.054,0.013,10,22),m);
  rOuter.position.set(0,sy,0);rOuter.castShadow=true;g.add(rOuter);
  const rInner=new THREE.Mesh(new THREE.TorusGeometry(0.035,0.008,8,18),mDark);
  rInner.position.set(0,sy,0);g.add(rInner);
 }
 const web=new THREE.Mesh(boxGeo,m);
 web.scale.set(0.032,0.086,0.014);web.castShadow=true;g.add(web);
 for(const sx of [-0.014,0.014]){
  const flange=new THREE.Mesh(boxGeo,mDark);
  flange.scale.set(0.006,0.092,0.022);flange.position.x=sx;g.add(flange);
 }
 parent.add(g);
 return g;
}
function addLobedWheelRing3D(parent,pos,rotY,col,R=0.22,h=0.095){
 const g=new THREE.Group();
 g.position.set(...pos);
 g.rotation.y=rotY||0;
 const m=mat(col,0.38,0.08);
 const coreM=mat('#1f2226',0.82);
 const core=new THREE.Mesh(cylinderGeo,m);
 core.scale.set(R*0.78,h,R*0.78);core.castShadow=true;core.receiveShadow=true;g.add(core);
 const hole=new THREE.Mesh(cylinderGeo,coreM);
 hole.scale.set(R*0.50,h+0.006,R*0.50);g.add(hole);
 for(let i=0;i<8;i++){
  const a=(i/8)*Math.PI*2;
  const lobe=new THREE.Mesh(cylinderGeo,m);
  lobe.scale.set(R*0.30,h*0.96,R*0.30);
  lobe.position.set(Math.cos(a)*R*0.76,0,Math.sin(a)*R*0.76);
  lobe.castShadow=true;lobe.receiveShadow=true;
  g.add(lobe);
 }
 parent.add(g);
 return g;
}
function addHollowPipe3D(parent,pts,r=0.034,col='#e84878'){
 const cObj=new THREE.CatmullRomCurve3(pts.map(p=>V(...p)));
 const m=mat(col,0.40,0.08);
 const tube=new THREE.Mesh(new THREE.TubeGeometry(cObj,24,r,12,false),m);
 tube.castShadow=true;tube.receiveShadow=true;parent.add(tube);
 const boreM=mat('#1b1918',0.88);
 for(const t of [0,1]){
  const pt=cObj.getPointAt(t),tan=cObj.getTangentAt(t);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(r*0.86,r*0.18,8,16),m);
  rim.position.copy(pt);
  rim.quaternion.setFromUnitVectors(V(0,0,1),tan);
  parent.add(rim);
  const plug=new THREE.Mesh(cylinderGeo,boreM);
  plug.scale.set(r*0.74,0.012,r*0.74);
  plug.position.copy(pt);
  plug.quaternion.setFromUnitVectors(V(0,1,0),tan);
  parent.add(plug);
 }
 return tube;
}
function buildTrue3DMobileGeometry(id){
 if(id==='color')id='mov016';
 if(id==='rose')id='mov001';
 if(id==='green')id='mov005';
 const g=new THREE.Group();
 const rand=rng(id.charCodeAt(3)*37+id.charCodeAt(4)*13+id.charCodeAt(5));
 if(id==='mov001'){
  // MOV-001 ("rose"): "Composición en rosa" — Wide asymmetric 3D wire constellation with 14 hollow magenta-pink foam rollers & single dangling bottom roller (ARC-014590..600)
  rod(g,[-0.08,0,0],[-0.26,-0.36,0.04],0.0026,'#b4bac2');
  rod(g,[0.08,0,0],[0.22,-0.32,-0.04],0.0026,'#b4bac2');
  const cage=new THREE.Group();
  cage.userData.kineticSway={baseRotY:0.08,spinSpeed:0.68,phase:0.3,amp:0.22,swayZ:0.04,swayX:0.035};
  const nodes=[
   [-0.26,-0.36,0.04],  // 0 upper-left
   [0.22,-0.32,-0.04],  // 1 upper-right
   [0.36,-0.48,0.12],   // 2 upper-far-right
   [-0.48,-0.74,0.14],  // 3 wide left wing
   [-0.06,-0.68,-0.16], // 4 upper-center-back
   [0.44,-0.82,-0.08],  // 5 wide right wing
   [-0.28,-1.00,0.16],  // 6 mid-left-front
   [0.06,-0.98,0.18],   // 7 mid-center-front
   [0.28,-1.10,-0.14],  // 8 mid-right-back
   [-0.34,-1.28,-0.10], // 9 lower-left
   [-0.04,-1.26,0.08],  // 10 lower-center
   [0.22,-1.36,0.12],   // 11 lower-right
   [-0.08,-1.54,-0.06], // 12 sub-bottom
   [0.08,-1.78,0.04]    // 13 single dangling bottom roller
  ];
  const edges=[
   [0,1],[0,3],[0,4],[1,2],[1,4],[2,5],[3,6],[4,6],[4,7],[4,8],[5,7],[5,8],
   [6,7],[6,9],[7,10],[7,11],[8,11],[9,10],[9,12],[10,12],[11,12],[12,13]
  ];
  for(const [i,j] of edges)rod(cage,nodes[i],nodes[j],0.0038,'#cdd3da');
  nodes.forEach((p,idx)=>{
   const a=idx*1.15;
   addMagentaRoller3D(cage,p,[0.45*Math.cos(a),a*0.6,0.85*Math.sin(a)],0.045,0.122,idx%2?'#e02882':'#c81e70');
  });
  g.add(cage);
  return g;
 }
 if(id==='mov002'){
  // MOV-002: "Una línea en suspensión" — Forged dark iron flat bar with angular S/Z kinks & narrow lengthwise slots, NO silver balls (ARC-014605..613)
  rod(g,[0,0,0],[0,-0.22,0],0.0032,'#6e6862');
  const iron=new THREE.Group();
  iron.userData.kineticSway={baseRotY:0.12,spinSpeed:0.55,phase:0.6,amp:0.18,swayZ:0.035,swayX:0.025};
  const ironMat=mat('#2a2320',0.66,0.48);
  const edgeMat=mat('#4a3528',0.72,0.36);
  const topEye=new THREE.Mesh(new THREE.TorusGeometry(0.024,0.0065,8,16),ironMat);
  topEye.position.set(0,-0.24,0);iron.add(topEye);
  // Bent forged flat iron segments with authentic angular S/Z kinks matching cut-mov-002-1..3.webp
  const kinks=[
   [0.0,-0.25,0.0],
   [0.045,-0.56,0.01],
   [0.068,-0.86,0.0],
   [-0.042,-1.18,-0.01],
   [-0.085,-1.44,0.01],
   [-0.022,-1.68,0.0],
   [0.055,-1.92,0.0]
  ];
  for(let s=0;s<kinks.length-1;s++){
   const a=V(...kinks[s]),b=V(...kinks[s+1]);
   const dir=b.clone().sub(a),len=dir.length(),mid=a.clone().add(b).multiplyScalar(0.5);
   const q=new THREE.Quaternion().setFromUnitVectors(V(0,1,0),dir.clone().normalize());
   const segGrp=new THREE.Group();
   segGrp.position.copy(mid);segGrp.quaternion.copy(q);
   if(s===1||s===3||s===4){
    // Split forged bar with narrow open lengthwise slot
    for(const sx of [-0.015,0.015]){
     const rail=new THREE.Mesh(boxGeo,s%2?ironMat:edgeMat);
     rail.scale.set(0.014,len+0.012,0.014);rail.position.x=sx;rail.castShadow=true;segGrp.add(rail);
    }
    for(const sy of [-len*0.46,len*0.46]){
     const bridge=new THREE.Mesh(boxGeo,ironMat);
     bridge.scale.set(0.044,0.026,0.015);bridge.position.y=sy;segGrp.add(bridge);
    }
   }else{
    const bar=new THREE.Mesh(boxGeo,ironMat);
    bar.scale.set(s===5?0.030:0.042,len+0.012,0.014);bar.castShadow=true;segGrp.add(bar);
   }
   iron.add(segGrp);
  }
  g.add(iron);
  return g;
 }
 if(id==='mov003'){
  // MOV-003: "Rama oscura, acentos rojos" — Slender natural dark branch with ~23 shorter hollow red-orange hose segments (ARC-014616..622)
  rod(g,[0,0,0],[0,-0.20,0],0.0032,'#8a9084');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.15,spinSpeed:0.62,phase:0.9,amp:0.24,swayZ:0.04,swayX:0.035};
  const hook=new THREE.Mesh(new THREE.TorusGeometry(0.020,0.0045,8,16),mat('#b8c0c8',0.3,0.75));
  hook.position.set(0,-0.21,0);mob.add(hook);
  const trunkPts=[[0,-0.22,0],[-0.02,-0.56,0.01],[0.01,-0.92,-0.01],[0.04,-1.28,0.02],[0.06,-1.62,0.01],[0.08,-1.94,0]];
  taperedBranch(mob,trunkPts,0.036,0.046,'#2a221e',22,12,true);
  const trunkCurve=new THREE.CatmullRomCurve3(trunkPts.map(p=>V(...p)));
  for(let i=0;i<23;i++){
   const t=0.04+(i/22)*0.91;
   const pt=trunkCurve.getPointAt(t);
   const angle=i*2.39996+0.4;
   const tilt=((i%5)-2)*0.11;
   const len=0.078+(i%3)*0.018;
   const dx=Math.cos(angle),dz=Math.sin(angle),dy=tilt;
   const pStart=[pt.x+dx*0.018,pt.y,pt.z+dz*0.018];
   const pEnd=[pt.x+dx*(0.030+len),pt.y+dy*len,pt.z+dz*(0.030+len)];
   addHollowPipe3D(mob,[pStart,pEnd],0.0145,i%2===0?'#e84424':'#d6381c');
  }
  g.add(mob);
  return g;
 }
 if(id==='mov004'){
  // MOV-004: "Figuras sobre una barra roja" — Vertical coral-red pipe with bottom J-hook, shorter chrome foosball rods with black handles & 11 players incl. bottom pair (ARC-014625..633)
  rod(g,[-0.03,0,0],[-0.025,-0.22,0],0.0038,'#d84824');
  rod(g,[0.03,0,0],[0.025,-0.22,0],0.0038,'#d84824');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.10,spinSpeed:0.65,phase:1.1,amp:0.25,swayZ:0.04,swayX:0.035};
  const pipePts=[[0,-0.22,0],[-0.01,-0.62,0.01],[0.01,-1.06,0.0],[0.02,-1.48,0.01],[0.0,-1.78,0.03],[-0.09,-1.88,0.06],[-0.15,-1.76,0.08]];
  addHollowPipe3D(mob,pipePts,0.048,'#ec4c2a');
  const rodSpecs=[
   {y:-0.34,x:0.0,z:0.0,az:0.14,tilt:0.04,len:0.46,handleSide:-1,players:[{s:-0.12,col:'#d42828',roll:0.12},{s:0.13,col:'#d42828',roll:-0.15}]},
   {y:-0.52,x:-0.01,z:0.01,az:-0.35,tilt:-0.03,len:0.52,handleSide:1,players:[{s:-0.14,col:'#d42828',roll:-0.2},{s:0.12,col:'#d42828',roll:0.2}]},
   {y:-0.72,x:0.0,z:0.01,az:0.42,tilt:0.04,len:0.56,handleSide:-1,players:[{s:0.15,col:'#2478d2',roll:-0.18}]},
   {y:-0.92,x:0.01,z:0.0,az:-0.24,tilt:-0.04,len:0.58,handleSide:1,players:[{s:-0.15,col:'#d42828',roll:0.22},{s:0.14,col:'#2478d2',roll:-0.15}]},
   {y:-1.14,x:0.01,z:0.0,az:0.48,tilt:0.03,len:0.56,handleSide:-1,players:[{s:0.14,col:'#2478d2',roll:0.2}]},
   {y:-1.34,x:0.02,z:0.01,az:-0.30,tilt:0.04,len:0.54,handleSide:1,players:[{s:-0.14,col:'#d42828',roll:0.15}]},
   {y:-1.56,x:0.01,z:0.02,az:0.16,tilt:-0.03,len:0.58,handleSide:-1,players:[{s:-0.16,col:'#2478d2',roll:0.08},{s:0.16,col:'#d42828',roll:-0.08}]}
  ];
  for(const rs of rodSpecs){
   const dx=Math.cos(rs.az),dz=Math.sin(rs.az),dy=rs.tilt;
   const hL=rs.len*0.5;
   const p1=[rs.x-dx*hL,rs.y-dy*hL,rs.z-dz*hL];
   const p2=[rs.x+dx*hL,rs.y+dy*hL,rs.z+dz*hL];
   rod(mob,p1,p2,0.0055,'#d8dde4');
   const hPos=rs.handleSide<0?p1:p2;
   const oPos=rs.handleSide<0?p2:p1;
   rod(mob,hPos,[hPos[0]+rs.handleSide*dx*0.11,hPos[1]+rs.handleSide*dy*0.11,hPos[2]+rs.handleSide*dz*0.11],0.017,'#1d1f22');
   const cap=new THREE.Mesh(sphereGeo,mat('#1a1c1e',0.6));
   cap.scale.setScalar(0.012);cap.position.set(...oPos);mob.add(cap);
   for(const pl of rs.players){
    addFoosballPlayer3D(mob,[rs.x+dx*pl.s,rs.y+dy*pl.s,rs.z+dz*pl.s],-rs.az,pl.roll,pl.col);
   }
  }
  g.add(mob);
  return g;
 }
 if(id==='mov005'){
  // MOV-005 ("green"): "Forma suspendida en verde" — Angular bell/pyramidal 3D tubular lattice of straight & elbowed green pipes (ARC-014646..650)
  rod(g,[-0.09,0,0],[-0.09,-0.44,0],0.0030,'#8a9286');
  rod(g,[0.11,0,0],[0.11,-0.44,0],0.0030,'#8a9286');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.12,spinSpeed:0.66,phase:0.5,amp:0.26,swayZ:0.045,swayX:0.04};
  const nodes=[
   [-0.09,-0.44,0.02],  // 0 top-left apex
   [0.11,-0.46,-0.02],  // 1 top-right apex
   [-0.28,-0.78,0.14],  // 2 upper-left
   [0.28,-0.74,-0.12],  // 3 upper-right
   [0.02,-0.82,0.18],   // 4 upper-front
   [-0.44,-1.22,0.12],  // 5 wide lower-left
   [0.44,-1.18,0.10],   // 6 wide lower-right
   [-0.18,-1.28,-0.20], // 7 lower-back-left
   [0.24,-1.32,-0.18],  // 8 lower-back-right
   [0.04,-1.36,0.22],   // 9 lower-front
   [-0.06,-1.74,0.02]   // 10 bottom V-point
  ];
  const greenSegs=[
   [0,2],[0,4],[1,3],[1,4],[2,4],[3,4],[2,5],[2,7],[3,6],[3,8],
   [4,9],[5,9],[6,9],[5,7],[7,8],[8,6],[5,10],[9,10],[8,10]
  ];
  for(const [a,b] of greenSegs)rod(mob,nodes[a],nodes[b],0.021,'#52b848');
  for(const pt of nodes){
   const elbow=new THREE.Mesh(sphereGeo,mat('#62c856',0.38,0.08));
   elbow.scale.setScalar(0.028);elbow.position.set(...pt);elbow.castShadow=true;mob.add(elbow);
  }
  g.add(mob);
  return g;
 }
 if(id==='mov006'){
  // MOV-006: "Tubos rosas sobre un arco" — Single central top coral stem descending into a narrow intertwined vertical bundle, NO coat-hanger U-bar (ARC-009204, ARC-014673)
  rod(g,[0,0,0],[0,-0.18,0],0.0032,'#8a9084');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.10,spinSpeed:0.64,phase:0.8,amp:0.26,swayZ:0.045,swayX:0.038};
  const pipeDefs=[
   // Single central curved stem at top
   {pts:[[0.0,-0.18,0.0],[0.03,-0.34,0.02],[-0.02,-0.54,-0.01]],col:'#e83838'},
   // Narrow intertwined vertical cascade (span within x = ±0.16)
   {pts:[[-0.03,-0.48,0.03],[-0.13,-0.66,0.06],[-0.05,-0.86,0.04],[0.06,-1.04,-0.03]],col:'#e43c54'},
   {pts:[[0.04,-0.50,-0.03],[0.14,-0.70,-0.05],[0.04,-0.90,0.05],[-0.08,-1.08,0.04]],col:'#ec4c42'},
   {pts:[[-0.02,-0.74,-0.06],[0.09,-0.94,-0.08],[-0.04,-1.16,-0.05],[0.05,-1.34,-0.02]],col:'#d83258'},
   {pts:[[-0.09,-1.04,0.04],[-0.15,-1.24,0.07],[-0.03,-1.42,0.05],[-0.09,-1.60,0.02]],col:'#e84264'},
   {pts:[[0.08,-1.08,-0.02],[0.14,-1.28,0.04],[0.02,-1.48,-0.04],[0.08,-1.66,0.02]],col:'#ee5244'},
   {pts:[[-0.02,-1.38,0.03],[0.06,-1.58,0.06],[-0.05,-1.78,0.03],[0.01,-1.94,0.0]],col:'#dc3658'}
  ];
  for(const pd of pipeDefs)addHollowPipe3D(mob,pd.pts,0.026,pd.col);
  g.add(mob);
  return g;
 }
 if(id==='mov007'){
  // MOV-007: "Estructura clara y elementos cilíndricos" — Slim top spring on wire + closed rectangular 2-rail wire frame (no splayed bottom sticks!) + 8 natural wine corks (ARC-014680..689)
  rod(g,[0,0,0],[0,-0.22,0],0.0024,'#aeb4bc');
  addCoiledSpring3D(g,[0,-0.22,0],[0,-0.34,0],0.012,18,0.0032,'#6e747c');
  rod(g,[0,-0.34,0],[0,-0.46,0],0.0032,'#b8bfc6');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.14,spinSpeed:0.65,phase:0.4,amp:0.25,swayZ:0.04,swayX:0.035};
  const rCol='#c4cbd2';
  // Closed rectangular 2-rail prism frame matching ARC-014680..689
  const TL=[-0.22,-0.46,0.02],TR=[0.22,-0.46,-0.02];
  const BL=[-0.22,-1.68,0.02],BR=[0.22,-1.68,-0.02];
  const ML=[-0.22,-0.92,0.02],MR=[0.22,-0.92,-0.02];
  const LL=[-0.22,-1.32,0.02],LR=[0.22,-1.32,-0.02];
  for(const [a,b] of [
   [TL,TR],[BL,BR],[TL,BL],[TR,BR],[ML,MR],[LL,LR],
   [[0,-0.46,0],[-0.02,-1.68,0]],[ML,[-0.02,-0.68,0]],[[-0.02,-1.14,0],LR],[LL,[-0.02,-1.52,0]]
  ])rod(mob,a,b,0.0045,rCol);
  const corks=[
   {pos:[-0.06,-0.62,0.02],rot:[0.15,0.2,0.68]},
   {pos:[-0.14,-0.80,0.02],rot:[0.05,0.1,1.54]},
   {pos:[0.10,-0.92,-0.01],rot:[0.1,0.15,0.42]},
   {pos:[-0.04,-1.08,0.02],rot:[-0.12,0.2,0.85]},
   {pos:[0.22,-1.14,-0.02],rot:[0.04,0.1,0.04]},
   {pos:[-0.16,-1.28,0.02],rot:[0.08,-0.1,0.12]},
   {pos:[-0.04,-1.48,0.02],rot:[0.15,0.2,-0.78]},
   {pos:[0.18,-1.50,-0.02],rot:[-0.06,0.1,0.08]}
  ];
  for(const ck of corks)addWineCork3D(mob,ck.pos,ck.rot,0.038,0.115,'#c8a67a');
  g.add(mob);
  return g;
 }
 if(id==='mov008'){
  // MOV-008: "Pequeño volumen abierto en rosa" — Slim top spring + open asymmetric 9-roller wire polygon with left pentagonal loop (ARC-014696..707)
  rod(g,[0,0,0],[0,-0.22,0],0.0024,'#aeb4bc');
  addCoiledSpring3D(g,[0,-0.22,0],[0,-0.34,0],0.012,18,0.0032,'#6e747c');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.10,spinSpeed:0.68,phase:1.2,amp:0.26,swayZ:0.045,swayX:0.035};
  const pts=[
   [0,-0.34,0],          // 0 spring hook
   [0.06,-0.58,0.04],    // 1 upper-center roller
   [-0.30,-0.74,0.10],   // 2 left-upper loop corner
   [-0.38,-1.14,0.06],   // 3 far-left loop roller
   [-0.14,-1.36,-0.06],  // 4 lower-left roller
   [-0.02,-1.04,0.12],   // 5 center-mid roller
   [0.20,-0.88,-0.08],   // 6 mid-right roller
   [0.32,-1.18,0.08],    // 7 far-right roller
   [0.14,-1.44,-0.06],   // 8 lower-right roller
   [0.18,-1.74,0.04]     // 9 bottom tail roller
  ];
  for(const [i,j] of [[0,1],[1,2],[2,3],[3,4],[4,5],[5,1],[1,6],[6,7],[5,8],[7,8],[8,9]]){
   rod(mob,pts[i],pts[j],0.0045,'#c8cfd6');
  }
  for(let i=1;i<pts.length;i++){
   const a=i*1.05;
   addMagentaRoller3D(mob,pts[i],[0.35*Math.cos(a),a*0.5,0.85*Math.sin(a)],0.044,0.122,i%2?'#dc2a7c':'#c41e6c');
  }
  g.add(mob);
  return g;
 }
 if(id==='mov009'){
  // MOV-009: "Una columna de discos rosas" — Slim top spring + ultra-thin converging vertical threads (NO rigid triangular tower!) + 15 closely-spaced pink rollers (ARC-014715..718)
  rod(g,[0,0,0],[0,-0.18,0],0.0022,'#aeb4bc');
  addCoiledSpring3D(g,[0,-0.18,0],[0,-0.28,0],0.010,16,0.0028,'#6e747c');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.08,spinSpeed:0.60,phase:0.7,amp:0.20,swayZ:0.035,swayX:0.03};
  // Ultra-fine vertical suspension threads converging to a neat V-tip at y=-1.92
  for(const [tx,tz] of [[-0.032,0.018],[0.032,0.018],[0,-0.030]]){
   rod(mob,[0,-0.28,0],[tx,-0.42,tz],0.0018,'#b8bfc6');
   rod(mob,[tx,-0.42,tz],[tx*0.65,-1.78,tz*0.65],0.0018,'#b8bfc6');
   rod(mob,[tx*0.65,-1.78,tz*0.65],[0,-1.92,0],0.0018,'#b8bfc6');
  }
  for(let i=0;i<15;i++){
   const y=-0.42-i*0.094;
   const a=i*1.25;
   addMagentaRoller3D(mob,[Math.cos(a)*0.012,y,Math.sin(a)*0.012],[0.28*Math.cos(a),a*0.7,1.15+0.25*Math.sin(a)],0.038,0.095,i%2?'#dc2c7c':'#c6206c');
  }
  g.add(mob);
  return g;
 }
 if(id==='mov010'){
  // MOV-010: "Escalera de elementos claros" — Slim top spring + stepped 2-rail rectangular wire ladder with 7 horizontal rungs & 11 wine corks (ARC-014722..725)
  rod(g,[0,0,0],[0,-0.20,0],0.0024,'#aeb4bc');
  addCoiledSpring3D(g,[0,-0.20,0],[0,-0.32,0],0.011,18,0.0030,'#6e747c');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.12,spinSpeed:0.64,phase:1.5,amp:0.22,swayZ:0.038,swayX:0.032};
  const rCol='#c4cbd2';
  // Stepped upper neck + 2 straight parallel ladder side rails (x = ±0.125) matching ARC-014725
  rod(mob,[0,-0.32,0],[0,-0.42,0],0.0042,rCol);
  rod(mob,[-0.055,-0.42,0],[0.055,-0.42,0],0.0042,rCol);
  rod(mob,[-0.055,-0.42,0],[-0.055,-0.56,0],0.0042,rCol);
  rod(mob,[0.055,-0.42,0],[0.055,-0.56,0],0.0042,rCol);
  rod(mob,[-0.125,-0.56,0],[0.125,-0.56,0],0.0042,rCol);
  rod(mob,[-0.125,-0.56,0],[-0.125,-1.82,0],0.0042,rCol);
  rod(mob,[0.125,-0.56,0],[0.125,-1.82,0],0.0042,rCol);
  for(const ry of [-0.76,-0.96,-1.16,-1.36,-1.58,-1.82]){
   rod(mob,[-0.125,ry,0],[0.125,ry,0],0.0038,rCol);
  }
  const corkDefs=[
   {pos:[0.075,-0.49,0.01],rot:[0.05,0.1,0.15]},
   {pos:[0.135,-0.66,0.01],rot:[0.1,0.15,1.48]},
   {pos:[0.01,-0.84,0.01],rot:[0.06,0.1,-0.12]},
   {pos:[-0.02,-1.04,0.02],rot:[-0.08,0.15,0.18]},
   {pos:[0.06,-1.24,-0.01],rot:[0.1,0.1,-0.08]},
   {pos:[-0.04,-1.36,0.02],rot:[0.12,0.2,1.52]},
   {pos:[-0.03,-1.48,0.01],rot:[-0.1,0.15,0.22]},
   {pos:[0.07,-1.50,-0.01],rot:[0.08,-0.1,-0.15]},
   {pos:[-0.08,-1.66,0.02],rot:[0.15,0.2,0.32]},
   {pos:[0.06,-1.68,-0.01],rot:[-0.12,0.1,-0.25]},
   {pos:[-0.02,-1.82,0.01],rot:[0.1,0.2,0.45]}
  ];
  for(const cd of corkDefs)addWineCork3D(mob,cd.pos,cd.rot,0.036,0.105,'#cbb08a');
  g.add(mob);
  return g;
 }
 if(id==='mov011'){
  // MOV-011: "Líneas rosas ramificadas" — Slim top spring + open branching two-legged asymmetric wire tree with 14 pink rollers (ARC-014728..740)
  rod(g,[0,0,0],[0,-0.20,0],0.0024,'#aeb4bc');
  addCoiledSpring3D(g,[0,-0.20,0],[0,-0.32,0],0.012,18,0.0032,'#6e747c');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.16,spinSpeed:0.66,phase:0.9,amp:0.25,swayZ:0.042,swayX:0.036};
  const nodes=[
   [0,-0.32,0],          // 0 spring hook
   [-0.08,-0.52,0.04],   // 1 upper neck
   [0.24,-0.54,-0.04],   // 2 upper-right branch tip
   [-0.22,-0.78,0.08],   // 3 upper-left
   [0.08,-0.84,-0.06],   // 4 mid-upper right
   [0.32,-1.04,0.08],    // 5 far-right branch
   [-0.06,-1.06,0.10],   // 6 central fork
   [-0.28,-1.28,-0.06],  // 7 left leg upper
   [-0.14,-1.52,0.06],   // 8 left leg mid
   [-0.30,-1.74,-0.04],  // 9 left leg open tip
   [0.16,-1.26,-0.08],   // 10 right leg upper
   [0.28,-1.48,0.06],    // 11 right leg mid-outer
   [0.06,-1.58,-0.06],   // 12 right leg mid-inner
   [-0.04,-1.80,0.04],   // 13 lower-center hanging tip
   [0.36,-1.08,-0.06]    // 14 extra right spur roller
  ];
  // Open tree topology (two open hanging legs, not closed at bottom!)
  const edges=[
   [0,1],[1,2],[1,3],[3,4],[4,5],[5,14],[3,6],[4,6],
   [6,7],[7,8],[8,9],[6,10],[10,11],[10,12],[12,13]
  ];
  for(const [i,j] of edges)rod(mob,nodes[i],nodes[j],0.0045,'#c6cdd4');
  for(let i=1;i<nodes.length;i++){
   const a=i*1.22;
   addMagentaRoller3D(mob,nodes[i],[0.4*Math.sin(a),a*0.5,0.85*Math.cos(a)],0.042,0.115,i%2?'#d62876':'#be1e68');
  }
  g.add(mob);
  return g;
 }
 if(id==='mov012'){
  // MOV-012: "Curvas de tubo corrugado" — SINGLE slim swivel/spring + dense compact ovoid Gordian knot of ~10 tightly packed olive-amber corrugated conduit loops (ARC-014750..761)
  rod(g,[0,0,0],[0,-0.28,0],0.0028,'#9ea4ac');
  addCoiledSpring3D(g,[0,-0.28,0],[0,-0.40,0],0.012,16,0.0032,'#7c828a');
  rod(g,[0,-0.40,0],[0,-0.54,0],0.004,'#8a9098');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.12,spinSpeed:0.58,phase:0.4,amp:0.22,swayZ:0.038,swayX:0.032};
  // Dense tightly-packed 3D Gordian knot centered at y=-1.08 within x,z in ±0.23, y in [-0.56, -1.58]
  const knotPts=[
   [0.00,-0.54,0.00],
   [0.14,-0.62,0.10],[0.21,-0.84,0.14],[0.10,-1.12,0.18],[-0.14,-1.28,0.12],
   [-0.22,-1.04,0.02],[-0.16,-0.74,-0.10],[0.06,-0.66,-0.15],[0.20,-0.92,-0.12],
   [0.14,-1.26,-0.08],[-0.06,-1.48,0.04],[-0.20,-1.32,0.14],[-0.18,-0.96,0.16],
   [0.02,-0.78,0.08],[0.18,-1.02,0.04],[0.12,-1.38,0.08],[-0.08,-1.54,-0.04],
   [-0.21,-1.26,-0.12],[-0.10,-0.90,-0.16],[0.08,-0.82,-0.04],[0.04,-1.18,-0.02],
   [-0.06,-1.38,-0.10],[0.06,-1.46,0.02],[0.02,-1.12,0.06]
  ];
  const knotCurve=new THREE.CatmullRomCurve3(knotPts.map(p=>V(...p)));
  const hoseMat=mat('#b59f6b',0.58,0.16);
  const ribMat=mat('#8c7848',0.66,0.20);
  const patinaMat=mat('#5c8a72',0.54,0.28);
  const hoseTube=new THREE.Mesh(new THREE.TubeGeometry(knotCurve,150,0.034,12,false),hoseMat);
  hoseTube.castShadow=true;hoseTube.receiveShadow=true;mob.add(hoseTube);
  for(let k=1;k<110;k++){
   const t=k/110;
   const pt=knotCurve.getPointAt(t),tan=knotCurve.getTangentAt(t);
   const isPatina=(k===18||k===19||k===52||k===53||k===84);
   const rib=new THREE.Mesh(new THREE.TorusGeometry(0.036,0.0055,6,14),isPatina?patinaMat:ribMat);
   rib.position.copy(pt);
   rib.quaternion.setFromUnitVectors(V(0,0,1),tan);
   mob.add(rib);
  }
  g.add(mob);
  return g;
 }
 if(id==='mov013'){
  // MOV-013: "Discos rosas en dos recorridos" — Open U-shaped wire loop hung from 2 separate top threads (NO top crossbar!) + 27 thin pink foam discs (ARC-014765..771)
  rod(g,[-0.16,0,0],[-0.17,-0.44,0.02],0.0024,'#a8aeb4');
  rod(g,[0.15,0,0],[0.15,-0.34,-0.02],0.0024,'#a8aeb4');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.10,spinSpeed:0.65,phase:0.7,amp:0.25,swayZ:0.042,swayX:0.035};
  const uPts=[
   [-0.17,-0.44,0.02],[-0.19,-0.88,0.03],[-0.18,-1.34,0.03],
   [-0.12,-1.64,0.02],[0.01,-1.74,0.0],[0.13,-1.62,-0.02],
   [0.16,-1.28,-0.03],[0.16,-0.80,-0.03],[0.15,-0.34,-0.02]
  ];
  curve(mob,uPts,0.0042,'#c4cbd2');
  const uCurve=new THREE.CatmullRomCurve3(uPts.map(p=>V(...p)));
  const pinkM1=mat('#ec427a',0.54,0.05),pinkM2=mat('#d8326a',0.56,0.05);
  for(let i=0;i<27;i++){
   const t=0.02+(i/26)*0.96;
   const pt=uCurve.getPointAt(t),tan=uCurve.getTangentAt(t);
   const dm=new THREE.Mesh(cylinderGeo,i%2?pinkM1:pinkM2);
   dm.scale.set(0.076,0.024,0.076);
   dm.position.copy(pt);
   dm.quaternion.setFromUnitVectors(V(0,1,0),tan);
   dm.rotateX(((i%3)-1)*0.16);dm.rotateZ(((i%2)-0.5)*0.18);
   dm.castShadow=true;dm.receiveShadow=true;mob.add(dm);
  }
  g.add(mob);
  return g;
 }
 if(id==='mov014'){
  // MOV-014: "Composición de aros" — Flaring pyramidal/bell assemblage of brass rings & straight slotted brass connector bars on 2 ultra-fine threads (ARC-014774)
  rod(g,[-0.04,0,0],[-0.03,-0.46,0],0.0020,'#b5a878');
  rod(g,[0.04,0,0],[0.03,-0.46,0],0.0020,'#b5a878');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.14,spinSpeed:0.62,phase:1.0,amp:0.24,swayZ:0.04,swayX:0.035};
  const tiers=[
   {y:-0.54,rx:0.04,rz:0.04,n:2,sc:0.95},
   {y:-0.72,rx:0.10,rz:0.08,n:4,sc:1.02},
   {y:-0.92,rx:0.17,rz:0.13,n:6,sc:1.08},
   {y:-1.12,rx:0.25,rz:0.18,n:8,sc:1.12},
   {y:-1.32,rx:0.33,rz:0.22,n:9,sc:1.15},
   {y:-1.50,rx:0.36,rz:0.22,n:9,sc:1.12},
   {y:-1.64,rx:0.22,rz:0.15,n:5,sc:1.00}
  ];
  let linkIdx=0;
  for(const tr of tiers){
   for(let k=0;k<tr.n;k++){
    const a=(k/tr.n)*Math.PI*2+linkIdx*0.58;
    const lx=Math.cos(a)*tr.rx,lz=Math.sin(a)*tr.rz;
    addGoldDoubleRingLink3D(mob,[lx,tr.y,lz],[0.55*Math.sin(a*1.3),a+0.7,0.65*Math.cos(a)],tr.sc*1.42,linkIdx%2?'#caa44e':'#dbb862');
    linkIdx++;
   }
  }
  // Straight slotted flat brass connector bars linking the upper, middle, and flaring lower ring clusters (ARC-014774)
  const barMat=mat('#d4af56',0.30,0.74),slotMat=mat('#302614',0.75,0.20);
  const addSlottedBrassBar=(p1,p2)=>{
   const v1=V(...p1),v2=V(...p2),mid=v1.clone().add(v2).multiplyScalar(0.5);
   const len=v1.distanceTo(v2),dir=v2.clone().sub(v1).normalize();
   const bg=new THREE.Group();bg.position.copy(mid);bg.quaternion.setFromUnitVectors(V(0,1,0),dir);
   const body=new THREE.Mesh(boxGeo,barMat);body.scale.set(0.036,len,0.008);body.castShadow=true;bg.add(body);
   const slot=new THREE.Mesh(boxGeo,slotMat);slot.scale.set(0.011,len*0.72,0.010);bg.add(slot);
   for(const sy of [-len*0.5,len*0.5]){
    const cap=new THREE.Mesh(cylinderGeo,barMat);cap.rotation.x=Math.PI/2;cap.scale.set(0.018,0.008,0.018);cap.position.y=sy;bg.add(cap);
   }
   mob.add(bg);
  };
  const barPairs=[
   [[0.02,-0.58,0.02],[0.15,-0.88,0.06]],[[-0.03,-0.62,-0.02],[-0.16,-0.94,0.05]],
   [[0.12,-0.88,0.06],[0.26,-1.20,0.08]],[[-0.14,-0.92,0.04],[-0.28,-1.24,0.06]],
   [[0.22,-1.16,0.08],[0.41,-1.48,0.04]],[[0.18,-1.24,-0.08],[0.36,-1.56,-0.06]],
   [[-0.22,-1.18,0.06],[-0.39,-1.50,0.05]],[[-0.18,-1.26,-0.08],[-0.34,-1.56,-0.06]],
   [[-0.06,-1.10,0.12],[0.14,-1.42,0.14]],[[0.08,-1.08,-0.12],[-0.12,-1.40,-0.14]],
   [[-0.30,-1.48,0.06],[-0.08,-1.64,0.04]],[[0.32,-1.50,0.05],[0.10,-1.65,0.03]]
  ];
  for(const [a,b] of barPairs)addSlottedBrassBar(a,b);
  g.add(mob);
  return g;
 }
 if(id==='mov015'){
  // MOV-015: "Una forma articulada" — Undulating stepped accordion of 19 HOLLOW D/C-arch charcoal foam segments (faithful to ARC-014821 & end-on ARC-014825!)
  rod(g,[0,0,0],[0,-0.84,0],0.0030,'#8a9084');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.08,spinSpeed:0.56,phase:0.5,amp:0.20,swayZ:0.03,swayX:0.028};
  const eye=new THREE.Mesh(new THREE.TorusGeometry(0.022,0.0045,8,16),mat('#aeb4ba',0.35,0.7));
  eye.position.set(0,-0.86,0);mob.add(eye);
  const darkM1=mat('#44423f',0.88,0.04),darkM2=mat('#54524e',0.86,0.04);
  // Build hollow D-arch foam block geometry matching ARC-014825
  const dSh=new THREE.Shape();
  dSh.moveTo(-0.085,-0.165);dSh.lineTo(0.02,-0.165);
  dSh.absarc(0.02,0,0.165,-Math.PI/2,Math.PI/2,false);
  dSh.lineTo(-0.085,0.165);dSh.closePath();
  const dHole=new THREE.Path();
  dHole.moveTo(-0.032,-0.088);dHole.lineTo(0.015,-0.088);
  dHole.absarc(0.015,0,0.088,-Math.PI/2,Math.PI/2,false);
  dHole.lineTo(-0.032,0.088);dHole.closePath();
  dSh.holes.push(dHole);
  const dArchGeo=new THREE.ExtrudeGeometry(dSh,{depth:0.076,bevelEnabled:true,bevelThickness:0.004,bevelSize:0.003,bevelSegments:1,curveSegments:14});
  dArchGeo.translate(0,0,-0.038);
  dArchGeo.rotateY(Math.PI/2);
  const archPts=[];
  for(let i=0;i<19;i++){
   const u=(i/18)*2-1;
   const bx=u*0.92;
   const by=-0.92+0.13*Math.cos((u-0.50)*4.2)-0.36*(u*u)-0.08*Math.max(0,-u);
   const bz=0.06*Math.sin(u*Math.PI*1.1)+((i%2)-0.5)*0.022;
   archPts.push([bx,by,bz]);
   const slope=-0.55*Math.sin((u-0.50)*4.2)-0.72*u;
   const rz=Math.atan2(slope,1)*0.58-0.24;
   const ry=u*0.18+(i%2?0:Math.PI);
   const rx=((i%3)-1)*0.18;
   const blk=new THREE.Mesh(dArchGeo,i%2?darkM1:darkM2);
   blk.position.set(bx,by,bz);
   blk.rotation.set(rx,ry,rz);
   blk.castShadow=true;blk.receiveShadow=true;
   mob.add(blk);
  }
  curve(mob,archPts,0.0055,'#2c2a28');
  g.add(mob);
  return g;
 }
 if(id==='mov020'){
  // MOV-020: "Estructura de líneas oscuras y esferas" — Angular irregular polyhedral cage of straight forged-iron rods welded at sharp corners + 8 pale wooden spheres (ARC-008941..949)
  rod(g,[0,0,0],[0,-0.32,0],0.0038,'#484c50');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.14,spinSpeed:0.60,phase:0.8,amp:0.24,swayZ:0.04,swayX:0.035};
  const ironCol='#232120';
  const v=[
   [0.02,-0.32,0.0],     // 0 top apex
   [-0.36,-0.68,0.14],   // 1 upper-left
   [0.34,-0.64,-0.12],   // 2 upper-right
   [-0.10,-0.62,-0.18],  // 3 upper-back
   [-0.48,-1.04,-0.06],  // 4 far-left corner
   [-0.14,-0.98,0.22],   // 5 mid-front-left
   [0.18,-0.94,0.18],    // 6 mid-front-right
   [0.46,-1.00,0.04],    // 7 far-right corner
   [0.14,-1.08,-0.22],   // 8 mid-back-right
   [-0.32,-1.38,0.12],   // 9 lower-left
   [0.02,-1.34,0.20],    // 10 lower-front
   [0.32,-1.36,-0.08],   // 11 lower-right
   [-0.12,-1.44,-0.16],  // 12 lower-back
   [-0.04,-1.72,0.02]    // 13 bottom V-vertex
  ];
  const bars=[
   [0,1],[0,2],[0,3],[1,4],[1,5],[2,6],[2,7],[3,4],[3,8],
   [4,9],[5,6],[5,9],[5,10],[6,7],[6,10],[7,11],[8,11],[8,12],
   [9,10],[9,13],[10,11],[10,13],[11,13],[12,9],[12,13]
  ];
  for(const [a,b] of bars)rod(mob,v[a],v[b],0.0095,ironCol);
  for(const pt of v){
   const weld=new THREE.Mesh(sphereGeo,mat(ironCol,0.62,0.45));
   weld.scale.setScalar(0.012);weld.position.set(...pt);mob.add(weld);
  }
  const woodMat=mat('#cdb088',0.66,0.04);
  const ballPositions=[
   [-0.22,-0.82,0.17],[0.04,-0.78,-0.16],[0.26,-0.82,0.04],[-0.38,-1.18,0.03],
   [0.02,-0.96,0.19],[0.30,-1.18,-0.02],[-0.16,-1.36,0.15],[0.16,-1.52,-0.03]
  ];
  for(const bp of ballPositions){
   const sp=new THREE.Mesh(sphereGeo,woodMat);
   sp.scale.setScalar(0.046);sp.position.set(...bp);sp.castShadow=true;sp.receiveShadow=true;mob.add(sp);
  }
  g.add(mob);
  return g;
 }
 if(id==='mov021'){
  // MOV-021: "Fragmentos de color suspendidos" — Dense chaotic 3D cloud filling the interior with folded & slotted graphic cardboard packaging strips & triangles, NO circular ring! (ARC-008954, 008914, 008924)
  rod(g,[-0.08,0,0],[-0.12,-0.52,0],0.0024,'#a8aca4');
  rod(g,[0.08,0,0],[0.12,-0.52,0],0.0024,'#a8aca4');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.10,spinSpeed:0.64,phase:1.3,amp:0.24,swayZ:0.04,swayX:0.035};
  const cardCols=['#c6baa6','#d8cbb6','#d42838','#1c68c4','#e8bc18','#b8aa96','#288854','#ebe6dc','#2a2e34'];
  const triSh=new THREE.Shape();
  triSh.moveTo(-0.09,-0.06);triSh.lineTo(0.09,-0.05);triSh.lineTo(0.01,0.09);triSh.closePath();
  const triGeo=new THREE.ExtrudeGeometry(triSh,{depth:0.004,bevelEnabled:false});
  const cy=-1.12;
  // 38 interlocked folded cardboard struts, V-folds & graphic packaging triangles filling the 3D volume (radius 0..0.52)
  for(let i=0;i<38;i++){
   const a=i*2.39996,rad=0.06+0.44*Math.pow((i%13)/12,0.72);
   const nx=Math.cos(a)*rad*1.05;
   const ny=cy+((i/37)-0.5)*0.96+Math.sin(a*1.7)*0.08;
   const nz=Math.sin(a)*rad*0.78;
   const node=new THREE.Group();
   node.position.set(nx,ny,nz);
   node.rotation.set(i*0.85,i*1.25,i*0.65);
   const c1=cardCols[i%cardCols.length],c2=cardCols[(i*3+2)%cardCols.length];
   // Long folded L/V cardboard strip
   const stripA=new THREE.Mesh(boxGeo,mat(c1,0.72,0.02));
   stripA.scale.set(0.24+(i%3)*0.05,0.034,0.004);stripA.castShadow=true;stripA.receiveShadow=true;node.add(stripA);
   const stripB=new THREE.Mesh(boxGeo,mat('#c8bca8',0.78,0.02));
   stripB.scale.set(0.18,0.028,0.004);stripB.position.set(0.03,0.014,0.012);stripB.rotation.set(0.9,0.3,0.5);stripB.castShadow=true;node.add(stripB);
   if(i%2===0){
    const tri=new THREE.Mesh(triGeo,mat(c2,0.68,0.02));
    tri.position.set(-0.04,0.02,-0.01);tri.rotation.set(0.4,0.8,-0.3);tri.castShadow=true;node.add(tri);
   }
   mob.add(node);
  }
  g.add(mob);
  return g;
 }
 if(id==='mov024'){
  // MOV-024: "Curvas azules y verdes" — Open sweeping 3D figure-8 / double-loop arabesque densely packed with ~86 blue, cyan, green & white bottle caps (ARC-015000)
  rod(g,[0,0,0],[0,-0.38,0],0.0032,'#9aa096');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.15,spinSpeed:0.64,phase:0.6,amp:0.25,swayZ:0.04,swayX:0.035};
  const loops=[
   // Upper-left & sweeping lower-right figure-8 arabesque
   {pts:[[0.02,-0.40,0.0],[-0.24,-0.52,0.10],[-0.38,-0.78,0.14],[-0.22,-1.02,0.06],[0.14,-1.18,-0.08],[0.42,-1.40,-0.12],[0.34,-1.68,0.04],[0.04,-1.74,0.12],[-0.18,-1.52,0.08],[-0.08,-1.18,0.02],[0.16,-0.84,-0.06],[0.12,-0.52,-0.04],[0.02,-0.40,0.0]],n:46},
   // Secondary crossing lower-left & mid-right open loop
   {pts:[[-0.08,-0.74,-0.08],[-0.34,-1.04,-0.14],[-0.46,-1.38,-0.06],[-0.30,-1.64,0.08],[0.02,-1.54,0.14],[0.26,-1.28,0.12],[0.28,-0.98,0.04],[0.04,-0.88,-0.04],[-0.08,-0.74,-0.08]],n:38}
  ];
  const capCols=['#1548b8','#1ca2e8','#1548b8','#18a04c','#f2f2ee','#1ca2e8','#1548b8','#22b458','#1548b8'];
  let cIdx=0;
  for(const lp of loops){
   const cObj=new THREE.CatmullRomCurve3(lp.pts.map(p=>V(...p)));
   const tube=new THREE.Mesh(new THREE.TubeGeometry(cObj,48,0.009,8,false),mat('#a8945c',0.42,0.38));
   tube.castShadow=true;mob.add(tube);
   for(let k=0;k<lp.n;k++){
    const t=(k+0.5)/lp.n;
    const pt=cObj.getPointAt(t),tan=cObj.getTangentAt(t);
    const col=capCols[cIdx%capCols.length];
    const r=(cIdx%5===0)?0.064:0.052;
    const cap=addBottleCap3D(mob,[pt.x,pt.y,pt.z],null,col,r,0.024);
    cap.quaternion.setFromUnitVectors(V(0,1,0),tan);
    cIdx++;
   }
  }
  g.add(mob);
  return g;
 }
 if(id==='mov027'){
  // MOV-027: "Un recorrido de pequeños discos" — Loose sweeping 3D tan rattan/wire loops with chunky bright blue, yellow, green, red & white foam cylinders & discs (ARC-015011..13)
  rod(g,[0,0,0],[0,-0.36,0],0.0035,'#7c8478');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.12,spinSpeed:0.66,phase:1.1,amp:0.25,swayZ:0.04,swayX:0.035};
  const loops=[
   {pts:[[0,-0.38,0],[-0.26,-0.58,0.12],[-0.38,-0.98,0.16],[-0.26,-1.44,0.08],[0.06,-1.72,-0.04],[0.32,-1.48,-0.12],[0.36,-1.02,-0.06],[0.16,-0.58,0.04],[0,-0.38,0]],n:22},
   {pts:[[0.04,-0.46,-0.04],[0.28,-0.72,0.14],[0.34,-1.18,0.18],[0.14,-1.62,0.10],[-0.20,-1.64,-0.08],[-0.34,-1.24,-0.16],[-0.18,-0.78,-0.12],[0.04,-0.46,-0.04]],n:20},
   {pts:[[-0.18,-0.84,0.08],[0.08,-0.92,0.20],[0.28,-1.22,0.04],[0.02,-1.46,-0.14],[-0.26,-1.32,-0.06],[-0.18,-0.84,0.08]],n:14}
  ];
  const cols=['#1898ec','#f5cc14','#1854c8','#24b24c','#e42824','#f4f4f0','#f5cc14','#1898ec','#24b24c'];
  let idx=0;
  for(const lp of loops){
   const cObj=new THREE.CatmullRomCurve3(lp.pts.map(p=>V(...p)));
   const tube=new THREE.Mesh(new THREE.TubeGeometry(cObj,40,0.010,8,false),mat('#baa878',0.52,0.25));
   tube.castShadow=true;mob.add(tube);
   for(let k=0;k<lp.n;k++){
    const t=(k+0.4)/lp.n;
    const pt=cObj.getPointAt(t),tan=cObj.getTangentAt(t);
    const col=cols[idx%cols.length];
    const isFoamCyl=(idx%3===0);
    const r=isFoamCyl?0.072:0.058,h=isFoamCyl?0.052:0.028;
    const piece=addBottleCap3D(mob,[pt.x,pt.y,pt.z],null,col,r,h);
    piece.quaternion.setFromUnitVectors(V(0,1,0),tan);
    idx++;
   }
  }
  g.add(mob);
  return g;
 }
 if(id==='mov029'){
  // MOV-029: "Estructura rojiza con tapones" — Offset terracotta EVA puzzle-mat foam column (x=-0.14) pierced by 8 dowels + sweeping right-hand amber tube arches with 30 colorful bottle caps (cut-mov-029-1.webp)
  rod(g,[-0.08,0,0],[-0.12,-0.30,0],0.0045,'#9e7256');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.10,spinSpeed:0.62,phase:0.5,amp:0.24,swayZ:0.04,swayX:0.035};
  const terraMat=mat('#c85a3c',0.68,0.04);
  const terraDark=mat('#a8462c',0.72,0.04);
  const colX=-0.14;
  for(let s=0;s<6;s++){
   const sy=-0.44-s*0.24;
   for(const sz of [-0.036,0.036]){
    const tile=new THREE.Mesh(boxGeo,s%2?terraMat:terraDark);
    tile.scale.set(0.21,0.23,0.028);
    tile.position.set(colX+((s%2)-0.5)*0.02,sy,sz);
    tile.rotation.y=((s%3)-1)*0.08;
    tile.castShadow=true;tile.receiveShadow=true;mob.add(tile);
    for(const ty of [-0.06,0.06])for(const tx of [-0.12,0.12]){
     const tab=new THREE.Mesh(boxGeo,terraMat);
     tab.scale.set(0.036,0.042,0.028);
     tab.position.set(colX+tx,sy+ty,sz);mob.add(tab);
    }
   }
  }
  for(let d=0;d<8;d++){
   const dy=-0.42-d*0.18;
   const az=(d%2?0.32:-0.32)+(d%3)*0.16;
   const tilt=((d%3)-1)*0.15;
   const dx=Math.cos(az)*0.34,dz=Math.sin(az)*0.34;
   rod(mob,[colX-dx*0.78,dy-tilt,-dz],[colX+dx*1.12,dy+tilt,dz],0.008,'#b84e32');
  }
  const loops=[
   [[colX+0.06,-0.38,0.05],[0.26,-0.62,0.16],[0.44,-1.02,0.12],[0.22,-1.40,0.06],[colX+0.04,-1.66,-0.04]],
   [[colX+0.08,-0.46,-0.05],[0.34,-0.74,-0.14],[0.46,-1.18,0.08],[0.26,-1.54,0.14],[colX+0.02,-1.76,0.04]],
   [[colX-0.06,-0.54,0.10],[-0.34,-0.88,0.14],[-0.26,-1.30,0.08],[0.12,-1.56,-0.06]],
   [[colX+0.10,-0.66,0.10],[0.38,-0.98,0.18],[0.32,-1.38,-0.10],[colX+0.04,-1.64,-0.08]]
  ];
  const capCols=['#229e48','#1cb0f0','#1b52c4','#7c38b8','#e8dec8','#e02828','#229e48'];
  let cIdx=0;
  for(const lp of loops){
   const cObj=new THREE.CatmullRomCurve3(lp.map(p=>V(...p)));
   const tube=new THREE.Mesh(new THREE.TubeGeometry(cObj,24,0.011,8,false),mat('#c28e46',0.42,0.35));
   tube.castShadow=true;mob.add(tube);
   for(let k=1;k<=7;k++){
    const t=k/8;
    const pt=cObj.getPointAt(t),tan=cObj.getTangentAt(t);
    const cap=addBottleCap3D(mob,[pt.x,pt.y,pt.z],null,capCols[cIdx%capCols.length],0.056,0.026);
    cap.quaternion.setFromUnitVectors(V(0,1,0),tan);
    cIdx++;
   }
  }
  g.add(mob);
  return g;
 }
 if(id==='mov030'){
  // MOV-030: "Columna de discos multicolores" — Gently S-curved column of 14 scalloped flower discs + wide side-arching loops of white & blue jug caps jutting out left & right (ARC-015051..53)
  rod(g,[0,0,0],[0,-0.38,0],0.0035,'#9aa0a6');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.10,spinSpeed:0.58,phase:0.3,amp:0.20,swayZ:0.032,swayX:0.028};
  const wheelCols=[
   '#189858','#1868d8','#d82828','#1868d8','#189858','#d82828','#f5c818',
   '#f5c818','#d82828','#1868d8','#d82828','#189858','#f5c818','#1868d8'
  ];
  for(let i=0;i<14;i++){
   const u=i/13;
   const wy=-0.44-i*0.092;
   const wx=0.038*Math.sin(u*Math.PI*1.6);
   const wz=0.028*Math.cos(u*Math.PI*1.4);
   const w=addLobedWheelRing3D(mob,[wx,wy,wz],i*0.38,wheelCols[i],0.152,0.082);
   w.rotation.z=0.09*Math.cos(u*Math.PI*1.6);
  }
  const tubeDefs=[
   // Upper-left & top sweeping loop of sky-blue, cobalt & white caps
   {pts:[[-0.08,-0.44,0.08],[-0.34,-0.54,0.14],[-0.38,-0.78,0.08],[-0.14,-0.88,0.16],[0.18,-0.68,0.14],[0.28,-0.50,-0.04]],cols:['#1cb0f0','#1848b8','#f4f4f0','#1cb0f0','#d82424','#f4f4f0','#1cb0f0']},
   // Wide right-side arching loop jutting out (prominent in ARC-015052 & ARC-015053!)
   {pts:[[0.10,-0.74,0.10],[0.36,-0.88,0.12],[0.44,-1.14,0.02],[0.34,-1.38,-0.10],[0.08,-1.44,-0.14]],cols:['#f4f4f0','#1cb0f0','#f4f4f0','#1848b8','#f4f4f0','#f4f4f0','#189858']},
   // Lower-left & front diagonal arch of white, blue & red jug caps
   {pts:[[0.12,-1.12,0.16],[-0.14,-1.24,0.18],[-0.36,-1.42,0.08],[-0.28,-1.60,-0.08],[0.06,-1.58,-0.12]],cols:['#f4f4f0','#1848b8','#d82424','#f4f4f0','#1848b8','#1cb0f0']}
  ];
  for(const td of tubeDefs){
   const cObj=new THREE.CatmullRomCurve3(td.pts.map(p=>V(...p)));
   const tube=new THREE.Mesh(new THREE.TubeGeometry(cObj,28,0.0095,8,false),mat('#b8b4a2',0.36,0.52));
   tube.castShadow=true;mob.add(tube);
   const n=td.cols.length;
   for(let k=0;k<n;k++){
    const t=(k+0.5)/n;
    const pt=cObj.getPointAt(t),tan=cObj.getTangentAt(t);
    const col=td.cols[k];
    const capR=(col==='#f4f4f0'||col==='#1cb0f0')?0.068:0.054;
    const cap=addBottleCap3D(mob,[pt.x,pt.y,pt.z],null,col,capR,0.026);
    cap.quaternion.setFromUnitVectors(V(0,1,0),tan);
   }
  }
  g.add(mob);
  return g;
 }
 if(id==='mov031'){
  // MOV-031: "Recipientes rosas, verdes y amarillos" — 4 colored vertical cords (orange, green, silver-white, yellow) + diagonal 3D skewer star of mint-green, yellow & pink foam cups/discs (ARC-015058..60 & cut-mov-031-1.webp)
  rod(g,[-0.26,0,0.02],[-0.26,-0.62,0.04],0.0038,'#e87828');
  rod(g,[-0.08,0,-0.02],[-0.08,-0.68,-0.02],0.0038,'#48b868');
  rod(g,[0.10,0,0.02],[0.10,-0.70,0.03],0.0034,'#b8bcb4');
  rod(g,[0.28,0,-0.02],[0.28,-0.64,-0.03],0.0038,'#ebd028');
  const mob=new THREE.Group();
  mob.userData.kineticSway={baseRotY:0.14,spinSpeed:0.68,phase:0.9,amp:0.22,swayZ:0.036,swayX:0.032};
  const dowelCol='#caa86a';
  const dowels=[
   [[-0.54,-0.64,0.10],[0.52,-1.18,-0.10]],
   [[-0.48,-1.14,-0.12],[0.54,-0.68,0.12]],
   [[-0.36,-0.56,-0.08],[0.38,-1.54,0.08]],
   [[-0.42,-1.44,0.10],[0.46,-0.98,-0.12]],
   [[-0.18,-0.52,0.14],[0.14,-1.64,-0.10]],
   [[-0.52,-0.92,0.04],[0.48,-1.36,0.06]],
   [[-0.26,-1.56,-0.06],[0.34,-1.48,0.08]]
  ];
  for(const [a,b] of dowels)rod(mob,a,b,0.0052,dowelCol);
  const elems=[
   // Chunky mint-green foam cups
   {pos:[-0.04,-0.72,0.05],rot:[0.4,0.3,0.65],r:0.105,h:0.135,col:'#34d284'},
   {pos:[-0.38,-1.04,-0.04],rot:[-0.3,0.4,1.10],r:0.086,h:0.115,col:'#34d284'},
   {pos:[0.12,-1.46,-0.02],rot:[0.25,-0.3,0.95],r:0.088,h:0.115,col:'#34d284'},
   // Bright yellow foam cylinders
   {pos:[0.24,-0.98,0.06],rot:[0.3,-0.4,0.78],r:0.098,h:0.130,col:'#f5d014'},
   {pos:[-0.16,-1.28,0.05],rot:[-0.35,0.2,0.88],r:0.096,h:0.128,col:'#f5d014'},
   // Magenta-pink thick foam rings/discs
   {pos:[-0.44,-0.68,0.08],rot:[0.3,0.2,1.25],r:0.082,h:0.046,col:'#e43a7a'},
   {pos:[0.42,-0.74,0.09],rot:[-0.3,0.3,1.18],r:0.082,h:0.046,col:'#e43a7a'},
   {pos:[-0.22,-0.92,0.02],rot:[0.4,-0.2,0.95],r:0.080,h:0.044,col:'#e43a7a'},
   {pos:[0.04,-1.08,-0.04],rot:[-0.3,0.4,1.12],r:0.084,h:0.048,col:'#e43a7a'},
   {pos:[0.42,-1.14,-0.08],rot:[0.2,-0.3,1.32],r:0.080,h:0.044,col:'#e43a7a'},
   {pos:[-0.34,-1.38,0.08],rot:[-0.25,0.3,1.22],r:0.082,h:0.046,col:'#e43a7a'},
   {pos:[0.32,-1.42,0.06],rot:[0.3,-0.2,1.28],r:0.080,h:0.044,col:'#e43a7a'},
   {pos:[-0.12,-1.56,-0.04],rot:[-0.2,0.2,1.35],r:0.078,h:0.044,col:'#e43a7a'},
   // Small orange & violet foam spacers
   {pos:[-0.28,-0.60,-0.04],rot:[0.2,0.1,1.2],r:0.038,h:0.042,col:'#f26820'},
   {pos:[0.14,-0.78,0.04],rot:[-0.3,0.2,1.1],r:0.038,h:0.042,col:'#7c38b8'},
   {pos:[-0.48,-0.92,0.04],rot:[0.3,-0.2,1.3],r:0.036,h:0.040,col:'#f26820'},
   {pos:[0.22,-1.24,0.03],rot:[-0.2,0.3,1.2],r:0.038,h:0.042,col:'#f26820'},
   {pos:[0.04,-1.34,-0.06],rot:[0.3,0.1,1.1],r:0.038,h:0.042,col:'#7c38b8'}
  ];
  const boreM=mat('#23201c',0.85);
  for(const el of elems){
   const eg=new THREE.Group();eg.position.set(...el.pos);eg.rotation.set(...el.rot);
   const m=new THREE.Mesh(cylinderGeo,mat(el.col,0.52,0.05));
   m.scale.set(el.r,el.h,el.r);m.castShadow=true;m.receiveShadow=true;eg.add(m);
   const hole=new THREE.Mesh(cylinderGeo,boreM);
   hole.scale.set(el.r*0.36,el.h+0.006,el.r*0.36);eg.add(hole);
   mob.add(eg);
  }
  g.add(mob);
  return g;
 }
 if(id==='mov016'||id==='color'){
  // MOV-016: "Color entre las ramas" — Rich 3D tangle of curved terracotta & cobalt-blue wires packed with ~22 saturated yellow, green, pink & blue foam rings, cylinders & C-arches (ARC-014847..863)
  rod(g,[-0.06,0,0],[-0.06,-0.44,0],0.0035,'#8a9084');
  const bluePts=[[-0.06,-0.44,0],[-0.24,-0.64,0.10],[-0.16,-0.98,0.16],[0.14,-1.24,0.08],[0.40,-1.36,0.02],[0.36,-1.06,0.14],[0.02,-0.88,-0.10],[-0.28,-0.86,-0.12],[-0.12,-1.26,-0.08]];
  const rustPts=[[-0.16,-0.58,0.08],[-0.14,-0.96,0.12],[-0.20,-1.34,0.08],[-0.22,-1.56,0.04]];
  const rustPts2=[[-0.18,-0.98,-0.04],[0.08,-0.96,-0.08],[0.36,-1.04,0.04],[0.44,-1.26,0.10],[0.18,-1.46,-0.04]];
  curve(g,bluePts,0.015,'#246ad4');
  curve(g,rustPts,0.017,'#b84a24');
  curve(g,rustPts2,0.016,'#b84a24');
  const boreMat=mat('#24201c',0.88);
  const pieces=[
   {type:'cyl',pos:[-0.06,-0.48,0.02],rot:[0.3,0.2,0.4],r:0.072,h:0.076,col:'#2eb862'},
   {type:'cyl',pos:[-0.20,-0.64,0.09],rot:[0.4,0.1,-0.3],r:0.092,h:0.088,col:'#f5cc18'},
   {type:'arch',pos:[-0.10,-0.74,0.06],rot:[0.4,0.3,0.5],r:0.096,col:'#f5cc18'},
   {type:'washer',pos:[-0.30,-0.84,0.04],rot:[0.3,0.5,0.8],r:0.072,h:0.034,col:'#e84c78'},
   {type:'cyl',pos:[-0.28,-0.92,-0.04],rot:[-0.3,0.2,0.6],r:0.070,h:0.072,col:'#38c26c'},
   {type:'cyl',pos:[-0.10,-0.88,-0.06],rot:[0.5,-0.3,0.2],r:0.080,h:0.080,col:'#f5cc18'},
   {type:'washer',pos:[0.04,-0.88,-0.08],rot:[-0.3,0.4,0.9],r:0.072,h:0.034,col:'#2878dc'},
   {type:'cyl',pos:[-0.14,-1.08,0.10],rot:[0.2,-0.2,0.5],r:0.076,h:0.072,col:'#38c26c'},
   {type:'washer',pos:[-0.12,-1.22,-0.06],rot:[0.4,0.3,-0.6],r:0.074,h:0.036,col:'#e84c78'},
   {type:'cyl',pos:[-0.20,-1.34,0.08],rot:[0.12,0.2,0.08],r:0.090,h:0.140,col:'#42c46e'},
   {type:'bar',pos:[-0.22,-1.52,0.04],rot:[0.2,0.1,-0.25],size:[0.13,0.17,0.044],col:'#f5cc18'},
   {type:'washer',pos:[0.00,-1.18,0.08],rot:[0.3,0.7,-0.5],r:0.078,h:0.030,col:'#e84c78'},
   {type:'washer',pos:[0.06,-1.24,0.08],rot:[0.3,0.7,-0.5],r:0.078,h:0.030,col:'#e84c78'},
   {type:'arch',pos:[0.16,-0.96,-0.04],rot:[0.2,-0.3,0.85],r:0.108,col:'#f5cc18'},
   {type:'cyl',pos:[0.22,-1.12,0.08],rot:[-0.3,0.3,0.6],r:0.074,h:0.068,col:'#2878dc'},
   {type:'arch',pos:[0.34,-1.34,0.04],rot:[-0.25,0.4,-0.95],r:0.112,col:'#f5cc18'},
   {type:'washer',pos:[0.38,-1.04,0.06],rot:[0.6,0.3,-0.4],r:0.076,h:0.036,col:'#e84c78'},
   {type:'cyl',pos:[0.30,-1.16,-0.02],rot:[0.3,-0.2,0.5],r:0.072,h:0.072,col:'#42c46e'},
   {type:'cyl',pos:[0.44,-1.18,0.08],rot:[0.2,0.4,0.7],r:0.066,h:0.062,col:'#f5cc18'},
   {type:'washer',pos:[0.18,-1.44,-0.04],rot:[0.3,-0.4,0.8],r:0.076,h:0.036,col:'#f5cc18'}
  ];
  for(const p of pieces){
   const m=mat(p.col,0.58);
   if(p.type==='cyl'||p.type==='washer'){
    const pg=new THREE.Group();pg.position.set(...p.pos);pg.rotation.set(...p.rot);
    const body=new THREE.Mesh(cylinderGeo,m);body.scale.set(p.r,p.h,p.r);body.castShadow=true;body.receiveShadow=true;pg.add(body);
    const hole=new THREE.Mesh(cylinderGeo,boreMat);hole.scale.set(p.r*0.34,p.h+0.006,p.r*0.34);pg.add(hole);
    g.add(pg);
   }else if(p.type==='bar'){
    const mesh=new THREE.Mesh(boxGeo,m);mesh.scale.set(...p.size);
    mesh.position.set(...p.pos);mesh.rotation.set(...p.rot);
    mesh.castShadow=true;mesh.receiveShadow=true;g.add(mesh);
   }else{
    const mesh=new THREE.Mesh(new THREE.TorusGeometry(p.r,0.032,12,22,Math.PI*1.28),m);
    mesh.position.set(...p.pos);mesh.rotation.set(...p.rot);
    mesh.castShadow=true;mesh.receiveShadow=true;g.add(mesh);
   }
  }
  return g;
 }
 if(id==='mov018'){
  // MOV-018: "Líneas de color al aire libre" — Crisp orange figure-8 tube piercing slender colorful foam cylinders (faithful to mov-018.webp)
  rod(g,[0,0,0],[0,-0.46,0],0.0035,'#8a9084');
  const eye=new THREE.Mesh(new THREE.TorusGeometry(0.020,0.004,8,16),mat('#adb4bc',0.35,0.7));
  eye.position.set(0,-0.47,0);g.add(eye);
  const loop1=[
   [0,-0.48,0],[-0.15,-0.58,0.05],[-0.24,-0.90,0.08],[-0.16,-1.28,0.06],
   [-0.11,-1.68,0.04],[0.02,-1.88,0.02],[0.15,-1.64,-0.04],[0.18,-1.22,-0.05],
   [0.06,-0.80,-0.03],[-0.08,-0.64,0.02]
  ];
  const loop2=[
   [0,-0.48,0],[0.19,-0.60,-0.03],[0.32,-0.88,0.04],[0.26,-1.12,0.06],
   [0.05,-1.16,0.03],[-0.22,-1.14,-0.03]
  ];
  curve(g,loop1,0.015,'#df521e');
  curve(g,loop2,0.015,'#df521e');
  const noodles=[
   {pos:[0.10,-0.56,0.02],rot:[0.16,0.12,-0.50],r:0.068,len:0.68,col:'#388ce4'},
   {pos:[-0.15,-0.58,0.08],rot:[0.22,0.18,0.92],r:0.062,len:0.40,col:'#f5cc1e'},
   {pos:[0.21,-0.68,-0.03],rot:[1.2,0.2,0.3],r:0.060,len:0.14,col:'#f5cc1e'},
   {pos:[0.31,-0.90,0.05],rot:[0.15,0.22,1.40],r:0.062,len:0.26,col:'#ec4a72'},
   {pos:[-0.25,-0.88,0.09],rot:[0.26,-0.14,-1.02],r:0.064,len:0.38,col:'#46c888'},
   {pos:[-0.20,-1.08,0.02],rot:[0.10,0.16,1.45],r:0.048,len:0.42,col:'#ec4a72'},
   {pos:[-0.08,-1.04,-0.05],rot:[0.20,0.10,0.08],r:0.048,len:0.32,col:'#ec4a72'},
   {pos:[0.10,-1.15,0.06],rot:[1.15,-0.22,0.45],r:0.058,len:0.19,col:'#388ce4'},
   {pos:[-0.10,-1.28,0.08],rot:[0.06,0.14,1.54],r:0.058,len:0.50,col:'#388ce4'},
   {pos:[-0.18,-1.50,-0.03],rot:[-0.18,0.22,-1.08],r:0.050,len:0.36,col:'#f5cc1e'},
   {pos:[0.18,-1.58,0.05],rot:[0.16,-0.12,1.12],r:0.056,len:0.44,col:'#46c888'},
   {pos:[-0.10,-1.74,0.06],rot:[0.06,0.10,0.05],r:0.062,len:0.36,col:'#f5cc1e'}
  ];
  for(const n of noodles){
   const ng=new THREE.Group();
   ng.position.set(...n.pos);ng.rotation.set(...n.rot);
   const body=new THREE.Mesh(cylinderGeo,mat(n.col,0.62));
   body.scale.set(n.r,n.len,n.r);body.castShadow=true;body.receiveShadow=true;ng.add(body);
   const hole=new THREE.Mesh(cylinderGeo,mat('#28221e',0.9));
   hole.scale.set(n.r*0.30,n.len+0.008,n.r*0.30);ng.add(hole);
   g.add(ng);
  }
  return g;
 }
 if(id==='mov019'){
  // MOV-019: "Círculo azul y blanco" — Slender steel-blue hoop filled with a plump 3D lenticular cellular filigree of crinkled cobalt-blue & white wires (ARC-014890..909)
  rod(g,[0,0,0],[0,-0.44,0],0.0035,'#8a9084');
  const topEye=new THREE.Mesh(new THREE.TorusGeometry(0.022,0.0045,8,16),mat('#5c7fa3',0.36,0.45));
  topEye.position.set(0,-0.45,0);g.add(topEye);
  const cy=-1.14,R=0.68;
  const hoop=new THREE.Mesh(new THREE.TorusGeometry(R,0.015,14,56),mat('#56789c',0.36,0.38));
  hoop.position.set(0,cy,0);hoop.castShadow=true;g.add(hoop);
  const cols=['#1e56c2','#f5f5f2','#2d6cd8','#f5f5f2','#1948a6','#ecece6'];
  for(let s=0;s<38;s++){
   const aStart=(s/38)*Math.PI*2+rand()*0.15;
   const aEnd=aStart+Math.PI*(0.65+rand()*0.75);
   const pts=[];
   const steps=14;
   for(let p=0;p<=steps;p++){
    const u=p/steps;
    const baseX=Math.cos(aStart)*(1-u)*R*0.97+Math.cos(aEnd)*u*R*0.97;
    const baseY=Math.sin(aStart)*(1-u)*R*0.97+Math.sin(aEnd)*u*R*0.97;
    const env=Math.sin(u*Math.PI);
    const crinkleA=s*2.3+p*1.75;
    let wx=baseX+Math.cos(crinkleA)*0.15*env+(rand()-0.5)*0.05*env;
    let wy=baseY+Math.sin(crinkleA*1.3)*0.15*env+(rand()-0.5)*0.05*env;
    const rad=Math.hypot(wx,wy);
    if(rad>R*0.96){wx*=R*0.96/rad;wy*=R*0.96/rad;}
    const dome=Math.sqrt(Math.max(0,1-(rad*rad)/(R*R)));
    const wz=(Math.sin(crinkleA*0.95)*0.145+(rand()-0.5)*0.05)*dome*env;
    pts.push([wx,cy+wy,wz]);
   }
   curve(g,pts,0.0065,cols[s%cols.length]);
  }
  // 28 small crinkled 3D cellular wire loops giving authentic lacy foam-like interior texture
  for(let c=0;c<28;c++){
   const ca=c*2.39996,cr=0.10+0.50*Math.sqrt((c+0.5)/28);
   const dome=Math.sqrt(Math.max(0,1-(cr*cr)/(R*R)));
   const cell=new THREE.Mesh(new THREE.TorusGeometry(0.055+(c%3)*0.018,0.0055,6,16),mat(cols[c%cols.length],0.38,0.25));
   cell.position.set(Math.cos(ca)*cr,cy+Math.sin(ca)*cr,((c%2)-0.5)*0.16*dome);
   cell.rotation.set((c%3)*0.45,(c%5)*0.52,ca);
   g.add(cell);
  }
  return g;
 }
 if(id==='mov023'){
  // MOV-023: "Círculos rojos entrelazados" — 6 woven lattice baskets with red slotted circular bases & 66 radial colorful marker tubes
  rod(g,[0,-0.02,0],[-0.06,-0.42,0],0.004,'#7a8075');
  rod(g,[0.04,-0.02,0],[0.08,-0.38,0],0.004,'#7a8075');
  const baskets=[
   {pos:[0.08,-0.48,0.04],rot:[0.55,0.3,-0.4],r:0.20,h:0.28,wallCol:'#1f2226',redBase:false},
   {pos:[-0.18,-0.68,0.06],rot:[0.15,0.4,1.35],r:0.19,h:0.32,wallCol:'#7c6244',redBase:false},
   {pos:[-0.12,-0.92,0.12],rot:[1.25,-0.3,0.4],r:0.20,h:0.30,wallCol:'#846848',redBase:true},
   {pos:[0.24,-0.96,0.06],rot:[0.85,-0.8,-0.5],r:0.22,h:0.32,wallCol:'#745a3e',redBase:true},
   {pos:[-0.14,-1.22,0.10],rot:[1.35,0.15,-0.2],r:0.19,h:0.28,wallCol:'#8a6e4c',redBase:true},
   {pos:[0.16,-1.42,0.08],rot:[1.15,-0.45,0.3],r:0.21,h:0.32,wallCol:'#7c6244',redBase:true},
   {pos:[-0.06,-1.56,0.06],rot:[1.42,0.2,-0.15],r:0.19,h:0.28,wallCol:'#3a352e',redBase:true}
  ];
  const penCols=['#e8322e','#f5cc18','#3288e2','#42b862','#ec5888','#f4f2ec','#9b4dca'];
  baskets.forEach((b,bi)=>{
   const bg=new THREE.Group();
   bg.position.set(...b.pos);bg.rotation.set(...b.rot);
   // Woven open lattice cylinder: 5 horizontal rings + 14 vertical ribs
   for(let hr=0;hr<5;hr++){
    const hy=-b.h/2+(hr/4)*b.h;
    const tr=b.r*(0.92+0.12*(hr/4));
    const ring=new THREE.Mesh(new THREE.TorusGeometry(tr,0.010,8,24),mat(b.wallCol,0.75));
    ring.rotation.x=Math.PI/2;ring.position.y=hy;ring.castShadow=true;bg.add(ring);
   }
   for(let vr=0;vr<14;vr++){
    const va=(vr/14)*Math.PI*2;
    rod(bg,[Math.cos(va)*b.r*0.92,-b.h/2,Math.sin(va)*b.r*0.92],[Math.cos(va)*b.r*1.04,b.h/2,Math.sin(va)*b.r*1.04],0.008,b.wallCol);
   }
   if(b.redBase){
    const baseDisc=new THREE.Mesh(cylinderGeo,mat('#cc2d30',0.45));
    baseDisc.scale.set(b.r*0.94,0.022,b.r*0.94);
    baseDisc.position.y=-b.h/2;baseDisc.castShadow=true;bg.add(baseDisc);
    const hub=new THREE.Mesh(new THREE.TorusGeometry(b.r*0.48,0.012,8,20),mat('#9e1b1e',0.5));
    hub.rotation.x=Math.PI/2;hub.position.y=-b.h/2-0.012;bg.add(hub);
   }
   // 10 radial colorful marker/pen tubes sticking out through the basket mesh
   for(let p=0;p<10;p++){
    const pa=(p/10)*Math.PI*2+bi*0.4;
    const py=(rand()-0.5)*b.h*0.75;
    const pCol=penCols[(bi*3+p)%penCols.length];
    const r0=b.r*0.72,r1=b.r*1.48;
    rod(bg,[Math.cos(pa)*r0,py,Math.sin(pa)*r0],[Math.cos(pa)*r1,py+(rand()-0.5)*0.08,Math.sin(pa)*r1],0.012,pCol);
   }
   g.add(bg);
  });
  // Sweeping silver-grey flexible tubes weaving around the baskets
  curve(g,[[-0.32,-0.75,0.08],[0.05,-0.65,0.22],[0.32,-0.88,0.12],[-0.28,-1.18,0.18],[-0.38,-1.52,0.04],[0.02,-1.68,-0.08]],0.011,'#a8a49c');
  return g;
 }
 if(id==='mov025'){
  // MOV-025: "Trama oscura con flores de color" — Corrugated silver-grey outer teardrop hoop completely filled edge-to-edge with dark & silver wire mesh, 10 6-petal bottle-cap flowers, and bottom dangling chainlets (ARC-015002)
  rod(g,[0,0,0],[0,-0.32,0],0.0042,'#7c848c');
  const framePts=[];
  const nPts=48;
  for(let i=0;i<=nPts;i++){
   const t=(i/nPts)*Math.PI*2;
   const sy=-1.10+Math.cos(t)*0.74;
   const widthFactor=0.50*(1-0.28*Math.cos(t))*Math.sin(t);
   framePts.push([widthFactor,sy,Math.sin(t*3)*0.016]);
  }
  curve(g,framePts,0.019,'#8e96a0',true);
  const hoopCurve=new THREE.CatmullRomCurve3(framePts.slice(0,-1).map(p=>V(...p)),true);
  const ribM=mat('#444a52',0.55,0.45);
  for(let k=0;k<72;k++){
   const pt=hoopCurve.getPointAt(k/72),tan=hoopCurve.getTangentAt(k/72);
   const rib=new THREE.Mesh(new THREE.TorusGeometry(0.020,0.0032,6,12),ribM);
   rib.position.copy(pt);rib.quaternion.setFromUnitVectors(V(0,0,1),tan);g.add(rib);
  }
  // Edge-to-edge 3D coiled dark charcoal & bright silver wire mesh reaching the inner rim of the teardrop hoop
  for(let r=0;r<42;r++){
   const a0=(r/42)*Math.PI*2;
   const rPts=[];
   for(let k=0;k<8;k++){
    const ka=a0+k*0.72+(rand()-0.5)*0.34;
    const frac=0.22+0.74*((k%3===0)?0.96:rand());
    const py=-1.10+Math.cos(ka)*0.70*frac;
    const halfW=0.47*(1-0.28*Math.cos(ka))*Math.sin(ka)*frac;
    rPts.push([halfW,py,(rand()-0.5)*0.15]);
   }
   const isSilv=(r%3===0);
   curve(g,rPts,isSilv?0.0052:0.0105,isSilv?'#bcc4ce':(r%2?'#1c2024':'#2b3136'));
  }
  // Delicate silver wire chainlets / twisted loops dangling from the bottom arc of the teardrop (matching cut-mov-025-1.webp)
  for(const dx of [-0.26,-0.19,-0.12,-0.05,0.02,0.09,0.16,0.23]){
   const topY=-1.83+Math.abs(dx)*0.34;
   const dLen=0.11+(Math.abs(Math.round(dx*100))%3)*0.035;
   for(let lk=0;lk<4;lk++){
    const ly=topY-lk*(dLen/4)-0.015;
    const ring=new THREE.Mesh(new THREE.TorusGeometry(0.012,0.0022,6,12),mat('#b8c0ca',0.32,0.72));
    ring.scale.set(0.75,1.35,1);ring.position.set(dx,ly,0);ring.rotation.y=(lk%2)*1.3;g.add(ring);
   }
  }
  // 10 crisp 6-petal bottle-cap flowers (emerald-green, cobalt-blue, crimson-red) filling the teardrop mesh
  const flowers=[
   {pos:[-0.07,-0.58,0.03],col:'#18b068',rz:0.15,sc:1.06},
   {pos:[0.13,-0.68,-0.02],col:'#18a862',rz:0.35,sc:1.05},
   {pos:[-0.24,-0.88,-0.03],col:'#18a862',rz:0.08,sc:1.10},
   {pos:[0.01,-0.88,0.04],col:'#e42c24',rz:0.42,sc:1.12},
   {pos:[0.27,-0.96,0.02],col:'#18a862',rz:0.22,sc:1.08},
   {pos:[-0.29,-1.18,0.03],col:'#1860d4',rz:0.18,sc:1.12},
   {pos:[-0.03,-1.16,0.05],col:'#1860d4',rz:0.28,sc:1.14},
   {pos:[0.26,-1.24,-0.02],col:'#e42c24',rz:0.20,sc:1.10},
   {pos:[-0.14,-1.46,0.03],col:'#e42c24',rz:0.12,sc:1.12},
   {pos:[0.15,-1.48,0.03],col:'#1860d4',rz:0.30,sc:1.12}
  ];
  for(const f of flowers){
   const fg=new THREE.Group();fg.position.set(...f.pos);fg.scale.setScalar(f.sc);fg.rotation.set((rand()-0.5)*0.22,(rand()-0.5)*0.22,f.rz);
   addBottleCap3D(fg,[0,0,0],[Math.PI/2,0,0],f.col,0.038,0.022);
   for(let p=0;p<6;p++){
    const pa=(p/6)*Math.PI*2;
    addBottleCap3D(fg,[Math.cos(pa)*0.076,Math.sin(pa)*0.076,0],[Math.PI/2,0,0],f.col,0.036,0.020);
   }
   g.add(fg);
  }
  return g;
 }
 if(id==='mov026'){
  // MOV-026: "Arco rojo y discos azules" — Two thick curved red C-arches + 4 silver wire loops threaded with 42 cobalt-blue bottle caps
  rod(g,[0,0,0],[0,-0.44,0],0.004,'#2b302c');
  // Main large red C-arch
  const redArch1=[[-0.06,-0.44,0],[-0.26,-0.68,0.04],[-0.36,-1.04,0.06],[-0.28,-1.36,0.02],[-0.02,-1.46,-0.04],[0.24,-1.30,-0.02],[0.32,-1.08,0.04]];
  // Lower secondary red C-arch
  const redArch2=[[0.12,-0.96,-0.06],[-0.08,-1.06,-0.10],[-0.16,-1.32,-0.08],[0.04,-1.56,0.02],[0.32,-1.64,0.06],[0.48,-1.58,0.08]];
  curve(g,redArch1,0.062,'#e02828');
  curve(g,redArch2,0.054,'#e02828');
  // 4 silver-brass wire loops arching around the red C-arches
  const wireLoops=[
   [[-0.06,-0.44,0],[0.14,-0.58,0.08],[0.26,-0.82,0.10],[0.16,-1.06,0.04],[-0.18,-1.28,-0.04]],
   [[-0.26,-0.78,0.04],[-0.02,-0.78,0.14],[0.20,-0.98,0.12],[0.02,-1.24,0.08],[-0.28,-1.48,0.04]],
   [[-0.32,-0.92,0.02],[-0.48,-1.18,-0.06],[-0.44,-1.48,-0.04],[-0.18,-1.62,0.04],[0.12,-1.38,0.08]],
   [[0.26,-1.16,0.04],[0.42,-1.36,-0.06],[0.32,-1.66,-0.04],[0.04,-1.74,-0.02],[-0.08,-1.54,-0.06]]
  ];
  for(const wl of wireLoops){
   const cObj=new THREE.CatmullRomCurve3(wl.map(p=>V(...p)));
   const mesh=new THREE.Mesh(new THREE.TubeGeometry(cObj,24,0.010,8,false),mat('#b5b2a4',0.35,0.55));
   mesh.castShadow=true;g.add(mesh);
   // Thread 9 cobalt-blue bottle caps along each wire loop
   for(let k=1;k<=9;k++){
    const t=k/10;
    const pt=cObj.getPointAt(t),tan=cObj.getTangentAt(t);
    const cap=addBottleCap3D(g,[pt.x,pt.y,pt.z],null,'#185cc4',0.056,0.026);
    cap.quaternion.setFromUnitVectors(V(0,1,0),tan);
   }
  }
  // End clusters of blue caps at top & bottom of red arches
  addBottleCap3D(g,[-0.08,-0.42,0.04],[0.3,0.4,1.2],'#185cc4',0.062,0.030);
  for(let c=0;c<4;c++)addBottleCap3D(g,[0.30+c*0.045,-1.58,0.08],[0.1,0.2,1.57],'#185cc4',0.058,0.028);
  return g;
 }
 if(id==='mov028'){
  // MOV-028: "Círculo abierto de muchos colores" — 4 sweeping 3D brass-translucent tube loops threaded with 54 colorful plastic bottle caps
  rod(g,[0.12,0,0],[0.08,-0.42,0],0.004,'#7a8075');
  const loops=[
   {
    pts:[[0.04,-0.42,0],[-0.22,-0.62,0.08],[-0.42,-1.02,0.12],[-0.50,-1.44,0.06],[-0.34,-1.72,-0.04],[-0.02,-1.68,-0.08],[0.16,-1.28,-0.04],[0.08,-0.72,0.04]],
    cols:['#f4f4f0','#f4f4f0','#1d5ac2','#1d5ac2','#1d5ac2','#1d5ac2','#f5cc18','#18a858','#c88a28','#f5cc18','#1d5ac2','#f4f4f0','#1d5ac2']
   },
   {
    pts:[[0.08,-0.44,0],[0.32,-0.56,-0.06],[0.48,-0.88,-0.08],[0.46,-1.28,-0.04],[0.32,-1.58,0.06],[0.08,-1.64,0.10],[-0.16,-1.40,0.08],[-0.20,-0.98,0.04],[0.04,-0.68,0.02]],
    cols:['#f4f4f0','#1d5ac2','#289ee4','#1d5ac2','#1d5ac2','#f4f2ec','#e42824','#e42824','#e42824','#1d5ac2','#1d5ac2','#1d5ac2','#f4f4f0']
   },
   {
    pts:[[0.04,-0.52,0.06],[0.06,-0.88,0.14],[0.12,-1.26,0.14],[0.04,-1.58,0.08],[-0.18,-1.52,-0.06],[-0.22,-1.16,-0.12],[-0.04,-0.78,-0.08]],
    cols:['#1d5ac2','#f4f4f0','#1d5ac2','#f5cc18','#f4f4f0','#1d5ac2','#1d5ac2','#1d5ac2','#1d5ac2','#e42824']
   },
   {
    pts:[[-0.08,-1.18,0.08],[0.16,-1.24,0.12],[0.34,-1.38,0.04],[0.26,-1.62,-0.08],[0.02,-1.54,-0.10]],
    cols:['#1d5ac2','#8832b8','#8832b8','#289ee4','#e42824','#18a858','#f5cc18']
   }
  ];
  for(const lp of loops){
   const cObj=new THREE.CatmullRomCurve3(lp.pts.map(p=>V(...p)));
   const mesh=new THREE.Mesh(new THREE.TubeGeometry(cObj,28,0.012,8,false),mat('#b8ab88',0.42,0.35));
   mesh.castShadow=true;g.add(mesh);
   const n=lp.cols.length;
   for(let k=0;k<n;k++){
    const t=(k+0.5)/n;
    const pt=cObj.getPointAt(t),tan=cObj.getTangentAt(t);
    const col=lp.cols[k];
    const r=(col==='#f5cc18'||col==='#f4f4f0')?0.066:0.056;
    const cap=addBottleCap3D(g,[pt.x,pt.y,pt.z],null,col,r,0.028);
    cap.quaternion.setFromUnitVectors(V(0,1,0),tan);
   }
  }
  return g;
 }
 if(id==='mov017'){
  // MOV-017: "Planos de color entre los árboles" — Gnarled dark V-branch sculpture physically suspended in equilibrium with 7 perforated colored lattice strips (faithful to mov-017.webp)
  rod(g,[0,0,0],[-0.34,-0.74,0.04],0.003,'#889084');
  rod(g,[0,0,0],[0.26,-0.52,-0.02],0.003,'#889084');
  const bark='#3c322b';
  taperedBranch(g,[[0.02,-1.24,0.01],[0.0,-1.10,0]],0.028,0.046,bark,8,10,true);
  taperedBranch(g,[[0,-1.10,0],[-0.26,-0.80,0.03],[-0.54,-0.62,0.06]],0.042,0.018,bark,14,10,true);
  taperedBranch(g,[[-0.22,-0.84,0.03],[-0.16,-0.70,-0.05]],0.022,0.012,bark,8,8,true);
  taperedBranch(g,[[0,-1.10,0],[0.14,-0.76,-0.02],[0.04,-0.56,0.02],[0.32,-0.38,-0.02],[0.24,-0.14,0.02]],0.044,0.014,bark,16,10,true);
  taperedBranch(g,[[0.16,-0.68,-0.02],[0.38,-0.54,0.04],[0.56,-0.46,0.08]],0.030,0.014,bark,12,8,true);
  taperedBranch(g,[[0.30,-0.38,-0.02],[0.46,-0.34,0.04]],0.018,0.010,bark,8,6,true);
  const strips=[
   {pos:[-0.52,-0.63,0.06],cord:0.13,len:0.42,col:'#f4c414',rotY:0.20,twist:0.14},
   {pos:[-0.40,-0.70,0.05],cord:0.11,len:0.38,col:'#e85288',rotY:-0.12,twist:-0.10},
   {pos:[0.03,-0.58,0.02],cord:0.10,len:0.42,col:'#38b266',rotY:0.08,twist:0.08},
   {pos:[0.22,-0.60,0.01],cord:0.12,len:0.42,col:'#2880d8',rotY:-0.15,twist:0.10},
   {pos:[0.25,-0.72,0.03],cord:0.14,len:0.44,col:'#e85288',rotY:0.22,twist:-0.12},
   {pos:[0.36,-0.55,0.04],cord:0.14,len:0.48,col:'#f4c414',rotY:-0.08,twist:0.10},
   {pos:[0.52,-0.47,0.07],cord:0.08,len:0.54,col:'#e85288',rotY:0.14,twist:0.18}
  ];
  strips.forEach((s,idx)=>{
   const sp=new THREE.Group();
   sp.position.set(...s.pos);
   sp.rotation.y=s.rotY;
   sp.userData.kineticSway={baseRotY:s.rotY,spinSpeed:0.85+idx*0.12,phase:idx*1.3,amp:0.24,swayZ:0.04,swayX:0.035};
   rod(sp,[0,0,0],[0,-s.cord,0],0.0028,'#d47230');
   const sm=buildPerforatedStrip3D(s.col,s.len,s.twist);
   sm.position.set(0,-s.cord-s.len/2+0.01,0);
   sp.add(sm);
   g.add(sp);
  });
  return g;
 }
 if(id==='mov022'){
  // MOV-022: "Arcos oscuros y pequeños acentos de color" — Open-grid perforated black nursery mesh pots in an S/C-arch bristling with thin colorful cable-ties/sticks (ARC-014955..58)
  rod(g,[0,0,0],[0,-0.38,0],0.0038,'#3a3d38');
  const archGroup=new THREE.Group();archGroup.position.set(0,-1.04,0);
  archGroup.userData.kineticSway={baseRotY:0.12,spinSpeed:0.62,phase:0.5,amp:0.22,swayZ:0.038,swayX:0.032};
  g.add(archGroup);
  // Interwoven dark structural tubing
  curve(archGroup,[[0.02,0.62,0],[0.24,0.38,0.06],[0.34,0.06,-0.04],[0.18,-0.28,0.06],[-0.16,-0.44,0.02],[-0.36,-0.22,-0.06],[-0.26,0.14,0.05]],0.016,'#202225');
  curve(archGroup,[[-0.08,0.48,-0.04],[0.16,0.18,-0.08],[0.26,-0.16,0.04],[-0.04,-0.38,-0.05],[-0.30,-0.06,0.06]],0.012,'#2c3034');
  const potSpecs=[
   [-0.04,0.48,0.02,0.55,0.2,-0.4],
   [0.20,0.30,0.05,-0.4,0.5,0.6],
   [-0.22,0.14,0.06,0.7,-0.3,0.5],
   [0.30,0.02,-0.04,0.3,0.8,-0.7],
   [0.06,-0.06,0.08,-0.6,0.2,0.4],
   [-0.32,-0.18,-0.04,0.5,-0.6,-0.5],
   [0.18,-0.30,0.04,-0.5,0.4,0.8],
   [-0.10,-0.42,0.02,0.6,0.3,-0.6]
  ];
  const tieCols=['#38c458','#e83868','#f5cc18','#2892e8','#f26e22','#e8e6de','#d82828'];
  const potMat=mat('#1d1f22',0.72,0.12);
  potSpecs.forEach(([bx,by,bz,rx,ry,rz],idx)=>{
   const pg=new THREE.Group();pg.position.set(bx,by,bz);pg.rotation.set(rx,ry,rz);
   const rTop=0.145,rBot=0.102,ph=0.19;
   // Open-grid perforated black nursery pot: 5 horizontal rings + 14 vertical ribs + slotted base ring
   for(let hr=0;hr<5;hr++){
    const u=hr/4,hy=-ph/2+u*ph,rr=rBot+(rTop-rBot)*u;
    const ring=new THREE.Mesh(new THREE.TorusGeometry(rr,hr===4?0.011:0.0065,6,20),potMat);
    ring.rotation.x=Math.PI/2;ring.position.y=hy;ring.castShadow=true;pg.add(ring);
   }
   for(let vr=0;vr<14;vr++){
    const va=(vr/14)*Math.PI*2;
    rod(pg,[Math.cos(va)*rBot,-ph/2,Math.sin(va)*rBot],[Math.cos(va)*rTop,ph/2,Math.sin(va)*rTop],0.0055,'#222528');
   }
   const botHub=new THREE.Mesh(new THREE.TorusGeometry(rBot*0.52,0.008,6,14),potMat);
   botHub.rotation.x=Math.PI/2;botHub.position.y=-ph/2;pg.add(botHub);
   // 11 thin colorful cable-ties / drinking-straw sticks bristling through the mesh slots (NO lollipop balls!)
   for(let t=0;t<11;t++){
    const ta=(t/11)*Math.PI*2+idx*0.55;
    const ty=((t%4)-1.5)*0.038;
    const col=tieCols[(idx*3+t)%tieCols.length];
    const r0=0.075,r1=0.195+(t%3)*0.028;
    rod(pg,[Math.cos(ta)*r0,ty,Math.sin(ta)*r0],[Math.cos(ta+0.12)*r1,ty+((t%3)-1)*0.045,Math.sin(ta+0.12)*r1],0.0052,col);
   }
   archGroup.add(pg);
  });
  return g;
 }
 if(id==='mov032'){
  // MOV-032: "Ramas y figuras geométricas" — Asymmetric bamboo/reed zig-zag mobile suspending chunky 3D purple, orange, crimson-red & warm yellow-ochre folded EVA foam forms (ARC-015062..65 & cut-mov-032-1.webp)
  rod(g,[0,0,0],[0,-0.24,0],0.0028,'#9e9a8e');
  const mob=new THREE.Group();
  mob.position.set(0,-0.24,0);
  mob.userData.kineticSway={baseRotY:0.12,spinSpeed:0.68,phase:0.7,amp:0.26,swayZ:0.045,swayX:0.038};
  const twigCol='#b89668';
  const twigs=[
   [[0,0,0],[-0.18,-0.34,0.04],[-0.42,-0.68,0.08]],
   [[-0.42,-0.68,0.08],[-0.14,-0.98,0.02],[0.02,-1.36,-0.02],[0.08,-1.70,0.02]],
   [[0.02,-1.36,-0.02],[0.14,-1.68,-0.04]],
   [[-0.18,-0.34,0.04],[0.06,-0.56,-0.06],[0.24,-0.82,-0.04]],
   [[0,0,0],[0.22,-0.22,-0.04],[0.38,-0.48,0.06]],
   [[0.22,-0.22,-0.04],[0.08,-0.44,0.08],[-0.08,-0.74,0.10]],
   [[0.24,-0.82,-0.04],[0.36,-1.08,0.06]],
   [[-0.14,-0.98,0.02],[-0.30,-1.22,-0.06]]
  ];
  for(const pts of twigs)taperedBranch(mob,pts,0.010,0.0065,twigCol,8,6,true);
  // Chunky volumetric 3D EVA foam shapes (thick triangular prism, folded V-wing, pyramid cone, trapezoid block)
  const triSh=new THREE.Shape();triSh.moveTo(-0.075,-0.065);triSh.lineTo(0.080,-0.050);triSh.lineTo(-0.010,0.085);triSh.closePath();
  const prismGeo=new THREE.ExtrudeGeometry(triSh,{depth:0.042,bevelEnabled:true,bevelThickness:0.006,bevelSize:0.006,bevelSegments:2});
  prismGeo.center();
  const trapSh=new THREE.Shape();trapSh.moveTo(-0.070,-0.058);trapSh.lineTo(0.072,-0.058);trapSh.lineTo(0.042,0.064);trapSh.lineTo(-0.046,0.064);trapSh.closePath();
  const trapGeo=new THREE.ExtrudeGeometry(trapSh,{depth:0.038,bevelEnabled:true,bevelThickness:0.005,bevelSize:0.005,bevelSegments:2});
  trapGeo.center();
  const coneGeo=new THREE.ConeGeometry(0.088,0.145,4);
  const geos=[prismGeo,trapGeo,coneGeo];
  const cols=['#7e3eb2','#f46c1e','#e02438','#8442b8','#f27422','#d82236','#7838aa','#e4283c','#f2b818'];
  const wedgePts=[
   [0.02,-0.08,0.02],[-0.14,-0.22,0.05],[0.18,-0.18,-0.04],[0.32,-0.36,0.05],
   [-0.28,-0.46,0.07],[-0.04,-0.40,0.09],[0.13,-0.48,-0.05],[0.38,-0.52,0.07],
   [-0.43,-0.68,0.09],[-0.21,-0.65,0.04],[0.03,-0.68,0.08],[0.22,-0.76,-0.04],
   [-0.28,-0.86,0.04],[-0.08,-0.92,0.03],[0.14,-0.92,0.02],[0.34,-1.04,0.06],
   [-0.30,-1.18,-0.05],[-0.10,-1.14,0.04],[0.09,-1.18,-0.03],
   [-0.04,-1.35,0.02],[0.13,-1.44,-0.03],[0.05,-1.58,0.02],[0.10,-1.72,-0.02]
  ];
  wedgePts.forEach((wp,wi)=>{
   const fMat=mat(cols[wi%cols.length],0.56,0.03);
   const drop=(wi%3===0)?0.0:0.032+(wi%2)*0.024;
   if(drop>0)rod(mob,wp,[wp[0],wp[1]-drop,wp[2]],0.0020,'#b5b0a4');
   const fg=new THREE.Group();
   fg.position.set(wp[0],wp[1]-drop-(drop>0?0.042:0),wp[2]);
   fg.rotation.set(wi*0.62,wi*1.05,(wi%2?0.42:-0.42));
   const m1=new THREE.Mesh(geos[wi%geos.length],fMat);
   const sc=1.06+(wi%3)*0.12;
   m1.scale.set(sc,sc,sc);m1.castShadow=true;m1.receiveShadow=true;fg.add(m1);
   if(wi%2===0){
    const m2=new THREE.Mesh(prismGeo,fMat);
    m2.scale.set(0.85*sc,0.85*sc,0.72*sc);
    m2.position.set(0.032,0.015,0.026);
    m2.rotation.set(0.45,0.78,-0.35);
    m2.castShadow=true;fg.add(m2);
   }
   mob.add(fg);
  });
  g.add(mob);
  return g;
 }
 if(id==='mov033'){
  // MOV-033: "Pequeños recipientes suspendidos" — Twin cords + central green cylinder (with red wedge) & yellow cylinder hub + radial skewers + blue cylinder, pink slices, blue hemispheres & bottom tilted blue block (cut-mov-033-1.webp & ARC-015067..70)
  rod(g,[-0.18,0,0],[-0.18,-0.58,0.02],0.0028,'#a8a296');
  rod(g,[0.18,0,0],[0.18,-0.62,-0.02],0.0028,'#a8a296');
  const cm=new THREE.Group();
  cm.position.set(0,-0.88,0);
  cm.userData.kineticSway={baseRotY:0.15,spinSpeed:0.68,phase:0.4,amp:0.26,swayZ:0.045,swayX:0.038};
  const skCol='#c9a874';
  // Authentic crossed diagonal wooden skewers & suspension cords matching cut-mov-033-1.webp
  for(const [a,b] of [
   [[-0.36,0.02,0.04],[0.26,0.34,-0.04]],
   [[-0.14,0.08,0.04],[0.46,-0.38,0.04]],
   [[-0.34,0.02,0.04],[-0.28,-0.52,0.04]],
   [[0.08,-0.04,0.02],[-0.14,-0.74,0.02]],
   [[-0.18,0.30,0.02],[-0.10,0.08,0.02]],
   [[0.18,0.26,-0.02],[0.08,0.02,-0.02]]
  ])rod(cm,a,b,0.0048,skCol);
  const boreM=mat('#23201c',0.85);
  const addCyl=(pos,rot,r,h,col,hollow=true)=>{
   const cg=new THREE.Group();cg.position.set(...pos);cg.rotation.set(...rot);
   const body=new THREE.Mesh(cylinderGeo,mat(col,0.52,0.04));
   body.scale.set(r,h,r);body.castShadow=true;body.receiveShadow=true;cg.add(body);
   if(hollow){
    const hole=new THREE.Mesh(cylinderGeo,boreM);
    hole.scale.set(r*0.26,h+0.006,r*0.26);cg.add(hole);
   }
   cm.add(cg);return cg;
  };
  const addDome=(pos,rot,r,col)=>{
   const dm=new THREE.Mesh(new THREE.SphereGeometry(r,18,12,0,Math.PI*2,0,Math.PI/2),mat(col,0.50,0.05));
   dm.position.set(...pos);dm.rotation.set(...rot);dm.castShadow=true;dm.receiveShadow=true;cm.add(dm);
  };
  // Central emerald-green cylinder facing front + red triangular wedge nose
  const greenHub=addCyl([0.06,-0.02,0.06],[Math.PI/2-0.18,0.12,0.15],0.118,0.135,'#1f9852',false);
  const redNose=new THREE.Mesh(new THREE.ConeGeometry(0.036,0.065,3),mat('#e43424',0.50));
  redNose.position.set(0,0.085,0);greenHub.add(redNose);
  // Central-left bright yellow cylinder + tucked magenta-pink cylinder behind/below
  addCyl([-0.12,0.05,0.02],[Math.PI/2-0.12,-0.25,0.1],0.112,0.125,'#f4cc14',false);
  addCyl([-0.06,-0.14,-0.04],[Math.PI/2+0.15,0.2,-0.2],0.095,0.095,'#e23c6c',false);
  // Left large cobalt-blue cylinder with blue rectangular tab + upper small orange/blue beads
  const blueLeft=addCyl([-0.36,-0.02,0.05],[Math.PI/2-0.1,-0.35,0.2],0.122,0.115,'#1458c8',false);
  const blueTab=new THREE.Mesh(boxGeo,mat('#1c6ae0',0.50));
  blueTab.scale.set(0.036,0.055,0.095);blueTab.position.set(0,0.075,0);blueLeft.add(blueTab);
  addCyl([-0.18,0.22,0.02],[0.2,0.1,0.3],0.036,0.048,'#1862d0',false);
  addCyl([-0.20,0.42,0.02],[0.3,0.2,1.2],0.036,0.024,'#f06420',false);
  // Upper-right diagonal: pink thick slice + cobalt-blue dome cap
  addCyl([0.18,0.18,-0.02],[0.6,0.2,-0.65],0.096,0.052,'#e64878',true);
  addDome([0.26,0.32,-0.04],[0.5,0.2,-0.68],0.098,'#165cc8');
  // Lower-left stack: horizontal pink slice + 2 flat orange bars + bottom tilted blue rectangular block
  addCyl([-0.30,-0.28,0.04],[0.18,0.1,-0.08],0.098,0.046,'#e64878',true);
  const orBar1=new THREE.Mesh(boxGeo,mat('#eb5a20',0.52));
  orBar1.scale.set(0.24,0.032,0.048);orBar1.position.set(-0.24,-0.46,0.05);orBar1.rotation.set(0.1,0.15,0.42);orBar1.castShadow=true;cm.add(orBar1);
  const orBar2=new THREE.Mesh(boxGeo,mat('#eb5a20',0.52));
  orBar2.scale.set(0.15,0.030,0.044);orBar2.position.set(-0.20,-0.52,0.06);orBar2.rotation.set(0.1,0.15,0.42);cm.add(orBar2);
  const botBlue=new THREE.Mesh(boxGeo,mat('#155ac8',0.50));
  botBlue.scale.set(0.125,0.195,0.082);botBlue.position.set(-0.14,-0.74,0.02);botBlue.rotation.set(0.12,0.22,0.52);botBlue.castShadow=true;cm.add(botBlue);
  // Lower-center cobalt-blue dome + 2 small orange washers + lower-right diagonal orange washer & pink disc
  addDome([-0.02,-0.38,0.04],[-0.25,0.1,-0.38],0.104,'#165cc8');
  addCyl([-0.08,-0.54,0.03],[0.3,0.2,0.85],0.046,0.024,'#eb5a20',true);
  addCyl([0.28,-0.24,0.03],[0.4,-0.3,0.95],0.048,0.024,'#eb5a20',true);
  addCyl([0.45,-0.38,0.04],[0.3,-0.4,1.15],0.094,0.038,'#e64878',true);
  g.add(cm);
  return g;
 }
 return null;
}

const BLENDER_FAITHFUL_MOBILE_IDS=new Set(['green','mov005','mov006','mov020','mov021','mov032']);
function addHangingMobile3D(world,id,anchorPos,ceilingY=9.2,scale=1,levelTag='air'){
 const data=ART.find(a=>a.id===id);if(!data)return null;
 const anchor=new THREE.Group();anchor.position.set(...anchorPos);world.scene.add(anchor);
 rod(world.scene,[anchorPos[0],ceilingY,anchorPos[2]],anchorPos,.0055,'#8a9283');
 if(levelTag!=='branch'){const mount=new THREE.Mesh(cylinderGeo,mat(levelTag==='pergola'?'#593a22':'#7a8274',.5,.25));mount.scale.set(levelTag==='pergola'?.035:.045,levelTag==='pergola'?.04:.06,levelTag==='pergola'?.035:.045);mount.position.set(anchorPos[0],ceilingY-.02,anchorPos[2]);world.scene.add(mount);}
 const pivot=new THREE.Group();anchor.add(pivot);
 const h=(data.height||2.2)*scale;
 const cutViews=(data.views||[]).filter(v=>v.cutout!==false);
 const activeViews=cutViews.length?cutViews:(data.views||[{src:data.image,w:1.8,h:2.2,label:'Vista principal'}]);
 const allViews=data.views||activeViews;
 const textures=allViews.map(v=>{const t=texLoader.load(v.src,()=>{world.dirty=true;},undefined,()=>{world.assetErrors.push(v.src);});t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;});
 // Mode 1: Volumetric 3D Mobile (Blender-modeled GLB + True 360° procedural 3D sculpture)
 const gAi3d=new THREE.Group();gAi3d.scale.setScalar(scale);pivot.add(gAi3d);
 const firstCutIdx=Math.max(0,allViews.findIndex(v=>v.cutout!==false));
 const v0=allViews[firstCutIdx]||allViews[0];
 const cutTex0=textures[firstCutIdx]||textures[0];
 const custom3d=buildTrue3DMobileGeometry(id);
 const filigreeMat=new THREE.MeshBasicMaterial({map:cutTex0,transparent:true,alphaTest:.12,side:THREE.DoubleSide});
 const filigreePlane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),filigreeMat);
 filigreePlane.scale.set(v0.w,v0.h,1);filigreePlane.position.set(0,-v0.h/2,0);
 if(custom3d){gAi3d.add(custom3d);}else{gAi3d.add(filigreePlane);}
 // Mode 2: Crisp High-Definition Studio Cutout (clean alpha-extracted plane, never white/background box)
 const gBillboard=new THREE.Group();gBillboard.scale.setScalar(scale);pivot.add(gBillboard);
 const frontMat=new THREE.MeshBasicMaterial({map:cutTex0,toneMapped:false,transparent:true,alphaTest:.16,side:THREE.DoubleSide});
 const frontPlane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),frontMat);
 frontPlane.scale.set(v0.w,v0.h,1);
 frontPlane.position.set(0,-v0.h/2,0);
 frontPlane.castShadow=true;
 gBillboard.add(frontPlane);
 const centerY=anchorPos[1]-h*.52;
 const groundY=world.heightAt?world.heightAt(anchorPos[0],anchorPos[2]):0;
 // Ground-level subtle floor ring (never floating in mid-air across the mobile!)
 const ringGeo=new THREE.RingGeometry(Math.max(.55,v0.w*.44)*scale,Math.max(.59,v0.w*.47)*scale,48);
 const ringMat=new THREE.MeshBasicMaterial({color:'#8ca878',transparent:true,opacity:.06,side:THREE.DoubleSide,depthWrite:false});
 const breezeRing=new THREE.Mesh(ringGeo,ringMat);breezeRing.rotation.x=-Math.PI/2;breezeRing.position.set(anchorPos[0],groundY+.014,anchorPos[2]);world.scene.add(breezeRing);
 softShadow(world.scene,anchorPos[0],anchorPos[2],Math.max(1.8,v0.w*1.35*scale),.18,groundY);
 const vx=anchorPos[0]+(anchorPos[0]<0?2.1:anchorPos[0]>0?-2.1:0);
 const vz=Math.max(-27.5,Math.min(27.5,anchorPos[2]+2.2));
 const vy=Math.max(1.72,Math.min(4.2,centerY));
 const isGarden3d=(world.id==='garden'&&!!custom3d);
 const work={
  ...data,
  object:pivot,
  ai3dGroup:gAi3d,
  billboardGroup:gBillboard,
  isGardenInstallation:isGarden3d,
  textures,
  viewIndex:0,
  anchor,
  center:V(anchorPos[0],centerY,anchorPos[2]),
  view:V(vx,vy,vz),
  groundY,
  levelTag,
  displayHeight:h,
  displayWidth:v0.w*scale,
  radius:Math.max(2.25,h*1.18),
  spin:0,
  windBoost:0,
  awakened:false,
  breezeRing,
  phase:world.works.length*1.93,
  baseRotation:(world.works.length*0.68)%(Math.PI*2)
 };
 pivot.rotation.y=work.baseRotation;
 work.setView=idx=>{
  const n=allViews.length,i=((idx%n)+n)%n;
  work.viewIndex=i;
  const vp=allViews[i];
  const cutIdx=vp.cutout===false?firstCutIdx:i;
  const vc=allViews[cutIdx]||v0;
  const cTex=textures[cutIdx]||cutTex0;
  filigreePlane.scale.set(vc.w,vc.h,1);filigreePlane.position.y=-vc.h/2;
  filigreeMat.map=cTex;filigreeMat.needsUpdate=true;
  frontPlane.scale.set(vc.w,vc.h,1);frontPlane.position.y=-vc.h/2;
  frontMat.map=cTex;
  frontMat.transparent=true;
  frontMat.alphaTest=.16;
  frontMat.needsUpdate=true;
  world.dirty=true;
 };
 work.applyMode=mode=>{
  gAi3d.visible=mode==='ai3d';
  gBillboard.visible=mode==='billboard';
  world.dirty=true;
 };
 work.applyMode(sculpturePresentation);
 if(data.glb&&(!custom3d||BLENDER_FAITHFUL_MOBILE_IDS.has(id))){
  const glbUrl=data.glb.replace(/\?.*$/,'')+'?v=25';
  gltfLoader.load(glbUrl,gltf=>{
   if(world.disposed){disposeDetachedTree(gltf.scene);return;}
   const model=gltf.scene;
   model.position.set(0,0,0);
   model.traverse(o=>{
    if(o.isMesh){
     o.castShadow=true;o.receiveShadow=true;o.userData.work=work;
     const tex=o.material?.map,nMap=o.material?.normalMap;
     if(id==='mov021'&&(tex||o.name?.startsWith('PrintedCard'))){
      o.material=new THREE.MeshStandardMaterial({map:cutTex0,transparent:true,alphaTest:.10,roughness:.54,metalness:.04,envMapIntensity:1.15,side:THREE.DoubleSide});
     }else if(tex){
      tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;
      if(nMap){nMap.colorSpace=THREE.NoColorSpace;nMap.anisotropy=4;}
      o.material=new THREE.MeshStandardMaterial({map:tex,normalMap:nMap||null,normalScale:new THREE.Vector2(1.05,1.05),emissive:'#ffffff',emissiveMap:tex,emissiveIntensity:.05,envMapIntensity:1.12,roughness:data.roughness??.52,metalness:data.metalness??.15,side:THREE.DoubleSide});
     }else if(o.material){
      o.material.side=THREE.DoubleSide;
      o.material.envMapIntensity=1.18;
      o.material.needsUpdate=true;
     }
    }
   });
   const swayGrp=new THREE.Group();
   swayGrp.userData.kineticSway={baseRotY:0.12,spinSpeed:0.64,phase:0.8,amp:0.24,swayZ:0.04,swayX:0.035};
   swayGrp.add(model);
   if(custom3d)custom3d.visible=false;
   filigreePlane.visible=false;
   gAi3d.add(swayGrp);world.dirty=true;
  },undefined,()=>{world.assetErrors.push(data.glb);});
 }
 anchor.traverse(o=>{if(o.isMesh)o.userData.work=work;});
 world.works.push(work);world.pickables.push(anchor);world.mobiles.push(work);
 return work;
}
function addZenithSpot(world,x,z,work,y=0){
 const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');
 const grd=ctx.createRadialGradient(128,128,18,128,128,118);
 grd.addColorStop(0,'rgba(116,148,98,.26)');grd.addColorStop(.68,'rgba(116,148,98,.08)');grd.addColorStop(1,'rgba(116,148,98,0)');
 ctx.fillStyle=grd;ctx.fillRect(0,0,256,256);
 ctx.strokeStyle='#6c825d';ctx.lineWidth=3;ctx.beginPath();ctx.arc(128,128,94,0,Math.PI*2);ctx.stroke();
 ctx.font='600 15px "Inter", Arial, sans-serif';ctx.textAlign='center';ctx.fillStyle='#4b5d40';ctx.fillText(work.code,128,134);
 const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
 const m=new THREE.Mesh(new THREE.PlaneGeometry(1.45,1.45),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));
 m.rotation.x=-Math.PI/2;m.position.set(x,y+.016,z);
 m.userData.isFloor=true;
 world.scene.add(m);world.pickables.push(m);
 const ring=new THREE.Mesh(new THREE.RingGeometry(0.56,0.59,40),mat('#9e824c',0.38,0.55));
 ring.rotation.x=-Math.PI/2;ring.position.set(x,y+.012,z);world.scene.add(ring);
 return m;
}
export function createMobilesRoom(){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#eef2ee');scene.environment=getStudioEnvMap();scene.fog=new THREE.Fog('#eef2ee',48,118);
 const heightAt=(x,z)=>0;
 const world={id:'mobiles',scene,works:[],mobiles:[],pickables:[],colliders:[],assetErrors:[],bounds:{minX:-12.4,maxX:12.4,minZ:-29.2,maxZ:29.2},heightAt,zenithSpots:[],dirty:true};
 const hemi=new THREE.HemisphereLight('#ffffff','#d8d2c5',2.65);
 scene.add(hemi);world.hemi=hemi;
 const sun=new THREE.DirectionalLight('#fffaf0',3.10);sun.position.set(8,26,12);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
 Object.assign(sun.shadow.camera,{left:-26,right:26,top:32,bottom:-32,near:1,far:95});
 sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;scene.add(sun);world.sun=sun;
 // Suelo diáfano y libre de travertino claro (sin plataformas ni obstáculos que bloqueen el paso o la vista)
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(28,64),getTravertineFloorMaterial(12,28));
 floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.userData.isFloor=true;scene.add(floor);world.floor=floor;world.pickables.push(floor);addWalkRing(world);
 // Muros perimetrales luminosos de galería (7.6m) y lucernario cenital limpio sin rejas oscuras
 box(scene,[28.4,7.6,.4],[0,3.8,-31.9],'#f6f5ef',false);box(scene,[28.4,7.6,.4],[0,3.8,31.9],'#f6f5ef',false);
 box(scene,[.4,7.6,64.2],[-13.9,3.8,0],'#faf9f4',false);box(scene,[.4,7.6,64.2],[13.9,3.8,0],'#faf9f4',false);
 enhanceIndoorArchitecture(world,{width:28,length:64,height:7.6,railXs:[-8.2,0,8.2],skylightStep:6,pilasterStep:8,hasPortal:true});
 for(let x=-12;x<=12;x+=4)box(scene,[.015,.006,63],[x,.008,0],'#d4d6cc',false);
 for(let z=-30;z<=30;z+=4)box(scene,[27.6,.006,.015],[0,.008,z],'#d4d6cc',false);
 const entrySign=sign(scene,'SALA DE MÓVILES · NAVE DIÁFANA','33 OBRAS SUSPENDIDAS A ALTURA DE MIRADA · MOVIMIENTO Y CÁMARA 360° LIBRES',[0,5.6,31.65],9.2);entrySign.rotation.y=Math.PI;
 sign(scene,'ENRIC SEGARRA I GARIBO','EQUILIBRIO, AIRE Y GRAVEDAD · USA SUBIR/BAJAR CÁMARA (E/Q) Y MIRAR ARRIBA/ABAJO',[0,5.6,-31.65],8.8);

 const ceilingY=7.55;
 // A) 14 Móviles Laterales a la altura directa de los ojos (Oeste x=-7.2 y Este x=+7.2, anclaje 3.25m -> centro ~2.1m)
 const lateralZs=[18.0,12.0,6.0,0.0,-6.0,-12.0,-18.0];
 const westIds=['mov011','mov012','mov013','mov014','mov015','mov016','mov017'];
 const eastIds=['mov018','mov019','mov020','mov021','mov022','mov023','mov024'];
 lateralZs.forEach((tz,i)=>{
  const wWest=addHangingMobile3D(world,westIds[i],[-7.2,3.42,tz],ceilingY,1.18,'terrace');
  const wEast=addHangingMobile3D(world,eastIds[i],[7.2,3.42,tz],ceilingY,1.18,'terrace');
  if(wWest)world.zenithSpots.push(addZenithSpot(world,-7.2,tz,wWest,0));
  if(wEast)world.zenithSpots.push(addZenithSpot(world,7.2,tz,wEast,0));
 });

 // B) 9 Móviles de Paseo Intermedio (anclaje 3.95m -> visión cómoda y despejada)
 const midPlacements=[
  {id:'mov025',pos:[-3.8,3.95,22.5],scale:1.18},
  {id:'mov026',pos:[-3.8,3.95,15.0],scale:1.18},
  {id:'mov027',pos:[-3.8,3.95,-15.0],scale:1.18},
  {id:'mov028',pos:[-3.8,3.95,-22.5],scale:1.18},
  {id:'mov029',pos:[3.8,3.95,22.5],scale:1.18},
  {id:'mov030',pos:[3.8,3.95,15.0],scale:1.18},
  {id:'mov031',pos:[3.8,3.95,-15.0],scale:1.18},
  {id:'mov032',pos:[3.8,3.95,-22.5],scale:1.18},
  {id:'mov033',pos:[0.0,4.15,-24.0],scale:1.26}
 ];
 midPlacements.forEach(p=>{
  const w=addHangingMobile3D(world,p.id,p.pos,ceilingY,p.scale,'zenith');
  if(w)world.zenithSpots.push(addZenithSpot(world,p.pos[0],p.pos[2],w,0));
 });

 // C) 10 Móviles Centrales de Galería (anclaje 4.55m -> cerca y claros contra el cielo luminoso)
 const centralPlacements=[
  {id:'mov001',pos:[0.0,4.38,19.0],scale:1.25},
  {id:'mov002',pos:[-2.8,4.52,9.5],scale:1.22},
  {id:'mov003',pos:[2.8,4.52,9.5],scale:1.22},
  {id:'mov004',pos:[-2.8,4.55,3.5],scale:1.22},
  {id:'mov005',pos:[2.8,4.55,3.5],scale:1.22},
  {id:'mov006',pos:[-2.8,4.48,-2.5],scale:1.24},
  {id:'mov007',pos:[2.8,4.48,-2.5],scale:1.24},
  {id:'mov008',pos:[-2.8,4.55,-8.5],scale:1.22},
  {id:'mov009',pos:[2.8,4.55,-8.5],scale:1.22},
  {id:'mov010',pos:[0.0,4.48,-16.5],scale:1.25}
 ];
 centralPlacements.forEach(p=>{
  const w=addHangingMobile3D(world,p.id,p.pos,ceilingY,p.scale,'skybridge');
  if(w)world.zenithSpots.push(addZenithSpot(world,p.pos[0],p.pos[2],w,0));
 });

 // Partículas de brisa flotantes en el aire para visualizar las corrientes del Juego del Aire
 const windCount=220,windGeo=new THREE.BufferGeometry(),windPos=new Float32Array(windCount*3);
 const random=rng(303);
 for(let i=0;i<windCount;i++){
  windPos[i*3]=(random()-.5)*24;
  windPos[i*3+1]=.6+random()*6.2;
  windPos[i*3+2]=(random()-.5)*56;
 }
 windGeo.setAttribute('position',new THREE.BufferAttribute(windPos,3));
 const windMat=new THREE.PointsMaterial({color:'#ffffff',map:getRadialGlowTexture(),size:.14,transparent:true,opacity:.45,alphaTest:0.01,depthWrite:false});
 const windParticles=new THREE.Points(windGeo,windMat);
 scene.add(windParticles);world.windParticles=windParticles;world.windImpulse=0;

 world.stops=[
  {title:'Umbral Sur · Equilibrio Rosa (MOV-001)',pos:[0,1.72,22.5],look:[0,3.0,19.0],work:'mov001'},
  {title:'Paseo Sur · Mirada Libre (MOV-025 · MOV-029)',pos:[-1.8,1.72,22.5],look:[-3.8,2.75,22.5],work:'mov025'},
  {title:'Ala Oeste · Cara a cara (MOV-011 · MOV-014)',pos:[-4.5,1.72,12.0],look:[-7.2,2.15,12.0],work:'mov012'},
  {title:'Nave Central · Tubos Rosas y Espiral (MOV-006 · MOV-007)',pos:[0,2.4,0.5],look:[-2.8,3.15,-2.5],work:'mov006'},
  {title:'Ala Este · Color y Equilibrio (MOV-018 · MOV-021)',pos:[4.5,1.72,0.0],look:[7.2,2.15,0.0],work:'mov021'},
  {title:'Coronación Central Norte (MOV-010)',pos:[0,2.2,-13.0],look:[0,3.1,-16.5],work:'mov010'},
  {title:'Rotonda Norte · Gran Constelación (MOV-033)',pos:[0,1.72,-20.2],look:[0,2.85,-24.0],work:'mov033'}
 ];
 world.stops.forEach((s,i)=>{
  marker(world,i,s.pos[0],s.pos[2]);
 });
 return world;
}
export function updateMobiles(world,time,dt,moving,cameraPos){
 world.windImpulse=Math.max(0,(world.windImpulse||0)-dt*0.48);
 world.smoothWind=(world.smoothWind??0)+((world.windImpulse||0)-(world.smoothWind??0))*Math.min(1,dt*1.8);
 if(world.skySystem){
  const sys=world.skySystem;
  if(sys.mode==='cycle'){
   sys.targetBlend=0.5-0.5*Math.cos(time*0.08);
  }
  const diff=sys.targetBlend-sys.blend;
  if(Math.abs(diff)>0.0005||sys.mode==='cycle'||sys.lastApplied===undefined){
   sys.blend+=diff*Math.min(1,Math.max(0.08,dt*2.8));
   applySkyBlend(world,sys.blend);
  }
  // Twinkle stars & drift 3D clouds
  if(sys.starMat.opacity>0.05){
   sys.stars.rotation.y=time*0.005;
  }
  if(moving){
   const windBoost=1+world.smoothWind*1.6;
   for(const cl of sys.clouds){
    cl.group.position.x+=cl.speed*dt*windBoost;
    cl.group.position.y=cl.baseY+Math.sin(time*0.25+cl.phase)*0.25;
    if(cl.group.position.x>72)cl.group.position.x=-72;
   }
  }
 }
 if(world.birds&&moving){
  for(const b of world.birds){
   if(b.kind==='fly'){
    const t=time*b.speed+b.phase;
    const nx=b.cx+Math.cos(t)*b.rx;
    const nz=b.cz+Math.sin(t*2)*b.rz*0.55;
    const ny=b.cy+Math.sin(t*1.5)*0.65;
    const dx=-Math.sin(t)*b.rx*b.speed;
    const dz=Math.cos(t*2)*b.rz*1.1*b.speed;
    b.mesh.root.position.set(nx,ny,nz);
    b.mesh.root.rotation.y=Math.atan2(dx,dz);
    b.mesh.root.rotation.z=Math.sin(t*2)*0.30;
    const isFlapping=Math.sin(t*2.2)>-0.25;
    const flap=isFlapping?Math.sin(time*15.5+b.phase)*0.68:0.12;
    const tipLag=isFlapping?Math.cos(time*15.5+b.phase)*0.45:0.05;
    b.mesh.wingL.rotation.z=flap;
    b.mesh.wingR.rotation.z=-flap;
    if(b.mesh.wingTipL){
     b.mesh.wingTipL.rotation.z=tipLag;
     b.mesh.wingTipR.rotation.z=-tipLag;
    }
    if(b.mesh.tail)b.mesh.tail.rotation.x=0.14+Math.sin(time*8+b.phase)*0.06;
   }else{
    const excited=(b.excitedUntil&&time<b.excitedUntil);
    const hop=excited?Math.abs(Math.sin(time*12))*0.32:Math.max(0,Math.sin(time*3.2+b.phase));
    b.mesh.root.position.y=b.basePos[1]+(excited?hop:(hop>0.7?(hop-0.7)*0.18:0));
    b.mesh.root.rotation.y=b.baseRotY+Math.sin(time*(excited?6.5:1.4)+b.phase)*0.45;
    b.mesh.head.rotation.x=Math.sin(time*4.5+b.phase)*0.25;
    b.mesh.head.rotation.y=Math.cos(time*2.8+b.phase)*0.32;
    const flutter=(excited||hop>0.75)?Math.sin(time*26)*0.65:0;
    b.mesh.wingL.rotation.z=-1.15+flutter;
    b.mesh.wingR.rotation.z=1.15-flutter;
   }
  }
 }
 if(world.squirrels&&moving){
  for(const s of world.squirrels){
   const raw=time*s.speed+s.phase;
   const cyc=raw%4.0;
   let u,paused=false;
   if(cyc<1.6){u=cyc/1.6;}
   else if(cyc<2.0){u=1.0;paused=true;}
   else if(cyc<3.6){u=1.0-(cyc-2.0)/1.6;}
   else{u=0.0;paused=true;}
   const pt=s.curve.getPointAt(u);
   const tan=s.curve.getTangentAt(u);
   const dir=(cyc>=2.0&&cyc<3.6)?-1:1;
   s.sq.root.position.copy(pt);
   if(!paused){
    const gait=time*13+s.phase;
    const hop=Math.abs(Math.sin(gait));
    s.sq.root.position.y+=hop*0.048;
    s.sq.body.rotation.x=Math.cos(gait)*0.20;
    s.sq.root.rotation.y=Math.atan2(tan.x*dir,tan.z*dir);
    s.sq.tailPivot.rotation.x=Math.sin(gait)*0.30;
    s.sq.tailPivot.rotation.z=Math.cos(gait*0.5)*0.12;
    if(s.sq.legsF){
     s.sq.legsF[0].rotation.x=Math.sin(gait)*0.55;
     s.sq.legsF[1].rotation.x=Math.sin(gait+0.4)*0.55;
     s.sq.legsB[0].rotation.x=-Math.sin(gait)*0.55;
     s.sq.legsB[1].rotation.x=-Math.sin(gait+0.4)*0.55;
    }
    if(s.sq.nut)s.sq.nut.visible=false;
   }else{
    s.sq.body.rotation.x=-0.62+Math.sin(time*15)*0.05;
    s.sq.tailPivot.rotation.x=0.38+Math.sin(time*7.5+s.phase)*0.24;
    if(s.sq.head)s.sq.head.rotation.x=0.35+Math.sin(time*18)*0.08;
    if(s.sq.legsF){
     s.sq.legsF[0].rotation.x=-0.65+Math.sin(time*18)*0.12;
     s.sq.legsF[1].rotation.x=-0.65-Math.sin(time*18)*0.12;
    }
    if(s.sq.nut)s.sq.nut.visible=true;
   }
  }
 }
 if(world.lizards&&moving){
  for(const liz of world.lizards){
   const rig=liz.userData.lizardRig;if(!rig)continue;
   if(cameraPos){
    const dCam=Math.hypot(liz.position.x-cameraPos.x,liz.position.z-cameraPos.z);
    rig.startleBoost=dCam<3.8?Math.min(2.8,(rig.startleBoost||0)+dt*5.8):Math.max(0,(rig.startleBoost||0)-dt*1.4);
   }
   if(rig.routeCurve){
    rig.routeClock=(rig.routeClock??rig.phase)+dt*(rig.routeSpeed||0.85)*(1+(rig.startleBoost||0));
    const cyc=rig.routeClock%5.0;
    let u=0,scurrying=false,dir=1;
    if(cyc<1.55){u=cyc/1.55;scurrying=true;dir=1;}
    else if(cyc<2.50){u=1.0;scurrying=false;dir=1;}
    else if(cyc<4.05){u=1.0-(cyc-2.50)/1.55;scurrying=true;dir=-1;}
    else{u=0.0;scurrying=false;dir=-1;}
    const uc=Math.max(0,Math.min(1,u));
    const pt=rig.routeCurve.getPointAt(uc);
    const tan=rig.routeCurve.getTangentAt(uc);
    liz.position.set(pt.x,pt.y,pt.z);
    if(scurrying){
     const gait=time*28*(1+(rig.startleBoost||0)*0.4)+rig.phase;
     liz.rotation.y=Math.atan2(tan.x*dir,tan.z*dir)+Math.sin(gait)*0.09;
     rig.tailPivot.rotation.y=Math.sin(gait)*0.42;
     rig.headPivot.rotation.x=0.06;
     rig.headPivot.rotation.y=-Math.sin(gait)*0.12;
     if(rig.legs&&rig.legs.length===4){
      const sw=Math.sin(gait)*0.62,lf=Math.max(0,Math.cos(gait))*0.28,lf2=Math.max(0,-Math.cos(gait))*0.28;
      const l0=rig.legs[0].piv||rig.legs[0],l1=rig.legs[1].piv||rig.legs[1],l2=rig.legs[2].piv||rig.legs[2],l3=rig.legs[3].piv||rig.legs[3];
      l0.rotation.y=sw;l0.rotation.z=lf;
      l3.rotation.y=-sw;l3.rotation.z=lf;
      l1.rotation.y=-sw;l1.rotation.z=-lf2;
      l2.rotation.y=sw;l2.rotation.z=-lf2;
     }
    }else{
     const bob=Math.max(0,Math.sin(time*8.2+rig.phase));
     rig.headPivot.rotation.x=bob*0.32;
     rig.headPivot.rotation.y=Math.sin(time*2.6+rig.phase)*0.28;
     rig.tailPivot.rotation.y=Math.sin(time*3.4+rig.phase)*0.16;
     if(rig.legs&&rig.legs.length===4){
      for(const lg of rig.legs){const lp=lg.piv||lg;lp.rotation.y*=0.82;lp.rotation.z*=0.82;}
     }
    }
   }else{
    const t=time*2.2*(1+(rig.startleBoost||0)*0.5)+rig.phase;
    rig.headPivot.rotation.x=Math.max(0,Math.sin(t*3.2))*0.28;
    rig.headPivot.rotation.y=Math.sin(t*1.3)*0.22;
    rig.tailPivot.rotation.y=Math.sin(t*4.5)*0.24;
    if(rig.isRunner){
     const dart=Math.sin(t*0.65);
     const vel=Math.cos(t*0.65);
     liz.position.x=rig.basePos[0]+dart*0.62;
     liz.rotation.y=rig.baseRotY+(vel>=0?0:Math.PI);
     if(rig.legs&&rig.legs.length===4){
      const gait=time*24+rig.phase,sw=Math.sin(gait)*0.55*Math.min(1,Math.abs(vel)*1.4);
      const l0=rig.legs[0].piv||rig.legs[0],l1=rig.legs[1].piv||rig.legs[1],l2=rig.legs[2].piv||rig.legs[2],l3=rig.legs[3].piv||rig.legs[3];
      l0.rotation.y=sw;l3.rotation.y=-sw;
      l1.rotation.y=-sw;l2.rotation.y=sw;
     }
    }
   }
  }
 }
 if(world.butterflies&&moving){
  const bBlend=world.skySystem?.blend??0;
  const bVis=bBlend<0.72;
  for(const bf of world.butterflies){
   bf.root.visible=bVis;
   if(!bVis)continue;
   const t=time*bf.speed+bf.phase;
   const nx=bf.cx+Math.sin(t)*bf.rx;
   const nz=bf.cz+Math.cos(t*1.3)*bf.rz;
   const ny=bf.cy+Math.sin(t*3.4)*0.26;
   bf.root.position.set(nx,ny,nz);
   bf.root.rotation.y=Math.atan2(Math.cos(t)*bf.rx,-Math.sin(t*1.3)*bf.rz);
   const flap=Math.sin(time*24+bf.phase)*1.05;
   bf.pivL.rotation.z=flap;
   bf.pivR.rotation.z=-flap;
  }
 }
 if(world.fireflies){
  const bBlend=world.skySystem?.blend??0;
  const nightVis=Math.max(0,Math.min(1,(bBlend-0.25)/0.45));
  world.fireflies.mat.opacity=nightVis*(0.68+0.28*Math.sin(time*3.2));
  if(nightVis>0.01&&moving){
   const pos=world.fireflies.points.geometry.attributes.position;
   const base=world.fireflies.base;
   for(let i=0;i<world.fireflies.count;i++){
    pos.setXYZ(
     i,
     base[i*3]+Math.sin(time*0.9+i)*0.45,
     base[i*3+1]+Math.cos(time*1.3+i*0.7)*0.28,
     base[i*3+2]+Math.sin(time*0.8+i*1.3)*0.45
    );
   }
   pos.needsUpdate=true;
  }
 }
 if(world.sunbeams){
  const bBlend=world.skySystem?.blend??0;
  const sunVis=Math.max(0,1-bBlend*1.55);
  world.sunbeams.mat.opacity=sunVis*0.026;
  world.sunbeams.mat.color.set(bBlend>0.22?'#ffb870':'#fff4c2');
 }
 if(world.shootingStars){
  const bBlend=world.skySystem?.blend??0;
  const nightVis=Math.max(0,Math.min(1,(bBlend-0.62)/0.32));
  for(const ss of world.shootingStars){
   const cyc=(time+ss.offset)%ss.period;
   if(nightVis>0.1&&cyc<0.85){
    const u=cyc/0.85;
    ss.mesh.visible=true;
    ss.mesh.material.opacity=nightVis*Math.sin(u*Math.PI)*0.88;
    ss.mesh.position.set(-38+u*76,68-u*26,-42+ss.offset*8);
   }else{
    ss.mesh.visible=false;
   }
  }
 }
 if(world.waterTex&&moving){
  world.waterTex.offset.x=(time*0.14)%1;
  world.waterTex.offset.y=Math.sin(time*0.7)*0.04;
 }
 if(world.swayFoliage&&moving){
  world.foliagePhase=(world.foliagePhase??time)+dt*(1+world.smoothWind*0.52);
  const fp=world.foliagePhase;
  const wBoost=1+world.smoothWind*0.65;
  for(const sf of world.swayFoliage){
   const d=sf.userData.swayFoliage;
   sf.rotation.z=Math.sin(fp*1.12+d.phase)*d.amp*wBoost;
   sf.rotation.x=Math.cos(fp*0.86+d.phase)*d.amp*0.75*wBoost;
  }
 }
 if(world.windParticles){
  const pos=world.windParticles.geometry.attributes.position;
  const boost=1+world.smoothWind*3.2;
  for(let i=0;i<pos.count;i++){
   let x=pos.getX(i)+Math.sin(time*.5+i)*dt*.18*boost;
   let y=pos.getY(i)+Math.cos(time*.4+i*.7)*dt*.09*boost;
   let z=pos.getZ(i)-dt*.32*boost;
   if(z<-29)z=29;if(y>8.6)y=.8;if(y<.5)y=8.4;
   pos.setXYZ(i,x,y,z);
  }
  pos.needsUpdate=true;
 }
 if(world.indoorMotes&&moving){
  const pos=world.indoorMotes.geometry.attributes.position;
  for(let i=0;i<pos.count;i++){
   let x=pos.getX(i)+Math.sin(time*0.35+i)*dt*0.04;
   let y=pos.getY(i)+Math.cos(time*0.28+i*0.6)*dt*0.03;
   if(y>6.2)y=1.0;if(y<0.8)y=6.0;
   pos.setXYZ(i,x,y,pos.getZ(i));
  }
  pos.needsUpdate=true;
 }
 world.mobiles.forEach(w=>{
  w.smoothSpin=(w.smoothSpin??0)+(Math.min(1.15,w.spin||0)-(w.smoothSpin??0))*Math.min(1,dt*2.0);
  w.spin=(w.spin||0)*Math.exp(-dt*.42);
  const targetAmp=1+world.smoothWind*0.38+Math.min(0.55,w.smoothSpin*0.36);
  w.smoothAmp=(w.smoothAmp??1)+(targetAmp-(w.smoothAmp??1))*Math.min(1,dt*2.2);
  if(moving){
   w.kineticPhase=(w.kineticPhase??time)+dt*(0.88+world.smoothWind*0.42+w.smoothSpin*0.52);
   const kp=w.kineticPhase;
   const windBoost=w.smoothAmp;
   w.baseRotation+=dt*(.095+w.smoothSpin*0.58);
   if(!w.isTreeInstallation&&!w.isFloorInstallation){
    w.object.rotation.y=w.baseRotation+Math.sin(kp*.38+w.phase)*.18;
    w.object.rotation.z=Math.sin(kp*.62+w.phase)*.028*windBoost;
    w.object.rotation.x=Math.cos(kp*.46+w.phase)*.018*windBoost;
   }
   if(w.ai3dGroup&&w.ai3dGroup.visible){
    w.ai3dGroup.traverse(child=>{
     if(child.userData.kineticSpin){
      child.rotation.z+=dt*child.userData.kineticSpin*(1+world.smoothWind*0.65+w.smoothSpin*0.75);
     }else if(child.userData.kineticSway){
      const ks=child.userData.kineticSway;
      child.rotation.y=(ks.baseRotY||0)+Math.sin(kp*ks.spinSpeed+ks.phase)*ks.amp*windBoost;
      child.rotation.z=(ks.baseRotZ||0)+Math.sin(kp*(ks.spinSpeed*0.85)+ks.phase+1.1)*(ks.swayZ||0.05)*windBoost;
      child.rotation.x=(ks.baseRotX||0)+Math.cos(kp*(ks.spinSpeed*0.75)+ks.phase+0.5)*(ks.swayX||0.04)*windBoost;
      if(ks.baseY!==undefined)child.position.y=ks.baseY+Math.sin(kp*1.1+ks.phase)*0.012*windBoost;
     }
    });
   }
  }
  if(w.breezeRing){
   w.breezePhase=(w.breezePhase??(time*.35))+dt*(.35+(w.smoothSpin||0)*.45);
   w.breezeRing.rotation.z=w.breezePhase;
   const targetOp=w.awakened?(.26+Math.sin(time*2.2+w.phase)*.08):.06;
   w.breezeRing.material.opacity+=(targetOp-w.breezeRing.material.opacity)*Math.min(1,dt*3.5);
   w.breezeRing.material.color.set(w.awakened?'#52a36c':'#8ca878');
  }
 });
 if(cameraPos&&sculpturePresentation==='billboard'){
  world.works.forEach(w=>{
   if(w.isWallRelief||w.isWallWork)return;
   if(w.isFloorInstallation||w.isTreeInstallation){
    if(w.billboardGroup){
     const angle=Math.atan2(cameraPos.x-w.center.x,cameraPos.z-w.center.z);
     let relY=angle-(w.anchor?.rotation?.y||0);
     while(relY>Math.PI)relY-=Math.PI*2;
     while(relY<-Math.PI)relY+=Math.PI*2;
     if(w.clampFrontAngle)relY=Math.max(-1.05,Math.min(1.05,relY));
     w.billboardGroup.rotation.y=relY;
    }
    return;
   }
   if(w.kind==='sculpture'&&w.anchor&&w.views&&w.setView){
    const angle=Math.atan2(cameraPos.x-w.center.x,cameraPos.z-w.center.z);
    w.object.rotation.y=angle-w.anchor.rotation.y;
    const rel=((angle-w.baseRotation)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
    const n=w.views.length;
    if(!w.manualView&&n>1){
     const idx=n===3?(rel<.75||rel>5.53?0:rel<2.35||rel>3.93?1:2):n===2?(rel<1.57||rel>4.71?0:1):(Math.floor(((rel+Math.PI/n)%(Math.PI*2))/(Math.PI*2/n))%n);
     if(idx!==w.viewIndex)w.setView(idx);
    }
   }else if(w.kind==='mobile'&&w.anchor&&w.views&&w.setView){
    const angle=Math.atan2(cameraPos.x-w.center.x,cameraPos.z-w.center.z);
    w.object.rotation.y=angle-w.anchor.rotation.y;
    const rel=((angle-w.baseRotation)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
    const cutCount=w.views.filter(v=>v.cutout!==false).length;
    if(!w.manualView&&cutCount>1){
     const idx=Math.floor(((rel+Math.PI/cutCount)%(Math.PI*2))/(Math.PI*2/cutCount))%cutCount;
     if(idx!==w.viewIndex)w.setView(idx);
    }
   }
  });
 }
}

const DISPOSE_TEX_KEYS=['map','bumpMap','normalMap','roughnessMap','metalnessMap','alphaMap','emissiveMap','aoMap'];
function getSharedWorldResources(){
 const geos=new Set([boxGeo,cylinderGeo,pebbleGeo,rockFacetedGeo]);
 for(const g of perfStripGeoCache.values())if(g)geos.add(g);
 const mats=new Set(materials.values());
 if(pedestalStoneMatCache)mats.add(pedestalStoneMatCache);
 const texs=new Set([
  barkTexCache,plasterBumpCache,woodBumpCache,stoneBumpCache,canvasBumpCache,
  wallShadowTexCache,circularWallShadowCache,wallWashTexCache,radialGlowTexCache,waterRippleTexCache,
  shadowMap,studioEnvTex,gardenEnvTex,glassReflTex,beamAlphaTex,
  pedestalStoneMatCache?.map,pedestalStoneMatCache?.bumpMap
 ].filter(Boolean));
 for(const m of mats){
  for(const k of DISPOSE_TEX_KEYS)if(m[k])texs.add(m[k]);
 }
 return {geos,mats,texs};
}
function disposeDetachedTree(root){
 if(!root)return;
 const {geos,mats,texs}=getSharedWorldResources();
 root.traverse(o=>{
  if(o.geometry&&!geos.has(o.geometry))o.geometry.dispose?.();
  const list=Array.isArray(o.material)?o.material:(o.material?[o.material]:[]);
  for(const m of list){
   if(!m||mats.has(m))continue;
   for(const k of DISPOSE_TEX_KEYS){
    if(m[k]&&!texs.has(m[k]))m[k].dispose?.();
   }
   m.dispose?.();
  }
 });
}
export function disposeWorld(world){
 if(!world||world.disposed)return;
 world.disposed=true;
 const {geos,mats,texs}=getSharedWorldResources();
 if(Array.isArray(world.works)){
  for(const w of world.works){
   if(Array.isArray(w.textures)){
    for(const t of w.textures){
     if(t&&!texs.has(t))t.dispose?.();
    }
   }
  }
 }
 if(world.scene){
  const visit=o=>{
   if(!o||o.userData?.persistentActor)return;
   if(o.isLight&&o.shadow?.map){
    o.shadow.map.dispose?.();
    o.shadow.map=null;
   }
   if(o.geometry&&!geos.has(o.geometry))o.geometry.dispose?.();
   const list=Array.isArray(o.material)?o.material:(o.material?[o.material]:[]);
   for(const m of list){
    if(!m||mats.has(m))continue;
    for(const k of DISPOSE_TEX_KEYS){
     if(m[k]&&!texs.has(m[k]))m[k].dispose?.();
    }
    m.dispose?.();
   }
   if(o.children){
    for(const ch of o.children)visit(ch);
   }
  };
  visit(world.scene);
  world.scene.clear();
 }
}
