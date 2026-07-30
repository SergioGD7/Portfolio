import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useIsTouch, useReducedMotion } from '../lib/hooks'

/**
 * A two-part cursor: a small solid dot that tracks exactly, and a lagging ring
 * that grows over interactive elements. Disabled on touch and reduced motion.
 */
export function Cursor() {
  const isTouch = useIsTouch()
  const reduced = useReducedMotion()
  const enabled = !isTouch && !reduced

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.6 })

  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('custom-cursor')
      return
    }
    document.documentElement.classList.add('custom-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)

      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        'a, button, input, textarea, [data-cursor]',
      )
      setHovering(Boolean(el))
      setLabel(el?.dataset.cursor ?? null)
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-signal"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-signal/50 font-mono text-[0.6rem] tracking-widest text-signal uppercase backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: label ? 76 : hovering ? 44 : 28,
          height: label ? 76 : hovering ? 44 : 28,
          opacity: pressed ? 0.5 : 1,
          backgroundColor: hovering ? 'rgba(86,220,255,0.08)' : 'rgba(86,220,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      >
        {label}
      </motion.div>
    </div>
  )
}
