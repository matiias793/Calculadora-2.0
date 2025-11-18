'use client'

import React, { useEffect } from 'react'
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

interface Props {
    receta: RecetaCopaLeche,
    opcion: string
}

const RecetaCopaLecheGrid = ( { receta, opcion }: Props ) => {

  const dispatch = useAppDispatch();
  const unidadVolumen = useAppSelector( ( state ) => state.recetaCopaLeche.unidadVolumen );
  const unidadMasa = useAppSelector( ( state ) => state.recetaCopaLeche.unidadMasa );

  const recetaOriginal = useAppSelector( ( state ) => state.recetaCopaLeche.recetaOriginal );

  
  useEffect(
      () => {
        dispatch( setPorciones( 1 ) );
        dispatch( setRecetaCopaLecheOriginal( receta ) );
        //dispatch( setRecetaCopaLechePorciones( receta ) );
        const ingredients = receta!.ingredients.map(
            ( { name, quantity, unit } ) => {
                let q: string | number = "";
                if( isNaN(Number(quantity)) ) {
                    q = quantity;
                }
                else {
                    if( ['ml', 'l', 'g', 'kg'].includes( unit ) ) {
                        
                        if( ( unit === 'ml' && unidadVolumen === UnidadVolumen.LITROS ) || ( unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS ) ) {
                            
                            q = Number( ( ( Number( quantity ) * 1 ) / 1000 ).toFixed(3) );
                        }
                        else {                        
                            q = Number( quantity ) * 1;
                        }
                            
                    }
                    else {
                        q = Number( quantity ) * 1;
                    }            
                }
                let u = unit;
                if( unit === 'unidad' && ( q != 1 ) ) u = 'unid.';
                if( unit === 'ml' && unidadVolumen === UnidadVolumen.LITROS ) u = 'l';
                if( unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS ) u = 'kg';
                return {
                    name,
                    quantity:  q,
                    unit: u  
                };
            }
                
        )
        const newReceta: Receta = {
            title: receta.title,
            ingredients
        }
  
        dispatch( setRecetaCopaLechePorciones( newReceta ) );
    },
      [ dispatch, receta, unidadMasa, unidadVolumen ]
  );

  return (
    <div className="mx-auto max-w-screen-xl w-full">
        <span className="font-bold text-3xl text-logoGreen text-center mt-5 w-full flex flex-col h-auto">
          <span className="flex flex-col items-start justify-start mb-4">
            <NavigationButtons/>
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
        <div className="flex flex-col md:flex-row my-10 gap-5 items-start mt-10">
          <div className="flex flex-col md:w-1/3 w-full gap-5">
            <PorcionesCopaLecheCard receta = { receta } opcion = { opcion }/>
            <UnidadesCopaLecheCard />
          </div>
          <div className="flex flex-col md:w-2/3 w-full">
            <IngredientesCopaLecheCard />
          </div>
        </div>            
    </div>
  )
}

export default RecetaCopaLecheGrid
