import { Receta } from '@/models/Receta';
import { RecetaCopaLeche } from '@/models/RecetaCopaLeche';
import { Saborizante } from '@/models/Saborizante';
import { useAppDispatch, useAppSelector } from '@/store';
import { decrement, increment, setPorciones, setRecetaCopaLecheOriginal, setRecetaCopaLechePorciones } from '@/store/recetaCopaLeche/recetaCopaLecheSlice';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';
import { recetasLecheFluida } from '@/utils/recetas-leche-fluida';
import { recetasLecheEnPolvo } from '@/utils/recetas-leche-polvo';
import React, { useEffect, useState } from 'react'

const PorcionesCopaLecheCard = (
    {
        receta,
        opcion
    }:
    {
        receta: Receta,
        opcion: string
    }
) => {
    const porciones = useAppSelector( ( state ) => state.recetaCopaLeche.porciones );
    const recetaOriginal = useAppSelector( ( state ) => state.recetaCopaLeche.recetaOriginal );
    const unidadVolumen = useAppSelector( ( state ) => state.recetaCopaLeche.unidadVolumen );
    const unidadMasa = useAppSelector( ( state ) => state.recetaCopaLeche.unidadMasa );
    const dispatch = useAppDispatch();
  
    const [ counter, setCounter ] = useState( porciones );
    const [ saborizante, setSaborizante ] = useState( '1' );

    useEffect(() => {
      if (!unidadVolumen || !unidadMasa || !recetaOriginal || !recetaOriginal.ingredients) return;
      recalculate(counter, recetaOriginal, true);
    }, [unidadVolumen, unidadMasa]);
  
    const handlePorcionesChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      const parsedValue = value.length == 0 ? 0: Number( value );
      if ( isNaN( parsedValue ) ) {
          return;
      }
      else {
          setCounter( Number( parsedValue ) );
          dispatch( setPorciones( parsedValue ) );
          recalculate( parsedValue, recetaOriginal! );
      }
  
    }
  
    const handleDecrement = () => {
      setCounter( counter - 1 );
      dispatch( decrement() );
      recalculate( ( counter - 1 ), recetaOriginal! );
    }
  
    const handleIncrement = () => {
      setCounter( counter + 1 );
      dispatch( increment() );
      recalculate( ( counter + 1 ), recetaOriginal! );
    }

    const opciones: Saborizante[] = [
        {
            id: '1',
            nombre: 'Cocoa'
        },
        {
            id: '2',
            nombre: 'Cebada instantánea'
        },
        {
            id: '3',
            nombre: 'Vainilla'
        },
    ]

    const handleSaborizanteChange = ( e: React.ChangeEvent<HTMLSelectElement>) => {
        setSaborizante( e.target.value );
        
        const recetas = opcion === '1' ? recetasLecheEnPolvo : recetasLecheFluida;

        const receta: Receta = recetas[ Number( e.target.value ) as keyof typeof recetas ] as Receta;
        
        
        dispatch( setRecetaCopaLecheOriginal( receta ) );
        recalculate( counter, receta );
    }
  
    const recalculate = ( factor: number, receta: Receta, changeUnit: boolean = false ) => {   
        
        const ingredients = receta.ingredients.map(
            ( { name, quantity, unit } ) => {
                let q: string | number = "";
                if( isNaN(Number(quantity)) ) {
                    q = quantity;
                }
                else {
                    // Conversión especial para huevos y yemas
                    if( name.toLowerCase().includes('huevo') && unit === 'g' ) {
                        q = Number( ( ( Number( quantity ) * factor ) / 60 ).toFixed(3) );
                        unit = 'unidad';
                    } else if( name.toLowerCase().includes('yema') && unit === 'g' ) {
                        q = Number( ( ( Number( quantity ) * factor ) / 15 ).toFixed(3) );
                        unit = 'unidad';
                    } else if( ['ml', 'l', 'g', 'kg'].includes( unit ) ) {
                        
                        if( ( unit === 'ml' && unidadVolumen === UnidadVolumen.LITROS ) || ( unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS ) ) {
                                                        
                            q = Number( ( ( Number( quantity ) * factor ) / 1000 ).toFixed(3) );
                        }
                        else {                        
                            q = Number( quantity ) * factor;
                        }
                            
                    }
                    else {
                        q = Number( quantity ) * factor;
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
      
    }
  
    return (
      <div className="flex flex-col w-full">

        <div className="overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-auto mb-7">
            <div className="p-6">
                <h4 className="text-lg text-logoGreen font-bold">Saborizante</h4>
                <div className="flex flex-row gap-5 mt-7 mb-7 w-full">
                    <select 
                        className="bg-gray-50 border border-gray-300 w-full px-3 py-3 rounded-lg"
                        onChange={handleSaborizanteChange}
                    >
                        {
                            opciones.map(
                                ( { id, nombre } ) => 
                                    <option 
                                        key = { id } 
                                        value={ id }
                                    >
                                        { nombre }
                                    </option>
                            )
                        }
                    </select>
                </div>
            </div>
        </div>

        <div className="flex flex-row overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-auto">
            <div className="p-6">
                <h4 className="text-lg text-logoGreen font-bold">Cantidad de porciones</h4>
                <div className="flex flex-row gap-5 mt-7 mb-7">
                    <button className="bg-logoGreen hover:bg-logoGreenHover disabled:bg-logoGreenDisabled text-white font-bold py-2 px-4 rounded"
                        onClick={ handleDecrement }
                        disabled={ porciones <= 1 }>
                        -
                    </button>
                    <input
                        type="tel"
                        name="porciones"
                        value = { counter }
                        onChange={ handlePorcionesChange }
                        className="py-1 text-xl text-center w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-logoGreen border-gray-200"
                    />                
                    <button className="bg-logoGreen hover:bg-logoGreenHover text-white font-bold py-2 px-4 rounded"
                        onClick={ handleIncrement }>
                        +
                    </button>
            
                </div>
            </div>
        </div>
    </div> )
}

export default PorcionesCopaLecheCard
