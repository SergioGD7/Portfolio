import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { certifications, profile, projects, sections, socials } from '../data/site'
import { scrollToSection, setScrollPaused } from '../lib/scroll'
import { useCopyToClipboard, useScrollLock } from '../lib/hooks'
import { useContent, useLocale } from '../i18n'
import { ArrowUpRight, CheckIcon, CopyIcon, SearchIcon } from './Icons'

type Command = {
  id: string
  label: string
  group: string
  hint?: string
  run: () => void
}

type Props = {
  open: boolean
  onClose: () => void
}

/**
 * ⌘K / Ctrl+K palette. Navigates sections, opens any project, certificate or
 * social profile, switches language and copies the email — all from the keyboard.
 */
export function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { copied, copy } = useCopyToClipboard()
  const t = useContent()
  const { toggleLocale } = useLocale()

  useScrollLock(open)
  useEffect(() => setScrollPaused(open), [open])

  const commands = useMemo<Command[]>(() => {
    const openExternal = (href: string) => () => window.open(href, '_blank', 'noopener,noreferrer')
    const g = t.palette.groups

    return [
      ...sections.map((s) => ({
        id: `nav-${s.id}`,
        label: t.nav.sections[s.id],
        group: g.navigate,
        hint: t.palette.section,
        run: () => scrollToSection(s.id),
      })),
      ...projects.map((p) => ({
        id: `proj-${p.id}`,
        label: t.projects.entries[p.id].title,
        group: g.projects,
        hint: p.tech.slice(0, 2).join(' · '),
        run: openExternal(p.demo ?? p.repo),
      })),
      ...certifications.map((c) => ({
        id: `cert-${c.id}`,
        label: t.certifications.entries[c.id].title,
        group: g.certifications,
        hint: t.certifications.entries[c.id].issuer,
        run: openExternal(c.href),
      })),
      ...socials.map((s) => ({
        id: `soc-${s.label}`,
        label: s.label,
        group: g.links,
        hint: s.handle,
        run: openExternal(s.href),
      })),
      {
        id: 'switch-language',
        label: t.nav.switchTo,
        group: g.actions,
        hint: t.nav.language,
        run: toggleLocale,
      },
      {
        id: 'download-cv',
        label: t.hero.downloadCv,
        group: g.actions,
        hint: 'PDF',
        run: () => {
          const link = document.createElement('a')
          link.href = profile.cv
          link.download = profile.cvFileName
          link.click()
        },
      },
      {
        id: 'copy-email',
        label: t.palette.copyEmail,
        group: g.actions,
        hint: profile.email,
        run: () => void copy(profile.email),
      },
      {
        id: 'email-me',
        label: t.palette.sendEmail,
        group: g.actions,
        hint: profile.email,
        run: () => {
          window.location.href = `mailto:${profile.email}`
        },
      },
    ]
  }, [copy, t, toggleLocale])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q),
    )
  }, [commands, query])

  /* Reset each time it opens. */
  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setIndex(0), [query])

  /* Keep the highlighted row in view. */
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${index}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [index])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (i + 1) % Math.max(1, results.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (i - 1 + results.length) % Math.max(1, results.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = results[index]
      if (!cmd) return
      cmd.run()
      if (cmd.id !== 'copy-email') onClose()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  let lastGroup = ''

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.jumpTo}
            className="panel relative w-full max-w-lg overflow-hidden rounded-2xl shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <SearchIcon className="h-4 w-4 shrink-0 text-dim" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.palette.placeholder}
                className="w-full bg-transparent text-sm text-chalk outline-none placeholder:text-dim"
                aria-label={t.palette.placeholder}
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.6rem] text-dim">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-1.5" role="listbox">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center font-mono text-xs text-dim">
                  {t.palette.noMatches(query)}
                </p>
              )}

              {results.map((cmd, i) => {
                const showGroup = cmd.group !== lastGroup
                lastGroup = cmd.group
                const selected = i === index
                const isCopy = cmd.id === 'copy-email'

                return (
                  <div key={cmd.id}>
                    {showGroup && (
                      <p className="px-3 pt-3 pb-1.5 font-mono text-[0.6rem] tracking-[0.18em] text-dim uppercase">
                        {cmd.group}
                      </p>
                    )}
                    <button
                      data-idx={i}
                      role="option"
                      aria-selected={selected}
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => {
                        cmd.run()
                        if (!isCopy) onClose()
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        selected ? 'bg-white/[0.07]' : ''
                      }`}
                    >
                      <span className="flex-1 truncate text-sm text-chalk">{cmd.label}</span>
                      {cmd.hint && (
                        <span className="hidden max-w-[45%] truncate font-mono text-[0.65rem] text-dim sm:block">
                          {cmd.hint}
                        </span>
                      )}
                      {isCopy && copied ? (
                        <CheckIcon className="h-3.5 w-3.5 shrink-0 text-pass" />
                      ) : isCopy ? (
                        <CopyIcon className="h-3.5 w-3.5 shrink-0 text-dim" />
                      ) : (
                        <ArrowUpRight
                          className={`h-3.5 w-3.5 shrink-0 transition-opacity ${
                            selected ? 'text-signal opacity-100' : 'opacity-0'
                          }`}
                        />
                      )}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.6rem] text-dim">
              <span>{t.palette.navigateHint}</span>
              <span>{t.palette.openHint}</span>
              <span className="ml-auto">{t.palette.results(results.length)}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
