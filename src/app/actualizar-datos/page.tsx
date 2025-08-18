'use client';

import { useState, useEffect } from 'react';
import BackButton from '@/components/shared/BackButton';
import { authService, uniformeService, User as SupabaseUser, Uniforme } from '@/lib/supabase';

// Lista de los 19 departamentos de Uruguay
const DEPARTAMENTOS_URUGUAY = [
  'Artigas',
  'Canelones',
  'Cerro Largo',
  'Colonia',
  'Durazno',
  'Flores',
  'Florida',
  'Lavalleja',
  'Maldonado',
  'Montevideo',
  'Paysandú',
  'Río Negro',
  'Rivera',
  'Rocha',
  'Salto',
  'San José',
  'Soriano',
  'Tacuarembó',
  'Treinta y Tres'
];

interface User {
  documento: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  departamento: string;
  escuela: string;
  celular: string;
  password: string;
}

export default function ActualizarDatos() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<'datos' | 'uniformes'>('datos');

  // Estados para formulario de login
  const [loginData, setLoginData] = useState({
    documento: '',
    password: ''
  });

  // Estados para formulario de registro
  const [registerData, setRegisterData] = useState({
    documento: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    departamento: '',
    escuela: '',
    celular: '',
    password: '',
    confirmPassword: ''
  });

  // Estados para formulario de actualización
  const [updateData, setUpdateData] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    departamento: '',
    escuela: '',
    celular: '',
    password: '',
    confirmPassword: ''
  });

  // Estados para datos de uniforme
  const [uniformeData, setUniformeData] = useState<Partial<Uniforme>>({
    talle_tunica: '',
    talle_calzado: '',
    tipo_uniforme: 'cocina'
  });
  const [loadingUniforme, setLoadingUniforme] = useState(false);
  const [savingUniforme, setSavingUniforme] = useState(false);
  const [uniformeError, setUniformeError] = useState('');
  const [uniformeSuccess, setUniformeSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await authService.login(loginData.documento, loginData.password);
      
      if (error) {
        alert('Error al iniciar sesión: Credenciales incorrectas');
        return;
      }
      
      if (data) {
        setIsAuthenticated(true);
        setCurrentUser({
          documento: data.documento,
          primer_nombre: data.primer_nombre,
          segundo_nombre: data.segundo_nombre || '',
          primer_apellido: data.primer_apellido,
          segundo_apellido: data.segundo_apellido || '',
          departamento: data.departamento,
          escuela: data.escuela,
          celular: data.celular,
          password: ''
        });
        
        // Cargar datos en el formulario de actualización
        setUpdateData({
          primer_nombre: data.primer_nombre,
          segundo_nombre: data.segundo_nombre || '',
          primer_apellido: data.primer_apellido,
          segundo_apellido: data.segundo_apellido || '',
          departamento: data.departamento,
          escuela: data.escuela,
          celular: data.celular,
          password: '',
          confirmPassword: ''
        });

        // Cargar datos de uniforme existentes
        loadUniformeData(data.documento);
      }
    } catch (error) {
      alert('Error al iniciar sesión');
      console.error('Login error:', error);
    }
  };

  const loadUniformeData = async (documento: string) => {
    setLoadingUniforme(true);
    try {
      const { data, error } = await uniformeService.getUniformeByDocument(documento);
      
      if (error) {
        console.error('Error cargando datos de uniforme:', error);
      } else if (data) {
        setUniformeData({
          talle_tunica: data.talle_tunica,
          talle_calzado: data.talle_calzado,
          tipo_uniforme: data.tipo_uniforme
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingUniforme(false);
    }
  };

  const handleSaveUniforme = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setUniformeError('');
    setUniformeSuccess('');
    setSavingUniforme(true);

    try {
      const { error } = await uniformeService.updateUniforme({
        documento: currentUser.documento,
        talle_tunica: uniformeData.talle_tunica!,
        talle_calzado: uniformeData.talle_calzado!,
        tipo_uniforme: uniformeData.tipo_uniforme!
      });

      if (error) {
        setUniformeError('Error al guardar los datos. Intenta nuevamente.');
      } else {
        setUniformeSuccess('Datos de uniforme actualizados correctamente');
        setTimeout(() => setUniformeSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setUniformeError('Error al guardar los datos. Intenta nuevamente.');
    } finally {
      setSavingUniforme(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    try {
      const userData = {
        documento: registerData.documento,
        primer_nombre: registerData.primer_nombre,
        segundo_nombre: registerData.segundo_nombre || undefined,
        primer_apellido: registerData.primer_apellido,
        segundo_apellido: registerData.segundo_apellido || undefined,
        departamento: registerData.departamento,
        escuela: registerData.escuela,
        celular: registerData.celular,
        password: registerData.password
      };
      
      const { data, error } = await authService.register(userData);
      
      if (error) {
        alert('Error al registrar usuario: ' + (error as any).message);
        return;
      }
      
      if (data) {
        alert('Usuario registrado exitosamente');
        setIsLogin(true);
        setRegisterData({
          documento: '',
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          departamento: '',
          escuela: '',
          celular: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      alert('Error al registrar usuario');
      console.error('Register error:', error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updateData.password !== updateData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (!currentUser) return;
    
    try {
      const updateUserData: any = {
        primer_nombre: updateData.primer_nombre,
        segundo_nombre: updateData.segundo_nombre || undefined,
        primer_apellido: updateData.primer_apellido,
        segundo_apellido: updateData.segundo_apellido || undefined,
        departamento: updateData.departamento,
        escuela: updateData.escuela,
        celular: updateData.celular
      };
      
      // Solo actualizar contraseña si se proporcionó una nueva
      if (updateData.password) {
        updateUserData.password = updateData.password;
      }
      
      const { data, error } = await authService.updateUser(currentUser.documento, updateUserData);
      
      if (error) {
        alert('Error al actualizar datos: ' + (error as any).message);
        return;
      }
      
      if (data) {
        alert('Datos actualizados exitosamente');
        // Actualizar el usuario actual
        setCurrentUser({
          documento: data.documento,
          primer_nombre: data.primer_nombre,
          segundo_nombre: data.segundo_nombre || '',
          primer_apellido: data.primer_apellido,
          segundo_apellido: data.segundo_apellido || '',
          departamento: data.departamento,
          escuela: data.escuela,
          celular: data.celular,
          password: ''
        });
      }
    } catch (error) {
      alert('Error al actualizar datos');
      console.error('Update error:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginData({ documento: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <BackButton href="/otras-funciones" />
        
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h1 className="text-3xl font-bold text-center text-logoGreen mb-8">
            Actualizar Mis Datos
          </h1>

          {!isAuthenticated ? (
            <div>
              {/* Selector de modo */}
              <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    isLogin ? 'bg-white shadow-sm text-logoGreen' : 'text-gray-600'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    !isLogin ? 'bg-white shadow-sm text-logoGreen' : 'text-gray-600'
                  }`}
                >
                  Crear Cuenta
                </button>
              </div>

              {isLogin ? (
                // Formulario de Login
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Documento de Identidad *
                    </label>
                    <input
                      type="text"
                      required
                      value={loginData.documento}
                      onChange={(e) => setLoginData({...loginData, documento: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                      placeholder="Ej: 12345678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña *
                    </label>
                    <input
                      type="password"
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                      placeholder="Ingresa tu contraseña"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-logoGreen text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-medium"
                  >
                    Iniciar Sesión
                  </button>
                </form>
              ) : (
                // Formulario de Registro
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Documento de Identidad *
                      </label>
                      <input
                        type="text"
                        required
                        value={registerData.documento}
                        onChange={(e) => setRegisterData({...registerData, documento: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                        placeholder="Ej: 12345678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Primer Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        value={registerData.primer_nombre}
                        onChange={(e) => setRegisterData({...registerData, primer_nombre: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                        placeholder="Ej: Juan"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Segundo Nombre
                      </label>
                      <input
                        type="text"
                        value={registerData.segundo_nombre}
                        onChange={(e) => setRegisterData({...registerData, segundo_nombre: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                        placeholder="Ej: Carlos"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Primer Apellido *
                      </label>
                      <input
                        type="text"
                        required
                        value={registerData.primer_apellido}
                        onChange={(e) => setRegisterData({...registerData, primer_apellido: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                        placeholder="Ej: Pérez"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Segundo Apellido
                      </label>
                      <input
                        type="text"
                        value={registerData.segundo_apellido}
                        onChange={(e) => setRegisterData({...registerData, segundo_apellido: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                        placeholder="Ej: González"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Departamento *
                      </label>
                      <select
                        required
                        value={registerData.departamento}
                        onChange={(e) => setRegisterData({...registerData, departamento: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                      >
                        <option value="">Selecciona un departamento</option>
                        {DEPARTAMENTOS_URUGUAY.map((departamento) => (
                          <option key={departamento} value={departamento}>
                            {departamento}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Escuela donde trabaja *
                      </label>
                      <input
                        type="text"
                        required
                        value={registerData.escuela}
                        onChange={(e) => setRegisterData({...registerData, escuela: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                        placeholder="Ej: Escuela N° 123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Celular de contacto *
                      </label>
                      <input
                        type="tel"
                        required
                        value={registerData.celular}
                        onChange={(e) => setRegisterData({...registerData, celular: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                        placeholder="Ej: 099123456"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña *
                      </label>
                      <input
                        type="password"
                        required
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                        placeholder="Mínimo 6 caracteres"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar Contraseña *
                      </label>
                      <input
                        type="password"
                        required
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                        placeholder="Repite tu contraseña"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-logoGreen text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-medium"
                  >
                    Crear Cuenta
                  </button>
                </form>
              )}
            </div>
          ) : (
            // Panel del usuario autenticado
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  ¡Bienvenido, {currentUser?.primer_nombre}!
                </h2>
                <p className="text-green-700">
                  Documento: {currentUser?.documento}
                </p>
              </div>

              {/* Botones de navegación entre secciones */}
              <div className="flex space-x-4 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveSection('datos')}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeSection === 'datos'
                      ? 'bg-logoGreen text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  📝 Datos Personales
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('uniformes')}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeSection === 'uniformes'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  👔 Datos de Uniforme
                </button>
              </div>

              {/* Sección de Datos Personales */}
              {activeSection === 'datos' && (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Actualizar Información Personal
                  </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primer Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={updateData.primer_nombre}
                      onChange={(e) => setUpdateData({...updateData, primer_nombre: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                      placeholder="Ej: Juan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Segundo Nombre
                    </label>
                    <input
                      type="text"
                      value={updateData.segundo_nombre}
                      onChange={(e) => setUpdateData({...updateData, segundo_nombre: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                      placeholder="Ej: Carlos"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primer Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={updateData.primer_apellido}
                      onChange={(e) => setUpdateData({...updateData, primer_apellido: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                      placeholder="Ej: Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Segundo Apellido
                    </label>
                    <input
                      type="text"
                      value={updateData.segundo_apellido}
                      onChange={(e) => setUpdateData({...updateData, segundo_apellido: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                      placeholder="Ej: González"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Departamento *
                    </label>
                    <select
                      required
                      value={updateData.departamento}
                      onChange={(e) => setUpdateData({...updateData, departamento: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                    >
                      <option value="">Selecciona un departamento</option>
                      {DEPARTAMENTOS_URUGUAY.map((departamento) => (
                        <option key={departamento} value={departamento}>
                          {departamento}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Escuela donde trabaja *
                    </label>
                    <input
                      type="text"
                      required
                      value={updateData.escuela}
                      onChange={(e) => setUpdateData({...updateData, escuela: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                      placeholder="Ej: Escuela N° 123"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Celular de contacto *
                    </label>
                    <input
                      type="tel"
                      required
                      value={updateData.celular}
                      onChange={(e) => setUpdateData({...updateData, celular: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                      placeholder="Ej: 099123456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nueva Contraseña (opcional)
                    </label>
                    <input
                      type="password"
                      value={updateData.password}
                      onChange={(e) => setUpdateData({...updateData, password: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                      placeholder="Deja vacío para mantener la actual"
                    />
                  </div>
                </div>
                {updateData.password && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      value={updateData.confirmPassword}
                      onChange={(e) => setUpdateData({...updateData, confirmPassword: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-logoGreen focus:border-transparent"
                      placeholder="Repite la nueva contraseña"
                    />
                  </div>
                )}
                
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-logoGreen text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-medium"
                  >
                    Actualizar Datos
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-md hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </form>
              )}

              {/* Sección de Datos de Uniforme */}
              {activeSection === 'uniformes' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Actualizar Datos de Uniforme
                  </h3>

                  {/* Mensajes de error y éxito */}
                  {uniformeError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                      {uniformeError}
                    </div>
                  )}
                  {uniformeSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                      {uniformeSuccess}
                    </div>
                  )}

                  {loadingUniforme ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="mt-2 text-gray-600">Cargando datos de uniforme...</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveUniforme} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="talle_tunica" className="block text-sm font-medium text-gray-700 mb-2">
                            Talle de Túnica *
                          </label>
                          <select
                            id="talle_tunica"
                            value={uniformeData.talle_tunica}
                            onChange={(e) => setUniformeData({...uniformeData, talle_tunica: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="">Selecciona un talle</option>
                            <option value="XS">XS - Extra Small</option>
                            <option value="S">S - Small</option>
                            <option value="M">M - Medium</option>
                            <option value="L">L - Large</option>
                            <option value="XL">XL - Extra Large</option>
                            <option value="XXL">XXL - Extra Extra Large</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="talle_calzado" className="block text-sm font-medium text-gray-700 mb-2">
                            Talle de Calzado *
                          </label>
                          <select
                            id="talle_calzado"
                            value={uniformeData.talle_calzado}
                            onChange={(e) => setUniformeData({...uniformeData, talle_calzado: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="">Selecciona un talle</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                            <option value="46">46</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="tipo_uniforme" className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Uniforme *
                        </label>
                        <select
                          id="tipo_uniforme"
                          value={uniformeData.tipo_uniforme}
                          onChange={(e) => setUniformeData({...uniformeData, tipo_uniforme: e.target.value as any})}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Selecciona el tipo</option>
                          <option value="cocina">Cocina</option>
                          <option value="limpieza">Limpieza</option>
                          <option value="ambos">Ambos</option>
                        </select>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                        <h3 className="text-sm font-medium text-blue-800 mb-2">Información del Usuario</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                          <div>
                            <strong>Nombre:</strong> {currentUser?.primer_nombre} {currentUser?.segundo_nombre} {currentUser?.primer_apellido} {currentUser?.segundo_apellido}
                          </div>
                          <div>
                            <strong>Documento:</strong> {currentUser?.documento}
                          </div>
                          <div>
                            <strong>Departamento:</strong> {currentUser?.departamento}
                          </div>
                          <div>
                            <strong>Escuela:</strong> {currentUser?.escuela}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          disabled={savingUniforme}
                          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {savingUniforme ? 'Guardando...' : 'Guardar Datos de Uniforme'}
                        </button>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-md hover:bg-gray-600 transition-colors font-medium"
                        >
                          Cerrar Sesión
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
