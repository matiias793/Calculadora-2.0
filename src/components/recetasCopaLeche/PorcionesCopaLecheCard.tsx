import { Receta } from '@/models/Receta';
import { RecetaCopaLeche } from '@/models/RecetaCopaLeche';
import { Saborizante } from '@/models/Saborizante';
import { useAppDispatch, useAppSelector } from '@/store';
import { decrement, increment, setPorciones, setRecetaCopaLecheOriginal, setRecetaCopaLechePorciones } from '@/store/recetaCopaLeche/recetaCopaLecheSlice';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';
import { recetasLecheFluida } from '@/utils/recetas-leche-fluida';
import { recetasLecheEnPolvo } from '@/utils/recetas-leche-polvo';
import React, { useCallback, useEffect, useState } from 'react'

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

    const recalculate = useCallback((factor: number, recetaParam?: Receta | null) => {
      const baseReceta = recetaParam ?? recetaOriginal;
      if (!baseReceta) return;
      if (isNaN(factor) || factor < 0) {
        console.warn('Factor de cálculo inválido:', factor);
        return;
      }

      const ingredients = baseReceta.ingredients.map(({ name, quantity, unit }) => {
        let cantidad: string | number = "";
        let unidad = unit;

        if (isNaN(Number(quantity))) {
          cantidad = quantity;
        } else {
          const valor = Number(quantity);

          if (name.toLowerCase().includes('huevo') && unit === 'g') {
            cantidad = Number(((valor * factor) / 60).toFixed(3));
            unidad = 'unidad';
          } else if (name.toLowerCase().includes('yema') && unit === 'g') {
            cantidad = Number(((valor * factor) / 15).toFixed(3));
            unidad = 'unidad';
          } else if (['ml', 'l', 'g', 'kg'].includes(unit)) {
            if (unit === 'ml' && unidadVolumen === UnidadVolumen.LITROS) {
              cantidad = Number(((valor * factor) / 1000).toFixed(3));
              unidad = 'l';
            } else if (unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS) {
              cantidad = Number(((valor * factor) / 1000).toFixed(3));
              unidad = 'kg';
            } else {
              cantidad = Number((valor * factor).toFixed(3));
            }
          } else {
            cantidad = Number((valor * factor).toFixed(3));
          }
        }

        if (unidad === 'unidad' && Number(cantidad) !== 1) {
          unidad = 'unid.';
        }

        return {
          name,
          quantity: cantidad,
          unit: unidad
        };
      });

      dispatch(setRecetaCopaLechePorciones({
        title: baseReceta.title,
        ingredients
      }));
    }, [dispatch, recetaOriginal, unidadMasa, unidadVolumen]);

    useEffect(() => {
      if (!unidadVolumen || !unidadMasa || !recetaOriginal?.ingredients) return;
      recalculate(counter, recetaOriginal);
    }, [unidadVolumen, unidadMasa, recetaOriginal, counter, recalculate]);

    useEffect(() => {
      setCounter(porciones);
    }, [porciones]);
  
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

        const recetaSeleccionada: Receta = recetas[ Number( e.target.value ) as keyof typeof recetas ] as Receta;
        
        
        dispatch( setRecetaCopaLecheOriginal( recetaSeleccionada ) );
        recalculate( counter, recetaSeleccionada );
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
