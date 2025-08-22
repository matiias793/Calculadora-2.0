# Base de Datos de Recetas - Documentación

## 📋 **Descripción General**

Este sistema permite almacenar y gestionar todas las recetas del sistema de comedores escolares en una base de datos PostgreSQL. El administrador puede crear, editar, eliminar y gestionar recetas desde el panel de administración.

## 🗄️ **Estructura de la Base de Datos**

### **Tabla: `recetas`**
Almacena la información principal de cada receta.

```sql
CREATE TABLE recetas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('almuerzo', 'desayuno', 'copa_leche', 'receta_base', 'postre')),
    descripcion TEXT,
    imagen_url VARCHAR(255),
    activa BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: `ingredientes`**
Catálogo de ingredientes disponibles en el sistema.

```sql
CREATE TABLE ingredientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    unidad_base VARCHAR(20) NOT NULL,
    categoria VARCHAR(50),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: `receta_ingredientes`**
Relación entre recetas e ingredientes con cantidades.

```sql
CREATE TABLE receta_ingredientes (
    id SERIAL PRIMARY KEY,
    receta_id INTEGER REFERENCES recetas(id) ON DELETE CASCADE,
    ingrediente_id INTEGER REFERENCES ingredientes(id) ON DELETE CASCADE,
    cantidad DECIMAL(10,3) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(receta_id, ingrediente_id)
);
```

### **Tabla: `procedimientos`**
Procedimientos de preparación para cada receta.

```sql
CREATE TABLE procedimientos (
    id SERIAL PRIMARY KEY,
    receta_id INTEGER REFERENCES recetas(id) ON DELETE CASCADE,
    titulo VARCHAR(255),
    pasos TEXT[],
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 **Configuración Inicial**

### **1. Crear las tablas**
```bash
# Ejecutar el script de configuración
psql -d tu_base_de_datos -f database_recetas_setup.sql
```

### **2. Migrar recetas existentes**
```bash
# Ejecutar el script de migración
psql -d tu_base_de_datos -f migrate_recetas_to_db.sql
```

## 🎯 **Funcionalidades del Panel de Administración**

### **Pestaña "Recetas"**
- **Vista general**: Estadísticas y categorías de recetas
- **Acceso rápido**: Botones para ver todas las recetas o crear nuevas

### **Página de Administración de Recetas** (`/admin/recetas`)
- **Lista de recetas**: Tabla con todas las recetas del sistema
- **Filtros**: Por categoría y búsqueda por texto
- **Acciones**: Ver, editar, eliminar recetas
- **Estado**: Activar/desactivar recetas

### **Funcionalidades de Edición**
- **Información básica**: Título, categoría, descripción, imagen
- **Ingredientes**: Agregar, editar, eliminar ingredientes y cantidades
- **Procedimientos**: Gestionar pasos de preparación
- **Validaciones**: Verificar que los ingredientes existan

## 📊 **Categorías de Recetas**

1. **Almuerzos** (`almuerzo`): Platos principales para almuerzo
2. **Desayunos** (`desayuno`): Recetas para desayuno
3. **Copa de Leche** (`copa_leche`): Recetas específicas para copa de leche
4. **Recetas Base** (`receta_base`): Recetas fundamentales (masas, bases)
5. **Postres** (`postre`): Recetas dulces y postres

## 🔧 **Uso del Sistema**

### **Para Administradores**

1. **Acceder al panel**: `/admin` → Login con credenciales
2. **Navegar a Recetas**: Pestaña "Recetas" en el dashboard
3. **Gestionar recetas**: 
   - Ver todas las recetas
   - Crear nuevas recetas
   - Editar recetas existentes
   - Eliminar recetas

### **Para Desarrolladores**

1. **Integración**: Las recetas se pueden cargar desde la base de datos
2. **APIs**: Endpoints para CRUD de recetas
3. **Validaciones**: Verificar ingredientes y procedimientos
4. **Caché**: Implementar caché para mejorar rendimiento

## 📝 **Ejemplos de Uso**

### **Crear una nueva receta**
```sql
-- Insertar receta
INSERT INTO recetas (titulo, categoria, descripcion) 
VALUES ('Nueva Receta', 'almuerzo', 'Descripción de la receta');

-- Insertar ingredientes
INSERT INTO receta_ingredientes (receta_id, ingrediente_id, cantidad, unidad, orden)
VALUES (1, 1, 100, 'g', 1);

-- Insertar procedimiento
INSERT INTO procedimientos (receta_id, titulo, pasos, orden)
VALUES (1, 'Preparación', ARRAY['Paso 1', 'Paso 2'], 1);
```

### **Consultar recetas con ingredientes**
```sql
SELECT 
    r.titulo,
    r.categoria,
    i.nombre as ingrediente,
    ri.cantidad,
    ri.unidad
FROM recetas r
JOIN receta_ingredientes ri ON r.id = ri.receta_id
JOIN ingredientes i ON ri.ingrediente_id = i.id
WHERE r.activa = true
ORDER BY r.titulo, ri.orden;
```

## 🔒 **Seguridad y Validaciones**

- **Categorías**: Solo categorías válidas permitidas
- **Ingredientes**: Verificar que existan antes de agregar
- **Cantidades**: Valores numéricos positivos
- **Unidades**: Unidades válidas del sistema
- **Acceso**: Solo administradores autorizados

## 📈 **Próximas Mejoras**

1. **Importación masiva**: CSV/Excel para migrar recetas
2. **Versiones**: Historial de cambios en recetas
3. **Comentarios**: Sistema de comentarios y sugerencias
4. **Fotos**: Galería de fotos por receta
5. **Nutrición**: Información nutricional
6. **Alergenos**: Marcado de ingredientes alergénicos

## 🐛 **Solución de Problemas**

### **Error: "Ingrediente no encontrado"**
- Verificar que el ingrediente existe en la tabla `ingredientes`
- Agregar el ingrediente si no existe

### **Error: "Categoría inválida"**
- Usar solo categorías válidas: `almuerzo`, `desayuno`, `copa_leche`, `receta_base`, `postre`

### **Error: "Receta duplicada"**
- Verificar que no existe una receta con el mismo título
- Usar títulos únicos para cada receta

## 📞 **Soporte**

Para problemas o consultas sobre la base de datos de recetas:
- Revisar logs de la aplicación
- Verificar permisos de base de datos
- Consultar documentación de Supabase
