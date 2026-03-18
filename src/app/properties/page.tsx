import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProperties, Property } from "@/lib/api";
import { Suspense } from "react";
import { PropertyFilter } from "./PropertyFilter";

export const metadata = {
  title: 'Short-Term Rental Properties in Nairobi | Elite Stays Africa',
  description: 'Browse professionally-managed Airbnb apartments in Nairobi — Westlands, Kilimani, Lavington, Kileleshwa. 4.92★ rated, fully furnished, instant booking.',
  alternates: {
    canonical: 'https://www.elitestaysafrica.com/properties',
  },
  keywords: [
    'short-term rentals Nairobi',
    'Airbnb Nairobi',
    'furnished apartments Nairobi',
    'serviced apartments Nairobi',
    'Westlands apartment rental',
    'Kilimani short stay',
    'Lavington furnished apartment',
    'Kileleshwa Airbnb',
    'Nairobi vacation rental',
    'elite stays Africa',
  ],
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

  return <PropertyFilter properties={properties} locations={locations} />;
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
              Short-Term Rental Apartments in Nairobi
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Professionally managed, fully furnished Airbnb apartments in Westlands, Kilimani, Lavington, and Kileleshwa.
              Rated 4.92★ — every property is guest-ready from day one.
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
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <a
                href="https://wa.me/254111695444"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                Or message us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
