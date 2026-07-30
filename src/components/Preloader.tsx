import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useReducedMotion } from '../lib/hooks'
import { useContent } from '../i18n'

type Props = {
  onDone: () => void
}

export function Preloader({ onDone }: Props) {
  const reduced = useReducedMotion()
  // Reads like a test runner booting up — on theme for a QA portfolio.
  const checks = useContent().preloader.checks
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reduced) {
      setVisible(false)
      onDone()
      return
    }

    const start = performance.now()
    const DURATION = 1500
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION)
      // ease-out so it decelerates into 100 instead of snapping
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setVisible(false)
          onDone()
        }, 260)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onDone, reduced])

  const activeCheck = Math.min(checks.length - 1, Math.floor((progress / 100) * checks.length))

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-live="polite"
        >
          <div className="w-[min(22rem,80vw)]">
            <div className="flex items-baseline justify-between font-mono text-[0.7rem] tracking-[0.2em] text-dim uppercase">
              <span>Sergio González Díaz</span>
              <span className="tabular-nums text-signal">{progress}%</span>
            </div>

            <div className="mt-3 h-px w-full overflow-hidden bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-brand to-signal"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeCheck}
                  className="font-mono text-[0.7rem] text-mist"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="text-pass">✓</span> {checks[activeCheck]}
                  <span className="caret ml-1">_</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
