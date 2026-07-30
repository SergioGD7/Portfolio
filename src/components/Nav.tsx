import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { profile, sections, socials } from '../data/site'
import { scrollToSection, scrollToTop, setScrollPaused } from '../lib/scroll'
import { useActiveSection, useScrollLock } from '../lib/hooks'
import { useContent, useLocale } from '../i18n'
import { CloseIcon, MenuIcon, socialIcons } from './Icons'

const sectionIds = sections.map((s) => s.id)

/** Thin progress line pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gradient-to-r from-brand via-signal to-brand"
      style={{ scaleX }}
    />
  )
}

/** Two-letter language switch. Also announces the target language for screen readers. */
function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, toggleLocale } = useLocale()
  const t = useContent()

  return (
    <button
      onClick={toggleLocale}
      aria-label={t.nav.switchTo}
      title={t.nav.switchTo}
      className={`flex items-center gap-1 rounded-full border border-line font-mono text-[0.65rem] tracking-wider uppercase transition-colors hover:border-brand/40 hover:text-signal ${
        compact ? 'px-2.5 py-1.5' : 'px-3 py-1.5'
      }`}
    >
      <span className={locale === 'es' ? 'text-signal' : 'text-dim'}>ES</span>
      <span className="text-line">/</span>
      <span className={locale === 'en' ? 'text-signal' : 'text-dim'}>EN</span>
    </button>
  )
}

type Props = {
  onOpenPalette: () => void
}

export function Nav({ onOpenPalette }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const t = useContent()

  useScrollLock(menuOpen)
  useEffect(() => setScrollPaused(menuOpen), [menuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id: string) => {
    const wasOpen = menuOpen
    setMenuOpen(false)
    // let the overlay start closing before the scroll kicks in
    setTimeout(() => scrollToSection(id), wasOpen ? 240 : 0)
  }

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-void"
      >
        {t.nav.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between rounded-full px-4 py-2 transition-all duration-500 sm:px-5 ${
              scrolled
                ? 'panel shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]'
                : 'border border-transparent'
            }`}
          >
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2.5 rounded-full py-1 pr-3 font-display text-sm font-bold tracking-tight text-chalk"
              aria-label={t.nav.backToTop}
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-brand/15 font-mono text-[0.65rem] text-signal ring-1 ring-brand/30 transition-colors group-hover:bg-brand/25">
                {profile.initials}
              </span>
              <span className="hidden sm:inline">{profile.shortName}</span>
            </button>

            <nav aria-label={t.nav.menu} className="hidden items-center gap-1 lg:flex">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors ${
                    active === s.id ? 'text-chalk' : 'text-mist hover:text-chalk'
                  }`}
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t.nav.sections[s.id]}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenPalette}
                className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[0.7rem] text-dim transition-colors hover:border-brand/40 hover:text-signal xl:flex"
                aria-label={t.nav.jumpTo}
              >
                <span>{t.nav.jumpTo}</span>
                <kbd className="rounded border border-line bg-white/5 px-1.5 py-0.5 text-[0.6rem]">
                  ⌘K
                </kbd>
              </button>

              <LanguageToggle />

              <button
                onClick={() => go('contact')}
                className="hidden rounded-full bg-chalk px-4 py-1.5 text-[0.8rem] font-semibold text-void transition-transform hover:scale-[1.03] sm:block"
              >
                {t.nav.getInTouch}
              </button>

              <button
                onClick={() => setMenuOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-chalk lg:hidden"
                aria-label={t.nav.openMenu}
                aria-expanded={menuOpen}
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col bg-void/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
          >
            <div className="container-x flex items-center justify-between py-7">
              <span className="font-mono text-[0.7rem] tracking-[0.2em] text-dim uppercase">
                {t.nav.menu}
              </span>
              <div className="flex items-center gap-2">
                <LanguageToggle compact />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-chalk"
                  aria-label={t.nav.closeMenu}
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <nav className="container-x flex flex-1 flex-col justify-center gap-1">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className="group flex items-baseline gap-4 border-b border-line/60 py-4 text-left"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.045, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-mono text-[0.7rem] text-dim">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-3xl font-semibold transition-colors sm:text-4xl ${
                      active === s.id ? 'text-signal' : 'text-chalk group-hover:text-signal'
                    }`}
                  >
                    {t.nav.sections[s.id]}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="container-x flex items-center gap-3 pb-10">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-brand/50 hover:text-signal"
                    aria-label={s.label}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
