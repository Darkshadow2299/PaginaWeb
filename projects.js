/* ============================================================
   TUS PROYECTOS (página Work)
   Para AÑADIR una imagen: copia un bloque { ... }, cambia el nombre
   del archivo (src) y el título en los 3 idiomas.
   Para CAMBIAR una imagen: sustituye el archivo en images/ (con el
   mismo nombre) o cambia "src" por el nombre nuevo.
   Para QUITAR una: borra su bloque.
   El orden de aquí es el orden en la web.
   ============================================================ */
const PROJECTS = [
  { src: "images/hillsdale-01.jpg",
    title: { en: "Hillsdale", fr: "Hillsdale", es: "Hillsdale" } },
  { src: "images/cycling-studio-01.jpg",
    title: { en: "Cycling Studio", fr: "Cycling Studio", es: "Cycling Studio" } },
  { src: "images/bano-01.jpg",
    title: { en: "Bathroom", fr: "Salle de bain", es: "Baño" } },
  { src: "images/hillsdale-02.jpg",
    title: { en: "Hillsdale — interior", fr: "Hillsdale — intérieur", es: "Hillsdale — interior" } },
  { src: "images/pasillo-01.jpg",
    title: { en: "Hallway", fr: "Couloir", es: "Pasillo" } },
  { src: "images/escorzo-01.jpg",
    title: { en: "Perspective study", fr: "Étude en perspective", es: "Estudio en escorzo" } },
  { src: "images/cocina-01.webp",
    title: { en: "Kitchen", fr: "Cuisine", es: "Cocina" } },
  { src: "images/cocina-02.webp",
    title: { en: "Kitchen — detail", fr: "Cuisine — détail", es: "Cocina — detalle" } },
  { src: "images/restaurante-01.jpg",
    title: { en: "Restaurant — washroom", fr: "Restaurant — lavabos", es: "Restaurante — lavabo" } },
  { src: "images/restaurante-02.jpg",
    title: { en: "Restaurant — entrance", fr: "Restaurant — entrée", es: "Restaurante — entrada" } },
  { src: "images/restaurante-03.jpg",
    title: { en: "Restaurant — booth", fr: "Restaurant — banquette", es: "Restaurante — banco corrido" } },
  { src: "images/restaurante-04.jpg",
    title: { en: "Restaurant — dining room", fr: "Restaurant — salle", es: "Restaurante — comedor" } },
  { src: "images/restaurante-05.jpg",
    title: { en: "Restaurant — booths", fr: "Restaurant — banquettes", es: "Restaurante — bancos corridos" } }
];

/* ---------- IMÁGENES DE PRUEBA (placeholder) ----------
   Solo para ver cómo se comporta la galería con más imágenes.
   Para quitarlas, borra todo este bloque hasta el final del archivo. */
(function addPlaceholders() {
  // Proporciones variadas: [ancho, alto]
  const sizes = [[800, 1000], [800, 600], [800, 1200], [800, 800], [800, 533],
                 [800, 1100], [800, 700], [800, 1000], [800, 600], [800, 900]];
  sizes.forEach(([w, h], i) => {
    const n = i + 1;
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
      `<rect width="100%" height="100%" fill="#d9d6cf"/>` +
      `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" ` +
      `font-family="Helvetica, Arial, sans-serif" font-size="44" letter-spacing="8" fill="#6f6f6a">IMAGEN ${n}</text>` +
      `</svg>`;
    PROJECTS.push({
      src: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg),
      title: { en: `Image ${n}`, fr: `Image ${n}`, es: `Imagen ${n}` }
    });
  });
})();
