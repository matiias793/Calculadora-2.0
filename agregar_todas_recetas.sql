-- Script para agregar todas las recetas faltantes a la base de datos
-- Primero agregamos ingredientes que puedan faltar

INSERT INTO ingredientes (nombre, unidad_base, categoria) VALUES
-- Proteínas
('Suprema', 'g', 'proteina'),
('Carne en cubos', 'g', 'proteina'),
('Carne entera', 'g', 'proteina'),
('Carne picada o en cubos', 'g', 'proteina'),
('Carne de cerdo', 'g', 'proteina'),
('Carne picada', 'g', 'proteina'),
('Milanesa de carne', 'g', 'proteina'),
('Milanesa de pescado', 'g', 'proteina'),
('Milanesa de pollo', 'g', 'proteina'),
('Suprema de pollo', 'g', 'proteina'),
('Pollo suprema', 'g', 'proteina'),

-- Cereales y harinas
('Avena', 'g', 'cereal'),
('Arroz', 'g', 'cereal'),
('Fideos', 'g', 'cereal'),
('Lentejas', 'g', 'cereal'),
('Polenta', 'g', 'cereal'),
('Harina de maíz', 'g', 'cereal'),
('Harina de trigo', 'g', 'cereal'),
('Harina', 'g', 'cereal'),
('Harina de mijo', 'g', 'cereal'),
('Almidón de maíz', 'g', 'cereal'),
('Pan rallado', 'g', 'cereal'),
('Polvo de hornear', 'g', 'cereal'),
('Levadura seca', 'g', 'cereal'),
('Cebada instantánea', 'g', 'cereal'),

-- Verduras
('Zanahoria', 'g', 'verdura'),
('Cebolla', 'g', 'verdura'),
('Morrón', 'g', 'verdura'),
('Papa', 'g', 'verdura'),
('Boniato', 'g', 'verdura'),
('Zapallo/calabaza', 'g', 'verdura'),
('Zapallo', 'g', 'verdura'),
('Calabaza', 'g', 'verdura'),
('Zapallito', 'g', 'verdura'),
('Berenjena', 'g', 'verdura'),
('Choclo', 'g', 'verdura'),
('Arvejas', 'g', 'verdura'),
('Porotos manteca', 'g', 'verdura'),
('Espinaca', 'g', 'verdura'),
('Acelga', 'g', 'verdura'),
('Brócoli fresco', 'g', 'verdura'),
('Repollo', 'g', 'verdura'),
('Tomate', 'g', 'verdura'),
('Puerro', 'g', 'verdura'),
('Apio', 'g', 'verdura'),
('Chaucha', 'g', 'verdura'),
('Lechuga', 'g', 'verdura'),
('Remolacha', 'g', 'verdura'),

-- Frutas
('Banana', 'g', 'fruta'),
('Naranja', 'ml', 'fruta'),
('Manzana rallada', 'g', 'fruta'),
('Fruta', 'g', 'fruta'),
('Naranja con cáscara', 'g', 'fruta'),

-- Lácteos
('Queso rallado', 'g', 'lacteo'),
('Queso fresco rallado', 'g', 'lacteo'),
('Queso Danbo, Cuartirolo, Gouda o Port Salut', 'g', 'lacteo'),
('Ricota', 'g', 'lacteo'),
('Dulce de leche', 'g', 'lacteo'),

-- Condimentos y especias
('Sal', 'g', 'condimento'),
('Aceite', 'ml', 'condimento'),
('Aceite (asadera)', 'ml', 'condimento'),
('Aceite (asadera)', 'g', 'condimento'),
('Ajo', 'g', 'condimento'),
('Perejil', 'g', 'condimento'),
('Hierbas (orégano, albahaca, tomillo, perejil)', 'g', 'condimento'),
('Mix de verdes (perejil, ciboulette)', 'g', 'condimento'),
('Orégano', 'g', 'condimento'),
('Pimentón', 'g', 'condimento'),
('Nuez moscada', 'g', 'condimento'),
('Tomillo', 'g', 'condimento'),
('Albahaca', 'g', 'condimento'),
('Ciboulette', 'g', 'condimento'),
('Canela', 'g', 'condimento'),
('Canela en rama', 'c/n', 'condimento'),
('Cúrcuma', 'g', 'condimento'),
('Laurel', 'hoja', 'condimento'),
('Apio', 'g', 'condimento'),
('Puerro', 'g', 'condimento'),
('Hierbas frescas', 'g', 'condimento'),
('Hierbas aromáticas', 'g', 'condimento'),
('Hierbas aromáticas secas', 'g', 'condimento'),
('Hierbas aromáticas frescas', 'g', 'condimento'),
('Ralladura de limón o naranja', 'c/n', 'condimento'),
('Ralladura de limón', 'c/n', 'condimento'),
('Ralladura de naranja', 'unidad', 'condimento'),
('Ralladura de limón', 'g', 'condimento'),
('Ralladura de naranja', 'unidad', 'condimento'),
('Cáscara de naranja', 'c/n', 'condimento'),
('Jengibre fresco', 'g', 'condimento'),

