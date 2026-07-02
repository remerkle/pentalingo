import { fetchWiktionaryWikitext } from './wiktionary';

const CACHE_KEY = 'pentalingo-dutch-gender';

type CacheValue = 'de' | 'het' | 'unknown';

function readCache(): Record<string, CacheValue> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function writeCache(word: string, value: CacheValue) {
  try {
    const cache = readCache();
    cache[word] = value;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage unavailable (private browsing, storage full, etc.)
  }
}

async function fetchFromWiktionary(word: string): Promise<'de' | 'het' | null> {
  const content = await fetchWiktionaryWikitext(word);
  if (!content) return null;

  // Dutch noun gender is encoded in the nl-noun template:
  // {{nl-noun|m|...}} / {{nl-noun|f|...}} / {{nl-noun|c|...}} → de
  // {{nl-noun|n|...}} → het
  const match = content.match(/\{\{nl-noun\|([mnfc])/);
  if (match) return match[1] === 'n' ? 'het' : 'de';

  return null;
}

export async function lookupDutchArticle(
  word: string,
): Promise<'de' | 'het' | null> {
  const key = word.toLowerCase();
  const cache = readCache();

  if (key in cache) {
    const cached = cache[key];
    return cached === 'unknown' ? null : cached;
  }

  const result = await fetchFromWiktionary(key);
  writeCache(key, result ?? 'unknown');
  return result;
}
