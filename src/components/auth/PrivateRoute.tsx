'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  fallback = (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      if (!user || !user.token) {
        // Not authenticated, redirect to login
        router.push('/login');
        return;
      }
      
      // Authenticated, allow access
      setIsChecking(false);
    };

    // Small delay to ensure store is hydrated
    const timer = setTimeout(checkAuth, 100);
    
    return () => clearTimeout(timer);
  }, [user, router]);

  // Show loading while checking authentication
  if (isChecking) {
    return <>{fallback}</>;
  }

  // If not authenticated, don't render children (redirect will happen)
  if (!user || !user.token) {
    return <>{fallback}</>;
  }

  // Authenticated, render children
  return <>{children}</>;
};

export default PrivateRoute;
