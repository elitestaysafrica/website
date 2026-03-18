import { Hero } from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { getProperties, getStats } from "@/lib/api";
import { StatsWithCurrency } from "@/components/StatsWithCurrency";
import { 
  MapPin, 
  Wifi, 
  ShieldCheck, 
  Users,
  BarChart3,
  Building2,
} from "lucide-react";

// Featured Properties Section
async function FeaturedProperties() {
  // Fetch featured properties, or fall back to all if none featured
  let properties = await getProperties({ tag: 'featured' });
  if (properties.length === 0) {
    properties = await getProperties();
  }
  // Show up to 3
  properties = properties.slice(0, 3);

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hand-Picked Properties
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Handpicked apartments in Nairobi&apos;s most desirable locations. Every unit is
            professionally managed, spotlessly clean, and equipped for work and leisure.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/properties">View All Properties →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Value Props Section
function WhyChooseUs() {
  const features = [
    {
      icon: MapPin,
      title: "Local Expertise",
      description:
        "We live and breathe Nairobi. Every property is in a neighborhood we know inside-out — so you get the best location, not just any location.",
    },
    {
      icon: Wifi,
      title: "Business-Ready",
      description:
        "Fast WiFi, dedicated workspaces, backup power. Whether you're here for a week or a month, you can work seamlessly.",
    },
    {
      icon: ShieldCheck,
      title: "Hotel Quality, Home Comfort",
      description:
        "Fresh linens, quality mattresses, fully-equipped kitchens, 24/7 support. All the comforts of home, none of the hassles.",
    },
    {
      icon: Users,
      title: "Transparent & Reliable",
      description:
        "No hidden fees. No surprises. Clear communication from booking to checkout. Check our reviews — guests come back.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Guests Choose Elite Stays
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We&apos;re not just another rental — we&apos;re your home in Nairobi.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Market Intel Teaser Section
function MarketIntelTeaser() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Nairobi STR Market Intelligence
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We publish the data other operators keep secret. Occupancy rates,
                pricing trends, neighborhood performance, investment opportunities.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Monthly market reports",
                  "Neighborhood deep-dives",
                  "Pricing & occupancy trends",
                  "Investment opportunity scores",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-x-3">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/market-intel">Access Market Data</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                <div className="h-full rounded-xl bg-white shadow-lg p-6">
                  <div className="text-sm font-medium text-gray-500">
                    Nairobi Market Average
                  </div>
                  <div className="mt-2 text-4xl font-bold text-gray-900">
                    45%
                  </div>
                  <div className="mt-1 text-sm text-green-600 font-semibold">
                    ↑ Elite Stays: 85%+
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Westlands</span>
                      <span className="font-medium">52%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Kilimani</span>
                      <span className="font-medium">48%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Lavington</span>
                      <span className="font-medium">53%</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t text-xs text-gray-400">
                    Source: Airbtics, AirDNA 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// For Investors Section
async function ForInvestors() {
  const stats = await getStats();
  
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <StatsWithCurrency 
                stats={[
                  { kesAmount: 175000, label: "1-bed owner net/mo", compact: true },
                  { kesAmount: 245000, label: "2-bed owner net/mo", compact: true },
                  { value: "4+", label: "years in Nairobi" },
                ]}
              />
              <ul className="mt-12 space-y-4">
                {[
                  "Complete property setup & furnishing",
                  "Professional photography & listing optimization",
                  "Dynamic pricing & revenue management",
                  "24/7 guest support & communication",
                  "Cleaning, maintenance & inspections",
                  "Monthly owner statements & payouts",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-x-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Partner With Nairobi&apos;s Best
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Own property in Nairobi? We&apos;ll turn it into a revenue machine.
              </p>
              <p className="mt-4 text-gray-400">
                Elite Stays handles everything — furnishing, listing, operations,
                guest management, maintenance. You collect monthly payouts while
                we handle the work.
              </p>
              <div className="mt-8 flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/invest">Learn More</Link>
                </Button>
                <Button size="lg" className="border border-gray-500 bg-transparent text-white hover:bg-white/10" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function FinalCTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to Experience Elite Stays?
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="rounded-2xl bg-gray-50 p-8">
              <h3 className="text-lg font-semibold text-gray-900">For Guests</h3>
              <p className="mt-2 text-gray-600">
                Browse our properties and book your next Nairobi stay.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/properties">Browse Properties</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl bg-primary/5 p-8 ring-1 ring-primary/10">
              <h3 className="text-lg font-semibold text-gray-900">For Owners</h3>
              <p className="mt-2 text-gray-600">
                Learn how we can maximize your property&apos;s potential.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/invest">Partner With Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <MarketIntelTeaser />
      <ForInvestors />
      <FinalCTA />
    </>
  );
}
