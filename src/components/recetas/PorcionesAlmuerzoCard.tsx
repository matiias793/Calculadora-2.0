import { Receta } from '@/models/Receta';
import { Tamanio } from '@/models/Tamanio';
import { useAppDispatch, useAppSelector } from '@/store';
import { decrement, increment, setPorciones, setRecetaPorciones } from '@/store/receta/recetaSlice';
import { TamanioEnum } from '@/utils/enums/tamanio';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';
import React, { useCallback, useEffect, useState } from 'react'

const PorcionesAlmuerzoCard = () => {
    const porciones = useAppSelector( ( state ) => state.receta.porciones );
    const recetaOriginal = useAppSelector( ( state ) => state.receta.recetaOriginal );
    const unidadVolumen = useAppSelector( ( state ) => state.receta.unidadVolumen );
    const unidadMasa = useAppSelector( ( state ) => state.receta.unidadMasa );
    const dispatch = useAppDispatch();
  
    const [ counter, setCounter ] = useState( porciones );
    const [ tamanio, setTamanio ] = useState( TamanioEnum.MEDIANA );
  
    // Constantes para cálculos precisos
    const MAX_PORCIONES = 1000;
    const MIN_PORCIONES = 1;
    const FACTOR_CHICA = 0.67; // 1 - 0.33
    const FACTOR_GRANDE = 1.33; // 1 + 0.33
  
    const tamanios: Tamanio[] = [
      { tamanio: TamanioEnum.CHICA },
      { tamanio: TamanioEnum.MEDIANA },
      { tamanio: TamanioEnum.GRANDE },
    ]

    // Función para validar y limitar valores
    const validateAndLimit = (value: number): number => {
      if (isNaN(value) || value < MIN_PORCIONES) return MIN_PORCIONES;
      if (value > MAX_PORCIONES) return MAX_PORCIONES;
      return Math.round(value);
    };

    // Función para calcular factor de tamaño
    const getTamanioFactor = (tamanio: TamanioEnum): number => {
      switch (tamanio) {
        case TamanioEnum.CHICA:
          return FACTOR_CHICA;
        case TamanioEnum.GRANDE:
          return FACTOR_GRANDE;
        default:
          return 1; // MEDIANA
      }
    };
  
    const processIngredient = useCallback((
      name: string,
      quantity: string | number,
      unit: string,
      factor: number
    ) => {
      let q: string | number = "";
      let u = unit;

      if (isNaN(Number(quantity))) {
        q = quantity;
      } else {
        const numQuantity = Number(quantity);

        if (name.toLowerCase().includes('huevo') && unit === 'g') {
          q = parseFloat(((numQuantity * factor) / 60).toFixed(3));
          u = 'unidad';
        } else if (name.toLowerCase().includes('yema') && unit === 'g') {
          q = parseFloat(((numQuantity * factor) / 15).toFixed(3));
          u = 'unidad';
        } else if (['ml', 'l', 'g', 'kg'].includes(unit)) {
          if ((unit === 'ml' && unidadVolumen === UnidadVolumen.LITROS) ||
              (unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS)) {
            q = parseFloat(((numQuantity * factor) / 1000).toFixed(3));
          } else {
            q = parseFloat((numQuantity * factor).toFixed(3));
          }
        } else {
          q = parseFloat((numQuantity * factor).toFixed(3));
        }

        const tamanioFactor = getTamanioFactor(tamanio);
        if (!isNaN(Number(q))) {
          q = parseFloat((Number(q) * tamanioFactor).toFixed(3));
        }
      }

      if (unit === 'unidad' && Number(q) !== 1) u = 'unid.';
      if (unit === 'ml' && unidadVolumen === UnidadVolumen.LITROS) u = 'l';
      if (unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS) u = 'kg';

      return { name, quantity: q, unit: u };
    }, [tamanio, unidadMasa, unidadVolumen]);

    const recalculate = useCallback((factor: number) => {
      if (!recetaOriginal || !recetaOriginal.ingredients) {
        console.warn('Receta original no disponible para recalcular');
        return;
      }

      if (isNaN(factor) || factor < 0) {
        console.warn('Factor de cálculo inválido:', factor);
        return;
      }

      const ingredients = recetaOriginal.ingredients.map(
        ({ name, quantity, unit }) => processIngredient(name, quantity, unit, factor)
      );

      const variants = recetaOriginal?.variants?.map(
        ({ name, quantity, unit }) => processIngredient(name, quantity, unit, factor)
      );

      const newReceta: Receta = {
        title: recetaOriginal.title,
        ingredients
      };

      if (variants) newReceta.variants = variants;

      dispatch(setRecetaPorciones(newReceta));
    }, [dispatch, processIngredient, recetaOriginal]);

    useEffect(() => {
      if (!unidadVolumen || !unidadMasa || !recetaOriginal?.ingredients) return;
      recalculate(counter);
    }, [tamanio, unidadVolumen, unidadMasa, recetaOriginal, counter, recalculate]);

    useEffect(() => {
      setCounter( porciones )
    }, [porciones])
  
    const handlePorcionesChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      const parsedValue = value.length == 0 ? MIN_PORCIONES : Number( value );
      if ( isNaN( parsedValue ) ) {
          return;
      }
      else {
          const validatedValue = validateAndLimit(parsedValue);
          setCounter( validatedValue );
          dispatch( setPorciones( validatedValue ) );
          recalculate( validatedValue );
      }
    }
  
    const handleDecrement = () => {
      const newValue = validateAndLimit(counter - 1);
      setCounter( newValue );
      dispatch( decrement( 1 ) );
      recalculate( newValue );
    }
  
    const handleIncrement = () => {
      const newValue = validateAndLimit(counter + 1);
      setCounter( newValue );
      dispatch( increment( 1 ) );
      recalculate( newValue );
    }
  
    const handleTamanioChange = ( e: React.ChangeEvent<HTMLSelectElement>) => {
      setTamanio( e.target.value as TamanioEnum );  
    }
  
    return (
      <div className="flex-col w-full flex gap-5">
  
          <div className="p-6 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-auto">
              <h4 className="text-lg text-logoGreen font-bold">Cantidad de porciones</h4>
              <div className="flex flex-row gap-5 mt-7 mb-7">
                  <button 
                    className="bg-logoGreen hover:bg-logoGreenHover disabled:bg-logoGreenDisabled text-white font-bold py-2 px-4 rounded"
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
                  <button 
                    className="bg-logoGreen hover:bg-logoGreenHover disabled:bg-logoGreenDisabled text-white font-bold py-2 px-4 rounded"
                    onClick={ handleIncrement }
                    disabled={ counter >= MAX_PORCIONES }>
                      +
                  </button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Mínimo: {MIN_PORCIONES}, Máximo: {MAX_PORCIONES}
              </p>
          </div>

          <div className="p-6 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-auto">
              <h4 className="text-lg text-logoGreen font-bold">Tamaño de porciones</h4>
              <div className="flex flex-row gap-5 mt-7 mb-7 w-full">
                  <select 
                      className="bg-gray-50 border border-gray-300 w-full px-3 py-3 rounded-lg"
                      defaultValue={ tamanio }
                      onChange={ handleTamanioChange }
                  >
                      {
                          tamanios.map(
                              ( { tamanio } ) => 
                                  <option 
                                      key = { tamanio } 
                                      value={ tamanio }
                                  >
                                      { tamanio }
                                  </option>
                          )
                      }
                  </select>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Factor de tamaño actual:</strong> {getTamanioFactor(tamanio)}x
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {tamanio === TamanioEnum.CHICA && 'Porciones más pequeñas (67% del tamaño mediano)'}
                  {tamanio === TamanioEnum.MEDIANA && 'Porciones de tamaño estándar'}
                  {tamanio === TamanioEnum.GRANDE && 'Porciones más grandes (133% del tamaño mediano)'}
                </p>
              </div>
          </div>
      </div>
    )
}

export default PorcionesAlmuerzoCard
