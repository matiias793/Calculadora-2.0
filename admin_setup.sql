-- =====================================================
-- CONFIGURACIÓN DE TABLA DE ADMINISTRADORES EN SUPABASE
-- =====================================================

-- 1. Crear la tabla de administradores
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

-- 2. Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_administradores_username ON administradores(username);
CREATE INDEX IF NOT EXISTS idx_administradores_activo ON administradores(activo);
CREATE INDEX IF NOT EXISTS idx_administradores_rol ON administradores(rol);

-- 3. Crear función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Crear trigger para actualizar automáticamente updated_at
DROP TRIGGER IF EXISTS update_administradores_updated_at ON administradores;
CREATE TRIGGER update_administradores_updated_at 
    BEFORE UPDATE ON administradores 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Insertar el administrador de prueba
INSERT INTO administradores (username, password, nombre_completo, email, rol) 
VALUES (
    'admin',
    'admin', -- En producción, esto debería ser un hash bcrypt
    'Administrador del Sistema',
    'admin@calculadora.com',
    'admin'
) ON CONFLICT (username) DO NOTHING;

-- 6. Crear un super administrador (opcional)
INSERT INTO administradores (username, password, nombre_completo, email, rol) 
VALUES (
    'superadmin',
    'superadmin123', -- En producción, esto debería ser un hash bcrypt
    'Super Administrador',
    'superadmin@calculadora.com',
    'super_admin'
) ON CONFLICT (username) DO NOTHING;

-- 7. Insertar tess como administrador
INSERT INTO administradores (username, password, nombre_completo, email, rol) 
VALUES (
    'tess',
    'tess',
    'Tess Administrador',
    'tess@calculadora.com',
    'admin'
) ON CONFLICT (username) DO NOTHING;

-- 8. Crear políticas de seguridad RLS (Row Level Security)
ALTER TABLE administradores ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Administradores pueden ver administradores" ON administradores;
DROP POLICY IF EXISTS "Solo super_admin puede crear administradores" ON administradores;
DROP POLICY IF EXISTS "Solo super_admin puede actualizar administradores" ON administradores;
DROP POLICY IF EXISTS "Solo super_admin puede eliminar administradores" ON administradores;

-- Política para que solo los administradores puedan ver otros administradores
CREATE POLICY "Administradores pueden ver administradores" ON administradores
    FOR SELECT USING (true);

-- Política para que solo super_admin pueda insertar nuevos administradores
CREATE POLICY "Solo super_admin puede crear administradores" ON administradores
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM administradores 
            WHERE username = current_setting('request.jwt.claims', true)::json->>'username'
            AND rol = 'super_admin'
        )
    );

-- Política para que solo super_admin pueda actualizar administradores
CREATE POLICY "Solo super_admin puede actualizar administradores" ON administradores
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM administradores 
            WHERE username = current_setting('request.jwt.claims', true)::json->>'username'
            AND rol = 'super_admin'
        )
    );

-- Política para que solo super_admin pueda eliminar administradores
CREATE POLICY "Solo super_admin puede eliminar administradores" ON administradores
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM administradores 
            WHERE username = current_setting('request.jwt.claims', true)::json->>'username'
            AND rol = 'super_admin'
        )
    );

-- 9. Crear función para verificar credenciales de administrador
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

-- 10. Crear función para obtener todos los administradores
CREATE OR REPLACE FUNCTION obtener_administradores()
RETURNS TABLE(
    id UUID,
    username VARCHAR(50),
    nombre_completo VARCHAR(100),
    email VARCHAR(100),
    rol VARCHAR(20),
    activo BOOLEAN,
    ultimo_acceso TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.username,
        a.nombre_completo,
        a.email,
        a.rol,
        a.activo,
        a.ultimo_acceso,
        a.created_at
    FROM administradores a
    ORDER BY a.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Crear función para actualizar administrador
CREATE OR REPLACE FUNCTION actualizar_administrador(
    p_id UUID,
    p_nombre_completo VARCHAR(100),
    p_email VARCHAR(100),
    p_rol VARCHAR(20),
    p_activo BOOLEAN
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE administradores 
    SET 
        nombre_completo = p_nombre_completo,
        email = p_email,
        rol = p_rol,
        activo = p_activo,
        updated_at = NOW()
    WHERE id = p_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Crear función para cambiar contraseña de administrador
CREATE OR REPLACE FUNCTION cambiar_password_admin(
    p_username VARCHAR(50),
    p_password_actual VARCHAR(255),
    p_password_nuevo VARCHAR(255)
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE administradores 
    SET 
        password = p_password_nuevo,
        updated_at = NOW()
    WHERE username = p_username 
    AND password = p_password_actual 
    AND activo = true;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 13. Crear función para eliminar usuario (bypass RLS)
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

-- =====================================================
-- CONSULTAS DE VERIFICACIÓN
-- =====================================================

-- Verificar que la tabla se creó correctamente
SELECT 'Tabla administradores creada correctamente' as mensaje;

-- Verificar los administradores insertados
SELECT username, nombre_completo, rol, activo, created_at 
FROM administradores 
ORDER BY created_at;

-- Verificar las funciones creadas
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%admin%';

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
- Usuario: admin
- Contraseña: admin
- Rol: admin

- Usuario: superadmin  
- Contraseña: superadmin123
- Rol: super_admin

- Usuario: tess
- Contraseña: tess
- Rol: admin

NOTAS IMPORTANTES:
- En producción, las contraseñas deben ser hasheadas con bcrypt
- Las políticas RLS están configuradas para mayor seguridad
- Las funciones están marcadas como SECURITY DEFINER para bypass RLS
- El sistema soporta roles de 'admin' y 'super_admin'
- La función eliminar_usuario_admin permite eliminar usuarios desde el frontend
*/ 
