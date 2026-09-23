import { Contact } from "@/components/contact/Contact"
import { PageIntro } from "@/components/ui/PageIntro"
import { profile } from "@/lib/content/profile"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/schema"

export const metadata = pageMetadata({
  title: "Contact",
  description: `Reach Mar Vallada at ${profile.email} — ${profile.availability}.`,
  path: "/contact",
})

export default function ContactPage() {
  return (
    <div className="px-[var(--spacing-gutter)] pb-[var(--spacing-section)]">
      <PageIntro
        index="05 — Contact"
        title="Contact"
        lead={profile.availability}
        meta={profile.location}
      />

      <Contact />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />
    </div>
  )
}
