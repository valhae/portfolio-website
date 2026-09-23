import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline"
import { PageIntro } from "@/components/ui/PageIntro"
import { experience } from "@/lib/content/experience"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/schema"

export const metadata = pageMetadata({
  title: "Experience",
  description:
    "Freelance systems work from 2024 to 2026 and studies at Our Lady of the Sacred Heart College of Guimba, Inc.",
  path: "/experience",
})

export default function ExperiencePage() {
  const years = experience.map((entry) => entry.sortYear)

  return (
    <div className="px-[var(--spacing-gutter)] pb-[var(--spacing-section)]">
      <PageIntro
        index="03 — Experience"
        title="Experience"
        lead="A timeline of the systems built and the institution they were built for."
        meta={`${Math.min(...years)} — ${Math.max(...years)}`}
      />

      <ExperienceTimeline />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Experience", path: "/experience" },
            ]),
          ),
        }}
      />
    </div>
  )
}
