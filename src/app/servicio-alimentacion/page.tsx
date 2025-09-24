import Image from "next/image";
import OptionCard from "@/components/main/OptionCard";
import NavigationButtons from "@/components/shared/NavigationButtons";

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
  }
];

export default function ServicioAlimentacion() {
  return (
    <div className="mx-auto max-w-screen-xl px-2 sm:px-4 w-full mt-6 sm:mt-10">
      <div className="flex flex-col items-start">
        <span className="pl-2 sm:pl-4 md:pl-20 lg:pl-32 flex flex-col items-start justify-start mb-4">
          <NavigationButtons />
        </span>
      </div>
      <span className="font-bold text-2xl sm:text-3xl text-logoGreen text-center mt-4 sm:mt-5 w-full flex flex-col">
        Servicio de alimentación
      </span>
      <span className="mb-6 sm:mb-8 text-center text-gray-800 w-full flex flex-col mt-2 sm:mt-3 text-base sm:text-lg">
        ¿Qué vas a cocinar?
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
