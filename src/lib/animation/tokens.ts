/** Single source of truth for timing. Components never hardcode durations. */
export const duration = {
  fast: 0.2,
  base: 0.5,
  slow: 0.9,
  cinematic: 1.4,
} as const

export const ease = {
  /** Editorial deceleration — the default for reveals. */
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
  linear: [0, 0, 1, 1] as const,
}

export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const

export const reveal = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.slow, ease: ease.out },
}

export const maskReveal = {
  initial: { clipPath: "inset(0 0 100% 0)" },
  animate: { clipPath: "inset(0 0 0% 0)" },
  transition: { duration: duration.cinematic, ease: ease.out },
}
