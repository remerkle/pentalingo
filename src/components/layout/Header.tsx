import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export function Header() {
  const { progress } = useApp();
  const navRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollFades = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollFades();
    window.addEventListener('resize', updateScrollFades);
    return () => window.removeEventListener('resize', updateScrollFades);
  }, [updateScrollFades]);

  return (
    <header className="sticky top-0 z-50 bg-[#F7F4EE] border-b border-[#E3DFD4] overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-16 flex items-center gap-2">
        <NavLink to="/" className="shrink-0 text-lg sm:text-2xl font-serif font-semibold text-[#1B1A17] tracking-tight">
          Pentalingo
        </NavLink>

        <div className="relative flex-1 min-w-0">
          <nav
            ref={navRef}
            onScroll={updateScrollFades}
            className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[
              { to: '/dashboard', label: 'Dashboard' },
              { to: '/flashcards',label: 'Flashcards' },
              { to: '/articles',  label: 'Articles' },
              { to: '/synonyms',  label: 'Synonyms' },
              { to: '/verbs',     label: 'Verbs' },
              { to: '/prepositions', label: 'Prepositions' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `shrink-0 whitespace-nowrap px-2 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-colors ${
                    isActive
                      ? 'text-[#1B1A17]'
                      : 'text-[#6B6860] hover:text-[#1B1A17]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          {canScrollLeft && (
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#F7F4EE] to-transparent" />
          )}
          {canScrollRight && (
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#F7F4EE] to-transparent" />
          )}
        </div>

        <div className="shrink-0 flex items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1 font-semibold text-xs sm:text-base text-[#D3A15C] whitespace-nowrap">
            🔥 {progress.streak}
          </span>
          <span className="flex items-center gap-1 font-semibold text-xs sm:text-base text-[#D97757] whitespace-nowrap">
            ⚡ {progress.xp} XP
          </span>
        </div>
      </div>
    </header>
  );
}
