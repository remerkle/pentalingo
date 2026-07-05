import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:   'bg-[#58CC02] text-white border-b-4 border-[#46A302] hover:brightness-110 active:border-b-0 active:translate-y-[2px]',
  secondary: 'bg-white text-[#1CB0F6] border-2 border-[#1CB0F6] hover:bg-[#e8f7ff]',
  danger:    'bg-[#FF4B4B] text-white border-b-4 border-[#CC3B3B] hover:brightness-110 active:border-b-0 active:translate-y-[2px]',
  ghost:     'bg-transparent text-[#777777] hover:bg-[#F7F7F7]',
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
        'font-bold rounded-2xl transition-all duration-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
