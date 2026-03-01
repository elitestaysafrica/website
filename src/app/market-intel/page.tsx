"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  MapPin,
  ArrowRight,
  Building2,
  Percent,
  DollarSign,
  Calendar,
  Users,
  Target,
  Clock,
  ChevronDown,
  Mail,
  Loader2,
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
  overview: {
    median_rate: number | null
    total_listings: number
  }
  gap_vs_market: number | null
  competitors_tracked: number | null
  dead_pct: number | null
  last_minute_pct: number | null
  fill_rate: { label: string; market_fill: number; esa_fill: number }[]
  by_area: { name: string; occ30: number | null; occ90: number | null }[]
  by_bedroom: { bedrooms: number; label: string; occ30: number | null; occ90: number | null }[]
  timeline: { date: string; market_occ30: number; esa_occ30: number }[]
  avg_manager_occ: { occ30: number; estimated: boolean }
}

function Delta({ value, suffix = "pp", size = "sm" }: { value: number | null | undefined; suffix?: string; size?: "sm" | "xs" }) {
  if (value == null) return null
  const isPositive = value > 0
  const Icon = isPositive ? TrendingUp : TrendingDown
  const color = isPositive ? "text-green-600" : value < 0 ? "text-red-500" : "text-gray-400"
  const textSize = size === "xs" ? "text-xs" : "text-sm"
  return (
    <span className={`inline-flex items-center gap-1 ${color} ${textSize} font-medium`}>
      <Icon className="h-3 w-3" />
      {isPositive ? "+" : ""}{value}{suffix}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, subtext, accent, className }: {
  icon: React.ElementType
  label: string
  value: string | React.ReactNode
  subtext?: React.ReactNode
  accent?: "green" | "amber" | "blue"
  className?: string
}) {
  const accentColors = {
    green: "ring-green-200 bg-green-50/50",
    amber: "ring-amber-200 bg-amber-50/50",
    blue: "ring-blue-200 bg-blue-50/50",
  }
  return (
    <div className={`rounded-2xl p-6 shadow-sm ring-1 ${accent ? accentColors[accent] : "ring-gray-200 bg-white"} ${className || ""}`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent === "green" ? "bg-green-100" : "bg-primary/10"}`}>
          <Icon className={`h-5 w-5 ${accent === "green" ? "text-green-700" : "text-primary"}`} />
        </div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
      <div className="mt-4 text-3xl font-bold text-gray-900">{value}</div>
      {subtext && <div className="mt-1">{subtext}</div>}
    </div>
  )
}

function MiniChart({ data }: { data: { date: string; market_occ30: number; esa_occ30: number }[] }) {
  if (!data || data.length < 2) return null

  const width = 600
  const height = 200
  const padding = { top: 20, right: 20, bottom: 30, left: 40 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom

  const allValues = data.flatMap((d) => [d.market_occ30, d.esa_occ30].filter(Boolean))
  const minY = Math.max(0, Math.min(...allValues) - 5)
  const maxY = Math.max(...allValues) + 5

  const xScale = (i: number) => padding.left + (i / (data.length - 1)) * innerW
  const yScale = (v: number) => padding.top + innerH - ((v - minY) / (maxY - minY)) * innerH

  const makePath = (key: "market_occ30" | "esa_occ30") =>
    data
      .map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d[key] || 0)}`)
      .join(" ")

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
        const y = padding.top + innerH * (1 - pct)
        const val = Math.round(minY + (maxY - minY) * pct)
        return (
          <g key={pct}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#e5e7eb" strokeDasharray="4 4" />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fill="#9ca3af" fontSize="11">{val}%</text>
          </g>
        )
      })}
      {/* Market line */}
      <path d={makePath("market_occ30")} fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
      {/* ESA line */}
      <path d={makePath("esa_occ30")} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
      {/* Date labels */}
      {data.filter((_, i) => i === 0 || i === data.length - 1 || i === Math.floor(data.length / 2)).map((d, _, arr) => {
        const idx = data.indexOf(d)
        return (
          <text key={d.date} x={xScale(idx)} y={height - 5} textAnchor="middle" fill="#9ca3af" fontSize="10">
            {new Date(d.date + "T00:00:00").toLocaleDateString("en", { month: "short", day: "numeric" })}
          </text>
        )
      })}
      {/* Legend */}
      <circle cx={width - 150} cy={12} r={4} fill="#9ca3af" />
      <text x={width - 142} y={16} fill="#9ca3af" fontSize="11">Market</text>
      <circle cx={width - 80} cy={12} r={4} fill="#16a34a" />
      <text x={width - 72} y={16} fill="#16a34a" fontSize="11">Elite Stays</text>
    </svg>
  )
}

function LeadCaptureForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      await fetch(`${API_URL}/market-intel-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      })
    } catch {
      // Still show success — we'll handle failures server-side
    }
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
          <select name="units" required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary bg-white">
            <option value="">How many?</option>
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
        Get Full Market Report
      </Button>
      <p className="text-xs text-gray-500 text-center">Free monthly reports. No spam. Unsubscribe anytime.</p>
    </form>
  )
}

export default function MarketIntelPage() {
  const [data, setData] = useState<MarketData | null>(null)
  const [error, setError] = useState(false)
  const [showBedroomDetails, setShowBedroomDetails] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/market-intel`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setData(json.data); else setError(true) })
      .catch(() => setError(true))
  }, [])

  const mktOcc = data?.occupancy?.market?.occ30
  const esaOcc = data?.occupancy?.esa?.occ30
  const gap = data?.gap_vs_market
  const avgMgr = data?.avg_manager_occ
  const weekDelta = data?.occupancy?.deltas?.week?.occ30

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <BarChart3 className="h-4 w-4" />
              Live Market Data
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Nairobi Airbnb Market Intelligence
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              We track every short-term rental listing in Nairobi and publish what other operators keep secret.
              Real data, updated daily.
            </p>
            {data && (
              <p className="mt-2 text-sm text-gray-400">
                Last updated: {new Date(data.generated_at).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}
                {" · "}{data.overview.total_listings.toLocaleString()} listings tracked
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Loading / Error State */}
      {!data && !error && (
        <div className="py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-500">Loading market data...</p>
        </div>
      )}
      {error && (
        <div className="py-20 text-center">
          <p className="text-gray-500">Market data temporarily unavailable. Check back soon.</p>
        </div>
      )}

      {data && (
        <>
          {/* Performance Comparison — The Headline */}
          <section className="py-12">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">How Does Your Property Compare?</h2>
                <p className="text-gray-500 mb-8 text-sm">
                  Forward-looking calendar occupancy for the next 30 days. Actual achieved occupancy is typically 20–30% higher due to last-minute bookings.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    icon={Percent}
                    label="Market Average"
                    value={mktOcc != null ? `${mktOcc}%` : "—"}
                    subtext={
                      <div className="flex items-center gap-3">
                        <Delta value={weekDelta} suffix="pp 7d" />
                        <span className="text-xs text-gray-400">forward 30d</span>
                      </div>
                    }
                  />
                  <StatCard
                    icon={Users}
                    label="Avg Property Manager"
                    value={avgMgr ? `~${avgMgr.occ30}%` : "—"}
                    subtext={
                      <span className="text-xs text-gray-400">
                        {avgMgr?.estimated ? "Estimated from market data" : "Based on tracked managers"}
                      </span>
                    }
                  />
                  <StatCard
                    icon={TrendingUp}
                    label="Elite Stays Portfolio"
                    value={esaOcc != null ? `${esaOcc}%` : "—"}
                    accent="green"
                    subtext={
                      gap != null ? (
                        <span className="text-sm font-semibold text-green-700">+{gap}pp above market</span>
                      ) : undefined
                    }
                  />
                  <StatCard
                    icon={DollarSign}
                    label="Median Nightly Rate"
                    value={data.overview.median_rate ? `$${data.overview.median_rate}` : "—"}
                    subtext={<span className="text-xs text-gray-400">Nairobi market-wide</span>}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Trend Chart */}
          {data.timeline.length > 2 && (
            <section className="py-8">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">30-Day Occupancy Trend</h3>
                    <MiniChart data={data.timeline} />
                    <p className="mt-3 text-xs text-gray-400 text-center">
                      Forward-looking calendar occupancy. Shows what percentage of the next 30 nights are booked at each snapshot.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Key Insights */}
          <section className="py-8">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.dead_pct != null && data.dead_pct > 0 && (
                  <div className="rounded-2xl bg-red-50 p-5 ring-1 ring-red-100">
                    <div className="text-2xl font-bold text-red-700">{data.dead_pct}%</div>
                    <div className="text-sm font-medium text-red-800 mt-1">Dead Listings</div>
                    <p className="mt-2 text-xs text-red-600">
                      Listings with less than 5% occupancy. The market is crowded — but most operators aren&apos;t competing effectively.
                    </p>
                  </div>
                )}
                {data.last_minute_pct != null && (
                  <div className="rounded-2xl bg-blue-50 p-5 ring-1 ring-blue-100">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div className="text-2xl font-bold text-blue-700">{data.last_minute_pct}%</div>
                    </div>
                    <div className="text-sm font-medium text-blue-800 mt-1">Last-Minute Bookings</div>
                    <p className="mt-2 text-xs text-blue-600">
                      Bookings made within 14 days of check-in. Nairobi is a last-minute market — dynamic pricing matters.
                    </p>
                  </div>
                )}
                {data.competitors_tracked && (
                  <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-amber-600" />
                      <div className="text-2xl font-bold text-amber-700">{data.competitors_tracked}</div>
                    </div>
                    <div className="text-sm font-medium text-amber-800 mt-1">Property Managers Tracked</div>
                    <p className="mt-2 text-xs text-amber-600">
                      We monitor every multi-listing host in Nairobi. We know who&apos;s performing and who&apos;s not.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Forward Fill Rate */}
          {data.fill_rate.length > 0 && (
            <section className="py-8">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Forward Booking Rate</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {data.fill_rate.map((month) => (
                      <div key={month.label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <h3 className="font-semibold text-gray-900">{month.label}</h3>
                        <div className="mt-4 space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-500">Market</span>
                              <span className="font-medium">{month.market_fill}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                              <div className="h-full rounded-full bg-gray-400" style={{ width: `${Math.min(month.market_fill, 100)}%` }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-green-700">Elite Stays</span>
                              <span className="font-medium text-green-700">{month.esa_fill}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-green-100 overflow-hidden">
                              <div className="h-full rounded-full bg-green-500" style={{ width: `${Math.min(month.esa_fill, 100)}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Bedroom Breakdown */}
          {data.by_bedroom.length > 0 && (
            <section className="py-8">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                  <button onClick={() => setShowBedroomDetails(!showBedroomDetails)} className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6 hover:text-primary transition-colors">
                    Occupancy by Property Size
                    <ChevronDown className={`h-5 w-5 transition-transform ${showBedroomDetails ? "rotate-180" : ""}`} />
                  </button>
                  {showBedroomDetails && (
                    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="text-left px-6 py-3 font-medium text-gray-500">Type</th>
                            <th className="text-right px-6 py-3 font-medium text-gray-500">30-Day Occ</th>
                            <th className="text-right px-6 py-3 font-medium text-gray-500">90-Day Occ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.by_bedroom.filter(b => b.occ30 != null).map((b) => (
                            <tr key={b.bedrooms} className="border-b last:border-0 hover:bg-gray-50">
                              <td className="px-6 py-3 font-medium text-gray-900">{b.label}</td>
                              <td className="px-6 py-3 text-right text-gray-700">{b.occ30 != null ? `${b.occ30}%` : "—"}</td>
                              <td className="px-6 py-3 text-right text-gray-700">{b.occ90 != null ? `${b.occ90}%` : "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Disclaimer Banner */}
          <section className="py-4">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-6 py-4 text-sm text-amber-800">
                  <strong>Understanding the numbers:</strong> All occupancy figures shown are forward-looking — they reflect what percentage of future nights are currently booked.
                  Actual achieved occupancy is typically 20–30% higher due to last-minute bookings. Elite Stays data is calculated from our live booking records.
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Lead Capture — Full Report */}
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
                Get our monthly deep-dive report — competitor landscape, neighborhood analysis, fill rate forecasts,
                pricing insights, and investment recommendations. Free.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8">
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Property Owners */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Own Property in Nairobi?</h2>
                  <p className="mt-4 text-gray-600">
                    The average property manager achieves ~{avgMgr?.occ30 || 58}% occupancy.
                    Our portfolio sits at {esaOcc || 54}%. That gap is money left on the table.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-primary" />
                      Free property revenue assessment
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      See how your unit compares to market
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
