# Estructura y modelo de contenido

Sitio estático sin dependencias de ejecución. Navegación por fragmentos, recursos locales, sin servicios externos, cuentas ni formularios.

## Navegación

Inicio; Obra; Arte infantil; Exposiciones; Trayectoria; Proyectos; Archivo visual; Artista; Contacto.

Obra contiene cuatro disciplinas y familias editoriales. Los filtros se conservan en la dirección: `q`, `serie` y `vista=recorrido`. Una ficha reúne las perspectivas de una pieza. El catálogo carga bloques de 24 fichas; los álbumes, bloques de 36 fotografías. El visor puede recorrer la galería completa aunque todavía no se hayan añadido todas sus miniaturas a la página.

Arte infantil contiene proyecto, obras, talleres, formación docente, exposiciones y textos. La educación constituye una colección propia; las producciones de sus participantes no aumentan el contador de obra personal de Enric. La formación docente identifica expresamente a sus participantes como adultos.

Trayectoria ofrece siete capítulos temáticos y un índice del archivo. El recorrido usa fotografías amplias, un índice lateral en escritorio y enlaces al desarrollo de cada capítulo. La antigua dirección `?vista=cronologia` sigue abriendo el recorrido. Los IDs anteriores de obras, capítulos y álbumes se conservan; las equivalencias siguen en `redirects`.

## Modelo editable

| Entidad | Datos y relaciones |
|---|---|
| Obra | ID, referencia MOV/ESC/PIN/DIB, nombre descriptivo, disciplina, familia, capítulo y galería. |
| Álbum | ID, título, capítulo, contexto, sección, audiencia, párrafos, lugar y fecha si hay fuente, crédito y galería. |
| Fotografía | Imagen, miniatura, referencia ARC, descripción y nombre del original. `sourcePage` identifica una página si procede de un PDF. |
| Capítulo | Título, resumen, párrafos e imagen. Reúne obras y álbumes relacionados. |
| Lectura | Título, subtítulo, autores, referencia documental, secciones de texto y álbum relacionado. |
| Procedencia | Derivado, ARC, original relativo, transformación, dimensiones y página cuando procede. |

`dist/content.js` conserva identidad y capítulos. `dist/catalogue.js` conserva fichas y álbumes. `dist/education.js` contiene la presentación educativa y las lecturas. Los textos largos son síntesis editoriales, identificadas como tales; no se presentan como transcripciones del documento o citas del artista.

## Revisión local

`dist/local-gallery.json` y `dist/review/` se ignoran en Git. El navegador incorpora esas galerías solo al abrir el sitio en loopback. Los álbumes disponen de imágenes de obras y espacios en el conjunto versionado, de modo que no dependen de las fotografías privadas para funcionar. La procedencia privada está en `.local/procedencia-revision.json`.

Esto es una separación de archivos de revisión, no un control de acceso para un alojamiento. No copiar `dist/review/` ni `local-gallery.json` a un servidor público. El servidor de desarrollo escucha solo en 127.0.0.1. La publicación no forma parte de esta entrega.

## Dirección visual

Blanco, negro suave y grises. Tipografía sin serifas, líneas discretas, espacio alrededor de las piezas y metadatos pequeños. El color lo aportan las obras. Las fotografías conservan sus proporciones con `object-fit: contain`. No hay fondos recreados, recortes estéticos ni efectos sobre las obras.

Referencias aportadas por la familia: [catálogo de Giuseppe Penone](https://giuseppepenone.com/en/works), [apartados de Peter Halley](https://www.peterhalley.com/published-prints) y [cronología de David Hockney](https://www.thedavidhockneyfoundation.org/chronology). Se toman la claridad del catálogo, la separación de ámbitos y la secuencia visual; no se copian textos ni imágenes ajenos.

Las apariciones al desplazarse son suaves, el visor usa un diálogo nativo y la navegación admite teclado. Con movimiento reducido se desactivan transiciones y desplazamientos suaves. El menú se adapta a móvil, con apartados internos desplazables cuando no caben en una línea.
