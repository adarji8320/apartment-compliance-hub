import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { APP_NAME } from '@/lib/constants'
import { useAuth } from '@/hooks/useAuth'

const navButtonClass =
  'inline-flex items-center gap-2 px-4 py-2 border border-white text-white text-sm font-semibold rounded-md hover:bg-white/10 transition-colors'

const publicNavLinks = [
  { label: 'Home', to: '/' },
  { label: 'Fees & Fines', to: '/fees' },
]

const portalNavLinks = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'My Buildings', to: '/buildings' },
  { label: 'Register Building', to: '/register' },
  { label: 'Renewal', to: '/renewal' },
  { label: 'Service Requests', to: '/service-requests' },
  { label: 'Compliance', to: '/compliance' },
  { label: 'Evaluation', to: '/evaluation' },
  { label: 'Fees & Fines', to: '/fees' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const navLinks = isAuthenticated ? portalNavLinks : publicNavLinks

  function handleLogout() {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="bg-brand sticky top-0 z-50 w-full border-b text-white shadow-md">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-lg font-bold tracking-tight hover:opacity-90">
            {APP_NAME}
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-brand-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <span className="text-white/80">{user.ownerName}</span>
                <button onClick={handleLogout} className={navButtonClass}>
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className={navButtonClass}>
                Login
              </Link>
            )}
          </nav>

          <button
            className="lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={cn('block w-6 h-0.5 bg-white mb-1 transition-all', open && 'rotate-45 translate-y-1.5')} />
            <span className={cn('block w-6 h-0.5 bg-white mb-1 transition-all', open && 'opacity-0')} />
            <span className={cn('block w-6 h-0.5 bg-white transition-all', open && '-rotate-45 -translate-y-1.5')} />
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile navigation" className="lg:hidden bg-brand/90 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-brand-secondary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && user ? (
            <button onClick={handleLogout} className={cn(navButtonClass, 'w-fit')}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout ({user.ownerName})
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className={cn(navButtonClass, 'w-fit')}>
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
