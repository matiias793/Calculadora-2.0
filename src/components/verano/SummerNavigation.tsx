import React from 'react';

interface SummerNavigationProps {
    activeTab: 'maldonado' | 'resto';
    onTabChange: (tab: 'maldonado' | 'resto') => void;
}

export const SummerNavigation: React.FC<SummerNavigationProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm p-1 inline-flex border border-gray-100">
                <button
                    onClick={() => onTabChange('maldonado')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'maldonado'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                        }`}
                >
                    Maldonado
                </button>
                <button
                    onClick={() => onTabChange('resto')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'resto'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                        }`}
                >
                    Todo el País
                </button>
            </div>
        </div>
    );
};