-- Otros ingredientes
('Pulpa de tomate', 'ml', 'otro'),
('Pulpa de tomate', 'g', 'otro'),
('Agua', 'ml', 'otro'),
('Agua tibia', 'ml', 'otro'),
('Agua hervida y entibiada', 'ml', 'otro'),
('Agua de cocción', 'ml', 'otro'),
('Azúcar', 'g', 'otro'),
('Vainilla', 'ml', 'otro'),
('Vainilla', 'g', 'otro'),
('Cocoa', 'g', 'otro'),
('Cacao', 'g', 'otro'),
('Coco rallado', 'g', 'otro'),
('Coco', 'g', 'otro'),
('Yemas', 'g', 'otro'),
('Huevo', 'g', 'otro'),
('Huevos', 'unidad', 'otro'),
('Huevo', 'unidad', 'otro'),
('Huevos', 'unid.', 'otro'),
('Huevo', 'unid.', 'otro'),
('Dulce de membrillo', 'g', 'otro'),
('Pasas de uva', 'g', 'otro'),
('Semillas de lino', 'g', 'otro'),
('Semillas de sésamo', 'g', 'otro'),
('Semillas de girasol', 'g', 'otro'),
('Maní sin sal', 'g', 'otro'),
('Jugo de limón', 'ml', 'otro'),
('Jugo de naranja', 'unidad', 'otro'),
('Jugo de limón', 'unidad', 'otro'),
('Vinagre/jugo de limón', 'ml', 'otro'),
('Vinagre', 'ml', 'otro'),
('Mayonesa', 'g', 'otro'),
('Mayonesa vegetal', 'g', 'otro'),
('Salsa blanca', 'porción', 'otro'),
('Salsa blanca liviana', 'porción', 'otro'),
('Salsa Blanca Liviana', 'porción', 'otro'),
('Puré en escama', 'g', 'otro'),
('Verdura de estación', 'g', 'otro'),
('Vegetales', 'g', 'otro'),
('Frutos secos deshidratados', 'g', 'otro'),
('Frutas deshidratadas', 'g', 'otro'),
('Porotos negros crudos', 'g', 'otro'),
('Garbanzos', 'g', 'otro'),
('Salvado de trigo', 'g', 'otro'),
('Rúcula fresca', 'g', 'otro'),
('Rúcula congelada', 'g', 'otro'),
('Zapallo Cabutia', 'g', 'otro'),
('Leche en fluída', 'ml', 'otro'),
('Leche fuída', 'ml', 'otro'),
('Leche fuída con cocoa', 'ml', 'otro'),
('Leche fuída con cebada instantánea', 'ml', 'otro'),
('Leche fuída con vainilla', 'ml', 'otro'),
('Leche en polvo con cocoa', 'ml', 'otro'),
('Leche en polvo con cebada instantánea', 'ml', 'otro'),
('Leche en polvo con vainilla', 'ml', 'otro'),
('Aceite', 'cc', 'otro'),
('Aceite', 'g', 'otro'),
('Condimentos (pimentón, nuez moscada)', 'g', 'otro'),
('Hierbas o condimentos', 'c/n', 'otro'),
('Verdura de estación', 'g', 'otro'),
('Vegetales', 'g', 'otro'),
('Frutos secos deshidratados', 'g', 'otro'),
('Frutas deshidratadas', 'g', 'otro'),
('Porotos negros crudos', 'g', 'otro'),
('Garbanzos', 'g', 'otro'),
('Salvado de trigo', 'g', 'otro'),
('Rúcula fresca', 'g', 'otro'),
('Rúcula congelada', 'g', 'otro'),
('Zapallo Cabutia', 'g', 'otro'),
('Leche en fluída', 'ml', 'otro'),
('Leche fuída', 'ml', 'otro'),
('Leche fuída con cocoa', 'ml', 'otro'),
('Leche fuída con cebada instantánea', 'ml', 'otro'),
('Leche fuída con vainilla', 'ml', 'otro'),
('Leche en polvo con cocoa', 'ml', 'otro'),
('Leche en polvo con cebada instantánea', 'ml', 'otro'),
('Leche en polvo con vainilla', 'ml', 'otro'),
('Aceite', 'cc', 'otro'),
('Aceite', 'g', 'otro'),
('Condimentos (pimentón, nuez moscada)', 'g', 'otro'),
('Hierbas o condimentos', 'c/n', 'otro')
ON CONFLICT (nombre) DO NOTHING;

