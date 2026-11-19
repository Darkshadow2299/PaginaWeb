/* ---------- Textos en cada idioma ---------- */
const TEXT = {
  en: {
    nav_work: "Work",
    nav_about: "About",
    about_title: "About me",
    about_p1: "I'm Mauricio, and I love creating images. For me, a render starts as a feeling — the way light falls across a room, the texture of a wall, a quiet corner — and my job is to make that feeling visible.",
    about_p2: "What I enjoy most is building an image from nothing: choosing the angle, shaping the light and adjusting every material until the scene feels real and tells a story. Photography and architecture are the two passions that feed my work.",
    about_p3: "I'm always experimenting and learning, looking for new ways to make my images more atmospheric and more alive.",
    nav_contact: "Contact",
    intro: "My work",
    contact_title: "Contact",
    contact_text: "Open to collaborations and new opportunities."
  },
  fr: {
    nav_work: "Travaux",
    nav_about: "À propos",
    about_title: "À propos de moi",
    about_p1: "Je suis Mauricio, et j'adore créer des images. Pour moi, un rendu commence par une sensation — la façon dont la lumière traverse une pièce, la texture d'un mur, un coin silencieux — et mon travail est de rendre cette sensation visible.",
    about_p2: "Ce que j'aime le plus, c'est construire une image à partir de rien : choisir l'angle, sculpter la lumière et ajuster chaque matériau jusqu'à ce que la scène paraisse réelle et raconte une histoire. La photographie et l'architecture sont les deux passions qui nourrissent mon travail.",
    about_p3: "J'expérimente et j'apprends sans cesse, à la recherche de nouvelles façons de rendre mes images plus atmosphériques et plus vivantes.",
    nav_contact: "Contact",
    intro: "Mon travail",
    contact_title: "Contact",
    contact_text: "Ouvert aux collaborations et aux nouvelles opportunités."
  },
  es: {
    nav_work: "Trabajos",
    nav_about: "Sobre mí",
    about_title: "Sobre mí",
    about_p1: "Soy Mauricio y me apasiona crear imágenes. Para mí, un render empieza como una sensación —cómo cae la luz en una habitación, la textura de una pared, un rincón en calma— y mi trabajo es hacer visible esa sensación.",
    about_p2: "Lo que más disfruto es construir una imagen desde cero: elegir el encuadre, modelar la luz y ajustar cada material hasta que la escena parezca real y cuente una historia. La fotografía y la arquitectura son las dos pasiones que alimentan mi trabajo.",
    about_p3: "Siempre estoy experimentando y aprendiendo, buscando nuevas formas de que mis imágenes sean más atmosféricas y más vivas.",
    nav_contact: "Contacto",
    intro: "Mi trabajo",
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
  if (!gallery) return; // esta página no tiene galería
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
  if (lightbox && !lightbox.hidden) showImage(current);
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

if (lightbox) {
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
}

/* ---------- Inicio ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
setLang(lang);
