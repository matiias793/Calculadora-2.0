-- =====================================================
-- CORRECCIÓN DE POLÍTICAS PARA TABLA UNIFORMES
-- =====================================================

-- 1. Verificar que la tabla uniformes existe
SELECT 'Tabla uniformes existe' as status, COUNT(*) as total_uniformes FROM uniformes;

-- 2. Eliminar políticas existentes que puedan estar causando problemas
DROP POLICY IF EXISTS "Usuarios pueden leer sus propios uniformes" ON uniformes;
DROP POLICY IF EXISTS "Usuarios pueden insertar sus propios uniformes" ON uniformes;
DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propios uniformes" ON uniformes;
DROP POLICY IF EXISTS "Administradores pueden ver todos los uniformes" ON uniformes;
DROP POLICY IF EXISTS "Administradores pueden actualizar uniformes" ON uniformes;
DROP POLICY IF EXISTS "Política por defecto" ON uniformes;

-- 3. Crear políticas más permisivas para permitir operaciones
CREATE POLICY "Permitir todas las operaciones en uniformes" ON uniformes
  FOR ALL USING (true) WITH CHECK (true);

-- 4. Alternativa: Si quieres políticas más específicas, usa estas:
-- CREATE POLICY "Usuarios pueden leer uniformes" ON uniformes
--   FOR SELECT USING (true);

-- CREATE POLICY "Usuarios pueden insertar uniformes" ON uniformes
--   FOR INSERT WITH CHECK (true);

-- CREATE POLICY "Usuarios pueden actualizar uniformes" ON uniformes
--   FOR UPDATE USING (true);

-- 5. Verificar que las políticas se crearon correctamente
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'uniformes';

-- 6. Insertar un uniforme de prueba para verificar que funciona
INSERT INTO uniformes (documento, talle_tunica, talle_calzado, tipo_uniforme) 
VALUES ('12345678', 'M', '40', 'cocina')
ON CONFLICT (documento) DO UPDATE SET
    talle_tunica = EXCLUDED.talle_tunica,
    talle_calzado = EXCLUDED.talle_calzado,
    tipo_uniforme = EXCLUDED.tipo_uniforme,
    fecha_ultima_actualizacion = NOW();

-- 7. Verificar que el insert funcionó
SELECT * FROM uniformes WHERE documento = '12345678';
