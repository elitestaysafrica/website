import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Lock,
  Download,
  Mail,
  ArrowRight,
  Building2,
  Percent,
  DollarSign,
  Calendar
} from "lucide-react"

export const metadata = {
  title: "Market Intelligence | Elite Stays Africa",
  description: "Nairobi short-term rental market data, occupancy rates, pricing trends, and investment insights. The data other operators keep secret.",
}

// Free market data - visible to all
const marketOverview = {
  source: "Airbtics, AirDNA",
  lastUpdated: "January 2026",
  averageOccupancy: "45%",
  averageADR: "$55/night",
  totalListings: "5,000+",
  eliteStaysOccupancy: "85%+",
}

const neighborhoods = [
  {
    name: "Westlands",
    yield: "9.5%",
    occupancy: "52%",
    avgNightly: "KES 7,500",
    trend: "stable",
    description: "Prime business district. High demand from corporate travelers. 237 active listings competing for market share.",
  },
  {
    name: "Downtown",
    yield: "8.8%",
    occupancy: "53%",
    avgNightly: "KES 8,600",
    trend: "up",
    description: "Highest ADR in the city at $66/night. Business travelers drive weekday demand. 595 listings.",
  },
  {
    name: "Kilimani",
    yield: "7.2%",
    occupancy: "48%",
    avgNightly: "KES 6,000",
    trend: "down",
    description: "Most saturated market with 1,424 listings. Price wars driving rates down. Differentiation critical.",
  },
  {
    name: "Lavington",
    yield: "7.8%",
    occupancy: "53%",
    avgNightly: "KES 5,700",
    trend: "stable",
    description: "Family-oriented neighborhood. 469 listings. Steady demand from relocating families and mid-term stays.",
  },
  {
    name: "Gigiri",
    yield: "8.5%",
    occupancy: "50%",
    avgNightly: "KES 9,400",
    trend: "up",
    description: "UN and embassy area. Highest rates at $72/night. Limited supply (44 listings) keeps competition low.",
  },
  {
    name: "Karen",
    yield: "6.5%",
    occupancy: "48%",
    avgNightly: "KES 7,000",
    trend: "stable",
    description: "Premium residential. Lower density with only 75 listings. Appeals to long-stay guests seeking space.",
  },
]

// Premium reports (gated)
const premiumReports = [
  {
    title: "Nairobi STR Deep Dive Q1 2026",
    description: "Deep analysis of 5,000+ Nairobi listings. Occupancy by property type, seasonal trends, pricing strategies that work.",
    price: "KES 4,999",
    pages: 45,
    released: "January 2026",
  },
  {
    title: "Neighborhood Investment Guide",
    description: "Which areas are oversaturated? Where's the opportunity? Data-driven investment recommendations.",
    price: "KES 7,999",
    pages: 62,
    released: "February 2026",
  },
  {
    title: "Pricing Optimization Playbook",
    description: "Dynamic pricing strategies used by top performers. Seasonal adjustments, event pricing, length-of-stay discounts.",
    price: "KES 3,499",
    pages: 28,
    released: "Coming Soon",
  },
]

function StatCard({ icon: Icon, label, value, subtext }: { 
  icon: React.ElementType
  label: string
  value: string
  subtext?: string
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
      <div className="mt-4 text-3xl font-bold text-gray-900">{value}</div>
      {subtext && <div className="mt-1 text-sm text-gray-500">{subtext}</div>}
    </div>
  )
}

function NeighborhoodCard({ neighborhood }: { neighborhood: typeof neighborhoods[0] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-gray-900">{neighborhood.name}</h3>
        </div>
        <div className={`flex items-center gap-1 text-sm ${
          neighborhood.trend === 'up' ? 'text-green-600' : 
          neighborhood.trend === 'down' ? 'text-red-600' : 'text-gray-500'
        }`}>
          {neighborhood.trend === 'up' && <TrendingUp className="h-4 w-4" />}
          {neighborhood.trend === 'up' ? 'Rising' : neighborhood.trend === 'down' ? 'Declining' : 'Stable'}
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600">{neighborhood.description}</p>
      <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
        <div>
          <div className="text-xs text-gray-500">Yield</div>
          <div className="font-semibold text-gray-900">{neighborhood.yield}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Occupancy</div>
          <div className="font-semibold text-gray-900">{neighborhood.occupancy}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Avg/Night</div>
          <div className="font-semibold text-gray-900">{neighborhood.avgNightly}</div>
        </div>
      </div>
    </div>
  )
}

