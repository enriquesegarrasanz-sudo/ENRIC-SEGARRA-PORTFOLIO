## 2026-10-26 — Apartado independiente para Exposiciones y nueva página dedicada

- Menú de navegación principal actualizado con un apartado propio para «Exposiciones» (`#/exposiciones`), separándolo de Trayectoria y contacto.
- Página dedicada de Exposiciones con presentación visual limpia en cuadrícula de tarjetas (formato de álbumes con fotografía destacada, categoría, título y número de fotos) y opción de vista ampliada con textos descriptivos.
- Filtros por tipología de exposición (Todas, Obra propia, Muestras colectivas y Archivo de sala) y búsqueda contextual.
- En «Trayectoria y contacto» (`#/trayectoria-contacto`), se elimina el bloque redundante de exposiciones, manteniendo el foco en el artista, su trayectoria y las vías de contacto, con enlace directo desde los principios de búsqueda.
- Estado activo del menú sincronizado: al acceder a `#/exposiciones` o a cualquiera de los álbumes de salas o muestras, el indicador de página activa se asigna exclusivamente a «Exposiciones».
- Tarjeta de acceso a «Exposiciones» añadida al directorio principal de la portada.

## 2026-10-26 — Separación de los apartados de Pintura y Dibujo

- Menú superior actualizado con apartados independientes para Pintura (`#/pintura`) y Dibujo (`#/dibujo`), pasando a 7 apartados de navegación principal.
- Página dedicada de Pintura con sus series y conjuntos (Tauromaquia, Gatos, Arcas de Noé, Rostros y personajes, etc.) y acceso al catálogo completo.
- Página dedicada de Dibujo con sus series (Dibujo y espacio, Figuras y símbolos) y acceso al catálogo completo.
- Portada actualizada con tarjetas independientes para Pintura y Dibujo en el directorio principal.
- Redirección automática de cortesía desde la ruta combinada previa (`#/pintura-dibujo`) hacia la página de Pintura.
- Traducciones completas incorporadas al selector de idiomas para los nuevos textos y descripciones.

## 2026-10-26 — Incorporación del idioma japonés

- Añadido el japonés (`日本語`) al selector de idiomas de la cabecera, manteniendo la preferencia en el navegador.
- Traducida la interfaz completa, las secciones, las descripciones de series y conjuntos, los textos editoriales, el archivo visual y las fichas del catálogo al japonés (`dist/i18n.js` y `dist/content-translations.js`).

## 2026-10-14 — Revisión visual de series y conjuntos

Revisión de las 221 imágenes principales del catálogo: 80 pinturas, 55 esculturas, 53 dibujos y 33 móviles. Se compararon además las 123 imágenes de las galerías de escultura con varias vistas y 23 fotografías de origen de pinturas dudosas. Las hojas de contacto y fotografías de trabajo se conservan fuera del repositorio público. No se afirma haber revisado todo el fondo familiar.

- Pintura: nueve grupos accesibles desde el directorio. Correcciones de motivos: PIN-064 a Gatos; PIN-039 y PIN-078 a Tauromaquia; PIN-079 a Relatos e iconografía; PIN-080 y PIN-038 a Rostros y personajes. Las composiciones tipográficas tienen su propio conjunto Letras y signos.
- Escultura: siete conjuntos distinguen planos curvos, formas orgánicas, relieves recortados, relieves de textura, ensamblajes murales, estructuras ensambladas e intervenciones exteriores. No se presentan como series oficiales del artista.
- ARC-008829 se traslada de ESC-041 (pareja de espirales) a ESC-055 (estructura de tres ejes y ruedas dentadas). La configuración con abertura de ESC-046 se identifica como variante sin crear una obra nueva.
- Móviles: una única serie. Dibujo: conjuntos por lenguaje visual, sin la división previa basada en carpetas de origen.
- Eliminada la generación mecánica de títulos poéticos. Se conservan descripciones visuales y se indica que los títulos originales, fechas y técnicas requieren documentación.
- Los índices muestran los grupos completos, con portadas pertenecientes a cada conjunto. Se conservan las 221 fichas, sus referencias y enlaces; las obras relacionadas pertenecen a la misma disciplina y grupo.

