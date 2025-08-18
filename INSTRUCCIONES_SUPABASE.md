# 🚀 Instrucciones para Configurar Supabase

## 📋 Pasos para solucionar los errores

### 1. **Ejecutar el SQL en Supabase**

1. Ve a tu proyecto en [Supabase](https://supabase.com)
2. Navega a **SQL Editor**
3. Copia y pega todo el contenido del archivo `database_setup.sql`
4. Haz clic en **Run** para ejecutar el script

### 2. **Verificar que las tablas se crearon**

Después de ejecutar el SQL, deberías ver:
- ✅ Tabla `usuarios` creada
- ✅ Tabla `uniformes` creada  
- ✅ Tabla `administradores` creada
- ✅ Políticas de seguridad configuradas
- ✅ Datos de prueba insertados

### 3. **Credenciales de prueba creadas**

**Administradores:**
- Usuario: `admin` / Contraseña: `admin`
- Usuario: `tess` / Contraseña: `tess`
- Usuario: `superadmin` / Contraseña: `superadmin123`

**Usuarios de prueba:**
- Documento: `12345678` / Contraseña: `password123`
- Documento: `87654321` / Contraseña: `password456`
- Documento: `11111111` / Contraseña: `password789`

## 🔧 Problemas solucionados

### ✅ **Error 1: No se pueden guardar datos de uniforme**
- **Causa:** La tabla `uniformes` no existía en la base de datos
- **Solución:** Se creó la tabla completa con todas las restricciones necesarias

### ✅ **Error 2: Filtros de administrador**
- **Mejora:** Ahora el administrador puede:
  - Seleccionar departamento primero
  - Filtrar por escuelas específicas del departamento
  - Buscar por número de escuela (ej: 222)

### ✅ **Error 3: Escuelas precargadas**
- **Mejora:** Ahora todas las escuelas están precargadas por departamento:
  - Paysandú: Escuelas 1-117
  - Montevideo: Escuelas 1-300
  - Y así para todos los departamentos

## 🎯 Funcionalidades nuevas

### **Para usuarios:**
- ✅ Escuelas precargadas por departamento
- ✅ Validación de datos de uniforme
- ✅ Mejor manejo de errores

### **Para administradores:**
- ✅ Filtro por departamento
- ✅ Filtro por escuela específica
- ✅ Escuelas precargadas en formularios de edición
- ✅ Búsqueda mejorada

## 🧪 Probar las correcciones

### **1. Probar guardar uniforme:**
1. Ve a "Otras funciones" > "Actualizar mis datos"
2. Inicia sesión con: `12345678` / `password123`
3. Ve a la pestaña "Datos de Uniforme"
4. Completa los datos y guarda
5. ✅ Debería guardar sin errores

### **2. Probar filtros de administrador:**
1. Ve a "Otras funciones" > "Administrador"
2. Inicia sesión con: `admin` / `admin`
3. Selecciona un departamento (ej: Paysandú)
4. Selecciona una escuela específica
5. ✅ Debería filtrar correctamente

### **3. Probar escuelas precargadas:**
1. En cualquier formulario de usuario
2. Selecciona un departamento
3. ✅ Las escuelas deberían aparecer automáticamente

## 📞 Si hay problemas

Si después de ejecutar el SQL sigues teniendo problemas:

1. **Verifica las tablas:**
   ```sql
   SELECT * FROM usuarios LIMIT 5;
   SELECT * FROM uniformes LIMIT 5;
   SELECT * FROM administradores LIMIT 5;
   ```

2. **Verifica las políticas:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename IN ('usuarios', 'uniformes', 'administradores');
   ```

3. **Revisa los logs de error en la consola del navegador**

## 🎉 ¡Listo!

Una vez que ejecutes el SQL en Supabase, todos los errores deberían estar solucionados y las nuevas funcionalidades deberían funcionar correctamente.
