'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sun, Info } from 'lucide-react';
import { SummerNavigation } from '@/components/verano/SummerNavigation';
import NavigationButtons from '@/components/shared/NavigationButtons';
import { MenuCalendarGrid } from '@/components/verano/MenuCalendarGrid';
import { PLANIFICACION_VERANO } from '@/data/planificacion-verano';
import { PLANIFICACION_MALDONADO } from '@/data/planificacion-maldonado';

export default function EscuelasVeranoPage() {
  const [activeTab, setActiveTab] = useState<'maldonado' | 'resto'>('resto');

  return (
    <div className="min-h-screen bg-neutral-50 pb-12">
      {/* Header Hero */}
      <div className="relative h-64 md:h-80 w-full mb-8 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/veranoportada2026.jpg')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="mb-6">
            <NavigationButtons />
          </div>

          <div className="text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Sun className="w-6 h-6 text-yellow-300" />
              </div>
              <span className="text-green-100 font-medium tracking-wide uppercase text-sm">Planificación</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white shadow-sm">
              Escuelas de Verano 2026
            </h1>
            <p className="text-green-50 text-lg max-w-2xl">
              Calculadora de insumos y gestión de menús diarios.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Beta Warning Banner */}
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <span className="text-yellow-600 text-xl flex-shrink-0">⚠️</span>
          <p className="text-sm text-yellow-800">
            <strong className="font-semibold">Sección en construcción:</strong> La planificación y recetas mostradas son un prototipo para el verano 2026. Los datos finales pueden variar.
          </p>
        </div>

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
                  basePath="/escuelas-verano-2026/maldonado/dia"
                />
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-neutral-200 shadow-sm">
                  <p className="text-neutral-500 mb-2">No se encontraron datos de planificación para Maldonado.</p>
                  <p className="text-xs text-neutral-400">Verifique el archivo de datos o contacte a soporte.</p>
                </div>
              )}
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
                basePath="/escuelas-verano-2026/dia"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
