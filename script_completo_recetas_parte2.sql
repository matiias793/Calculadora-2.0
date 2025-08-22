-- SCRIPT COMPLETO PARA AGREGAR TODAS LAS RECETAS A LA BASE DE DATOS
-- PARTE 2: Ingredientes de Recetas Principales

-- Bocaditos de pollo
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 80, 'g', 1 FROM recetas r, ingredientes i WHERE r.titulo = 'Bocaditos de pollo' AND i.nombre = 'Suprema'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 20, 'g', 2 FROM recetas r, ingredientes i WHERE r.titulo = 'Bocaditos de pollo' AND i.nombre = 'Avena'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 15, 'g', 3 FROM recetas r, ingredientes i WHERE r.titulo = 'Bocaditos de pollo' AND i.nombre = 'Huevo'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 0.5, 'g', 4 FROM recetas r, ingredientes i WHERE r.titulo = 'Bocaditos de pollo' AND i.nombre = 'Sal'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 1, 'g', 5 FROM recetas r, ingredientes i WHERE r.titulo = 'Bocaditos de pollo' AND i.nombre = 'Hierbas (orégano, albahaca, tomillo, perejil)'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 5, 'ml', 6 FROM recetas r, ingredientes i WHERE r.titulo = 'Bocaditos de pollo' AND i.nombre = 'Aceite (asadera)'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;

-- Budín de pescado
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 50, 'g', 1 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Pescado'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 30, 'g', 2 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Zanahoria'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 10, 'g', 3 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Cebolla'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 1, 'g', 4 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Ajo'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 20, 'ml', 5 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Pulpa de tomate'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 23, 'g', 6 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Huevo'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 5, 'g', 7 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Pan rallado'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 5, 'g', 8 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Queso rallado'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 2, 'g', 9 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Almidón de maíz'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 0.5, 'g', 10 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Sal'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 5, 'ml', 11 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Aceite'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 0, 'hoja', 12 FROM recetas r, ingredientes i WHERE r.titulo = 'Budín de pescado' AND i.nombre = 'Laurel'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;

-- Carbonada criolla
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 50, 'g', 1 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Carne en cubos'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 40, 'g', 2 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Fideos'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 30, 'g', 3 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Papa'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 40, 'g', 4 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Zanahoria'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 40, 'g', 5 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Zapallo'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 15, 'g', 6 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Choclo'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 15, 'g', 7 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Arvejas'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 10, 'g', 8 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Cebolla'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 15, 'g', 9 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Morrón'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 30, 'g', 10 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Pulpa de tomate'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 1, 'g', 11 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Ajo'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 1, 'g', 12 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Sal'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 10, 'g', 13 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Aceite'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 2, 'g', 14 FROM recetas r, ingredientes i WHERE r.titulo = 'Carbonada criolla' AND i.nombre = 'Perejil'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;

-- Carne a la portuguesa
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 50, 'g', 1 FROM recetas r, ingredientes i WHERE r.titulo = 'Carne a la portuguesa' AND i.nombre = 'Carne entera'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 10, 'g', 2 FROM recetas r, ingredientes i WHERE r.titulo = 'Carne a la portuguesa' AND i.nombre = 'Cebolla'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 15, 'g', 3 FROM recetas r, ingredientes i WHERE r.titulo = 'Carne a la portuguesa' AND i.nombre = 'Morrón'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 40, 'g', 4 FROM recetas r, ingredientes i WHERE r.titulo = 'Carne a la portuguesa' AND i.nombre = 'Zanahoria'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 25, 'g', 5 FROM recetas r, ingredientes i WHERE r.titulo = 'Carne a la portuguesa' AND i.nombre = 'Arvejas'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 40, 'g', 6 FROM recetas r, ingredientes i WHERE r.titulo = 'Carne a la portuguesa' AND i.nombre = 'Pulpa de tomate'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 1, 'g', 7 FROM recetas r, ingredientes i WHERE r.titulo = 'Carne a la portuguesa' AND i.nombre = 'Ajo'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 0.5, 'g', 8 FROM recetas r, ingredientes i WHERE r.titulo = 'Carne a la portuguesa' AND i.nombre = 'Sal'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 5, 'ml', 9 FROM recetas r, ingredientes i WHERE r.titulo = 'Carne a la portuguesa' AND i.nombre = 'Aceite'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 1, 'g', 10 FROM recetas r, ingredientes i WHERE r.titulo = 'Carne a la portuguesa' AND i.nombre = 'Perejil'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 10, 'ml', 11 FROM recetas r, ingredientes i WHERE r.titulo = 'Carne a la portuguesa' AND i.nombre = 'Agua'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;

-- Cazuela de lentejas
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 50, 'g', 1 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Carne picada'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 20, 'g', 2 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Lentejas'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 30, 'g', 3 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Arroz'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 30, 'ml', 4 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Pulpa de tomate'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 60, 'g', 5 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Zapallo'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 15, 'g', 6 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Boniato'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 15, 'g', 7 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Papa'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 40, 'g', 8 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Zanahoria'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 10, 'g', 9 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Cebolla'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 15, 'g', 10 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Morrón'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 1, 'g', 11 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Ajo'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 1, 'g', 12 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Apio'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 0, 'hoja', 13 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Laurel'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 1, 'g', 14 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Sal'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 10, 'ml', 15 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Aceite'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
SELECT r.id, i.id, 250, 'ml', 16 FROM recetas r, ingredientes i WHERE r.titulo = 'Cazuela de lentejas' AND i.nombre = 'Agua'
ON CONFLICT (receta_id, ingrediente_id) DO NOTHING;

-- Verificamos lo agregado hasta ahora
SELECT 'Relaciones receta-ingrediente agregadas' as tipo, COUNT(*) as cantidad FROM receta_ingredientes;
