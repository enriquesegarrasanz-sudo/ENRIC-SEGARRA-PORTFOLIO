# Estructura y modelo de contenido

La portada presenta el trabajo actual y abre el acceso a una memoria amplia. El menú es Inicio, Obra, Proceso y entorno, Trayectoria y memoria, Artista y Contacto.

## Modelo editable

| Entidad | Campos principales | Relaciones |
|---|---|---|
| Obra | id, denominación descriptiva, categoría, serie, imagen, texto, alt | Pertenece a una categoría y se vincula a un capítulo. |
| Capítulo | id, título, resumen, párrafos, imagen opcional, cita atribuida | Agrupa piezas vinculadas y puede enlazar documentos. |
| Documento visual | id, título, imagen, tipo, texto, alt | Se presenta en el archivo con su contexto y autoría. |
| Imagen | nombre del derivado, ID de archivo, ruta original relativa, transformación, dimensiones | Permite volver al original conservado fuera del repositorio. |
| Identidad | nombre provisional, correo profesional opcional, presentación | Mantiene datos personales y de contacto bajo control editorial. |

Son registros en archivos de texto, sin base de datos ni cuentas. La estructura permite trasladarlos a un gestor de contenidos más adelante conservando sus identificadores. En esta fase no hacen falta SQL, Supabase ni una API.

## Recorridos

Una pieza tiene una ficha única. Desde Obra se entra en una de cuatro colecciones; dentro se filtra por serie y se busca por texto o referencia. La ficha contiene una galería y enlaza al capítulo. La memoria se recorre por capítulos visuales, cronología o álbumes. Las galerías son matrices de imágenes con identificación ARC y miniatura. Los álbumes pertenecen a capítulos y conservan el contexto de autoría.

Capítulos: Aprender el oficio; Construir formas; Pintar otros mundos; Aprender y crear con otros; Proyectos compartidos; Exponer y abrir espacios; Seguir creando.

## Fuentes y límites

Los textos se basan en la entrevista familiar incluida en la base editorial v2 y en las aclaraciones de Enrike. Las descripciones visuales son lecturas editoriales, no títulos oficiales ni declaraciones de intención atribuidas al artista.

Las agrupaciones de pintura son provisionales. Los capítulos de proyectos y exposiciones enlazan álbumes identificados por sus carpetas de origen, con fechas y participantes pendientes de completar. La cronología distingue la fecha de nacimiento recordada en la entrevista del resto de acontecimientos sin fecha contrastada.

El archivo público incluye nueve álbumes; no reproduce el inventario familiar completo. El alcance y los criterios están documentados en CATALOGO.md.

## Dirección visual

Fondo claro cálido, títulos de lectura editorial, texto oscuro y acento terracota. Las obras aportan su propio color. Las imágenes mantienen su proporción; las páginas de memoria alternan relato, fotografías y citas reales. La edición fotográfica de calidad expositiva queda para una fase posterior.
