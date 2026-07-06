import type { PrepositionExercise } from '../../types';
import { DUTCH_PREPOSITIONS } from './dutchPrepositions';
import { SPANISH_PREPOSITIONS } from './spanishPrepositions';
import { ENGLISH_PREPOSITIONS } from './englishPrepositions';
import { GERMAN_PREPOSITIONS } from './germanPrepositions';

export const PREPOSITION_EXERCISES: PrepositionExercise[] = [
  ...DUTCH_PREPOSITIONS,
  ...SPANISH_PREPOSITIONS,
  ...ENGLISH_PREPOSITIONS,
  ...GERMAN_PREPOSITIONS,
];
