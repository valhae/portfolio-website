import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/content/profile"
import { projects } from "@/lib/content/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes = ["", "/work", "/about", "/experience", "/archive", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  )

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }))

  return [...routes, ...projectRoutes]
}
