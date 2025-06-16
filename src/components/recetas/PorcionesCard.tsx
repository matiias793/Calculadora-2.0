'use client'

import { Receta } from '@/models/Receta';
import { useAppDispatch, useAppSelector } from '@/store';
import { decrement, increment, setPorciones, setRecetaPorciones, setPorcionesTipo } from '@/store/receta/recetaSlice';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';
import React, { useEffect, useState } from 'react';

const PorcionesCard = () => {
  const porciones = useAppSelector((state) => state.receta.porciones);
  const recetaOriginal = useAppSelector((state) => state.receta.recetaOriginal);
  const unidadVolumen = useAppSelector((state) => state.receta.unidadVolumen);
  const unidadMasa = useAppSelector((state) => state.receta.unidadMasa);
  const dispatch = useAppDispatch();

  const [counterChica, setCounterChica] = useState(0);
  const [counterMediana, setCounterMediana] = useState(porciones);
  const [counterGrande, setCounterGrande] = useState(0);

  useEffect(() => {
    if (!recetaOriginal) return;
    const total = counterChica * 0.67 + counterMediana + counterGrande * 1.33;
    dispatch(setPorciones(Math.round(total)));
    dispatch(setPorcionesTipo({ chica: counterChica, mediana: counterMediana, grande: counterGrande }));
    recalculate(total);
  }, [counterChica, counterMediana, counterGrande, unidadVolumen, unidadMasa, recetaOriginal]);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value.replace(/^0+/, ''));
      setter(isNaN(value) || value < 0 ? 0 : value);
    };

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(value + 1);
  };

  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(value > 0 ? value - 1 : 0);
  };

  const isHuevo = (name: string) => name.trim().toLowerCase() === 'huevo';

  const processItem = (name: string, quantity: string | number, unit: string, factor: number) => {
    let q: string | number = '';
    let u = unit;
    if (isNaN(Number(quantity))) {
      q = quantity;
    } else if (isHuevo(name)) {
      const unidades = Math.round(Number(quantity) * factor / 60);
      q = unidades;
      u = unidades === 1 ? 'unidad' : 'unidades';
    } else if (["cm3", "ml", "l", "g", "kg"].includes(unit)) {
      if ((["cm3", "ml"].includes(unit) && unidadVolumen === UnidadVolumen.LITROS)) {
        q = parseFloat(((Number(quantity) * factor) / 1000).toFixed(2));
        u = 'l';
      } else if (unit === "g" && unidadMasa === UnidadMasa.KILOGRAMOS) {
        q = parseFloat(((Number(quantity) * factor) / 1000).toFixed(2));
        u = 'kg';
      } else {
        q = parseFloat((Number(quantity) * factor).toFixed(2));
      }
    } else {
      q = parseFloat((Number(quantity) * factor).toFixed(2));
    }
    return { name, quantity: q, unit: u };
  };

  const recalculate = (factor: number, changeUnit: boolean = false) => {
    if (!recetaOriginal) return;

    const ingredients = recetaOriginal.ingredients.map(({ name, quantity, unit }) =>
      processItem(name, quantity, unit, factor)
    );

    const variants = recetaOriginal.variants?.map(({ name, quantity, unit }) =>
      processItem(name, quantity, unit, factor)
    );

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
        <h4 className="text-lg text-logoGreen font-bold mb-4">Cantidad de porciones</h4>
        <div className="grid grid-cols-1 gap-4">
          {[{
            label: 'Porciones chicas', value: counterChica, setter: setCounterChica
          }, {
            label: 'Porciones medianas', value: counterMediana, setter: setCounterMediana
          }, {
            label: 'Porciones grandes', value: counterGrande, setter: setCounterGrande
          }].map(({ label, value, setter }, index) => (
            <div key={index}>
              <label className="block font-semibold text-sm text-logoGreen mb-1">{label}</label>
              <div className="flex flex-row items-center gap-2">
                <button className="bg-logoGreen hover:bg-logoGreenHover text-white font-bold py-1 px-3 rounded" onClick={() => handleDecrement(setter, value)}>-</button>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full p-2 border rounded text-center appearance-none"
                  value={value}
                  onChange={handleChange(setter)}
                />
                <button className="bg-logoGreen hover:bg-logoGreenHover text-white font-bold py-1 px-3 rounded" onClick={() => handleIncrement(setter, value)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PorcionesCard;
