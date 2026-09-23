import Link from "next/link"
import { PageIntro } from "@/components/ui/PageIntro"
import { Reveal } from "@/components/ui/Reveal"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SkillIndex } from "@/components/skills/SkillIndex"
import { TechMarquee } from "@/components/skills/TechMarquee"
import { profile } from "@/lib/content/profile"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/schema"

export const metadata = pageMetadata({
  title: "About",
  description:
    "Mar Leonard Anthony Vallada is a full-stack developer from Guimba, Nueva Ecija, Philippines, working across ASP.NET, React, Next.js and Python.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <div className="px-[var(--spacing-gutter)] pb-[var(--spacing-section)]">
      <PageIntro
        index="02 — About"
        title="About"
        lead={profile.statement}
        meta={
          <>
            {profile.location}
            <br />
            {profile.roles.join(" / ")}
          </>
        }
      />

      <section className="grid gap-12 md:grid-cols-[1fr_1.4fr]" aria-labelledby="bio">
        <h2 id="bio" className="type-meta">
          Biography
        </h2>
        <div className="space-y-8">
          {profile.bio.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={index * 0.08}>
              <p className="type-body">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <a
              className="type-label underline-offset-8 hover:underline"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="open"
            >
              View resume
            </a>
          </Reveal>
        </div>
      </section>

      <section
        className="mt-[var(--spacing-section)]"
        aria-labelledby="technology-index"
      >
        <SectionHeader
          index="03"
          title="Technology index"
          aside="No percentages — only where each one was used"
        />
        <h2 id="technology-index" className="sr-only">
          Technology index
        </h2>
        <SkillIndex />
      </section>

      <div className="mt-[var(--spacing-section)]">
        <TechMarquee />
      </div>

      <section className="mt-[var(--spacing-section)]" aria-labelledby="about-next">
        <h2 id="about-next" className="type-meta">
          Next
        </h2>
        <Link
          href="/experience"
          data-cursor="view"
          className="type-display mt-3 block text-[clamp(2rem,7vw,5rem)] uppercase"
        >
          Experience
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ),
        }}
      />
    </div>
  )
}
