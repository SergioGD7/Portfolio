import { asset } from '../lib/asset'

/**
 * Locale-independent data only: identifiers, URLs, images, tech stacks.
 * Every piece of visible copy lives in `src/i18n/en.ts` and `src/i18n/es.ts`,
 * keyed by the same ids used here.
 */

export const profile = {
  name: 'Sergio González Díaz',
  shortName: 'Sergio González',
  initials: 'SGD',
  email: 'sergio.g.d7@gmail.com',
  phone: '+34 665 782 784',
  available: true,
  portrait: asset('/images/portrait-512.jpg'),
  portraitLarge: asset('/images/portrait-1024.jpg'),
  cv: asset('/cv/sergio-gonzalez-diaz.pdf'),
  cvFileName: 'sergio-gonzalez-diaz-cv.pdf',
} as const

export const socials = [
  {
    label: 'GitHub',
    handle: '@SergioGD7',
    href: 'https://github.com/SergioGD7',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    handle: 'Sergio González Díaz',
    href: 'https://www.linkedin.com/in/sergio-gonz%C3%A1lez-d%C3%ADaz-114819107/',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    handle: '@sergiogd_7',
    href: 'https://www.instagram.com/sergiogd_7/',
    icon: 'instagram',
  },
] as const

/** Order matters — this drives the nav, the scroll spy and the command palette. */
export const sections = [
  { id: 'home' },
  { id: 'about' },
  { id: 'skills' },
  { id: 'experience' },
  { id: 'work' },
  { id: 'certifications' },
  { id: 'contact' },
] as const

/** Category order in the skills section. */
export const skillGroupIds = ['qa', 'automation', 'engineering', 'devops', 'team'] as const

export type ExperienceEntry = {
  id: string
  kind: 'work' | 'education'
  /** Marks the most recent position, for the timeline badge. */
  latest?: boolean
}

/** Newest first. Copy for each id lives in the i18n dictionaries. */
export const experience: ExperienceEntry[] = [
  { id: 'ntt-ejie', kind: 'work', latest: true },
  { id: 'ntt-telefonica-senior', kind: 'work' },
  { id: 'ntt-telefonica-specialist', kind: 'work' },
  { id: 'everis-junior', kind: 'work' },
  { id: 'viewnext-qa', kind: 'work' },
  { id: 'viewnext-dev', kind: 'work' },
  { id: 'viewnext-intern', kind: 'work' },
  { id: 'dam-degree', kind: 'education' },
]

export type Project = {
  id: string
  tech: string[]
  image: string
  repo: string
  /** Add a deployed URL and a "Demo" button appears next to "Code". */
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'masters-of-poker',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Game logic'],
    image: asset('/images/poker.jpg'),
    repo: 'https://github.com/SergioGD7/MastersOfPoker',
  },
  {
    id: 'workout-planner',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Charts'],
    image: asset('/images/workoutplanner.png'),
    repo: 'https://github.com/SergioGD7/WorkoutPlanner',
  },
  {
    id: 'snake',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Canvas'],
    image: asset('/images/snake.jpg'),
    repo: 'https://github.com/SergioGD7/Snake',
  },
  {
    id: 'numbers-duel',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Turn logic'],
    image: asset('/images/duelodenumeros.png'),
    repo: 'https://github.com/SergioGD7/dueloDeNumeros',
  },
  {
    id: 'memorion',
    tech: ['Java', 'Desktop app', 'Persistence', 'OOP'],
    image: asset('/images/memorion.png'),
    repo: 'https://github.com/SergioGD7/Memorion',
  },
]

export type Certification = {
  id: string
  href: string
  image?: string
  /** Spans two columns in the grid. */
  featured?: boolean
}

export const certifications: Certification[] = [
  {
    id: 'istqb',
    href: 'https://skillshub.isqi.org/ab7cfaf0-0df5-4c33-94d0-797c9a16cc0d#acc.ySgL8pJk',
    image: asset('/images/istqb.png'),
    featured: true,
  },
  {
    id: 'genai-yb2',
    href: 'https://nttdatainc-emeal.digitalbadges-eu.skillsoft.com/48679d88-ae58-484d-bbf0-8e4d48ef400e#acc.q6BkZbLE',
    image: asset('/images/genai.png'),
  },
  {
    id: 'selenium',
    href: 'https://drive.google.com/file/d/1nDUsfWQD3BcbTtOz0TbGb-AF_KzpIrnY/view',
    image: asset('/images/selenium.png'),
  },
  {
    id: 'python',
    href: 'https://drive.google.com/file/d/1Lmrp92gA5ZdJmQlSuV8x3Ar4SqnMs5DM/view',
    image: asset('/images/python.png'),
  },
  {
    id: 'genai-yb1',
    href: 'https://nttdatainc-emeal.digitalbadges-eu.skillsoft.com/912492b3-250a-4e0b-b8ff-c4e6db80299d#acc.djMJ1fR5',
    image: asset('/images/genai.png'),
  },
  {
    id: 'jira',
    href: 'https://drive.google.com/file/d/1c5Kf1yuLKujsFHQOSiC2tOggB48GonJ9/view',
  },
]

/** EmailJS — these identifiers are public by design. */
export const emailjsConfig = {
  publicKey: 'wJd_7Vv4NILbNl5GL',
  serviceId: 'service_d2k6n5i',
  templateId: 'template_owg2rbp',
}
