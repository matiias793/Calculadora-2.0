-- =====================================================
-- SOLUCIÓN COMPLETA PARA CAMBIAR TIPO DE UNIFORME
-- =====================================================

-- 1. Verificar datos actuales
SELECT 'Datos actuales de uniformes:' as info;
SELECT documento, talle_tunica, talle_calzado, tipo_uniforme 
FROM uniformes 
ORDER BY documento;

-- 2. PRIMERO: eliminar la restricción antigua
ALTER TABLE uniformes 
DROP CONSTRAINT IF EXISTS uniformes_tipo_uniforme_check;

-- 3. SEGUNDO: actualizar TODOS los datos existentes
UPDATE uniformes 
SET tipo_uniforme = 'cocina y limpieza'
WHERE tipo_uniforme = 'ambos';

-- 4. Verificar que se actualizaron
SELECT 'Datos después de actualizar:' as info;
SELECT documento, talle_tunica, talle_calzado, tipo_uniforme 
FROM uniformes 
ORDER BY documento;

-- 5. Verificar que no quedan datos con "ambos"
SELECT 'Verificando que no quedan "ambos":' as info;
SELECT COUNT(*) as total_ambos 
FROM uniformes 
WHERE tipo_uniforme = 'ambos';

-- 6. TERCERO: crear nueva restricción
ALTER TABLE uniformes 
ADD CONSTRAINT uniformes_tipo_uniforme_check 
CHECK (tipo_uniforme IN ('cocina', 'limpieza', 'cocina y limpieza'));

-- 7. Verificar que la nueva restricción se creó
SELECT 'Nueva restricción creada:' as info;
SELECT conname, pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'uniformes'::regclass 
AND contype = 'c';

-- 8. Probar actualizar un uniforme existente con el nuevo tipo
-- Primero, obtener un documento existente para la prueba
SELECT 'Probando actualización con documento existente:' as info;
UPDATE uniformes 
SET tipo_uniforme = 'cocina y limpieza',
    fecha_ultima_actualizacion = NOW()
WHERE documento = (
    SELECT documento 
    FROM uniformes 
    LIMIT 1
);

-- 9. Verificar que la actualización funcionó
SELECT 'Test de actualización exitoso:' as info;
SELECT documento, talle_tunica, talle_calzado, tipo_uniforme 
FROM uniformes 
WHERE tipo_uniforme = 'cocina y limpieza'
LIMIT 5;

-- 10. Mostrar resumen final
SELECT 'Resumen final:' as info;
SELECT tipo_uniforme, COUNT(*) as cantidad
FROM uniformes 
GROUP BY tipo_uniforme
ORDER BY tipo_uniforme;
