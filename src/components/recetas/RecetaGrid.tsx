'use client'

import { Receta } from '@/models/Receta'
import React, { useEffect, useState } from 'react'
import PorcionesCard from './PorcionesCard'
import IngredientesCard from './IngredientesCard'
import { useAppDispatch, useAppSelector } from '../../store/index';
import { setPorciones, setProcedimiento, setRecetaOriginal, setRecetaPorciones } from '@/store/receta/recetaSlice'
import { FaShoppingBasket, FaTasks, FaVideo } from "react-icons/fa"
import ProcedimientoCard from './ProcedimientoCard'
import TipsVariantesCol from './TipsVariantesCol'
import { Procedimiento } from '@/models/Procedimiento'
import NavigationButtons from '../shared/NavigationButtons'
import VideosContainer from './VideosContainer'
import UnidadesCard from './UnidadesCard'
import { UnidadMasa } from '@/utils/enums/unidad-masa'
import { UnidadVolumen } from '@/utils/enums/unidad-volumen'
import RecipeAudioButton from './RecipeAudioButton'

interface Props {
    receta: Receta,
    procedimiento: Procedimiento,
    isAlmuerzo: boolean
}

const RecetaGrid = ( { receta, procedimiento, isAlmuerzo }: Props ) => {
    const dispatch = useAppDispatch();
    const unidadVolumen = useAppSelector( ( state ) => state.receta.unidadVolumen );
    const unidadMasa = useAppSelector( ( state ) => state.receta.unidadMasa );
    const [ tab, setTab ] = useState(1);

    useEffect(() => {
        dispatch( setPorciones( isAlmuerzo ? 1 : 10 ) );
        dispatch( setRecetaOriginal( receta ) );
        dispatch( setProcedimiento( procedimiento ) );

        const ingredients = receta!.ingredients.map(({ name, quantity, unit }) => {
            let q: string | number = "";
            if (isNaN(Number(quantity))) {
                q = quantity;
            } else {
        if (['ml', 'l', 'g', 'kg'].includes(unit)) {
            if ((unit === 'ml' && unidadVolumen === UnidadVolumen.LITROS) || (unit === "g" && unidadMasa === UnidadMasa.KILOGRAMOS)) {
                        q = Number(((Number(quantity) * 1) / 1000).toFixed(3));
                    } else {
                        q = Number(quantity) * 1;
                    }
                } else {
                    q = Number(quantity) * 1;
                }
            }
            let u = unit;
            if (unit === "unidad" && q != 1) u = "unid.";
            if (["ml", "ml"].includes(unit) && unidadVolumen === UnidadVolumen.LITROS) u = "l";
            if (unit === "g" && unidadMasa === UnidadMasa.KILOGRAMOS) u = "kg";
            return { name, quantity: q, unit: u };
        });

        const variants = receta?.variants?.map(({ name, quantity, unit }) => {
            let q: string | number = "";
            if (isNaN(Number(quantity))) {
                q = quantity;
            } else {
        if (['ml', 'l', 'g', 'kg'].includes(unit)) {
            if ((unit === 'ml' && unidadVolumen === UnidadVolumen.LITROS) || (unit === "g" && unidadMasa === UnidadMasa.KILOGRAMOS)) {
                        q = Number(((Number(quantity) * 1) / 1000).toFixed(3));
                    } else {
                        q = Number(quantity) * 1;
                    }
                } else {
                    q = Number(quantity) * 1;
                }
            }
            let u = unit;
            if (unit === "unidad" && q != 1) u = "unid.";
            if (["ml", "ml"].includes(unit) && unidadVolumen === UnidadVolumen.LITROS) u = "l";
            if (unit === "g" && unidadMasa === UnidadMasa.KILOGRAMOS) u = "kg";
            return { name, quantity: q, unit: u };
        });

        const newReceta: Receta = {
            title: receta!.title,
            ingredients
        };

        variants && (newReceta.variants = variants);
        dispatch(setRecetaPorciones(newReceta));
    }, [ isAlmuerzo, dispatch, receta, procedimiento, unidadMasa, unidadVolumen ]);

    const handleTabClick = (tabIndex: number) => {
        setTab(tabIndex);
    };

    const showAudioButton = receta.title.trim().toLowerCase() === 'bocaditos de pollo';

    return (
        <div className="mx-auto max-w-screen-xl w-full px-2 sm:px-4">
            <span className="font-bold text-2xl sm:text-3xl text-primary text-center mt-4 sm:mt-5 w-full flex flex-col h-auto">
                <span className="flex flex-col items-start justify-start mb-4">
                    <NavigationButtons />
                </span>
                <span className='text-center w-full'>
                    {receta.title}
                </span>
                {receta.estacion && (
                    <span className="text-sm sm:text-base font-normal text-neutral-text mt-2 text-center w-full">
                        Estación recomendada: <span className="font-semibold text-primary">{receta.estacion}</span>
                    </span>
                )}
                {showAudioButton && (
                    <RecipeAudioButton receta={receta} procedimiento={procedimiento} />
                )}
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
                    <button className={`w-full md:w-[300px] h-16 px-2 md:px-4 flex flex-col md:flex-row justify-center items-center gap-1 relative py-2 ${tab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>
                        <FaVideo className='text-2xl md:mr-2 text-primary font-bold' />
                        <p className="text-xs md:text-lg text-primary font-bold">Videos</p>
                    </button>
                    <div role="indicator" className={`absolute left-0 bottom-0 transition-all duration-200 ease-in-out bg-primary w-1/3 md:w-[300px] h-0.5 rounded-t-full`} style={{ transform: `translateX(${tab === 1 ? '0%' : tab === 2 ? '100%' : '200%'})` }}>
                    </div>
                </div>
                <hr className="border-neutral-soft" />
                <div id="tab-1" role="tabpanel" className={`py-4 transition duration-400 ease-in-out ${tab === 1 ? 'block' : 'hidden'}`}>
                    <div className="flex flex-col md:flex-row my-10 gap-5 items-start mt-10">
                        <div className="flex flex-col md:w-1/3 gap-5 w-full">
                            <PorcionesCard isAlmuerzo={isAlmuerzo} />
                            <UnidadesCard />
                        </div>
                        <div className="flex flex-col md:w-2/3 gap-5 w-full">
                            <IngredientesCard />
                        </div>
                    </div>
                </div>
                <div id="tab-2" role="tabpanel" className={`py-4 transition duration-400 ease-in-out ${tab === 2 ? 'block' : 'hidden'}`}>
                    <div className="flex flex-col md:flex-row my-10 gap-5 items-start mt-10">
                        <ProcedimientoCard />
                        <TipsVariantesCol />
                    </div>
                </div>
                <div id="tab-3" role="tabpanel" className={`py-4 transition duration-400 ease-in-out ${tab === 3 ? 'block' : 'hidden'}`}>
                    <div className="flex flex-col md:flex-row my-10 gap-5 items-start mt-10">
                        <VideosContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecetaGrid;
