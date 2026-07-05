import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { PrepositionQuiz } from '../components/prepositions/PrepositionQuiz';

export function PrepositionsPage() {
  const { selectedLanguage, setSelectedLanguage } = useApp();

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-[#3C3C3C]">Prepositions</h1>
        <p className="text-[#777777] font-semibold">
          Fill in the blank with the correct {selectedLanguage.name} preposition
        </p>
      </div>

      {/* Language tabs */}
      <div className="flex gap-2 justify-center flex-wrap">
        {LANGUAGES.map(lang => (
          <button
            key={lang.id}
            onClick={() => setSelectedLanguage(lang)}
            className={`px-5 py-2 rounded-xl font-bold text-sm border-2 border-b-4 transition-all active:border-b-0 active:translate-y-[2px] ${
              selectedLanguage.id === lang.id
                ? 'border-b-4 text-white'
                : 'bg-white border-[#E5E5E5] text-[#777777] hover:bg-[#F7F7F7]'
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
