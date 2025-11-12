export type TipoPostre = 'leche' | 'fruta' | 'fruta_fresca';

export interface PesoPostre {
  peso: string;
  unidad: string;
  tipo: TipoPostre;
}

export const pesosPostres: Record<string, PesoPostre> = {
  // Postres de leche (cremas, flanes, arroz con leche)
  'Arroz con leche': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de naranja': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de vainilla': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de chocolate': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de coco': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema con cáscara de naranja': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de caramelo': { peso: '130-150', unidad: 'g', tipo: 'leche' },

  // Budines
  'Budín de harina de maíz': { peso: '150', unidad: 'g', tipo: 'fruta' },
  'Budín de zapallo y coco': { peso: '150', unidad: 'g', tipo: 'fruta' },

  // Frutas frescas (porción individual)
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

export const obtenerPesoPostre = (nombrePostre: string): string => {
  const postre = pesosPostres[nombrePostre];
  if (!postre) return '';

  if (postre.unidad) {
    return `${postre.peso} ${postre.unidad}`.trim();
  }

  return postre.peso;
};

