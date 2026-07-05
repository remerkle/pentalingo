import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NOUN_ARTICLES } from '../../data/nounArticles';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import type { NounArticle } from '../../types';

const QUIZ_SIZE = 10;
const XP_PER_CORRECT = 5;

// The set of articles a learner picks between, per language — order matches how they're conventionally taught.
export const QUIZ_ARTICLES: Record<string, string[]> = {
  nl: ['de', 'het'],
  es: ['el', 'la'],
  en: ['a', 'an'],
  de: ['der', 'die', 'das'],
};

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function ArticleQuiz() {
  const { selectedLanguage, addXp } = useApp();
  const [questions, setQuestions] = useState<NounArticle[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const choices = QUIZ_ARTICLES[selectedLanguage.id] ?? [];

  function startQuiz() {
    const pool = NOUN_ARTICLES.filter(n => n.languageId === selectedLanguage.id);
    setQuestions(shuffle(pool).slice(0, QUIZ_SIZE));
    setIndex(0);
    setSelected(null);
    setScore(0);
  }

  useEffect(startQuiz, [selectedLanguage.id]);

  const current = questions[index];
  const finished = questions.length > 0 && index >= questions.length;

  function handleAnswer(choice: string) {
    if (selected) return;
    setSelected(choice);
    if (choice === current.article) {
      setScore(s => s + 1);
      addXp(XP_PER_CORRECT);
    }
  }

  function handleNext() {
    setSelected(null);
    setIndex(i => i + 1);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <Card className="max-w-md mx-auto p-8 text-center space-y-4">
        <span className="text-4xl">{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}</span>
        <h2 className="text-2xl font-black text-[#3C3C3C]">Quiz complete!</h2>
        <p className="text-lg font-bold text-[#777777]">
          You got <span className="text-[#58CC02]">{score}</span> / {questions.length} correct
        </p>
        <Badge color={pct >= 80 ? 'green' : pct >= 50 ? 'orange' : 'red'}>{pct}%</Badge>
        <Button onClick={startQuiz} fullWidth>Play again</Button>
      </Card>
    );
  }

  if (!current) return null;

  const gridCols = choices.length >= 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between text-sm font-bold text-[#777777]">
        <span>Question {index + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <ProgressBar value={index} max={questions.length} color="#1CB0F6" />

      <Card className="p-8 text-center space-y-6">
        <p className="text-xs font-bold text-[#777777] uppercase tracking-widest">Which article?</p>
        <p className="text-4xl font-black text-[#3C3C3C]">{current.noun}</p>

        <div className={`grid ${gridCols} gap-3`}>
          {choices.map(choice => {
            const isCorrect = choice === current.article;
            const isSelected = selected === choice;
            let style = 'bg-white border-[#E5E5E5] text-[#3C3C3C] hover:bg-[#F7F7F7]';
            if (selected) {
              if (isCorrect) style = 'bg-[#D7F5B1] border-[#46A302] text-[#46A302]';
              else if (isSelected) style = 'bg-[#FFD4D4] border-[#FF4B4B] text-[#FF4B4B]';
              else style = 'bg-white border-[#E5E5E5] text-[#C0C0C0]';
            }
            return (
              <button
                key={choice}
                onClick={() => handleAnswer(choice)}
                disabled={!!selected}
                className={`py-6 text-2xl font-black rounded-2xl border-2 border-b-4 transition-all active:border-b-0 active:translate-y-[2px] disabled:active:translate-y-0 disabled:active:border-b-4 ${style}`}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {selected && (
          <p className="text-[#777777] font-semibold">
            <span className="font-black text-[#3C3C3C]">{current.article} {current.noun}</span> — {current.translation}
          </p>
        )}
      </Card>

      {selected && (
        <Button onClick={handleNext} fullWidth>
          {index + 1 === questions.length ? 'See results' : 'Next question'}
        </Button>
      )}
    </div>
  );
}
