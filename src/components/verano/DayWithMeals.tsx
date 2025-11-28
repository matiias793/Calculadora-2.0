'use client';

import React, { useState } from 'react';
import { ChevronDown, Coffee, Utensils, GlassWater, Users } from 'lucide-react';
import { recetasAlmuerzo } from '@/utils/recetas-almuerzo';
import { recetasDesayuno } from '@/data/recetas-desayuno';
import { procedimientosAlmuerzo } from '@/utils/procedimientos-almuerzo';
import { convertirFluidaAPolvo } from '@/utils/conversion-leche';
import { DiaPlanificacion } from '@/data/planificacion-verano';
import { DiaPlanificacionMaldonado } from '@/data/planificacion-maldonado';

interface DayWithMealsProps {
    dia: DiaPlanificacion | DiaPlanificacionMaldonado;
    esMaldonado: boolean;
}

type MealType = 'desayuno' | 'almuerzo' | 'merienda';

export const DayWithMeals: React.FC<DayWithMealsProps> = ({ dia, esMaldonado }) => {
    // Estados de comensales independientes
    const [comensalesDesayuno, setComensalesDesayuno] = useState<number>(50);
    const [comensalesAlmuerzo, setComensalesAlmuerzo] = useState<number>(50);
    const [comensalesMerienda, setComensalesMerienda] = useState<number>(50);

    // Estados de acordeones
    const [openMeals, setOpenMeals] = useState<Record<MealType, boolean>>({
        desayuno: false,
        almuerzo: false,
        merienda: false
    });

    const toggleMeal = (meal: MealType) => {
        setOpenMeals(prev => ({ ...prev, [meal]: !prev[meal] }));
    };

    // Recuperar Recetas
    const recetaDesayuno = recetasDesayuno[dia.idRecetaDesayuno as keyof typeof recetasDesayuno];

    // Recuperar Almuerzo y mezclar con procedimiento
    const idAlmuerzo = Number(dia.idRecetaAlmuerzo);
    const baseAlmuerzo = recetasAlmuerzo[idAlmuerzo as keyof typeof recetasAlmuerzo];
    const procAlmuerzo = procedimientosAlmuerzo[idAlmuerzo as keyof typeof procedimientosAlmuerzo];

    const recetaAlmuerzo = baseAlmuerzo ? {
        ...baseAlmuerzo,
        // Si hay procedimiento externo, lo formateamos para que encaje en la UI
        procedimiento: procAlmuerzo ? procAlmuerzo.opciones.flatMap(op => {
            const steps = [];
            if (op.title) steps.push(`**${op.title}**`);
            return [...steps, ...op.pasos];
        }) : undefined
    } : null;

    // Merienda solo para Maldonado
    let recetaMerienda = null;
    if (esMaldonado) {
        const diaMaldonado = dia as DiaPlanificacionMaldonado;
        if (diaMaldonado.idRecetaMerienda) {
            recetaMerienda = recetasDesayuno[diaMaldonado.idRecetaMerienda as keyof typeof recetasDesayuno];
        }
    }

    // Helper para sabor de Copa de Leche
    const getFlavorForDate = (dateStr: string): 'Cocoa' | 'Vainilla' | 'Cebada' => {
        const sum = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const flavors: ('Cocoa' | 'Vainilla' | 'Cebada')[] = ['Cocoa', 'Vainilla', 'Cebada'];
        return flavors[sum % 3];
    };

    // Renderizador de Ingredientes
    const renderIngredients = (receta: any, comensales: number, isLunch: boolean, colorTheme: 'amber' | 'green' | 'blue') => {
        if (!receta || !receta.ingredients) return <p className="text-sm text-neutral-500">Sin ingredientes.</p>;

        const factor = isLunch ? comensales : Math.ceil(comensales / 10);

        // Clases dinámicas según el tema
        const headerBg = `bg-${colorTheme}-100`;
        const headerText = `text-${colorTheme}-800`;
        const rowHover = `hover:bg-${colorTheme}-50`;
        const milkBg = `bg-${colorTheme}-50/50`;
        const milkBorder = `border-${colorTheme}-100`;
        const milkText = `text-${colorTheme}-800`;

        return (
            <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-200">
                <table className="w-full text-sm text-left">
                    <thead className={`text-xs uppercase border-b ${headerBg} ${headerText}`}>
                        <tr>
                            <th className="px-4 py-2 font-bold">Ingrediente</th>
                            <th className="px-4 py-2 text-right font-bold">Cantidad</th>
                            <th className="px-4 py-2 font-bold">Unidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receta.ingredients.map((ing: any, idx: number) => {
                            let cantidadTotal;

                            // Lógica específica para Pan: 40g por comensal (lineal)
                            if (ing.name.toLowerCase().includes('pan')) {
                                cantidadTotal = 40 * comensales;
                            } else {
                                const cantidadBase = typeof ing.quantity === 'number' ? ing.quantity : parseFloat(ing.quantity) || 0;
                                cantidadTotal = cantidadBase * factor;
                            }

                            // Conversión de Leche
                            const nombreNorm = ing.name.toLowerCase();
                            const esLeche = nombreNorm === 'leche' || nombreNorm === 'leche fluida';

                            if (esLeche) {
                                const { gramosPolvo, mlAgua } = convertirFluidaAPolvo(cantidadTotal);
                                return (
                                    <React.Fragment key={idx}>
                                        <tr className={`${milkBg} border-b ${milkBorder}`}>
                                            <td className={`px-4 py-2 font-medium ${milkText}`}>Leche en Polvo (conv.)</td>
                                            <td className={`px-4 py-2 text-right font-bold ${milkText}`}>{gramosPolvo.toLocaleString('es-UY')}</td>
                                            <td className={`px-4 py-2 ${milkText}`}>g</td>
                                        </tr>
                                        <tr className={`${milkBg} border-b ${milkBorder}`}>
                                            <td className={`px-4 py-2 font-medium ${milkText}`}>Agua (para leche)</td>
                                            <td className={`px-4 py-2 text-right font-bold ${milkText}`}>{mlAgua.toLocaleString('es-UY')}</td>
                                            <td className={`px-4 py-2 ${milkText}`}>ml</td>
                                        </tr>
                                    </React.Fragment>
                                );
                            }

                            return (
                                <tr key={idx} className={`border-b ${rowHover} transition-colors`}>
                                    <td className="px-4 py-2 font-medium text-neutral-700">{ing.name}</td>
                                    <td className="px-4 py-2 text-right font-mono text-neutral-600">
                                        {cantidadTotal.toLocaleString('es-UY', { maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-4 py-2 text-neutral-500">{ing.unit}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    // Renderizador de Copa de Leche
    const renderCopaLeche = (comensales: number, colorTheme: 'amber' | 'blue') => {
        const flavor = getFlavorForDate(dia.fecha);
        const baseReceta = recetasDesayuno['copa-leche'];

        if (!baseReceta) return null;

        // Ajustar ingredientes según sabor
        const ingredients = baseReceta.ingredients.map(ing => {
            if (ing.name.includes('Cacao')) {
                if (flavor === 'Vainilla') return { name: 'Vainilla', quantity: 5, unit: 'ml' };
                if (flavor === 'Cebada') return { name: 'Cebada', quantity: 50, unit: 'g' };
                return { name: 'Cacao', quantity: 50, unit: 'g' };
            }
            return ing;
        });

        const recetaAdaptada = { ...baseReceta, title: `Copa de Leche (${flavor})`, ingredients };

        return (
            <div className={`mt-6 pt-6 border-t border-${colorTheme}-200`}>
                <div className="flex items-center gap-2 mb-3">
                    <GlassWater className={`w-5 h-5 text-${colorTheme}-600`} />
                    <h4 className={`font-bold text-${colorTheme}-800`}>Copa de Leche ({flavor})</h4>
                </div>
                {renderIngredients(recetaAdaptada, comensales, false, colorTheme)}

                {/* Procedimiento Copa Leche */}
                <div className="mt-4">
                    <h5 className={`text-xs font-bold uppercase text-${colorTheme}-700 mb-2`}>Procedimiento Copa de Leche</h5>
                    <ul className={`list-disc list-inside text-sm text-neutral-600 space-y-1 bg-${colorTheme}-50/50 p-3 rounded`}>
                        {baseReceta.procedimiento?.map((step, idx) => (
                            <li key={idx}>{step}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    // Renderizador de Sección de Comida
    const renderMealSection = (
        type: MealType,
        title: string,
        icon: React.ReactNode,
        receta: any,
        comensales: number,
        setComensales: (n: number) => void,
        colorTheme: 'amber' | 'green' | 'blue'
    ) => {
        if (!receta) return null;
        const isOpen = openMeals[type];

        // Definir clases de colores basados en el tema
        const borderClass = isOpen ? `border-${colorTheme}-300` : 'border-neutral-200';
        const bgHeader = isOpen ? `bg-${colorTheme}-50` : 'bg-white hover:bg-neutral-50';
        const iconBg = `bg-${colorTheme}-100`;
        const iconColor = `text-${colorTheme}-600`;
        const titleColor = `text-${colorTheme}-800`;

        return (
            <div className={`mb-3 border rounded-lg overflow-hidden transition-all duration-300 ${borderClass} ${isOpen ? 'shadow-md' : ''}`}>
                <button
                    onClick={() => toggleMeal(type)}
                    className={`w-full flex items-center justify-between p-4 text-left transition-colors ${bgHeader}`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${iconBg} ${iconColor}`}>
                            {icon}
                        </div>
                        <div>
                            <span className={`text-xs font-bold uppercase tracking-wider block mb-0.5 ${isOpen ? titleColor : 'text-neutral-500'}`}>{title}</span>
                            <h4 className="font-semibold text-neutral-800">{receta.title || 'Sin nombre'}</h4>
                        </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="p-4 bg-white border-t border-neutral-100 animate-in slide-in-from-top-2 duration-200">
                        {/* Calculadora */}
                        <div className={`flex flex-col sm:flex-row items-center gap-4 mb-6 p-3 rounded-lg border border-${colorTheme}-100 bg-${colorTheme}-50/30`}>
                            <div className="flex items-center gap-2">
                                <Users className={`w-5 h-5 text-${colorTheme}-600`} />
                                <span className={`text-sm font-medium text-${colorTheme}-900`}>Comensales:</span>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <input
                                    type="number"
                                    value={comensales}
                                    onChange={(e) => setComensales(Math.max(0, parseInt(e.target.value) || 0))}
                                    className={`w-20 px-3 py-1.5 border border-${colorTheme}-200 rounded-md focus:ring-2 focus:ring-${colorTheme}-500 focus:border-${colorTheme}-500 text-center font-bold text-${colorTheme}-900`}
                                />
                                <div className="flex gap-1">
                                    {[50, 75, 100].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => setComensales(val)}
                                            className={`px-2 py-1 text-xs font-medium bg-white border border-${colorTheme}-200 text-${colorTheme}-700 rounded hover:bg-${colorTheme}-50 transition-colors`}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Ingredientes Receta Principal */}
                        <div className="mb-6">
                            <h5 className={`text-sm font-bold mb-2 flex items-center gap-2 text-${colorTheme}-800`}>
                                📝 Ingredientes Calculados
                            </h5>
                            {renderIngredients(receta, comensales, type === 'almuerzo', colorTheme)}
                        </div>

                        {/* Procedimiento Receta Principal */}
                        {receta.procedimiento && (
                            <div>
                                <h5 className={`text-sm font-bold mb-2 text-${colorTheme}-800`}>👨‍🍳 Procedimiento</h5>
                                <ul className={`list-disc list-inside text-sm text-neutral-700 space-y-1 bg-${colorTheme}-50/30 p-3 rounded-lg border border-${colorTheme}-100`}>
                                    {Array.isArray(receta.procedimiento) ? (
                                        receta.procedimiento.map((step: string, idx: number) => (
                                            <li key={idx} className="pl-1">
                                                {step.startsWith('**') ? (
                                                    <span className="font-bold text-neutral-900 block mt-2 mb-1">{step.replace(/\*\*/g, '')}</span>
                                                ) : (
                                                    step
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <li>{receta.procedimiento}</li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {/* Copa de Leche (Solo para Desayuno y Merienda) */}
                        {(type === 'desayuno' || type === 'merienda') && renderCopaLeche(comensales, colorTheme as 'amber' | 'blue')}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 mb-6 relative overflow-hidden">
            {/* Barra lateral decorativa */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 via-green-500 to-blue-500"></div>

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

            {/* Lista de Comidas */}
            <div className="space-y-3 pl-2">
                {renderMealSection('desayuno', 'Desayuno', <Coffee className="w-5 h-5" />, recetaDesayuno, comensalesDesayuno, setComensalesDesayuno, 'amber')}
                {renderMealSection('almuerzo', 'Almuerzo', <Utensils className="w-5 h-5" />, recetaAlmuerzo, comensalesAlmuerzo, setComensalesAlmuerzo, 'green')}
                {esMaldonado && renderMealSection('merienda', 'Merienda', <GlassWater className="w-5 h-5" />, recetaMerienda, comensalesMerienda, setComensalesMerienda, 'blue')}
            </div>
        </div>
    );
};
