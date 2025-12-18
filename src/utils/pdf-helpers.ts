import { ORDEN_INGREDIENTES, MAPEO_VARIACIONES } from '@/data/pdf-config';
import { recetasAlmuerzo } from '@/utils/recetas-almuerzo';
import { pesosPostres } from '@/utils/pesos-postres';
import { convertirFluidaAPolvo } from '@/utils/conversion-leche';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';

export interface DiaMenu {
    dia: string;
    principal: string;
    acompanamiento: string;
    recetaBase: string;
    postre: string;
    sinMenu: boolean;
    porciones: {
        chica: number;
        mediana: number;
        grande: number;
    };
    incluirPan?: boolean;
}

export interface IngredienteCalculado {
    nombre: string;
    cantidad: number | string;
    unidad: string;
}

export interface AcumuladorIngredientes {
    [key: string]: { cantidad: number; unidad: string };
}

// Funciones de utilidad matemática
export const ajustarNumero = (valor: number, precision = 6) => Number(valor.toFixed(precision));

export const aplicarCeilConEpsilon = (valor: number, precision = 6) => {
    const ajustado = ajustarNumero(valor, precision);
    const epsilon = 1 / Math.pow(10, precision + 2);
    return Math.ceil(ajustado - epsilon);
};

// Función para normalizar nombres de ingredientes y agrupar duplicados
export function normalizarNombreIngrediente(nombre: string): string {
    const nombreNormalizado = nombre.toLowerCase().trim();

    // Buscar coincidencia exacta en el mapeo
    if (MAPEO_VARIACIONES[nombreNormalizado]) {
        return MAPEO_VARIACIONES[nombreNormalizado];
    }

    // Buscar coincidencias parciales más inteligentes
    for (const [variacion, estandar] of Object.entries(MAPEO_VARIACIONES)) {
        const variacionLower = variacion.toLowerCase();

        // Para pollo/suprema: manejar casos especiales
        if ((variacionLower.includes('pollo') && nombreNormalizado.includes('pollo')) ||
            (variacionLower.includes('suprema') && nombreNormalizado.includes('suprema'))) {
            // Si contiene "suprema" en cualquier forma, normalizar a "suprema de pollo"
            if (nombreNormalizado.includes('suprema')) {
                return 'suprema de pollo';
            }
            // Si es solo "pollo", mantener como "pollo"
            if (nombreNormalizado === 'pollo') {
                return 'pollo';
            }
        }

        // Para aceite: agrupar todas las variaciones
        if (nombreNormalizado.includes('aceite')) {
            return 'aceite';
        }

        // Para pulpa de tomate: agrupar variaciones
        if (nombreNormalizado.includes('pulpa') && nombreNormalizado.includes('tomate')) {
            return 'pulpa de tomate';
        }
    }

    // Si no hay mapeo, devolver el nombre original
    return nombre;
}

// Función para obtener el orden de un ingrediente
export function obtenerOrdenIngrediente(nombre: string): number {
    const nombreNormalizado = nombre.toLowerCase().trim();

    // Buscar coincidencias exactas primero
    for (let i = 0; i < ORDEN_INGREDIENTES.length; i++) {
        const ingredienteOrden = ORDEN_INGREDIENTES[i].toLowerCase();

        // Coincidencia exacta
        if (nombreNormalizado === ingredienteOrden) {
            return i;
        }
    }

    // Si no hay coincidencia exacta, buscar coincidencias parciales más específicas
    for (let i = 0; i < ORDEN_INGREDIENTES.length; i++) {
        const ingredienteOrden = ORDEN_INGREDIENTES[i].toLowerCase();

        // Para carnes: buscar "carne" + tipo específico
        if (ingredienteOrden.includes('carne') && nombreNormalizado.includes('carne')) {
            if (ingredienteOrden.includes('cerdo') && nombreNormalizado.includes('cerdo')) return i;
            if (ingredienteOrden.includes('vacuna') && nombreNormalizado.includes('vacuna')) return i;
        }

        // Para otros ingredientes específicos
        if (ingredienteOrden.includes('pollo') && nombreNormalizado.includes('pollo')) return i;
        if (ingredienteOrden.includes('pescado') && nombreNormalizado.includes('pescado')) return i;
        if (ingredienteOrden.includes('atún') && nombreNormalizado.includes('atún')) return i;
        if (ingredienteOrden.includes('huevo') && nombreNormalizado.includes('huevo')) return i;
        if (ingredienteOrden.includes('yema') && nombreNormalizado.includes('yema')) return i;
        if (ingredienteOrden.includes('leche') && nombreNormalizado.includes('leche')) return i;
        if (ingredienteOrden.includes('milanesa') && nombreNormalizado.includes('milanesa')) return i;
        if (ingredienteOrden.includes('arroz') && nombreNormalizado.includes('arroz')) return i;
        if (ingredienteOrden.includes('fideos') && nombreNormalizado.includes('fideos')) return i;
        if (ingredienteOrden.includes('aceite') && nombreNormalizado.includes('aceite')) return i;
        if (ingredienteOrden.includes('sal') && nombreNormalizado.includes('sal')) return i;
        if (ingredienteOrden.includes('azúcar') && nombreNormalizado.includes('azúcar')) return i;
        if (ingredienteOrden.includes('cebolla') && nombreNormalizado.includes('cebolla')) return i;
        if (ingredienteOrden.includes('papa') && nombreNormalizado.includes('papa')) return i;
        if (ingredienteOrden.includes('tomate') && nombreNormalizado.includes('tomate')) return i;
        if (ingredienteOrden.includes('zanahoria') && nombreNormalizado.includes('zanahoria')) return i;
        if (ingredienteOrden.includes('zapallo') && nombreNormalizado.includes('zapallo')) return i;
    }

    // Si no se encuentra, poner al final (después de "Otros")
    return ORDEN_INGREDIENTES.length;
}

