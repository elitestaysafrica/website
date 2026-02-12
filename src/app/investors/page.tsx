"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Price } from "@/components/Price"
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Camera, 
  MessageSquare, 
  Sparkles,
  Wrench,
  BarChart3,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Phone,
  Mail
} from "lucide-react"

const stats = [
  { value: "85%+", label: "Average Occupancy", subtext: "vs 45% market average" },
  { value: "50+", label: "Properties Managed", subtext: "across Nairobi" },
  { kesAmount: 165000, label: "1-Bed Owner Net", subtext: "per month after fees" },
  { kesAmount: 225000, label: "2-Bed Owner Net", subtext: "per month after fees" },
]

const services = [
  {
    icon: Camera,
    title: "Professional Setup",
    description: "Listing creation, professional photography, pricing optimization. We make your property stand out.",
  },
  {
    icon: MessageSquare,
    title: "24/7 Guest Communication",
    description: "We handle all inquiries, bookings, and guest support. Immediate responses, happy guests.",
  },
  {
    icon: Sparkles,
    title: "Cleaning & Turnover",
    description: "Hotel-grade cleaning after every stay. Quality inspections. Fresh linens always.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    description: "Vetted contractors on call. We coordinate all maintenance so you don't have to.",
  },
  {
    icon: BarChart3,
    title: "Dynamic Pricing",
    description: "Real-time market data drives our pricing. We maximize revenue while maintaining high occupancy.",
  },
  {
    icon: Calendar,
    title: "Monthly Reporting",
    description: "Transparent statements every month. Track revenue, expenses, and performance.",
  },
]

const projections = [
  {
    type: "1-Bedroom",
    setupCost: 1400000,
    furnishing: 1200000,
    setupFee: 200000,
    nightlyRate: 12500,
    monthlyGross: 280000,
    monthlyNet: 165000,
    payback: "~8 months",
    annualYield: "12-15%",
  },
  {
    type: "2-Bedroom",
    setupCost: 1700000,
    furnishing: 1500000,
    setupFee: 200000,
    nightlyRate: 17000,
    monthlyGross: 380000,
    monthlyNet: 225000,
    payback: "~8 months",
    annualYield: "14-17%",
  },
]

const feeStructure = [
  { tier: "Standard Management", fee: "30%", description: "Full-service management for all properties" },
  { tier: "Volume Partner (5+ units)", fee: "25%", description: "Discounted rate for portfolio owners" },
]

const process = [
  { step: 1, title: "Initial Consultation", description: "We assess your property and discuss your goals" },
  { step: 2, title: "Agreement & Handover", description: "Sign the management contract, hand over keys" },
  { step: 3, title: "Setup & Furnishing", description: "We furnish and stage the property (2-3 weeks)" },
  { step: 4, title: "Professional Photography", description: "High-quality photos that attract bookings" },
  { step: 5, title: "Listing Goes Live", description: "Optimized listing on Airbnb and direct channels" },
  { step: 6, title: "First Booking", description: "Typically within 7-14 days of going live" },
]

const faqs = [
  {
    question: "Can I use my property sometimes?",
    answer: "Yes! You can block up to 30 days per year for personal use with advance notice. Just let us know your dates.",
  },
  {
    question: "What about utilities?",
    answer: "Utility costs (electricity, water, WiFi) are covered by the owner. We can include them in guest pricing if you prefer a hands-off approach.",
  },
  {
    question: "How do you handle problem guests?",
    answer: "We screen all guests through Airbnb's verification system. Security deposits and Airbnb's Host Protection cover damages. In 4 years, we've had zero major incidents.",
  },
  {
    question: "What's the minimum commitment?",
    answer: "12-month initial contract with 60-day notice for termination. Most owners stay 3+ years because the results speak for themselves.",
  },
  {
    question: "What if I want to sell my property?",
    answer: "Furnished, income-producing properties sell at a premium. We can assist with showings and provide income documentation for potential buyers.",
  },
  {
    question: "How and when do I get paid?",
    answer: "Monthly payouts by the 15th of each month, covering the previous month's bookings. Direct bank transfer or M-PESA.",
  },
]

