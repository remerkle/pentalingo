import type { Language, Flashcard } from '../types';
import { NOUN_ARTICLES } from './nounArticles';
import { SYNONYMS } from './synonyms';

export { NOUN_ARTICLES } from './nounArticles';
export { SYNONYMS } from './synonyms';

export const LANGUAGES: Language[] = [
  { id: 'nl', name: 'Dutch',   flag: '🇳🇱', color: '#1CB0F6' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸', color: '#FF9600' },
  { id: 'en', name: 'English', flag: '🇬🇧', color: '#58CC02' },
  { id: 'de', name: 'German',  flag: '🇩🇪', color: '#FF4B4B' },
];

export const FLASHCARDS: Flashcard[] = [
  // Dutch
  { id: 'fc-nl-1', languageId: 'nl', front: 'Hallo',      back: 'Hello',                nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },
  { id: 'fc-nl-2', languageId: 'nl', front: 'Dankjewel',  back: 'Thank you',            nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },
  { id: 'fc-nl-3', languageId: 'nl', front: 'Hond',       back: 'Dog',                  nextReviewDate: '2026-06-30', interval: 2, easeFactor: 2.5 },

  // Spanish
  { id: 'fc-es-1', languageId: 'es', front: 'Hola',       back: 'Hello',                nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },
  { id: 'fc-es-2', languageId: 'es', front: 'Gracias',    back: 'Thank you',            nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },
  { id: 'fc-es-3', languageId: 'es', front: 'Perro',      back: 'Dog',                  nextReviewDate: '2026-06-30', interval: 2, easeFactor: 2.5 },

  // English
  { id: 'fc-en-1', languageId: 'en', front: 'Hello',      back: 'A greeting',           nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },
  { id: 'fc-en-2', languageId: 'en', front: 'Thank you',  back: 'Expressing gratitude', nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },

  // German
  { id: 'fc-de-1', languageId: 'de', front: 'Hallo',      back: 'Hello',                nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },
  { id: 'fc-de-2', languageId: 'de', front: 'Danke',      back: 'Thank you',            nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },
  { id: 'fc-de-3', languageId: 'de', front: 'Hund',       back: 'Dog',                  nextReviewDate: '2026-06-30', interval: 2, easeFactor: 2.5 },
];

// Draws from the same curated dictionaries built for the Articles and Synonyms
// features (they already carry translations) so the flashcard pool scales with
// them instead of needing its own separately maintained word list.
export function getFlashcardPool(languageId: string): Flashcard[] {
  const curated = FLASHCARDS.filter(f => f.languageId === languageId);

  const fromNouns: Flashcard[] = NOUN_ARTICLES
    .filter(n => n.languageId === languageId)
    .map(n => ({
      id: `fc-noun-${n.id}`,
      languageId,
      front: `${n.article} ${n.noun}`,
      back: n.translation,
      nextReviewDate: '',
      interval: 1,
      easeFactor: 2.5,
    }));

  const fromSynonyms: Flashcard[] = SYNONYMS
    .filter(s => s.languageId === languageId)
    .map(s => ({
      id: `fc-syn-${s.id}`,
      languageId,
      front: s.word,
      back: s.translation,
      nextReviewDate: '',
      interval: 1,
      easeFactor: 2.5,
    }));

  const seen = new Set<string>();
  const pool: Flashcard[] = [];
  for (const card of [...curated, ...fromNouns, ...fromSynonyms]) {
    const key = card.front.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    pool.push(card);
  }
  return pool;
}
