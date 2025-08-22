-- Script para migrar las recetas existentes a la base de datos
-- Ejecutar después de crear las tablas con database_recetas_setup.sql

-- Insertar ingredientes básicos
INSERT INTO ingredientes (nombre, unidad_base, categoria) VALUES
-- Proteínas
('Leche fluida', 'ml', 'lacteo'),
('Leche en polvo', 'g', 'lacteo'),
('Atún', 'g', 'proteina'),
('Carne de cerdo magra', 'g', 'proteina'),
('Carne vacuna picada', 'g', 'proteina'),
('Carne vacuna entera', 'g', 'proteina'),
('Carne en cubos', 'g', 'proteina'),
('Carne picada o en cubos', 'g', 'proteina'),
('Carne entera', 'g', 'proteina'),
('Huevos', 'g', 'proteina'),
('Yemas', 'g', 'proteina'),
('Milanesa de carne', 'g', 'proteina'),
('Milanesa de pescado', 'g', 'proteina'),
('Milanesa de pollo', 'g', 'proteina'),
('Pescado', 'g', 'proteina'),
('Pollo suprema', 'g', 'proteina'),
('Suprema', 'g', 'proteina'),
('Suprema de pollo', 'g', 'proteina'),

-- Cereales y legumbres
('Aceite', 'ml', 'grasa'),
('Aceite (asadera)', 'ml', 'grasa'),
('Almidón de Maíz', 'g', 'cereal'),
('Arroz', 'g', 'cereal'),
('Arvejas', 'g', 'legumbre'),
('Avena', 'g', 'cereal'),
('Choclo', 'g', 'verdura'),
('Fideos', 'g', 'cereal'),
('Lentejas', 'g', 'legumbre'),
('Porotos', 'g', 'legumbre'),
('Polenta', 'g', 'cereal'),
('Polvo Crema', 'g', 'lacteo'),
('Flan', 'g', 'postre'),
('Pulpa tomate', 'ml', 'verdura'),
('Pulpa de tomate', 'ml', 'verdura'),
('Puré papas', 'g', 'verdura'),
('Queso rallado', 'g', 'lacteo'),
('Queso fresco', 'g', 'lacteo'),
('Pasta fresca', 'g', 'cereal'),
('Pan rallado', 'g', 'cereal'),

-- Condimentos
('Sal', 'g', 'condimento'),
('Vinagre', 'ml', 'condimento'),
('Limón', 'unidad', 'fruta'),
('Orégano', 'g', 'condimento'),
('Pimentón', 'g', 'condimento'),
('Comino', 'g', 'condimento'),
('Ajo', 'g', 'condimento'),
('Nuez moscada', 'g', 'condimento'),
('Tomillo', 'g', 'condimento'),
('Albahaca', 'g', 'condimento'),
('Perejil', 'g', 'condimento'),
('Ciboulette', 'g', 'condimento'),
('Laurel', 'hoja', 'condimento'),

-- Verduras
('Acelga', 'g', 'verdura'),
('Espinaca', 'g', 'verdura'),
('Zapallito', 'g', 'verdura'),
('Berenjena', 'g', 'verdura'),
('Brócoli', 'g', 'verdura'),
('Cebolla', 'g', 'verdura'),
('Chaucha', 'g', 'verdura'),
('Lechuga', 'g', 'verdura'),
('Morrón', 'g', 'verdura'),
('Papa', 'g', 'verdura'),
('Papa/boniato', 'g', 'verdura'),
('Boniato', 'g', 'verdura'),
('Repollo', 'g', 'verdura'),
('Remolacha', 'g', 'verdura'),
('Tomate', 'g', 'verdura'),
('Zanahoria', 'g', 'verdura'),
('Zapallo', 'g', 'verdura'),
('Zapallo/calabaza', 'g', 'verdura'),
('Calabaza', 'g', 'verdura'),

-- Frutas
('Banana', 'unidad', 'fruta'),
('Ciruela', 'unidad', 'fruta'),
('Durazno', 'unidad', 'fruta'),
('Frutilla', 'g', 'fruta'),
('Melón', 'g', 'fruta'),
('Sandía', 'g', 'fruta'),
('Mandarina', 'unidad', 'fruta'),
('Naranja', 'unidad', 'fruta'),
('Manzana', 'unidad', 'fruta'),
('Uva', 'g', 'fruta'),
('Kiwi', 'unidad', 'fruta'),

