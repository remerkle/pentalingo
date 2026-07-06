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
        <h2 className="font-serif text-2xl font-semibold text-[#1B1A17]">Quiz complete!</h2>
        <p className="text-lg font-semibold text-[#6B6860]">
          You got <span className="text-[#5F7256]">{score}</span> / {questions.length} correct
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
      <div className="flex items-center justify-between text-sm font-semibold text-[#6B6860]">
        <span>Question {index + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <ProgressBar value={index} max={questions.length} color="#7C93B0" />

      <Card className="p-8 text-center space-y-6">
        <p className="text-xs font-semibold text-[#6B6860] uppercase tracking-widest">Which article?</p>
        <p className="font-serif text-4xl font-semibold text-[#1B1A17]">{current.noun}</p>

        <div className={`grid ${gridCols} gap-3`}>
          {choices.map(choice => {
            const isCorrect = choice === current.article;
            const isSelected = selected === choice;
            let style = 'bg-white border-[#E3DFD4] text-[#1B1A17] hover:bg-[#F1EDE4]';
            if (selected) {
              if (isCorrect) style = 'bg-[#E3E8DC] border-[#7A8F6E] text-[#5F7256]';
              else if (isSelected) style = 'bg-[#F1DEDA] border-[#B85C4F] text-[#954A40]';
              else style = 'bg-white border-[#E3DFD4] text-[#C0BCB2]';
            }
            return (
              <button
                key={choice}
                onClick={() => handleAnswer(choice)}
                disabled={!!selected}
                className={`py-6 text-2xl font-semibold rounded-2xl border transition-colors ${style}`}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {selected && (
          <p className="text-[#6B6860] font-semibold">
            <span className="font-semibold text-[#1B1A17]">{current.article} {current.noun}</span> — {current.translation}
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
