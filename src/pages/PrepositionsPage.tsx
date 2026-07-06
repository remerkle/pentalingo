import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { PrepositionQuiz } from '../components/prepositions/PrepositionQuiz';

export function PrepositionsPage() {
  const { selectedLanguage, setSelectedLanguage } = useApp();

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-4xl font-semibold text-[#1B1A17]">Prepositions</h1>
        <p className="text-[#6B6860] font-semibold">
          Fill in the blank with the correct {selectedLanguage.name} preposition
        </p>
      </div>

      {/* Language tabs */}
      <div className="flex gap-2 justify-center flex-wrap">
        {LANGUAGES.map(lang => (
          <button
            key={lang.id}
            onClick={() => setSelectedLanguage(lang)}
            className={`px-5 py-2 rounded-full font-semibold text-sm border transition-colors ${
              selectedLanguage.id === lang.id
                ? 'text-white'
                : 'bg-white border-[#E3DFD4] text-[#6B6860] hover:bg-[#F1EDE4]'
            }`}
            style={
              selectedLanguage.id === lang.id
                ? { backgroundColor: lang.color, borderColor: lang.color }
                : {}
            }
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>

      <PrepositionQuiz />
    </div>
  );
}
