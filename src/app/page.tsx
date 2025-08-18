import Image from "next/image";
import logo from '@/assets/images/logo.png';
import almuerzo from '@/assets/images/almuerzo.jpg';
import merienda from '@/assets/images/merienda.jpg';
import copaLeche from '@/assets/images/copa-leche.jpg';
import menuSemanal from '@/assets/images/menu-semanal.png';

import OptionCard from "@/components/main/OptionCard";

const options = [
  {
    image: (
      <Image
        src={merienda}
        layout="fill"
        objectFit="cover"
        alt="Desayunos y meriendas"
      />
    ),
    title: 'Desayunos y meriendas',
    url: '/desayunos-meriendas'
  },
  {
    image: (
      <Image
        src={almuerzo}
        layout="fill"
        objectFit="cover"
        alt="Almuerzos y cenas"
      />
    ),
    title: 'Almuerzos y cenas',
    url: '/almuerzos-cenas'
  },
  {
    image: (
      <Image
        src={copaLeche}
        layout="fill"
        objectFit="cover"
        alt="Copa de leche"
      />
    ),
    title: 'Copa de Leche',
    url: '/copa-leche'
  },
  {
    image: (
      <Image
        src={menuSemanal}
        layout="fill"
        objectFit="cover"
        alt="Menú semanal"
      />
    ),
    title: 'Planificación semanal',
    url: '/menu-semanal',
  },
  {
    image: (
      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
        <span className="text-white text-4xl font-bold">⚙️</span>
      </div>
    ),
    title: 'Otras funciones',
    url: '/otras-funciones',
  }
];

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 w-full mt-10">
      <div className="flex flex-col items-center">
        <Image
          src={logo}
          width={150}
          height={200}
          alt="Logo"
        />
      </div>
      <span className="font-bold text-3xl text-logoGreen text-center mt-5 w-full flex flex-col">
        Calculadora de Ingredientes
      </span>
      <span className="mb-8 text-center text-gray-800 w-full flex flex-col mt-3 text-lg">
        ¿Qué vas a cocinar?
      </span>
      <div className="flex flex-row flex-wrap justify-center gap-5 mt-10 w-full px-4 md:px-0 mb-8">
        {
          options.map(option => (
            <OptionCard key={option.title} {...option} />
          ))
        }
      </div>
    </div>
  );
}
