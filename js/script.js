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
/* ================================================== */
/* Scrolltelling hybride : libre + contrôlé */
/* ================================================== */
const sections = Array.from(document.querySelectorAll("section"));
let isAnimating = false;

const SCROLL_THRESHOLD = 60;
let accumulatedDelta = 0;

/**
 * Trouve la section actuellement visible
 */
function getCurrentSectionIndex() {
  const viewportMiddle = window.innerHeight / 2;

  return sections.findIndex((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= viewportMiddle && rect.bottom >= viewportMiddle;
  });
}

/**
 * Scroll vers une section
 */
function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;

  isAnimating = true;

  sections[index].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  setTimeout(() => {
    isAnimating = false;
  }, 400);
}

window.addEventListener(
  "wheel",
  (event) => {
    if (isAnimating) {
      event.preventDefault();
      return;
    }

    const currentIndex = getCurrentSectionIndex();
    if (currentIndex === -1) return;

    const currentSection = sections[currentIndex];
    const rect = currentSection.getBoundingClientRect();

    const tolerance = 40;
    const atTop = rect.top >= -tolerance;
    const atBottom = rect.bottom <= window.innerHeight + tolerance;

    // Si on n'est PAS à une limite → scroll natif
    if ((event.deltaY > 0 && !atBottom) || (event.deltaY < 0 && !atTop)) {
      accumulatedDelta = 0;
      return;
    }

    event.preventDefault();
    accumulatedDelta += event.deltaY;

    if (Math.abs(accumulatedDelta) < SCROLL_THRESHOLD) return;

    const direction = accumulatedDelta > 0 ? 1 : -1;
    accumulatedDelta = 0;

    scrollToSection(currentIndex + direction);
  },
  { passive: false },
);

//////////////////////////////////////////////////////////////////////////////////
// Navigation scroll via le bouton
document.addEventListener("DOMContentLoaded", () => {
  const indicators = document.querySelectorAll(".scroll-indicator");
  const sections = document.querySelectorAll(".story-section");

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      // Section parente la plus proche
      const currentSection = indicator.closest(".story-section");
      if (!currentSection) return;

      // Index de la section actuelle
      const currentIndex = Array.from(sections).indexOf(currentSection);

      // Section suivante
      const nextSection = sections[currentIndex + 1];
      if (!nextSection) return;

      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
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
// MENU LATÉRAL

const sideMenu = document.querySelector(".side-menu");
const toggleBtn = document.querySelector(".side-menu-toggle");

if (sideMenu && toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = sideMenu.classList.toggle("open");
    toggleBtn.textContent = isOpen ? ">" : "<";
  });
}

const storySections = document.querySelectorAll(".story-section");

if (storySections.length > 0 && sideMenu) {
  window.addEventListener("scroll", () => {
    const firstSectionBottom = storySections[0].getBoundingClientRect().bottom;

    if (firstSectionBottom < window.innerHeight * 0.6) {
      sideMenu.classList.remove("hidden");
    } else {
      sideMenu.classList.add("hidden");
      sideMenu.classList.remove("open");
    }
  });
}
//////////////////////////////////////////////////////////////////////////////////
