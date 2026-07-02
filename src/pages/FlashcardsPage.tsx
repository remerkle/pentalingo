import { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getFlashcardPool, LANGUAGES } from '../data/languages';
import { lookupWiktionaryTranslation } from '../utils/wiktionaryTranslation';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import type { Flashcard } from '../types';

const SESSION_SIZE = 5;

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'found'; translation: string }
  | { status: 'not-found' };

export function FlashcardsPage() {
  const { selectedLanguage, setSelectedLanguage, addXp } = useApp();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());
  const [ratedIds, setRatedIds] = useState<Set<string>>(new Set());

  const [addQuery, setAddQuery] = useState('');
  const [lookupState, setLookupState] = useState<LookupState>({ status: 'idle' });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pool = useMemo(() => getFlashcardPool(selectedLanguage.id), [selectedLanguage.id]);

  function startSession() {
    setCards(shuffle(pool).slice(0, SESSION_SIZE));
    setFlippedIds(new Set());
    setRatedIds(new Set());
  }

  useEffect(() => {
    startSession();
    setAddQuery('');
    setLookupState({ status: 'idle' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage.id]);

  const trimmedAddQuery = addQuery.trim().toLowerCase();
  const alreadyInSession = trimmedAddQuery
    ? cards.some(c => c.front.toLowerCase() === trimmedAddQuery)
    : false;

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!trimmedAddQuery || alreadyInSession) {
      setLookupState({ status: 'idle' });
      return;
    }

    setLookupState({ status: 'loading' });
    timerRef.current = setTimeout(async () => {
      const translation = await lookupWiktionaryTranslation(trimmedAddQuery, selectedLanguage.id);
      setLookupState(translation ? { status: 'found', translation } : { status: 'not-found' });
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [trimmedAddQuery, alreadyInSession, selectedLanguage.id]);

  function handleAddToSession() {
    if (lookupState.status !== 'found') return;
    const newCard: Flashcard = {
      id: `fc-custom-${Date.now()}`,
      languageId: selectedLanguage.id,
      front: addQuery.trim(),
      back: lookupState.translation,
      nextReviewDate: '',
      interval: 1,
      easeFactor: 2.5,
    };
    setCards(prev => [...prev, newCard]);
    setAddQuery('');
    setLookupState({ status: 'idle' });
  }

  function toggleFlip(id: string) {
    setFlippedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

    if (!ratedIds.has(id)) {
      addXp(5);
      setRatedIds(prev => new Set(prev).add(id));
    }
  }

  const allRated = cards.length > 0 && cards.every(c => ratedIds.has(c.id));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-[#3C3C3C]">Flashcards</h1>
        <div className="flex gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang)}
              style={selectedLanguage.id === lang.id ? { backgroundColor: lang.color, color: 'white' } : {}}
              className={`px-3 py-1.5 rounded-xl font-bold text-sm border-2 transition-colors ${
                selectedLanguage.id === lang.id ? 'border-transparent' : 'border-[#E5E5E5] text-[#777777] hover:bg-[#F7F7F7]'
              }`}
            >
              {lang.flag}
            </button>
          ))}
        </div>
      </div>

      {cards.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-2xl mb-2">🃏</p>
          <p className="font-bold text-[#777777]">No flashcards yet for {selectedLanguage.name}.</p>
        </Card>
      ) : (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between text-sm font-bold text-[#777777]">
            <span>{ratedIds.size} of {cards.length} reviewed</span>
            <Badge color="purple">🃏 {selectedLanguage.name} · {pool.length} words available</Badge>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map(c => {
              const flipped = flippedIds.has(c.id);
              const rated = ratedIds.has(c.id);
              return (
                <Card
                  key={c.id}
                  onClick={() => toggleFlip(c.id)}
                  accent={rated ? '#46A302' : '#CE82FF'}
                  className="min-h-40 flex flex-col items-center justify-center gap-3 cursor-pointer select-none p-6"
                >
                  <p className="text-xs font-bold text-[#777777] uppercase tracking-widest">
                    {flipped ? 'Translation' : 'Tap to reveal'}
                  </p>
                  <p className="text-2xl font-black text-[#3C3C3C] text-center">
                    {flipped ? c.back : c.front}
                  </p>

                  {rated && <Badge color="green">Reviewed</Badge>}
                </Card>
              );
            })}
          </div>

          {allRated && (
            <Card className="p-8 text-center flex flex-col items-center gap-3">
              <span className="text-4xl">🎉</span>
              <p className="font-black text-[#3C3C3C]">All caught up!</p>
              <Button onClick={startSession}>New words</Button>
            </Card>
          )}
        </>
      )}

      {/* Add a word — falls back to Wiktionary for anything beyond the curated deck */}
      <Card className="p-5 flex flex-col gap-3">
        <h2 className="font-black text-[#3C3C3C]">Add a word to this session</h2>
        <input
          type="text"
          value={addQuery}
          onChange={e => setAddQuery(e.target.value)}
          placeholder={`Type a ${selectedLanguage.name} word…`}
          className="w-full px-4 py-3 font-bold rounded-xl border-2 border-b-4 border-[#E5E5E5] outline-none focus:border-[#CE82FF] transition-colors placeholder:text-[#C0C0C0] text-[#3C3C3C]"
          spellCheck={false}
        />

        {trimmedAddQuery && alreadyInSession && (
          <p className="text-sm font-bold text-[#777777]">Already in this session.</p>
        )}

        {!alreadyInSession && lookupState.status === 'loading' && (
          <p className="text-sm font-bold text-[#777777] animate-pulse">Looking up "{addQuery.trim()}"…</p>
        )}

        {!alreadyInSession && lookupState.status === 'found' && (
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border-2 border-b-4" style={{ borderColor: '#CE82FF', backgroundColor: '#F5F0FF' }}>
            <div>
              <p className="font-black text-[#3C3C3C]">{addQuery.trim()}</p>
              <p className="text-sm text-[#777777]">{lookupState.translation}</p>
            </div>
            <Button size="sm" onClick={handleAddToSession}>Add</Button>
          </div>
        )}

        {!alreadyInSession && lookupState.status === 'not-found' && (
          <p className="text-sm font-bold text-[#777777]">Not found in Wiktionary — check the spelling?</p>
        )}

        <p className="text-xs text-[#AAAAAA]">via Wiktionary · added words apply to this session only</p>
      </Card>
    </div>
  );
}
