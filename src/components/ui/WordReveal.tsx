"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/animation/gsap"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"
import { cn } from "@/lib/utils/cn"

type Props = {
  text: string
  className?: string
  /** Set when a landmark points at this heading with aria-labelledby. */
  id?: string
  /** Tie the reveal to scroll position rather than playing it once on entry. */
  scrub?: boolean
  as?: "h1" | "h2" | "h3" | "p"
}

/**
 * Reveals a line of display type word by word. The words are real text nodes
 * inside one element, so the sentence is still selectable and still read as a
 * single string by assistive technology.
 */
export function WordReveal({ text, className, id, scrub, as: Tag = "p" }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const words = text.split(" ")

  useGSAP(
    () => {
      const node = ref.current
      if (!node) return
      const targets = node.querySelectorAll("[data-word]")

      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, yPercent: 0 })
        return
      }

      gsap.fromTo(
        targets,
        { opacity: 0.08, yPercent: 60 },
        {
          opacity: 1,
          yPercent: 0,
          ease: scrub ? "none" : "expo.out",
          duration: scrub ? 1 : 1.1,
          stagger: scrub ? 0.4 : 0.06,
          scrollTrigger: scrub
            ? {
                trigger: node,
                start: "top 78%",
                end: "bottom 45%",
                scrub: 0.8,
              }
            : { trigger: node, start: "top 85%" },
        },
      )
    },
    { scope: ref, dependencies: [reducedMotion, scrub] },
  )

  return (
    <Tag ref={ref as never} id={id} className={cn("word-reveal", className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden">
          <span data-word className="inline-block">
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  )
}
