import { notFound } from "next/navigation";
import Link from "next/link";
import { getProperty, getProperties, getPropertyAvailability } from "@/lib/api";

// Force dynamic rendering so env vars are available at runtime
export const dynamic = 'force-dynamic';
import { PhotoGallery } from "@/components/PhotoGallery";
import { BookingWidget } from "@/components/BookingWidget";
import { AmenitiesList } from "@/components/AmenitiesList";
import { PropertyMap } from "@/components/PropertyMap";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Users, 
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

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [property, bookedDates] = await Promise.all([
    getProperty(slug),
    getPropertyAvailability(slug),
  ]);
  
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

        {/* Photo Gallery with Lightbox */}
        <PhotoGallery photos={property.photos} name={property.name} />

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
            <div className="mt-6 flex flex-wrap items-center gap-6 text-gray-700 pb-6 border-b border-gray-200">
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
                {property.description?.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600 mb-4 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <AmenitiesList amenities={property.amenities || []} />

            {/* Map */}
            <PropertyMap 
              coordinates={property.coordinates} 
              address={property.address}
              gmapsUrl={property.gmapsUrl}
            />
          </div>

          {/* Sidebar - Booking Widget with Calendar */}
          <div className="lg:col-span-1">
            <BookingWidget
              price={property.price}
              maxGuests={property.maxGuests}
              checkInTime={property.checkInTime}
              checkOutTime={property.checkOutTime}
              bookingUrl={property.bookingUrl}
              slug={property.slug}
              bookedDates={bookedDates}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
