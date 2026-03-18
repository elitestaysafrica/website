'use client';

import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { Property } from "@/lib/api";

interface PropertyFilterProps {
  properties: Property[];
  locations: string[];
}

export function PropertyFilter({ properties, locations }: PropertyFilterProps) {
  const [activeLocation, setActiveLocation] = useState("All");

  const filtered = activeLocation === "All"
    ? properties
    : properties.filter((p) => p.location === activeLocation);

  return (
    <>
      {/* Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setActiveLocation(location)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeLocation === location
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
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No properties in {activeLocation} at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
