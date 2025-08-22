-- SCRIPT DE VERIFICACIÓN: Progreso total después de ejecutar todas las partes
-- Ejecutar en Supabase SQL Editor DESPUÉS de ejecutar todas las partes

-- Verificar el estado general de la base de datos
SELECT 
    'ESTADO GENERAL DE LA BASE DE DATOS' as seccion,
    '' as detalle
UNION ALL
SELECT 
    'Recetas totales en la base de datos' as seccion,
    COUNT(*)::text as detalle
FROM recetas
UNION ALL
SELECT 
    'Recetas con ingredientes reales' as seccion,
    COUNT(DISTINCT r.id)::text as detalle
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
UNION ALL
SELECT 
    'Recetas con procedimientos reales' as seccion,
    COUNT(DISTINCT r.id)::text as detalle
FROM recetas r
JOIN procedimientos p ON r.id = p.receta_id
UNION ALL
SELECT 
    'Recetas completas (ingredientes + procedimientos)' as seccion,
    COUNT(DISTINCT r.id)::text as detalle
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
JOIN procedimientos p ON r.id = p.receta_id;

-- Verificar por categorías
SELECT 
    'ESTADO POR CATEGORÍAS' as seccion,
    '' as detalle
UNION ALL
SELECT 
    'Almuerzos con ingredientes' as seccion,
    COUNT(DISTINCT r.id)::text as detalle
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
WHERE r.categoria = 'almuerzo'
UNION ALL
SELECT 
    'Almuerzos con procedimientos' as seccion,
    COUNT(DISTINCT r.id)::text as detalle
FROM recetas r
JOIN procedimientos p ON r.id = p.receta_id
WHERE r.categoria = 'almuerzo'
UNION ALL
SELECT 
    'Desayunos con ingredientes' as seccion,
    COUNT(DISTINCT r.id)::text as detalle
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
WHERE r.categoria = 'desayuno'
UNION ALL
SELECT 
    'Desayunos con procedimientos' as seccion,
    COUNT(DISTINCT r.id)::text as detalle
FROM recetas r
JOIN procedimientos p ON r.id = p.receta_id
WHERE r.categoria = 'desayuno'
UNION ALL
SELECT 
    'Copa de leche con ingredientes' as seccion,
    COUNT(DISTINCT r.id)::text as detalle
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
WHERE r.categoria = 'copa_leche'
UNION ALL
SELECT 
    'Copa de leche con procedimientos' as seccion,
    COUNT(DISTINCT r.id)::text as detalle
FROM recetas r
JOIN procedimientos p ON r.id = p.receta_id
WHERE r.categoria = 'copa_leche';

-- Listar recetas que aún no tienen ingredientes
SELECT 
    'RECETAS SIN INGREDIENTES' as seccion,
    '' as detalle
UNION ALL
SELECT 
    r.titulo as seccion,
    r.categoria as detalle
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
WHERE ri.receta_id IS NULL
ORDER BY r.categoria, r.titulo;

-- Listar recetas que aún no tienen procedimientos
SELECT 
    'RECETAS SIN PROCEDIMIENTOS' as seccion,
    '' as detalle
UNION ALL
SELECT 
    r.titulo as seccion,
    r.categoria as detalle
FROM recetas r
LEFT JOIN procedimientos p ON r.id = p.receta_id
WHERE p.receta_id IS NULL
ORDER BY r.categoria, r.titulo;

-- Mostrar algunas recetas completas como ejemplo
SELECT 
    'EJEMPLOS DE RECETAS COMPLETAS' as seccion,
    '' as detalle
UNION ALL
SELECT 
    r.titulo as seccion,
    CONCAT('Categoría: ', r.categoria, ' | Ingredientes: ', COUNT(ri.id), ' | Procedimientos: ', COUNT(p.id)) as detalle
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
JOIN procedimientos p ON r.id = p.receta_id
GROUP BY r.id, r.titulo, r.categoria
ORDER BY r.categoria, r.titulo
LIMIT 10;
