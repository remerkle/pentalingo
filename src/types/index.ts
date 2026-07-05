export type Language = {
  id: string;
  name: string;
  flag: string;
  color: string;
};

export type Flashcard = {
  id: string;
  languageId: string;
  front: string;
  back: string;
  nextReviewDate: string;
  interval: number;
  easeFactor: number;
};

export type NounArticle = {
  id: string;
  languageId: string;
  noun: string;
  article: string;
  gender: 'masculine' | 'feminine' | 'neuter' | 'common' | 'indefinite';
  translation: string;
};

export type Synonym = {
  id: string;
  languageId: string;
  word: string;
  synonyms: string[];
  translation: string;
};

export type UserProgress = {
  streak: number;
  xp: number;
  level: number;
  dailyGoal: number;
  todayXp: number;
};

export type TenseKey = 'present' | 'past' | 'future' | 'presentPerfect';

// Conjugated forms in fixed person order: [I, you, he/she/it, we, you-all, they]
export type ConjugationSet = [string, string, string, string, string, string];

export type Verb = {
  id: string;
  languageId: string;
  infinitive: string;
  translation: string;
  present: ConjugationSet;
  past: ConjugationSet;
  future: ConjugationSet;
  presentPerfect: ConjugationSet;
};

export type PrepositionExercise = {
  id: string;
  languageId: string;
  sentence: string; // contains "___" marking the blank
  correct: string;
  distractors: [string, string];
  translation: string;
};
