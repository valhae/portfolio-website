"use client"

import { useState } from "react"
import { indexedSkills, skillGroupLabels } from "@/lib/content/skills"
import { cn } from "@/lib/utils/cn"

export function SkillIndex() {
  const skills = indexedSkills()
  const [active, setActive] = useState<string | null>(null)

  return (
    <ul className="mt-10">
      {skills.map((skill) => {
        const open = active === skill.name
        return (
          <li key={skill.name}>
            <button
              type="button"
              onPointerEnter={() => setActive(skill.name)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(skill.name)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(open ? null : skill.name)}
              aria-expanded={open}
              className="grid w-full grid-cols-[4ch_1fr_auto] items-baseline gap-4 border-b border-line py-3 text-left"
            >
              <span className="type-meta">{skill.index}</span>
              <span
                className={cn(
                  "type-display text-[clamp(1.1rem,2.6vw,1.9rem)] uppercase transition-transform duration-500",
                  open && "translate-x-2",
                )}
              >
                {skill.name}
              </span>
              <span className="type-meta">{skillGroupLabels[skill.group]}</span>
            </button>
            {/* The note is supplementary, never the only place a fact lives. */}
            <p
              className={cn(
                "type-body overflow-hidden text-muted transition-all duration-500",
                open ? "max-h-24 py-3 opacity-100" : "max-h-0 py-0 opacity-0",
              )}
            >
              {skill.note}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
