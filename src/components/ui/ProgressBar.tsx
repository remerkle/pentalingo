interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, max, color = '#D97757', className = '', showLabel = false }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-4 bg-[#E3DFD4] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && <span className="text-sm font-semibold text-[#6B6860] w-10 text-right">{pct}%</span>}
    </div>
  );
}
