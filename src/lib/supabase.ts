import { createClient } from '@supabase/supabase-js';

// Validación de variables de entorno
const validateEnvironmentVariables = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Variables de entorno de Supabase no configuradas. Usando valores por defecto.');
  }

  return {
    supabaseUrl: supabaseUrl || 'https://dfhrodeeofrwochljyho.supabase.co',
    supabaseAnonKey: supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmaHJvZGVlb2Zyd29jaGxqeWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0Nzc5MzAsImV4cCI6MjA3MTA1MzkzMH0.2_PoU-N1PJ21bYQRdfYbxBj7GMDa3NEzEBtzIpLuBDY'
  };
};

// Sanitización de datos de entrada
const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    throw new Error('Input debe ser una cadena de texto');
  }
  
  // Remover caracteres peligrosos y limitar longitud
  return input.trim().slice(0, 255).replace(/[<>]/g, '');
};

// Validación de documento
const validateDocument = (documento: string): boolean => {
  if (!documento || typeof documento !== 'string') {
    return false;
  }
  
  // Validar formato de documento (solo números y letras)
  const documentRegex = /^[a-zA-Z0-9]+$/;
  return documentRegex.test(documento) && documento.length >= 3 && documento.length <= 20;
};

// Configuración desde variables de entorno
const { supabaseUrl, supabaseAnonKey } = validateEnvironmentVariables();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id?: string;
  documento: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  departamento: string;
  escuela: string;
  celular: string;
  tarea: string;
  password: string;
  created_at?: string;
  updated_at?: string;
}

export const authService = {
  // Registrar nuevo usuario
  async register(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    try {
      // Validar datos de entrada
      if (!validateDocument(userData.documento)) {
        throw new Error('Documento inválido');
      }

      // Sanitizar datos
      const sanitizedData = {
        ...userData,
        documento: sanitizeInput(userData.documento),
        primer_nombre: sanitizeInput(userData.primer_nombre),
        segundo_nombre: userData.segundo_nombre ? sanitizeInput(userData.segundo_nombre) : undefined,
        primer_apellido: sanitizeInput(userData.primer_apellido),
        segundo_apellido: userData.segundo_apellido ? sanitizeInput(userData.segundo_apellido) : undefined,
        departamento: sanitizeInput(userData.departamento),
        escuela: sanitizeInput(userData.escuela),
        celular: sanitizeInput(userData.celular),
        tarea: sanitizeInput(userData.tarea)
      };

      const { data, error } = await supabase
        .from('usuarios')
        .insert([sanitizedData])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error en register:', error);
      return { data: null, error };
    }
  },

  // Iniciar sesión
  async login(documento: string, password: string) {
    try {
      // Validar datos de entrada
      if (!validateDocument(documento) || !password) {
        throw new Error('Credenciales inválidas');
      }

      const sanitizedDocumento = sanitizeInput(documento);

      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('documento', sanitizedDocumento)
        .eq('password', password)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error en login:', error);
      return { data: null, error };
    }
  },

  // Actualizar datos del usuario
  async updateUser(documento: string, userData: Partial<User>) {
    try {
      // Validar documento
      if (!validateDocument(documento)) {
        throw new Error('Documento inválido');
      }

      // Sanitizar datos
      const sanitizedData: Partial<User> = {};
      Object.keys(userData).forEach(key => {
        const value = userData[key as keyof User];
        if (typeof value === 'string') {
          sanitizedData[key as keyof User] = sanitizeInput(value) as any;
        } else {
          sanitizedData[key as keyof User] = value;
        }
      });

      const { data, error } = await supabase
        .from('usuarios')
        .update(sanitizedData)
        .eq('documento', sanitizeInput(documento))
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error en updateUser:', error);
      return { data: null, error };
    }
  },

  // Obtener usuario por documento
  async getUserByDocument(documento: string) {
    try {
      // Validar documento
      if (!validateDocument(documento)) {
        throw new Error('Documento inválido');
      }

      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('documento', sanitizeInput(documento))
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error en getUserByDocument:', error);
      return { data: null, error };
    }
  },

  // Obtener todos los usuarios (para administrador)
  async getAllUsers() {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error en getAllUsers:', error);
      return { data: null, error };
    }
  },

  // Eliminar usuario (para administrador)
  async deleteUser(documento: string) {
    try {
      // Validar documento
      if (!validateDocument(documento)) {
        throw new Error('Documento inválido');
      }

      // Usar una función RPC que bypass las políticas RLS
      const { data, error } = await supabase
        .rpc('eliminar_usuario_admin', {
          p_documento: sanitizeInput(documento)
        });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error en deleteUser:', error);
      return { data: null, error };
    }
  }
};