function PremiumReportCard({ report }: { report: typeof premiumReports[0] }) {
  const isComingSoon = report.released === "Coming Soon"
  
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-bl-lg">
        {report.pages} pages
      </div>
      <h3 className="font-semibold text-gray-900 pr-16">{report.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{report.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-gray-900">{report.price}</span>
          {!isComingSoon && (
            <span className="ml-2 text-xs text-gray-500">{report.released}</span>
          )}
        </div>
        <Button 
          size="sm" 
          disabled={isComingSoon}
          variant={isComingSoon ? "outline" : "default"}
        >
          {isComingSoon ? "Coming Soon" : "Get Report"}
        </Button>
      </div>
    </div>
  )
}

export default function MarketIntelPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <BarChart3 className="h-4 w-4" />
              Market Intelligence
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Nairobi STR Market Data
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              We publish the data other operators keep secret. Real occupancy rates, 
              neighborhood performance, pricing trends, and investment opportunities.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Source: {marketOverview.source} | Updated: {marketOverview.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Market Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Percent}
                label="Market Avg Occupancy"
                value={marketOverview.averageOccupancy}
                subtext="Nairobi-wide average"
              />
              <StatCard 
                icon={TrendingUp}
                label="Elite Stays Occupancy"
                value={marketOverview.eliteStaysOccupancy}
                subtext="Our portfolio outperforms"
              />
              <StatCard 
                icon={DollarSign}
                label="Average Daily Rate"
                value={marketOverview.averageADR}
                subtext="~KES 7,150/night"
              />
              <StatCard 
                icon={Building2}
                label="Active Listings"
                value={marketOverview.totalListings}
                subtext="Nairobi Airbnb market"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Analysis */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Neighborhood Analysis</h2>
                <p className="mt-2 text-gray-600">Performance breakdown by area — where to invest, where to avoid.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighborhoods.map((neighborhood) => (
                <NeighborhoodCard key={neighborhood.name} neighborhood={neighborhood} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Insights</h2>
            <div className="space-y-6">
              <div className="rounded-2xl bg-green-50 p-6 ring-1 ring-green-100">
                <h3 className="font-semibold text-green-900">🔥 Opportunity: Gigiri & Downtown</h3>
                <p className="mt-2 text-green-800">
                  Highest ADRs in the city ($66-72/night). Limited supply keeps competition manageable. 
                  UN staff, diplomats, and business travelers drive consistent demand.
                </p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100">
                <h3 className="font-semibold text-blue-900">📈 Strategy: Mid-Term Rentals</h3>
                <p className="mt-2 text-blue-800">
                  1-3 month stays are becoming the sweet spot. Less turnover, guaranteed occupancy, 
                  better guests. Expats and digital nomads driving this shift.
                </p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-100">
                <h3 className="font-semibold text-amber-900">⚠️ Saturated: Kilimani</h3>
                <p className="mt-2 text-amber-800">
                  1,424 listings competing for guests. Price wars pushing rates down — units that 
                  fetched $70/night now struggle at $40. Differentiation is survival.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Reports (Gated) */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Premium Reports</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Go Deeper</h2>
            <p className="text-gray-400 mb-8">
              Detailed analysis and actionable insights for serious investors and operators.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumReports.map((report) => (
                <PremiumReportCard key={report.title} report={report} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Mail className="h-4 w-4" />
              Free Monthly Update
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Get Market Updates in Your Inbox
            </h2>
            <p className="mt-4 text-gray-600">
              Monthly insights on the Nairobi STR market. New data, trends, and opportunities. Free.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary w-full sm:w-80"
              />
              <Button type="submit" size="lg">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="mt-3 text-xs text-gray-500">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* For Property Owners CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Own Property in Nairobi?
                  </h2>
                  <p className="mt-4 text-gray-600">
                    We outperform market averages by 5-10%. Let us show you what your property could earn 
                    with professional management.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-primary" />
                      Free property assessment
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Revenue projection for your unit
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="h-4 w-4 text-primary" />
                      No obligation, no fees
                    </li>
                  </ul>
                </div>
                <div className="text-center lg:text-right">
                  <Button size="lg" asChild>
                    <Link href="/investors">
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
