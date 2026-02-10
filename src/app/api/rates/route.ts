import { NextResponse } from 'next/server'

// Cache rates for 24 hours
let cachedRates: Record<string, number> | null = null
let cacheTime: number = 0
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

// Fallback rates if API fails
const FALLBACK_RATES: Record<string, number> = {
  KES: 1,
  USD: 0.0077,
  EUR: 0.0071,
  GBP: 0.0061,
  ZAR: 0.14,
  NGN: 12.0,
  AED: 0.028,
}

export async function GET() {
  const now = Date.now()
  
  // Return cached rates if still valid
  if (cachedRates && (now - cacheTime) < CACHE_DURATION) {
    return NextResponse.json({ 
      rates: cachedRates, 
      source: 'cache',
      updatedAt: new Date(cacheTime).toISOString()
    })
  }
  
  try {
    // Frankfurter.app - free, no API key, updates daily
    // Get rates with KES as base
    const response = await fetch(
      'https://api.frankfurter.app/latest?from=KES&to=USD,EUR,GBP,ZAR,AED',
      { next: { revalidate: 86400 } } // Cache for 24h
    )
    
    if (!response.ok) {
      throw new Error('Frankfurter API error')
    }
    
    const data = await response.json()
    
    // Frankfurter doesn't support NGN, so we'll estimate it
    // NGN is roughly 12x KES (both are weak currencies)
    const rates: Record<string, number> = {
      KES: 1,
      USD: data.rates.USD,
      EUR: data.rates.EUR,
      GBP: data.rates.GBP,
      ZAR: data.rates.ZAR,
      AED: data.rates.AED,
      NGN: 12.0, // Estimated - NGN not in frankfurter
    }
    
    // Update cache
    cachedRates = rates
    cacheTime = now
    
    return NextResponse.json({ 
      rates, 
      source: 'frankfurter',
      updatedAt: new Date(now).toISOString()
    })
    
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error)
    
    // Return fallback rates
    return NextResponse.json({ 
      rates: FALLBACK_RATES, 
      source: 'fallback',
      updatedAt: null
    })
  }
}
