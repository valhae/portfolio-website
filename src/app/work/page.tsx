import { WorkIndex } from "@/components/work/WorkIndex"
import { PageIntro } from "@/components/ui/PageIntro"
import { projects } from "@/lib/content/projects"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/schema"

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Selected systems by Mar Vallada: a facial composite system with AI age progression, the FLARE campus inventory platform, an anonymous counseling platform, LibraSys and RegisTrack.",
  path: "/work",
})

export default function WorkPage() {
  return (
    <div className="px-[var(--spacing-gutter)] pb-[var(--spacing-section)]">
      <PageIntro
        index="01 — Work"
        title="Work"
        lead="Systems built for institutions and clients: inventory, records, real-time communication and computer vision."
        meta={`${projects.length} projects · 2024 — 2026`}
      />

      <WorkIndex />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
            ]),
          ),
        }}
      />
    </div>
  )
}
