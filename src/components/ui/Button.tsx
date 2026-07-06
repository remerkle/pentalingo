import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:   'bg-[#1B1A17] text-[#F7F4EE] border border-[#1B1A17] hover:bg-[#33312C]',
  secondary: 'bg-transparent text-[#1B1A17] border border-[#1B1A17] hover:bg-[#F1EDE4]',
  danger:    'bg-[#B85C4F] text-[#F7F4EE] border border-[#B85C4F] hover:bg-[#954A40]',
  ghost:     'bg-transparent text-[#6B6860] border border-transparent hover:bg-[#F1EDE4]',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'font-semibold rounded-full transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
