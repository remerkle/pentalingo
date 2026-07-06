import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { LANGUAGES, FLASHCARDS } from '../data/languages';

export function DashboardPage() {
  const navigate = useNavigate();
  const { progress, selectedLanguage } = useApp();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-3xl font-semibold text-[#1B1A17]">Your Dashboard</h1>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="flex flex-col items-center gap-2 p-6">
          <span className="text-4xl">🔥</span>
          <span className="font-serif text-4xl font-semibold text-[#D3A15C]">{progress.streak}</span>
          <span className="text-sm font-semibold text-[#6B6860]">Day streak</span>
        </Card>
        <Card className="flex flex-col items-center gap-2 p-6">
          <span className="text-4xl">⚡</span>
          <span className="font-serif text-4xl font-semibold text-[#D97757]">{progress.xp}</span>
          <span className="text-sm font-semibold text-[#6B6860]">Total XP</span>
        </Card>
        <Card className="flex flex-col items-center gap-2 p-6">
          <span className="text-4xl">🏆</span>
          <span className="font-serif text-4xl font-semibold text-[#9B8AA8]">Lv {progress.level}</span>
          <span className="text-sm font-semibold text-[#6B6860]">Level</span>
        </Card>
      </div>

      {/* Daily goal */}
      <Card className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-[#1B1A17]">Daily Goal</h2>
          <Badge color="green">{progress.todayXp} / {progress.dailyGoal} XP</Badge>
        </div>
        <ProgressBar value={progress.todayXp} max={progress.dailyGoal} showLabel />
        {progress.todayXp >= progress.dailyGoal && (
          <p className="text-sm font-semibold text-[#5F7256]">🎉 Goal complete! Keep going!</p>
        )}
      </Card>

      {/* Continue learning */}
      <Card className="p-6 flex items-center justify-between gap-4" accent={selectedLanguage.color}>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-[#6B6860] uppercase tracking-wide">Keep practicing</p>
          <h2 className="font-serif text-xl font-semibold text-[#1B1A17]">{selectedLanguage.name} Flashcards</h2>
          <p className="text-sm text-[#6B6860]">Review vocabulary with spaced repetition</p>
        </div>
        <Button onClick={() => navigate('/flashcards')}>Continue →</Button>
      </Card>

      {/* Languages overview */}
      <div>
        <h2 className="font-serif text-xl font-semibold text-[#1B1A17] mb-4">Your Languages</h2>
        <div className="grid grid-cols-4 gap-3">
          {LANGUAGES.map(lang => {
            const cardCount = FLASHCARDS.filter(f => f.languageId === lang.id).length;
            return (
              <Card key={lang.id} accent={lang.color} className="flex flex-col items-center gap-3 p-4">
                <span className="text-3xl">{lang.flag}</span>
                <span className="font-semibold text-sm text-[#1B1A17]">{lang.name}</span>
                <span className="text-xs text-[#6B6860]">{cardCount} flashcards</span>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
