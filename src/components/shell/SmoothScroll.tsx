"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { usePathname } from "next/navigation"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"

let lenisInstance: Lenis | null = null

/** One scroll source of truth for the whole app. */
export function getLenis() {
  return lenisInstance
}

export function SmoothScroll() {
  const pathname = usePathname()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.05,
      // Keyboard and wheel stay native-feeling; only the easing is ours.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: false,
    })
    lenisInstance = lenis

    lenis.on("scroll", ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [reducedMotion])

  // A route change replaces the DOM: measured positions have to be recomputed.
  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true })
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
