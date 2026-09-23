"use client"

import { THEMES, themeLabels } from "@/lib/theme"
import { cn } from "@/lib/utils/cn"
import { useTheme } from "./ThemeProvider"

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className={cn("flex items-center gap-3", className)}
      role="group"
      aria-label="Visual mode"
    >
      {THEMES.map((option) => {
        const active = option === theme
        return (
          <button
            key={option}
            type="button"
            onClick={() => setTheme(option)}
            aria-pressed={active}
            className={cn(
              "type-label cursor-pointer px-1 py-1 transition-opacity duration-300",
              active ? "opacity-100" : "opacity-40 hover:opacity-80",
            )}
            data-cursor="hover"
          >
            <span aria-hidden="true">{themeLabels[option].slice(0, 2)}</span>
            <span className="sr-only">{themeLabels[option]} mode</span>
            <span
              aria-hidden="true"
              className={cn(
                "mt-1 block h-px w-full origin-left transition-transform duration-500",
                active ? "scale-x-100" : "scale-x-0",
              )}
              style={{ background: "currentColor" }}
            />
          </button>
        )
      })}
    </div>
  )
}
