import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function NotFound() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-6xl font-bold text-brand mb-2" aria-hidden="true">
        404
      </p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-sm text-gray-600 mb-6">
        Sorry, we couldn't find the page you were looking for.
      </p>
      <Button asChild className="bg-brand hover:bg-brand/90">
        <Link to={isAuthenticated ? '/dashboard' : '/'}>
          {isAuthenticated ? 'Return to dashboard' : 'Return to home'}
        </Link>
      </Button>
    </div>
  );
}
