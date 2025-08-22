-- SCRIPT COMPLETO PARA AGREGAR TODAS LAS RECETAS A LA BASE DE DATOS
-- PARTE 3: Procedimientos de Recetas Principales

-- Procedimiento para Bocaditos de pollo
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

-- Procedimiento para Budín de pescado
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

-- Procedimiento para Carbonada criolla
INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
SELECT id, 'Preparación de Carbonada criolla', ARRAY[
    'Cortar la carne en cubos pequeños.',
    'Pelar y cortar las verduras en trozos medianos.',
    'En una olla grande, calentar el aceite y dorar la carne.',
    'Agregar la cebolla y el ajo, rehogar hasta que estén transparentes.',
    'Incorporar las verduras y rehogar por 5 minutos.',
    'Agregar la pulpa de tomate y condimentar con sal.',
    'Cubrir con agua caliente y cocinar a fuego medio hasta que la carne esté tierna.',
    'Agregar los fideos y cocinar hasta que estén al dente.',
    'Espolvorear con perejil picado antes de servir.'
], 1
FROM recetas WHERE titulo = 'Carbonada criolla'
ON CONFLICT DO NOTHING;

-- Procedimiento para Carne a la portuguesa
INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
SELECT id, 'Preparación de Carne a la portuguesa', ARRAY[
    'Cortar la carne en tiras o cubos.',
    'Pelar y cortar las verduras en juliana.',
    'En una sartén grande, calentar el aceite y dorar la carne.',
    'Agregar la cebolla y el ajo, rehogar hasta que estén transparentes.',
    'Incorporar las verduras y rehogar por 5 minutos.',
    'Agregar la pulpa de tomate y condimentar con sal.',
    'Cocinar a fuego medio hasta que la carne esté tierna y las verduras cocidas.',
    'Agregar un poco de agua si es necesario.',
    'Espolvorear con perejil picado antes de servir.'
], 1
FROM recetas WHERE titulo = 'Carne a la portuguesa'
ON CONFLICT DO NOTHING;

-- Procedimiento para Cazuela de lentejas
INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
SELECT id, 'Preparación de Cazuela de lentejas', ARRAY[
    'Remojar las lentejas por 2 horas o usar lentejas precocidas.',
    'Cortar la carne en cubos pequeños.',
    'Pelar y cortar las verduras en trozos medianos.',
    'En una olla grande, calentar el aceite y dorar la carne.',
    'Agregar la cebolla y el ajo, rehogar hasta que estén transparentes.',
    'Incorporar las verduras y rehogar por 5 minutos.',
    'Agregar las lentejas, el arroz, la pulpa de tomate y condimentar con sal.',
    'Cubrir con agua caliente y agregar el laurel.',
    'Cocinar a fuego medio hasta que las lentejas y el arroz estén cocidos.',
    'Rectificar la sal antes de servir.'
], 1
FROM recetas WHERE titulo = 'Cazuela de lentejas'
ON CONFLICT DO NOTHING;

-- Procedimiento para Chop suey de cerdo
INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
SELECT id, 'Preparación de Chop suey de cerdo', ARRAY[
    'Cortar la carne de cerdo en tiras finas.',
    'Pelar y cortar las verduras en juliana.',
    'En un wok o sartén grande, calentar el aceite a fuego alto.',
    'Agregar la carne y saltear hasta que esté dorada.',
    'Incorporar las verduras y saltear por 3-5 minutos.',
    'Agregar el tomillo y condimentar con sal.',
    'Cocinar hasta que las verduras estén tiernas pero crujientes.',
    'Servir caliente.'
], 1
FROM recetas WHERE titulo = 'Chop suey de cerdo'
ON CONFLICT DO NOTHING;

-- Procedimiento para Chupín de pescado y verduras
INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
SELECT id, 'Preparación de Chupín de pescado y verduras', ARRAY[
    'Cortar el pescado en trozos medianos.',
    'Pelar y cortar las verduras en trozos.',
    'En una olla, calentar el aceite y rehogar la cebolla y el ajo.',
    'Agregar las verduras y rehogar por 5 minutos.',
    'Incorporar el pescado y la pulpa de tomate.',
    'Agregar agua y condimentar con sal.',
    'Cocinar a fuego medio hasta que el pescado esté cocido.',
    'Agregar las arvejas al final.',
    'Espolvorear con perejil picado antes de servir.'
], 1
FROM recetas WHERE titulo = 'Chupín de pescado y verduras'
ON CONFLICT DO NOTHING;

-- Procedimiento para Croquetas de atún y papas
INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
SELECT id, 'Preparación de Croquetas de atún y papas', ARRAY[
    'Cocinar las papas hasta que estén tiernas, pelar y hacer puré.',
    'Desmenuzar el atún y mezclar con el puré de papas.',
    'Picar finamente la cebolla y agregar a la mezcla.',
    'Agregar el queso rallado, el huevo y las hierbas.',
    'Condimentar con sal y mezclar bien.',
    'Formar croquetas con las manos.',
    'Rebozar en polenta.',
    'Colocar en una placa aceitada.',
    'Hornear hasta que estén doradas.'
], 1
FROM recetas WHERE titulo = 'Croquetas de atún y papas'
ON CONFLICT DO NOTHING;

-- Procedimiento para Ensalada completa de pollo
INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
SELECT id, 'Preparación de Ensalada completa de pollo', ARRAY[
    'Cocinar el arroz y las lentejas por separado.',
    'Cocinar la suprema de pollo y cortar en trozos.',
    'Pelar y rallar la zanahoria.',
    'Cortar el tomate en cubos.',
    'Mezclar todos los ingredientes en un bowl.',
    'Condimentar con sal y aceite.',
    'Agregar mayonesa al gusto.',
    'Refrigerar antes de servir.'
], 1
FROM recetas WHERE titulo = 'Ensalada completa de pollo'
ON CONFLICT DO NOTHING;

-- Procedimiento para Ensalada completa de atún
INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
SELECT id, 'Preparación de Ensalada completa de atún', ARRAY[
    'Cocinar el arroz y las lentejas por separado.',
    'Desmenuzar el atún.',
    'Pelar y rallar la zanahoria.',
    'Cortar el tomate en cubos.',
    'Mezclar todos los ingredientes en un bowl.',
    'Condimentar con sal y aceite.',
    'Agregar mayonesa vegetal al gusto.',
    'Refrigerar antes de servir.'
], 1
FROM recetas WHERE titulo = 'Ensalada completa de atún'
ON CONFLICT DO NOTHING;

-- Verificamos los procedimientos agregados
SELECT 'Procedimientos agregados' as tipo, COUNT(*) as cantidad FROM procedimientos;
