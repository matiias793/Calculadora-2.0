'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Receta } from '@/models/Receta';
import { Procedimiento } from '@/models/Procedimiento';
import { FaVolumeUp, FaStop } from 'react-icons/fa';
import { useAppSelector } from '@/store';

interface RecipeAudioButtonProps {
  receta: Receta;
  procedimiento: Procedimiento;
}

const RecipeAudioButton = ({ receta, procedimiento }: RecipeAudioButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const segmentsRef = useRef<string[]>([]);
  const porcionesTipo = useAppSelector((state) => state.receta.porcionesTipo);
  const recetaEscalada = useAppSelector((state) => state.receta.recetaPorciones);
  const totalComensales = Math.max(
    0,
    porcionesTipo.chica + porcionesTipo.mediana + porcionesTipo.grande
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const supportsSpeech = 'speechSynthesis' in window;
    setCanSpeak(supportsSpeech);

    return () => {
      if (supportsSpeech) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const narrationSegments = useMemo<string[]>(() => {
    const recetaBase = recetaEscalada ?? receta;
    if (!recetaBase || !procedimiento) return [];

    const cantidadTexto =
      totalComensales > 0
        ? `Esta receta está calculada para ${totalComensales} ${totalComensales === 1 ? 'persona' : 'personas'}.`
        : 'Aún no se configuró la cantidad de comensales.';

    const segments: string[] = [];
    segments.push(`Receta: ${recetaBase.title}. ${cantidadTexto}`);

    recetaBase.ingredients.forEach(({ name, quantity, unit }, index) => {
      const cantidad = typeof quantity === 'number' ? Number(quantity).toLocaleString('es-AR') : quantity;
      const unidad = unit ? ` ${unit}` : '';
      segments.push(`Ingrediente ${index + 1}: ${name}, ${cantidad}${unidad}.`);
    });

    if (recetaBase.variants && recetaBase.variants.length > 0) {
      segments.push('Variantes de ingredientes.');
      recetaBase.variants.forEach(({ name, quantity, unit }, index) => {
        const cantidad = typeof quantity === 'number' ? Number(quantity).toLocaleString('es-AR') : quantity;
        const unidad = unit ? ` ${unit}` : '';
        segments.push(`Variante ${index + 1}: ${name}, ${cantidad}${unidad}.`);
      });
    }

    if (procedimiento?.opciones && procedimiento.opciones.length > 0) {
      segments.push('Procedimiento.');
      procedimiento.opciones.forEach((opcion, index) => {
        const titulo = opcion.title ? `${opcion.title}.` : `Sección ${index + 1}.`;
        segments.push(`${titulo}`);
        opcion.pasos.forEach((paso, pasoIndex) => {
          segments.push(`Paso ${index + 1}.${pasoIndex + 1}: ${paso}.`);
        });
      });
    }

    if (procedimiento?.tips && procedimiento.tips.length > 0) {
      segments.push('Tips.');
      procedimiento.tips.forEach((tip, index) => {
        segments.push(`Tip ${index + 1}: ${tip}.`);
      });
    }

    if (procedimiento?.variantes && procedimiento.variantes.length > 0) {
      segments.push('Variantes.');
      procedimiento.variantes.forEach((variante, index) => {
        segments.push(`Variante ${index + 1}: ${variante}.`);
      });
    }

    return segments;
  }, [receta, recetaEscalada, procedimiento, totalComensales]);

  useEffect(() => {
    if (Array.isArray(narrationSegments)) {
      segmentsRef.current = narrationSegments;
    } else {
      segmentsRef.current = [];
    }
  }, [narrationSegments]);

  const playSegment = useCallback((index: number) => {
    if (!canSpeak || typeof window === 'undefined') return;
    const synthesis = window.speechSynthesis;
    const segments = segmentsRef.current;

    if (index >= segments.length) {
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(segments[index]);
    utterance.lang = 'es-AR';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => playSegment(index + 1);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    synthesis.speak(utterance);
  }, [canSpeak]);

  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !canSpeak || segmentsRef.current.length === 0) return;

    const synthesis = window.speechSynthesis;

    if (isPlaying) {
      synthesis.cancel();
      setIsPlaying(false);
      return;
    }

    synthesis.cancel();
    setIsPlaying(true);
    playSegment(0);
  };

  if (!canSpeak) {
    return (
      <p className="text-sm text-neutral-text/70 mt-2 text-center">
        Tu navegador no soporta narración automática.
      </p>
    );
  }

  return (
    <div className="mt-2 flex justify-end">
      <button
        onClick={handleToggleAudio}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors text-sm font-medium border border-gray-200"
        aria-label={isPlaying ? 'Detener narración' : 'Escuchar receta'}
        title={isPlaying ? 'Detener narración' : 'Escuchar receta'}
      >
        {isPlaying ? <FaStop size={14} /> : <FaVolumeUp size={16} />}
        <span className="text-xs">{isPlaying ? 'Detener' : 'Escuchar'}</span>
      </button>
    </div>
  );
};

export default RecipeAudioButton;

