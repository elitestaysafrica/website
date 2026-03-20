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
  Sofa,
  CreditCard,
  Eye,
} from "lucide-react"
import { LeadForm, FAQItem } from "./InvestClientComponents"

/* ─── Competitive comparison data ─── */
const comparison = [
  {
    label: "2-Bed Nightly Rate",
    esa: "$120 (KES 15,120)",
    competitor: "$80 (KES 10,080)",
    diff: "+50%",
  },
  {
    label: "Average Occupancy",
    esa: "75–85%",
    competitor: "~55–65%",
    diff: "+15–20pts",
  },
  {
    label: "Monthly Net to Owner (2-Bed)",
    esa: "KES 226,000+",
    competitor: "~KES 120,000",
    diff: "+88%",
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
      "Monthly statements with full breakdowns. You see every booking, every expense, every shilling through our owner portal.",
  },
]

const steps = [
  {
    num: "01",
    title: "Site Visit & Quote",
    desc: "We visit your property, assess the space, and provide a detailed furnishing list with costs.",
  },
  {
    num: "02",
    title: "Furnishing & Setup",
    desc: "Custom interiors, professional photography, account setup, TV app — 4-6 weeks from bare unit to bookable.",
  },
  {
    num: "03",
    title: "Go Live",
    desc: "Your listing goes live on Airbnb & Booking.com. First booking typically within 7-14 days.",
  },
  {
    num: "04",
    title: "Earn & Track",
    desc: "Airbnb pays you directly. Track everything through our owner portal.",
  },
]

