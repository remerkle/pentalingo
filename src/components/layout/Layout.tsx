import type { ReactNode } from 'react';
import { Header } from './Header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
