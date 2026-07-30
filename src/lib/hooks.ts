import { useCallback, useEffect, useRef, useState } from 'react'

/** Tracks a media query and stays in sync with it. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True when the visitor has asked the OS to reduce motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** True on coarse pointers (touch) — used to disable the custom cursor and hover previews. */
export function useIsTouch(): boolean {
  return useMediaQuery('(hover: none), (pointer: coarse)')
}

/** Reports whether the element is currently intersecting the viewport. */
export function useInViewport<T extends Element>(rootMargin = '0px') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}

/** Highlights the nav entry matching the section currently filling the viewport. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!elements.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}

/** Copies text and flips a flag for ~2s so the UI can confirm it. */
export function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        return true
      } catch {
        return false
      }
    },
    [],
  )

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), timeout)
    return () => clearTimeout(t)
  }, [copied, timeout])

  return { copied, copy }
}

/** Locks body scroll while a modal/menu is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
