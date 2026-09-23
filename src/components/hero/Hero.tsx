"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/animation/gsap"
import { DigitalInk } from "@/components/three/DigitalInk"
import { BrushRule } from "@/components/ui/BrushRule"
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

      const timeline = gsap.timeline({ defaults: { ease: "expo.out" } })

      timeline
        .fromTo(
          "[data-hero='meta']",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.9 },
        )
        // The gate is brushed in before the name, so the reader arrives at
        // the type through it.
        .fromTo(
          "[data-hero='ink']",
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.8 },
          "-=0.6",
        )
        .fromTo(
          "[data-hero='name'] span",
          { clipPath: "inset(0 0 100% 0)", y: 44 },
          { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.4, stagger: 0.09 },
          "-=1.3",
        )
        .fromTo(
          "[data-hero='rule']",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.2 },
          "-=0.9",
        )
        .fromTo(
          "[data-hero='role']",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.9",
        )
        .fromTo(
          "[data-hero='scroll']",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.7",
        )

      // Leaving the hero: the type lifts and thins out, the gate stays behind
      // and sinks, the scroll cue drops away first. All scrubbed, so the
      // reader controls the pace.
      const exit = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      })

      exit
        .to("[data-hero='name']", { yPercent: -38, opacity: 0.12, ease: "none" }, 0)
        .to("[data-hero='rule']", { xPercent: -14, opacity: 0, ease: "none" }, 0)
        .to("[data-hero='role']", { yPercent: -120, opacity: 0, ease: "none" }, 0)
        .to("[data-hero='ink']", { yPercent: 16, scale: 1.14, ease: "none" }, 0)
        .to("[data-hero='scroll']", { opacity: 0, ease: "none" }, 0)
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-[var(--spacing-gutter)] pt-28 pb-10"
      aria-labelledby="hero-name"
    >
      {/* The gate: full bleed and quiet behind the type on small screens,
          held to the right half on large ones. */}
      <div
        data-hero="ink"
        className="pointer-events-none absolute inset-0 opacity-0 md:bottom-28 md:left-auto md:w-[50vw] md:pr-[2vw]"
      >
        <DigitalInk className="h-full w-full opacity-25 md:opacity-100" />
      </div>

      {/* Tategaki rail — one vertical column of metadata, desktop only. */}
      <div className="pointer-events-none absolute top-1/2 left-2 hidden -translate-y-1/2 lg:block">
        <p data-hero="meta" className="type-vertical opacity-0">
          鳥居 · Portfolio · {stamp}
        </p>
      </div>

      <div className="relative z-10 flex justify-end">
        <p data-hero="meta" className="type-meta opacity-0 lg:hidden">
          {stamp}
        </p>
      </div>

      <div className="relative z-10">
        <h1
          id="hero-name"
          data-hero="name"
          className="type-display text-[clamp(3.5rem,15vw,13rem)] uppercase"
        >
          <span className="block">Mar</span>
          <span className="block">Vallada</span>
        </h1>

        <div data-hero="rule" className="mt-8 max-w-[46ch]">
          <BrushRule weight="full" />
        </div>

        <p
          data-hero="role"
          className="type-label mt-7 flex flex-wrap gap-x-8 gap-y-2 opacity-0"
        >
          {profile.roles.map((role) => (
            <span key={role}>{role}</span>
          ))}
        </p>
      </div>

      <div
        data-hero="scroll"
        className="relative z-10 flex items-end justify-between opacity-0"
      >
        <p className="type-meta">
          <span aria-hidden="true">—</span> Scroll to enter
        </p>
        <p className="type-meta hidden max-w-[34ch] text-right sm:block">
          {profile.statement}
        </p>
      </div>
    </section>
  )
}
