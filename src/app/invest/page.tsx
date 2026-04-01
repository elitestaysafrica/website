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
  Handshake,
} from "lucide-react"
import { AuditForm, FAQItem } from "./InvestClientComponents"

/* ─── Why we outperform ─── */
const whyBetter = [
  {
    icon: Target,
    title: "Precision Pricing",
    description:
      "We research every competitor on the map, analyze booking patterns, and price for maximum revenue — not just occupancy.",
  },
  {
    icon: Star,
    title: "5-Star Guest Experience",
    description:
      "Hotel-grade cleaning, instant communication, curated interiors. Happy guests leave 5-star reviews. Reviews drive more bookings.",
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
    a: "Yes — when set up well. Our portfolio averages 75-85% occupancy with nightly rates well above market average. A well-set-up 2-bedroom in a good area can net the owner approximately KES 283,000 per month after Airbnb fees. Location, furnishing quality, and professional setup are the biggest factors. These figures are based on past performance and are not guarantees.",
  },
  {
    q: "How much does it cost to furnish an Airbnb in Nairobi?",
    a: "Furniture and materials typically run KES 800K–1.3M for a 1-bedroom and KES 1M–1.6M for a 2-bedroom — quoted at actual cost with full line-item transparency. On top of this is our flat setup fee (KES 250K for 1-bed, KES 350K for 2-bed), which covers interior design, sourcing, coordination, account setup, cleaner training, house manuals, launch strategy, and more. Photography and physical items are billed at cost with no markup. For a detailed breakdown, we offer a site visit for KES 10,000 — credited back in full if you hire us.",
  },
  {
    q: "How much can I earn from an Airbnb in Kenya?",
    a: "It depends on location, unit size, and setup quality. Based on our portfolio performance at 75% occupancy, a 1-bedroom can net approximately KES 210,000/month and a 2-bedroom approximately KES 283,000/month after Airbnb platform fees. These figures are based on past performance in specific neighborhoods and are not guarantees.",
  },
  {
    q: "How does your pricing compare to other furnishing companies?",
    a: "Typical Nairobi interior design firms charge KES 1.6M+ for furniture alone in a 1-bedroom — before any Airbnb setup. Our total cost (furniture + setup fee) starts around KES 1.05M for a 1-bedroom, and you get a fully launched, revenue-ready property, not just a furnished apartment.",
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
    a: "No. All our setup services are standalone. We'll furnish your unit, set up your listings, take professional photos, create house manuals, and train your cleaner — whether or not you use management services. If you do want management, we offer it selectively or can connect you with a qualified manager.",
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
                  Get Started
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Already hosting? Get a free listing audit. Looking to start? Tell us about your project.
                </p>
                <AuditForm variant="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE ESA DIFFERENCE ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The ESA Difference
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Most furnishing companies hand you a furnished apartment and walk away.
              We hand you a{" "}
              <span className="font-semibold text-primary">
                revenue-generating business
              </span>.
            </p>
          </div>

          {/* Cost comparison callout */}
          <div className="mt-12 mx-auto max-w-4xl">
            <div className="rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200">
                  <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Typical Interior Design Firm</div>
                  <div className="text-3xl font-bold text-gray-900"><Price amount={1600000} />+</div>
                  <div className="text-sm text-gray-500 mt-1">Furniture only (1-bedroom)</div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-500">
                    <li>✗ No Airbnb account setup</li>
                    <li>✗ No listing optimization</li>
                    <li>✗ No cleaner training</li>
                    <li>✗ No pricing strategy</li>
                    <li>✗ No launch support</li>
                  </ul>
                </div>
                <div className="p-8 bg-primary/5">
                  <div className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">Elite Stays Africa</div>
                  <div className="text-3xl font-bold text-gray-900">From <Price amount={1050000} /></div>
                  <div className="text-sm text-gray-500 mt-1">Furniture + full setup (1-bedroom)</div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Airbnb & Booking.com setup</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Listing optimization & SEO</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Cleaner recruitment & training</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Data-driven pricing strategy</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Full launch support</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              Based on actual quotes from Nairobi-based interior design firms (2026).
            </p>
          </div>
        </div>
      </section>

      {/* ═══ OUR SERVICES ═══ */}
      <section className="py-16 sm:py-20 bg-gray-50">
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
            {/* Full Furnishing Package — Featured Hero Card */}
            <div className="lg:col-span-3 rounded-2xl border-2 border-primary/30 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sofa className="h-6 w-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Full Furnishing Package</h3>
                </div>
                <span className="hidden sm:inline-flex items-center rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                  Most Popular — Empty Unit to First Booking
                </span>
              </div>

              <div className="bg-white p-8">
                <p className="text-gray-600 leading-relaxed max-w-2xl">
                  We take your empty unit to a fully bookable, guest-ready property in 4-6 weeks. Design, furnish, set up, and launch — everything handled.
                </p>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Setup & Design</h4>
                    <ul className="space-y-2.5">
                      {[
                        "Interior design & space planning",
                        "Full furnishing sourcing & purchasing",
                        "Coordinating workmen & installation",
                        "Find and train a dedicated cleaner",
                        "Cleaning checklists & SOPs",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Launch & Optimize</h4>
                    <ul className="space-y-2.5">
                      {[
                        "Airbnb & Booking.com account setup",
                        "Listing SEO optimization",
                        "Launch pricing strategy",
                        "Guest message templates",
                        "Hard & soft copy house manuals",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
                      <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-4">ESA Setup Fee</div>
                      <div className="flex items-end gap-3 sm:gap-6">
                        <div className="min-w-0">
                          <div className="text-2xl sm:text-3xl font-bold text-gray-900"><Price amount={250000} /></div>
                          <div className="text-sm text-gray-500 mt-1">1-Bedroom</div>
                        </div>
                        <div className="text-gray-300 text-2xl font-light pb-1 shrink-0">/</div>
                        <div className="min-w-0">
                          <div className="text-2xl sm:text-3xl font-bold text-gray-900"><Price amount={350000} /></div>
                          <div className="text-sm text-gray-500 mt-1">2-Bedroom</div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Furniture & Materials</div>
                      <div className="text-sm text-gray-900 font-semibold">
                        <Price amount={800000} /> – <Price amount={1300000} /> <span className="font-normal text-gray-500">(1-Bed)</span>
                      </div>
                      <div className="text-sm text-gray-900 font-semibold mt-1">
                        <Price amount={1000000} /> – <Price amount={1600000} /> <span className="font-normal text-gray-500">(2-Bed)</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-3">Quoted at actual cost — you see every line item. No markup.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                    <span>
                      <span className="font-medium">Site visit:</span>{" "}
                      <Price amount={10000} /> — credited if you hire us
                    </span>
                    <span className="hidden sm:inline text-gray-300">•</span>
                    <span>Photography & physical items billed at cost</span>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a href="#free-audit">Get Started <ArrowRight className="ml-1 h-3 w-3" /></a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Photography & Listing Optimization */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 mb-3 self-start">
                Quick Win — See Results in Days
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Photography & Listing Optimization
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Great furniture with bad photos is invisible. We fix that.
              </p>
              <ul className="mt-4 space-y-2 flex-1">
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
            <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 mb-3 self-start">
                Boost Revenue — Without Starting Over
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Refresh / Restage
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Your unit is furnished but underperforming. We diagnose why and fix it.
              </p>
              <ul className="mt-4 space-y-2 flex-1">
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
            <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8 flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 mb-4">
                <Search className="h-6 w-6 text-green-700" />
              </div>
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 mb-3 self-start">
                100% Free — No Strings Attached
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Free Listing Audit
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Not sure what&apos;s holding you back? Send us your listing and we&apos;ll tell you — for free.
              </p>
              <ul className="mt-4 space-y-2 flex-1">
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

      {/* ═══ WHAT OUR PROPERTIES EARN ═══ */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What Our Properties Earn
            </h2>
            <p className="mt-4 text-gray-400">
              Projections at 75% occupancy based on our portfolio performance. After Airbnb platform fees.
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
                  <span className="text-gray-400">Total Investment</span>
                  <span className="font-semibold text-white">~<Price amount={1250000} /></span>
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
                    ~<Price amount={210000} />
                  </div>
                </div>
                <div className="text-center text-sm text-gray-400 pt-2">
                  Estimated payback: <span className="text-white font-medium">~6 months</span>
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
                  <span className="text-gray-400">Total Investment</span>
                  <span className="font-semibold text-white">~<Price amount={1650000} /></span>
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
                    ~<Price amount={283000} />
                  </div>
                </div>
                <div className="text-center text-sm text-gray-400 pt-2">
                  Estimated payback: <span className="text-white font-medium">~6 months</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 mx-auto max-w-2xl space-y-3">
            <p className="text-center text-sm text-gray-400 font-semibold">
              Net after Airbnb platform fees (~18%). Does not include management, utilities, or operational costs.
            </p>
            <p className="text-center text-sm text-gray-500">
              Total investment = mid-range furniture + ESA setup fee. Actual costs quoted after site visit.
            </p>
            <p className="text-center text-sm text-gray-500">
              Based on past performance in specific Nairobi neighborhoods. Not guarantees.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ PROFESSIONAL MANAGEMENT ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Left: Copy */}
                <div className="lg:col-span-3 p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Handshake className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Professional Management
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Already set up and want to go fully hands-off? We selectively manage
                    high-performing properties — or we&apos;ll connect you with a vetted
                    management partner in our network.
                  </p>
                  <ul className="mt-6 space-y-2">
                    {[
                      "Guest communication & 24/7 support",
                      "Cleaning coordination & quality control",
                      "Dynamic pricing & revenue optimization",
                      "Maintenance management",
                      "Monthly reporting via owner portal",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Stats + CTA */}
                <div className="lg:col-span-2 bg-gray-900 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="space-y-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-white">85%+</div>
                      <div className="text-sm text-gray-400">Avg. Occupancy</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">4.92★</div>
                      <div className="text-sm text-gray-400">Guest Rating</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">20%</div>
                      <div className="text-sm text-gray-400">Management Fee</div>
                    </div>
                    <div className="pt-2">
                      <Button size="sm" asChild>
                        <a href="https://wa.me/254111695444">
                          Inquire About Management
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
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
                results and highly recommend their services to any property owner.
                I&apos;m excited to continue working with them!&rdquo;
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
                unit with another company, and the difference was night and day.
                Once we handed it over to the Elite Stays team, occupancy increased,
                income more than doubled, and ratings climbed. Highly recommended
                for anyone seeking strong passive rental returns.&rdquo;
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
            <div className="inline-flex items-center rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-semibold text-green-400 mb-6">
              🔥 Pre-Sale Opening Soon
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                ESA University
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
                Three tiers from KES 25K. Early-bird pricing won&apos;t last.
              </p>
              <Button size="lg" asChild>
                <Link href="/academy">
                  See the Course <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
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
              <h3 className="text-lg font-bold text-white mb-4">Get Started</h3>
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
