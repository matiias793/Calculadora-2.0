'use client'

import { Opcion } from "@/models/Opcion";
import { useAppSelector } from "@/store"

const ProcedimientoCard = () => {

  const procedimiento = useAppSelector( (state) => state.receta.procedimiento );

  return (
    <div className="md:w-1/2 w-full flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

        <div className="p-6">
            <h4 className="text-lg text-logoGreen font-bold mb-5">Instrucciones</h4>
            {
              procedimiento?.opciones.map(
                ( opcion, index ) => (
                  <div key = { index } className="mb-5">
                    { opcion.title !== "" && <span className="text-md font-bold mb-2">{ opcion.title }</span> }
                    <ul className = { `list-disc pl-5 marker:text-logoGreen space-y-3 mb-5 ${ opcion.title !== "" && 'mt-5' }`}>
                      { 
                        opcion.pasos.map(
                          ( paso, pasoIndex ) => (
                            <li key = { pasoIndex }>{ paso }</li>
                          )
                        )
                      }
                    </ul>
                  </div>
                )
              )
            }
        </div>
    </div>
  )
}

export default ProcedimientoCard
