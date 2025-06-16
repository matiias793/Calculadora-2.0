import ListadoCopaLeche from "@/components/opciones/ListadoCopaLeche";
import ListadoRecetas from "@/components/opciones/ListadoRecetas";
import ListadoRecetasAlmuerzo from "@/components/opciones/ListadoRecetasAlmuerzo";
import BackButton from "@/components/shared/BackButton";
import { Metadata } from "next";

interface Props {
    params: { option: string }
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {

  const opcion = params.option === 'desayunos-meriendas' ?
                                      'Desayunos y meriendas' :
                                      'Copa de Leche'  

  return {
    title: opcion,
    description: `Opciones para ${ opcion }`
  }
}


const page = ( { params } : Props ) => {
  return (
    <div className="mx-auto max-w-screen-xl w-full">
        <span className="font-bold text-3xl text-logoGreen text-center mt-5 w-full flex flex-col">
            <span className="lg:pl-32 md:pl-20 flex flex-col items-start justify-start mb-4">
              <BackButton/>
            </span>
            { params.option === 'desayunos-meriendas' && 'Desayunos y meriendas' }
            { params.option === 'almuerzos-cenas' && 'Almuerzos y cenas' }
            { params.option === 'copa-leche' && 'Copa de Leche' }
        </span>
        { params.option === 'desayunos-meriendas' && <ListadoRecetas /> }
        { params.option === 'almuerzos-cenas' && <ListadoRecetasAlmuerzo /> }
        { params.option === 'copa-leche' && <ListadoCopaLeche /> }
        
    </div>
  )
}

export default page
