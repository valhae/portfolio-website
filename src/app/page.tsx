import Link from "next/link"
import { Hero } from "@/components/hero/Hero"
import { Contact } from "@/components/contact/Contact"
import { WorkIndex } from "@/components/work/WorkIndex"
import { Reveal } from "@/components/ui/Reveal"
import { WordReveal } from "@/components/ui/WordReveal"
import { TechMarquee } from "@/components/skills/TechMarquee"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { certifications } from "@/lib/content/certifications"
import { experience } from "@/lib/content/experience"
import { profile } from "@/lib/content/profile"
import { projects } from "@/lib/content/projects"

export default function HomePage() {
  const stamp = new Date().toLocaleDateString("en-GB", {
    month: "2-digit",
    year: "numeric",
  })

  return (
    <>
      <Hero stamp={stamp.replace("/", " / ")} />

      <section
        className="px-[var(--spacing-gutter)] py-[var(--spacing-section)]"
        aria-labelledby="home-work"
      >
        <SectionHeader
          index="01"
          title="Selected work"
          aside={`${projects.length} projects`}
        />
        <h2 id="home-work" className="sr-only">
          Selected work
        </h2>
        <WorkIndex limit={3} />
        <Reveal className="mt-10">
          <Link
            href="/work"
            className="type-label underline-offset-8 hover:underline"
            data-cursor="view"
          >
            All work
          </Link>
        </Reveal>
      </section>

      <section
        className="px-[var(--spacing-gutter)] py-[var(--spacing-section)]"
        aria-labelledby="home-about"
      >
        <SectionHeader index="02" title="About" aside={profile.locationShort} />
        <div className="mt-16 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <WordReveal
            as="h2"
            id="home-about"
            scrub
            text={profile.statement}
            className="type-display text-[clamp(2rem,6.5vw,5rem)] leading-[0.95] uppercase"
          />
          <Reveal delay={0.1} className="space-y-6">
            <p className="type-body text-muted">{profile.bio[0]}</p>
            <Link
              href="/about"
              className="type-label underline-offset-8 hover:underline"
              data-cursor="view"
            >
              Read more
            </Link>
          </Reveal>
        </div>
      </section>

      <TechMarquee />

      <section
        className="px-[var(--spacing-gutter)] py-[var(--spacing-section)]"
        aria-labelledby="home-index"
      >
        <SectionHeader index="03" title="Index" />
        <h2 id="home-index" className="sr-only">
          Index
        </h2>
        <dl className="mt-16 grid gap-10 sm:grid-cols-3">
          <Reveal>
            <dt className="type-meta">Experience</dt>
            <dd className="type-display mt-3 text-[clamp(2.5rem,7vw,5rem)]">
              {experience.length}
            </dd>
            <Link href="/experience" className="type-label mt-4 inline-block">
              Timeline
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <dt className="type-meta">Certifications</dt>
            <dd className="type-display mt-3 text-[clamp(2.5rem,7vw,5rem)]">
              {certifications.length}
            </dd>
            <Link href="/archive" className="type-label mt-4 inline-block">
              Archive
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <dt className="type-meta">Based in</dt>
            <dd className="type-display mt-3 text-[clamp(1.75rem,4vw,3rem)] uppercase">
              Philippines
            </dd>
            <a
              href={profile.mapUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="type-label mt-4 inline-block"
            >
              Nueva Ecija
            </a>
          </Reveal>
        </dl>
      </section>

      <section
        className="px-[var(--spacing-gutter)] py-[var(--spacing-section)]"
        aria-labelledby="home-contact"
      >
        <SectionHeader index="04" title="Contact" aside={profile.availability} />
        <h2 id="home-contact" className="sr-only">
          Contact
        </h2>
        <div className="mt-16">
          <Contact />
        </div>
      </section>
    </>
  )
}
