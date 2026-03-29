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
  Camera,
  RefreshCw,
  GraduationCap,
  Search,
  ClipboardCheck,
  Paintbrush,
} from "lucide-react"
import { AuditForm, AcademySignup, FAQItem } from "./InvestClientComponents"

/* ─── Why we outperform ─── */
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
    title: "Data-Driven Decisions",
    description:
      "We track 500+ Nairobi listings daily. Every recommendation we make is backed by real market data, not guesswork.",
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
    title: "Design & Furnish",
    desc: "Custom interiors, sourcing, workmen coordination — 4-6 weeks from bare unit to guest-ready.",
  },
  {
    num: "03",
    title: "Launch",
    desc: "Professional photos, listing optimization, account setup. Your property goes live on Airbnb & Booking.com.",
  },
  {
    num: "04",
    title: "First Booking",
    desc: "First booking typically within 7-14 days of going live. You get paid directly by Airbnb.",
  },
]

const faqs = [
  {
    q: "Is Airbnb profitable in Nairobi?",
    a: "Yes — when set up well. Our portfolio averages 75-85% occupancy with nightly rates well above market average. A well-furnished 1-bedroom in a good area can net the owner approximately KES 167,000 per month after Airbnb fees. Location, furnishing quality, and professional setup are the three biggest factors. These figures are based on past performance and are not guarantees.",
  },
  {
    q: "How much does it cost to furnish an Airbnb in Nairobi?",
    a: "Furniture and materials typically run KES 800K–1.3M for a 1-bedroom and KES 1M–1.6M for a 2-bedroom — quoted at actual cost with full line-item transparency. On top of this is our flat setup fee (KES 250K for 1-bed, KES 350K for 2-bed), which covers interior design, sourcing, coordination, account setup, cleaner training, house manuals, launch strategy, and more. Photography and physical items are billed at cost with no markup. For a detailed breakdown, we offer a site visit for KES 10,000 — credited back in full if you hire us.",
  },
  {
    q: "How much can I earn from an Airbnb in Kenya?",
    a: "It depends on location, unit size, and setup quality. Based on our portfolio performance, a 1-bedroom can net the owner approximately KES 167,000/month and a 2-bedroom approximately KES 226,000/month at 75% occupancy, after Airbnb platform fees. These figures are based on past performance in specific neighborhoods and are not guarantees.",
  },
  {
    q: "What are the best areas for Airbnb in Nairobi?",
    a: "Westlands, Kilimani, Kileleshwa, and Lavington consistently perform best for short-term rentals. These areas attract both international tourists and business travelers, with strong demand year-round. We operate across all four neighborhoods and do not take on properties in all areas.",
  },
  {
    q: "Do I need to pay taxes on Airbnb income in Kenya?",
    a: "Airbnb income is subject to taxes including Withholding Tax, which Airbnb deducts automatically from your payouts. Your specific tax obligations depend on your residency status, KRA registration, and how the property is held. We recommend consulting a qualified tax advisor for personalized guidance.",
  },
  {
    q: "How long before my property starts earning?",
    a: "From signing to first booking is typically 4-6 weeks. That includes furnishing, professional photography, listing creation, and optimization. First booking usually comes within 7-14 days of going live.",
  },
  {
    q: "How do I get paid?",
    a: "Airbnb pays you directly to your bank account. We never hold your money. Our service fees are quoted upfront and billed separately.",
  },
  {
    q: "Do I need to sign a management contract?",
    a: "No. All our services are standalone. We'll furnish your unit, set up your listings, take professional photos, create house manuals, and train your cleaner — whether or not you use ongoing management services.",
  },
  {
    q: "What's included in the free listing audit?",
    a: "We review your photos, title, description, pricing, calendar settings, and competitive positioning. You'll receive a detailed report with specific, actionable recommendations — completely free, no strings attached.",
  },
  {
    q: "Do you only work with new or empty units?",
    a: "No. We work with existing hosts who want to improve their performance too. Our Photography & Optimization and Refresh packages are designed specifically for furnished units that need a boost.",
  },
]

