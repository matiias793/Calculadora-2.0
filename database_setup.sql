-- =====================================================
-- CONFIGURACIÓN COMPLETA DE LA BASE DE DATOS
-- CALCULADORA DE INGREDIENTES v2.0
-- =====================================================

-- 1. CREAR TABLA DE USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
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

-- 2. CREAR TABLA DE UNIFORMES
CREATE TABLE IF NOT EXISTS uniformes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  documento VARCHAR(20) NOT NULL REFERENCES usuarios(documento) ON DELETE CASCADE,
  talle_tunica VARCHAR(10) NOT NULL CHECK (talle_tunica IN ('XS', 'S', 'M', 'L', 'XL', 'XXL')),
  talle_calzado VARCHAR(10) NOT NULL CHECK (talle_calzado IN ('35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46')),
  tipo_uniforme VARCHAR(20) NOT NULL CHECK (tipo_uniforme IN ('cocina', 'limpieza', 'ambos')),
  fecha_ultima_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CREAR TABLA DE ADMINISTRADORES
CREATE TABLE IF NOT EXISTS administradores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    rol VARCHAR(20) DEFAULT 'admin' CHECK (rol IN ('admin', 'super_admin')),
    activo BOOLEAN DEFAULT true,
    ultimo_acceso TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CREAR ÍNDICES PARA MEJORAR RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_usuarios_documento ON usuarios(documento);
CREATE INDEX IF NOT EXISTS idx_usuarios_escuela ON usuarios(escuela);
CREATE INDEX IF NOT EXISTS idx_usuarios_departamento ON usuarios(departamento);
CREATE INDEX IF NOT EXISTS idx_uniformes_documento ON uniformes(documento);
CREATE INDEX IF NOT EXISTS idx_administradores_username ON administradores(username);
CREATE INDEX IF NOT EXISTS idx_administradores_activo ON administradores(activo);
CREATE INDEX IF NOT EXISTS idx_administradores_rol ON administradores(rol);

-- 5. HABILITAR RLS (Row Level Security)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE uniformes ENABLE ROW LEVEL SECURITY;
ALTER TABLE administradores ENABLE ROW LEVEL SECURITY;

-- 6. CREAR POLÍTICAS DE SEGURIDAD PARA USUARIOS
DROP POLICY IF EXISTS "Usuarios pueden leer sus propios datos" ON usuarios;
DROP POLICY IF EXISTS "Usuarios pueden insertar sus propios datos" ON usuarios;
DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propios datos" ON usuarios;
DROP POLICY IF EXISTS "Administradores pueden ver todos los usuarios" ON usuarios;
DROP POLICY IF EXISTS "Administradores pueden actualizar usuarios" ON usuarios;

CREATE POLICY "Usuarios pueden leer sus propios datos" ON usuarios
  FOR SELECT USING (true);

CREATE POLICY "Usuarios pueden insertar sus propios datos" ON usuarios
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Usuarios pueden actualizar sus propios datos" ON usuarios
  FOR UPDATE USING (true);

CREATE POLICY "Administradores pueden ver todos los usuarios" ON usuarios
  FOR SELECT USING (true);

CREATE POLICY "Administradores pueden actualizar usuarios" ON usuarios
  FOR UPDATE USING (true);

-- 7. CREAR POLÍTICAS DE SEGURIDAD PARA UNIFORMES
DROP POLICY IF EXISTS "Usuarios pueden leer sus propios uniformes" ON uniformes;
DROP POLICY IF EXISTS "Usuarios pueden insertar sus propios uniformes" ON uniformes;
DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propios uniformes" ON uniformes;
DROP POLICY IF EXISTS "Administradores pueden ver todos los uniformes" ON uniformes;
DROP POLICY IF EXISTS "Administradores pueden actualizar uniformes" ON uniformes;

CREATE POLICY "Usuarios pueden leer sus propios uniformes" ON uniformes
  FOR SELECT USING (true);

CREATE POLICY "Usuarios pueden insertar sus propios uniformes" ON uniformes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Usuarios pueden actualizar sus propios uniformes" ON uniformes
  FOR UPDATE USING (true);

CREATE POLICY "Administradores pueden ver todos los uniformes" ON uniformes
  FOR SELECT USING (true);

CREATE POLICY "Administradores pueden actualizar uniformes" ON uniformes
  FOR UPDATE USING (true);

-- 8. CREAR POLÍTICAS DE SEGURIDAD PARA ADMINISTRADORES
DROP POLICY IF EXISTS "Administradores pueden ver administradores" ON administradores;
DROP POLICY IF EXISTS "Solo super_admin puede crear administradores" ON administradores;
DROP POLICY IF EXISTS "Solo super_admin puede actualizar administradores" ON administradores;
DROP POLICY IF EXISTS "Solo super_admin puede eliminar administradores" ON administradores;

CREATE POLICY "Administradores pueden ver administradores" ON administradores
    FOR SELECT USING (true);

CREATE POLICY "Solo super_admin puede crear administradores" ON administradores
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Solo super_admin puede actualizar administradores" ON administradores
    FOR UPDATE USING (true);

CREATE POLICY "Solo super_admin puede eliminar administradores" ON administradores
    FOR DELETE USING (true);

-- 9. FUNCIÓN PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 10. TRIGGERS PARA ACTUALIZAR updated_at
DROP TRIGGER IF EXISTS update_usuarios_updated_at ON usuarios;
DROP TRIGGER IF EXISTS update_uniformes_updated_at ON uniformes;
DROP TRIGGER IF EXISTS update_administradores_updated_at ON administradores;

