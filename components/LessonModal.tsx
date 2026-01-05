import React, { useState } from 'react';
import { Lesson } from '../types';
import { Button } from './Button';
import { CheckCircle2, X } from 'lucide-react';

interface LessonModalProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({ lesson, onClose, onComplete }) => {
  const [step, setStep] = useState<'intro' | 'doing' | 'success'>('intro');

  const handleStart = () => setStep('doing');
  
  const handleFinish = () => {
    setStep('success');
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-2 border-slate-100">
           <div className="w-full bg-slate-200 h-4 rounded-full mr-4">
              <div 
                 className="bg-green-500 h-full rounded-full transition-all duration-500"
                 style={{ width: step === 'intro' ? '0%' : step === 'doing' ? '50%' : '100%' }}
              ></div>
           </div>
           <button onClick={onClose} className="text-slate-400 hover:bg-slate-100 p-2 rounded-full transition-colors">
             <X size={24} />
           </button>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
            {step === 'intro' && (
                <>
                    <div className="text-6xl mb-6">{lesson.icon || '🎯'}</div>
                    <h2 className="text-2xl font-bold text-slate-700 mb-2">{lesson.title}</h2>
                    <p className="text-slate-500 text-lg mb-8">{lesson.description}</p>
                    <Button onClick={handleStart} fullWidth className="text-lg">
                        COMEÇAR TAREFA
                    </Button>
                </>
            )}

            {step === 'doing' && (
                <>
                    <h2 className="text-xl font-bold text-slate-700 mb-6">Em progresso...</h2>
                    <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-2xl mb-8 w-full text-left">
                        <p className="text-blue-800 font-medium mb-2">Instruções:</p>
                        <p className="text-slate-600">Realize esta atividade agora. Quando terminar, marque como concluído para ganhar seus XP.</p>
                    </div>
                     <Button onClick={handleFinish} variant="success" fullWidth className="text-lg">
                        CONCLUIR TAREFA
                    </Button>
                </>
            )}

            {step === 'success' && (
                <div className="animate-[bounce_1s_infinite]">
                    <CheckCircle2 size={80} className="text-green-500 mb-6 mx-auto" />
                    <h2 className="text-3xl font-extrabold text-green-600 mb-2">Lição Concluída!</h2>
                    <p className="text-slate-500 text-xl font-bold mb-8">+{lesson.xp} XP</p>
                    <Button onClick={onComplete} fullWidth className="text-lg">
                        CONTINUAR
                    </Button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};