export default function InvestorsPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Turn Your Property Into a{" "}
              <span className="text-primary">Revenue Machine</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Elite Stays Africa handles everything — setup, furnishing, guests, cleaning, 
              maintenance. You collect monthly payouts while we do the work.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#projections">See the Numbers</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Track Record */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Proven Track Record in Nairobi
            </h2>
            <p className="mt-4 text-gray-400">
              We don&apos;t just talk results — we deliver them. Here&apos;s our portfolio performance.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white sm:text-4xl">
                    {'kesAmount' in stat ? <><Price amount={stat.kesAmount!} compact />+</> : stat.value}
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-300">{stat.label}</div>
                  <div className="mt-1 text-xs text-gray-500">{stat.subtext}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Full-Service Property Management
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              You own the property. We handle absolutely everything else.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service.title} className="rounded-2xl bg-gray-50 p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Projections */}
      <section id="projections" className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The Numbers: Real ROI Projections
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Based on our portfolio performance. Conservative estimates at 75% occupancy.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {projections.map((proj) => (
                <div key={proj.type} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">{proj.type}</h3>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {proj.annualYield} yield
                    </span>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="border-b pb-4">
                      <div className="text-sm font-medium text-gray-500">Setup Investment</div>
                      <div className="mt-1 text-2xl font-bold text-gray-900"><Price amount={proj.setupCost} /></div>
                      <div className="mt-1 text-sm text-gray-500">
                        Furnishing (<Price amount={proj.furnishing} />) + Setup (<Price amount={proj.setupFee} />)
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Nightly Rate</div>
                        <div className="font-semibold text-gray-900"><Price amount={proj.nightlyRate} /></div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Monthly Gross</div>
                        <div className="font-semibold text-gray-900"><Price amount={proj.monthlyGross} /></div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-green-50 p-4">
                      <div className="text-sm text-green-700">Net to Owner (after 30% fee)</div>
                      <div className="text-2xl font-bold text-green-700"><Price amount={proj.monthlyNet} />/mo</div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="text-sm text-gray-500">Payback Period</div>
                        <div className="font-semibold text-gray-900">{proj.payback}</div>
                      </div>
                      <Calculator className="h-8 w-8 text-gray-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
              * Projections use 75% occupancy to be conservative — our portfolio actually averages 85%+. 
              Results may vary based on location, seasonality, and market conditions. Net figures are before utilities and major repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Transparent Fee Structure
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              No hidden costs. Our fee covers all operational expenses except utilities and major repairs.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="overflow-hidden rounded-2xl bg-gray-50">
              {feeStructure.map((tier, index) => (
                <div 
                  key={tier.tier} 
                  className={`flex items-center justify-between p-6 ${
                    index !== feeStructure.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <div>
                    <div className="font-semibold text-gray-900">{tier.tier}</div>
                    <div className="text-sm text-gray-500">{tier.description}</div>
                  </div>
                  <div className="text-2xl font-bold text-primary">{tier.fee}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From Empty Unit to First Booking
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Our streamlined onboarding gets your property earning in weeks, not months.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {process.map((step) => (
                <div key={step.step} className="relative rounded-2xl bg-gray-800 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                    {step.step}
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-primary">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Average time to first booking: 3-4 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-gray-50 p-6">
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-primary">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Maximize Your Property&apos;s Potential?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Schedule a free consultation. We&apos;ll assess your property, answer your questions, 
              and show you exactly what returns you can expect.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="https://wa.me/254111695444">
                  <Phone className="mr-2 h-5 w-5" />
                  Message us on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <Shield className="h-8 w-8 mx-auto text-gray-400" />
                <div className="mt-2 text-sm font-medium text-gray-900">Airbnb Superhost</div>
                <div className="text-xs text-gray-500">Top-rated host status</div>
              </div>
              <div>
                <Building2 className="h-8 w-8 mx-auto text-gray-400" />
                <div className="mt-2 text-sm font-medium text-gray-900">Licensed Operator</div>
                <div className="text-xs text-gray-500">Fully compliant with Kenyan law</div>
              </div>
              <div>
                <TrendingUp className="h-8 w-8 mx-auto text-gray-400" />
                <div className="mt-2 text-sm font-medium text-gray-900">4+ Years Track Record</div>
                <div className="text-xs text-gray-500">Proven results in Nairobi</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
