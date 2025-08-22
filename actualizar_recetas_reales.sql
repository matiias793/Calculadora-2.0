-- Script para actualizar recetas con ingredientes y procedimientos reales
-- Ejecutar en Supabase SQL Editor

BEGIN;

-- Primero eliminar todos los ingredientes y procedimientos básicos agregados anteriormente
DELETE FROM receta_ingredientes;
DELETE FROM procedimientos;

-- 1. ACTUALIZAR INGREDIENTES DE ALMUERZOS

-- Bocaditos de pollo
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Pollo suprema'), 80, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Avena'), 20, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 15, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.5, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Hierbas (orégano, albahaca, tomillo, perejil)'), 1, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Bocaditos de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 5, 'ml', 6);

-- Budín de pescado
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

-- Carbonada criolla
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

-- Carne a la portuguesa
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

-- Cazuela de lentejas
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

-- Chop suey de cerdo (ya tiene ingredientes, solo actualizar)
UPDATE receta_ingredientes SET 
    ingrediente_id = (SELECT id FROM ingredientes WHERE nombre = 'Carne de cerdo'),
    cantidad = 50,
    unidad = 'g'
WHERE receta_id = (SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo') AND orden = 1;

-- Chupín de pescado y verduras (ya tiene ingredientes, solo actualizar)
UPDATE receta_ingredientes SET 
    ingrediente_id = (SELECT id FROM ingredientes WHERE nombre = 'Pescado'),
    cantidad = 60,
    unidad = 'g'
WHERE receta_id = (SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras') AND orden = 1;

-- Croquetas de atún y papas (ya tiene ingredientes, solo actualizar)
UPDATE receta_ingredientes SET 
    ingrediente_id = (SELECT id FROM ingredientes WHERE nombre = 'Atún'),
    cantidad = 60,
    unidad = 'g'
WHERE receta_id = (SELECT id FROM recetas WHERE titulo = 'Croquetas de atún y papas') AND orden = 1;

-- Ensalada completa de pollo (ya tiene ingredientes, solo actualizar)
UPDATE receta_ingredientes SET 
    ingrediente_id = (SELECT id FROM ingredientes WHERE nombre = 'Pollo suprema'),
    cantidad = 50,
    unidad = 'g'
WHERE receta_id = (SELECT id FROM recetas WHERE titulo = 'Ensalada completa de pollo') AND orden = 1;

-- Ensalada completa de atún (ya tiene ingredientes, solo actualizar)
UPDATE receta_ingredientes SET 
    ingrediente_id = (SELECT id FROM ingredientes WHERE nombre = 'Atún'),
    cantidad = 60,
    unidad = 'g'
WHERE receta_id = (SELECT id FROM recetas WHERE titulo = 'Ensalada completa de atún') AND orden = 1;

-- 2. ACTUALIZAR PROCEDIMIENTOS DE ALMUERZOS

-- Bocaditos de pollo
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

-- Budín de pescado
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

-- Carbonada criolla
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

-- Carne a la portuguesa
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

-- Cazuela de lentejas
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

-- Chop suey de cerdo
INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), 'Con carne', ARRAY[
    'Pelar, lavar y picar o procesar la cebolla y la zanahoria.',
    'Lavar y picar o procesar el morrón.',
    'Lavar y cortar en cubos el zapallito y la berenjena.',
    'Lavar y cortar en juliana el repollo.',
    'Cortar en cubos la carne de cerdo.',
    'Rehogar la cebolla, morrón, zanahoria.',
    'Agregar la carne y luego la berenjena, el zapallito y por último el repollo.',
    'Condimentar.',
    'Continuar la cocción hasta que todas las verduras estén tiernas y la carne bien cocida evitando la sobre cocción para que las verduras no se reduzcan demasiado.',
    'Una vez finalizada la cocción apagar el fuego, agregar la mitad del aceite y mezclar bien.',
    'Elaborar el arroz o los fideos de acuerdo a las proporciones y al procedimiento especificado en Recetas Base.'
], 1);

-- Chupín de pescado y verduras
INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), 'Preparación', ARRAY[
    'Pelar, lavar la cebolla, el ajo, la zanahoria y la papa.',
    'Picar el ajo.',
    'Cortar en cubos la cebolla, en rodajas la zanahoria y la papa.',
    'Lavar y cortar en cubos el morrón.',
    'Cortar en cubos el pescado sin espinas.',
    'Rehogar la cebolla, el morrón y el ajo.',
    'Incorporar la zanahoria y el pescado.',
    'Condimentar.',
    'Agregar la pulpa de tomate y el agua.',
    'Agregar la pulpa y las arvejas.',
    'Una vez finalizada la cocción apagar el fuego, agregar la mitad del aceite y el perejil picado y mezclar bien.',
    'Elaborar el arroz de acuerdo a las proporciones y al procedimiento especificado en Acompañamientos.'
], 1);

