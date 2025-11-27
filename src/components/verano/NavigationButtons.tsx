'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export const NavigationButtons: React.FC = () => {
    return (
        <div className="flex items-center space-x-4 mb-6">
            <Link
                href="/"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
                <Home className="w-4 h-4 mr-2" />
                Inicio
            </Link>
            <Link
                href="/escuelas-verano"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Calendario
            </Link>
        </div>
    );
};
