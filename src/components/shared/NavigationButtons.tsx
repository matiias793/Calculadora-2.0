'use client';

import { IoArrowBackCircle } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

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
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex items-center gap-3">
      {showBack && (
        <button
          onClick={handleBack}
          className="flex items-center text-logoGreen hover:text-logoGreenHover transition-colors duration-200"
          title="Volver atrás"
        >
          <IoArrowBackCircle className="text-4xl sm:text-5xl" />
        </button>
      )}
      
      {showHome && (
        <Link
          href={homeUrl}
          className="flex items-center text-logoGreen hover:text-logoGreenHover transition-colors duration-200"
          title="Ir al inicio"
        >
          <FaHome className="text-3xl sm:text-4xl" />
        </Link>
      )}
    </div>
  );
};

export default NavigationButtons;
