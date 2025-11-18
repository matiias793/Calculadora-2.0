'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Receta } from '@/models/Receta';
import { Procedimiento } from '@/models/Procedimiento';
import { FaVolumeUp, FaStop } from 'react-icons/fa';

interface RecipeAudioButtonProps {
  receta: Receta;
  procedimiento: Procedimiento;
}

const RecipeAudioButton = ({ receta, procedimiento }: RecipeAudioButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

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

  const narrationText = useMemo(() => {
    if (!receta || !procedimiento) return '';

    const ingredientLines = receta.ingredients
      .map(({ name, quantity, unit }) => {
        const cantidad = typeof quantity === 'number' ? Number(quantity).toLocaleString('es-AR') : quantity;
        const unidad = unit ? ` ${unit}` : '';
        return `${name}: ${cantidad}${unidad}`.trim();
      })
      .join('. ');

    const variantes = receta.variants && receta.variants.length > 0
      ? ` Variantes sugeridas: ${receta.variants.map(({ name, quantity, unit }) => {
          const cantidad = typeof quantity === 'number' ? Number(quantity).toLocaleString('es-AR') : quantity;
          const unidad = unit ? ` ${unit}` : '';
          return `${name} ${cantidad}${unidad}`.trim();
        }).join('. ')}.`
      : '';

    const pasos = procedimiento?.opciones
      ?.map((opcion, index) => {
        const titulo = opcion.title ? `${opcion.title}.` : '';
        const pasosConcat = opcion.pasos.map((paso, pasoIndex) => `Paso ${index + 1}.${pasoIndex + 1}: ${paso}`).join('. ');
        return `${titulo} ${pasosConcat}`;
      })
      .join(' ');

    return `Receta: ${receta.title}. Ingredientes: ${ingredientLines}.${variantes} Procedimiento: ${pasos}.`;
  }, [receta, procedimiento]);

  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !canSpeak || !narrationText) return;

    const synthesis = window.speechSynthesis;

    if (isPlaying) {
      synthesis.cancel();
      setIsPlaying(false);
      return;
    }

    synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.lang = 'es-AR';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    synthesis.speak(utterance);
    setIsPlaying(true);
  };

  if (!canSpeak) {
    return (
      <p className="text-sm text-neutral-text/70 mt-2 text-center">
        Tu navegador no soporta narración automática.
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <button
        onClick={handleToggleAudio}
        className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary-hover transition-colors"
        aria-label={isPlaying ? 'Detener narración de la receta' : 'Escuchar la receta narrada'}
      >
        {isPlaying ? <FaStop /> : <FaVolumeUp />}
        {isPlaying ? 'Detener audio' : 'Escuchar receta'}
      </button>
      <p className="text-xs text-neutral-text/80">
        Incluye nombre, ingredientes y procedimiento.
      </p>
    </div>
  );
};

export default RecipeAudioButton;

