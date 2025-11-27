import {
    particularidadesRecetas,
    postresDeLeche,
    postresDeFruta,
    frutasFrescas,
    frutasCitricas,
    getFrutasEstacionActual,
    variantesPostreDeLeche
} from '@/data/menu-data';

// Constantes auxiliares
const ACOMPANAMIENTOS_CON_ARROZ = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];

export const esRecetaConMasa = (nombreReceta: string): boolean => {
    return !!particularidadesRecetas[nombreReceta]?.llevaMasa;
};

export const validarConflictoArroz = (plato: string, guarnicion: string, postre: string): boolean => {
    if (postre !== 'Arroz con leche') return false;

    const tieneArrozEnGuarnicion = guarnicion && ACOMPANAMIENTOS_CON_ARROZ.includes(guarnicion);
    const tieneArrozEnPlato = plato && plato.toLowerCase().includes('arroz');

    return !!(tieneArrozEnGuarnicion || tieneArrozEnPlato);
};

export const obtenerAdvertenciaPostre = (
    plato: string,
    guarnicion: string,
    postre: string
): { tipo: 'error' | 'warning' | 'info', mensaje: string } | null => {
    if (!postre) return null;

    const conflictoArroz = validarConflictoArroz(plato, guarnicion, postre);
    const esPolloColorido = plato === 'Pollo colorido';
    const tieneArroz = (guarnicion && ACOMPANAMIENTOS_CON_ARROZ.includes(guarnicion)) ||
        (plato && plato.toLowerCase().includes('arroz'));

    // Caso específico: Pollo colorido con arroz y Arroz con leche
    if (esPolloColorido && tieneArroz && postre === 'Arroz con leche') {
        return {
            tipo: 'error',
            mensaje: '⚠️ Advertencia: "Arroz con leche" no se puede usar cuando el acompañamiento es arroz. Por favor, seleccione otro postre de leche.'
        };
    }

    // Caso general: Arroz con leche y comida con arroz
    if (conflictoArroz) {
        return {
            tipo: 'error',
            mensaje: '⚠️ Advertencia: "Arroz con leche" no se recomienda cuando el acompañamiento es arroz. Por favor, seleccione otro postre.'
        };
    }

    // Advertencia leve si hay arroz y el postre NO es arroz con leche (pero podría serlo)
    if (tieneArroz && postre !== 'Arroz con leche') {
        return {
            tipo: 'warning',
            mensaje: '⚠️ Nota: No se recomienda seleccionar "Arroz con leche" cuando el acompañamiento contiene arroz.'
        };
    }

    // Recomendación para Pollo colorido (debe ser postre de leche)
    if (esPolloColorido && guarnicion === 'Fideos' && !postresDeLeche.includes(postre)) {
        return {
            tipo: 'warning',
            mensaje: '💡 Recomendación: Para Pollo colorido, se sugiere un postre de leche.'
        };
    }

    return null;
};

export const calcularPan = (
    incluirPan: boolean,
    porciones: { chica: string | number, mediana: string | number, grande: string | number }
): number => {
    if (!incluirPan) return 0;

    const pChica = Number(porciones.chica) || 0;
    const pMediana = Number(porciones.mediana) || 0;
    const pGrande = Number(porciones.grande) || 0;

    return (pChica * 20) + ((pMediana + pGrande) * 25);
};

