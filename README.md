# VALLEO — Portfolio

Portfolio of **Mar Leonard Anthony Vallada** — a monochrome, Japanese-inspired
editorial portfolio built as a rebuild of the previous static site.

Minimalist composition, one signature WebGL object, four monochrome themes, and
content that stays factual: no invented metrics, no percentage skill bars, no
claimed outcomes.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS 4 with CSS-variable design tokens |
| Component motion | Motion (`motion/react`) |
| Timeline / scroll motion | GSAP + ScrollTrigger (`@gsap/react`) |
| Scroll | Lenis, one app-level instance synced with ScrollTrigger |
| 3D | Three.js + React Three Fiber (custom shader material) |
| Tests | Vitest + React Testing Library |
| Hosting | Vercel (static-rendered routes) |

## Commands

```bash
npm run dev        # development server
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm test           # vitest (watch)
npm run test:run   # vitest, single run
```

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | no | Absolute origin used for canonical URLs, Open Graph, sitemap and structured data. Defaults to `https://valleo.netlify.app`. Set it to the production domain on Vercel. |

No other environment variables exist. The site has no backend, no database and
no API keys.

## Structure

```
src/
  app/                 routes, metadata, sitemap, robots, OG image
  components/
    shell/             SiteShell, Lenis scroll, footer
    navigation/        header + full-screen menu overlay
    hero/              hero composition and GSAP intro timeline
    three/             Digital Ink: scene, shader material, fallback
    work/ about/ skills/ experience/ archive/ contact/
    theme/ cursor/ texture/ ui/
  lib/
    content/           all portfolio facts live here, typed
    animation/         motion tokens, media-query hooks
    seo/               metadata + structured data builders
    theme.ts           theme list, persistence, no-flash init script
tests/                 unit + component tests (git-ignored)
```

### Editing content

Every fact on the site comes from `src/lib/content/`. Nothing is hardcoded in
components:

- `profile.ts` — name, roles, bio, contact details, social links
- `projects.ts` — case studies, technologies, galleries
- `experience.ts` — timeline entries
- `certifications.ts` — credentials and Credly verification links
- `skills.ts` — technology index, grouped by where each one was actually used

Adding a project to `projects.ts` automatically creates its `/work/<slug>`
page, sitemap entry, structured data and "next project" link.

## Design system

Four monochrome themes — **Paper**, **Ink**, **Void**, **Shiro** — are defined
as CSS variables in `src/app/globals.css`. Themes change more than colour: grain
intensity, type weight, layout density, rule visibility, motion scale and the 3D
material all move with the token set. The choice is stored in `localStorage` and
applied by an inline script before first paint, so the theme never flashes.

## Accessibility and motion

- Semantic landmarks, one `h1` per page, skip link, visible focus states
- `aria-expanded` on the menu, `aria-pressed` on theme controls
- `prefers-reduced-motion` disables Lenis, the GSAP timelines, the route
  transition, the grain drift and the WebGL scene — content stays complete
- The custom cursor mounts only for fine pointers; touch keeps native behaviour
- Hover never hides information that is not also available as text

## Performance

- Every route is statically rendered
- WebGL is lazy-loaded, capped at DPR 1.75, simplified on small or coarse-pointer
  devices, paused when scrolled out of view, and replaced by a static fallback
  when WebGL is unavailable or reduced motion is on
- Fonts are self-hosted through `next/font`
- Remote project imagery is optimised through `next/image`

## Tests

`tests/` is intentionally git-ignored, so the suite lives on this machine only.
Run it before pushing:

```bash
npm run test:run
```

Coverage: content integrity (slugs, dates, ordering, no fabricated years), theme
normalisation and persistence, SEO metadata and structured data, and component
behaviour for the navigation, theme switcher, work index, skill index, archive
and contact sections.

## Deployment

Import the repository on Vercel; the defaults are correct (`npm run build`, no
custom output directory). Set `NEXT_PUBLIC_SITE_URL` to the production domain so
canonical URLs and the sitemap point at it.

## Licence

See `LICENSE`.
