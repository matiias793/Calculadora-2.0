-- Script de diagnóstico para verificar las tablas de recetas
-- Ejecutar en el SQL Editor de Supabase

-- 1. Verificar si las tablas existen
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('recetas', 'ingredientes', 'receta_ingredientes', 'procedimientos')
ORDER BY table_name;

-- 2. Verificar estructura de la tabla recetas
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'recetas' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Verificar si hay datos en las tablas
SELECT 'recetas' as tabla, COUNT(*) as cantidad FROM recetas
UNION ALL
SELECT 'ingredientes' as tabla, COUNT(*) as cantidad FROM ingredientes
UNION ALL
SELECT 'receta_ingredientes' as tabla, COUNT(*) as cantidad FROM receta_ingredientes
UNION ALL
SELECT 'procedimientos' as tabla, COUNT(*) as cantidad FROM procedimientos;

-- 4. Verificar algunas recetas de ejemplo
SELECT id, titulo, categoria, activa, created_at 
FROM recetas 
ORDER BY id 
LIMIT 5;

-- 5. Verificar algunos ingredientes
SELECT id, nombre, unidad_base, categoria 
FROM ingredientes 
ORDER BY nombre 
LIMIT 10;

-- 6. Verificar permisos RLS (Row Level Security)
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename IN ('recetas', 'ingredientes', 'receta_ingredientes', 'procedimientos');
