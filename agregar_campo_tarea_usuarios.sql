-- =====================================================
-- AGREGAR CAMPO TAREA A TABLA USUARIOS
-- =====================================================

-- 1. Agregar el campo tarea a la tabla usuarios
ALTER TABLE usuarios 
ADD COLUMN tarea VARCHAR(50) DEFAULT 'cocina';

-- 2. Agregar restricción de verificación para los valores permitidos
ALTER TABLE usuarios 
ADD CONSTRAINT usuarios_tarea_check 
CHECK (tarea IN ('cocina', 'limpieza', 'cocina y limpieza'));

-- 3. Actualizar registros existentes (opcional - establecer un valor por defecto)
UPDATE usuarios 
SET tarea = 'cocina' 
WHERE tarea IS NULL OR tarea = '';

-- 4. Verificar que la restricción se creó correctamente
SELECT 'Restricción creada:' as info;
SELECT conname, pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'usuarios'::regclass 
AND contype = 'c';

-- 5. Verificar la estructura de la tabla
SELECT 'Estructura actualizada de la tabla usuarios:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'usuarios' 
AND column_name = 'tarea';

-- 6. Mostrar algunos registros de ejemplo
SELECT 'Registros de ejemplo:' as info;
SELECT documento, primer_nombre, primer_apellido, tarea 
FROM usuarios 
LIMIT 5;
