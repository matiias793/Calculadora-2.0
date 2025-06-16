'use client'

import { FaFilePdf } from 'react-icons/fa';
import { exportRecetaToPDF } from '@/utils/exportToPDF';
import { useAppSelector } from '@/store';

const IngredientesCard = () => {
  const porciones = useAppSelector((state) => state.receta.porciones);
  const recetaPorciones = useAppSelector((state) => state.receta.recetaPorciones);
  const porcionesTipo = useAppSelector((state) => state.receta.porcionesTipo); // ✅ Agregado

  return (
    <div className="w-full flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="p-6">
        <h4 className="text-lg text-logoGreen font-bold">
          Ingredientes (para {porciones} {porciones === 1 ? 'persona' : 'personas'})
        </h4>
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
                ({ name, quantity, unit }) => (
                  <tr className="hover:bg-grey-lighter" key={name}>
                    <td className="py-2 px-4 border-b border-grey-light">{name}</td>
                    <td className="py-2 px-4 border-b border-grey-light text-left">{quantity.toLocaleString()} {unit}</td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>

        {
          recetaPorciones?.variants &&
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
                  recetaPorciones.variants.map(
                    ({ name, quantity, unit }) => (
                      <tr className="hover:bg-grey-lighter" key={name}>
                        <td className="py-2 px-4 border-b border-grey-light">{name}</td>
                        <td className="py-2 px-4 border-b border-grey-light text-left">{quantity.toLocaleString()} {unit}</td>
                      </tr>
                    )
                  )
                }
              </tbody>
            </table>
          </>
        }

        {/* BOTÓN DE EXPORTAR PDF */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() =>
              exportRecetaToPDF(
                recetaPorciones?.title || 'Receta',
                {
                  chica: porcionesTipo.chica,
                  mediana: porcionesTipo.mediana,
                  grande: porcionesTipo.grande
                },
                recetaPorciones?.ingredients || []
              )
            }
            className="flex items-center gap-2 bg-logoGreen hover:bg-logoGreenHover text-white font-bold py-2 px-4 rounded"
          >
            <FaFilePdf className="text-white" />
            Exportar PDF
          </button>
        </div>

      </div>
    </div>
  );
};

export default IngredientesCard;
