'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Sun, Info } from 'lucide-react';
import { SummerNavigation } from '@/components/verano/SummerNavigation';
import { MenuCalendarGrid } from '@/components/verano/MenuCalendarGrid';
import { PLANIFICACION_VERANO } from '@/data/planificacion-verano';
import { PLANIFICACION_MALDONADO } from '@/data/planificacion-maldonado';

export default function EscuelasVeranoPage() {
    const [activeTab, setActiveTab] = useState<'maldonado' | 'resto'>('resto');

    return (
        <div className="min-h-screen bg-neutral-50 pb-12">
            {/* Header Hero */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12 px-4 mb-8">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Volver al Inicio
                    </Link>

                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                                <Sun className="w-8 h-8 text-yellow-300" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Escuelas de Verano 2026
                        </h1>
                        <p className="text-green-100 max-w-2xl mx-auto text-lg">
                            Calculadora de insumos y planificación de menús.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation Tabs */}
                <SummerNavigation activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Content Area */}
                <div className="transition-all duration-300 ease-in-out">
                    {activeTab === 'maldonado' ? (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-neutral-800 flex items-center">
                                    <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                                    Calendario de Menús - Maldonado
                                </h2>
                                <span className="text-sm text-neutral-500 bg-white px-3 py-1 rounded-full border border-neutral-200 shadow-sm">
                                    8 Ene - 5 Feb
                                </span>
                            </div>

                            {PLANIFICACION_MALDONADO && PLANIFICACION_MALDONADO.length > 0 ? (
                                <MenuCalendarGrid
                                    dias={PLANIFICACION_MALDONADO}
                                    basePath="/escuelas-verano/maldonado/dia"
                                />
                            ) : (
                                <div className="text-center py-12 bg-white rounded-xl border border-neutral-200 shadow-sm">
                                    <p className="text-neutral-500 mb-2">No se encontraron datos de planificación para Maldonado.</p>
                                    <p className="text-xs text-neutral-400">Verifique el archivo de datos o contacte a soporte.</p>
                                </div>
                            )}

                            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                                <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-blue-800">
                                    <strong>Nota:</strong> Incluye Desayuno, Almuerzo y Merienda. Seleccione un día para calcular los insumos.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-neutral-800 flex items-center">
                                    <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                                    Calendario de Menús - Resto del País
                                </h2>
                                <span className="text-sm text-neutral-500 bg-white px-3 py-1 rounded-full border border-neutral-200 shadow-sm">
                                    8 Ene - 5 Feb
                                </span>
                            </div>

                            <MenuCalendarGrid
                                dias={PLANIFICACION_VERANO}
                                basePath="/escuelas-verano/dia"
                            />

                            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                                <Info className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-yellow-800">
                                    <strong>Nota:</strong> Seleccione un día para calcular los insumos necesarios según la cantidad de comensales.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
