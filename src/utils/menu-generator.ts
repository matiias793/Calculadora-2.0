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

    // Seleccionar recetas según las reglas
    const recetasSeleccionadas: string[] = [];
    const recetasYaUsadas = new Set<string>();

    // Pollo: 2 veces (asegurar que no haya duplicados)
    const recetasPolloDisponibles = [...recetasPollo];
    for (let i = 0; i < 2 && recetasPolloDisponibles.length > 0; i++) {
        const recetaSeleccionada = obtenerAleatorio(recetasPolloDisponibles);
        recetasSeleccionadas.push(recetaSeleccionada);
        recetasYaUsadas.add(recetaSeleccionada);
        // Remover la receta seleccionada para evitar duplicados
        const index = recetasPolloDisponibles.indexOf(recetaSeleccionada);
        if (index > -1) {
            recetasPolloDisponibles.splice(index, 1);
        }
    }

    // Vacuna: 1 vez
    // Vacuna: 1 vez
    const recetasVacunaDisponibles = recetasVacuna.filter(r => !recetasYaUsadas.has(r));
    if (recetasVacunaDisponibles.length > 0) {
        const receta = obtenerAleatorio(recetasVacunaDisponibles);
        recetasSeleccionadas.push(receta);
        recetasYaUsadas.add(receta);
    }

    // Pescado: 1 vez
    // Pescado: 1 vez
    const recetasPescadoDisponibles = recetasPescado.filter(r => !recetasYaUsadas.has(r));
    if (recetasPescadoDisponibles.length > 0) {
        const receta = obtenerAleatorio(recetasPescadoDisponibles);
        recetasSeleccionadas.push(receta);
        recetasYaUsadas.add(receta);
    }

    // Cerdo: 1 vez
    // Cerdo: 1 vez
    const recetasCerdoDisponibles = recetasCerdo.filter(r => !recetasYaUsadas.has(r));
    if (recetasCerdoDisponibles.length > 0) {
        const receta = obtenerAleatorio(recetasCerdoDisponibles);
        recetasSeleccionadas.push(receta);
        recetasYaUsadas.add(receta);
    }

    // Si faltan días, completar con opciones aleatorias SIN REPETIR
    // Filtrar también por estación
    while (recetasSeleccionadas.length < diasSemana.length) {
        // Primero intentar con recetas de la estación que no estén usadas
        const recetasDisponibles = filtrarRecetasPorEstacion(
            nombresRecetasAlmuerzo.filter(r => !recetasYaUsadas.has(r))
        );
        if (recetasDisponibles.length > 0) {
            const receta = obtenerAleatorio(recetasDisponibles);
            recetasSeleccionadas.push(receta);
            recetasYaUsadas.add(receta);
        } else {
            // Si no hay más recetas disponibles para la estación, intentar sin filtro de estación
            const todasRecetasDisponibles = nombresRecetasAlmuerzo.filter(r => !recetasYaUsadas.has(r));
            if (todasRecetasDisponibles.length > 0) {
                const receta = obtenerAleatorio(todasRecetasDisponibles);
                recetasSeleccionadas.push(receta);
                recetasYaUsadas.add(receta);
            } else {
                // Si realmente no hay más opciones únicas, usar recetas ya seleccionadas pero mezcladas
                // Esto solo debería pasar si hay muy pocas recetas disponibles
                const recetasYaSeleccionadas = [...recetasSeleccionadas];
                if (recetasYaSeleccionadas.length > 0) {
                    recetasSeleccionadas.push(obtenerAleatorio(recetasYaSeleccionadas));
                } else {
                    break;
                }
            }
        }
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

    // Mezclar las recetas para distribución aleatoria en la semana
    const recetasMezcladas = mezclarArray(recetasUnicas.slice(0, diasSemana.length));

    // Seleccionar postres: 2-3 de leche y 2-3 de fruta (total 4-5, pero tenemos 5 días)
    // Combinar postres de fruta con frutas frescas disponibles
    const todosPostresDisponiblesList = [...nombresPostres, ...frutasFrescas];
    const postresLecheDisponibles = postresDeLeche.filter(p => todosPostresDisponiblesList.includes(p));
    const postresFrutaDisponibles = [...postresDeFruta.filter(p => todosPostresDisponiblesList.includes(p)), ...frutasFrescas];

    // Verificar si hay recetas que requieren fruta cítrica (lentejas)
    const recetasConLentejas = recetasMezcladas.filter(r => {
        const particularidades = particularidadesRecetas[r];
        return particularidades?.postreRecomendado === 'fruta_citrica';
    });

    const postresSeleccionados: string[] = [];
    const postresYaUsados = new Set<string>();

    // Si hay recetas con lentejas, asegurar que haya al menos una fruta cítrica disponible
    if (recetasConLentejas.length > 0) {
        const frutasCitricasDisponibles = frutasCitricas.filter(f => frutasFrescas.includes(f));
        if (frutasCitricasDisponibles.length > 0) {
            const frutaCitrica = obtenerAleatorio(frutasCitricasDisponibles);
            postresSeleccionados.push(frutaCitrica);
            postresYaUsados.add(frutaCitrica);
        }
    }

    // Seleccionar 2-3 postres de leche (asegurar variedad)
    const cantidadPostresLeche = Math.floor(Math.random() * 2) + 2; // 2 o 3
    const postresLecheCopia = [...postresLecheDisponibles];
    for (let i = 0; i < cantidadPostresLeche && postresLecheCopia.length > 0; i++) {
        const postre = obtenerAleatorio(postresLecheCopia);
        postresSeleccionados.push(postre);
        postresYaUsados.add(postre);
        const index = postresLecheCopia.indexOf(postre);
        if (index > -1) {
            postresLecheCopia.splice(index, 1);
        }
    }

    // Completar con postres de fruta y frutas frescas hasta tener 5 (asegurar variedad)
    const postresFrutaCopia = [...postresFrutaDisponibles].filter(p => !postresYaUsados.has(p));
    while (postresSeleccionados.length < diasSemana.length && postresFrutaCopia.length > 0) {
        const postre = obtenerAleatorio(postresFrutaCopia);
        postresSeleccionados.push(postre);
        postresYaUsados.add(postre);
        const index = postresFrutaCopia.indexOf(postre);
        if (index > -1) {
            postresFrutaCopia.splice(index, 1);
        }
    }

    // Si aún faltan postres, completar con los disponibles (puede incluir duplicados si es necesario)
    const todosPostresDisponibles = [...nombresPostres, ...frutasFrescas].filter(p => !postresYaUsados.has(p));
    while (postresSeleccionados.length < diasSemana.length) {
        if (todosPostresDisponibles.length > 0) {
            const postre = obtenerAleatorio(todosPostresDisponibles);
            postresSeleccionados.push(postre);
            postresYaUsados.add(postre);
            const index = todosPostresDisponibles.indexOf(postre);
            if (index > -1) {
                todosPostresDisponibles.splice(index, 1);
            }
        } else {
            // Si no hay más postres únicos, permitir duplicados de leche o fruta
            if (postresLecheDisponibles.length > 0) {
                postresSeleccionados.push(obtenerAleatorio(postresLecheDisponibles));
            } else if (postresFrutaDisponibles.length > 0) {
                postresSeleccionados.push(obtenerAleatorio(postresFrutaDisponibles));
            } else {
                break;
            }
        }
    }

    // Función para distribuir postres evitando consecutivos del mismo tipo
    const distribuirPostresSinConsecutivos = (postres: string[]): string[] => {
        if (postres.length === 0) return [];

        // Clasificar postres por tipo
        const postresLeche: string[] = [];
        const postresFruta: string[] = [];

        postres.forEach(postre => {
            if (postresDeLeche.includes(postre)) {
                postresLeche.push(postre);
            } else if (postresDeFruta.includes(postre) || frutasFrescas.includes(postre)) {
                postresFruta.push(postre);
            } else {
                // Si no está en ninguna categoría, asignarlo a fruta por defecto
                postresFruta.push(postre);
            }
        });

        const resultado: string[] = new Array(diasSemana.length).fill('');
        const usados = new Set<string>();

        // Función auxiliar para verificar si un postre puede ir en una posición
        const puedeIrEnPosicion = (postre: string, posicion: number): boolean => {
            if (usados.has(postre)) return false;

            const esLeche = postresDeLeche.includes(postre);
            const esFruta = postresDeFruta.includes(postre) || frutasFrescas.includes(postre);

            // Verificar que no haya consecutivos del mismo tipo
            if (posicion > 0 && resultado[posicion - 1]) {
                const anteriorEsLeche = postresDeLeche.includes(resultado[posicion - 1]);
                const anteriorEsFruta = postresDeFruta.includes(resultado[posicion - 1]) || frutasFrescas.includes(resultado[posicion - 1]);

                if (esLeche && anteriorEsLeche) return false;
                if (esFruta && anteriorEsFruta) return false;
            }

            if (posicion < resultado.length - 1 && resultado[posicion + 1]) {
                const siguienteEsLeche = postresDeLeche.includes(resultado[posicion + 1]);
                const siguienteEsFruta = postresDeFruta.includes(resultado[posicion + 1]) || frutasFrescas.includes(resultado[posicion + 1]);

                if (esLeche && siguienteEsLeche) return false;
                if (esFruta && siguienteEsFruta) return false;
            }

            return true;
        };

        // Distribuir alternando tipos cuando sea posible
        let indiceLeche = 0;
        let indiceFruta = 0;
        let intentos = 0;
        const maxIntentos = 100;

        // Intentar distribuir de manera balanceada
        for (let i = 0; i < diasSemana.length && intentos < maxIntentos; i++) {
            let asignado = false;

            // Intentar alternar tipos
            if (i % 2 === 0 && indiceLeche < postresLeche.length) {
                // Posición par: intentar postre de leche
                for (let j = indiceLeche; j < postresLeche.length; j++) {
                    const postre = postresLeche[j];
                    if (puedeIrEnPosicion(postre, i)) {
                        resultado[i] = postre;
                        usados.add(postre);
                        indiceLeche = j + 1;
                        asignado = true;
                        break;
                    }
                }
            }

            if (!asignado && indiceFruta < postresFruta.length) {
                // Intentar postre de fruta
                for (let j = indiceFruta; j < postresFruta.length; j++) {
                    const postre = postresFruta[j];
                    if (puedeIrEnPosicion(postre, i)) {
                        resultado[i] = postre;
                        usados.add(postre);
                        indiceFruta = j + 1;
                        asignado = true;
                        break;
                    }
                }
            }

            // Si no se pudo asignar con el tipo preferido, intentar con el otro
            if (!asignado) {
                if (i % 2 === 0 && indiceFruta < postresFruta.length) {
                    for (let j = indiceFruta; j < postresFruta.length; j++) {
                        const postre = postresFruta[j];
                        if (puedeIrEnPosicion(postre, i)) {
                            resultado[i] = postre;
                            usados.add(postre);
                            indiceFruta = j + 1;
                            asignado = true;
                            break;
                        }
                    }
                } else if (indiceLeche < postresLeche.length) {
                    for (let j = indiceLeche; j < postresLeche.length; j++) {
                        const postre = postresLeche[j];
                        if (puedeIrEnPosicion(postre, i)) {
                            resultado[i] = postre;
                            usados.add(postre);
                            indiceLeche = j + 1;
                            asignado = true;
                            break;
                        }
                    }
                }
            }

            // Si aún no se asignó, buscar cualquier postre disponible que no cree consecutivos
            if (!asignado) {
                const disponibles = postres.filter(p => !usados.has(p) && puedeIrEnPosicion(p, i));
                if (disponibles.length > 0) {
                    resultado[i] = disponibles[0];
                    usados.add(disponibles[0]);
                    asignado = true;
                } else {
                    // Si no hay disponible que no cree consecutivos, usar cualquier disponible
                    const cualquierDisponible = postres.filter(p => !usados.has(p));
                    if (cualquierDisponible.length > 0) {
                        resultado[i] = cualquierDisponible[0];
                        usados.add(cualquierDisponible[0]);
                    }
                }
            }

            intentos++;
        }

        // Completar posiciones vacías con postres restantes, verificando que no creen consecutivos
        const postresRestantes = postres.filter(p => !usados.has(p));
        for (let i = 0; i < resultado.length; i++) {
            if (!resultado[i] && postresRestantes.length > 0) {
                // Buscar un postre que no cree consecutivos
                const postreValido = postresRestantes.find(p => puedeIrEnPosicion(p, i));
                if (postreValido) {
                    resultado[i] = postreValido;
                    usados.add(postreValido);
                    const index = postresRestantes.indexOf(postreValido);
                    if (index > -1) {
                        postresRestantes.splice(index, 1);
                    }
                } else if (postresRestantes.length > 0) {
                    // Si no hay válido, usar cualquier disponible
                    resultado[i] = postresRestantes.shift() || '';
                }
            }
        }

        return resultado;
    };

    // Distribuir postres evitando consecutivos del mismo tipo
    const postresMezclados = distribuirPostresSinConsecutivos(postresSeleccionados.slice(0, diasSemana.length));

    // Crear el menú semanal con acompañamientos primero, luego postres
    const nuevoMenuTemporal = diasSemana.map((dia, index) => {
        const recetaPrincipal = recetasMezcladas[index] || '';
        const acompanamiento = obtenerAcompanamientoParaReceta(recetaPrincipal, nombresAcompanamientos);
        const particularidades = recetaPrincipal ? particularidadesRecetas[recetaPrincipal] : null;
        const incluirPan = !particularidades?.llevaMasa; // No incluir pan si la receta lleva masa

        return {
            dia,
            principal: recetaPrincipal,
            acompanamiento,
            recetaBase: '',
            postre: '',
            sinMenu: false,
            porciones: { chica: '', mediana: '', grande: '' },
            incluirPan
        };
    });

    // Función auxiliar para verificar si un postre puede ir en una posición sin crear consecutivos
    const puedeAsignarPostre = (postre: string, posicion: number, postresAsignados: string[]): boolean => {
        const esLeche = postresDeLeche.includes(postre);
        const esFruta = postresDeFruta.includes(postre) || frutasFrescas.includes(postre);

        // Verificar día anterior
        if (posicion > 0 && postresAsignados[posicion - 1]) {
            const anteriorEsLeche = postresDeLeche.includes(postresAsignados[posicion - 1]);
            const anteriorEsFruta = postresDeFruta.includes(postresAsignados[posicion - 1]) || frutasFrescas.includes(postresAsignados[posicion - 1]);

            if (esLeche && anteriorEsLeche) return false;
            if (esFruta && anteriorEsFruta) return false;
        }

        // Verificar día siguiente
        if (posicion < postresAsignados.length - 1 && postresAsignados[posicion + 1]) {
            const siguienteEsLeche = postresDeLeche.includes(postresAsignados[posicion + 1]);
            const siguienteEsFruta = postresDeFruta.includes(postresAsignados[posicion + 1]) || frutasFrescas.includes(postresAsignados[posicion + 1]);

            if (esLeche && siguienteEsLeche) return false;
            if (esFruta && siguienteEsFruta) return false;
        }

        return true;
    };

    // Asignar postres según recomendaciones, pero respetando la distribución sin consecutivos
    const postresAsignados: string[] = new Array(diasSemana.length).fill('');
    const postresUsados = new Set<string>();

    // Usar los postres distribuidos sin consecutivos como base
    const postresBase = [...postresMezclados];

    // Primera pasada: intentar asignar postres recomendados respetando distribución sin consecutivos
    nuevoMenuTemporal.forEach((item, index) => {
        const { principal, acompanamiento } = item;
        const particularidades = particularidadesRecetas[principal];

        if (!particularidades) {
            // Si no hay particularidades, usar el postre de la distribución base si está disponible
            if (postresBase[index] && !postresUsados.has(postresBase[index]) &&
                puedeAsignarPostre(postresBase[index], index, postresAsignados)) {
                postresAsignados[index] = postresBase[index];
                postresUsados.add(postresBase[index]);
            }
            return;
        }

        // Obtener postres candidatos según recomendaciones y restricciones
        const postresDisponibles = todosPostresDisponiblesList.filter(p => !postresUsados.has(p));

        // PRIORIDAD: Si la receta requiere fruta cítrica (lentejas), asegurar que se asigne
        if (particularidades.postreRecomendado === 'fruta_citrica') {
            const frutasCitricasDisponibles = frutasCitricas.filter(p =>
                postresDisponibles.includes(p) && puedeAsignarPostre(p, index, postresAsignados)
            );
            if (frutasCitricasDisponibles.length > 0) {
                const postreCitrico = obtenerAleatorio(frutasCitricasDisponibles);
                postresAsignados[index] = postreCitrico;
                postresUsados.add(postreCitrico);
                return;
            }
        }

        const postreRecomendado = obtenerPostreParaReceta(principal, acompanamiento, postresDisponibles);

        // Verificar si el postre recomendado puede ir en esta posición sin crear consecutivos
        if (postreRecomendado && puedeAsignarPostre(postreRecomendado, index, postresAsignados)) {
            postresAsignados[index] = postreRecomendado;
            postresUsados.add(postreRecomendado);
        } else {
            // Si el recomendado no puede ir, buscar una alternativa del mismo tipo que no cree consecutivos
            let postreAlternativo = null;

            if (postreRecomendado) {
                const esLecheRecomendado = postresDeLeche.includes(postreRecomendado);
                const esFrutaRecomendado = postresDeFruta.includes(postreRecomendado) || frutasFrescas.includes(postreRecomendado);

                // Buscar alternativa del mismo tipo
                if (esLecheRecomendado) {
                    postreAlternativo = postresDeLeche.find(p =>
                        postresDisponibles.includes(p) &&
                        puedeAsignarPostre(p, index, postresAsignados)
                    );
                } else if (esFrutaRecomendado) {
                    postreAlternativo = [...postresDeFruta, ...frutasFrescas].find(p =>
                        postresDisponibles.includes(p) &&
                        puedeAsignarPostre(p, index, postresAsignados)
                    );
                }
            }

            if (postreAlternativo) {
                postresAsignados[index] = postreAlternativo;
                postresUsados.add(postreAlternativo);
            } else if (postresBase[index] && !postresUsados.has(postresBase[index]) &&
                puedeAsignarPostre(postresBase[index], index, postresAsignados)) {
                // Si no hay alternativa del mismo tipo, usar el de la distribución base
                postresAsignados[index] = postresBase[index];
                postresUsados.add(postresBase[index]);
            }
        }
    });

    // Segunda pasada: completar posiciones vacías respetando distribución sin consecutivos
    const postresRestantes = postresBase.filter(p => !postresUsados.has(p));
    const todosPostresRestantes = todosPostresDisponiblesList.filter(p => !postresUsados.has(p));

    for (let i = 0; i < diasSemana.length; i++) {
        if (!postresAsignados[i]) {
            const { principal, acompanamiento } = nuevoMenuTemporal[i];
            const particularidades = principal ? particularidadesRecetas[principal] : null;

            let postreFinal = '';

            // Primero intentar con postres de la distribución base
            // Verificar si hay arroz en el acompañamiento o plato principal
            const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
            const tieneArroz = (acompanamiento && acompanamientosConArroz.includes(acompanamiento)) ||
                (principal && principal.toLowerCase().includes('arroz'));

            if (postresRestantes.length > 0) {
                for (const postre of postresRestantes) {
                    // Excluir arroz con leche si hay arroz
                    if (tieneArroz && postre === 'Arroz con leche') continue;
                    if (puedeAsignarPostre(postre, i, postresAsignados)) {
                        postreFinal = postre;
                        break;
                    }
                }
            }

            // Si no se encontró en la base, intentar con recomendaciones
            if (!postreFinal && particularidades) {
                // PRIORIDAD: Si la receta requiere fruta cítrica (lentejas), asegurar que se asigne
                if (particularidades.postreRecomendado === 'fruta_citrica') {
                    const frutasCitricasDisponibles = frutasCitricas.filter(p =>
                        todosPostresRestantes.includes(p) && puedeAsignarPostre(p, i, postresAsignados)
                    );
                    if (frutasCitricasDisponibles.length > 0) {
                        postreFinal = obtenerAleatorio(frutasCitricasDisponibles);
                    }
                }

                // Si aún no hay postre, intentar con otras recomendaciones
                if (!postreFinal) {
                    const postresDisponibles = todosPostresRestantes.filter(p =>
                        puedeAsignarPostre(p, i, postresAsignados)
                    );
                    if (postresDisponibles.length > 0) {
                        postreFinal = obtenerPostreParaReceta(principal, acompanamiento, postresDisponibles);
                    }
                }
            }

            // Si aún no hay postre, usar cualquier disponible que no cree consecutivos
            if (!postreFinal) {
                // Verificar si hay arroz en el acompañamiento o plato principal
                const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
                const tieneArroz = (acompanamiento && acompanamientosConArroz.includes(acompanamiento)) ||
                    (principal && principal.toLowerCase().includes('arroz'));

                const postresCandidatos = todosPostresRestantes.filter(p => {
                    if (!puedeAsignarPostre(p, i, postresAsignados)) return false;
                    // Excluir arroz con leche si hay arroz
                    if (tieneArroz && p === 'Arroz con leche') return false;
                    return true;
                });

                if (postresCandidatos.length > 0) {
                    postreFinal = obtenerAleatorio(postresCandidatos);
                } else if (todosPostresRestantes.length > 0) {
                    // Si no hay opciones que eviten consecutivos, usar cualquier disponible (excepto arroz con leche si hay arroz)
                    const tieneArroz = (acompanamiento && acompanamientosConArroz.includes(acompanamiento)) ||
                        (principal && principal.toLowerCase().includes('arroz'));
                    const postresFinales = tieneArroz
                        ? todosPostresRestantes.filter(p => p !== 'Arroz con leche')
                        : todosPostresRestantes;
                    postreFinal = postresFinales.length > 0 ? postresFinales[0] : todosPostresRestantes[0];
                }
            }

            if (postreFinal) {
                postresAsignados[i] = postreFinal;
                postresUsados.add(postreFinal);
                const indexRestante = postresRestantes.indexOf(postreFinal);
                if (indexRestante > -1) {
                    postresRestantes.splice(indexRestante, 1);
                }
                const indexTodosRestantes = todosPostresRestantes.indexOf(postreFinal);
                if (indexTodosRestantes > -1) {
                    todosPostresRestantes.splice(indexTodosRestantes, 1);
                }
            }
        }
    }

    // Crear el menú final con postres asignados
    const nuevoMenu = nuevoMenuTemporal.map((item, index) => ({
        ...item,
        postre: postresAsignados[index] || ''
    }));

    return nuevoMenu;
};
