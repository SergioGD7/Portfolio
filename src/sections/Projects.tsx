import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { projects, type Project } from '../data/site'
import { Reveal, SectionHeading } from '../components/Reveal'
import { useIsTouch, useReducedMotion } from '../lib/hooks'
import { useContent } from '../i18n'
import type { ProjectCopy } from '../i18n/types'
import { ArrowUpRight, CodeIcon, PlayIcon } from '../components/Icons'

export function Projects() {
  const isTouch = useIsTouch()
  const reduced = useReducedMotion()
  const useList = !isTouch && !reduced
  const t = useContent()

  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading heading={t.projects.heading} />

        {useList ? <HoverList /> : <CardGrid />}

        <Reveal delay={0.1}>
          <a
            href="https://github.com/SergioGD7?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-14 inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-signal"
          >
            {t.projects.more}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Desktop: typographic list with a cursor-tracked preview            */
/* ------------------------------------------------------------------ */

function HoverList() {
  const [hovered, setHovered] = useState<number | null>(null)
  const t = useContent()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 24, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 24, mass: 0.5 })
  // Tilt the preview based on how fast the pointer is travelling vertically.
  const rotate = useTransform(springY, [-400, 400], [-9, 9], { clamp: true })

  const onMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <div onMouseMove={onMove} className="relative mt-14">
      <ul className="border-t border-line" onMouseLeave={() => setHovered(null)}>
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            copy={t.projects.entries[project.id]}
            index={i}
            dimmed={hovered !== null && hovered !== i}
            onEnter={() => setHovered(i)}
          />
        ))}
      </ul>

      {/* Floating preview */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            className="pointer-events-none fixed z-50 hidden lg:block"
            style={{ left: springX, top: springY, x: '-50%', y: '-50%', rotate }}
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-56 w-88 overflow-hidden rounded-xl border border-white/10 bg-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
              <img
                src={projects[hovered].image}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent" />
              <span className="absolute bottom-3 left-4 font-mono text-[0.65rem] tracking-[0.16em] text-signal uppercase">
                {projects[hovered].tech[0]}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectRow({
  project,
  copy,
  index,
  dimmed,
  onEnter,
}: {
  project: Project
  copy: ProjectCopy
  index: number
  dimmed: boolean
  onEnter: () => void
}) {
  const t = useContent()

  return (
    <motion.li
      onMouseEnter={onEnter}
      animate={{ opacity: dimmed ? 0.32 : 1 }}
      transition={{ duration: 0.25 }}
      className="group border-b border-line"
    >
      <div className="flex items-center gap-6 py-8 lg:py-10">
        <span className="w-8 shrink-0 font-mono text-xs text-dim">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <a
            href={project.demo ?? project.repo}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={project.demo ? t.projects.demo : t.projects.code}
            className="block"
          >
            <h3 className="font-display text-3xl font-semibold tracking-tight text-chalk transition-colors duration-300 group-hover:text-signal lg:text-[2.75rem]">
              {copy.title}
            </h3>
          </a>
          <p className="mt-2 font-mono text-[0.7rem] tracking-[0.14em] text-dim uppercase">
            {copy.kicker}
          </p>
        </div>

        <div className="hidden max-w-md flex-1 xl:block">
          <p className="line-clamp-3 text-sm leading-relaxed text-mist">{copy.description}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded border border-line px-2 py-0.5 font-mono text-[0.6rem] text-dim"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-chalk px-4 py-2 text-xs font-semibold text-void transition-transform hover:scale-105"
            >
              <PlayIcon className="h-3 w-3" />
              {t.projects.demo}
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-mist transition-colors hover:border-brand/50 hover:text-signal"
          >
            <CodeIcon className="h-3 w-3" />
            {t.projects.code}
          </a>
        </div>
      </div>
    </motion.li>
  )
}

/* ------------------------------------------------------------------ */
/*  Touch / reduced motion: plain cards                                */
/* ------------------------------------------------------------------ */

function CardGrid() {
  const t = useContent()

  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2">
      {projects.map((project, i) => {
        const copy = t.projects.entries[project.id]
        return (
          <Reveal key={project.id} delay={i * 0.05}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink/50">
              <div className="aspect-[16/10] overflow-hidden border-b border-line bg-slate">
                <img
                  src={project.image}
                  alt={copy.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[0.65rem] tracking-[0.14em] text-brand uppercase">
                  {copy.kicker}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-chalk">
                  {copy.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{copy.description}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-line px-2 py-0.5 font-mono text-[0.6rem] text-dim"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full bg-chalk px-4 py-2 text-xs font-semibold text-void"
                    >
                      <PlayIcon className="h-3 w-3" />
                      {t.projects.demo}
                    </a>
                  )}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-mist"
                  >
                    <CodeIcon className="h-3 w-3" />
                    {t.projects.code}
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
