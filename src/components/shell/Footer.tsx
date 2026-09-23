import Link from "next/link"
import { ToriiMark } from "@/components/three/ToriiMark"
import { BrushRule } from "@/components/ui/BrushRule"
import { navigation } from "@/lib/content/navigation"
import { links, profile } from "@/lib/content/profile"

export function Footer() {
  return (
    <footer className="px-[var(--spacing-gutter)] py-10">
      <BrushRule className="mb-10" />

      <div className="grid gap-8 md:grid-cols-4">
        <div className="flex items-start gap-4">
          <ToriiMark className="mt-1 h-7 w-7 shrink-0" />
          <div>
            <p className="type-label">{profile.shortName}</p>
            <p className="type-meta mt-2">{profile.locationShort}</p>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="type-meta hover:text-foreground" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                className="type-meta hover:text-foreground"
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="type-meta hover:text-foreground"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Resume
            </a>
          </li>
        </ul>

        <div className="md:text-right">
          <a className="type-meta" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <p className="type-meta mt-2">© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </div>
    </footer>
  )
}
