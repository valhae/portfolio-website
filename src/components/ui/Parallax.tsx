"use client"

import { useRef, type ReactNode } from "react"
import { gsap, useGSAP } from "@/lib/animation/gsap"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"
import { cn } from "@/lib/utils/cn"

type Props = {
  children: ReactNode
  className?: string
  /** Positive drifts up as the page scrolls; negative drifts down. */
  strength?: number
  /** Scale the content slightly while it travels, for image blocks. */
  zoom?: boolean
}

/** Scrubbed drift. Nothing here plays on its own — the scrollbar drives it. */
export function Parallax({ children, className, strength = 12, zoom }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      const node = ref.current
      if (!node || reducedMotion) return

      gsap.fromTo(
        node.firstElementChild,
        { yPercent: strength, scale: zoom ? 1.12 : 1 },
        {
          yPercent: -strength,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: node,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      )
    },
    { scope: ref, dependencies: [reducedMotion, strength, zoom] },
  )

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  )
}
