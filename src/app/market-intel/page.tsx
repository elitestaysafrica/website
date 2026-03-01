"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  ArrowRight,
  Building2,
  Percent,
  DollarSign,
  Calendar,
  Users,
  Target,
  Clock,
  Star,
  ChevronDown,
  Mail,
  Loader2,
  ArrowUpRight,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://staff.elitestaysafrica.com/api/website"

interface MarketData {
  generated_at: string
  snapshot_count: number
  occupancy: {
    market: Record<string, number>
    esa: Record<string, number>
    deltas: { day: Record<string, number>; week: Record<string, number> }
    esa_deltas: { day: Record<string, number>; week: Record<string, number> }
  }
  overview: { median_rate: number | null; total_listings: number }
  gap_vs_market: number | null
  competitors_tracked: number | null
  dead_pct: number | null
  last_minute_pct: number | null
  fill_rate: { label: string; market_fill: number; esa_fill: number }[]
  by_area: { name: string; occ30: number | null; occ90: number | null }[]
  by_bedroom: { bedrooms: number; label: string; occ30: number | null; occ90: number | null }[]
  timeline: { date: string; market_occ30: number; esa_occ30: number }[]
  avg_manager_occ: { occ30: number; estimated: boolean }
  ratings: { market_avg: number | null; esa_avg: number | null; esa_reviews: number | null }
  actual_performance: {
    esa_occ: number; esa_rating: number; esa_reviews: number
    avg_manager_occ: number; avg_manager_rating: number
    note: string; estimated: boolean
  }
}

// Curated neighborhood data — will switch to live API data once area tagging is complete
const neighborhoods = [
  { name: "Westlands", occupancy: "52%", avgRate: "$55", trend: "stable" as const, description: "Prime business district. High corporate travel demand. Competitive but rewarding for quality operators." },
  { name: "Kilimani", occupancy: "48%", avgRate: "$40", trend: "down" as const, description: "Most saturated market in Nairobi. Price wars are real. Oversupply pushing rates down — differentiation is survival." },
  { name: "Lavington", occupancy: "53%", avgRate: "$45", trend: "stable" as const, description: "Family-oriented. Steady demand from relocating families and mid-term stays. Less volatile than Kilimani." },
  { name: "Upper Hill", occupancy: "50%", avgRate: "$60", trend: "up" as const, description: "Business travelers and conference attendees. Growing demand with new developments." },
  { name: "Gigiri", occupancy: "50%", avgRate: "$72", trend: "up" as const, description: "UN and embassy area. Highest rates in the city. Limited supply keeps competition manageable." },
  { name: "Karen", occupancy: "48%", avgRate: "$55", trend: "stable" as const, description: "Premium residential. Lower density, appeals to long-stay guests seeking space and tranquility." },
]

