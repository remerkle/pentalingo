import type { Verb } from '../../types';
import { DUTCH_VERBS } from './dutchVerbs';
import { SPANISH_VERBS } from './spanishVerbs';
import { ENGLISH_VERBS } from './englishVerbs';
import { GERMAN_VERBS } from './germanVerbs';

export const VERBS: Verb[] = [
  ...DUTCH_VERBS,
  ...SPANISH_VERBS,
  ...ENGLISH_VERBS,
  ...GERMAN_VERBS,
];

export { PERSON_LABELS, TENSE_LABELS, TENSE_KEYS } from './labels';
