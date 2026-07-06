import type { ReactNode, MouseEvent } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  accent?: string;
  /** Render as a solid accent-tinted block (no border) instead of a bordered white card. */
  tinted?: boolean;
}

export function Card({ children, className = '', onClick, accent, tinted = false }: CardProps) {
  const style = tinted
    ? (accent ? { backgroundColor: accent } : undefined)
    : (accent ? { borderLeftColor: accent } : undefined);

  return (
    <div
      onClick={onClick}
      style={style}
      className={[
        'rounded-2xl p-4 transition-all duration-150',
        tinted ? '' : 'bg-white border border-[#E3DFD4]',
        accent && !tinted ? 'border-l-4' : '',
        onClick ? 'cursor-pointer hover:brightness-95' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
