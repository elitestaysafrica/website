import { NextResponse } from 'next/server'

// Cache rates for 24 hours
let cachedRates: Record<string, number> | null = null
let cacheTime: number = 0
let cacheSource: string = ''
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

// Fallback rates if API fails
const FALLBACK_RATES: Record<string, number> = {
  KES: 1,
  USD: 0.0078,
  EUR: 0.0065,
  GBP: 0.0057,
  ZAR: 0.124,
  NGN: 10.59,
  AED: 0.028,
}

export async function GET() {
  const now = Date.now()
  
  // Return cached rates if still valid
  if (cachedRates && (now - cacheTime) < CACHE_DURATION) {
    return NextResponse.json({ 
      rates: cachedRates, 
      source: cacheSource,
      updatedAt: new Date(cacheTime).toISOString()
    })
  }
  
  try {
    // ExchangeRate-API - free tier, supports KES, updates daily
    const response = await fetch(
      'https://open.er-api.com/v6/latest/KES',
      { next: { revalidate: 86400 } } // Cache for 24h
    )
    
    if (!response.ok) {
      throw new Error('ExchangeRate API error')
    }
    
    const data = await response.json()
    
    if (data.result !== 'success') {
      throw new Error('ExchangeRate API returned error')
    }
    
    const rates: Record<string, number> = {
      KES: 1,
      USD: data.rates.USD,
      EUR: data.rates.EUR,
      GBP: data.rates.GBP,
      ZAR: data.rates.ZAR,
      NGN: data.rates.NGN,
      AED: data.rates.AED,
    }
    
    // Update cache
    cachedRates = rates
    cacheTime = now
    cacheSource = 'exchangerate-api'
    
    return NextResponse.json({ 
      rates, 
      source: 'exchangerate-api',
      updatedAt: data.time_last_update_utc
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
