import React from 'react';
import { Check, Star, Lock } from 'lucide-react';
import { Lesson, LessonStatus } from '../types';

interface PathNodeProps {
  lesson: Lesson;
  onClick: (lesson: Lesson) => void;
  color: string;
  positionOffset?: number; // -50 to 50 for horizontal shift
}

export const PathNode: React.FC<PathNodeProps> = ({ lesson, onClick, color, positionOffset = 0 }) => {
  
  const getColorClasses = (status: LessonStatus, colorName: string) => {
    // Map abstract color names to Tailwind values
    const colorMap: Record<string, { bg: string, border: string, active: string }> = {
      green: { bg: 'bg-green-500', border: 'border-green-600', active: 'bg-green-400' },
      blue: { bg: 'bg-sky-500', border: 'border-sky-600', active: 'bg-sky-400' },
      purple: { bg: 'bg-purple-500', border: 'border-purple-600', active: 'bg-purple-400' },
      red: { bg: 'bg-red-500', border: 'border-red-600', active: 'bg-red-400' },
      yellow: { bg: 'bg-yellow-400', border: 'border-yellow-600', active: 'bg-yellow-300' },
      rose: { bg: 'bg-rose-500', border: 'border-rose-600', active: 'bg-rose-400' },
    };

    const c = colorMap[colorName] || colorMap.green;

    switch (status) {
      case LessonStatus.COMPLETED:
        return "bg-yellow-400 border-yellow-600"; // Gold for done
      case LessonStatus.LOCKED:
        return "bg-slate-200 border-slate-300 cursor-not-allowed";
      case LessonStatus.ACTIVE:
      default:
        return `${c.bg} ${c.border}`;
    }
  };

  const isActive = lesson.status === LessonStatus.ACTIVE;
  const isLocked = lesson.status === LessonStatus.LOCKED;
  const isCompleted = lesson.status === LessonStatus.COMPLETED;

  const nodeSize = 70;
  
  // Calculate horizontal translation based on offset
  const style = { transform: `translateX(${positionOffset}px)` };

  return (
    <div className="relative flex justify-center py-4" style={style}>
        {/* Connector Line would ideally be handled by parent, but for simple visualization we rely on vertical stacking */}
        
        {/* Tooltip on Hover */}
        <div className="group relative">
             {/* Crown/Star floating above active */}
            {isActive && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-orange-500 font-bold px-3 py-1 rounded-xl border-2 border-slate-200 text-xs shadow-sm animate-bounce z-10">
                    COMEÇAR
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-slate-200 transform rotate-45"></div>
                </div>
            )}

            <button
                onClick={() => !isLocked && onClick(lesson)}
                disabled={isLocked}
                className={`
                    w-[70px] h-[70px] rounded-full border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all flex items-center justify-center relative z-0
                    ${getColorClasses(lesson.status, color)}
                `}
            >
                {isCompleted ? (
                    <Check size={32} className="text-white drop-shadow-md stroke-[4]" />
                ) : isLocked ? (
                    <Lock size={24} className="text-slate-400" />
                ) : (
                    <span className="text-3xl text-white drop-shadow-md">{lesson.icon || '★'}</span>
                )}

                {/* Ring progress simulation for active */}
                {isActive && (
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-white/30 animate-pulse"></div>
                )}
            </button>
        </div>
    </div>
  );
};