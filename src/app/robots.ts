import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/content/profile"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search crawlers and AI answer engines are both welcome: this is a
      // portfolio, being quotable is the point.
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
