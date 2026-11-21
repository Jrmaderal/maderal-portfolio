import { useEffect, useRef } from 'react'

const skills = [
  { name: 'HTML', icon: '/icons/html5.png' },
  { name: 'CSS', icon: '/icons/css3.png' },
  { name: 'JavaScript', icon: '/icons/javascript.png' },
  { name: 'React', icon: '/icons/react.png' },
  { name: 'TypeScript', icon: '/icons/typescript.png' },
  { name: 'Node.js', icon: '/icons/nodejs.png' },
  { name: 'Python', icon: '/icons/python.png' },
  { name: 'MySQL', icon: '/icons/mysql.png' },
]


const AboutPage = () => {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-6 md:py-24"
    >
      <div className="max-w-3xl">
        <span className="reveal inline-flex items-center rounded-full border border-[rgba(151,92,255,0.35)] bg-[rgba(139,61,255,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C084FC]">
          About Me
        </span>

        <h1 className="reveal mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Turning Ideas into{' '}
          <span className="text-gradient">Interactive Experiences.</span>
        </h1>

        <p className="reveal mt-6 text-base leading-relaxed text-[#B6B2C9] sm:text-lg">
          Hi, I&apos;m Rogelito Jr C. Maderal, a 2nd-year BSIT student at Gordon
          College. I&apos;m learning to build clean, modern web applications. I enjoy
          turning ideas into something people can actually use. So far, that has
          meant building a community reporting platform for Olongapo City, a web
          app that brings Barangay Tipo&apos;s services online. My goal is to grow into a developer who builds, accessible websites.
        </p>


        {/* Skills */}
        <div className="reveal mt-12">
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#B6B2C9]">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="group flex items-center gap-3 rounded-xl border border-[rgba(151,92,255,0.18)] bg-[#17172F]/70 px-4 py-3.5 transition hover:border-[rgba(151,92,255,0.45)] hover:bg-[rgba(139,61,255,0.08)]"
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-sm font-medium text-[#F5F3FF]">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
