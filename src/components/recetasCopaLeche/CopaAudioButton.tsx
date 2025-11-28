'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaStop, FaVolumeUp } from 'react-icons/fa';
import { useAppSelector } from '@/store';
import { saborizantesCopaLeche } from '@/utils/saborizantes';

interface CopaAudioButtonProps {
  opcion: string;
}

const CopaAudioButton = ({ opcion }: CopaAudioButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  const segmentsRef = useRef<string[]>([]);
  const recetaPorciones = useAppSelector((state) => state.recetaCopaLeche.recetaPorciones);
  const porciones = useAppSelector((state) => state.recetaCopaLeche.porciones);

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
    if (!recetaPorciones) return [];

    const totalPersonas = Math.max(1, porciones ?? 1);
    const segments: string[] = [];
    segments.push(`Receta: ${recetaPorciones.title}. Está calculada para ${totalPersonas} ${totalPersonas === 1 ? 'persona' : 'personas'}.`);

    recetaPorciones.ingredients.forEach(({ name, quantity, unit }, index) => {
      const cantidad = typeof quantity === 'number' ? Number(quantity).toLocaleString('es-AR') : quantity;
      const unidad = unit ? ` ${unit}` : '';
      segments.push(`Ingrediente ${index + 1}: ${name}, ${cantidad}${unidad}.`);
    });

    if (recetaPorciones.variants && recetaPorciones.variants.length > 0) {
      segments.push('Variantes de ingredientes.');
      recetaPorciones.variants.forEach(({ name, quantity, unit }, index) => {
        const cantidad = typeof quantity === 'number' ? Number(quantity).toLocaleString('es-AR') : quantity;
        const unidad = unit ? ` ${unit}` : '';
        segments.push(`Variante ${index + 1}: ${name}, ${cantidad}${unidad}.`);
      });
    }

    if (saborizantesCopaLeche.length > 0) {
      segments.push('Saborizantes disponibles.');
      saborizantesCopaLeche.forEach((saborizante, index) => {
        segments.push(`Opción ${index + 1}: ${saborizante.nombre}.`);
      });
    }

    return segments;
  }, [porciones, recetaPorciones]);

  useEffect(() => {
    segmentsRef.current = narrationSegments;
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

export default CopaAudioButton;

