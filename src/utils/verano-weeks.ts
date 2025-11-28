import { DiaPlanificacion } from '@/data/planificacion-verano';

export interface WeekGroup {
    id: number;
    label: string;
    rango: string;
    dias: DiaPlanificacion[];
    isOpen: boolean;
}

export const getSemanasVerano = (dias: DiaPlanificacion[]): WeekGroup[] => {

    // Función robusta para extraer Día y Mes de cualquier string de fecha
    const getDiaMes = (fecha: string) => {
        if (!fecha) return { dia: 0, mes: 0 };

        // Caso A: Formato ISO "2026-01-08" (YYYY-MM-DD)
        if (fecha.includes('-')) {
            const parts = fecha.split('-');
            // parts[0] = Año, parts[1] = Mes, parts[2] = Día
            return { dia: parseInt(parts[2]), mes: parseInt(parts[1]) };
        }

        // Caso B: Formato Latino "08/01/2026" (DD/MM/YYYY)
        if (fecha.includes('/')) {
            const parts = fecha.split('/');
            // parts[0] = Día, parts[1] = Mes, parts[2] = Año
            return { dia: parseInt(parts[0]), mes: parseInt(parts[1]) };
        }

        return { dia: 0, mes: 0 };
    };

    // Filtrado Estricto por Rangos
    const semana1 = dias.filter(d => {
        const { dia, mes } = getDiaMes(d.fecha);
        // Enero (1) del 8 al 9
        return mes === 1 && dia >= 8 && dia <= 11;
    });

    const semana2 = dias.filter(d => {
        const { dia, mes } = getDiaMes(d.fecha);
        // Enero (1) del 12 al 16
        return mes === 1 && dia >= 12 && dia <= 18;
    });

    const semana3 = dias.filter(d => {
        const { dia, mes } = getDiaMes(d.fecha);
        // Enero (1) del 19 al 23
        return mes === 1 && dia >= 19 && dia <= 25;
    });

    const semana4 = dias.filter(d => {
        const { dia, mes } = getDiaMes(d.fecha);
        // Enero (1) del 26 al 30
        return mes === 1 && dia >= 26 && dia <= 31;
    });

    const semana5 = dias.filter(d => {
        const { dia, mes } = getDiaMes(d.fecha);
        // Febrero (2) del 1 al 5
        return mes === 2 && dia <= 5;
    });

    return [
        { id: 1, label: 'Semana 1', rango: '8 Ene - 9 Ene', dias: semana1, isOpen: true },
        { id: 2, label: 'Semana 2', rango: '12 Ene - 16 Ene', dias: semana2, isOpen: false },
        { id: 3, label: 'Semana 3', rango: '19 Ene - 23 Ene', dias: semana3, isOpen: false },
        { id: 4, label: 'Semana 4', rango: '26 Ene - 30 Ene', dias: semana4, isOpen: false },
        { id: 5, label: 'Semana 5', rango: '2 Feb - 5 Feb', dias: semana5, isOpen: false },
    ];
};
