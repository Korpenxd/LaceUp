

(() => {
"use strict";

/* -------------------------
   HERO IMAGE ROTATION
-------------------------- */

const heroImages = [
  "img/hero1.webp",
  "img/hero2.webp",
  "img/hero3.webp",
  "img/hero4.webp",
  "img/hero5.webp",
  "img/hero6.webp",
  "img/hero7.webp",
  "img/hero8.webp"
];

let heroIndex = 0;
let heroInterval = null;
const heroImg = document.getElementById("hero-rotator");
const isDesktop = window.innerWidth > 768;

function startHeroRotation() {
  if (!heroImg || heroInterval) return;

  heroInterval = setInterval(() => {
    const nextIndex = (heroIndex + 1) % heroImages.length;
    const nextImage = new Image();

    nextImage.src = heroImages[nextIndex];
    nextImage.onload = () => {
      heroImg.style.opacity = 0;

      setTimeout(() => {
        heroImg.src = nextImage.src;
        heroImg.style.opacity = 1;
        heroIndex = nextIndex;
      }, 500);
    };
  }, 5000);
}

function stopHeroRotation() {
  if (heroInterval) {
    clearInterval(heroInterval);
    heroInterval = null;
  }
}

if (heroImg) startHeroRotation();

document.addEventListener("visibilitychange", () => {
  document.hidden ? stopHeroRotation() : startHeroRotation();
});

/* -------------------------
   FADE-UP ANIMATIONS
-------------------------- */

const fadeElements = document.querySelectorAll(".fade-up");

if (fadeElements.length) {
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06 }
  );

  fadeElements.forEach(el => fadeObserver.observe(el));
}

/* -------------------------
   SMOOTH ANCHOR SCROLL
-------------------------- */

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* -------------------------
   CURRENT YEAR
-------------------------- */

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* -------------------------
   AUTO-EXPANDING TEXTAREA
-------------------------- */

const textarea = document.querySelector('textarea[name="Meddelande"]');
if (textarea) {
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });
}

/* -------------------------
   OPENING HOURS
-------------------------- */

const hours = [
  { day: 0, open: "12:00", close: "16:00" },
  { day: 1, open: "11:00", close: "16:00" },
  { day: 2, open: "11:00", close: "16:00" },
  { day: 3, open: "10:00", close: "20:00" },
  { day: 4, open: "10:00", close: "20:00" },
  { day: 5, open: "10:00", close: "20:00" },
  { day: 6, open: "13:00", close: "17:00" }
];

const now = new Date();
const today = now.getDay();
const minsNow = now.getHours() * 60 + now.getMinutes();
const todayData = hours.find(h => h.day === today);

if (todayData) {
  const openM =
    parseInt(todayData.open.slice(0, 2)) * 60 +
    parseInt(todayData.open.slice(3));
  const closeM =
    parseInt(todayData.close.slice(0, 2)) * 60 +
    parseInt(todayData.close.slice(3));

  const isOpen = minsNow >= openM && minsNow < closeM;

  document.querySelectorAll(".opening-hours li").forEach(li => {
    if (+li.dataset.day === today) li.classList.add("today");
  });

  const badge = document.getElementById("open-status");
  if (badge) {
    badge.textContent = isOpen ? "Öppet nu" : "Stängt";
    badge.classList.add(isOpen ? "status-open" : "status-closed");
  }
}

/* -------------------------
   CONTACT FORM (DEMO)
-------------------------- */

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Tack för ditt meddelande! Vi kontaktar dig snart.");
    contactForm.reset();
  });
}

/* -------------------------
   GOOGLE MAPS – LAZY LOAD ON SCROLL
-------------------------- */

const mapContainer = document.getElementById("map-container");

if (mapContainer) {
  const mapObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          mapContainer.innerHTML = `
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3370.7089617150336!2d12.530963!3d57.929961!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4645527df88583ed%3A0x467585d2f5965d40!2sNorra%20Str%C3%B6mgatan%2016%2C%20441%2030%20Alings%C3%A5s!5e1!3m2!1sen!2sse!4v1765717259627!5m2!1sen!2sse"
              width="100%"
              height="100%"
              style="border:0;border-radius:12px;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
              title="Lace Up på Google Maps">
            </iframe>
          `;
          mapObserver.disconnect();
        }
      });
    },
    { rootMargin: "200px" }
  );

  mapObserver.observe(mapContainer);
}
})();

