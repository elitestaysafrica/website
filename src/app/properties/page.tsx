import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Bed, Bath, Wifi, Car } from "lucide-react"

export const metadata = {
  title: "Properties | Elite Stays Africa",
  description: "Browse our premium short-term rental properties in Nairobi. Fully-furnished apartments in Westlands, Kilimani, Kileleshwa and more.",
}

// Placeholder property data - will be replaced with API/database
const properties = [
  {
    id: 1,
    slug: "westlands-luxury-2br",
    name: "Luxury 2BR in Westlands",
    location: "Westlands",
    description: "Modern apartment with stunning city views, fast WiFi, and rooftop pool access.",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    pricePerNight: 12000,
    amenities: ["wifi", "parking", "pool", "gym"],
    image: "/placeholder-property-1.jpg",
    rating: 4.9,
    reviews: 47,
    airbnbUrl: "https://airbnb.com/rooms/example1",
  },
  {
    id: 2,
    slug: "kilimani-studio",
    name: "Cozy Studio in Kilimani",
    location: "Kilimani",
    description: "Perfect for solo travelers or couples. Walking distance to Yaya Centre.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricePerNight: 6500,
    amenities: ["wifi", "workspace"],
    image: "/placeholder-property-2.jpg",
    rating: 4.92,
    reviews: 32,
    airbnbUrl: "https://airbnb.com/rooms/example2",
  },
  {
    id: 3,
    slug: "kileleshwa-3br-family",
    name: "Spacious 3BR Family Home",
    location: "Kileleshwa",
    description: "Ideal for families. Quiet neighborhood, secure parking, full kitchen.",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricePerNight: 15000,
    amenities: ["wifi", "parking", "kitchen", "washer"],
    image: "/placeholder-property-3.jpg",
    rating: 4.9,
    reviews: 28,
    airbnbUrl: "https://airbnb.com/rooms/example3",
  },
  {
    id: 4,
    slug: "westlands-1br-business",
    name: "Business-Ready 1BR",
    location: "Westlands",
    description: "Dedicated workspace, backup power, premium WiFi. Perfect for remote workers.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricePerNight: 8500,
    amenities: ["wifi", "workspace", "backup-power"],
    image: "/placeholder-property-4.jpg",
    rating: 4.7,
    reviews: 51,
    airbnbUrl: "https://airbnb.com/rooms/example4",
  },
  {
    id: 5,
    slug: "kilimani-2br-modern",
    name: "Modern 2BR with Balcony",
    location: "Kilimani",
    description: "Newly renovated with modern finishes. Great views from private balcony.",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    pricePerNight: 11000,
    amenities: ["wifi", "balcony", "parking"],
    image: "/placeholder-property-5.jpg",
    rating: 4.92,
    reviews: 19,
    airbnbUrl: "https://airbnb.com/rooms/example5",
  },
  {
    id: 6,
    slug: "lavington-penthouse",
    name: "Penthouse Suite Lavington",
    location: "Lavington",
    description: "Premium penthouse with panoramic views. Rooftop terrace, luxury finishes.",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricePerNight: 22000,
    amenities: ["wifi", "parking", "terrace", "gym"],
    image: "/placeholder-property-6.jpg",
    rating: 5.0,
    reviews: 12,
    airbnbUrl: "https://airbnb.com/rooms/example6",
  },
]

const locations = ["All", "Westlands", "Kilimani", "Kileleshwa", "Lavington"]

function PropertyCard({ property }: { property: typeof properties[0] }) {
  return (
    <div className="group rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Photo coming soon</span>
        </div>
        {/* Location badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
          {property.location}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {property.name}
          </h3>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{property.rating}</span>
            <span className="text-gray-400">({property.reviews})</span>
          </div>
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {property.description}
        </p>

        {/* Details */}
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{property.maxGuests} guests</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-3 flex items-center gap-2">
          {property.amenities.includes("wifi") && (
            <div className="rounded-full bg-gray-100 p-1.5" title="WiFi">
              <Wifi className="h-3 w-3 text-gray-600" />
            </div>
          )}
          {property.amenities.includes("parking") && (
            <div className="rounded-full bg-gray-100 p-1.5" title="Parking">
              <Car className="h-3 w-3 text-gray-600" />
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              KES {property.pricePerNight.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm"> / night</span>
          </div>
          <Button size="sm" asChild>
            <a href={property.airbnbUrl} target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Our Properties
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Premium short-term rentals across Nairobi&apos;s best neighborhoods. 
              Every property is professionally managed and guest-ready.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {locations.map((location) => (
              <button
                key={location}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  location === "All"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Property Grid */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Don&apos;t see what you&apos;re looking for?
            </h2>
            <p className="mt-4 text-gray-600">
              Contact us with your requirements and we&apos;ll help you find the perfect stay.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
