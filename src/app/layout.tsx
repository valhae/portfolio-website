import type { Metadata, Viewport } from "next"
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google"
import { SiteShell } from "@/components/shell/SiteShell"
import { profile, siteUrl } from "@/lib/content/profile"
import { personSchema, websiteSchema } from "@/lib/seo/schema"
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme"
import "./globals.css"

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const interface_ = Inter({
  variable: "--font-interface",
  subsets: ["latin"],
  display: "swap",
})

const metadata_ = JetBrains_Mono({
  variable: "--font-metadata",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.shortName} — Creative Developer & Full-Stack Developer`,
    template: `%s — ${profile.shortName}`,
  },
  description:
    "Portfolio of Mar Leonard Anthony Vallada, a full-stack developer in Nueva Ecija, Philippines, building web systems for inventory, records, real-time messaging and computer vision.",
  applicationName: `${profile.shortName} — Portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Mar Vallada",
    "Mar Leonard Anthony Vallada",
    "full-stack developer Philippines",
    "creative developer portfolio",
    "ASP.NET developer",
    "Next.js portfolio",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${profile.shortName} — Portfolio`,
    title: `${profile.shortName} — Creative Developer & Full-Stack Developer`,
    description: profile.statement,
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.shortName} — Creative Developer & Full-Stack Developer`,
    description: profile.statement,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={`${display.variable} ${interface_.variable} ${metadata_.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </body>
    </html>
  )
}
