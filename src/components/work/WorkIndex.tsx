"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { projects } from "@/lib/content/projects"
import { cn } from "@/lib/utils/cn"

export function WorkIndex({ limit }: { limit?: number }) {
  const items = limit ? projects.slice(0, limit) : projects
  const [active, setActive] = useState<string | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const activeProject = items.find((project) => project.slug === active)

  const onPointerMove = (event: React.PointerEvent) => {
    const node = previewRef.current
    if (!node) return
    node.style.transform = `translate3d(${event.clientX - 220}px, ${event.clientY - 150}px, 0)`
  }

  return (
    <div className="relative" onPointerMove={onPointerMove}>
      <ul>
        {items.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              data-cursor="view"
              onPointerEnter={() => setActive(project.slug)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(project.slug)}
              onBlur={() => setActive(null)}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3 border-b border-line py-8 md:grid-cols-[6ch_1fr_auto] md:py-10"
            >
              <span className="type-meta transition-colors duration-500 group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)] md:opacity-70 md:group-hover:opacity-100">
                {project.number}
              </span>

              <h3
                className={cn(
                  "type-display text-[clamp(1.75rem,5.5vw,4rem)] uppercase transition-transform duration-700",
                  "md:group-hover:translate-x-4",
                )}
              >
                {project.shortTitle}
              </h3>

              <div className="col-start-2 flex flex-wrap gap-x-6 gap-y-1 md:col-start-3 md:flex-col md:items-end md:text-right">
                <span className="type-meta">{project.category}</span>
                <span className="type-meta">{project.year ?? "—"}</span>
              </div>
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
