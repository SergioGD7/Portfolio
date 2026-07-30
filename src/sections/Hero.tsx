import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { profile, socials } from '../data/site'
import { scrollToSection } from '../lib/scroll'
import { useInViewport, useReducedMotion } from '../lib/hooks'
import { useContent } from '../i18n'
import { ArrowDown, ArrowUpRight, DownloadIcon, socialIcons } from '../components/Icons'

const HeroCanvas = lazy(() =>
  import('../components/three/HeroCanvas').then((m) => ({ default: m.HeroCanvas })),
)

/**
 * A reel rather than a crossfade: every role is always mounted and the track
 * slides by a whole line, so nothing can get stuck mid-animation.
 */
function RoleRotator({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    setI(0)
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2600)
    return () => clearInterval(t)
  }, [reduced, roles])

  if (reduced) return <span className="text-signal">{roles[0]}</span>

  return (
    <span className="block h-[1.3em] overflow-hidden">
      <motion.span
        className="block"
        animate={{ y: `-${i * 1.3}em` }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {roles.map((role) => (
          <span key={role} className="block h-[1.3em] leading-[1.3em] text-signal">
            {role}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const [ref, inView] = useInViewport<HTMLElement>('200px')
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const t = useContent()

  // Hold the canvas back until the preloader is gone and the first paint settled.
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 120)
    return () => clearTimeout(timer)
  }, [])

  // Plain CSS keyframes, staggered by delay. These run once on mount and are
  // immune to later re-renders — a JS-driven entrance here proved fragile.
  const rise = (delay: number) => ({ style: { animationDelay: `${delay}s` } })

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-12"
    >
      {/* WebGL field, or a static backdrop when motion is off / unsupported */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {mounted && !reduced ? (
          <Suspense fallback={null}>
            <HeroCanvas active={inView} />
          </Suspense>
        ) : (
          <div className="absolute inset-0">
            <div className="blueprint absolute inset-0 opacity-60" />
            <div className="absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]" />
          </div>
        )}
      </div>

      {/* Vignette, plus a scrim under the copy so the type never fights the field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,transparent_25%,var(--color-void)_92%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/75 to-transparent lg:via-void/35 lg:to-transparent"
      />

      <div className="container-x relative">
        <div className="max-w-4xl">
          <div {...rise(0.05)} className="rise flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="halo absolute inset-0 rounded-full bg-pass" />
            </span>
            <span className="font-mono text-[0.7rem] tracking-[0.2em] text-mist uppercase">
              {t.hero.availability}
            </span>
            <span className="hidden font-mono text-[0.7rem] tracking-[0.2em] text-dim uppercase sm:inline">
              · {t.hero.location}
            </span>
            <span className="h-px max-w-24 flex-1 bg-line" />
          </div>

          <h1
            {...rise(0.12)}
            className="rise mt-7 font-display text-[clamp(2.6rem,9vw,6.5rem)] font-bold text-balance-tight"
          >
            <span className="block text-chalk">Sergio</span>
            <span className="gradient-text block">González Díaz</span>
          </h1>

          <div {...rise(0.2)} className="rise mt-5 font-display text-2xl font-medium sm:text-3xl">
            <RoleRotator roles={t.hero.roles} />
          </div>

          <p {...rise(0.28)} className="rise mt-6 max-w-xl text-lg leading-relaxed text-mist">
            {t.hero.tagline}
          </p>

          <div {...rise(0.36)} className="rise mt-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection('work')}
              className="group inline-flex items-center gap-2 rounded-full bg-chalk px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
            >
              {t.hero.viewWork}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href={profile.cv}
              download={profile.cvFileName}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-chalk transition-colors hover:border-brand/50 hover:text-signal"
            >
              <DownloadIcon className="h-4 w-4" />
              {t.hero.downloadCv}
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-2 text-sm font-medium text-mist underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-brand"
            >
              {t.hero.sayHi}
            </button>
          </div>
        </div>

        {/* Proof points */}
        <dl
          {...rise(0.46)}
          className="rise mt-16 grid max-w-2xl grid-cols-3 gap-4 border-t border-line pt-7"
        >
          {t.hero.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="font-display text-3xl font-bold text-chalk sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-1 block text-xs text-mist sm:text-sm">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Rail of social links, desktop only */}
      <div
        {...rise(0.6)}
        className="rise absolute right-8 bottom-24 hidden flex-col items-center gap-4 xl:flex"
      >
        <span className="h-16 w-px bg-gradient-to-b from-transparent to-line" />
        {socials.map((s) => {
          const Icon = socialIcons[s.icon]
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim transition-colors hover:text-signal"
              aria-label={s.label}
              data-cursor="open"
            >
              <Icon className="h-4.5 w-4.5" />
            </a>
          )
        })}
      </div>

      {/* Only shown on tall viewports, where it cannot collide with the stats row */}
      <button
        {...rise(0.7)}
        onClick={() => scrollToSection('about')}
        className="rise absolute inset-x-0 bottom-7 mx-auto hidden w-fit flex-col items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] text-dim uppercase transition-colors hover:text-signal [@media(min-height:900px)]:flex"
        aria-label={t.hero.scroll}
      >
        {t.hero.scroll}
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  )
}
