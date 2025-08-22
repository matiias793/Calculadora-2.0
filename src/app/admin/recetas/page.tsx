'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Edit, Trash2, Plus, Save, X, ChefHat, Coffee, Utensils, Milk, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminProtected from '@/components/shared/AdminProtected';
import NavigationButtons from '@/components/shared/NavigationButtons';

interface Receta {
  id: number;
  titulo: string;
  categoria: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
}

interface Ingrediente {
  id: number;
  nombre: string;
  unidad_base: string;
  categoria: string;
}

interface RecetaIngrediente {
  id: number;
  receta_id: number;
  ingrediente_id: number;
  cantidad: number;
  unidad: string;
  orden: number;
  ingrediente: Ingrediente;
}

interface Procedimiento {
  id: number;
  receta_id: number;
  titulo: string;
  pasos: string[];
  orden: number;
}

const AdminRecetas = () => {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [recetaIngredientes, setRecetaIngredientes] = useState<RecetaIngrediente[]>([]);
  const [procedimientos, setProcedimientos] = useState<Procedimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'desayunos' | 'almuerzos' | 'copa_leche'>('almuerzos');
  const [activeSubTab, setActiveSubTab] = useState<'principales' | 'acompañamientos' | 'postres' | 'receta_base'>('principales');
  const [editingReceta, setEditingReceta] = useState<Receta | null>(null);
  const [editingIngredientes, setEditingIngredientes] = useState<RecetaIngrediente[]>([]);
  const [editingProcedimientos, setEditingProcedimientos] = useState<Procedimiento[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch recetas
      const { data: recetasData, error: recetasError } = await supabase
        .from('recetas')
        .select('*')
        .order('titulo');
      
      if (recetasError) throw recetasError;
      setRecetas(recetasData || []);

      // Fetch ingredientes
      const { data: ingredientesData, error: ingredientesError } = await supabase
        .from('ingredientes')
        .select('*')
        .order('nombre');
      
      if (ingredientesError) throw ingredientesError;
      setIngredientes(ingredientesData || []);

      // Fetch receta_ingredientes with ingrediente details
      const { data: recetaIngredientesData, error: recetaIngredientesError } = await supabase
        .from('receta_ingredientes')
        .select(`
          *,
          ingrediente:ingredientes(*)
        `)
        .order('orden');
      
      if (recetaIngredientesError) throw recetaIngredientesError;
      setRecetaIngredientes(recetaIngredientesData || []);

      // Fetch procedimientos
      const { data: procedimientosData, error: procedimientosError } = await supabase
        .from('procedimientos')
        .select('*')
        .order('orden');
      
      if (procedimientosError) throw procedimientosError;
      setProcedimientos(procedimientosData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const getRecetasByCategory = (categoria: string) => {
    return recetas.filter(receta => receta.categoria === categoria);
  };

  const getRecetasBySubCategory = (categoria: string, subCategoria: string) => {
    // Mapear las pestañas a las categorías de la base de datos
    let categoriaDB = categoria;
    if (categoria === 'almuerzos') categoriaDB = 'almuerzo';
    if (categoria === 'desayunos') categoriaDB = 'desayuno';
    if (categoria === 'copa_leche') categoriaDB = 'copa_leche';
    
    const recetasCategoria = getRecetasByCategory(categoriaDB);
    
    if (categoria === 'almuerzos') {
      switch (subCategoria) {
        case 'principales':
          return recetasCategoria.filter(r => 
            !r.titulo.toLowerCase().includes('arroz') && 
            !r.titulo.toLowerCase().includes('fideos') &&
            !r.titulo.toLowerCase().includes('ensalada') &&
            !r.titulo.toLowerCase().includes('puré') &&
            !r.titulo.toLowerCase().includes('salsa') &&
            !r.titulo.toLowerCase().includes('hortalizas') &&
            !r.titulo.toLowerCase().includes('papas')
          );
        case 'acompañamientos':
          return recetasCategoria.filter(r => 
            r.titulo.toLowerCase().includes('arroz') || 
            r.titulo.toLowerCase().includes('fideos') ||
            r.titulo.toLowerCase().includes('ensalada') ||
            r.titulo.toLowerCase().includes('puré') ||
            r.titulo.toLowerCase().includes('salsa') ||
            r.titulo.toLowerCase().includes('hortalizas') ||
            r.titulo.toLowerCase().includes('papas')
          );
        case 'postres':
          return getRecetasByCategory('postre');
        case 'receta_base':
          return getRecetasByCategory('receta_base');
        default:
          return recetasCategoria;
      }
    }
    
    return recetasCategoria;
  };

  const handleViewReceta = (receta: Receta) => {
    setEditingReceta(receta);
    
    // Cargar ingredientes de la receta
    const ingredientesReceta = recetaIngredientes.filter(ri => ri.receta_id === receta.id);
    setEditingIngredientes(ingredientesReceta);
    
    // Cargar procedimientos de la receta
    const procedimientosReceta = procedimientos.filter(p => p.receta_id === receta.id);
    setEditingProcedimientos(procedimientosReceta);
    
    setShowViewModal(true);
  };

  const handleEditReceta = (receta: Receta) => {
    setEditingReceta(receta);
    
    // Cargar ingredientes de la receta
    const ingredientesReceta = recetaIngredientes.filter(ri => ri.receta_id === receta.id);
    setEditingIngredientes(ingredientesReceta);
    
    // Cargar procedimientos de la receta
    const procedimientosReceta = procedimientos.filter(p => p.receta_id === receta.id);
    setEditingProcedimientos(procedimientosReceta);
    
    setShowEditModal(true);
  };

  const handleSaveReceta = async () => {
    if (!editingReceta) return;

    try {
      // Actualizar receta
      const { error: recetaError } = await supabase
        .from('recetas')
        .update({
          titulo: editingReceta.titulo,
          descripcion: editingReceta.descripcion
        })
        .eq('id', editingReceta.id);

      if (recetaError) throw recetaError;

      // Actualizar ingredientes
      for (const ingrediente of editingIngredientes) {
        const { error: ingredienteError } = await supabase
          .from('receta_ingredientes')
          .upsert({
            id: ingrediente.id,
            receta_id: ingrediente.receta_id,
            ingrediente_id: ingrediente.ingrediente_id,
            cantidad: ingrediente.cantidad,
            unidad: ingrediente.unidad,
            orden: ingrediente.orden
          });

        if (ingredienteError) throw ingredienteError;
      }

      // Actualizar procedimientos
      for (const procedimiento of editingProcedimientos) {
        const { error: procedimientoError } = await supabase
          .from('procedimientos')
          .upsert({
            id: procedimiento.id,
            receta_id: procedimiento.receta_id,
            titulo: procedimiento.titulo,
            pasos: procedimiento.pasos,
            orden: procedimiento.orden
          });

        if (procedimientoError) throw procedimientoError;
      }

      setSuccess('Receta actualizada correctamente');
      setShowEditModal(false);
      setEditingReceta(null);
      fetchData();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating receta:', error);
      setError('Error al actualizar la receta');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteReceta = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta receta?')) return;

    try {
      // Eliminar procedimientos
      await supabase.from('procedimientos').delete().eq('receta_id', id);
      
      // Eliminar ingredientes
      await supabase.from('receta_ingredientes').delete().eq('receta_id', id);
      
      // Eliminar receta
      const { error } = await supabase.from('recetas').delete().eq('id', id);
      
      if (error) throw error;

      setSuccess('Receta eliminada correctamente');
      fetchData();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error deleting receta:', error);
      setError('Error al eliminar la receta');
      setTimeout(() => setError(''), 3000);
    }
  };

  const addIngrediente = () => {
    if (!editingReceta) return;
    
    const newIngrediente: RecetaIngrediente = {
      id: Date.now(), // Temporal ID
      receta_id: editingReceta.id,
      ingrediente_id: ingredientes[0]?.id || 0,
      cantidad: 0,
      unidad: 'g',
      orden: editingIngredientes.length + 1,
      ingrediente: ingredientes[0] || { id: 0, nombre: '', unidad_base: '', categoria: '' }
    };
    
    setEditingIngredientes([...editingIngredientes, newIngrediente]);
  };

  const removeIngrediente = (index: number) => {
    setEditingIngredientes(editingIngredientes.filter((_, i) => i !== index));
  };

  const addProcedimiento = () => {
    if (!editingReceta) return;
    
    const newProcedimiento: Procedimiento = {
      id: Date.now(), // Temporal ID
      receta_id: editingReceta.id,
      titulo: 'Nuevo procedimiento',
      pasos: [''],
      orden: editingProcedimientos.length + 1
    };
    
    setEditingProcedimientos([...editingProcedimientos, newProcedimiento]);
  };

  const removeProcedimiento = (index: number) => {
    setEditingProcedimientos(editingProcedimientos.filter((_, i) => i !== index));
  };

  const updateProcedimientoPaso = (procedimientoIndex: number, pasoIndex: number, value: string) => {
    const newProcedimientos = [...editingProcedimientos];
    newProcedimientos[procedimientoIndex].pasos[pasoIndex] = value;
    setEditingProcedimientos(newProcedimientos);
  };

  const addPaso = (procedimientoIndex: number) => {
    const newProcedimientos = [...editingProcedimientos];
    newProcedimientos[procedimientoIndex].pasos.push('');
    setEditingProcedimientos(newProcedimientos);
  };

  const removePaso = (procedimientoIndex: number, pasoIndex: number) => {
    const newProcedimientos = [...editingProcedimientos];
    newProcedimientos[procedimientoIndex].pasos.splice(pasoIndex, 1);
    setEditingProcedimientos(newProcedimientos);
  };

  const filteredRecetas = getRecetasBySubCategory(activeTab, activeSubTab).filter(receta =>
    receta.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Debug logs
  console.log('Total recetas:', recetas.length);
  console.log('Active tab:', activeTab);
  console.log('Active sub tab:', activeSubTab);
  console.log('Filtered recetas:', filteredRecetas.length);
  console.log('Recetas por categoría:', recetas.reduce((acc, r) => {
    acc[r.categoria] = (acc[r.categoria] || 0) + 1;
    return acc;
  }, {} as Record<string, number>));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando recetas...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <NavigationButtons />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Recetas</h1>
                <p className="text-gray-600 text-sm sm:text-base">Administra las recetas del sistema</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="flex items-center px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Panel
            </button>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          {success && (
                    <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md">
          {success}
        </div>
          )}

          {/* Search */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar recetas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => router.push('/admin/recetas/nueva')}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Receta
                </button>
              </div>
            </div>
          </div>

          {/* Main Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('almuerzos')}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'almuerzos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Utensils className="mr-2 h-4 w-4" />
                Almuerzos ({getRecetasByCategory('almuerzo').length})
              </button>
              <button
                onClick={() => setActiveTab('desayunos')}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'desayunos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Coffee className="mr-2 h-4 w-4" />
                Desayunos ({getRecetasByCategory('desayuno').length})
              </button>
              <button
                onClick={() => setActiveTab('copa_leche')}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'copa_leche'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Milk className="mr-2 h-4 w-4" />
                Copa de Leche ({getRecetasByCategory('copa_leche').length})
              </button>
            </nav>
          </div>

          {/* Sub Tabs for Almuerzos */}
          {activeTab === 'almuerzos' && (
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                                 <button
                   onClick={() => setActiveSubTab('principales')}
                   className={`py-2 px-1 border-b-2 font-medium text-sm ${
                     activeSubTab === 'principales'
                       ? 'border-blue-400 text-blue-500'
                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                   }`}
                 >
                   Principales ({getRecetasBySubCategory('almuerzos', 'principales').length})
                 </button>
                                 <button
                   onClick={() => setActiveSubTab('acompañamientos')}
                   className={`py-2 px-1 border-b-2 font-medium text-sm ${
                     activeSubTab === 'acompañamientos'
                       ? 'border-blue-400 text-blue-500'
                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                   }`}
                 >
                   Acompañamientos ({getRecetasBySubCategory('almuerzos', 'acompañamientos').length})
                 </button>
                                 <button
                   onClick={() => setActiveSubTab('postres')}
                   className={`py-2 px-1 border-b-2 font-medium text-sm ${
                     activeSubTab === 'postres'
                       ? 'border-blue-400 text-blue-500'
                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                   }`}
                 >
                   Postres ({getRecetasByCategory('postre').length})
                 </button>
                                 <button
                   onClick={() => setActiveSubTab('receta_base')}
                   className={`py-2 px-1 border-b-2 font-medium text-sm ${
                     activeSubTab === 'receta_base'
                       ? 'border-blue-400 text-blue-500'
                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                   }`}
                 >
                   Recetas Base ({getRecetasByCategory('receta_base').length})
                 </button>
              </nav>
            </div>
          )}

                     {/* Debug Info */}
           <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
             <h3 className="text-sm font-medium text-blue-900 mb-2">Información de Debug:</h3>
             <div className="text-sm text-blue-700 space-y-1">
               <p>Total de recetas cargadas: {recetas.length}</p>
               <p>Pestaña activa: {activeTab}</p>
               <p>Sub-pestaña activa: {activeSubTab}</p>
               <p>Recetas filtradas: {filteredRecetas.length}</p>
               <div className="mt-2">
                 <p className="font-medium">Recetas por categoría:</p>
                 <ul className="list-disc list-inside ml-2">
                   {Object.entries(recetas.reduce((acc, r) => {
                     acc[r.categoria] = (acc[r.categoria] || 0) + 1;
                     return acc;
                   }, {} as Record<string, number>)).map(([cat, count]) => (
                     <li key={cat}>{cat}: {count}</li>
                   ))}
                 </ul>
               </div>
               <div className="mt-2">
                 <p className="font-medium">Problemas detectados:</p>
                 <ul className="list-disc list-inside ml-2">
                   {(() => {
                     const recetasSinIngredientes = recetas.filter(r => 
                       !recetaIngredientes.some(ri => ri.receta_id === r.id)
                     );
                     const recetasSinProcedimientos = recetas.filter(r => 
                       !procedimientos.some(p => p.receta_id === r.id)
                     );
                     const recetasDuplicadas = recetas.reduce((acc, r) => {
                       acc[r.titulo] = (acc[r.titulo] || 0) + 1;
                       return acc;
                     }, {} as Record<string, number>);
                     const duplicadas = Object.entries(recetasDuplicadas).filter(([_, count]) => count > 1);
                     
                     return [
                       duplicadas.length > 0 && <li key="duplicadas" className="text-red-600">Recetas duplicadas: {duplicadas.length}</li>,
                       recetasSinIngredientes.length > 0 && <li key="sin-ingredientes" className="text-orange-600">Sin ingredientes: {recetasSinIngredientes.length}</li>,
                       recetasSinProcedimientos.length > 0 && <li key="sin-procedimientos" className="text-orange-600">Sin procedimientos: {recetasSinProcedimientos.length}</li>
                     ].filter(Boolean);
                   })()}
                 </ul>
               </div>
             </div>
           </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecetas.map((receta) => {
              const recetaIngredientesCount = recetaIngredientes.filter(ri => ri.receta_id === receta.id).length;
              const procedimientosCount = procedimientos.filter(p => p.receta_id === receta.id).length;
              
              return (
                <div key={receta.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-6">
                                         <div className="flex justify-between items-start mb-4">
                       <h3 className="text-lg font-semibold text-black">{receta.titulo}</h3>
                       <div className="flex space-x-2">
                         <button
                           onClick={() => handleViewReceta(receta)}
                           className="text-blue-400 hover:text-blue-600"
                           title="Ver receta"
                         >
                           <Eye className="h-4 w-4" />
                         </button>
                         <button
                           onClick={() => handleEditReceta(receta)}
                           className="text-blue-600 hover:text-blue-900"
                           title="Editar receta"
                         >
                           <Edit className="h-4 w-4" />
                         </button>
                         <button
                           onClick={() => handleDeleteReceta(receta.id)}
                           className="text-red-600 hover:text-red-900"
                           title="Eliminar receta"
                         >
                           <Trash2 className="h-4 w-4" />
                         </button>
                       </div>
                     </div>
                    
                                         <p className="text-black text-sm mb-4">{receta.descripcion}</p>
                    
                                         <div className="flex justify-between text-sm text-black">
                       <span>{recetaIngredientesCount} ingredientes</span>
                       <span>{procedimientosCount} procedimientos</span>
                     </div>
                    
                                         <div className="mt-4 pt-4 border-t border-gray-200">
                       <div className="flex flex-wrap gap-2">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                           {receta.categoria}
                         </span>
                         {(() => {
                           const tieneIngredientes = recetaIngredientes.some(ri => ri.receta_id === receta.id);
                           const tieneProcedimientos = procedimientos.some(p => p.receta_id === receta.id);
                           
                           return [
                             !tieneIngredientes && (
                               <span key="sin-ingredientes" className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                 Sin ingredientes
                               </span>
                             ),
                             !tieneProcedimientos && (
                               <span key="sin-procedimientos" className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                 Sin procedimientos
                               </span>
                             )
                           ].filter(Boolean);
                         })()}
                       </div>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredRecetas.length === 0 && (
            <div className="text-center py-12">
              <ChefHat className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay recetas</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'No se encontraron recetas con ese nombre.' : 'Comienza creando una nueva receta.'}
              </p>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {showEditModal && editingReceta && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                                 <div className="flex justify-between items-center">
                   <h3 className="text-lg font-medium text-black">Editar Receta: {editingReceta.titulo}</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Receta Info */}
                                 <div>
                   <h4 className="text-md font-medium text-black mb-4">Información de la Receta</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                                             <label className="block text-sm font-medium text-black mb-1">Título</label>
                      <input
                        type="text"
                        value={editingReceta.titulo}
                        onChange={(e) => setEditingReceta({...editingReceta, titulo: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                                             <label className="block text-sm font-medium text-black mb-1">Descripción</label>
                      <input
                        type="text"
                        value={editingReceta.descripcion}
                        onChange={(e) => setEditingReceta({...editingReceta, descripcion: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Ingredientes */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-black">Ingredientes</h4>
                    <button
                      onClick={addIngrediente}
                      className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Agregar
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {editingIngredientes.map((ingrediente, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md">
                        <div className="flex-1">
                          <select
                            value={ingrediente.ingrediente_id}
                            onChange={(e) => {
                              const newIngredientes = [...editingIngredientes];
                              const selectedIngrediente = ingredientes.find(i => i.id === parseInt(e.target.value));
                              newIngredientes[index] = {
                                ...newIngredientes[index],
                                ingrediente_id: parseInt(e.target.value),
                                ingrediente: selectedIngrediente || { id: 0, nombre: '', unidad_base: '', categoria: '' }
                              };
                              setEditingIngredientes(newIngredientes);
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            {ingredientes.map(ing => (
                              <option key={ing.id} value={ing.id}>{ing.nombre}</option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="number"
                          value={ingrediente.cantidad}
                          onChange={(e) => {
                            const newIngredientes = [...editingIngredientes];
                            newIngredientes[index].cantidad = parseFloat(e.target.value);
                            setEditingIngredientes(newIngredientes);
                          }}
                          className="w-20 p-2 border border-gray-300 rounded-md"
                          placeholder="Cant."
                        />
                        <select
                          value={ingrediente.unidad}
                          onChange={(e) => {
                            const newIngredientes = [...editingIngredientes];
                            newIngredientes[index].unidad = e.target.value;
                            setEditingIngredientes(newIngredientes);
                          }}
                          className="w-20 p-2 border border-gray-300 rounded-md"
                        >
                          <option value="g">g</option>
                          <option value="ml">ml</option>
                          <option value="unidad">unidad</option>
                          <option value="c/n">c/n</option>
                        </select>
                        <button
                          onClick={() => removeIngrediente(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Procedimientos */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-black">Procedimientos</h4>
                                         <button
                       onClick={addProcedimiento}
                       className="flex items-center px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500 text-sm"
                     >
                       <Plus className="mr-1 h-3 w-3" />
                       Agregar
                     </button>
                  </div>
                  
                  <div className="space-y-4">
                    {editingProcedimientos.map((procedimiento, procIndex) => (
                      <div key={procIndex} className="border border-gray-200 rounded-md p-4">
                        <div className="flex justify-between items-center mb-3">
                          <input
                            type="text"
                            value={procedimiento.titulo}
                            onChange={(e) => {
                              const newProcedimientos = [...editingProcedimientos];
                              newProcedimientos[procIndex].titulo = e.target.value;
                              setEditingProcedimientos(newProcedimientos);
                            }}
                            className="flex-1 p-2 border border-gray-300 rounded-md mr-3"
                            placeholder="Título del procedimiento"
                          />
                          <button
                            onClick={() => removeProcedimiento(procIndex)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-2">
                          {procedimiento.pasos.map((paso, pasoIndex) => (
                            <div key={pasoIndex} className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500 w-6">{pasoIndex + 1}.</span>
                              <input
                                type="text"
                                value={paso}
                                onChange={(e) => updateProcedimientoPaso(procIndex, pasoIndex, e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded-md"
                                placeholder="Descripción del paso"
                              />
                              <button
                                onClick={() => removePaso(procIndex, pasoIndex)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => addPaso(procIndex)}
                            className="flex items-center text-blue-600 hover:text-blue-900 text-sm"
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            Agregar paso
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveReceta}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
                 )}

         {/* View Modal */}
         {showViewModal && editingReceta && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
             <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
               <div className="p-6 border-b border-gray-200">
                 <div className="flex justify-between items-center">
                   <h3 className="text-lg font-medium text-black">Ver Receta: {editingReceta.titulo}</h3>
                   <button
                     onClick={() => setShowViewModal(false)}
                     className="text-gray-400 hover:text-gray-600"
                   >
                     <X className="h-6 w-6" />
                   </button>
                 </div>
               </div>

               <div className="p-6 space-y-6">
                 {/* Receta Info */}
                 <div>
                   <h4 className="text-md font-medium text-black mb-4">Información de la Receta</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-medium text-black mb-1">Título</label>
                       <p className="p-2 bg-gray-50 border border-gray-300 rounded-md text-black">{editingReceta.titulo}</p>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-black mb-1">Descripción</label>
                       <p className="p-2 bg-gray-50 border border-gray-300 rounded-md text-black">{editingReceta.descripcion || 'Sin descripción'}</p>
                     </div>
                   </div>
                 </div>

                 {/* Ingredientes */}
                 <div>
                   <h4 className="text-md font-medium text-black mb-4">Ingredientes</h4>
                   {editingIngredientes.length > 0 ? (
                     <div className="space-y-3">
                       {editingIngredientes.map((ingrediente, index) => (
                         <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md bg-gray-50">
                           <div className="flex-1">
                             <p className="text-black font-medium">{ingrediente.ingrediente.nombre}</p>
                           </div>
                           <div className="text-black">
                             <span className="font-medium">{ingrediente.cantidad}</span>
                             <span className="ml-1">{ingrediente.unidad}</span>
                           </div>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <p className="text-gray-500 text-center py-4">No hay ingredientes registrados</p>
                   )}
                 </div>

                 {/* Procedimientos */}
                 <div>
                   <h4 className="text-md font-medium text-black mb-4">Procedimientos</h4>
                   {editingProcedimientos.length > 0 ? (
                     <div className="space-y-4">
                       {editingProcedimientos.map((procedimiento, procIndex) => (
                         <div key={procIndex} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                           <h5 className="font-medium text-black mb-3">{procedimiento.titulo}</h5>
                           <div className="space-y-2">
                             {procedimiento.pasos.map((paso, pasoIndex) => (
                               <div key={pasoIndex} className="flex items-start space-x-2">
                                 <span className="text-sm text-gray-500 w-6 mt-1">{pasoIndex + 1}.</span>
                                 <p className="flex-1 text-black">{paso}</p>
                               </div>
                             ))}
                           </div>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <p className="text-gray-500 text-center py-4">No hay procedimientos registrados</p>
                   )}
                 </div>
               </div>

               <div className="p-6 border-t border-gray-200 flex justify-end">
                 <button
                   onClick={() => setShowViewModal(false)}
                   className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                 >
                   Cerrar
                 </button>
               </div>
             </div>
           </div>
         )}
       </div>
     </AdminProtected>
   );
 };

export default AdminRecetas;
