-- Script para agregar procedimientos faltantes a recetas
-- Ejecutar en Supabase SQL Editor

BEGIN;

-- Desayunos
INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Alfajores de maicena'), 'Preparación', ARRAY['Mezclar todos los ingredientes secos', 'Agregar los ingredientes líquidos', 'Formar los alfajores', 'Hornear hasta dorar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Barra de cereales'), 'Preparación', ARRAY['Mezclar los cereales', 'Agregar miel y otros ingredientes', 'Formar barras', 'Enfriar y cortar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), 'Preparación', ARRAY['Procesar los porotos', 'Mezclar con los demás ingredientes', 'Verter en molde', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Budín de banana'), 'Preparación', ARRAY['Machacar las bananas', 'Mezclar con los demás ingredientes', 'Verter en molde', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Ensalada de leguminosas y vegetales'), 'Preparación', ARRAY['Cocinar las leguminosas', 'Cortar los vegetales', 'Mezclar todos los ingredientes', 'Condimentar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Fainá de zanahoria y queso'), 'Preparación', ARRAY['Rallar la zanahoria', 'Mezclar con harina y queso', 'Formar masa', 'Cocinar en sartén'], 1),
((SELECT id FROM recetas WHERE titulo = 'Galletas de avena y pasas'), 'Preparación', ARRAY['Mezclar avena con pasas', 'Agregar ingredientes húmedos', 'Formar galletas', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Galletas de avena y queso'), 'Preparación', ARRAY['Mezclar avena con queso', 'Agregar ingredientes húmedos', 'Formar galletas', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Galletitas cítricas'), 'Preparación', ARRAY['Mezclar ingredientes secos', 'Agregar ralladura cítrica', 'Formar galletitas', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Hummus'), 'Preparación', ARRAY['Procesar los garbanzos', 'Agregar tahini y limón', 'Condimentar', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Licuado de leche y fruta'), 'Preparación', ARRAY['Cortar la fruta', 'Licuar con leche', 'Agregar azúcar si es necesario', 'Servir frío'], 1),
((SELECT id FROM recetas WHERE titulo = 'Mix de frutos secos'), 'Preparación', ARRAY['Seleccionar frutos secos', 'Mezclar en proporciones', 'Tostar ligeramente', 'Enfriar y guardar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Ojitos caseros'), 'Preparación', ARRAY['Preparar la masa', 'Formar ojitos', 'Hornear hasta dorar', 'Enfriar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Ojitos de mijo'), 'Preparación', ARRAY['Cocinar el mijo', 'Mezclar con otros ingredientes', 'Formar ojitos', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Pan casero'), 'Preparación', ARRAY['Mezclar ingredientes', 'Amasar la masa', 'Dejar leudar', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Pan de calabaza'), 'Preparación', ARRAY['Cocinar y procesar calabaza', 'Mezclar con ingredientes', 'Formar pan', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Pasta frola'), 'Preparación', ARRAY['Preparar la masa', 'Estirar y rellenar', 'Formar tiras', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Scones de queso'), 'Preparación', ARRAY['Mezclar ingredientes secos', 'Agregar queso', 'Formar scones', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Scones dulces'), 'Preparación', ARRAY['Mezclar ingredientes secos', 'Agregar ingredientes dulces', 'Formar scones', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Torta básica de vainilla'), 'Preparación', ARRAY['Batir huevos con azúcar', 'Agregar harina y vainilla', 'Verter en molde', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Torta de calabaza'), 'Preparación', ARRAY['Procesar calabaza', 'Mezclar ingredientes', 'Verter en molde', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Torta de naranja'), 'Preparación', ARRAY['Rallar cáscara de naranja', 'Mezclar ingredientes', 'Verter en molde', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Untable de ricota'), 'Preparación', ARRAY['Procesar ricota', 'Agregar condimentos', 'Mezclar bien', 'Refrigerar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Untable de zanahoria'), 'Preparación', ARRAY['Rallar zanahoria', 'Procesar con otros ingredientes', 'Condimentar', 'Refrigerar'], 1);

-- Almuerzos
INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Arroz'), 'Preparación', ARRAY['Lavar el arroz', 'Cocinar en agua con sal', 'Dejar reposar', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Arroz amarillo'), 'Preparación', ARRAY['Sofreír cebolla', 'Agregar arroz y condimentos', 'Cocinar con caldo', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Arroz con vegetales salteados'), 'Preparación', ARRAY['Cocinar arroz', 'Saltear vegetales', 'Mezclar', 'Condimentar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Arroz plato principal'), 'Preparación', ARRAY['Preparar sofrito', 'Agregar arroz', 'Cocinar con caldo', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Ensalada de vegetales'), 'Preparación', ARRAY['Lavar vegetales', 'Cortar en trozos', 'Mezclar', 'Condimentar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Ensalada jardinera'), 'Preparación', ARRAY['Cocinar papas', 'Cortar vegetales', 'Mezclar ingredientes', 'Condimentar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Ensalada primavera'), 'Preparación', ARRAY['Preparar vegetales', 'Cocinar pasta', 'Mezclar ingredientes', 'Condimentar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Fideos'), 'Preparación', ARRAY['Cocinar fideos en agua con sal', 'Escurrir', 'Condimentar', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Fideos plato principal'), 'Preparación', ARRAY['Cocinar fideos', 'Preparar salsa', 'Mezclar', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), 'Preparación', ARRAY['Procesar pescado', 'Formar hamburguesas', 'Cocinar en sartén', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Hortalizas asadas'), 'Preparación', ARRAY['Cortar hortalizas', 'Condimentar', 'Asar en horno', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Lasaña'), 'Preparación', ARRAY['Preparar salsa', 'Cocinar pasta', 'Armar capas', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Pan de Carne / Hamburguesa'), 'Preparación', ARRAY['Mezclar ingredientes', 'Formar hamburguesas', 'Cocinar', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Papas al natural'), 'Preparación', ARRAY['Lavar papas', 'Cocinar en agua con sal', 'Escurrir', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Pasta con verdusalsa'), 'Preparación', ARRAY['Cocinar pasta', 'Preparar salsa verde', 'Mezclar', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Pasta sorpresa'), 'Preparación', ARRAY['Cocinar pasta', 'Preparar relleno', 'Armar sorpresa', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Pastel de carne y berenjenas'), 'Preparación', ARRAY['Preparar relleno', 'Cortar berenjenas', 'Armar pastel', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Pastel de carne y papa'), 'Preparación', ARRAY['Preparar relleno', 'Cocinar papas', 'Armar pastel', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Pollo colorido'), 'Preparación', ARRAY['Cortar pollo', 'Cocinar con vegetales', 'Condimentar', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Pollo con salsa blanca y verduras'), 'Preparación', ARRAY['Cocinar pollo', 'Preparar salsa blanca', 'Cocinar verduras', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Puré de papas'), 'Preparación', ARRAY['Cocinar papas', 'Machacar', 'Agregar leche y mantequilla', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Puré de papas instantáneo'), 'Preparación', ARRAY['Calentar agua', 'Mezclar con polvo', 'Batir', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Puré triple'), 'Preparación', ARRAY['Cocinar papas, zanahorias y zapallo', 'Machacar juntos', 'Condimentar', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Salsa blanca liviana'), 'Preparación', ARRAY['Derretir mantequilla', 'Agregar harina', 'Incorporar leche', 'Cocinar hasta espesar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Torta de atún'), 'Preparación', ARRAY['Preparar masa', 'Rellenar con atún', 'Formar torta', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Torta de carne y vegetales'), 'Preparación', ARRAY['Preparar relleno', 'Cortar vegetales', 'Armar torta', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Tortilla de papa, vegetales y pollo'), 'Preparación', ARRAY['Cocinar papas', 'Cortar vegetales y pollo', 'Batir huevos', 'Cocinar tortilla'], 1);

-- Postres
INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Arroz con leche'), 'Preparación', ARRAY['Cocinar arroz con leche', 'Agregar azúcar y canela', 'Cocinar hasta espesar', 'Enfriar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Budín de harina de maíz'), 'Preparación', ARRAY['Mezclar ingredientes', 'Verter en molde', 'Hornear', 'Enfriar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Budín de zapallo y coco'), 'Preparación', ARRAY['Procesar zapallo', 'Mezclar ingredientes', 'Verter en molde', 'Hornear'], 1),
((SELECT id FROM recetas WHERE titulo = 'Crema de naranja'), 'Preparación', ARRAY['Exprimir naranjas', 'Preparar crema', 'Mezclar', 'Enfriar'], 1),
((SELECT id FROM recetas WHERE titulo = 'Crema de vainilla'), 'Preparación', ARRAY['Calentar leche', 'Agregar almidón y vainilla', 'Cocinar hasta espesar', 'Enfriar'], 1);

-- Recetas Base
INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Filloas'), 'Preparación', ARRAY['Mezclar ingredientes', 'Dejar reposar', 'Cocinar en sartén', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Masa básica para tortas'), 'Preparación', ARRAY['Mezclar ingredientes secos', 'Agregar líquidos', 'Batir', 'Usar según receta'], 1),
((SELECT id FROM recetas WHERE titulo = 'Polenta/plato principal'), 'Preparación', ARRAY['Calentar agua con sal', 'Agregar harina de maíz', 'Cocinar revolviendo', 'Servir'], 1);

