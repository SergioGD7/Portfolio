import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { profile } from '../data/site'
import { Reveal, SectionHeading } from '../components/Reveal'
import { useReducedMotion } from '../lib/hooks'
import { useContent } from '../i18n'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const t = useContent()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['6%', '-6%'])

  return (
    <section id="about" ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading heading={t.about.heading} />

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          {/* Portrait */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <motion.div
                style={{ y: portraitY }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ink"
              >
                <img
                  src={profile.portraitLarge}
                  alt={profile.name}
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Cold duotone wash to match the rest of the page */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-brand/15 mix-blend-color" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] text-signal uppercase">
                    {profile.name}
                  </p>
                  <p className="mt-1 text-sm text-mist">{t.about.roleCaption}</p>
                </div>
              </motion.div>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line">
                {t.about.facts.map((fact) => (
                  <div key={fact.label} className="flex items-center justify-between gap-4 px-4 py-3">
                    <dt className="font-mono text-[0.65rem] tracking-[0.14em] text-dim uppercase">
                      {fact.label}
                    </dt>
                    <dd className="text-right text-sm text-chalk">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Copy */}
          <div>
            <div className="space-y-6">
              {t.about.bio.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <p className="text-lg leading-relaxed text-mist">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 space-y-px overflow-hidden rounded-2xl border border-line bg-ink/40">
              {t.about.principles.map((p, i) => (
                <Reveal key={p.title} delay={0.05 + i * 0.07}>
                  <div className="group relative border-b border-line p-6 transition-colors last:border-b-0 hover:bg-white/[0.02] sm:p-7">
                    <span className="absolute top-6 right-6 font-mono text-[0.65rem] text-dim sm:right-7">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="pr-10 font-display text-lg font-semibold text-chalk transition-colors group-hover:text-signal">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-[0.95rem] leading-relaxed text-mist">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
