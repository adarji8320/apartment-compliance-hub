# Apartment Compliance Hub

> **Demo disclaimer:** This is a practice/portfolio project simulating an apartment building compliance & registration program for a fictional city ("Metropolis"). It is not affiliated with any real municipality.

**Live site:** [apartment-compliance-hub-demo.vercel.app](https://apartment-compliance-hub-demo.vercel.app/)

A React + TypeScript application for managing apartment building compliance registration, annual fees, fines, and colour-coded compliance status — modeled after municipal building-standards programs.

## Demo Login

| Field    | Value   |
| -------- | ------- |
| Login ID | `12345` |
| PIN      | `6789`  |

## Tech Stack

| Technology            | Purpose                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| React 19              | UI framework                                                                |
| TypeScript            | Type safety                                                                 |
| Vite                  | Build tool & dev server                                                     |
| Tailwind CSS 3        | Utility-first styling                                                       |
| shadcn/ui             | Component library (Radix UI primitives, "default" style / slate base color) |
| React Router 7        | Client-side routing                                                         |
| React Hook Form + Zod | Form state management & schema validation                                   |
| lucide-react          | Icons                                                                       |
| Prettier              | Code formatting                                                             |
| Vercel                | Hosting & deployment                                                        |

## Current Features

- **Landing page** — program overview, eligibility criteria, colour-coded compliance status legend (Green/Yellow/Red), fee teaser, contact info
- **Fees & Fines** — full fee schedule and common fine amounts
- **Login** — Zod-validated form (numeric Login ID/PIN), mock credentials, PIN show/hide toggle, session-based auth
- **Protected routes** — unauthenticated visitors are redirected to `/login` and returned to their originally-requested page after signing in
- **Dashboard** (owner portal) — welcome banner, renewal/compliance/service-request alerts, summary cards, quick actions, buildings overview table with colour rating and status badges
- **My Buildings** — searchable, filterable (by status and colour rating) table of registered buildings with an empty state
- **Register a Building** — 4-step wizard (property details, owner details, review, confirmation) with per-step validation, clickable step navigation to revisit completed steps, phone number auto-formatting, and a generated reference number
- **Renewal** — building selector scoped to buildings with "Renewal Due" status, live invoice (unit count, per-unit fee, automatic late-payment fine once past due, total owing), Zod-validated payment form (card number/expiry auto-formatting, Visa/MasterCard/Amex only), and a payment confirmation screen
- **Building Evaluation** — building selector, score breakdown by category with colour-coded progress bars, colour rating legend, evaluation history, and next scheduled evaluation date
- **Compliance Checklist** — building selector, live progress bar and completion count, toggleable checklist items with per-item notes and template download links, and a completion alert
- **Auth state everywhere** — Header, Footer, and Landing all reflect signed-in/out state (Login ⇄ Logout, "Register Your Building" hidden once signed in, hero CTA becomes "Go to Dashboard"); Footer is hidden on authenticated portal pages
- **Error boundary** — app-wide boundary catches render errors and shows a fallback UI instead of a blank screen
- **404 page** — catch-all route for unmatched paths with a link back home
- **Accessibility** — WCAG 2.x AA-targeted: verified colour contrast, skip-to-content link, focus management on route change, `aria-hidden` on decorative icons, labelled landmarks, accessible form errors

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands

```bash
npm run build           # Type-check and production build
npm run lint            # Run ESLint
npm run format          # Format all files with Prettier
npm run format:check    # Check formatting without writing changes
npm run preview         # Preview production build
```

## Deployment

Hosted on [Vercel](https://vercel.com), connected to this repository's `main` branch for automatic production deploys (and preview deploys on pull requests).

`vercel.json` adds a catch-all rewrite (`/(.*) → /index.html`) so that direct navigation or a page refresh on any client-side route (`/fees`, `/login`, `/dashboard`, etc.) is served correctly instead of 404ing — required for any single-page app using `BrowserRouter`.

## Project Structure

```
src/
├── components/
│   ├── ui/               # shadcn/ui components (Button, Card, Input, Label, Alert, Badge, Table, Select, Checkbox, Separator, Progress, Textarea)
│   ├── layout/           # Header, Footer, ProtectedRoute
│   ├── badges/           # ColourRatingBadge, StatusBadge
│   ├── ErrorBoundary.tsx # App-wide render-error fallback
│   ├── ScrollToTop.tsx   # Scroll + focus reset on route change (skips the initial mount)
│   └── DocumentTitle.tsx # Per-route document.title
├── pages/
│   ├── public/           # Landing, Fees, NotFound
│   ├── auth/             # Login
│   └── portal/           # Dashboard, My Buildings, Register, Renewal, Evaluation, Compliance (all protected)
├── context/
│   └── AuthContext.tsx   # Auth state + session persistence
├── hooks/
│   ├── useAuth.ts        # useAuth() hook
│   └── useBuildings.ts   # Search/filter state + stats over mock buildings
├── types/
│   └── index.ts          # Shared TypeScript interfaces
├── lib/
│   ├── utils.ts          # cn(), calculateAnnualFee(), formatCurrency(), formatDate(), formatPhoneNumber(), generateReferenceNumber(), formatCardNumber(), formatExpiryDate(), addYears(), isPastDue()
│   └── constants.ts      # App copy, fees, fines, demo credentials, wards
├── data/
│   ├── mockBuildings.ts  # Mock building records
│   └── mockServiceRequests.ts
├── App.tsx               # Router + providers
└── main.tsx              # Entry point
```

## Roadmap

The following are planned but not yet built, filling out the rest of the authenticated owner portal:

- **Service Requests** — submission with urgency detection and history

## License

Personal practice project — not for production or commercial use.
