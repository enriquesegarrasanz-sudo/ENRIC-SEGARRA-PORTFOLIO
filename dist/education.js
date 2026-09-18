// Síntesis editoriales de documentos del fondo. No son transcripciones ni citas.
export const educationSections = [
  { id: "proyecto", label: "El proyecto" },
  { id: "obras", label: "Obras infantiles" },
  { id: "talleres", label: "Talleres" },
  { id: "formacion", label: "Formación docente" },
  { id: "exposiciones", label: "Exposiciones" },
  { id: "textos", label: "Textos y propuestas" },
];
export const educationIntro = [
  "La educación artística ocupa un lugar propio en la trayectoria de Enric Segarra i Garibo. Su experiencia como escultor se traslada al aula a través del volumen, la experimentación y el encuentro con materiales cotidianos. El trabajo empieza en las manos: tocar, juntar, modelar, pintar y descubrir lo que una forma puede llegar a ser.",
  "Las obras de los niños y las niñas conservan sus soluciones, sus preguntas y su imaginación. El papel del adulto consiste en acompañar ese proceso, abrir posibilidades y preparar un entorno de trabajo. La colección reúne dibujos, relieves, ensamblajes, construcciones verticales y obras colectivas.",
  "El archivo guarda también la vida que rodea a las piezas: los talleres, la formación del profesorado y las exposiciones. Estos recorridos se presentan por separado para distinguir quién crea, qué sucede en el aula y cómo los trabajos llegan a un espacio compartido.",
];
export const educationPrinciples = [
  {
    title: "Descubrir la materia",
    text: "Tocar, comparar y transformar. El peso, la textura y la resistencia de un material participan en la forma que acaba tomando.",
  },
  {
    title: "Pensar en tres dimensiones",
    text: "Levantar, apoyar, unir y colgar. El volumen introduce el equilibrio, los huecos y la posibilidad de rodear una pieza.",
  },
  {
    title: "Dar espacio a la imaginación",
    text: "Acompañar las decisiones de cada participante y aceptar soluciones distintas dentro de una misma experiencia de trabajo.",
  },
  {
    title: "Compartir lo aprendido",
    text: "Trabajar juntos, mirar las producciones de los demás y preparar una exposición son también parte de la experiencia artística.",
  },
];
export const educationDescriptions = {
  obras:
    "Dibujos, relieves, tótems, móviles y composiciones colectivas. Las obras pertenecen a los participantes de las actividades educativas; se conservan separadas del catálogo personal de Enric.",
  talleres:
    "De los materiales a las obras terminadas: la experiencia de hacer, descubrir y compartir dentro del aula.",
  formacion:
    "Cursos y ejercicios de participantes adultos. Un recorrido por la experimentación que acompaña a la enseñanza de las artes plásticas.",
  exposiciones:
    "La obra sale del taller. Salas, centros educativos y muestras que permiten mirar las producciones en relación con otras piezas y con el espacio.",
  textos:
    "Ideas y propuestas conservadas en el fondo educativo. Estas lecturas son síntesis editoriales de los documentos, con sus autorías y referencias.",
};
export const readings = [
  {
    id: "volumen-educacion-infantil",
    title: "El volumen en la educación infantil",
    subtitle: "Una aproximación a la metodología plástica tridimensional",
    authors: "Amparo Fosati y Enric Segarra i Garibo",
    reference: "ARC-004287",
    kind: "Texto pedagógico",
    image: "arc-002663",
    intro:
      "Una reflexión sobre el lugar de la experiencia tridimensional en la educación infantil: conocer el espacio a través del cuerpo, las manos y los materiales.",
    sections: [
      [
        "El espacio se descubre haciendo",
        "La aproximación al volumen parte de una experiencia directa. Antes de representar un objeto, el niño lo toca, lo sostiene, lo gira y descubre sus posibilidades. Las relaciones entre cuerpo, objeto y espacio forman parte de ese aprendizaje.",
      ],
      [
        "Modelar y construir",
        "El documento distingue procedimientos que permiten investigar la forma desde acciones diferentes. Modelar implica transformar una materia; construir supone reunir y relacionar elementos. Ambos caminos abren problemas de equilibrio, tamaño, textura y organización espacial.",
      ],
      [
        "Los materiales como posibilidad",
        "La variedad de materiales amplía la experiencia. Los objetos cotidianos y los elementos recuperados introducen formas que pueden combinarse y recibir nuevos significados. Su interés educativo depende también de cómo se ofrecen, del tiempo para explorarlos y del acompañamiento del adulto.",
      ],
      [
        "Acompañar sin cerrar el resultado",
        "La propuesta presta atención al proceso y a las soluciones propias de cada participante. El adulto organiza condiciones de trabajo, propone experiencias y observa lo que sucede. Las producciones conservan el valor de esa investigación y no se reducen a la reproducción de una forma predeterminada.",
      ],
    ],
    related: "infantil-totems",
  },
  {
    id: "escultura-para-los-ninos",
    title: "¿Qué es la escultura para los niños?",
    subtitle: "La percepción del volumen en niños de Educación Infantil",
    authors: "Amparo Fosati y Enric Segarra i Garibo",
    reference: "ARC-004744",
    kind: "Texto pedagógico",
    image: "arc-014345",
    intro:
      "Mirar la escultura desde la infancia significa atender al modo en que se perciben los objetos y se descubre su presencia en el espacio.",
    sections: [
      [
        "Una forma tiene más de una cara",
        "Una escultura invita a desplazarse y a cambiar de punto de vista. Frente a una imagen plana, el volumen conserva lados que no pueden verse al mismo tiempo. Esa condición hace del movimiento una parte del conocimiento de la pieza.",
      ],
      [
        "Percibir, tocar, transformar",
        "La percepción se relaciona con la acción. Manipular materiales permite reconocer diferencias y comprobar qué ocurre al apilar, unir o modificar un objeto. Las decisiones plásticas nacen de ese diálogo con la materia.",
      ],
      [
        "La experiencia del aula",
        "La educación escultórica necesita ocasiones para explorar. La disposición del espacio, los materiales disponibles y la conversación alrededor de los trabajos ayudan a construir esa experiencia. Las imágenes del archivo muestran muchas respuestas posibles, sin convertir una de ellas en la solución que todos deban alcanzar.",
      ],
    ],
    related: "infantil-relieves",
  },
  {
    id: "escultura-medio-ambiental",
    title: "Escultura medioambiental",
    subtitle: "Una propuesta para crear a partir de materiales recuperados",
    authors: "Proyecto presentado por Enric Segarra i Garibo",
    reference: "ARC-004288",
    kind: "Propuesta de actividad",
    image: "arc-013625",
    intro:
      "Un proyecto que relaciona creación plástica, reutilización de materiales y trabajo compartido. Se presenta como propuesta documentada, sin dar por realizada cada actividad prevista.",
    sections: [
      [
        "Otra mirada sobre lo cotidiano",
        "La propuesta invita a reconocer posibilidades plásticas en elementos cercanos y recuperados. El cambio comienza al observar su forma y al imaginar relaciones nuevas entre ellos.",
      ],
      [
        "Construir juntos",
        "El trabajo reúne decisiones sobre estructura, color y composición. La cooperación permite abordar construcciones que requieren acordar cómo se sostienen y cómo se relacionan sus partes.",
      ],
      [
        "La exposición como encuentro",
        "La presentación final de las piezas forma parte de la propuesta. Mostrar lo realizado abre un espacio para explicar el proceso, compartir descubrimientos y conversar sobre los materiales utilizados.",
      ],
    ],
    related: "infantil-colectivo",
  },
  {
    id: "exposiciones-educacion",
    title: "El arte infantil encuentra una sala",
    subtitle: "Documentos de exposición y circulación de la colección",
    authors: "Archivo de educación artística",
    reference: "ARC-004739",
    kind: "Documento de archivo",
    image: "arc-012174",
    intro:
      "Un documento permite situar una de las exposiciones con fechas precisas y distinguirla de las imágenes que todavía necesitan identificación.",
    sections: [
      [
        "Valencia, mayo de 2005",
        "El documento anuncia una exposición de arte infantil entre el 24 de mayo y el 3 de junio de 2005 en la Escuela Universitaria de Magisterio Ausiàs March de Valencia, Universitat de València. El dossier fotográfico de la muestra conserva las construcciones y los paneles instalados en el centro.",
      ],
      [
        "Una colección que circula",
        "La misma documentación conserva una referencia a Arte infantil dentro de Arts Plàstiques ’06 del SARC. Esa entrada acredita la presencia de la propuesta en el programa; no se utiliza como prueba de que todas las sedes previstas llegaran a acogerla.",
      ],
      [
        "Relacionar imágenes y documentos",
        "Las fotografías de Casa Abadía, las Mostres d’art, Bellas Artes y los centros educativos se organizan en álbumes propios. Cuando una fecha procede únicamente de una carpeta, se indica. Las copias compartidas entre carpetas se contrastan antes de separar acontecimientos.",
      ],
    ],
    related: "educacion-paneles",
  },
];
