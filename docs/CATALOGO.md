# Catálogo y tratamiento del archivo

## Selección 0.2.0

177 fichas: 21 móviles, 46 esculturas, 75 pinturas y 35 dibujos. Nueve álbumes documentales. Las fichas y los álbumes utilizan 329 fotografías distintas; una imagen puede aparecer en una ficha y en un álbum que explica su contexto. Las miniaturas no cuentan como fotografías adicionales.

Cada ficha reúne una pieza o un conjunto identificado como tal. Los nombres y las agrupaciones son descripciones editoriales provisionales, no títulos ni series oficiales atribuidos al artista. Las escenas con obras de otros autores se identifican como contexto documental en sus álbumes.

Pintura y dibujo suelen conservar una sola vista; las esculturas y los móviles incluyen perspectivas, detalles o instalaciones que aportan información diferente. Las tomas casi idénticas se conservan en reserva.

## Tres niveles distintos

1. Archivo idéntico: comparación de tamaño y SHA-256 para los tamaños repetidos. 2.445 grupos con 7.540 copias redundantes entre los 15.266 archivos. Ningún original eliminado.
2. Fotografías de una misma obra: comparación visual de contornos, composición, elementos, uniones y detalles. Correspondencias registradas en `agrupacion-obras.json`.
3. Familias de obras: parecido formal no equivale a duplicación. Se conservan las composiciones diferentes dentro de agrupaciones editoriales.

Los 7.726 contenidos de archivo distintos no equivalen a 7.726 obras: incluyen documentos, actividades, referencias ajenas y distintas tomas.

## Alcance real

Se revisaron en hojas de contacto 1.499 referencias: las 608 fotografías RAW y conjuntos históricos de escultura, exposiciones, Arte-Natura, educación expositiva y material identificado de Dragonians. Se comparó además la selección completa de portadas.

Correspondencias resueltas: dibujos de «Nueva carpeta (2)» presentes en «Pintura»; el móvil de tubos rosas en interior y en el Palau de Pineda; un relieve circular con luces y fondos distintos; pinturas y relieves presentes de nuevo en montajes expositivos.

Las asignaciones son editables y necesitan contraste con el artista. La revisión visual no confirma todos los títulos, técnicas, fechas o autorías. Los capítulos son temáticos; no se han fabricado periodos históricos a partir de nombres de archivo.

## Organización privada

La carpeta `ARCHIVO_CLASIFICADO`, junto a las carpetas originales y fuera de este repositorio, contiene un índice HTML de las 15.266 referencias, categorías, decisiones, vínculos a los originales, copias exactas y agrupaciones. Las carpetas numeradas contienen índices; los originales no se movieron ni renombraron.

El inventario privado, las entrevistas, los RAW y las fotografías pendientes de identificación no se incorporan al repositorio público. Quedan otros fondos educativos, documentos y referencias por revisar individualmente. Trabajos de alumnos y referencias de terceros están separados del catálogo de obra propia. La serie astrológica sigue en reserva.

## Continuidad

- `dist/catalogue.js`: fichas, galerías, álbumes y equivalencias de enlaces.
- `dist/content.js`: identidad, contacto, capítulos y documentos iniciales.
- `docs/agrupacion-obras.json`: ficha, originales identificados y fotografías seleccionadas.
- `docs/procedencia-imagenes.json`: referencia ARC, original, transformación y dimensiones de cada recurso.

Conservar los IDs, las referencias MOV/ESC/PIN/DIB y los identificadores ARC. Al añadir una obra, asignar una referencia libre; no renumerar la colección. Si se unen fichas, conservar los enlaces anteriores con `redirects`.

Se ha aplicado orientación EXIF y reducción proporcional. No hay sustitución de fondos ni retoque creativo. La limpieza, el revelado y la presentación expositiva quedan para una fase posterior. Las versiones de calidad deben conservar el vínculo al original.
