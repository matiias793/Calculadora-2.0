'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import NavigationButtons from '@/components/shared/NavigationButtons';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Debug: mostrar las credenciales ingresadas
      console.log('Intentando login con:', {
        username: credentials.username,
        password: credentials.password
      });
      
      // Primero intentar con credenciales hardcodeadas (para desarrollo)
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        console.log('Login exitoso como admin (hardcoded)');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminUser', JSON.stringify({
          username: credentials.username,
          rol: 'admin'
        }));
        router.push('/admin/dashboard');
        return;
      } else if (credentials.username === 'superadmin' && credentials.password === 'superadmin123') {
        console.log('Login exitoso como superadmin (hardcoded)');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminUser', JSON.stringify({
          username: credentials.username,
          rol: 'super_admin'
        }));
        router.push('/admin/dashboard');
        return;
      }
      
      // Si no son credenciales hardcodeadas, consultar la base de datos
      console.log('Consultando base de datos para:', credentials.username);
      
      // Importar dinámicamente para evitar problemas de SSR
      const { supabase } = await import('@/lib/supabase');
      
      const { data, error } = await supabase
        .from('administradores')
        .select('*')
        .eq('username', credentials.username)
        .eq('password', credentials.password)
        .eq('activo', true)
        .single();

      if (error) {
        console.log('Error en consulta BD:', error);
        setError('Credenciales incorrectas');
        return;
      }

      if (data) {
        console.log('Login exitoso desde BD:', data);
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminUser', JSON.stringify({
          username: data.username,
          rol: data.rol,
          nombre_completo: data.nombre_completo
        }));
        router.push('/admin/dashboard');
      } else {
        console.log('Credenciales incorrectas');
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mb-6">
            <NavigationButtons />
          </div>
          
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Panel de Administrador
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ingresa tus credenciales para acceder
            </p>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-logoGreen focus:border-logoGreen"
                placeholder="Ingresa tu usuario"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-logoGreen focus:border-logoGreen"
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-logoGreen hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-logoGreen disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Credenciales de Prueba:</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Admin (Hardcoded):</strong> usuario: admin, contraseña: admin</p>
              <p><strong>Super Admin (Hardcoded):</strong> usuario: superadmin, contraseña: superadmin123</p>
              <p><strong>Base de Datos:</strong> Cualquier administrador registrado en la tabla 'administradores'</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
