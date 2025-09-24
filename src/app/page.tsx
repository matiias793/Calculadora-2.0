import Image from "next/image";
const logo = '/images/LOGOAPPPNG.png';

import OptionCard from "@/components/main/OptionCard";

const options = [
  {
    image: (
      <Image
        src="/images/servicio.jpg"
        fill
        style={{ objectFit: "cover" }}
        alt="Servicio de alimentación"
      />
    ),
    title: 'Servicio de alimentación',
    url: '/servicio-alimentacion'
  },
  {
    image: (
      <Image
        src="/images/otras.png"
        fill
        style={{ objectFit: "contain" }}
        alt="Otras funciones"
      />
    ),
    title: 'Otras funciones',
    url: '/otras-funciones',
  }
];

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl px-2 sm:px-4 w-full mt-6 sm:mt-10">
      <div className="flex flex-col items-center">
        <Image
          src={logo}
          width={150}
          height={150}
          alt="Logo"
          className="sm:w-[180px] sm:h-[180px]"
          priority={true}
          unoptimized={true}
        />
      </div>
      <span className="font-bold text-2xl sm:text-3xl text-logoGreen text-center mt-4 sm:mt-5 w-full flex flex-col">
        Calculadora de Ingredientes
      </span>
      <span className="mb-6 sm:mb-8 text-center text-gray-800 w-full flex flex-col mt-2 sm:mt-3 text-base sm:text-lg">
        ¿Qué necesitas hacer?
      </span>
      <div className="flex flex-row flex-wrap justify-center gap-3 sm:gap-5 mt-8 sm:mt-10 w-full mb-6 sm:mb-8">
        {
          options.map(option => (
            <OptionCard key={option.title} {...option} />
          ))
        }
      </div>
    </div>
  );
}
