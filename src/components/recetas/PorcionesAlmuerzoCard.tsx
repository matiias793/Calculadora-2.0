import { Receta } from '@/models/Receta';
import { Tamanio } from '@/models/Tamanio';
import { useAppDispatch, useAppSelector } from '@/store';
import { decrement, increment, setPorciones, setRecetaPorciones } from '@/store/receta/recetaSlice';
import { TamanioEnum } from '@/utils/enums/tamanio';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';
import React, { useEffect, useState } from 'react'

const PorcionesAlmuerzoCard = () => {
    const porciones = useAppSelector( ( state ) => state.receta.porciones );
    const recetaOriginal = useAppSelector( ( state ) => state.receta.recetaOriginal );
    const unidadVolumen = useAppSelector( ( state ) => state.receta.unidadVolumen );
    const unidadMasa = useAppSelector( ( state ) => state.receta.unidadMasa );
    const dispatch = useAppDispatch();
  
    const [ counter, setCounter ] = useState( porciones );
    const [ tamanio, setTamanio ] = useState( TamanioEnum.MEDIANA );
  
    const tamanios: Tamanio[] = [
      { tamanio: TamanioEnum.CHICA },
      { tamanio: TamanioEnum.MEDIANA },
      { tamanio: TamanioEnum.GRANDE },
    ]
  
    useEffect(() => {
      if (!unidadVolumen || !unidadMasa || !recetaOriginal || !recetaOriginal.ingredients) return;
      recalculate(counter);
    }, [tamanio]);

    useEffect(() => {
      setCounter( porciones )
    }, [porciones])
  
    const handlePorcionesChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      const parsedValue = value.length == 0 ? 0: Number( value );
      if ( isNaN( parsedValue ) ) {
          return;
      }
      else {
          setCounter( Number( parsedValue ) );
          dispatch( setPorciones( parsedValue ) );
          recalculate( parsedValue );
      }
  
    }
  
    useEffect(() => {
      if (!unidadVolumen || !unidadMasa || !recetaOriginal || !recetaOriginal.ingredients) return;
      recalculate(counter, true);
    }, [unidadVolumen, unidadMasa]);
  
    const handleDecrement = () => {
      setCounter( counter - 1 );
      dispatch( decrement( 1 ) );
      recalculate( counter - 1 );
    }
  
    const handleIncrement = () => {
      setCounter( counter + 1 );
      dispatch( increment( 1 ) );
      recalculate( counter + 1 );
    }
  
    const recalculate = ( factor: number, changeUnit: boolean = false ) => {  
              
      const ingredients = recetaOriginal!.ingredients.map(
          ( { name, quantity, unit } ) => {
              let q: string | number = "";
              if( isNaN(Number(quantity)) ) {
                  q = quantity;
              }
              else {
                  if( ['cm3', 'ml', 'l', 'g', 'kg'].includes( unit ) ) {
                      
                      if( [ 'cm3', 'ml' ].includes( unit ) && unidadVolumen === UnidadVolumen.LITROS || unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS ) {
                          
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
              if( [ 'cm3', 'ml' ].includes( unit ) && unidadVolumen === UnidadVolumen.LITROS ) u = 'l';
              if( unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS ) u = 'kg';
              if( !isNaN( Number( q ) ) ) {
                  let thirtyThree = Number( q ) * 0.33;
                  if( tamanio === TamanioEnum.CHICA ) q = Number( ( Number( q ) - thirtyThree ).toFixed(3) );
                  if( tamanio === TamanioEnum.GRANDE ) q = Number( ( Number( q ) + thirtyThree ).toFixed(3) );
              }
              
              return {
                  name,
                  quantity:  q,
                  unit: u  
              };
          }
              
      )
  
      const variants = recetaOriginal?.variants?.map(
          ( { name, quantity, unit } ) => {
              let q: string | number = "";
              if( isNaN(Number(quantity)) ) {
                  q = quantity;
              }
              else {
                  if( ['cm3', 'ml', 'l', 'g', 'kg'].includes( unit ) ) {
                      
                      if( [ 'cm3', 'ml' ].includes( unit ) && unidadVolumen === UnidadVolumen.LITROS && unidadVolumen === UnidadVolumen.LITROS || unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS ) {
                          
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
              if( [ 'cm3', 'ml' ].includes( unit ) && unidadVolumen === UnidadVolumen.LITROS ) u = 'l';
              if( unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS ) u = 'kg';
              if( !isNaN( Number( q ) ) ) {
                  let thirtyThree = Number( q ) * 0.33;
                  if( tamanio === TamanioEnum.CHICA ) q = Number( ( Number( q ) - thirtyThree ).toFixed(3) );
                  if( tamanio === TamanioEnum.GRANDE ) q = Number( ( Number( q ) + thirtyThree ).toFixed(3) );
              }
              return {
                  name,
                  quantity: q,
                  unit: u  
              };
          }
              
      )
      
      const newReceta: Receta = {
          title: recetaOriginal!.title,
          ingredients
      }
  
      variants && ( newReceta.variants = variants );
  
      dispatch( setRecetaPorciones( newReceta ) );
      
    }
  
    const handleTamanioChange = ( e: React.ChangeEvent<HTMLSelectElement>) => {
      setTamanio( e.target.value as TamanioEnum );  
    }
  
    return (
      <div className="flex-col w-full flex gap-5">
  
          <div className="p-6 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-auto">
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
          </div>
      </div>
    )
}

export default PorcionesAlmuerzoCard
