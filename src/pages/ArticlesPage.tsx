import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { NOUN_ARTICLES } from '../data/nounArticles';
import { lookupDutchArticle } from '../utils/dutchGender';
import { ArticleQuiz, QUIZ_ARTICLES } from '../components/articles/ArticleQuiz';

const GENDER_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  masculine:  { bg: '#EFF8FF', text: '#1CB0F6', label: 'masculine' },
  feminine:   { bg: '#FFF0F0', text: '#FF4B4B', label: 'feminine' },
  neuter:     { bg: '#F5F0FF', text: '#CE82FF', label: 'neuter' },
  common:     { bg: '#EFF8FF', text: '#1CB0F6', label: 'common' },
  indefinite: { bg: '#F0FBE8', text: '#46A302', label: '' },
};

type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'found'; article: 'de' | 'het' }
  | { status: 'not-found' };

type Mode = 'lookup' | 'quiz';

export function ArticlesPage() {
  const { selectedLanguage, setSelectedLanguage } = useApp();
  const [query, setQuery] = useState('');
  const [lookupState, setLookupState] = useState<LookupState>({ status: 'idle' });
  const [mode, setMode] = useState<Mode>('lookup');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const langNouns = NOUN_ARTICLES.filter(n => n.languageId === selectedLanguage.id);
  const trimmed = query.trim().toLowerCase();
  const match = trimmed ? langNouns.find(n => n.noun.toLowerCase() === trimmed) : null;
  const suggestions = trimmed && !match
    ? langNouns.filter(n => n.noun.toLowerCase().startsWith(trimmed)).slice(0, 5)
    : [];
  const isDutch = selectedLanguage.id === 'nl';

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!trimmed || match || !isDutch) {
      setLookupState({ status: 'idle' });
      return;
    }

    setLookupState({ status: 'loading' });
    timerRef.current = setTimeout(async () => {
      const article = await lookupDutchArticle(trimmed);
      setLookupState(article ? { status: 'found', article } : { status: 'not-found' });
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [trimmed, match, isDutch]);

  const curatedColors = match ? GENDER_COLORS[match.gender] : null;
  const wiktColors =
    lookupState.status === 'found'
      ? GENDER_COLORS[lookupState.article === 'de' ? 'common' : 'neuter']
      : null;
  const isEnglish = selectedLanguage.id === 'en';

  const showNotFound =
    trimmed &&
    !match &&
    suggestions.length === 0 &&
    (lookupState.status === 'not-found' || (!isDutch && lookupState.status === 'idle'));

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-[#3C3C3C]">Article Checker</h1>
        <p className="text-[#777777] font-semibold">
          {isEnglish
            ? 'Type a noun to find out whether to use "a" or "an"'
            : `Type a noun to find the correct article in ${selectedLanguage.name}`}
        </p>
      </div>

      {/* Language tabs */}
      <div className="flex gap-2 justify-center flex-wrap">
        {LANGUAGES.map(lang => (
          <button
            key={lang.id}
            onClick={() => { setSelectedLanguage(lang); setQuery(''); }}
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

      {/* Mode toggle */}
      <div className="flex gap-2 justify-center">
        {(['lookup', 'quiz'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setQuery(''); }}
            className={`px-5 py-2 rounded-xl font-bold text-sm border-2 border-b-4 transition-all active:border-b-0 active:translate-y-[2px] ${
              mode === m
                ? 'bg-[#1CB0F6] border-[#1CB0F6] text-white'
                : 'bg-white border-[#E5E5E5] text-[#777777] hover:bg-[#F7F7F7]'
            }`}
          >
            {m === 'lookup' ? 'Look up' : `📝 ${QUIZ_ARTICLES[selectedLanguage.id]?.join('/')} Quiz`}
          </button>
        ))}
      </div>

      {mode === 'quiz' ? (
        <ArticleQuiz />
      ) : (
      <>
      {/* Input */}
      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={`Type a ${selectedLanguage.name} noun…`}
          className="w-full px-5 py-4 text-xl font-bold rounded-2xl border-2 border-b-4 border-[#E5E5E5] outline-none focus:border-[#1CB0F6] transition-colors placeholder:text-[#C0C0C0] text-[#3C3C3C]"
          autoFocus
          spellCheck={false}
        />
      </div>

      {/* Curated match (has translation) */}
      {match && curatedColors && (
        <div
          className="max-w-md mx-auto rounded-2xl border-2 border-b-4 p-8 text-center space-y-3 transition-all"
          style={{ borderColor: curatedColors.text, backgroundColor: curatedColors.bg }}
        >
          <div className="text-6xl font-black tracking-tight">
            <span style={{ color: curatedColors.text }}>{match.article}</span>
            <span className="text-[#3C3C3C]"> {match.noun}</span>
          </div>
          <p className="text-[#777777] font-semibold text-lg">{match.translation}</p>
          {curatedColors.label && (
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-bold"
              style={{ backgroundColor: curatedColors.text + '22', color: curatedColors.text }}
            >
              {curatedColors.label}
            </span>
          )}
          {isEnglish && (
            <p className="text-sm text-[#777777]">
              Use <strong>"{match.article}"</strong> because "{match.noun}"{' '}
              {match.article === 'an' ? 'starts with a vowel sound' : 'starts with a consonant sound'}
            </p>
          )}
          {selectedLanguage.id === 'es' && match.noun === 'agua' && (
            <p className="text-sm text-[#777777]">
              Note: "agua" is feminine but uses "el" in singular to avoid the double-a sound
            </p>
          )}
        </div>
      )}

      {/* Wiktionary lookup — loading */}
      {!match && isDutch && lookupState.status === 'loading' && (
        <div className="max-w-md mx-auto rounded-2xl border-2 border-b-4 border-[#E5E5E5] p-6 text-center">
          <p className="font-bold text-[#777777] animate-pulse">Looking up "{query.trim()}"…</p>
        </div>
      )}

      {/* Wiktionary lookup — found */}
      {!match && isDutch && lookupState.status === 'found' && wiktColors && (
        <div
          className="max-w-md mx-auto rounded-2xl border-2 border-b-4 p-8 text-center space-y-3 transition-all"
          style={{ borderColor: wiktColors.text, backgroundColor: wiktColors.bg }}
        >
          <div className="text-6xl font-black tracking-tight">
            <span style={{ color: wiktColors.text }}>{lookupState.article}</span>
            <span className="text-[#3C3C3C]"> {query.trim()}</span>
          </div>
          {wiktColors.label && (
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-bold"
              style={{ backgroundColor: wiktColors.text + '22', color: wiktColors.text }}
            >
              {wiktColors.label}
            </span>
          )}
          <p className="text-xs text-[#AAAAAA]">via Wiktionary · no translation in our dictionary</p>
        </div>
      )}

      {/* Not found */}
      {showNotFound && (
        <div className="max-w-md mx-auto rounded-2xl border-2 border-b-4 border-[#E5E5E5] p-6 text-center space-y-2">
          <p className="text-2xl">🤔</p>
          <p className="font-bold text-[#3C3C3C]">Noun not found</p>
          <p className="text-sm text-[#777777]">
            {isDutch
              ? 'Not found in Wiktionary — check the spelling?'
              : 'Not in our dictionary yet — try one of the nouns below'}
          </p>
        </div>
      )}

      {/* Prefix suggestions */}
      {suggestions.length > 0 && (
        <div className="max-w-md mx-auto space-y-2">
          {suggestions.map(s => {
            const c = GENDER_COLORS[s.gender];
            return (
              <button
                key={s.id}
                onClick={() => setQuery(s.noun)}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl border-2 border-b-4 border-[#E5E5E5] bg-white hover:bg-[#F7F7F7] transition-colors text-left"
              >
                <span className="font-bold text-[#3C3C3C]">
                  <span style={{ color: c.text }}>{s.article}</span> {s.noun}
                </span>
                <span className="text-sm text-[#777777]">{s.translation}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Browse all */}
      {!trimmed && (
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-lg font-black text-[#3C3C3C] text-center">All nouns in our dictionary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {langNouns.map(n => {
              const c = GENDER_COLORS[n.gender];
              return (
                <button
                  key={n.id}
                  onClick={() => setQuery(n.noun)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border-2 border-b-4 border-[#E5E5E5] bg-white hover:bg-[#F7F7F7] transition-colors text-left"
                >
                  <span className="font-bold text-[#3C3C3C]">
                    <span style={{ color: c.text }}>{n.article}</span> {n.noun}
                  </span>
                  <span className="text-sm text-[#777777]">{n.translation}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}
