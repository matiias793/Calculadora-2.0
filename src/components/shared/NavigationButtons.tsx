'use client';

import { IoArrowBackCircle } from "react-icons/io5";
import { FaHome, FaStar } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

interface NavigationButtonsProps {
  showBack?: boolean;
  showHome?: boolean;
  showWelcome?: boolean;
  homeUrl?: string;
  onWelcomeClick?: () => void; // Callback directo para mostrar bienvenida
}

const NavigationButtons = ({ 
  showBack = true, 
  showHome = true,
  showWelcome = false, // Por defecto false, solo se mostrará en la página principal
  homeUrl = "/",
  onWelcomeClick // Callback directo para mostrar bienvenida
}: NavigationButtonsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Solo mostrar el botón de bienvenida en la página principal
  const shouldShowWelcome = showWelcome && pathname === '/';

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      // Usar el historial del navegador nativo
      if (window.history.length > 1) {
        // Antes de navegar hacia atrás, establecer skipWelcome si vamos a "/"
        // Esto evita que se muestre la bienvenida al retroceder
        sessionStorage.setItem('skipWelcome', 'true');
        window.history.back();
      } else {
        // Si no hay historial, ir al menú principal sin bienvenida
        sessionStorage.setItem('skipWelcome', 'true');
        router.push('/');
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      // Marcar que se viene de navegación interna, no mostrar bienvenida
      sessionStorage.setItem('skipWelcome', 'true');
      router.push(homeUrl);
    }
  };

  const handleWelcomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onWelcomeClick) {
      // Si hay un callback directo, usarlo (más eficaz)
      onWelcomeClick();
    } else if (typeof window !== 'undefined') {
      // Fallback: usar sessionStorage y recargar
      sessionStorage.removeItem('welcomeShown');
      sessionStorage.removeItem('skipWelcome');
      sessionStorage.setItem('forceWelcome', 'true');
      if (pathname === '/') {
        window.location.reload();
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      {showBack && (
        <button
          onClick={handleBack}
          className="flex items-center text-primary hover:text-primary-hover transition-colors duration-200"
          title="Volver atrás"
        >
          <IoArrowBackCircle className="text-4xl sm:text-5xl" />
        </button>
      )}
      
      {showHome && (
        <button
          onClick={handleHomeClick}
          className="flex items-center text-primary hover:text-primary-hover transition-colors duration-200"
          title="Ir al inicio"
        >
          <FaHome className="text-3xl sm:text-4xl" />
        </button>
      )}
      
      {shouldShowWelcome && (
        <button
          onClick={handleWelcomeClick}
          className="flex items-center text-primary hover:text-primary-hover transition-colors duration-200"
          title="Ver pantalla de bienvenida"
        >
          <FaStar className="text-3xl sm:text-4xl" />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
