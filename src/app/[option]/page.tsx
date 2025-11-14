'use client';

import ListadoCopaLeche from "@/components/opciones/ListadoCopaLeche";
import ListadoRecetas from "@/components/opciones/ListadoRecetas";
import ListadoRecetasAlmuerzo from "@/components/opciones/ListadoRecetasAlmuerzo";
import NavigationButtons from "@/components/shared/NavigationButtons";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const option = params?.option as string;

  // Determinar el título según la opción
  const getTitle = () => {
    if (option === 'desayunos-meriendas') return 'Desayunos y meriendas';
    if (option === 'almuerzos-cenas') return 'Almuerzos y cenas';
    if (option === 'copa-leche') return 'Copa de Leche';
    return '';
  };

  // Renderizar el componente correspondiente
  const renderContent = () => {
    if (option === 'desayunos-meriendas') return <ListadoRecetas />;
    if (option === 'almuerzos-cenas') return <ListadoRecetasAlmuerzo />;
    if (option === 'copa-leche') return <ListadoCopaLeche />;
    return null;
  };

  return (
    <div className="mx-auto max-w-screen-xl w-full px-2 sm:px-4">
      <span className="font-bold text-2xl sm:text-3xl text-logoGreen text-center mt-4 sm:mt-5 w-full flex flex-col">
        <span className="pl-2 sm:pl-4 md:pl-20 lg:pl-32 flex flex-col items-start justify-start mb-4">
          <NavigationButtons />
        </span>
        {getTitle()}
      </span>
      {renderContent()}
    </div>
  );
};

export default Page;
