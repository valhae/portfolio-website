"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Scroll reveal with an IntersectionObserver and a CSS transition.
 * No animation library is needed for a fade-and-rise, so none is loaded.
 */
export function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.revealed = "true"
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