-- Copa de Leche
INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cebada instantánea'), 'Preparación', ARRAY['Disolver leche en polvo', 'Agregar cebada', 'Revolver', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cocoa'), 'Preparación', ARRAY['Disolver leche en polvo', 'Agregar cocoa', 'Revolver', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con vainilla'), 'Preparación', ARRAY['Disolver leche en polvo', 'Agregar vainilla', 'Revolver', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cebada instantánea'), 'Preparación', ARRAY['Calentar leche', 'Agregar cebada', 'Revolver', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cocoa'), 'Preparación', ARRAY['Calentar leche', 'Agregar cocoa', 'Revolver', 'Servir'], 1),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con vainilla'), 'Preparación', ARRAY['Calentar leche', 'Agregar vainilla', 'Revolver', 'Servir'], 1);

COMMIT;

-- Verificar que se agregaron los procedimientos
SELECT 
    r.titulo,
    COUNT(p.id) as procedimientos_agregados
FROM recetas r
LEFT JOIN procedimientos p ON r.id = p.receta_id
WHERE r.titulo IN (
    'Alfajores de maicena', 'Barra de cereales', 'Brownie de porotos negros', 'Budín de banana',
    'Arroz', 'Arroz amarillo', 'Arroz con vegetales salteados', 'Arroz plato principal',
    'Ensalada de vegetales', 'Ensalada jardinera', 'Ensalada primavera', 'Fideos', 'Fideos plato principal',
    'Hamburguesa de pescado', 'Hortalizas asadas', 'Lasaña', 'Pan de Carne / Hamburguesa',
    'Papas al natural', 'Pasta con verdusalsa', 'Pasta sorpresa', 'Pastel de carne y berenjenas',
    'Pastel de carne y papa', 'Pollo colorido', 'Pollo con salsa blanca y verduras',
    'Puré de papas', 'Puré de papas instantáneo', 'Puré triple', 'Salsa blanca liviana',
    'Torta de atún', 'Torta de carne y vegetales', 'Tortilla de papa, vegetales y pollo',
    'Arroz con leche', 'Budín de harina de maíz', 'Budín de zapallo y coco', 'Crema de naranja', 'Crema de vainilla',
    'Filloas', 'Masa básica para tortas', 'Polenta/plato principal',
    'Leche en polvo con cebada instantánea', 'Leche en polvo con cocoa', 'Leche en polvo con vainilla',
    'Leche fluida con cebada instantánea', 'Leche fluida con cocoa', 'Leche fluida con vainilla'
)
GROUP BY r.id, r.titulo
ORDER BY r.titulo;
