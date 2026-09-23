export const profile = {
  name: "Mar Leonard Anthony Vallada",
  shortName: "Mar Vallada",
  initials: "MV",
  roles: ["Creative Developer", "Full-Stack Developer"],
  statement:
    "I build digital systems where engineering, design and interaction meet.",
  bio: [
    "I am a dedicated Full-Stack Developer specialized in the design and functionality of modern web applications. My professional journey began at Our Lady of the Sacred Heart College of Guimba, Inc., and has since evolved into a career defined by a commitment to technical excellence and innovation.",
    "I pride myself on the ability to transform complex ideas into functional, high-impact digital realities. By blending creative design with robust programming, I aim to contribute meaningfully to an organization's growth while continuously enhancing my technical expertise. I believe in maintaining a focused, adaptable mindset — allowing me to navigate challenges effectively and deliver seamless user experiences.",
  ],
  location: "Maturanoc I, Guimba, Nueva Ecija, Philippines",
  locationShort: "Philippines",
  email: "marleovallada0@gmail.com",
  phone: "+63 969 040 5504",
  availability: "Available for select projects",
  resumeUrl:
    "https://drive.google.com/file/d/1NvRxnOQXvQ6Ggd0JgcU3t088Vp1MeZhM/view?usp=sharing",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Maturanoc+I%2C+Guimba%2C+Nueva+Ecija%2C+Philippines",
} as const

export const links = [
  { label: "GitHub", href: "https://github.com/Eclipsaaaaa" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mar-leonard-anthony-vallada-740a88309",
  },
  { label: "Instagram", href: "https://www.instagram.com/valhae/" },
  { label: "Facebook", href: "https://www.facebook.com/valleooo" },
] as const

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://valleo.netlify.app"