Registro de criterios y dudas por ficha: [REVISION-SERIES-20261014.json](docs/REVISION-SERIES-20261014.json). Los conjuntos nuevos son una organización visual editorial. La pertenencia histórica de algunas piezas a las series debe confirmarla el artista; las dudas quedan registradas sin atribuciones nuevas.

Validación: catálogo, archivo visual y comprobación de cobertura/portadas correctos. Edge: 96 combinaciones de página y ancho (320, 390, 768 y 1440 px), nueve fichas con ampliación/cierre y cambio de perspectiva, búsqueda, alias de Arcas, vista de recorrido e idiomas. Sin errores JavaScript ni desbordamiento horizontal. Capturas de pintura y escultura revisadas. Se mantienen los recursos existentes; no se añaden servicios externos ni archivos privados al sitio.

Respaldo previo: rama `backup/antes-revision-series-20261014` en `e5c83e6` y `../COPIAS_SEGURIDAD_WEB/clasificacion-antes-revision-20261014.zip`, además de las copias completas de la entrega anterior. Rama de trabajo: `revision-series-20261014`. Publicación autorizada mediante GitHub Pages desde `main`.

## 2026-10-14 — Reorganización según indicaciones del artista

- Menú de seis apartados: Inicio; Escultura y móviles; Jardín de las Lagartijas; Pintura y dibujo; Arte infantil; Trayectoria y contacto.
- Móviles presentados como una serie común, sin divisiones por lugar de exposición. Se conservan fichas, referencias y clasificación interna para trazabilidad.
- Jardín de las Lagartijas / Jardí de les Sargantanes: archivo existente de árboles, entorno y móviles, reunido sin duplicados de contenido, con carga progresiva y ampliación. El texto distingue el terreno rústico del jardín de casa, a aproximadamente un kilómetro. No se atribuye una localización individual no documentada a cada fotografía.
- Entradas visuales a Tauromaquia, Gatos y Arcas de Noé, usando las agrupaciones previamente documentadas del catálogo. Resto de pintura y dibujo accesible.
- Exposiciones educativas dentro de Arte infantil. Separación del bloque infantil de Bellas Artes del archivo de obra propia/colectiva, conservando fotografías y enlaces antiguos.
- Trayectoria, exposiciones y contacto reunidos. Correo y teléfono facilitados por el usuario, con enlaces de correo y llamada.
- Presentación y nombre fuera del carrusel: nunca cubren la fotografía. Ajustes de móvil/tableta y tarjetas infantiles.
- Recuperados enlaces internos de memoria y archivo visual que antes devolvían página no encontrada. Traducción de los nuevos títulos y textos principales.

Copias previas: `../COPIAS_SEGURIDAD_WEB/web-antes-reorganizacion-20261014.zip` y `../COPIAS_SEGURIDAD_WEB/antes-reorganizacion-20261014.bundle`. Base: `2015959` (coincidía con origin/main al iniciar).
Los audios y transcripciones se mantienen fuera del repositorio público, en la carpeta local de revisión.

# Historial de cambios

## Visibilidad en buscadores · 2026-09-23

- Se elimina el bloqueo de indexación y se añaden la URL canónica, metadatos de presentación y directrices para buscadores.
- Se incorporan `robots.txt` y `sitemap.xml` con la dirección pública definitiva, para que Google pueda descubrir el portfolio.
## Portada · fuentes directas y blanco neutro — 2026-09-18

- Las nueve imágenes del carrusel se vuelven a preparar una sola vez y de forma directa desde sus fotografías de origen, sin encadenar versiones generadas.
- El retrato parte de `_DSC1856.jpg` y conserva identidad, manos, escultura y detalle fotográfico. Las ocho obras mantienen sus superficies, siluetas y elementos de suspensión.
- Todas comparten formato horizontal 3:2 y el mismo fondo de estudio blanco neutro `#F8F8F7`. El carrusel conserva el avance automático y muestra solo una flecha discreta para avanzar.

## Portada · carrusel de obra — 2026-09-18

