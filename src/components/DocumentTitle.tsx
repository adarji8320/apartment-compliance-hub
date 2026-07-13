import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { APP_NAME } from '@/lib/constants';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/fees': 'Fees & Fines',
  '/login': 'Login',
  '/dashboard': 'Dashboard',
  '/buildings': 'My Buildings',
  '/register': 'Register a Building',
  '/renewal': 'Renewal',
  '/service-requests': 'Service Requests',
  '/evaluation': 'Building Evaluation',
  '/compliance': 'Compliance Checklist',
};

export default function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitle = PAGE_TITLES[pathname] ?? 'Page Not Found';
    document.title = `${pageTitle} | ${APP_NAME}`;
  }, [pathname]);

  return null;
}
