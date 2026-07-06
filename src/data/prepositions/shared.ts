import type { PrepositionExercise } from '../../types';

// [sentence with "___" blank, correct preposition, distractor 1, distractor 2, translation/usage note]
export type Entry = readonly [string, string, string, string, string];

export function makeEntries(languageId: string, prefix: string, entries: Entry[]): PrepositionExercise[] {
  return entries.map(([sentence, correct, d1, d2, translation], i) => ({
    id: `prep-${prefix}-${i + 1}`,
    languageId,
    sentence,
    correct,
    distractors: [d1, d2],
    translation,
  }));
}
