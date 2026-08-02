import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Roles allowed to view this route. If omitted, any authenticated user is allowed. */
  allow?: Array<'admin' | 'employee' | 'user' | 'farmer'>;
}

export default function ProtectedRoute({ children, allow }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [location, navigate] = useLocation();

  const allowed = !allow || (user && allow.includes(user.role as any));

  useEffect(() => {
    if (loading) return;
    if (!user) {
      // Preserve the intended path as a redirect parameter
      const redirectPath = encodeURIComponent(location);
      navigate(`/login?redirect=${redirectPath}`);
      return;
    }
    if (!allowed) {
      navigate('/');
    }
  }, [loading, user, allowed, navigate, location]);

  if (loading || !user || !allowed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-700" />
      </div>
    );
  }

  return <>{children}</>;
}
