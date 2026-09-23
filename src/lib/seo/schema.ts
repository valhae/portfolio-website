import { certifications } from "@/lib/content/certifications"
import { links, profile, siteUrl } from "@/lib/content/profile"
import type { Project } from "@/lib/content/projects"

const personId = `${siteUrl}/#person`
const siteId = `${siteUrl}/#website`

/**
 * Structured data states only what the portfolio can support:
 * name, location, links, real credentials, real projects. No claimed awards,
 * no employer relationships that were never stated, no invented ratings.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: profile.shortName,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    jobTitle: profile.roles.join(" / "),
    description: profile.bio[0],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guimba",
      addressRegion: "Nueva Ecija",
      addressCountry: "PH",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Our Lady of the Sacred Heart College of Guimba, Inc.",
    },
    knowsAbout: [
      "Full-stack web development",
      "ASP.NET",
      "React",
      "Next.js",
      "Interaction design",
    ],
    hasCredential: certifications.map((certification) => ({
      "@type": "EducationalOccupationalCredential",
      name: certification.title,
      credentialCategory: "certificate",
      url: certification.verifyUrl,
      dateCreated: certification.issuedISO,
      recognizedBy: { "@type": "Organization", name: certification.issuer },
    })),
    sameAs: links.map((link) => link.href),
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId,
    url: siteUrl,
    name: `${profile.shortName} — Portfolio`,
    inLanguage: "en",
    publisher: { "@id": personId },
  }
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    url: `${siteUrl}/work/${project.slug}`,
    programmingLanguage: project.technologies,
    ...(project.year ? { dateCreated: project.year } : {}),
    author: { "@id": personId },
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }
}
