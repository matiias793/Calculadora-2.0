'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChefHat, Coffee, Sun, Utensils } from 'lucide-react';
import { getPlanificacionMaldonadoPorFecha } from '@/data/planificacion-maldonado';
import { recetasAlmuerzo } from '@/utils/recetas-almuerzo';
import { recetasDesayuno } from '@/data/recetas-desayuno';
import { procedimientosAlmuerzo } from '@/utils/procedimientos-almuerzo';
import RecetaGrid from '@/components/recetas/RecetaGrid';
import { Procedimiento } from '@/models/Procedimiento';
import { Receta } from '@/models/Receta';

export default function MaldonadoDiaPage() {
    const params = useParams();
    const router = useRouter();
    const fecha = params.fecha as string;

    const [activeTab, setActiveTab] = useState<'desayuno' | 'almuerzo' | 'merienda'>('almuerzo');

    // Obtener datos del día
    const diaPlanificacion = getPlanificacionMaldonadoPorFecha(fecha);

    if (!diaPlanificacion) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-2">Día no encontrado</h2>
                    <Link href="/escuelas-verano" className="text-blue-600 hover:underline">
                        Volver al calendario
                    </Link>
                </div>
            </div>
        );
    }

    // Determinar receta y procedimiento según la pestaña activa
    let recetaActual: Receta | null = null;
    let procedimientoActual: Procedimiento | null = null;
    let isAlmuerzo = false;

    if (activeTab === 'almuerzo') {
        const id = Number(diaPlanificacion.idRecetaAlmuerzo);
        recetaActual = recetasAlmuerzo[id as keyof typeof recetasAlmuerzo] as Receta;
        procedimientoActual = procedimientosAlmuerzo[id as keyof typeof procedimientosAlmuerzo] as Procedimiento;
        isAlmuerzo = true;
    } else if (activeTab === 'desayuno') {
        const r = recetasDesayuno[diaPlanificacion.idRecetaDesayuno];
        if (r) {
            recetaActual = r as Receta;
            // Adaptar procedimiento simple a estructura compleja
            procedimientoActual = {
                opciones: [{
                    title: 'Procedimiento',
                    pasos: r.procedimiento || []
                }]
            };
        }
        isAlmuerzo = false;
    } else if (activeTab === 'merienda') {
        const r = recetasDesayuno[diaPlanificacion.idRecetaMerienda];
        if (r) {
            recetaActual = r as Receta;
            // Adaptar procedimiento simple a estructura compleja
            procedimientoActual = {
                opciones: [{
                    title: 'Procedimiento',
                    pasos: r.procedimiento || []
                }]
            };
        }
        isAlmuerzo = false;
    }

    // Fallback para procedimiento si es null (evitar crash)
    if (!procedimientoActual) {
        procedimientoActual = { opciones: [] };
    }

    return (
        <div className="min-h-screen bg-neutral-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => router.back()}
                            className="mr-4 p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-600"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-neutral-800">
                                {diaPlanificacion.fechaDisplay}
                            </h1>
                            <p className="text-xs text-blue-600 font-medium">
                                Maldonado - Escuelas de Verano
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs de Comidas */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-xl shadow-sm border border-neutral-200 inline-flex">
                        <button
                            onClick={() => setActiveTab('desayuno')}
                            className={`
                                flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all
                                ${activeTab === 'desayuno'
                                    ? 'bg-orange-100 text-orange-700 shadow-sm'
                                    : 'text-neutral-500 hover:bg-neutral-50'}
                            `}
                        >
                            <Coffee className="w-4 h-4 mr-2" />
                            Desayuno
                        </button>
                        <button
                            onClick={() => setActiveTab('almuerzo')}
                            className={`
                                flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all mx-1
                                ${activeTab === 'almuerzo'
                                    ? 'bg-green-100 text-green-700 shadow-sm'
                                    : 'text-neutral-500 hover:bg-neutral-50'}
                            `}
                        >
                            <Utensils className="w-4 h-4 mr-2" />
                            Almuerzo
                        </button>
                        <button
                            onClick={() => setActiveTab('merienda')}
                            className={`
                                flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all
                                ${activeTab === 'merienda'
                                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                                    : 'text-neutral-500 hover:bg-neutral-50'}
                            `}
                        >
                            <Sun className="w-4 h-4 mr-2" />
                            Merienda
                        </button>
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="transition-all duration-300">
                    {activeTab === 'almuerzo' && recetaActual && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 flex items-start">
                                <ChefHat className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-lg font-bold text-green-800 mb-1">
                                        {recetaActual.title}
                                    </h2>
                                    <p className="text-green-700/80 text-sm">
                                        Plato principal del día. Ajusta las porciones para calcular los ingredientes.
                                    </p>
                                </div>
                            </div>
                            <RecetaGrid
                                receta={recetaActual}
                                procedimiento={procedimientoActual}
                                isAlmuerzo={true}
                            />
                        </div>
                    )}

                    {activeTab === 'desayuno' && recetaActual && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 flex items-start">
                                <Coffee className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-lg font-bold text-orange-800 mb-1">
                                        {recetaActual.title}
                                    </h2>
                                    <p className="text-orange-700/80 text-sm">
                                        Desayuno para comenzar el día.
                                    </p>
                                </div>
                            </div>
                            <RecetaGrid
                                receta={recetaActual}
                                procedimiento={procedimientoActual}
                                isAlmuerzo={false}
                            />
                        </div>
                    )}

                    {activeTab === 'merienda' && recetaActual && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start">
                                <Sun className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-lg font-bold text-blue-800 mb-1">
                                        {recetaActual.title}
                                    </h2>
                                    <p className="text-blue-700/80 text-sm">
                                        Merienda para la tarde.
                                    </p>
                                </div>
                            </div>
                            <RecetaGrid
                                receta={recetaActual}
                                procedimiento={procedimientoActual}
                                isAlmuerzo={false}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
