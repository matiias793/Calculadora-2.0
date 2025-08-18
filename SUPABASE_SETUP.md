# Configuración de Supabase para la Calculadora de Ingredientes

## 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota la URL y la clave anónima del proyecto

## 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

## 3. Crear tabla de usuarios

En el SQL Editor de Supabase, ejecuta:

```sql
-- Crear tabla de usuarios
CREATE TABLE usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  documento VARCHAR(20) UNIQUE NOT NULL,
  primer_nombre VARCHAR(100) NOT NULL,
  segundo_nombre VARCHAR(100),
  primer_apellido VARCHAR(100) NOT NULL,
  segundo_apellido VARCHAR(100),
  departamento VARCHAR(100) NOT NULL,
  escuela VARCHAR(200) NOT NULL,
  celular VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_usuarios_documento ON usuarios(documento);
CREATE INDEX idx_usuarios_escuela ON usuarios(escuela);

-- Habilitar RLS (Row Level Security)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad
CREATE POLICY "Usuarios pueden leer sus propios datos" ON usuarios
  FOR SELECT USING (documento = current_setting('request.jwt.claims', true)::json->>'documento');

CREATE POLICY "Usuarios pueden insertar sus propios datos" ON usuarios
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Usuarios pueden actualizar sus propios datos" ON usuarios
  FOR UPDATE USING (documento = current_setting('request.jwt.claims', true)::json->>'documento');

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_usuarios_updated_at 
  BEFORE UPDATE ON usuarios 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

## 4. Instalar dependencias

```bash
npm install @supabase/supabase-js
```

## 5. Configurar autenticación (Opcional)

Si quieres usar la autenticación nativa de Supabase:

1. Ve a Authentication > Settings en tu proyecto
2. Configura los proveedores que desees (email, Google, etc.)
3. Actualiza el código para usar `supabase.auth` en lugar de la tabla personalizada

## 6. Estructura de la tabla

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único (auto-generado) |
| documento | VARCHAR(20) | Cédula de identidad (único) |
| primer_nombre | VARCHAR(100) | Primer nombre |
| segundo_nombre | VARCHAR(100) | Segundo nombre (opcional) |
| primer_apellido | VARCHAR(100) | Primer apellido |
| segundo_apellido | VARCHAR(100) | Segundo apellido (opcional) |
| departamento | VARCHAR(100) | Departamento donde trabaja |
| escuela | VARCHAR(200) | Escuela donde trabaja |
| celular | VARCHAR(20) | Número de celular |
| password | VARCHAR(255) | Contraseña (debería estar hasheada) |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de última actualización |

## 7. Seguridad

⚠️ **Importante**: En producción, deberías:

1. Hashear las contraseñas antes de guardarlas
2. Usar HTTPS
3. Implementar rate limiting
4. Validar los datos de entrada
5. Usar JWT tokens para la autenticación

## 8. Pruebas

Una vez configurado:

1. Ejecuta `npm run dev`
2. Ve a "Otras funciones" > "Actualizar mis datos"
3. Prueba crear un usuario nuevo
4. Prueba iniciar sesión
5. Prueba actualizar los datos

## 9. Troubleshooting

- **Error de conexión**: Verifica las variables de entorno
- **Error de tabla**: Ejecuta el SQL en Supabase
- **Error de permisos**: Verifica las políticas RLS
- **Error de CORS**: Configura los dominios permitidos en Supabase
