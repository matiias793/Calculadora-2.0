'use client';

import { IoArrowBackCircle } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface NavigationButtonsProps {
  showBack?: boolean;
  showHome?: boolean;
  homeUrl?: string;
}

const NavigationButtons = ({ 
  showBack = true, 
  showHome = true, 
  homeUrl = "/" 
}: NavigationButtonsProps) => {
  const router = useRouter();

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
    </div>
  );
};

export default NavigationButtons;
