-- SCRIPT PARTE 1: Actualizar recetas de almuerzos principales
-- Ejecutar en Supabase SQL Editor

BEGIN;

-- Primero eliminar todos los ingredientes y procedimientos básicos agregados anteriormente
DELETE FROM receta_ingredientes;
DELETE FROM procedimientos;

-- 1. BOCADITOS DE POLLO
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Pollo suprema'), 80, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Avena'), 20, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 15, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.5, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Hierbas (orégano, albahaca, tomillo, perejil)'), 1, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 5, 'ml', 6);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), 'Preparación', ARRAY[
    'Cortar la suprema en cubos o bastones.',
    'Batir los huevos con las hierbas picadas y la sal.',
    'Macerar la suprema en esta mezcla durante 30 minutos, en heladera.',
    'Escurrir.',
    'Rebozar con avena hasta cubrir toda la superficie.',
    'Colocar sobre una placa aceitada.',
    'Hornear hasta que estén dorados y bien cocidos por dentro.'
], 1);

-- 2. BUDÍN DE PESCADO
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Pescado'), 50, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Zanahoria'), 30, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 10, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Ajo'), 1, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Pulpa de tomate'), 20, 'ml', 5),
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 23, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Pan rallado'), 5, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Queso rallado'), 5, 'g', 8),
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Almidón de maíz'), 2, 'g', 9),
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.5, 'g', 10),
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 5, 'ml', 11),
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Laurel'), 1, 'hoja', 12);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Budín de pescado'), 'Con pescado fresco', ARRAY[
    'Pelar, lavar y rallar o procesar la cebolla, el ajo y la zanahoria.',
    'Hervir el pescado fresco junto con el laurel, una vez cocido escurrir el agua y desmenuzar el pescado. Reservar.',
    'Rehogar la zanahoria, la cebolla y el ajo.',
    'Mezclar en un recipiente los huevos batidos, el queso, el almidón de maíz, pan rallado, el aceite y la sal.',
    'Agregar a esta mezcla el pescado y las verduras rehogadas y la pulpa de tomate.',
    'Disponer esta mezcla en una asadera aceitada.',
    'Cocinar en horno moderado aproximadamente 30 minutos.'
], 1);

-- 3. CARBONADA CRIOLLA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Carne en cubos'), 50, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Fideos'), 40, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Papa'), 30, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Zanahoria'), 40, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Zapallo'), 40, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Choclo'), 15, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Arvejas'), 15, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 10, 'g', 8),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Morrón'), 15, 'g', 9),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Pulpa de tomate'), 30, 'g', 10),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Ajo'), 1, 'g', 11),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 1, 'g', 12),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 10, 'g', 13),
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), (SELECT id FROM ingredientes WHERE nombre = 'Perejil'), 2, 'g', 14);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Carbonada criolla'), 'Preparación', ARRAY[
    'Pelar, lavar y picar o procesar la cebolla, el ajo y la zanahoria.',
    'Lavar y picar o procesar el morrón.',
    'Pelar, lavar y cortar en cubos la papa/boniato y el zapallo/calabaza.',
    'Rehogar la cebolla, el morrón y el ajo.',
    'Condimentar.',
    'Incorporar la carne.',
    'Agregar la zanahoria, la pulpa de tomate y el agua necesaria.',
    'Incorporar la papa/boniato.',
    'Agregar agua hasta cubrir todos los ingredientes.',
    'A los 10 minutos agregar el zapallo y los fideos.',
    'Agregar las arvejas y el choclo.',
    'Una vez finalizada la cocción apagar el fuego, agregar el aceite y el perejil picado y mezclar bien.'
], 1);

