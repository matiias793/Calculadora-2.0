import {
    particularidadesRecetas,
    recetasPorTipoCarne,
    postresDeLeche,
    postresDeFruta,
    frutasFrescas,
    frutasCitricas,
    diasSemana
} from '@/data/menu-data';
import {
    nombresRecetasAlmuerzo,
    nombresAcompanamientos,
    nombresPostres,
    recetasAlmuerzo
} from '@/utils/recetas-almuerzo';
import {
    getFrutasDeEstacion,
    obtenerMesActual,
    obtenerEstacionActual,
    esRecetaAdecuadaParaEstacion
} from '@/utils/frutas-estacion';
import {
    obtenerAcompanamientoParaReceta,
    obtenerPostreParaReceta
} from '@/utils/menu-rules';

// Función para obtener un elemento aleatorio de un array
const obtenerAleatorio = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

// Función para mezclar un array (shuffle)
const mezclarArray = <T,>(array: T[]): T[] => {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
};

export const generarMenuInteligente = () => {
    // Frutas de estación según mes actual (sugerencia interna)
    const frutasEstacionLocal = getFrutasDeEstacion(obtenerMesActual(), frutasFrescas).filter(f => frutasFrescas.includes(f));
    // Obtener estación actual
    const estacionActual = obtenerEstacionActual();

    // Función auxiliar para filtrar recetas por estación
    const filtrarRecetasPorEstacion = (recetas: string[]): string[] => {
        return recetas.filter(recetaNombre => {
            // Buscar la receta en recetasAlmuerzo
            const receta = Object.values(recetasAlmuerzo).find(r => r.title === recetaNombre);
            if (!receta) {
                // Si no se encuentra la receta, incluirla (por compatibilidad)
                return true;
            }
            // Verificar si tiene estacion definida usando 'in' operator para type narrowing
            if (!('estacion' in receta) || !receta.estacion) {
                // Si no tiene estación definida, incluirla (por compatibilidad)
                return true;
            }
            return esRecetaAdecuadaParaEstacion(receta.estacion, estacionActual);
        });
    };

    // Filtrar recetas que existen en nombresRecetasAlmuerzo y son adecuadas para la estación
    const recetasPollo = filtrarRecetasPorEstacion(
        recetasPorTipoCarne.pollo.filter(r => nombresRecetasAlmuerzo.includes(r))
    );
    const recetasVacuna = filtrarRecetasPorEstacion(
        recetasPorTipoCarne.vacuna.filter(r => nombresRecetasAlmuerzo.includes(r))
    );
    const recetasPescado = filtrarRecetasPorEstacion(
        recetasPorTipoCarne.pescado.filter(r => nombresRecetasAlmuerzo.includes(r))
    );
    const recetasCerdo = filtrarRecetasPorEstacion(
        recetasPorTipoCarne.cerdo.filter(r => nombresRecetasAlmuerzo.includes(r))
    );

    // --- SELECCIÓN BALANCEADA DE RECETAS ---
    // Objetivo: Elegir 5 recetas cumpliendo las frecuencias de carne, pero intentando
    // que sus preferencias de postre se acerquen a un split 3/2 para facilitar el trabajo posterior.

    const recetasSeleccionadas: string[] = [];
    const recetasYaUsadas = new Set<string>();

    let contadorLeche = 0;
    let contadorFruta = 0;

    // Helper para determinar preferencia de una receta (sin instanciar objetos complejos)
    const getPreferencia = (receta: string): 'leche' | 'fruta' | 'neutro' => {
        const parts = particularidadesRecetas[receta];
        if (!parts) return 'neutro';
        if (parts.postreRecomendado === 'leche') return 'leche';
        if (['fruta', 'fruta_citrica', 'fruta_estacion'].includes(parts.postreRecomendado)) return 'fruta';
        return 'neutro';
    };

    // Helper de Selección Inteligente
    const seleccionarBalanceado = (pool: string[], cantidad: number) => {
        const disponibles = pool.filter(r => !recetasYaUsadas.has(r));
        if (disponibles.length === 0) return;

        // Si no necesitamos seleccionar nada, salir
        if (cantidad <= 0) return;

        for (let i = 0; i < cantidad; i++) {
            // Recalcular disponibles en cada iteración
            const currentPool = pool.filter(r => !recetasYaUsadas.has(r));
            if (currentPool.length === 0) break;

            // Separar en grupos
            const grupoLeche = currentPool.filter(r => getPreferencia(r) === 'leche');
            const grupoFruta = currentPool.filter(r => getPreferencia(r) === 'fruta');
            const grupoNeutro = currentPool.filter(r => getPreferencia(r) === 'neutro');

            let elegido = '';

            // Lógica de Balanceo: Intentar igualar contadores hacia 3 vs 2
            // Si Leche va perdiendo mucho, priorizar Leche. Si Fruta va perdiendo, priorizar Fruta.
            // Si van parejos, priorizar Neutro o Random.
            const total = contadorLeche + contadorFruta;

            // Estrategia: "Best Effort" para mantener equilibrio
            if (contadorLeche > contadorFruta + 1 && grupoFruta.length > 0) {
                elegido = obtenerAleatorio(grupoFruta);
            } else if (contadorFruta > contadorLeche + 1 && grupoLeche.length > 0) {
                elegido = obtenerAleatorio(grupoLeche);
            } else {
                // Si no hay desbalance crítico, preferimos variedad o lo que haya
                if (grupoNeutro.length > 0 && Math.random() > 0.5) {
                    elegido = obtenerAleatorio(grupoNeutro);
                } else if (grupoFruta.length > 0 && grupoLeche.length > 0) {
                    // Si ambos tienen cards, elegir del que tenga menos votos globales
                    elegido = contadorLeche <= contadorFruta
                        ? obtenerAleatorio(grupoLeche)
                        : obtenerAleatorio(grupoFruta);
                } else {
                    // Random total si no hay opciones específicas
                    elegido = obtenerAleatorio(currentPool);
                }
            }

            // Fallback por seguridad
            if (!elegido) elegido = obtenerAleatorio(currentPool);

            // Actualizar contadores
            const pref = getPreferencia(elegido);
            if (pref === 'leche') contadorLeche++;
            if (pref === 'fruta') contadorFruta++;

            recetasSeleccionadas.push(elegido);
            recetasYaUsadas.add(elegido);
        }
    };

    // Aplicar selección por tipo de carne
    // Pollo: 2 veces
    seleccionarBalanceado(recetasPollo, 2);
    // Vacuna: 1 vez
    seleccionarBalanceado(recetasVacuna, 1);
    // Pescado: 1 vez
    seleccionarBalanceado(recetasPescado, 1);
    // Cerdo: 1 vez
    seleccionarBalanceado(recetasCerdo, 1);

    // Si faltan días (ej. falta de stock en algún tipo), completar con cualquiera válida de estación
    while (recetasSeleccionadas.length < diasSemana.length) {
        // Pool general de estación
        const poolGeneral = nombresRecetasAlmuerzo.filter(r =>
            !recetasYaUsadas.has(r) &&
            recetasPollo.includes(r) || recetasVacuna.includes(r) || recetasPescado.includes(r) || recetasCerdo.includes(r) // Asegurar que sea de los pools válidos de estación
        );

        // Si el pool general está vacío (muy raro), fallback a todo
        const poolFinal = poolGeneral.length > 0 ? poolGeneral : nombresRecetasAlmuerzo;

        seleccionarBalanceado(poolFinal, 1);
    }

    // Asegurar que no haya duplicados en las recetas seleccionadas
    const recetasUnicas: string[] = [];
    const recetasVistas = new Set<string>();
    for (const receta of recetasSeleccionadas) {
        if (!recetasVistas.has(receta)) {
            recetasUnicas.push(receta);
            recetasVistas.add(receta);
        }
    }

    // Si faltan recetas únicas, completar con recetas no usadas
    while (recetasUnicas.length < diasSemana.length) {
        const disponibles = nombresRecetasAlmuerzo.filter(r => !recetasVistas.has(r));
        if (disponibles.length > 0) {
            const receta = obtenerAleatorio(disponibles);
            recetasUnicas.push(receta);
            recetasVistas.add(receta);
        } else {
            break;
        }
    }

    // --- LÓGICA DE ASIGNACIÓN INTELIGENTE (Smart Sort) ---
    // En lugar de mezclar al azar, asignamos recetes a días basándonos en el patrón de postres

    // 1. Analizar preferencias de postre de las 5 recetas seleccionadas
    let votosLeche = 0;
    let votosFruta = 0;
    const preferenciasRecetas = recetasUnicas.slice(0, 5).map(receta => {
        const parts = particularidadesRecetas[receta];
        // Determinar preferencia: 'leche', 'fruta' (incluye cítrica y estación), o 'neutro'
        let tipo = 'neutro';
        if (parts) {
            if (parts.postreRecomendado === 'leche') tipo = 'leche';
            else if (['fruta', 'fruta_estacion', 'fruta_citrica'].includes(parts.postreRecomendado)) tipo = 'fruta';
        }

        if (tipo === 'leche') votosLeche++;
        if (tipo === 'fruta') votosFruta++;

        return { receta, tipo, parts };
    });

    // 2. Definir el Patrón Estricto 3vs2
    // Si hay más o igual votos para leche, patrón L-F-L-F-L. Si no, F-L-F-L-F.
    const ganaLeche = votosLeche >= votosFruta;
    const patronSemanal = ganaLeche
        ? ['leche', 'fruta', 'leche', 'fruta', 'leche']
        : ['fruta', 'leche', 'fruta', 'leche', 'fruta'];

    // 3. Asignar Recetas a Días (Smart Sort)
    const recetasOrdenadas: string[] = new Array(5).fill('');
    const recetasUsadasSet = new Set<string>();

    // Pasada 1: Coincidencias Exactas
    patronSemanal.forEach((tipoDia, indexDia) => {
        if (recetasOrdenadas[indexDia]) return; // Ya asignado

        // Buscar receta que prefiera este tipo y no esté usada
        const candidato = preferenciasRecetas.find(p =>
            !recetasUsadasSet.has(p.receta) && p.tipo === tipoDia
        );

        if (candidato) {
            recetasOrdenadas[indexDia] = candidato.receta;
            recetasUsadasSet.add(candidato.receta);
        }
    });

    // Pasada 2: Neutros
    patronSemanal.forEach((tipoDia, indexDia) => {
        if (recetasOrdenadas[indexDia]) return;

        const candidato = preferenciasRecetas.find(p =>
            !recetasUsadasSet.has(p.receta) && p.tipo === 'neutro'
        );

        if (candidato) {
            recetasOrdenadas[indexDia] = candidato.receta;
            recetasUsadasSet.add(candidato.receta);
        }
    });

    // Pasada 3: Rellenar con lo que sobre (Mismatch forzado)
    patronSemanal.forEach((tipoDia, indexDia) => {
        if (recetasOrdenadas[indexDia]) return;

        const candidato = preferenciasRecetas.find(p => !recetasUsadasSet.has(p.receta));
        if (candidato) {
            recetasOrdenadas[indexDia] = candidato.receta;
            recetasUsadasSet.add(candidato.receta);
        }
    });

    // 4. Seleccionar Postres Específicos para cada día
    // Preparar pools de postres
    const todosPostresDisponiblesList = [...nombresPostres, ...frutasFrescas];

    // Filtrar postres de leche disponibles
    const poolLeche = mezclarArray(
        postresDeLeche.filter(p => todosPostresDisponiblesList.includes(p))
    );

    // Filtrar postres de fruta disponibles (incluyendo frutas frescas)
    const poolFruta = mezclarArray(
        [...postresDeFruta.filter(p => todosPostresDisponiblesList.includes(p)), ...frutasFrescas]
    );

    // Asegurar frutas cítricas para casos especiales
    const poolCitricos = mezclarArray(
        frutasCitricas.filter(f => frutasFrescas.includes(f))
    );

    const postresAsignados: string[] = new Array(5).fill('');
    const postresUsadosFinal = new Set<string>();

    recetasOrdenadas.forEach((receta, index) => {
        const tipoDia = patronSemanal[index];
        const parts = particularidadesRecetas[receta];

        let postreSeleccionado = '';

        // Regla Especial: Lentejas obligan a Cítrico (si el día es fruta)
        if (parts?.postreRecomendado === 'fruta_citrica' && tipoDia === 'fruta') {
            const citrico = poolCitricos.find(p => !postresUsadosFinal.has(p));
            if (citrico) postreSeleccionado = citrico;
        }

        // Selección normal si no hubo regla especial
        if (!postreSeleccionado) {
            const pool = tipoDia === 'leche' ? poolLeche : poolFruta;

            // 1. Intentar uno no usado
            let candidato = pool.find(p => !postresUsadosFinal.has(p));

            // 2. Si se acabaron los únicos, repetir (pero intentar no repetir el INMEDIATO anterior)
            if (!candidato) {
                const anterior = index > 0 ? postresAsignados[index - 1] : null;
                candidato = pool.find(p => p !== anterior) || pool[0];
            }

            postreSeleccionado = candidato!;
        }

        // VALIDACIÓN FINAL: Arroz con Leche
        // Si el plato principal o acompañamiento tiene arroz, Y salió Arroz con Leche, cambiarlo
        const nombreAcom = obtenerAcompanamientoParaReceta(receta, nombresAcompanamientos);
        const tieneArroz = (receta.toLowerCase().includes('arroz')) ||
            (nombreAcom.toLowerCase().includes('arroz'));

        if (tieneArroz && postreSeleccionado === 'Arroz con leche') {
            // Buscar alternativa en el mismo pool de leche
            const alternativo = poolLeche.find(p => p !== 'Arroz con leche' && p !== postresAsignados[index - 1]);
            if (alternativo) postreSeleccionado = alternativo;
        }

        postresAsignados[index] = postreSeleccionado;
        postresUsadosFinal.add(postreSeleccionado);
    });

    // Construir Menú Final
    const nuevoMenu = diasSemana.map((dia, index) => {
        const recetaPrincipal = recetasOrdenadas[index];
        const acompanamiento = obtenerAcompanamientoParaReceta(recetaPrincipal, nombresAcompanamientos);
        const particularidades = recetaPrincipal ? particularidadesRecetas[recetaPrincipal] : null;
        const incluirPan = !particularidades?.llevaMasa;

        return {
            dia,
            principal: recetaPrincipal,
            acompanamiento,
            recetaBase: '',
            postre: postresAsignados[index],
            sinMenu: false,
            porciones: { chica: '', mediana: '', grande: '' },
            incluirPan
        };
    });

    return nuevoMenu;
};
