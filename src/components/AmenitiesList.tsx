'use client';

import { 
  Wifi, 
  Wind, 
  UtensilsCrossed, 
  WashingMachine,
  Tv,
  Monitor,
  Car,
  Waves,
  Dumbbell,
  ArrowUpDown,
  ShieldCheck,
  Zap,
  Bath,
  Coffee,
  Refrigerator,
  Utensils,
  Microwave,
  Bed,
  Sofa,
  Lock,
  Video,
  Flame,
  Snowflake,
  Sun,
  Moon,
  Check,
} from 'lucide-react';

// Amenity icon and label mapping
const amenityConfig: Record<string, { icon: React.ElementType; label: string }> = {
  'WiFi': { icon: Wifi, label: 'Fast WiFi' },
  'wifi': { icon: Wifi, label: 'Fast WiFi' },
  'Air Conditioning': { icon: Wind, label: 'Air Conditioning' },
  'ac': { icon: Wind, label: 'Air Conditioning' },
  'Kitchen': { icon: UtensilsCrossed, label: 'Full Kitchen' },
  'kitchen': { icon: UtensilsCrossed, label: 'Full Kitchen' },
  'Washer': { icon: WashingMachine, label: 'Washer' },
  'washer': { icon: WashingMachine, label: 'Washer' },
  'Dryer': { icon: WashingMachine, label: 'Dryer' },
  'dryer': { icon: WashingMachine, label: 'Dryer' },
  'TV': { icon: Tv, label: 'TV' },
  'tv': { icon: Tv, label: 'TV' },
  'Netflix': { icon: Tv, label: 'Netflix' },
  'netflix': { icon: Tv, label: 'Netflix' },
  'Workspace': { icon: Monitor, label: 'Dedicated Workspace' },
  'workspace': { icon: Monitor, label: 'Dedicated Workspace' },
  'Parking': { icon: Car, label: 'Free Parking' },
  'parking': { icon: Car, label: 'Free Parking' },
  'Pool': { icon: Waves, label: 'Pool' },
  'pool': { icon: Waves, label: 'Pool' },
  'Gym': { icon: Dumbbell, label: 'Gym' },
  'gym': { icon: Dumbbell, label: 'Gym' },
  'Elevator': { icon: ArrowUpDown, label: 'Elevator' },
  'elevator': { icon: ArrowUpDown, label: 'Elevator' },
  'Security': { icon: ShieldCheck, label: '24/7 Security' },
  'security': { icon: ShieldCheck, label: '24/7 Security' },
  'Generator': { icon: Zap, label: 'Backup Generator' },
  'generator': { icon: Zap, label: 'Backup Generator' },
  'backup-power': { icon: Zap, label: 'Backup Power' },
  'Balcony': { icon: Sun, label: 'Balcony' },
  'balcony': { icon: Sun, label: 'Balcony' },
  'Terrace': { icon: Sun, label: 'Terrace' },
  'terrace': { icon: Sun, label: 'Terrace' },
  'Hot Water': { icon: Flame, label: 'Hot Water' },
  'Heating': { icon: Flame, label: 'Heating' },
  'Breakfast': { icon: Coffee, label: 'Breakfast Included' },
  'Coffee Maker': { icon: Coffee, label: 'Coffee Maker' },
  'Refrigerator': { icon: Refrigerator, label: 'Refrigerator' },
  'Microwave': { icon: Microwave, label: 'Microwave' },
  'Iron': { icon: Utensils, label: 'Iron' },
  'Essentials': { icon: Bath, label: 'Essentials' },
  'Linens': { icon: Bed, label: 'Fresh Linens' },
  'Living Area': { icon: Sofa, label: 'Living Area' },
  'Safe': { icon: Lock, label: 'Safe' },
  'CCTV': { icon: Video, label: 'CCTV' },
};

interface AmenitiesListProps {
  amenities: string[];
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">What this place offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {amenities.map((amenity) => {
          const config = amenityConfig[amenity] || { icon: Check, label: amenity };
          const Icon = config.icon;
          
          return (
            <div key={amenity} className="flex items-center gap-4 py-3">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                <Icon className="h-6 w-6 text-gray-700" />
              </div>
              <span className="text-gray-700">{config.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