export const obtenerRecomendacionesPostre = (plato: string, guarnicion: string) => {
    const particularidades = particularidadesRecetas[plato];
    const mostrarRecomendados = particularidades?.postreRecomendado;

    // Determinar postres excluidos
    const postresExcluidos: string[] = [];
    if (particularidades?.postresExcluidos) {
        postresExcluidos.push(...particularidades.postresExcluidos);
    }

    // Si el acompañamiento contiene arroz, excluir arroz con leche
    if (guarnicion && ACOMPANAMIENTOS_CON_ARROZ.includes(guarnicion)) {
        postresExcluidos.push('Arroz con leche');
    }

    // Filtrar listas base
    const postresLecheDisponibles = postresDeLeche.filter(p => !postresExcluidos.includes(p));
    const variantesLecheDisponibles = postresLecheDisponibles.filter(p => variantesPostreDeLeche.includes(p));
    const postresLecheBase = postresLecheDisponibles.filter(p => !variantesPostreDeLeche.includes(p));

    const budinesDisponibles = postresDeFruta.filter(p => !postresExcluidos.includes(p));
    const frutasDisponibles = frutasFrescas.filter(p => !postresExcluidos.includes(p));
    const frutasEstacion = getFrutasEstacionActual();

    let postresLecheRecomendados: string[] = [];
    let postresLecheOtros: string[] = [];
    let budinesRecomendados: string[] = [];
    let budinesOtros: string[] = [];
    let frutasRecomendadas: string[] = [];
    let frutasOtros: string[] = [];

    // Lógica específica por plato
    if (plato === 'Pollo colorido') {
        postresLecheRecomendados = postresLecheBase;
        postresLecheOtros = [];
        // Si tiene arroz, no mostrar frutas
        if (guarnicion && ACOMPANAMIENTOS_CON_ARROZ.includes(guarnicion)) {
            frutasRecomendadas = [];
            frutasOtros = [];
        } else {
            // Si es fideos, tampoco se recomiendan frutas (solo leche)
            frutasRecomendadas = [];
            frutasOtros = [];
        }
    } else if (plato === 'Pan de Carne / Hamburguesa' || plato === 'Pasta sorpresa') {
        postresLecheRecomendados = postresLecheBase;
        postresLecheOtros = [];

        const frutasEstacionDisponibles = frutasEstacion.filter(f => !postresExcluidos.includes(f) && frutasDisponibles.includes(f));
        frutasRecomendadas = frutasEstacionDisponibles;
        frutasOtros = frutasDisponibles.filter(f => !frutasEstacionDisponibles.includes(f));
    } else {
        // Lógica estándar basada en particularidades
        postresLecheRecomendados = mostrarRecomendados === 'leche' ? postresLecheBase : [];
        postresLecheOtros = mostrarRecomendados === 'leche' ? [] : postresLecheBase;

        budinesRecomendados = (mostrarRecomendados === 'fruta' || mostrarRecomendados === 'fruta_estacion') ? budinesDisponibles : [];
        budinesOtros = (mostrarRecomendados === 'fruta' || mostrarRecomendados === 'fruta_estacion') ? [] : budinesDisponibles;

        frutasRecomendadas =
            mostrarRecomendados === 'fruta_estacion' ? frutasDisponibles : // Simplificación: mostrar todas si es estación (se podría filtrar más)
                mostrarRecomendados === 'fruta_citrica' ? frutasCitricas.filter(f => !postresExcluidos.includes(f)) :
                    mostrarRecomendados === 'fruta' ? frutasDisponibles : [];

        // Ajuste para fruta de estación real
        if (mostrarRecomendados === 'fruta_estacion') {
            frutasRecomendadas = frutasEstacion.filter(f => !postresExcluidos.includes(f));
        }

        frutasOtros = frutasDisponibles.filter(f => !frutasRecomendadas.includes(f));
    }

    return {
        postresLecheRecomendados,
        postresLecheOtros,
        variantesLecheDisponibles,
        budinesRecomendados,
        budinesOtros,
        frutasRecomendadas,
        frutasOtros,
        postreEspecifico: particularidades?.postreEspecifico
    };
};

// Función para obtener un elemento aleatorio de un array
const obtenerAleatorio = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

export const obtenerAcompanamientoParaReceta = (receta: string, nombresAcompanamientos: string[]): string => {
    const particularidades = particularidadesRecetas[receta];

    if (!particularidades) {
        return nombresAcompanamientos.length > 0 ? obtenerAleatorio(nombresAcompanamientos) : '';
    }

    if (particularidades.acompanamientoIncluido) {
        return '';
    }

    if (particularidades.acompanamientosRecomendados.length === 0 &&
        !particularidades.acompanamientoIncluido &&
        (receta.includes('Ensalada completa'))) {
        return '';
    }

    if (particularidades.acompanamientosRecomendados.length > 0) {
        const disponibles = particularidades.acompanamientosRecomendados.filter(a =>
            nombresAcompanamientos.includes(a)
        );
        if (disponibles.length > 0) {
            return obtenerAleatorio(disponibles);
        }
    }

    return nombresAcompanamientos.length > 0 ? obtenerAleatorio(nombresAcompanamientos) : '';
};

