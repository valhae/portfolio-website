import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col justify-center px-[var(--spacing-gutter)]">
      <p className="type-meta">404</p>
      <h1 className="type-display mt-4 text-[clamp(3rem,13vw,10rem)] uppercase">
        Not here
      </h1>
      <p className="type-body mt-8 text-muted">
        That page does not exist. The work, the archive and the contact details
        all do.
      </p>
      <Link
        href="/"
        className="type-label mt-10 underline-offset-8 hover:underline"
        data-cursor="view"
      >
        Return home
      </Link>
    </div>
  )
}
