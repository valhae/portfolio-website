import { Archive } from "@/components/archive/Archive"
import { PageIntro } from "@/components/ui/PageIntro"
import { certifications } from "@/lib/content/certifications"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/schema"

export const metadata = pageMetadata({
  title: "Archive",
  description:
    "Verified certifications from Cisco and The Linux Foundation: Python Essentials 1 and 2, Cybersecurity Essentials, Introduction to Data Science and Data Analytics Essentials.",
  path: "/archive",
})

export default function ArchivePage() {
  return (
    <div className="px-[var(--spacing-gutter)] pb-[var(--spacing-section)]">
      <PageIntro
        index="04 — Archive"
        title="Archive"
        lead="Certifications, each one verifiable at its issuer."
        meta={`${certifications.length} credentials`}
      />

      <Archive />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Archive", path: "/archive" },
            ]),
          ),
        }}
      />
    </div>
  )
}
