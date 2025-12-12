'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMenuPorFecha } from '@/data/menu-verano-static';
import NavigationButtons from '@/components/shared/NavigationButtons';
import { ChefHat, Coffee } from 'lucide-react';

export default function DetalleDiaPage() {
    const params = useParams();
    const router = useRouter();

    const rawFecha = params?.fecha;
    const fecha = typeof rawFecha === 'string' ? decodeURIComponent(rawFecha) : '';

    const menu = getMenuPorFecha(fecha);

    if (!fecha) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-neutral-600">Cargando...</h2>
                </div>
            </div>
        );
    }

    if (!menu) {
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

    // Format date for display
    const dateObj = new Date(fecha + 'T12:00:00'); // Force noon to avoid timezone issues
    const fechaDisplay = dateObj.toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <div className="min-h-screen bg-neutral-50 pb-12">
            <div className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <NavigationButtons />
                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                        <div>
                            <h1 className="text-2xl font-bold text-neutral-900 capitalize">
                                {fechaDisplay}
                            </h1>
                            <p className="text-neutral-500 text-sm">Menú Escuelas de Verano</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Tarjeta Desayuno/Merienda */}
                <section>
                    <div className="flex items-center mb-4">
                        <div className="bg-orange-100 p-2 rounded-lg mr-3">
                            <Coffee className="w-6 h-6 text-orange-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-neutral-800">Desayuno / Merienda</h2>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                        <div className="p-6">
                            <p className="text-lg text-neutral-700 font-medium leading-relaxed">
                                {menu.copaLeche}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tarjeta Almuerzo */}
                <section>
                    <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                            <ChefHat className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-neutral-800">Almuerzo</h2>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                        <div className="p-6">
                            <p className="text-lg text-neutral-700 font-medium leading-relaxed">
                                {menu.almuerzo}
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
