# 🍽️ Calculadora de Ingredientes

Aplicación web para gestión de recetas y planificación de comidas en comedores escolares. Desarrollada con Next.js, TypeScript y Supabase.

## 📋 Características Principales

### 🎯 Funcionalidades Implementadas
- **📱 Responsive Design**: Optimizado para móviles y tablets
- **👥 Panel de Administrador**: Gestión de usuarios y uniformes
- **🔍 Sistema de Filtros**: Búsqueda por departamento, escuela y tarea
- **📊 Exportación PDF**: Reportes de usuarios y uniformes
- **🍳 Recetario Completo**: Desayunos, almuerzos, cenas y copa de leche
- **📅 Planificación Semanal**: Menú semanal con exportación
- **👤 Gestión de Usuarios**: Registro, actualización y administración
- **👔 Gestión de Uniformes**: Tallas y tipos de uniforme
- **🔒 Seguridad Avanzada**: Múltiples capas de protección
- **🧮 Cálculos Precisos**: Validación y precisión matemática

### 🎨 Mejoras de UX/UI
- **Navegación intuitiva**: Botones de retorno optimizados
- **Indicadores visuales**: Filtros activos con puntos de colores
- **Imágenes optimizadas**: Zoom ajustado para mejor visualización
- **Tabs responsivos**: Mejor experiencia en dispositivos móviles

### 🔒 Mejoras de Seguridad (Nueva)
- **Autenticación robusta**: Validación de sesiones con expiración
- **Sanitización de datos**: Prevención de XSS e inyección SQL
- **Headers de seguridad**: CSP, HSTS, X-Frame-Options
- **Validación de inputs**: Límites y formatos estrictos
- **Variables de entorno**: Configuración segura

### 🧮 Mejoras de Cálculos (Nueva)
- **Precisión matemática**: Redondeo a 2-3 decimales
- **Validación de porciones**: Límites de 1-1000 porciones
- **Prevención de errores**: División por cero y valores inválidos
- **Factores de tamaño**: 0.67x (chica), 1x (mediana), 1.33x (grande)
- **Cálculos en tiempo real**: Actualización automática de ingredientes

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 14.2.12**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos
- **Redux Toolkit**: Gestión de estado
- **React Icons**: Iconografía

### Backend & Base de Datos
- **Supabase**: Base de datos PostgreSQL
- **Autenticación**: Sistema de login/registro
- **Storage**: Almacenamiento de archivos

### Herramientas
- **Vercel**: Despliegue automático
- **PWA**: Soporte para aplicación web progresiva
- **jsPDF**: Generación de reportes PDF

### Seguridad (Nueva)
- **OWASP Top 10**: Cumplimiento de estándares
- **Content Security Policy**: Política de contenido seguro
- **Input Sanitization**: Sanitización de entradas
- **Session Management**: Gestión segura de sesiones

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel de administrador
│   ├── [option]/          # Páginas dinámicas de opciones
│   ├── actualizar-datos/  # Gestión de datos personales
│   ├── copa-leche/        # Sección copa de leche
│   ├── menu-semanal/      # Planificación semanal
│   ├── otras-funciones/   # Funciones adicionales
│   ├── recetas/           # Recetario
│   └── servicio-alimentacion/ # Servicio de alimentación
├── components/            # Componentes reutilizables
│   ├── main/             # Componentes principales
│   ├── recetas/          # Componentes de recetas
│   ├── recetasCopaLeche/ # Componentes específicos
│   └── shared/           # Componentes compartidos
├── lib/                  # Configuraciones y servicios
├── models/               # Tipos TypeScript
├── store/                # Estado global Redux
└── utils/                # Utilidades y helpers
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/matiias793/Calculadora-2.0.git
cd Calculadora-2.0
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env.local
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_SESSION_TIMEOUT=86400000
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Abrir en navegador**
```
http://localhost:3000
```

## 📱 Funcionalidades Detalladas

### Panel de Administrador
- **Gestión de Usuarios**: Ver, editar, eliminar usuarios registrados
- **Gestión de Uniformes**: Administrar tallas y tipos de uniforme
- **Filtros Avanzados**: Por departamento, escuela y tarea
- **Exportación PDF**: Reportes personalizados
- **Responsive Design**: Optimizado para móvil

### Sistema de Recetas
- **Categorías**: Desayunos, almuerzos, cenas, copa de leche
- **Ingredientes**: Cálculo automático de porciones
- **Procedimientos**: Instrucciones paso a paso
- **Videos**: Contenido multimedia
- **Exportación**: PDF de recetas

### Gestión de Usuarios
- **Registro**: Formulario completo con validaciones
- **Actualización**: Modificación de datos personales
- **Uniformes**: Gestión de tallas y tipos
- **Autenticación**: Sistema seguro de login

### Sistema de Cálculos (Nueva)
- **Porciones precisas**: Cálculo automático con validación
- **Factores de tamaño**: Chica (0.67x), Mediana (1x), Grande (1.33x)
- **Conversiones automáticas**: Unidades de medida
- **Límites de seguridad**: Prevención de cálculos excesivos
- **Validación en tiempo real**: Verificación de valores

## 🔒 Seguridad Implementada

### Autenticación y Autorización
- **Validación robusta**: Verificación de credenciales
- **Expiración de sesiones**: 24 horas automática
- **Sanitización de inputs**: Prevención de XSS
- **Validación de documentos**: Formato específico

