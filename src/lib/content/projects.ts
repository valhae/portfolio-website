export type ProjectSection = {
  heading: string
  body: string
}

export type Project = {
  slug: string
  number: string
  title: string
  shortTitle: string
  description: string
  year?: string
  category: string
  context: string
  technologies: string[]
  cover?: string
  gallery?: { src: string; alt: string }[]
  sections: ProjectSection[]
  externalUrl?: string
}

/**
 * Every fact here comes from the previous portfolio (valleo.netlify.app).
 * Nothing is invented: no metrics, no clients, no outcomes that were not stated.
 */
export const projects: Project[] = [
  {
    slug: "facial-composite-system",
    number: "01",
    title: "Facial Composite System",
    shortTitle: "Facial Composite",
    description:
      "A case-based facial composite system that generates suspect faces from extracted facial features, integrated with AI-driven age progression.",
    year: "2026",
    category: "AI / Computer Vision",
    context: "Freelance",
    technologies: ["React", "Next.js", "Bootstrap", "FastAPI", "Python", "PyTorch"],
    sections: [
      {
        heading: "Overview",
        body: "A case-based facial composite system that assembles suspect faces from extracted facial features, then applies AI-driven age progression using Fast-AgingGAN.",
      },
      {
        heading: "Technology",
        body: "The interface is built with React, Next.js and Bootstrap. The inference layer runs on FastAPI with Python and PyTorch.",
      },
    ],
  },
  {
    slug: "flare",
    number: "02",
    title: "FLARE: OLSHCO Facilities Location and Allocation of Resources and Equipment",
    shortTitle: "FLARE",
    description:
      "An advanced inventory system that streamlines resource tracking through barcode generation, damage reporting, borrowing management, and real-time location mapping.",
    year: "2025",
    category: "Inventory / Asset Systems",
    context: "Freelance",
    technologies: ["ASP.NET", "C#", "HTML", "CSS", "JavaScript", "MySQL"],
    cover:
      "https://www.dropbox.com/scl/fi/p36aboocaje5ldf2zzpu7/capHome.png?rlkey=nz3qmks2zkglwsjbramlp3hhi&st=zyif3chj&raw=1",
    gallery: [
      {
        src: "https://www.dropbox.com/scl/fi/p36aboocaje5ldf2zzpu7/capHome.png?rlkey=nz3qmks2zkglwsjbramlp3hhi&st=zyif3chj&raw=1",
        alt: "FLARE home dashboard",
      },
      {
        src: "https://www.dropbox.com/scl/fi/799y5adf6l1nkitpxat38/capReport.png?rlkey=kcd57zc5k9iieg3ocyp14i37m&st=j1sh85mq&raw=1",
        alt: "FLARE damage report screen",
      },
      {
        src: "https://www.dropbox.com/scl/fi/97jmzprexxvxxpep8rskl/capBorrow.png?rlkey=o7ut1p7kqikz8ywaygbk70ltv&st=m3bhj5zz&raw=1",
        alt: "FLARE borrowing management screen",
      },
      {
        src: "https://www.dropbox.com/scl/fi/enr06kgtghx0zhsw1yy57/capDash.png?rlkey=ih64uim97cilku8l7vpzuzhm4&st=l0g5ykc1&raw=1",
        alt: "FLARE analytics dashboard",
      },
      {
        src: "https://www.dropbox.com/scl/fi/wbtq61vyj5m3c5xeib4x2/capInv.png?rlkey=zlwzzhhyx5swke4bj799nt2kr&st=3c4qsmej&raw=1",
        alt: "FLARE inventory listing",
      },
      {
        src: "https://www.dropbox.com/scl/fi/9un4ojrnad9vb49t8zri0/capMap.png?rlkey=bk6tfnvl67xj078cvo09tbt1m&st=usn470bi&raw=1",
        alt: "FLARE real-time location map",
      },
      {
        src: "https://www.dropbox.com/scl/fi/zc4dtyp81jvwxnytyhryp/capStaff.png?rlkey=h1s4ru823q4qwu9b5027src0x&st=pdd5q6mi&raw=1",
        alt: "FLARE staff management screen",
      },
      {
        src: "https://www.dropbox.com/scl/fi/r8emj33czb897rpg8eu9q/capBarcode.png?rlkey=f1brt5vlhyre9duowb2w75a3b&st=txqw9szq&raw=1",
        alt: "FLARE barcode generation screen",
      },
    ],
    sections: [
      {
        heading: "Overview",
        body: "An inventory and asset management system for campus equipment. It streamlines resource tracking through barcode generation, damage reporting, borrowing management and real-time location mapping, giving the institution better control and visibility over its assets.",
      },
      {
        heading: "Purpose",
        body: "To automate operations and minimise manual intervention, enabling efficient management and an enhanced learning environment.",
      },
      {
        heading: "Technology",
        body: "Built on ASP.NET and C# with a JavaScript, HTML and CSS front end, backed by MySQL.",
      },
    ],
  },
  {
    slug: "anonymous-counseling-system",
    number: "03",
    title: "Anonymous Counseling System",
    shortTitle: "Anonymous Counseling",
    description:
      "A secure anonymous counseling platform with real-time messaging built on WebSocket.",
    year: "2024",
    category: "Real-time / Communication",
    context: "Freelance",
    technologies: ["PHP", "HTML", "CSS", "JavaScript", "WebSocket"],
    sections: [
      {
        heading: "Overview",
        body: "A secure anonymous counseling platform with real-time messaging capabilities using WebSocket, built in a local development environment.",
      },
      {
        heading: "Technology",
        body: "PHP on the server, with HTML, CSS and JavaScript on the client and a WebSocket transport for live messaging.",
      },
    ],
  },
  {
    slug: "librasys",
    number: "04",
    title: "LibraSys: Library Management System for BSIT",
    shortTitle: "LibraSys",
    description:
      "A library system that manages book records and tracks student visits through time-in and time-out functionality.",
    category: "Records / Management",
    context: "Academic",
    technologies: ["C#", "MySQL"],
    cover:
      "https://www.dropbox.com/scl/fi/vuzxdqedbc0myz73otlg2/libDash.png?rlkey=534ioegoaj9zv9czpy7qarz3o&st=sqow9ny9&raw=1",
    gallery: [
      {
        src: "https://www.dropbox.com/scl/fi/q9ttvv7wm2lmqff5vppkr/librarySystemLoading.jpg?rlkey=5c4br3xvjplbmd6ahrms5gsjm&st=1k57nf1m&raw=1",
        alt: "LibraSys loading screen",
      },
      {
        src: "https://www.dropbox.com/scl/fi/66yyc0rdizvqt1tl8v295/librarySystemTimeInOut.jpg?rlkey=9wf11w4ogtj48nmkhzz85cwdh&st=me7dksaz&raw=1",
        alt: "LibraSys time-in and time-out screen",
      },
      {
        src: "https://www.dropbox.com/scl/fi/vuzxdqedbc0myz73otlg2/libDash.png?rlkey=534ioegoaj9zv9czpy7qarz3o&st=sqow9ny9&raw=1",
        alt: "LibraSys dashboard",
      },
      {
        src: "https://www.dropbox.com/scl/fi/2431y4daoq45thh0zhbxz/libStudent.png?rlkey=1qjen07z0s0tchcgc4ufimxnd&st=ghoyxiao&raw=1",
        alt: "LibraSys student records screen",
      },
      {
        src: "https://www.dropbox.com/scl/fi/uwueowaq8h89t9pv4hp5t/libBook.png?rlkey=uok0jgq1i4nfd4uq6krs01siz&st=6oetdm89&raw=1",
        alt: "LibraSys book records screen",
      },
    ],
    sections: [
      {
        heading: "Overview",
        body: "A library system that manages book records and tracks student visits through time-in and time-out functionality, improving library monitoring and supporting accurate data management.",
      },
      {
        heading: "Purpose",
        body: "To help educational institutions monitor library usage and maintain organised records of student attendance and book transactions.",
      },
      {
        heading: "Technology",
        body: "Built with C# against a MySQL database.",
      },
    ],
  },
  {
    slug: "registrack",
    number: "05",
    title: "RegisTrack: Student Registration Form",
    shortTitle: "RegisTrack",
    description:
      "A streamlined system that digitises and simplifies the student registration process.",
    category: "Records / Management",
    context: "Academic",
    technologies: ["Java", "CSV"],
    cover:
      "https://www.dropbox.com/scl/fi/h3vdk0ywojvwzb46qsqzm/selectionPage.png?rlkey=s8lcoy4sv8wl6ryfibru4lxsj&st=53uoeqfx&raw=1",
    gallery: [
      {
        src: "https://www.dropbox.com/scl/fi/h3vdk0ywojvwzb46qsqzm/selectionPage.png?rlkey=s8lcoy4sv8wl6ryfibru4lxsj&st=53uoeqfx&raw=1",
        alt: "RegisTrack selection page",
      },
      {
        src: "https://www.dropbox.com/scl/fi/f5mxfcowmj008r5hli3dp/itPage.png?rlkey=dnlvs2l6bito6d29nddcl1t2q&st=sgx7xqw3&raw=1",
        alt: "RegisTrack IT programme page",
      },
      {
        src: "https://www.dropbox.com/scl/fi/ue2hv4o31bvd50luj6mlp/hmPage.png?rlkey=hdbpmxtzxpqids8rwehmbbgsp&st=q2qnik4t&raw=1",
        alt: "RegisTrack HM programme page",
      },
      {
        src: "https://www.dropbox.com/scl/fi/sykp5x9q64t77216ej6ew/oadPage.png?rlkey=glpddb9m1zlck1ottmht3h1q5&st=5eysh410&raw=1",
        alt: "RegisTrack OAD programme page",
      },
    ],
    sections: [
      {
        heading: "Overview",
        body: "A simple, streamlined system designed to digitise and simplify the student registration process, with an emphasis on efficient data collection and management.",
      },
      {
        heading: "Purpose",
        body: "To improve the registration experience with an organised, paperless solution that keeps student data entry accurate and timely.",
      },
      {
        heading: "Technology",
        body: "Written in Java with CSV-backed storage.",
      },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAdjacentProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug)
  return projects[(index + 1) % projects.length]
}
