'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, X, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminProtected from '@/components/shared/AdminProtected';
import NavigationButtons from '@/components/shared/NavigationButtons';

interface Ingrediente {
  id: number;
  nombre: string;
  unidad_base: string;
  categoria: string;
}

interface RecetaIngrediente {
  ingrediente_id: number;
  cantidad: number;
  unidad: string;
  orden: number;
  ingrediente: Ingrediente;
}

interface Procedimiento {
  titulo: string;
  pasos: string[];
  orden: number;
}

const NuevaReceta = () => {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form data
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('almuerzo');
  const [descripcion, setDescripcion] = useState('');
  const [recetaIngredientes, setRecetaIngredientes] = useState<RecetaIngrediente[]>([]);
  const [procedimientos, setProcedimientos] = useState<Procedimiento[]>([]);
  
  const router = useRouter();

  useEffect(() => {
    fetchIngredientes();
  }, []);

  const fetchIngredientes = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('ingredientes')
        .select('*')
        .order('nombre');
      
      if (error) throw error;
      setIngredientes(data || []);
    } catch (error) {
      console.error('Error fetching ingredientes:', error);
      setError('Error al cargar los ingredientes');
    } finally {
      setLoading(false);
    }
  };

  const addIngrediente = () => {
    const newIngrediente: RecetaIngrediente = {
      ingrediente_id: ingredientes[0]?.id || 0,
      cantidad: 0,
      unidad: 'g',
      orden: recetaIngredientes.length + 1,
      ingrediente: ingredientes[0] || { id: 0, nombre: '', unidad_base: '', categoria: '' }
    };
    
    setRecetaIngredientes([...recetaIngredientes, newIngrediente]);
  };

  const removeIngrediente = (index: number) => {
    setRecetaIngredientes(recetaIngredientes.filter((_, i) => i !== index));
  };

  const updateIngrediente = (index: number, field: keyof RecetaIngrediente, value: any) => {
    const newIngredientes = [...recetaIngredientes];
    
    if (field === 'ingrediente_id') {
      const selectedIngrediente = ingredientes.find(i => i.id === parseInt(value));
      newIngredientes[index] = {
        ...newIngredientes[index],
        ingrediente_id: parseInt(value),
        ingrediente: selectedIngrediente || { id: 0, nombre: '', unidad_base: '', categoria: '' }
      };
    } else {
      newIngredientes[index] = {
        ...newIngredientes[index],
        [field]: value
      };
    }
    
    setRecetaIngredientes(newIngredientes);
  };

  const addProcedimiento = () => {
    const newProcedimiento: Procedimiento = {
      titulo: 'Nuevo procedimiento',
      pasos: [''],
      orden: procedimientos.length + 1
    };
    
    setProcedimientos([...procedimientos, newProcedimiento]);
  };

  const removeProcedimiento = (index: number) => {
    setProcedimientos(procedimientos.filter((_, i) => i !== index));
  };

  const updateProcedimiento = (procIndex: number, field: keyof Procedimiento, value: any) => {
    const newProcedimientos = [...procedimientos];
    newProcedimientos[procIndex] = {
      ...newProcedimientos[procIndex],
      [field]: value
    };
    setProcedimientos(newProcedimientos);
  };

  const addPaso = (procIndex: number) => {
    const newProcedimientos = [...procedimientos];
    newProcedimientos[procIndex].pasos.push('');
    setProcedimientos(newProcedimientos);
  };

  const removePaso = (procIndex: number, pasoIndex: number) => {
    const newProcedimientos = [...procedimientos];
    newProcedimientos[procIndex].pasos.splice(pasoIndex, 1);
    setProcedimientos(newProcedimientos);
  };

  const updatePaso = (procIndex: number, pasoIndex: number, value: string) => {
    const newProcedimientos = [...procedimientos];
    newProcedimientos[procIndex].pasos[pasoIndex] = value;
    setProcedimientos(newProcedimientos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titulo.trim()) {
      setError('El título es obligatorio');
      return;
    }

    if (recetaIngredientes.length === 0) {
      setError('Debe agregar al menos un ingrediente');
      return;
    }

    try {
      setSaving(true);
      setError('');

      // Crear la receta
      const { data: recetaData, error: recetaError } = await supabase
        .from('recetas')
        .insert({
          titulo: titulo.trim(),
          categoria,
          descripcion: descripcion.trim()
        })
        .select()
        .single();

      if (recetaError) throw recetaError;

      const recetaId = recetaData.id;

      // Crear ingredientes de la receta
      for (const ingrediente of recetaIngredientes) {
        const { error: ingredienteError } = await supabase
          .from('receta_ingredientes')
          .insert({
            receta_id: recetaId,
            ingrediente_id: ingrediente.ingrediente_id,
            cantidad: ingrediente.cantidad,
            unidad: ingrediente.unidad,
            orden: ingrediente.orden
          });

        if (ingredienteError) throw ingredienteError;
      }

      // Crear procedimientos
      for (const procedimiento of procedimientos) {
        const { error: procedimientoError } = await supabase
          .from('procedimientos')
          .insert({
            receta_id: recetaId,
            titulo: procedimiento.titulo,
            pasos: procedimiento.pasos,
            orden: procedimiento.orden
          });

        if (procedimientoError) throw procedimientoError;
      }

      setSuccess('Receta creada correctamente');
      setTimeout(() => {
        router.push('/admin/recetas');
      }, 2000);

    } catch (error) {
      console.error('Error creating receta:', error);
      setError('Error al crear la receta');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando ingredientes...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <NavigationButtons />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Nueva Receta</h1>
                <p className="text-gray-600 text-sm sm:text-base">Crea una nueva receta para el sistema</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin/recetas')}
              className="flex items-center px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Recetas
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título de la Receta *
                  </label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Bocaditos de pollo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría *
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="almuerzo">Almuerzo</option>
                    <option value="desayuno">Desayuno</option>
                    <option value="copa_leche">Copa de Leche</option>
                    <option value="postre">Postre</option>
                    <option value="receta_base">Receta Base</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Breve descripción de la receta"
                  />
                </div>
              </div>
            </div>

            {/* Ingredientes */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Ingredientes</h2>
                <button
                  type="button"
                  onClick={addIngrediente}
                  className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Agregar Ingrediente
                </button>
              </div>
              
              <div className="space-y-3">
                {recetaIngredientes.map((ingrediente, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md">
                    <div className="flex-1">
                      <select
                        value={ingrediente.ingrediente_id}
                        onChange={(e) => updateIngrediente(index, 'ingrediente_id', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Seleccionar ingrediente</option>
                        {ingredientes.map(ing => (
                          <option key={ing.id} value={ing.id}>{ing.nombre}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="number"
                      value={ingrediente.cantidad}
                      onChange={(e) => updateIngrediente(index, 'cantidad', parseFloat(e.target.value))}
                      className="w-20 p-2 border border-gray-300 rounded-md"
                      placeholder="Cant."
                      step="0.1"
                      required
                    />
                    <select
                      value={ingrediente.unidad}
                      onChange={(e) => updateIngrediente(index, 'unidad', e.target.value)}
                      className="w-20 p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="g">g</option>
                      <option value="ml">ml</option>
                      <option value="unidad">unidad</option>
                      <option value="c/n">c/n</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeIngrediente(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              {recetaIngredientes.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  No hay ingredientes agregados. Haz clic en "Agregar Ingrediente" para comenzar.
                </p>
              )}
            </div>

            {/* Procedimientos */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Procedimientos</h2>
                <button
                  type="button"
                  onClick={addProcedimiento}
                                        className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Agregar Procedimiento
                </button>
              </div>
              
              <div className="space-y-4">
                {procedimientos.map((procedimiento, procIndex) => (
                  <div key={procIndex} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-center mb-3">
                      <input
                        type="text"
                        value={procedimiento.titulo}
                        onChange={(e) => updateProcedimiento(procIndex, 'titulo', e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md mr-3"
                        placeholder="Título del procedimiento"
                        required
                      />
                      <button
                        type="button"
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
                            onChange={(e) => updatePaso(procIndex, pasoIndex, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-md"
                            placeholder="Descripción del paso"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => removePaso(procIndex, pasoIndex)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
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
              
              {procedimientos.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  No hay procedimientos agregados. Haz clic en "Agregar Procedimiento" para comenzar.
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/recetas')}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Guardando...' : 'Crear Receta'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminProtected>
  );
};

export default NuevaReceta;
