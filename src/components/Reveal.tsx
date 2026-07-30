import { type ReactNode, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '../lib/hooks'
import type { Heading } from '../i18n/types'

type RevealProps = {
  children: ReactNode
  /** Seconds to wait before this element animates. */
  delay?: number
  /** Distance travelled on the way in. */
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'span'
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const reduced = useReducedMotion()

  // Every branch renders an HTMLElement, so a single ref type covers them all.
  const Tag = motion[as] as typeof motion.div

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}

type SplitTextProps = {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
}

/** Animates a headline word by word. Falls back to plain text under reduced motion. */
export function SplitText({ text, className, wordClassName, delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) return <span className={className}>{text}</span>

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

type SectionHeadingProps = {
  heading: Heading
  align?: 'left' | 'center'
}

/** The two-line section title used by every section, driven by the i18n dictionaries. */
export function SectionHeading({ heading, align = 'left' }: SectionHeadingProps) {
  const { eyebrow, title, highlight, description } = heading

  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
      <Reveal>
        <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-brand/60" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-5 font-display text-4xl font-bold text-balance-tight text-chalk sm:text-5xl lg:text-6xl">
          {title}
          <br />
          <span className="gradient-text">{highlight}</span>
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
