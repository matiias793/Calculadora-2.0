-- SCRIPT PARTE 3: Actualizar recetas de desayunos
-- Ejecutar en Supabase SQL Editor DESPUÉS de la Parte 2

BEGIN;

-- 12. BROWNIE DE POROTOS NEGROS
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

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Brownie de porotos negros'), 'Preparación', ARRAY[
    'Remojar los porotos negros durante la noche.',
    'Cocinar los porotos hasta que estén tiernos.',
    'Procesar los porotos cocidos con agua hasta formar un puré.',
    'Mezclar todos los ingredientes secos en un bowl.',
    'Agregar el puré de porotos, aceite, agua, huevo y vainilla.',
    'Mezclar hasta obtener una masa homogénea.',
    'Verter en molde aceitado y enharinado.',
    'Hornear a 180°C durante 25-30 minutos.'
], 1);

-- 13. BUDÍN DE BANANA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Budín de banana'), (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 1, 'unidad', 1),
((SELECT id FROM recetas WHERE titulo = 'Budín de banana'), (SELECT id FROM ingredientes WHERE nombre = 'Harina'), 140, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Budín de banana'), (SELECT id FROM ingredientes WHERE nombre = 'Banana'), 125, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Budín de banana'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 90, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Budín de banana'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 70, 'ml', 5),
((SELECT id FROM recetas WHERE titulo = 'Budín de banana'), (SELECT id FROM ingredientes WHERE nombre = 'Polvo de hornear'), 10, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Budín de banana'), (SELECT id FROM ingredientes WHERE nombre = 'Vainilla'), 7.5, 'ml', 7);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Budín de banana'), 'Preparación', ARRAY[
    'Precalentar el horno a 180°C.',
    'Machacar las bananas hasta formar un puré.',
    'Batir los huevos con el azúcar hasta que estén espumosos.',
    'Agregar el aceite y la vainilla, mezclar.',
    'Incorporar el puré de banana.',
    'Agregar la harina y el polvo de hornear tamizados.',
    'Mezclar suavemente hasta integrar.',
    'Verter en molde aceitado y enharinado.',
    'Hornear durante 40-45 minutos.'
], 1);

-- 14. FAINÁ DE ZANAHORIA Y QUESO
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Fainá de zanahoria y queso'), (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 2, 'unidad', 1),
((SELECT id FROM recetas WHERE titulo = 'Fainá de zanahoria y queso'), (SELECT id FROM ingredientes WHERE nombre = 'Harina'), 160, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Fainá de zanahoria y queso'), (SELECT id FROM ingredientes WHERE nombre = 'Polvo de hornear'), 10, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Fainá de zanahoria y queso'), (SELECT id FROM ingredientes WHERE nombre = 'Leche'), 120, 'ml', 4),
((SELECT id FROM recetas WHERE titulo = 'Fainá de zanahoria y queso'), (SELECT id FROM ingredientes WHERE nombre = 'Agua'), 50, 'ml', 5),
((SELECT id FROM recetas WHERE titulo = 'Fainá de zanahoria y queso'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 60, 'ml', 6),
((SELECT id FROM recetas WHERE titulo = 'Fainá de zanahoria y queso'), (SELECT id FROM ingredientes WHERE nombre = 'Zanahoria'), 125, 'g', 7),
((SELECT id FROM recetas WHERE titulo = 'Fainá de zanahoria y queso'), (SELECT id FROM ingredientes WHERE nombre = 'Queso rallado'), 50, 'g', 8),
((SELECT id FROM recetas WHERE titulo = 'Fainá de zanahoria y queso'), (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 3, 'g', 9);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Fainá de zanahoria y queso'), 'Preparación', ARRAY[
    'Precalentar el horno a 200°C.',
    'Rallar la zanahoria finamente.',
    'Batir los huevos con sal.',
    'Agregar la leche, agua y aceite, mezclar.',
    'Incorporar la harina y polvo de hornear tamizados.',
    'Agregar la zanahoria rallada y el queso.',
    'Mezclar hasta integrar todos los ingredientes.',
    'Verter en molde aceitado.',
    'Hornear durante 25-30 minutos hasta que esté dorado.'
], 1);

