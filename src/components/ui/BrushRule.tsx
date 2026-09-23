"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/animation/gsap"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"
import { cn } from "@/lib/utils/cn"

type Props = {
  className?: string
  /** Stroke weight. "hair" for section rules, "full" for page openings. */
  weight?: "hair" | "full"
}

/**
 * A sumi brush stroke standing in for a horizontal rule: thin at the entry,
 * loaded through the middle, dry at the lift-off. The ragged edge comes from a
 * turbulence filter (see InkFilters) rather than an image, so it costs one
 * element and no request. ScrollTrigger paints it on as it enters the frame,
 * left to right, the way it would have been brushed.
 */
export function BrushRule({ className, weight = "hair" }: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      const node = ref.current
      if (!node) return

      if (reducedMotion) {
        gsap.set(node, { clipPath: "inset(0 0% 0 0)" })
        return
      }

      gsap.fromTo(
        node,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "power2.out",
          duration: 1.1,
          scrollTrigger: { trigger: node, start: "top 92%" },
        },
      )
    },
    { scope: ref, dependencies: [reducedMotion] },
  )

  return (
    <svg
      ref={ref}
      className={cn("brush-stroke block w-full", className)}
      viewBox="0 0 1200 18"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{ height: weight === "full" ? "0.8rem" : "0.45rem" }}
    >
      <path
        filter={`url(#ink-${weight})`}
        fill="var(--foreground)"
        opacity={weight === "full" ? 0.92 : 0.7}
        d="M3,9.4
           C140,4.2 300,3.1 470,4.8
           C660,6.7 790,11.4 980,8.6
           C1080,7.1 1150,6.6 1197,8.2
           L1197,10.1
           C1150,9.2 1080,11.5 980,13.6
           C790,17.3 660,13.1 470,10.9
           C300,8.8 140,12.2 3,11.9 Z"
      />
    </svg>
  )
}
