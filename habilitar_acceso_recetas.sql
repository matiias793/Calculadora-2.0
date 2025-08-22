-- Script para habilitar acceso público a las tablas de recetas
-- Ejecutar en el SQL Editor de Supabase

-- 1. Deshabilitar RLS en las tablas de recetas
ALTER TABLE recetas DISABLE ROW LEVEL SECURITY;
ALTER TABLE ingredientes DISABLE ROW LEVEL SECURITY;
ALTER TABLE receta_ingredientes DISABLE ROW LEVEL SECURITY;
ALTER TABLE procedimientos DISABLE ROW LEVEL SECURITY;

-- 2. Otorgar permisos completos al rol anon y authenticated
GRANT ALL ON TABLE recetas TO anon, authenticated;
GRANT ALL ON TABLE ingredientes TO anon, authenticated;
GRANT ALL ON TABLE receta_ingredientes TO anon, authenticated;
GRANT ALL ON TABLE procedimientos TO anon, authenticated;

-- 3. Otorgar permisos en las secuencias (para los IDs autoincrementales)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 4. Verificar que las políticas se eliminaron
SELECT 
    schemaname,
    tablename,
    policyname
FROM pg_policies 
WHERE tablename IN ('recetas', 'ingredientes', 'receta_ingredientes', 'procedimientos');

-- 5. Verificar permisos
SELECT 
    table_name,
    privilege_type,
    grantee
FROM information_schema.table_privileges 
WHERE table_name IN ('recetas', 'ingredientes', 'receta_ingredientes', 'procedimientos')
AND table_schema = 'public'
ORDER BY table_name, grantee;
