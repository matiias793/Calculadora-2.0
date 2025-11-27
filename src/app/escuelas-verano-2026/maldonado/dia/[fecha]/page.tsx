'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getPlanificacionMaldonadoPorFecha } from '@/data/planificacion-maldonado';
import { recetasAlmuerzo } from '@/utils/recetas-almuerzo';
import { recetasDesayuno } from '@/data/recetas-desayuno';
import { procedimientosAlmuerzo } from '@/utils/procedimientos-almuerzo';
import { Procedimiento } from '@/models/Procedimiento';
import { Receta } from '@/models/Receta';
import MealAccordion from '@/components/verano/MealAccordion';
import NavigationButtons from '@/components/shared/NavigationButtons';

export default function MaldonadoDiaPage() {
    const params = useParams();
    const fecha = params.fecha as string;

    // Obtener datos del día
    const diaPlanificacion = getPlanificacionMaldonadoPorFecha(fecha);

    if (!diaPlanificacion) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-2">Día no encontrado</h2>
                    <Link href="/escuelas-verano-2026" className="text-blue-600 hover:underline">
                        Volver al calendario
                    </Link>
                </div>
            </div>
        );
    }

    // Prepare data for rendering
    const almuerzoId = Number(diaPlanificacion.idRecetaAlmuerzo);
    const recetaAlmuerzo = recetasAlmuerzo[almuerzoId as keyof typeof recetasAlmuerzo] as Receta;
    const procedimientoAlmuerzo = procedimientosAlmuerzo[almuerzoId as keyof typeof procedimientosAlmuerzo] as Procedimiento;

    const recetaDesayuno = recetasDesayuno[diaPlanificacion.idRecetaDesayuno];
    const procedimientoDesayuno: Procedimiento = {
        opciones: [{
            title: 'Procedimiento',
            pasos: recetaDesayuno?.procedimiento || []
        }]
    };

    const recetaMerienda = recetasDesayuno[diaPlanificacion.idRecetaMerienda];
    const procedimientoMerienda: Procedimiento = {
        opciones: [{
            title: 'Procedimiento',
            pasos: recetaMerienda?.procedimiento || []
        }]
    };

    return (
        <div className="min-h-screen bg-neutral-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <NavigationButtons />
                        <div className="ml-4">
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

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Desayuno Accordion */}
                {recetaDesayuno && (
                    <MealAccordion
                        receta={recetaDesayuno}
                        procedimiento={procedimientoDesayuno}
                        type="desayuno"
                    />
                )}

                {/* Almuerzo Accordion */}
                {recetaAlmuerzo && (
                    <MealAccordion
                        receta={recetaAlmuerzo}
                        procedimiento={procedimientoAlmuerzo}
                        type="almuerzo"
                        defaultOpen={true}
                    />
                )}

                {/* Merienda Accordion */}
                {recetaMerienda && (
                    <MealAccordion
                        receta={recetaMerienda}
                        procedimiento={procedimientoMerienda}
                        type="merienda"
                    />
                )}

            </div>
        </div>
    );
}