export interface Uniforme {
  id?: string;
  documento: string;
  talle_tunica: string;
  talle_calzado: string;
  tipo_uniforme: 'cocina' | 'limpieza' | 'cocina y limpieza';
  fecha_ultima_actualizacion?: string;
}

export interface UniformeConUsuario extends Uniforme {
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  departamento: string;
  escuela: string;
  celular: string;
}

export const uniformeService = {
  // Obtener uniforme por documento
  async getUniformeByDocument(documento: string) {
    try {
      // Validar documento
      if (!validateDocument(documento)) {
        throw new Error('Documento inválido');
      }

      const { data, error } = await supabase
        .from('uniformes')
        .select('*')
        .eq('documento', sanitizeInput(documento))
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error en getUniformeByDocument:', error);
      return { data: null, error };
    }
  },

  // Actualizar uniforme
  async updateUniforme(uniformeData: Omit<Uniforme, 'id' | 'fecha_ultima_actualizacion'>) {
    try {
      // Validar documento
      if (!validateDocument(uniformeData.documento)) {
        throw new Error('Documento inválido');
      }

      // Sanitizar datos
      const sanitizedData = {
        ...uniformeData,
        documento: sanitizeInput(uniformeData.documento),
        talle_tunica: sanitizeInput(uniformeData.talle_tunica),
        talle_calzado: sanitizeInput(uniformeData.talle_calzado),
        tipo_uniforme: uniformeData.tipo_uniforme
      };

      // Primero verificar si ya existe un uniforme para este documento
      const { data: existingUniforme, error: checkError } = await supabase
        .from('uniformes')
        .select('*')
        .eq('documento', sanitizedData.documento)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 = no rows returned, que es normal si no existe
        throw checkError;
      }

      let result;
      if (existingUniforme) {
        // Si existe, hacer UPDATE
        const { data, error } = await supabase
          .from('uniformes')
          .update({
            talle_tunica: sanitizedData.talle_tunica,
            talle_calzado: sanitizedData.talle_calzado,
            tipo_uniforme: sanitizedData.tipo_uniforme,
            fecha_ultima_actualizacion: new Date().toISOString()
          })
          .eq('documento', sanitizedData.documento)
          .select()
          .single();

        if (error) throw error;
        result = { data, error: null };
      } else {
        // Si no existe, hacer INSERT
        const { data, error } = await supabase
          .from('uniformes')
          .insert([{
            ...sanitizedData,
            fecha_ultima_actualizacion: new Date().toISOString()
          }])
          .select()
          .single();

        if (error) throw error;
        result = { data, error: null };
      }

      return result;
    } catch (error) {
      console.error('Error en updateUniforme:', error);
      return { data: null, error };
    }
  },

  // Obtener todos los uniformes con datos de usuario (para administrador)
  async getAllUniformes() {
    try {
      const { data, error } = await supabase
        .from('uniformes')
        .select(`
          *,
          usuarios!inner(
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            departamento,
            escuela,
            celular
          )
        `)
        .order('fecha_ultima_actualizacion', { ascending: false });

      if (error) throw error;

      // Transformar los datos para que coincidan con la interfaz UniformeConUsuario
      const transformedData = data?.map(item => ({
        ...item,
        primer_nombre: item.usuarios.primer_nombre,
        segundo_nombre: item.usuarios.segundo_nombre,
        primer_apellido: item.usuarios.primer_apellido,
        segundo_apellido: item.usuarios.segundo_apellido,
        departamento: item.usuarios.departamento,
        escuela: item.usuarios.escuela,
        celular: item.usuarios.celular
      }));

      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Error en getAllUniformes:', error);
      return { data: null, error };
    }
  }
};
