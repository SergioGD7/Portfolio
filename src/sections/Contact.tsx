import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import emailjs from '@emailjs/browser'
import { emailjsConfig, profile, socials } from '../data/site'
import { Reveal, SectionHeading } from '../components/Reveal'
import { useCopyToClipboard } from '../lib/hooks'
import { useContent } from '../i18n'
import type { Content } from '../i18n/types'
import { CheckIcon, CopyIcon, MailIcon, socialIcons } from '../components/Icons'

type Fields = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values: Fields, t: Content): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = t.contact.errors.name
  if (!EMAIL_RE.test(values.email.trim())) errors.email = t.contact.errors.email
  if (values.message.trim().length < 10) errors.message = t.contact.errors.message
  return errors
}

export function Contact() {
  const t = useContent()
  const [values, setValues] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')
  const honeypot = useRef<HTMLInputElement>(null)
  const { copied, copy } = useCopyToClipboard()

  const setField =
    (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [key]: e.target.value }
      setValues(next)
      if (touched[key]) setErrors(validate(next, t))
    }

  const blur = (key: keyof Fields) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }))
    setErrors(validate(values, t))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return

    // Bots fill every field they find, including the hidden one.
    if (honeypot.current?.value) {
      setStatus('sent')
      setFeedback(t.contact.success)
      return
    }

    const found = validate(values, t)
    setErrors(found)
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(found).length > 0) {
      setStatus('error')
      setFeedback(t.contact.errors.incomplete)
      return
    }

    setStatus('sending')
    setFeedback('')

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          message: values.message.trim(),
          to_email: profile.email,
        },
        { publicKey: emailjsConfig.publicKey },
      )
      setStatus('sent')
      setFeedback(t.contact.success)
      setValues({ name: '', email: '', message: '' })
      setTouched({})
    } catch {
      setStatus('error')
      setFeedback(t.contact.failure(profile.email))
    }
  }

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
      />

      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: the pitch */}
          <div>
            <SectionHeading heading={t.contact.heading} />

            <Reveal delay={0.12}>
              <div className="mt-10 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="group inline-flex items-center gap-3 rounded-xl border border-line bg-ink/50 px-4 py-3 transition-colors hover:border-brand/40"
                  >
                    <MailIcon className="h-4 w-4 text-brand" />
                    <span className="font-mono text-sm text-chalk">{profile.email}</span>
                  </a>
                  <button
                    onClick={() => void copy(profile.email)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-mist transition-colors hover:border-brand/40 hover:text-signal"
                    aria-label={t.contact.copyEmail}
                  >
                    {copied ? (
                      <CheckIcon className="h-4 w-4 text-pass" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {socials.map((s) => {
                    const Icon = socialIcons[s.icon]
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 rounded-xl border border-line px-4 py-2.5 text-sm text-mist transition-colors hover:border-brand/40 hover:text-signal"
                      >
                        <Icon className="h-4 w-4" />
                        {s.label}
                      </a>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: the form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-2xl border border-line bg-ink/50 p-6 backdrop-blur-sm sm:p-8"
            >
              {/* honeypot — hidden from people, irresistible to bots */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">{t.contact.honeypotLabel}</label>
                <input id="website" ref={honeypot} type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <Field
                id="name"
                label={t.contact.name}
                value={values.name}
                onChange={setField('name')}
                onBlur={blur('name')}
                error={touched.name ? errors.name : undefined}
                autoComplete="name"
                placeholder={t.contact.namePlaceholder}
              />

              <Field
                id="email"
                label={t.contact.email}
                type="email"
                value={values.email}
                onChange={setField('email')}
                onBlur={blur('email')}
                error={touched.email ? errors.email : undefined}
                autoComplete="email"
                placeholder={t.contact.emailPlaceholder}
              />

              <Field
                id="message"
                label={t.contact.message}
                multiline
                value={values.message}
                onChange={setField('message')}
                onBlur={blur('message')}
                error={touched.message ? errors.message : undefined}
                placeholder={t.contact.messagePlaceholder}
              />

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-chalk px-6 py-3.5 text-sm font-semibold text-void transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' && (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-void/30 border-t-void" />
                )}
                {status === 'sending'
                  ? t.contact.sending
                  : status === 'sent'
                    ? t.contact.sent
                    : t.contact.send}
              </button>

              <div aria-live="polite" className="min-h-10">
                <AnimatePresence mode="wait">
                  {feedback && (
                    <motion.p
                      key={feedback}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-3 flex items-start gap-2 text-sm ${
                        status === 'sent' ? 'text-pass' : 'text-fail'
                      }`}
                    >
                      {status === 'sent' && <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
                      {feedback}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur: () => void
  error?: string
  type?: string
  multiline?: boolean
  autoComplete?: string
  placeholder?: string
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  multiline,
  autoComplete,
  placeholder,
}: FieldProps) {
  const describedBy = error ? `${id}-error` : undefined
  const shared = {
    id,
    name: id,
    value,
    onChange,
    onBlur,
    placeholder,
    autoComplete,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy,
    className: `w-full rounded-xl border bg-void/60 px-4 py-3 text-sm text-chalk transition-colors outline-none placeholder:text-dim focus:border-brand ${
      error ? 'border-fail/60' : 'border-line'
    }`,
  }

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[0.7rem] tracking-[0.16em] text-mist uppercase"
      >
        {label}
      </label>

      {multiline ? (
        <textarea {...shared} rows={5} className={`${shared.className} resize-y`} />
      ) : (
        <input {...shared} type={type} />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            id={describedBy}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 overflow-hidden text-xs text-fail"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