-- Otros
('Azúcar', 'g', 'endulzante'),
('Pan blanco', 'g', 'cereal'),
('Pan integral', 'g', 'cereal'),
('Ricota', 'g', 'lacteo'),
('Puerro', 'g', 'verdura'),
('Apio', 'g', 'verdura'),
('Mayonesa', 'g', 'condimento'),
('Agua', 'ml', 'liquido'),
('Vainilla', 'g', 'condimento'),
('Canela', 'g', 'condimento'),
('Coco rallado', 'g', 'fruta_seca'),
('Cáscara de naranja', 'g', 'condimento'),
('Hierbas (orégano, albahaca, tomillo, perejil)', 'g', 'condimento'),
('Mix de verdes (perejil, ciboulette)', 'g', 'condimento')
ON CONFLICT (nombre) DO NOTHING;

-- Insertar recetas de almuerzos (ejemplos)
INSERT INTO recetas (titulo, categoria, descripcion) VALUES
('Bocaditos de pollo', 'almuerzo', 'Bocaditos de pollo con avena y hierbas'),
('Budín de pescado', 'almuerzo', 'Budín de pescado con verduras'),
('Carbonada criolla', 'almuerzo', 'Carbonada criolla tradicional'),
('Carne a la portuguesa', 'almuerzo', 'Carne a la portuguesa con verduras'),
('Cazuela de lentejas', 'almuerzo', 'Cazuela de lentejas con carne'),
('Chop suey de cerdo', 'almuerzo', 'Chop suey de cerdo con verduras'),
('Arroz con leche', 'postre', 'Arroz con leche tradicional'),
('Crema de naranja', 'postre', 'Crema de naranja casera'),
('Crema de vainilla', 'postre', 'Crema de vainilla'),
('Budín de zapallo y coco', 'postre', 'Budín de zapallo con coco rallado'),
('Budín de harina de maíz', 'postre', 'Budín de harina de maíz'),
('Polenta/plato principal', 'receta_base', 'Polenta como plato principal'),
('Masa básica para tortas', 'receta_base', 'Masa básica para preparar tortas'),
('Filloas', 'receta_base', 'Filloas tradicionales')
ON CONFLICT DO NOTHING;

-- Ejemplo de inserción de ingredientes para una receta (Bocaditos de pollo)
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) 
SELECT 
    r.id as receta_id,
    i.id as ingrediente_id,
    CASE 
        WHEN i.nombre = 'Suprema' THEN 80
        WHEN i.nombre = 'Avena' THEN 20
        WHEN i.nombre = 'Huevos' THEN 15
        WHEN i.nombre = 'Sal' THEN 0.5
        WHEN i.nombre = 'Hierbas (orégano, albahaca, tomillo, perejil)' THEN 1
        WHEN i.nombre = 'Aceite (asadera)' THEN 5
    END as cantidad,
    CASE 
        WHEN i.nombre = 'Suprema' THEN 'g'
        WHEN i.nombre = 'Avena' THEN 'g'
        WHEN i.nombre = 'Huevos' THEN 'g'
        WHEN i.nombre = 'Sal' THEN 'g'
        WHEN i.nombre = 'Hierbas (orégano, albahaca, tomillo, perejil)' THEN 'g'
        WHEN i.nombre = 'Aceite (asadera)' THEN 'ml'
    END as unidad,
    CASE 
        WHEN i.nombre = 'Suprema' THEN 1
        WHEN i.nombre = 'Avena' THEN 2
        WHEN i.nombre = 'Huevos' THEN 3
        WHEN i.nombre = 'Sal' THEN 4
        WHEN i.nombre = 'Hierbas (orégano, albahaca, tomillo, perejil)' THEN 5
        WHEN i.nombre = 'Aceite (asadera)' THEN 6
    END as orden
FROM recetas r, ingredientes i
WHERE r.titulo = 'Bocaditos de pollo' 
AND i.nombre IN ('Suprema', 'Avena', 'Huevos', 'Sal', 'Hierbas (orégano, albahaca, tomillo, perejil)', 'Aceite (asadera)')
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;

-- Ejemplo de procedimiento para Bocaditos de pollo
INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
SELECT id, 'Preparación de Bocaditos de pollo', ARRAY[
    'Cortar la suprema en trozos pequeños',
    'Mezclar con avena, huevo y hierbas',
    'Formar bolitas pequeñas',
    'Cocinar en aceite caliente hasta dorar'
], 1
FROM recetas WHERE titulo = 'Bocaditos de pollo'
ON CONFLICT DO NOTHING;
