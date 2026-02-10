'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { ChevronDown } from 'lucide-react';

// Exchange rates (updated periodically - you can automate this)
// Base: KES
const EXCHANGE_RATES: Record<string, { rate: number; symbol: string; name: string }> = {
  KES: { rate: 1, symbol: 'KES', name: 'Kenyan Shilling' },
  USD: { rate: 0.0077, symbol: '$', name: 'US Dollar' },
  EUR: { rate: 0.0071, symbol: '€', name: 'Euro' },
  GBP: { rate: 0.0061, symbol: '£', name: 'British Pound' },
  ZAR: { rate: 0.14, symbol: 'R', name: 'South African Rand' },
  NGN: { rate: 11.9, symbol: '₦', name: 'Nigerian Naira' },
  AED: { rate: 0.028, symbol: 'AED', name: 'UAE Dirham' },
};

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  convert: (amountKES: number) => string;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState('KES');

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('preferred_currency');
    if (saved && EXCHANGE_RATES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    localStorage.setItem('preferred_currency', curr);
  };

  const convert = (amountKES: number): string => {
    const rate = EXCHANGE_RATES[currency]?.rate || 1;
    const converted = amountKES * rate;
    const symbol = EXCHANGE_RATES[currency]?.symbol || 'KES';
    
    // Format based on currency
    if (currency === 'KES' || currency === 'NGN') {
      return `${symbol} ${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      convert,
      symbol: EXCHANGE_RATES[currency]?.symbol || 'KES'
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        {EXCHANGE_RATES[currency]?.symbol} {currency}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      
      {open && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)} 
          />
          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 min-w-[180px]">
            {Object.entries(EXCHANGE_RATES).map(([code, { symbol, name }]) => (
              <button
                key={code}
                onClick={() => { setCurrency(code); setOpen(false); }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                  currency === code ? 'text-primary font-medium' : 'text-gray-700'
                }`}
              >
                <span>{name}</span>
                <span className="text-gray-400">{symbol}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
