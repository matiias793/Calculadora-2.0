-- =====================================================
-- MODIFICAR RESTRICCIÓN DE TABLA UNIFORMES
-- =====================================================

-- 1. Verificar la restricción actual
SELECT 'Restricción actual de tipo_uniforme:' as info;
SELECT conname, pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'uniformes'::regclass 
AND contype = 'c';

-- 2. Eliminar la restricción actual
ALTER TABLE uniformes 
DROP CONSTRAINT IF EXISTS uniformes_tipo_uniforme_check;

-- 3. Crear nueva restricción que permita "cocina y limpieza"
ALTER TABLE uniformes 
ADD CONSTRAINT uniformes_tipo_uniforme_check 
CHECK (tipo_uniforme IN ('cocina', 'limpieza', 'cocina y limpieza'));

-- 4. Verificar que la nueva restricción se creó
SELECT 'Nueva restricción creada:' as info;
SELECT conname, pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'uniformes'::regclass 
AND contype = 'c';

-- 5. Ahora sí, actualizar los uniformes existentes
UPDATE uniformes 
SET tipo_uniforme = 'cocina y limpieza'
WHERE tipo_uniforme = 'ambos';

-- 6. Verificar que se actualizaron correctamente
SELECT 'Uniformes actualizados:' as info;
SELECT documento, talle_tunica, talle_calzado, tipo_uniforme 
FROM uniformes 
WHERE tipo_uniforme = 'cocina y limpieza';

-- 7. Verificar que no quedan uniformes con tipo "ambos"
SELECT 'Verificando que no quedan uniformes con tipo "ambos":' as info;
SELECT COUNT(*) as total_ambos 
FROM uniformes 
WHERE tipo_uniforme = 'ambos';

-- 8. Mostrar todos los tipos de uniforme disponibles
SELECT 'Tipos de uniforme disponibles:' as info;
SELECT tipo_uniforme, COUNT(*) as cantidad
FROM uniformes 
GROUP BY tipo_uniforme
ORDER BY tipo_uniforme;

-- 9. Probar insertar un uniforme con el nuevo tipo
INSERT INTO uniformes (documento, talle_tunica, talle_calzado, tipo_uniforme) 
VALUES ('TEST456', 'L', '41', 'cocina y limpieza')
ON CONFLICT (documento) DO UPDATE SET
    talle_tunica = EXCLUDED.talle_tunica,
    talle_calzado = EXCLUDED.talle_calzado,
    tipo_uniforme = EXCLUDED.tipo_uniforme,
    fecha_ultima_actualizacion = NOW();

-- 10. Verificar que el test funcionó
SELECT 'Test de inserción:' as info;
SELECT * FROM uniformes WHERE documento = 'TEST456';

-- 11. Limpiar el test
DELETE FROM uniformes WHERE documento = 'TEST456';


