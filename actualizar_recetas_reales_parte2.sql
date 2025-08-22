-- SCRIPT PARTE 2: Actualizar más recetas de almuerzos
-- Ejecutar en Supabase SQL Editor DESPUÉS de la Parte 1

BEGIN;

-- 6. CHOP SUEY DE CERDO
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), (SELECT id FROM ingredientes WHERE nombre = 'Carne de cerdo'), 50, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 10, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), (SELECT id FROM ingredientes WHERE nombre = 'Morrón'), 15, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), (SELECT id FROM ingredientes WHERE nombre = 'Zanahoria'), 40, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), (SELECT id FROM ingredientes WHERE nombre = 'Zapallito'), 20, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), (SELECT id FROM ingredientes WHERE nombre = 'Berenjena'), 25, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), (SELECT id FROM ingredientes WHERE nombre = 'Repollo'), 15, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), (SELECT id FROM ingredientes WHERE nombre = 'Ajo'), 2, 'g', 8),
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), (SELECT id FROM ingredientes WHERE nombre = 'Tomillo'), 0.5, 'g', 9),
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.5, 'g', 10),
((SELECT id FROM recetas WHERE titulo = 'Chop suey de cerdo'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 5, 'ml', 11);

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

-- 7. CHUPÍN DE PESCADO Y VERDURAS
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Pescado'), 60, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Papa'), 26, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 10, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Zanahoria'), 50, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Morrón'), 15, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Pulpa de tomate'), 20, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Arvejas'), 30, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Ajo'), 1, 'g', 8),
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.5, 'g', 9),
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 5, 'ml', 10),
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Perejil'), 1.5, 'g', 11),
((SELECT id FROM recetas WHERE titulo = 'Chupín de pescado y verduras'), (SELECT id FROM ingredientes WHERE nombre = 'Agua'), 25, 'ml', 12);

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

-- 8. CROQUETAS DE ATÚN Y PAPAS
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Croquetas de atún y papas'), (SELECT id FROM ingredientes WHERE nombre = 'Papa'), 160, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Croquetas de atún y papas'), (SELECT id FROM ingredientes WHERE nombre = 'Atún'), 60, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Croquetas de atún y papas'), (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 20, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Croquetas de atún y papas'), (SELECT id FROM ingredientes WHERE nombre = 'Queso rallado'), 5, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Croquetas de atún y papas'), (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 22, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Croquetas de atún y papas'), (SELECT id FROM ingredientes WHERE nombre = 'Mix de verdes (perejil, ciboulette)'), 1, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Croquetas de atún y papas'), (SELECT id FROM ingredientes WHERE nombre = 'Ajo'), 1, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Croquetas de atún y papas'), (SELECT id FROM ingredientes WHERE nombre = 'Polenta'), 20, 'g', 8),
((SELECT id FROM recetas WHERE titulo = 'Croquetas de atún y papas'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 7.5, 'g', 9);

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

-- 9. ENSALADA COMPLETA DE POLLO
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Arroz'), 40, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Lentejas'), 20, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Pollo suprema'), 50, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Zanahoria'), 40, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Tomate'), 40, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Choclo'), 20, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.75, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 5, 'ml', 8),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de pollo'), (SELECT id FROM ingredientes WHERE nombre = 'Mayonesa'), 15, 'g', 9);

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

-- 10. ENSALADA COMPLETA DE ATÚN
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de atún'), (SELECT id FROM ingredientes WHERE nombre = 'Arroz'), 40, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de atún'), (SELECT id FROM ingredientes WHERE nombre = 'Lentejas'), 20, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de atún'), (SELECT id FROM ingredientes WHERE nombre = 'Atún'), 60, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de atún'), (SELECT id FROM ingredientes WHERE nombre = 'Zanahoria'), 40, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de atún'), (SELECT id FROM ingredientes WHERE nombre = 'Tomate'), 40, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de atún'), (SELECT id FROM ingredientes WHERE nombre = 'Choclo'), 20, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de atún'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.75, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de atún'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 5, 'ml', 8),
((SELECT id FROM recetas WHERE titulo = 'Ensalada completa de atún'), (SELECT id FROM ingredientes WHERE nombre = 'Mayonesa vegetal'), 15, 'g', 9);

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

-- 11. HAMBURGUESA DE PESCADO
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Pescado'), 60, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Avena'), 10, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Zanahoria'), 25, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Morrón'), 15, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 15, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 15, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Perejil'), 1.5, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Ajo'), 1, 'g', 8),
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.4, 'g', 9),
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 2.25, 'ml', 10);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Hamburguesa de pescado'), 'Con pescado fresco', ARRAY[
    'Pelar, lavar y picar o procesar la cebolla, el ajo y la zanahoria.',
    'Lavar y picar o procesar el morrón.',
    'Hervir el pescado fresco (puede agregarse al agua de cocción hojas de laurel).',
    'Escurrir el agua y desmenuzar.',
    'Batir el huevo.',
    'Mezclar el pescado desmenuzado con los vegetales, la avena, condimentos y la sal.',
    'Por último agregar el huevo batido y unir hasta que quede una mezcla homogénea.',
    'Formar hamburguesas y colocar en asadera aceitada (que puede espolvorearse con pan rallado).',
    'Cocinar en horno moderado aproximadamente 30 minutos.',
    'Deben quedar doradas por fuera.'
], 1);

COMMIT;

-- Verificar el resultado de esta parte
SELECT 
    'Recetas actualizadas en Parte 2' as tipo,
    COUNT(DISTINCT r.id) as cantidad
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
WHERE r.titulo IN ('Chop suey de cerdo', 'Chupín de pescado y verduras', 'Croquetas de atún y papas', 'Ensalada completa de pollo', 'Ensalada completa de atún', 'Hamburguesa de pescado')
UNION ALL
SELECT 
    'Procedimientos actualizados en Parte 2' as tipo,
    COUNT(DISTINCT r.id) as cantidad
FROM recetas r
JOIN procedimientos p ON r.id = p.receta_id
WHERE r.titulo IN ('Chop suey de cerdo', 'Chupín de pescado y verduras', 'Croquetas de atún y papas', 'Ensalada completa de pollo', 'Ensalada completa de atún', 'Hamburguesa de pescado');
