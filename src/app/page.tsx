'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import OptionCard from "@/components/main/OptionCard";
import WelcomeScreen from "@/components/welcome/WelcomeScreen";
import Loading from "./loading";

// Opciones de servicio de alimentación (contenido principal de la app)
const options = [
  {
    image: (
      <Image
        src="/images/merienda.jpg"
        fill
        style={{ objectFit: "contain" }}
        alt="Desayunos y meriendas"
      />
    ),
    title: 'Desayunos y meriendas',
    url: '/desayunos-meriendas'
  },
  {
    image: (
      <Image
        src="/images/almuerzo.jpg"
        fill
        style={{ objectFit: "contain" }}
        alt="Almuerzos y cenas"
      />
    ),
    title: 'Almuerzos y cenas',
    url: '/almuerzos-cenas'
  },
  {
    image: (
      <Image
        src="/images/copa-leche.jpg"
        fill
        style={{ objectFit: "contain" }}
        alt="Copa de leche"
      />
    ),
    title: 'Copa de Leche',
    url: '/copa-leche'
  },
  {
    image: (
      <Image
        src="/images/menu-semanal.png"
        fill
        style={{ objectFit: "contain" }}
        alt="Menú semanal"
      />
    ),
    title: 'Planificación semanal',
    url: '/menu-semanal',
  },
  {
    image: (
      <Image
        src="/images/logo-verano-2026.jpg"
        fill
        style={{ objectFit: "contain" }}
        alt="Escuelas de verano 2026"
      />
    ),
    title: 'Escuelas de verano 2026',
    url: '/escuelas-verano'
  }
];

// Contenido original oculto (no eliminado)
// const originalOptions = [
//   {
//     image: (
//       <Image
//         src="/images/servicio.jpg"
//         fill
//         style={{ objectFit: "cover" }}
//         alt="Servicio de alimentación"
//       />
//     ),
//     title: 'Servicio de alimentación',
//     url: '/servicio-alimentacion'
//   },
//   {
//     image: (
//       <Image
//         src="/images/otras.png"
//         fill
//         style={{ objectFit: "contain" }}
//         alt="Otras funciones"
//       />
//     ),
//     title: 'Otras funciones',
//     url: '/otras-funciones',
//   }
// ];

export default function Home() {
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Verificar si se debe saltar la bienvenida (navegación interna)
      const skipWelcome = sessionStorage.getItem('skipWelcome');
      if (skipWelcome === 'true') {
        sessionStorage.removeItem('skipWelcome'); // Limpiar después de usar
        setShowWelcome(false);
        return;
      }

      // Verificar si ya se mostró la bienvenida en esta sesión
      const welcomeShown = sessionStorage.getItem('welcomeShown');

      // Solo mostrar bienvenida si:
      // 1. No se ha mostrado antes en esta sesión
      // 2. Y es la primera carga (historial tiene solo 1 entrada o viene de navegación directa)
      const isFirstLoad = !welcomeShown && window.history.length <= 1;

      if (isFirstLoad) {
        setShowWelcome(true);
        sessionStorage.setItem('welcomeShown', 'true');
      } else {
        // Si no es la primera carga, mostrar menú principal
        setShowWelcome(false);
      }

      // Listener para detectar navegación back/forward
      const handlePopState = () => {
        // Si llegamos aquí por navegación back, no mostrar bienvenida
        if (window.location.pathname === '/') {
          setShowWelcome(false);
        }
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, []);

  const handleStart = () => {
    setShowWelcome(false);
  };

  // No renderizar hasta determinar si mostrar bienvenida
  if (showWelcome === null) {
    return <Loading />;
  }

  if (showWelcome) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <div className="mx-auto max-w-screen-xl px-2 sm:px-4 w-full mt-4 sm:mt-6 md:mt-10">
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-primary text-center mt-2 sm:mt-4 w-full flex flex-col items-center mb-4">
        Selecciona la opción deseada
      </h2>
      <p className="mb-6 sm:mb-8 text-center text-neutral-text w-full flex flex-col mt-2 sm:mt-3 text-base sm:text-lg font-medium">
        ¿Qué vas a cocinar?
      </p>
      <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 md:mt-10 w-full mb-6 sm:mb-8 md:mb-12">
        {
          options.map(option => (
            <OptionCard key={option.title} {...option} />
          ))
        }
      </div>
    </div>
  );
}
