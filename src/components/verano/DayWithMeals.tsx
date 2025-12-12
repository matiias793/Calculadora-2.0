'use client';

import React, { useState } from 'react';
import { ChevronDown, Coffee, Utensils, GlassWater, Users, ExternalLink } from 'lucide-react';
import { DiaPlanificacion } from '@/data/planificacion-verano';
import { DiaPlanificacionMaldonado } from '@/data/planificacion-maldonado';
import { getMenuPorFecha } from '@/data/menu-verano-static';
import { getMenuMaldonadoPorFecha } from '@/data/menu-maldonado-static';

interface DayWithMealsProps {
    dia: DiaPlanificacion | DiaPlanificacionMaldonado;
    esMaldonado: boolean;
}

type MealType = 'desayuno' | 'almuerzo' | 'merienda';

export const DayWithMeals: React.FC<DayWithMealsProps> = ({ dia, esMaldonado }) => {
    // Estados de acordeones (aunque ya no se usan para el contenido estático, se mantienen por si acaso se reintroducen)
    const [openMeals, setOpenMeals] = useState<Record<MealType, boolean>>({
        desayuno: false,
        almuerzo: false,
        merienda: false
    });

    const toggleMeal = (meal: MealType) => {
        setOpenMeals(prev => ({ ...prev, [meal]: !prev[meal] }));
    };

    // Get static menu data based on the tab
    const staticMenu = !esMaldonado ? getMenuPorFecha(dia.fecha) : null;
    const staticMenuMaldonado = esMaldonado ? getMenuMaldonadoPorFecha(dia.fecha) : null;

    // Helper to render a static section
    const renderStaticSection = (
        type: MealType,
        title: string,
        icon: React.ReactNode,
        content: string | undefined,
        colorTheme: 'amber' | 'green' | 'blue'
    ) => {
        if (!content) return null;

        const iconBg = `bg-${colorTheme}-100`;
        const iconColor = `text-${colorTheme}-600`;
        const titleColor = `text-${colorTheme}-800`;
        const borderColor = `border-${colorTheme}-200`;
        const bgBase = `bg-${colorTheme}-50/30`;

        // Special logic for "Menú Especial" on Feb 5th (Both regions)
        const isSpecialMenuDate = dia.fecha === '2026-02-05' && type === 'almuerzo';

        return (
            <div className={`mb-3 border ${borderColor} rounded-lg overflow-hidden ${bgBase}`}>
                <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-full ${iconBg} ${iconColor}`}>
                            {icon}
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wider ${titleColor}`}>{title}</span>
                    </div>

                    {isSpecialMenuDate ? (
                        <div>
                            <p className="text-neutral-700 text-sm leading-relaxed font-medium mb-3">
                                {content}
                            </p>
                            <a
                                href="https://www.dgeip.edu.uy/documentos/normativa/pae/2023/Comunicado4_23_PAE.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Ver Menú Especial (PDF)
                            </a>
                        </div>
                    ) : (
                        <p className="text-neutral-700 text-sm leading-relaxed font-medium">
                            {content}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 mb-6 relative overflow-hidden">
            {/* Barra lateral decorativa */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${esMaldonado ? 'from-blue-400 via-blue-500 to-indigo-600' : 'from-amber-400 to-green-500'}`}></div>

            {/* Cabecera del Día */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100 pl-2">
                <div>
                    <h3 className="text-xl font-bold text-neutral-800 capitalize">{dia.fechaDisplay}</h3>
                    <p className="text-sm text-neutral-500">{dia.fecha}</p>
                </div>
                {esMaldonado && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                        Maldonado
                    </span>
                )}
            </div>

            {/* Lista de Comidas Estáticas */}
            <div className="space-y-3 pl-2">
                {esMaldonado && staticMenuMaldonado ? (
                    <>
                        {renderStaticSection('desayuno', 'Copa de Leche', <Coffee className="w-5 h-5" />, staticMenuMaldonado.copaLeche, 'amber')}
                        {renderStaticSection('almuerzo', 'Almuerzo', <Utensils className="w-5 h-5" />, staticMenuMaldonado.almuerzo, 'green')}
                        {renderStaticSection('merienda', 'Merienda', <GlassWater className="w-5 h-5" />, staticMenuMaldonado.merienda, 'blue')}
                    </>
                ) : staticMenu ? (
                    <>
                        {renderStaticSection('desayuno', 'Desayuno', <Coffee className="w-5 h-5" />, staticMenu.copaLeche, 'amber')}
                        {renderStaticSection('almuerzo', 'Almuerzo', <Utensils className="w-5 h-5" />, staticMenu.almuerzo, 'green')}
                    </>
                ) : (
                    <div className="p-4 text-center text-neutral-500 bg-neutral-50 rounded-lg border border-neutral-200 border-dashed">
                        No hay información de menú disponible para esta fecha.
                    </div>
                )}
            </div>
        </div>
    );
};
