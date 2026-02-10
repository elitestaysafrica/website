'use client';

import { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, differenceInDays, addDays, isWithinInterval, parseISO } from 'date-fns';
import { Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import 'react-day-picker/style.css';

interface BookingWidgetProps {
  price: number | null;
  maxGuests: number;
  checkInTime: string;
  checkOutTime: string;
  bookingUrl: string | null;
  slug: string;
  bookedDates?: { start: string; end: string }[];
}

export function BookingWidget({
  price,
  maxGuests,
  checkInTime,
  checkOutTime,
  bookingUrl,
  bookedDates = [],
}: BookingWidgetProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);

  // Convert booked dates to disabled dates
  const disabledDays = bookedDates.flatMap(({ start, end }) => {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    const days = [];
    let current = startDate;
    while (current < endDate) {
      days.push(new Date(current));
      current = addDays(current, 1);
    }
    return days;
  });

  // Calculate nights and total
  const nights = dateRange?.from && dateRange?.to 
    ? differenceInDays(dateRange.to, dateRange.from) 
    : 0;
  const total = price ? price * nights : 0;

  // Build Airbnb URL with dates
  const buildBookingUrl = () => {
    if (!bookingUrl) return null;
    
    let url = bookingUrl;
    const params = new URLSearchParams();
    
    if (dateRange?.from) {
      params.set('check_in', format(dateRange.from, 'yyyy-MM-dd'));
    }
    if (dateRange?.to) {
      params.set('check_out', format(dateRange.to, 'yyyy-MM-dd'));
    }
    if (guests > 1) {
      params.set('guests', guests.toString());
    }
    
    const queryString = params.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
    
    return url;
  };

  return (
    <div className="sticky top-24 rounded-2xl border border-gray-200 p-6 shadow-lg bg-white">
      {/* Price */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <span className="text-2xl font-bold text-gray-900">
          KES {price?.toLocaleString() || 'Contact us'}
        </span>
        {price && <span className="text-gray-500"> / night</span>}
      </div>

      {/* Calendar - Always Visible */}
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Select dates</div>
        <div className="border border-gray-200 rounded-xl p-3 bg-gray-50">
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            disabled={[
              { before: new Date() },
              ...disabledDays.map(d => new Date(d))
            ]}
            numberOfMonths={1}
            showOutsideDays={false}
            className="!font-sans mx-auto"
            styles={{
              month: { width: '100%' },
              table: { width: '100%' },
            }}
          />
        </div>
        {dateRange?.from && dateRange?.to && (
          <div className="flex justify-between items-center mt-2 text-sm">
            <span className="text-gray-600">
              {format(dateRange.from, 'MMM d')} → {format(dateRange.to, 'MMM d, yyyy')}
            </span>
            <button
              onClick={() => setDateRange(undefined)}
              className="text-primary hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Guest Selection */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <div className="text-sm font-medium text-gray-700 mb-2">Guests</div>
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{guests} guest{guests !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>
            <span className="w-6 text-center font-medium">{guests}</span>
            <button
              onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
              disabled={guests >= maxGuests}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">Maximum {maxGuests} guests</p>
      </div>

      {/* Price Breakdown */}
      {nights > 0 && price && (
        <div className="mb-4 pb-4 border-b border-gray-100 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              KES {price.toLocaleString()} × {nights} night{nights !== 1 ? 's' : ''}
            </span>
            <span>KES {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>KES {total.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Book Button */}
      {bookingUrl ? (
        <Button size="lg" className="w-full text-base" asChild>
          <a href={buildBookingUrl() || bookingUrl} target="_blank" rel="noopener noreferrer">
            {nights > 0 ? 'Reserve on Airbnb' : 'Check Availability'}
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      ) : (
        <Button size="lg" className="w-full text-base" asChild>
          <Link href="/contact">Contact Us to Book</Link>
        </Button>
      )}

      {/* Check-in/out times */}
      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-xs text-gray-400">Check-in</div>
          <div className="font-medium text-gray-700">{checkInTime}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Check-out</div>
          <div className="font-medium text-gray-700">{checkOutTime}</div>
        </div>
      </div>
    </div>
  );
}
