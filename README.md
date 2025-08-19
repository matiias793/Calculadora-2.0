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

### 🎨 Mejoras de UX/UI
- **Navegación intuitiva**: Botones de retorno optimizados
- **Indicadores visuales**: Filtros activos con puntos de colores
- **Imágenes optimizadas**: Zoom ajustado para mejor visualización
- **Tabs responsivos**: Mejor experiencia en dispositivos móviles

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

## 📞 Soporte

### Información de Contacto
- **Repositorio**: [GitHub](https://github.com/matiias793/Calculadora-2.0.git)
- **Despliegue**: [Vercel](tu_url_de_vercel)
- **Documentación**: Este README

### Credenciales de Prueba
- **Admin**: usuario: `admin`, contraseña: `admin`
- **Super Admin**: usuario: `superadmin`, contraseña: `superadmin123`

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para comedores escolares**
