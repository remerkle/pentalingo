import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserProgress, Language } from '../types';
import { LANGUAGES } from '../data/languages';

type AppContextType = {
  progress: UserProgress;
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  addXp: (amount: number) => void;
};

const defaultProgress: UserProgress = {
  streak: 7,
  xp: 340,
  level: 3,
  dailyGoal: 50,
  todayXp: 20,
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);

  function addXp(amount: number) {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + amount,
      todayXp: prev.todayXp + amount,
    }));
  }

  return (
    <AppContext.Provider value={{ progress, selectedLanguage, setSelectedLanguage, addXp }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