// Calcular pan total para la semana
export const calcularPanTotal = (menu: DiaMenu[]) => {
    let totalPan = 0; // en gramos

    menu.forEach(diaMenu => {
        if (diaMenu.sinMenu || diaMenu.incluirPan === false) return;

        const porcionesChica = Number(diaMenu.porciones.chica) || 0;
        const porcionesMediana = Number(diaMenu.porciones.mediana) || 0;
        const porcionesGrande = Number(diaMenu.porciones.grande) || 0;

        // 20g para porción chica, 25g para mediana y grande
        totalPan += (porcionesChica * 20) + ((porcionesMediana + porcionesGrande) * 25);
    });

    return totalPan;
};

// Función para agregar al acumulador, manejando conversiones si es necesario
const agregarAlAcumuladorHelper = (
    acumulador: AcumuladorIngredientes,
    nombre: string,
    cantidad: number,
    unidad: string,
    unidadMasa: UnidadMasa,
    unidadVolumen: UnidadVolumen
) => {
    let cantidadFinal = cantidad;
    let unidadFinal = unidad;

    // Convertir si es necesario para el acumulador
    if (unidad === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS) {
        cantidadFinal = cantidad / 1000;
        unidadFinal = 'kg';
    } else if (unidad === 'ml' && unidadVolumen === UnidadVolumen.LITROS) {
        cantidadFinal = cantidad / 1000;
        unidadFinal = 'l';
    }

    const clave = `${nombre}::${unidadFinal}`;
    if (!acumulador[clave]) {
        acumulador[clave] = { cantidad: 0, unidad: unidadFinal };
    }
    acumulador[clave].cantidad += cantidadFinal;
};

// Función para agregar fruta fresca al acumulador
export const agregarFrutaAlAcumulador = (
    acumulador: AcumuladorIngredientes,
    nombreFruta: string,
    cantidad: number,
    unidad: string,
    unidadMasa: UnidadMasa = UnidadMasa.GRAMOS,
    unidadVolumen: UnidadVolumen = UnidadVolumen.CENTIMETROS_CUBICOS
) => {
    const nombreConIdentificador = `${nombreFruta} (para postre)`;
    agregarAlAcumuladorHelper(acumulador, nombreConIdentificador, cantidad, unidad, unidadMasa, unidadVolumen);
};

