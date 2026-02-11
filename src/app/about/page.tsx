import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building2, Users, TrendingUp, Shield } from "lucide-react"

export const metadata = {
  title: "About Us | Elite Stays Africa",
  description: "Learn about Elite Stays Africa - Nairobi's premier short-term rental operator. Our story, mission, and commitment to exceptional hospitality.",
}

const stats = [
  { label: "Properties Managed", value: "50+" },
  { label: "Guests Hosted", value: "5,000+" },
  { label: "Average Occupancy", value: "85%+" },
  { label: "Years in Nairobi", value: "4" },
]

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description: "Every property meets our rigorous standards. We don't cut corners on cleanliness, comfort, or communication.",
  },
  {
    icon: Users,
    title: "Guest-Centric",
    description: "From booking to checkout, we obsess over the guest experience. Happy guests mean repeat bookings and great reviews.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven",
    description: "We use real market data to optimize pricing, occupancy, and operations. No guesswork, just results.",
  },
  {
    icon: Building2,
    title: "Local Expertise",
    description: "We live in Nairobi. We know the neighborhoods, the market, and what guests need. That local knowledge is our edge.",
  },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              About Elite Stays Africa
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We&apos;re building the future of short-term rentals in East Africa — 
              one exceptional stay at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Our Story
            </h2>
            <div className="mt-6 space-y-6 text-gray-600">
              <p>
                Elite Stays Africa started with a simple observation: Nairobi&apos;s 
                short-term rental market was full of potential, but lacking in 
                professionalism. Guests wanted hotel-quality experiences in home-like 
                settings. Property owners wanted hassle-free income. Both were being 
                underserved.
              </p>
              <p>
                We set out to bridge that gap. Starting with a single apartment in 
                Westlands, we built systems for cleaning, guest communication, and 
                pricing that delivered consistent results. Word spread. Property 
                owners approached us to manage their units. Guests started booking 
                directly for their return trips.
              </p>
              <p>
                Today, we manage a portfolio of premium properties across Nairobi&apos;s 
                best neighborhoods — Westlands, Kilimani, Kileleshwa, and beyond. 
                We&apos;ve hosted hundreds of guests, from business travelers and 
                relocating families to tourists exploring Kenya.
              </p>
              <p>
                But we&apos;re just getting started. With new developments on the 
                horizon and a growing team, we&apos;re scaling our operations while 
                maintaining the quality that got us here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              What We Stand For
            </h2>
            <p className="mt-4 text-gray-600">
              Our values guide every decision, from which properties we take on 
              to how we train our team.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="rounded-2xl bg-white p-8 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to Work With Us?
            </h2>
            <p className="mt-4 text-gray-600">
              Whether you&apos;re looking for your next stay or want to partner 
              with us on your property, we&apos;d love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/properties">Browse Properties</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
