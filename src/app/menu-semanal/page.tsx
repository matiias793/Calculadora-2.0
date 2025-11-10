'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { exportMenuToPDF } from '@/utils/exportMenuPDF';
import { FaFilePdf } from 'react-icons/fa';
import { nombresRecetasAlmuerzo, nombresAcompanamientos, nombresRecetasBase, nombresPostres } from '@/utils/recetas-almuerzo';
import NavigationButtons from '@/components/shared/NavigationButtons';
import { FaMagic } from 'react-icons/fa';

type TipoComensal = 'chica' | 'mediana' | 'grande';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// Particularidades de cada receta
interface ParticularidadesReceta {
  acompanamientosRecomendados: string[];
  acompanamientoIncluido?: string; // Si la guarnición está incluida en la receta
  acompanamientoReemplazo?: string[]; // Opciones para reemplazar el acompañamiento incluido
  postreRecomendado: 'leche' | 'fruta' | 'fruta_estacion' | 'fruta_citrica' | 'cualquiera';
  variantesCarne?: ('pollo' | 'vacuna' | 'cerdo')[]; // Variantes de carne posibles
  notas?: string; // Notas adicionales
  postresExcluidos?: string[]; // Postres que no se pueden usar con esta receta
  postreEspecifico?: string; // Postre específico recomendado (ej: Banana)
  llevaMasa?: boolean; // Si la receta lleva masa, no se incluye pan como acompañamiento
}

const particularidadesRecetas: Record<string, ParticularidadesReceta> = {
  'Bocaditos de pollo': {
    acompanamientosRecomendados: ['Puré triple', 'Ensalada jardinera', 'Ensalada primavera'],
    postreRecomendado: 'leche',
    variantesCarne: ['pollo']
  },
  'Budín de pescado': {
    acompanamientosRecomendados: [
      'Hortalizas asadas',
      'Ensalada jardinera',
      'Ensalada primavera',
      'Papas al natural',
      'Puré de papas',
      'Ensalada de vegetales'
    ],
    postreRecomendado: 'leche',
    notas: 'Puede ser con pescado fresco o enlatado (atún)'
  },
  'Carbonada criolla': {
    acompanamientosRecomendados: [],
    acompanamientoIncluido: 'Fideos',
    acompanamientoReemplazo: ['Arroz'],
    postreRecomendado: 'fruta_estacion',
    variantesCarne: ['vacuna', 'pollo', 'cerdo'],
    notas: 'La guarnición (fideos/arroz) está incluida en la receta'
  },
  'Carne a la portuguesa': {
    acompanamientosRecomendados: ['Papas al natural'],
    postreRecomendado: 'fruta_estacion',
    variantesCarne: ['vacuna', 'cerdo', 'pollo']
  },
  'Cazuela de lentejas': {
    acompanamientosRecomendados: [],
    acompanamientoIncluido: 'Arroz',
    acompanamientoReemplazo: ['Fideos'],
    postreRecomendado: 'fruta_citrica',
    variantesCarne: ['vacuna', 'cerdo', 'pollo'],
    notas: 'La guarnición (arroz/fideos) está incluida en la receta'
  },
  'Chop suey de cerdo': {
    acompanamientosRecomendados: ['Arroz', 'Fideos'],
    postreRecomendado: 'cualquiera',
    variantesCarne: ['cerdo', 'pollo'],
    postresExcluidos: [], // Se manejará dinámicamente según el acompañamiento
    notas: 'Puede reemplazarse cerdo por pollo. También puede hacerse sin carne usando leguminosas (40g por porción: lentejas, porotos o garbanzos). Si usa leguminosas con arroz, postre fruta. Si usa carne, postre leche. No usar arroz con leche si el acompañamiento es arroz.'
  },
  'Chupín de pescado y verduras': {
    acompanamientosRecomendados: ['Arroz'],
    postreRecomendado: 'leche',
    postresExcluidos: ['Arroz con leche'],
    notas: 'Postre de leche recomendado (no arroz con leche)'
  },
  'Croquetas de atún y papas': {
    acompanamientosRecomendados: ['Ensalada de vegetales'],
    postreRecomendado: 'fruta',
    postreEspecifico: 'Banana',
    notas: 'Postre sugerido: Banana'
  },
  'Ensalada completa de atún': {
    acompanamientosRecomendados: [],
    postreRecomendado: 'fruta_citrica',
    notas: 'No lleva guarnición'
  },
  'Ensalada completa de pollo': {
    acompanamientosRecomendados: [],
    postreRecomendado: 'fruta_citrica',
    notas: 'No lleva guarnición'
  },
  'Hamburguesa de pescado': {
    acompanamientosRecomendados: [
      'Arroz con vegetales salteados',
      'Papas al natural',
      'Ensalada de vegetales',
      'Ensalada jardinera'
    ],
    postreRecomendado: 'fruta_estacion',
    notas: 'Puede combinarse: Papas al natural con perejil + Ensalada de vegetales'
  },
  'Lasaña': {
    acompanamientosRecomendados: [],
    postreRecomendado: 'fruta_estacion',
    variantesCarne: ['vacuna', 'pollo'],
    notas: 'No lleva guarnición. Puede ser con carne vacuna o pollo.'
  },
  'Pan de Carne / Hamburguesa': {
    acompanamientosRecomendados: [
      'Puré triple',
      'Puré de papas',
      'Ensalada de vegetales',
      'Ensalada primavera',
      'Ensalada jardinera',
      'Arroz con vegetales salteados',
      'Arroz amarillo',
      'Fideos'
    ],
    postreRecomendado: 'cualquiera',
    variantesCarne: ['vacuna', 'cerdo', 'pollo'],
    notas: 'Se puede reemplazar carne vacuna por cerdo o pollo. Postre: fruta de estación o postre de leche. Puede combinarse: Puré de papas + Ensalada de vegetales, Arroz con vegetales/Arroz amarillo + Ensalada de vegetales, Fideos + Ensalada de vegetales.'
  },
  'Pasta sorpresa': {
    acompanamientosRecomendados: [],
    postreRecomendado: 'cualquiera',
    variantesCarne: ['pollo'],
    notas: 'No lleva guarnición. Postre sugerido: fruta de estación o postre de leche.'
  },
  'Pasta con verdusalsa': {
    acompanamientosRecomendados: ['Fideos'],
    postreRecomendado: 'leche',
    variantesCarne: ['pollo', 'cerdo'],
    notas: 'Puede reemplazarse la carne por pollo o cerdo. La pasta puede reemplazarse por polenta. Puede reemplazarse zapallito por espinaca en igual cantidad (en este caso la receta sería salsa boloñesa). Postre sugerido: postre de leche. Acompañamiento: fideos.'
  },
  'Pastel de carne y papa': {
    acompanamientosRecomendados: ['Ensalada de vegetales'],
    postreRecomendado: 'leche',
    variantesCarne: ['vacuna', 'cerdo', 'pollo'],
    notas: 'Se puede reemplazar carne por pollo o cerdo. Acompañamiento: ensalada de vegetales. Postre: postre de leche.'
  },
  'Pastel de carne y berenjenas': {
    acompanamientosRecomendados: ['Arroz amarillo'],
    postreRecomendado: 'fruta_estacion',
    variantesCarne: ['vacuna', 'cerdo', 'pollo'],
    notas: 'Se puede reemplazar carne vacuna por cerdo o pollo. Acompañamiento: arroz amarillo. Postre: fruta de estación.'
  },
  'Pollo colorido': {
    acompanamientosRecomendados: ['Arroz', 'Fideos'],
    postreRecomendado: 'leche',
    variantesCarne: ['pollo'],
    postresExcluidos: [], // Se manejará dinámicamente según el acompañamiento
    notas: 'Acompañamiento: arroz o fideos. Postre: postre de leche. Si se usa arroz como acompañamiento, el postre no puede ser arroz con leche.'
  },
  'Pollo con salsa blanca y verduras': {
    acompanamientosRecomendados: ['Arroz', 'Fideos'],
    postreRecomendado: 'fruta_estacion',
    variantesCarne: ['pollo'],
    notas: 'Acompañamiento: arroz o fideos. Postre: fruta de estación.'
  },
  'Torta de carne y vegetales': {
    acompanamientosRecomendados: ['Ensalada primavera', 'Ensalada jardinera'],
    postreRecomendado: 'fruta_estacion',
    variantesCarne: ['vacuna', 'pollo'],
    llevaMasa: true,
    notas: 'Esta receta lleva masa. Acompañamiento: ensalada primavera o ensalada jardinera. Se puede reemplazar la carne por pollo. Postre: fruta de estación. No incluye pan.'
  },
  'Tortilla de papa, vegetales y pollo': {
    acompanamientosRecomendados: ['Ensalada de vegetales'],
    postreRecomendado: 'leche',
    variantesCarne: ['pollo'],
    notas: 'Guarnición: ensalada de vegetales. Postre: postre de leche.'
  },
  'Torta de atún': {
    acompanamientosRecomendados: ['Ensalada primavera', 'Ensalada jardinera'],
    postreRecomendado: 'fruta_estacion',
    llevaMasa: true,
    notas: 'Esta receta lleva masa. Guarnición: ensalada primavera o ensalada jardinera. Postre: fruta de estación. No incluye pan.'
  }
};

