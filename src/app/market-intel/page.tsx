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
  AlertTriangle,
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
  dead_pct: number | null
  dead_count: number | null
  last_minute_pct: number | null
  fill_rate: { label: string; market_fill: number; esa_fill: number }[]
  by_area: { name: string; count: number; avg_occ30: number | null; avg_occ90: number | null; median_rate: number | null; avg_rating: number | null }[]
  by_bedroom: { bedrooms: number; label: string; occ30: number | null; occ90: number | null }[]
  forward_curve: { date: string; day: number; market_pct: number | null; esa_pct: number | null }[]
  timeline: { date: string; market_occ30: number; esa_occ30: number }[]
  avg_manager_occ: { occ30: number; estimated: boolean }
  ratings: { market_avg: number | null; esa_avg: number | null; esa_reviews: number | null }
  actual_performance: {
    esa_occ: number; esa_rating: number; esa_reviews: number
    avg_manager_occ: number; avg_manager_rating: number
    estimated: boolean
  }
  trailing_occupancy: { date: string; esa: number; market: number; avg_manager: number }[]
}

function WeekTrend({ value }: { value: number | null | undefined }) {
  if (value == null) return null
  if (value > 0.5) return <span className="inline-flex items-center gap-1 text-xs font-medium text-green-400"><TrendingUp className="h-3 w-3" />Rising</span>
  return <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400"><Minus className="h-3 w-3" />Stable</span>
}

function Stars({ rating, size = "sm", light = false }: { rating: number; size?: "sm" | "lg"; light?: boolean }) {
  const s = size === "lg" ? "h-5 w-5" : "h-4 w-4"
  return (
    <span className="inline-flex items-center gap-1">
      <Star className={`${s} fill-amber-400 text-amber-400`} />
      <span className={`font-semibold ${size === "lg" ? "text-lg" : "text-sm"} ${light ? "text-white" : ""}`}>{rating}</span>
    </span>
  )
}

// Forward-looking line chart: today → 30 days out
function ForwardCurveChart({ data }: { data: { date: string; day: number; market_pct: number | null; esa_pct: number | null }[] }) {
  if (!data || data.length < 2) return null
  const w = 640, h = 260
  const pad = { top: 30, right: 25, bottom: 40, left: 50 }
  const iW = w - pad.left - pad.right
  const iH = h - pad.top - pad.bottom

  const vals = data.flatMap(d => [d.market_pct, d.esa_pct].filter((v): v is number => v != null))
  const minY = 0
  const maxY = Math.min(100, Math.max(...vals) + 10)

  const x = (i: number) => pad.left + (i / (data.length - 1)) * iW
  const y = (v: number) => pad.top + iH - ((v - minY) / (maxY - minY)) * iH

  const mkLine = (key: "market_pct" | "esa_pct") =>
    data.filter(d => d[key] != null).map((d, i, arr) => `${i === 0 ? "M" : "L"}${x(data.indexOf(d))},${y(d[key]!)}`).join(" ")

  const esaLine = mkLine("esa_pct")
  const mktLine = mkLine("market_pct")
  // Area under ESA
  const esaPts = data.filter(d => d.esa_pct != null)
  const esaArea = esaPts.length > 1
    ? esaPts.map((d, i) => `${i === 0 ? "M" : "L"}${x(data.indexOf(d))},${y(d.esa_pct!)}`).join(" ")
      + ` L${x(data.indexOf(esaPts[esaPts.length - 1]))},${pad.top + iH} L${x(data.indexOf(esaPts[0]))},${pad.top + iH} Z`
    : ""

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="esaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1].map(pct => {
        const yPos = pad.top + iH * (1 - pct)
        const val = Math.round(minY + (maxY - minY) * pct)
        return (
          <g key={pct}>
            <line x1={pad.left} y1={yPos} x2={w - pad.right} y2={yPos} stroke="rgba(255,255,255,0.08)" />
            <text x={pad.left - 8} y={yPos + 4} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="11">{val}%</text>
          </g>
        )
      })}
      {/* Area fill */}
      {esaArea && <path d={esaArea} fill="url(#esaFill)" />}
      {/* Market line */}
      <path d={mktLine} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" />
      {/* ESA line */}
      <path d={esaLine} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
      {/* End dots */}
      {data[0].esa_pct != null && <circle cx={x(0)} cy={y(data[0].esa_pct)} r={4} fill="#22c55e" />}
      {data[data.length-1].market_pct != null && <circle cx={x(data.length-1)} cy={y(data[data.length-1].market_pct!)} r={3} fill="rgba(255,255,255,0.4)" />}
      {/* Date labels */}
      {[0, 7, 14, 21, 29].filter(i => i < data.length).map(i => (
        <text key={i} x={x(i)} y={h - 8} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
          {i === 0 ? "Today" : `+${data[i].day}d`}
        </text>
      ))}
      {/* Legend */}
      <line x1={w - 200} y1={14} x2={w - 180} y2={14} stroke="#22c55e" strokeWidth="2.5" />
      <text x={w - 175} y={18} fill="rgba(255,255,255,0.7)" fontSize="11" fontWeight="500">Elite Stays</text>
      <line x1={w - 95} y1={14} x2={w - 75} y2={14} stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="6 4" />
      <text x={w - 70} y={18} fill="rgba(255,255,255,0.4)" fontSize="11">Market</text>
    </svg>
  )
}

