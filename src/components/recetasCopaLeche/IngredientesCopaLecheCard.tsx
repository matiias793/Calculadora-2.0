'use client'

import { useAppSelector } from "@/store"

const IngredientesCopaLecheCard = () => {
  
  const porciones = useAppSelector( ( state ) => state.recetaCopaLeche.porciones );
  const recetaPorciones = useAppSelector( ( state ) => state.recetaCopaLeche.recetaPorciones );

  return (
    <div className="w-full flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

        <div className="p-6">
            <h4 className="text-lg text-logoGreen font-bold">{`Ingredientes (para ${ porciones } ${ porciones != 1 ? 'personas' : 'persona' })`}</h4>
            <table className="w-full table-auto text-md mt-7">
                <thead>
                    <tr className="text-md">
                        <th className="py-2 px-4 font-bold text-md text-grey-light border-b border-grey-light text-left w-3/5">Nombre</th>
                        <th className="py-2 px-4 font-bold text-md text-grey-light border-b border-grey-light text-left w-2/5">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recetaPorciones?.ingredients?.map(
                            ( { name, quantity, unit } ) => (
                                <tr className="hover:bg-grey-lighter" key = { name }>
                                    <td className="py-2 px-4 border-b border-grey-light">{ name }</td>
                                    <td className="py-2 px-4 border-b border-grey-light text-left">{ ( quantity ).toLocaleString() } { unit }</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            {
                recetaPorciones?.variants 
                &&
                <>
                    <h5 className="text-lg text-logoGreen mt-7 font-bold">Variantes</h5>
                    <table className="w-full table-auto text-md mt-3">
                        <thead>
                            <tr className="text-md">
                                <th className="py-2 px-4 font-bold text-md text-grey-light border-b border-grey-light text-left w-3/5">Nombre</th>
                                <th className="py-2 px-4 font-bold text-md text-grey-light border-b border-grey-light text-left w-2/5">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                recetaPorciones!.variants.map(
                                    ( { name, quantity, unit } ) => (
                                        <tr className="hover:bg-grey-lighter" key = { name }>
                                            <td className="py-2 px-4 border-b border-grey-light">{ name }</td>
                                            <td className="py-2 px-4 border-b border-grey-light text-left">{ ( quantity ).toLocaleString() } { unit }</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </>
            }
        </div>
    </div>
  )
}

export default IngredientesCopaLecheCard
