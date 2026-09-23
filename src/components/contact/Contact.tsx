import { links, profile } from "@/lib/content/profile"
import { Reveal } from "@/components/ui/Reveal"

export function Contact() {
  return (
    <div className="grid gap-16 md:grid-cols-[1.4fr_1fr] md:items-end">
      <Reveal>
        <p className="type-display text-[clamp(3rem,11vw,9rem)] leading-[0.88] uppercase">
          Let&rsquo;s
          <br />
          work
          <br />
          together
        </p>
      </Reveal>

      <Reveal delay={0.1} className="space-y-8">
        <div>
          <p className="type-meta">Status</p>
          <p className="type-label mt-2">{profile.availability}</p>
        </div>

        <div>
          <p className="type-meta">Email</p>
          <a
            className="link-ink type-lead mt-2 block break-words"
            href={`mailto:${profile.email}`}
            data-cursor="open"
          >
            {profile.email}
          </a>
        </div>

        <div>
          <p className="type-meta">Phone</p>
          <a className="type-label mt-2 block" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            {profile.phone}
          </a>
        </div>

        <div>
          <p className="type-meta">Based in</p>
          <a
            className="type-label mt-2 block"
            href={profile.mapUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            {profile.location}
          </a>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                className="link-ink type-label"
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="open"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="link-ink type-label"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="open"
            >
              Resume
            </a>
          </li>
        </ul>
      </Reveal>
    </div>
  )
}
