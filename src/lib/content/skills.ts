export type SkillGroup = "Core" | "Rebuild" | "Practice" | "Tools"

export type Skill = {
  name: string
  group: SkillGroup
  note: string
}

/**
 * The previous portfolio used percentage bars. Percentages are not evidence,
 * so they are dropped. Every entry below is a technology that actually appears
 * in shipped work, or — marked "Rebuild" — one first used to build this site.
 */
export const skills: Skill[] = [
  { name: "HTML", group: "Core", note: "Markup across every project since 2022." },
  { name: "CSS", group: "Core", note: "Layout, type systems, motion without JavaScript." },
  { name: "JavaScript", group: "Core", note: "Interaction layer of the earlier portfolio and FLARE." },
  { name: "PHP", group: "Core", note: "Server side of the Anonymous Counseling System." },
  { name: "C#", group: "Core", note: "FLARE and LibraSys." },
  { name: "ASP.NET", group: "Core", note: "Application framework behind FLARE." },
  { name: "MySQL", group: "Core", note: "Relational store for FLARE and LibraSys." },
  { name: "Java", group: "Core", note: "RegisTrack." },
  { name: "React", group: "Core", note: "Facial Composite System interface." },
  { name: "Python", group: "Core", note: "FastAPI services and Cisco certification track." },
  { name: "FastAPI", group: "Practice", note: "Inference API for the Facial Composite System." },
  { name: "PyTorch", group: "Practice", note: "Age progression model integration." },
  { name: "Node.js", group: "Practice", note: "MERN stack work." },
  { name: "Express", group: "Practice", note: "MERN stack work." },
  { name: "MongoDB", group: "Practice", note: "MERN stack work." },
  { name: "WebSocket", group: "Practice", note: "Real-time messaging transport." },
  { name: "TypeScript", group: "Rebuild", note: "Type system for this rebuild." },
  { name: "Next.js", group: "Rebuild", note: "App Router, server components, metadata." },
  { name: "Tailwind CSS", group: "Rebuild", note: "Token-driven styling for this site." },
  { name: "GSAP", group: "Rebuild", note: "Scroll-linked timelines." },
  { name: "Three.js", group: "Rebuild", note: "The Digital Ink object." },
  { name: "React Three Fiber", group: "Rebuild", note: "React renderer for the 3D scene." },
  { name: "Motion", group: "Rebuild", note: "Component and route transitions." },
  { name: "Lenis", group: "Rebuild", note: "Scroll foundation." },
  { name: "Git", group: "Tools", note: "Version control." },
  { name: "VS Code", group: "Tools", note: "Primary editor." },
  { name: "Visual Studio", group: "Tools", note: "C# and ASP.NET work." },
  { name: "Figma", group: "Tools", note: "Interface design." },
  { name: "Canva", group: "Tools", note: "Visual assets." },
]

export const skillGroupLabels: Record<SkillGroup, string> = {
  Core: "Built with",
  Practice: "Worked with",
  Rebuild: "Learned for this rebuild",
  Tools: "Tools",
}

export function indexedSkills() {
  return skills.map((skill, i) => ({
    ...skill,
    index: String(i + 1).padStart(2, "0"),
  }))
}
