# Estado de la versión 0.4.0

17 de septiembre de 2026.

## Ajuste visual · 18 de septiembre de 2026

- La portada se concentra en una selección de obra, sin retrato: un móvil suspendido, dos esculturas, una pintura y la relación de la obra con la naturaleza forman una única composición. El nombre del artista y los accesos permanecen deliberadamente secundarios. Los recorridos inferiores conservan imágenes grandes y rótulos breves.
- El índice de Arte infantil se presenta como un mosaico de cinco accesos, con fotografías horizontales y la misma jerarquía editorial del índice de Exposiciones. La imagen inicial es ahora una composición colectiva; «Textos y propuestas» se muestra como «Ideas para crear», sin retirar los documentos vinculados.
- Rehechas las fotografías de catálogo de dibujo que presentaban cortes demasiado ajustados. Las nuevas versiones muestran la hoja o el marco completos, respetan las piezas verticales y corrigen la iluminación de forma global, sin alterar los trazos, firmas ni originales.
- El índice de Arte infantil presenta sus cinco apartados mediante bloques con imágenes horizontales grandes, contadores y llamadas a explorar.
- «Textos y propuestas» muestra una imagen de referencia por lectura antes de entrar al documento, reduciendo la dependencia del texto para orientarse.
- Se mantienen IDs, galerías, autorías, referencias y enlaces existentes.

## Entregado

- Índice de exposiciones rediseñado como recorrido horizontal: cada archivo presenta una vista amplia y completa de la sala, su tipo, lugar y fecha cuando constan, un breve contexto y el acceso a todas sus fotografías. Se mantienen filtros y búsqueda, con una composición de una columna en móvil.
- Retirado «Móviles · Palau de Pineda» del índice público, del archivo visual y de la trayectoria. El enlace histórico redirige al apartado de exposiciones.
- Unificado el archivo de la Sala d’Exposicions de les Belles Arts: 101 fotografías procedentes de arte infantil, una muestra colectiva y «Evolución 1984–2004». Los tres contextos se conservan dentro de la misma página con sus atribuciones diferenciadas; los antiguos enlaces llevan al nuevo archivo de sala.
- Álbum «Escultura · Palacio Colomina» renovado con siete versiones fotográficas profesionales, nuevos encuadres editoriales y miniaturas. Se preservan los archivos ARC originales y queda registrada cada transformación; la escultura negra de alambre se muestra completa.
- Restauradas las 16 fotografías del álbum «Evolución 1984–2004» mediante un revelado no generativo y reproducible: iluminación y color equilibrados, sombras recuperadas, ruido reducido, ampliación proporcional y grano fino. No se reconstruyen ni alteran las obras fotografiadas.
- Primera tanda fotográfica expositiva aplicada a las seis primeras fichas de móviles (MOV-001 a MOV-006): fondo continuo blanco cálido, luz difusa coherente y nuevas miniaturas. Los originales y las versiones previas permanecen conservados y trazables.
- Retirado el apartado «Proceso y entorno» de la navegación, la portada, la trayectoria y el archivo público. Sus agrupaciones editoriales se conservan en los datos de trabajo, sin mostrarse en la web.
- Portada con una introducción más clara al artista y tres recorridos equilibrados. Cabecera horizontal sobre blanco, menú móvil y fotografías completas.
- 221 fichas: 33 móviles, 55 esculturas, 80 pinturas y 53 dibujos. Son 39 fichas más; se conservan las referencias anteriores y se reúnen las distintas perspectivas.
- 31 álbumes: la Sala d’Exposicions de les Belles Arts reúne tres antiguas páginas sin perder sus contextos. Fondo Naturaleza Móviles completo en sus 237 fotografías revisadas.
- Archivo visual general con 1.226 registros versionados y 147 fotografías adicionales en la revisión privada local: 1.373 imágenes disponibles localmente. Filtros de ámbito, disciplina y colección, búsqueda, ampliación y enlaces a todos los contextos.
- Arte infantil con un directorio visual de obras, talleres, formación docente, exposiciones y textos; cinco colecciones de obras, cuatro álbumes de talleres, tres de formación y ocho de exposiciones. Las exposiciones de participantes adultos se distinguen de las infantiles.
- Exposiciones clasificadas entre obra propia, colectivas, arte infantil y formación docente, con búsqueda por nombre, lugar o fecha.
- Trayectoria de 16 entradas: imagen fija a la izquierda y lista a la derecha, cambio por desplazamiento o enfoque, búsqueda de etapas/años, controles de anterior/siguiente y acceso al detalle. Los siete capítulos conservan sus enlaces y cuentan con navegación interna.
- Eliminadas las apariciones de tarjetas con desplazamiento. Sustitución de imágenes sin dejar el panel vacío durante la carga.

## Documentación y límites

La revisión está explicada en [REVISION-0.4.0.md](REVISION-0.4.0.md). Se revisaron 28 hojas de contacto con 884 entradas, con solapamientos entre fondos y revisiones anteriores, además de comparaciones de fichas y documentos. No se afirma haber revisado individualmente todo el fondo de 15.266 archivos.

Los nombres de obras y las familias siguen siendo descripciones editoriales provisionales. Las fechas se publican cuando hay documentación, indicando si proceden del título de una carpeta. Continúan pendientes técnicas, medidas, títulos originales, algunas autorías y datos de contacto. La serie astrológica permanece en reserva. No se han modificado los originales.

Las imágenes de participantes añadidas se mantienen en dist/review y dist/local-gallery.json, fuera de Git, con procedencia privada. El repositorio público contiene únicamente los recursos seleccionados para ese ámbito. No se ha desplegado la web en un alojamiento público.

La edición y mejora individual incluye una primera tanda de seis imágenes principales de móviles y las 16 vistas históricas de «Evolución 1984–2004». El resto de vistas y categorías continúa pendiente para fases posteriores.

## Comprobaciones

npm run check valida las fichas, agrupaciones, recursos, procedencias, autorías educativas y enlaces, además del archivo visual: copias exactas, páginas PDF distintas, filtros combinados en un mismo contexto y búsqueda sin tildes. Sintaxis comprobada.

En navegador se verificaron la portada, trayectoria y búsqueda por año, acceso a exposición, filtros y carga progresiva de imágenes, visor con flechas y Escape, menú móvil y nueve recorridos a 320 píxeles sin desbordamiento. Se revisaron también escritorio y 390 píxeles.

## Guardado

Rama: archivo-completo-trayectoria-20260917. El estado anterior se conserva en 58432b4 y en los respaldos 0.3.0. Esta entrega se guarda en Git y en una copia privada complementaria dentro de COPIAS_SEGURIDAD_WEB. Los archivos de revisión, fotografías privadas y sus relaciones forman parte de esa copia local, no del repositorio público.
