import { Link } from 'react-router'
import { useEffect, useRef } from 'react'

const HomePage = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((node, i) => {
            setTimeout(() => node.classList.add('visible'), i * 120)
          })
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative mx-auto grid max-w-6xl scroll-mt-24 items-center gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-6 md:py-24 lg:py-28"
    >
      {/* Left content */}
      <div className="order-2 md:order-1">
        <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-[#A855F7]">
          Web Development | Design
        </p>

        <h1 className="reveal mt-4 text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
          Hi, I&apos;m{' '}
          <span className="text-gradient">Rogelito Jr C. Maderal.</span>
        </h1>

        <p className="reveal mt-6 max-w-md text-base leading-relaxed text-[#B6B2C9] sm:text-lg">
          An aspiring web developer passionate about building simple, accessible
          websites. Welcome to my portfolio.
        </p>

        <div className="reveal mt-9 flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm"
          >
            View Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            to="/about"
            className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm"
          >
            Learn More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right - Photo */}
      <div className="order-1 flex justify-center md:order-2 md:justify-end">
        <div className="reveal relative">
          {/* Glow behind */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#8B3DFF]/40 via-[#A855F7]/20 to-transparent blur-2xl" />
          {/* Decorative rings */}
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-[rgba(151,92,255,0.25)]" />
          <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full border border-[rgba(168,85,247,0.3)]" />

          <div className="relative overflow-hidden rounded-2xl border-2 border-[rgba(151,92,255,0.4)] p-1 glow-purple">
            <img
              src="/me.jpg"
              alt="Rogelito Jr C. Maderal"
              className="aspect-[4/5] w-full max-w-xs object-cover rounded-xl sm:max-w-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage
