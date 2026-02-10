'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { ChevronDown } from 'lucide-react';

// Currency metadata (symbols and names)
const CURRENCIES: Record<string, { symbol: string; name: string }> = {
  KES: { symbol: 'KES', name: 'Kenyan Shilling' },
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  ZAR: { symbol: 'R', name: 'South African Rand' },
  NGN: { symbol: '₦', name: 'Nigerian Naira' },
  AED: { symbol: 'AED', name: 'UAE Dirham' },
};

// Fallback rates in case API fails
const FALLBACK_RATES: Record<string, number> = {
  KES: 1,
  USD: 0.0077,
  EUR: 0.0071,
  GBP: 0.0061,
  ZAR: 0.14,
  NGN: 12.0,
  AED: 0.028,
};

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  convert: (amountKES: number) => string;
  symbol: string;
  rates: Record<string, number>;
  ratesSource: string;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState('KES');
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [ratesSource, setRatesSource] = useState('fallback');

  useEffect(() => {
    // Load currency preference from localStorage
    const saved = localStorage.getItem('preferred_currency');
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }

    // Fetch live rates
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await fetch('/api/rates');
      if (response.ok) {
        const data = await response.json();
        setRates(data.rates);
        setRatesSource(data.source);
      }
    } catch (error) {
      console.error('Failed to fetch rates:', error);
      // Keep using fallback rates
    }
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    localStorage.setItem('preferred_currency', curr);
  };

  const convert = (amountKES: number): string => {
    const rate = rates[currency] || 1;
    const converted = amountKES * rate;
    const symbol = CURRENCIES[currency]?.symbol || 'KES';
    
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
      symbol: CURRENCIES[currency]?.symbol || 'KES',
      rates,
      ratesSource
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
        {CURRENCIES[currency]?.symbol} {currency}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      
      {open && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)} 
          />
          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 min-w-[180px]">
            {Object.entries(CURRENCIES).map(([code, { symbol, name }]) => (
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
