import type { Metadata } from "next"
import { profile, siteUrl } from "@/lib/content/profile"

type PageMetaInput = {
  title: string
  description: string
  path: string
}

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = `${siteUrl}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${profile.shortName}`,
      description,
      url,
      siteName: `${profile.shortName} — Portfolio`,
      type: "website",
      locale: "en_PH",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${profile.shortName}`,
      description,
    },
  }
}
