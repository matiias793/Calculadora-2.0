'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const pautasImages = [
    '/images/pautas/Screenshot 2025-12-22 084322.png',
    '/images/pautas/Screenshot 2025-12-22 084328.png',
    '/images/pautas/Screenshot 2025-12-22 084333.png',
    '/images/pautas/Screenshot 2025-12-22 084339.png',
    '/images/pautas/Screenshot 2025-12-22 084343.png',
    '/images/pautas/Screenshot 2025-12-22 084348.png',
    '/images/pautas/Screenshot 2025-12-22 084356.png',
    '/images/pautas/Screenshot 2025-12-22 084401.png',
    '/images/pautas/Screenshot 2025-12-22 084405.png',
    '/images/pautas/Screenshot 2025-12-22 084411.png',
    '/images/pautas/Screenshot 2025-12-22 084416.png',
    '/images/pautas/Screenshot 2025-12-22 084421.png',
    '/images/pautas/Screenshot 2025-12-22 084425.png',
];

export const PautasCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % pautasImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + pautasImages.length) % pautasImages.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            {/* Main Carousel View */}
            <div className="relative aspect-[16/9] w-full bg-neutral-900 rounded-xl overflow-hidden shadow-lg border border-neutral-200">
                <Image
                    src={pautasImages[currentIndex]}
                    alt={`Pauta ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                />

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-sm transition-all hover:scale-110"
                    aria-label="Pauta anterior"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-sm transition-all hover:scale-110"
                    aria-label="Siguiente pauta"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-sm rounded-full backdrop-blur-sm">
                    {currentIndex + 1} / {pautasImages.length}
                </div>
            </div>

            {/* Thumbnails / Indicators */}
            <div className="flex justify-center gap-2 flex-wrap px-4">
                {pautasImages.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${currentIndex === idx
                                ? 'bg-primary scale-125'
                                : 'bg-neutral-300 hover:bg-neutral-400'
                            }`}
                        aria-label={`Ir a pauta ${idx + 1}`}
                    />
                ))}
            </div>

            <p className="text-center text-neutral-500 text-sm mt-4">
                Desliza o usa las flechas para navegar por las pautas.
            </p>
        </div>
    );
};
