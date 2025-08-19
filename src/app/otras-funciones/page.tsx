'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import OptionCard from "@/components/main/OptionCard";
import BackButton from "@/components/shared/BackButton";

const otrasOpciones = [
  {
    image: (
      <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
        <span className="text-white text-4xl font-bold">👤</span>
      </div>
    ),
    title: 'Actualizar mis datos',
    url: '/actualizar-datos'
  },
  {
    image: (
      <div className="w-full h-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
        <span className="text-white text-4xl font-bold">⚙️</span>
      </div>
    ),
    title: 'Panel de Administrador',
    url: '/admin'
  }
];

const OtrasFunciones = () => {
  return (
    <div className="mx-auto max-w-screen-xl w-full">
      <div className="flex flex-col items-start">
        <span className="lg:pl-32 md:pl-20 flex flex-col items-start justify-start mb-4">
          <BackButton/>
        </span>
      </div>

      <h2 className="text-2xl font-bold text-logoGreen text-center mb-4">Otras Funciones</h2>
      
      <div className="flex flex-row flex-wrap justify-center gap-5 mt-10 w-full px-4 md:px-0 mb-8">
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
