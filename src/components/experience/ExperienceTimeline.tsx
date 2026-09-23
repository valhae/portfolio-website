"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import { experience } from "@/lib/content/experience"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function ExperienceTimeline() {
  const root = useRef<HTMLOListElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion) return

      // The spine draws as the section passes; no pinning, so scrolling is
      // never taken away from the reader.
      gsap.fromTo(
        "[data-spine]",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        },
      )

      gsap.utils.toArray<HTMLElement>("[data-entry]").forEach((entry) => {
        gsap.fromTo(
          entry,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: entry, start: "top 85%" },
          },
        )
      })
    },
    { scope: root, dependencies: [reducedMotion] },
  )

  return (
    <ol ref={root} className="relative mt-16 pl-6 md:pl-0">
      <div
        data-spine
        aria-hidden="true"
        className="rule-vertical absolute top-0 bottom-0 left-0 md:left-[12ch]"
      />

      {experience.map((entry) => (
        <li
          key={entry.id}
          data-entry
          className="relative grid gap-3 pb-16 md:grid-cols-[12ch_1fr] md:gap-10"
        >
          <p className="type-meta md:pt-2">{entry.period}</p>

          <div className="md:pl-10">
            <h3 className="type-display text-[clamp(1.5rem,4vw,2.75rem)] uppercase">
              {entry.role}
            </h3>
            <p className="type-label mt-2 text-muted">{entry.organisation}</p>
            <p className="type-body mt-4 text-muted">{entry.description}</p>
            {entry.technologies ? (
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                {entry.technologies.map((tech) => (
                  <li key={tech} className="type-meta">
                    {tech}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
