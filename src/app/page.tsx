import Image from "next/image";
const logo = '/images/logo inicio sin fondo.png?v=2';

import OptionCard from "@/components/main/OptionCard";

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
        src="/images/logo.png"
        fill
        style={{ objectFit: "contain" }}
        alt="Escuelas de verano 2026"
      />
    ),
    title: 'Escuelas de verano 2026',
    url: '/escuelas-verano-2026'
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
  return (
    <div className="mx-auto max-w-screen-xl px-2 sm:px-4 w-full mt-4 sm:mt-6 md:mt-10">
      <div className="flex flex-col items-center mb-4 sm:mb-6">
        <Image
          src={logo}
          width={180}
          height={180}
          alt="Logo"
          className="w-[120px] h-auto sm:w-[160px] md:w-[180px] drop-shadow-lg"
          priority={true}
          sizes="(max-width: 640px) 120px, (max-width: 768px) 160px, 180px"
        />
      </div>
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-logoGreen text-center mt-2 sm:mt-4 w-full flex flex-col items-center mb-2">
        Calculadora de Ingredientes
      </h1>
      <p className="mb-6 sm:mb-8 text-center text-gray-700 dark:text-gray-300 w-full flex flex-col mt-2 sm:mt-3 text-base sm:text-lg font-medium">
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