- La portada reúne el retrato y ocho obras únicas facilitadas para esta selección; se excluyen las imágenes repetidas.
- Todas las diapositivas usan un lienzo horizontal 16:9 en escritorio y una presentación de galería coherente. Las piezas se mantienen completas y centradas, sin recortes.
- El carrusel avanza en bucle cada 4 segundos, ofrece controles manuales, se detiene al interactuar y respeta la preferencia de reducir movimiento; la transición dura 0,6 segundos.
- La identidad pública se muestra como «ENRIC SEGARRA I GARIBO» en cabecera, metadatos, autorías y sección Artista.
- Las dos imágenes de menor definición se preparan como restauraciones de presentación separadas y trazables; los originales no se sobrescriben.

## Fichas de obra · edición de sala — 2026-09-18

- Las fichas muestran una única lectura editorial: título, descripción visual y autor.
- Se retiran de la vista pública referencias, disciplina, familia, avisos provisionales, recuentos de fotografías y campos de identificación; se conservan como datos internos.
- Los títulos y descripciones se rehacen para cada obra a partir de sus formas, colores y motivos visibles.

## Móviles · vistas de galería — 2026-09-18

- Se actualizan las vistas interiores de dos galerías de móviles con fondos neutros de exposición. Los originales y la trazabilidad de cada fotografía se conservan.

## Exposición «Quatre» · portada documental — 2026-09-18

- Se retira la fotografía vertical que abría el álbum y se coloca como portada la vista de sala `ARC-009286`, con las obras de la exposición.

## Escultura · vistas secundarias normalizadas — 2026-09-18

- Se incorporan 89 vistas secundarias y sus miniaturas para 34 fichas de escultura, con formato de presentación horizontal y sin sustituir los originales documentales.
- Cada recurso mantiene su referencia ARC, su archivo de origen y la trazabilidad de la transformación en el registro de procedencia.

## Móviles · dos vistas seleccionadas · 2026-09-18

- MOV-024 («Curvas azules y verdes») y MOV-026 («Arco rojo y discos azules») abren y amplían su presentación de estudio.
- Ambas fichas conservan una única segunda vista en vegetación; las demás variantes dejan de mostrarse en sus galerías públicas.

## Navegación de familias de escultura · 2026-09-18

- Al seleccionar una familia, la vista baja automáticamente hasta las obras filtradas.

## Arte infantil · salas de obra — 2026-09-18

- Las obras infantiles se recorren en cinco salas diferenciadas por familias de trabajo, con fotografías completas tanto en formato horizontal como vertical.

## Escultura · Forma articulada dentro de un círculo — 2026-09-18

- Revisadas las siete vistas de la ficha ESC-054 con una iluminación editorial coherente y fondo de exposición blanco cálido.
- La pátina irregular del metal, la textura de la pared y el desgaste de la peana permanecen visibles, sin homogeneizarlos ni idealizarlos.

## Portada · retrato único — 2026-09-18

- La portada queda deliberadamente reducida a un único retrato horizontal de Enric Segarra con una escultura de madera, a gran formato y sin textos ni carrusel.
- Se ha preparado una versión de portada apaisada con una depuración localizada del borde de la figura, preservando la persona, la obra, su forma orgánica, la veta, el color y la luz del original.

## Arte infantil · mosaico editorial — 2026-09-18

- El índice de Arte infantil adopta el mismo mosaico editorial de Exposiciones: cinco accesos con imágenes apaisadas, contexto breve y llamadas a recorrer cada apartado.
- La imagen de apertura se sustituye por una composición colectiva del archivo, en lugar del relieve con forma de calavera.
- «Textos y propuestas» pasa a llamarse «Ideas para crear». Se conservan los documentos y enlaces ya publicados bajo el nuevo título.

## Dibujo · encuadre y luz — 2026-09-18

- Rehechas las versiones de catálogo de las fotografías de dibujo que tenían un encuadre demasiado cerrado: ahora se conserva completa la hoja o el marco, incluida la firma cuando es visible.
- Las obras verticales mantienen su proporción real en la cuadrícula, sin estrecharlas artificialmente. La luz se equilibra de manera global y no se ha retocado ni reconstruido ningún trazo de las obras.
- Se conserva sin sobrescribir la versión ya corregida de DIB-023; los originales siguen intactos y las versiones derivadas mantienen su procedencia registrada.

## Nombre artístico · Segarra y Garibo — 2026-09-18

