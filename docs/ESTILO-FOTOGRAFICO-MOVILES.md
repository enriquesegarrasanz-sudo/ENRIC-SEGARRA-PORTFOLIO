# Estilo fotográfico de móviles

## Dirección visual

Las versiones expositivas se presentan sobre un fondo continuo blanco frío-neutro, sin juntas, manchas, mobiliario ni señales del espacio doméstico. La referencia cromática fijada por el usuario tiene un blanco dominante RGB `245, 246, 247` (`#F5F6F7`) y una caída gris mínima en los bordes. La luz imita un montaje profesional de galería: fuente amplia y difusa, caída suave, sombras controladas, balance de blancos neutro y separación clara entre la obra y el fondo.

El resultado debe parecer una fotografía de catálogo de una exposición contemporánea de primer nivel: sobria, silenciosa y fiel a la materialidad de la pieza. No se añaden peanas, cartelas, textos ni elementos escenográficos.

## Invariantes de conservación

- La obra no se rediseña, repara ni embellece.
- Se conservan geometría, proporciones, silueta, encuadre, punto de vista y posición de suspensión.
- Se conservan el número y la posición de tubos, varillas, figuras, remaches, alambres y demás componentes.
- Se mantienen color, desgaste, pátina, uniones, bordes, aberturas y defectos artesanales reales.
- Solo cambian el fondo, la iluminación, la exposición, el balance de color y la limpieza fotográfica.
- Los originales y las versiones anteriores permanecen intactos y trazables.

## Encuadre común para la web

- Lienzo vertical `2:3` para las portadas de móviles.
- Obra completa centrada ópticamente en ambos ejes, con márgenes amplios y constantes.
- La escala se ajusta a la forma real: alrededor del 62 % de la altura para piezas habituales y hasta el 78 % para piezas excepcionalmente estrechas y altas.
- En vistas giradas se conserva el punto de vista, pero no cambian el lienzo, el centro óptico ni el criterio de márgenes.
- Las vistas de detalle pueden conservar su recorte intencional, siempre centradas y con el mismo fondo.

## Prompt base

```text
Use case: precise-object-edit
Asset type: museum portfolio artwork photograph for a high-end gallery website
Input images: Image 1 is the sole edit target
Primary request: Retouch this existing photograph so it looks professionally photographed for a top-tier contemporary art exhibition in New York. Replace only the poor room background and amateur lighting with the exact clean cool-neutral background of the approved reference and refined museum-grade studio lighting. Use RGB 245,246,247 (#F5F6F7) as the dominant background white, with only the reference's minimal gray edge falloff.
Subject: the exact suspended artwork shown in Image 1
Composition/framing: preserve the exact camera viewpoint, orientation, suspension position, visible hanging wires and all spatial relationships; use a 2:3 portrait canvas; show the complete artwork when the source is a complete view; center it optically with balanced consistent margins
Lighting/mood: large diffused softbox illumination, soft controlled falloff, subtle realistic shadow, neutral white balance, excellent material detail and tonal separation, quiet premium exhibition catalogue aesthetic
Color palette: faithful original artwork colors; exact cool-neutral #F5F6F7 dominant background white; no cream, ivory, beige or yellow cast
Materials/textures: preserve the artwork's real paint, wear, patina, edges, joints, cords and handmade imperfections exactly
Constraints: change only background, illumination, exposure balance, color balance and photographic cleanup; keep the artwork geometry, count and placement of every component, wires, colors, surface marks, proportions and silhouette unchanged; remove wall or ceiling seams, room fixtures, blemishes, hotspots, harsh shadows, noise and amateur-room cues; no new object, no pedestal, no labels, no text, no watermark; do not beautify, repair, redesign or invent any part of the artwork.
```

## Primera tanda

MOV-001 a MOV-006 utilizan archivos `gallery-*` nuevos para la imagen principal y su miniatura. Las demás vistas de cada ficha conservan por ahora las fotografías anteriores.
