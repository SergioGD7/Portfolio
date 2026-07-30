import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { skillGroupIds } from '../data/site'
import { Reveal, SectionHeading } from '../components/Reveal'
import { useReducedMotion } from '../lib/hooks'
import { useContent } from '../i18n'

const ALL = 'all'

export function Skills() {
  const [active, setActive] = useState<string>(ALL)
  const reduced = useReducedMotion()
  const t = useContent()

  const groups = skillGroupIds.map((id) => ({ id, ...t.skills.groups[id] }))
  const visible = active === ALL ? groups : groups.filter((g) => g.id === active)
  const total = groups.reduce((n, g) => n + g.items.length, 0)
  const current = groups.find((g) => g.id === active)

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      {/* faint blueprint grid behind the section */}
      <div aria-hidden="true" className="blueprint pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-x relative">
        <SectionHeading heading={t.skills.heading} />

        {/* Filters */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label={t.skills.heading.eyebrow}>
            <FilterChip
              label={t.skills.everything}
              count={total}
              selected={active === ALL}
              onSelect={() => setActive(ALL)}
            />
            {groups.map((g) => (
              <FilterChip
                key={g.id}
                label={g.title}
                count={g.items.length}
                selected={active === g.id}
                onSelect={() => setActive(g.id)}
              />
            ))}
          </div>
        </Reveal>

        <div className="mt-4 min-h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${t.locale}-${active}`}
              className="font-mono text-xs text-dim"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {current ? current.blurb : t.skills.everythingBlurb}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Groups */}
        <motion.div layout={!reduced} className="mt-10 grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((group) => (
              <motion.div
                key={group.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-line bg-ink/50 p-6 backdrop-blur-sm sm:p-7"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold text-chalk">{group.title}</h3>
                  <span className="font-mono text-[0.65rem] text-dim">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-mist">{group.blurb}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(i * 0.022, 0.3) }}
                      className="cursor-default rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-[0.8rem] text-mist transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/10 hover:text-signal"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function FilterChip({
  label,
  count,
  selected,
  onSelect,
}: {
  label: string
  count: number
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={`group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
        selected
          ? 'border-brand/50 bg-brand/15 text-signal'
          : 'border-line text-mist hover:border-white/20 hover:text-chalk'
      }`}
    >
      {label}
      <span className={`font-mono text-[0.6rem] ${selected ? 'text-signal/70' : 'text-dim'}`}>
        {count}
      </span>
    </button>
  )
}
