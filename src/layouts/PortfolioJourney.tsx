import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import AboutPage from '../Pages/about/AboutPage'
import ContactPage from '../Pages/contact/ContactPage'
import HomePage from '../Pages/home/HomePage'
import ProjectsPage from '../Pages/projects/ProjectsPage'

const routeToSection: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/projects': 'projects',
  '/contact': 'contact',
}

const sectionToRoute: Record<string, string> = {
  home: '/',
  about: '/about',
  projects: '/projects',
  contact: '/contact',
}

const isScrollSpyNavigation = (state: unknown): boolean =>
  typeof state === 'object' &&
  state !== null &&
  'scrollSpy' in state &&
  state.scrollSpy === true

const PortfolioJourney = () => {
  const { pathname, state } = useLocation()
  const navigate = useNavigate()
  const pendingTarget = useRef(routeToSection[pathname] ?? 'home')

  useEffect(() => {
    if (isScrollSpyNavigation(state)) return

    const targetId = routeToSection[pathname]
    if (!targetId) return

    pendingTarget.current = targetId
    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    const timeout = window.setTimeout(() => {
      pendingTarget.current = ''
    }, 1800)

    return () => window.clearTimeout(timeout)
  }, [pathname, state])

  useEffect(() => {
    const sections = Object.keys(sectionToRoute)
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some(
            (entry) =>
              entry.target.id === pendingTarget.current && entry.isIntersecting
          )
        ) {
          pendingTarget.current = ''
        }

        if (pendingTarget.current) return

        const focusLine = window.innerHeight * 0.4
        const activeSection = sections.find((section) => {
          const bounds = section.getBoundingClientRect()
          return bounds.top <= focusLine && bounds.bottom > focusLine
        })

        if (!activeSection) return

        const activeRoute = sectionToRoute[activeSection.id]
        if (activeRoute && activeRoute !== pathname) {
          navigate(activeRoute, {
            replace: true,
            preventScrollReset: true,
            state: { scrollSpy: true },
          })
        }
      },
      { rootMargin: '-35% 0px -55% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [navigate, pathname])

  return (
    <>
      <HomePage />
      <AboutPage />
      <ProjectsPage />
      <ContactPage />
    </>
  )
}

export default PortfolioJourney