- La identidad pública de la web pasa a ser «Segarra y Garibo»: portada, navegación, créditos de obra, página de artista y metadatos para buscadores. Los nombres que identifican documentos, proyectos o fondos históricos se conservan tal como constan en el archivo.
- La identidad pública se presenta en mayúsculas: «SEGARRA Y GARIBO».

## Escultura · vistas secundarias, primera tanda — 2026-09-18

- Tratamiento editorial aplicado a doce vistas secundarias de ESC-006, ESC-008 a ESC-012: fondo blanco cálido-neutro, iluminación y sombras coherentes, sin reemplazar ni modificar los originales. Cada nueva vista preserva el encuadre y las dimensiones de su fuente; se generan miniaturas proporcionales y se registra la procedencia.

## Escultura · Flores de engranajes — 2026-09-18

- Renovadas las tres vistas secundarias de ESC-043 con un fondo blanco cálido-neutro, luz de estudio coherente y miniaturas proporcionales. Se conservan los tres encuadres, las dimensiones de cada fotografía, la pieza completa y los originales ARC; las nuevas versiones quedan registradas por separado.

## Exposiciones y dibujos · recorrido unificado — 2026-09-17

- Rediseñado el índice de exposiciones como recorrido horizontal y unificada la presentación de los dibujos. Se incorporan las imágenes de sala de Bellas Artes y sus miniaturas, conservando los contextos y enlaces documentales.

## Escultura · tratamiento de galería — 2026-09-17

- Renovadas las portadas de 49 fichas de escultura con fondo blanco neutro, iluminación museística, encuadre horizontal 3:2 y grano fotográfico fino. Las seis instalaciones fotografiadas en naturaleza (ESC-047 a ESC-052) conservan sus imágenes originales porque el entorno forma parte de la obra. Originales y referencias ARC intactos; procedencia registrada.

## Revisión de fidelidad de Pintura — 2026-09-17

- Rehechas las 80 imágenes principales y sus miniaturas desde las fotografías originales. Se corrigen manualmente once orientaciones evidentes y se elimina el recorte que podía confundir pintura clara, huecos o líneas finas con el fondo. La segunda versión conserva geometría, proporciones, marco, firma y píxeles originales; la IA se limita a un fondo maestro vacío y más limpio. Originales y primera versión de estudio permanecen intactos.

## Fondos de estudio para Pintura — 2026-09-17

- Las 80 fichas de pintura utilizan nuevas versiones sobre un fondo de estudio blanco cálido, coherente con la galería de escultura. El fondo maestro se generó con IA a partir de la referencia facilitada; obra, marco, color, textura, firma, encuadre y proporciones se conservan desde los archivos web anteriores, sin reinterpretación generativa. Se añaden miniaturas, recortes supervisados y una sombra ambiental mínima. Originales y versiones anteriores permanecen intactos y con procedencia registrada.

## Palacio Colomina · edición fotográfica profesional — 2026-09-17

- Sustituidas las siete vistas del álbum por versiones de presentación profesional con luz, color, perspectiva, nitidez y composición revisados. La vista frontal se reencuadró con criterio editorial y la escultura negra de alambre se corrigió para aparecer completa, sin extremos cortados. Originales y versiones web anteriores conservados; procedencia registrada.
- La fotografía 4 se reencuadra de nuevo para aislar la escultura tubular verde, eliminar elementos competidores y convertirla en el único foco visual.

## Restauración fotográfica de Evolución 1984–2004 — 2026-09-17

- Las 16 vistas de sala reciben nuevas versiones no generativas con balance de blancos, rango tonal recuperado, ruido reducido, ampliación proporcional, enfoque moderado y grano fino. Se conservan encuadre, geometría, obras, originales y versiones web anteriores.

## Tratamiento fotográfico de móviles — 2026-09-17

- Primera tanda completa de tratamiento expositivo: las 22 imágenes de MOV-001 a MOV-006 quedan normalizadas en lienzo 2:3, centrado óptico y fondo frío-neutro calibrado al blanco de referencia `#F5F6F7`. Vistas completas, giros y detalles comparten iluminación y presentación de galería; originales intactos y procedencia registrada.

## Ajuste posterior — 2026-09-17

