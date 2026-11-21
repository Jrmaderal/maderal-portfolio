import { useState, useEffect, useRef } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

type FormData = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const ContactPage = () => {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((node, i) => {
            setTimeout(() => node.classList.add('visible'), i * 100)
          })
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.email.trim()) {
      next.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email'
    }
    if (!form.message.trim()) next.message = 'Message is required'
    else if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')

    // Build a mailto link so the message opens in the user's email client
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    const mailto = `mailto:jrmaderal0114@gmail.com?subject=${subject}&body=${body}`

    // Open the user's email client
    window.location.href = mailto

    // Show success state
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    }, 600)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-6 md:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left info */}
        <div>
          <span className="reveal inline-flex items-center rounded-full border border-[rgba(151,92,255,0.35)] bg-[rgba(139,61,255,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C084FC]">
            Get In Touch
          </span>
          <h1 className="reveal mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Let&apos;s <span className="text-gradient">Connect!</span>
          </h1>
          <p className="reveal mt-5 max-w-md text-base leading-relaxed text-[#B6B2C9]">
            Have a project in mind, a question, or just want to say hi? Feel free
            to reach out!
          </p>

          <div className="reveal mt-10 space-y-5">
            <a
              href="mailto:Jrmaderal0114@gmail.com"
              className="flex items-center gap-4 rounded-xl border border-[rgba(151,92,255,0.18)] bg-[#17172F]/60 p-4 transition hover:border-[rgba(151,92,255,0.4)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#8B3DFF]/30 to-[#A855F7]/20 text-[#C084FC]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#B6B2C9]">Email</p>
                <p className="text-sm font-medium text-[#F5F3FF]">Jrmaderal0114@gmail.com</p>
              </div>
            </a>

            <a
              href="https://github.com/Jrmaderal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-[rgba(151,92,255,0.18)] bg-[#17172F]/60 p-4 transition hover:border-[rgba(151,92,255,0.4)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#8B3DFF]/30 to-[#A855F7]/20 text-[#C084FC]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#B6B2C9]">GitHub</p>
                <p className="text-sm font-medium text-[#F5F3FF]">github.com/Jrmaderal</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right form */}
        <div className="reveal">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass-card rounded-2xl p-6 sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#F5F3FF]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full rounded-xl border bg-[#101020] px-4 py-3 text-sm text-[#F5F3FF] outline-none transition placeholder:text-[#B6B2C9]/50 focus:border-[#A855F7] focus:ring-2 focus:ring-[#8B3DFF]/25 ${
                    errors.name ? 'border-red-400/60' : 'border-[rgba(151,92,255,0.25)]'
                  }`}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#F5F3FF]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border bg-[#101020] px-4 py-3 text-sm text-[#F5F3FF] outline-none transition placeholder:text-[#B6B2C9]/50 focus:border-[#A855F7] focus:ring-2 focus:ring-[#8B3DFF]/25 ${
                    errors.email ? 'border-red-400/60' : 'border-[rgba(151,92,255,0.25)]'
                  }`}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#F5F3FF]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or just say hi..."
                  className={`w-full resize-none rounded-xl border bg-[#101020] px-4 py-3 text-sm text-[#F5F3FF] outline-none transition placeholder:text-[#B6B2C9]/50 focus:border-[#A855F7] focus:ring-2 focus:ring-[#8B3DFF]/25 ${
                    errors.message ? 'border-red-400/60' : 'border-[rgba(151,92,255,0.25)]'
                  }`}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Opening email...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="rounded-lg bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-400">
                  Your email client should open with the message ready to send.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
