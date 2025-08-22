-- Script para agregar ingredientes faltantes a recetas específicas
-- Ejecutar en Supabase SQL Editor

BEGIN;

-- 1. Chop suey de cerdo
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
(6, (SELECT id FROM ingredientes WHERE nombre = 'Carne de cerdo magra'), 50, 'g', 1),
(6, (SELECT id FROM ingredientes WHERE nombre = 'Arroz'), 30, 'g', 2),
(6, (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 15, 'g', 3),
(6, (SELECT id FROM ingredientes WHERE nombre = 'Morrón'), 10, 'g', 4),
(6, (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 5, 'ml', 5),
(6, (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.5, 'g', 6);

-- 2. Chupín de pescado y verduras
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
(21, (SELECT id FROM ingredientes WHERE nombre = 'Pescado'), 60, 'g', 1),
(21, (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 20, 'g', 2),
(21, (SELECT id FROM ingredientes WHERE nombre = 'Tomate'), 25, 'g', 3),
(21, (SELECT id FROM ingredientes WHERE nombre = 'Zanahoria'), 15, 'g', 4),
(21, (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 5, 'ml', 5),
(21, (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.5, 'g', 6);

-- 3. Croquetas de atún y papas
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
(22, (SELECT id FROM ingredientes WHERE nombre = 'Atún'), 40, 'g', 1),
(22, (SELECT id FROM ingredientes WHERE nombre = 'Papa'), 50, 'g', 2),
(22, (SELECT id FROM ingredientes WHERE nombre = 'Huevo'), 0.5, 'unidad', 3),
(22, (SELECT id FROM ingredientes WHERE nombre = 'Pan rallado'), 15, 'g', 4),
(22, (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 8, 'ml', 5),
(22, (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.3, 'g', 6);

-- 4. Ensalada completa de atún
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
(24, (SELECT id FROM ingredientes WHERE nombre = 'Atún'), 35, 'g', 1),
(24, (SELECT id FROM ingredientes WHERE nombre = 'Lechuga'), 20, 'g', 2),
(24, (SELECT id FROM ingredientes WHERE nombre = 'Tomate'), 20, 'g', 3),
(24, (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 10, 'g', 4),
(24, (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 3, 'ml', 5),
(24, (SELECT id FROM ingredientes WHERE nombre = 'Vinagre'), 2, 'ml', 6),
(24, (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.3, 'g', 7);

-- 5. Ensalada completa de pollo
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
(23, (SELECT id FROM ingredientes WHERE nombre = 'Pollo suprema'), 40, 'g', 1),
(23, (SELECT id FROM ingredientes WHERE nombre = 'Lechuga'), 20, 'g', 2),
(23, (SELECT id FROM ingredientes WHERE nombre = 'Tomate'), 20, 'g', 3),
(23, (SELECT id FROM ingredientes WHERE nombre = 'Cebolla'), 10, 'g', 4),
(23, (SELECT id FROM ingredientes WHERE nombre = 'Aceite'), 3, 'ml', 5),
(23, (SELECT id FROM ingredientes WHERE nombre = 'Vinagre'), 2, 'ml', 6),
(23, (SELECT id FROM ingredientes WHERE nombre = 'Sal'), 0.3, 'g', 7);

COMMIT;

-- Verificar que se agregaron los ingredientes
SELECT 
    r.titulo,
    COUNT(ri.id) as ingredientes_agregados
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
WHERE r.id IN (6, 21, 22, 23, 24)
GROUP BY r.id, r.titulo
ORDER BY r.titulo;
