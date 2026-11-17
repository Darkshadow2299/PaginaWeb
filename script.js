/* ---------- Textos en cada idioma ---------- */
const TEXT = {
  en: {
    nav_about: "About",
    about_title: "About me",
    about_p1: "I'm Mauricio, an architectural visualization artist with a Master's degree in the field and a background in 3D animation and interactive environments.",
    about_p2: "What I enjoy most about this sector is turning an idea into an image: working with light, materials and composition until a space feels real and tells a story. Photography and architecture are the two passions that feed my work.",
    about_p3: "I'm currently deepening my skills in BIM and Blender, always looking for ways to make my visuals more precise and more atmospheric.",
    nav_contact: "Contact",
    intro: "Architectural visualization & 3D.",
    contact_title: "Contact",
    contact_text: "Open to collaborations and new opportunities."
  },
  fr: {
    nav_about: "À propos",
    about_title: "À propos de moi",
    about_p1: "Je suis Mauricio, artiste en visualisation architecturale, titulaire d'un master dans ce domaine, avec une formation en animation 3D et en environnements interactifs.",
    about_p2: "Ce que j'aime le plus dans ce secteur, c'est transformer une idée en image : travailler la lumière, les matériaux et la composition jusqu'à ce qu'un espace paraisse réel et raconte une histoire. La photographie et l'architecture sont les deux passions qui nourrissent mon travail.",
    about_p3: "Je perfectionne actuellement mes compétences en BIM et en Blender, toujours à la recherche de visuels plus précis et plus atmosphériques.",
    nav_contact: "Contact",
    intro: "Visualisation architecturale & 3D.",
    contact_title: "Contact",
    contact_text: "Ouvert aux collaborations et aux nouvelles opportunités."
  },
  es: {
    nav_about: "Sobre mí",
    about_title: "Sobre mí",
    about_p1: "Soy Mauricio, artista de visualización arquitectónica, con un máster en este campo y formación en animación 3D y entornos interactivos.",
    about_p2: "Lo que más me gusta de este sector es convertir una idea en imagen: trabajar la luz, los materiales y la composición hasta que un espacio parezca real y cuente una historia. La fotografía y la arquitectura son las dos pasiones que alimentan mi trabajo.",
    about_p3: "Actualmente profundizo en BIM y Blender, siempre buscando que mis imágenes sean más precisas y más atmosféricas.",
    nav_contact: "Contacto",
    intro: "Visualización arquitectónica y 3D.",
    contact_title: "Contacto",
    contact_text: "Abierto a colaboraciones y nuevas oportunidades."
  }
};

let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
if (!TEXT[lang]) lang = "en";

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbCap = document.getElementById("lb-cap");
let current = 0;

/* ---------- Galería ---------- */
function buildGallery() {
  gallery.innerHTML = "";
  PROJECTS.forEach((p, i) => {
    const fig = document.createElement("figure");
    const img = document.createElement("img");
    img.src = p.src;
    img.alt = p.title[lang] || p.title.en;
    img.loading = "lazy";
    const cap = document.createElement("figcaption");
    cap.textContent = img.alt;
    fig.append(img, cap);
    fig.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(fig);
    revealObserver.observe(fig);
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.08 });

/* ---------- Idioma ---------- */
function setLang(l) {
  lang = l;
  try { localStorage.setItem("lang", l); } catch (e) {}
  document.documentElement.lang = l;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = TEXT[l][el.dataset.i18n];
  });
  document.querySelectorAll(".langs button").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === l);
  });
  buildGallery();
  if (!lightbox.hidden) showImage(current);
}
document.querySelectorAll(".langs button").forEach((b) => {
  b.addEventListener("click", () => setLang(b.dataset.lang));
});

/* ---------- Lightbox ---------- */
function showImage(i) {
  current = (i + PROJECTS.length) % PROJECTS.length;
  const p = PROJECTS[current];
  lbImg.src = p.src;
  lbImg.alt = p.title[lang] || p.title.en;
  lbCap.textContent = lbImg.alt;
}
function openLightbox(i) { showImage(i); lightbox.hidden = false; document.body.style.overflow = "hidden"; }
function closeLightbox() { lightbox.hidden = true; document.body.style.overflow = ""; }

document.querySelector(".lb-close").addEventListener("click", closeLightbox);
document.querySelector(".lb-prev").addEventListener("click", () => showImage(current - 1));
document.querySelector(".lb-next").addEventListener("click", () => showImage(current + 1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showImage(current - 1);
  if (e.key === "ArrowRight") showImage(current + 1);
});

/* ---------- Inicio ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
setLang(lang);
