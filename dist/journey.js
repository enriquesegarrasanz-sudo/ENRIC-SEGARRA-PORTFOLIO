// Dates identify documented episodes only. The remaining labels are thematic.
export function journeyEntries(chapters, albums, works) {
  const chapter = (id, label, image) => {
    const c = chapters.find((c) => c.id === id);
    return {
      id,
      label,
      title: c.title,
      text: c.short,
      image: image || c.image,
      path: "/memoria/" + id,
    };
  };
  const album = (id, label) => {
    const al = albums.find((a) => a.id === id);
    return {
      id,
      label,
      title: al.title,
      text: al.text,
      image: al.image,
      path: "/archivo/" + id,
    };
  };
  return [
    {
      ...chapter("aprender-oficio", "Orígenes"),
      text: "Barcelona, 1959. La formación en Bellas Artes en Valencia y el aprendizaje del oficio abren una vida dedicada a crear.",
    },
    chapter("construir-formas", "Escultura"),
    {
      id: "el-dibujo",
      label: "Dibujo",
      title: "Construir el espacio sobre el papel",
      text: "Líneas, curvas y planos de color. El dibujo investiga una presencia que se relaciona con el volumen.",
      image: works.find((w) => w.id === "dibujo-013430").image,
      path: "/obra/dibujo",
    },
    chapter("pintar-mundos", "Pintura"),
    chapter("crear-con-otros", "Educación", "arc-002472"),
    album("evolucion-belles-arts", "2005"),
    album("educacion-paneles", "2005"),
    album("caixa-castello", "2006"),
    album("signo-agua", "El agua"),
    album("dragonians-casa-libro", "Dragonians"),
    album("sant-jordi-estivella", "Estivella"),
    album("quatre", "Quatre"),
    chapter("exponer-abrir-espacios", "Las salas", "arc-009086"),
    album("pineda", "Móviles"),
    chapter("seguir-creando", "Presente", "arc-014873"),
  ];
}
