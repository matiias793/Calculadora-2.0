import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { WeekGroup } from '@/utils/verano-weeks';
import { MenuCalendarGrid } from './MenuCalendarGrid'; // Asegúrate que este import exista

interface WeeklyGroupProps {
    week: WeekGroup;
    basePath: string;
    onToggle: () => void;
}

export const WeeklyGroup: React.FC<WeeklyGroupProps> = ({ week, basePath, onToggle }) => {
    return (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            {/* Header Clickable */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-neutral-50 transition-colors focus:outline-none"
            >
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${week.isOpen ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                        <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-neutral-800">{week.label}</h3>
                        <p className="text-sm text-neutral-500 font-medium">{week.rango}</p>
                    </div>
                </div>

                <div className={`transform transition-transform duration-300 ${week.isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                </div>
            </button>

            {/* Body (Grid) */}
            {week.isOpen && (
                <div className="p-5 border-t border-neutral-100 bg-neutral-50/50">
                    <MenuCalendarGrid dias={week.dias} basePath={basePath} />
                </div>
            )}
        </div>
    );
};