### Protección de Datos
- **Headers de seguridad**: CSP, HSTS, X-Frame-Options
- **Sanitización de datos**: Limpieza de entradas
- **Validación de variables**: Verificación de entorno
- **Prevención SQL Injection**: Parámetros preparados

### Configuración de Seguridad
- **Content Security Policy**: Política estricta de contenido
- **Strict Transport Security**: HTTPS obligatorio
- **XSS Protection**: Protección contra ataques XSS
- **Frame Options**: Prevención de clickjacking

## 🧮 Sistema de Cálculos Mejorado

### Precisión Matemática
- **Redondeo controlado**: 2-3 decimales para precisión
- **Factores exactos**: 0.67, 1.0, 1.33 para tamaños
- **Validación de rangos**: 1-1000 porciones máximo
- **Prevención de errores**: División por cero y valores inválidos

### Validaciones Implementadas
- **Límites de entrada**: Valores mínimos y máximos
- **Tipos de datos**: Verificación de números válidos
- **Rangos de porciones**: Control de cantidades
- **Factores de tamaño**: Validación de multiplicadores

### Conversiones Automáticas
- **Unidades de masa**: Gramos a kilogramos
- **Unidades de volumen**: Mililitros a litros
- **Huevos y yemas**: Conversión de gramos a unidades
- **Ingredientes especiales**: Tratamiento específico

## 🎨 Mejoras de Responsive Design

### Problemas Resueltos
- **Navegación móvil**: Tabs con texto visible en móvil
- **Layout adaptativo**: Cards que se ajustan a diferentes pantallas
- **Filtros mejorados**: Indicadores visuales de selección
- **Botones táctiles**: Tamaño optimizado para móvil
- **Scroll horizontal**: Tablas con scroll mejorado

### Optimizaciones Implementadas
- **objectFit: "contain"**: Imágenes completas sin recortes
- **Fondo gris claro**: Mejor contraste para imágenes
- **Espaciado responsivo**: Padding y márgenes adaptativos
- **Tipografía escalable**: Textos que se ajustan al tamaño de pantalla

## 🔧 Configuración de Base de Datos

### Tablas Principales
- **usuarios**: Datos personales y laborales
- **uniformes**: Tallas y tipos de uniforme
- **administradores**: Gestión de administradores
- **recetas**: Catálogo de recetas
- **ingredientes**: Lista de ingredientes

### Scripts SQL Incluidos
- `database_setup.sql`: Configuración inicial
- `admin_setup.sql`: Configuración de administradores
- `agregar_campo_tarea_usuarios.sql`: Campo de tarea
- `solucion_uniformes.sql`: Correcciones de uniformes

## 📊 Despliegue

### Vercel (Recomendado)
- **Despliegue automático** desde GitHub
- **URL permanente**: Disponible 24/7
- **Optimizaciones automáticas**: Performance y SEO

### Variables de Entorno en Producción
```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url_produccion
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_produccion
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_SESSION_TIMEOUT=86400000
```

## 🐛 Problemas Resueltos

### Navegación
- **Botón "Volver"**: Corregido para ir al inicio directamente
- **Ciclo de navegación**: Eliminado el problema de quedarse atrapado

### Responsive Design
- **Filtros móviles**: Indicadores visuales claros
- **Layout administrador**: Header y botones optimizados
- **Tabs móviles**: Texto visible y mejor distribución

### Imágenes
- **Zoom excesivo**: Ajustado con objectFit: "contain"
- **Fondo mejorado**: Gris claro para mejor contraste
- **Consistencia**: Todas las imágenes con mismo comportamiento

### Seguridad (Nueva)
- **Vulnerabilidades XSS**: Sanitización implementada
- **Inyección SQL**: Parámetros preparados
- **Exposición de datos**: Variables de entorno protegidas
- **Autenticación débil**: Validación robusta implementada

### Cálculos (Nueva)
- **Imprecisión matemática**: Redondeo controlado
- **Valores inválidos**: Validación de rangos
- **División por cero**: Prevención implementada
- **Cálculos excesivos**: Límites de seguridad

## 📈 Próximas Mejoras

### Funcionalidades Planificadas
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Sincronización en tiempo real
- [ ] Analytics de uso
- [ ] Backup automático

### Optimizaciones Técnicas
- [ ] Lazy loading de imágenes
- [ ] Caché optimizado
- [ ] Performance monitoring
- [ ] SEO mejorado

### Seguridad (Nueva)
- [ ] Autenticación de dos factores
- [ ] Auditoría de logs
- [ ] Monitoreo de amenazas
- [ ] Backup de seguridad

## 🤝 Contribución

### Cómo Contribuir
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código
- **TypeScript**: Tipado estricto
- **ESLint**: Linting automático
- **Prettier**: Formateo de código
- **Commits descriptivos**: Mensajes claros
- **Validación de seguridad**: Revisión de vulnerabilidades

## 📞 Soporte

### Información de Contacto
- **Repositorio**: [GitHub](https://github.com/matiias793/Calculadora-2.0.git)
- **Despliegue**: [Vercel](tu_url_de_vercel)
- **Documentación**: Este README
- **Seguridad**: [SECURITY.md](./SECURITY.md)

### Credenciales de Prueba
- **Admin**: usuario: `admin`, contraseña: `admin`
- **Super Admin**: usuario: `superadmin`, contraseña: `superadmin123`

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🔒 Política de Seguridad

Para reportar vulnerabilidades de seguridad, consulta nuestro archivo [SECURITY.md](./SECURITY.md).

---

**Desarrollado con ❤️ para comedores escolares**

**Versión**: 2.0.0 - Seguridad y Precisión Mejoradas
