import { recetasAlmuerzo } from '@/utils/recetas-almuerzo';
import { recetasDesayuno } from '@/data/recetas-desayuno';

export interface DiaPlanificacionMaldonado {
    fecha: string; // ISO string YYYY-MM-DD
    fechaDisplay: string;
    idRecetaDesayuno: string;
    idRecetaAlmuerzo: string;
    idRecetaMerienda: string;
}

const getRecetasAlmuerzoIds = () => Object.keys(recetasAlmuerzo);
const getRecetasDesayunoIds = () => Object.keys(recetasDesayuno).filter(k => k !== 'copa-leche'); // Excluir copa de leche que es fija

const generarPlanificacionMaldonado = (): DiaPlanificacionMaldonado[] => {
    const planificacion: DiaPlanificacionMaldonado[] = [];
    const fechaInicio = new Date(2026, 0, 8); // 8 Enero
    const fechaFin = new Date(2026, 1, 5);    // 5 Febrero

    const almuerzoIds = getRecetasAlmuerzoIds();
    const desayunoIds = getRecetasDesayunoIds();

    let fechaActual = new Date(fechaInicio);
    let lastAlmuerzoId = '';

    const formatter = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    // Función simple de hash para seed (Determinista)
    const seededRandom = (seed: number) => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    while (fechaActual <= fechaFin) {
        const diaSemana = fechaActual.getDay();

        // Solo Lunes (1) a Viernes (5)
        if (diaSemana !== 0 && diaSemana !== 6) {
            // Seleccionar Almuerzo (evitar repetir el anterior)
            let almuerzoId;
            let attempts = 0;
            do {
                const seed = fechaActual.getTime() + attempts + 5000; // Offset para diferenciar de Verano normal
                const randomIndex = Math.floor(seededRandom(seed) * almuerzoIds.length);
                almuerzoId = almuerzoIds[randomIndex];
                attempts++;
            } while (almuerzoId === lastAlmuerzoId && almuerzoIds.length > 1);

            lastAlmuerzoId = almuerzoId;

            // Seleccionar Desayuno (random determinista)
            const seedDesayuno = fechaActual.getTime() + 100 + 5000;
            const desayunoId = desayunoIds[Math.floor(seededRandom(seedDesayuno) * desayunoIds.length)];

            // Seleccionar Merienda (random determinista - puede ser igual o diferente al desayuno)
            const seedMerienda = fechaActual.getTime() + 200 + 5000;
            const meriendaId = desayunoIds[Math.floor(seededRandom(seedMerienda) * desayunoIds.length)];

            // Formato YYYY-MM-DD para la URL
            const year = fechaActual.getFullYear();
            const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
            const day = String(fechaActual.getDate()).padStart(2, '0');
            const fechaIso = `${year}-${month}-${day}`;

            const fechaStr = formatter.format(fechaActual);
            const fechaDisplay = fechaStr.charAt(0).toUpperCase() + fechaStr.slice(1);

            planificacion.push({
                fecha: fechaIso,
                fechaDisplay,
                idRecetaDesayuno: desayunoId,
                idRecetaAlmuerzo: almuerzoId,
                idRecetaMerienda: meriendaId
            });
        }

        fechaActual.setDate(fechaActual.getDate() + 1);
    }

    return planificacion;
};

export const PLANIFICACION_MALDONADO = generarPlanificacionMaldonado();

export const getPlanificacionMaldonadoPorFecha = (fechaIso: string) => {
    return PLANIFICACION_MALDONADO.find(p => p.fecha === fechaIso);
};
