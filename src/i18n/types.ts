export type Locale = 'en' | 'es'

/** Heading block shared by every section: label, two-line title, optional lede. */
export type Heading = {
  eyebrow: string
  title: string
  /** Rendered on a second line with the gradient treatment. */
  highlight: string
  description?: string
}

export type ExperienceCopy = {
  role: string
  company: string
  period: string
  location: string
  summary: string
  /** Grouped bullets, mirroring how the CV organises each role. */
  blocks: { label?: string; items: string[] }[]
}

export type ProjectCopy = {
  title: string
  kicker: string
  description: string
}

export type CertificationCopy = {
  title: string
  issuer: string
  description: string
}

export type SkillGroupCopy = {
  title: string
  blurb: string
  items: string[]
}

export type Content = {
  locale: Locale
  /** Value for the <html lang> attribute. */
  htmlLang: string
  meta: {
    title: string
    description: string
  }
  nav: {
    sections: Record<string, string>
    jumpTo: string
    getInTouch: string
    menu: string
    openMenu: string
    closeMenu: string
    backToTop: string
    skipToContent: string
    language: string
    switchTo: string
  }
  preloader: {
    checks: string[]
  }
  hero: {
    availability: string
    location: string
    roles: string[]
    tagline: string
    viewWork: string
    downloadCv: string
    sayHi: string
    scroll: string
    stats: { value: string; label: string }[]
  }
  marquee: string[]
  about: {
    heading: Heading
    bio: string[]
    facts: { label: string; value: string }[]
    roleCaption: string
    principles: { title: string; body: string }[]
  }
  skills: {
    heading: Heading
    everything: string
    everythingBlurb: string
    groups: Record<string, SkillGroupCopy>
  }
  experience: {
    heading: Heading
    currentBadge: string
    entries: Record<string, ExperienceCopy>
  }
  projects: {
    heading: Heading
    demo: string
    code: string
    more: string
    entries: Record<string, ProjectCopy>
  }
  certifications: {
    heading: Heading
    seeCertificate: string
    entries: Record<string, CertificationCopy>
  }
  contact: {
    heading: Heading
    name: string
    email: string
    message: string
    namePlaceholder: string
    emailPlaceholder: string
    messagePlaceholder: string
    send: string
    sending: string
    sent: string
    copyEmail: string
    honeypotLabel: string
    errors: {
      name: string
      email: string
      message: string
      incomplete: string
    }
    success: string
    failure: (email: string) => string
  }
  footer: {
    workTogether: string
    blurb: string
    sectionsTitle: string
    elsewhereTitle: string
    colophon: (year: number) => string
    backToTop: string
  }
  palette: {
    placeholder: string
    groups: {
      navigate: string
      projects: string
      certifications: string
      links: string
      actions: string
    }
    section: string
    copyEmail: string
    sendEmail: string
    noMatches: (query: string) => string
    navigateHint: string
    openHint: string
    results: (n: number) => string
  }
}