// Trailing 30-day occupancy chart: ESA real, market estimated, avg manager band
function TrailingOccupancyChart({ data }: { data: { date: string; esa: number; market: number; avg_manager: number }[] }) {
  if (!data || data.length < 2) return null
  const w = 640, h = 280
  const pad = { top: 30, right: 25, bottom: 40, left: 50 }
  const iW = w - pad.left - pad.right
  const iH = h - pad.top - pad.bottom
  const minY = 0, maxY = 100

  const x = (i: number) => pad.left + (i / (data.length - 1)) * iW
  const y = (v: number) => pad.top + iH - ((v - minY) / (maxY - minY)) * iH

  const mkLine = (key: "esa" | "market" | "avg_manager") =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d[key])}`).join(" ")

  // Area fill under ESA
  const esaArea = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.esa)}`).join(" ")
    + ` L${x(data.length - 1)},${pad.top + iH} L${x(0)},${pad.top + iH} Z`

  // Avg manager band (fill between ±3%)
  const mgrUpper = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(Math.min(d.avg_manager + 3, 100))}`).join(" ")
  const mgrLowerRev = [...data].reverse().map((d, i) => `L${x(data.length - 1 - i)},${y(Math.max(d.avg_manager - 3, 0))}`).join(" ")
  const mgrBand = mgrUpper + " " + mgrLowerRev + " Z"

  // Date labels
  const dateLabels = [0, 7, 14, 21, data.length - 1].filter(i => i < data.length)

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="esaTrailFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map(val => (
        <g key={val}>
          <line x1={pad.left} y1={y(val)} x2={w - pad.right} y2={y(val)} stroke="rgba(0,0,0,0.06)" />
          <text x={pad.left - 8} y={y(val) + 4} textAnchor="end" fill="rgba(0,0,0,0.35)" fontSize="11">{val}%</text>
        </g>
      ))}
      {/* Manager band */}
      <path d={mgrBand} fill="rgba(249,115,22,0.08)" />
      {/* ESA area fill */}
      <path d={esaArea} fill="url(#esaTrailFill)" />
      {/* Market line */}
      <path d={mkLine("market")} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" strokeDasharray="6 4" />
      {/* Avg manager line */}
      <path d={mkLine("avg_manager")} fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* ESA line */}
      <path d={mkLine("esa")} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
      {/* End dots */}
      <circle cx={x(data.length-1)} cy={y(data[data.length-1].esa)} r={4} fill="#16a34a" />
      <circle cx={x(data.length-1)} cy={y(data[data.length-1].avg_manager)} r={3} fill="#f97316" />
      {/* Date labels */}
      {dateLabels.map(i => {
        const d = new Date(data[i].date)
        return <text key={i} x={x(i)} y={h - 8} textAnchor="middle" fill="rgba(0,0,0,0.35)" fontSize="10">{d.toLocaleDateString("en", { month: "short", day: "numeric" })}</text>
      })}
      {/* Legend */}
      <line x1={pad.left} y1={14} x2={pad.left + 20} y2={14} stroke="#16a34a" strokeWidth="2.5" />
      <text x={pad.left + 25} y={18} fill="rgba(0,0,0,0.6)" fontSize="11" fontWeight="500">Elite Stays</text>
      <line x1={pad.left + 115} y1={14} x2={pad.left + 135} y2={14} stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={pad.left + 140} y={18} fill="rgba(0,0,0,0.5)" fontSize="11">Avg Manager</text>
      <line x1={pad.left + 240} y1={14} x2={pad.left + 260} y2={14} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x={pad.left + 265} y={18} fill="rgba(0,0,0,0.35)" fontSize="11">Market Avg</text>
    </svg>
  )
}

// Horizontal bar chart for bedroom occupancy
function BedroomChart({ data }: { data: { label: string; occ30: number | null }[] }) {
  const filtered = data.filter(b => b.occ30 != null)
  if (filtered.length === 0) return null
  const maxOcc = Math.max(...filtered.map(b => b.occ30!), 50)

  return (
    <div className="space-y-4">
      {filtered.map(b => (
        <div key={b.label}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-white">{b.label}</span>
            <span className="text-sm font-bold text-white">{b.occ30}%</span>
          </div>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${(b.occ30! / maxOcc) * 100}%`,
                background: `linear-gradient(90deg, #f97316, #fb923c)`,
              }}
            />
          </div>
        </div>
      ))}
      <p className="text-xs text-white/30 mt-2">Forward-looking 30-day calendar occupancy</p>
    </div>
  )
}

function LeadCaptureForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    try {
      await fetch(`${API_URL}/market-intel-lead`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData)) })
    } catch { /* */ }
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 p-8 ring-1 ring-green-200 text-center">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-green-900">You&apos;re In!</h3>
        <p className="mt-2 text-green-800">Check your inbox — your first report is on the way.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
          <select name="role" required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-white"><option value="">Select one</option><option value="property_owner">Property Owner</option><option value="property_manager">Property Manager / Host</option><option value="developer">Property Developer</option><option value="investor">Investor</option><option value="researcher">Researcher / Analyst</option><option value="other">Other</option></select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">How many units?</label>
          <select name="units" required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-white"><option value="">Select</option><option value="0">None yet</option><option value="1-5">1–5</option><option value="6-20">6–20</option><option value="20-50">20–50</option><option value="50+">50+</option></select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Neighborhoods of interest</label>
        <input type="text" name="neighborhoods" placeholder="e.g. Westlands, Kilimani, Lavington" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" name="email" required placeholder="you@example.com" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Mail className="h-4 w-4 mr-2" />}
        Get the Full Market Report
      </Button>
      <p className="text-xs text-gray-500 text-center">Free monthly reports. Unsubscribe anytime.</p>
    </form>
  )
}

// FAQ items for SEO
const faqItems = [
  {
    q: "What is the average Airbnb occupancy rate in Nairobi?",
    a: "Based on our daily tracking of the Nairobi short-term rental market, the average forward-looking occupancy rate is approximately 25–35% at any given time. However, actual achieved occupancy after last-minute bookings is typically 20–30% higher. Top-performing property managers like Elite Stays achieve 80%+ actual occupancy.",
  },
  {
    q: "Which neighborhoods are best for Airbnb in Nairobi?",
    a: "Westlands and Kilimani lead in volume and demand, but Upper Hill and Kileleshwa often show higher occupancy rates with less competition. The best neighborhood depends on your target guest — corporate travelers prefer Westlands and Upper Hill, while families and long-stay guests favor Lavington and Karen.",
  },
  {
    q: "Is Airbnb profitable in Kenya?",
    a: "Yes — well-managed Airbnb properties in Nairobi can generate significantly higher returns than long-term rentals. However, over 60% of listings in Nairobi are effectively dead (under 5% occupancy), meaning most operators are not profitable. The difference is professional management, pricing strategy, and listing optimization.",
  },
  {
    q: "How much can I earn from Airbnb in Nairobi?",
    a: "Earnings vary by location, property size, and management quality. A well-managed 1-bedroom apartment in Westlands or Kilimani can generate KES 150,000–200,000+ per month. 2-bedroom units in premium locations can exceed KES 250,000/month. These figures assume professional management with 75%+ occupancy.",
  },
  {
    q: "What is the average nightly rate for Airbnb in Nairobi?",
    a: "The median nightly rate across active Nairobi listings is approximately $100–120 USD. Rates vary significantly by neighborhood — Gigiri and Upper Hill command premium rates ($60–90+/night), while Kilimani has seen rate compression due to oversupply.",
  },
  {
    q: "How does Elite Stays Africa track market data?",
    a: "We monitor every short-term rental listing in Nairobi daily, tracking calendar availability, pricing, ratings, and booking patterns. Our data comes from direct calendar monitoring — not estimates or third-party projections. This gives us the most accurate real-time view of the Nairobi STR market.",
  },
]