// Calcula ingredientes para una receta y actualiza el acumulador
export const calcularIngredientesReceta = (
    titulo: string,
    totalPersonas: number,
    acumulador: AcumuladorIngredientes,
    usarLechePolvo: boolean = false,
    unidadMasa: UnidadMasa = UnidadMasa.GRAMOS,
    unidadVolumen: UnidadVolumen = UnidadVolumen.CENTIMETROS_CUBICOS
): (string | number)[][] => {
    const receta = Object.values(recetasAlmuerzo).find(r => r.title === titulo);
    if (!receta) return [];

    return receta.ingredients.flatMap(({ name, quantity, unit }) => {
        let cantidadFinal: number | string = quantity;
        let unidadFinal = unit;

        if (typeof quantity === 'number') {
            cantidadFinal = quantity * totalPersonas;

            if (name.toLowerCase().includes('huevo') && unit === 'g') {
                cantidadFinal = (cantidadFinal / 60).toFixed(2);
                unidadFinal = 'unidad/es';
            } else if (name.toLowerCase().includes('yema') && unit === 'g') {
                cantidadFinal = (cantidadFinal / 15).toFixed(2);
                unidadFinal = 'unidad/es';
            }

            // Usar nombre normalizado para agrupar ingredientes similares
            const nombreNormalizado = normalizarNombreIngrediente(name);
            const nombreLower = nombreNormalizado.toLowerCase();

            // Lógica de conversión de Leche Fluida a Polvo
            if (usarLechePolvo && (nombreLower === 'leche' || nombreLower === 'leche fluida')) {
                const cantidadNumerica = parseFloat(cantidadFinal as string); // Esto está en ml o unidad original (asumimos ml si es leche fluida)

                // Si la unidad original es litros, convertir a ml
                let cantidadEnMl = cantidadNumerica;
                if (['l', 'litro', 'litros'].includes(unit.toLowerCase())) {
                    cantidadEnMl = cantidadEnMl * 1000;
                }

                const { gramosPolvo, mlAgua } = convertirFluidaAPolvo(cantidadEnMl);

                // Agregar Leche en Polvo
                agregarAlAcumuladorHelper(acumulador, 'Leche en Polvo', gramosPolvo, 'g', unidadMasa, unidadVolumen);

                // Agregar Agua
                agregarAlAcumuladorHelper(acumulador, 'Agua (para leche en polvo)', mlAgua, 'ml', unidadMasa, unidadVolumen);

                // Para el retorno (tabla diaria), devolvemos leche en polvo y agua convertidos según preferencias

                // Conversión para visualización diaria
                let polvoMostrar = gramosPolvo;
                let unidadPolvo = 'g';
                if (unidadMasa === UnidadMasa.KILOGRAMOS) {
                    polvoMostrar = gramosPolvo / 1000;
                    unidadPolvo = 'kg';
                }

                let aguaMostrar = mlAgua;
                let unidadAgua = 'ml';
                if (unidadVolumen === UnidadVolumen.LITROS) {
                    aguaMostrar = mlAgua / 1000;
                    unidadAgua = 'l';
                }

                return [
                    ['Leche en Polvo', parseFloat(polvoMostrar.toFixed(4)), unidadPolvo],
                    ['Agua (para leche en polvo)', parseFloat(aguaMostrar.toFixed(4)), unidadAgua]
                ];

            } else {
                // Comportamiento normal
                const clave = `${nombreNormalizado}::${unidadFinal}`;
                agregarAlAcumuladorHelper(acumulador, nombreNormalizado, parseFloat(cantidadFinal as string), unidadFinal, unidadMasa, unidadVolumen);

                // Conversión para visualización diaria
                let cantidadMostrar = parseFloat(cantidadFinal as string);

                if (unidadFinal === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS) {
                    cantidadMostrar = cantidadMostrar / 1000;
                    unidadFinal = 'kg';
                } else if (unidadFinal === 'ml' && unidadVolumen === UnidadVolumen.LITROS) {
                    cantidadMostrar = cantidadMostrar / 1000;
                    unidadFinal = 'l';
                }

                // Ajustar precisión según preferencia (4 decimales)
                const cantidadFormatted = parseFloat(cantidadMostrar.toFixed(4));

                return [[name, cantidadFormatted, unidadFinal]];
            }
        }

        return [[name, cantidadFinal, unidadFinal]];
    });
};

export const procesarDatosPostre = (
    postre: string,
    totalPersonas: number,
    acumulador: AcumuladorIngredientes,
    unidadMasa: UnidadMasa = UnidadMasa.GRAMOS,
    unidadVolumen: UnidadVolumen = UnidadVolumen.CENTIMETROS_CUBICOS
) => {
    const postreData = pesosPostres[postre];
    if (!postreData) return null;

    if (postreData.tipo === 'fruta_fresca') {
        const pesoNumero = parseFloat(postreData.peso);

        if (!isNaN(pesoNumero) && postreData.unidad === 'g') {
            // Frutas por peso (g)
            const cantidadTotal = ajustarNumero(pesoNumero * totalPersonas, 4);
            agregarFrutaAlAcumulador(acumulador, postre, cantidadTotal, postreData.unidad, unidadMasa, unidadVolumen);

            // Return converted values for display if needed
            let displayCantidad = cantidadTotal;
            let displayUnidad = postreData.unidad;

            if (displayUnidad === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS) {
                displayCantidad = cantidadTotal / 1000;
                displayUnidad = 'kg';
            }

            return { tipo: 'fruta_peso', cantidadTotal: displayCantidad, unidad: displayUnidad };
        } else if (postreData.peso.includes('racimo')) {
            // Uvas
            const totalRacimos = aplicarCeilConEpsilon(totalPersonas, 4);
            agregarFrutaAlAcumulador(acumulador, postre, totalRacimos, 'racimos pequeños', unidadMasa, unidadVolumen);
            return { tipo: 'fruta_racimo', total: totalRacimos, unidad: 'racimos pequeños' };
        } else {
            // Frutas por unidad
            const cantidadBase = parseFloat(postreData.peso);
            const unidadDisplay = postreData.unidad || 'unidad';
            const totalUnidadesExacto = ajustarNumero(cantidadBase * totalPersonas, 6);
            const totalUnidades = aplicarCeilConEpsilon(totalUnidadesExacto, 6);
            const unidadFinal = unidadDisplay === 'unidad' ? 'unidades' : unidadDisplay;

            agregarFrutaAlAcumulador(acumulador, postre, totalUnidades, unidadFinal, unidadMasa, unidadVolumen);
            return {
                tipo: 'fruta_unidad',
                total: totalUnidades,
                unidad: unidadFinal,
                cantidadBase,
                unidadDisplay
            };
        }
    }

    return { tipo: 'receta' };
};
