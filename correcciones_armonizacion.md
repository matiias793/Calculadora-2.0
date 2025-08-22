# CORRECCIONES Y ARMONIZACIÓN DE LA APLICACIÓN

## 1. INCONSISTENCIAS EN IDs ENTRE RECETAS Y OPCIONES DE ALMUERZOS

### Problemas encontrados:
- **Pasta sorpresa**: Receta ID 114, pero opción apunta a ID 114 (correcto)
- **Pasta con verdusalsa**: Receta ID 115, opción apunta a ID 115 (correcto)
- **Pastel de carne y papa**: Receta ID 116, opción apunta a ID 116 (correcto)
- **Pollo colorido**: Receta ID 117, opción apunta a ID 117 (correcto)
- **Pastel de carne y berenjenas**: Receta ID 118, opción apunta a ID 118 (correcto)
- **Pollo con salsa blanca**: Receta ID 119, opción apunta a ID 119 (correcto)
- **Torta de carne**: Receta ID 120, opción apunta a ID 120 (correcto)

### Errores tipográficos encontrados:
- En opciones: "PasteL de carne y berenjenas" (L mayúscula)
- En recetas: "Pastel de carne y berenjenas" (l minúscula)

## 2. PROBLEMAS DE SEGURIDAD IDENTIFICADOS

### Variables de entorno:
- Falta validación de variables de entorno
- Posibles fugas de información sensible

### Autenticación:
- Falta validación robusta en componentes AdminProtected
- Posibles vulnerabilidades XSS en inputs

### Base de datos:
- Falta sanitización de inputs
- Posibles inyecciones SQL

## 3. CÁLCULOS DE PORCIONES

### Verificaciones necesarias:
- Cálculos de 0.67 y 1.33 para porciones
- Validación de números de personas
- Prevención de división por cero

## 4. PLANIFICACIÓN SEMANAL

### Verificaciones necesarias:
- Consistencia entre recetas y menú semanal
- Validación de fechas
- Cálculos de porciones semanales

## 5. ARCHIVOS A CORREGIR

### Archivos principales:
1. src/utils/opciones-almuerzos-cenas.tsx
2. src/utils/recetas-almuerzo.tsx
3. src/components/shared/AdminProtected.tsx
4. src/lib/supabase.ts
5. src/components/recetas/PorcionesCard.tsx
6. src/components/recetas/PorcionesAlmuerzoCard.tsx
7. src/utils/exportMenuPDF.ts
8. src/utils/exportToPDF.ts

### Archivos de configuración:
1. next.config.mjs
2. .env.local (crear si no existe)
3. .gitignore
4. package.json

## 6. PRIORIDADES DE CORRECCIÓN

### Alta prioridad:
1. Corregir errores tipográficos en títulos
2. Implementar validaciones de seguridad
3. Verificar cálculos de porciones

### Media prioridad:
1. Armonizar IDs entre recetas y opciones
2. Mejorar manejo de errores
3. Optimizar rendimiento

### Baja prioridad:
1. Mejorar documentación
2. Agregar tests unitarios
3. Optimizar imágenes
