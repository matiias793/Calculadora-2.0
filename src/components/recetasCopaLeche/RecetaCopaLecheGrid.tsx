'use client'

import React, { useEffect, useState } from 'react'
import NavigationButtons from '../shared/NavigationButtons'
import { RecetaCopaLeche } from '@/models/RecetaCopaLeche'
import { useAppDispatch, useAppSelector } from '@/store'
import { setPorciones, setRecetaCopaLecheOriginal, setRecetaCopaLechePorciones } from '@/store/recetaCopaLeche/recetaCopaLecheSlice'
import PorcionesCopaLecheCard from './PorcionesCopaLecheCard'
import IngredientesCopaLecheCard from './IngredientesCopaLecheCard'
import UnidadesCopaLecheCard from './UnidadesCopaLecheCard'
import CopaAudioButton from './CopaAudioButton'
import { UnidadVolumen } from '@/utils/enums/unidad-volumen'
import { UnidadMasa } from '@/utils/enums/unidad-masa'
import { Receta } from '@/models/Receta'
import { FaShoppingBasket, FaTasks } from "react-icons/fa"

interface Props {
  receta: RecetaCopaLeche,
  opcion: string
}

const RecetaCopaLecheGrid = ({ receta, opcion }: Props) => {

  const dispatch = useAppDispatch();
  const unidadVolumen = useAppSelector((state) => state.recetaCopaLeche.unidadVolumen);
  const unidadMasa = useAppSelector((state) => state.recetaCopaLeche.unidadMasa);

  const recetaOriginal = useAppSelector((state) => state.recetaCopaLeche.recetaOriginal);
  const [tab, setTab] = useState(1);

  useEffect(
    () => {
      dispatch(setPorciones(1));
      dispatch(setRecetaCopaLecheOriginal(receta));
      //dispatch( setRecetaCopaLechePorciones( receta ) );
      const ingredients = receta!.ingredients.map(
        ({ name, quantity, unit }) => {
          let q: string | number = "";
          if (isNaN(Number(quantity))) {
            q = quantity;
          }
          else {
            if (['ml', 'l', 'g', 'kg'].includes(unit)) {

              if ((unit === 'ml' && unidadVolumen === UnidadVolumen.LITROS) || (unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS)) {

                q = Number(((Number(quantity) * 1) / 1000).toFixed(3));
              }
              else {
                q = Number(quantity) * 1;
              }

            }
            else {
              q = Number(quantity) * 1;
            }
          }
          let u = unit;
          if (unit === 'unidad' && (q != 1)) u = 'unid.';
          if (unit === 'ml' && unidadVolumen === UnidadVolumen.LITROS) u = 'l';
          if (unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS) u = 'kg';
          return {
            name,
            quantity: q,
            unit: u
          };
        }

      )
      const newReceta: Receta = {
        title: receta.title,
        ingredients
      }

      dispatch(setRecetaCopaLechePorciones(newReceta));
    },
    [dispatch, receta, unidadMasa, unidadVolumen]
  );

  const handleTabClick = (tabIndex: number) => {
    setTab(tabIndex);
  };

  return (
    <div className="mx-auto max-w-screen-xl w-full px-2 sm:px-4">
      <span className="font-bold text-3xl text-logoGreen text-center mt-5 w-full flex flex-col h-auto">
        <span className="flex flex-col items-start justify-start mb-4">
          <NavigationButtons />
        </span>
        <span className='text-center w-full'>
          {
            recetaOriginal ?
              recetaOriginal.title :
              receta.title
          }
        </span>
        <CopaAudioButton opcion={opcion} />
      </span>

      <div className="tabs flex flex-col w-full mt-7">
        <div className="relative flex flex-row items-center">
          <button className={`w-full md:w-[300px] h-16 px-2 md:px-4 flex flex-col md:flex-row justify-center items-center gap-1 relative py-2 ${tab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
            <FaShoppingBasket className='text-2xl md:text-3xl md:mr-2 text-primary font-bold' />
            <p className="text-xs md:text-lg text-primary font-bold">Ingredientes</p>
          </button>
          <button className={`w-full md:w-[300px] h-16 px-2 md:px-4 flex flex-col md:flex-row justify-center items-center gap-1 relative py-2 ${tab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
            <FaTasks className='text-xl md:mr-2 text-primary font-bold' />
            <p className="text-xs md:text-lg text-primary font-bold">Procedimiento</p>
          </button>
          <div role="indicator" className={`absolute left-0 bottom-0 transition-all duration-200 ease-in-out bg-primary w-1/2 md:w-[300px] h-0.5 rounded-t-full`} style={{ transform: `translateX(${tab === 1 ? '0%' : '100%'})` }}>
          </div>
        </div>
        <hr className="border-neutral-soft" />

        <div id="tab-1" role="tabpanel" className={`py-4 transition duration-400 ease-in-out ${tab === 1 ? 'block' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row my-10 gap-5 items-start mt-10">
            <div className="flex flex-col md:w-1/3 w-full gap-5">
              <PorcionesCopaLecheCard receta={receta} opcion={opcion} />
              <UnidadesCopaLecheCard />
            </div>
            <div className="flex flex-col md:w-2/3 w-full">
              <IngredientesCopaLecheCard />
            </div>
          </div>
        </div>

        <div id="tab-2" role="tabpanel" className={`py-4 transition duration-400 ease-in-out ${tab === 2 ? 'block' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row my-10 gap-5 items-start mt-10">
            <div className="w-full bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                <h3 className="text-xl font-bold text-green-800">Procedimiento</h3>
              </div>
              <div className="p-6">
                {receta.procedimiento ? (
                  <div className="prose prose-green max-w-none text-neutral-600">
                    <ul className="list-disc list-inside space-y-2">
                      {receta.procedimiento.map((paso, idx) => (
                        <li key={idx}>{paso}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="italic text-neutral-500">No hay procedimiento disponible para esta receta.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecetaCopaLecheGrid
