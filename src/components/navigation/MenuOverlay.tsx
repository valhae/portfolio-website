"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useEffect } from "react"
import { duration, ease, stagger } from "@/lib/animation/tokens"
import { navigation } from "@/lib/content/navigation"
import { links, profile } from "@/lib/content/profile"

type Props = {
  open: boolean
  onClose: () => void
  activePath: string
}

export function MenuOverlay({ open, onClose, activePath }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[65] flex flex-col bg-background px-[var(--spacing-gutter)] pt-24 pb-10"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: duration.slow, ease: ease.inOut }}
        >
          <nav className="flex flex-1 flex-col justify-center">
            <ul className="space-y-1">
              {navigation.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: duration.base,
                    ease: ease.out,
                    delay: 0.18 + index * stagger.base,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={activePath.startsWith(item.href) ? "page" : undefined}
                    className="flex items-baseline gap-4 py-2"
                  >
                    <span className="type-meta">{item.number}</span>
                    <span className="type-display text-[clamp(2.75rem,12vw,5rem)] uppercase">
                      {item.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, delay: 0.45 }}
          >
            <a className="type-meta" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <ul className="flex gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    className="type-label"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
