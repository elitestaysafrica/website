import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProperty, getProperties, getAmenityLabel } from "@/lib/api";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Users, 
  Clock, 
  ExternalLink,
  Wifi,
  Car,
  Dumbbell,
  Waves,
  Tv,
  Wind,
  UtensilsCrossed,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";

// Generate static params for all properties
export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getProperty(slug);
  
  if (!property) {
    return { title: "Property Not Found | Elite Stays Africa" };
  }
  
  return {
    title: `${property.name} | Elite Stays Africa`,
    description: property.cardBlurb || property.description?.slice(0, 160),
    openGraph: {
      images: property.photos[0]?.main ? [property.photos[0].main] : [],
    },
  };
}

// Amenity icon mapping
const amenityIcons: Record<string, React.ElementType> = {
  wifi: Wifi,
  parking: Car,
  gym: Dumbbell,
  pool: Waves,
  tv: Tv,
  ac: Wind,
  kitchen: UtensilsCrossed,
  security: ShieldCheck,
};

// Image Gallery Component
function ImageGallery({ photos, name }: { photos: { main: string; thumb: string }[]; name: string }) {
  if (photos.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400">No photos available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden">
      {/* Main image */}
      <div className="col-span-4 md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto">
        <Image
          src={photos[0].main}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {/* Secondary images */}
      {photos.slice(1, 5).map((photo, idx) => (
        <div key={idx} className="relative aspect-[4/3] hidden md:block">
          <Image
            src={photo.thumb || photo.main}
            alt={`${name} - ${idx + 2}`}
            fill
            className="object-cover"
            sizes="25vw"
          />
          {idx === 3 && photos.length > 5 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">+{photos.length - 5} more</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Google Map Component
function PropertyMap({ coordinates, address, gmapsUrl }: { 
  coordinates: { lat: number; lng: number } | null;
  address: string;
  gmapsUrl: string | null;
}) {
  if (!coordinates) {
    return null;
  }

  // Use Google Maps Static API or embed
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${coordinates.lat},${coordinates.lng}&zoom=15`;
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
      <div className="rounded-xl overflow-hidden">
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ? (
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="h-[300px] bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">{address}</p>
              {gmapsUrl && (
                <a 
                  href={gmapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-2 inline-block"
                >
                  View on Google Maps →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      {gmapsUrl && process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
        <a 
          href={gmapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-primary mt-2 inline-block"
        >
          Open in Google Maps →
        </a>
      )}
    </div>
  );
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getProperty(slug);
  
  if (!property) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Back link */}
        <Link 
          href="/properties" 
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Properties
        </Link>

        {/* Image Gallery */}
        <ImageGallery photos={property.photos} name={property.name} />

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}</span>
                  {property.tags.includes('featured') && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {property.name}
                </h1>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                <span>{property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5" />
                <span>{property.bathrooms} Bathroom{property.bathrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Up to {property.maxGuests} guests</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this property</h2>
              <div className="prose prose-gray max-w-none">
                {property.description?.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || ShieldCheck;
                    return (
                      <div key={amenity} className="flex items-center gap-3 text-gray-700">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span>{getAmenityLabel(amenity)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Map */}
            <PropertyMap 
              coordinates={property.coordinates} 
              address={property.address}
              gmapsUrl={property.gmapsUrl}
            />
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-gray-200 p-6 shadow-sm">
              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  KES {property.price?.toLocaleString() || 'Contact us'}
                </span>
                {property.price && (
                  <span className="text-gray-500"> / night</span>
                )}
              </div>

              {/* Check-in/out */}
              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Check-in: {property.checkInTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Check-out: {property.checkOutTime}</span>
                </div>
              </div>

              {/* Book Button */}
              {property.bookingUrl ? (
                <Button size="lg" className="w-full" asChild>
                  <a href={property.bookingUrl} target="_blank" rel="noopener noreferrer">
                    Book on Airbnb
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              ) : (
                <Button size="lg" className="w-full" asChild>
                  <Link href="/contact">Contact Us to Book</Link>
                </Button>
              )}

              {/* Contact */}
              <div className="mt-4 text-center">
                <Link href="/contact" className="text-sm text-gray-500 hover:text-primary">
                  Have questions? Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
