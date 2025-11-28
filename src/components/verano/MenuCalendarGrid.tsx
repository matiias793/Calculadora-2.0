import React from 'react';
import { DayWithMeals } from './DayWithMeals';
import { DiaPlanificacion } from '@/data/planificacion-verano';
import { DiaPlanificacionMaldonado } from '@/data/planificacion-maldonado';

interface MenuCalendarGridProps {
    dias: (DiaPlanificacion | DiaPlanificacionMaldonado)[];
    basePath?: string;
}

export const MenuCalendarGrid: React.FC<MenuCalendarGridProps> = ({ dias = [], basePath = '' }) => {
    // Detectar si es Maldonado basado en la estructura de los datos (si tiene idRecetaMerienda)
    // O mejor, pasarlo como prop o inferirlo del basePath si es necesario.
    // Pero el componente DayWithMeals necesita saberlo explícitamente.
    // Podemos inferirlo: si el primer elemento tiene 'idRecetaMerienda', es Maldonado.

    const esMaldonado = dias.length > 0 && 'idRecetaMerienda' in dias[0];

    if (!dias || dias.length === 0) {
        return (
            <div className="text-center py-10 bg-neutral-50 rounded-xl border border-neutral-200 border-dashed">
                <p className="text-neutral-500">No hay días planificados para esta semana.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {dias.map((dia, index) => (
                <DayWithMeals
                    key={dia.fecha}
                    dia={dia}
                    esMaldonado={esMaldonado}
                />
            ))}
        </div>
    );
};
