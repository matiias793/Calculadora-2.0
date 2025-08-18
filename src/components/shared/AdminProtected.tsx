'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminProtectedProps {
  children: React.ReactNode;
}

const AdminProtected = ({ children }: AdminProtectedProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isAdmin = localStorage.getItem('isAdmin');
      const adminUser = localStorage.getItem('adminUser');

      if (isAdmin === 'true' && adminUser) {
        setIsAuthenticated(true);
      } else {
        // Si no está autenticado, redirigir al login
        router.push('/admin');
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // No renderizar nada mientras redirige
  }

  return <>{children}</>;
};

export default AdminProtected;

