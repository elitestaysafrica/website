// API client for Staff App
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://staff.elitestaysafrica.com/api/website';

export interface Property {
  id: number;
  slug: string;
  name: string;
  description: string;
  cardBlurb: string | null;
  photos: { main: string; thumb: string }[];
  price: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  bookingUrl: string;
  location: string;
  address: string;
  gmapsUrl: string;
  coordinates: { lat: number; lng: number } | null;
  checkInTime: string;
  checkOutTime: string;
  hasCalendar: boolean;
  tags: string[];
  sortOrder: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

export async function getProperties(options?: { tag?: string; location?: string }): Promise<Property[]> {
  const params = new URLSearchParams();
  if (options?.tag) params.set('tag', options.tag);
  if (options?.location) params.set('location', options.location);
  
  const url = `${API_BASE}/properties${params.toString() ? '?' + params.toString() : ''}`;
  
  const res = await fetch(url, { 
    next: { revalidate: 60 } // Cache for 60 seconds
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }
  
  const json: ApiResponse<Property[]> = await res.json();
  return json.data;
}

export async function getProperty(slug: string): Promise<Property | null> {
  const res = await fetch(`${API_BASE}/properties/${slug}`, {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch property');
  }
  
  const json: ApiResponse<Property> = await res.json();
  return json.data;
}

export async function getPropertyAvailability(slug: string): Promise<{ start: string; end: string }[]> {
  const res = await fetch(`${API_BASE}/properties/${slug}/availability`, {
    next: { revalidate: 300 } // Cache for 5 minutes
  });
  
  if (!res.ok) return [];
  
  const json = await res.json();
  return json.booked_dates || [];
}

export async function getStats() {
  const res = await fetch(`${API_BASE}/stats`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  
  if (!res.ok) {
    return {
      totalProperties: 0,
      guestsHosted: '5,000+',
      avgOccupancy: '85%+',
      avgRating: '4.92',
      yearsInBusiness: 4,
    };
  }
  
  const json = await res.json();
  return json.data;
}

// Amenity display helpers
export const amenityLabels: Record<string, string> = {
  wifi: 'Fast WiFi',
  parking: 'Parking',
  pool: 'Pool',
  gym: 'Gym',
  kitchen: 'Full Kitchen',
  washer: 'Washer',
  workspace: 'Workspace',
  'backup-power': 'Backup Power',
  ac: 'Air Conditioning',
  tv: 'Smart TV',
  balcony: 'Balcony',
  terrace: 'Terrace',
  security: '24/7 Security',
};

export function getAmenityLabel(amenity: string): string {
  return amenityLabels[amenity] || amenity;
}
