(() => {
  const root = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const storageKey = "site-theme";
  const safeStorage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (_) {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (_) {
        // Ignore storage errors on file:// or restricted browser modes.
      }
    },
  };
  const savedTheme = safeStorage.get(storageKey);

  if (savedTheme === "light") {
    root.classList.add("light-theme");
  }

  function updateThemeLabel() {
    const isLight = root.classList.contains("light-theme");
    themeToggle.textContent = isLight ? "Dark" : "Light";
  }

  themeToggle.addEventListener("click", () => {
    root.classList.toggle("light-theme");
    safeStorage.set(storageKey, root.classList.contains("light-theme") ? "light" : "dark");
    updateThemeLabel();
  });

  updateThemeLabel();

  const track = document.getElementById("carousel-track");
  const viewport = document.querySelector(".carousel-viewport");
  const slides = Array.from(track.children);
  const dotsRoot = document.getElementById("carousel-dots");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  let index = 0;
  let autoTimer;
  const AUTOPLAY_MS = 3200;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
    dot.type = "button";
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsRoot.appendChild(dot);
  });

  const dots = Array.from(dotsRoot.children);

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = "translateX(" + index * -100 + "%)";
    dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  function stopAutoplay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    autoTimer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
  }

  viewport.addEventListener("mouseenter", stopAutoplay);
  viewport.addEventListener("mouseleave", startAutoplay);
  viewport.addEventListener("touchstart", stopAutoplay, { passive: true });
  viewport.addEventListener("touchend", startAutoplay, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  startAutoplay();

  const preview = document.getElementById("image-preview");
  const previewImg = document.getElementById("preview-img");
  const previewCaption = document.getElementById("preview-caption");
  const previewClose = document.getElementById("preview-close");
  const previewables = document.querySelectorAll(".previewable");

  function closePreview() {
    preview.classList.remove("is-open");
    preview.setAttribute("aria-hidden", "true");
    previewImg.src = "";
  }

  previewables.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (!img) return;
      previewImg.src = img.src;
      previewImg.alt = img.alt || "Preview image";
      previewCaption.textContent = item.getAttribute("data-title") || "";
      preview.classList.add("is-open");
      preview.setAttribute("aria-hidden", "false");
    });
  });

  previewClose.addEventListener("click", closePreview);
  preview.addEventListener("click", (e) => {
    if (e.target === preview) closePreview();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && preview.classList.contains("is-open")) {
      closePreview();
    }
  });
})();
