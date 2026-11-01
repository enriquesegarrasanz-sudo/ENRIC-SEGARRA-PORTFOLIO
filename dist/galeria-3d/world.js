import * as THREE from './vendor/three.module.min.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';
export {THREE};
const texLoader=new THREE.TextureLoader();
const gltfLoader=new GLTFLoader();
export const ART=[
 {id:'rose',code:'MOV-001',catalogId:'suspension-rosa',title:'Composición en rosa',kind:'mobile',image:'assets/movil-rosa.webp',glb:"assets/hy3d-mov-001.glb",views:[{src:"assets/cut-mov-001-1.webp",w:1.43,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-001-2.webp",w:1.73,h:2.15,label:"Ángulo 2"},{src:"assets/cut-mov-001-3.webp",w:1.8,h:2.15,label:"Ángulo 3"}],height:2.15,description:'Varillas claras y elementos rosas dibujan un equilibrio abierto. Acércate y descubre cómo cambia la composición al rodearla.'},
 {id:'green',code:'MOV-005',catalogId:'forma-verde',title:'Forma suspendida en verde',kind:'mobile',image:'assets/movil-verde.webp',glb:"assets/hy3d-mov-005.glb",views:[{src:"assets/cut-mov-005-1.webp",w:1.32,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-005-2.webp",w:1.31,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-005-3.webp",w:1.18,h:1.95,label:"Ángulo 3"},{src:"assets/cut-mov-005-4.webp",w:1.22,h:1.95,label:"Ángulo 4"},{src:"assets/ctx-mov-005-1.webp",w:1.3,h:1.95,label:"En el entorno",cutout:false}],height:1.95,description:'Líneas curvas que se entrecruzan en el aire. El vacío también forma parte de la pieza.'},
 {id:'color',code:'MOV-016',catalogId:'ramas-y-color',title:'Color entre las ramas',kind:'mobile',image:'assets/movil-color.webp',glb:"assets/hy3d-mov-016.glb",views:[{src:"assets/cut-mov-016-1.webp",w:1.68,h:2.15,label:"Vista frontal"},{src:"assets/ctx-mov-016-1.webp",w:2.4,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-016-2.webp",w:1.43,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:'Tubos curvados y discos de colores. Una interpretación de la pieza fotografiada entre las ramas.'},
 {id:'sculpture1',code:'ESC-009',catalogId:'volumen-veta',title:'Volumen de formas curvas',kind:'sculpture',image:'assets/escultura-madera.webp',glb:'assets/hy3d-madera.glb',roughness:.74,metalness:.03,views:[{src:'assets/cut-madera-1.webp',w:.42,h:1.22,label:'Vista frontal'},{src:'assets/cut-madera-2.webp',w:.31,h:1.22,label:'Perfil lateral'},{src:'assets/cut-madera-3.webp',w:.42,h:1.22,label:'Vista posterior'}],height:1.22,description:'Escultura orgánica en madera tallada del archivo de Enric Segarra. Alterna entre el Volumen 3D con textura fotográfica exacta o la Imagen en 3D multi-ángulo.'},
 {id:'sculpture2',code:'ESC-011',catalogId:'volumen-abierto',title:'Volumen claro con aberturas',kind:'sculpture',image:'assets/escultura-aberturas.webp',glb:'assets/hy3d-aberturas.glb',roughness:.8,metalness:.02,views:[{src:'assets/cut-aberturas-1.webp',w:.92,h:1.16,label:'Vista frontal'},{src:'assets/cut-aberturas-2.webp',w:.25,h:1.16,label:'Perfil lateral'},{src:'assets/cut-aberturas-3.webp',w:.90,h:1.16,label:'Vista posterior'}],height:1.16,description:'Escultura de superficie clara y oquedades interiores que dejan pasar la luz de la galería. Alterna entre el Volumen 3D con textura real o la Imagen en 3D.'},
 {id:'sculpture3',code:'ESC-010',catalogId:'escultura-014523',title:'Volumen claro con abertura superior',kind:'sculpture',image:'assets/escultura-bifurcada.webp',glb:'assets/hy3d-bifurcada.glb',roughness:.74,metalness:.03,views:[{src:'assets/cut-esc-010-1.webp',w:.46,h:1.18,label:'Vista frontal'},{src:'assets/cut-esc-010-2.webp',w:.45,h:1.18,label:'Perfil lateral'},{src:'assets/cut-esc-010-3.webp',w:.48,h:1.18,label:'Vista posterior'}],height:1.18,description:'Pieza escultórica vertical de remate bifurcado en madera cálida con nudos naturales (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D multi-ángulo.'},
 {id:'sculpture4',code:'ESC-012',catalogId:'escultura-014533',title:'Figura de perfiles ascendentes',kind:'sculpture',image:'assets/escultura-hierro.webp',glb:'assets/hy3d-esc-012.glb',roughness:.54,metalness:.32,views:[{src:'assets/cut-esc-012-1.webp',w:.57,h:1.28,label:'Vista frontal'},{src:'assets/cut-esc-012-2.webp',w:.55,h:1.28,label:'Perfil lateral'},{src:'assets/cut-esc-012-3.webp',w:.54,h:1.28,label:'Vista posterior'},{src:'assets/cut-esc-012-4.webp',w:.49,h:1.28,label:'Vista oblicua'}],height:1.28,description:'Escultura de planos curvos y perfiles ascendentes en hierro oxidado sobre peana de piedra (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica exacta o la Imagen en 3D multi-ángulo.'},
 {id:'esc005',code:'ESC-005',catalogId:'escultura-014502',title:'Volumen vertical de planos abiertos',kind:'sculpture',image:'assets/escultura-esc-005.webp',glb:'assets/hy3d-esc-005.glb',roughness:0.56,metalness:0.3,views:[{src:'assets/cut-esc-005-1.webp',w:0.51,h:1.24,label:'Vista frontal'}],height:1.24,description:'Volumen vertical de planos abiertos en hierro sobre peana de piedra clara (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc006',code:'ESC-006',catalogId:'escultura-014505',title:'Plano curvo con abertura',kind:'sculpture',image:'assets/escultura-esc-006.webp',glb:'assets/hy3d-esc-006.glb',roughness:0.56,metalness:0.28,views:[{src:'assets/cut-esc-006-1.webp',w:0.68,h:1.22,label:'Vista frontal'},{src:'assets/cut-esc-006-2.webp',w:0.58,h:1.22,label:'Perfil lateral'},{src:'assets/cut-esc-006-3.webp',w:0.63,h:1.22,label:'Vista posterior'}],height:1.22,description:'Plano curvo con abertura central sobre peana cúbica de piedra (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc007',code:'ESC-007',catalogId:'escultura-014507',title:'Volumen de planos envolventes',kind:'sculpture',image:'assets/escultura-esc-007.webp',glb:'assets/hy3d-esc-007.glb',roughness:0.54,metalness:0.32,views:[{src:'assets/cut-esc-007-1.webp',w:1.07,h:1.06,label:'Vista frontal'},{src:'assets/cut-esc-007-2.webp',w:0.90,h:1.06,label:'Vista posterior'}],height:1.06,description:'Volumen de planos envolventes sobre bloque de piedra travertino (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc008',code:'ESC-008',catalogId:'escultura-014509',title:'Volumen claro de formas onduladas',kind:'sculpture',image:'assets/escultura-esc-008.webp',glb:'assets/hy3d-esc-008.glb',roughness:0.84,metalness:0.02,views:[{src:'assets/cut-esc-008-1.webp',w:0.51,h:1.22,label:'Vista frontal'},{src:'assets/cut-esc-008-2.webp',w:0.61,h:1.22,label:'Perfil lateral'},{src:'assets/cut-esc-008-3.webp',w:0.51,h:1.22,label:'Vista posterior'}],height:1.22,description:'Volumen claro de formas onduladas (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc013',code:'ESC-013',catalogId:'escultura-014540',title:'Forma vertical ondulada',kind:'sculpture',image:'assets/escultura-esc-013.webp',glb:'assets/hy3d-esc-013.glb',roughness:0.72,metalness:0.03,views:[{src:'assets/cut-esc-013-1.webp',w:0.26,h:1.26,label:'Vista frontal'},{src:'assets/cut-esc-013-2.webp',w:0.29,h:1.26,label:'Perfil lateral'},{src:'assets/cut-esc-013-3.webp',w:0.26,h:1.26,label:'Vista posterior'}],height:1.26,description:'Forma vertical ondulada (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc014',code:'ESC-014',catalogId:'escultura-014547',title:'Forma alargada sobre peana',kind:'sculpture',image:'assets/escultura-esc-014.webp',glb:'assets/hy3d-esc-014.glb',roughness:0.7,metalness:0.03,views:[{src:'assets/cut-esc-014-1.webp',w:0.32,h:1.3,label:'Vista frontal'},{src:'assets/cut-esc-014-2.webp',w:0.29,h:1.3,label:'Perfil lateral'},{src:'assets/cut-esc-014-3.webp',w:0.28,h:1.3,label:'Vista posterior'}],height:1.3,description:'Forma alargada sobre peana (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc015',code:'ESC-015',catalogId:'escultura-014552',title:'Volumen redondeado con cavidades',kind:'sculpture',image:'assets/escultura-esc-015.webp',glb:'assets/hy3d-esc-015.glb',roughness:0.86,metalness:0.02,views:[{src:'assets/cut-esc-015-1.webp',w:0.88,h:0.96,label:'Vista frontal'},{src:'assets/cut-esc-015-2.webp',w:0.91,h:0.96,label:'Vista oblicua'},{src:'assets/cut-esc-015-3.webp',w:0.87,h:0.96,label:'Vista posterior'}],height:0.96,description:'Volumen redondeado con cavidades (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc031',code:'ESC-031',catalogId:'escultura-008507',title:'Plano abierto con curvas ascendentes',kind:'sculpture',image:'assets/escultura-esc-031.webp',glb:'assets/hy3d-esc-031.glb',roughness:0.56,metalness:0.3,views:[{src:'assets/cut-esc-031-1.webp',w:0.78,h:1.25,label:'Vista frontal'},{src:'assets/cut-esc-031-2.webp',w:0.66,h:1.25,label:'Perfil lateral'},{src:'assets/cut-esc-031-3.webp',w:0.62,h:1.25,label:'Vista posterior'}],height:1.25,description:'Plano abierto con curvas ascendentes (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc032',code:'ESC-032',catalogId:'escultura-008523',title:'Plano curvo sobre peana',kind:'sculpture',image:'assets/escultura-esc-032.webp',glb:'assets/hy3d-esc-032.glb',roughness:0.58,metalness:0.26,views:[{src:'assets/cut-esc-032-1.webp',w:0.82,h:1.08,label:'Vista frontal'}],height:1.08,description:'Plano curvo sobre peana (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc033',code:'ESC-033',catalogId:'escultura-008525',title:'Volumen envolvente con abertura',kind:'sculpture',image:'assets/escultura-esc-033.webp',glb:'assets/hy3d-esc-033.glb',roughness:0.62,metalness:0.24,views:[{src:'assets/cut-esc-033-1.webp',w:0.82,h:1.05,label:'Vista frontal'}],height:1.05,description:'Volumen envolvente con abertura (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc034',code:'ESC-034',catalogId:'escultura-008529',title:'Plano curvo con lazo central',kind:'sculpture',image:'assets/escultura-esc-034.webp',glb:'assets/hy3d-esc-034.glb',roughness:0.62,metalness:0.24,views:[{src:'assets/cut-esc-034-1.webp',w:0.85,h:1.16,label:'Vista frontal'},{src:'assets/cut-esc-034-2.webp',w:0.73,h:1.16,label:'Vista posterior'}],height:1.16,description:'Plano curvo con lazo central (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc035',code:'ESC-035',catalogId:'escultura-008532',title:'Plano abierto de contorno ovalado',kind:'sculpture',image:'assets/escultura-esc-035.webp',glb:'assets/hy3d-esc-035.glb',roughness:0.62,metalness:0.24,views:[{src:'assets/cut-esc-035-1.webp',w:0.78,h:1.15,label:'Vista frontal'},{src:'assets/cut-esc-035-2.webp',w:0.75,h:1.15,label:'Vista posterior'}],height:1.15,description:'Plano abierto de contorno ovalado (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc036',code:'ESC-036',catalogId:'escultura-008535',title:'Volumen de curvas en espiral',kind:'sculpture',image:'assets/escultura-esc-036.webp',glb:'assets/hy3d-esc-036.glb',roughness:0.62,metalness:0.24,views:[{src:'assets/cut-esc-036-1.webp',w:0.70,h:1.18,label:'Vista frontal'},{src:'assets/cut-esc-036-2.webp',w:0.65,h:1.18,label:'Vista posterior'}],height:1.18,description:'Volumen de curvas en espiral (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc038',code:'ESC-038',catalogId:'escultura-008768',title:'Forma natural sobre soporte',kind:'sculpture',image:'assets/escultura-esc-038.webp',glb:'assets/hy3d-esc-038.glb',roughness:0.78,metalness:0.05,views:[{src:'assets/cut-esc-038-1.webp',w:0.74,h:1.18,label:'Vista frontal'},{src:'assets/cut-esc-038-2.webp',w:0.75,h:1.18,label:'Vista posterior'}],height:1.18,description:'Forma natural sobre soporte (Formas orgánicas). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc044',code:'ESC-044',catalogId:'escultura-007134',title:'Dos planos curvos ascendentes',kind:'sculpture',image:'assets/escultura-esc-044.webp',glb:'assets/hy3d-esc-044.glb',roughness:0.58,metalness:0.28,views:[{src:'assets/cut-esc-044-1.webp',w:0.65,h:1.26,label:'Vista frontal'},{src:'assets/cut-esc-044-2.webp',w:0.65,h:1.26,label:'Perfil lateral'},{src:'assets/cut-esc-044-3.webp',w:0.58,h:1.26,label:'Vista posterior'}],height:1.26,description:'Dos planos curvos ascendentes (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc053',code:'ESC-053',catalogId:'escultura-008659',title:'Volumen abierto de contorno ondulado',kind:'sculpture',image:'assets/escultura-esc-053.webp',glb:'assets/hy3d-esc-053.glb',roughness:0.58,metalness:0.28,views:[{src:'assets/cut-esc-053-1.webp',w:0.52,h:1.28,label:'Vista frontal'},{src:'assets/cut-esc-053-2.webp',w:0.78,h:1.28,label:'Perfil lateral'},{src:'assets/cut-esc-053-3.webp',w:0.64,h:1.28,label:'Vista posterior'},{src:'assets/cut-esc-053-4.webp',w:0.73,h:1.28,label:'Vista oblicua'},{src:'assets/cut-esc-053-5.webp',w:0.60,h:1.28,label:'Detalle oblicuo'}],height:1.28,description:'Volumen abierto de contorno ondulado (Planos curvos y volúmenes abiertos). Alterna entre el Volumen 3D con textura fotográfica real o la Imagen en 3D.'},
 {id:'esc037',code:'ESC-037',catalogId:'escultura-008543',title:'Retícula con elementos claros',kind:'sculpture',image:'assets/escultura-esc-037.webp',glb:'assets/hy3d-esc-037.glb',roughness:.64,metalness:.22,views:[{src:'assets/cut-esc-037-1.webp',w:1.09,h:1.18,label:'Vista frontal'},{src:'assets/cut-esc-037-2.webp',w:1.06,h:1.18,label:'Vista posterior'}],height:1.18,description:'Estructura en cuadrícula de hierro oscuro con elementos pétreos claros suspendidos en sus compartimentos (Estructuras y objetos ensamblados).'},
 {id:'esc039',code:'ESC-039',catalogId:'escultura-008788',title:'Estructura vertical con barras y esferas',kind:'sculpture',image:'assets/escultura-esc-039.webp',glb:'assets/hy3d-esc-039.glb',roughness:.50,metalness:.36,views:[{src:'assets/cut-esc-039-1.webp',w:.49,h:1.34,label:'Vista frontal'},{src:'assets/cut-esc-039-2.webp',w:.27,h:1.34,label:'Perfil lateral'},{src:'assets/cut-esc-039-3.webp',w:.36,h:1.34,label:'Vista posterior'},{src:'assets/cut-esc-039-4.webp',w:.40,h:1.34,label:'Vista oblicua'}],height:1.34,description:'Doble eje vertical de hierro sobre base dentada con barras transversales y elementos esféricos claros (Estructuras y objetos ensamblados).'},
 {id:'esc040',code:'ESC-040',catalogId:'escultura-008810',title:'Planos curvos sobre rueda dentada',kind:'sculpture',image:'assets/escultura-esc-040.webp',glb:'assets/hy3d-esc-040.glb',roughness:.52,metalness:.35,views:[{src:'assets/cut-esc-040-1.webp',w:.90,h:1.16,label:'Vista frontal'},{src:'assets/cut-esc-040-2.webp',w:.65,h:1.16,label:'Perfil lateral'},{src:'assets/cut-esc-040-3.webp',w:.70,h:1.16,label:'Vista posterior'}],height:1.16,description:'Láminas curvas de hierro soldado de pátina cálida que se despliegan sobre una rueda dentada (Estructuras y objetos ensamblados).'},
 {id:'esc041',code:'ESC-041',catalogId:'escultura-008816',title:'Dos estructuras de espirales',kind:'sculpture',image:'assets/escultura-esc-041.webp',glb:'assets/hy3d-esc-041.glb',roughness:.48,metalness:.38,views:[{src:'assets/cut-esc-041-1.webp',w:.78,h:1.28,label:'Vista frontal'},{src:'assets/cut-esc-041-2.webp',w:.37,h:1.28,label:'Vista posterior'},{src:'assets/cut-esc-041-3.webp',w:.35,h:1.28,label:'Perfil lateral'}],height:1.28,description:'Pareja de ejes verticales con espirales envolventes y bases de engranajes (Estructuras y objetos ensamblados).'},
 {id:'esc042',code:'ESC-042',catalogId:'escultura-008907',title:'Ensamblaje con herramienta y cadena',kind:'sculpture',image:'assets/escultura-esc-042.webp',glb:'assets/hy3d-esc-042.glb',roughness:.62,metalness:.18,views:[{src:'assets/cut-esc-042-1.webp',w:.63,h:1.22,label:'Vista frontal'},{src:'assets/cut-esc-042-2.webp',w:.39,h:1.22,label:'Vista posterior'}],height:1.22,description:'Bloque de madera con cadena embutida coronado por una tenaza de forja (Estructuras y objetos ensamblados).'},
 {id:'esc043',code:'ESC-043',catalogId:'escultura-011828',title:'Estructura con espiral y ruedas dentadas',kind:'sculpture',image:'assets/escultura-esc-043.webp',glb:'assets/hy3d-esc-043.glb',roughness:.48,metalness:.40,views:[{src:'assets/cut-esc-043-1.webp',w:.49,h:1.24,label:'Vista frontal'},{src:'assets/cut-esc-043-2.webp',w:.51,h:1.24,label:'Vista posterior'},{src:'assets/cut-esc-043-3.webp',w:.82,h:1.24,label:'Perfil lateral'},{src:'assets/cut-esc-043-4.webp',w:1.17,h:1.24,label:'Vista oblicua'}],height:1.24,description:'Composición vertical de hierro con espiral central y remate de ruedas dentadas (Estructuras y objetos ensamblados).'},
 {id:'esc045',code:'ESC-045',catalogId:'escultura-007158',title:'Eje vertical con elementos superpuestos',kind:'sculpture',image:'assets/escultura-esc-045.webp',glb:'assets/hy3d-esc-045.glb',roughness:.68,metalness:.08,views:[{src:'assets/cut-esc-045-1.webp',w:.66,h:1.26,label:'Vista frontal'},{src:'assets/cut-esc-045-2.webp',w:.59,h:1.26,label:'Vista posterior'}],height:1.26,description:'Eje vertical de madera con clavijas transversales sobre base circular maciza (Estructuras y objetos ensamblados).'},
 {id:'esc054',code:'ESC-054',catalogId:'escultura-008704',title:'Forma articulada en un aro',kind:'sculpture',image:'assets/escultura-esc-054.webp',glb:'assets/hy3d-esc-054.glb',roughness:.52,metalness:.34,views:[{src:'assets/cut-esc-054-1.webp',w:1.06,h:1.15,label:'Vista frontal'},{src:'assets/cut-esc-054-2.webp',w:1.06,h:1.15,label:'Vista posterior'},{src:'assets/cut-esc-054-3.webp',w:1.06,h:1.15,label:'Perfil lateral'},{src:'assets/cut-esc-054-4.webp',w:1.05,h:1.15,label:'Vista oblicua'}],height:1.15,description:'Aro circular de hierro sobre base dentada que enmarca un volumen orgánico de hierro forjado y anudado (Estructuras y objetos ensamblados).'},
 {id:'esc055',code:'ESC-055',catalogId:'escultura-009729',title:'Estructura de tres ejes y ruedas dentadas',kind:'sculpture',image:'assets/escultura-esc-055.webp',glb:'assets/hy3d-esc-055.glb',roughness:.48,metalness:.38,views:[{src:'assets/cut-esc-055-1.webp',w:1.04,h:1.22,label:'Vista frontal'},{src:'assets/cut-esc-055-2.webp',w:.85,h:1.22,label:'Perfil lateral'},{src:'assets/cut-esc-055-3.webp',w:.91,h:1.22,label:'Vista posterior'},{src:'assets/cut-esc-055-4.webp',w:.80,h:1.22,label:'Vista oblicua'},{src:'assets/cut-esc-055-5.webp',w:.93,h:1.22,label:'Detalle oblicuo'}],height:1.22,description:'Estructura espacial de tres columnas verticales y travesaños diagonales con engranajes de hierro (Estructuras y objetos ensamblados).'},
 {id:'painting1',code:'PIN-014',catalogId:'pintura-015122',title:'Arca entre sol y luna',kind:'painting',image:'assets/pintura-01.webp',description:'Pintura del archivo del artista. Abre la fotografía para observar el trazo, las texturas y el marco.'},
 {id:'painting2',code:'PIN-036',catalogId:'pintura-015146',title:'Grupo de gatos',kind:'painting',image:'assets/pintura-02.webp',description:'Figuras, música y color. Fotografía de la obra real, integrada en la sala virtual.'},
 {id:'painting3',code:'PIN-039',catalogId:'pintura-015149',title:'Figura rosa',kind:'painting',image:'assets/pintura-03.webp',description:'Una figura en rosa sobre un fondo cálido. Selecciona la fotografía para ver sus detalles.'},
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
 {id:"mov001",code:"MOV-001",catalogId:"suspension-rosa",title:"Composición suspendida en rosa",kind:'mobile',image:"assets/mov-001.webp",glb:"assets/hy3d-mov-001.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-001-1.webp",w:1.43,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-001-2.webp",w:1.73,h:2.15,label:"Ángulo 2"},{src:"assets/cut-mov-001-3.webp",w:1.8,h:2.15,label:"Ángulo 3"}],height:2.15,description:"Composición suspendida en rosa (MOV-001). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov002",code:"MOV-002",catalogId:"moviles-014603",title:"Una línea en suspensión",kind:'mobile',image:"assets/mov-002.webp",glb:"assets/hy3d-mov-002.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-002-1.webp",w:0.48,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-002-2.webp",w:0.48,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-002-3.webp",w:0.69,h:1.95,label:"Ángulo 3"}],height:1.95,description:"Una línea en suspensión (MOV-002). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov003",code:"MOV-003",catalogId:"moviles-014614",title:"Rama oscura, acentos rojos",kind:'mobile',image:"assets/mov-003.webp",glb:"assets/hy3d-mov-003.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-003-1.webp",w:0.87,h:2.3,label:"Vista frontal"},{src:"assets/cut-mov-003-2.webp",w:0.48,h:2.3,label:"Ángulo 2"},{src:"assets/cut-mov-003-3.webp",w:1.2,h:2.3,label:"Ángulo 3"}],height:2.3,description:"Rama oscura, acentos rojos (MOV-003). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov004",code:"MOV-004",catalogId:"moviles-014624",title:"Figuras sobre una barra roja",kind:'mobile',image:"assets/mov-004.webp",glb:"assets/hy3d-mov-004.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-004-1.webp",w:0.94,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-004-2.webp",w:0.88,h:2.15,label:"Ángulo 2"},{src:"assets/cut-mov-004-3.webp",w:0.99,h:2.15,label:"Ángulo 3"}],height:2.15,description:"Figuras sobre una barra roja (MOV-004). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov005",code:"MOV-005",catalogId:"forma-verde",title:"Forma suspendida en verde",kind:'mobile',image:"assets/mov-005.webp",glb:"assets/hy3d-mov-005.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-005-1.webp",w:1.32,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-005-2.webp",w:1.31,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-005-3.webp",w:1.18,h:1.95,label:"Ángulo 3"},{src:"assets/cut-mov-005-4.webp",w:1.22,h:1.95,label:"Ángulo 4"},{src:"assets/ctx-mov-005-1.webp",w:1.3,h:1.95,label:"En el entorno",cutout:false}],height:1.95,description:"Forma suspendida en verde (MOV-005). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov006",code:"MOV-006",catalogId:"moviles-014659",title:"Tubos rosas sobre un arco",kind:'mobile',image:"assets/mov-006.webp",glb:"assets/hy3d-mov-006.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-006-1.webp",w:0.6,h:2.3,label:"Vista frontal"},{src:"assets/cut-mov-006-2.webp",w:0.48,h:2.3,label:"Ángulo 2"},{src:"assets/cut-mov-006-3.webp",w:1.12,h:2.3,label:"Ángulo 3"},{src:"assets/cut-mov-006-4.webp",w:0.48,h:2.3,label:"Ángulo 4"},{src:"assets/ctx-mov-006-1.webp",w:1.53,h:2.3,label:"En el entorno",cutout:false}],height:2.3,description:"Tubos rosas sobre un arco (MOV-006). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov007",code:"MOV-007",catalogId:"moviles-014678",title:"Estructura clara y elementos cilíndricos",kind:'mobile',image:"assets/mov-007.webp",glb:"assets/hy3d-mov-007.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-007-1.webp",w:0.84,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-007-2.webp",w:0.91,h:2.15,label:"Ángulo 2"},{src:"assets/cut-mov-007-3.webp",w:0.9,h:2.15,label:"Ángulo 3"}],height:2.15,description:"Estructura clara y elementos cilíndricos (MOV-007). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov008",code:"MOV-008",catalogId:"moviles-014691",title:"Pequeño volumen abierto en rosa",kind:'mobile',image:"assets/mov-008.webp",glb:"assets/hy3d-mov-008.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-008-1.webp",w:0.93,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-008-2.webp",w:1.13,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-008-3.webp",w:1.62,h:1.95,label:"Ángulo 3"},{src:"assets/cut-mov-008-4.webp",w:0.71,h:1.95,label:"Ángulo 4"}],height:1.95,description:"Pequeño volumen abierto en rosa (MOV-008). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov009",code:"MOV-009",catalogId:"moviles-014713",title:"Una columna de discos rosas",kind:'mobile',image:"assets/mov-009.webp",glb:"assets/hy3d-mov-009.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-009-1.webp",w:0.48,h:2.3,label:"Vista frontal"},{src:"assets/cut-mov-009-2.webp",w:0.48,h:2.3,label:"Segundo ángulo"}],height:2.3,description:"Una columna de discos rosas (MOV-009). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov010",code:"MOV-010",catalogId:"moviles-014720",title:"Escalera de elementos claros",kind:'mobile',image:"assets/mov-010.webp",glb:"assets/hy3d-mov-010.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-010-1.webp",w:0.48,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-010-2.webp",w:0.58,h:2.15,label:"Segundo ángulo"}],height:2.15,description:"Escalera de elementos claros (MOV-010). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov011",code:"MOV-011",catalogId:"moviles-014726",title:"Líneas rosas ramificadas",kind:'mobile',image:"assets/mov-011.webp",glb:"assets/hy3d-mov-011.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-011-1.webp",w:1.21,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-011-2.webp",w:1.33,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-011-3.webp",w:1.16,h:1.95,label:"Ángulo 3"},{src:"assets/cut-mov-011-4.webp",w:0.9,h:1.95,label:"Ángulo 4"}],height:1.95,description:"Líneas rosas ramificadas (MOV-011). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov012",code:"MOV-012",catalogId:"moviles-014748",title:"Curvas de tubo corrugado",kind:'mobile',image:"assets/mov-012.webp",glb:"assets/hy3d-mov-012.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-012-1.webp",w:1.37,h:2.3,label:"Vista frontal"},{src:"assets/cut-mov-012-2.webp",w:1.11,h:2.3,label:"Ángulo 2"},{src:"assets/cut-mov-012-3.webp",w:1.18,h:2.3,label:"Ángulo 3"}],height:2.3,description:"Curvas de tubo corrugado (MOV-012). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov013",code:"MOV-013",catalogId:"moviles-014764",title:"Discos rosas en dos recorridos",kind:'mobile',image:"assets/mov-013.webp",glb:"assets/hy3d-mov-013.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-013-1.webp",w:0.82,h:2.15,label:"Vista frontal"},{src:"assets/cut-mov-013-2.webp",w:0.86,h:2.15,label:"Ángulo 2"},{src:"assets/cut-mov-013-3.webp",w:0.77,h:2.15,label:"Ángulo 3"}],height:2.15,description:"Discos rosas en dos recorridos (MOV-013). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov014",code:"MOV-014",catalogId:"aros",title:"Composición de aros",kind:'mobile',image:"assets/mov-014.webp",glb:"assets/hy3d-mov-014.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-014-1.webp",w:1.57,h:1.95,label:"Vista frontal"}],height:1.95,description:"Composición de aros (MOV-014). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov015",code:"MOV-015",catalogId:"moviles-014821",title:"Una forma articulada",kind:'mobile',image:"assets/mov-015.webp",glb:"assets/hy3d-mov-015.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-015-1.webp",w:2.45,h:2.3,label:"Vista frontal"},{src:"assets/cut-mov-015-2.webp",w:2.24,h:2.3,label:"Ángulo 2"},{src:"assets/cut-mov-015-3.webp",w:2.45,h:2.3,label:"Ángulo 3"},{src:"assets/cut-mov-015-4.webp",w:0.77,h:2.3,label:"Ángulo 4"},{src:"assets/ctx-mov-015-1.webp",w:2.4,h:2.3,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-015-2.webp",w:2.4,h:2.3,label:"En el entorno 2",cutout:false}],height:2.3,description:"Una forma articulada (MOV-015). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov016",code:"MOV-016",catalogId:"ramas-y-color",title:"Pieza entre las ramas",kind:'mobile',image:"assets/mov-016.webp",glb:"assets/hy3d-mov-016.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-016-1.webp",w:1.68,h:2.15,label:"Vista frontal"},{src:"assets/ctx-mov-016-1.webp",w:2.4,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-016-2.webp",w:1.43,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:"Pieza entre las ramas (MOV-016). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov017",code:"MOV-017",catalogId:"moviles-014850",title:"Planos de color entre los árboles",kind:'mobile',image:"assets/mov-017.webp",glb:"assets/hy3d-mov-017.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-017-1.webp",w:1.0,h:1.95,label:"Vista frontal"},{src:"assets/ctx-mov-017-1.webp",w:1.3,h:1.95,label:"En el entorno",cutout:false}],height:1.95,description:"Planos de color entre los árboles (MOV-017). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov018",code:"MOV-018",catalogId:"moviles-014879",title:"Líneas de color al aire libre",kind:'mobile',image:"assets/mov-018.webp",glb:"assets/hy3d-mov-018.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-018-1.webp",w:1.17,h:2.3,label:"Vista frontal"},{src:"assets/ctx-mov-018-1.webp",w:1.53,h:2.3,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-018-2.webp",w:1.53,h:2.3,label:"En el entorno 2",cutout:false}],height:2.3,description:"Líneas de color al aire libre (MOV-018). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov019",code:"MOV-019",catalogId:"moviles-014887",title:"Círculo azul y blanco",kind:'mobile',image:"assets/mov-019.webp",glb:"assets/hy3d-mov-019.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-019-1.webp",w:1.76,h:2.15,label:"Vista frontal"},{src:"assets/ctx-mov-019-1.webp",w:2.4,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-019-2.webp",w:1.43,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:"Círculo azul y blanco (MOV-019). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov020",code:"MOV-020",catalogId:"moviles-008941",title:"Estructura de líneas oscuras y esferas",kind:'mobile',image:"assets/mov-020.webp",glb:"assets/hy3d-mov-020.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-020-1.webp",w:1.89,h:1.95,label:"Vista frontal"},{src:"assets/cut-mov-020-2.webp",w:1.48,h:1.95,label:"Ángulo 2"},{src:"assets/cut-mov-020-3.webp",w:1.89,h:1.95,label:"Ángulo 3"}],height:1.95,description:"Estructura de líneas oscuras y esferas (MOV-020). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov021",code:"MOV-021",catalogId:"moviles-008911",title:"Fragmentos de color suspendidos",kind:'mobile',image:"assets/mov-021.webp",glb:"assets/hy3d-mov-021.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-021-1.webp",w:2.17,h:2.3,label:"Vista frontal"},{src:"assets/ctx-mov-021-1.webp",w:1.72,h:2.3,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-021-2.webp",w:2.4,h:2.3,label:"En el entorno 2",cutout:false}],height:2.3,description:"Fragmentos de color suspendidos (MOV-021). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov022",code:"MOV-022",catalogId:"moviles-014955",title:"Arcos oscuros y pequeños acentos de color",kind:'mobile',image:"assets/mov-022.webp",glb:"assets/hy3d-mov-022.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-022-1.webp",w:1.55,h:2.15,label:"Vista frontal"},{src:"assets/ctx-mov-022-1.webp",w:1.61,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-022-2.webp",w:1.61,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:"Arcos oscuros y pequeños acentos de color (MOV-022). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov023",code:"MOV-023",catalogId:"moviles-014976",title:"Círculos rojos entrelazados",kind:'mobile',image:"assets/mov-023.webp",glb:"assets/hy3d-mov-023.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-023-1.webp",w:1.15,h:1.95,label:"Vista frontal"},{src:"assets/ctx-mov-023-1.webp",w:1.46,h:1.95,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-023-2.webp",w:1.46,h:1.95,label:"En el entorno 2",cutout:false}],height:1.95,description:"Círculos rojos entrelazados (MOV-023). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov024",code:"MOV-024",catalogId:"moviles-015000",title:"Curvas azules y verdes",kind:'mobile',image:"assets/mov-024.webp",glb:"assets/hy3d-mov-024.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-024-1.webp",w:1.81,h:2.3,label:"Vista frontal"},{src:"assets/ctx-mov-024-1.webp",w:1.72,h:2.3,label:"En el entorno",cutout:false}],height:2.3,description:"Curvas azules y verdes (MOV-024). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov025",code:"MOV-025",catalogId:"moviles-015002",title:"Trama oscura con flores de color",kind:'mobile',image:"assets/mov-025.webp",glb:"assets/hy3d-mov-025.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-025-1.webp",w:1.23,h:2.15,label:"Vista frontal"},{src:"assets/ctx-mov-025-1.webp",w:1.61,h:2.15,label:"En el entorno",cutout:false}],height:2.15,description:"Trama oscura con flores de color (MOV-025). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov026",code:"MOV-026",catalogId:"moviles-015006",title:"Arco rojo y discos azules",kind:'mobile',image:"assets/mov-026.webp",glb:"assets/hy3d-mov-026.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-026-1.webp",w:1.21,h:1.95,label:"Vista frontal"},{src:"assets/ctx-mov-026-1.webp",w:1.46,h:1.95,label:"En el entorno",cutout:false}],height:1.95,description:"Arco rojo y discos azules (MOV-026). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov027",code:"MOV-027",catalogId:"moviles-015011",title:"Un recorrido de pequeños discos",kind:'mobile',image:"assets/mov-027.webp",glb:"assets/hy3d-mov-027.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-027-1.webp",w:1.16,h:2.3,label:"Vista frontal"},{src:"assets/ctx-mov-027-1.webp",w:1.72,h:2.3,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-027-2.webp",w:1.72,h:2.3,label:"En el entorno 2",cutout:false}],height:2.3,description:"Un recorrido de pequeños discos (MOV-027). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov028",code:"MOV-028",catalogId:"moviles-015021",title:"Círculo abierto de muchos colores",kind:'mobile',image:"assets/mov-028.webp",glb:"assets/hy3d-mov-028.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-028-1.webp",w:1.58,h:2.15,label:"Vista frontal"},{src:"assets/ctx-mov-028-1.webp",w:1.81,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-028-2.webp",w:1.92,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:"Círculo abierto de muchos colores (MOV-028). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov029",code:"MOV-029",catalogId:"moviles-015045",title:"Estructura abierta y un aro de color",kind:'mobile',image:"assets/mov-029.webp",glb:"assets/hy3d-mov-029.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-029-1.webp",w:1.43,h:1.95,label:"Vista frontal"},{src:"assets/ctx-mov-029-1.webp",w:2.21,h:1.95,label:"En el entorno",cutout:false}],height:1.95,description:"Estructura abierta y un aro de color (MOV-029). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov030",code:"MOV-030",catalogId:"moviles-015051",title:"Columna de discos multicolores",kind:'mobile',image:"assets/mov-030.webp",glb:"assets/hy3d-mov-030.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-030-1.webp",w:1.24,h:2.3,label:"Vista frontal"},{src:"assets/ctx-mov-030-1.webp",w:1.72,h:2.3,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-030-2.webp",w:1.52,h:2.3,label:"En el entorno 2",cutout:false}],height:2.3,description:"Columna de discos multicolores (MOV-030). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov031",code:"MOV-031",catalogId:"moviles-015058",title:"Recipientes rosas, verdes y amarillos",kind:'mobile',image:"assets/mov-031.webp",glb:"assets/hy3d-mov-031.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-031-1.webp",w:2.45,h:2.15,label:"Vista frontal"},{src:"assets/ctx-mov-031-1.webp",w:2.4,h:2.15,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-031-2.webp",w:2.4,h:2.15,label:"En el entorno 2",cutout:false}],height:2.15,description:"Recipientes rosas, verdes y amarillos (MOV-031). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov032",code:"MOV-032",catalogId:"moviles-015062",title:"Ramas y figuras geométricas",kind:'mobile',image:"assets/mov-032.webp",glb:"assets/hy3d-mov-032.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-032-1.webp",w:1.01,h:1.95,label:"Vista frontal"},{src:"assets/ctx-mov-032-1.webp",w:1.47,h:1.95,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-032-2.webp",w:1.47,h:1.95,label:"En el entorno 2",cutout:false}],height:1.95,description:"Ramas y figuras geométricas (MOV-032). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."},
 {id:"mov033",code:"MOV-033",catalogId:"moviles-015067",title:"Pequeños recipientes suspendidos",kind:'mobile',image:"assets/mov-033.webp",glb:"assets/hy3d-mov-033.glb",roughness:0.56,metalness:0.14,views:[{src:"assets/cut-mov-033-1.webp",w:1.65,h:2.3,label:"Vista frontal"},{src:"assets/ctx-mov-033-1.webp",w:1.73,h:2.3,label:"En el entorno 1",cutout:false},{src:"assets/ctx-mov-033-2.webp",w:1.72,h:2.3,label:"En el entorno 2",cutout:false}],height:2.3,description:"Pequeños recipientes suspendidos (MOV-033). Escultura móvil suspendida de Enric Segarra. Explórala desde abajo, sube a las pasarelas elevadas para verla de cerca y alterna entre Volumen 3D e Imagen en 3D."}
];
export const MOBILE_GALLERY_IDS=["mov001", "mov002", "mov003", "mov004", "mov005", "mov006", "mov007", "mov008", "mov009", "mov010", "mov011", "mov012", "mov013", "mov014", "mov015", "mov016", "mov017", "mov018", "mov019", "mov020", "mov021", "mov022", "mov023", "mov024", "mov025", "mov026", "mov027", "mov028", "mov029", "mov030", "mov031", "mov032", "mov033"];
export const DRAWING_IDS=['dib002','dib003','dib004','dib005','dib006','dib007','dib008','dib009','dib010','dib011','dib012','dib013','dib014','dib015','dib018','dib019','dib020','dib021','dib022','dib023','dib024','dib025','dib026','dib027','dib028','dib029','dib030','dib033','dib034','dib035','dib036','dib037','dib038','dib039','dib040','dib041','dib042','dib043','dib044','dib045','dib046','dib047','dib048','dib049','dib050','dib051','dib052','dib053'];
export const ORGANIC_IDS=['esc008','sculpture1','sculpture3','sculpture2','esc013','esc014','esc015','esc038'];
export const CURVED_PLANE_IDS=['esc005','esc006','esc007','sculpture4','esc031','esc032','esc033','esc034','esc035','esc036','esc044','esc053'];
const materials=new Map();
function mat(color,roughness=.78,metalness=0){const key=[color,roughness,metalness].join();if(!materials.has(key))materials.set(key,new THREE.MeshStandardMaterial({color,roughness,metalness}));return materials.get(key);}
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const boxGeo=new THREE.BoxGeometry(1,1,1), cylinderGeo=new THREE.CylinderGeometry(1,1,1,12), pebbleGeo=new THREE.IcosahedronGeometry(1,0);
function box(parent,size,pos,color,shadow=true){const m=new THREE.Mesh(boxGeo,mat(color));m.scale.set(...size);m.position.set(...pos);m.castShadow=shadow;m.receiveShadow=true;parent.add(m);return m;}
function rod(parent,a,b,r,color,r2=r){const from=V(...a),to=V(...b),d=to.clone().sub(from);const mesh=new THREE.Mesh(r===r2?cylinderGeo:new THREE.CylinderGeometry(r2/r,1,1,8),mat(color));mesh.scale.set(r,d.length(),r);mesh.position.copy(from.add(to).multiplyScalar(.5));mesh.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
function curve(parent,points,r,color,closed=false){const c=new THREE.CatmullRomCurve3(points.map(p=>V(...p)),closed,'centripetal');const mesh=new THREE.Mesh(new THREE.TubeGeometry(c,Math.max(24,points.length*7),r,8,closed),mat(color,.6));mesh.castShadow=true;parent.add(mesh);return mesh;}
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function textTexture(text,sub='',dark=false){const c=document.createElement('canvas');c.width=1024;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle=dark?'#eceede':'#30382d';ctx.font='40px Georgia';ctx.textAlign='center';ctx.fillText(text,512,103);ctx.font='15px Arial';ctx.fillStyle=dark?'#d2d8bf':'#6c7462';ctx.fillText(sub,512,152);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
function sign(parent,text,sub,pos,width=4,dark=false){const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,width/4),new THREE.MeshBasicMaterial({map:textTexture(text,sub,dark),transparent:true,depthWrite:false}));mesh.position.set(...pos);parent.add(mesh);return mesh;}
function groundTexture(garden=false){const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');ctx.fillStyle=garden?'#b6aa86':'#deded5';ctx.fillRect(0,0,256,256);const random=rng(17);for(let i=0;i<18000;i++){const col=garden?Math.floor(95+random()*75):Math.floor(165+random()*65);ctx.fillStyle=`rgba(${col},${garden?col-6:col},${garden?col-25:col},${.06+random()*.12})`;const s=random()*2.5+.3;ctx.fillRect(random()*256,random()*256,s,s);}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(garden?36:9,garden?36:10);t.colorSpace=THREE.SRGBColorSpace;return t;}
let shadowMap,studioEnvTex;
function getStudioEnvMap(){if(!studioEnvTex){const c=document.createElement('canvas');c.width=256;c.height=128;const ctx=c.getContext('2d');const g=ctx.createLinearGradient(0,0,0,128);g.addColorStop(0,'#ffffff');g.addColorStop(.32,'#f6f4ec');g.addColorStop(.52,'#e8e4d8');g.addColorStop(.72,'#cfc6b2');g.addColorStop(1,'#b5a88e');ctx.fillStyle=g;ctx.fillRect(0,0,256,128);ctx.fillStyle='rgba(255,252,240,.85)';for(let x=16;x<256;x+=64)ctx.fillRect(x,6,36,18);studioEnvTex=new THREE.CanvasTexture(c);studioEnvTex.mapping=THREE.EquirectangularReflectionMapping;studioEnvTex.colorSpace=THREE.SRGBColorSpace;}return studioEnvTex;}
function softShadow(parent,x,z,size,opacity=.2,y=0){if(!shadowMap){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');const gr=ctx.createRadialGradient(64,64,4,64,64,64);gr.addColorStop(0,'rgba(24,32,16,.6)');gr.addColorStop(.5,'rgba(24,32,16,.22)');gr.addColorStop(1,'rgba(24,32,16,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,128,128);shadowMap=new THREE.CanvasTexture(c);}const m=new THREE.Mesh(new THREE.PlaneGeometry(size,size),new THREE.MeshBasicMaterial({map:shadowMap,transparent:true,opacity,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(x,y+.022,z);parent.add(m);}
function makeRose(){const g=new THREE.Group();const points=[[0,0,0],[-.8,-.7,-.2],[1,-.42,.05],[.45,-1.45,.35],[-.4,-1.85,.2],[-1.1,-1,.45],[-.75,-2.05,.25],[.25,-2.3,-.18],[.85,-1.85,-.1],[.8,-2.65,.2],[.35,-2.45,-.3],[-.15,-2.8,-.12],[.2,-1.25,-.65],[-.7,-1.4,-.65],[.75,-1.7,-.5]];const pairs=[[0,1],[0,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[0,12],[12,13],[13,4],[12,14],[14,8],[1,5],[1,4],[4,8]];for(const [a,b]of pairs)rod(g,points[a],points[b],.012,'#eae9e1');const random=rng(6);points.slice(1).forEach((p,i)=>{const m=new THREE.Mesh(cylinderGeo,mat(['#e42e90','#b01f6c','#e9479d'][i%3],.83));m.scale.set(.09,.27,.09);m.position.set(...p);m.rotation.set(random(),random(),(random()-.5)*2);m.castShadow=true;g.add(m);const cap=new THREE.Mesh(new THREE.CircleGeometry(.086,12),mat('#af8b63'));cap.rotation.x=Math.PI/2;cap.position.y=-.136;m.add(new THREE.Object3D());});return g;}
function makeGreen(){const g=new THREE.Group();const loops=[[[0,0,0],[-.45,-.35,.08],[-.55,-1.25,.2],[-.85,-2.2,.1],[.4,-2.1,-.3],[.2,-1.1,-.15],[0,0,0]],[[0,0,0],[.7,-.8,-.15],[.95,-1.2,.25],[.1,-1.1,.45],[.3,-1.9,.6],[-.1,-2.8,.1],[-.5,-2.5,-.1],[-.75,-1.6,-.2],[-.5,-.6,-.15],[0,0,0]],[[0,0,0],[.12,-.65,-.4],[.5,-1.6,-.5],[.65,-2.15,.15],[-.55,-2.3,.45],[-.7,-1.4,.35]]];loops.forEach((p,i)=>curve(g,p,.045,['#3a9d52','#58b865','#458d43'][i]));rod(g,[0,0,0],[-.85,-2.2,.1],.012,'#426c36');rod(g,[.95,-1.2,.25],[-.1,-2.8,.1],.012,'#426c36');rod(g,[-.7,-1.4,.35],[.65,-2.15,.15],.012,'#426c36');return g;}
function makeColor(){const g=new THREE.Group(),random=rng(40),palette=['#edbf19','#e74671','#51b57b','#eaad13','#2b83ca'];for(let i=0;i<7;i++){const angle=i*2.399;const radial=V(Math.cos(angle),0,Math.sin(angle));const y=-.25-i*.29;const pts=[[0,Math.min(0,y+.6),0],[radial.x*.65,y,radial.z*.65],[radial.x*.75,y-.45,radial.z*.75],[-radial.z*.35,y-.65,radial.x*.35]];curve(g,pts,.035,i%2?'#397bc4':'#c26032');for(let j=1;j<4;j++){const disc=new THREE.Mesh(new THREE.TorusGeometry(.14,.055,8,20),mat(palette[(i+j)%palette.length],.8));disc.position.set(...pts[j]);disc.rotation.set(random()*2,random()*2,random()*2);disc.scale.z=1.5;disc.castShadow=true;g.add(disc);if(j===2){const m=new THREE.Mesh(cylinderGeo,mat(palette[(i+j+2)%palette.length]));m.scale.set(.15,.17,.15);m.position.copy(disc.position);m.position.y-=.17;m.rotation.z=angle;m.castShadow=true;g.add(m);}}}return g;}
function addMobile(world,id,position,scale=1){return addHangingMobile3D(world,id,position,6.5,scale,'gallery');}
let sculpturePresentation='ai3d';
export function getSculpturePresentation(){return sculpturePresentation;}
export function setSculpturePresentation(world,mode){sculpturePresentation=mode;if(!world)return;world.works.forEach(w=>{if((w.kind==='sculpture'||w.kind==='mobile')&&w.applyMode)w.applyMode(mode);});world.dirty=true;}
function addWalkRing(world){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');ctx.strokeStyle='#4e6041';ctx.lineWidth=6;ctx.beginPath();ctx.arc(64,64,46,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(104,123,81,.18)';ctx.fill();ctx.beginPath();ctx.arc(64,64,10,0,Math.PI*2);ctx.fillStyle='#4e6041';ctx.fill();const tex=new THREE.CanvasTexture(c);const ring=new THREE.Mesh(new THREE.PlaneGeometry(.56,.56),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,opacity:.85}));ring.rotation.x=-Math.PI/2;ring.position.y=.028;ring.visible=false;world.scene.add(ring);world.walkRing=ring;}
function addSculpture(world,id,position,rotation=0,pedestalH=.9){const data=ART.find(a=>a.id===id),root=new THREE.Group();root.position.set(...position);root.rotation.y=rotation;world.scene.add(root);world.colliders.push({x:position[0],z:position[2],r:.58});box(root,[.64,pedestalH,.64],[0,pedestalH/2,0],'#f1f0e8');box(root,[.68,.035,.68],[0,pedestalH+.017,0],'#e3e2d8');box(root,[.7,.04,.7],[0,.02,0],'#d8d7cd');const plaque=sign(root,data.code,'ENRIC SEGARRA',[0,pedestalH-.18,.335],.46);const h=data.height||1.18,v0=data.views[0];const textures=data.views.map(v=>{const t=texLoader.load(v.src,()=>{world.dirty=true;},undefined,()=>{world.assetErrors.push(v.src);});t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;});
 // Mode 1: 360° Volumetric Sculpture with exact photographic UV texture & studio colors
 const gAi3d=new THREE.Group();gAi3d.position.set(0,pedestalH+.03,0);root.add(gAi3d);
 box(gAi3d,[.46,.024,.46],[0,.012,0],'#7a664c');
 // Mode 2: 3D-positioned Studio Image (Multi-angle cutout without vitrine box)
 const gBillboard=new THREE.Group();gBillboard.position.set(0,pedestalH+.03,0);root.add(gBillboard);
 const billMat=new THREE.MeshBasicMaterial({map:textures[0],transparent:true,alphaTest:.04,side:THREE.DoubleSide});
 const billPlane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),billMat);billPlane.scale.set(v0.w,v0.h,1);billPlane.position.set(0,v0.h/2,0);billPlane.castShadow=true;gBillboard.add(billPlane);
 const work={...data,object:gBillboard,ai3dGroup:gAi3d,billboardGroup:gBillboard,plane:billPlane,textures,viewIndex:0,anchor:root,center:V(position[0],pedestalH+h*.52,position[2]),radius:2.25,spin:0,phase:world.works.length*1.7,baseRotation:rotation};
 work.setView=idx=>{const n=data.views.length,i=((idx%n)+n)%n;work.viewIndex=i;const v=data.views[i];billPlane.scale.set(v.w,v.h,1);billPlane.position.y=v.h/2;billMat.map=textures[i];billMat.needsUpdate=true;world.dirty=true;};
 work.applyMode=mode=>{gAi3d.visible=mode==='ai3d';gBillboard.visible=mode==='billboard';world.dirty=true;};
 work.applyMode(sculpturePresentation);
 if(data.glb&&!custom3d){const glbUrl=data.glb+(data.glb.includes('?')?'':'?v=9');gltfLoader.load(glbUrl,gltf=>{const model=gltf.scene;model.position.set(0,.024,0);model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.userData.work=work;const tex=o.material?.map,nMap=o.material?.normalMap;if(tex){tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;if(nMap){nMap.colorSpace=THREE.NoColorSpace;nMap.anisotropy=4;}o.material=new THREE.MeshStandardMaterial({map:tex,normalMap:nMap||null,normalScale:new THREE.Vector2(1.05,1.05),emissive:'#ffffff',emissiveMap:tex,emissiveIntensity:.14,envMapIntensity:.95,roughness:data.roughness??.72,metalness:data.metalness??.05,side:THREE.DoubleSide});}else{const hasVC=!!o.geometry.attributes.color;o.material=new THREE.MeshStandardMaterial({vertexColors:hasVC,color:hasVC?'#ffffff':'#d8ccb8',envMapIntensity:.9,roughness:data.roughness??.65,metalness:data.metalness??.05,side:THREE.DoubleSide});}}});gAi3d.add(model);world.dirty=true;},undefined,()=>{world.assetErrors.push(data.glb);});}
 root.traverse(o=>{if(o.isMesh)o.userData.work=work;});world.works.push(work);world.pickables.push(root);softShadow(world.scene,position[0],position[2],1.7,.28);return work;}
function addPainting(world,id,position,rotation,w,h,uv){const data=ART.find(a=>a.id===id),g=new THREE.Group();g.position.set(...position);g.rotation.y=rotation;const texture=new THREE.TextureLoader().load(data.image,()=>{world.dirty=true;},undefined,()=>{world.assetErrors.push(data.image);});texture.colorSpace=THREE.SRGBColorSpace;texture.offset.set(uv[0],uv[1]);texture.repeat.set(uv[2],uv[3]);texture.anisotropy=4;box(g,[w,h,.07],[0,0,0],'#625542');const art=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture}));art.position.z=.038;g.add(art);const label=sign(g,data.code,'ENRIC SEGARRA',[w/2+.4,-h/2+.1,.05],.8);world.scene.add(g);const work={...data,object:g,center:V(...position),radius:2.8,view:V(Math.sin(rotation)*3+position[0],position[1],Math.cos(rotation)*3+position[2])};g.traverse(o=>{if(o.isMesh)o.userData.work=work;});world.works.push(work);world.pickables.push(g);return work;}
function addDrawing(world,id,position,rotation,w=2.28,h=1.52){const data=ART.find(a=>a.id===id);if(!data)return null;const g=new THREE.Group();g.position.set(...position);g.rotation.y=rotation;const texture=texLoader.load(data.image,()=>{world.dirty=true;},undefined,()=>{world.assetErrors.push(data.image);});texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=8;box(g,[w+.14,h+.14,.055],[0,0,0],'#7d674d');box(g,[w+.04,h+.04,.062],[0,0,.004],'#f4f2ea',false);const art=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture}));art.position.z=.037;g.add(art);sign(g,data.code,data.title.slice(0,30).toUpperCase(),[0,-h/2-.24,.03],1.1);world.scene.add(g);const work={...data,object:g,center:V(...position),radius:2.35,view:V(Math.sin(rotation)*2.65+position[0],position[1],Math.cos(rotation)*2.65+position[2])};g.traverse(o=>{if(o.isMesh)o.userData.work=work;});world.works.push(work);world.pickables.push(g);return work;}
export function createDrawingsRoom(){const scene=new THREE.Scene();scene.background=new THREE.Color('#ecebe3');scene.environment=getStudioEnvMap();scene.fog=new THREE.Fog('#ecebe3',42,108);const world={id:'drawings',scene,works:[],mobiles:[],pickables:[],colliders:[],assetErrors:[],bounds:{minX:-11.1,maxX:11.1,minZ:-41.1,maxZ:41.1},dirty:true};
 scene.add(new THREE.HemisphereLight('#f8f9ff','#c9c4b4',2.3));const sun=new THREE.DirectionalLight('#fff8eb',2.7);sun.position.set(6,24,10);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-26,right:26,top:44,bottom:-44,near:1,far:90});sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;scene.add(sun);world.sun=sun;
 const floorTex=groundTexture(false);floorTex.repeat.set(14,48);const floor=new THREE.Mesh(new THREE.PlaneGeometry(24,84),new THREE.MeshStandardMaterial({map:floorTex,roughness:.9}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.userData.isFloor=true;scene.add(floor);world.floor=floor;world.pickables.push(floor);addWalkRing(world);
 box(scene,[24.5,6.8,.4],[0,3.4,-42.1],'#f6f5ed');box(scene,[24.5,6.8,.4],[0,3.4,42.1],'#f6f5ed');box(scene,[.4,6.8,84.4],[-12.1,3.4,0],'#faf9f2');box(scene,[.4,6.8,84.4],[12.1,3.4,0],'#faf9f2');
 box(scene,[24,.08,.06],[0,.15,-41.88],'#e2e1d6',false);box(scene,[24,.08,.06],[0,.15,41.88],'#e2e1d6',false);box(scene,[.06,.08,84],[-11.88,.15,0],'#e2e1d6',false);box(scene,[.06,.08,84],[11.88,.15,0],'#e2e1d6',false);
 for(let x=-10;x<=10;x+=5)box(scene,[.014,.005,84],[x,.007,0],'#c8c9bf',false);for(let z=-40;z<=40;z+=4)box(scene,[24,.005,.014],[0,.007,z],'#c8c9bf',false);
 for(let z=-39;z<=39;z+=6){box(scene,[24,.24,.2],[0,6.6,z],'#e5e6dc');box(scene,[24,.05,.09],[0,6.45,z+.22],'#faf8df',false);}
 for(const x of [-10.2,-3.8,3.8,10.2])box(scene,[.09,.09,82],[x,6.32,0],'#656a60');
 const entrySign=sign(scene,'SALA DE DIBUJO','SERIE DIBUJO Y ESPACIO · 48 OBRAS ORIGINALES',[0,4.5,41.82],6.8);entrySign.rotation.y=Math.PI;
 sign(scene,'ENRIC SEGARRA I GARIBO','EL TRAZO, EL COLOR Y EL ESPACIO SOBRE EL PAPEL',[0,4.6,-41.82],7.2);
 const wallZs=[36.4,30.8,25.2,19.6,14.0,8.4,2.8,-2.8,-8.4,-14.0,-19.6,-25.2,-30.8,-36.4];
 const leftIds=DRAWING_IDS.slice(0,14),rightIds=DRAWING_IDS.slice(14,28);
 for(let i=0;i<14;i++){addDrawing(world,leftIds[i],[-11.84,2.18,wallZs[i]],Math.PI/2);addDrawing(world,rightIds[i],[11.84,2.18,wallZs[i]],-Math.PI/2);}
 const panels=[
  {z:26.0,title:'SECCIÓN I · TRAZO Y COLOR CÁLIDO',sub:'DIBUJOS DEL ARCHIVO · TRAZO, SOMBRA Y SUPERFICIE',front:['dib034','dib035'],back:['dib036','dib037']},
  {z:10.0,title:'SECCIÓN II · LÍNEA Y COMPOSICIÓN',sub:'EQUILIBRIO DE FORMAS SOBRE EL PLANO',front:['dib038','dib039'],back:['dib040','dib041']},
  {z:-6.0,title:'SECCIÓN III · EL ESPACIO EN EL PAPEL',sub:'ENCUENTROS DE LÍNEAS AZULES, ROJAS Y AMARILLAS',front:['dib042','dib043'],back:['dib044','dib045']},
  {z:-22.0,title:'SECCIÓN IV · TRAMAS Y ACENTOS',sub:'RITMOS GRISES, PLANOS Y LÍNEAS OBLICUAS',front:['dib046','dib047'],back:['dib048','dib049']}
 ];
 panels.forEach(p=>{
  box(scene,[9.8,4.35,.38],[0,2.175,p.z],'#f4f3eb');box(scene,[9.92,.09,.46],[0,.045,p.z],'#dbd9ce',false);box(scene,[9.92,.08,.44],[0,4.36,p.z],'#e2e1d5',false);
  softShadow(scene,0,p.z,10.5,.22);
  for(const cx of [-4.1,-2.7,-1.3,0,1.3,2.7,4.1])world.colliders.push({x:cx,z:p.z,r:.55});
  sign(scene,p.title,p.sub,[0,3.78,p.z+.21],4.8);
  const backSign=sign(scene,p.title,p.sub,[0,3.78,p.z-.21],4.8);backSign.rotation.y=Math.PI;
  addDrawing(world,p.front[0],[-2.35,2.14,p.z+.21],0);addDrawing(world,p.front[1],[2.35,2.14,p.z+.21],0);
  addDrawing(world,p.back[0],[-2.35,2.14,p.z-.21],Math.PI);addDrawing(world,p.back[1],[2.35,2.14,p.z-.21],Math.PI);
 });
 addDrawing(world,'dib050',[-7.5,2.18,-41.82],0);addDrawing(world,'dib051',[-2.5,2.18,-41.82],0);addDrawing(world,'dib052',[2.5,2.18,-41.82],0);addDrawing(world,'dib053',[7.5,2.18,-41.82],0);
 for(const bz of [34.0,18.0,2.0,-14.0,-31.0]){
  for(const bx of [-6.4,6.4]){
   box(scene,[2.6,.12,.64],[bx,.48,bz],'#bcad8e');box(scene,[.15,.44,.48],[bx-.95,.22,bz],'#555e4a');box(scene,[.15,.44,.48],[bx+.95,.22,bz],'#555e4a');
   softShadow(scene,bx,bz,3.2,.25);world.colliders.push({x:bx,z:bz,r:1.25});
  }
 }
 world.stops=[
  {title:'Umbral del dibujo',pos:[0,1.72,37.8],look:[-2.35,2.14,26.21],work:'dib034'},
  {title:'Rojos y cálidos',pos:[-7.4,1.72,30.8],look:[-11.84,2.18,30.8],work:'dib003'},
  {title:'Líneas y espacio',pos:[-7.4,1.72,8.4],look:[-11.84,2.18,8.4],work:'dib007'},
  {title:'Pabellón central',pos:[0,1.72,2.5],look:[-2.35,2.14,-5.79],work:'dib042'},
  {title:'Acentos y tramas',pos:[7.4,1.72,-8.4],look:[11.84,2.18,-8.4],work:'dib027'},
  {title:'Horizonte de papel',pos:[0,1.72,-35.2],look:[-2.5,2.18,-41.82],work:'dib051'}
 ];
 world.stops.forEach((s,i)=>marker(world,i,s.pos[0],s.pos[2]));return world;}
export function createOrganicRoom(){const scene=new THREE.Scene();scene.background=new THREE.Color('#edeae0');scene.environment=getStudioEnvMap();scene.fog=new THREE.Fog('#edeae0',36,92);const world={id:'organic',scene,works:[],mobiles:[],pickables:[],colliders:[],assetErrors:[],bounds:{minX:-10.8,maxX:10.8,minZ:-22.8,maxZ:22.8},dirty:true};
 scene.add(new THREE.HemisphereLight('#fffdf7','#c7bfa9',2.35));const sun=new THREE.DirectionalLight('#fff6e4',2.85);sun.position.set(7,22,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-22,right:22,top:26,bottom:-26,near:1,far:75});sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;scene.add(sun);world.sun=sun;
 const floorTex=groundTexture(false);floorTex.repeat.set(14,28);const floor=new THREE.Mesh(new THREE.PlaneGeometry(24,48),new THREE.MeshStandardMaterial({map:floorTex,roughness:.88}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.userData.isFloor=true;scene.add(floor);world.floor=floor;world.pickables.push(floor);addWalkRing(world);
 box(scene,[24.5,6.8,.4],[0,3.4,-24.1],'#f5f3ea');box(scene,[24.5,6.8,.4],[0,3.4,24.1],'#f5f3ea');box(scene,[.4,6.8,48.4],[-12.1,3.4,0],'#f9f7ef');box(scene,[.4,6.8,48.4],[12.1,3.4,0],'#f9f7ef');
 box(scene,[24,.08,.06],[0,.15,-23.88],'#dfddd1',false);box(scene,[24,.08,.06],[0,.15,23.88],'#dfddd1',false);box(scene,[.06,.08,48],[-11.88,.15,0],'#dfddd1',false);box(scene,[.06,.08,48],[11.88,.15,0],'#dfddd1',false);
 for(let x=-10;x<=10;x+=5)box(scene,[.014,.005,48],[x,.007,0],'#c8c6ba',false);for(let z=-22;z<=22;z+=4)box(scene,[24,.005,.014],[0,.007,z],'#c8c6ba',false);
 for(let z=-21;z<=21;z+=6){box(scene,[24,.24,.2],[0,6.6,z],'#e5e3d7');box(scene,[24,.05,.09],[0,6.45,z+.22],'#faf7df',false);}
 for(const x of [-9.8,-3.6,3.6,9.8])box(scene,[.09,.09,46],[x,6.32,0],'#656a60');
 const entrySign=sign(scene,'SALA DE FORMAS ORGÁNICAS','ESCULTURA EN MADERA, PIEDRA Y MATERIA NATURAL · 08 OBRAS',[0,4.55,23.8],7.0);entrySign.rotation.y=Math.PI;
 sign(scene,'ENRIC SEGARRA I GARIBO','LA VETA, EL HUECO Y EL VOLUMEN ORGÁNICO EN 360°',[0,4.6,-23.8],7.2);
 // Wide, uncrowded pedestals with 360° walk-around clearance
 const placements=[
  {id:'esc008',pos:[-4.6,0,14.0],rot:0.42,ped:.90,wallX:-11.82,wallZ:14.0,wallRot:Math.PI/2},
  {id:'sculpture1',pos:[4.6,0,14.0],rot:-0.42,ped:.90,wallX:11.82,wallZ:14.0,wallRot:-Math.PI/2},
  {id:'sculpture3',pos:[-4.6,0,4.8],rot:0.38,ped:.90,wallX:-11.82,wallZ:4.8,wallRot:Math.PI/2},
  {id:'sculpture2',pos:[4.6,0,4.8],rot:-0.38,ped:.90,wallX:11.82,wallZ:4.8,wallRot:-Math.PI/2},
  {id:'esc013',pos:[-4.6,0,-4.8],rot:0.38,ped:.90,wallX:-11.82,wallZ:-4.8,wallRot:Math.PI/2},
  {id:'esc014',pos:[4.6,0,-4.8],rot:-0.38,ped:.88,wallX:11.82,wallZ:-4.8,wallRot:-Math.PI/2},
  {id:'esc015',pos:[-4.6,0,-14.0],rot:0.42,ped:.92,wallX:-11.82,wallZ:-14.0,wallRot:Math.PI/2},
  {id:'esc038',pos:[4.6,0,-14.0],rot:-0.42,ped:.90,wallX:11.82,wallZ:-14.0,wallRot:-Math.PI/2}
 ];
 placements.forEach(p=>{
  const w=addSculpture(world,p.id,p.pos,p.rot,p.ped);
  // Subtle circular floor halo around each pedestal to highlight the 360° inspection zone
  const ring=new THREE.Mesh(new THREE.RingGeometry(1.15,1.22,48),mat('#c8c3b2',.9));ring.rotation.x=-Math.PI/2;ring.position.set(p.pos[0],.009,p.pos[2]);scene.add(ring);
 });
 // Central contemplation benches along the wide main nave
 for(const bz of [9.4,0,-9.4]){
  box(scene,[2.8,.12,.66],[0,.48,bz],'#bcad8e');box(scene,[.16,.44,.50],[-1.05,.22,bz],'#555e4a');box(scene,[.16,.44,.50],[1.05,.22,bz],'#555e4a');
  softShadow(scene,0,bz,3.4,.24);world.colliders.push({x:0,z:bz,r:1.3});
 }
 world.stops=[
  {title:'Umbral de las formas orgánicas',pos:[0,1.72,20.2],look:[0,1.7,6.0],work:'esc008'},
  {title:'Ondulación y veta (ESC-008 · ESC-009)',pos:[0,1.72,14.8],look:[-4.6,1.5,14.0],work:'esc008'},
  {title:'Madera cálida (ESC-009)',pos:[1.2,1.72,14.6],look:[4.6,1.5,14.0],work:'sculpture1'},
  {title:'Aberturas y luz (ESC-010 · ESC-011)',pos:[0,1.72,5.6],look:[4.6,1.5,4.8],work:'sculpture2'},
  {title:'Verticalidad orgánica (ESC-013 · ESC-014)',pos:[0,1.72,-4.0],look:[-4.6,1.5,-4.8],work:'esc013'},
  {title:'Cavidades y raíz natural (ESC-015 · ESC-038)',pos:[0,1.72,-13.2],look:[-4.6,1.4,-14.0],work:'esc015'}
 ];
 world.stops.forEach((s,i)=>marker(world,i,s.pos[0],s.pos[2]));return world;}
export function createCurvedPlanesRoom(){const scene=new THREE.Scene();scene.background=new THREE.Color('#eae8df');scene.environment=getStudioEnvMap();scene.fog=new THREE.Fog('#eae8df',40,98);const world={id:'curvos',scene,works:[],mobiles:[],pickables:[],colliders:[],assetErrors:[],bounds:{minX:-10.8,maxX:10.8,minZ:-26.8,maxZ:26.8},dirty:true};
 scene.add(new THREE.HemisphereLight('#fffdf8','#c4bcab',2.35));const sun=new THREE.DirectionalLight('#fff6e5',2.9);sun.position.set(7.5,23,11);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-24,right:24,top:30,bottom:-30,near:1,far:80});sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;scene.add(sun);world.sun=sun;
 const floorTex=groundTexture(false);floorTex.repeat.set(14,32);const floor=new THREE.Mesh(new THREE.PlaneGeometry(24,56),new THREE.MeshStandardMaterial({map:floorTex,roughness:.88}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.userData.isFloor=true;scene.add(floor);world.floor=floor;world.pickables.push(floor);addWalkRing(world);
 box(scene,[24.5,6.8,.4],[0,3.4,-28.1],'#f5f3ea');box(scene,[24.5,6.8,.4],[0,3.4,28.1],'#f5f3ea');box(scene,[.4,6.8,56.4],[-12.1,3.4,0],'#f9f7ef');box(scene,[.4,6.8,56.4],[12.1,3.4,0],'#f9f7ef');
 box(scene,[24,.08,.06],[0,.15,-27.88],'#dfddd1',false);box(scene,[24,.08,.06],[0,.15,27.88],'#dfddd1',false);box(scene,[.06,.08,56],[-11.88,.15,0],'#dfddd1',false);box(scene,[.06,.08,56],[11.88,.15,0],'#dfddd1',false);
 for(let x=-10;x<=10;x+=5)box(scene,[.014,.005,56],[x,.007,0],'#c8c6ba',false);for(let z=-26;z<=26;z+=4)box(scene,[24,.005,.014],[0,.007,z],'#c8c6ba',false);
 for(let z=-24;z<=24;z+=6){box(scene,[24,.24,.2],[0,6.6,z],'#e5e3d7');box(scene,[24,.05,.09],[0,6.45,z+.22],'#faf7df',false);}
 for(const x of [-9.8,-3.6,3.6,9.8])box(scene,[.09,.09,54],[x,6.32,0],'#656a60');
 const entrySign=sign(scene,'PLANOS CURVOS Y VOLÚMENES ABIERTOS','ESCULTURA EN HIERRO FORJADO Y PIEDRA · 12 OBRAS',[0,4.55,27.8],7.4);entrySign.rotation.y=Math.PI;
 sign(scene,'ENRIC SEGARRA I GARIBO','EL PLIEGUE, LA CURVA Y EL ESPACIO INTERIOR EN 360°',[0,4.6,-27.8],7.4);
 const placements=[
  {id:'esc005',pos:[-4.6,0,18.0],rot:0.42,ped:.90,wallX:-11.82,wallZ:18.0,wallRot:Math.PI/2},
  {id:'esc006',pos:[4.6,0,18.0],rot:-0.42,ped:.90,wallX:11.82,wallZ:18.0,wallRot:-Math.PI/2},
  {id:'esc007',pos:[-4.6,0,10.8],rot:0.38,ped:.88,wallX:-11.82,wallZ:10.8,wallRot:Math.PI/2},
  {id:'sculpture4',pos:[4.6,0,10.8],rot:-0.38,ped:.90,wallX:11.82,wallZ:10.8,wallRot:-Math.PI/2},
  {id:'esc031',pos:[-4.6,0,3.6],rot:0.38,ped:.90,wallX:-11.82,wallZ:3.6,wallRot:Math.PI/2},
  {id:'esc032',pos:[4.6,0,3.6],rot:-0.38,ped:.88,wallX:11.82,wallZ:3.6,wallRot:-Math.PI/2},
  {id:'esc033',pos:[-4.6,0,-3.6],rot:0.38,ped:.88,wallX:-11.82,wallZ:-3.6,wallRot:Math.PI/2},
  {id:'esc034',pos:[4.6,0,-3.6],rot:-0.38,ped:.90,wallX:11.82,wallZ:-3.6,wallRot:-Math.PI/2},
  {id:'esc035',pos:[-4.6,0,-10.8],rot:0.40,ped:.90,wallX:-11.82,wallZ:-10.8,wallRot:Math.PI/2},
  {id:'esc036',pos:[4.6,0,-10.8],rot:-0.40,ped:.90,wallX:11.82,wallZ:-10.8,wallRot:-Math.PI/2},
  {id:'esc044',pos:[-4.6,0,-18.0],rot:0.42,ped:.90,wallX:-11.82,wallZ:-18.0,wallRot:Math.PI/2},
  {id:'esc053',pos:[4.6,0,-18.0],rot:-0.42,ped:.90,wallX:11.82,wallZ:-18.0,wallRot:-Math.PI/2}
 ];
 placements.forEach(p=>{
  const w=addSculpture(world,p.id,p.pos,p.rot,p.ped);
  const ring=new THREE.Mesh(new THREE.RingGeometry(1.15,1.22,48),mat('#c8c3b2',.9));ring.rotation.x=-Math.PI/2;ring.position.set(p.pos[0],.009,p.pos[2]);scene.add(ring);
 });
 for(const bz of [14.4,7.2,0,-7.2,-14.4]){
  box(scene,[2.8,.12,.66],[0,.48,bz],'#bcad8e');box(scene,[.16,.44,.50],[-1.05,.22,bz],'#555e4a');box(scene,[.16,.44,.50],[1.05,.22,bz],'#555e4a');
  softShadow(scene,0,bz,3.4,.24);world.colliders.push({x:0,z:bz,r:1.3});
 }
 world.stops=[
  {title:'Umbral de los planos curvos',pos:[0,1.72,24.2],look:[0,1.7,10.0],work:'esc005'},
  {title:'Aberturas verticales (ESC-005 · ESC-006)',pos:[0,1.72,18.8],look:[-4.6,1.5,18.0],work:'esc005'},
  {title:'Envolventes y perfiles (ESC-007 · ESC-012)',pos:[0,1.72,11.6],look:[4.6,1.5,10.8],work:'sculpture4'},
  {title:'Curvas ascendentes (ESC-031 · ESC-032)',pos:[0,1.72,4.4],look:[-4.6,1.5,3.6],work:'esc031'},
  {title:'Lazos y oquedades (ESC-033 · ESC-034)',pos:[0,1.72,-2.8],look:[4.6,1.5,-3.6],work:'esc034'},
  {title:'Contorno ovalado y espiral (ESC-035 · ESC-036)',pos:[0,1.72,-10.0],look:[-4.6,1.5,-10.8],work:'esc035'},
  {title:'Planos dobles y ondulación (ESC-044 · ESC-053)',pos:[0,1.72,-17.2],look:[4.6,1.5,-18.0],work:'esc053'}
 ];
 world.stops.forEach((s,i)=>marker(world,i,s.pos[0],s.pos[2]));return world;}
function lights(world,garden){world.scene.environment=getStudioEnvMap();const hemi=new THREE.HemisphereLight(garden?'#eaf3f7':'#f1f4ff',garden?'#a38f5b':'#c4c2b4',garden?2.15:2.2);world.scene.add(hemi);world.hemi=hemi;const sun=new THREE.DirectionalLight(garden?'#fff1ce':'#fff8e9',garden?3.15:2.8);sun.position.set(garden?-16:5,garden?24:18,garden?12:7);sun.castShadow=true;sun.shadow.mapSize.set(garden?2048:1024,garden?2048:1024);Object.assign(sun.shadow.camera,garden?{left:-38,right:38,top:32,bottom:-32,near:1,far:95}:{left:-18,right:18,top:18,bottom:-18,near:1,far:65});sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;world.scene.add(sun);world.sun=sun;}
function marker(world,index,x,z){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');ctx.strokeStyle='#768366';ctx.lineWidth=2;ctx.beginPath();ctx.arc(64,64,53,0,Math.PI*2);ctx.stroke();ctx.font='35px Georgia';ctx.fillStyle='#6b785c';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(index+1).padStart(2,'0'),64,65);const tex=new THREE.CanvasTexture(c);const m=new THREE.Mesh(new THREE.PlaneGeometry(.65,.65),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;const gy=world.heightAt?world.heightAt(x,z):0;m.position.set(x,gy+.028,z);m.userData.stop=index;world.scene.add(m);world.pickables.push(m);}
export function createGallery(){const scene=new THREE.Scene();scene.background=new THREE.Color('#e8ece5');scene.fog=new THREE.Fog('#e8ece5',30,70);const world={id:'gallery',scene,works:[],mobiles:[],pickables:[],colliders:[{x:-4.5,z:3,r:1.4}],assetErrors:[],bounds:{minX:-7.9,maxX:7.9,minZ:-8.9,maxZ:8.9},dirty:true};lights(world,false);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(17,19),new THREE.MeshStandardMaterial({map:groundTexture(),roughness:.9}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.userData.isFloor=true;scene.add(floor);world.floor=floor;world.pickables.push(floor);addWalkRing(world);
 box(scene,[17.5,6.7,.35],[0,3.35,-9.6],'#f6f6ee');box(scene,[.35,6.7,19.4],[-8.65,3.35,0],'#faf9f3');box(scene,[.35,6.7,19.4],[8.65,3.35,0],'#faf9f3');box(scene,[17.5,6.7,.35],[0,3.35,9.6],'#f6f6ee');
 const entrySign=sign(scene,'ESPACIOS EN MOVIMIENTO','UNA VISITA AL UNIVERSO DE ENRIC SEGARRA',[0,3.1,9.4],5.4);entrySign.rotation.y=Math.PI;
 for(let x=-8;x<=8;x+=4)box(scene,[.013,.005,19],[x,.007,0],'#c8c9bf',false);for(let z=-9;z<=9;z+=3)box(scene,[17,.005,.013],[0,.007,z],'#c8c9bf',false);
 box(scene,[17,.07,.05],[0,.15,-9.4],'#e3e3d9',false);box(scene,[.05,.07,19],[-8.44,.15,0],'#e3e3d9',false);box(scene,[.05,.07,19],[8.44,.15,0],'#e3e3d9',false);
 // Open roof bays admit light; beams give the room a readable architectural scale.
 for(let z=-9;z<10;z+=3){box(scene,[17,.22,.17],[0,6.55,z],'#e5e7dd');box(scene,[17,.045,.07],[0,6.41,z+.2],'#faf8df',false);}for(const x of [-7.8,7.8])box(scene,[.09,.09,18],[x,6.3,0],'#656a60');
 for(const x of [-7.8,7.8])for(const z of [-6,-1,4]){const spot=new THREE.Mesh(new THREE.CylinderGeometry(.09,.075,.25,12),mat('#42483e'));spot.position.set(x,6.13,z);spot.rotation.z=x>0?-.35:.35;scene.add(spot);}
 sign(scene,'ENRIC SEGARRA','MATERIA  /  EQUILIBRIO  /  MOVIMIENTO',[.7,4.6,-9.4],5.8);
 const rose=addMobile(world,'rose',[.6,5.15,-1.7],1.08);const green=addMobile(world,'green',[-4.3,4.7,-5.8],.94);const color=addMobile(world,'color',[4.7,4.9,-5],1.06);for(const w of world.mobiles)rod(scene,[w.anchor.position.x,6.5,w.anchor.position.z],w.anchor.position.toArray(),.006,'#999d8f');
 addPainting(world,'painting1',[-3.5,2.45,-9.4],0,2.2,2.18,[.231,.075,.594,.873]);addPainting(world,'painting2',[-8.44,2.4,-2.5],Math.PI/2,1.8,2.14,[.013,.13,.93,.749]);addPainting(world,'painting3',[8.44,2.45,-1.8],-Math.PI/2,1.75,2.29,[.061,.091,.844,.748]);
 addSculpture(world,'esc037',[-6.6,0,5.6],.65,.88);addSculpture(world,'esc039',[-6.6,0,1.2],.48,.86);addSculpture(world,'esc040',[-6.6,0,-2.0],.45,.88);
 addSculpture(world,'esc041',[-3.0,0,-6.8],.18,.88);addSculpture(world,'esc042',[4.8,0,-6.8],-.32,.88);addSculpture(world,'esc043',[6.6,0,-4.4],-.52,.88);
 addSculpture(world,'esc045',[6.6,0,.6],-.48,.88);addSculpture(world,'esc054',[6.6,0,3.8],-.58,.88);addSculpture(world,'esc055',[5.8,0,6.6],-.72,.88);
 box(scene,[2.8,.13,.65],[-4.5,.52,3],'#bbac8c');box(scene,[.15,.45,.47],[-5.5,.23,3],'#555e4a');box(scene,[.15,.45,.47],[-3.5,.23,3],'#555e4a');softShadow(scene,-4.5,3,3.5,.3);
 world.stops=[{title:'El umbral',pos:[1.9,1.72,8.3],look:[.3,2.75,-3]},{title:'Equilibrio en rosa',pos:[.6,1.72,2.7],look:rose.center.toArray(),work:'rose'},{title:'Líneas y vacío',pos:[-3.8,1.72,-1.5],look:green.center.toArray(),work:'green'},{title:'Color y pintura',pos:[3.8,1.72,-.4],look:color.center.toArray(),work:'color'}];world.stops.forEach((s,i)=>marker(world,i,s.pos[0],s.pos[2]));return world;}
function tree(world,x,z,height,seed,bare=false){const random=rng(seed),g=new THREE.Group();g.position.set(x,0,z);world.scene.add(g);world.colliders.push({x,z,r:.65});const lean=(random()-.5)*1.1;rod(g,[0,0,0],[lean,height*.62,0],.25,'#6e6250',.14);rod(g,[lean,height*.62,0],[lean+.3,height,0],.14,'#75684f',.045);const crowns=[];
 for(let i=0;i<6;i++){const a=i*2.4+seed,level=height*(.5+random()*.3),reach=1.7+random()*1.3;const end=[Math.cos(a)*reach,height*(.82+random()*.22),Math.sin(a)*reach];rod(g,[lean*.7,level,0],end,.10,'#73634b',.018);const mid=[end[0]*.63,(end[1]+level)*.5,end[2]*.63];rod(g,mid,[end[0]*1.15,end[1]+.5,end[2]*.85],.045,'#7d6d50',.008);crowns.push(end);}
 if(!bare){const count=125,foliage=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),mat('#69764a',1),count);const dummy=new THREE.Object3D();for(let i=0;i<count;i++){const p=crowns[i%crowns.length],a=random()*Math.PI*2,r=Math.sqrt(random())*1.6;dummy.position.set(p[0]+Math.cos(a)*r,p[1]+(random()-.25)*.9,p[2]+Math.sin(a)*r);dummy.scale.set(.45+random()*.6,.12+random()*.35,.4+random()*.6);dummy.rotation.set(random(),random()*6,random());dummy.updateMatrix();foliage.setMatrixAt(i,dummy.matrix);foliage.setColorAt(i,new THREE.Color().setHSL(.17+random()*.06,.18+random()*.17,.21+random()*.13));}foliage.castShadow=true;foliage.receiveShadow=true;g.add(foliage);}
 for(let i=0;i<9;i++){const a=i*.7;const rock=new THREE.Mesh(pebbleGeo,mat(i%2?'#b0a48b':'#d0c7ad'));rock.position.set(Math.cos(a)*.6,.12,Math.sin(a)*.6);rock.scale.set(.14+random()*.15,.12+random()*.12,.18+random()*.12);rock.rotation.set(random(),random(),random());rock.castShadow=true;g.add(rock);}softShadow(world.scene,x,z,7,.4);return g;}
function meadow(world){const random=rng(97),g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([-.025,0,0,.025,0,0,0,.42,0],3));g.computeVertexNormals();const grass=new THREE.InstancedMesh(g,new THREE.MeshStandardMaterial({color:'#a6a16c',side:THREE.DoubleSide,roughness:1}),2200),dummy=new THREE.Object3D();for(let i=0;i<2200;i++){let x=(random()-.5)*65,z=(random()-.5)*65;if(Math.abs(x)<2.2&&z<10&&z>-14)x+=Math.sign(x||1)*2.7;dummy.position.set(x,.005,z);dummy.scale.setScalar(.5+random()*1.1);dummy.rotation.y=random()*6.28;dummy.updateMatrix();grass.setMatrixAt(i,dummy.matrix);grass.setColorAt(i,new THREE.Color().setHSL(.13+random()*.08,.22,.34+random()*.17));}world.scene.add(grass);
 const stones=new THREE.InstancedMesh(pebbleGeo,mat('#bab199'),180);for(let i=0;i<180;i++){dummy.position.set((random()-.5)*60,.04,(random()-.5)*60);dummy.scale.set(.07+random()*.2,.035+random()*.12,.08+random()*.23);dummy.rotation.set(random(),random(),random());dummy.updateMatrix();stones.setMatrixAt(i,dummy.matrix);}world.scene.add(stones);}
// === RECREACIÓN 3D EXACTA DE LA PARCELA REAL (COLLADO DELS LLOPS, NÁQUERA · POLÍGONO 26, PARCELAS 690-691) ===
// Coordenadas reales: 39.65486° N, -0.44318° W. Versión embellecida "El Jardín de las Lagartijas":
// - Caseta de cemento (47 m², 12.32×3.84m, -20.4°) transformada en Pabellón-Taller de Madera Natural con porche y pérgola
// - Camino norte, las 2 entradas reales de piedra y forja (Este y Oeste), acequia del camino y acequia interior con agua
// - Terreno limpio sin escombros, senderos de albero, bancales de piedra seca, alcorques blancos y todos los árboles reales
function parcelaRoadZ(x){return -9.2-0.50*x+0.0018*x*x;}
export const sphereGeo=new THREE.SphereGeometry(1,12,10);
function parcelaHeightAt(x,z){
 // Smooth natural slope of Parcelas 690 & 691 in Partida Collado dels Llops (Náquera)
 const base = -0.020 * (x - 10) - 0.032 * (z + 6);
 const terrace = z > 3.5 ? -0.30 * Math.min(1, (z - 3.5) / 2.2) : 0;
 const micro = 0.04 * Math.sin(x * 0.17) * Math.cos(z * 0.15);
 return base + terrace + micro;
}
function registerCustomGardenWork(world,id,anchor,pivot,centerVec,radius=2.2){
 const data=ART.find(a=>a.id===id);if(!data)return null;
 const gy=parcelaHeightAt(centerVec.x,centerVec.z);
 const v0=(data.views&&data.views[0])||{src:data.image,w:1.2,h:1.8};
 const gBillboard=new THREE.Group();
 gBillboard.position.copy(centerVec).sub(anchor.position);
 anchor.add(gBillboard);
 const tex=texLoader.load(data.image,()=>{world.dirty=true;});
 tex.colorSpace=THREE.SRGBColorSpace;
 const bPlane=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.35),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide}));
 gBillboard.add(bPlane);
 gBillboard.visible=(sculpturePresentation==='billboard');
 pivot.visible=(sculpturePresentation!=='billboard');
 const work={
  ...data,
  object:pivot,
  ai3dGroup:pivot,
  billboardGroup:gBillboard,
  textures:[],
  viewIndex:0,
  anchor,
  center:centerVec,
  groundY:gy,
  levelTag:'garden',
  awakened:false,
  radius,
  spin:0,
  phase:world.works.length*1.65+0.5,
  baseRotation:0,
  setView:()=>{},
  applyMode:mode=>{pivot.visible=(mode!=='billboard');gBillboard.visible=(mode==='billboard');world.dirty=true;}
 };
 anchor.traverse(o=>{if(o.isMesh)o.userData.work=work;});
 world.works.push(work);
 world.pickables.push(anchor);
 world.mobiles.push(work);
 return work;
}
function taperedBranch(parent,points,rStart,rEnd,color,segs=16,radSegs=8){
 const curveObj=new THREE.CatmullRomCurve3(points.map(p=>V(...p)),false,'centripetal');
 const geo=new THREE.TubeGeometry(curveObj,segs,1,radSegs,false);
 const pos=geo.attributes.position;
 const v=new THREE.Vector3(),c=new THREE.Vector3();
 for(let i=0;i<=segs;i++){
  const t=i/segs;
  const r=rStart*(1-t)+rEnd*t;
  curveObj.getPointAt(t,c);
  for(let j=0;j<=radSegs;j++){
   const idx=i*(radSegs+1)+j;
   v.fromBufferAttribute(pos,idx).sub(c).multiplyScalar(r).add(c);
   pos.setXYZ(idx,v.x,v.y,v.z);
  }
 }
 geo.computeVertexNormals();
 const mesh=new THREE.Mesh(geo,mat(color,0.88));
 mesh.castShadow=true;mesh.receiveShadow=true;
 parent.add(mesh);
 const tip=points[points.length-1];
 const cap=new THREE.Mesh(sphereGeo,mat(color,0.88));
 cap.scale.setScalar(rEnd*0.96);
 cap.position.set(...tip);
 parent.add(cap);
 return mesh;
}
function addFoliageCluster(parent,center,radius,palette,random,count=18,flatness=0.72){
 const [cx,cy,cz]=center;
 for(let i=0;i<count;i++){
  const a=random()*Math.PI*2,el=(random()-0.35)*Math.PI*0.7;
  const d=radius*(0.15+0.78*Math.pow(random(),0.6));
  const px=cx+Math.cos(a)*Math.cos(el)*d;
  const py=cy+Math.sin(el)*d*flatness+radius*0.12;
  const pz=cz+Math.sin(a)*Math.cos(el)*d;
  const r=radius*(0.30+random()*0.26);
  const col=palette[i%palette.length];
  const puff=new THREE.Mesh(sphereGeo,mat(col,0.82));
  puff.position.set(px,py,pz);
  puff.scale.set(r*(0.95+random()*0.28),r*(flatness+random()*0.16),r*(0.92+random()*0.28));
  puff.rotation.set((random()-0.5)*0.5,random()*Math.PI,(random()-0.5)*0.5);
  puff.castShadow=(i%2===0);
  puff.receiveShadow=false;
  parent.add(puff);
 }
}
function addLizard(parent,pos,rotY=0,scale=1){
 const g=new THREE.Group();g.position.set(...pos);g.rotation.y=rotY;g.scale.setScalar(scale);
 const bodyMat=mat('#5e7c3c',0.65),stripeMat=mat('#b8c96a',0.7),eyeMat=mat('#1b2116',0.3);
 const torso=new THREE.Mesh(new THREE.CapsuleGeometry(0.022,0.09,6,10),bodyMat);torso.rotation.x=Math.PI/2;torso.scale.set(1,1,0.62);torso.position.y=0.016;g.add(torso);
 const stripe=new THREE.Mesh(new THREE.CapsuleGeometry(0.008,0.085,4,8),stripeMat);stripe.rotation.x=Math.PI/2;stripe.position.set(0,0.026,0);g.add(stripe);
 const head=new THREE.Mesh(new THREE.ConeGeometry(0.02,0.045,8),bodyMat);head.rotation.x=Math.PI/2;head.scale.set(1,1,0.65);head.position.set(0,0.02,0.068);g.add(head);
 for(const sx of [-1,1]){
  const eye=new THREE.Mesh(sphereGeo,eyeMat);eye.scale.setScalar(0.0045);eye.position.set(sx*0.012,0.026,0.062);g.add(eye);
  for(const [lz,la] of [[0.03,0.55],[-0.03,-0.55]]){
   rod(g,[sx*0.015,0.014,lz],[sx*0.042,0.003,lz+la*0.02],0.004,'#4d6830');
  }
 }
 curve(g,[[0,0.015,-0.045],[0.012,0.01,-0.11],[-0.015,0.006,-0.19],[0.008,0.004,-0.26]],0.0055,'#4d6830');
 parent.add(g);return g;
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
 boughs.forEach((pts)=>{
  taperedBranch(g,pts,0.28,0.068,bark,18,8);
  const mid=pts[2],tip=pts[pts.length-1];
  taperedBranch(g,[mid,[mid[0]*1.12,mid[1]+0.65,mid[2]*1.12],[tip[0]*0.92,tip[1]+0.95,tip[2]*0.92]],0.13,0.038,bark,10,6);
  addFoliageCluster(g,[tip[0],tip[1]+0.42,tip[2]],1.35,palette,random,22,0.68);
  addFoliageCluster(g,[mid[0]*1.1,mid[1]+1.05,mid[2]*1.1],1.25,palette,random,18,0.68);
 });
 addFoliageCluster(g,[0,4.15,0],1.85,palette,random,32,0.65);
 addStoneRing(world,x,z,1.55,26,false);
 addLizard(g,[0.48,0.28,0.25],0.4,1.15);
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
 const dotGroup=new THREE.Group();dotGroup.position.set(0.95,2.40,0.32);g.add(dotGroup);
 rod(dotGroup,[0,0,0],[0,-1.32,0],0.004,'#9e9a8e');
 const dotCols=['#d93829','#2b6cc4','#e5b822','#38984c','#d95b26'];
 for(let c=0;c<3;c++){
  const cy=-0.26-c*0.42;
  const cyl=new THREE.Mesh(cylinderGeo,mat('#f2efe6',0.75));
  cyl.scale.set(0.115,0.28,0.115);cyl.position.set(0,cy,0);cyl.castShadow=true;dotGroup.add(cyl);
  for(let d=0;d<10;d++){
   const da=d*0.628+c*0.5,dy=cy+(d%3-1)*0.075;
   const dot=new THREE.Mesh(sphereGeo,mat(dotCols[(d+c)%dotCols.length],0.5));
   dot.scale.set(0.018,0.018,0.01);
   dot.position.set(Math.cos(da)*0.116,dy,Math.sin(da)*0.116);
   dotGroup.add(dot);
  }
 }
 const mov22Anchor=new THREE.Group();
 mov22Anchor.position.set(x-1.05,gy+2.24,z+0.85);
 world.scene.add(mov22Anchor);
 const mov22Pivot=new THREE.Group();mov22Anchor.add(mov22Pivot);
 rod(mov22Pivot,[0,0,0],[0,-0.28,0],0.004,'#454842');
 const archGroup=new THREE.Group();archGroup.position.set(0,-0.58,0);mov22Pivot.add(archGroup);
 curve(archGroup,[[-0.12,0.32,0],[-0.28,0.15,0.04],[-0.26,-0.12,-0.03],[-0.06,-0.30,0.02],[0.20,-0.22,0],[0.30,0.02,-0.04],[0.16,0.22,0.03]],0.022,'#242629');
 const ringPositions=[
  [-0.10,0.26,0,0.2,0.3],
  [-0.24,0.10,0.03,0.4,-0.2],
  [-0.22,-0.14,-0.02,-0.3,0.4],
  [-0.04,-0.26,0.02,0.2,-0.3],
  [0.18,-0.18,0,-0.4,0.2],
  [0.26,0.04,-0.03,0.3,0.3],
  [0.14,0.20,0.02,-0.2,-0.4]
 ];
 const accentCols=['#e83865','#3888e2','#f2c824','#42b558','#f27429','#e8e4dc'];
 ringPositions.forEach(([bx,by,bz,rx,rz],idx)=>{
  const basket=new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.085,0.14,14,1,true),new THREE.MeshStandardMaterial({color:'#1f2124',roughness:0.82,side:THREE.DoubleSide}));
  basket.position.set(bx,by,bz);basket.rotation.set(rx,idx*0.7,rz);basket.castShadow=true;archGroup.add(basket);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(0.11,0.012,8,18),mat('#2c2f33',0.75));
  rim.position.set(bx,by+0.06,bz);rim.rotation.set(Math.PI/2+rx,idx*0.7,rz);archGroup.add(rim);
  for(let k=0;k<4;k++){
   const ka=k*1.57+idx;
   const pom=new THREE.Mesh(sphereGeo,mat(accentCols[(idx+k)%accentCols.length],0.55));
   pom.scale.setScalar(0.024);
   pom.position.set(bx+Math.cos(ka)*0.115,by+(k%2-0.5)*0.06,bz+Math.sin(ka)*0.115);
   archGroup.add(pom);
  }
 });
 registerCustomGardenWork(world,'mov022',mov22Anchor,mov22Pivot,V(x-1.05,gy+1.66,z+0.85),2.2);
 softShadow(world.scene,x,z,4.8,0.26,gy);
 return g;
}
function addAlmendroV(world,x,z){
 const gy=parcelaHeightAt(x,z),g=new THREE.Group();
 g.position.set(x,gy,z);world.scene.add(g);
 world.colliders.push({x,z,r:0.65});
 const bark='#5e5246';
 taperedBranch(g,[[0,-0.06,0],[0.03,0.38,0.02],[-0.01,0.82,0]],0.18,0.145,bark,12,8);
 taperedBranch(g,[[-0.01,0.75,0],[-0.26,1.16,0.05],[-0.56,1.58,0.10],[-0.76,1.92,0.14]],0.125,0.038,bark,14,7);
 taperedBranch(g,[[-0.36,1.28,0.06],[-0.24,1.62,-0.12],[-0.18,1.88,-0.20]],0.065,0.022,bark,8,6);
 taperedBranch(g,[[-0.56,1.58,0.10],[-0.72,1.76,-0.12]],0.048,0.018,bark,6,5);
 taperedBranch(g,[[-0.01,0.78,0],[0.18,1.28,-0.03],[0.38,1.82,-0.05],[0.54,2.36,-0.08]],0.13,0.036,bark,16,7);
 taperedBranch(g,[[0.28,1.54,-0.04],[0.58,1.86,0.12],[0.84,2.14,0.22]],0.072,0.024,bark,10,6);
 taperedBranch(g,[[0.38,1.82,-0.05],[0.16,2.18,0.10],[0.08,2.42,0.16]],0.058,0.020,bark,8,6);
 const random=rng(77);
 const stoneCols=['#d8d2c5','#c4bdb0','#e6e1d6','#b5ada0'];
 for(let i=0;i<38;i++){
  const a=random()*Math.PI*2,rad=0.14+random()*0.58;
  const hLayer=Math.max(0,(0.68-rad)*0.45)+random()*0.07;
  const st=new THREE.Mesh(pebbleGeo,mat(stoneCols[i%4],0.88));
  const s=0.10+random()*0.075;
  st.scale.set(s*1.28,s*0.82,s*1.08);
  st.position.set(Math.cos(a)*rad,hLayer,Math.sin(a)*rad);
  st.rotation.set(random(),random(),random());
  st.castShadow=true;st.receiveShadow=true;
  g.add(st);
 }
 const mov17Anchor=new THREE.Group();mov17Anchor.position.set(x,gy,z);world.scene.add(mov17Anchor);
 const mov17Pivot=new THREE.Group();mov17Anchor.add(mov17Pivot);
 const strips=[
  {pos:[-0.64,1.76,0.12],len:0.46,col:'#f2c818'},
  {pos:[-0.44,1.48,0.08],len:0.44,col:'#e85288'},
  {pos:[-0.22,1.76,-0.16],len:0.42,col:'#4cb866'},
  {pos:[0.14,2.24,0.12],len:0.48,col:'#3288d8'},
  {pos:[0.46,2.08,-0.06],len:0.46,col:'#f2c818'},
  {pos:[0.74,2.02,0.18],len:0.44,col:'#e85288'}
 ];
 for(const s of strips){
  rod(mov17Pivot,s.pos,[s.pos[0],s.pos[1]-0.10,s.pos[2]],0.0025,'#c8c4b8');
  const sg=new THREE.Group();
  sg.position.set(s.pos[0],s.pos[1]-0.10-s.len/2,s.pos[2]);
  const sMat=mat(s.col,0.48);
  const p1=new THREE.Mesh(boxGeo,sMat);p1.scale.set(0.052,s.len,0.006);p1.castShadow=true;sg.add(p1);
  const p2=new THREE.Mesh(boxGeo,sMat);p2.scale.set(0.006,s.len,0.042);p2.castShadow=true;sg.add(p2);
  for(let h=-3;h<=3;h++){
   const hole=new THREE.Mesh(cylinderGeo,mat('#28241e',0.9));
   hole.scale.set(0.013,0.010,0.013);
   hole.rotation.x=Math.PI/2;
   hole.position.set(0,h*(s.len/8),0);
   sg.add(hole);
  }
  mov17Pivot.add(sg);
 }
 addLizard(g,[0.38,0.14,0.28],-0.8,1.0);
 softShadow(world.scene,x,z,3.2,0.24,gy);
 registerCustomGardenWork(world,'mov017',mov17Anchor,mov17Pivot,V(x+0.05,gy+1.65,z),2.3);
 return g;
}
function addBlueBottleTree(world,x,z){
 const gy=parcelaHeightAt(x,z),g=new THREE.Group();
 g.position.set(x,gy,z);world.scene.add(g);
 world.colliders.push({x,z,r:0.75});
 const random=rng(604);
 const bark='#786c5c';
 taperedBranch(g,[[0,-0.06,0],[0.02,0.24,0],[0,0.48,0]],0.20,0.16,bark,8,8);
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
  taperedBranch(g,pts,0.088,0.022,bark,12,7);
  for(let k=1;k<pts.length;k++)bottlePoints.push(pts[k]);
  const tip=pts[pts.length-1];
  for(let s=0;s<3;s++){
   const leaf=new THREE.Mesh(sphereGeo,mat(sprigCols[s%3],0.82));
   leaf.scale.set(0.08,0.035,0.04);
   leaf.position.set(tip[0]+(random()-0.5)*0.12,tip[1]+0.04+(random()-0.5)*0.08,tip[2]+(random()-0.5)*0.12);
   leaf.rotation.set(random(),random(),random());
   g.add(leaf);
  }
 }
 addStoneRing(world,x,z,0.94,18,false);
 const mov33Anchor=new THREE.Group();mov33Anchor.position.set(x,gy,z);world.scene.add(mov33Anchor);
 const mov33Pivot=new THREE.Group();mov33Anchor.add(mov33Pivot);
 const bottleMat=new THREE.MeshStandardMaterial({color:'#1862c4',roughness:0.15,metalness:0.12,transparent:true,opacity:0.88});
 const neckMat=new THREE.MeshStandardMaterial({color:'#e4ecf5',roughness:0.28,metalness:0.45});
 for(let i=0;i<20;i++){
  const bp=bottlePoints[i%bottlePoints.length];
  const ox=bp[0]+(random()-0.5)*0.22,oz=bp[2]+(random()-0.5)*0.22,topY=bp[1];
  const drop=0.16+(i%3)*0.15;
  rod(mov33Pivot,[ox,topY,oz],[ox,topY-drop,oz],0.0025,'#8e9688');
  const bg=new THREE.Group();bg.position.set(ox,topY-drop-0.12,oz);
  const body=new THREE.Mesh(cylinderGeo,bottleMat);body.scale.set(0.038,0.21,0.038);body.castShadow=true;bg.add(body);
  const shoulder=new THREE.Mesh(sphereGeo,bottleMat);shoulder.scale.set(0.038,0.028,0.038);shoulder.position.y=0.105;bg.add(shoulder);
  const neck=new THREE.Mesh(cylinderGeo,bottleMat);neck.scale.set(0.015,0.065,0.015);neck.position.y=0.135;bg.add(neck);
  const cap=new THREE.Mesh(cylinderGeo,neckMat);cap.scale.set(0.017,0.020,0.017);cap.position.y=0.170;bg.add(cap);
  mov33Pivot.add(bg);
 }
 const wx=x-1.55,wz=z-0.25,wy=parcelaHeightAt(wx,wz);
 const well=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.42,0.34,20,1,true),new THREE.MeshStandardMaterial({color:'#c8bfa8',roughness:0.9,side:THREE.DoubleSide}));
 well.position.set(wx,wy+0.17,wz);well.castShadow=true;well.receiveShadow=true;world.scene.add(well);
 softShadow(world.scene,x,z,3.2,0.22,gy);
 registerCustomGardenWork(world,'mov033',mov33Anchor,mov33Pivot,V(x,gy+1.25,z),2.4);
 return g;
}
function addGeometricFoamTree(world,x,z){
 const gy=parcelaHeightAt(x,z),g=new THREE.Group();
 g.position.set(x,gy,z);world.scene.add(g);
 world.colliders.push({x,z,r:0.65});
 const bark='#5e5042';
 taperedBranch(g,[[0,-0.05,0],[0.03,0.48,0.02],[-0.01,0.96,0]],0.15,0.11,bark,10,8);
 const arms=[
  [[-0.01,0.88,0],[-0.46,1.18,0.20],[-0.98,1.52,0.36]],
  [[-0.01,0.92,0],[-0.38,1.32,-0.26],[-0.84,1.68,-0.48]],
  [[-0.01,0.94,0],[0.44,1.26,0.24],[0.94,1.58,0.42]],
  [[-0.01,0.96,0],[0.40,1.34,-0.24],[0.88,1.72,-0.44]],
  [[-0.01,0.96,0],[-0.14,1.46,0.06],[-0.28,1.86,0.10]],
  [[-0.46,1.18,0.20],[-0.72,1.56,-0.05]],
  [[0.44,1.26,0.24],[0.68,1.62,-0.04]]
 ];
 arms.forEach(pts=>taperedBranch(g,pts,0.08,0.024,bark,10,6));
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
 const foamCols=['#e83845','#2c82c9','#f2c518','#38a852','#9b4dca','#f27824'];
 const hangPts=[
  [-0.86,1.46,0.32],[-0.52,1.24,0.20],[-0.74,1.60,-0.42],[-0.38,1.32,-0.26],
  [0.84,1.52,0.38],[0.48,1.28,0.22],[0.78,1.64,-0.40],[0.42,1.36,-0.22],
  [-0.24,1.76,0.08],[0.02,1.46,0.02],[-0.66,1.50,-0.04],[0.62,1.56,-0.04]
 ];
 hangPts.forEach((hp,i)=>{
  const drop=0.18+(i%3)*0.13;
  rod(mov32Pivot,hp,[hp[0],hp[1]-drop,hp[2]],0.0025,'#9e9a8e');
  const fg=new THREE.Group();fg.position.set(hp[0],hp[1]-drop-0.08,hp[2]);
  fg.rotation.y=i*0.55;
  const frame=new THREE.Mesh(boxGeo,mat(foamCols[i%foamCols.length],0.6));
  frame.scale.set(0.145,0.145,0.016);
  frame.rotation.z=(i%2)*Math.PI/4;
  frame.castShadow=true;fg.add(frame);
  const inner=new THREE.Mesh(boxGeo,mat(foamCols[(i+2)%foamCols.length],0.6));
  inner.scale.set(0.068,0.068,0.020);
  inner.rotation.z=(i%2)*Math.PI/4;
  fg.add(inner);
  mov32Pivot.add(fg);
 });
 softShadow(world.scene,x,z,2.8,0.22,gy);
 registerCustomGardenWork(world,'mov032',mov32Anchor,mov32Pivot,V(x,gy+1.28,z),2.2);
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
   for(let r=0;r<18;r++){
    const ra=random()*Math.PI*2,rr=random()*0.11;
    const rx=bx+Math.cos(ra)*rr,rz=bz+Math.sin(ra)*rr;
    const tiltX=(random()-0.5)*0.32,tiltZ=(random()-0.5)*0.32,rh=1.15+random()*0.52;
    rod(g,[rx,localY+bh,rz],[rx+tiltX,localY+bh+rh,rz+tiltZ],0.006,r%3===0?'#b8251e':'#d93829');
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
 canPts.forEach(([cx,cy,cz,cc])=>{
  rod(wt,[cx,cy,cz],[cx,cy-0.22,cz],0.002,'#888');
  const can=new THREE.Mesh(cylinderGeo,mat(cc,0.45));
  can.scale.set(0.036,0.12,0.036);can.position.set(cx,cy-0.28,cz);can.castShadow=true;wt.add(can);
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
 const glassMat=new THREE.MeshStandardMaterial({color:'#d8e8ea',roughness:0.15,metalness:0.25,transparent:true,opacity:0.48});
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
 }
 const roofGroup=new THREE.Group();roofGroup.position.set(-0.45,0.22+H+0.08,0);roofGroup.rotation.z=0.06;
 box(roofGroup,[W+1.4,0.16,L+0.8],[0.45,0,0],'#69462b');
 box(roofGroup,[W+1.5,0.08,L+0.9],[0.45,0.11,0],'#8c583a');
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
 box(root,[0.52,0.07,2.1],[-W/2-0.55,0.62,2.2],'#9c6b42');
 box(root,[0.08,0.42,0.44],[-W/2-0.55,0.38,1.35],'#593a22');
 box(root,[0.08,0.42,0.44],[-W/2-0.55,0.38,3.05],'#593a22');
 for(const pz of [-2.95,0.75,4.8]){
  const pot=new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.20,0.38,12),mat('#b86842',0.82));
  pot.position.set(-W/2-0.48,0.35,pz);pot.castShadow=true;root.add(pot);
  const bush=new THREE.Mesh(sphereGeo,mat('#4e6e42',0.88));
  bush.position.set(-W/2-0.48,0.65,pz);bush.scale.set(0.32,0.27,0.32);bush.castShadow=true;root.add(bush);
 }
 const signMesh=sign(root,'EL JARDÍN DE LAS LAGARTIJAS','CASETA-TALLER DE MADERA · ENRIC SEGARRA',[-W/2-2.28,2.92,-1.1],3.4,true);
 signMesh.rotation.y=-Math.PI/2;
 addLizard(root,[-W/2-1.85,0.165,-3.6],0.45,1.15);
 addLizard(root,[-W/2-1.45,0.165,4.1],-1.2,1.05);
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
  const water=new THREE.Mesh(new THREE.BoxGeometry(0.52,0.04,len+0.04),new THREE.MeshStandardMaterial({color:'#4ea3a8',roughness:0.18,metalness:0.25,transparent:true,opacity:0.82}));
  water.position.set(0,0.36,0);seg.add(water);
  scene.add(seg);
 }
 for(let x=-14.5;x<=15.0;x+=0.95){
  if(Math.abs(x+3.2)<1.1||Math.abs(x-5.2)<1.15)continue;
  const bz=3.6-0.04*x,by=parcelaHeightAt(x,bz-0.45);
  const wSeg=new THREE.Group();wSeg.position.set(x,by,bz);wSeg.rotation.y=0.04;
  box(wSeg,[0.98,0.42,0.44],[0,0.21,0],'#c4b89e');
  box(wSeg,[1.02,0.08,0.50],[0,0.44,0],'#d8cfb8');
  if(x>=-11.5&&x<=14.5){
   box(wSeg,[0.98,0.18,0.12],[0,0.09,-0.52],'#cbc0a8');
   const gw=new THREE.Mesh(new THREE.BoxGeometry(0.98,0.04,0.26),new THREE.MeshStandardMaterial({color:'#4ba6a3',roughness:0.15,metalness:0.2,transparent:true,opacity:0.84}));
   gw.position.set(0,0.14,-0.36);wSeg.add(gw);
  }
  scene.add(wSeg);
 }
 for(const sx of [-3.2,5.2]){
  const sz=3.6-0.04*sx,sy=parcelaHeightAt(sx,sz-0.5);
  for(let s=0;s<3;s++)box(scene,[1.95,0.13,0.42],[sx,sy+0.065+s*0.12,sz-0.35+s*0.38],'#d6ccb4');
 }
 const aby=parcelaHeightAt(14.8,3.1),alberca=new THREE.Group();
 alberca.position.set(14.8,aby,3.1);scene.add(alberca);
 box(alberca,[1.65,0.42,1.35],[0,0.21,0],'#c8bda4');
 const poolW=new THREE.Mesh(new THREE.BoxGeometry(1.35,0.06,1.05),new THREE.MeshStandardMaterial({color:'#3f989e',roughness:0.12,metalness:0.3}));
 poolW.position.set(0,0.39,0);alberca.add(poolW);
 addLizard(alberca,[0.68,0.43,0.45],-2.2,1.15);
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
 const sunHaloMat=new THREE.MeshBasicMaterial({color:'#ffe49e',transparent:true,opacity:0.32,side:THREE.DoubleSide,depthWrite:false,fog:false});
 const sunHalo=new THREE.Mesh(new THREE.RingGeometry(3.8,9.5,32),sunHaloMat);
 sunHalo.position.copy(sunDisc.position);sunHalo.lookAt(0,0,0);
 celestialPivot.add(sunHalo);
 const moonMat=new THREE.MeshBasicMaterial({color:'#f4f6ff',fog:false});
 const moonDisc=new THREE.Mesh(new THREE.SphereGeometry(3.0,20,16),moonMat);
 moonDisc.position.set(38,54,-32);
 celestialPivot.add(moonDisc);
 const moonHaloMat=new THREE.MeshBasicMaterial({color:'#9bb8ff',transparent:true,opacity:0.0,side:THREE.DoubleSide,depthWrite:false,fog:false});
 const moonHalo=new THREE.Mesh(new THREE.RingGeometry(3.0,8.2,32),moonHaloMat);
 moonHalo.position.copy(moonDisc.position);moonHalo.lookAt(0,0,0);
 celestialPivot.add(moonHalo);
 // 3. Starfield (280 twinkling stars in the upper hemisphere for Night mode)
 const starCount=280,starGeo=new THREE.BufferGeometry(),starPos=new Float32Array(starCount*3);
 const rand=rng(777);
 for(let i=0;i<starCount;i++){
  const theta=rand()*Math.PI*2,phi=0.12+rand()*Math.PI*0.38,r=98;
  starPos[i*3]=Math.cos(theta)*Math.cos(phi)*r;
  starPos[i*3+1]=Math.sin(phi)*r;
  starPos[i*3+2]=Math.sin(theta)*Math.cos(phi)*r;
 }
 starGeo.setAttribute('position',new THREE.BufferAttribute(starPos,3));
 const starMat=new THREE.PointsMaterial({color:'#ffffff',size:0.55,transparent:true,opacity:0.0,fog:false,depthWrite:false});
 const stars=new THREE.Points(starGeo,starMat);
 scene.add(stars);
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
 if(world.hemi){
  world.hemi.intensity=2.15*(1-b*0.60);
  world.hemi.color.copy(_cHor);
  world.hemi.groundColor.set(b>0.6?'#2b3654':b>0.25?'#7a5842':'#a38f5b');
 }
 if(world.sun){
  world.sun.intensity=b<0.5?(3.15-b*2.3):(0.85+(b-0.5)*0.35);
  world.sun.color.set(b>0.65?'#8ab4f8':b>0.25?'#ff9852':'#fff1ce');
  world.sun.position.set(b>0.65?22:-16,b>0.65?26:Math.max(6,24*(1-b*0.8)),b>0.65?-18:12);
 }
 if(world.nightLights){
  const nl=world.nightLights;
  const lampOn=Math.max(0,Math.min(1,(b-0.20)/0.42));
  nl.bulbMat.color.set('#7a7264').lerp(new THREE.Color('#ffe299'),lampOn);
  nl.glowMat.opacity=lampOn*0.88;
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
  for(let k=1;k<=7;k++){
   const pt=cObj.getPointAt(k/8);
   const bulb=new THREE.Mesh(sphereGeo,bulbMat);
   bulb.scale.set(0.042,0.058,0.042);
   bulb.position.set(pt.x,pt.y-0.05,pt.z);
   scene.add(bulb);
   bulbs.push(bulb);
  }
 }
 // 2. Stone & Wood Solar Garden Bollards / Lanterns along paths, entrances & hero trees
 const lanternSpots=[
  [13.5,-13.5],[10.8,-8.2],[3.2,-5.0],[-1.8,-3.8],
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
  scene.add(lg);
  const pool=new THREE.Mesh(new THREE.PlaneGeometry(3.8,3.8),glowMat);
  pool.rotation.x=-Math.PI/2;pool.position.set(lx,ly+0.032,lz);
  scene.add(pool);glowPools.push(pool);
 }
 // 3. Real Three.js PointLights for warm golden night illumination of the Caseta, Algarrobo & Artworks
 const lightConfigs=[
  {pos:[20.2,parcelaHeightAt(20.2,0.5)+2.2,0.5],col:'#ffaa44',maxInt:5.8,dist:17},    // Caseta Studio & Porch
  {pos:[17.8,parcelaHeightAt(17.8,-0.5)+2.5,-0.5],col:'#ffb85c',maxInt:4.8,dist:15},  // Caseta Pergola (MOV-025)
  {pos:[-6.1,parcelaHeightAt(-6.1,-1.2)+2.2,-1.2],col:'#ffb454',maxInt:5.8,dist:16},  // Gran Algarrobo (MOV-016, 019, 018)
  {pos:[-2.4,parcelaHeightAt(-2.4,2.5)+2.0,2.5],col:'#ffae52',maxInt:4.5,dist:14},    // Blue Bottle Tree & Red Reeds
  {pos:[0.5,parcelaHeightAt(0.5,-4.6)+2.1,-4.6],col:'#ffb458',maxInt:4.4,dist:14},    // Almendro en V & Foam Tree
  {pos:[9.2,parcelaHeightAt(9.2,4.8)+2.2,4.8],col:'#ffae52',maxInt:4.2,dist:14},      // East Bancal Olive (MOV-023)
  {pos:[9.8,parcelaHeightAt(9.8,-8.5)+2.2,-8.5],col:'#ffb458',maxInt:4.4,dist:14},    // East Entrance Almendro (MOV-028)
  {pos:[-11.2,parcelaHeightAt(-11.2,-2.0)+2.2,-2.0],col:'#ffb454',maxInt:4.4,dist:14} // Tall Pine (MOV-022) & West Path
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
 // Species palettes: European Robin (petirrojo), Blue Tit (herrerillo), Golden Oriole (oropéndola), Hoopoe (abubilla)
 const palettes=[
  {body:'#6e5844',breast:'#d95b26',wing:'#4e3e30',crest:'#6e5844'},
  {body:'#3a6ea5',breast:'#f2c830',wing:'#2b527d',crest:'#244870'},
  {body:'#e8b824',breast:'#f2ca28',wing:'#242622',crest:'#e8b824'},
  {body:'#c87a48',breast:'#d88c5a',wing:'#262422',crest:'#d97838'}
 ];
 const buildBirdMesh=(pal)=>{
  const root=new THREE.Group();
  const body=new THREE.Mesh(sphereGeo,mat(pal.body,0.75));
  body.scale.set(0.055,0.048,0.095);body.castShadow=true;root.add(body);
  const breast=new THREE.Mesh(sphereGeo,mat(pal.breast,0.75));
  breast.scale.set(0.048,0.042,0.065);breast.position.set(0,-0.008,0.032);root.add(breast);
  const head=new THREE.Mesh(sphereGeo,mat(pal.body,0.75));
  head.scale.set(0.042,0.042,0.044);head.position.set(0,0.036,0.072);root.add(head);
  const crest=new THREE.Mesh(new THREE.ConeGeometry(0.015,0.04,5),mat(pal.crest,0.75));
  crest.position.set(0,0.068,0.062);crest.rotation.x=-0.5;root.add(crest);
  const beak=new THREE.Mesh(new THREE.ConeGeometry(0.012,0.042,6),mat('#e5a928',0.5));
  beak.rotation.x=Math.PI/2;beak.position.set(0,0.034,0.118);root.add(beak);
  const tail=new THREE.Mesh(boxGeo,mat(pal.wing,0.8));
  tail.scale.set(0.045,0.008,0.085);tail.position.set(0,0.008,-0.11);tail.rotation.x=0.18;root.add(tail);
  const wingL=new THREE.Group();wingL.position.set(0.042,0.012,0.01);
  const wMeshL=new THREE.Mesh(boxGeo,mat(pal.wing,0.78));
  wMeshL.scale.set(0.13,0.008,0.075);wMeshL.position.set(0.065,0,-0.01);wMeshL.castShadow=true;wingL.add(wMeshL);
  const wingR=new THREE.Group();wingR.position.set(-0.042,0.012,0.01);
  const wMeshR=new THREE.Mesh(boxGeo,mat(pal.wing,0.78));
  wMeshR.scale.set(0.13,0.008,0.075);wMeshR.position.set(-0.065,0,-0.01);wMeshR.castShadow=true;wingR.add(wMeshR);
  root.add(wingL,wingR);
  return {root,wingL,wingR,head};
 };
 // 6 Soaring birds flying across the garden sky
 const flightCenters=[
  [-4.0,7.2,-1.0,9.5,5.5,0.52,0],
  [8.0,6.8,-4.0,11.0,6.2,0.46,1.8],
  [-12.0,7.6,2.0,8.5,5.0,0.58,3.2],
  [2.0,6.4,4.5,10.2,6.8,0.48,4.5],
  [14.0,7.0,1.0,7.5,5.2,0.54,2.4],
  [-2.0,8.2,-6.0,12.0,7.0,0.42,5.1]
 ];
 flightCenters.forEach(([cx,cy,cz,rx,rz,spd,ph],i)=>{
  const b=buildBirdMesh(palettes[i%palettes.length]);
  b.root.scale.setScalar(1.35);
  scene.add(b.root);
  birds.push({kind:'fly',mesh:b,cx,cy,cz,rx,rz,speed:spd,phase:ph});
 });
 // 5 Perched birds on tree branches & the stone well-ring (brocal)
 const perchSpots=[
  [-4.65,parcelaHeightAt(-4.65,-1.35)+2.12,-1.35,0.6],   // Gran Algarrobo East bough
  [-7.40,parcelaHeightAt(-7.40,-1.60)+2.08,-1.60,-0.8],  // Gran Algarrobo West bough
  [2.58,parcelaHeightAt(2.2,-5.2)+1.84,-5.25,-0.5],      // Almendro en V branch
  [-2.75,parcelaHeightAt(-2.75,2.15)+0.36,2.15,1.2],     // Rim of the stone well-ring (brocal)
  [-0.56,parcelaHeightAt(-1.2,2.4)+1.44,3.02,-1.4]       // Blue Bottle Tree branch
 ];
 perchSpots.forEach(([px,py,pz,rotY],i)=>{
  const b=buildBirdMesh(palettes[(i+1)%palettes.length]);
  b.root.scale.setScalar(1.25);
  b.root.position.set(px,py,pz);
  b.root.rotation.y=rotY;
  b.wingL.rotation.z=-1.15;b.wingR.rotation.z=1.15;
  scene.add(b.root);
  birds.push({kind:'perch',mesh:b,basePos:[px,py,pz],baseRotY:rotY,phase:i*1.7});
 });
 world.birds=birds;
}
function addGardenSquirrels(world){
 const scene=world.scene;
 const squirrels=[];
 const furMat=mat('#a84820',0.82),bellyMat=mat('#ede2cf',0.85),darkMat=mat('#1f1b18',0.4);
 const buildSquirrelMesh=()=>{
  const root=new THREE.Group();
  const body=new THREE.Group();root.add(body);
  const torso=new THREE.Mesh(new THREE.CapsuleGeometry(0.045,0.11,6,10),furMat);
  torso.rotation.x=Math.PI/2;torso.position.set(0,0.065,0);torso.castShadow=true;body.add(torso);
  const belly=new THREE.Mesh(new THREE.CapsuleGeometry(0.034,0.09,4,8),bellyMat);
  belly.rotation.x=Math.PI/2;belly.position.set(0,0.052,0.005);body.add(belly);
  const head=new THREE.Mesh(sphereGeo,furMat);
  head.scale.set(0.042,0.040,0.048);head.position.set(0,0.095,0.088);head.castShadow=true;body.add(head);
  for(const sx of [-1,1]){
   const ear=new THREE.Mesh(new THREE.ConeGeometry(0.012,0.036,5),furMat);
   ear.position.set(sx*0.024,0.132,0.078);ear.rotation.x=-0.15;body.add(ear);
   const eye=new THREE.Mesh(sphereGeo,darkMat);
   eye.scale.setScalar(0.006);eye.position.set(sx*0.026,0.102,0.118);body.add(eye);
   const legF=new THREE.Mesh(new THREE.CapsuleGeometry(0.014,0.045,4,6),furMat);
   legF.position.set(sx*0.032,0.032,0.052);body.add(legF);
   const legB=new THREE.Mesh(new THREE.CapsuleGeometry(0.018,0.052,4,6),furMat);
   legB.position.set(sx*0.036,0.036,-0.048);body.add(legB);
  }
  // Big fluffy S-curved bushy squirrel tail!
  const tailPivot=new THREE.Group();tailPivot.position.set(0,0.068,-0.075);body.add(tailPivot);
  const tailCurve=new THREE.CatmullRomCurve3([
   V(0,0,0),V(0,0.065,-0.045),V(0,0.145,-0.025),V(0,0.195,-0.065)
  ]);
  const tailMesh=new THREE.Mesh(new THREE.TubeGeometry(tailCurve,12,0.036,8,false),furMat);
  tailMesh.castShadow=true;tailPivot.add(tailMesh);
  const tailTip=new THREE.Mesh(sphereGeo,furMat);
  tailTip.scale.set(0.038,0.042,0.038);tailTip.position.set(0,0.195,-0.065);tailPivot.add(tailTip);
  return {root,body,tailPivot};
 };
 // 6 Squirrels scampering along boughs, stone bancal wall & paths
 const routes=[
  // 1. Along the top of the Bancal Central dry-stone wall
  {pts:[[-2.2,parcelaHeightAt(-2.2,3.68)+0.46,3.68],[1.5,parcelaHeightAt(1.5,3.54)+0.46,3.54],[4.2,parcelaHeightAt(4.2,3.43)+0.46,3.43]],speed:0.42,phase:0.2},
  // 2. Along the West section of the Bancal Central wall
  {pts:[[-10.5,parcelaHeightAt(-10.5,4.02)+0.46,4.02],[-7.2,parcelaHeightAt(-7.2,3.88)+0.46,3.88],[-4.5,parcelaHeightAt(-4.5,3.78)+0.46,3.78]],speed:0.38,phase:1.9},
  // 3. Up and along the Gran Algarrobo low bough
  {pts:[[-6.2,parcelaHeightAt(-6.2,-2.0)+1.15,-2.0],[-6.95,parcelaHeightAt(-6.2,-2.0)+1.72,-1.82],[-7.65,parcelaHeightAt(-6.2,-2.0)+2.10,-1.65],[-8.55,parcelaHeightAt(-6.2,-2.0)+2.46,-1.48]],speed:0.35,phase:0.8},
  // 4. Along the Gran Algarrobo East bough
  {pts:[[-6.2,parcelaHeightAt(-6.2,-2.0)+1.15,-2.0],[-5.38,parcelaHeightAt(-6.2,-2.0)+1.72,-1.68],[-4.65,parcelaHeightAt(-6.2,-2.0)+2.10,-1.35],[-3.82,parcelaHeightAt(-6.2,-2.0)+2.48,-1.08]],speed:0.36,phase:3.4},
  // 5. Around the ground & porch steps near the Wooden Caseta
  {pts:[[15.8,parcelaHeightAt(15.8,-2.8),-2.8],[14.8,parcelaHeightAt(14.8,-0.5),-0.5],[15.5,parcelaHeightAt(15.5,2.2),2.2]],speed:0.44,phase:2.5},
  // 6. Between the Companion Pine & Algarrobo stone ring
  {pts:[[-10.0,parcelaHeightAt(-10.0,-2.2),-2.2],[-8.2,parcelaHeightAt(-8.2,-1.6),-1.6],[-6.8,parcelaHeightAt(-6.8,-0.6),-0.6]],speed:0.40,phase:4.7}
 ];
 routes.forEach(r=>{
  const sq=buildSquirrelMesh();
  sq.root.scale.setScalar(1.32);
  scene.add(sq.root);
  const curveObj=new THREE.CatmullRomCurve3(r.pts.map(p=>V(...p)));
  squirrels.push({sq,curve:curveObj,speed:r.speed,phase:r.phase});
 });
 world.squirrels=squirrels;
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
  const bg=isNight?'#18202c':isSun?'#dfd0c4':dayBg;
  if(world.scene.background)world.scene.background.set(bg);
  if(world.scene.fog)world.scene.fog.color.set(bg);
  if(world.hemi)world.hemi.intensity=isNight?1.15:isSun?1.75:2.25;
  if(world.sun){
   world.sun.color.set(isNight?'#ffd9a8':isSun?'#ffb078':'#fff8e9');
   world.sun.intensity=isNight?1.65:isSun?2.25:2.85;
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
 const floor=new THREE.Mesh(floorGeo,new THREE.MeshStandardMaterial({map:floorTex,vertexColors:true,roughness:0.95}));
 floor.receiveShadow=true;floor.userData.isFloor=true;
 scene.add(floor);world.floor=floor;world.pickables.push(floor);
 addWalkRing(world);
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
 addRedReedInstallation(world,-5.2,2.8);
 const mov28Anchor=[9.5,parcelaHeightAt(9.5,-8.5)+2.04,-8.5];
 const mov26Anchor=[12.3,parcelaHeightAt(12.3,-3.5)+2.06,-3.5];
 const mov23Anchor=[8.0,parcelaHeightAt(8.0,4.9)+2.04,4.9];
 addMediterraneanTree(world,10.3,-8.9,4.5,21,'almond',true,mov28Anchor);
 addMediterraneanTree(world,6.8,-11.5,4.3,22,'almond',true);
 addMediterraneanTree(world,14.5,-11.5,4.4,23,'almond',true);
 addMediterraneanTree(world,13.3,-3.9,4.6,24,'olive',true,mov26Anchor);
 addMediterraneanTree(world,9.0,5.3,4.4,31,'olive',true,mov23Anchor);
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
  const sy=parcelaHeightAt(sx,sz);
  const sh=new THREE.Mesh(sphereGeo,mat(shrubCols[i%shrubCols.length],0.9));
  const r=0.22+rand()*0.30;
  sh.scale.set(r*1.3,r*0.62,r*(0.9+rand()*0.4));
  sh.position.set(sx,sy+r*0.24,sz);
  sh.castShadow=true;sh.receiveShadow=true;scene.add(sh);
 }
 const mov16=addHangingMobile3D(world,'mov016',[-7.65,parcelaHeightAt(-7.65,-1.65)+1.98,-1.65],parcelaHeightAt(-7.65,-1.65)+2.06,0.42,'branch');
 const mov19=addHangingMobile3D(world,'mov019',[-6.05,parcelaHeightAt(-6.05,-0.82)+2.02,-0.82],parcelaHeightAt(-6.05,-0.82)+2.10,0.42,'branch');
 const mov18=addHangingMobile3D(world,'mov018',[-4.65,parcelaHeightAt(-4.65,-1.35)+1.98,-1.35],parcelaHeightAt(-4.65,-1.35)+2.06,0.40,'branch');
 const mov25=addHangingMobile3D(world,'mov025',[18.0,parcelaHeightAt(18.0,0.2)+2.62,0.2],parcelaHeightAt(18.0,0.2)+3.05,0.42,'pergola');
 const mov26=addHangingMobile3D(world,'mov026',[mov26Anchor[0],mov26Anchor[1]-0.04,mov26Anchor[2]],mov26Anchor[1]+0.02,0.42,'branch');
 const mov28=addHangingMobile3D(world,'mov028',[mov28Anchor[0],mov28Anchor[1]-0.04,mov28Anchor[2]],mov28Anchor[1]+0.02,0.42,'branch');
 const mov23=addHangingMobile3D(world,'mov023',[mov23Anchor[0],mov23Anchor[1]-0.04,mov23Anchor[2]],mov23Anchor[1]+0.02,0.42,'branch');
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
  {title:'Entrada Este, Camino de la Acequia y Almendros (MOV-028)',x:11.6,z:-11.8,look:mov28?mov28.center.toArray():[9.5,1.6,-8.5],work:'mov028'},
  {title:'La Caseta-Taller de Madera y su Pérgola (MOV-025)',x:14.2,z:-1.2,look:mov25?mov25.center.toArray():[18.0,2.1,0.2],work:'mov025'},
  {title:'Los Almendros Escultóricos del Camino Norte (MOV-017 y MOV-032)',x:0.8,z:-2.2,look:[2.2,1.65,-5.2],work:'mov017'},
  {title:'Bajo la Copa del Gran Algarrobo (MOV-016, MOV-019 y MOV-018)',x:-5.8,z:1.2,look:mov19?mov19.center.toArray():[-6.05,1.6,-0.82],work:'mov019'},
  {title:'El Pino Alto (MOV-022), las Chumberas y la Entrada Oeste',x:-16.2,z:0.8,look:[-11.55,1.7,-1.75],work:'mov022'},
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
 parent.add(g);
 return g;
}
function buildTrue3DMobileGeometry(id){
 const g=new THREE.Group();
 const rand=rng(id.charCodeAt(3)*37+id.charCodeAt(4)*13+id.charCodeAt(5));
 if(id==='mov016'){
  // MOV-016: "Pieza entre las ramas" — Intersecting curved blue & terracotta tubes threading yellow, green & pink foam rings/cylinders/C-arches
  rod(g,[0,0,0],[0,-0.36,0],0.004,'#8a9084');
  const bluePts=[[0,-0.36,0],[-0.18,-0.52,0.08],[-0.38,-0.82,0.18],[-0.12,-1.18,0.06],[0.26,-1.42,-0.10],[0.58,-1.52,0.08],[0.48,-1.18,0.22],[0.15,-0.98,0.04]];
  const rustPts=[[-0.14,-0.52,0.06],[-0.18,-0.95,0.16],[-0.24,-1.48,0.14],[-0.28,-1.76,0.10]];
  const rustPts2=[[-0.12,-1.12,0.04],[0.18,-1.02,-0.12],[0.52,-1.08,-0.04],[0.62,-1.32,0.08]];
  curve(g,bluePts,0.024,'#2970d6');
  curve(g,rustPts,0.028,'#b84a24');
  curve(g,rustPts2,0.026,'#b84a24');
  const pieces=[
   {type:'cyl',pos:[-0.04,-0.40,0.02],rot:[0.3,0.2,0.5],r:0.12,h:0.11,col:'#3cb864'},
   {type:'cyl',pos:[-0.22,-0.62,0.12],rot:[0.4,0.1,-0.3],r:0.15,h:0.13,col:'#f5cc20'},
   {type:'cyl',pos:[-0.44,-0.84,0.18],rot:[0.2,0.5,0.8],r:0.11,h:0.08,col:'#e85278'},
   {type:'cyl',pos:[-0.36,-0.96,0.16],rot:[-0.3,0.2,0.6],r:0.11,h:0.10,col:'#46c470'},
   {type:'cyl',pos:[-0.12,-0.84,-0.04],rot:[0.5,-0.3,0.2],r:0.13,h:0.12,col:'#f5cc20'},
   {type:'cyl',pos:[-0.24,-1.46,0.14],rot:[0.15,0.2,0.1],r:0.15,h:0.22,col:'#46c470'},
   {type:'bar',pos:[-0.26,-1.72,0.10],rot:[0.2,0.1,-0.25],size:[0.22,0.28,0.07],col:'#f5cc20'},
   {type:'ring',pos:[-0.02,-1.28,0.04],rot:[0.4,0.8,-0.5],r:0.12,col:'#e85278'},
   {type:'ring',pos:[0.04,-1.33,0.06],rot:[0.4,0.8,-0.5],r:0.12,col:'#e85278'},
   {type:'arch',pos:[0.18,-0.98,-0.08],rot:[0.2,-0.4,0.8],r:0.16,col:'#f5cc20'},
   {type:'arch',pos:[0.44,-1.46,0.08],rot:[-0.3,0.5,-0.9],r:0.17,col:'#f5cc20'},
   {type:'cyl',pos:[0.48,-1.08,-0.02],rot:[0.6,0.3,-0.4],r:0.13,h:0.09,col:'#e85278'},
   {type:'cyl',pos:[0.38,-1.18,-0.12],rot:[0.3,-0.2,0.5],r:0.12,h:0.11,col:'#46c470'},
   {type:'cyl',pos:[0.62,-1.08,0.04],rot:[0.2,0.4,0.7],r:0.10,h:0.08,col:'#f5cc20'}
  ];
  for(const p of pieces){
   const m=mat(p.col,0.68);
   let mesh;
   if(p.type==='cyl'){
    mesh=new THREE.Mesh(cylinderGeo,m);mesh.scale.set(p.r,p.h,p.r);
   }else if(p.type==='bar'){
    mesh=new THREE.Mesh(boxGeo,m);mesh.scale.set(...p.size);
   }else if(p.type==='ring'){
    mesh=new THREE.Mesh(new THREE.TorusGeometry(p.r,0.036,12,24),m);
   }else{
    mesh=new THREE.Mesh(new THREE.TorusGeometry(p.r,0.048,12,20,Math.PI*1.25),m);
   }
   mesh.position.set(...p.pos);mesh.rotation.set(...p.rot);
   mesh.castShadow=true;mesh.receiveShadow=true;g.add(mesh);
  }
  return g;
 }
 if(id==='mov018'){
  // MOV-018: "Líneas de color al aire libre" — Orange figure-8 flexible tube piercing 11 colorful pool-noodle foam cylinders
  rod(g,[0,0,0],[0,-0.42,0],0.004,'#8a9084');
  const loop1=[
   [0,-0.42,0],[-0.18,-0.52,0.06],[-0.28,-0.88,0.10],[-0.18,-1.28,0.08],
   [-0.14,-1.72,0.06],[0.02,-1.96,0.02],[0.18,-1.68,-0.04],[0.22,-1.25,-0.06],
   [0.08,-0.78,-0.04],[-0.08,-0.62,0.02]
  ];
  const loop2=[
   [0,-0.42,0],[0.22,-0.56,-0.04],[0.38,-0.86,0.04],[0.30,-1.14,0.08],
   [0.06,-1.18,0.04],[-0.26,-1.16,-0.04]
  ];
  curve(g,loop1,0.022,'#df521e');
  curve(g,loop2,0.022,'#df521e');
  const noodles=[
   {pos:[0.10,-0.56,0.02],rot:[0.18,0.12,-0.52],r:0.095,len:0.78,col:'#388ce4'},
   {pos:[-0.16,-0.58,0.10],rot:[0.25,0.20,0.92],r:0.092,len:0.46,col:'#f5cc1e'},
   {pos:[0.24,-0.68,-0.04],rot:[1.2,0.2,0.3],r:0.088,len:0.20,col:'#f5cc1e'},
   {pos:[0.38,-0.92,0.06],rot:[0.15,0.25,1.42],r:0.092,len:0.32,col:'#ec4a72'},
   {pos:[-0.32,-0.90,0.12],rot:[0.30,-0.15,-1.05],r:0.095,len:0.44,col:'#46c888'},
   {pos:[-0.24,-1.14,0.02],rot:[0.12,0.18,1.45],r:0.072,len:0.48,col:'#ec4a72'},
   {pos:[-0.08,-1.08,-0.06],rot:[0.22,0.10,0.08],r:0.072,len:0.38,col:'#ec4a72'},
   {pos:[0.12,-1.18,0.08],rot:[1.15,-0.25,0.45],r:0.088,len:0.24,col:'#388ce4'},
   {pos:[-0.12,-1.34,0.10],rot:[0.08,0.15,1.54],r:0.088,len:0.58,col:'#388ce4'},
   {pos:[-0.22,-1.58,-0.04],rot:[-0.20,0.25,-1.10],r:0.075,len:0.42,col:'#f5cc1e'},
   {pos:[0.22,-1.68,0.06],rot:[0.18,-0.12,1.12],r:0.086,len:0.52,col:'#46c888'},
   {pos:[-0.12,-1.84,0.08],rot:[0.08,0.12,0.05],r:0.092,len:0.44,col:'#f5cc1e'}
  ];
  for(const n of noodles){
   const ng=new THREE.Group();
   ng.position.set(...n.pos);ng.rotation.set(...n.rot);
   const body=new THREE.Mesh(cylinderGeo,mat(n.col,0.65));
   body.scale.set(n.r,n.len,n.r);body.castShadow=true;body.receiveShadow=true;ng.add(body);
   const hole=new THREE.Mesh(cylinderGeo,mat('#28221e',0.9));
   hole.scale.set(n.r*0.32,n.len+0.01,n.r*0.32);ng.add(hole);
   g.add(ng);
  }
  return g;
 }
 if(id==='mov019'){
  // MOV-019: "Círculo azul y blanco" — Open metallic-blue hoop with 3D filigree of cobalt-blue & white looping wires (100% see-through!)
  rod(g,[0,0,0],[-0.24,-0.42,0],0.0035,'#8a9084');
  rod(g,[0,0,0],[0.24,-0.42,0],0.0035,'#8a9084');
  const cy=-1.14,R=0.72;
  const hoop=new THREE.Mesh(new THREE.TorusGeometry(R,0.022,14,48),mat('#5c7fa3',0.38,0.35));
  hoop.position.set(0,cy,0);hoop.castShadow=true;g.add(hoop);
  // 38 airy 3D squiggle loops in cobalt-blue, sky-blue, and white weaving inside the hoop with open center & gaps
  const cols=['#225ec8','#f4f4f0','#3b78dc','#f4f4f0','#1b4fa8','#eaeae4'];
  for(let s=0;s<38;s++){
   const a0=(s/38)*Math.PI*2+rand()*0.2;
   const r0=0.22+rand()*0.46;
   const pts=[];
   let curA=a0,curR=r0;
   for(let p=0;p<6;p++){
    const px=Math.cos(curA)*curR;
    const py=cy+Math.sin(curA)*curR;
    const pz=(rand()-0.5)*0.16;
    pts.push([px,py,pz]);
    curA+=(rand()-0.42)*0.55;
    curR=Math.max(0.16,Math.min(R*0.98,curR+(rand()-0.48)*0.22));
   }
   curve(g,pts,0.013,cols[s%cols.length]);
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
  // MOV-025: "Trama oscura con flores de color" — Violet teardrop hoop, silver wire lattice, dark teal-black rope, 7 3D 8-ball flowers
  rod(g,[0,0,0],[0,-0.32,0],0.005,'#1c4e38');
  // Teardrop / oval purple outer hoop
  const framePts=[];
  const nPts=32;
  for(let i=0;i<=nPts;i++){
   const t=(i/nPts)*Math.PI*2;
   // Teardrop parametric shape: narrower pointed top at y=-0.32, wider rounded bottom at y=-1.84
   const sy=-1.12+Math.cos(t)*0.76;
   const widthFactor=0.54*(1-0.32*Math.cos(t))*Math.sin(t);
   framePts.push([widthFactor,sy,0]);
  }
  curve(g,framePts,0.024,'#6e359c',true);
  // Dark teal-black braided rope loops inside the teardrop
  for(let r=0;r<14;r++){
   const a0=(r/14)*Math.PI*2;
   const rPts=[];
   for(let k=0;k<5;k++){
    const ka=a0+k*0.65+(rand()-0.5)*0.3;
    const kr=0.18+rand()*0.32;
    rPts.push([Math.sin(ka)*kr*0.85,-1.14+Math.cos(ka)*kr*1.15,(rand()-0.5)*0.10]);
   }
   curve(g,rPts,0.022,r%2?'#14282a':'#1e3a3c');
  }
  // Criss-crossing silver wire lattice struts
  for(let w=0;w<22;w++){
   const a1=(w/22)*Math.PI*2,a2=a1+1.8+(rand()-0.5)*0.5;
   const p1=[Math.sin(a1)*0.48*(1-0.25*Math.cos(a1)),-1.12+Math.cos(a1)*0.72,(rand()-0.5)*0.08];
   const p2=[Math.sin(a2)*0.48*(1-0.25*Math.cos(a2)),-1.12+Math.cos(a2)*0.72,(rand()-0.5)*0.08];
   rod(g,p1,p2,0.0045,'#c8d0d8');
  }
  // 7 iconic 3D 8-ball flower-gears matching mov-025.webp (3 red, 2 emerald-green, 2 cobalt-blue)
  const flowers=[
   {pos:[-0.16,-0.82,0.06],col:'#18b478'},
   {pos:[0.12,-0.78,0.07],col:'#e83028'},
   {pos:[-0.22,-1.16,0.08],col:'#1c62d4'},
   {pos:[0.04,-1.22,0.07],col:'#18b478'},
   {pos:[0.28,-1.10,0.08],col:'#e83028'},
   {pos:[-0.10,-1.52,0.07],col:'#e83028'},
   {pos:[0.22,-1.48,0.08],col:'#1c62d4'}
  ];
  for(const f of flowers){
   addFlowerGear3D(g,f.pos,[(rand()-0.5)*0.25,(rand()-0.5)*0.25,rand()*0.5],f.col,0.145);
   // Backside flower gear so it looks identical from both front and back in 360°!
   addFlowerGear3D(g,[f.pos[0],f.pos[1],-f.pos[2]],[(rand()-0.5)*0.25,(rand()-0.5)*0.25,rand()*0.5],f.col,0.145);
  }
  // 9 hanging silver wire droplets along the bottom edge
  for(let d=-4;d<=4;d++){
   const dx=d*0.095,dy=-1.86+Math.abs(d)*0.032;
   const dropLen=0.14+(Math.abs(d)%2)*0.06;
   rod(g,[dx,dy,0],[dx,dy-dropLen,0],0.0035,'#b8c0c8');
   const loop=new THREE.Mesh(new THREE.TorusGeometry(0.016,0.0035,6,12),mat('#b8c0c8',0.3,0.6));
   loop.position.set(dx,dy-dropLen-0.016,0);g.add(loop);
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
 return null;
}

function addHangingMobile3D(world,id,anchorPos,ceilingY=9.2,scale=1,levelTag='air'){
 const data=ART.find(a=>a.id===id);if(!data)return null;
 const anchor=new THREE.Group();anchor.position.set(...anchorPos);world.scene.add(anchor);
 rod(world.scene,[anchorPos[0],ceilingY,anchorPos[2]],anchorPos,.0065,'#7e8677');
 if(levelTag!=='branch'){const mount=new THREE.Mesh(cylinderGeo,mat(levelTag==='pergola'?'#593a22':'#586052',.5,.3));mount.scale.set(levelTag==='pergola'?.035:.055,levelTag==='pergola'?.04:.08,levelTag==='pergola'?.035:.055);mount.position.set(anchorPos[0],ceilingY-.02,anchorPos[2]);world.scene.add(mount);}
 const pivot=new THREE.Group();anchor.add(pivot);
 const h=(data.height||2.2)*scale;
 const cutViews=(data.views||[]).filter(v=>v.cutout!==false);
 const activeViews=cutViews.length?cutViews:(data.views||[{src:data.image,w:1.8,h:2.2,label:'Vista principal'}]);
 const allViews=data.views||activeViews;
 const textures=allViews.map(v=>{const t=texLoader.load(v.src,()=>{world.dirty=true;},undefined,()=>{world.assetErrors.push(v.src);});t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;});
 // Mode 1: Volumetric 3D Mobile (True 360° procedural 3D sculpture for garden mobiles, or GLB + filigree core)
 const gAi3d=new THREE.Group();gAi3d.scale.setScalar(scale);pivot.add(gAi3d);
 const v0=allViews[0];
 const custom3d=buildTrue3DMobileGeometry(id);
 const filigreeMat=new THREE.MeshBasicMaterial({map:textures[0],transparent:true,alphaTest:.12,side:THREE.DoubleSide});
 const filigreePlane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),filigreeMat);
 filigreePlane.scale.set(v0.w,v0.h,1);filigreePlane.position.set(0,-v0.h/2,0);
 if(custom3d){gAi3d.add(custom3d);}else{gAi3d.add(filigreePlane);}
 // Mode 2: 2D-3D Multi-layer Interactive Cutout (3-slice 2.5D relief stack without ghosted side wings)
 const gBillboard=new THREE.Group();gBillboard.scale.setScalar(scale);pivot.add(gBillboard);
 const frontMat=new THREE.MeshBasicMaterial({map:textures[0],transparent:true,alphaTest:.04,side:THREE.DoubleSide});
 const midMat=new THREE.MeshBasicMaterial({map:textures[0],transparent:true,alphaTest:.06,side:THREE.DoubleSide,color:'#f4f2ea'});
 const backMat=new THREE.MeshBasicMaterial({map:textures[0],transparent:true,alphaTest:.06,side:THREE.DoubleSide,color:'#e6e3d8'});
 const frontPlane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),frontMat);
 const midPlane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),midMat);
 const backPlane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),backMat);
 [frontPlane,midPlane,backPlane].forEach((pl,i)=>{
  pl.scale.set(v0.w,v0.h,1);
  pl.position.set(0,-v0.h/2,i===0?.022:i===1?0:-.022);
  pl.castShadow=i===0;
  gBillboard.add(pl);
 });
 // Subtle kinetic air ring around the mobile that glows when awakened in the "Juego del Aire"
 const ringGeo=new THREE.RingGeometry(Math.max(.55,v0.w*.46)*scale,Math.max(.60,v0.w*.49)*scale,48);
 const ringMat=new THREE.MeshBasicMaterial({color:'#8ca878',transparent:true,opacity:.16,side:THREE.DoubleSide,depthWrite:false});
 const breezeRing=new THREE.Mesh(ringGeo,ringMat);breezeRing.rotation.x=-Math.PI/2;breezeRing.position.set(0,-h*.52,0);anchor.add(breezeRing);
 const centerY=anchorPos[1]-h*.52;
 const groundY=world.heightAt?world.heightAt(anchorPos[0],anchorPos[2]):0;
 softShadow(world.scene,anchorPos[0],anchorPos[2],Math.max(1.8,v0.w*1.35*scale),.18,groundY);
 const work={
  ...data,
  object:pivot,
  ai3dGroup:gAi3d,
  billboardGroup:gBillboard,
  textures,
  viewIndex:0,
  anchor,
  center:V(anchorPos[0],centerY,anchorPos[2]),
  groundY,
  levelTag,
  radius:3.2,
  spin:0,
  windBoost:0,
  awakened:false,
  breezeRing,
  phase:world.works.length*1.93,
  baseRotation:(world.works.length*0.68)%(Math.PI*2)
 };
 work.setView=idx=>{
  const n=allViews.length,i=((idx%n)+n)%n;
  work.viewIndex=i;
  // If the selected view is an outdoor context photo (cutout===false), keep the first studio cutout on the 3D planes while showing the context photo in the UI card
  const planeIdx=allViews[i].cutout===false?0:i;
  const vp=allViews[planeIdx];
  [frontPlane,midPlane,backPlane,filigreePlane].forEach(pl=>{pl.scale.set(vp.w,vp.h,1);pl.position.y=-vp.h/2;});
  frontMat.map=midMat.map=backMat.map=filigreeMat.map=textures[planeIdx];
  frontMat.needsUpdate=midMat.needsUpdate=backMat.needsUpdate=filigreeMat.needsUpdate=true;
  world.dirty=true;
 };
 work.applyMode=mode=>{gAi3d.visible=mode==='ai3d';gBillboard.visible=mode==='billboard';world.dirty=true;};
 work.applyMode(sculpturePresentation);
 if(data.glb){
  const glbUrl=data.glb+(data.glb.includes('?')?'':'?v=9');
  gltfLoader.load(glbUrl,gltf=>{
   const model=gltf.scene;
   model.position.set(0,0,0);
   model.traverse(o=>{
    if(o.isMesh){
     o.castShadow=true;o.receiveShadow=true;o.userData.work=work;
     const tex=o.material?.map;
     if(tex){
      tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;
      o.material=new THREE.MeshStandardMaterial({map:tex,emissive:'#ffffff',emissiveMap:tex,emissiveIntensity:.14,envMapIntensity:.85,roughness:data.roughness??.55,metalness:data.metalness??.14});
     }
    }
   });
   filigreePlane.visible=false;
   gAi3d.add(model);world.dirty=true;
  },undefined,()=>{world.assetErrors.push(data.glb);});
 }
 anchor.traverse(o=>{if(o.isMesh)o.userData.work=work;});
 world.works.push(work);world.pickables.push(anchor);world.mobiles.push(work);
 return work;
}
function addZenithSpot(world,x,z,work,y=0){
 const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');
 const grd=ctx.createRadialGradient(128,128,18,128,128,118);
 grd.addColorStop(0,'rgba(116,148,98,.34)');grd.addColorStop(.68,'rgba(116,148,98,.12)');grd.addColorStop(1,'rgba(116,148,98,0)');
 ctx.fillStyle=grd;ctx.fillRect(0,0,256,256);
 ctx.strokeStyle='#5a704c';ctx.lineWidth=4;ctx.beginPath();ctx.arc(128,128,96,0,Math.PI*2);ctx.stroke();
 ctx.setLineDash([8,6]);ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(128,128,74,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
 ctx.fillStyle='#3d4e33';ctx.font='bold 22px Georgia';ctx.textAlign='center';ctx.fillText('MIRAR ↑',128,122);
 ctx.font='16px Arial';ctx.fillStyle='#536448';ctx.fillText(work.code,128,148);
 const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
 const m=new THREE.Mesh(new THREE.PlaneGeometry(1.75,1.75),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));
 m.rotation.x=-Math.PI/2;m.position.set(x,y+.022,z);
 m.userData.lookUpMobile=work;m.userData.isFloor=true;
 world.scene.add(m);world.pickables.push(m);
 return m;
}
function addWalkPlatform(world,size,pos,color,isFloor=true){
 const m=box(world.scene,size,pos,color,true);
 if(isFloor){m.userData.isFloor=true;world.pickables.push(m);}
 return m;
}
function addSteppedRamp(world,x,zStart,zEnd,yStart,yEnd,width,steps=14,color='#cbbba0'){
 const dz=(zEnd-zStart)/steps,dy=(yEnd-yStart)/steps;
 for(let i=0;i<steps;i++){
  const zc=zStart+(i+.5)*dz;
  const yc=yStart+(i+.5)*dy;
  const h=Math.max(.08,yc);
  addWalkPlatform(world,[width,h,Math.abs(dz)+.06],[x,h/2,zc],i%2?color:'#c3b296',true);
 }
}
export function createMobilesRoom(){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#e8eee8');scene.environment=getStudioEnvMap();scene.fog=new THREE.Fog('#e8eee8',42,106);
 const heightAt=(x,z)=>{
  const ax=Math.abs(x),az=Math.abs(z);
  // Nivel 2: Gran Pasarela Aérea Central (y = +3.20m) + rampas escalonadas norte y sur
  if(ax<=2.55){
   if(az<=12.5)return 3.20;
   if(az<=18.0)return 3.20*(1-(az-12.5)/5.5);
  }
  // Nivel 1: Terrazas Escalonadas Oeste y Este (y = +1.70m) + rampas escalonadas norte y sur
  if(ax>=6.15&&ax<=11.95){
   if(az<=17.0)return 1.70;
   if(az<=22.5)return 1.70*(1-(az-17.0)/5.5);
  }
  return 0;
 };
 const world={id:'mobiles',scene,works:[],mobiles:[],pickables:[],colliders:[],assetErrors:[],bounds:{minX:-11.6,maxX:11.6,minZ:-28.8,maxZ:28.8},heightAt,zenithSpots:[],dirty:true};
 scene.add(new THREE.HemisphereLight('#f6fbff','#c7c2b0',2.45));
 const sun=new THREE.DirectionalLight('#fff8ea',2.95);sun.position.set(8,26,12);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
 Object.assign(sun.shadow.camera,{left:-26,right:26,top:32,bottom:-32,near:1,far:95});
 sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;scene.add(sun);world.sun=sun;
 // Suelo principal (Nivel 0 · 0.0m)
 const floorTex=groundTexture(false);floorTex.repeat.set(16,36);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(28,64),new THREE.MeshStandardMaterial({map:floorTex,roughness:.88}));
 floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.userData.isFloor=true;scene.add(floor);world.floor=floor;world.pickables.push(floor);addWalkRing(world);
 // Muros perimetrales de gran altura (9.4m) y lucernarios cenitales abiertos al cielo
 box(scene,[28.4,9.4,.4],[0,4.7,-31.9],'#f4f4ec');box(scene,[28.4,9.4,.4],[0,4.7,31.9],'#f4f4ec');
 box(scene,[.4,9.4,64.2],[-13.9,4.7,0],'#f8f7f0');box(scene,[.4,9.4,64.2],[13.9,4.7,0],'#f8f7f0');
 for(let x=-12;x<=12;x+=4)box(scene,[.015,.006,63],[x,.008,0],'#c7c9bf',false);
 for(let z=-30;z<=30;z+=4)box(scene,[27.6,.006,.015],[0,.008,z],'#c7c9bf',false);
 for(let z=-28;z<=28;z+=4){
  box(scene,[27.8,.26,.22],[0,9.25,z],'#e2e5dc');
  box(scene,[27.6,.05,.10],[0,9.08,z+.22],'#fbf9e4',false);
 }
 for(const x of [-11.2,-7.8,-3.2,0,3.2,7.8,11.2])box(scene,[.08,.08,61],[x,9.02,0],'#626a5e');
 const entrySign=sign(scene,'EL MIRADOR DEL AIRE · SALA DE MÓVILES','33 OBRAS SUSPENDIDAS · MIRADA CENITAL, TERRAZAS (+1.7M) Y PASARELA AÉREA (+3.2M)',[0,6.6,31.65],9.2);entrySign.rotation.y=Math.PI;
 sign(scene,'ENRIC SEGARRA I GARIBO','EQUILIBRIO, CORRIENTES DE AIRE Y GRAVEDAD EN TRES ALTURAS',[0,6.6,-31.65],8.8);
 // NIVEL 1: Terrazas Escalonadas Oeste (-11.8..-6.2) y Este (6.2..11.8) a +1.70m
 for(const sx of [-1,1]){
  const tx=sx*9.0;
  addWalkPlatform(world,[5.6,1.70,34.0],[tx,.85,0],'#e3ded0',true);
  addWalkPlatform(world,[5.68,.06,34.08],[tx,1.69,0],'#c9ba9e',true);
  // Barandillas interiores ligeras de madera y vidrio transparente
  box(scene,[.065,.045,33.8],[sx*6.22,2.48,0],'#8d7b61',false);
  const glass=new THREE.Mesh(new THREE.BoxGeometry(.02,.74,33.6),new THREE.MeshStandardMaterial({color:'#dce8e2',transparent:true,opacity:.14,roughness:.2,depthWrite:false}));
  glass.position.set(sx*6.22,2.08,0);scene.add(glass);
  // Rampas escalonadas Sur (22.5 -> 17.0) y Norte (-22.5 -> -17.0)
  addSteppedRamp(world,tx,22.5,17.0,0,1.70,5.2,12,'#cbbba0');
  addSteppedRamp(world,tx,-22.5,-17.0,0,1.70,5.2,12,'#cbbba0');
  sign(scene,sx<0?'TERRAZA OESTE · NIVEL +1.70M':'TERRAZA ESTE · NIVEL +1.70M','SUBE PARA VER LOS MÓVILES CARA A CARA A LA ALTURA DE LOS OJOS',[tx,2.45,22.8],3.8);
 }
 // NIVEL 2: Gran Pasarela Aérea Central (-2.5..2.5, z=-12.5..12.5) a +3.20m
 addWalkPlatform(world,[5.0,.28,25.0],[0,3.06,0],'#d8ccb4',true);
 addWalkPlatform(world,[5.12,.06,25.1],[0,3.20,0],'#bfae90',true);
 // Pilares esbeltos bajo la pasarela aérea (permiten caminar por los paseos laterales)
 for(const pz of [-11.5,-5.8,0,5.8,11.5])for(const px of [-2.25,2.25]){
  rod(scene,[px,0,pz],[px,3.0,pz],.11,'#677060');
 }
 for(const sx of [-1,1]){
  box(scene,[.065,.045,24.8],[sx*2.48,4.00,0],'#7d6b52',false);
  const glass=new THREE.Mesh(new THREE.BoxGeometry(.02,.76,24.6),new THREE.MeshStandardMaterial({color:'#dfece6',transparent:true,opacity:.15,roughness:.2,depthWrite:false}));
  glass.position.set(sx*2.48,3.58,0);scene.add(glass);
 }
 addSteppedRamp(world,0,18.0,12.5,0,3.20,4.6,16,'#c4b293');
 addSteppedRamp(world,0,-18.0,-12.5,0,3.20,4.6,16,'#c4b293');
 const bridgeSign=sign(scene,'PASARELA AÉREA CENTRAL · NIVEL +3.20M','CAMINA ENTRE LAS CONSTELACIONES SUSPENDIDAS EN EL CIELO DE LA SALA',[0,4.25,18.2],4.8);bridgeSign.rotation.y=Math.PI;

 // Colocación de los 33 Móviles Reales (MOV-001 a MOV-033) en las 3 cotas espaciales
 // A) 10 Móviles de Corona Alta (Nivel 2 · Pasarela Aérea +3.20m, ojos a ~4.92m)
 const highPlacements=[
  {id:'mov001',pos:[0.0,6.35,20.2],scale:1.10,zenith:true},
  {id:'mov002',pos:[-3.35,6.25,11.0],scale:1.02,zenith:false},
  {id:'mov003',pos:[3.35,6.25,11.0],scale:1.02,zenith:false},
  {id:'mov004',pos:[-3.35,6.28,5.5],scale:1.04,zenith:true},
  {id:'mov005',pos:[3.35,6.28,5.5],scale:1.04,zenith:true},
  {id:'mov006',pos:[-3.35,6.30,0.0],scale:1.05,zenith:true},
  {id:'mov007',pos:[3.35,6.30,0.0],scale:1.05,zenith:true},
  {id:'mov008',pos:[-3.35,6.28,-5.5],scale:1.04,zenith:true},
  {id:'mov009',pos:[3.35,6.28,-5.5],scale:1.04,zenith:true},
  {id:'mov010',pos:[0.0,6.38,-11.2],scale:1.08,zenith:false}
 ];
 highPlacements.forEach(p=>{
  const w=addHangingMobile3D(world,p.id,p.pos,9.18,p.scale,'skybridge');
  if(w&&p.zenith)world.zenithSpots.push(addZenithSpot(world,p.pos[0],p.pos[2],w,0));
 });

 // B) 14 Móviles de Terraza Media (Nivel 1 · Terrazas Oeste y Este +1.70m, ojos a ~3.42m)
 const terraceZs=[15.0,10.0,5.0,0.0,-5.0,-10.0,-15.0];
 const westIds=['mov011','mov012','mov013','mov014','mov015','mov016','mov017'];
 const eastIds=['mov018','mov019','mov020','mov021','mov022','mov023','mov024'];
 terraceZs.forEach((tz,i)=>{
  const wWest=addHangingMobile3D(world,westIds[i],[-7.85,4.78,tz],9.18,1.0,'terrace');
  const wEast=addHangingMobile3D(world,eastIds[i],[7.85,4.78,tz],9.18,1.0,'terrace');
 });

 // C) 9 Móviles de Mirador Cenital (Nivel 0 · Suelo 0.0m, diseñados para caminar debajo y mirarlos hacia el cielo o desde las rampas)
 const groundPlacements=[
  {id:'mov025',pos:[-4.3,4.35,24.2],scale:1.0},
  {id:'mov026',pos:[-4.3,4.35,15.2],scale:1.0},
  {id:'mov027',pos:[-4.3,4.35,-15.2],scale:1.0},
  {id:'mov028',pos:[-4.3,4.35,-24.2],scale:1.0},
  {id:'mov029',pos:[4.3,4.35,24.2],scale:1.0},
  {id:'mov030',pos:[4.3,4.35,15.2],scale:1.0},
  {id:'mov031',pos:[4.3,4.35,-15.2],scale:1.0},
  {id:'mov032',pos:[4.3,4.35,-24.2],scale:1.0},
  {id:'mov033',pos:[0.0,4.55,-23.5],scale:1.12}
 ];
 groundPlacements.forEach(p=>{
  const w=addHangingMobile3D(world,p.id,p.pos,9.18,p.scale,'zenith');
  if(w)world.zenithSpots.push(addZenithSpot(world,p.pos[0],p.pos[2],w,0));
 });

 // Partículas de brisa flotantes en el aire para visualizar las corrientes del Juego del Aire
 const windCount=260,windGeo=new THREE.BufferGeometry(),windPos=new Float32Array(windCount*3);
 const random=rng(303);
 for(let i=0;i<windCount;i++){
  windPos[i*3]=(random()-.5)*24;
  windPos[i*3+1]=.6+random()*8.0;
  windPos[i*3+2]=(random()-.5)*56;
 }
 windGeo.setAttribute('position',new THREE.BufferAttribute(windPos,3));
 const windMat=new THREE.PointsMaterial({color:'#ffffff',size:.075,transparent:true,opacity:.45,depthWrite:false});
 const windParticles=new THREE.Points(windGeo,windMat);
 scene.add(windParticles);world.windParticles=windParticles;world.windImpulse=0;

 world.stops=[
  {title:'Umbral y Mirador Cenital (MOV-001)',pos:[0,1.72,25.6],look:[0,4.9,20.2],work:'mov001'},
  {title:'Mirada desde abajo · Suelo Cenital (MOV-025 · MOV-029)',pos:[-4.3,1.72,24.2],look:[-4.3,3.6,24.2],work:'mov025'},
  {title:'Terraza Oeste +1.70m · Cara a cara (MOV-011 · MOV-014)',pos:[-9.2,3.42,10.0],look:[-7.85,3.55,10.0],work:'mov012'},
  {title:'Terraza Este +1.70m · Equilibrio y color (MOV-018 · MOV-021)',pos:[9.2,3.42,0.0],look:[7.85,3.55,0.0],work:'mov021'},
  {title:'Pasarela Aérea +3.20m · En el cielo (MOV-006 · MOV-007)',pos:[0,4.92,0.0],look:[-3.35,5.1,0.0],work:'mov006'},
  {title:'Coronación Norte +3.20m (MOV-010)',pos:[0,4.92,-9.2],look:[0,5.1,-11.2],work:'mov010'},
  {title:'Rotonda Norte · Bajo la constelación (MOV-033)',pos:[0,1.72,-23.5],look:[0,3.6,-23.5],work:'mov033'}
 ];
 world.stops.forEach((s,i)=>{
  const sy=heightAt(s.pos[0],s.pos[2]);
  marker(world,i,s.pos[0],s.pos[2]);
  const mk=world.pickables[world.pickables.length-1];
  if(mk&&mk.userData.stop===i)mk.position.y=sy+.028;
 });
 return world;
}
export function updateMobiles(world,time,dt,moving,cameraPos){
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
   const windBoost=1+(world.windImpulse||0)*2.2;
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
    b.mesh.root.rotation.z=Math.sin(t*2)*0.28; // Bank into turns
    // Alternate flapping bursts with smooth gliding
    const flap=Math.sin(t*2.2)>-0.2?Math.sin(time*15+b.phase)*0.68:0.12;
    b.mesh.wingL.rotation.z=flap;
    b.mesh.wingR.rotation.z=-flap;
   }else{
    const hop=Math.max(0,Math.sin(time*3.2+b.phase));
    b.mesh.root.position.y=b.basePos[1]+(hop>0.7?(hop-0.7)*0.18:0);
    b.mesh.root.rotation.y=b.baseRotY+Math.sin(time*1.4+b.phase)*0.45;
    b.mesh.head.rotation.x=Math.sin(time*4.5+b.phase)*0.25;
    const flutter=hop>0.75?Math.sin(time*22)*0.45:0;
    b.mesh.wingL.rotation.z=-1.15+flutter;
    b.mesh.wingR.rotation.z=1.15-flutter;
   }
  }
 }
 if(world.squirrels&&moving){
  for(const s of world.squirrels){
   // Scamper along curve with pauses to sit up and nibble!
   const raw=time*s.speed+s.phase;
   const cyc=raw%4.0;
   let u;
   let paused=false;
   if(cyc<1.6){u=cyc/1.6;}
   else if(cyc<2.0){u=1.0;paused=true;}
   else if(cyc<3.6){u=1.0-(cyc-2.0)/1.6;}
   else{u=0.0;paused=true;}
   const pt=s.curve.getPointAt(u);
   const tan=s.curve.getTangentAt(u);
   const dir=(cyc>=2.0&&cyc<3.6)?-1:1;
   s.sq.root.position.copy(pt);
   if(!paused){
    const hop=Math.abs(Math.sin(time*11+s.phase));
    s.sq.root.position.y+=hop*0.045;
    s.sq.body.rotation.x=(Math.cos(time*11+s.phase))*0.18;
    s.sq.root.rotation.y=Math.atan2(tan.x*dir,tan.z*dir);
    s.sq.tailPivot.rotation.x=Math.sin(time*12+s.phase)*0.28;
   }else{
    // Sit up on hind legs & flick bushy tail!
    s.sq.body.rotation.x=-0.58+Math.sin(time*14)*0.06;
    s.sq.tailPivot.rotation.x=0.35+Math.sin(time*7+s.phase)*0.22;
   }
  }
 }
 if(world.windParticles){
  const pos=world.windParticles.geometry.attributes.position;
  const boost=1+(world.windImpulse||0)*4.5;
  world.windImpulse=Math.max(0,(world.windImpulse||0)-dt*.85);
  for(let i=0;i<pos.count;i++){
   let x=pos.getX(i)+Math.sin(time*.5+i)*dt*.18*boost;
   let y=pos.getY(i)+Math.cos(time*.4+i*.7)*dt*.09*boost;
   let z=pos.getZ(i)-dt*.32*boost;
   if(z<-29)z=29;if(y>8.6)y=.8;if(y<.5)y=8.4;
   pos.setXYZ(i,x,y,z);
  }
  pos.needsUpdate=true;
 }
 world.mobiles.forEach(w=>{
  if(moving){
   w.baseRotation+=dt*(.11+w.spin);
   w.spin*=Math.exp(-dt*.42);
   w.object.rotation.y=w.baseRotation+Math.sin(time*.38+w.phase)*.18;
   w.object.rotation.z=Math.sin(time*.64+w.phase)*.028*(1+Math.min(1.8,w.spin));
   w.object.rotation.x=Math.cos(time*.48+w.phase)*.018*(1+Math.min(1.8,w.spin));
  }
  if(w.breezeRing){
   w.breezeRing.rotation.z=time*(.35+w.spin*.5);
   const targetOp=w.awakened?(.38+Math.sin(time*2.4+w.phase)*.12):.14;
   w.breezeRing.material.opacity+=(targetOp-w.breezeRing.material.opacity)*Math.min(1,dt*4);
   w.breezeRing.material.color.set(w.awakened?'#52a36c':'#8ca878');
  }
 });
 if(cameraPos&&sculpturePresentation==='billboard'){
  world.works.forEach(w=>{
   if(w.kind==='sculpture'){
    const angle=Math.atan2(cameraPos.x-w.center.x,cameraPos.z-w.center.z);
    w.object.rotation.y=angle-w.anchor.rotation.y;
    const rel=((angle-w.baseRotation)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
    const n=w.views.length;
    if(!w.manualView&&n>1){
     const idx=n===3?(rel<.75||rel>5.53?0:rel<2.35||rel>3.93?1:2):n===2?(rel<1.57||rel>4.71?0:1):(Math.floor(((rel+Math.PI/n)%(Math.PI*2))/(Math.PI*2/n))%n);
     if(idx!==w.viewIndex)w.setView(idx);
    }
   }else if(w.kind==='mobile'&&w.views&&w.setView){
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