import type { ReactNode } from 'react';

type BadgeColor = 'green' | 'orange' | 'blue' | 'red' | 'purple' | 'yellow';

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colors: Record<BadgeColor, string> = {
  green:  'bg-[#E3E8DC] text-[#5F7256]',
  orange: 'bg-[#F3E7D3] text-[#A17B3E]',
  blue:   'bg-[#E4EAF0] text-[#5A7595]',
  red:    'bg-[#F1DEDA] text-[#954A40]',
  purple: 'bg-[#EAE3EC] text-[#7A6A86]',
  yellow: 'bg-[#F3E2D9] text-[#B85C3E]',
};

export function Badge({ children, color = 'green', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}
