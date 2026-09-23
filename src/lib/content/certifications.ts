export type Certification = {
  id: string
  title: string
  issuer: string
  issued: string
  issuedISO: string
  year: string
  focus: string
  verifyUrl: string
  badgeImage?: string
}

/** Real certifications, real issue dates, real Credly verification links. */
export const certifications: Certification[] = [
  {
    id: "python-essentials-1",
    title: "Python Essentials 1",
    issuer: "Cisco",
    issued: "August 11, 2024",
    issuedISO: "2024-08-11",
    year: "2024",
    focus: "Basic Python",
    verifyUrl:
      "https://www.credly.com/earner/earned/badge/22077ae5-247b-4d67-b911-3786fa579d92",
    badgeImage:
      "https://images.credly.com/size/680x680/images/68c0b94d-f6ac-40b1-a0e0-921439eb092e/image.png",
  },
  {
    id: "python-essentials-2",
    title: "Python Essentials 2",
    issuer: "Cisco",
    issued: "October 14, 2024",
    issuedISO: "2024-10-14",
    year: "2024",
    focus: "Advanced Python",
    verifyUrl:
      "https://www.credly.com/earner/earned/badge/f118c4d7-4872-40b6-b726-eff71e780082",
    badgeImage:
      "https://images.credly.com/size/680x680/images/3f802526-7274-4230-91ab-f6d1a35340e6/image.png",
  },
  {
    id: "cybersecurity-essentials",
    title: "LFC108: Cybersecurity Essentials",
    issuer: "The Linux Foundation",
    issued: "September 18, 2024",
    issuedISO: "2024-09-18",
    year: "2024",
    focus: "Basic Linux and cybersecurity",
    verifyUrl:
      "https://www.credly.com/earner/earned/badge/11e27b37-9d0d-4962-8a2e-ab0780e6e18a",
    badgeImage:
      "https://images.credly.com/size/680x680/images/e79f9317-b3f7-4b57-a859-f24d5f25fe36/blob",
  },
  {
    id: "introduction-to-data-science",
    title: "Introduction to Data Science",
    issuer: "Cisco",
    issued: "December 15, 2024",
    issuedISO: "2024-12-15",
    year: "2024",
    focus: "Data analytics",
    verifyUrl:
      "https://www.credly.com/earner/earned/badge/03c5a878-332c-465d-b60f-f274ca7d153e",
    badgeImage:
      "https://images.credly.com/size/680x680/images/b38a42e0-dc58-4ce2-b6c0-28d978e8aaad/image.png",
  },
  {
    id: "data-analytics-essentials",
    title: "Data Analytics Essentials",
    issuer: "Cisco",
    issued: "December 15, 2024",
    issuedISO: "2024-12-15",
    year: "2024",
    focus: "Data management",
    verifyUrl:
      "https://www.credly.com/earner/earned/badge/e742d6b5-1cde-4ff6-a596-39508d43d574",
    badgeImage:
      "https://images.credly.com/size/680x680/images/1fdfeaeb-e61c-4450-bdfe-a07bd4e715df/image.png",
  },
]

export function certificationsByYear() {
  const years = [...new Set(certifications.map((c) => c.year))].sort((a, b) =>
    b.localeCompare(a),
  )
  return years.map((year) => ({
    year,
    items: certifications.filter((c) => c.year === year),
  }))
}
