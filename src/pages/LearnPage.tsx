import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { useApp } from '../context/AppContext';

const SECTIONS = [
  { to: '/dashboard',    emoji: '📊', title: 'Dashboard',    desc: 'Streak, XP, and daily goal' },
  { to: '/flashcards',   emoji: '🃏', title: 'Flashcards',   desc: 'Spaced-repetition vocabulary' },
  { to: '/articles',     emoji: '📝', title: 'Articles',     desc: 'Look up or quiz noun articles' },
  { to: '/synonyms',     emoji: '🔤', title: 'Synonyms',     desc: 'Find related words' },
  { to: '/verbs',        emoji: '📋', title: 'Verbs',        desc: 'Browse tense conjugations' },
  { to: '/prepositions', emoji: '🧩', title: 'Prepositions', desc: 'Fill-in-the-blank quiz' },
];

export function LearnPage() {
  const navigate = useNavigate();
  const { selectedLanguage } = useApp();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center flex flex-col items-center gap-2">
        <span className="text-5xl">{selectedLanguage.flag}</span>
        <h1 className="font-serif text-3xl font-semibold text-[#1B1A17]">{selectedLanguage.name}</h1>
        <p className="text-[#6B6860]">Pick where you'd like to start</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {SECTIONS.map(section => (
          <Card
            key={section.to}
            onClick={() => navigate(section.to)}
            accent={selectedLanguage.color}
            className="flex flex-col items-center gap-2 p-6 text-center"
          >
            <span className="text-3xl">{section.emoji}</span>
            <span className="font-serif font-semibold text-[#1B1A17]">{section.title}</span>
            <span className="text-xs text-[#6B6860]">{section.desc}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
