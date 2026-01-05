import React, { useState } from 'react';
import { Button } from './Button';
import { Target } from 'lucide-react';

interface OnboardingProps {
  onSetGoal: (goal: string) => void;
  isLoading: boolean;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onSetGoal, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSetGoal(input);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 max-w-md mx-auto text-center">
      <div className="mb-8 p-6 bg-slate-50 rounded-full">
         <Target size={64} className="text-[#58cc02]" />
      </div>
      
      <h1 className="text-3xl font-extrabold text-slate-700 mb-4">
        Qual é a sua próxima grande conquista?
      </h1>
      
      <p className="text-slate-500 text-lg mb-8">
        Digite seu objetivo e a nossa IA criará um plano de aprendizado personalizado para você.
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: Correr uma maratona, Aprender Python..."
          className="w-full p-4 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#58cc02] focus:bg-slate-50 text-slate-700 font-medium placeholder-slate-400"
          disabled={isLoading}
        />
        
        <Button 
            type="submit" 
            fullWidth 
            className="text-lg"
            disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                Criando Plano...
            </span>
          ) : 'CRIAR PLANO'}
        </Button>
      </form>
    </div>
  );
};