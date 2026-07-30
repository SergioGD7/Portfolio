import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { en } from './en'
import { es } from './es'
import type { Content, Locale } from './types'

export type { Content, Locale } from './types'

const DICTIONARIES: Record<Locale, Content> = { en, es }
const STORAGE_KEY = 'portfolio:locale'

/**
 * Picks the locale from the browser. `navigator.languages` is ordered by the
 * visitor's own preference, so the first entry we actually support wins;
 * anything else falls back to English.
 */
export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en'

  const stored = safeRead()
  if (stored) return stored

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language].filter(Boolean)

  for (const tag of candidates) {
    const base = tag.toLowerCase().split('-')[0]
    if (base === 'es') return 'es'
    if (base === 'en') return 'en'
  }
  return 'en'
}

function safeRead(): Locale | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'es' || value === 'en' ? value : null
  } catch {
    return null
  }
}

function safeWrite(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    /* private mode — the language just won't persist */
  }
}

type LocaleContextValue = {
  locale: Locale
  content: Content
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    safeWrite(next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => {
      const next: Locale = current === 'es' ? 'en' : 'es'
      safeWrite(next)
      return next
    })
  }, [])

  const content = DICTIONARIES[locale]

  /* Keep the document in sync so screen readers and search engines agree. */
  useEffect(() => {
    document.documentElement.lang = content.htmlLang
    document.title = content.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', content.meta.description)
  }, [content])

  const value = useMemo(
    () => ({ locale, content, setLocale, toggleLocale }),
    [locale, content, setLocale, toggleLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
  return ctx
}

/** The copy for the active locale. */
export function useContent(): Content {
  return useLocaleContext().content
}

/** The active locale plus the setters, for the language switch. */
export function useLocale() {
  const { locale, setLocale, toggleLocale } = useLocaleContext()
  return { locale, setLocale, toggleLocale }
}
