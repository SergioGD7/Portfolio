import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { experience } from '../data/site'
import { Reveal, SectionHeading } from '../components/Reveal'
import { useReducedMotion } from '../lib/hooks'
import { useContent } from '../i18n'
import { CertIcon, CodeIcon } from '../components/Icons'

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const t = useContent()
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading heading={t.experience.heading} />

        <div ref={trackRef} className="relative mt-16 pl-8 sm:pl-12">
          {/* Rail */}
          <div className="absolute top-2 bottom-2 left-[3px] w-px bg-line sm:left-[11px]" />
          <motion.div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[3px] w-px origin-top bg-gradient-to-b from-signal via-brand to-transparent sm:left-[11px]"
            style={reduced ? { scaleY: 1 } : { scaleY }}
          />

          <ol className="space-y-10 sm:space-y-14">
            {experience.map((entry, i) => {
              const copy = t.experience.entries[entry.id]
              if (!copy) return null
              const isEducation = entry.kind === 'education'

              return (
                <li key={entry.id} className="relative">
                  {/* Node */}
                  <span
                    className={`absolute top-2 -left-8 flex h-[9px] w-[9px] items-center justify-center rounded-full sm:-left-12 ${
                      entry.latest ? 'bg-signal' : 'bg-line ring-1 ring-white/10'
                    }`}
                  >
                    {entry.latest && (
                      <span className="absolute h-full w-full animate-ping rounded-full bg-signal/60" />
                    )}
                  </span>

                  <Reveal delay={Math.min(i * 0.05, 0.25)}>
                    <article
                      className={`group rounded-2xl border p-6 transition-colors sm:p-8 ${
                        isEducation
                          ? 'border-dashed border-line bg-transparent hover:border-white/15'
                          : 'border-line bg-ink/40 hover:border-white/15'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="font-mono text-[0.65rem] tracking-[0.16em] text-brand uppercase">
                          {copy.period}
                        </span>
                        <span className="font-mono text-[0.65rem] tracking-[0.16em] text-dim uppercase">
                          · {copy.location}
                        </span>
                        {entry.latest && (
                          <span className="rounded-full border border-pass/30 bg-pass/10 px-2 py-0.5 font-mono text-[0.6rem] tracking-wider text-pass uppercase">
                            {t.experience.currentBadge}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 flex items-start gap-2.5 font-display text-xl font-semibold text-chalk sm:text-2xl">
                        {isEducation ? (
                          <CertIcon className="mt-1 h-5 w-5 shrink-0 text-dim" />
                        ) : (
                          <CodeIcon className="mt-1.5 h-4 w-4 shrink-0 text-dim" />
                        )}
                        {copy.role}
                      </h3>
                      <p className="mt-1 pl-7.5 text-sm text-signal/90">{copy.company}</p>

                      <p className="mt-4 max-w-2xl leading-relaxed text-mist">{copy.summary}</p>

                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        {copy.blocks.map((block, bi) => (
                          <div key={block.label ?? bi} className={copy.blocks.length === 1 ? 'sm:col-span-2' : ''}>
                            {block.label && (
                              <h4 className="mb-2 font-mono text-[0.65rem] tracking-[0.14em] text-dim uppercase">
                                {block.label}
                              </h4>
                            )}
                            <ul className="space-y-2">
                              {block.items.map((item) => (
                                <li key={item} className="flex gap-3 text-[0.9rem] leading-relaxed text-mist">
                                  <span
                                    aria-hidden="true"
                                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand"
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
