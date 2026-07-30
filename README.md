# Portfolio — Sergio González Díaz

Personal portfolio: a single-page site built with React, TypeScript and a custom
Three.js particle field.

**Live:** https://sergiogd7.github.io/Portfolio/

## Stack

| Concern      | Choice                                       |
| ------------ | -------------------------------------------- |
| Build        | Vite 8                                       |
| UI           | React 19 + TypeScript                        |
| Styling      | Tailwind CSS v4 (CSS-first `@theme` tokens)  |
| 3D           | three.js + @react-three/fiber, custom GLSL   |
| Animation    | motion (Framer Motion) + Lenis smooth scroll |
| Contact form | EmailJS                                      |

## Commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run typecheck
```

## Languages

The site ships in **Spanish and English**. On first visit the language is picked
from `navigator.languages` — a Spanish browser gets Spanish, everything else gets
English. The `ES / EN` switch in the header overrides that, and the choice is
remembered in `localStorage`, so it wins over the browser on later visits.
`<html lang>`, `<title>` and the meta description all update with it.

## Editing the content

Content is split in two:

| File                | Holds                                                    |
| ------------------- | -------------------------------------------------------- |
| `src/data/site.ts`  | ids, URLs, images, tech stacks — anything language-neutral |
| `src/i18n/en.ts`    | every English string                                     |
| `src/i18n/es.ts`    | every Spanish string                                     |

The two dictionaries are keyed by the same ids used in `site.ts`, and both are
typed against `src/i18n/types.ts` — so if you add a project, experience entry or
certification and forget one language, `npm run typecheck` fails.

### Replacing the portrait

Save the new photo as `public/images/portrait-src.jpg`, then:

```bash
npm run portrait
```

That regenerates `portrait-1024.jpg` and `portrait-512.jpg` at the right sizes
and quality. Nothing else needs changing.

### Adding live demos

Each project in `src/data/site.ts` accepts an optional `demo` field. Add a
deployed URL and a "Demo" button appears next to "Code".

## Structure

```
index.html            page shell, meta tags, JSON-LD
public/               images, favicon, OG card, CV (served as-is)
src/
  data/site.ts        language-neutral data
  i18n/               en.ts, es.ts, the Content type and LocaleProvider
  styles/index.css    design tokens, base styles, keyframes
  lib/                hooks, smooth scroll, asset paths
  components/         nav, cursor, preloader, command palette, icons
    three/            the WebGL hero — ParticleField + HeroCanvas
  sections/           hero, marquee, about, skills, experience,
                      projects, certifications, contact, footer
legacy/               the previous static HTML/CSS/JS site, kept for reference
```

## Notes on behaviour

- **Reduced motion** — with `prefers-reduced-motion: reduce`, the WebGL canvas
  is never mounted, Lenis is disabled, the preloader is skipped and all reveal
  animations resolve instantly to their final state.
- **No WebGL** — the hero falls back to a static gradient and grid backdrop.
- **Off-screen or hidden tab** — the render loop stops, so the GPU idles.
- **Touch devices** — the custom cursor and the hover-preview project list are
  replaced with a plain card grid.
- **⌘K / Ctrl+K** opens a command palette for jumping to any section, project,
  certificate or link.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which typechecks, builds
and publishes `dist/` to GitHub Pages.

**One-time setup:** in the repository, go to _Settings → Pages_ and set
**Source** to **GitHub Actions**. Until that is changed, Pages keeps serving the
old branch-root site and the workflow's deploy step will fail.

The build uses a relative `base`, so the same output works at a domain root, on
the `/Portfolio/` subpath, or behind a custom domain.
