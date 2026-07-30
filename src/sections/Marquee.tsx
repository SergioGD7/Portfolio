import { useContent } from '../i18n'

/** Seamless ticker: the list is rendered twice and translated by exactly -50%. */
export function Marquee() {
  const t = useContent()

  return (
    <div
      className="relative overflow-hidden border-y border-line bg-ink/40 py-4"
      aria-hidden="true"
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8">
            {t.marquee.map((item) => (
              <span key={item} className="flex items-center gap-8">
                <span className="font-display text-sm font-medium tracking-tight text-mist sm:text-base">
                  {item}
                </span>
                <span className="h-1 w-1 rounded-full bg-brand/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
