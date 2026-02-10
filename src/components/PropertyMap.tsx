'use client';

import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  coordinates: { lat: number; lng: number } | null;
  address: string;
  gmapsUrl: string | null;
  apiKey?: string;
}

export function PropertyMap({ coordinates, address, gmapsUrl, apiKey }: PropertyMapProps) {
  // Build embed URL if we have coordinates and API key
  const mapEmbedUrl = coordinates && apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${coordinates.lat},${coordinates.lng}&zoom=15`
    : null;

  if (!coordinates && !gmapsUrl) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
      <div className="rounded-xl overflow-hidden">
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
              className="rounded-xl"
            />
            {gmapsUrl && (
              <a 
                href={gmapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-primary mt-2 inline-block"
              >
                Open in Google Maps →
              </a>
            )}
          </>
        ) : (
          <div className="h-[350px] bg-gray-100 flex items-center justify-center rounded-xl">
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
