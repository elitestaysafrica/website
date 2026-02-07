import { Hero } from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Wifi, 
  ShieldCheck, 
  Users,
  TrendingUp,
  BarChart3,
  Building2,
  Bed,
  Bath,
  Users as Guests
} from "lucide-react";

// Featured Properties Section
function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      name: "Luxury Studio - Westlands",
      location: "Westlands",
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      price: "KES 8,500",
      image: "/images/placeholder-property.jpg",
      href: "/properties/westlands-studio",
    },
    {
      id: 2,
      name: "Modern 2BR - Kilimani",
      location: "Kilimani",
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      price: "KES 12,000",
      image: "/images/placeholder-property.jpg",
      href: "/properties/kilimani-2br",
    },
    {
      id: 3,
      name: "Executive Suite - Riverside",
      location: "Riverside",
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      price: "KES 10,000",
      image: "/images/placeholder-property.jpg",
      href: "/properties/riverside-suite",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore Our Properties
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Handpicked apartments in Nairobi&apos;s most desirable locations. Every unit is
            professionally managed, spotlessly clean, and equipped for work and leisure.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={property.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Building2 className="h-12 w-12" />
                </div>
              </div>
              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {property.name}
                </h3>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {property.bedrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {property.bathrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Guests className="h-4 w-4" />
                    {property.guests}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <span className="text-lg font-bold text-gray-900">{property.price}</span>
                  <span className="text-sm text-gray-500"> / night</span>
                </div>
              </div>
            </Link>
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
function ForInvestors() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white">KES 180K+</div>
                  <div className="mt-1 text-sm text-gray-400">
                    avg monthly revenue
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">85%+</div>
                  <div className="mt-1 text-sm text-gray-400">occupancy rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="mt-1 text-sm text-gray-400">properties managed</div>
                </div>
              </div>
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
                  <Link href="/investors">Learn More</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800" asChild>
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
                  <Link href="/investors">Partner With Us</Link>
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
