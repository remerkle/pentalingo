import { fetchWiktionaryWikitext } from './wiktionary';

const CACHE_KEY = 'pentalingo-wiktionary-synonyms';

// Wiktionary language-section headings, keyed by our languageId
const LANGUAGE_SECTIONS: Record<string, string> = {
  nl: 'Dutch',
  es: 'Spanish',
  en: 'English',
  de: 'German',
};

type CacheValue = string[] | 'unknown';

function readCache(): Record<string, CacheValue> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function writeCache(key: string, value: CacheValue) {
  try {
    const cache = readCache();
    cache[key] = value;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage unavailable (private browsing, storage full, etc.)
  }
}

function cleanWord(raw: string): string {
  return raw
    .replace(/^\*+\s*/, '')
    .replace(/'''?/g, '')
    .split('#')[0] // strip section anchors from [[page#Section]]
    .trim();
}

// Excludes namespace links (Thesaurus:, w:, q:, …) and stray empty/duplicate matches
function isValidWord(word: string, original: string): boolean {
  return word.length > 0 && !word.includes(':') && word.toLowerCase() !== original.toLowerCase();
}

function extractLinkedWords(text: string): string[] {
  const words = new Set<string>();
  for (const m of text.matchAll(/\{\{l\|[a-z-]+\|([^|}]+)/g)) words.add(cleanWord(m[1]));
  for (const m of text.matchAll(/\[\[([^\]|#]+)/g)) words.add(cleanWord(m[1]));
  return [...words];
}

function findSynonyms(wikitext: string, languageId: string, word: string): string[] | null {
  const langName = LANGUAGE_SECTIONS[languageId];
  if (!langName) return null;

  // Isolate this language's section (from its level-2 heading to the next one)
  const sectionMatch = wikitext.match(
    new RegExp(`==\\s*${langName}\\s*==([\\s\\S]*?)(?:\\n==[^=]|$)`),
  );
  if (!sectionMatch) return null;
  const section = sectionMatch[1];

  // Modern entries list synonyms inline per-sense: {{syn|xx|word1|word2|...}}.
  // Take the first one found — later senses belong to other parts of speech
  // and mixing them in produces unrelated results (e.g. "schnell" the adverb
  // sense "again" vs. the adjective sense "fast").
  for (const m of section.matchAll(/\{\{syn\|([a-z-]+)\|([^}]+)\}\}/g)) {
    if (m[1] !== languageId) continue;
    const words = m[2]
      .split('|')
      .filter(part => !part.includes('='))
      .map(cleanWord)
      .filter(w => isValidWord(w, word));
    if (words.length > 0) return [...new Set(words)].slice(0, 8);
  }

  // Fall back to an older-style dedicated ===Synonyms=== heading with [[links]]
  const block = section.match(/={2,5}\s*Synonyms\s*={2,5}([\s\S]*?)(?:\n=|$)/i);
  if (block) {
    const words = extractLinkedWords(block[1]).filter(w => isValidWord(w, word));
    if (words.length > 0) return [...new Set(words)].slice(0, 8);
  }

  return null;
}

export async function lookupWiktionarySynonyms(
  word: string,
  languageId: string,
): Promise<string[] | null> {
  const key = `${languageId}:${word.toLowerCase()}`;
  const cache = readCache();

  if (key in cache) {
    const cached = cache[key];
    return cached === 'unknown' ? null : cached;
  }

  const wikitext = await fetchWiktionaryWikitext(word.toLowerCase());
  const result = wikitext ? findSynonyms(wikitext, languageId, word) : null;
  writeCache(key, result ?? 'unknown');
  return result;
}
