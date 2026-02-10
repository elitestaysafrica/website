import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { getProperties, Property } from "@/lib/api";
import { Suspense } from "react";

export const metadata = {
  title: "Properties | Elite Stays Africa",
  description: "Browse our premium short-term rental properties in Nairobi. Fully-furnished apartments in Westlands, Kilimani, Kileleshwa and more.",
};

// Extract unique locations from properties
function extractLocations(properties: Property[]): string[] {
  const locations = new Set<string>();
  properties.forEach(p => {
    if (p.location && p.location !== 'Nairobi') {
      locations.add(p.location);
    }
  });
  return ['All', ...Array.from(locations).sort()];
}

// Property grid component (can be made client-side for filtering)
async function PropertyGrid() {
  const properties = await getProperties();
  const locations = extractLocations(properties);
  
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No properties available at the moment. Check back soon!</p>
      </div>
    );
  }

  return (
    <>
      {/* Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {locations.map((location, idx) => (
              <button
                key={location}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  idx === 0
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
    </>
  );
}

function LoadingSkeleton() {
  return (
    <section className="py-8 pb-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
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

      <Suspense fallback={<LoadingSkeleton />}>
        <PropertyGrid />
      </Suspense>

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
  );
}
