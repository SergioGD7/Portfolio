import { useCallback, useEffect, useState } from 'react'
import { Nav, ScrollProgress } from './components/Nav'
import { CommandPalette } from './components/CommandPalette'
import { Cursor } from './components/Cursor'
import { Preloader } from './components/Preloader'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Experience } from './sections/Experience'
import { Projects } from './sections/Projects'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { initSmoothScroll } from './lib/scroll'
import { useReducedMotion } from './lib/hooks'
import { LocaleProvider } from './i18n'

export default function App() {
  return (
    <LocaleProvider>
      <Portfolio />
    </LocaleProvider>
  )
}

function Portfolio() {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Lenis, unless the visitor asked for reduced motion.
  useEffect(() => initSmoothScroll(!reduced), [reduced])

  // ⌘K / Ctrl+K anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Deep link support: /#skills should still land on the right section.
  useEffect(() => {
    if (!ready) return
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' })
    }, 60)
    return () => clearTimeout(t)
  }, [ready])

  const onPreloadDone = useCallback(() => setReady(true), [])

  return (
    <>
      <Preloader onDone={onPreloadDone} />
      <Cursor />
      <ScrollProgress />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
