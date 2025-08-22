-- =====================================================
-- ACTUALIZAR TIPO DE UNIFORME DE "ambos" A "cocina y limpieza"
-- =====================================================

-- 1. Verificar uniformes con tipo "ambos" antes del cambio
SELECT 'Uniformes con tipo "ambos" antes del cambio:' as info;
SELECT documento, talle_tunica, talle_calzado, tipo_uniforme 
FROM uniformes 
WHERE tipo_uniforme = 'ambos';

-- 2. Actualizar todos los uniformes que tengan tipo "ambos"
UPDATE uniformes 
SET tipo_uniforme = 'cocina y limpieza'
WHERE tipo_uniforme = 'ambos';

-- 3. Verificar que se actualizaron correctamente
SELECT 'Uniformes actualizados:' as info;
SELECT documento, talle_tunica, talle_calzado, tipo_uniforme 
FROM uniformes 
WHERE tipo_uniforme = 'cocina y limpieza';

-- 4. Verificar que no quedan uniformes con tipo "ambos"
SELECT 'Verificando que no quedan uniformes con tipo "ambos":' as info;
SELECT COUNT(*) as total_ambos 
FROM uniformes 
WHERE tipo_uniforme = 'ambos';

-- 5. Mostrar todos los tipos de uniforme disponibles
SELECT 'Tipos de uniforme disponibles:' as info;
SELECT tipo_uniforme, COUNT(*) as cantidad
FROM uniformes 
GROUP BY tipo_uniforme
ORDER BY tipo_uniforme;

-- 6. Mostrar resumen de la actualización
SELECT 'Resumen de la actualización:' as info;
SELECT 
    'Total uniformes' as descripcion,
    COUNT(*) as cantidad
FROM uniformes
UNION ALL
SELECT 
    'Uniformes tipo "cocina y limpieza"' as descripcion,
    COUNT(*) as cantidad
FROM uniformes 
WHERE tipo_uniforme = 'cocina y limpieza';


