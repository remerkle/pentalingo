import { fetchWiktionaryWikitext } from './wiktionary';

const CACHE_KEY = 'pentalingo-wiktionary-translations';

// Wiktionary language-section headings, keyed by our languageId
const LANGUAGE_SECTIONS: Record<string, string> = {
  nl: 'Dutch',
  es: 'Spanish',
  en: 'English',
  de: 'German',
};

type CacheValue = string | 'unknown';

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

function cleanGloss(raw: string): string | null {
  let text = raw;

  // Strip leading qualifier templates, e.g. {{lb|en|informal}}
  while (/^\s*\{\{[^}]*\}\}\s*/.test(text)) {
    text = text.replace(/^\s*\{\{[^}]*\}\}\s*/, '');
  }
  text = text.replace(/\{\{[^}]*\}\}/g, '');
  text = text.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2');
  text = text.replace(/\[\[([^\]]+)\]\]/g, '$1');
  text = text.replace(/'''?/g, '');
  text = text.trim();

  if (!text) return null;
  return text.length > 70 ? text.slice(0, 67).trim() + '…' : text;
}

function findGloss(wikitext: string, languageId: string): string | null {
  const langName = LANGUAGE_SECTIONS[languageId];
  if (!langName) return null;

  // Isolate this language's section (from its level-2 heading to the next one)
  const sectionMatch = wikitext.match(
    new RegExp(`==\\s*${langName}\\s*==([\\s\\S]*?)(?:\\n==[^=]|$)`),
  );
  if (!sectionMatch) return null;

  // First numbered definition line ("# ...") is the primary sense
  const defMatch = sectionMatch[1].match(/^#\s+(?!redirect)(.+)$/im);
  if (!defMatch) return null;

  return cleanGloss(defMatch[1]);
}

export async function lookupWiktionaryTranslation(
  word: string,
  languageId: string,
): Promise<string | null> {
  const key = `${languageId}:${word.toLowerCase()}`;
  const cache = readCache();

  if (key in cache) {
    const cached = cache[key];
    return cached === 'unknown' ? null : cached;
  }

  const wikitext = await fetchWiktionaryWikitext(word.toLowerCase());
  const result = wikitext ? findGloss(wikitext, languageId) : null;
  writeCache(key, result ?? 'unknown');
  return result;
}
