"use client"

import { useRef } from "react"
import { getLenis } from "@/components/shell/SmoothScroll"
import { gsap, useGSAP } from "@/lib/animation/gsap"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"
import { skills } from "@/lib/content/skills"

/**
 * A running band of technology names. It drifts on its own, but scroll speed
 * drives it: fast scrolling accelerates the band and reverses it when you
 * scroll back up, so the page's motion and the reader's motion agree.
 */
export function TechMarquee() {
  const root = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const names = skills.map((skill) => skill.name)

  useGSAP(
    () => {
      if (reducedMotion) return
      const track = root.current?.querySelector("[data-track]")
      if (!track) return

      // The list is rendered twice, so -50% lands exactly on a seam.
      const drift = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 38,
        repeat: -1,
      })

      const lenis = getLenis()
      if (!lenis) return

      const onScroll = ({ velocity }: { velocity: number }) => {
        const scaled = gsap.utils.clamp(-6, 6, 1 + velocity * 0.12)
        gsap.to(drift, {
          timeScale: scaled === 0 ? 1 : scaled,
          duration: 0.4,
          overwrite: true,
        })
      }

      lenis.on("scroll", onScroll)
      return () => lenis.off("scroll", onScroll)
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="relative overflow-hidden border-y border-line py-6"
    >
      <div data-track className="flex w-max gap-10 will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-10">
            {names.map((name) => (
              <span key={`${copy}-${name}`} className="type-label whitespace-nowrap">
                {name}
                <span className="ml-10 opacity-40">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
