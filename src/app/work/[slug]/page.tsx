import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Parallax } from "@/components/ui/Parallax"
import { Reveal } from "@/components/ui/Reveal"
import { getAdjacentProject, getProject, projects } from "@/lib/content/projects"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, projectSchema } from "@/lib/seo/schema"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return pageMetadata({
    title: project.shortTitle,
    description: project.description,
    path: `/work/${project.slug}`,
  })
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const next = getAdjacentProject(project.slug)

  return (
    <article className="px-[var(--spacing-gutter)] pb-[var(--spacing-section)]">
      <header className="pt-36 pb-12 md:pt-44">
        <p className="type-meta">
          {project.number} — {project.category}
        </p>
        <h1 className="type-display mt-4 text-[clamp(2.5rem,9vw,7rem)] uppercase">
          {project.shortTitle}
        </h1>
        <p className="type-lead mt-8 max-w-[26ch] md:max-w-[34ch]">
          {project.description}
        </p>

        <dl className="mt-12 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <dt className="type-meta">Year</dt>
            <dd className="type-label mt-2">{project.year ?? "Undated"}</dd>
          </div>
          <div>
            <dt className="type-meta">Context</dt>
            <dd className="type-label mt-2">{project.context}</dd>
          </div>
          <div>
            <dt className="type-meta">Full title</dt>
            <dd className="type-label mt-2">{project.title}</dd>
          </div>
        </dl>
      </header>

      {project.cover ? (
        <Parallax className="relative aspect-[16/9] w-full" strength={10} zoom>
          <div className="absolute inset-0">
            <Image
              src={project.cover}
              alt={`${project.shortTitle} interface`}
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale"
            />
          </div>
        </Parallax>
      ) : null}

      <div className="mt-[var(--spacing-section)] grid gap-16 md:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 className="type-meta">Technology</h2>
          <ul className="mt-4 space-y-1">
            {project.technologies.map((tech) => (
              <li key={tech} className="type-label">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-14">
          {project.sections.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="type-display text-[clamp(1.5rem,4vw,2.5rem)] uppercase">
                {section.heading}
              </h2>
              <p className="type-body mt-4 text-muted">{section.body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {project.gallery && project.gallery.length > 1 ? (
        <section className="mt-[var(--spacing-section)]" aria-labelledby="gallery">
          <h2 id="gallery" className="type-meta border-b border-line pb-4">
            Selected screens
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {project.gallery.map((image, index) => (
              <li key={image.src}>
                <Parallax
                  className="relative aspect-[16/10]"
                  strength={index % 2 === 0 ? 8 : 14}
                  zoom
                >
                  <div className="absolute inset-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover grayscale"
                    />
                  </div>
                </Parallax>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav
        className="mt-[var(--spacing-section)] border-t border-line pt-10"
        aria-label="Next project"
      >
        <p className="type-meta">Next</p>
        <Link
          href={`/work/${next.slug}`}
          data-cursor="view"
          className="type-display mt-3 block text-[clamp(2rem,7vw,5rem)] uppercase"
        >
          {next.shortTitle}
        </Link>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema(project)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
              { name: project.shortTitle, path: `/work/${project.slug}` },
            ]),
          ),
        }}
      />
    </article>
  )
}
