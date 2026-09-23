"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/animation/gsap"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"
import { navigation } from "@/lib/content/navigation"
import { profile } from "@/lib/content/profile"
import { cn } from "@/lib/utils/cn"
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher"
import { MenuOverlay } from "./MenuOverlay"

export function Navigation() {
  const pathname = usePathname()
  const header = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)

  // Navigating closes the menu. Adjusting during render beats an effect:
  // the overlay never paints once for the new route before closing.
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  // Display type is large enough to run into the header as it passes, and the
  // header composites in difference blending, so the collision is unreadable.
  // Scrolling down retracts it; scrolling up, or reaching the top, returns it.
  useGSAP(
    () => {
      const node = header.current
      if (!node || reducedMotion || open) return

      const trigger = ScrollTrigger.create({
        start: "top -80",
        end: "max",
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 200
          gsap.to(node, {
            yPercent: hide ? -110 : 0,
            duration: 0.5,
            ease: "power3.out",
            overwrite: true,
          })
        },
        onLeaveBack: () => gsap.to(node, { yPercent: 0, duration: 0.4 }),
      })

      return () => trigger.kill()
    },
    { dependencies: [reducedMotion, open] },
  )

  return (
    <>
      <header ref={header} className="fixed inset-x-0 top-0 z-[66] mix-blend-difference">
        <div className="flex items-center justify-between gap-6 px-[var(--spacing-gutter)] py-5 text-white">
          <Link href="/" className="type-label" aria-label="Home">
            {profile.shortName}
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navigation.map((item) => {
                const active = pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "type-label transition-opacity duration-300",
                        active ? "opacity-100" : "opacity-55 hover:opacity-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <ThemeSwitcher className="hidden text-white sm:flex" />
            <button
              type="button"
              className="type-label md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} activePath={pathname} />
    </>
  )
}
