import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatsPanel } from './components/StatsPanel';
import { PathNode } from './components/PathNode';
import { UnitHeader } from './components/UnitHeader';
import { Onboarding } from './components/Onboarding';
import { LessonModal } from './components/LessonModal';
import { AppState, Unit, Lesson, LessonStatus, DailyChallenge } from './types';
import { generateStudyPlan, getMotivations } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    hasOnboarded: false,
    userGoal: '',
    units: [],
    stats: {
      xp: 0,
      level: 1,
      xpToNextLevel: 100,
      streak: 0,
      gems: 500,
      hearts: 5,
      league: 'Bronze',
    },
    dailyChallenges: [
      { id: '1', description: 'Ganhe 50 XP', type: 'XP', target: 50, progress: 0, reward: 20, completed: false, icon: '⚡' },
      { id: '2', description: 'Complete 2 lições', type: 'LESSON_COUNT', target: 2, progress: 0, reward: 10, completed: false, icon: '📚' },
      { id: '3', description: 'Ganhe 100 XP', type: 'XP', target: 100, progress: 0, reward: 50, completed: false, icon: '🎯' },
    ],
    isLoading: false,
  });

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  
  // Handle goal submission
  const handleSetGoal = async (goal: string) => {
    setState(prev => ({ ...prev, isLoading: true, userGoal: goal }));
    try {
      const plan = await generateStudyPlan(goal);
      setState(prev => ({
        ...prev,
        hasOnboarded: true,
        units: plan,
        isLoading: false
      }));
    } catch (error) {
      alert("Não foi possível gerar o plano. Tente novamente.");
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Handle opening a lesson
  const handleLessonOpen = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  // Handle completing a lesson
  const handleLessonComplete = async () => {
    if (!activeLesson) return;

    // Fetch motivation text (async, fire and forget)
    getMotivations().then(msg => console.log(msg));

    const xpGained = activeLesson.xp;
    
    // Update State
    setState(prev => {
      // 1. Calculate XP and Level Logic
      let newXp = prev.stats.xp + xpGained;
      let newLevel = prev.stats.level;
      let newXpToNext = prev.stats.xpToNextLevel;
      let newGems = prev.stats.gems;

      // Simple level up formula: Level * 100 XP needed
      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel += 1;
        newXpToNext = newLevel * 100; // Increase difficulty
        newGems += 50; // Level up reward
        // Optional: Trigger level up modal here
      }

      const newStats = {
        ...prev.stats,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: newXpToNext,
        gems: newGems,
        streak: prev.stats.streak === 0 ? 1 : prev.stats.streak 
      };

      // 2. Update Daily Challenges
      const newChallenges = prev.dailyChallenges.map(challenge => {
        if (challenge.completed) return challenge;

        let newProgress = challenge.progress;
        if (challenge.type === 'XP') {
            newProgress += xpGained;
        } else if (challenge.type === 'LESSON_COUNT') {
            newProgress += 1;
        }

        const isCompletedNow = newProgress >= challenge.target;
        if (isCompletedNow) {
            newStats.gems += challenge.reward; // Grant challenge reward
        }

        return {
            ...challenge,
            progress: Math.min(newProgress, challenge.target),
            completed: isCompletedNow
        };
      });

      // 3. Update Unit/Lesson Progress
      const newUnits = prev.units.map(unit => {
        const lessonIndex = unit.lessons.findIndex(l => l.id === activeLesson.id);
        if (lessonIndex === -1) return unit;

        const newLessons = [...unit.lessons];
        newLessons[lessonIndex] = { ...newLessons[lessonIndex], status: LessonStatus.COMPLETED };

        // Unlock next lesson if exists in this unit
        if (lessonIndex + 1 < newLessons.length) {
           newLessons[lessonIndex + 1] = { ...newLessons[lessonIndex + 1], status: LessonStatus.ACTIVE };
        } 
        
        return { ...unit, lessons: newLessons };
      });
      
      return {
        ...prev,
        stats: newStats,
        dailyChallenges: newChallenges,
        units: newUnits
      };
    });

    setActiveLesson(null);
  };

  if (!state.hasOnboarded) {
    return <Onboarding onSetGoal={handleSetGoal} isLoading={state.isLoading} />;
  }

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="w-full md:pl-[256px] lg:pr-[350px] max-w-[1000px] min-h-screen pt-8 pb-20">
        <div className="max-w-[580px] mx-auto px-4">
            
            {/* Header Mobile */}
            <div className="md:hidden flex justify-between items-center mb-6 p-4 border-b-2 border-slate-100 sticky top-0 bg-white z-20">
               <span className="font-extrabold text-[#58cc02] text-xl">MetaQuest</span>
               <div className="flex gap-4 font-bold text-slate-500">
                  <span className="flex items-center gap-1 text-orange-500">🔥 {state.stats.streak}</span>
                  <span className="flex items-center gap-1 text-blue-400">💎 {state.stats.gems}</span>
               </div>
            </div>

            {state.units.map((unit, uIndex) => (
                <div key={unit.id} className="mb-12">
                    <UnitHeader unit={unit} colorName={unit.color} />
                    <div className="flex flex-col items-center gap-4">
                        {unit.lessons.map((lesson, lIndex) => {
                            const offsetPattern = [0, -50, 0, 50];
                            const offset = offsetPattern[lIndex % 4];
                            
                            return (
                                <PathNode 
                                    key={lesson.id} 
                                    lesson={lesson} 
                                    color={unit.color}
                                    onClick={handleLessonOpen}
                                    positionOffset={offset}
                                />
                            );
                        })}
                    </div>
                </div>
            ))}
            
             {/* End of Path Placeholder */}
            <div className="flex flex-col items-center justify-center p-8 text-slate-400 mb-10">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-4xl grayscale opacity-50">
                    🏆
                </div>
                <p className="font-bold">Mais metas em breve!</p>
            </div>
        </div>
      </div>

      <StatsPanel stats={state.stats} challenges={state.dailyChallenges} />

      {activeLesson && (
        <LessonModal 
          lesson={activeLesson} 
          onClose={() => setActiveLesson(null)} 
          onComplete={handleLessonComplete} 
        />
      )}
    </div>
  );
};

export default App;