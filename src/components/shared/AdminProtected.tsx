'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminProtectedProps {
  children: React.ReactNode;
}

const AdminProtected = ({ children }: AdminProtectedProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Verificar que estamos en el cliente
        if (typeof window === 'undefined') {
          setLoading(false);
          return;
        }

        const isAdmin = localStorage.getItem('isAdmin');
        const adminUser = localStorage.getItem('adminUser');
        const authTimestamp = localStorage.getItem('authTimestamp');

        // Validar que todos los datos necesarios estén presentes
        if (!isAdmin || !adminUser || !authTimestamp) {
          throw new Error('Datos de autenticación incompletos');
        }

        // Validar que isAdmin sea exactamente 'true'
        if (isAdmin !== 'true') {
          throw new Error('Usuario no es administrador');
        }

        // Validar que adminUser no esté vacío
        if (adminUser.trim() === '') {
          throw new Error('Usuario administrador inválido');
        }

        // Verificar que la sesión no haya expirado (24 horas)
        const timestamp = parseInt(authTimestamp, 10);
        const now = Date.now();
        const sessionExpiry = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

        if (isNaN(timestamp) || (now - timestamp) > sessionExpiry) {
          // Limpiar datos expirados
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('adminUser');
          localStorage.removeItem('authTimestamp');
          throw new Error('Sesión expirada');
        }

        setIsAuthenticated(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error de autenticación');
        setIsAuthenticated(false);
        
        // Limpiar datos de autenticación en caso de error
        if (typeof window !== 'undefined') {
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('adminUser');
          localStorage.removeItem('authTimestamp');
        }
        
        // Redirigir al login después de un breve delay
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } finally {
        setLoading(false);
      }
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error de autenticación</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirigiendo al login...</p>
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




