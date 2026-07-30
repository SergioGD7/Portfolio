import Lenis from 'lenis'

let lenis: Lenis | null = null

/**
 * Starts Lenis smooth scrolling and returns a teardown.
 * Skipped entirely when the visitor prefers reduced motion — native scroll is kept.
 */
export function initSmoothScroll(enabled: boolean): () => void {
  if (!enabled) return () => {}

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  })

  let frame = 0
  const raf = (time: number) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

/** Scrolls to a section id, accounting for the fixed header. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  const offset = id === 'home' ? 0 : -80

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 })
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** Lenis must be paused while a modal owns the viewport. */
export function setScrollPaused(paused: boolean) {
  if (!lenis) return
  if (paused) lenis.stop()
  else lenis.start()
}
