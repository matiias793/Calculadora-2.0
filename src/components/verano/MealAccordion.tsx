'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Users, ChefHat, Coffee, Sun } from 'lucide-react';
import { Receta } from '@/models/Receta';
import { Procedimiento } from '@/models/Procedimiento';

interface Props {
    receta: Receta;
    procedimiento: Procedimiento;
    type: 'desayuno' | 'almuerzo' | 'merienda';
    defaultOpen?: boolean;
}

export default function MealAccordion({ receta, procedimiento, type, defaultOpen = false }: Props) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [comensales, setComensales] = useState(type === 'almuerzo' ? 100 : 50); // Default values
    const [calculatedIngredients, setCalculatedIngredients] = useState(receta.ingredients);

    // Icon and Color mapping
    const getTheme = () => {
        switch (type) {
            case 'desayuno':
                return {
                    icon: <Coffee className="w-5 h-5" />,
                    color: 'text-orange-600',
                    bg: 'bg-orange-50',
                    border: 'border-orange-100',
                    title: 'Desayuno'
                };
            case 'almuerzo':
                return {
                    icon: <ChefHat className="w-5 h-5" />,
                    color: 'text-green-600',
                    bg: 'bg-green-50',
                    border: 'border-green-100',
                    title: 'Almuerzo'
                };
            case 'merienda':
                return {
                    icon: <Sun className="w-5 h-5" />,
                    color: 'text-blue-600',
                    bg: 'bg-blue-50',
                    border: 'border-blue-100',
                    title: 'Merienda'
                };
        }
    };

    const theme = getTheme();

    // Calculation Logic (Replicated from PorcionesCard but simplified)
    const calculateIngredients = useCallback(() => {
        const factor = comensales;

        const newIngredients = receta.ingredients.map(ing => {
            let quantity = Number(ing.quantity);
            if (isNaN(quantity)) return ing;

            // Apply factor
            let finalQuantity = quantity * factor;
            let unit = ing.unit;

            // Unit conversions for cleaner display
            if (unit === 'g' && finalQuantity >= 1000) {
                finalQuantity /= 1000;
                unit = 'kg';
            } else if (unit === 'ml' && finalQuantity >= 1000) {
                finalQuantity /= 1000;
                unit = 'l';
            }

            // Rounding
            finalQuantity = Math.round(finalQuantity * 100) / 100;

            return {
                ...ing,
                quantity: finalQuantity,
                unit
            };
        });

        setCalculatedIngredients(newIngredients);
    }, [receta.ingredients, comensales]);

    useEffect(() => {
        calculateIngredients();
    }, [calculateIngredients]);

    return (
        <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${isOpen ? 'shadow-md border-primary ring-1 ring-primary/20' : 'border-transparent hover:bg-neutral-50'}`}>

            {/* Header / Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-4 transition-colors ${isOpen ? 'bg-white' : theme.bg}`}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-primary/10 text-primary' : `${theme.bg} ${theme.color}`}`}>
                        {theme.icon}
                    </div>
                    <div className="text-left">
                        <p className={`text-xs font-bold uppercase tracking-wider ${isOpen ? 'text-primary' : theme.color}`}>
                            {theme.title}
                        </p>
                        <h3 className="text-neutral-800 font-semibold text-lg leading-tight">
                            {receta.title}
                        </h3>
                    </div>
                </div>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-neutral-400'}`}>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </button>

            {/* Content */}
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden bg-white">
                    <div className="p-4 sm:p-6 border-t border-neutral-100 space-y-8">

                        {/* Calculator Section */}
                        <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <Users className="w-5 h-5 text-primary" />
                                    <span className="font-medium">Comensales:</span>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="flex gap-2">
                                        {[50, 75, 100].map(val => (
                                            <button
                                                key={val}
                                                onClick={() => setComensales(val)}
                                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${comensales === val
                                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                                    : 'bg-white text-neutral-600 border border-neutral-200 hover:border-primary/50 hover:text-primary'
                                                    }`}
                                            >
                                                {val}
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="number"
                                        min="1"
                                        value={comensales}
                                        onChange={(e) => setComensales(Math.max(0, parseInt(e.target.value) || 0))}
                                        className="w-20 p-1.5 text-center font-bold text-primary bg-white border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ingredients & Procedure Grid */}
                        <div className="grid md:grid-cols-2 gap-8">

                            {/* Ingredients */}
                            <div>
                                <h4 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    Ingredientes
                                </h4>
                                <div className="overflow-hidden rounded-lg border border-neutral-100">
                                    <table className="w-full text-sm">
                                        <thead className="bg-neutral-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left font-semibold text-neutral-500">Ingrediente</th>
                                                <th className="px-4 py-2 text-right font-semibold text-neutral-500">Cantidad</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100">
                                            {calculatedIngredients.map((ing, idx) => (
                                                <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                                                    <td className="px-4 py-2 text-neutral-700">{ing.name}</td>
                                                    <td className="px-4 py-2 text-right font-medium text-neutral-800 whitespace-nowrap">
                                                        {ing.quantity} <span className="text-neutral-500 font-normal">{ing.unit}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Procedure */}
                            <div>
                                <h4 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    Procedimiento
                                </h4>
                                <div className="space-y-4">
                                    {procedimiento.opciones.map((opcion, idx) => (
                                        <div key={idx}>
                                            {opcion.title && opcion.title !== 'Procedimiento' && (
                                                <h5 className="font-semibold text-neutral-700 mb-2 text-sm">{opcion.title}</h5>
                                            )}
                                            <ol className="list-decimal list-outside ml-4 space-y-3">
                                                {opcion.pasos.map((paso, pIdx) => (
                                                    <li key={pIdx} className="text-sm text-neutral-600 leading-relaxed pl-2">
                                                        {paso}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
