import { useState } from 'react';
import { Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building2, Eye, EyeOff, Loader2, Info } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CITY_NAME, CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants';

const loginSchema = z.object({
  loginId: z.string().min(1, 'Login ID is required').regex(/^\d+$/, 'Login ID must be numeric'),
  pin: z.string().min(1, 'PIN is required').regex(/^\d+$/, 'PIN must be numeric'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LocationState {
  from?: { pathname: string };
}

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const from = state?.from?.pathname ?? '/dashboard';
  const [showPin, setShowPin] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  function onSubmit(values: LoginFormValues) {
    setAuthError(null);
    const success = login(values.loginId, values.pin);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setAuthError('Invalid Login ID or PIN');
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <Alert variant="info">
          <Info className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>Demo Credentials</AlertTitle>
          <AlertDescription>
            Use <strong>Login ID: 12345</strong> and <strong>PIN: 6789</strong> to explore the
            portal.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand">
              <Building2 className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <CardTitle as="h1" className="text-xl">
              Building Owner Login
            </CardTitle>
            <CardDescription>
              Enter your Login ID and PIN to access the owner portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {authError && (
                <Alert variant="destructive" aria-live="assertive">
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="loginId">Login ID</Label>
                <Input
                  id="loginId"
                  type="text"
                  inputMode="numeric"
                  autoComplete="username"
                  placeholder="Enter your Login ID"
                  aria-describedby={errors.loginId ? 'loginId-error' : 'loginId-hint'}
                  aria-invalid={!!errors.loginId}
                  {...register('loginId')}
                />
                <p id="loginId-hint" className="text-xs text-gray-500">
                  Use the Login ID provided by the City of {CITY_NAME}
                </p>
                {errors.loginId && (
                  <p id="loginId-error" className="text-xs text-red-600" role="alert">
                    {errors.loginId.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pin">PIN</Label>
                <div className="relative">
                  <Input
                    id="pin"
                    type={showPin ? 'text' : 'password'}
                    inputMode="numeric"
                    autoComplete="current-password"
                    placeholder="Enter your PIN"
                    className="pr-10"
                    aria-describedby={errors.pin ? 'pin-error' : 'pin-hint'}
                    aria-invalid={!!errors.pin}
                    {...register('pin')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showPin ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <p id="pin-hint" className="text-xs text-gray-500">
                  Use the PIN provided by the City of {CITY_NAME}
                </p>
                {errors.pin && (
                  <p id="pin-error" className="text-xs text-red-600" role="alert">
                    {errors.pin.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-brand hover:bg-brand/90"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Signing in…
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            </form>

            <div className="mt-6 border-t pt-4">
              <p className="text-xs text-gray-500 text-center mb-2">Forgot your credentials?</p>
              <div className="text-xs text-gray-600 space-y-1 text-center">
                <p>
                  Email:{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-brand underline underline-offset-2"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a href={`tel:${CONTACT_PHONE}`} className="text-brand">
                    {CONTACT_PHONE}
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-brand underline underline-offset-2 hover:text-brand/90"
          >
            Register your building
          </Link>
        </p>
      </div>
    </div>
  );
}
