import Image from "next/image";
import OptionCard from "@/components/main/OptionCard";
import NavigationButtons from "@/components/shared/NavigationButtons";

const options = [
  {
    image: (
      <Image
        src="/images/copa-leche.jpg"
        fill
        style={{ objectFit: "contain" }}
        alt="Leche en polvo con cocoa"
      />
    ),
    title: 'Leche en polvo con cocoa',
    url: '/leche-polvo/1'
  },
  {
    image: (
      <Image
        src="/images/copa-leche.jpg"
        fill
        style={{ objectFit: "contain" }}
        alt="Leche en polvo con cebada"
      />
    ),
    title: 'Leche en polvo con cebada instantánea',
    url: '/leche-polvo/2'
  },
  {
    image: (
      <Image
        src="/images/copa-leche.jpg"
        fill
        style={{ objectFit: "contain" }}
        alt="Leche en polvo con vainilla"
      />
    ),
    title: 'Leche en polvo con vainilla',
    url: '/leche-polvo/3'
  },
  {
    image: (
      <Image
        src="/images/copa-leche.jpg"
        fill
        style={{ objectFit: "contain" }}
        alt="Leche en polvo simple"
      />
    ),
    title: 'Leche en polvo simple',
    url: '/leche-polvo/4'
  }
];

export default function LechePolvo() {
  return (
    <div className="mx-auto max-w-screen-xl px-2 sm:px-4 w-full mt-6 sm:mt-10">
      <div className="flex flex-col items-start">
        <span className="pl-2 sm:pl-4 md:pl-20 lg:pl-32 flex flex-col items-start justify-start mb-4">
          <NavigationButtons />
        </span>
      </div>
      <span className="font-bold text-2xl sm:text-3xl text-logoGreen text-center mt-4 sm:mt-5 w-full flex flex-col">
        Cálculo de Leche en Polvo
      </span>
      <span className="mb-6 sm:mb-8 text-center text-gray-800 w-full flex flex-col mt-2 sm:mt-3 text-base sm:text-lg">
        Selecciona el tipo de preparación
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

