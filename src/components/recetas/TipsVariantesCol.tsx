'use client'

import { useAppSelector } from "@/store"

const TipsVariantesCol = () => {

  const procedimiento = useAppSelector( state => state.receta.procedimiento )
  
  return (
    <div className="flex flex-col md:w-1/2 w-full gap-5">
        <div className="flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

            <div className="p-6">
                <h4 className="text-lg text-logoGreen font-bold mb-5">Tips</h4>
                {
                    !procedimiento?.tips ?
                        <span className='text-md text-gray-400'>Esta receta no cuenta con tips.</span> :
                        <ul className="list-disc pl-5 marker:text-logoGreen space-y-3 mb-5">
                        {
                            procedimiento?.tips.map(
                                tip => <li key = { tip }>{ tip }</li>
                            )
                        }
                        </ul>
                }
            </div>
        </div>
        <div className="flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

            <div className="p-6">
                <h4 className="text-lg text-logoGreen font-bold mb-5">Variantes</h4>
                {
                    !procedimiento?.variantes ?
                        <span className='text-md text-gray-400'>Esta receta no cuenta con variantes.</span> :
                        <ul className="list-disc pl-5 marker:text-logoGreen space-y-3 mb-5">
                        {
                            procedimiento?.variantes.map(
                                variante => <li key = { variante }>{ variante }</li>
                            )
                        }
                        </ul>
                }
            </div>
        </div>
    </div>
  )
}

export default TipsVariantesCol
