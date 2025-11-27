'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPlanificacionPorFecha } from '@/data/planificacion-verano';
import { recetasAlmuerzo } from '@/utils/recetas-almuerzo';
import { procedimientosAlmuerzo } from '@/utils/procedimientos-almuerzo';
import { recetasDesayuno } from '@/data/recetas-desayuno';
import NavigationButtons from '@/components/shared/NavigationButtons';
import { Users, ChefHat, Coffee, Utensils, AlertCircle } from 'lucide-react';
import { FaShoppingBasket, FaTasks } from "react-icons/fa";

export default function DetalleDiaPage() {
    const params = useParams();
    const router = useRouter();

    // Handle potential undefined or array params safely
    const rawFecha = params?.fecha;
    const fecha = typeof rawFecha === 'string' ? decodeURIComponent(rawFecha) : '';

    // Fetch data synchronously, but only if we have a valid date string
    let diaPlan = fecha ? getPlanificacionPorFecha(fecha) : null;

    // Fallback: Try to parse date if not found (e.g. if passed as full date string)
    if (!diaPlan && fecha) {
        try {
            const parsedDate = new Date(fecha);
            if (!isNaN(parsedDate.getTime())) {
                const year = parsedDate.getFullYear();
                const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
                const day = String(parsedDate.getDate()).padStart(2, '0');
                const fechaIso = `${year}-${month}-${day}`;
                diaPlan = getPlanificacionPorFecha(fechaIso);
            }
        } catch (e) {
            // Ignore parsing errors
        }
    }

    const [comensales, setComensales] = useState<number>(100);
    const [tab, setTab] = useState(1);

    // If we don't have a date yet (params loading), show loading
    if (!fecha) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-neutral-600">Cargando...</h2>
                </div>
            </div>
        );
    }

    // If we have a date but no plan, show error
    if (!diaPlan) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-neutral-600">Fecha no válida o fuera de rango</h2>
                    <p className="text-neutral-500 mt-2">Fecha solicitada: {fecha}</p>
                    <button onClick={() => router.push('/escuelas-verano')} className="mt-4 text-green-600 hover:underline">
                        Volver al calendario
                    </button>
                </div>
            </div>
        );
    }

    const almuerzoId = Number(diaPlan.idRecetaAlmuerzo);
    const recetaAlmuerzo = recetasAlmuerzo[almuerzoId as keyof typeof recetasAlmuerzo];
    const procedimientoAlmuerzoData = procedimientosAlmuerzo[almuerzoId as keyof typeof procedimientosAlmuerzo];
    // Tomamos la primera opción por defecto si hay varias
    const pasosAlmuerzo = procedimientoAlmuerzoData?.opciones?.[0]?.pasos;

    const recetaDesayuno = recetasDesayuno[diaPlan.idRecetaDesayuno];
    const copaLeche = recetasDesayuno['copa-leche'];

    const calcularCantidad = (cantidadBase: number | string) => {
        if (typeof cantidadBase === 'string') return cantidadBase; // "C/N" o similar
        return (cantidadBase * comensales).toLocaleString('es-ES', { maximumFractionDigits: 2 });
    };

    const calcularCopaLeche = () => {
        // 20g leche, 180ml agua por niño (según nueva especificación)
        const lecheKg = (20 * comensales) / 1000;
        const aguaLitros = (180 * comensales) / 1000;
        return { lecheKg, aguaLitros };
    };

    const totalesCopa = calcularCopaLeche();

    const handleTabClick = (tabIndex: number) => {
        setTab(tabIndex);
    };

    return (
        <div className="min-h-screen bg-neutral-50 pb-12">
            <div className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <NavigationButtons />
                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                        <div>
                            <h1 className="text-2xl font-bold text-neutral-900 capitalize">
                                {diaPlan.fechaDisplay}
                            </h1>
                            <p className="text-neutral-500 text-sm">Cálculo de insumos diarios</p>
                        </div>

                        <div className="mt-4 md:mt-0 bg-green-50 p-4 rounded-xl border border-green-100 flex items-center shadow-sm">
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                                <Users className="w-6 h-6 text-green-700" />
                            </div>
                            <div>
                                <label htmlFor="comensales" className="block text-xs font-bold text-green-800 uppercase tracking-wide mb-1">
                                    Comensales
                                </label>
                                <input
                                    type="number"
                                    id="comensales"
                                    min="0"
                                    value={comensales}
                                    onChange={(e) => setComensales(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="block w-32 rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-lg font-bold text-green-900"
                                />
                                <div className="flex gap-2 mt-2">
                                    {[50, 75, 100].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => setComensales(val)}
                                            className="px-2 py-1 text-xs font-bold bg-white border border-green-200 text-green-700 rounded hover:bg-green-50 transition-colors"
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* TABS NAVIGATION */}
                <div className="tabs flex flex-col w-full mt-7 mb-8">
                    <div className="relative flex flex-row items-center">
                        <button className={`w-full md:w-[300px] h-16 px-2 md:px-4 flex flex-col md:flex-row justify-center items-center gap-1 relative py-2 ${tab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
                            <FaShoppingBasket className='text-2xl md:text-3xl md:mr-2 text-primary font-bold' />
                            <p className="text-xs md:text-lg text-primary font-bold">Ingredientes</p>
                        </button>
                        <button className={`w-full md:w-[300px] h-16 px-2 md:px-4 flex flex-col md:flex-row justify-center items-center gap-1 relative py-2 ${tab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
                            <FaTasks className='text-xl md:mr-2 text-primary font-bold' />
                            <p className="text-xs md:text-lg text-primary font-bold">Procedimiento</p>
                        </button>
                        <div role="indicator" className={`absolute left-0 bottom-0 transition-all duration-200 ease-in-out bg-primary w-1/2 md:w-[300px] h-0.5 rounded-t-full`} style={{ transform: `translateX(${tab === 1 ? '0%' : '100%'})` }}>
                        </div>
                    </div>
                    <hr className="border-neutral-soft" />
                </div>

                {/* TAB 1: INGREDIENTES */}
                <div className={`transition duration-400 ease-in-out ${tab === 1 ? 'block' : 'hidden'} space-y-8`}>
                    {/* SECCIÓN DESAYUNO */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="bg-orange-100 p-2 rounded-lg mr-3">
                                <Coffee className="w-6 h-6 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-800">Desayuno</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tarjeta Copa de Leche */}
                            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                                <div className="bg-orange-50 px-6 py-3 border-b border-orange-100">
                                    <h3 className="font-bold text-orange-800">Copa de Leche</h3>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center">
                                        <div className="text-center w-1/2 border-r border-neutral-100">
                                            <span className="block text-3xl font-bold text-neutral-800">{totalesCopa.lecheKg.toLocaleString()}</span>
                                            <span className="text-sm text-neutral-500 font-medium">kg Leche en Polvo</span>
                                        </div>
                                        <div className="text-center w-1/2">
                                            <span className="block text-3xl font-bold text-neutral-800">{totalesCopa.aguaLitros.toLocaleString()}</span>
                                            <span className="text-sm text-neutral-500 font-medium">Litros de Agua</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta Sólido (Receta Variable) */}
                            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                                <div className="bg-orange-50 px-6 py-3 border-b border-orange-100 flex justify-between items-center">
                                    <h3 className="font-bold text-orange-800">{recetaDesayuno.title}</h3>
                                </div>
                                <div className="p-6">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="text-left text-neutral-500 border-b border-neutral-100">
                                                <th className="pb-2 font-medium">Ingrediente</th>
                                                <th className="pb-2 font-medium text-right">Total</th>
                                                <th className="pb-2 font-medium pl-2">Unidad</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-50">
                                            {recetaDesayuno.ingredients.map((ing, idx) => (
                                                <tr key={idx}>
                                                    <td className="py-2 text-neutral-800">{ing.name}</td>
                                                    <td className="py-2 text-right font-bold text-neutral-900">{calcularCantidad(ing.quantity)}</td>
                                                    <td className="py-2 pl-2 text-neutral-500">{ing.unit}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN ALMUERZO */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="bg-green-100 p-2 rounded-lg mr-3">
                                <ChefHat className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-800">Almuerzo</h2>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                            <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                                <h3 className="text-xl font-bold text-green-800">{recetaAlmuerzo?.title || 'Menú del día'}</h3>
                            </div>

                            <div className="p-6">
                                <h4 className="font-bold text-neutral-800 mb-4 flex items-center">
                                    <Utensils className="w-4 h-4 mr-2 text-green-500" />
                                    Ingredientes Calculados
                                </h4>
                                <div className="bg-neutral-50 rounded-xl border border-neutral-100 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-neutral-100">
                                            <tr className="text-left text-neutral-600">
                                                <th className="px-4 py-2 font-medium">Ingrediente</th>
                                                <th className="px-4 py-2 font-medium text-right">Cantidad</th>
                                                <th className="px-4 py-2 font-medium">Unidad</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100">
                                            {recetaAlmuerzo?.ingredients.map((ing, idx) => (
                                                <tr key={idx} className="hover:bg-white transition-colors">
                                                    <td className="px-4 py-2 text-neutral-800">{ing.name}</td>
                                                    <td className="px-4 py-2 text-right font-bold text-green-700">{calcularCantidad(ing.quantity)}</td>
                                                    <td className="px-4 py-2 text-neutral-500">{ing.unit}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* TAB 2: PROCEDIMIENTO */}
                <div className={`transition duration-400 ease-in-out ${tab === 2 ? 'block' : 'hidden'} space-y-8`}>
                    {/* SECCIÓN DESAYUNO */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="bg-orange-100 p-2 rounded-lg mr-3">
                                <Coffee className="w-6 h-6 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-800">Procedimiento Desayuno</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Copa de Leche */}
                            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                                <div className="bg-orange-50 px-6 py-3 border-b border-orange-100">
                                    <h3 className="font-bold text-orange-800">Copa de Leche</h3>
                                </div>
                                <div className="p-6">
                                    <div className="bg-neutral-50 rounded-lg p-4 text-sm text-neutral-600">
                                        <ul className="list-disc list-inside space-y-2">
                                            {copaLeche.procedimiento?.map((paso, idx) => (
                                                <li key={idx}>{paso}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Sólido */}
                            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                                <div className="bg-orange-50 px-6 py-3 border-b border-orange-100 flex justify-between items-center">
                                    <h3 className="font-bold text-orange-800">{recetaDesayuno.title}</h3>
                                </div>
                                <div className="p-6">
                                    {recetaDesayuno.procedimiento ? (
                                        <div className="bg-neutral-50 rounded-lg p-4 text-sm text-neutral-600">
                                            <ul className="list-disc list-inside space-y-2">
                                                {recetaDesayuno.procedimiento.map((paso, idx) => (
                                                    <li key={idx}>{paso}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <p className="italic text-neutral-500">No hay procedimiento disponible.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN ALMUERZO */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="bg-green-100 p-2 rounded-lg mr-3">
                                <ChefHat className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-800">Procedimiento Almuerzo</h2>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                            <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                                <h3 className="text-xl font-bold text-green-800">{recetaAlmuerzo?.title || 'Menú del día'}</h3>
                            </div>

                            <div className="p-6">
                                <div className="prose prose-green max-w-none text-neutral-600 bg-white p-6 rounded-xl border border-neutral-100">
                                    {pasosAlmuerzo ? (
                                        <ul className="list-decimal list-inside space-y-2">
                                            {pasosAlmuerzo.map((paso: string, idx: number) => (
                                                <li key={idx}>{paso}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="italic text-neutral-500">No hay procedimiento disponible para esta receta.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}
