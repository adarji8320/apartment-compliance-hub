# Apartment Compliance Hub

> **Demo disclaimer:** This is a practice/portfolio project simulating an apartment building compliance & registration program for a fictional city ("Metropolis"). It is not affiliated with any real municipality.

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

## Current Features

- **Landing page** — program overview, eligibility criteria, colour-coded compliance status legend (Green/Yellow/Red), fee teaser, contact info
- **Fees & Fines** — full fee schedule and common fine amounts
- **Login** — Zod-validated form, mock credentials, PIN show/hide toggle, session-based auth
- **Auth state everywhere** — Header, Footer, and Landing all reflect signed-in/out state (Login ⇄ Logout, "Register Your Building" hidden once signed in, hero CTA becomes "Go to Dashboard")
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
npm run build    # Type-check and production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── ui/             # shadcn/ui components (Button, Card, Input, Label, Form, Alert)
│   ├── layout/         # Header, Footer
│   └── ScrollToTop.tsx # Scroll + focus reset on route change
├── pages/
│   ├── public/         # Landing, Fees
│   └── auth/           # Login
├── context/
│   └── AuthContext.tsx # Auth state + session persistence
├── hooks/
│   └── useAuth.ts      # useAuth() hook
├── types/
│   └── index.ts        # Shared TypeScript interfaces
├── lib/
│   ├── utils.ts        # cn() class-merge helper
│   └── constants.ts    # App copy, fees, fines, demo credentials
├── App.tsx             # Router + providers
└── main.tsx            # Entry point
```

## Roadmap

The following are planned but not yet built — an authenticated "owner portal" alongside the existing public pages:

- **Protected routes** — route guard redirecting unauthenticated users to `/login`
- **Dashboard** — summary cards, alert banners, buildings overview
- **My Buildings** — searchable/filterable table with colour rating and status badges
- **Register Building** — multi-step registration form with fee calculation
- **Renewal** — building selector, invoice, payment form
- **Service Requests** — submission with urgency detection and history
- **Compliance Checklist** — interactive checklist with progress tracking
- **Building Evaluation** — score breakdown, colour rating history
- **Mock data layer** — sample buildings/service requests under `src/data/`
- **Additional shadcn/ui components** as new pages require them (table, badge, dialog, select, etc.)

## License

Personal practice project — not for production or commercial use.
