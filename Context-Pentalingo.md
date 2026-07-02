# Pentalingo — Project Reference

## What is this?

Pentalingo is a language-learning web app (inspired by Duolingo) where users can learn **4 languages** (Dutch, Spanish, English, German) through structured lessons, spaced-repetition flashcards, and daily quizzes. Built with React + TypeScript + Vite + Tailwind CSS v4.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI and type safety |
| Vite | Dev server and bundler |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Styling via utility classes |
| React Router v6 | Client-side routing |

---

## Folder Structure

```
src/
├── components/
│   ├── ui/                  # Reusable primitives
│   │   ├── Button.tsx       # Primary/secondary/danger/ghost variants with Duolingo-style border-b-4 shadow
│   │   ├── Card.tsx         # White card with thick bottom border accent; accepts optional `accent` color
│   │   ├── ProgressBar.tsx  # Filled bar with configurable color and optional % label
│   │   └── Badge.tsx        # Pill badge in green/orange/blue/red/purple/yellow
│   └── layout/
│       ├── Header.tsx       # Sticky top nav with logo, nav links, streak 🔥 and XP ⚡ display
│       └── Layout.tsx       # Wraps all pages; Header + max-w-4xl centered main content
├── pages/
│   ├── HomePage.tsx         # Landing: hero tagline, language picker grid, 3 feature cards
│   ├── DashboardPage.tsx    # Stats (streak, XP, level), daily goal progress, continue CTA, language overview
│   ├── LessonsPage.tsx      # Language tab switcher + unit sections + lesson cards (locked/done/available states)
│   ├── FlashcardsPage.tsx   # Flip card UI, Easy/Good/Hard rating buttons, XP rewards
│   ├── QuizPage.tsx         # Multiple-choice questions, color-coded answer feedback, score summary
│   └── ArticlesPage.tsx     # Article checker: type a noun → see correct article, gender color-coded
├── context/
│   └── AppContext.tsx       # Global state: UserProgress, selectedLanguage; exposes addXp + completeLesson
├── data/
│   ├── languages.ts         # LANGUAGES[], LESSONS[], FLASHCARDS[], QUIZ_QUESTIONS[] — re-exports NOUN_ARTICLES from nounArticles.ts
│   └── nounArticles.ts      # NOUN_ARTICLES[] — all noun/article data; Dutch ~1000 nouns, others ~25 each
├── types/
│   └── index.ts             # Language, Lesson, Flashcard, QuizQuestion, NounArticle, UserProgress types
├── hooks/                   # (empty — add custom hooks here)
├── utils/                   # (empty — add helpers here)
├── App.tsx                  # BrowserRouter + AppProvider + Layout + Routes
├── main.tsx                 # React root mount
└── index.css                # Tailwind v4 @import + @theme design tokens
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Hero, language picker, feature highlights |
| `/dashboard` | DashboardPage | Streak, XP, level, daily goal, language progress |
| `/lessons` | LessonsPage | Browse and start lessons per language |
| `/flashcards` | FlashcardsPage | Flip-card review session with ratings |
| `/quiz` | QuizPage | Multiple-choice quiz with instant feedback |
| `/articles` | ArticlesPage | Type a noun to look up its correct article; gender color-coded |

---

## Design System

### Font
**Nunito** (Google Fonts) — rounded, friendly, high legibility. Weights used: 400, 600, 700, 800, 900.

### Color Palette (Duolingo-inspired)

| Name | Hex | Used for |
|------|-----|---------|
| Green | `#58CC02` | Primary CTA, correct answers, XP |
| Green dark | `#46A302` | Button border shadow, completed state |
| Green light | `#D7F5B1` | Correct answer backgrounds, badges |
| Orange | `#FF9600` | Streak, secondary accents |
| Blue | `#1CB0F6` | Secondary buttons, Dutch language |
| Red | `#FF4B4B` | Wrong answers, danger buttons |
| Purple | `#CE82FF` | Flashcards, Mandarin language |
| Yellow | `#FFD900` | XP display, level badge |
| Surface | `#F7F7F7` | Hover states, card backgrounds |
| Border | `#E5E5E5` | Card borders, dividers |
| Text | `#3C3C3C` | Primary text |
| Muted | `#777777` | Secondary text, labels |

Design tokens are defined in `src/index.css` under `@theme { }` and usable as Tailwind utilities (e.g. `bg-green`, `text-muted`). Direct hex values are also used inline where semantics are one-off.

### Visual Style
- **Cards**: white background, `border-2 border-[#E5E5E5] border-b-4`, `rounded-2xl` — the thick bottom border gives a 3D "lifted" feel
- **Buttons**: same thick-bottom-border pattern; pressing removes it (`active:border-b-0 active:translate-y-[2px]`) for a satisfying click
- **Rounded corners**: `rounded-2xl` (16px) everywhere for a friendly, approachable look
- **Bold text**: headings use `font-black` (900) for punchy hierarchy
- **Language accent colors**: each language has its own color used on card bottom borders and tab highlights

