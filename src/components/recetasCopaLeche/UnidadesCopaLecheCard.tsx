import { useAppDispatch } from '@/store';
import { setUnidadMasa, setUnidadVolumen } from '@/store/recetaCopaLeche/recetaCopaLecheSlice';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';
import React, { useEffect, useState } from 'react'

const UnidadesCopaLecheCard = () => {
      const [ volumen, setVolumen ] =  useState( UnidadVolumen.CENTIMETROS_CUBICOS );
      const [ masa, setMasa ] =  useState( UnidadMasa.GRAMOS );
  
      const dispatch = useAppDispatch();
  
      useEffect(
          () => {
              if (typeof window === "undefined") return;
          
              let unidadVolumen = UnidadVolumen.CENTIMETROS_CUBICOS;
              if( localStorage.getItem( "volumenCopaLeche" ) ) {
                if( localStorage.getItem( "volumenCopaLeche" ) === 'l' ) {
                    unidadVolumen = UnidadVolumen.LITROS
                    setVolumen( unidadVolumen );
                }
              }
          
                let unidadMasa = UnidadMasa.GRAMOS;
                if( localStorage.getItem( "masaCopaLeche" ) ) {
                  if( localStorage.getItem( "masaCopaLeche" ) === 'kg' ) {
                    unidadMasa = UnidadMasa.KILOGRAMOS
                    setMasa( unidadMasa );
                  }
                }
                dispatch( setUnidadVolumen( unidadVolumen ) );
                dispatch( setUnidadMasa( unidadMasa ) );
          },
          []
      )
  
      const handleChangeUnidadVolumen = ( unidad: UnidadVolumen ) => {
          setVolumen( unidad );
          dispatch( setUnidadVolumen( unidad ) );
          localStorage.setItem("volumenCopaLeche", unidad);
      } 
      
      const handleChangeUnidadMasa = ( unidad: UnidadMasa ) => {
          setMasa( unidad );
          dispatch( setUnidadMasa( unidad ) );
          localStorage.setItem("masaCopaLeche", unidad);
      } 
  
      return (
        <div className="overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-auto">
            <div className="p-6">
                <h4 className="text-lg text-logoGreen font-bold">Unidades</h4>
            </div>
            <div className="flex flex-col pl-6 pr-6 pb-4">
                <span className='text-md font-bold w-full'>Volumen</span>
                <div className="flex flex-row gap-6">
                  <div className="mt-2 flex flex-col gap-2">
                      <label className="flex items-center cursor-pointer">
                          <input
                              type="radio"
                              name="volumen"
                              value="ml"
                              checked={volumen === UnidadVolumen.CENTIMETROS_CUBICOS}
                              onChange={ () => handleChangeUnidadVolumen( UnidadVolumen.CENTIMETROS_CUBICOS ) }
                              className="hidden peer"
                          />
                          <div className="w-5 h-5 border-2 border-logoGreen rounded-full flex items-center justify-center peer-checked:bg-logoGreen">
                              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          </div>
                          <span className="text-gray-800 ml-3">Mililitros</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                          <input
                              type="radio"
                              name="volumen"
                              value="l"
                              checked={ volumen === UnidadVolumen.LITROS }
                              onChange={ () => handleChangeUnidadVolumen( UnidadVolumen.LITROS ) }
                              className="hidden peer"
                          />
                          <div className="w-5 h-5 border-2 border-logoGreen rounded-full flex items-center justify-center peer-checked:bg-logoGreen">
                              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          </div>
                          <span className="text-gray-800 ml-3">Litros</span>
                      </label>
                  </div>
                </div>
            </div>
            <div className="flex flex-col pl-6 pr-6 pb-8 pt-2">
                <span className='text-md font-bold w-full'>Masa</span>
                <div className="flex flex-row gap-6">
                  <div className="mt-2 flex flex-col gap-2">
                      <label className="flex items-center cursor-pointer">
                          <input
                              type="radio"
                              name="masa"
                              value="g"
                              checked={masa ===  UnidadMasa.GRAMOS}
                              onChange={() => handleChangeUnidadMasa( UnidadMasa.GRAMOS ) }
                              className="hidden peer"
                          />
                          <div className="w-5 h-5 border-2 border-logoGreen rounded-full flex items-center justify-center peer-checked:bg-logoGreen">
                              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          </div>
                          <span className="text-gray-800 ml-3">Gramos</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                          <input
                              type="radio"
                              name="masa"
                              value="kg"
                              checked={masa === UnidadMasa.KILOGRAMOS}
                              onChange={() => handleChangeUnidadMasa( UnidadMasa.KILOGRAMOS ) }
                              className="hidden peer"
                          />
                          <div className="w-5 h-5 border-2 border-logoGreen rounded-full flex items-center justify-center peer-checked:bg-logoGreen">
                              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          </div>
                          <span className="text-gray-800 ml-3">Kilogramos</span>
                      </label>
                  </div>
                </div>
            </div>
        </div>
      )
}

export default UnidadesCopaLecheCard
