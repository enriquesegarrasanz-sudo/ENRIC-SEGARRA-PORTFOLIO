# Instrucciones de continuidad

## Alcance y voz

Portfolio y memoria artística de Enric Segarra. Enrike es su hijo y promotor del proyecto. Usar el nombre público provisional Enric Segarra; no añadir apellidos ni credenciales sin confirmación.

El presente se centra en móviles y esculturas suspendidas. La trayectoria y memoria tienen protagonismo propio y deben crecer con amplitud. Conservar accesibles pintura, dibujo, escultura, educación, proyectos y gestión cultural.

## Guardado autorizado por el usuario

- Al comenzar, inspeccionar `git status` y los cambios existentes.
- Antes de un cambio importante, conservar un punto recuperable del trabajo previo y utilizar una rama cuando proceda. No incluir silenciosamente trabajo ajeno.
- Al terminar un bloque solicitado, validar, revisar los archivos, crear un commit descriptivo y subirlo a `origin`. El usuario ha pedido guardados de seguridad sin tener que solicitarlos en cada sesión.
- Para esta primera estructura, se pidió un guardado al acabar. No crear tareas programadas ni autocommits periódicos por esa instrucción.
- Confirmar que el commit remoto coincide con el local antes de afirmar que está respaldado en GitHub. Si falla, conservar la copia local e indicar el límite.
- Nunca usar push forzado, borrar historial ni descartar cambios del usuario. Preferir revertir un commit o abrir una copia con worktree para recuperar una versión.
- No cambiar la visibilidad del repositorio ni activar publicación de la web sin una petición que lo autorice.

## Contenido e imágenes

- No inventar títulos, fechas, materiales, dimensiones, exposiciones ni nombres de personas.
- Los capítulos son temáticos y pueden solaparse; no convertirlos en periodos fechados por inferencia.
- Mantener separados obra propia, trabajos de alumnos, referencias ajenas y fotografías de actividades.
- Las imágenes actuales son provisionales y conservan encuadre y proporciones. No modificar creativamente obras ni generar piezas para cubrir huecos.
- Crear nuevas versiones de imágenes y registrar el original en `docs/procedencia-imagenes.json`.
- El repositorio es público. No subir la entrevista interna, el fondo completo, datos privados ni materiales pendientes de permiso.
- La serie astrológica está pendiente de decisión y no forma parte de la selección pública.

## Desarrollo

Web estática sin dependencias de ejecución, autenticación, formularios ni base de datos. No añadir servicios externos sin necesidad. Los datos editables están en `dist/content.js`.

Preservar los IDs y enlaces de fichas y capítulos. Escapar contenido al generar HTML. No introducir datos de usuario mediante HTML sin escapar. Mantener accesibilidad de teclado, texto legible, navegación móvil y fotografías completas.

Ejecutar `npm run check`, comprobar sintaxis y probar en navegador las interacciones afectadas. No ampliar pruebas sin una razón concreta. Actualizar `CHANGELOG.md` y `docs/ESTADO.md` con cada entrega significativa.
