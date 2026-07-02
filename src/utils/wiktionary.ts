export async function fetchWiktionaryWikitext(word: string): Promise<string | null> {
  const url =
    `https://en.wiktionary.org/w/api.php?action=query` +
    `&titles=${encodeURIComponent(word)}` +
    `&prop=revisions&rvprop=content&format=json&origin=*`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;

    const data = await res.json();
    const pages = data?.query?.pages as Record<
      string,
      { missing?: true; revisions?: Array<{ '*': string }> }
    >;
    if (!pages) return null;

    const page = Object.values(pages)[0];
    if (!page || page.missing) return null;

    return page.revisions?.[0]?.['*'] ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
