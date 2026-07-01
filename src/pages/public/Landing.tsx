import { Link } from 'react-router-dom'
import {
  Building2,
  ClipboardList,
  RefreshCw,
  ShieldCheck,
  Phone,
  Mail,
  DollarSign,
} from 'lucide-react'
import {
  APP_NAME,
  APP_TAGLINE,
  CITY_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  ANNUAL_FEE_PER_UNIT,
} from '@/lib/constants'

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2">
              <Building2 className="h-8 w-8" />
              <span className="text-sm font-medium text-white/70 uppercase tracking-wider">
                City of {CITY_NAME}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {APP_NAME}
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl">
              {APP_TAGLINE} — ensuring residential apartment buildings meet
              property standards for the health, safety, and well-being of tenants.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="px-6 py-3 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-colors"
              >
                Register Your Building
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white/10 transition-colors"
              >
                Owner Portal Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Alert */}
        <div className="mb-8 flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <span className="mt-0.5 text-blue-600">ℹ️</span>
          <div>
            <p className="font-semibold text-blue-800">NEW — July 2026: Updated Compliance Standards</p>
            <p className="mt-1 text-sm text-blue-700">
              As of July 1, 2026, all registered apartment buildings must display a colour-coded
              compliance sign at the main entrance indicating their current standing.
            </p>
          </div>
        </div>

        {/* Eligibility */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Program Eligibility</h2>
          <p className="text-gray-600 mb-3">
            The {APP_NAME} program applies to residential apartment buildings in {CITY_NAME} with:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              3 or more storeys
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              10 or more residential units
            </li>
          </ul>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <ClipboardList className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Register</h3>
              <p className="text-sm text-gray-600">
                Submit your building registration and receive your Owner ID and PIN within 5–7 business days.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <RefreshCw className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Renew Annually</h3>
              <p className="text-sm text-gray-600">
                Log in each year before July 31 to renew your registration and pay the annual fee online.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <ShieldCheck className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Stay Compliant</h3>
              <p className="text-sm text-gray-600">
                Track evaluations, respond to service requests, and maintain your building's compliance score.
              </p>
            </div>
          </div>
        </section>

        {/* Compliance Status */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Compliance Status Indicators</h2>
          <p className="text-sm text-gray-600 mb-6">
            All registered buildings display a colour-coded sign at the main entrance.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border-2 border-green-300 bg-green-50 p-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                <span className="text-xl font-bold text-white">G</span>
              </div>
              <h3 className="font-semibold text-green-800">Green</h3>
              <p className="mt-1 text-sm text-green-700">Good Standing</p>
              <p className="mt-1 text-xs text-green-600">Score: 75 and above</p>
            </div>
            <div className="rounded-lg border-2 border-yellow-300 bg-yellow-50 p-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500">
                <span className="text-xl font-bold text-white">Y</span>
              </div>
              <h3 className="font-semibold text-yellow-800">Yellow</h3>
              <p className="mt-1 text-sm text-yellow-700">Needs Improvement</p>
              <p className="mt-1 text-xs text-yellow-600">Score: 50–74</p>
            </div>
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500">
                <span className="text-xl font-bold text-white">R</span>
              </div>
              <h3 className="font-semibold text-red-800">Red</h3>
              <p className="mt-1 text-sm text-red-700">Significant Issues</p>
              <p className="mt-1 text-xs text-red-600">Score: below 50</p>
            </div>
          </div>
        </section>

        {/* Fee Teaser */}
        <section className="mb-12">
          <div className="rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">Annual Registration Fee</h2>
            </div>
            <p className="text-sm text-gray-700">
              The annual registration fee is{' '}
              <strong>${ANNUAL_FEE_PER_UNIT.toFixed(2)} per residential unit</strong>.
              For example, a 40-unit building pays{' '}
              <strong>${(40 * ANNUAL_FEE_PER_UNIT).toFixed(2)}</strong> per year.
            </p>
            <div className="mt-4">
              <Link to="/fees" className="text-sm text-primary underline underline-offset-2 hover:text-primary/80">
                View full fee schedule and fines →
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 rounded-lg border p-4 hover:bg-gray-50 transition-colors"
            >
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-primary">{CONTACT_EMAIL}</p>
              </div>
            </a>
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="flex items-center gap-3 rounded-lg border p-4 hover:bg-gray-50 transition-colors"
            >
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium">{CONTACT_PHONE}</p>
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
