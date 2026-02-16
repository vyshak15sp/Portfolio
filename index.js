(() => {
  const root = document.body;
  const toggle = document.getElementById("theme-toggle");
  const nav = document.querySelector(".navbar");
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const navAnchorLinks = Array.from(document.querySelectorAll(".nav-links a, .nav-cta"));
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
        // Ignore storage errors for restricted contexts.
      }
    },
  };

  const savedTheme = safeStorage.get(storageKey);
  if (savedTheme === "light") {
    root.classList.add("light-theme");
  }

  const updateToggleLabel = () => {
    const isLight = root.classList.contains("light-theme");
    toggle.textContent = isLight ? "Dark" : "Light";
    toggle.setAttribute("aria-pressed", String(isLight));
  };

  toggle.addEventListener("click", () => {
    root.classList.toggle("light-theme");
    safeStorage.set(storageKey, root.classList.contains("light-theme") ? "light" : "dark");
    updateToggleLabel();
  });

  const closeMenu = () => {
    nav.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  document.querySelectorAll(".nav-links a, .nav-actions a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 640) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      closeMenu();
    }
  });

  const sectionMap = navAnchorLinks
    .map((link) => {
      const href = link.getAttribute("href");
      const section = href ? document.querySelector(href) : null;
      return { link, section };
    })
    .filter((item) => item.section);

  const markActiveLink = (activeSectionId) => {
    navAnchorLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("is-active", href === "#" + activeSectionId);
    });
  };

  const updateActiveSection = () => {
    const triggerLine = (header ? header.offsetHeight : 0) + 24;
    let activeId = sectionMap[0] ? sectionMap[0].section.id : "";
    const scrollTop = window.scrollY || window.pageYOffset;
    const viewportBottom = scrollTop + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (docHeight - viewportBottom <= 8 && sectionMap.length) {
      markActiveLink(sectionMap[sectionMap.length - 1].section.id);
      return;
    }

    sectionMap.forEach((item) => {
      if (item.section.getBoundingClientRect().top <= triggerLine) {
        activeId = item.section.id;
      }
    });

    if (activeId) {
      markActiveLink(activeId);
    }
  };

  navAnchorLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        markActiveLink(href.slice(1));
      }
    });
  });

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);

  updateToggleLabel();
  updateActiveSection();

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
  });
})();
