-- SCRIPT PARTE 4: Actualizar recetas de copa de leche
-- Ejecutar en Supabase SQL Editor DESPUÉS de la Parte 3

BEGIN;

-- 18. LECHE FLUIDA CON COCOA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Leche fluida'), 200, 'ml', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 4, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Cocoa'), 5, 'g', 3);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cocoa'), 'Preparación', ARRAY[
    'Calentar la leche sin que hierva.',
    'Disolver el azúcar en la leche caliente.',
    'Agregar la cocoa y mezclar bien hasta que se disuelva completamente.',
    'Servir caliente o frío según preferencia.'
], 1);

-- 19. LECHE FLUIDA CON CEBADA INSTANTÁNEA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Leche fluida'), 200, 'ml', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 8, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Cebada instantánea'), 0.8, 'g', 3);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con cebada instantánea'), 'Preparación', ARRAY[
    'Calentar la leche sin que hierva.',
    'Disolver el azúcar en la leche caliente.',
    'Agregar la cebada instantánea y mezclar bien.',
    'Dejar reposar 2-3 minutos para que la cebada se hidrate.',
    'Servir caliente.'
], 1);

-- 20. LECHE FLUIDA CON VAINILLA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Leche fluida'), 200, 'ml', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 8, 'g', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Vainilla'), 5, 'ml', 3);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche fluida con vainilla'), 'Preparación', ARRAY[
    'Calentar la leche sin que hierva.',
    'Disolver el azúcar en la leche caliente.',
    'Agregar la vainilla y mezclar bien.',
    'Servir caliente o frío según preferencia.'
], 1);

-- 21. LECHE EN POLVO CON COCOA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Leche en polvo'), 20, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Agua hervida y entibiada'), 180, 'ml', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 4, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cocoa'), (SELECT id FROM ingredientes WHERE nombre = 'Cocoa'), 5, 'g', 4);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cocoa'), 'Preparación', ARRAY[
    'Hervir agua y dejar entibiar.',
    'Disolver la leche en polvo en el agua tibia.',
    'Agregar el azúcar y mezclar hasta disolver.',
    'Incorporar la cocoa y mezclar bien hasta que se disuelva completamente.',
    'Servir caliente o frío según preferencia.'
], 1);

-- 22. LECHE EN POLVO CON CEBADA INSTANTÁNEA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Leche en polvo'), 20, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Agua hervida y entibiada'), 180, 'ml', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 8, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cebada instantánea'), (SELECT id FROM ingredientes WHERE nombre = 'Cebada instantánea'), 0.8, 'g', 4);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con cebada instantánea'), 'Preparación', ARRAY[
    'Hervir agua y dejar entibiar.',
    'Disolver la leche en polvo en el agua tibia.',
    'Agregar el azúcar y mezclar hasta disolver.',
    'Incorporar la cebada instantánea y mezclar bien.',
    'Dejar reposar 2-3 minutos para que la cebada se hidrate.',
    'Servir caliente.'
], 1);

-- 23. LECHE EN POLVO CON VAINILLA
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Leche en polvo'), 20, 'g', 1),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Agua hervida y entibiada'), 180, 'ml', 2),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Azúcar'), 8, 'g', 3),
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con vainilla'), (SELECT id FROM ingredientes WHERE nombre = 'Vainilla'), 2, 'ml', 4);

INSERT INTO procedimientos (receta_id, titulo, pasos, orden) VALUES
((SELECT id FROM recetas WHERE titulo = 'Leche en polvo con vainilla'), 'Preparación', ARRAY[
    'Hervir agua y dejar entibiar.',
    'Disolver la leche en polvo en el agua tibia.',
    'Agregar el azúcar y mezclar hasta disolver.',
    'Incorporar la vainilla y mezclar bien.',
    'Servir caliente o frío según preferencia.'
], 1);

COMMIT;

-- Verificar el resultado de esta parte
SELECT 
    'Recetas de copa de leche actualizadas en Parte 4' as tipo,
    COUNT(DISTINCT r.id) as cantidad
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
WHERE r.titulo IN ('Leche fluida con cocoa', 'Leche fluida con cebada instantánea', 'Leche fluida con vainilla', 'Leche en polvo con cocoa', 'Leche en polvo con cebada instantánea', 'Leche en polvo con vainilla')
UNION ALL
SELECT 
    'Procedimientos de copa de leche actualizados en Parte 4' as tipo,
    COUNT(DISTINCT r.id) as cantidad
FROM recetas r
JOIN procedimientos p ON r.id = p.receta_id
WHERE r.titulo IN ('Leche fluida con cocoa', 'Leche fluida con cebada instantánea', 'Leche fluida con vainilla', 'Leche en polvo con cocoa', 'Leche en polvo con cebada instantánea', 'Leche en polvo con vainilla');