-- Croquetas de atún y papas
INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Croquetas de atún y papas'), 'Con atún y puré', ARRAY[
    'Pelar, lavar y cocinar las papas. Hacer un puré y reservarlo.',
    'Pelar, lavar, picar o procesar la cebolla y el ajo.',
    'Lavar y picar el mix de verdes.',
    'Rehogar la cebolla y el ajo.',
    'Escurrir el atún.',
    'Batir ligeramente los huevos con el mix de verdes.',
    'Mezclar el puré de papas con la cebolla, el ajo, el atún y los huevos formando una pasta.',
    'Formar bolitas y rebozar con polenta.',
    'Llevar a la heladera unos 15 minutos.',
    'Precalentar el horno.',
    'Untar una asadera con aceite, disponer las bolitas y cocinarlas de ambos lados en horno moderado.'
], 1);

-- Ensalada completa de pollo
INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de pollo'), 'Preparación', ARRAY[
    'Dejar las lentejas en remojo 1-4 horas refrigeradas.',
    'Cocinarlas en agua (tres partes de agua por una de lentejas).',
    'Reservarlas.',
    'Cortar en cubos el pollo y hervirlo. Reservarlo.',
    'Cocinar el arroz según procedimiento anexo en recetas base.',
    'Reservarlo.',
    'Lavar y desinfectar la zanahoria y el tomate.',
    'Rallar o procesar la zanahoria.',
    'Cortar el tomate en cubitos.',
    'Mezclar el pollo con el arroz, las lentejas y las verduras incluido el choclo. Aderezar con aceite, mayonesa vegetal y mezclar bien.',
    'En caso de agregar huevos por sustitución: cocinarlos durante 13 minutos luego de que hierva el agua, pelarlos, rallarlos y reservarlos. Agregarlos al final.'
], 1);

-- Ensalada completa de atún
INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de atún'), 'Preparación', ARRAY[
    'Dejar las lentejas en remojo 1-4 horas refrigeradas.',
    'Cocinarlas en agua (tres partes de agua por una de lentejas).',
    'Reservarlas.',
    'Escurrir el atún.',
    'Cocinar el arroz según procedimiento anexo en recetas base.',
    'Reservarlo.',
    'Lavar y desinfectar la zanahoria y el tomate.',
    'Rallar o procesar la zanahoria.',
    'Cortar el tomate en cubitos.',
    'Mezclar el atún con el arroz, las lentejas y las verduras incluido el choclo. Aderezar con aceite, mayonesa vegetal y mezclar bien.',
    'En caso de agregar huevos por sustitución: cocinarlos durante 13 minutos luego de que hierva el agua, pelarlos, rallarlos y reservarlos. Agregarlos al final.'
], 1);

-- 3. ACTUALIZAR INGREDIENTES DE DESAYUNOS

-- Brownie de porotos negros
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), (SELECT id FROM ingredientes WHERE nombre = 'Porotos negros crudos'), 60, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 100, 'ml', 2),
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), (SELECT id FROM ingredientes WHERE nombre = 'Agua'), 150, 'ml', 3),
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 1, 'unidad', 4),
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), (SELECT id FROM ingredientes WHERE nombre = 'Vainilla'), 12, 'ml', 5),
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), (SELECT id FROM ingredientes WHERE nombre = 'Avena'), 70, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 100, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), (SELECT id FROM ingredientes WHERE nombre = 'Almidón de maíz'), 80, 'g', 8),
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), (SELECT id FROM ingredientes WHERE nombre = 'Polvo de hornear'), 7, 'g', 9),
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), (SELECT id FROM ingredientes WHERE nombre = 'Cocoa'), 150, 'g', 10),
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 1, 'g', 11);

-- 4. ACTUALIZAR INGREDIENTES DE COPA DE LECHE

-- Leche fluida con cocoa
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Leche fluida'), 200, 'ml', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 4, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Cocoa'), 5, 'g', 3);

-- Leche fluida con cebada instantánea
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Leche fluida'), 200, 'ml', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 8, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Cebada instantánea'), 0.8, 'g', 3);

-- Leche fluida con vainilla
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Leche fluida'), 200, 'ml', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 8, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Vainilla'), 5, 'ml', 3);

-- Leche en polvo con cocoa
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Leche en polvo'), 20, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Agua hervida y entibiada'), 180, 'ml', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 4, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Cocoa'), 5, 'g', 4);

-- Leche en polvo con cebada instantánea
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Leche en polvo'), 20, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Agua hervida y entibiada'), 180, 'ml', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 8, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Cebada instantánea'), 0.8, 'g', 4);

-- Leche en polvo con vainilla
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Leche en polvo'), 20, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Agua hervida y entibiada'), 180, 'ml', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 8, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Vainilla'), 2, 'ml', 4);

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
