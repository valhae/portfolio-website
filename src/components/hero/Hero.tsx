"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { useRef } from "react"
import { DigitalInk } from "@/components/three/DigitalInk"
import { profile } from "@/lib/content/profile"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"

export function Hero({ stamp }: { stamp: string }) {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set("[data-hero]", { opacity: 1, clipPath: "inset(0% 0 0 0)", y: 0 })
        return
      }

      const timeline = gsap.timeline({
        defaults: { ease: "expo.out" },
      })

      timeline
        .fromTo(
          "[data-hero='meta']",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.9 },
        )
        .fromTo(
          "[data-hero='name'] span",
          { clipPath: "inset(0 0 100% 0)", y: 40 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 1.4,
            stagger: 0.09,
          },
          "-=0.55",
        )
        .fromTo(
          "[data-hero='role']",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.9",
        )
        .fromTo(
          "[data-hero='rule']",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, transformOrigin: "left center" },
          "-=0.9",
        )
        .fromTo(
          "[data-hero='ink']",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1.6 },
          "-=1.1",
        )
        .fromTo(
          "[data-hero='scroll']",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.8",
        )
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between px-[var(--spacing-gutter)] pt-28 pb-10"
      aria-labelledby="hero-name"
    >
      <div
        data-hero="ink"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46vw] opacity-0 md:block"
      >
        <DigitalInk className="h-full w-full" />
      </div>

      <div className="relative flex justify-end">
        <p data-hero="meta" className="type-meta opacity-0">
          {stamp}
        </p>
      </div>

      <div className="relative">
        <h1
          id="hero-name"
          data-hero="name"
          className="type-display text-[clamp(3.5rem,15vw,13rem)] uppercase"
        >
          <span className="block">Mar</span>
          <span className="block">Vallada</span>
        </h1>

        <div
          data-hero="rule"
          className="rule mt-8 max-w-[52ch] origin-left"
          role="presentation"
        />

        <p
          data-hero="role"
          className="type-label mt-6 flex flex-wrap gap-x-8 gap-y-2 opacity-0"
        >
          {profile.roles.map((role) => (
            <span key={role}>{role}</span>
          ))}
        </p>
      </div>

      <div
        data-hero="scroll"
        className="relative flex items-end justify-between opacity-0"
      >
        <p className="type-meta">Scroll to enter</p>
        <p className="type-meta hidden max-w-[34ch] text-right sm:block">
          {profile.statement}
        </p>
      </div>
    </section>
  )
}
