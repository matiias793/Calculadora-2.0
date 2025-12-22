'use client';

import React from 'react';
import NavigationButtons from '@/components/shared/NavigationButtons';
import { PautasCarousel } from '@/components/pautas/PautasCarousel';
import { BookOpen, ExternalLink } from 'lucide-react';


export default function PautasPage() {
    return (
        <div className="min-h-screen bg-neutral-50 pb-12">
            {/* Navigation Header */}
            <div className="bg-white px-4 py-4 border-b border-neutral-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <NavigationButtons />
                    <h1 className="text-lg font-bold text-neutral-800 hidden sm:block">Pautas Generales</h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">

                    <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                        Pautas generales para los servicios de alimentación
                    </h1>

                    <div className="mt-6 flex justify-center">
                        <a
                            href="https://drive.google.com/file/d/13lVHHMpezYP33NXGGUZrk1X_SZyutmP1/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-md hover:bg-blue-700 transition-all hover:scale-105"
                        >
                            <ExternalLink className="w-5 h-5" />
                            Ver Afiche Oficial
                        </a>
                    </div>
                </div>

                {/* Carousel Section */}
                <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-neutral-200">
                    <PautasCarousel />
                </div>
            </div>
        </div>
    );
}
