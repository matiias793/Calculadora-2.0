'use client'

import { Receta } from '@/models/Receta';
import { useAppDispatch, useAppSelector } from '@/store';
import { setPorciones, setRecetaPorciones } from '@/store/receta/recetaSlice';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';
import React, { useEffect, useState } from 'react';

const PorcionesCard = () => {
  const recetaOriginal = useAppSelector((state) => state.receta.recetaOriginal);
  const unidadVolumen = useAppSelector((state) => state.receta.unidadVolumen);
  const unidadMasa = useAppSelector((state) => state.receta.unidadMasa);
  const dispatch = useAppDispatch();

  const [counterChica, setCounterChica] = useState(0);
  const [counterMediana, setCounterMediana] = useState(10);
  const [counterGrande, setCounterGrande] = useState(0);

  useEffect(() => {
    const total = counterChica * 0.67 + counterMediana + counterGrande * 1.33;
    dispatch(setPorciones(Math.round(total * 10)));
    recalculate(total);
  }, [counterChica, counterMediana, counterGrande, unidadVolumen, unidadMasa]);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      setter(isNaN(value) || value < 0 ? 0 : value);
    };

  const recalculate = (factor: number) => {
    if (!recetaOriginal || !recetaOriginal.ingredients) return;

    const convertQuantity = (quantity: any, unit: string): number | string => {
      if (isNaN(Number(quantity))) return quantity;
      if (['cm3', 'ml', 'l', 'g', 'kg'].includes(unit)) {
        if ((['cm3', 'ml'].includes(unit) && unidadVolumen === UnidadVolumen.LITROS) ||
            (unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS)) {
          return Number(((Number(quantity) * factor) / 1000).toFixed(3));
        } else {
          return Number(quantity) * factor;
        }
      }
      return Number(quantity) * factor;
    };

    const mapUnits = (unit: string, quantity: any): string => {
      if (unit === 'unidad' && quantity !== 1) return 'unid.';
      if (['cm3', 'ml'].includes(unit) && unidadVolumen === UnidadVolumen.LITROS) return 'l';
      if (unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS) return 'kg';
      return unit;
    };

    const ingredients = recetaOriginal.ingredients.map(({ name, quantity, unit }) => ({
      name,
      quantity: convertQuantity(quantity, unit),
      unit: mapUnits(unit, quantity)
    }));

    const variants = recetaOriginal?.variants?.map(({ name, quantity, unit }) => ({
      name,
      quantity: convertQuantity(quantity, unit),
      unit: mapUnits(unit, quantity)
    }));

    const newReceta: Receta = {
      title: recetaOriginal.title,
      ingredients
    };

    if (variants) newReceta.variants = variants;
    dispatch(setRecetaPorciones(newReceta));
  };

  return (
    <div className="flex-col w-full flex gap-5">
      <div className="p-6 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-auto">
        <h4 className="text-lg text-logoGreen font-bold mb-4">Cantidad de porciones por tipo</h4>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-semibold text-sm text-logoGreen mb-1">Porciones chicas (−33%)</label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border rounded"
              value={counterChica}
              onChange={handleChange(setCounterChica)}
            />
          </div>
          <div>
            <label className="block font-semibold text-sm text-logoGreen mb-1">Porciones medianas (base)</label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border rounded"
              value={counterMediana}
              onChange={handleChange(setCounterMediana)}
            />
          </div>
          <div>
            <label className="block font-semibold text-sm text-logoGreen mb-1">Porciones grandes (+33%)</label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border rounded"
              value={counterGrande}
              onChange={handleChange(setCounterGrande)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PorcionesCard;
