import { certificationsByYear } from "@/lib/content/certifications"
import { Reveal } from "@/components/ui/Reveal"

export function Archive() {
  const groups = certificationsByYear()

  return (
    <div className="mt-16 space-y-20">
      {groups.map((group) => (
        <section key={group.year} aria-labelledby={`archive-${group.year}`}>
          <h3 id={`archive-${group.year}`} className="type-meta">
            {group.year}
          </h3>

          <ul className="mt-6">
            {group.items.map((certification, index) => (
              <li key={certification.id}>
                <Reveal
                  delay={index * 0.05}
                  className="grid gap-2 border-b border-line py-8 md:grid-cols-[1fr_auto] md:items-end"
                >
                  <div>
                    <h4 className="type-display text-[clamp(1.35rem,3.4vw,2.4rem)] uppercase">
                      {certification.title}
                    </h4>
                    <p className="type-label mt-2 text-muted">
                      {certification.issuer}
                    </p>
                    <p className="type-meta mt-2">
                      <time dateTime={certification.issuedISO}>
                        {certification.issued}
                      </time>
                      {" · "}
                      {certification.focus}
                    </p>
                  </div>

                  <a
                    className="type-label underline-offset-8 hover:underline"
                    href={certification.verifyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="open"
                  >
                    Verify
                    <span className="sr-only"> {certification.title} on Credly</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
