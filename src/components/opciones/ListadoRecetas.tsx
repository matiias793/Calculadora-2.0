'use client'

import { opcionesDesayunosMeriendas } from "@/utils/opciones-desayunos-meriendas";
import { useEffect, useState } from "react"
import OptionCard from "../main/OptionCard";
import { FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store";
import { setPorciones } from "@/store/receta/recetaSlice";
import { setBusqueda } from "@/store/busqueda/busquedaSlice";

const ListadoRecetas = () => {

  const busqueda = useAppSelector( state => state.busqueda.search );
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState( busqueda ); 
  const [options, setOptions] = useState(opcionesDesayunosMeriendas);

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
        setOptions( opcionesDesayunosMeriendas );
        return;
    }

    const filteredOptions = opcionesDesayunosMeriendas.filter(
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
                    className="w-full backdrop-blur-sm bg-white text-black py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-logoGreen/20 focus:border-logoGreen transition-colors duration-300" 
                    placeholder="Nombre de la receta"
                    value = { search }
                    onChange={ handleChangeSearch }
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-logoGreen text-md"/>
                </div>
            </div>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-5 mt-10 w-full px-4">
            {
                options.map(
                    option => (
                        <OptionCard key = { option.title } {...option}></OptionCard>
                    )
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

export default ListadoRecetas