// Clasificación de recetas por tipo de carne (actualizada con variantes)
const recetasPorTipoCarne = {
  pollo: [
    'Bocaditos de pollo',
    'Ensalada completa de pollo',
    'Pasta sorpresa',
    'Pollo colorido',
    'Pollo con salsa blanca y verduras',
    'Tortilla de papa, vegetales y pollo',
    'Carbonada criolla', // Puede ser con pollo
    'Carne a la portuguesa', // Puede ser con pollo
    'Cazuela de lentejas', // Puede ser con pollo
    'Chop suey de cerdo', // Puede ser con pollo
    'Lasaña', // Puede ser con pollo
    'Pan de Carne / Hamburguesa', // Puede ser con pollo
    'Pasta con verdusalsa', // Puede ser con pollo
    'Pastel de carne y papa', // Puede ser con pollo
    'Pastel de carne y berenjenas' // Puede ser con pollo
  ],
  vacuna: [
    'Carbonada criolla',
    'Carne a la portuguesa',
    'Cazuela de lentejas',
    'Lasaña',
    'Pan de Carne / Hamburguesa',
    'Pastel de carne y papa',
    'Pastel de carne y berenjenas',
    'Torta de carne y vegetales'
  ],
  pescado: [
    'Budín de pescado',
    'Chupín de pescado y verduras',
    'Croquetas de atún y papas',
    'Ensalada completa de atún',
    'Hamburguesa de pescado',
    'Torta de atún'
  ],
  cerdo: [
    'Chop suey de cerdo',
    'Carbonada criolla', // Puede ser con cerdo
    'Carne a la portuguesa', // Puede ser con cerdo
    'Cazuela de lentejas', // Puede ser con cerdo
    'Pan de Carne / Hamburguesa', // Puede ser con cerdo
    'Pasta con verdusalsa', // Puede ser con cerdo
    'Pastel de carne y papa', // Puede ser con cerdo
    'Pastel de carne y berenjenas' // Puede ser con cerdo
  ]
};

// Clasificación de postres
const postresDeLeche = [
  'Arroz con leche',
  'Crema de naranja',
  'Crema de vainilla',
  'Crema de vainilla - chocolate',
  'Crema de vainilla - coco',
  'Crema de vainilla - cáscara de naranja',
  'Crema de vainilla - caramelo'
];

const variantesCremaVainilla = [
  'Crema de vainilla - chocolate',
  'Crema de vainilla - coco',
  'Crema de vainilla - cáscara de naranja',
  'Crema de vainilla - caramelo'
];

const postresDeFruta = [
  'Budín de zapallo y coco',
  'Budín de harina de maíz'
];

// Frutas frescas que pueden ser postres
const frutasFrescas = [
  'Melón',
  'Sandía',
  'Uva',
  'Ciruela',
  'Naranja',
  'Banana',
  'Durazno',
  'Manzana',
  'Kiwi',
  'Frutilla',
  'Mandarina'
];

// Frutas de estación (todas las frutas disponibles)
const frutasEstacion = [...frutasFrescas];

// Frutas cítricas
const frutasCitricas = [
  'Naranja',
  'Mandarina',
  'Kiwi'
];

// Pesos/porciones de postres por tipo
interface PesoPostre {
  peso: string;
  unidad: string;
  tipo: 'leche' | 'fruta' | 'fruta_fresca';
}

const pesosPostres: Record<string, PesoPostre> = {
  // Postres de leche (cremas/flanes/arroz con leche)
  'Arroz con leche': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de naranja': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de vainilla': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de vainilla - chocolate': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de vainilla - coco': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de vainilla - cáscara de naranja': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de vainilla - caramelo': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  
  // Budines
  'Budín de harina de maíz': { peso: '150', unidad: 'g', tipo: 'fruta' },
  'Budín de zapallo y coco': { peso: '150', unidad: 'g', tipo: 'fruta' },
  
  // Frutas frescas
  'Melón': { peso: '150', unidad: 'g', tipo: 'fruta_fresca' },
  'Sandía': { peso: '250', unidad: 'g', tipo: 'fruta_fresca' },
  'Uva': { peso: '1 racimo pequeño', unidad: '', tipo: 'fruta_fresca' },
  'Ciruela': { peso: '2', unidad: 'unidades', tipo: 'fruta_fresca' },
  'Naranja': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' },
  'Banana': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' },
  'Durazno': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' },
  'Manzana': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' },
  'Kiwi': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' },
  'Frutilla': { peso: '5', unidad: 'unidades', tipo: 'fruta_fresca' },
  'Mandarina': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' }
};

// Función para obtener el peso de un postre
const obtenerPesoPostre = (nombrePostre: string): string => {
  const postre = pesosPostres[nombrePostre];
  if (!postre) return '';
  
  if (postre.unidad) {
    return `${postre.peso} ${postre.unidad}`;
  }
  return postre.peso;
};

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

