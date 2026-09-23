export type ExperienceEntry = {
  id: string
  period: string
  sortYear: number
  role: string
  organisation: string
  description: string
  technologies?: string[]
}

/** Sourced verbatim from the previous portfolio. No roles, dates or duties added. */
export const experience: ExperienceEntry[] = [
  {
    id: "facial-composite-system",
    period: "2026",
    sortYear: 2026,
    role: "Facial Composite System",
    organisation: "Freelance",
    description:
      "Developed a case-based facial composite system that generates suspect faces from extracted facial features, integrated with AI-driven age progression using Fast-AgingGAN.",
    technologies: ["React", "Next.js", "Bootstrap", "FastAPI", "Python", "PyTorch"],
  },
  {
    id: "flare",
    period: "2025",
    sortYear: 2025,
    role: "Facilities Location and Inventory Management System",
    organisation: "Freelance",
    description:
      "Designed an inventory and asset management system for campus equipment with real-time defect reporting, location mapping and notification features.",
    technologies: ["ASP.NET", "C#", "JavaScript", "CSS"],
  },
  {
    id: "anonymous-counseling-system",
    period: "2024",
    sortYear: 2024,
    role: "Anonymous Counseling System",
    organisation: "Freelance",
    description:
      "Developed a secure anonymous counseling platform with real-time messaging capabilities using WebSocket, built in a local development environment.",
    technologies: ["PHP", "HTML", "CSS", "JavaScript", "WebSocket"],
  },
  {
    id: "olshco",
    period: "2022 — 2026",
    sortYear: 2022,
    role: "Student",
    organisation: "Our Lady of the Sacred Heart College of Guimba, Inc.",
    description:
      "Gained hands-on experience in programming. Supported the IT department with small tasks and programs. Developed foundational skills in designing and developing software.",
  },
]
