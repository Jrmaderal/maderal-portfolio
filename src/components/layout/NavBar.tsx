import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  const handleLinkClick = (to: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false)
    if (pathname !== to) return

    event.preventDefault()
    const sectionId = to === '/' ? 'home' : to.slice(1)
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(151,92,255,0.15)] bg-[#090914]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 transition hover:opacity-90"
          onClick={handleLinkClick('/')}
        >

          <span className="hidden text-sm font-semibold tracking-wide text-[#F5F3FF] sm:inline">
            Rogelito Jr C. Maderal
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={handleLinkClick(link.to)}
              className={({ isActive }) =>
                `relative py-1 transition-colors ${
                  isActive
                    ? 'text-[#F5F3FF]'
                    : 'text-[#B6B2C9] hover:text-[#F5F3FF]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-[#8B3DFF] to-[#A855F7]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            onClick={handleLinkClick('/contact')}
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#F5F3FF] md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[rgba(151,92,255,0.15)] bg-[#101020]/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={handleLinkClick(link.to)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[rgba(139,61,255,0.15)] text-[#C084FC]'
                      : 'text-[#B6B2C9] hover:bg-[rgba(139,61,255,0.08)] hover:text-[#F5F3FF]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={handleLinkClick('/contact')}
              className="btn-primary mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm"
            >
              Let&apos;s Talk
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