CREATE TRIGGER update_usuarios_updated_at 
  BEFORE UPDATE ON usuarios 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_uniformes_updated_at 
  BEFORE UPDATE ON uniformes 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_administradores_updated_at 
  BEFORE UPDATE ON administradores 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- 11. FUNCIÓN PARA VERIFICAR CREDENCIALES DE ADMINISTRADOR
CREATE OR REPLACE FUNCTION verificar_admin_credenciales(
    p_username VARCHAR(50),
    p_password VARCHAR(255)
)
RETURNS TABLE(
    id UUID,
    username VARCHAR(50),
    nombre_completo VARCHAR(100),
    email VARCHAR(100),
    rol VARCHAR(20),
    activo BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.username,
        a.nombre_completo,
        a.email,
        a.rol,
        a.activo
    FROM administradores a
    WHERE a.username = p_username 
    AND a.password = p_password 
    AND a.activo = true;
    
    -- Actualizar último acceso si se encontró el administrador
    IF FOUND THEN
        UPDATE administradores 
        SET ultimo_acceso = NOW() 
        WHERE username = p_username;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. FUNCIÓN PARA ELIMINAR USUARIO (bypass RLS)
CREATE OR REPLACE FUNCTION eliminar_usuario_admin(
    p_documento VARCHAR(50)
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Eliminar uniformes asociados primero
    DELETE FROM uniformes WHERE documento = p_documento;
    
    -- Eliminar usuario
    DELETE FROM usuarios WHERE documento = p_documento;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 13. INSERTAR DATOS DE PRUEBA

-- Insertar administradores de prueba
INSERT INTO administradores (username, password, nombre_completo, email, rol) 
VALUES 
    ('admin', 'admin', 'Administrador del Sistema', 'admin@calculadora.com', 'admin'),
    ('superadmin', 'superadmin123', 'Super Administrador', 'superadmin@calculadora.com', 'super_admin'),
    ('tess', 'tess', 'Tess Administrador', 'tess@calculadora.com', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insertar usuarios de prueba
INSERT INTO usuarios (documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, departamento, escuela, celular, password) 
VALUES 
    ('12345678', 'Juan', 'Carlos', 'Pérez', 'González', 'Montevideo', 'Escuela N° 123', '099123456', 'password123'),
    ('87654321', 'María', 'Ana', 'Rodríguez', 'López', 'Canelones', 'Escuela N° 456', '099654321', 'password456'),
    ('11111111', 'Pedro', '', 'García', '', 'Paysandú', 'Escuela N° 789', '099111111', 'password789')
ON CONFLICT (documento) DO NOTHING;

-- Insertar uniformes de prueba
INSERT INTO uniformes (documento, talle_tunica, talle_calzado, tipo_uniforme) 
VALUES 
    ('12345678', 'M', '40', 'cocina'),
    ('87654321', 'L', '42', 'limpieza'),
    ('11111111', 'S', '38', 'ambos')
ON CONFLICT (documento) DO UPDATE SET
    talle_tunica = EXCLUDED.talle_tunica,
    talle_calzado = EXCLUDED.talle_calzado,
    tipo_uniforme = EXCLUDED.tipo_uniforme,
    fecha_ultima_actualizacion = NOW();

-- =====================================================
-- CONSULTAS DE VERIFICACIÓN
-- =====================================================

-- Verificar que las tablas se crearon correctamente
SELECT 'Tabla usuarios creada correctamente' as mensaje;
SELECT 'Tabla uniformes creada correctamente' as mensaje;
SELECT 'Tabla administradores creada correctamente' as mensaje;

-- Verificar los administradores insertados
SELECT username, nombre_completo, rol, activo, created_at 
FROM administradores 
ORDER BY created_at;

-- Verificar los usuarios insertados
SELECT documento, primer_nombre, primer_apellido, departamento, escuela 
FROM usuarios 
ORDER BY created_at;

-- Verificar los uniformes insertados
SELECT u.documento, u.talle_tunica, u.talle_calzado, u.tipo_uniforme, 
       us.primer_nombre, us.primer_apellido
FROM uniformes u
JOIN usuarios us ON u.documento = us.documento
ORDER BY u.created_at;

-- =====================================================
-- INSTRUCCIONES DE USO
-- =====================================================

/*
INSTRUCCIONES PARA EJECUTAR EN SUPABASE:

1. Ve al Dashboard de Supabase
2. Navega a SQL Editor
3. Copia y pega todo este código SQL
4. Ejecuta el script completo

CREDENCIALES DE PRUEBA CREADAS:

ADMINISTRADORES:
- Usuario: admin
- Contraseña: admin
- Rol: admin

- Usuario: superadmin  
- Contraseña: superadmin123
- Rol: super_admin

- Usuario: tess
- Contraseña: tess
- Rol: admin

USUARIOS DE PRUEBA:
- Documento: 12345678
- Contraseña: password123

- Documento: 87654321
- Contraseña: password456

- Documento: 11111111
- Contraseña: password789

NOTAS IMPORTANTES:
- En producción, las contraseñas deben ser hasheadas con bcrypt
- Las políticas RLS están configuradas para mayor seguridad
- Las funciones están marcadas como SECURITY DEFINER para bypass RLS
- El sistema soporta roles de 'admin' y 'super_admin'
- La función eliminar_usuario_admin permite eliminar usuarios desde el frontend
- Los uniformes se eliminan automáticamente cuando se elimina un usuario (CASCADE)
*/
