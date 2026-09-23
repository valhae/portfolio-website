"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/animation/gsap"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"

/** A hairline at the top edge reporting how far through the page you are. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      const node = ref.current
      if (!node || reducedMotion) return

      gsap.fromTo(
        node,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
          },
        },
      )
    },
    { dependencies: [reducedMotion] },
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[68] h-px mix-blend-difference"
    >
      <div ref={ref} className="h-full w-full origin-left scale-x-0 bg-white" />
    </div>
  )
}
