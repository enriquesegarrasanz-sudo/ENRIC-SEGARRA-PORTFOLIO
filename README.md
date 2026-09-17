# Enric Segarra — Obra y memoria

Primera estructura navegable del portfolio y de la memoria artística. Versión **0.1.0**, preparada el 17 de septiembre de 2026.

## Qué contiene

- Inicio con el trabajo actual y acceso destacado a la trayectoria.
- Obra: 11 fichas y filtros de móviles, escultura, pintura y dibujo.
- Proceso y entorno.
- Trayectoria y memoria: siete capítulos, cronología inicial y dos documentos visuales.
- Artista y contacto pendiente de completar con datos profesionales aprobados.
- Ampliación de imágenes, navegación móvil y enlaces entre obras y capítulos.

Las imágenes son copias ligeras de revisión, sin retoque creativo. Los nombres de piezas son descripciones provisionales, no títulos inventados. La cronología y las fichas se ampliarán con datos contrastados.

## Abrir la web

Requiere Node.js 22 o posterior. No necesita instalar paquetes.

```sh
npm run dev
```

Abrir `http://127.0.0.1:4173`. Para parar, usar Ctrl+C en esa terminal. El servidor sirve exclusivamente `dist/` y escucha solo en el equipo local.

También puede alojarse `dist/` en un servidor de archivos estáticos. La navegación usa fragmentos (`#/obra`, `#/memoria`), por lo que no requiere reglas especiales de redirección. Esta versión no se ha desplegado como web pública; GitHub contiene la copia del proyecto. Se mantiene `noindex` mientras se revisa.

## Dónde cambiar cada cosa

| Archivo | Contenido |
|---|---|
| `dist/content.js` | Identidad, contacto, fichas, categorías, capítulos y documentos. |
| `dist/app.js` | Estructura de las páginas, portada, enlaces e interacciones. |
| `dist/styles.css` | Colores, tipografía, márgenes y adaptación a pantallas. |
| `dist/assets/` | Copias ligeras para la web. |
| `docs/procedencia-imagenes.json` | Correspondencia de cada imagen con su original y transformación técnica. |
| `docs/ARQUITECTURA.md` | Modelo de contenido y decisiones. |
| `docs/ESTADO.md` | Comprobaciones y trabajo pendiente. |
| `AGENTS.md` | Instrucciones de continuidad y guardado para futuras sesiones. |

Para añadir una obra, crear un registro en `works` de `content.js`, asignar un `id` único, una categoría, una imagen y un capítulo existente. La galería y la ficha se generan a partir de ese registro. El nombre de la imagen se escribe sin extensión.

Para incorporar contacto, definir `site.contactEmail` con el correo profesional aprobado. Hasta entonces no hay formulario ni dirección ficticia. La sección no recoge datos personales.

## Comprobar antes de guardar

```sh
npm run check
node --check dist/app.js
node --check dist/content.js
```

La comprobación valida relaciones entre obras y capítulos, identificadores y archivos de imagen. La revisión visual y de navegación debe hacerse también en el navegador.

## Guardado y recuperación

Repositorio de destino: https://github.com/enriquesegarrasanz-sudo/ENRIC-SEGARRA-PORTFOLIO

El punto inicial se identifica con la etiqueta `v0.1.0`. Los guardados posteriores deben describir qué cambió. Para cada bloque de trabajo terminado: comprobar, revisar los archivos, crear un commit y subirlo al repositorio. Antes de cambios grandes se conserva primero el estado existente. No hay un proceso de guardado continuo ejecutándose en segundo plano.

```sh
git status
git add dist docs README.md AGENTS.md CHANGELOG.md scripts package.json .gitignore .openai
git commit -m "Describe aquí el cambio terminado"
git push
```

Para volver a consultar la primera versión sin sobrescribir el trabajo actual:

```sh
git worktree add ../ENRIC-SEGARRA-v0.1.0 v0.1.0
```

GitHub respalda el código, los textos de la web y las imágenes utilizadas. **Los aproximadamente 45 GB del fondo fotográfico original no están incluidos en esta copia.** Se mantienen en su ubicación de origen. El inventario completo y la entrevista interna tampoco forman parte del sitio público.

## Autoría y publicación

El repositorio fue indicado por la familia para conservar el trabajo. Su visibilidad es pública. No se añade una licencia de reutilización de las obras o fotografías: publicar el código de esta versión no cede derechos sobre los materiales artísticos.

No subir originales RAW, entrevistas en bruto, datos personales, imágenes de menores pendientes de permiso, obras ajenas sin atribuir, credenciales ni información de tarjetas. El tratamiento fotográfico para exposición o presentación editorial se hará posteriormente con copias y conservando la trazabilidad.
