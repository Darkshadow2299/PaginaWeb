/* ---------- Textos en cada idioma ---------- */
const TEXT = {
  en: {
    nav_contact: "Contact",
    intro: "Architectural visualization & 3D.",
    contact_title: "Contact",
    contact_text: "Open to collaborations and new opportunities."
  },
  fr: {
    nav_contact: "Contact",
    intro: "Visualisation architecturale & 3D.",
    contact_title: "Contact",
    contact_text: "Ouvert aux collaborations et aux nouvelles opportunités."
  },
  es: {
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