---

## Languages

Defined in `src/data/languages.ts`.

| ID | Name | Flag | Color |
|----|------|------|-------|
| `nl` | Dutch   | 🇳🇱 | Blue `#1CB0F6` |
| `es` | Spanish | 🇪🇸 | Orange `#FF9600` |
| `en` | English | 🇬🇧 | Green `#58CC02` |
| `de` | German  | 🇩🇪 | Red `#FF4B4B` |

---

## Global State (AppContext)

`AppContext` holds:
- `progress: UserProgress` — streak, xp, level, completedLessons[], dailyGoal, todayXp
- `selectedLanguage: Language` — the active language tab across all pages
- `setSelectedLanguage(lang)` — switch active language
- `addXp(amount)` — increment xp + todayXp
- `completeLesson(lessonId)` — push to completedLessons[]

State is in-memory only (resets on refresh). Persistence (localStorage or backend) is not yet implemented.

---

## Article Checker (`/articles`)

**File:** `src/pages/ArticlesPage.tsx`  
**Data:** `src/data/nounArticles.ts` → exported as `NOUN_ARTICLES: NounArticle[]`

### NounArticle type (`src/types/index.ts`)
```ts
export type NounArticle = {
  id: string;
  languageId: string;
  noun: string;
  article: string;
  gender: 'masculine' | 'feminine' | 'neuter' | 'common' | 'indefinite';
  translation: string;
};
```

### Dictionary sizes
| Language | Count | Format |
|----------|-------|--------|
| Dutch (`nl`) | ~1000 nouns | Compact `makeEntries()` tuples |
| Spanish (`es`) | 25 nouns | Plain object array |
| English (`en`) | 20 nouns | Plain object array |
| German (`de`) | 25 nouns | Plain object array |

### `makeEntries()` helper (Dutch only)
Dutch uses a compact tuple format to avoid repetitive object boilerplate:
```ts
type Entry = readonly [string, string, NounArticle['gender'], string];
// makeEntries(languageId, idPrefix, entries) → NounArticle[]
const DUTCH_NOUNS = makeEntries('nl', 'nl', [
  ['hond', 'de', 'common', 'dog'],
  ['kind', 'het', 'neuter', 'child'],
  // ...~1000 entries
]);
```

### Gender color-coding
| Gender | Color | Used for |
|--------|-------|---------|
| `common` | Blue `#1CB0F6` | Dutch `de` words |
| `neuter` | Purple `#CE82FF` | Dutch `het` words |
| `masculine` | Blue `#1CB0F6` | Spanish/German masculine |
| `feminine` | Red `#FF4B4B` | Spanish/German feminine |
| `indefinite` | Green `#46A302` | English `a`/`an` |

### Dutch Wiktionary lookup (`src/utils/dutchGender.ts`)
For Dutch, any noun not in the curated `NOUN_ARTICLES` list is looked up via the English Wiktionary API at runtime:
- Parses the `{{nl-noun|X|...}}` template: `n` → `het`, anything else (`m`/`f`/`c`) → `de`
- Results cached permanently in `localStorage` under key `pentalingo-dutch-gender`
- Cached lookups are instant and work offline; first lookup takes ~200–400ms
- 400ms debounce before firing the API call
- 6s timeout with `AbortController`; network errors silently fall through to "not found"

### UI behavior
- **Curated match** (word in `NOUN_ARTICLES`): shows article + translation + gender badge instantly, no API call
- **Wiktionary match** (Dutch only, word not in curated list): shows article + gender badge + "via Wiktionary" note; lookup fires after 400ms debounce
- **Loading state**: "Looking up…" pulse shown while Wiktionary call is in flight (Dutch only)
- **Not found**: "check the spelling?" for Dutch (Wiktionary exhausted); "not in our dictionary yet" for other languages
- **Prefix suggestions**: up to 5 clickable matches from curated list while typing
- **Browse all**: full grid of all curated nouns for the selected language when input is empty
- **Language tabs**: synced with global `selectedLanguage` from AppContext; clears input on switch; Wiktionary lookup only runs for Dutch

---

## Key Decisions & Conventions

- **Tailwind v4** is used via `@tailwindcss/vite` plugin — no `tailwind.config.js`, config lives in `@theme {}` in `index.css`
- **Named exports** for all components and pages (no default exports except `App`)
- **Noun data split**: `NOUN_ARTICLES` lives in `src/data/nounArticles.ts` (not `languages.ts`) to keep the main data file manageable; `languages.ts` re-exports it
- **No auth** — user is anonymous; progress is ephemeral for now
- **No backend** — all data is static until a backend is added
- **Quiz type** is `multiple-choice` only for now; `fill-blank` type is defined but not yet implemented in UI

---

## Running the Project

```bash
npm run dev     # start dev server at http://localhost:5173
npm run build   # production build
npm run preview # preview production build
```
