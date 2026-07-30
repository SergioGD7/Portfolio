import { profile, sections, socials } from '../data/site'
import { scrollToSection, scrollToTop } from '../lib/scroll'
import { useContent } from '../i18n'
import { ArrowUpRight, socialIcons } from '../components/Icons'

export function Footer() {
  const year = new Date().getFullYear()
  const t = useContent()

  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="container-x">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="eyebrow">{t.footer.workTogether}</p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-4 inline-flex items-baseline gap-3 font-display text-3xl font-semibold tracking-tight text-chalk transition-colors hover:text-signal sm:text-4xl"
            >
              {profile.email}
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <p className="mt-5 max-w-md leading-relaxed text-mist">{t.footer.blurb}</p>
          </div>

          <nav aria-label={t.footer.sectionsTitle}>
            <h2 className="font-mono text-[0.65rem] tracking-[0.18em] text-dim uppercase">
              {t.footer.sectionsTitle}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className="text-sm text-mist transition-colors hover:text-signal"
                  >
                    {t.nav.sections[s.id]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.65rem] tracking-[0.18em] text-dim uppercase">
              {t.footer.elsewhereTitle}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon]
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-sm text-mist transition-colors hover:text-signal"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {s.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.7rem] text-dim">{t.footer.colophon(year)}</p>
          <button
            onClick={scrollToTop}
            className="self-start font-mono text-[0.7rem] text-dim transition-colors hover:text-signal sm:self-auto"
          >
            {t.footer.backToTop}
          </button>
        </div>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative -mb-[2vw] select-none overflow-hidden"
      >
        <p className="text-center font-display text-[19vw] leading-[0.78] font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_var(--color-line)]">
          SERGIO GD
        </p>
      </div>
    </footer>
  )
}