// Función para generar menú inteligente
const generarMenuInteligente = () => {
  // Filtrar recetas que existen en nombresRecetasAlmuerzo
  const recetasPollo = recetasPorTipoCarne.pollo.filter(r => nombresRecetasAlmuerzo.includes(r));
  const recetasVacuna = recetasPorTipoCarne.vacuna.filter(r => nombresRecetasAlmuerzo.includes(r));
  const recetasPescado = recetasPorTipoCarne.pescado.filter(r => nombresRecetasAlmuerzo.includes(r));
  const recetasCerdo = recetasPorTipoCarne.cerdo.filter(r => nombresRecetasAlmuerzo.includes(r));

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
  if (recetasVacuna.length > 0) {
    const receta = obtenerAleatorio(recetasVacuna);
    recetasSeleccionadas.push(receta);
    recetasYaUsadas.add(receta);
  }
  
  // Pescado: 1 vez
  if (recetasPescado.length > 0) {
    const receta = obtenerAleatorio(recetasPescado);
    recetasSeleccionadas.push(receta);
    recetasYaUsadas.add(receta);
  }
  
  // Cerdo: 1 vez
  if (recetasCerdo.length > 0) {
    const receta = obtenerAleatorio(recetasCerdo);
    recetasSeleccionadas.push(receta);
    recetasYaUsadas.add(receta);
  }

  // Si faltan días (por ejemplo, si no hay suficientes recetas), completar con opciones aleatorias
  while (recetasSeleccionadas.length < diasSemana.length) {
    const recetasDisponibles = nombresRecetasAlmuerzo.filter(r => !recetasYaUsadas.has(r));
    if (recetasDisponibles.length > 0) {
      const receta = obtenerAleatorio(recetasDisponibles);
      recetasSeleccionadas.push(receta);
      recetasYaUsadas.add(receta);
    } else {
      // Si no hay más recetas disponibles, permitir duplicados de pollo
      if (recetasPollo.length > 0) {
        recetasSeleccionadas.push(obtenerAleatorio(recetasPollo));
      } else {
        break;
      }
    }
  }

  // Mezclar las recetas para distribución aleatoria en la semana
  const recetasMezcladas = mezclarArray(recetasSeleccionadas.slice(0, diasSemana.length));

  // Seleccionar postres: 2-3 de leche y 2-3 de fruta (total 4-5, pero tenemos 5 días)
  // Combinar postres de fruta con frutas frescas disponibles
  const todosPostresDisponiblesList = [...nombresPostres, ...frutasFrescas];
  const postresLecheDisponibles = postresDeLeche.filter(p => todosPostresDisponiblesList.includes(p));
  const postresFrutaDisponibles = [...postresDeFruta.filter(p => todosPostresDisponiblesList.includes(p)), ...frutasFrescas];
  
  const postresSeleccionados: string[] = [];
  const postresYaUsados = new Set<string>();
  
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
  const postresFrutaCopia = [...postresFrutaDisponibles];
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
  
  // Mezclar los postres para distribución aleatoria
  const postresMezclados = mezclarArray(postresSeleccionados.slice(0, diasSemana.length));

  // Función para obtener acompañamiento según las particularidades de la receta
  const obtenerAcompanamientoParaReceta = (receta: string): string => {
    const particularidades = particularidadesRecetas[receta];
    
    if (!particularidades) {
      // Si no hay particularidades, seleccionar aleatorio
      return nombresAcompanamientos.length > 0 ? obtenerAleatorio(nombresAcompanamientos) : '';
    }
    
    // Si la guarnición está incluida, no agregar acompañamiento adicional
    // Pero podemos mostrar el reemplazo si existe
    if (particularidades.acompanamientoIncluido) {
      // Si hay opciones de reemplazo, podríamos seleccionar una opcionalmente
      // Por ahora, dejamos vacío ya que está incluido
      return '';
    }
    
    // Si no lleva guarnición (ensaladas completas), dejar vacío
    if (particularidades.acompanamientosRecomendados.length === 0 && 
        !particularidades.acompanamientoIncluido &&
        (receta.includes('Ensalada completa'))) {
      return '';
    }
    
    // Si hay acompañamientos recomendados, seleccionar uno de ellos
    if (particularidades.acompanamientosRecomendados.length > 0) {
      const disponibles = particularidades.acompanamientosRecomendados.filter(a => 
        nombresAcompanamientos.includes(a)
      );
      if (disponibles.length > 0) {
        return obtenerAleatorio(disponibles);
      }
    }
    
    // Si no hay recomendaciones o no están disponibles, seleccionar aleatorio
    return nombresAcompanamientos.length > 0 ? obtenerAleatorio(nombresAcompanamientos) : '';
  };

  // Función para obtener postre según las particularidades de la receta
  const obtenerPostreParaReceta = (receta: string, acompanamiento: string, postresDisponibles: string[]): string => {
    const particularidades = particularidadesRecetas[receta];
    
    if (!particularidades) {
      // Si no hay particularidades, usar el postre ya asignado
      return postresDisponibles.length > 0 ? obtenerAleatorio(postresDisponibles) : '';
    }
    
    let postresCandidatos: string[] = [];
    
    // Manejo especial para Chop suey de cerdo
    if (receta === 'Chop suey de cerdo') {
      const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
      // Si el acompañamiento es arroz, preferir fruta (ya que puede ser con leguminosas)
      // Pero también permitir leche si no hay opciones de fruta (excepto arroz con leche)
      if (acompanamiento && acompanamientosConArroz.includes(acompanamiento)) {
        postresCandidatos = [...postresDeFruta, ...frutasFrescas]
          .filter(p => postresDisponibles.includes(p) && p !== 'Arroz con leche');
        // Si no hay candidatos de fruta, usar otros postres de leche (excepto arroz con leche)
        if (postresCandidatos.length === 0) {
          postresCandidatos = postresDeLeche
            .filter(p => postresDisponibles.includes(p) && p !== 'Arroz con leche');
        }
      } else if (acompanamiento === 'Fideos') {
        // Si es fideos, puede ser fruta o leche (preferir leche si hay carne)
        postresCandidatos = [...postresDeLeche, ...postresDeFruta, ...frutasFrescas]
          .filter(p => postresDisponibles.includes(p));
        // Priorizar leche
        const postresLecheDisponibles = postresDeLeche.filter(p => postresDisponibles.includes(p));
        if (postresLecheDisponibles.length > 0 && Math.random() > 0.3) {
          return obtenerAleatorio(postresLecheDisponibles);
        }
      } else {
        // Si no es arroz ni fideos, puede ser fruta o leche
        postresCandidatos = [...postresDeLeche, ...postresDeFruta, ...frutasFrescas]
          .filter(p => postresDisponibles.includes(p));
      }
    } else if (receta === 'Pollo colorido') {
      // Manejo especial para Pollo colorido
      const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
      if (acompanamiento && acompanamientosConArroz.includes(acompanamiento)) {
        // Si el acompañamiento es arroz, postre de leche pero no arroz con leche
        postresCandidatos = postresDeLeche
          .filter(p => postresDisponibles.includes(p) && p !== 'Arroz con leche');
      } else {
        // Si es fideos, postre de leche (puede ser cualquier postre de leche)
        postresCandidatos = postresDeLeche.filter(p => postresDisponibles.includes(p));
      }
    } else if (receta === 'Pan de Carne / Hamburguesa' || receta === 'Pasta sorpresa') {
      // Para estas recetas, postre puede ser fruta de estación o leche
      const postresLecheDisponibles = postresDeLeche.filter(p => postresDisponibles.includes(p));
      const postresFrutaDisponibles = frutasEstacion.filter(p => postresDisponibles.includes(p));
      
      // Combinar ambos tipos
      postresCandidatos = [...postresLecheDisponibles, ...postresFrutaDisponibles];
      
      // Si no hay candidatos, usar cualquier postre disponible
      if (postresCandidatos.length === 0) {
        postresCandidatos = postresDisponibles;
      }
    } else {
      // Lógica normal para otras recetas
      switch (particularidades.postreRecomendado) {
        case 'leche':
          postresCandidatos = postresDeLeche.filter(p => postresDisponibles.includes(p));
          break;
        case 'fruta':
          postresCandidatos = [...postresDeFruta, ...frutasFrescas].filter(p => postresDisponibles.includes(p));
          break;
        case 'fruta_estacion':
          postresCandidatos = frutasEstacion.filter(p => postresDisponibles.includes(p));
          break;
        case 'fruta_citrica':
          postresCandidatos = frutasCitricas.filter(p => postresDisponibles.includes(p));
          break;
        case 'cualquiera':
        default:
          postresCandidatos = postresDisponibles;
          break;
      }
      
      // Si hay postre específico recomendado (ej: Banana), priorizarlo
      if (particularidades.postreEspecifico && postresCandidatos.includes(particularidades.postreEspecifico)) {
        return particularidades.postreEspecifico;
      }
    }
    
    // Excluir postres excluidos
    if (particularidades.postresExcluidos) {
      postresCandidatos = postresCandidatos.filter(p => !particularidades.postresExcluidos!.includes(p));
    }
    
    // Si el acompañamiento contiene arroz, excluir arroz con leche
    const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
    if (acompanamiento && acompanamientosConArroz.includes(acompanamiento)) {
      postresCandidatos = postresCandidatos.filter(p => p !== 'Arroz con leche');
    }
    
    // Si hay candidatos disponibles, seleccionar uno
    if (postresCandidatos.length > 0) {
      return obtenerAleatorio(postresCandidatos);
    }
    
    // Si no hay candidatos específicos, usar cualquier postre disponible (excepto excluidos)
    const postresFinales = postresDisponibles.filter(p => 
      !particularidades.postresExcluidos?.includes(p) &&
      !(acompanamiento === 'Arroz' && p === 'Arroz con leche')
    );
    return postresFinales.length > 0 ? obtenerAleatorio(postresFinales) : '';
  };

  // Reorganizar postres para que cada receta tenga su postre recomendado cuando sea posible
  // Primero, crear un mapa de recetas a postres recomendados
  const recetasConPostresRecomendados = recetasMezcladas.map((receta, idx) => {
    const particularidades = particularidadesRecetas[receta];
    if (!particularidades) return { receta, postreRecomendado: null, index: idx };
    
    return {
      receta,
      postreRecomendado: particularidades.postreRecomendado,
      index: idx
    };
  });
  
  // Separar postres disponibles por tipo
  const postresLecheDisponiblesList = postresDeLeche.filter(p => todosPostresDisponiblesList.includes(p));
  const postresFrutaDisponiblesList = [...postresDeFruta, ...frutasFrescas].filter(p => todosPostresDisponiblesList.includes(p));
  const frutasEstacionDisponiblesList = frutasEstacion.filter(p => todosPostresDisponiblesList.includes(p));
  const frutasCitricasDisponiblesList = frutasCitricas.filter(p => todosPostresDisponiblesList.includes(p));
  
  // Crear el menú semanal con acompañamientos primero, luego postres
  const nuevoMenuTemporal = diasSemana.map((dia, index) => {
    const recetaPrincipal = recetasMezcladas[index] || '';
    const acompanamiento = obtenerAcompanamientoParaReceta(recetaPrincipal);
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
  
  // Asignar postres según recomendaciones, considerando acompañamientos
  const postresAsignados: string[] = new Array(diasSemana.length).fill('');
  const postresUsados = new Set<string>();
  
  // Primera pasada: asignar postres recomendados considerando restricciones
  nuevoMenuTemporal.forEach((item, index) => {
    const { principal, acompanamiento } = item;
    const particularidades = particularidadesRecetas[principal];
    
    if (!particularidades) return;
    
    // Obtener postres candidatos según recomendaciones y restricciones
    const postresDisponibles = todosPostresDisponiblesList.filter(p => !postresUsados.has(p));
    const postre = obtenerPostreParaReceta(principal, acompanamiento, postresDisponibles);
    
    if (postre) {
      postresAsignados[index] = postre;
      postresUsados.add(postre);
    }
  });
  
  // Segunda pasada: completar con postres restantes manteniendo distribución balanceada
  const postresRestantes = todosPostresDisponiblesList.filter(p => !postresUsados.has(p));
  const postresRestantesMezclados = mezclarArray(postresRestantes);
  
  let postresRestantesIndex = 0;
  for (let i = 0; i < diasSemana.length; i++) {
    if (!postresAsignados[i]) {
      const { principal, acompanamiento } = nuevoMenuTemporal[i];
      const particularidades = principal ? particularidadesRecetas[principal] : null;
      
      // Intentar obtener postre considerando restricciones
      const postresDisponibles = postresRestantes.length > 0 
        ? postresRestantes 
        : todosPostresDisponiblesList.filter(p => !postresUsados.has(p));
      
      let postreFinal = '';
      
      if (particularidades) {
        postreFinal = obtenerPostreParaReceta(principal, acompanamiento, postresDisponibles);
      } else if (postresRestantesIndex < postresRestantesMezclados.length) {
        postreFinal = postresRestantesMezclados[postresRestantesIndex];
        postresRestantesIndex++;
      } else {
        // Si se agotan los postres únicos, permitir duplicados
        const todosPostres = [...postresDeLeche, ...postresDeFruta, ...frutasFrescas];
        postreFinal = obtenerAleatorio(todosPostres);
      }
      
      if (postreFinal) {
        postresAsignados[i] = postreFinal;
        postresUsados.add(postreFinal);
        const indexRestante = postresRestantes.indexOf(postreFinal);
        if (indexRestante > -1) {
          postresRestantes.splice(indexRestante, 1);
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

const MenuSemanal = () => {
  const [menu, setMenu] = useState(
    diasSemana.map((dia) => ({
      dia,
      principal: '',
      acompanamiento: '',
      recetaBase: '',
      postre: '',
      sinMenu: false,
      porciones: { chica: '', mediana: '', grande: '' },
      incluirPan: true // Por defecto se incluye pan, a menos que la receta lleve masa
    }))
  );

  const [mostrarRecetaBase, setMostrarRecetaBase] = useState(false);
  const [mostrarPostre, setMostrarPostre] = useState(false);
  const [mismaCantidadTodos, setMismaCantidadTodos] = useState(false);
  const [porcionesGlobales, setPorcionesGlobales] = useState({ chica: '', mediana: '', grande: '' });

  const manejarCambio = (index: number, campo: 'principal' | 'acompanamiento' | 'recetaBase' | 'postre', valor: string) => {
    const nuevoMenu = [...menu];
    nuevoMenu[index][campo] = valor;
    
    // Si se cambia la receta principal, ajustar acompañamiento y postre según recomendaciones
    if (campo === 'principal') {
      const particularidades = valor ? particularidadesRecetas[valor] : null;
      
      // Si no lleva guarnición (ensaladas completas, lasaña), limpiar acompañamiento
      if (particularidades && particularidades.acompanamientosRecomendados.length === 0 && !particularidades.acompanamientoIncluido) {
        nuevoMenu[index].acompanamiento = '';
      }
      
      // Si tiene guarnición incluida, limpiar acompañamiento
      if (particularidades?.acompanamientoIncluido) {
        nuevoMenu[index].acompanamiento = '';
      }
      
      // Si la receta lleva masa, no incluir pan
      if (particularidades?.llevaMasa) {
        nuevoMenu[index].incluirPan = false;
      } else {
        nuevoMenu[index].incluirPan = true;
      }
      
      // Ajustar postre si el actual no cumple con las recomendaciones
      const postreActual = nuevoMenu[index].postre;
      const acompanamientoActual = nuevoMenu[index].acompanamiento;
      
      if (postreActual && particularidades) {
        // Verificar si el postre actual es válido
        let esValido = false;
        
        if (valor === 'Pollo colorido') {
          // Para Pollo colorido, debe ser postre de leche
          const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
          if (acompanamientoActual && acompanamientosConArroz.includes(acompanamientoActual)) {
            // Con arroz, postre de leche pero no arroz con leche
            esValido = postresDeLeche.includes(postreActual) && postreActual !== 'Arroz con leche';
          } else {
            // Con fideos, cualquier postre de leche
            esValido = postresDeLeche.includes(postreActual);
          }
        } else if (valor === 'Pan de Carne / Hamburguesa' || valor === 'Pasta sorpresa') {
          // Puede ser fruta de estación o postre de leche
          esValido = postresDeLeche.includes(postreActual) || frutasEstacion.includes(postreActual);
        } else {
          // Lógica normal
          esValido = 
            (particularidades.postreRecomendado === 'leche' && postresDeLeche.includes(postreActual)) ||
            (particularidades.postreRecomendado === 'fruta' && (postresDeFruta.includes(postreActual) || frutasFrescas.includes(postreActual))) ||
            (particularidades.postreRecomendado === 'fruta_estacion' && frutasEstacion.includes(postreActual)) ||
            (particularidades.postreRecomendado === 'fruta_citrica' && frutasCitricas.includes(postreActual)) ||
            (particularidades.postreRecomendado === 'cualquiera');
        }
        
        // Verificar exclusiones
        const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
        const estaExcluido = particularidades.postresExcluidos?.includes(postreActual) ||
          (acompanamientoActual && acompanamientosConArroz.includes(acompanamientoActual) && postreActual === 'Arroz con leche');
        
        if (!esValido || estaExcluido) {
          // No limpiar automáticamente, solo si está explícitamente excluido
          if (estaExcluido) {
            nuevoMenu[index].postre = '';
          }
        }
      }
    }
    
    // Si se cambia el acompañamiento a arroz (cualquier variante) y el postre es arroz con leche, limpiar postre
    const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
    if (campo === 'acompanamiento' && valor && acompanamientosConArroz.includes(valor) && nuevoMenu[index].postre === 'Arroz con leche') {
      nuevoMenu[index].postre = '';
    }
    
    setMenu(nuevoMenu);
  };

  const manejarCambioPorciones = (index: number, tipo: TipoComensal, valor: string) => {
    const nuevoMenu = [...menu];
    // Permitir string vacío o números
    nuevoMenu[index].porciones[tipo] = valor;
    setMenu(nuevoMenu);
  };

  const manejarCambioPorcionesGlobales = (tipo: TipoComensal, valor: string) => {
    const nuevasPorcionesGlobales = {
      ...porcionesGlobales,
      [tipo]: valor
    };
    setPorcionesGlobales(nuevasPorcionesGlobales);
    
    // Aplicar a todos los días que no estén marcados como "sin menú"
    setMenu(prevMenu => prevMenu.map(item => {
      if (item.sinMenu) return item;
      return {
        ...item,
        porciones: {
          ...nuevasPorcionesGlobales
        }
      };
    }));
  };

  const manejarToggleMismaCantidad = (activado: boolean) => {
    setMismaCantidadTodos(activado);
    if (activado) {
      // Si se activa, buscar el primer día con valores para inicializar los campos globales
      const primerDiaConValores = menu.find(item => !item.sinMenu && 
        (item.porciones.chica || item.porciones.mediana || item.porciones.grande));
      
      if (primerDiaConValores) {
        // Si hay valores en algún día, usarlos como valores globales
        setPorcionesGlobales({ ...primerDiaConValores.porciones });
        // Aplicar estos valores a todos los días
        const nuevoMenu = menu.map(item => {
          if (item.sinMenu) return item;
          return {
            ...item,
            porciones: { ...primerDiaConValores.porciones }
          };
        });
        setMenu(nuevoMenu);
      } else {
        // Si no hay valores, aplicar los valores globales actuales (pueden estar vacíos)
        const nuevoMenu = menu.map(item => {
          if (item.sinMenu) return item;
          return {
            ...item,
            porciones: { ...porcionesGlobales }
          };
        });
        setMenu(nuevoMenu);
      }
    }
  };

  const manejarSinMenu = (index: number, valor: boolean) => {
    const nuevoMenu = [...menu];
    nuevoMenu[index].sinMenu = valor;
    if (valor) {
      nuevoMenu[index].principal = '';
      nuevoMenu[index].acompanamiento = '';
      nuevoMenu[index].recetaBase = '';
      nuevoMenu[index].postre = '';
      nuevoMenu[index].porciones = { chica: '', mediana: '', grande: '' };
    } else if (mismaCantidadTodos) {
      // Si se desactiva "sin menú" y el modo global está activo, aplicar porciones globales
      nuevoMenu[index].porciones = { ...porcionesGlobales };
    }
    setMenu(nuevoMenu);
  };

  // Función para convertir las porciones a números para el PDF
  const getPorcionesNumericas = (porciones: { chica: string; mediana: string; grande: string }) => {
    return {
      chica: Number(porciones.chica) || 0,
      mediana: Number(porciones.mediana) || 0,
      grande: Number(porciones.grande) || 0
    };
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <div className="mb-4">
        <NavigationButtons />
      </div>

      <h2 className="text-2xl font-bold text-logoGreen mb-6">Planificación semanal</h2>

      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <button
          onClick={() => {
            const nuevoMenu = generarMenuInteligente();
            // Si el modo "misma cantidad" está activo, mantener las porciones globales
            if (mismaCantidadTodos) {
              nuevoMenu.forEach(item => {
                if (!item.sinMenu) {
                  item.porciones = { ...porcionesGlobales };
                }
              });
            }
            setMenu(nuevoMenu);
            // Mostrar postres automáticamente si se generaron
            if (nuevoMenu.some(item => item.postre)) {
              setMostrarPostre(true);
            }
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-logoGreen to-green-600 hover:from-logoGreenHover hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          title="Genera un menú semanal automáticamente respetando las frecuencias de carnes y postres recomendadas"
        >
          <FaMagic className="text-lg" />
          Generar Menú Inteligente
        </button>
        
        <div className="flex gap-4">
        <button
          onClick={() => setMostrarRecetaBase(!mostrarRecetaBase)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mostrarRecetaBase 
              ? 'bg-logoGreen text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {mostrarRecetaBase ? 'Ocultar' : 'Mostrar'} Receta Base
        </button>
        <button
          onClick={() => setMostrarPostre(!mostrarPostre)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mostrarPostre 
              ? 'bg-logoGreen text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {mostrarPostre ? 'Ocultar' : 'Mostrar'} Postre
        </button>
        </div>
      </div>
      
      {/* Texto introductorio removido según solicitud */}

      {/* Opción para mantener misma cantidad de comensales */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border-2 border-logoGreen/30 shadow-sm">
        <label className="inline-flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={mismaCantidadTodos}
            onChange={(e) => manejarToggleMismaCantidad(e.target.checked)}
            className="w-5 h-5 text-logoGreen border-gray-300 rounded focus:ring-logoGreen focus:ring-2 cursor-pointer"
          />
          <span className="ml-3 text-base font-semibold text-gray-800 group-hover:text-logoGreen transition-colors">
            Mantener la misma cantidad de comensales en todos los días
          </span>
        </label>

        {mismaCantidadTodos && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-logoGreen/20 shadow-inner">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Ingrese la cantidad de porciones que se aplicará a todos los días:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['chica', 'mediana', 'grande'] as TipoComensal[]).map((tipo) => (
                <div key={tipo}>
                  <label className="block text-sm font-semibold text-logoGreen mb-2">
                    Porciones {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </label>
                  <input
                    type="number"
                    value={porcionesGlobales[tipo]}
                    onChange={(e) => manejarCambioPorcionesGlobales(tipo, e.target.value)}
                    className="w-full p-3 border-2 border-logoGreen rounded-lg text-black text-lg font-medium focus:outline-none focus:ring-2 focus:ring-logoGreen focus:border-logoGreen transition-all"
                    min={0}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {menu.map((item, index) => (
        <div key={item.dia} className="mb-4 border-b pb-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-logoGreen tracking-tight">{item.dia}</h3>

          <div className="mt-2 w-full max-w-md">
            <label className="block mb-1 text-sm text-black">Receta principal</label>
            <select
              disabled={item.sinMenu}
              value={item.principal}
              onChange={(e) => manejarCambio(index, 'principal', e.target.value)}
              className="w-full p-2 border rounded text-black"
            >
              <option value="">Seleccionar...</option>
              {nombresRecetasAlmuerzo.map((nombre) => (
                <option key={nombre} value={nombre}>{nombre}</option>
              ))}
            </select>
            {item.principal && particularidadesRecetas[item.principal]?.notas && (
              <p className="mt-1 text-xs text-gray-600 italic">
                {particularidadesRecetas[item.principal].notas}
              </p>
            )}
            {item.principal && particularidadesRecetas[item.principal]?.llevaMasa && (
              <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded text-sm">
                <p className="font-semibold text-purple-800">
                  🍞 Esta receta lleva masa - No se incluirá pan en el cálculo
                </p>
              </div>
            )}
          </div>

          {(() => {
            const particularidades = item.principal ? particularidadesRecetas[item.principal] : null;
            const tieneGuarnicionIncluida = particularidades?.acompanamientoIncluido;
            const noLlevaGuarnicion = particularidades && 
              particularidades.acompanamientosRecomendados.length === 0 && 
              !particularidades.acompanamientoIncluido &&
              (item.principal?.includes('Ensalada completa') || item.principal === 'Lasaña' || item.principal === 'Pasta sorpresa');
            
            if (tieneGuarnicionIncluida) {
              return (
                <div className="mt-2 w-full max-w-md">
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <p className="font-semibold text-yellow-800">
                      ℹ️ Guarnición incluida: {particularidades.acompanamientoIncluido}
                    </p>
                    {particularidades.acompanamientoReemplazo && particularidades.acompanamientoReemplazo.length > 0 && (
                      <p className="text-yellow-700 text-xs mt-1">
                        Puede reemplazarse por: {particularidades.acompanamientoReemplazo.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              );
            }
            
            if (noLlevaGuarnicion) {
              return (
                <div className="mt-2 w-full max-w-md">
                  <div className="p-2 bg-gray-100 border border-gray-300 rounded text-sm">
                    <p className="font-semibold text-gray-700">
                      ℹ️ Esta receta no lleva guarnición adicional
                    </p>
                  </div>
                </div>
              );
            }
            
            return (
          <div className="mt-2 w-full max-w-md">
                <label className="block mb-1 text-sm text-black">
                  Acompañamiento
                  {particularidades?.acompanamientosRecomendados && particularidades.acompanamientosRecomendados.length > 0 && (
                    <span className="ml-2 text-xs text-gray-500 font-normal">
                      (Recomendados: {particularidades.acompanamientosRecomendados.join(', ')})
                    </span>
                  )}
                </label>
            <select
              disabled={item.sinMenu}
              value={item.acompanamiento}
                  onChange={(e) => {
                    const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
                    manejarCambio(index, 'acompanamiento', e.target.value);
                    // Si se cambia el acompañamiento y es arroz, verificar si el postre es arroz con leche
                    // Esto aplica para cualquier receta que tenga arroz como acompañamiento
                    if (e.target.value && acompanamientosConArroz.includes(e.target.value) && item.postre === 'Arroz con leche') {
                      manejarCambio(index, 'postre', '');
                    }
                    // Si es Pollo colorido y se cambia a arroz, asegurar que el postre sea de leche (no arroz con leche)
                    if (item.principal === 'Pollo colorido' && e.target.value && acompanamientosConArroz.includes(e.target.value)) {
                      if (item.postre && item.postre !== 'Arroz con leche' && !postresDeLeche.includes(item.postre)) {
                        // Si el postre actual no es de leche, no limpiarlo automáticamente, pero se mostrará la advertencia
                      }
                    }
                  }}
              className="w-full p-2 border rounded text-black"
            >
              <option value="">Seleccionar...</option>
                  {particularidades?.acompanamientosRecomendados && particularidades.acompanamientosRecomendados.length > 0 && (
                    <optgroup label="Recomendados">
                      {particularidades.acompanamientosRecomendados
                        .filter(a => nombresAcompanamientos.includes(a))
                        .map((nombre) => (
                          <option key={nombre} value={nombre}>{nombre}</option>
                        ))}
                    </optgroup>
                  )}
                  <optgroup label="Todos los acompañamientos">
                    {nombresAcompanamientos
                      .filter(a => !particularidades?.acompanamientosRecomendados?.includes(a))
                      .map((nombre) => (
                <option key={nombre} value={nombre}>{nombre}</option>
              ))}
                  </optgroup>
            </select>
          </div>
            );
          })()}

          {mostrarRecetaBase && (
            <div className="mt-2 w-full max-w-md">
              <label className="block mb-1 text-sm text-black">Receta base</label>
              <select
                disabled={item.sinMenu}
                value={item.recetaBase}
                onChange={(e) => manejarCambio(index, 'recetaBase', e.target.value)}
                className="w-full p-2 border rounded text-black"
              >
                <option value="">Seleccionar...</option>
                {nombresRecetasBase.map((nombre) => (
                  <option key={nombre} value={nombre}>{nombre}</option>
                ))}
              </select>
            </div>
          )}

          {mostrarPostre && (
            <div className="mt-2 w-full max-w-md">
              <label className="block mb-1 text-sm text-black">
                Postre
                {(() => {
                  const particularidades = item.principal ? particularidadesRecetas[item.principal] : null;
                  if (particularidades?.postreRecomendado) {
                    const recomendaciones: Record<string, string> = {
                      'leche': 'Postre de leche recomendado',
                      'fruta': 'Postre de fruta recomendado',
                      'fruta_estacion': 'Fruta de estación recomendada',
                      'fruta_citrica': 'Fruta cítrica recomendada'
                    };
                    return (
                      <span className="ml-2 text-xs text-gray-500 font-normal">
                        ({recomendaciones[particularidades.postreRecomendado]})
                      </span>
                    );
                  }
                  return null;
                })()}
              </label>
              <select
                disabled={item.sinMenu}
                value={item.postre}
                onChange={(e) => manejarCambio(index, 'postre', e.target.value)}
                className="w-full p-2 border rounded text-black"
              >
                <option value="">Seleccionar...</option>
                {(() => {
                  const particularidades = item.principal ? particularidadesRecetas[item.principal] : null;
                  const mostrarRecomendados = particularidades?.postreRecomendado;
                  
                  // Determinar postres excluidos
                  const postresExcluidos: string[] = [];
                  if (particularidades?.postresExcluidos) {
                    postresExcluidos.push(...particularidades.postresExcluidos);
                  }
                  // Si el acompañamiento contiene arroz (excluyendo "Arroz con leche" que es un postre), excluir arroz con leche
                  const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
                  if (item.acompanamiento && acompanamientosConArroz.includes(item.acompanamiento)) {
                    postresExcluidos.push('Arroz con leche');
                  }
                  
                  // Postres de leche
                  const postresLecheDisponibles = postresDeLeche.filter(p => !postresExcluidos.includes(p));
                  const variantesVainillaDisponibles = postresLecheDisponibles.filter(p => variantesCremaVainilla.includes(p));
                  const postresLecheSinVariantes = postresLecheDisponibles.filter(p => !variantesCremaVainilla.includes(p));
                  // Para Pollo colorido, siempre postres de leche (recomendados)
                  // Para Pan de Carne y Pasta sorpresa, pueden ser leche o fruta (mostrar ambos como recomendados)
                  let postresLecheRecomendados: string[] = [];
                  let postresLecheOtros: string[] = [];
                  
                  if (item.principal === 'Pollo colorido') {
                    // Pollo colorido: solo postres de leche (recomendados)
                    postresLecheRecomendados = postresLecheSinVariantes;
                    postresLecheOtros = [];
                  } else if (item.principal === 'Pan de Carne / Hamburguesa' || item.principal === 'Pasta sorpresa') {
                    // Pan de Carne y Pasta sorpresa: mostrar postres de leche como recomendados junto con frutas
                    postresLecheRecomendados = postresLecheSinVariantes;
                    postresLecheOtros = [];
                  } else {
                    // Lógica normal
                    postresLecheRecomendados = mostrarRecomendados === 'leche' ? postresLecheSinVariantes : [];
                    postresLecheOtros = mostrarRecomendados === 'leche' ? [] : postresLecheSinVariantes;
                  }
                  
                  // Budines
                  const budinesDisponibles = postresDeFruta.filter(p => !postresExcluidos.includes(p));
                  const budinesRecomendados = (mostrarRecomendados === 'fruta' || mostrarRecomendados === 'fruta_estacion') ? budinesDisponibles : [];
                  const budinesOtros = (mostrarRecomendados === 'fruta' || mostrarRecomendados === 'fruta_estacion') ? [] : budinesDisponibles;
                  
                  // Frutas frescas
                  const frutasDisponibles = frutasFrescas.filter(p => !postresExcluidos.includes(p));
                  let frutasRecomendadas: string[] = [];
                  let frutasOtros: string[] = [];
                  
                  // Manejo especial para Pollo colorido con arroz
                  if (item.principal === 'Pollo colorido') {
                    const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
                    if (item.acompanamiento && acompanamientosConArroz.includes(item.acompanamiento)) {
                      // No mostrar frutas, solo postres de leche (sin arroz con leche)
                      frutasRecomendadas = [];
                      frutasOtros = [];
                    } else {
                      // Si es fideos, solo postres de leche
                      frutasRecomendadas = [];
                      frutasOtros = [];
                    }
                  } else {
                    // Para Pan de Carne y Pasta sorpresa, mostrar frutas de estación como recomendadas
                    if (item.principal === 'Pan de Carne / Hamburguesa' || item.principal === 'Pasta sorpresa') {
                      const frutasEstacionDisponibles = frutasEstacion.filter(f => !postresExcluidos.includes(f) && frutasDisponibles.includes(f));
                      frutasRecomendadas = frutasEstacionDisponibles;
                      frutasOtros = frutasDisponibles.filter(f => !frutasEstacionDisponibles.includes(f));
                    } else {
                      frutasRecomendadas = 
                        mostrarRecomendados === 'fruta_estacion' ? frutasDisponibles :
                        mostrarRecomendados === 'fruta_citrica' ? frutasCitricas.filter(f => !postresExcluidos.includes(f)) :
                        mostrarRecomendados === 'fruta' ? frutasDisponibles : [];
                      frutasOtros = 
                        mostrarRecomendados === 'fruta_estacion' || mostrarRecomendados === 'fruta_citrica' || mostrarRecomendados === 'fruta' 
                          ? frutasDisponibles.filter(f => !frutasRecomendadas.includes(f))
                          : frutasDisponibles;
                    }
                  }
                  
                  // Priorizar postre específico si existe (ej: Banana)
                  const postreEspecifico = particularidades?.postreEspecifico;
                  
                  return (
                    <>
                      {postreEspecifico && (
                        <optgroup label="⭐⭐ Altamente recomendado">
                          <option value={postreEspecifico}>{postreEspecifico}</option>
                        </optgroup>
                      )}
                      {/* Para Pan de Carne y Pasta sorpresa, mostrar recomendados combinados */}
                      {(item.principal === 'Pan de Carne / Hamburguesa' || item.principal === 'Pasta sorpresa') && (postresLecheRecomendados.length > 0 || frutasRecomendadas.length > 0) && (
                        <optgroup label="⭐ Recomendados">
                          {postresLecheRecomendados
                            .filter(p => p !== postreEspecifico)
                            .map((nombre) => (
                              <option key={nombre} value={nombre}>{nombre}</option>
                            ))}
                          {frutasRecomendadas
                            .filter(p => p !== postreEspecifico)
                            .map((nombre) => (
                              <option key={nombre} value={nombre}>{nombre}</option>
                            ))}
                        </optgroup>
                      )}
                      {/* Para otras recetas, mostrar por categoría */}
                      {item.principal !== 'Pan de Carne / Hamburguesa' && item.principal !== 'Pasta sorpresa' && postresLecheRecomendados.length > 0 && (
                        <optgroup label="⭐ Recomendados - Postres de leche">
                          {postresLecheRecomendados
                            .filter(p => p !== postreEspecifico)
                            .map((nombre) => (
                              <option key={nombre} value={nombre}>{nombre}</option>
                            ))}
                        </optgroup>
                      )}
                      {variantesVainillaDisponibles.length > 0 && (
                        <optgroup label="Variantes de crema de vainilla">
                          {variantesVainillaDisponibles
                            .filter(p => p !== postreEspecifico)
                            .map((nombre) => (
                              <option key={nombre} value={nombre}>{nombre}</option>
                            ))}
                        </optgroup>
                      )}
                      {postresLecheOtros.length > 0 && (
                        <optgroup label="Postre de leche">
                          {postresLecheOtros
                            .filter(p => p !== postreEspecifico)
                            .map((nombre) => (
                              <option key={nombre} value={nombre}>{nombre}</option>
                            ))}
                        </optgroup>
                      )}
                      {budinesRecomendados.length > 0 && (
                        <optgroup label="⭐ Recomendados - Budines">
                          {budinesRecomendados
                            .filter(p => p !== postreEspecifico)
                            .map((nombre) => (
                              <option key={nombre} value={nombre}>{nombre}</option>
                            ))}
                        </optgroup>
                      )}
                      {budinesOtros.length > 0 && (
                        <optgroup label="Budines">
                          {budinesOtros
                            .filter(p => p !== postreEspecifico)
                            .map((nombre) => (
                              <option key={nombre} value={nombre}>{nombre}</option>
                            ))}
                        </optgroup>
                      )}
                      {item.principal !== 'Pan de Carne / Hamburguesa' && item.principal !== 'Pasta sorpresa' && frutasRecomendadas.length > 0 && (
                        <optgroup label="⭐ Recomendados - Frutas frescas">
                          {frutasRecomendadas
                            .filter(p => p !== postreEspecifico)
                            .map((nombre) => (
                              <option key={nombre} value={nombre}>{nombre}</option>
                            ))}
                        </optgroup>
                      )}
                      {frutasOtros.length > 0 && (
                        <optgroup label="Frutas frescas">
                          {frutasOtros
                            .filter(p => p !== postreEspecifico)
                            .map((nombre) => (
                  <option key={nombre} value={nombre}>{nombre}</option>
                ))}
                        </optgroup>
                      )}
                    </>
                  );
                })()}
              </select>
              {(() => {
                const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
                const tieneArroz = item.acompanamiento && acompanamientosConArroz.includes(item.acompanamiento);
                const esPolloColorido = item.principal === 'Pollo colorido';
                
                // Para Pollo colorido con arroz, mostrar advertencia específica
                if (esPolloColorido && tieneArroz && item.postre === 'Arroz con leche') {
                  return (
                    <p className="mt-1 text-xs text-red-600 font-semibold">
                      ⚠️ Advertencia: "Arroz con leche" no se puede usar cuando el acompañamiento es arroz. Por favor, seleccione otro postre de leche.
                    </p>
                  );
                }
                
                if (tieneArroz && item.postre !== 'Arroz con leche') {
                  return (
                    <p className="mt-1 text-xs text-orange-600 italic">
                      ⚠️ Nota: No se recomienda seleccionar "Arroz con leche" cuando el acompañamiento contiene arroz.
                    </p>
                  );
                }
                if (tieneArroz && item.postre === 'Arroz con leche') {
                  return (
                    <p className="mt-1 text-xs text-red-600 font-semibold">
                      ⚠️ Advertencia: "Arroz con leche" no se recomienda cuando el acompañamiento es arroz. Por favor, seleccione otro postre.
                    </p>
                  );
                }
                
                // Para Pollo colorido, recordar que el postre debe ser de leche
                if (esPolloColorido && item.acompanamiento && !tieneArroz && item.acompanamiento === 'Fideos') {
                  if (item.postre && !postresDeLeche.includes(item.postre)) {
                    return (
                      <p className="mt-1 text-xs text-orange-600 italic">
                        💡 Recomendación: Para Pollo colorido, se sugiere un postre de leche.
                      </p>
                    );
                  }
                }
                
                return null;
              })()}
              {item.postre && obtenerPesoPostre(item.postre) && (
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                  <span className="font-semibold text-blue-800">Porción por persona: </span>
                  <span className="text-blue-700">{obtenerPesoPostre(item.postre)}</span>
                  {pesosPostres[item.postre]?.tipo === 'fruta_fresca' && (
                    <span className="block mt-1 text-xs text-blue-600 italic">
                      {pesosPostres[item.postre].unidad === 'g' && '(con cáscara)'}
                    </span>
                  )}
                  {item.postre.startsWith('Crema de vainilla -') && (
                    <span className="block mt-2 text-[11px] text-gray-600 italic">
                      Consulta el recetario para ver las cantidades de ingredientes de esta variante.
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {!mismaCantidadTodos && (
          <div className="mt-2 grid grid-cols-3 gap-2 max-w-md">
            {(['chica', 'mediana', 'grande'] as TipoComensal[]).map((tipo) => (
              <div key={tipo}>
                <label className="block text-sm text-black">Porciones {tipo}</label>
                <input
                  type="number"
                  disabled={item.sinMenu}
                  value={item.porciones[tipo]}
                  onChange={(e) => manejarCambioPorciones(index, tipo, e.target.value)}
                  className="w-full p-2 border rounded text-black"
                  min={0}
                  placeholder="0"
                />
              </div>
            ))}
          </div>
          )}
          
          {mismaCantidadTodos && !item.sinMenu && (
            <div className="mt-2 p-3 bg-logoGreen/10 rounded-lg border border-logoGreen/20">
              <p className="text-xs font-semibold text-logoGreen mb-2">Porciones aplicadas (modo global):</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Chica:</span>
                  <span className="ml-2 text-gray-900 font-semibold">{item.porciones.chica || '0'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Mediana:</span>
                  <span className="ml-2 text-gray-900 font-semibold">{item.porciones.mediana || '0'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Grande:</span>
                  <span className="ml-2 text-gray-900 font-semibold">{item.porciones.grande || '0'}</span>
                </div>
              </div>
            </div>
          )}
          
          {!item.sinMenu && item.principal && (
            <div className="mt-2">
              {(() => {
                const particularidades = particularidadesRecetas[item.principal];
                const incluirPan = particularidades?.llevaMasa ? false : (item.incluirPan !== false);
                const porcionesChica = Number(item.porciones.chica) || 0;
                const porcionesMediana = Number(item.porciones.mediana) || 0;
                const porcionesGrande = Number(item.porciones.grande) || 0;
                const totalPan = incluirPan ? (porcionesChica * 20) + ((porcionesMediana + porcionesGrande) * 25) : 0;
                
                if (incluirPan && totalPan > 0) {
                  return (
                    <div className="p-2 bg-amber-50 border border-amber-200 rounded text-sm">
                      <span className="font-semibold text-amber-800">🍞 Pan para este día: </span>
                      <span className="text-amber-700">{totalPan}g</span>
                      <span className="text-xs text-amber-600 block mt-1">
                        (20g por porción chica, 25g por porción mediana/grande)
                      </span>
                    </div>
                  );
                } else if (!incluirPan) {
                  return (
                    <div className="p-2 bg-gray-100 border border-gray-300 rounded text-sm">
                      <span className="font-semibold text-gray-700">🍞 Pan: </span>
                      <span className="text-gray-600">No incluido (receta con masa)</span>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}

          <div className="mt-2">
            <label className="inline-flex items-center text-black">
              <input
                type="checkbox"
                checked={item.sinMenu}
                onChange={(e) => manejarSinMenu(index, e.target.checked)}
                className="mr-2"
              />
              No se cocina este día
            </label>
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            // Convertir las porciones a números antes de exportar y asegurar incluirPan
            const menuConNumeros = menu.map(item => {
              const particularidades = item.principal ? particularidadesRecetas[item.principal] : null;
              const incluirPan = particularidades?.llevaMasa ? false : (item.incluirPan !== false);
              return {
                ...item,
                porciones: getPorcionesNumericas(item.porciones),
                incluirPan
              };
            });
            exportMenuToPDF(menuConNumeros);
          }}
          className="flex items-center gap-2 bg-logoGreen hover:bg-logoGreenHover text-white font-bold py-2 px-4 rounded"
        >
          <FaFilePdf className="text-white" />
          Exportar menú semanal
        </button>
      </div>
    </div>
  );
};

export default MenuSemanal;
