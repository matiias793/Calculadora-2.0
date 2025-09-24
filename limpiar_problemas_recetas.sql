-- Script para limpiar problemas en recetas
-- Ejecutar en Supabase SQL Editor

BEGIN;

-- 1. Eliminar procedimientos duplicados (mantener solo el primero)
DELETE FROM procedimientos 
WHERE id IN (
    SELECT p.id
    FROM procedimientos p
    JOIN (
        SELECT receta_id, titulo, MIN(id) as min_id
        FROM procedimientos
        GROUP BY receta_id, titulo
        HAVING COUNT(*) > 1
    ) dupes ON p.receta_id = dupes.receta_id 
              AND p.titulo = dupes.titulo 
              AND p.id > dupes.min_id
);

-- 2. Eliminar recetas duplicadas (mantener solo la primera)
DELETE FROM recetas 
WHERE id IN (
    SELECT r.id
    FROM recetas r
    JOIN (
        SELECT titulo, MIN(id) as min_id
        FROM recetas
        GROUP BY titulo
        HAVING COUNT(*) > 1
    ) dupes ON r.titulo = dupes.titulo 
              AND r.id > dupes.min_id
);

-- 3. Eliminar ingredientes huérfanos (sin receta asociada)
DELETE FROM receta_ingredientes 
WHERE receta_id NOT IN (SELECT id FROM recetas);

-- 4. Eliminar procedimientos huérfanos (sin receta asociada)
DELETE FROM procedimientos 
WHERE receta_id NOT IN (SELECT id FROM recetas);

-- 5. Eliminar recetas sin ingredientes NI procedimientos (opcional - comentar si no quieres eliminar)
-- DELETE FROM recetas 
-- WHERE id IN (
--     SELECT r.id
--     FROM recetas r
--     LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
--     LEFT JOIN procedimientos p ON r.id = p.receta_id
--     WHERE ri.receta_id IS NULL AND p.receta_id IS NULL
-- );

-- 6. Reordenar los IDs de procedimientos para cada receta
WITH reordered_procedimientos AS (
    SELECT 
        id,
        receta_id,
        titulo,
        pasos,
        ROW_NUMBER() OVER (PARTITION BY receta_id ORDER BY id) as new_orden
    FROM procedimientos
)
UPDATE procedimientos 
SET orden = reordered_procedimientos.new_orden
FROM reordered_procedimientos
WHERE procedimientos.id = reordered_procedimientos.id;

-- 7. Reordenar los IDs de ingredientes para cada receta
WITH reordered_ingredientes AS (
    SELECT 
        id,
        receta_id,
        ingrediente_id,
        cantidad,
        unidad,
        ROW_NUMBER() OVER (PARTITION BY receta_id ORDER BY id) as new_orden
    FROM receta_ingredientes
)
UPDATE receta_ingredientes 
SET orden = reordered_ingredientes.new_orden
FROM reordered_ingredientes
WHERE receta_ingredientes.id = reordered_ingredientes.id;

COMMIT;

-- Verificar resultados después de la limpieza
SELECT 'Recetas totales después de limpieza:' as info, COUNT(*) as cantidad FROM recetas
UNION ALL
SELECT 'Procedimientos totales después de limpieza:', COUNT(*) FROM procedimientos
UNION ALL
SELECT 'Ingredientes de recetas totales después de limpieza:', COUNT(*) FROM receta_ingredientes;

