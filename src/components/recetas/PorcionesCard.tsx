'use client'

import { Receta } from '@/models/Receta';
import { useAppDispatch, useAppSelector } from '@/store';
import { decrement, increment, setPorciones, setRecetaPorciones, setPorcionesTipo } from '@/store/receta/recetaSlice';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';
import React, { useCallback, useEffect, useState } from 'react';

interface Props {
  isAlmuerzo?: boolean;
}

const PorcionesCard = ({ isAlmuerzo = false }: Props) => {
  const porciones = useAppSelector((state) => state.receta.porciones);
  const recetaOriginal = useAppSelector((state) => state.receta.recetaOriginal);
  const unidadVolumen = useAppSelector((state) => state.receta.unidadVolumen);
  const unidadMasa = useAppSelector((state) => state.receta.unidadMasa);
  const dispatch = useAppDispatch();

  // Determinar si es receta de desayunos/meriendas o almuerzos
  const isDesayunoMerienda = !isAlmuerzo;

  const [counterChica, setCounterChica] = useState(0);
  const [counterMediana, setCounterMediana] = useState(isDesayunoMerienda ? 10 : porciones);
  const [counterGrande, setCounterGrande] = useState(0);

  // Constantes para cálculos precisos
  const FACTOR_CHICA = 0.67;
  const FACTOR_GRANDE = 1.33;
  const PORCIONES_BASE_DESAYUNO = 10;
  const MAX_PORCIONES = 1000; // Límite máximo para evitar cálculos excesivos

  // Función para validar y limitar valores
  const validateAndLimit = (value: number): number => {
    if (isNaN(value) || value < 0) return 0;
    if (value > MAX_PORCIONES) return MAX_PORCIONES;
    return Math.round(value);
  };

  // Función para calcular total de porciones con precisión
  const calculateTotalPorciones = (chica: number, mediana: number, grande: number): number => {
    const total = chica * FACTOR_CHICA + mediana + grande * FACTOR_GRANDE;
    return Math.round(total * 100) / 100; // Redondear a 2 decimales para mayor precisión
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value.replace(/^0+/, ''));
      const validatedValue = validateAndLimit(value);
      setter(validatedValue);
    };

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    const increment = isDesayunoMerienda ? 10 : 1;
    const newValue = validateAndLimit(value + increment);
    setter(newValue);
  };

  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    const decrement = isDesayunoMerienda ? 10 : 1;
    const newValue = validateAndLimit(Math.max(0, value - decrement));
    setter(newValue);
  };

  const isHuevo = (name: string) => name.trim().toLowerCase().includes('huevo');

  const processItem = useCallback((name: string, quantity: string | number, unit: string, factor: number) => {
    let q: string | number = '';
    let u = unit;
    
    if (isNaN(Number(quantity))) {
      q = quantity;
    } else if (isHuevo(name)) {
      if (unit === 'g') {
        const unidades = parseFloat(((Number(quantity) * factor) / 60).toFixed(2));
        q = unidades;
        u = unidades === 1 ? 'unidad' : 'unidades';
      } else {
        const unidades = Math.round(Number(quantity) * factor);
        q = unidades;
        u = unidades === 1 ? 'unidad' : 'unidades';
      }
    } else if (['ml', 'l', 'g', 'kg'].includes(unit)) {
      if (unit === 'ml' && unidadVolumen === UnidadVolumen.LITROS) {
        q = parseFloat(((Number(quantity) * factor) / 1000).toFixed(2));
        u = 'l';
      } else if (unit === 'g' && unidadMasa === UnidadMasa.KILOGRAMOS) {
        q = parseFloat(((Number(quantity) * factor) / 1000).toFixed(2));
        u = 'kg';
      } else {
        q = parseFloat((Number(quantity) * factor).toFixed(2));
      }
    } else {
      q = parseFloat((Number(quantity) * factor).toFixed(2));
    }
    return { name, quantity: q, unit: u };
  }, [unidadMasa, unidadVolumen]);

  const recalculate = useCallback((factor: number) => {
    if (!recetaOriginal) return;

    if (isNaN(factor) || factor < 0) {
      console.warn('Factor de cálculo inválido:', factor);
      return;
    }

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
  }, [dispatch, processItem, recetaOriginal]);

  useEffect(() => {
    if (!recetaOriginal) return;
    
    if (isDesayunoMerienda) {
      const validatedPorciones = validateAndLimit(counterMediana);
      dispatch(setPorciones(validatedPorciones));
      dispatch(setPorcionesTipo({ chica: 0, mediana: validatedPorciones, grande: 0 }));
      recalculate(validatedPorciones / PORCIONES_BASE_DESAYUNO);
    } else {
      const validatedChica = validateAndLimit(counterChica);
      const validatedMediana = validateAndLimit(counterMediana);
      const validatedGrande = validateAndLimit(counterGrande);
      
      const total = calculateTotalPorciones(validatedChica, validatedMediana, validatedGrande);
      
      dispatch(setPorciones(total));
      dispatch(setPorcionesTipo({ 
        chica: validatedChica, 
        mediana: validatedMediana, 
        grande: validatedGrande 
      }));
      recalculate(total);
    }
  }, [
    counterChica,
    counterMediana,
    counterGrande,
    unidadVolumen,
    unidadMasa,
    recetaOriginal,
    isDesayunoMerienda,
    dispatch,
    recalculate
  ]);

  return (
    <div className="flex-col w-full flex gap-5">
      <div className="p-6 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-auto">
        <h4 className="text-lg text-logoGreen font-bold mb-4">Cantidad de porciones</h4>
        <div className="grid grid-cols-1 gap-4">
          {isDesayunoMerienda ? (
            // Solo mostrar porción mediana para desayunos y meriendas
            <div>
              <label className="block font-semibold text-sm text-logoGreen mb-1">Porciones medianas</label>
              <div className="flex flex-row items-center gap-2">
                <button 
                  className="bg-logoGreen hover:bg-logoGreenHover text-white font-bold py-1.5 px-4 rounded-lg flex items-center justify-center min-w-[44px] h-[44px]" 
                  onClick={() => handleDecrement(setCounterMediana, counterMediana)}
                  disabled={counterMediana <= 0}
                >
                  -
                </button>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full p-2 border rounded text-center appearance-none"
                  value={counterMediana}
                  onChange={handleChange(setCounterMediana)}
                  min="0"
                  max={MAX_PORCIONES}
                />
                <button 
                  className="bg-logoGreen hover:bg-logoGreenHover text-white font-bold py-1.5 px-4 rounded-lg flex items-center justify-center min-w-[44px] h-[44px]" 
                  onClick={() => handleIncrement(setCounterMediana, counterMediana)}
                  disabled={counterMediana >= MAX_PORCIONES}
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Mínimo: 0, Máximo: {MAX_PORCIONES}
              </p>
            </div>
          ) : (
            // Mostrar todas las porciones para almuerzos
            [{
              label: 'Porciones chicas', value: counterChica, setter: setCounterChica
            }, {
              label: 'Porciones medianas', value: counterMediana, setter: setCounterMediana
            }, {
              label: 'Porciones grandes', value: counterGrande, setter: setCounterGrande
            }].map(({ label, value, setter }, index) => (
              <div key={index}>
                <label className="block font-semibold text-sm text-logoGreen mb-1">{label}</label>
                <div className="flex flex-row items-center gap-2">
                  <button 
                    className="bg-logoGreen hover:bg-logoGreenHover text-white font-bold py-1.5 px-4 rounded-lg flex items-center justify-center min-w-[44px] h-[44px]" 
                    onClick={() => handleDecrement(setter, value)}
                    disabled={value <= 0}
                  >
                    -
                  </button>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-full p-2 border rounded text-center appearance-none"
                    value={value}
                    onChange={handleChange(setter)}
                    min="0"
                    max={MAX_PORCIONES}
                  />
                  <button 
                    className="bg-logoGreen hover:bg-logoGreenHover text-white font-bold py-1.5 px-4 rounded-lg flex items-center justify-center min-w-[44px] h-[44px]" 
                    onClick={() => handleIncrement(setter, value)}
                    disabled={value >= MAX_PORCIONES}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
          
          {/* Mostrar total calculado para almuerzos */}
          {!isDesayunoMerienda && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Total calculado:</strong> {calculateTotalPorciones(counterChica, counterMediana, counterGrande)} porciones
              </p>
              <p className="text-xs text-gray-500 mt-1">
                (Chicas: {counterChica} × 0.67 + Medianas: {counterMediana} + Grandes: {counterGrande} × 1.33)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PorcionesCard;
