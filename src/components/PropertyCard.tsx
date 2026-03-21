'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Bed, Bath, Wifi, Car, Dumbbell, Waves } from "lucide-react";
import { Property } from "@/lib/api";
import { useCurrency } from "@/components/CurrencySelector";

interface PropertyCardProps {
  property: Property;
  showBookButton?: boolean;
  priority?: boolean;
}

export function PropertyCard({ property, showBookButton = true, priority = false }: PropertyCardProps) {
  const mainPhoto = property.photos[0];
  const { convert } = useCurrency();
  
  return (
    <div className="group rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
          {mainPhoto ? (
            <Image
              src={mainPhoto.main || mainPhoto.thumb}
              alt={`${property.name} - ${property.location}, Nairobi`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Photo coming soon</span>
            </div>
          )}
          {/* Location badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
            <MapPin className="h-3 w-3 inline mr-1" />
            {property.location}
          </div>
          {/* Tags */}
          {property.tags.includes('featured') && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white rounded-full px-3 py-1 text-xs font-medium">
              ⭐ Featured
            </div>
          )}
          {property.tags.includes('new') && !property.tags.includes('featured') && (
            <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium">
              New
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/properties/${property.slug}`}>
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {property.name}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {property.cardBlurb || property.description?.slice(0, 120) + '...'}
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
          {property.amenities?.includes('wifi') && (
            <div className="rounded-full bg-gray-100 p-1.5" title="WiFi">
              <Wifi className="h-3 w-3 text-gray-600" />
            </div>
          )}
          {property.amenities?.includes('parking') && (
            <div className="rounded-full bg-gray-100 p-1.5" title="Parking">
              <Car className="h-3 w-3 text-gray-600" />
            </div>
          )}
          {property.amenities?.includes('pool') && (
            <div className="rounded-full bg-gray-100 p-1.5" title="Pool">
              <Waves className="h-3 w-3 text-gray-600" />
            </div>
          )}
          {property.amenities?.includes('gym') && (
            <div className="rounded-full bg-gray-100 p-1.5" title="Gym">
              <Dumbbell className="h-3 w-3 text-gray-600" />
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {property.price ? convert(property.price) : 'Contact us'}
            </span>
            {property.price && <span className="text-gray-500 text-sm"> / night</span>}
          </div>
          {showBookButton && property.bookingUrl && (
            <Button size="sm" asChild>
              <a href={property.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
