import { useState, useEffect, useRef } from 'react'

type Project = {
  id: number
  title: string
  description: string
  image: string
  category: 'Web Development' | 'Applications' | 'Others'
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Barangay Tipo Web App',
    description:
      'A web app that digitalizes barangay operations so residents can access services, officials, and announcements online.',
    image: '/projects/barangay-tipo.png',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Olongapo FixIt',
    description:
      'A community reporting platform for Olongapo City that lets residents report street issues and track every handoff through review and repair.',
    image: '/projects/olongapo-fixit.png',
    category: 'Web Development',
  },
  {
    id: 3,
    title: 'Scientific Calculator',
    description:
      'A scientific calculator with trigonometric, logarithmic, and memory functions in a clean dark interface.',
    image: '/projects/scientific-calculator.png',
    category: 'Applications',
  },
]

const filters = ['All', 'Web Development', 'Applications', 'Others'] as const

const ProjectsPage = () => {
  const [active, setActive] = useState<(typeof filters)[number]>('All')
  const sectionRef = useRef<HTMLElement>(null)

  const filtered =
    active === 'All'
      ? projects
      : projects.filter((p) => p.category === active)

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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [active])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-6 md:py-24"
    >
      <div className="text-center">
        <span className="reveal inline-flex items-center rounded-full border border-[rgba(151,92,255,0.35)] bg-[rgba(139,61,255,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C084FC]">
          My Work
        </span>
        <h1 className="reveal mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Some of My <span className="text-gradient">Projects</span>
        </h1>
        <p className="reveal mx-auto mt-4 max-w-lg text-[#B6B2C9]">
          A collection of projects that showcase my skills and creativity.
        </p>
      </div>

      {/* Filters */}
      <div className="reveal mt-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              active === f
                ? 'bg-gradient-to-r from-[#8B3DFF] to-[#A855F7] text-white shadow-lg shadow-[rgba(139,61,255,0.3)]'
                : 'border border-[rgba(151,92,255,0.25)] bg-[#17172F]/60 text-[#B6B2C9] hover:border-[rgba(151,92,255,0.45)] hover:text-[#F5F3FF]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-[#B6B2C9]">
            No projects in this category yet.
          </p>
        ) : (
          filtered.map((project) => (
            <article
              key={project.id}
              className="reveal group overflow-hidden rounded-2xl border border-[rgba(151,92,255,0.2)] bg-[#17172F]/70 transition duration-300 hover:-translate-y-1 hover:border-[rgba(151,92,255,0.45)] hover:shadow-[0_8px_30px_rgba(139,61,255,0.2)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090914]/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-[#F5F3FF]">
                    {project.title}
                  </h2>
                  <span className="rounded-full bg-[rgba(139,61,255,0.15)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#C084FC]">
                    {project.category}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#B6B2C9]">
                  {project.description}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default ProjectsPage
