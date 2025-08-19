'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import OptionCard from "@/components/main/OptionCard";
import NavigationButtons from "@/components/shared/NavigationButtons";

const otrasOpciones = [
  {
    image: (
      <Image
        src="/images/actualiza-datos.png"
        fill
        style={{ objectFit: "contain" }}
        alt="Actualizar mis datos"
      />
    ),
    title: 'Actualizar mis datos',
    url: '/actualizar-datos'
  },
  {
    image: (
      <Image
        src="/images/admin-panel.png"
        fill
        style={{ objectFit: "contain" }}
        alt="Panel de Administrador"
      />
    ),
    title: 'Panel de Administrador',
    url: '/admin'
  }
];

const OtrasFunciones = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-2 sm:px-4 w-full mt-6 sm:mt-10">
      <div className="flex flex-col items-start">
        <span className="pl-2 sm:pl-4 md:pl-20 lg:pl-32 flex flex-col items-start justify-start mb-4">
          <NavigationButtons />
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-logoGreen text-center mb-4 sm:mb-6">Otras Funciones</h2>
      
      <div className="flex flex-row flex-wrap justify-center gap-3 sm:gap-5 mt-8 sm:mt-10 w-full mb-6 sm:mb-8">
        {
          otrasOpciones.map(option => (
            <OptionCard key={option.title} {...option} />
          ))
        }
      </div>
    </div>
  );
};

export default OtrasFunciones;
