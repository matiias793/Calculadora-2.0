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
    const [isZoomed, setIsZoomed] = useState(false);

    const nextSlide = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % pautasImages.length);
    };

    const prevSlide = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + pautasImages.length) % pautasImages.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isZoomed) {
                if (e.key === 'Escape') setIsZoomed(false);
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isZoomed]);

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">

            {/* Main Carousel View */}
            <div className="relative group">
                <div
                    className="relative aspect-[16/9] w-full bg-neutral-900 rounded-xl overflow-hidden shadow-lg border border-neutral-200 cursor-zoom-in"
                    onClick={() => setIsZoomed(true)}
                >
                    <Image
                        src={pautasImages[currentIndex]}
                        alt={`Pauta ${currentIndex + 1}`}
                        fill
                        className="object-contain"
                        priority
                    />

                    {/* Hover Hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 pointer-events-none">
                        <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                            Clic para ampliar
                        </span>
                    </div>

                    {/* Counter Overlay */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-sm rounded-full backdrop-blur-sm z-10">
                        {currentIndex + 1} / {pautasImages.length}
                    </div>
                </div>

                {/* DESKTOP Controls (Hidden on Mobile) */}
                <button
                    onClick={prevSlide}
                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-lg border border-neutral-200 transition-all hover:scale-110 z-20"
                    aria-label="Pauta anterior"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={nextSlide}
                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-lg border border-neutral-200 transition-all hover:scale-110 z-20"
                    aria-label="Siguiente pauta"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* MOBILE Controls (Visible only on Mobile) */}
            <div className="flex md:hidden items-center justify-between gap-4 px-2">
                <button
                    onClick={prevSlide}
                    className="flex-1 flex items-center justify-center p-3 rounded-lg bg-white border border-neutral-200 text-neutral-700 shadow-sm active:bg-neutral-50"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Anterior
                </button>
                <button
                    onClick={nextSlide}
                    className="flex-1 flex items-center justify-center p-3 rounded-lg bg-white border border-neutral-200 text-neutral-700 shadow-sm active:bg-neutral-50"
                >
                    Siguiente
                    <ChevronRight className="w-5 h-5 ml-1" />
                </button>
            </div>

            {/* Thumbnails / Indicators */}
            <div className="flex justify-center gap-2 flex-wrap px-4">
                {pautasImages.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${currentIndex === idx
                                ? 'bg-blue-600 scale-125'
                                : 'bg-neutral-300 hover:bg-neutral-400'
                            }`}
                        aria-label={`Ir a pauta ${idx + 1}`}
                    />
                ))}
            </div>

            {/* ZOOM MODAL */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setIsZoomed(false)}
                >
                    <button
                        className="absolute top-4 right-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
                        onClick={() => setIsZoomed(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
                        <Image
                            src={pautasImages[currentIndex]}
                            alt={`Pauta ${currentIndex + 1} - Ampliada`}
                            fill
                            className="object-contain"
                            priority
                            quality={100}
                        />
                    </div>

                    {/* Modal Navigation */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                        {currentIndex + 1} de {pautasImages.length}
                    </div>
                </div>
            )}
        </div>
    );
};
