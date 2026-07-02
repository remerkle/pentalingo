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
