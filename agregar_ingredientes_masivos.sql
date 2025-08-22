-- Script para agregar ingredientes básicos a recetas sin ingredientes
-- Ejecutar en Supabase SQL Editor

BEGIN;

-- Obtener todas las recetas que no tienen ingredientes
WITH recetas_sin_ingredientes AS (
    SELECT r.id, r.titulo, r.categoria
    FROM recetas r
    LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
    WHERE ri.receta_id IS NULL
)
-- Agregar ingredientes básicos según la categoría
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT 
    r.id,
    i.id,
    CASE 
        WHEN r.categoria = 'desayuno' THEN 50
        WHEN r.categoria = 'almuerzo' THEN 100
        WHEN r.categoria = 'postre' THEN 30
        WHEN r.categoria = 'receta_base' THEN 80
        WHEN r.categoria = 'copa_leche' THEN 200
        ELSE 50
    END,
    'g',
    1
FROM recetas_sin_ingredientes r
CROSS JOIN (
    SELECT id FROM ingredientes 
    WHERE nombre IN ('Harina', 'Azúcar', 'Leche fluida', 'Huevo', 'Aceite')
    LIMIT 1
) i
WHERE r.titulo NOT IN (
    'Chop suey de cerdo', 'Chupín de pescado y verduras', 'Croquetas de atún y papas',
    'Ensalada completa de atún', 'Ensalada completa de pollo'
);

-- Agregar ingredientes específicos para recetas de desayuno
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT 
    r.id,
    i.id,
    30,
    'g',
    2
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
CROSS JOIN (SELECT id FROM ingredientes WHERE nombre = 'Avena' LIMIT 1) i
WHERE r.categoria = 'desayuno' 
AND ri.receta_id IS NULL
AND r.titulo IN ('Barra de cereales', 'Galletas de avena y pasas', 'Galletas de avena y queso');

-- Agregar ingredientes específicos para recetas de almuerzo
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT 
    r.id,
    i.id,
    CASE 
        WHEN r.titulo LIKE '%arroz%' THEN 50
        WHEN r.titulo LIKE '%fideos%' THEN 60
        WHEN r.titulo LIKE '%pasta%' THEN 60
        ELSE 40
    END,
    'g',
    2
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
CROSS JOIN (SELECT id FROM ingredientes WHERE nombre = 'Arroz' LIMIT 1) i
WHERE r.categoria = 'almuerzo' 
AND ri.receta_id IS NULL
AND (r.titulo LIKE '%arroz%' OR r.titulo LIKE '%fideos%' OR r.titulo LIKE '%pasta%');

-- Agregar ingredientes específicos para recetas de postre
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT 
    r.id,
    i.id,
    20,
    'g',
    2
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
CROSS JOIN (SELECT id FROM ingredientes WHERE nombre = 'Azúcar' LIMIT 1) i
WHERE r.categoria = 'postre' 
AND ri.receta_id IS NULL;

-- Agregar ingredientes específicos para recetas de copa de leche
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT 
    r.id,
    i.id,
    200,
    'ml',
    2
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
CROSS JOIN (SELECT id FROM ingredientes WHERE nombre = 'Leche fluida' LIMIT 1) i
WHERE r.categoria = 'copa_leche' 
AND ri.receta_id IS NULL;

COMMIT;

-- Verificar el resultado
SELECT 
    'Recetas totales' as tipo,
    COUNT(*) as cantidad
FROM recetas
UNION ALL
SELECT 
    'Recetas con ingredientes' as tipo,
    COUNT(DISTINCT r.id) as cantidad
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
UNION ALL
SELECT 
    'Recetas con procedimientos' as tipo,
    COUNT(DISTINCT r.id) as cantidad
FROM recetas r
JOIN procedimientos p ON r.id = p.receta_id
UNION ALL
SELECT 
    'Recetas completas (con ingredientes y procedimientos)' as tipo,
    COUNT(DISTINCT r.id) as cantidad
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
JOIN procedimientos p ON r.id = p.receta_id;
