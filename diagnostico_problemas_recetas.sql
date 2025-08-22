-- Script de diagnóstico para problemas en recetas
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar recetas duplicadas por título
SELECT 
    titulo,
    COUNT(*) as cantidad_duplicados,
    STRING_AGG(id::text, ', ') as ids_duplicados
FROM recetas 
GROUP BY titulo 
HAVING COUNT(*) > 1
ORDER BY cantidad_duplicados DESC;

-- 2. Verificar procedimientos duplicados por receta
SELECT 
    r.titulo as receta,
    p.titulo as procedimiento,
    COUNT(*) as cantidad_duplicados,
    STRING_AGG(p.id::text, ', ') as ids_duplicados
FROM procedimientos p
JOIN recetas r ON p.receta_id = r.id
GROUP BY r.titulo, p.titulo
HAVING COUNT(*) > 1
ORDER BY cantidad_duplicados DESC;

-- 3. Verificar recetas sin ingredientes
SELECT 
    r.id,
    r.titulo,
    r.categoria
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
WHERE ri.receta_id IS NULL
ORDER BY r.titulo;

-- 4. Verificar recetas sin procedimientos
SELECT 
    r.id,
    r.titulo,
    r.categoria
FROM recetas r
LEFT JOIN procedimientos p ON r.id = p.receta_id
WHERE p.receta_id IS NULL
ORDER BY r.titulo;

-- 5. Verificar recetas sin ingredientes NI procedimientos
SELECT 
    r.id,
    r.titulo,
    r.categoria
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
LEFT JOIN procedimientos p ON r.id = p.receta_id
WHERE ri.receta_id IS NULL AND p.receta_id IS NULL
ORDER BY r.titulo;

-- 6. Contar total de recetas por categoría
SELECT 
    categoria,
    COUNT(*) as total_recetas
FROM recetas
GROUP BY categoria
ORDER BY total_recetas DESC;

-- 7. Verificar ingredientes huérfanos (sin receta asociada)
SELECT 
    ri.id,
    ri.receta_id,
    ri.ingrediente_id,
    i.nombre as ingrediente
FROM receta_ingredientes ri
LEFT JOIN recetas r ON ri.receta_id = r.id
LEFT JOIN ingredientes i ON ri.ingrediente_id = i.id
WHERE r.id IS NULL;

-- 8. Verificar procedimientos huérfanos (sin receta asociada)
SELECT 
    p.id,
    p.receta_id,
    p.titulo
FROM procedimientos p
LEFT JOIN recetas r ON p.receta_id = r.id
WHERE r.id IS NULL;
