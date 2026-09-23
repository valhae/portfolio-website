"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"
import { duration, ease } from "@/lib/animation/tokens"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"

/**
 * A template remounts on every navigation, which is exactly the lifecycle a
 * route transition needs — no router events, no manual exit bookkeeping.
 * The page is masked in from the bottom edge rather than cross-faded.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) return <>{children}</>

  return (
    <motion.div
      initial={{ clipPath: "inset(6% 0 0 0)", opacity: 0, y: 18 }}
      animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1, y: 0 }}
      transition={{ duration: duration.cinematic, ease: ease.out }}
    >
      {children}
    </motion.div>
  )
}
