import React from 'react';
import { Home, Trophy, Target, User, Hexagon } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Aprender', active: true },
    { icon: Target, label: 'Missões', active: false },
    { icon: Trophy, label: 'Ranking', active: false },
    { icon: User, label: 'Perfil', active: false },
  ];

  return (
    <div className="hidden md:flex flex-col w-[256px] border-r-2 border-slate-200 p-4 h-screen fixed left-0 top-0 bg-white z-10">
      <div className="mb-8 px-4">
        <h1 className="text-[#58cc02] text-3xl font-extrabold tracking-tighter flex items-center gap-2">
           MetaQuest
        </h1>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl w-full text-sm font-bold tracking-widest uppercase transition-colors
              ${item.active 
                ? 'bg-blue-50 text-blue-500 border-2 border-blue-200' 
                : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <item.icon size={24} className={item.active ? "fill-current" : ""} />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};