-- Ahora agregamos todas las recetas de almuerzos y cenas
INSERT INTO recetas (titulo, categoria, descripcion) VALUES
('Bocaditos de pollo', 'almuerzo', 'Bocaditos de pollo con avena y hierbas'),
('Budín de pescado', 'almuerzo', 'Budín de pescado con verduras'),
('Carbonada criolla', 'almuerzo', 'Carbonada criolla tradicional'),
('Carne a la portuguesa', 'almuerzo', 'Carne a la portuguesa con verduras'),
('Cazuela de lentejas', 'almuerzo', 'Cazuela de lentejas con carne'),
('Chop suey de cerdo', 'almuerzo', 'Chop suey de cerdo con verduras'),
('Chupín de pescado y verduras', 'almuerzo', 'Chupín de pescado con verduras'),
('Croquetas de atún y papas', 'almuerzo', 'Croquetas de atún con papas'),
('Ensalada completa de pollo', 'almuerzo', 'Ensalada completa con pollo'),
('Ensalada completa de atún', 'almuerzo', 'Ensalada completa con atún'),
('Hamburguesa de pescado', 'almuerzo', 'Hamburguesa de pescado'),
('Lasaña', 'almuerzo', 'Lasaña de acelga y carne'),
('Pan de Carne / Hamburguesa', 'almuerzo', 'Pan de carne o hamburguesa'),
('Pasta sorpresa', 'almuerzo', 'Pasta sorpresa con pollo y brócoli'),
('Pasta con verdusalsa', 'almuerzo', 'Pasta con verdusalsa'),
('Pastel de carne y papa', 'almuerzo', 'Pastel de carne con papa'),
('Pollo colorido', 'almuerzo', 'Pollo colorido con verduras'),
('Pastel de carne y berenjenas', 'almuerzo', 'Pastel de carne con berenjenas'),
('Pollo con salsa blanca y verduras', 'almuerzo', 'Pollo con salsa blanca'),
('Torta de carne y vegetales', 'almuerzo', 'Torta de carne con vegetales'),
('Tortilla de papa, vegetales y pollo', 'almuerzo', 'Tortilla de papa con pollo'),
('Torta de atún', 'almuerzo', 'Torta de atún'),
('Arroz', 'almuerzo', 'Arroz básico'),
('Fideos', 'almuerzo', 'Fideos básicos'),
('Arroz con vegetales salteados', 'almuerzo', 'Arroz con vegetales salteados'),
('Arroz amarillo', 'almuerzo', 'Arroz amarillo con cúrcuma'),
('Ensalada de vegetales', 'almuerzo', 'Ensalada de vegetales'),
('Ensalada jardinera', 'almuerzo', 'Ensalada jardinera'),
('Ensalada primavera', 'almuerzo', 'Ensalada primavera'),
('Ensalada de leguminosas y vegetales', 'almuerzo', 'Ensalada de leguminosas'),
('Papas al natural', 'almuerzo', 'Papas al natural'),
('Puré de papas', 'almuerzo', 'Puré de papas'),
('Puré triple', 'almuerzo', 'Puré triple de papas, zapallo y zanahoria'),
('Puré de papas instantáneo', 'almuerzo', 'Puré de papas instantáneo'),
('Hortalizas asadas', 'almuerzo', 'Hortalizas asadas'),
('Salsa blanca liviana', 'almuerzo', 'Salsa blanca liviana'),
('Arroz plato principal', 'almuerzo', 'Arroz como plato principal'),
('Fideos plato principal', 'almuerzo', 'Fideos como plato principal'),
('Arroz con leche', 'postre', 'Arroz con leche'),
('Crema de naranja', 'postre', 'Crema de naranja'),
('Crema de vainilla', 'postre', 'Crema de vainilla'),
('Budín de zapallo y coco', 'postre', 'Budín de zapallo y coco'),
('Budín de harina de maíz', 'postre', 'Budín de harina de maíz'),
('Polenta/plato principal', 'receta_base', 'Polenta como plato principal'),
('Masa básica para tortas', 'receta_base', 'Masa básica para tortas'),
('Filloas', 'receta_base', 'Filloas')
ON CONFLICT DO NOTHING;