-- 15. PASTA FROLA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Pasta frola'), (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 1.5, 'unidad', 1),
((SELECT id FROM recetas WHERE titulo = 'Pasta frola'), (SELECT id FROM ingredientes WHERE nombre = 'Harina'), 200, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Pasta frola'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 65, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Pasta frola'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 55, 'ml', 4),
((SELECT id FROM recetas WHERE titulo = 'Pasta frola'), (SELECT id FROM ingredientes WHERE nombre = 'Polvo de hornear'), 7.5, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Pasta frola'), (SELECT id FROM ingredientes WHERE nombre = 'Ralladura de limón o naranja'), 1, 'c/n', 6),
((SELECT id FROM recetas WHERE titulo = 'Pasta frola'), (SELECT id FROM ingredientes WHERE nombre = 'Dulce de membrillo'), 200, 'g', 7);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Pasta frola'), 'Preparación', ARRAY[
    'Precalentar el horno a 180°C.',
    'Batir el huevo con el azúcar hasta que esté espumoso.',
    'Agregar el aceite y la ralladura, mezclar.',
    'Incorporar la harina y polvo de hornear tamizados.',
    'Formar una masa suave y homogénea.',
    'Dividir la masa en dos partes.',
    'Estirar una parte en el fondo del molde.',
    'Cubrir con el dulce de membrillo cortado en rodajas.',
    'Estirar la otra parte y cortar en tiras.',
    'Colocar las tiras en forma de rejilla sobre el dulce.',
    'Hornear durante 25-30 minutos.'
], 1);

-- 16. TORTA BÁSICA DE VAINILLA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Torta básica de vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 2, 'unidad', 1),
((SELECT id FROM recetas WHERE titulo = 'Torta básica de vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 125, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Torta básica de vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 60, 'ml', 3),
((SELECT id FROM recetas WHERE titulo = 'Torta básica de vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Harina'), 220, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Torta básica de vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Polvo de hornear'), 5, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Torta básica de vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Leche'), 160, 'ml', 6),
((SELECT id FROM recetas WHERE titulo = 'Torta básica de vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Vainilla'), 3, 'ml', 7);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Torta básica de vainilla'), 'Preparación', ARRAY[
    'Precalentar el horno a 180°C.',
    'Batir los huevos con el azúcar hasta que estén espumosos.',
    'Agregar el aceite y la vainilla, mezclar.',
    'Alternar la harina y polvo de hornear tamizados con la leche.',
    'Mezclar suavemente hasta integrar.',
    'Verter en molde aceitado y enharinado.',
    'Hornear durante 35-40 minutos.'
], 1);

-- 17. TORTA DE CALABAZA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Torta de calabaza'), (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 1, 'unidad', 1),
((SELECT id FROM recetas WHERE titulo = 'Torta de calabaza'), (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 100, 'ml', 2),
((SELECT id FROM recetas WHERE titulo = 'Torta de calabaza'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 110, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Torta de calabaza'), (SELECT id FROM ingredientes WHERE nombre = 'Calabaza'), 200, 'g', 4),
((SELECT id FROM recetas WHERE titulo = 'Torta de calabaza'), (SELECT id FROM ingredientes WHERE nombre = 'Harina'), 180, 'g', 5),
((SELECT id FROM recetas WHERE titulo = 'Torta de calabaza'), (SELECT id FROM ingredientes WHERE nombre = 'Polvo de hornear'), 10, 'g', 6),
((SELECT id FROM recetas WHERE titulo = 'Torta de calabaza'), (SELECT id FROM ingredientes WHERE nombre = 'Canela'), 5, 'g', 7);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Torta de calabaza'), 'Preparación', ARRAY[
    'Precalentar el horno a 180°C.',
    'Cocinar la calabaza hasta que esté tierna y hacer puré.',
    'Batir el huevo con el azúcar hasta que esté espumoso.',
    'Agregar el aceite y el puré de calabaza, mezclar.',
    'Incorporar la harina, polvo de hornear y canela tamizados.',
    'Mezclar hasta integrar todos los ingredientes.',
    'Verter en molde aceitado y enharinado.',
    'Hornear durante 40-45 minutos.'
], 1);

COMMIT;

-- Verificar el resultado de esta parte
SELECT 
    'Recetas de desayunos actualizadas en Parte 3' as tipo,
    COUNT(DISTINCT r.id) as cantidad
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
WHERE r.titulo IN ('Brownie de porotos negros', 'Budín de banana', 'Fainá de zanahoria y queso', 'Pasta frola', 'Torta básica de vainilla', 'Torta de calabaza')
UNION ALL
SELECT 
    'Procedimientos de desayunos actualizados en Parte 3' as tipo,
    COUNT(DISTINCT r.id) as cantidad
FROM recetas r
JOIN procedimientos p ON r.id = p.receta_id
WHERE r.titulo IN ('Brownie de porotos negros', 'Budín de banana', 'Fainá de zanahoria y queso', 'Pasta frola', 'Torta básica de vainilla', 'Torta de calabaza');
