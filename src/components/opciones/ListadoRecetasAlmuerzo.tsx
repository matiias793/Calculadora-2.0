'use client'
import { useAppDispatch, useAppSelector } from '@/store';
import { setBusqueda } from '@/store/busqueda/busquedaSlice';
import { setPorciones } from '@/store/receta/recetaSlice';
import { opcionesAlmuerzosCenas } from '@/utils/opciones-almuerzos-cenas';
import { recetasAlmuerzo } from '@/utils/recetas-almuerzo';
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import OptionCard from '../main/OptionCard';

const ListadoRecetasAlmuerzo = () => {
    const busqueda = useAppSelector( state => state.busqueda.search );
    const dispatch = useAppDispatch();
  
    const [search, setSearch] = useState( busqueda ); 
    const [options, setOptions] = useState(opcionesAlmuerzosCenas);
  
    useEffect(() => {
      dispatch(setPorciones(10));
      doFilter(busqueda);
    }, [dispatch, busqueda]);
    
  
    const handleChangeSearch = ( e: React.ChangeEvent<HTMLInputElement>) => { 
      const newValue = e.target.value;
      setSearch( newValue );  
      dispatch( setBusqueda( newValue ) );  
      doFilter( newValue );
    }
  
    const doFilter = ( word: string ) => {
      if( word === "" || word === null ) {
          setOptions( opcionesAlmuerzosCenas );
          return;
      }
  
      const filteredOptions = opcionesAlmuerzosCenas.filter(
          opcion => opcion.title.toLowerCase().includes( word.toLowerCase() )
      );
  
      setOptions(filteredOptions);
    }
  
    return (
      <>
          <div className="w-full flex justify-center xl:px-32 lg:px-32 md:px-20 px-3 mb-4 mt-7">
              <div className="relative w-full">
                  <input 
                      type="text" 
                      className="w-full backdrop-blur-sm bg-neutral-card text-neutral-text py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-primary/20 focus:border-primary transition-colors duration-300" 
                      placeholder="Nombre de la receta"
                      value = { search }
                      onChange={ handleChangeSearch }
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-primary text-md"/>
                  </div>
              </div>
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-10 mt-10 w-full px-4">
              {
                  options.map(
                      option => {
                          // Buscar la estación de la receta
                          const receta = Object.values(recetasAlmuerzo).find(r => r.title === option.title);
                          const estacion = receta?.estacion;
                          
                          // Formatear la estación de manera más corta y legible
                          let estacionFormateada: string | undefined;
                          if (estacion) {
                              if (estacion === 'TODO EL AÑO') {
                                  estacionFormateada = 'Todo el año';
                              } else if (estacion === 'OTOÑO-INVIERNO') {
                                  estacionFormateada = 'Otoño-Invierno';
                              } else if (estacion === 'PRIMAVERA-VERANO') {
                                  estacionFormateada = 'Primavera-Verano';
                              } else {
                                  estacionFormateada = estacion;
                              }
                          }
                          
                          return (
                              <OptionCard 
                                  key = { option.title } 
                                  {...option}
                                  subtitle={estacionFormateada}
                              ></OptionCard>
                          );
                      }
                  )
              }
              {
                  options.length === 0 &&
                  <span className="text-xl md:text-3xl text-gray-400 mt-10 text-center">No se encontraron resultados para su búsqueda</span>
              }
          </div>
      </>
    )
}

export default ListadoRecetasAlmuerzo
