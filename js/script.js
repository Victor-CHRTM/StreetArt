//////////////////////////////////////////////////////////////////////////////////
// Bouton Son - Vidéo Accueil //
const video = document.querySelector(".background-video");
const btnSound = document.querySelector(".btn-sound");

if (video && btnSound) {
  btnSound.addEventListener("click", () => {
    video.muted = !video.muted;
    btnSound.textContent = video.muted ? "🔇" : "🔊";
  });
}
//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
// Immerssion Logo //
const accueilSection = document.querySelector(".accueil");
const logoAccueil = document.querySelector(".logo_Street-Art");

if (accueilSection && logoAccueil) {
  logoAccueil.addEventListener("click", () => {
    accueilSection.classList.toggle("is-immersive");
  });
}

//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
// Navigation entre les catégories //
document.querySelectorAll(".categories img").forEach((img) => {
  img.addEventListener("click", () => {
    const target = img.alt.toLowerCase().replace(/\s/g, "-");
    document.querySelector(`#${target}`).scrollIntoView({
      behavior: "smooth",
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
/* ================================================== */
/* Scrolltelling hybride : libre + contrôlé */
/* ================================================== */

const sections = Array.from(document.querySelectorAll("section"));
let currentIndex = 0;
let isAnimating = false;

const SCROLL_THRESHOLD = 40;
let accumulatedDelta = 0;

/**
 * Scroll vers une section
 */
function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;

  isAnimating = true;
  currentIndex = index;

  sections[currentIndex].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  setTimeout(() => {
    isAnimating = false;
  }, 300);
}

/**
 * Scroll hybride
 */
window.addEventListener(
  "wheel",
  (event) => {
    if (isAnimating) {
      event.preventDefault();
      return;
    }

    const currentSection = sections[currentIndex];
    const rect = currentSection.getBoundingClientRect();

    const atTop = rect.top >= -1;
    const atBottom = rect.bottom <= window.innerHeight + 1;

    // On accumule le scroll uniquement aux limites
    if ((event.deltaY > 0 && atBottom) || (event.deltaY < 0 && atTop)) {
      event.preventDefault();
      accumulatedDelta += event.deltaY;

      if (Math.abs(accumulatedDelta) < SCROLL_THRESHOLD) return;

      const direction = accumulatedDelta > 0 ? "down" : "up";
      accumulatedDelta = 0;

      if (direction === "down") {
        scrollToSection(currentIndex + 1);
      }

      if (direction === "up") {
        scrollToSection(currentIndex - 1);
      }
    }
    // sinon → scroll NATIF (lecture du texte)
  },
  { passive: false },
);
//////////////////////////////////////////////////////////////////////////////////
