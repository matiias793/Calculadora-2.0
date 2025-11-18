import { Receta } from '@/models/Receta';
import { RecetaCopaLeche } from '@/models/RecetaCopaLeche';
import { Saborizante } from '@/models/Saborizante';
import { useAppDispatch, useAppSelector } from '@/store';
import { setPorciones, setRecetaCopaLecheOriginal, setRecetaCopaLechePorciones } from '@/store/recetaCopaLeche/recetaCopaLecheSlice';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';
import { recetasLecheFluida } from '@/utils/recetas-leche-fluida';
import { recetasLecheEnPolvo } from '@/utils/recetas-leche-polvo';
import { saborizantesCopaLeche } from '@/utils/saborizantes';
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

    const buttonClasses = "bg-primary hover:bg-primary-hover text-white font-bold w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-transform duration-150 shadow-sm active:scale-95 disabled:bg-primary/40 disabled:cursor-not-allowed";

    const MIN_PORCIONES = 1;
    const MAX_PORCIONES = 1000;

    const validateAndLimit = (value: number): number => {
      if (isNaN(value) || value < MIN_PORCIONES) return MIN_PORCIONES;
      if (value > MAX_PORCIONES) return MAX_PORCIONES;
      return Math.round(value);
    };

    const recalculate = useCallback((factor: number, recetaParam?: Receta | null) => {
      const baseReceta = recetaParam ?? recetaOriginal;
      if (!baseReceta) return;
      if (isNaN(factor) || factor < MIN_PORCIONES) {
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
      const rawValue = e.target.value.replace(/^0+/, '');
      const parsedValue = rawValue === '' ? MIN_PORCIONES : Number(rawValue);
      if (isNaN(parsedValue)) {
        return;
      }
      const validatedValue = validateAndLimit(parsedValue);
      setCounter(validatedValue);
      dispatch(setPorciones(validatedValue));
      recalculate(validatedValue, recetaOriginal ?? receta);
    };
  
    const handleDecrement = () => {
      const newValue = validateAndLimit(counter - 1);
      setCounter(newValue);
      dispatch(setPorciones(newValue));
      recalculate(newValue, recetaOriginal ?? receta);
    };
  
    const handleIncrement = () => {
      const newValue = validateAndLimit(counter + 1);
      setCounter(newValue);
      dispatch(setPorciones(newValue));
      recalculate(newValue, recetaOriginal ?? receta);
    };

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
                            saborizantesCopaLeche.map(
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
                    <button className={buttonClasses}
                        onClick={ handleDecrement }
                        disabled={ counter <= MIN_PORCIONES }>
                        -
                    </button>
                    <input
                        type="tel"
                        name="porciones"
                        value = { counter }
                        onChange={ handlePorcionesChange }
                        className="py-1 text-xl text-center w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-logoGreen border-gray-200"
                        min={MIN_PORCIONES}
                        max={MAX_PORCIONES}
                    />                
                    <button className={buttonClasses}
                        onClick={ handleIncrement }
                        disabled={ counter >= MAX_PORCIONES }>
                        +
                    </button>
            
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Mínimo: {MIN_PORCIONES}, Máximo: {MAX_PORCIONES}
                </p>
            </div>
        </div>
    </div> )
}

export default PorcionesCopaLecheCard
