import { createClient } from '@supabase/supabase-js';

// Configuración desde variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dfhrodeeofrwochljyho.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmaHJvZGVlb2Zyd29jaGxqeWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0Nzc5MzAsImV4cCI6MjA3MTA1MzkzMH0.2_PoU-N1PJ21bYQRdfYbxBj7GMDa3NEzEBtzIpLuBDY';

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
  password: string;
  created_at?: string;
  updated_at?: string;
}

export const authService = {
  // Registrar nuevo usuario
  async register(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .insert([userData])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Iniciar sesión
  async login(documento: string, password: string) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('documento', documento)
        .eq('password', password)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Actualizar datos del usuario
  async updateUser(documento: string, userData: Partial<User>) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .update(userData)
        .eq('documento', documento)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Obtener usuario por documento
  async getUserByDocument(documento: string) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('documento', documento)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
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
      return { data: null, error };
    }
  },

  // Eliminar usuario (para administrador)
  async deleteUser(documento: string) {
    try {
      // Usar una función RPC que bypass las políticas RLS
      const { data, error } = await supabase
        .rpc('eliminar_usuario_admin', {
          p_documento: documento
        });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};

export interface Uniforme {
  id?: string;
  documento: string;
  talle_tunica: string;
  talle_calzado: string;
  tipo_uniforme: 'cocina' | 'limpieza' | 'ambos';
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
      const { data, error } = await supabase
        .from('uniformes')
        .select('*')
        .eq('documento', documento)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Actualizar uniforme
  async updateUniforme(uniformeData: Omit<Uniforme, 'id' | 'fecha_ultima_actualizacion'>) {
    try {
      const { data, error } = await supabase
        .from('uniformes')
        .upsert([{
          ...uniformeData,
          fecha_ultima_actualizacion: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
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
      return { data: null, error };
    }
  }
};
