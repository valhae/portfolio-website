export const THEMES = ["paper", "ink", "void", "shiro"] as const

export type Theme = (typeof THEMES)[number]

export const DEFAULT_THEME: Theme = "paper"

export const THEME_STORAGE_KEY = "valleo-theme"

export const themeLabels: Record<Theme, string> = {
  paper: "Paper",
  ink: "Ink",
  void: "Void",
  shiro: "Shiro",
}

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value)
}

export function normalizeTheme(value: unknown): Theme {
  return isTheme(value) ? value : DEFAULT_THEME
}

export function nextTheme(current: Theme): Theme {
  return THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]
}

/** Runs before paint, inlined in <head>, so the correct theme is never repainted. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var v=${JSON.stringify(
  THEMES,
)};document.documentElement.dataset.theme=v.indexOf(t)>-1?t:'${DEFAULT_THEME}';}catch(e){document.documentElement.dataset.theme='${DEFAULT_THEME}';}})();`
