"use client"

import { useRef, type ReactNode } from "react"
import { gsap, useGSAP } from "@/lib/animation/gsap"
import { duration } from "@/lib/animation/tokens"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"
import { cn } from "@/lib/utils/cn"

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  /** Animate direct children in sequence instead of the block as a whole. */
  stagger?: boolean
}

/** Mask-and-rise on entry, driven by ScrollTrigger. */
export function Reveal({ children, className, delay = 0, stagger }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      const node = ref.current
      if (!node) return

      const targets = stagger ? Array.from(node.children) : node

      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" })
        return
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y: 40, clipPath: "inset(0 0 12% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: duration.cinematic,
          ease: "expo.out",
          delay,
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: { trigger: node, start: "top 88%" },
        },
      )
    },
    { scope: ref, dependencies: [reducedMotion, delay, stagger] },
  )

  return (
    <div ref={ref} className={cn("reveal", className)}>
      {children}
    </div>
  )
}
