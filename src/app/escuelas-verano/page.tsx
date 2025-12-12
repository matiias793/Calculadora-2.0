'use client';

import React, { useState, useEffect } from 'react';
import { Coffee, Utensils } from 'lucide-react';
import { SummerNavigation } from '@/components/verano/SummerNavigation';
import { WeeklyGroup } from '@/components/verano/WeeklyGroup';
import { PLANIFICACION_VERANO } from '@/data/planificacion-verano';
import { PLANIFICACION_MALDONADO } from '@/data/planificacion-maldonado';
import { getSemanasVerano, WeekGroup } from '@/utils/verano-weeks';
import NavigationButtons from '@/components/shared/NavigationButtons';

export default function EscuelasVeranoPage() {
    const [activeTab, setActiveTab] = useState<'maldonado' | 'resto'>('resto');
    const [weeks, setWeeks] = useState<WeekGroup[]>([]);

    // Cargar y agrupar semanas al cambiar la pestaña
    useEffect(() => {
        const data = activeTab === 'maldonado' ? PLANIFICACION_MALDONADO : PLANIFICACION_VERANO;
        const agrupadas = getSemanasVerano(data);
        setWeeks(agrupadas);
    }, [activeTab]);

    // Manejar la apertura/cierre de acordeones
    const handleToggleWeek = (id: number) => {
        setWeeks(prevWeeks => prevWeeks.map(week =>
            week.id === id ? { ...week, isOpen: !week.isOpen } : week
        ));
    };

    const basePath = activeTab === 'maldonado' ? '/escuelas-verano/maldonado/dia' : '/escuelas-verano/dia';
    const title = activeTab === 'maldonado' ? 'Calendario - Maldonado' : 'Calendario - Todo el País';

    return (
        <div className="min-h-screen bg-neutral-50 pb-12">

            {/* 1. NAVEGACIÓN ESTÁNDAR (Botones Volver/Home) */}
            <div className="bg-white px-4 py-4 border-b border-neutral-200">
                <div className="max-w-7xl mx-auto">
                    <NavigationButtons />
                </div>
            </div>

            {/* 2. HERO BANNER CON IMAGEN DE FONDO */}
            <div className="relative bg-neutral-900 h-64 mb-8 overflow-hidden shadow-md">
                {/* Imagen */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: "url('/images/veranoportada2026.jpg')" }}
                ></div>
                {/* Overlay Degradado para leer texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Textos del Banner */}
                <div className="relative z-10 h-full flex flex-col justify-end pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white shadow-sm mb-2">
                        Escuelas de Verano 2026
                    </h1>
                    <p className="text-green-50 text-lg md:text-xl font-medium shadow-sm max-w-2xl">
                        Planificación de menús y calculadora de insumos oficial.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 3. BOTONES DE RECETARIOS (Reemplaza aviso de prototipo) */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                        href="https://drive.google.com/file/d/1qiHPj8cujsd8VWLNt0oOZkM2ir-Z7lrH/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 p-4 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md hover:border-amber-300 transition-all group"
                    >
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-full group-hover:bg-amber-200 transition-colors">
                            <Coffee className="w-6 h-6" />
                        </div>
                        <span className="font-semibold text-neutral-700 group-hover:text-amber-800">Recetario Copa de Leche</span>
                    </a>

                    <a
                        href="https://drive.google.com/file/d/1bK9WCzHW7sVbctLb1Z1E1qAWRctcrZ8-/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 p-4 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md hover:border-green-300 transition-all group"
                    >
                        <div className="p-2 bg-green-100 text-green-600 rounded-full group-hover:bg-green-200 transition-colors">
                            <Utensils className="w-6 h-6" />
                        </div>
                        <span className="font-semibold text-neutral-700 group-hover:text-green-800">Recetario Almuerzos</span>
                    </a>
                </div>

                {/* 4. TABS DE NAVEGACIÓN (Maldonado / Todo el País) */}
                <div className="mb-8">
                    <SummerNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                {/* 5. LISTA DE SEMANAS (Acordeones) */}
                <div className="transition-all duration-300 ease-in-out">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-neutral-800 flex items-center">
                            {/* Indicador visual de color según la tab */}
                            <span className={`w-2 h-8 rounded-full mr-3 ${activeTab === 'maldonado' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                            {title}
                        </h2>
                    </div>

                    {weeks.length > 0 ? (
                        <div className="space-y-4">
                            {weeks.map((week) => (
                                <WeeklyGroup
                                    key={week.id}
                                    week={week}
                                    basePath={basePath}
                                    onToggle={() => handleToggleWeek(week.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-neutral-200 border-dashed">
                            <p className="text-neutral-400">Cargando planificación...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}