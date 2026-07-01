import { Link } from 'react-router-dom'
import { APP_NAME, APP_TAGLINE, CITY_NAME, CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Fees & Fines', to: '/fees' },
  { label: 'Login', to: '/login' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-1">{APP_NAME}</h3>
            <p className="text-sm text-white/70">{APP_TAGLINE}</p>
            <p className="text-sm text-white/70 mt-1">City of {CITY_NAME}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide text-white/50">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/70 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide text-white/50">Contact</h4>
            <a href={`mailto:${CONTACT_EMAIL}`} className="block text-sm text-white/70 hover:text-secondary transition-colors">
              {CONTACT_EMAIL}
            </a>
            <a href={`tel:${CONTACT_PHONE}`} className="block text-sm text-white/70 hover:text-secondary transition-colors mt-1">
              {CONTACT_PHONE}
            </a>
          </div>
        </div>

        <div className="border-t border-primary/50 mt-8 pt-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
