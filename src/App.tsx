import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import DocumentTitle from '@/components/DocumentTitle';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import Landing from '@/pages/public/Landing';
import Fees from '@/pages/public/Fees';
import NotFound from '@/pages/public/NotFound';
import LoginPage from '@/pages/auth/LoginPage';
import DashboardPage from '@/pages/portal/DashboardPage';
import BuildingsPage from '@/pages/portal/BuildingsPage';
import RegisterPage from '@/pages/portal/RegisterPage';
import RenewalPage from '@/pages/portal/RenewalPage';
import ServiceRequestsPage from '@/pages/portal/ServiceRequestsPage';
import EvaluationPage from '@/pages/portal/EvaluationPage';
import CompliancePage from '@/pages/portal/CompliancePage';

const PUBLIC_PATHS = ['/', '/fees', '/login'];

function AppLayout() {
  const location = useLocation();
  const showFooter = PUBLIC_PATHS.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/renewal"
            element={
              <ProtectedRoute>
                <RenewalPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/service-requests"
            element={
              <ProtectedRoute>
                <ServiceRequestsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/evaluation"
            element={
              <ProtectedRoute>
                <EvaluationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compliance"
            element={
              <ProtectedRoute>
                <CompliancePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <DocumentTitle />
          <AppLayout />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
