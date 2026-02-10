'use client';

import { CurrencyProvider } from './CurrencySelector';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      {children}
    </CurrencyProvider>
  );
}
