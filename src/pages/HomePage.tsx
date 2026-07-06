import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LANGUAGES } from '../data/languages';
import { useApp } from '../context/AppContext';

export function HomePage() {
  const navigate = useNavigate();
  const { setSelectedLanguage } = useApp();

  function handleLanguagePick(lang: typeof LANGUAGES[0]) {
    setSelectedLanguage(lang);
    navigate('/learn');
  }

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Hero */}
      <section className="text-center pt-8 flex flex-col items-center gap-6">
        <h1 className="font-serif text-6xl font-semibold text-[#1B1A17] tracking-tight">
          Learn 4 languages.<br />
          <span className="text-[#D97757]">One app.</span>
        </h1>
        <p className="text-xl text-[#6B6860] max-w-md">
          Spaced flashcards, article checks, and synonym lookups — all designed to keep you coming back.
        </p>
        <div className="flex gap-4">
          <Button size="lg" onClick={() => navigate('/dashboard')}>
            Get Started — it's free
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/flashcards')}>
            Browse Flashcards
          </Button>
        </div>
      </section>

      {/* Language picker */}
      <section className="w-full">
        <h2 className="font-serif text-2xl font-semibold text-[#1B1A17] mb-6 text-center">Choose your language</h2>
        <div className="grid grid-cols-4 gap-4">
          {LANGUAGES.map(lang => (
            <Card
              key={lang.id}
              onClick={() => handleLanguagePick(lang)}
              accent={lang.color}
              className="flex flex-col items-center gap-2 p-6 text-center"
            >
              <span className="text-4xl">{lang.flag}</span>
              <span className="font-semibold text-[#1B1A17]">{lang.name}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature highlights */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 pb-8">
        {[
          { emoji: '🃏', title: 'Smart Flashcards', desc: 'Spaced repetition keeps vocabulary fresh',    color: '#E4EAF0' },
          { emoji: '📝', title: 'Article Checker',  desc: 'Look up the correct article for any noun',    color: '#E5EBDF' },
          { emoji: '🔤', title: 'Synonyms',         desc: 'Expand your vocabulary with related words',   color: '#EAE3EC' },
        ].map(f => (
          <Card key={f.title} accent={f.color} tinted className="flex flex-col gap-3 p-6">
            <span className="text-3xl">{f.emoji}</span>
            <h3 className="font-serif text-lg font-semibold text-[#1B1A17]">{f.title}</h3>
            <p className="text-[#6B6860] text-sm">{f.desc}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
