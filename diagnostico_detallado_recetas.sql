-- Script de diagnóstico detallado para problemas en recetas
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar recetas duplicadas por título con detalles
SELECT 
    titulo,
    COUNT(*) as cantidad_duplicados,
    STRING_AGG(id::text, ', ') as ids_duplicados,
    STRING_AGG(categoria, ', ') as categorias
FROM recetas 
GROUP BY titulo 
HAVING COUNT(*) > 1
ORDER BY cantidad_duplicados DESC;

-- 2. Verificar procedimientos duplicados por receta con detalles
SELECT 
    r.titulo as receta,
    p.titulo as procedimiento,
    COUNT(*) as cantidad_duplicados,
    STRING_AGG(p.id::text, ', ') as ids_duplicados,
    STRING_AGG(p.pasos::text, ' | ') as pasos_duplicados
FROM procedimientos p
JOIN recetas r ON p.receta_id = r.id
GROUP BY r.titulo, p.titulo
HAVING COUNT(*) > 1
ORDER BY cantidad_duplicados DESC;

-- 3. Verificar recetas sin ingredientes con detalles
SELECT 
    r.id,
    r.titulo,
    r.categoria,
    r.descripcion
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
WHERE ri.receta_id IS NULL
ORDER BY r.titulo;

-- 4. Verificar recetas sin procedimientos con detalles
SELECT 
    r.id,
    r.titulo,
    r.categoria,
    r.descripcion
FROM recetas r
LEFT JOIN procedimientos p ON r.id = p.receta_id
WHERE p.receta_id IS NULL
ORDER BY r.titulo;

-- 5. Verificar recetas sin ingredientes NI procedimientos
SELECT 
    r.id,
    r.titulo,
    r.categoria,
    r.descripcion
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
LEFT JOIN procedimientos p ON r.id = p.receta_id
WHERE ri.receta_id IS NULL AND p.receta_id IS NULL
ORDER BY r.titulo;

-- 6. Verificar ingredientes huérfanos (sin receta asociada)
SELECT 
    ri.id,
    ri.receta_id,
    ri.ingrediente_id,
    i.nombre as ingrediente,
    ri.cantidad,
    ri.unidad
FROM receta_ingredientes ri
LEFT JOIN recetas r ON ri.receta_id = r.id
LEFT JOIN ingredientes i ON ri.ingrediente_id = i.id
WHERE r.id IS NULL;

-- 7. Verificar procedimientos huérfanos (sin receta asociada)
SELECT 
    p.id,
    p.receta_id,
    p.titulo,
    p.pasos
FROM procedimientos p
LEFT JOIN recetas r ON p.receta_id = r.id
WHERE r.id IS NULL;

-- 8. Verificar recetas con ingredientes pero sin procedimientos
SELECT 
    r.id,
    r.titulo,
    r.categoria,
    COUNT(ri.id) as cantidad_ingredientes
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
LEFT JOIN procedimientos p ON r.id = p.receta_id
WHERE ri.receta_id IS NOT NULL AND p.receta_id IS NULL
GROUP BY r.id, r.titulo, r.categoria
ORDER BY r.titulo;

-- 9. Verificar recetas con procedimientos pero sin ingredientes
SELECT 
    r.id,
    r.titulo,
    r.categoria,
    COUNT(p.id) as cantidad_procedimientos
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
LEFT JOIN procedimientos p ON r.id = p.receta_id
WHERE ri.receta_id IS NULL AND p.receta_id IS NOT NULL
GROUP BY r.id, r.titulo, r.categoria
ORDER BY r.titulo;

-- 10. Verificar recetas con múltiples procedimientos idénticos
SELECT 
    r.titulo as receta,
    p.titulo as procedimiento,
    COUNT(*) as cantidad_duplicados,
    STRING_AGG(p.id::text, ', ') as ids_duplicados
FROM procedimientos p
JOIN recetas r ON p.receta_id = r.id
GROUP BY r.titulo, p.titulo, p.pasos
HAVING COUNT(*) > 1
ORDER BY cantidad_duplicados DESC;