-- Agregamos recetas de desayunos y meriendas
INSERT INTO recetas (titulo, categoria, descripcion) VALUES
('Brownie de porotos negros', 'desayuno', 'Brownie de porotos negros'),
('Budín de banana', 'desayuno', 'Budín de banana'),
('Fainá de zanahoria y queso', 'desayuno', 'Fainá de zanahoria y queso'),
('Pasta frola', 'desayuno', 'Pasta frola'),
('Torta básica de vainilla', 'desayuno', 'Torta básica de vainilla'),
('Torta de calabaza', 'desayuno', 'Torta de calabaza'),
('Torta de naranja', 'desayuno', 'Torta de naranja'),
('Pan casero', 'desayuno', 'Pan casero'),
('Pan de calabaza', 'desayuno', 'Pan de calabaza'),
('Scones de queso', 'desayuno', 'Scones de queso'),
('Scones dulces', 'desayuno', 'Scones dulces'),
('Hummus', 'desayuno', 'Hummus'),
('Untable de ricota', 'desayuno', 'Untable de ricota'),
('Untable de zanahoria', 'desayuno', 'Untable de zanahoria'),
('Galletas de avena y pasas', 'desayuno', 'Galletas de avena y pasas'),
('Galletas de avena y queso', 'desayuno', 'Galletas de avena y queso'),
('Galletitas cítricas', 'desayuno', 'Galletitas cítricas'),
('Ojitos caseros', 'desayuno', 'Ojitos caseros'),
('Alfajores de maicena', 'desayuno', 'Alfajores de maicena'),
('Barra de cereales', 'desayuno', 'Barra de cereales'),
('Mix de frutos secos', 'desayuno', 'Mix de frutos secos'),
('Crema de vainilla', 'desayuno', 'Crema de vainilla'),
('Licuado de leche y fruta', 'desayuno', 'Licuado de leche y fruta'),
('Ojitos de mijo', 'desayuno', 'Ojitos de mijo')
ON CONFLICT DO NOTHING;

-- Agregamos recetas de copa de leche
INSERT INTO recetas (titulo, categoria, descripcion) VALUES
('Leche fluida con cocoa', 'copa_leche', 'Leche fluida con cocoa'),
('Leche fluida con cebada instantánea', 'copa_leche', 'Leche fluida con cebada instantánea'),
('Leche fluida con vainilla', 'copa_leche', 'Leche fluida con vainilla'),
('Leche en polvo con cocoa', 'copa_leche', 'Leche en polvo con cocoa'),
('Leche en polvo con cebada instantánea', 'copa_leche', 'Leche en polvo con cebada instantánea'),
('Leche en polvo con vainilla', 'copa_leche', 'Leche en polvo con vainilla')
ON CONFLICT DO NOTHING;

-- Ahora agregamos los ingredientes para cada receta
-- Empezamos con algunas recetas de almuerzo como ejemplo

-- Bocaditos de pollo
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT
    r.id as receta_id,
    i.id as ingrediente_id,
    CASE 
        WHEN i.nombre = 'Suprema' THEN 80
        WHEN i.nombre = 'Avena' THEN 20
        WHEN i.nombre = 'Huevo' THEN 15
        WHEN i.nombre = 'Sal' THEN 0.5
        WHEN i.nombre = 'Hierbas (orégano, albahaca, tomillo, perejil)' THEN 1
        WHEN i.nombre = 'Aceite (asadera)' THEN 5
    END as cantidad,
    CASE 
        WHEN i.nombre = 'Suprema' THEN 'g'
        WHEN i.nombre = 'Avena' THEN 'g'
        WHEN i.nombre = 'Huevo' THEN 'g'
        WHEN i.nombre = 'Sal' THEN 'g'
        WHEN i.nombre = 'Hierbas (orégano, albahaca, tomillo, perejil)' THEN 'g'
        WHEN i.nombre = 'Aceite (asadera)' THEN 'ml'
    END as unidad,
    CASE 
        WHEN i.nombre = 'Suprema' THEN 1
        WHEN i.nombre = 'Avena' THEN 2
        WHEN i.nombre = 'Huevo' THEN 3
        WHEN i.nombre = 'Sal' THEN 4
        WHEN i.nombre = 'Hierbas (orégano, albahaca, tomillo, perejil)' THEN 5
        WHEN i.nombre = 'Aceite (asadera)' THEN 6
    END as orden
