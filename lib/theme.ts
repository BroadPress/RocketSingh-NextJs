export const THEME_STORAGE_KEY = "Theme";

export type Theme = "light" | "dark";

export function getSavedTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  // Legacy toggle put `dark` on body — remove so only html.dark drives theme.
  document.body.classList.remove("dark");
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function toggleTheme(): Theme {
  const next: Theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
  applyTheme(next);
  return next;
}

export function initThemeFromStorage() {
  applyTheme(getSavedTheme());
}
