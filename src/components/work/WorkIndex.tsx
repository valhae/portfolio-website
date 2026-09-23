"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { gsap, useGSAP } from "@/lib/animation/gsap"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"
import { projects } from "@/lib/content/projects"
import { cn } from "@/lib/utils/cn"

export function WorkIndex({ limit }: { limit?: number }) {
  const items = limit ? projects.slice(0, limit) : projects
  const [active, setActive] = useState<string | null>(null)
  const root = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const activeProject = items.find((project) => project.slug === active)

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]")

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, yPercent: 0 })
        gsap.set("[data-row-title]", { clipPath: "inset(0 0 0% 0)", yPercent: 0 })
        gsap.set("[data-row-line]", { scaleX: 1 })
        return
      }

      rows.forEach((row) => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 90%" },
        })

        // The title is brushed up out of its own line; metadata and rule follow.
        timeline
          .fromTo(
            row.querySelector("[data-row-title]"),
            { clipPath: "inset(0 0 100% 0)", yPercent: 40 },
            {
              clipPath: "inset(0 0 0% 0)",
              yPercent: 0,
              duration: 1.1,
              ease: "expo.out",
            },
          )
          .fromTo(
            row.querySelectorAll("[data-row-meta]"),
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power2.out" },
            "-=0.75",
          )
          .fromTo(
            row.querySelector("[data-row-line]"),
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              transformOrigin: "left center",
              ease: "power2.out",
            },
            "-=0.7",
          )

        // The row itself drifts as it passes, so the list reads as depth
        // rather than a flat stack.
        gsap.fromTo(
          row,
          { yPercent: 5 },
          {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      })
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  const onPointerMove = (event: React.PointerEvent) => {
    const node = previewRef.current
    if (!node) return
    // Damped follow: the preview trails the cursor instead of snapping to it.
    gsap.to(node, {
      x: event.clientX - 220,
      y: event.clientY - 150,
      duration: reducedMotion ? 0 : 0.9,
      ease: "power3.out",
      overwrite: "auto",
    })
  }

  return (
    <div ref={root} className="relative" onPointerMove={onPointerMove}>
      <ul>
        {items.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              data-cursor="view"
              data-row
              onPointerEnter={() => setActive(project.slug)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(project.slug)}
              onBlur={() => setActive(null)}
              className="group relative grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3 py-8 md:grid-cols-[6ch_1fr_auto] md:py-10"
            >
              <span
                data-row-meta
                className="type-meta transition-colors duration-500 group-hover:text-foreground group-focus-visible:text-foreground md:opacity-60 md:group-hover:opacity-100"
              >
                {project.number}
              </span>

              <h3
                data-row-title
                className="type-display text-[clamp(1.75rem,5.5vw,4rem)] uppercase transition-transform duration-700 md:group-hover:translate-x-4"
              >
                {project.shortTitle}
              </h3>

              <div className="col-start-2 flex flex-wrap gap-x-6 gap-y-1 md:col-start-3 md:flex-col md:items-end md:text-right">
                <span data-row-meta className="type-meta">
                  {project.category}
                </span>
                <span data-row-meta className="type-meta">
                  {project.year ?? "—"}
                </span>
              </div>

              <span
                data-row-line
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-line"
              />
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop-only hover preview. Hidden from assistive tech: the link text
          already carries every fact this image repeats. */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-50 hidden h-[300px] w-[440px] transition-opacity duration-500 lg:block",
          activeProject?.cover ? "opacity-100" : "opacity-0",
        )}
      >
        {activeProject?.cover ? (
          <Image
            src={activeProject.cover}
            alt=""
            fill
            sizes="440px"
            className="object-cover grayscale"
          />
        ) : null}
      </div>
    </div>
  )
}
