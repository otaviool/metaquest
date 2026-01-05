import React from 'react';
import { UserStats, DailyChallenge } from '../types';
import { Flame, Gem, Heart, Trophy, CheckCircle } from 'lucide-react';

interface StatsPanelProps {
  stats: UserStats;
  challenges?: DailyChallenge[];
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats, challenges = [] }) => {
  return (
    <div className="hidden lg:flex flex-col w-[350px] p-6 h-screen fixed right-0 top-0 z-10 overflow-y-auto">
      {/* Top Stats Bar */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 group cursor-pointer">
          <img src="https://flagcdn.com/w40/br.png" alt="Brazil" className="rounded-md border-2 border-slate-200" />
        </div>
        <div className="flex items-center gap-2 text-orange-500 font-bold hover:bg-slate-100 p-2 rounded-xl cursor-pointer">
          <Flame size={24} className="fill-orange-500" />
          <span>{stats.streak}</span>
        </div>
        <div className="flex items-center gap-2 text-blue-400 font-bold hover:bg-slate-100 p-2 rounded-xl cursor-pointer">
          <Gem size={24} className="fill-blue-400" />
          <span>{stats.gems}</span>
        </div>
        <div className="flex items-center gap-2 text-red-500 font-bold hover:bg-slate-100 p-2 rounded-xl cursor-pointer">
          <Heart size={24} className="fill-red-500" />
          <span>{stats.hearts}</span>
        </div>
      </div>

      {/* Level Section */}
      <div className="border-2 border-slate-200 rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-slate-700 text-lg">Nível {stats.level}</h3>
            <span className="text-sm font-bold text-[#58cc02]">{stats.xp} / {stats.xpToNextLevel} XP</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-4 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full w-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
            <div 
                className="bg-[#58cc02] h-4 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min((stats.xp / stats.xpToNextLevel) * 100, 100)}%` }}
            >
                 <div className="h-full w-full bg-white/20 animate-pulse"></div>
            </div>
        </div>
        <p className="text-xs text-slate-400 mt-2 font-bold text-center uppercase tracking-wider">
            Próximo nível em {stats.xpToNextLevel - stats.xp} XP
        </p>
      </div>

      {/* Daily Challenges Section */}
      <div className="border-2 border-slate-200 rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700 text-lg">Desafios do Dia</h3>
            <a href="#" className="text-blue-400 font-bold text-sm hover:text-blue-500 uppercase">Ver tudo</a>
        </div>
        
        <div className="space-y-4">
            {challenges.map((challenge) => (
                <div key={challenge.id} className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2 ${challenge.completed ? 'bg-green-100 border-green-500' : 'bg-slate-100 border-slate-200'}`}>
                        {challenge.completed ? <CheckCircle className="text-green-600" /> : challenge.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between mb-1">
                            <p className={`font-bold text-sm ${challenge.completed ? 'text-green-600' : 'text-slate-700'}`}>
                                {challenge.description}
                            </p>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                            <div 
                                className={`h-3 rounded-full transition-all duration-500 ${challenge.completed ? 'bg-green-500' : 'bg-orange-500'}`}
                                style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                    {challenge.completed ? (
                         <div className="text-xs font-bold text-green-600">FEITO</div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-slate-400">{challenge.progress}/{challenge.target}</span>
                            <span className="text-[10px] font-bold text-blue-400">+{challenge.reward} 💎</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* League Section */}
      <div className="border-2 border-slate-200 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700 text-lg">Divisão {stats.league}</h3>
            <Trophy size={20} className="text-yellow-500" />
        </div>
        <ul className="space-y-4">
            <li className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">1</div>
                <div className="w-10 h-10 rounded-full bg-slate-300">
                     <img src="https://picsum.photos/40/40?random=1" className="rounded-full w-full h-full" alt="User" />
                </div>
                <div className="flex-1">
                    <p className="font-bold text-slate-700 text-sm">Campeão</p>
                    <p className="text-xs text-slate-400">2500 XP</p>
                </div>
            </li>
            <li className="flex items-center gap-3 bg-slate-100 p-2 rounded-xl -mx-2 border border-slate-200">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xs">{stats.level}</div>
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center border-2 border-white shadow-sm">
                    <span className="text-white font-bold text-xs">VC</span>
                </div>
                <div className="flex-1">
                    <p className="font-bold text-slate-700 text-sm">Você</p>
                    <p className="text-xs text-slate-500 font-bold">{stats.xp} XP (Total)</p>
                </div>
            </li>
        </ul>
      </div>
    </div>
  );
};