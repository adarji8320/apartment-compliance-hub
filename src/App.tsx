import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import Landing from '@/pages/public/Landing'
import Fees from '@/pages/public/Fees'
import LoginPage from '@/pages/auth/LoginPage'
import DashboardPage from '@/pages/portal/DashboardPage'
import BuildingsPage from '@/pages/portal/BuildingsPage'

const PUBLIC_PATHS = ['/', '/fees', '/login']

function AppLayout() {
  const location = useLocation()
  const showFooter = PUBLIC_PATHS.includes(location.pathname)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-brand focus:shadow-md"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buildings"
            element={
              <ProtectedRoute>
                <BuildingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
