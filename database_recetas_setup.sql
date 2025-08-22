-- Configuración de la base de datos para recetas
-- Ejecutar este script para crear las tablas necesarias

-- Tabla principal de recetas
CREATE TABLE IF NOT EXISTS recetas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('almuerzo', 'desayuno', 'copa_leche', 'receta_base', 'postre')),
    descripcion TEXT,
    imagen_url VARCHAR(255),
    activa BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de ingredientes
CREATE TABLE IF NOT EXISTS ingredientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    unidad_base VARCHAR(20) NOT NULL,
    categoria VARCHAR(50),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de relación receta-ingredientes
CREATE TABLE IF NOT EXISTS receta_ingredientes (
    id SERIAL PRIMARY KEY,
    receta_id INTEGER REFERENCES recetas(id) ON DELETE CASCADE,
    ingrediente_id INTEGER REFERENCES ingredientes(id) ON DELETE CASCADE,
    cantidad DECIMAL(10,3) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(receta_id, ingrediente_id)
);

-- Tabla de procedimientos
CREATE TABLE IF NOT EXISTS procedimientos (
    id SERIAL PRIMARY KEY,
    receta_id INTEGER REFERENCES recetas(id) ON DELETE CASCADE,
    titulo VARCHAR(255),
    pasos TEXT[],
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_recetas_categoria ON recetas(categoria);
CREATE INDEX IF NOT EXISTS idx_recetas_activa ON recetas(activa);
CREATE INDEX IF NOT EXISTS idx_ingredientes_categoria ON ingredientes(categoria);
CREATE INDEX IF NOT EXISTS idx_ingredientes_activo ON ingredientes(activo);
CREATE INDEX IF NOT EXISTS idx_receta_ingredientes_receta_id ON receta_ingredientes(receta_id);
CREATE INDEX IF NOT EXISTS idx_receta_ingredientes_ingrediente_id ON receta_ingredientes(ingrediente_id);
CREATE INDEX IF NOT EXISTS idx_procedimientos_receta_id ON procedimientos(receta_id);

-- Función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_recetas_updated_at 
    BEFORE UPDATE ON recetas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentar las tablas
COMMENT ON TABLE recetas IS 'Tabla principal que almacena las recetas del sistema';
COMMENT ON TABLE ingredientes IS 'Catálogo de ingredientes disponibles en el sistema';
COMMENT ON TABLE receta_ingredientes IS 'Tabla de relación que conecta recetas con sus ingredientes y cantidades';
COMMENT ON TABLE procedimientos IS 'Procedimientos de preparación para cada receta';
