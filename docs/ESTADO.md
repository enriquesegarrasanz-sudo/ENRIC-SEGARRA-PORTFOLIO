# Estado de la versión 0.4.0

17 de septiembre de 2026.

## Entregado

- Revisadas de nuevo las 80 fichas de pintura, con 80 imágenes principales y 80 miniaturas de segunda versión. Once fotografías se orientan manualmente según rostros, animales, signos y firmas. El recorte se rehace con criterio conservador: no simplifica ni reconstruye contornos y conserva cualquier píxel dudoso de la fotografía original. Los soportes rectangulares y circulares se delimitan solo por su borde físico exterior; las piezas irregulares mantienen su silueta real. La IA se limita al fondo maestro vacío. Originales y primera versión quedan conservados.
- Álbum «Escultura · Palacio Colomina» renovado con siete versiones fotográficas profesionales, nuevos encuadres editoriales y miniaturas. Se preservan los archivos ARC originales y queda registrada cada transformación; la escultura negra de alambre se muestra completa.
- Restauradas las 16 fotografías del álbum «Evolución 1984–2004» mediante un revelado no generativo y reproducible: iluminación y color equilibrados, sombras recuperadas, ruido reducido, ampliación proporcional y grano fino. No se reconstruyen ni alteran las obras fotografiadas.
- Primera tanda fotográfica expositiva aplicada a las seis primeras fichas de móviles (MOV-001 a MOV-006): fondo continuo blanco cálido, luz difusa coherente y nuevas miniaturas. Los originales y las versiones previas permanecen conservados y trazables.
- Completada una segunda tanda de portadas de Móviles (MOV-028 a MOV-033), antes fotografiadas en árboles y jardín: versiones de galería con fondo blanco cálido, luz controlada y nuevas miniaturas. Las fotografías originales y las vistas complementarias se mantienen publicadas y trazables.
- Retirado el apartado «Proceso y entorno» de la navegación, la portada, la trayectoria y el archivo público. Sus agrupaciones editoriales se conservan en los datos de trabajo, sin mostrarse en la web.
- Portada con una introducción más clara al artista y tres recorridos equilibrados. Cabecera horizontal sobre blanco, menú móvil y fotografías completas.
- 221 fichas: 33 móviles, 55 esculturas, 80 pinturas y 53 dibujos. Son 39 fichas más; se conservan las referencias anteriores y se reúnen las distintas perspectivas.
- 34 álbumes, siete más: cinco exposiciones y dos conjuntos de proceso. Fondo Naturaleza Móviles completo en sus 237 fotografías revisadas.
- Archivo visual general con 1.153 registros versionados y 147 fotografías adicionales en la revisión privada local: 1.300 imágenes disponibles localmente. Filtros de ámbito, disciplina y colección, búsqueda, ampliación y enlaces a todos los contextos.
- Arte infantil con un directorio visual de obras, talleres, formación docente, exposiciones y textos; cinco colecciones de obras, cuatro álbumes de talleres, tres de formación y ocho de exposiciones. Las exposiciones de participantes adultos se distinguen de las infantiles.
- Exposiciones clasificadas entre obra propia, colectivas, arte infantil y formación docente, con búsqueda por nombre, lugar o fecha.
- Trayectoria de 16 entradas: imagen fija a la izquierda y lista a la derecha, cambio por desplazamiento o enfoque, búsqueda de etapas/años, controles de anterior/siguiente y acceso al detalle. Los siete capítulos conservan sus enlaces y cuentan con navegación interna.
- Eliminadas las apariciones de tarjetas con desplazamiento. Sustitución de imágenes sin dejar el panel vacío durante la carga.

## Documentación y límites

La revisión está explicada en [REVISION-0.4.0.md](REVISION-0.4.0.md). Se revisaron 28 hojas de contacto con 884 entradas, con solapamientos entre fondos y revisiones anteriores, además de comparaciones de fichas y documentos. No se afirma haber revisado individualmente todo el fondo de 15.266 archivos.

Los nombres de obras y las familias siguen siendo descripciones editoriales provisionales. Las fechas se publican cuando hay documentación, indicando si proceden del título de una carpeta. Continúan pendientes técnicas, medidas, títulos originales, algunas autorías y datos de contacto. La serie astrológica permanece en reserva. No se han modificado los originales.

Las imágenes de participantes añadidas se mantienen en dist/review y dist/local-gallery.json, fuera de Git, con procedencia privada. El repositorio público contiene únicamente los recursos seleccionados para ese ámbito. La web se publica mediante GitHub Pages, exclusivamente desde `dist/`.

La edición y mejora individual incluye las 80 imágenes principales y 80 miniaturas revisadas de pintura, doce imágenes principales de móviles y las 16 vistas históricas de «Evolución 1984–2004». El resto de vistas y categorías continúa pendiente para fases posteriores.

## Comprobaciones

npm run check valida las fichas, agrupaciones, recursos, procedencias, autorías educativas y enlaces, además del archivo visual: copias exactas, páginas PDF distintas, filtros combinados en un mismo contexto y búsqueda sin tildes. Sintaxis comprobada.

En navegador se verificaron la portada, trayectoria y búsqueda por año, acceso a exposición, filtros y carga progresiva de imágenes, visor con flechas y Escape, menú móvil y nueve recorridos a 320 píxeles sin desbordamiento. Se revisaron también escritorio y 390 píxeles.

## Guardado

Rama de corrección: feat/moviles-exteriores-profesional, creada desde la revisión de pintura. Conserva intactos los originales y las versiones anteriores. Esta entrega se guarda en Git; los archivos de revisión y fotografías privadas continúan fuera del repositorio público.
