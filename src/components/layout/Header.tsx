import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export function Header() {
  const { progress } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-[#E5E5E5]">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-black text-[#58CC02] tracking-tight">
          Pentalingo
        </NavLink>

        <nav className="flex items-center gap-1">
          {[
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/flashcards',label: 'Flashcards' },
            { to: '/articles',  label: 'Articles' },
            { to: '/synonyms',  label: 'Synonyms' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl font-bold text-sm transition-colors ${
                  isActive
                    ? 'bg-[#D7F5B1] text-[#46A302]'
                    : 'text-[#777777] hover:bg-[#F7F7F7]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-bold text-[#FF9600]">
            🔥 {progress.streak}
          </span>
          <span className="flex items-center gap-1 font-bold text-[#FFD900]">
            ⚡ {progress.xp} XP
          </span>
        </div>
      </div>
    </header>
  );
}