FROM recetas r, ingredientes i
WHERE r.titulo = 'Bocaditos de pollo'
AND i.nombre IN ('Suprema', 'Avena', 'Huevo', 'Sal', 'Hierbas (orégano, albahaca, tomillo, perejil)', 'Aceite (asadera)')
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;

-- Budín de pescado
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT
    r.id as receta_id,
    i.id as ingrediente_id,
    CASE 
        WHEN i.nombre = 'Pescado' THEN 50
        WHEN i.nombre = 'Zanahoria' THEN 30
        WHEN i.nombre = 'Cebolla' THEN 10
        WHEN i.nombre = 'Ajo' THEN 1
        WHEN i.nombre = 'Pulpa de tomate' THEN 20
        WHEN i.nombre = 'Huevo' THEN 23
        WHEN i.nombre = 'Pan rallado' THEN 5
        WHEN i.nombre = 'Queso rallado' THEN 5
        WHEN i.nombre = 'Almidón de maíz' THEN 2
        WHEN i.nombre = 'Sal' THEN 0.5
        WHEN i.nombre = 'Aceite' THEN 5
        WHEN i.nombre = 'Laurel' THEN 0
    END as cantidad,
    CASE 
        WHEN i.nombre = 'Pescado' THEN 'g'
        WHEN i.nombre = 'Zanahoria' THEN 'g'
        WHEN i.nombre = 'Cebolla' THEN 'g'
        WHEN i.nombre = 'Ajo' THEN 'g'
        WHEN i.nombre = 'Pulpa de tomate' THEN 'ml'
        WHEN i.nombre = 'Huevo' THEN 'g'
        WHEN i.nombre = 'Pan rallado' THEN 'g'
        WHEN i.nombre = 'Queso rallado' THEN 'g'
        WHEN i.nombre = 'Almidón de maíz' THEN 'g'
        WHEN i.nombre = 'Sal' THEN 'g'
        WHEN i.nombre = 'Aceite' THEN 'ml'
        WHEN i.nombre = 'Laurel' THEN 'hoja'
    END as unidad,
    CASE 
        WHEN i.nombre = 'Pescado' THEN 1
        WHEN i.nombre = 'Zanahoria' THEN 2
        WHEN i.nombre = 'Cebolla' THEN 3
        WHEN i.nombre = 'Ajo' THEN 4
        WHEN i.nombre = 'Pulpa de tomate' THEN 5
        WHEN i.nombre = 'Huevo' THEN 6
        WHEN i.nombre = 'Pan rallado' THEN 7
        WHEN i.nombre = 'Queso rallado' THEN 8
        WHEN i.nombre = 'Almidón de maíz' THEN 9
        WHEN i.nombre = 'Sal' THEN 10
        WHEN i.nombre = 'Aceite' THEN 11
        WHEN i.nombre = 'Laurel' THEN 12
    END as orden
FROM recetas r, ingredientes i
WHERE r.titulo = 'Budín de pescado'
AND i.nombre IN ('Pescado', 'Zanahoria', 'Cebolla', 'Ajo', 'Pulpa de tomate', 'Huevo', 'Pan rallado', 'Queso rallado', 'Almidón de maíz', 'Sal', 'Aceite', 'Laurel')
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;

