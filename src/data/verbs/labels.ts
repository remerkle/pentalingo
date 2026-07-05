import type { TenseKey } from '../../types';

export const TENSE_KEYS: TenseKey[] = ['present', 'past', 'future', 'presentPerfect'];

// Pronoun labels per language, in the same fixed person order as ConjugationSet:
// [I, you, he/she/it, we, you-all, they]
export const PERSON_LABELS: Record<string, [string, string, string, string, string, string]> = {
  nl: ['ik', 'jij', 'hij/zij/het', 'wij', 'jullie', 'zij'],
  es: ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ellas'],
  en: ['I', 'you', 'he/she/it', 'we', 'you (pl.)', 'they'],
  de: ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'],
};

export const TENSE_LABELS: Record<string, Record<TenseKey, string>> = {
  nl: {
    present: 'Tegenwoordige tijd',
    past: 'Verleden tijd',
    future: 'Toekomende tijd',
    presentPerfect: 'Voltooid tegenwoordige tijd',
  },
  es: {
    present: 'Presente',
    past: 'Pretérito',
    future: 'Futuro',
    presentPerfect: 'Pretérito perfecto',
  },
  en: {
    present: 'Present',
    past: 'Past',
    future: 'Future',
    presentPerfect: 'Present Perfect',
  },
  de: {
    present: 'Präsens',
    past: 'Präteritum',
    future: 'Futur I',
    presentPerfect: 'Perfekt',
  },
};