- Retirado «Proceso y entorno» de la navegación y de todos los recorridos públicos, manteniendo intactos los originales y los datos internos.

## 0.4.0 — 2026-09-17

- 221 fichas (+39): incorporación de 12 móviles, nueve esculturas y 18 dibujos; más perspectivas en fichas existentes.
- Naturaleza Móviles: revisión y acceso a sus 237 fotografías. Recuperación de dibujos del fondo Sala de Bellas Artes.
- 31 álbumes: los contextos de la Sala d’Exposicions de les Belles Arts se reúnen sin perder sus atribuciones y se mantienen los accesos históricos.
- Archivo visual general: 1.226 fotografías versionadas, filtros combinados, búsqueda, visor y conservación de todos sus contextos. En local, 147 fotografías privadas adicionales; total de 1.373.
- Introducción y portada equilibradas; cabecera horizontal; directorio educativo con separación de exposiciones infantiles y formación de adultos.
- Trayectoria rehecha siguiendo la disposición de Hockney: imagen fija y lista lateral, 16 entradas, búsqueda y cambio de imagen al avanzar; detalle de capítulos con navegación propia. Eliminadas las apariciones con desplazamiento.
- Clasificación expositiva y búsqueda por lugar/año. Pruebas del modelo de imágenes y verificación de escritorio y móvil.
- Originales intactos; títulos provisionales y fechas documentadas; sin retoque individual ni despliegue público.

## 0.3.0 — 2026-09-17

- Rediseño completo sobre blanco: navegación lateral, tipografía sin serifas, fotografías completas, pies discretos y adaptación móvil.
- Catálogo de 182 obras (21 móviles, 46 esculturas, 80 pinturas y 35 dibujos), con cinco pinturas recuperadas de RAW. Cuadrícula y recorrido vertical, filtros y búsqueda.
- Arte infantil como apartado principal: proyecto, cinco colecciones de obras, cuatro álbumes de talleres, tres de formación docente, ocho de exposiciones y cuatro lecturas documentadas.
- 27 álbumes en total; 754 registros fotográficos distintos entre fichas y álbumes, incluidos 71 recuperados de páginas de PDF. Otros 108 registros de participantes disponibles solo en la revisión local.
- Exposiciones con clasificación propia; incorporación de Casa Abadía, El pelèc, Magisterio, Bellas Artes, La Pobla Llarga, Carlet, Cervantes y Los Chopos.
- Trayectoria de siete capítulos con índice fijo y secuencia de fotografías; proceso y proyectos desarrollados por separado.
- Revisión adicional de 1.109 referencias en hojas de contacto y de 107 páginas de cuatro dossieres fotográficos completos, además de los textos y las portadas documentales consultadas.
- Procedencia por archivo y página para los PDF, diferenciación de autorías, galerías progresivas y controles de ampliación por teclado.
- Sin retoque creativo ni publicación en alojamiento web. Conservación de originales y del estado anterior.

## 0.2.0 — 2026-09-17

- Ampliación a 177 fichas y 329 fotografías seleccionadas entre obras y nueve álbumes.
- Separación visual de móviles, escultura, pintura y dibujo; series, búsqueda y paginación.
- Una ficha por obra con vistas agrupadas, referencias y galería ampliable.
- Portada editorial, siete recorridos visuales de memoria y álbumes históricos, educativos y de proceso.
- Inventario privado completo, detección de 7.540 copias exactas y revisión visual de 1.499 referencias.
- Trazabilidad de originales y pruebas de galerías, navegación y adaptación móvil.


## 0.1.0 — 2026-09-17

- Primera estructura navegable de seis apartados.
- Once fichas de obra con cuatro disciplinas y enlaces a su contexto.
- Siete capítulos de memoria, cronología inicial y archivo documental de partida.
- Presentación del artista, proceso y entorno, y contacto pendiente de completar.
- Fotografías ligeras y trazables, sin modificación estética de los originales.
- Navegación adaptable a móvil y ampliación accesible de imágenes.
- Instrucciones de edición, comprobación y guardado al finalizar futuros cambios.

## Próximo

- Añade selector de idioma persistente para castellano, catalán, inglés, francés y chino simplificado, con traducción de la navegación y de la interfaz principal.
