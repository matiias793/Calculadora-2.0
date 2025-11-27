import { getFrutasDeEstacion, obtenerMesActual } from '@/utils/frutas-estacion';

export type TipoComensal = 'chica' | 'mediana' | 'grande';

export const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// Particularidades de cada receta
export interface ParticularidadesReceta {
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

export const particularidadesRecetas: Record<string, ParticularidadesReceta> = {
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
export const recetasPorTipoCarne = {
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
export const postresDeLeche = [
  'Arroz con leche',
  'Crema de naranja',
  'Crema de vainilla',
  'Crema de chocolate',
  'Crema de coco',
  'Crema con cáscara de naranja',
  'Crema de caramelo'
];

export const variantesPostreDeLeche = [
  'Crema de chocolate',
  'Crema de coco',
  'Crema con cáscara de naranja',
  'Crema de caramelo'
];

export const postresDeFruta = [
  'Budín de zapallo y coco',
  'Budín de harina de maíz'
];

// Frutas frescas que pueden ser postres
export const frutasFrescas = [
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

// Frutas cítricas
export const frutasCitricas = [
  'Naranja',
  'Mandarina',
  'Kiwi'
];

// Frutas de estación calculadas internamente según el mes actual
export const getFrutasEstacionActual = () => getFrutasDeEstacion(obtenerMesActual(), frutasFrescas).filter(f => frutasFrescas.includes(f));
