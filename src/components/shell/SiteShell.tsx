"use client"

import type { ReactNode } from "react"
import { Cursor } from "@/components/cursor/Cursor"
import { Navigation } from "@/components/navigation/Navigation"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { Grain } from "@/components/texture/Grain"
import { InkFilters } from "@/components/ui/InkFilters"
import { Footer } from "./Footer"
import { ScrollProgress } from "./ScrollProgress"
import { SmoothScroll } from "./SmoothScroll"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll />
      <InkFilters />
      <ScrollProgress />
      <Grain />
      <Cursor />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-background focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  )
}
