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
        // Ignore storage errors for restricted contexts.
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
})();
