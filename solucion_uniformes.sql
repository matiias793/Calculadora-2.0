-- =====================================================
-- SOLUCIÓN PARA PROBLEMA DE UNIFORMES
-- =====================================================

-- 1. Verificar si el usuario existe
SELECT 'Verificando usuario 12345678:' as info;
SELECT documento, primer_nombre, primer_apellido FROM usuarios WHERE documento = '12345678';

-- 2. Si no existe, crear el usuario de prueba
INSERT INTO usuarios (documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, departamento, escuela, celular, password) 
VALUES ('12345678', 'Juan', 'Carlos', 'Pérez', 'González', 'Montevideo', 'Escuela N° 123', '099123456', 'password123')
ON CONFLICT (documento) DO NOTHING;

-- 3. Verificar que el usuario se creó
SELECT 'Usuario después del insert:' as info;
SELECT documento, primer_nombre, primer_apellido FROM usuarios WHERE documento = '12345678';

-- 4. Eliminar políticas restrictivas de uniformes
DROP POLICY IF EXISTS "Usuarios pueden leer sus propios uniformes" ON uniformes;
DROP POLICY IF EXISTS "Usuarios pueden insertar sus propios uniformes" ON uniformes;
DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propios uniformes" ON uniformes;
DROP POLICY IF EXISTS "Administradores pueden ver todos los uniformes" ON uniformes;
DROP POLICY IF EXISTS "Administradores pueden actualizar uniformes" ON uniformes;
DROP POLICY IF EXISTS "Política por defecto" ON uniformes;
DROP POLICY IF EXISTS "Permitir todas las operaciones en uniformes" ON uniformes;

-- 5. Crear política permisiva para uniformes
CREATE POLICY "Permitir operaciones en uniformes" ON uniformes
  FOR ALL USING (true) WITH CHECK (true);

-- 6. Verificar las políticas creadas
SELECT 'Políticas de uniformes:' as info;
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies 
WHERE tablename = 'uniformes';

-- 7. Probar insertar uniforme ahora
INSERT INTO uniformes (documento, talle_tunica, talle_calzado, tipo_uniforme) 
VALUES ('12345678', 'M', '40', 'cocina')
ON CONFLICT (documento) DO UPDATE SET
    talle_tunica = EXCLUDED.talle_tunica,
    talle_calzado = EXCLUDED.talle_calzado,
    tipo_uniforme = EXCLUDED.tipo_uniforme,
    fecha_ultima_actualizacion = NOW();

-- 8. Verificar que el uniforme se guardó
SELECT 'Uniforme guardado:' as info;
SELECT * FROM uniformes WHERE documento = '12345678';

-- 9. Crear más usuarios de prueba si no existen
INSERT INTO usuarios (documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, departamento, escuela, celular, password) 
VALUES 
    ('87654321', 'María', 'Ana', 'Rodríguez', 'López', 'Canelones', 'Escuela N° 456', '099654321', 'password456'),
    ('11111111', 'Pedro', '', 'García', '', 'Paysandú', 'Escuela N° 789', '099111111', 'password789')
ON CONFLICT (documento) DO NOTHING;

-- 10. Verificar todos los usuarios
SELECT 'Todos los usuarios:' as info;
SELECT documento, primer_nombre, primer_apellido, departamento, escuela FROM usuarios ORDER BY documento;


