import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { APP_NAME } from '@/lib/constants'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Fees & Fines', to: '/fees' },
  { label: 'Login', to: '/login' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-lg font-bold tracking-tight hover:opacity-90">
            {APP_NAME}
          </Link>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={cn('block w-6 h-0.5 bg-white mb-1 transition-all', open && 'rotate-45 translate-y-1.5')} />
            <span className={cn('block w-6 h-0.5 bg-white mb-1 transition-all', open && 'opacity-0')} />
            <span className={cn('block w-6 h-0.5 bg-white transition-all', open && '-rotate-45 -translate-y-1.5')} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-primary/90 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-secondary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
