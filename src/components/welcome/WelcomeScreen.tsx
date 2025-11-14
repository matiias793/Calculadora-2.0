'use client'

import Image from "next/image";
import { useState } from "react";

const logo = '/logonuevoverdesinfondo.png';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onStart();
    }, 300);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center max-w-md w-full">
        {/* Logo con animación */}
        <div className="mb-8 animate-fade-in">
          <Image
            src={logo}
            width={200}
            height={200}
            alt="Logo"
            className="w-[150px] h-auto sm:w-[180px] md:w-[200px] drop-shadow-lg"
            priority={true}
          />
        </div>

        {/* Título */}
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-primary text-center mb-4 animate-slide-up">
          Calculadora de Ingredientes
        </h1>

        {/* Subtítulo */}
        <p className="text-center text-neutral-text text-base sm:text-lg mb-12 animate-slide-up-delay">
          Tu herramienta para planificar y calcular ingredientes
        </p>

        {/* Botón de comenzar */}
        <button
          onClick={handleStart}
          className="w-full max-w-xs px-8 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-hover hover:to-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 animate-fade-in-delay"
        >
          Comenzar
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

