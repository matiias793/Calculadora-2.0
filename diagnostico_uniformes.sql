-- =====================================================
-- DIAGNÓSTICO DE PROBLEMAS CON TABLA UNIFORMES
-- =====================================================

-- 1. Verificar que la tabla existe y tiene datos
SELECT 'Estado de tabla uniformes:' as info;
SELECT COUNT(*) as total_uniformes FROM uniformes;

-- 2. Verificar la estructura de la tabla
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'uniformes'
ORDER BY ordinal_position;

-- 3. Verificar si RLS está habilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'uniformes';

-- 4. Verificar políticas existentes
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'uniformes';

-- 5. Verificar si hay usuarios en la tabla usuarios
SELECT 'Estado de tabla usuarios:' as info;
SELECT COUNT(*) as total_usuarios FROM usuarios;
SELECT documento, primer_nombre, primer_apellido FROM usuarios LIMIT 5;

-- 6. Probar insertar un uniforme directamente
INSERT INTO uniformes (documento, talle_tunica, talle_calzado, tipo_uniforme) 
VALUES ('TEST123', 'M', '40', 'cocina')
ON CONFLICT (documento) DO UPDATE SET
    talle_tunica = EXCLUDED.talle_tunica,
    talle_calzado = EXCLUDED.talle_calzado,
    tipo_uniforme = EXCLUDED.tipo_uniforme,
    fecha_ultima_actualizacion = NOW();

-- 7. Verificar que el insert funcionó
SELECT * FROM uniformes WHERE documento = 'TEST123';

-- 8. Limpiar el test
DELETE FROM uniformes WHERE documento = 'TEST123';


