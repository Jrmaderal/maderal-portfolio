import { Outlet } from 'react-router'
import Navbar from '../components/layout/NavBar'

const MainLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[#090914] text-[#F5F3FF]">
      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="bg-orb absolute -left-32 top-0 h-96 w-96 bg-[#8B3DFF]/30" />
        <div className="bg-orb absolute -right-32 top-1/3 h-80 w-80 bg-[#A855F7]/20" />
        <div className="bg-orb absolute bottom-0 left-1/3 h-72 w-72 bg-[#C084FC]/15" />
      </div>

      <Navbar />
      <main className="relative flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-[rgba(151,92,255,0.12)] py-8 text-center text-sm text-[#B6B2C9]">
        <p>© {new Date().getFullYear()} Rogelito Jr C. Maderal.</p>
      </footer>
    </div>
  )
}

export default MainLayout
