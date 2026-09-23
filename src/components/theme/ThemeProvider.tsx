"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  nextTheme,
  normalizeTheme,
  type Theme,
} from "@/lib/theme"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  cycleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const THEME_EVENT = "valleo:themechange"

/**
 * `<html data-theme>` is the single source of truth — the inline head script
 * writes it before first paint, so React reads the attribute rather than
 * keeping a second copy that could disagree with what is on screen.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(THEME_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    () => normalizeTheme(document.documentElement.dataset.theme),
    () => DEFAULT_THEME,
  )

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Private mode or blocked storage: the theme still applies for this visit.
    }
    window.dispatchEvent(new Event(THEME_EVENT))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      cycleTheme: () => setTheme(nextTheme(theme)),
    }),
    [theme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }
  return context
}
