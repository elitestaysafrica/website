'use client';

import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  coordinates: { lat: number; lng: number } | null;
  address: string;
  gmapsUrl: string | null;
}

export function PropertyMap({ coordinates, address, gmapsUrl }: PropertyMapProps) {
  // Use Google Maps embed - search by address to show pin
  const query = encodeURIComponent(address || `${coordinates?.lat},${coordinates?.lng}`);
  const mapEmbedUrl = (coordinates || address)
    ? `https://maps.google.com/maps?q=${query}&z=16&output=embed`
    : null;

  if (!coordinates && !gmapsUrl) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
      <div className="rounded-xl overflow-hidden border border-gray-200">
        {mapEmbedUrl ? (
          <>
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {gmapsUrl && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <a 
                  href={gmapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="h-[350px] bg-gray-100 flex items-center justify-center">
            <div className="text-center p-6">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-3">{address}</p>
              {gmapsUrl && (
                <a 
                  href={gmapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  View on Google Maps →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
