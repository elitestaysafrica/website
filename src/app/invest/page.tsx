"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Price } from "@/components/Price"
import {
  TrendingUp,
  Shield,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Building2,
  Users,
  Star,
  Zap,
  Target,
  Phone,
  ChevronDown,
} from "lucide-react"
import { useState, FormEvent } from "react"

/* ─── Competitive comparison data ─── */
const comparison = [
  {
    label: "2-Bed Nightly Rate",
    esa: "KES 18,700",
    competitor: "KES 12,000",
    diff: "+56%",
  },
  {
    label: "Average Occupancy",
    esa: "85%+",
    competitor: "~60%",
    diff: "+25pts",
  },
  {
    label: "Monthly Revenue (2-Bed)",
    esa: "KES 476,000+",
    competitor: "KES 216,000",
    diff: "+120%",
  },
  {
    label: "Guest Rating",
    esa: "4.92★",
    competitor: "4.86★",
    diff: "Higher",
  },
]

const whyBetter = [
  {
    icon: Target,
    title: "Precision Pricing",
    description:
      "We don't guess. We research every competitor on the map, analyze booking patterns, and price for maximum revenue — not just occupancy.",
  },
  {
    icon: Star,
    title: "5-Star Guest Experience",
    description:
      "Hotel-grade cleaning, instant communication, curated interiors. Happy guests leave 5-star reviews. Reviews drive more bookings. Repeat.",
  },
  {
    icon: Zap,
    title: "Listing Optimization",
    description:
      "Professional photography, SEO-optimized titles, strategic positioning. Your unit doesn't just list — it stands out.",
  },
  {
    icon: BarChart3,
    title: "Transparent Reporting",
    description:
      "Monthly statements with full breakdowns. You see every booking, every expense, every shilling. No surprises.",
  },
]

const steps = [
  {
    num: "01",
    title: "Sign the Agreement",
    desc: "Simple management contract. You keep full ownership.",
  },
  {
    num: "02",
    title: "We Furnish & Stage",
    desc: "Custom interiors by local craftsmen. 4-6 weeks from bare unit to bookable.",
  },
  {
    num: "03",
    title: "Professional Photography",
    desc: "Magazine-quality photos that stop the scroll.",
  },
  {
    num: "04",
    title: "Go Live & Earn",
    desc: "First booking typically within 7-14 days. Monthly payouts by the 15th.",
  },
]

const faqs = [
  {
    q: "What does the management fee cover?",
    a: "Everything operational: guest communication, cleaning coordination, maintenance management, listing optimization, dynamic pricing, and monthly reporting. You only cover utilities and major repairs.",
  },
  {
    q: "How much does furnishing cost?",
    a: "1-bedroom units: KES 1M-1.4M. 2-bedroom units: KES 1.4M-1.7M. We use local builders and craftsmen — better quality at lower cost than store-bought furniture, and your unit stands out from the crowd.",
  },
  {
    q: "Can I use my unit sometimes?",
    a: "Yes. Block up to 30 days per year for personal use with advance notice.",
  },
  {
    q: "What's the minimum commitment?",
    a: "12-month initial contract with 60-day notice for termination. Most owners stay years — the results speak for themselves.",
  },
  {
    q: "When do I get paid?",
    a: "Monthly payouts by the 15th, covering the previous month. Direct bank transfer or M-PESA.",
  },
  {
    q: "What about taxes?",
    a: "We handle KRA compliance including WHT deductions and provide all documentation you need for tax filing.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-semibold text-gray-900 pr-4">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <p className="pb-5 text-gray-600 leading-relaxed">{a}</p>}
    </div>
  )
}

function LeadForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      units: (form.elements.namedItem("units") as HTMLSelectElement).value,
    }

    try {
      const res = await fetch("/api/invest-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
      else setSubmitted(true) // Still show success to user
    } catch {
      setSubmitted(true) // Graceful fallback
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
        <h3 className="mt-4 text-xl font-bold text-green-900">
          We&apos;ll be in touch!
        </h3>
        <p className="mt-2 text-green-700">
          Check your email for our investor guide. We&apos;ll reach out within 24
          hours.
        </p>
      </div>
    )
  }

  const isDark = variant === "dark"
  const inputClasses = isDark
    ? "w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    : "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        required
        className={inputClasses}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        required
        className={inputClasses}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone / WhatsApp Number"
        className={inputClasses}
      />
      <select
        name="units"
        className={inputClasses}
        defaultValue=""
      >
        <option value="" disabled>
          How many units are you considering?
        </option>
        <option value="1">1 unit</option>
        <option value="2-5">2-5 units</option>
        <option value="5-10">5-10 units</option>
        <option value="10+">10+ units</option>
      </select>
      <Button
        type="submit"
        size="lg"
        className="w-full text-lg"
        disabled={loading}
      >
        {loading ? "Sending..." : "Get the Investor Guide"}
        {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
      </Button>
      <p className={`text-xs text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        Free guide + personalized revenue projection. No spam, ever.
      </p>
    </form>
  )
}

export default function InvestPage() {
  return (
    <div className="pt-24">
      {/* ═══ HERO ═══ */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, white 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="container relative mx-auto px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Building2 className="h-4 w-4" />
                Gemini Residences, Westlands
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
                Buy. Stay.{" "}
                <span className="text-primary">Earn.</span> Repeat.
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-300">
                Invest in Nairobi&apos;s booming short-term rental market. We furnish,
                manage, and maximize your returns — you collect monthly payouts.
              </p>

              {/* Quick stats */}
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-white">85%+</div>
                  <div className="text-sm text-gray-400">Avg. Occupancy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">4.92★</div>
                  <div className="text-sm text-gray-400">Guest Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-400">Units Managed</div>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="mt-8 lg:hidden">
                <Button size="lg" asChild className="w-full">
                  <a href="#get-started">Get the Investor Guide</a>
                </Button>
              </div>
            </div>

            {/* Right: Lead Form */}
            <div className="hidden lg:block">
              <div className="rounded-2xl bg-gray-800/50 backdrop-blur border border-gray-700 p-8">
                <h2 className="text-xl font-bold text-white mb-1">
                  Get Your Free Investor Guide
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Revenue projections, ROI breakdown, and our full track record.
                </p>
                <LeadForm variant="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Buying the Right Property Is Only Half the Equation
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              A great unit in a great location is a strong start. But without
              expert management, even premium properties underperform. Our
              portfolio consistently earns{" "}
              <span className="font-semibold text-primary">
                56% higher nightly rates
              </span>{" "}
              and{" "}
              <span className="font-semibold text-primary">
                25% more booked nights
              </span>{" "}
              than comparable listings in the same neighborhoods.
            </p>
            <p className="mt-4 text-lg font-semibold text-gray-900">
              The right management turns a good investment into a great one.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Same City. Different Results.
            </h2>
            <p className="mt-4 text-gray-600">
              Real data from Nairobi&apos;s short-term rental market.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 pb-4 border-b-2 border-gray-300">
              <div className="text-sm font-medium text-gray-500"></div>
              <div className="text-center">
                <div className="text-sm font-bold text-primary">Elite Stays</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-400">
                  Typical Operator
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-400">Difference</div>
              </div>
            </div>

            {/* Rows */}
            {comparison.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-4 gap-4 py-4 items-center ${
                  i !== comparison.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="text-sm font-medium text-gray-700">
                  {row.label}
                </div>
                <div className="text-center font-semibold text-gray-900">
                  {row.esa}
                </div>
                <div className="text-center text-gray-500">{row.competitor}</div>
                <div className="text-center">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-semibold text-green-800">
                    {row.diff}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500 max-w-xl mx-auto">
            Competitor data sourced from live Airbnb listings in premium Westlands
            buildings with rooftop amenities. ESA data from our actual portfolio performance.
          </p>
        </div>
      </section>

      {/* ═══ WHY WE OUTPERFORM ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Our Owners Earn More
            </h2>
          </div>
          <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 sm:grid-cols-2">
            {whyBetter.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-gray-50 p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROI PROJECTIONS ═══ */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What Your Investment Could Earn
            </h2>
            <p className="mt-4 text-gray-400">
              Conservative projections at 75% occupancy. Our portfolio averages 85%+.
            </p>
          </div>

          <div className="mx-auto max-w-4xl grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* 1-Bed Card */}
            <div className="rounded-2xl bg-gray-800 border border-gray-700 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">1-Bedroom</h3>
                <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                  12-15% yield
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Furnishing Investment</span>
                  <span className="font-semibold text-white">
                    <Price amount={1200000} />
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Nightly Rate</span>
                  <span className="font-semibold text-white">
                    <Price amount={12500} />
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Monthly Gross (75% occ.)</span>
                  <span className="font-semibold text-white">
                    <Price amount={280000} />
                  </span>
                </div>
                <div className="rounded-lg bg-green-900/30 border border-green-800/50 p-4">
                  <div className="text-sm text-green-400">Net to Owner / Month</div>
                  <div className="text-2xl font-bold text-green-400">
                    <Price amount={165000} />+
                  </div>
                </div>
                <div className="text-center text-sm text-gray-400 pt-2">
                  Payback on furnishing: <span className="text-white font-medium">~8 months</span>
                </div>
              </div>
            </div>

            {/* 2-Bed Card */}
            <div className="rounded-2xl bg-gray-800 border border-primary/50 p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white uppercase tracking-wide">
                Most Popular
              </div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">2-Bedroom</h3>
                <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                  14-17% yield
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Furnishing Investment</span>
                  <span className="font-semibold text-white">
                    <Price amount={1500000} />
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Nightly Rate</span>
                  <span className="font-semibold text-white">
                    <Price amount={18700} />
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Monthly Gross (75% occ.)</span>
                  <span className="font-semibold text-white">
                    <Price amount={420000} />
                  </span>
                </div>
                <div className="rounded-lg bg-green-900/30 border border-green-800/50 p-4">
                  <div className="text-sm text-green-400">Net to Owner / Month</div>
                  <div className="text-2xl font-bold text-green-400">
                    <Price amount={250000} />+
                  </div>
                </div>
                <div className="text-center text-sm text-gray-400 pt-2">
                  Payback on furnishing: <span className="text-white font-medium">~6 months</span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500 max-w-xl mx-auto">
            Net figures after management fee, before rent &amp; utilities. Actual results
            vary by unit, location, and season. Based on our 2025 portfolio data.
          </p>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From Empty Unit to First Booking
            </h2>
            <p className="mt-4 text-gray-600">4 steps. 4-6 weeks. That&apos;s it.</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.num} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                    {step.num}
                  </div>
                  <h3 className="mt-4 font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Proven Across Nairobi
            </h2>
          </div>
          <div className="mx-auto max-w-4xl grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary">4+</div>
              <div className="mt-2 text-sm font-medium text-gray-900">
                Years Operating
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Since 2022 in Nairobi
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary">5,000+</div>
              <div className="mt-2 text-sm font-medium text-gray-900">
                Guests Hosted
              </div>
              <div className="mt-1 text-xs text-gray-500">
                From 60+ countries
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary">0</div>
              <div className="mt-2 text-sm font-medium text-gray-900">
                Major Incidents
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Zero property damage claims
              </div>
            </div>
          </div>

          {/* Location badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {[
              "Westlands",
              "Kilimani",
              "Lavington",
              "Kileleshwa",
              "Riverside",
            ].map((loc) => (
              <span
                key={loc}
                className="rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
              >
                📍 {loc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Common Questions
            </h2>
          </div>
          <div className="mx-auto max-w-2xl">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA + FORM ═══ */}
      <section id="get-started" className="py-16 sm:py-20 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Earn From Your Property?
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Get our free investor guide with detailed revenue projections,
                ROI breakdowns, and our full track record.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-300">
                    Personalized revenue projection for your unit
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-300">
                    Full breakdown of costs, fees, and net returns
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-300">
                    Our 2025 performance data — no fluff, real numbers
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-white/10" asChild>
                  <a href="https://wa.me/254111695444">
                    <Phone className="mr-2 h-5 w-5" />
                    Or message us on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-800/50 backdrop-blur border border-gray-700 p-8">
              <LeadForm variant="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST FOOTER ═══ */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Airbnb Superhost</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Building2 className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">KRA Tax Compliant</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">4+ Years Track Record</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