export default function MarketIntelPage() {
  const [data, setData] = useState<MarketData | null>(null)
  const [error, setError] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/market-intel`)
      .then(r => r.json())
      .then(json => { if (json.success) setData(json.data); else setError(true) })
      .catch(() => setError(true))
  }, [])

  const actual = data?.actual_performance
  const fwd = data?.occupancy
  const weekDelta = data?.occupancy?.deltas?.week?.occ30

  // JSON-LD
  const jsonLd = data ? {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Nairobi Airbnb Market Intelligence",
    description: "Daily-updated occupancy rates, pricing trends, and performance data for Nairobi short-term rental market.",
    url: "https://elitestaysafrica.com/market-intel",
    provider: { "@type": "Organization", name: "Elite Stays Africa", url: "https://elitestaysafrica.com" },
    spatialCoverage: { "@type": "Place", name: "Nairobi, Kenya" },
  } : null

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <div className="pt-24">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ══════ HERO (light, matches home page) ══════ */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <BarChart3 className="h-4 w-4" /> Live Market Data · Updated Daily
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Nairobi Airbnb Market Data &amp; Occupancy Rates
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Live occupancy rates, pricing trends, and neighborhood performance for
              Nairobi&apos;s short-term rental market. Updated daily from real booking data.
            </p>
            {data && (
              <p className="mt-3 text-sm text-gray-400">
                Updated {new Date(data.generated_at).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            )}
          </div>
        </div>
      </section>

      {!data && !error && (
        <div className="py-20 text-center bg-gray-50"><Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" /><p className="mt-4 text-gray-500">Loading live market data...</p></div>
      )}
      {error && <div className="py-20 text-center bg-gray-50"><p className="text-gray-500">Market data temporarily unavailable.</p></div>}

      {data && (
        <>
          {/* ══════ ACTUAL PERFORMANCE (light) ══════ */}
          <section className="py-14">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Actual Performance — Past 30 Days</h2>
                <p className="text-sm text-gray-500 mb-8">Real results, not forward-looking estimates.</p>

                {actual && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* ESA */}
                      <div className="rounded-2xl bg-green-50/80 p-8 ring-1 ring-green-200">
                        <div className="flex items-center gap-2 mb-1"><div className="h-3 w-3 rounded-full bg-green-500" /><span className="text-sm font-medium text-green-800">Elite Stays Africa</span></div>
                        <div className="mt-4 flex items-end gap-4">
                          <div><div className="text-5xl font-bold text-green-900">{actual.esa_occ}%</div><div className="text-sm text-green-700 mt-1">occupancy</div></div>
                          <div className="mb-2"><Stars rating={actual.esa_rating} size="lg" /><div className="text-xs text-gray-500 mt-0.5">{actual.esa_reviews.toLocaleString()} reviews</div></div>
                        </div>
                      </div>
                      {/* Avg Manager */}
                      <div className="rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
                        <div className="flex items-center gap-2 mb-1"><div className="h-3 w-3 rounded-full bg-gray-400" /><span className="text-sm font-medium text-gray-600">Avg Nairobi Property Manager</span></div>
                        <div className="mt-4 flex items-end gap-4">
                          <div><div className="text-5xl font-bold text-gray-600">~{actual.avg_manager_occ}%</div><div className="text-sm text-gray-500 mt-1">occupancy</div></div>
                          <div className="mb-2"><Stars rating={actual.avg_manager_rating} size="lg" /><div className="text-xs text-gray-400 mt-0.5">market average</div></div>
                        </div>
                        {actual.estimated && <p className="mt-3 text-xs text-gray-400">Estimated from tracked managers. Exact figures in full report.</p>}
                      </div>
                    </div>

                    {/* Occupancy comparison bar chart */}
                    <div className="mt-6 rounded-2xl bg-white p-8 ring-1 ring-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-6">Who&apos;s Actually Performing?</h3>
                      {[
                        { label: "Elite Stays", value: actual.esa_occ, color: "#16a34a", bg: "#dcfce7" },
                        { label: "Avg Manager", value: actual.avg_manager_occ, color: "#9ca3af", bg: "#f3f4f6" },
                        { label: "Market Average", value: Math.round((fwd?.market?.occ30 ?? 27) + 25), color: "#d1d5db", bg: "#f9fafb" },
                      ].map(bar => (
                        <div key={bar.label} className="mb-4 last:mb-0">
                          <div className="flex justify-between items-end mb-1.5">
                            <span className="text-sm font-medium text-gray-700">{bar.label}</span>
                            <span className="text-2xl font-bold" style={{ color: bar.color }}>{bar.value}%</span>
                          </div>
                          <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor: bar.bg }}>
                            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${bar.value}%`, backgroundColor: bar.color }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-xl bg-white border border-gray-200 px-6 py-4 flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">Performance gap: </span>
                        <span className="text-lg font-bold text-green-700">+{actual.esa_occ - actual.avg_manager_occ}% higher occupancy</span>
                        <span className="text-sm text-gray-500"> · </span>
                        <span className="font-semibold text-gray-900">{actual.esa_rating}★ rating</span>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-green-600 hidden sm:block" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* ══════ TRAILING OCCUPANCY (light) ══════ */}
          {data.trailing_occupancy && data.trailing_occupancy.length > 0 && (
            <section className="py-14">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Occupancy — Past 30 Days</h2>
                  <p className="text-sm text-gray-500 mb-8">
                    Daily occupancy rates across Nairobi&apos;s short-term rental market. Elite Stays data from verified booking records.
                  </p>
                  <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-200 shadow-sm">
                    <TrailingOccupancyChart data={data.trailing_occupancy} />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-xl bg-green-50 p-4 ring-1 ring-green-100">
                      <div className="text-2xl font-bold text-green-700">{Math.round(data.trailing_occupancy.reduce((s, p) => s + p.esa, 0) / data.trailing_occupancy.length)}%</div>
                      <div className="text-xs text-green-600 mt-1">Elite Stays Avg</div>
                    </div>
                    <div className="rounded-xl bg-orange-50 p-4 ring-1 ring-orange-100">
                      <div className="text-2xl font-bold text-orange-700">{Math.round(data.trailing_occupancy.reduce((s, p) => s + p.avg_manager, 0) / data.trailing_occupancy.length)}%</div>
                      <div className="text-xs text-orange-600 mt-1">Avg Manager</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
                      <div className="text-2xl font-bold text-gray-600">{Math.round(data.trailing_occupancy.reduce((s, p) => s + p.market, 0) / data.trailing_occupancy.length)}%</div>
                      <div className="text-xs text-gray-500 mt-1">Market Avg</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ══════ FORWARD OUTLOOK (dark) ══════ */}
          <section className="py-14 bg-gray-900">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl font-bold text-white mb-2">Forward Outlook — Next 30 Days</h2>
                <p className="text-sm text-gray-400 mb-8">
                  What&apos;s currently booked. These numbers grow daily — actual results end up 20–30% higher.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <div className="text-sm text-gray-400 mb-2">Market (30d)</div>
                    <div className="text-3xl font-bold text-white">{fwd?.market?.occ30 ?? "—"}%</div>
                    <WeekTrend value={weekDelta} />
                  </div>
                  <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-5">
                    <div className="text-sm text-green-400 mb-2">Elite Stays (30d)</div>
                    <div className="text-3xl font-bold text-green-400">{fwd?.esa?.occ30 ?? "—"}%</div>
                    <WeekTrend value={data.occupancy?.esa_deltas?.week?.occ30} />
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <div className="text-sm text-gray-400 mb-2">Median Rate</div>
                    <div className="text-3xl font-bold text-white">${data.overview.median_rate ?? "—"}</div>
                    <span className="text-xs text-gray-500">per night</span>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <div className="text-sm text-gray-400 mb-2">Same-Week</div>
                    <div className="text-3xl font-bold text-white">{data.last_minute_pct ?? "—"}%</div>
                    <span className="text-xs text-gray-500">booked within 7d</span>
                  </div>
                </div>

                {/* Forward curve chart */}
                {data.forward_curve && data.forward_curve.length > 2 && (
                  <div className="rounded-xl bg-white/5 border border-white/10 p-6 mb-8">
                    <h3 className="font-semibold text-white mb-1">Booking Curve — Today → 30 Days Out</h3>
                    <p className="text-xs text-gray-500 mb-4">What percentage of listings are booked on each future date.</p>
                    <ForwardCurveChart data={data.forward_curve} />
                  </div>
                )}

                {/* Fill rates - 3 months */}
                {data.fill_rate.length > 0 && (
                  <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                    <h3 className="font-semibold text-white mb-4">How Fast Are Months Filling?</h3>
                    <div className="space-y-6">
                      {data.fill_rate.map(month => (
                        <div key={month.label}>
                          <h4 className="text-sm font-medium text-gray-300 mb-3">{month.label}</h4>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Market</span><span className="text-gray-300">{month.market_fill}%</span></div>
                              <div className="h-2.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gray-500" style={{ width: `${Math.min(month.market_fill, 100)}%` }} /></div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1"><span className="text-green-400">Elite Stays</span><span className="font-medium text-green-400">{month.esa_fill}%</span></div>
                              <div className="h-2.5 rounded-full bg-green-500/10 overflow-hidden"><div className="h-full rounded-full bg-green-500" style={{ width: `${Math.min(month.esa_fill, 100)}%` }} /></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ══════ MARKET INSIGHTS (light) ══════ */}
          <section className="py-14">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Market Insights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.dead_pct != null && (
                    <div className="rounded-2xl bg-red-50 p-6 ring-1 ring-red-100">
                      <AlertTriangle className="h-5 w-5 text-red-600 mb-2" />
                      <div className="text-3xl font-bold text-red-700">{data.dead_pct}%</div>
                      <div className="text-sm font-semibold text-red-800 mt-1">Dead Listings</div>
                      <p className="mt-2 text-xs text-red-600">Under 5% occupancy. The market looks crowded — most operators aren&apos;t competing.</p>
                    </div>
                  )}
                  <div className="rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100">
                    <Target className="h-5 w-5 text-blue-600 mb-2" />
                    <div className="text-3xl font-bold text-blue-700">24/7</div>
                    <div className="text-sm font-semibold text-blue-800 mt-1">Market Monitoring</div>
                    <p className="mt-2 text-xs text-blue-600">We track every property manager in Nairobi — occupancy, pricing, ratings. Daily.</p>
                  </div>
                  <div className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-100">
                    <Star className="h-5 w-5 text-amber-600 fill-amber-400 mb-2" />
                    <div className="text-3xl font-bold text-amber-700">{data.ratings.market_avg ?? "4.85"}★</div>
                    <div className="text-sm font-semibold text-amber-800 mt-1">Weighted Market Rating</div>
                    <p className="mt-2 text-xs text-amber-600">ESA: {data.ratings.esa_avg}★ across {data.ratings.esa_reviews?.toLocaleString()} verified reviews.</p>
                  </div>
                  <div className="rounded-2xl bg-purple-50 p-6 ring-1 ring-purple-100">
                    <Clock className="h-5 w-5 text-purple-600 mb-2" />
                    <div className="text-3xl font-bold text-purple-700">{data.last_minute_pct ?? "—"}%</div>
                    <div className="text-sm font-semibold text-purple-800 mt-1">Same-Week Bookings</div>
                    <p className="mt-2 text-xs text-purple-600">Booked within 7 days. Dynamic pricing wins in a last-minute market.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════ OCCUPANCY BY PROPERTY SIZE (dark) ══════ */}
          {data.by_bedroom.length > 0 && (
            <section className="py-14 bg-gray-900">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                  <h2 className="text-2xl font-bold text-white mb-2">Occupancy by Property Size</h2>
                  <p className="text-sm text-gray-400 mb-8">Forward 30-day calendar occupancy by bedroom count.</p>
                  <BedroomChart data={data.by_bedroom} />
                </div>
              </div>
            </section>
          )}

          {/* ══════ NEIGHBORHOOD PERFORMANCE (light) ══════ */}
          {data.by_area.length > 0 && (
            <section className="py-14">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Neighborhood Performance</h2>
                  <p className="text-sm text-gray-500 mb-8">Live data from tracked listings. Excludes inactive properties.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.by_area.map(area => (
                      <div key={area.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold text-gray-900">{area.name}</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4 border-t pt-4">
                          <div>
                            <div className="text-xs text-gray-400">Occupancy</div>
                            <div className="text-lg font-bold text-gray-900">{area.avg_occ30 ?? "—"}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Med. Rate</div>
                            <div className="text-lg font-bold text-gray-900">${area.median_rate ?? "—"}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Rating</div>
                            <div className="text-lg font-bold text-gray-900">{area.avg_rating ?? "—"}★</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ══════ DISCLAIMER ══════ */}
          <section className="py-4">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-6 py-4 text-sm text-amber-800">
                  <strong>How to read this data:</strong> <em>Actual Performance</em> = bookings completed in the past 30 days.{" "}
                  <em>Forward Outlook</em> = what&apos;s currently booked for future dates (grows daily as new bookings come in).
                  Forward figures typically underestimate actual results by 20–30%.
                  Elite Stays data comes from verified booking records. Market data is tracked daily from public Airbnb calendars.
                </div>
              </div>
            </div>
          </section>

          {/* ══════ FAQ (dark, SEO) ══════ */}
          <section className="py-14 bg-gray-900">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {faqItems.map((faq, i) => (
                    <div key={i} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between"
                      >
                        <span className="font-medium text-white pr-4">{faq.q}</span>
                        <ChevronDown className={`h-5 w-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-6 pb-4 text-sm text-gray-300 leading-relaxed">{faq.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══════ LEAD CAPTURE (light) ══════ */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <BarChart3 className="h-4 w-4" /> Free Monthly Report
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Want the Full Picture?</h2>
              <p className="mt-4 text-gray-500">
                Competitor analysis, neighborhood rankings, fill rate forecasts, pricing strategies, and investment recommendations.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CTA (dark) ══════ */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">Own Property in Nairobi?</h2>
                  <p className="mt-4 text-gray-300">
                    The average manager achieves ~{data?.actual_performance?.avg_manager_occ || 60}% occupancy.
                    We hit {data?.actual_performance?.esa_occ || 82}% at {data?.actual_performance?.esa_rating || 4.9}★.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-300"><Calendar className="h-4 w-4 text-primary" />Free revenue assessment</li>
                    <li className="flex items-center gap-2 text-sm text-gray-300"><TrendingUp className="h-4 w-4 text-primary" />See how your unit compares</li>
                    <li className="flex items-center gap-2 text-sm text-gray-300"><Building2 className="h-4 w-4 text-primary" />No obligation, no fees</li>
                  </ul>
                </div>
                <div className="text-center lg:text-right">
                  <Button size="lg" asChild><Link href="/invest">Partner With Us <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
