'use client'

import { FaFilePdf } from 'react-icons/fa';
import { exportRecetaToPDF } from '@/utils/exportToPDF';
import { useAppSelector } from '@/store';
import { convertirFluidaAPolvo } from '@/utils/conversion-leche';
import { useState } from 'react';

// Wait, I don't see a UI lib import in the file. I'll use a standard HTML checkbox styled as a switch or just a button if I can't find a switch component.
// The user asked for a "Switch/Toggle". I'll check if there is a Switch component available or build a simple one.
// Looking at the file content, it uses tailwind classes.
// I will use a simple checkbox styled as a toggle for now to avoid dependency issues if I don't know the UI lib.
// Actually, I'll just use a styled button or input.


const IngredientesCard = () => {
  const recetaPorciones = useAppSelector((state) => state.receta.recetaPorciones);
  const porcionesTipo = useAppSelector((state) => state.receta.porcionesTipo);
  const [usarPolvo, setUsarPolvo] = useState(false);

  const totalPersonas = porcionesTipo.chica + porcionesTipo.mediana + porcionesTipo.grande;

  // Verificar si hay leche en los ingredientes
  const tieneLeche = recetaPorciones?.ingredients?.some(ing => {
    const nombre = ing.name.toLowerCase();
    return nombre === 'leche' || nombre === 'leche fluida';
  });

  return (
    <div className="w-full flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="p-6">
        <h4 className="text-lg text-logoGreen font-bold">
          Ingredientes (para {totalPersonas} {totalPersonas === 1 ? 'persona' : 'personas'})
        </h4>

        {tieneLeche && (
          <div className="mt-2 flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={usarPolvo}
                onChange={(e) => setUsarPolvo(e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900">🔄 Usar Leche en Polvo</span>
            </label>
          </div>
        )}

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
                ({ name, quantity, unit }) => {
                  const nombreNormalizado = name.toLowerCase();
                  const esLeche = nombreNormalizado === 'leche' || nombreNormalizado === 'leche fluida';

                  if (esLeche && usarPolvo) {
                    const cantidadNumerica = typeof quantity === 'number' ? quantity : parseFloat(quantity as string) || 0;
                    const { gramosPolvo, mlAgua } = convertirFluidaAPolvo(cantidadNumerica);
                    return (
                      <>
                        <tr className="bg-blue-50/50 hover:bg-blue-50" key={`${name}-polvo`}>
                          <td className="py-2 px-4 border-b border-grey-light text-blue-800">Leche en Polvo</td>
                          <td className="py-2 px-4 border-b border-grey-light text-left text-blue-800 font-medium">{gramosPolvo.toLocaleString()} g</td>
                        </tr>
                        <tr className="bg-blue-50/50 hover:bg-blue-50" key={`${name}-agua`}>
                          <td className="py-2 px-4 border-b border-grey-light text-blue-800">Agua</td>
                          <td className="py-2 px-4 border-b border-grey-light text-left text-blue-800 font-medium">{mlAgua.toLocaleString()} ml</td>
                        </tr>
                      </>
                    );
                  }

                  return (
                    <tr className="hover:bg-grey-lighter" key={name}>
                      <td className="py-2 px-4 border-b border-grey-light">{name}</td>
                      <td className="py-2 px-4 border-b border-grey-light text-left">{quantity.toLocaleString()} {unit}</td>
                    </tr>
                  );
                }
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
                recetaPorciones?.ingredients || [],
                recetaPorciones?.variants || [],
                usarPolvo
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
