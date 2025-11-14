# Notificaciones Push Nativas

## ¿Es posible enviar notificaciones push nativas?

**Sí**, es posible enviar notificaciones push nativas a dispositivos móviles y de escritorio usando la **API de Notificaciones del navegador** y **Service Workers**.

## Requisitos

1. **HTTPS obligatorio**: Las notificaciones push solo funcionan en sitios con HTTPS (o localhost para desarrollo)
2. **Service Worker**: Necesario para recibir notificaciones incluso cuando la app está cerrada
3. **Permisos del usuario**: El navegador pedirá permiso al usuario la primera vez

## Implementación

### Opción 1: Notificaciones locales (sin servidor)

Para notificaciones que se activan desde la misma app (ej: recordatorios, alertas):

```typescript
// src/utils/notifications.ts
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('Este navegador no soporta notificaciones');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/logonuevoverde.png',
      badge: '/logonuevoverde.png',
      ...options
    });
  }
}
```

### Opción 2: Notificaciones push desde servidor (Web Push)

Para notificaciones enviadas desde un servidor (ej: actualizaciones, mensajes del administrador):

1. **Registrar Service Worker** (ya tienes next-pwa configurado)
2. **Suscripción a Push**: Obtener un endpoint único del navegador
3. **Enviar desde servidor**: Usar el endpoint para enviar notificaciones

## Ejemplo de implementación básica

### 1. Crear utilidad de notificaciones

```typescript
// src/utils/notifications.ts
'use client';

export class NotificationService {
  static async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Este navegador no soporta notificaciones');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  static showLocalNotification(
    title: string,
    options?: NotificationOptions
  ): void {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/logonuevoverde.png',
        badge: '/logonuevoverde.png',
        tag: 'app-notification',
        requireInteraction: false,
        ...options
      });
    }
  }

  static async subscribeToPush(): Promise<PushSubscription | null> {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker no soportado');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY // Necesitas generar esto
      });
      return subscription;
    } catch (error) {
      console.error('Error al suscribirse a push:', error);
      return null;
    }
  }
}
```

### 2. Usar en un componente

```typescript
// Ejemplo: Mostrar notificación cuando se genera un menú
import { NotificationService } from '@/utils/notifications';

const handleGenerateMenu = async () => {
  // ... lógica para generar menú
  
  // Mostrar notificación
  const hasPermission = await NotificationService.requestPermission();
  if (hasPermission) {
    NotificationService.showLocalNotification('Menú generado', {
      body: 'El menú semanal ha sido generado exitosamente',
      icon: '/logonuevoverde.png'
    });
  }
};
```

## Limitaciones

1. **Solo funciona en HTTPS** (excepto localhost)
2. **Requiere permiso del usuario** (no se puede forzar)
3. **Diferentes navegadores** tienen diferentes comportamientos
4. **iOS Safari** tiene limitaciones más estrictas

## Alternativas nativas

Si necesitas notificaciones más robustas:

1. **Apps nativas**: React Native, Flutter, etc.
2. **PWA con instalación**: Mejor soporte para notificaciones
3. **APIs nativas del dispositivo**: Requieren desarrollo nativo

## Recomendación

Para tu app de calculadora de ingredientes, las **notificaciones locales** son suficientes para:
- Recordatorios de menú semanal
- Alertas de actualizaciones
- Notificaciones de cambios en recetas

Las notificaciones push desde servidor solo son necesarias si quieres enviar mensajes cuando el usuario no está usando la app.

