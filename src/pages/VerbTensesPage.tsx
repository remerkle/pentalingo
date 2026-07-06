import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { VERBS, PERSON_LABELS, TENSE_LABELS, TENSE_KEYS } from '../data/verbs';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { TenseKey } from '../types';

type ExpandedKey = TenseKey | 'all';

export function VerbTensesPage() {
  const { selectedLanguage, setSelectedLanguage } = useApp();
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<Set<ExpandedKey>>(new Set());
  const [showAllVerbs, setShowAllVerbs] = useState(false);

  const verbs = useMemo(
    () => VERBS.filter(v => v.languageId === selectedLanguage.id),
    [selectedLanguage.id]
  );

  useEffect(() => {
    setIndex(0);
    setExpanded(new Set());
    setShowAllVerbs(false);
  }, [selectedLanguage.id]);

  const verb = verbs[index];
  const persons = PERSON_LABELS[selectedLanguage.id] ?? [];
  const tenseLabels = TENSE_LABELS[selectedLanguage.id] ?? {};

  function goTo(i: number) {
    setIndex(i);
    setExpanded(new Set());
  }

  function toggle(key: ExpandedKey) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-4xl font-semibold text-[#1B1A17]">Verb Tenses</h1>
        <p className="text-[#6B6860] font-semibold">
          The 100 most common {selectedLanguage.name} verbs, fully conjugated
        </p>
      </div>

      {/* Language tabs */}
      <div className="flex gap-2 justify-center flex-wrap">
        {LANGUAGES.map(lang => (
          <button
            key={lang.id}
            onClick={() => setSelectedLanguage(lang)}
            className={`px-5 py-2 rounded-full font-semibold text-sm border transition-colors ${
              selectedLanguage.id === lang.id
                ? 'text-white'
                : 'bg-white border-[#E3DFD4] text-[#6B6860] hover:bg-[#F1EDE4]'
            }`}
            style={
              selectedLanguage.id === lang.id
                ? { backgroundColor: lang.color, borderColor: lang.color }
                : {}
            }
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>

      {!verb ? (
        <Card className="max-w-md mx-auto p-8 text-center">
          <p className="font-semibold text-[#6B6860]">No verbs yet for {selectedLanguage.name}.</p>
        </Card>
      ) : (
        <div className="max-w-md mx-auto space-y-6">
          {/* Verb navigator */}
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => goTo(index - 1)} disabled={index === 0}>
              ← Prev
            </Button>
            <Card className="flex-1 p-5 text-center" accent={selectedLanguage.color}>
              <p className="text-xs font-semibold text-[#6B6860] uppercase tracking-widest">
                Verb {index + 1} of {verbs.length}
              </p>
              <p className="font-serif text-3xl font-semibold text-[#1B1A17] mt-1">{verb.infinitive}</p>
              <p className="text-[#6B6860] font-semibold">{verb.translation}</p>
            </Card>
            <Button variant="secondary" size="sm" onClick={() => goTo(index + 1)} disabled={index === verbs.length - 1}>
              Next →
            </Button>
          </div>

          {/* Tense cards */}
          <div className="space-y-3">
            {TENSE_KEYS.map(key => (
              <div key={key}>
                <Card
                  onClick={() => toggle(key)}
                  className="p-4 flex items-center justify-between"
                  accent={expanded.has(key) ? '#7C93B0' : undefined}
                >
                  <span className="font-semibold text-[#1B1A17]">{tenseLabels[key]}</span>
                  <span className="text-[#6B6860]">{expanded.has(key) ? '▲' : '▼'}</span>
                </Card>

                {expanded.has(key) && (
                  <Card className="mt-2 p-4 space-y-1.5">
                    {persons.map((label, i) => (
                      <div key={label} className="flex items-center justify-between text-sm">
                        <span className="text-[#6B6860] font-semibold">{label}</span>
                        <span className="font-semibold text-[#1B1A17]">{verb[key][i]}</span>
                      </div>
                    ))}
                  </Card>
                )}
              </div>
            ))}

            {/* All tenses */}
            <div>
              <Card
                onClick={() => toggle('all')}
                className="p-4 flex items-center justify-between"
                accent={expanded.has('all') ? '#9B8AA8' : undefined}
              >
                <span className="font-semibold text-[#1B1A17]">📋 All Tenses</span>
                <span className="text-[#6B6860]">{expanded.has('all') ? '▲' : '▼'}</span>
              </Card>

              {expanded.has('all') && (
                <Card className="mt-2 p-4 overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left font-semibold text-[#1B1A17] pb-2 pr-3">Tense</th>
                        {persons.map(label => (
                          <th key={label} className="text-left font-semibold text-[#6B6860] pb-2 px-2 whitespace-nowrap">
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TENSE_KEYS.map(key => (
                        <tr key={key} className="border-t border-[#E3DFD4]">
                          <td className="py-2 pr-3 font-semibold text-[#1B1A17] whitespace-nowrap">{tenseLabels[key]}</td>
                          {verb[key].map((form, i) => (
                            <td key={i} className="py-2 px-2 text-[#1B1A17] whitespace-nowrap">{form}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Browse all */}
      {verbs.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-3">
          <button
            onClick={() => setShowAllVerbs(v => !v)}
            className="w-full text-center font-semibold text-[#1B1A17] hover:text-[#7C93B0] transition-colors"
          >
            {showAllVerbs ? '▲ Hide' : '▼ Browse'} all {verbs.length} verbs
          </button>
          {showAllVerbs && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {verbs.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => goTo(i)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors text-left ${
                    i === index
                      ? 'bg-[#E3E8DC] border-[#7A8F6E]'
                      : 'bg-white border-[#E3DFD4] hover:bg-[#F1EDE4]'
                  }`}
                >
                  <span className="font-semibold text-[#1B1A17]">{v.infinitive}</span>
                  <span className="text-xs text-[#6B6860]">{v.translation}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
