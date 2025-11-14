'use client';

import { useEffect } from 'react';

export default function ThemeColor() {
  useEffect(() => {
    // Agregar o actualizar el meta tag theme-color
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColorMeta);
    }
    
    themeColorMeta.setAttribute('content', '#8BCF85');
    
    // También para iOS Safari
    let appleThemeColor = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!appleThemeColor) {
      appleThemeColor = document.createElement('meta');
      appleThemeColor.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
      document.head.appendChild(appleThemeColor);
    }
    appleThemeColor.setAttribute('content', 'default');
  }, []);

  return null;
}

