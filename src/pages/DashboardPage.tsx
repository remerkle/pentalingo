import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';

export function DashboardPage() {
  const navigate = useNavigate();
  const { progress, setSelectedLanguage } = useApp();

  function handleLanguagePick(lang: typeof LANGUAGES[0]) {
    setSelectedLanguage(lang);
    navigate('/learn');
  }

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
          <span className="text-4xl">🎯</span>
          <span className="font-serif text-4xl font-semibold text-[#5F7256]">{progress.todayXp}</span>
          <span className="text-sm font-semibold text-[#6B6860]">Daily XP</span>
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
      <div>
        <h2 className="font-serif text-lg font-semibold text-[#1B1A17] mb-3">Continue Learning</h2>
        <div className="grid grid-cols-4 gap-3">
          {LANGUAGES.map(lang => (
            <Card
              key={lang.id}
              onClick={() => handleLanguagePick(lang)}
              accent={lang.color}
              className="flex flex-col items-center gap-2 p-4 text-center"
            >
              <span className="text-3xl">{lang.flag}</span>
              <span className="font-semibold text-sm text-[#1B1A17]">{lang.name}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
