'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Search, Edit, Trash2, Plus, LogOut, Eye, EyeOff, Users, Shirt, Download, Filter } from 'lucide-react';
import { authService, uniformeService, User, UniformeConUsuario } from '@/lib/supabase';
import AdminProtected from '@/components/shared/AdminProtected';
import { generarOpcionesEscuelas } from '@/utils/escuelas-por-departamento';

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

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [uniformes, setUniformes] = useState<UniformeConUsuario[]>([]);
  const [filteredUniformes, setFilteredUniformes] = useState<UniformeConUsuario[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departamentoFilter, setDepartamentoFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [editingUserOpcionesEscuelas, setEditingUserOpcionesEscuelas] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'uniformes'>('users');
  const [exportFilterDepartamento, setExportFilterDepartamento] = useState('');
  const [exportFilterEscuela, setExportFilterEscuela] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [opcionesEscuelas, setOpcionesEscuelas] = useState<string[]>([]);
  const [escuelaFilter, setEscuelaFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
    fetchUniformes();
  }, []);

  useEffect(() => {
    // Filtrar usuarios basado en el término de búsqueda y departamento
    let filtered = users;
    
    // Filtrar por departamento si está seleccionado
    if (departamentoFilter) {
      filtered = filtered.filter(user =>
        user.departamento.toLowerCase() === departamentoFilter.toLowerCase()
      );
    }
    
    // Filtrar por escuela si está seleccionada
    if (escuelaFilter) {
      filtered = filtered.filter(user =>
        user.escuela.toLowerCase().includes(escuelaFilter.toLowerCase())
      );
    }
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.primer_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.primer_apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.documento.includes(searchTerm) ||
        user.escuela.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.departamento.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredUsers(filtered);
  }, [searchTerm, users, departamentoFilter, escuelaFilter]);

  useEffect(() => {
    // Filtrar uniformes basado en el departamento
    let filtered = uniformes;
    if (departamentoFilter) {
      filtered = uniformes.filter(uniforme =>
        uniforme.departamento.toLowerCase().includes(departamentoFilter.toLowerCase())
      );
    }
    setFilteredUniformes(filtered);
  }, [departamentoFilter, uniformes]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await authService.getAllUsers();
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const fetchUniformes = async () => {
    try {
      const { data, error } = await uniformeService.getAllUniformes();
      if (error) throw error;
      setUniformes(data || []);
    } catch (error) {
      console.error('Error fetching uniformes:', error);
      setError('Error al cargar los uniformes');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUser');
    router.push('/admin');
  };

  // Función para actualizar opciones de escuelas cuando cambia el departamento
  const handleDepartamentoFilterChange = (departamento: string) => {
    setDepartamentoFilter(departamento);
    setEscuelaFilter('');
    if (departamento) {
      const opciones = generarOpcionesEscuelas(departamento);
      setOpcionesEscuelas(opciones);
    } else {
      setOpcionesEscuelas([]);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowPassword(false);
    
    // Cargar opciones de escuelas para el departamento del usuario
    if (user.departamento) {
      const opciones = generarOpcionesEscuelas(user.departamento);
      setEditingUserOpcionesEscuelas(opciones);
    }
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;

    try {
      const updateData = {
        primer_nombre: editingUser.primer_nombre,
        segundo_nombre: editingUser.segundo_nombre,
        primer_apellido: editingUser.primer_apellido,
        segundo_apellido: editingUser.segundo_apellido,
        departamento: editingUser.departamento,
        escuela: editingUser.escuela,
        celular: editingUser.celular,
        ...(editingUser.password && { password: editingUser.password })
      };

      const { error } = await authService.updateUser(editingUser.documento, updateData);
      if (error) throw error;

      setSuccess('Usuario actualizado correctamente');
      setEditingUser(null);
      fetchUsers();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error al actualizar el usuario');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteUser = async (documento: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;

    try {
      const { error } = await authService.deleteUser(documento);
      if (error) throw error;

      setSuccess('Usuario eliminado correctamente');
      fetchUsers();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error al eliminar el usuario');
      setTimeout(() => setError(''), 3000);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportUniformesToPDF = () => {
    try {
      // Importar dinámicamente jsPDF para evitar problemas de SSR
      import('jspdf').then(({ default: jsPDF }) => {
        import('jspdf-autotable').then((autoTable) => {
          const doc = new jsPDF();
          
          // Título del documento
          doc.setFontSize(18);
          doc.text('Reporte de Uniformes', 14, 20);
          
          // Filtros aplicados
          doc.setFontSize(12);
          let yPosition = 30;
          if (exportFilterDepartamento) {
            doc.text(`Departamento: ${exportFilterDepartamento}`, 14, yPosition);
            yPosition += 6;
          }
          if (exportFilterEscuela) {
            doc.text(`Escuela: ${exportFilterEscuela}`, 14, yPosition);
            yPosition += 6;
          }
          doc.text(`Fecha de exportación: ${new Date().toLocaleDateString('es-ES')}`, 14, yPosition + 6);
          
          // Filtrar uniformes según los criterios
          let uniformesToExport = uniformes;
          console.log('Total uniformes:', uniformes.length);
          console.log('Filtro departamento:', exportFilterDepartamento);
          
          if (exportFilterDepartamento) {
            uniformesToExport = uniformesToExport.filter(u => {
              const match = u.departamento.toLowerCase() === exportFilterDepartamento.toLowerCase();
              console.log(`Departamento usuario: "${u.departamento}" vs filtro: "${exportFilterDepartamento}" - Match: ${match}`);
              return match;
            });
          }
          if (exportFilterEscuela) {
            uniformesToExport = uniformesToExport.filter(u => 
              u.escuela.toLowerCase().includes(exportFilterEscuela.toLowerCase())
            );
          }
          
          console.log('Uniformes después del filtro:', uniformesToExport.length);
          
          if (uniformesToExport.length === 0) {
            setError('No hay uniformes que coincidan con los filtros seleccionados');
            setTimeout(() => setError(''), 3000);
            return;
          }
          
          // Crear tabla
          autoTable.default(doc, {
            startY: yPosition + 15,
            head: [['Usuario', 'Documento', 'Departamento', 'Escuela', 'Talle Túnica', 'Talle Calzado', 'Tipo Uniforme']],
            body: uniformesToExport.map(u => [
              `${u.primer_nombre} ${u.primer_apellido}`,
              u.documento,
              u.departamento,
              u.escuela,
              u.talle_tunica,
              u.talle_calzado,
              u.tipo_uniforme === 'cocina' ? 'Cocina' : 
               u.tipo_uniforme === 'limpieza' ? 'Limpieza' : 'Ambos'
            ]),
            styles: {
              fontSize: 8,
              cellPadding: 2
            },
            headStyles: {
              fillColor: [34, 197, 94],
              textColor: 255
            }
          });
          
          // Guardar el PDF
          const fileName = `uniformes_${exportFilterDepartamento || 'todos'}_${new Date().toISOString().split('T')[0]}.pdf`;
          doc.save(fileName);
          
          setShowExportModal(false);
          setExportFilterDepartamento('');
          setExportFilterEscuela('');
          setSuccess(`Reporte exportado correctamente. ${uniformesToExport.length} uniformes incluidos.`);
          setTimeout(() => setSuccess(''), 3000);
        }).catch((error) => {
          console.error('Error importing jspdf-autotable:', error);
          setError('Error al generar el PDF');
          setTimeout(() => setError(''), 3000);
        });
      }).catch((error) => {
        console.error('Error importing jsPDF:', error);
        setError('Error al generar el PDF');
        setTimeout(() => setError(''), 3000);
      });
    } catch (error) {
      console.error('Error in exportUniformesToPDF:', error);
      setError('Error al generar el PDF');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/otras-funciones" className="flex items-center text-logoGreen hover:underline mr-6">
              <ArrowLeft className="mr-2" />
              Volver
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administrador</h1>
              <p className="text-gray-600">Gestión de usuarios registrados</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="inline-block w-4 h-4 mr-2" />
              Usuarios ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('uniformes')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'uniformes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shirt className="inline-block w-4 h-4 mr-2" />
              Uniformes ({uniformes.length})
            </button>
          </nav>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-xl">👔</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Uniformes Registrados</p>
                <p className="text-2xl font-bold text-gray-900">{uniformes.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-yellow-600 text-xl">🏫</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Escuelas Únicas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(users.map(user => user.escuela)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-xl">📍</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Departamentos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(users.map(user => user.departamento)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'users' ? (
          <>
            {/* Search and Actions for Users */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Buscar usuarios por nombre, documento, escuela..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={departamentoFilter}
                      onChange={(e) => handleDepartamentoFilterChange(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Todos los departamentos</option>
                      {DEPARTAMENTOS_URUGUAY.map((departamento) => (
                        <option key={departamento} value={departamento}>
                          {departamento}
                        </option>
                      ))}
                    </select>
                    <select
                      value={escuelaFilter}
                      onChange={(e) => setEscuelaFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      disabled={!departamentoFilter}
                    >
                      <option value="">Todas las escuelas</option>
                      {opcionesEscuelas.map((escuela) => (
                        <option key={escuela} value={escuela}>
                          {escuela}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Search and Actions for Uniformes */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Filtrar por departamento..."
                      value={departamentoFilter}
                      onChange={(e) => setDepartamentoFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Exportar PDF
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            {success}
          </div>
        )}

        {/* Tables based on active tab */}
        {activeTab === 'users' ? (
          <>
            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ubicación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contacto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha Registro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.documento} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-medium text-sm">
                                  {user.primer_nombre.charAt(0)}{user.primer_apellido.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.primer_nombre} {user.segundo_nombre} {user.primer_apellido} {user.segundo_apellido}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.documento}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.departamento}</div>
                          <div className="text-sm text-gray-500">{user.escuela}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.celular}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.created_at ? formatDate(user.created_at) : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.documento)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredUsers.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron usuarios</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Uniformes Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ubicación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Talle Túnica
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Talle Calzado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo Uniforme
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Última Actualización
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUniformes.map((uniforme) => (
                      <tr key={uniforme.documento} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                                <span className="text-white font-medium text-sm">
                                  {uniforme.primer_nombre.charAt(0)}{uniforme.primer_apellido.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {uniforme.primer_nombre} {uniforme.segundo_nombre} {uniforme.primer_apellido} {uniforme.segundo_apellido}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {uniforme.documento}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{uniforme.departamento}</div>
                          <div className="text-sm text-gray-500">{uniforme.escuela}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {uniforme.talle_tunica}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {uniforme.talle_calzado}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            uniforme.tipo_uniforme === 'cocina' ? 'bg-orange-100 text-orange-800' :
                            uniforme.tipo_uniforme === 'limpieza' ? 'bg-purple-100 text-purple-800' :
                            'bg-indigo-100 text-indigo-800'
                          }`}>
                            {uniforme.tipo_uniforme === 'cocina' ? 'Cocina' :
                             uniforme.tipo_uniforme === 'limpieza' ? 'Limpieza' : 'Ambos'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {uniforme.fecha_ultima_actualizacion ? formatDate(uniforme.fecha_ultima_actualizacion) : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredUniformes.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron uniformes</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Editar Usuario</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primer Nombre
                </label>
                <input
                  type="text"
                  value={editingUser.primer_nombre}
                  onChange={(e) => setEditingUser({...editingUser, primer_nombre: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Segundo Nombre
                </label>
                <input
                  type="text"
                  value={editingUser.segundo_nombre || ''}
                  onChange={(e) => setEditingUser({...editingUser, segundo_nombre: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primer Apellido
                </label>
                <input
                  type="text"
                  value={editingUser.primer_apellido}
                  onChange={(e) => setEditingUser({...editingUser, primer_apellido: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Segundo Apellido
                </label>
                <input
                  type="text"
                  value={editingUser.segundo_apellido || ''}
                  onChange={(e) => setEditingUser({...editingUser, segundo_apellido: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento
                </label>
                <select
                  value={editingUser.departamento}
                  onChange={(e) => {
                    const departamento = e.target.value;
                    setEditingUser({...editingUser, departamento, escuela: ''});
                    
                    // Actualizar opciones de escuelas
                    if (departamento) {
                      const opciones = generarOpcionesEscuelas(departamento);
                      setEditingUserOpcionesEscuelas(opciones);
                    } else {
                      setEditingUserOpcionesEscuelas([]);
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  Escuela
                </label>
                <select
                  value={editingUser.escuela}
                  onChange={(e) => setEditingUser({...editingUser, escuela: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled={!editingUser.departamento}
                >
                  <option value="">{editingUser.departamento ? 'Selecciona una escuela' : 'Primero selecciona un departamento'}</option>
                  {editingUserOpcionesEscuelas.map((escuela) => (
                    <option key={escuela} value={escuela}>
                      {escuela}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Celular
                </label>
                <input
                  type="tel"
                  value={editingUser.celular}
                  onChange={(e) => setEditingUser({...editingUser, celular: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nueva Contraseña (opcional)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={editingUser.password || ''}
                    onChange={(e) => setEditingUser({...editingUser, password: e.target.value})}
                    className="w-full p-2 pr-10 border border-gray-300 rounded-md"
                    placeholder="Deja vacío para mantener la actual"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Exportar Uniformes a PDF</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filtrar por Departamento (opcional)
                </label>
                <select
                  value={exportFilterDepartamento}
                  onChange={(e) => setExportFilterDepartamento(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Todos los departamentos</option>
                  {DEPARTAMENTOS_URUGUAY.map((departamento) => (
                    <option key={departamento} value={departamento}>
                      {departamento}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filtrar por Escuela (opcional)
                </label>
                <input
                  type="text"
                  value={exportFilterEscuela}
                  onChange={(e) => setExportFilterEscuela(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ej: Escuela N° 123"
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <p className="text-sm text-blue-700">
                  <strong>Nota:</strong> Si no seleccionas filtros, se exportarán todos los uniformes registrados.
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  <strong>Debug:</strong> Total de uniformes disponibles: {uniformes.length}
                </p>
                {exportFilterDepartamento && (
                  <p className="text-sm text-blue-700">
                    Uniformes en {exportFilterDepartamento}: {
                      uniformes.filter(u => u.departamento.toLowerCase() === exportFilterDepartamento.toLowerCase()).length
                    }
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowExportModal(false);
                  setExportFilterDepartamento('');
                  setExportFilterEscuela('');
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={exportUniformesToPDF}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Exportar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminProtected>
  );
};

export default AdminDashboard;