export const obtenerPostreParaReceta = (receta: string, acompanamiento: string, postresDisponibles: string[]): string => {
    const particularidades = particularidadesRecetas[receta];
    const frutasEstacionLocal = getFrutasEstacionActual();

    if (!particularidades) {
        return postresDisponibles.length > 0 ? obtenerAleatorio(postresDisponibles) : '';
    }

    let postresCandidatos: string[] = [];

    // Manejo especial para Chop suey de cerdo
    if (receta === 'Chop suey de cerdo') {
        if (acompanamiento && ACOMPANAMIENTOS_CON_ARROZ.includes(acompanamiento)) {
            postresCandidatos = [...postresDeFruta, ...frutasFrescas]
                .filter(p => postresDisponibles.includes(p) && p !== 'Arroz con leche');
            if (postresCandidatos.length === 0) {
                postresCandidatos = postresDeLeche
                    .filter(p => postresDisponibles.includes(p) && p !== 'Arroz con leche');
            }
        } else if (acompanamiento === 'Fideos') {
            postresCandidatos = [...postresDeLeche, ...postresDeFruta, ...frutasFrescas]
                .filter(p => postresDisponibles.includes(p));
            const postresLecheDisponibles = postresDeLeche.filter(p => postresDisponibles.includes(p));
            if (postresLecheDisponibles.length > 0 && Math.random() > 0.3) {
                return obtenerAleatorio(postresLecheDisponibles);
            }
        } else {
            postresCandidatos = [...postresDeLeche, ...postresDeFruta, ...frutasFrescas]
                .filter(p => postresDisponibles.includes(p));
        }
    } else if (receta === 'Pollo colorido') {
        if (acompanamiento && ACOMPANAMIENTOS_CON_ARROZ.includes(acompanamiento)) {
            postresCandidatos = postresDeLeche
                .filter(p => postresDisponibles.includes(p) && p !== 'Arroz con leche');
        } else {
            postresCandidatos = postresDeLeche.filter(p => postresDisponibles.includes(p));
        }
    } else if (receta === 'Pan de Carne / Hamburguesa' || receta === 'Pasta sorpresa') {
        const postresLecheDisponibles = postresDeLeche.filter(p => postresDisponibles.includes(p));
        const postresFrutaDisponibles = frutasEstacionLocal.filter(p => postresDisponibles.includes(p));
        postresCandidatos = [...postresLecheDisponibles, ...postresFrutaDisponibles];
        if (postresCandidatos.length === 0) {
            postresCandidatos = postresDisponibles;
        }
    } else {
        switch (particularidades.postreRecomendado) {
            case 'leche':
                postresCandidatos = postresDeLeche.filter(p => postresDisponibles.includes(p));
                break;
            case 'fruta':
                postresCandidatos = [...postresDeFruta, ...frutasFrescas].filter(p => postresDisponibles.includes(p));
                break;
            case 'fruta_estacion':
                postresCandidatos = frutasEstacionLocal.filter(p => postresDisponibles.includes(p));
                break;
            case 'fruta_citrica':
                postresCandidatos = frutasCitricas.filter(p => postresDisponibles.includes(p));
                break;
            case 'cualquiera':
            default:
                postresCandidatos = postresDisponibles;
                break;
        }

        if (particularidades.postreEspecifico && postresCandidatos.includes(particularidades.postreEspecifico)) {
            return particularidades.postreEspecifico;
        }
    }

    if (particularidades.postresExcluidos) {
        postresCandidatos = postresCandidatos.filter(p => !particularidades.postresExcluidos!.includes(p));
    }

    if (acompanamiento && ACOMPANAMIENTOS_CON_ARROZ.includes(acompanamiento)) {
        postresCandidatos = postresCandidatos.filter(p => p !== 'Arroz con leche');
    }

    if (receta && receta.toLowerCase().includes('arroz')) {
        postresCandidatos = postresCandidatos.filter(p => p !== 'Arroz con leche');
    }

    if (postresCandidatos.length > 0) {
        return obtenerAleatorio(postresCandidatos);
    }

    const postresFinales = postresDisponibles.filter(p =>
        !particularidades.postresExcluidos?.includes(p) &&
        !(acompanamiento === 'Arroz' && p === 'Arroz con leche')
    );
    return postresFinales.length > 0 ? obtenerAleatorio(postresFinales) : '';
};
