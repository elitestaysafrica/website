"use client"

import { useCurrency } from "@/components/CurrencySelector"

// Exchange rates (KES as base)
const rates: Record<string, number> = {
  KES: 1,
  USD: 0.0077,  // 1 KES = 0.0077 USD
  EUR: 0.0071,
  GBP: 0.0061,
  ZAR: 0.14,
  NGN: 12.0,
  AED: 0.028,
}

const symbols: Record<string, string> = {
  KES: "KES",
  USD: "$",
  EUR: "€",
  GBP: "£",
  ZAR: "R",
  NGN: "₦",
  AED: "AED",
}

interface PriceProps {
  /** Amount in KES */
  amount: number
  /** Show decimals (default: false for amounts > 1000) */
  decimals?: boolean
  /** Custom className */
  className?: string
  /** Show "per night" suffix */
  perNight?: boolean
  /** Show "per month" suffix */
  perMonth?: boolean
  /** Compact format for large numbers (e.g., 180K instead of 180,000) */
  compact?: boolean
}

export function Price({ 
  amount, 
  decimals, 
  className = "", 
  perNight = false,
  perMonth = false,
  compact = false 
}: PriceProps) {
  const { currency } = useCurrency()
  
  const converted = amount * (rates[currency] || 1)
  const symbol = symbols[currency] || currency
  
  // Determine if we should show decimals
  const showDecimals = decimals ?? (converted < 100)
  
  let formatted: string
  if (compact && converted >= 1000) {
    if (converted >= 1000000) {
      formatted = `${(converted / 1000000).toFixed(1)}M`
    } else {
      formatted = `${Math.round(converted / 1000)}K`
    }
  } else {
    formatted = showDecimals 
      ? converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : Math.round(converted).toLocaleString()
  }
  
  const suffix = perNight ? " / night" : perMonth ? " / month" : ""
  
  return (
    <span className={className}>
      {symbol} {formatted}{suffix}
    </span>
  )
}

// Helper to parse "KES 7,500" strings to numbers
export function parseKES(str: string): number {
  const cleaned = str.replace(/[^0-9.]/g, '')
  return parseFloat(cleaned) || 0
}

// Hook for manual conversion in complex cases
export function useConvertPrice() {
  const { currency } = useCurrency()
  
  return (kesAmount: number, options?: { compact?: boolean; decimals?: boolean }) => {
    const converted = kesAmount * (rates[currency] || 1)
    const symbol = symbols[currency] || currency
    
    if (options?.compact && converted >= 1000) {
      if (converted >= 1000000) {
        return `${symbol} ${(converted / 1000000).toFixed(1)}M`
      }
      return `${symbol} ${Math.round(converted / 1000)}K`
    }
    
    const showDecimals = options?.decimals ?? (converted < 100)
    const formatted = showDecimals 
      ? converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : Math.round(converted).toLocaleString()
    
    return `${symbol} ${formatted}`
  }
}