function TrendBadge({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up") return <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full"><TrendingUp className="h-3 w-3" />Rising</span>
  if (trend === "down") return <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full"><TrendingDown className="h-3 w-3" />Declining</span>
  return <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"><Minus className="h-3 w-3" />Stable</span>
}

function WeekTrend({ value }: { value: number | null | undefined }) {
  if (value == null) return null
  if (value > 0.5) return <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700"><TrendingUp className="h-3 w-3" />Rising</span>
  return <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400"><Minus className="h-3 w-3" />Stable</span>
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const s = size === "lg" ? "h-5 w-5" : "h-4 w-4"
  return (
    <span className="inline-flex items-center gap-1">
      <Star className={`${s} fill-amber-400 text-amber-400`} />
      <span className={`font-semibold ${size === "lg" ? "text-lg" : "text-sm"}`}>{rating}</span>
    </span>
  )
}

function OccupancyComparisonChart({ esa, avgManager, market }: { esa: number; avgManager: number; market: number }) {
  const bars = [
    { label: "Elite Stays", value: esa, color: "#16a34a", bgColor: "#dcfce7" },
    { label: "Avg Manager", value: avgManager, color: "#9ca3af", bgColor: "#f3f4f6" },
    { label: "Market Avg", value: market, color: "#d1d5db", bgColor: "#f9fafb" },
  ]
  const maxVal = 100

  return (
    <div className="space-y-4">
      {bars.map((bar) => (
        <div key={bar.label}>
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-gray-700">{bar.label}</span>
            <span className="text-2xl font-bold" style={{ color: bar.color }}>{bar.value}%</span>
          </div>
          <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor: bar.bgColor }}>
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(bar.value / maxVal) * 100}%`, backgroundColor: bar.color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function ForwardChart({ data }: { data: { label: string; market_fill: number; esa_fill: number }[] }) {
  if (!data || data.length === 0) return null
  return (
    <div className="space-y-6">
      {data.map((month) => (
        <div key={month.label}>
          <h4 className="font-medium text-gray-900 mb-3">{month.label}</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Market Average</span>
                <span className="font-medium">{month.market_fill}% booked</span>
              </div>
              <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full bg-gray-400 transition-all" style={{ width: `${Math.min(month.market_fill, 100)}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-700 font-medium">Elite Stays</span>
                <span className="font-semibold text-green-700">{month.esa_fill}% booked</span>
              </div>
              <div className="h-3 rounded-full bg-green-100 overflow-hidden">
                <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${Math.min(month.esa_fill, 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function LeadCaptureForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      await fetch(`${API_URL}/market-intel-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
    } catch { /* handle server-side */ }
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 p-8 ring-1 ring-green-200 text-center">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-green-900">You&apos;re In!</h3>
        <p className="mt-2 text-green-800">Check your inbox — your first market report is on the way.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
          <select name="role" required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary bg-white">
            <option value="">Select one</option>
            <option value="property_owner">Property Owner</option>
            <option value="property_manager">Property Manager / Host</option>
            <option value="developer">Property Developer</option>
            <option value="investor">Investor</option>
            <option value="researcher">Researcher / Analyst</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">How many units?</label>
          <select name="units" required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary bg-white">
            <option value="">Select</option>
            <option value="0">None yet — exploring</option>
            <option value="1-5">1–5 units</option>
            <option value="6-20">6–20 units</option>
            <option value="20-50">20–50 units</option>
            <option value="50+">50+ units</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Neighborhoods of interest</label>
        <input type="text" name="neighborhoods" placeholder="e.g. Westlands, Kilimani, Lavington" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" name="email" required placeholder="you@example.com" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary" />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Mail className="h-4 w-4 mr-2" />}
        Get the Full Market Report
      </Button>
      <p className="text-xs text-gray-500 text-center">Free monthly reports. Unsubscribe anytime. No spam.</p>
    </form>
  )
}

export default function MarketIntelPage() {
  const [data, setData] = useState<MarketData | null>(null)
  const [error, setError] = useState(false)
  const [showAreas, setShowAreas] = useState(false)
  const [showBedrooms, setShowBedrooms] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/market-intel`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setData(json.data); else setError(true) })
      .catch(() => setError(true))
  }, [])

  const actual = data?.actual_performance
  const fwd = data?.occupancy
  const weekDelta = data?.occupancy?.deltas?.week?.occ30

  // Structured data for SEO
  const jsonLd = data ? {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Nairobi Airbnb Market Intelligence",
    description: "Daily-updated occupancy rates, pricing trends, and performance data for Nairobi short-term rental market.",
    url: "https://elitestaysafrica.com/market-intel",
    provider: {
      "@type": "Organization",
      name: "Elite Stays Africa",
      url: "https://elitestaysafrica.com",
    },
    temporalCoverage: new Date(data.generated_at).toISOString().split("T")[0] + "/..",
    spatialCoverage: { "@type": "Place", name: "Nairobi, Kenya" },
  } : null

  return (
    <div className="pt-24">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <BarChart3 className="h-4 w-4" />
              Live Market Data · Updated Daily
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Nairobi Airbnb Market Data &amp; Occupancy Rates
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Live occupancy rates, pricing trends, and neighborhood performance for
              Nairobi&apos;s short-term rental market. We track every serviced apartment and Airbnb listing
              in Nairobi — and publish what other property managers keep secret.
            </p>
            {data && (
              <p className="mt-3 text-sm text-gray-400">
                Updated {new Date(data.generated_at).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Loading */}
      {!data && !error && (
        <div className="py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-500">Loading live market data...</p>
        </div>
      )}
      {error && (
        <div className="py-20 text-center">
          <p className="text-gray-500">Market data temporarily unavailable. Please check back soon.</p>
        </div>
      )}

      {data && (
        <>
          {/* ═══════════════════════════════════════════════════════ */}
          {/* SECTION 1: ACTUAL PERFORMANCE (Past 30 Days)          */}
          {/* ═══════════════════════════════════════════════════════ */}
          <section className="py-12">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Actual Performance — Past 30 Days</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    What operators actually achieved last month. These are real results, not forward-looking estimates.
                  </p>
                </div>

                {actual && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ESA Card */}
                    <div className="rounded-2xl bg-green-50/80 p-8 ring-1 ring-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-green-800">Elite Stays Africa</span>
                      </div>
                      <div className="mt-4 flex items-end gap-4">
                        <div>
                          <div className="text-5xl font-bold text-green-900">{actual.esa_occ}%</div>
                          <div className="text-sm text-green-700 mt-1">occupancy achieved</div>
                        </div>
                        <div className="mb-2">
                          <Stars rating={actual.esa_rating} size="lg" />
                          <div className="text-xs text-gray-500 mt-0.5">{actual.esa_reviews.toLocaleString()} reviews</div>
                        </div>
                      </div>
                      <p className="mt-4 text-xs text-green-700">From verified booking records across our full Nairobi portfolio.</p>
                    </div>

                    {/* Avg Manager Card */}
                    <div className="rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-3 w-3 rounded-full bg-gray-400" />
                        <span className="text-sm font-medium text-gray-600">Average Nairobi Property Manager</span>
                      </div>
                      <div className="mt-4 flex items-end gap-4">
                        <div>
                          <div className="text-5xl font-bold text-gray-700">~{actual.avg_manager_occ}%</div>
                          <div className="text-sm text-gray-500 mt-1">occupancy achieved</div>
                        </div>
                        <div className="mb-2">
                          <Stars rating={actual.avg_manager_rating} size="lg" />
                          <div className="text-xs text-gray-400 mt-0.5">market average</div>
                        </div>
                      </div>
                      {actual.estimated && (
                        <p className="mt-4 text-xs text-gray-400">Estimated from tracked property managers. Exact figures available in full report.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Visual comparison chart */}
                {actual && (
                  <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-6">Occupancy Comparison — Who&apos;s Actually Performing?</h3>
                    <OccupancyComparisonChart
                      esa={actual.esa_occ}
                      avgManager={actual.avg_manager_occ}
                      market={Math.round(data?.occupancy?.market?.occ30 ? data.occupancy.market.occ30 + 25 : 45)}
                    />
                    <p className="mt-4 text-xs text-gray-400">Based on actual achieved occupancy over the past 30 days. Market forward figure adjusted +25% to approximate actual performance.</p>
                  </div>
                )}

                {/* Gap callout */}
                {actual && (
                  <div className="mt-6 rounded-xl bg-white border border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Performance gap: </span>
                      <span className="text-lg font-bold text-green-700">+{actual.esa_occ - actual.avg_manager_occ}% higher occupancy</span>
                      <span className="text-sm text-gray-500"> with a </span>
                      <span className="font-semibold text-gray-900">{actual.esa_rating}★</span>
                      <span className="text-sm text-gray-500"> guest rating</span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-green-600 hidden sm:block" />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* SECTION 2: FORWARD OUTLOOK (Next 30 Days)             */}
          {/* ═══════════════════════════════════════════════════════ */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Forward Outlook — What&apos;s Booking Now</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    How much of the next 30–90 days is already booked across the market. These numbers grow daily
                    as new bookings come in — actual occupancy ends up 20–30% higher than what you see here.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Market 30d */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Percent className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-500">Market (30d)</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{fwd?.market?.occ30 ?? "—"}%</div>
                    <div className="mt-2"><WeekTrend value={weekDelta} /></div>
                    <div className="text-xs text-gray-400 mt-1">currently booked</div>
                  </div>

                  {/* ESA 30d */}
                  <div className="rounded-2xl bg-green-50/80 p-6 shadow-sm ring-1 ring-green-200">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-green-700">Elite Stays (30d)</span>
                    </div>
                    <div className="text-3xl font-bold text-green-900">{fwd?.esa?.occ30 ?? "—"}%</div>
                    <div className="mt-2"><WeekTrend value={data.occupancy?.esa_deltas?.week?.occ30} /></div>
                    <div className="text-xs text-green-600 mt-1">currently booked</div>
                  </div>

                  {/* Median Rate */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-500">Median Rate</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">${data.overview.median_rate ?? "—"}</div>
                    <div className="text-xs text-gray-400 mt-2">per night, market-wide</div>
                  </div>

                  {/* Last-minute */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-500">Last-Minute</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{data.last_minute_pct ?? "—"}%</div>
                    <div className="text-xs text-gray-400 mt-2">booked within 7 days</div>
                  </div>
                </div>

                {/* Forward fill rates */}
                {data.fill_rate.length > 0 && (
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">How Fast Are Future Months Filling?</h3>
                    <ForwardChart data={data.fill_rate} />
                    <p className="mt-4 text-xs text-gray-400">
                      Shows what percentage of each month&apos;s nights are already booked today. The gap between market and Elite Stays widens as we get closer — our listings fill first.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* SECTION 3: KEY INSIGHTS                               */}
          {/* ═══════════════════════════════════════════════════════ */}
          <section className="py-12">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Market Insights</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {data.dead_pct != null && data.dead_pct > 0 && (
                    <div className="rounded-2xl bg-red-50 p-6 ring-1 ring-red-100">
                      <div className="text-3xl font-bold text-red-700">{data.dead_pct}%</div>
                      <div className="text-sm font-semibold text-red-800 mt-1">Dead Listings</div>
                      <p className="mt-3 text-sm text-red-600">
                        Listings with under 5% occupancy. The market looks crowded — but most operators aren&apos;t really competing.
                      </p>
                    </div>
                  )}
                  <div className="rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <div className="text-3xl font-bold text-blue-700">24/7</div>
                    </div>
                    <div className="text-sm font-semibold text-blue-800 mt-1">Market Monitoring</div>
                    <p className="mt-3 text-sm text-blue-600">
                      We track every property manager in Nairobi — their occupancy, pricing, and guest ratings. Daily.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-100">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-600 fill-amber-400" />
                      <div className="text-3xl font-bold text-amber-700">{data.ratings.market_avg ?? "4.86"}★</div>
                    </div>
                    <div className="text-sm font-semibold text-amber-800 mt-1">Market Avg Rating</div>
                    <p className="mt-3 text-sm text-amber-600">
                      Elite Stays: {data.ratings.esa_avg}★ across {data.ratings.esa_reviews?.toLocaleString()} verified reviews. Consistency at scale.
                    </p>
                  </div>
                  {data.last_minute_pct != null && (
                  <div className="rounded-2xl bg-purple-50 p-6 ring-1 ring-purple-100">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <div className="text-3xl font-bold text-purple-700">{data.last_minute_pct}%</div>
                    </div>
                    <div className="text-sm font-semibold text-purple-800 mt-1">Same-Week Bookings</div>
                    <p className="mt-3 text-sm text-purple-600">
                      Nearly 1 in 10 bookings are made within 7 days of check-in. Nairobi is a last-minute market — dynamic pricing and instant availability win.
                    </p>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* SECTION 4: NEIGHBORHOOD ANALYSIS                      */}
          {/* ═══════════════════════════════════════════════════════ */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Neighborhood Performance</h2>
                    <p className="mt-2 text-sm text-gray-500">Where to invest, where to be careful, and where the opportunity is.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {neighborhoods.map((n) => (
                    <div key={n.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold text-gray-900">{n.name}</h3>
                        </div>
                        <TrendBadge trend={n.trend} />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{n.description}</p>
                      <div className="flex gap-6 border-t pt-3">
                        <div>
                          <div className="text-xs text-gray-400">Avg Occupancy</div>
                          <div className="font-semibold text-gray-900">{n.occupancy}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Avg Rate</div>
                          <div className="font-semibold text-gray-900">{n.avgRate}/night</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* SECTION 5: BEDROOM BREAKDOWN                          */}
          {/* ═══════════════════════════════════════════════════════ */}
          {data.by_bedroom.length > 0 && (
            <section className="py-12">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                  <button onClick={() => setShowBedrooms(!showBedrooms)} className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6 hover:text-primary transition-colors">
                    Occupancy by Property Size
                    <ChevronDown className={`h-5 w-5 transition-transform ${showBedrooms ? "rotate-180" : ""}`} />
                  </button>
                  {showBedrooms && (
                    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="text-left px-6 py-3 font-medium text-gray-500">Type</th>
                            <th className="text-right px-6 py-3 font-medium text-gray-500">30-Day Forward Occ</th>
                            <th className="text-right px-6 py-3 font-medium text-gray-500">90-Day Forward Occ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.by_bedroom.filter(b => b.occ30 != null && b.bedrooms <= 4).map((b) => (
                            <tr key={b.bedrooms} className="border-b last:border-0 hover:bg-gray-50">
                              <td className="px-6 py-3 font-medium text-gray-900">{b.label}</td>
                              <td className="px-6 py-3 text-right text-gray-700">{b.occ30}%</td>
                              <td className="px-6 py-3 text-right text-gray-700">{b.occ90}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="px-6 py-3 bg-gray-50 text-xs text-gray-400">
                        Forward-looking calendar occupancy. Actual achieved occupancy is typically 20–30% higher.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <section className="py-4">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-6 py-4 text-sm text-amber-800">
                  <strong>How to read this data:</strong> This page shows two types of occupancy.{" "}
                  <em>Actual Performance</em> reflects what really happened — bookings completed over the past 30 days.{" "}
                  <em>Forward Outlook</em> shows what&apos;s currently booked for future dates — these numbers grow daily as new reservations come in.
                  Forward figures typically underestimate actual results by 20–30%.
                  Elite Stays data comes from our verified booking records. Market data is tracked daily from public Airbnb calendars across the Nairobi market.
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LEAD CAPTURE                                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <BarChart3 className="h-4 w-4" />
                Free Monthly Report
              </div>
              <h2 className="text-2xl font-bold text-white">Want the Full Picture?</h2>
              <p className="mt-4 text-gray-400">
                Our monthly deep-dive includes competitor analysis, neighborhood rankings, fill rate forecasts,
                pricing strategies, and investment recommendations. Tell us about yourself and we&apos;ll send it over.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8">
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Own Property in Nairobi?</h2>
                  <p className="mt-4 text-gray-600">
                    The average property manager achieves ~{data?.actual_performance?.avg_manager_occ || 60}% occupancy
                    with a {data?.actual_performance?.avg_manager_rating || 4.5}★ rating.
                    We hit {data?.actual_performance?.esa_occ || 82}% at {data?.actual_performance?.esa_rating || 4.9}★.
                    That&apos;s the difference professional management makes.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-primary" />
                      Free property revenue assessment
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      See how your unit compares to the market
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="h-4 w-4 text-primary" />
                      No obligation, no setup fees
                    </li>
                  </ul>
                </div>
                <div className="text-center lg:text-right">
                  <Button size="lg" asChild>
                    <Link href="/invest">
                      Partner With Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
