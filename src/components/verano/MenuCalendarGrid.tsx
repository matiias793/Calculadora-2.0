import React from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';
import { recetasAlmuerzo } from '@/utils/recetas-almuerzo';

// Define a flexible interface that covers both data sources
interface DiaCalendar {
    fecha: string | Date;
    fechaDisplay?: string; // From planificacion-verano
    fechaString?: string;  // From verano-2026-data
    idRecetaAlmuerzo?: number | string; // From planificacion-verano
    nombreMenu?: string;       // From verano-2026-data
}

interface MenuCalendarGridProps {
    dias: any[]; // Using any to avoid strict type conflicts for now
    basePath?: string;
}

export const MenuCalendarGrid: React.FC<MenuCalendarGridProps> = ({ dias = [], basePath = '/escuelas-verano/dia' }) => {

    if (!dias || dias.length === 0) {
        return (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-500">No hay menús planificados para mostrar.</p>
            </div>
        );
    }

    const getFechaIso = (fecha: string | Date): string => {
        if (fecha instanceof Date) {
            const year = fecha.getFullYear();
            const month = String(fecha.getMonth() + 1).padStart(2, '0');
            const day = String(fecha.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return fecha;
    };

    const getMonth = (fecha: string | Date): number => {
        if (fecha instanceof Date) {
            return fecha.getMonth();
        }
        // Parse YYYY-MM-DD manually to avoid timezone issues
        const parts = String(fecha).split('-');
        if (parts.length === 3) {
            return parseInt(parts[1], 10) - 1; // Month is 0-indexed
        }
        return new Date(fecha).getMonth();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {dias.map((dia: DiaCalendar, index) => {
                const fechaIso = getFechaIso(dia.fecha);

                // Determine title/menu name
                let nombreAlmuerzo = 'Menú del día';
                if (dia.nombreMenu) {
                    nombreAlmuerzo = dia.nombreMenu;
                } else if (dia.idRecetaAlmuerzo) {
                    const id = Number(dia.idRecetaAlmuerzo);
                    const receta = recetasAlmuerzo[id as keyof typeof recetasAlmuerzo];
                    if (receta) nombreAlmuerzo = receta.title;
                }

                // Determine date display
                const fechaMostrar = dia.fechaString || dia.fechaDisplay || fechaIso;

                // Determine Month Color Theme
                const month = getMonth(dia.fecha);
                const isFebruary = month === 1; // 0 = Jan, 1 = Feb

                // Theme Classes - Subtle Tones
                // January: Pastel Blue (Celeste)
                // February: Orange (Subtle)

                const cardBg = isFebruary ? 'bg-orange-50' : 'bg-sky-50';
                const borderColor = isFebruary ? 'border-orange-100' : 'border-sky-100';
                const hoverBorder = isFebruary ? 'hover:border-orange-300' : 'hover:border-sky-300';

                const iconColor = isFebruary ? 'text-orange-400' : 'text-sky-400';
                const textColor = isFebruary ? 'text-orange-900' : 'text-sky-900';
                const subTextColor = isFebruary ? 'text-orange-700/70' : 'text-sky-700/70';

                const hoverShadow = 'hover:shadow-md';
                const arrowBg = 'bg-white/50';
                const arrowColor = isFebruary ? 'text-orange-300' : 'text-sky-300';
                const arrowHoverColor = isFebruary ? 'group-hover:text-orange-500' : 'group-hover:text-sky-500';

                return (
                    <Link
                        key={fechaIso + index}
                        href={`${basePath}/${fechaIso}`}
                        className="block group"
                    >
                        <div
                            className={`
                                relative overflow-hidden rounded-xl border p-4 transition-all duration-300
                                ${cardBg} ${borderColor} ${hoverBorder} ${hoverShadow}
                            `}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className={`flex items-center font-medium ${subTextColor} transition-colors`}>
                                    <Calendar className={`w-4 h-4 mr-2 ${iconColor}`} />
                                    <span className="capitalize text-sm">{fechaMostrar}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-xs uppercase tracking-wider font-semibold mb-1 ${subTextColor}`}>
                                        Menú
                                    </p>
                                    <p className={`font-medium leading-tight line-clamp-2 ${textColor} transition-colors`}>
                                        {nombreAlmuerzo}
                                    </p>
                                </div>
                                <div className={`rounded-full p-2 ${arrowBg} transition-colors`}>
                                    <ChevronRight className={`w-4 h-4 ${arrowColor} ${arrowHoverColor}`} />
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