export default function InvestPage() {
  return (
    <div className="pt-24">
      {/* ═══ HERO ═══ */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, white 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="container relative mx-auto px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <p className="text-primary font-semibold text-lg mb-3">
                Launch. Optimize. Earn.
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
                Launch Your Airbnb in Nairobi
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-300">
                We help property owners furnish, optimize, and launch
                high-performing short-term rentals — with proven results
                and transparent pricing.
              </p>

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

              <div className="mt-8 lg:hidden">
                <Button size="lg" asChild className="w-full">
                  <a href="#free-audit">Get a Free Listing Audit</a>
                </Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-2xl bg-gray-800/50 backdrop-blur border border-gray-700 p-8">
                <h2 className="text-xl font-bold text-white mb-1">
                  Free Listing Audit
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Submit your Airbnb link and we&apos;ll tell you exactly what&apos;s holding your listing back — for free.
                </p>
                <AuditForm variant="dark" />
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
              expert setup, even premium properties underperform.
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
              The right setup turns a good investment into a great one.
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
            <div className="grid grid-cols-4 gap-4 pb-4 border-b-2 border-gray-300">
              <div className="text-sm font-medium text-gray-500"></div>
              <div className="text-center">
                <div className="text-sm font-bold text-primary">Elite Stays</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-400">Typical Operator</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-400">Difference</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 py-4 items-center border-b border-gray-200">
              <div className="text-sm font-medium text-gray-700">2-Bed Nightly Rate</div>
              <div className="text-center font-semibold text-gray-900"><Price amount={15120} /></div>
              <div className="text-center text-gray-500"><Price amount={10080} /></div>
              <div className="text-center">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-semibold text-green-800">+50%</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 py-4 items-center border-b border-gray-200">
              <div className="text-sm font-medium text-gray-700">Average Occupancy</div>
              <div className="text-center font-semibold text-gray-900">75–85%</div>
              <div className="text-center text-gray-500">~55–65%</div>
              <div className="text-center">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-semibold text-green-800">+15–20pts</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 py-4 items-center border-b border-gray-200">
              <div className="text-sm font-medium text-gray-700">Monthly Net to Owner (2-Bed)</div>
              <div className="text-center font-semibold text-gray-900"><Price amount={226000} />+</div>
              <div className="text-center text-gray-500">~<Price amount={120000} /></div>
              <div className="text-center">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-semibold text-green-800">+88%</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 py-4 items-center">
              <div className="text-sm font-medium text-gray-700">Guest Rating</div>
              <div className="text-center font-semibold text-gray-900">4.92★</div>
              <div className="text-center text-gray-500">4.86★</div>
              <div className="text-center">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-semibold text-green-800">Higher</span>
              </div>
            </div>
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
              Our Services
            </h2>
            <p className="mt-4 text-gray-600">
              Everything you need to launch, optimize, or refresh your Airbnb property.
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Full Furnishing Package */}
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-8 lg:col-span-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Sofa className="h-6 w-6 text-primary" />
              </div>
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 mb-3">
                Most Popular — Empty Unit to First Booking
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Full Furnishing Package
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We take your empty unit to a fully bookable, guest-ready property in 4-6 weeks.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: What's included */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">What&apos;s included</h4>
                  <ul className="space-y-2">
                    {[
                      "Interior design & space planning",
                      "Full furnishing sourcing & purchasing",
                      "Coordinating workmen & installation",
                      "Airbnb & Booking.com account setup",
                      "Hard & soft copy house manuals",
                      "Find and train a dedicated cleaner",
                      "Cleaning checklists & SOPs",
                      "Guest message templates",
                      "Launch pricing strategy",
                      "Listing SEO optimization",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-gray-500">
                    Photography, hardcopy manuals, and all physical items billed at cost — no markup.
                  </p>
                </div>

                {/* Right: Pricing */}
                <div className="space-y-4">
                  <div className="rounded-lg bg-white border border-gray-200 p-5">
                    <div className="text-sm font-medium text-gray-500 mb-3">ESA Setup Fee</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900"><Price amount={250000} /></div>
                        <div className="text-sm text-gray-500">1-Bedroom</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900"><Price amount={350000} /></div>
                        <div className="text-sm text-gray-500">2-Bedroom</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-gray-50 border border-gray-200 p-5">
                    <div className="text-sm font-medium text-gray-500 mb-2">Estimated furniture & materials</div>
                    <div className="text-sm text-gray-900">
                      <span className="font-semibold"><Price amount={800000} /> – <Price amount={1300000} /></span> (1-Bed)
                    </div>
                    <div className="text-sm text-gray-900 mt-1">
                      <span className="font-semibold"><Price amount={1000000} /> – <Price amount={1600000} /></span> (2-Bed)
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Quoted separately at actual cost — you see every line item.</div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Site visit & detailed quote:</span>{" "}
                    <Price amount={10000} /> — credited back in full if you hire us.
                  </p>
                  <div className="rounded-lg bg-gray-100 border border-gray-200 p-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Need ongoing management?</span>{" "}
                      We selectively partner with property owners who are the right fit. Ask us during your consultation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photography & Listing Optimization */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 mb-3">
                Quick Win — See Results in Days
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Photography & Listing Optimization
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Great furniture with bad photos is invisible. We fix that.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Professional photography & video",
                  "Listing title & description rewrite",
                  "SEO optimization for Airbnb search",
                  "Calendar & pricing settings review",
                  "Competitor positioning analysis",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg bg-gray-50 border border-gray-200 p-4">
                <div className="text-sm text-gray-500">Starting from</div>
                <div className="font-semibold text-gray-900">KES 35,000</div>
              </div>
            </div>

            {/* Refresh / Restage */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 mb-3">
                Boost Revenue — Without Starting Over
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Refresh / Restage
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Your unit is furnished but underperforming. We diagnose why and fix it.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Full property audit & assessment",
                  "Updated soft furnishings & decor",
                  "New professional photography",
                  "Listing rewrite & repositioning",
                  "Pricing strategy reset",
                  "Updated house manuals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg bg-gray-50 border border-gray-200 p-4">
                <div className="text-sm text-gray-500">Custom quote based on scope</div>
                <div className="font-semibold text-gray-900">Starts with a <Price amount={10000} /> site visit</div>
                <div className="text-xs text-gray-500 mt-1">Credited if you hire us</div>
              </div>
            </div>

            {/* Free Listing Audit card */}
            <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 mb-4">
                <Search className="h-6 w-6 text-green-700" />
              </div>
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 mb-3">
                100% Free — No Strings Attached
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Free Listing Audit
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Not sure what&apos;s holding you back? Send us your listing and we&apos;ll tell you — for free.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Photo & visual quality review",
                  "Title & description analysis",
                  "Pricing vs. competitors",
                  "Calendar & settings check",
                  "Actionable recommendations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button size="lg" asChild className="w-full">
                  <a href="#free-audit">
                    Get My Free Audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY WE OUTPERFORM ═══ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Our Properties Outperform
            </h2>
          </div>
          <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 sm:grid-cols-2">
            {whyBetter.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-8 hover:shadow-md transition-shadow"
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
                  <span className="font-semibold text-white">~<Price amount={1200000} /></span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Nightly Rate</span>
                  <span className="font-semibold text-white"><Price amount={11214} /></span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Occupancy</span>
                  <span className="font-semibold text-white">75%</span>
                </div>
                <div className="rounded-lg bg-green-900/30 border border-green-800/50 p-4">
                  <div className="text-sm text-green-400">Estimated Net to Owner / Month</div>
                  <div className="text-2xl font-bold text-green-400">
                    ~<Price amount={167000} />
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
                  <span className="font-semibold text-white">~<Price amount={1500000} /></span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Nightly Rate</span>
                  <span className="font-semibold text-white"><Price amount={15120} /></span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-400">Occupancy</span>
                  <span className="font-semibold text-white">75%</span>
                </div>
                <div className="rounded-lg bg-green-900/30 border border-green-800/50 p-4">
                  <div className="text-sm text-green-400">Estimated Net to Owner / Month</div>
                  <div className="text-2xl font-bold text-green-400">
                    ~<Price amount={226000} />
                  </div>
                </div>
                <div className="text-center text-sm text-gray-400 pt-2">
                  Estimated payback on furnishing: <span className="text-white font-medium">~7 months</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 mx-auto max-w-2xl space-y-3">
            <p className="text-center text-sm text-gray-400 font-semibold">
              Net figures include Airbnb platform fees and 20% professional management.
            </p>
            <p className="text-center text-sm text-gray-500">
              Furnishing costs are estimates. A detailed site visit with full
              furnishing list and pricing is available for <Price amount={10000} /> — credited
              back in full if you hire us.
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
              <div className="mt-2 text-sm font-medium text-gray-900">Years Operating</div>
              <div className="mt-1 text-xs text-gray-500">Since 2022 in Nairobi</div>
            </div>
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary">5,000+</div>
              <div className="mt-2 text-sm font-medium text-gray-900">Guests Hosted</div>
              <div className="mt-1 text-xs text-gray-500">From 60+ countries</div>
            </div>
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary">0</div>
              <div className="mt-2 text-sm font-medium text-gray-900">Major Incidents</div>
              <div className="mt-1 text-xs text-gray-500">Zero property damage claims</div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {["Westlands", "Kilimani", "Lavington", "Kileleshwa", "Riverside"].map((loc) => (
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
              What Property Owners Say
            </h2>
          </div>
          <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 lg:grid-cols-2">
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

      {/* ═══ FREE LISTING AUDIT ═══ */}
      <section id="free-audit" className="py-16 sm:py-20 bg-primary/5">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 mb-4">
                100% Free
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Get a Free Listing Audit
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Not sure where to start? Submit your Airbnb link and we&apos;ll
                tell you exactly what&apos;s holding your listing back.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-600">
                    Detailed review of photos, copy, pricing & settings
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-600">
                    Competitor analysis for your specific area
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-600">
                    Actionable recommendations you can implement immediately
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-600">
                    No obligations — just real insights and honest advice
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white shadow-lg border border-gray-200 p-8">
              <AuditForm variant="light" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STR ACADEMY ═══ */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
              Coming Soon
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Elite Stays Academy
              </h2>
            </div>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              A complete course series on how to crush it as an STR operator in Nairobi.
              From finding the right property to maximizing revenue — everything we&apos;ve
              learned in 4+ years, packaged for you.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {[
                "Finding the right property & neighborhood",
                "Furnishing for maximum bookings",
                "Pricing strategy & revenue optimization",
                "Guest experience & 5-star reviews",
                "Operations & team management",
                "Scaling from 1 to 10+ units",
              ].map((topic) => (
                <div key={topic} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span className="text-sm text-gray-300">{topic}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-gray-400 text-sm mb-4">
                Be the first to know when we launch.
              </p>
              <AcademySignup />
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

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Whether you need a full furnishing package, a listing refresh,
                or just want to know what&apos;s holding you back — we&apos;re here to help.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-300">
                    Free listing audit — no obligations
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-300">
                    Personalized recommendations backed by market data
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-300">
                    4+ years of proven results in Nairobi
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
              <h3 className="text-lg font-bold text-white mb-4">Free Listing Audit</h3>
              <AuditForm variant="dark" />
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