const faqs = [
  {
    q: "Is Airbnb profitable in Nairobi?",
    a: "Yes — when managed well. Our portfolio averages 75-85% occupancy with nightly rates well above market average. A well-furnished 1-bedroom in a good area can net the owner approximately KES 167,000 per month after Airbnb fees and management fee. Location, furnishing quality, and professional management are the three biggest factors. These figures are based on past performance and are not guarantees.",
  },
  {
    q: "How much does it cost to furnish an Airbnb in Nairobi?",
    a: "We estimate KES 1.2M–1.4M for a 1-bedroom and KES 1.5M–1.7M for a 2-bedroom for the furnishing itself. On top of this is our furnishing service fee, which covers sourcing, workmen coordination, account setup, professional photos and video, hard copy house manuals, and TV app setup. For a detailed breakdown specific to your property, we offer a site visit and comprehensive furnishing plan for KES 10,000 — credited back in full if you hire us to do the furnishing. Furnishing is a standalone service and does not require a management contract.",
  },
  {
    q: "What does your management fee cover?",
    a: "Our management fee is 20% of booking revenue. Overhead costs — cleaning, supplies, utilities, and property managers — are billed monthly based on actual usage. You get paid directly by Airbnb. We never hold your money.",
  },
  {
    q: "How much can I earn from an Airbnb in Kenya?",
    a: "It depends on location, unit size, and management quality. Based on our portfolio performance, a 1-bedroom can net the owner approximately KES 167,000/month and a 2-bedroom approximately KES 226,000/month at 75% occupancy, after Airbnb fees and our management fee. Overhead costs are billed separately. These figures are based on past performance in specific neighborhoods and are not guarantees.",
  },
  {
    q: "What are the best areas for Airbnb in Nairobi?",
    a: "Westlands, Kilimani, Kileleshwa, and Lavington consistently perform best for short-term rentals. These areas attract both international tourists and business travelers, with strong demand year-round. We operate across all four neighborhoods and do not take on properties in all areas.",
  },
  {
    q: "Do I need to pay taxes on Airbnb income in Kenya?",
    a: "Airbnb income is subject to taxes including Withholding Tax, which Airbnb deducts automatically from your payouts. Your specific tax obligations depend on your residency status, KRA registration, and how the property is held. We recommend consulting a qualified tax advisor or the lawyer who handled your property purchase for personalized guidance.",
  },
  {
    q: "Can I use my property sometimes?",
    a: "Yes. Block up to 30 days per year for personal use with advance notice. Many of our owners use their units when visiting Nairobi.",
  },
  {
    q: "How long before my property starts earning?",
    a: "From signing to first booking is typically 4-6 weeks. That includes furnishing, professional photography, listing creation, and optimization. First booking usually comes within 7-14 days of going live.",
  },
  {
    q: "How do I get paid?",
    a: "Airbnb pays you directly to your account — we never hold your money. Our management fee and monthly overhead are billed separately. Off-platform bookings (rare, approximately 1% of total) are credited to your monthly bill or paid out at month's end. 99% of bookings come through Airbnb or Booking.com.",
  },
  {
    q: "Can I get my unit furnished without signing a management contract?",
    a: "Yes. Our furnishing and setup service is completely standalone. We'll furnish your unit, set up your listings, take professional photos, create house manuals, and configure the TV app — whether or not you use our management services.",
  },
]

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
              <p className="text-primary font-semibold text-lg mb-3">
                Buy. Stay. Earn. Repeat.
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
                Invest in Nairobi Short-Term Rentals
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-300">
                Explore Nairobi&apos;s booming short-term rental market. We help
                property owners furnish, launch, and earn — with transparent
                numbers and proven results.
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
                  <div className="text-3xl font-bold text-white">4+</div>
                  <div className="text-sm text-gray-400">Years in Nairobi</div>
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
              expert setup and management, even premium properties underperform.
              Our portfolio consistently earns{" "}
              <span className="font-semibold text-primary">
                50% higher nightly rates
              </span>{" "}
              and{" "}
              <span className="font-semibold text-primary">
                15-20% more booked nights
              </span>{" "}
              than comparable listings in the same neighborhoods.
            </p>
            <p className="mt-4 text-lg font-semibold text-gray-900">
              The right setup and management turns a good investment into a great one.
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
            Based on our portfolio performance in Westlands, Kilimani, Kileleshwa,
            and Lavington. Past performance is not a guarantee of future results.
            Results vary by unit, location, and season. See our{" "}
            <Link href="/market-intel" className="underline hover:text-gray-700">
              live market data
            </Link>{" "}
            for methodology.
          </p>
        </div>
      </section>

      {/* ═══ OUR SERVICES ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How We Help Property Owners
            </h2>
            <p className="mt-4 text-gray-600">
              Two services. Use one or both — it&apos;s up to you.
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Furnishing Card */}
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Sofa className="h-6 w-6 text-primary" />
              </div>
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 mb-3">
                Standalone — no management required
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Furnishing & Setup
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We take your empty unit to a fully bookable, guest-ready property.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Full furnishing sourcing & purchasing",
                  "Coordinating workmen & installation",
                  "Airbnb & Booking.com account setup",
                  "Professional photography & video",
                  "Hard copy house manuals",
                  "TV app setup with your property info",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg bg-white border border-gray-200 p-4">
                <div className="text-sm text-gray-500">Estimated furnishing cost</div>
                <div className="font-semibold text-gray-900">KES 1.2M (1-Bed) / KES 1.5M (2-Bed)</div>
                <div className="text-xs text-gray-500 mt-1">Plus our furnishing service fee</div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <span className="font-medium">Site visit & detailed quote:</span>{" "}
                KES 10,000 — credited back in full if you hire us to furnish.
              </p>
            </div>

            {/* Management Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Property Management
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We handle the day-to-day so you collect passive income.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Guest communication & support",
                  "Cleaning coordination & quality control",
                  "Dynamic pricing & listing optimization",
                  "Maintenance management",
                  "Monthly reporting via owner portal",
                  "99% of bookings via Airbnb & Booking.com",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg bg-gray-50 border border-gray-200 p-4">
                <div className="text-sm text-gray-500">Management fee</div>
                <div className="font-semibold text-gray-900">20% of booking revenue</div>
                <div className="text-xs text-gray-500 mt-1">
                  Overhead (cleaning, supplies, utilities, managers) billed monthly
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW YOU GET PAID ═══ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How You Get Paid
            </h2>
            <p className="mt-4 text-gray-600">
              Your money goes straight to you. Always.
            </p>
          </div>
          <div className="mx-auto max-w-4xl grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <CreditCard className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="font-bold text-gray-900">Direct Payouts</h3>
              <p className="mt-2 text-sm text-gray-600">
                Airbnb pays you directly to your account. We never hold your money.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <Eye className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="font-bold text-gray-900">Full Transparency</h3>
              <p className="mt-2 text-sm text-gray-600">
                Our management fee and overhead are billed separately with full breakdowns via your owner portal.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="font-bold text-gray-900">Off-Platform Bookings</h3>
              <p className="mt-2 text-sm text-gray-600">
                The rare off-platform booking (~1%) is credited to your monthly bill or paid out at month&apos;s end.
              </p>
            </div>
          </div>
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
              Projections at 75% occupancy based on our portfolio performance.
            </p>
          </div>

          <div className="mx-auto max-w-4xl grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* 1-Bed Card */}
            <div className="rounded-2xl bg-gray-800 border border-gray-700 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">1-Bedroom</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Furnishing Estimate</span>
                  <span className="font-semibold text-white">~KES 1,200,000</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Nightly Rate</span>
                  <span className="font-semibold text-white">$89</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Occupancy</span>
                  <span className="font-semibold text-white">75%</span>
                </div>
                <div className="rounded-lg bg-green-900/30 border border-green-800/50 p-4">
                  <div className="text-sm text-green-400">Estimated Net to Owner / Month</div>
                  <div className="text-2xl font-bold text-green-400">
                    ~KES 167,000
                  </div>
                </div>
                <div className="text-center text-sm text-gray-400 pt-2">
                  Estimated payback on furnishing: <span className="text-white font-medium">~7 months</span>
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
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Furnishing Estimate</span>
                  <span className="font-semibold text-white">~KES 1,500,000</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Nightly Rate</span>
                  <span className="font-semibold text-white">$120</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Occupancy</span>
                  <span className="font-semibold text-white">75%</span>
                </div>
                <div className="rounded-lg bg-green-900/30 border border-green-800/50 p-4">
                  <div className="text-sm text-green-400">Estimated Net to Owner / Month</div>
                  <div className="text-2xl font-bold text-green-400">
                    ~KES 226,000
                  </div>
                </div>
                <div className="text-center text-sm text-gray-400 pt-2">
                  Estimated payback on furnishing: <span className="text-white font-medium">~7 months</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 mx-auto max-w-2xl space-y-3">
            <p className="text-center text-sm text-gray-500">
              Net figures shown after Airbnb platform fees and 20% management fee.
              Overhead costs (cleaning, supplies, utilities, property managers)
              are billed monthly and vary based on booking volume.
            </p>
            <p className="text-center text-sm text-gray-500">
              Furnishing costs are estimates. A detailed site visit with full
              furnishing list and pricing is available for KES 10,000 — credited
              back in full if you hire us to furnish.
            </p>
            <p className="text-center text-sm text-gray-500">
              These projections are based on past performance in specific Nairobi
              neighborhoods and are not guarantees. We do not operate in all areas.
            </p>
          </div>
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

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Property Owners Say
            </h2>
          </div>
          <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Testimonial 1 */}
            <div className="rounded-2xl bg-gray-50 p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                &ldquo;My apartments have been operating near full capacity, and guests
                consistently leave glowing reviews. I couldn&apos;t be happier with the
                results and highly recommend their services to any property owner
                looking for reliable, professional management. I&apos;m excited to
                continue working with them!&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Property Owner</div>
                  <div className="text-sm text-gray-500">2 units — Lavington &amp; Westlands</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-2xl bg-gray-50 p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                &ldquo;Sustained occupancies of over 85% and rental rates above market,
                even compared to other units within the same building. We had one
                unit with another management group, and the difference was night
                and day. Once we handed it over to Andrew and Peris, occupancy
                increased, income more than doubled, and ratings climbed. I highly
                recommend them to anyone seeking peace of mind and strong passive
                rental returns.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Property Owner — 4 Years</div>
                  <div className="text-sm text-gray-500">2 units — Westlands &amp; Riverside</div>
                </div>
              </div>
            </div>
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
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Whether you need furnishing, management, or both — get our free
                investor guide with detailed projections and our full track record.
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
                    Our portfolio performance data — no fluff, real numbers
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <Button size="lg" className="border border-gray-500 bg-transparent text-white hover:bg-white/10" asChild>
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
              <CreditCard className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Direct Airbnb Payouts</span>
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