-- Carbonada criolla
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT
    r.id as receta_id,
    i.id as ingrediente_id,
    CASE 
        WHEN i.nombre = 'Carne en cubos' THEN 50
        WHEN i.nombre = 'Fideos' THEN 40
        WHEN i.nombre = 'Papa/boniato' THEN 30
        WHEN i.nombre = 'Zanahoria' THEN 40
        WHEN i.nombre = 'Zapallo/calabaza' THEN 40
        WHEN i.nombre = 'Choclo' THEN 15
        WHEN i.nombre = 'Arvejas' THEN 15
        WHEN i.nombre = 'Cebolla' THEN 10
        WHEN i.nombre = 'Morrón' THEN 15
        WHEN i.nombre = 'Pulpa de tomate' THEN 30
        WHEN i.nombre = 'Ajo' THEN 1
        WHEN i.nombre = 'Sal' THEN 1
        WHEN i.nombre = 'Aceite' THEN 10
        WHEN i.nombre = 'Perejil' THEN 2
    END as cantidad,
    CASE 
        WHEN i.nombre = 'Carne en cubos' THEN 'g'
        WHEN i.nombre = 'Fideos' THEN 'g'
        WHEN i.nombre = 'Papa/boniato' THEN 'g'
        WHEN i.nombre = 'Zanahoria' THEN 'g'
        WHEN i.nombre = 'Zapallo/calabaza' THEN 'g'
        WHEN i.nombre = 'Choclo' THEN 'g'
        WHEN i.nombre = 'Arvejas' THEN 'g'
        WHEN i.nombre = 'Cebolla' THEN 'g'
        WHEN i.nombre = 'Morrón' THEN 'g'
        WHEN i.nombre = 'Pulpa de tomate' THEN 'g'
        WHEN i.nombre = 'Ajo' THEN 'g'
        WHEN i.nombre = 'Sal' THEN 'g'
        WHEN i.nombre = 'Aceite' THEN 'g'
        WHEN i.nombre = 'Perejil' THEN 'g'
    END as unidad,
    CASE 
        WHEN i.nombre = 'Carne en cubos' THEN 1
        WHEN i.nombre = 'Fideos' THEN 2
        WHEN i.nombre = 'Papa/boniato' THEN 3
        WHEN i.nombre = 'Zanahoria' THEN 4
        WHEN i.nombre = 'Zapallo/calabaza' THEN 5
        WHEN i.nombre = 'Choclo' THEN 6
        WHEN i.nombre = 'Arvejas' THEN 7
        WHEN i.nombre = 'Cebolla' THEN 8
        WHEN i.nombre = 'Morrón' THEN 9
        WHEN i.nombre = 'Pulpa de tomate' THEN 10
        WHEN i.nombre = 'Ajo' THEN 11
        WHEN i.nombre = 'Sal' THEN 12
        WHEN i.nombre = 'Aceite' THEN 13
        WHEN i.nombre = 'Perejil' THEN 14
    END as orden
FROM recetas r, ingredientes i
WHERE r.titulo = 'Carbonada criolla'
AND i.nombre IN ('Carne en cubos', 'Fideos', 'Papa/boniato', 'Zanahoria', 'Zapallo/calabaza', 'Choclo', 'Arvejas', 'Cebolla', 'Morrón', 'Pulpa de tomate', 'Ajo', 'Sal', 'Aceite', 'Perejil')
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;

-- Agregamos algunos procedimientos de ejemplo
INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
SELECT id, 'Preparación de Bocaditos de pollo', ARRAY[
    'Cortar la suprema en cubos o bastones.',
    'Batir los huevos con las hierbas picadas y la sal.',
    'Macerar la suprema en esta mezcla durante 30 minutos, en heladera.',
    'Escurrir.',
    'Rebozar con avena hasta cubrir toda la superficie.',
    'Colocar sobre una placa aceitada.',
    'Hornear hasta que estén dorados y bien cocidos por dentro.'
], 1
FROM recetas WHERE titulo = 'Bocaditos de pollo'
ON CONFLICT DO NOTHING;

INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
SELECT id, 'Preparación de Budín de pescado', ARRAY[
    'Pelar, lavar y rallar o procesar la cebolla, el ajo y la zanahoria.',
    'Hervir el pescado fresco junto con el laurel, una vez cocido escurrir el agua y desmenuzar el pescado. Reservar.',
    'Rehogar la zanahoria, la cebolla y el ajo.',
    'Mezclar en un recipiente los huevos batidos, el queso, el almidón de maíz, pan rallado, el aceite y la sal.',
    'Agregar a esta mezcla el pescado y las verduras rehogadas y la pulpa de tomate.',
    'Disponer esta mezcla en una asadera aceitada.',
    'Cocinar en horno moderado aproximadamente 30 minutos.'
], 1
FROM recetas WHERE titulo = 'Budín de pescado'
ON CONFLICT DO NOTHING;

-- Verificamos cuántas recetas se agregaron
SELECT 'Recetas agregadas' as tipo, COUNT(*) as cantidad FROM recetas;
SELECT 'Ingredientes agregados' as tipo, COUNT(*) as cantidad FROM ingredientes;
SELECT 'Relaciones receta-ingrediente' as tipo, COUNT(*) as cantidad FROM receta_ingredientes;
SELECT 'Procedimientos agregados' as tipo, COUNT(*) as cantidad FROM procedimientos;