-- 4. CARNE A LA PORTUGUESA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), (SELECT id FROM ingredientes WHERE nombre = 'Carne entera'), 50, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 10, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), (SELECT id FROM ingredientes WHERE nombre = 'Morrón'), 15, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), (SELECT id FROM ingredientes WHERE nombre = 'Zanahoria'), 40, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), (SELECT id FROM ingredientes WHERE nombre = 'Arvejas'), 25, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), (SELECT id FROM ingredientes WHERE nombre = 'Pulpa de tomate'), 40, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), (SELECT id FROM ingredientes WHERE nombre = 'Ajo'), 1, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.5, 'g', 8),
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 5, 'ml', 9),
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), (SELECT id FROM ingredientes WHERE nombre = 'Perejil'), 1, 'g', 10),
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), (SELECT id FROM ingredientes WHERE nombre = 'Agua'), 10, 'ml', 11);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Carne a la portuguesa'), 'Preparación', ARRAY[
    'Pelar, lavar y picar o procesar la cebolla, el ajo.',
    'Pelar, lavar y cortar en rodajas la zanahoria.',
    'Lavar y picar o procesar el morrón.',
    'Cortar en cubos la carne.',
    'Rehogar la cebolla, el morrón y el ajo.',
    'Condimentar.',
    'Incorporar la carne.',
    'Agregar la zanahoria y la pulpa de tomate.',
    'Agregar agua hasta cubrir todos los ingredientes.',
    'Continuar la cocción hasta que los vegetales estén tiernos.',
    'Agregar las arvejas.',
    'Una vez finalizada la cocción apagar el fuego, agregar la mitad del aceite y el perejil picado y mezclar bien.'
], 1);

-- 5. CAZUELA DE LENTEJAS
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Carne picada'), 50, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Lentejas'), 20, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Arroz'), 30, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Pulpa de tomate'), 30, 'ml', 4),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Zapallo'), 60, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Boniato'), 15, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Papa'), 15, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Zanahoria'), 40, 'g', 8),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 10, 'g', 9),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Morrón'), 15, 'g', 10),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Ajo'), 1, 'g', 11),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Apio'), 1, 'g', 12),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Laurel'), 1, 'C/N', 13),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 1, 'g', 14),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 10, 'ml', 15),
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), (SELECT id FROM ingredientes WHERE nombre = 'Agua'), 250, 'ml', 16);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Cazuela de lentejas'), 'Preparación', ARRAY[
    'Dejar las lentejas entre 1 y 4 horas en remojo refrigeradas. En caso de porotos/garbanzos llevan de 12 a 24 horas de remojo.',
    'Pelar, lavar, picar o procesar la cebolla, el ajo.',
    'Lavar y picar o procesar el apio y el morrón.',
    'Pelar, lavar y cortar en cubos la papa, boniato, zanahoria y el zapallo.',
    'Rehogar la cebolla, el apio, el morrón y el ajo.',
    'Incorporar la zanahoria, las lentejas, la carne, la pulpa de tomate y el agua.',
    'Condimentar.',
    'Agregar agua hasta cubrir todos los ingredientes.',
    'Continuar la cocción durante 20 minutos a fuego suave.',
    'Agregar el arroz, el zapallo y el agua.',
    'Continuar cocinando.',
    'Una vez finalizada la cocción apagar el fuego, agregar el aceite y mezclar bien.'
], 1);

COMMIT;

-- Verificar el resultado de esta parte
SELECT 
    'Recetas actualizadas en Parte 1' as tipo,
    COUNT(DISTINCT r.id) as cantidad
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
WHERE r.titulo IN ('Bocaditos de pollo', 'Budín de pescado', 'Carbonada criolla', 'Carne a la portuguesa', 'Cazuela de lentejas')
UNION ALL
SELECT 
    'Procedimientos actualizados en Parte 1' as tipo,
    COUNT(DISTINCT r.id) as cantidad
FROM recetas r
JOIN procedimientos p ON r.id = p.receta_id
WHERE r.titulo IN ('Bocaditos de pollo', 'Budín de pescado', 'Carbonada criolla', 'Carne a la portuguesa', 'Cazuela de lentejas');
