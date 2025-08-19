import Image from "next/image";
import OptionCard from "@/components/main/OptionCard";
import BackButton from "@/components/shared/BackButton";

const options = [
  {
    image: (
      <Image
        src="/images/merienda.jpg"
        fill
        style={{ objectFit: "cover" }}
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
        style={{ objectFit: "cover" }}
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
        style={{ objectFit: "cover" }}
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
        style={{ objectFit: "cover" }}
        alt="Menú semanal"
      />
    ),
    title: 'Planificación semanal',
    url: '/menu-semanal',
  }
];

export default function ServicioAlimentacion() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 w-full mt-10">
      <div className="flex flex-col items-start">
        <span className="lg:pl-32 md:pl-20 flex flex-col items-start justify-start mb-4">
          <BackButton/>
        </span>
      </div>
      <span className="font-bold text-3xl text-logoGreen text-center mt-5 w-full flex flex-col">
        Servicio de alimentación
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
