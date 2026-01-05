import React from 'react';
import { Unit } from '../types';

interface UnitHeaderProps {
  unit: Unit;
  colorName: string;
}

export const UnitHeader: React.FC<UnitHeaderProps> = ({ unit, colorName }) => {
  const colorMap: Record<string, string> = {
      green: 'bg-green-500',
      blue: 'bg-sky-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-400',
      rose: 'bg-rose-500',
  };

  const bgColor = colorMap[colorName] || 'bg-green-500';

  return (
    <div className={`${bgColor} text-white p-4 rounded-xl mb-8 flex justify-between items-center shadow-sm`}>
      <div>
        <h2 className="text-xl font-bold">{unit.title}</h2>
        <p className="opacity-90">{unit.description}</p>
      </div>
      <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl font-bold text-sm transition-colors border-2 border-transparent hover:border-white/40">
        GUIA
      </button>
    </div>
  );
};