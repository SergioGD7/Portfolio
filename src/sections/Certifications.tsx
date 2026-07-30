import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { certifications, type Certification } from '../data/site'
import { Reveal, SectionHeading } from '../components/Reveal'
import { useIsTouch, useReducedMotion } from '../lib/hooks'
import { useContent } from '../i18n'
import type { CertificationCopy } from '../i18n/types'
import { ArrowUpRight, CertIcon } from '../components/Icons'

export function Certifications() {
  const t = useContent()

  return (
    <section id="certifications" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading heading={t.certifications.heading} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal
              key={cert.id}
              delay={Math.min(i * 0.05, 0.25)}
              className={cert.featured ? 'sm:col-span-2' : undefined}
            >
              <CertCard
                cert={cert}
                copy={t.certifications.entries[cert.id]}
                featured={Boolean(cert.featured)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CertCard({
  cert,
  copy,
  featured,
}: {
  cert: Certification
  copy: CertificationCopy
  featured: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isTouch = useIsTouch()
  const reduced = useReducedMotion()
  const t = useContent()
  const tiltEnabled = !isTouch && !reduced

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  // Position of the cursor inside the card, for the spotlight gradient.
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)

  const rotateX = useSpring(rx, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${gx}% ${gy}%, rgba(86,220,255,0.10), transparent 70%)`

  const onMove = (e: React.MouseEvent) => {
    if (!tiltEnabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    gx.set(px * 100)
    gy.set(py * 100)
    ry.set((px - 0.5) * 10)
    rx.set(-(py - 0.5) * 10)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={cert.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={t.certifications.seeCertificate}
      style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink/50 p-6 transition-colors hover:border-brand/40 ${
        featured ? 'sm:p-8' : ''
      }`}
    >
      {/* cursor spotlight */}
      {tiltEnabled && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div
          className={`flex shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.04] p-3 ${
            featured ? 'h-24 w-24' : 'h-18 w-18'
          }`}
        >
          {cert.image ? (
            <img
              src={cert.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          ) : (
            <CertIcon className="h-8 w-8 text-dim" />
          )}
        </div>

        <span className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] tracking-wider text-dim uppercase">
          <CertIcon className="h-3 w-3" />
          {copy.issuer}
        </span>
      </div>

      <h3
        className={`relative mt-5 font-display font-semibold text-chalk transition-colors group-hover:text-signal ${
          featured ? 'text-2xl' : 'text-lg'
        }`}
      >
        {copy.title}
      </h3>

      <p
        className={`relative mt-3 flex-1 leading-relaxed text-mist ${
          featured ? 'max-w-2xl text-[0.95rem]' : 'text-sm'
        }`}
      >
        {copy.description}
      </p>

      <span className="relative mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-signal uppercase">
        {t.certifications.seeCertificate}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </motion.a>
  )
}
