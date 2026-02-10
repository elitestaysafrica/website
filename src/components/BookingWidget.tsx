'use client';

import { useState, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, differenceInDays, addDays, isWithinInterval, parseISO } from 'date-fns';
import { Calendar, Users, ExternalLink, ChevronDown } from 'lucide-react';
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
  slug,
  bookedDates = [],
}: BookingWidgetProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuests, setShowGuests] = useState(false);

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

  // Check if a date is booked
  const isDateBooked = (date: Date) => {
    return bookedDates.some(({ start, end }) => {
      const startDate = parseISO(start);
      const endDate = parseISO(end);
      return isWithinInterval(date, { start: startDate, end: addDays(endDate, -1) });
    });
  };

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
    <div className="sticky top-24 rounded-2xl border border-gray-200 p-6 shadow-sm bg-white">
      {/* Price */}
      <div className="mb-6">
        <span className="text-3xl font-bold text-gray-900">
          KES {price?.toLocaleString() || 'Contact us'}
        </span>
        {price && <span className="text-gray-500"> / night</span>}
      </div>

      {/* Date Selection */}
      <div className="space-y-3 mb-4">
        <div className="relative">
          <button
            onClick={() => { setShowCalendar(!showCalendar); setShowGuests(false); }}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500 uppercase">Check-in → Check-out</div>
                <div className="text-sm font-medium">
                  {dateRange?.from && dateRange?.to ? (
                    `${format(dateRange.from, 'MMM d')} → ${format(dateRange.to, 'MMM d')}`
                  ) : (
                    'Select dates'
                  )}
                </div>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showCalendar ? 'rotate-180' : ''}`} />
          </button>

          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
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
                className="!font-sans"
                classNames={{
                  day: 'h-9 w-9 text-sm rounded-full hover:bg-gray-100 transition-colors',
                  selected: '!bg-primary !text-white',
                  range_start: '!bg-primary !text-white rounded-full',
                  range_end: '!bg-primary !text-white rounded-full',
                  range_middle: '!bg-primary/20',
                  disabled: '!text-gray-300 !cursor-not-allowed hover:!bg-transparent',
                }}
              />
              <div className="flex justify-between items-center mt-2 pt-2 border-t">
                <button
                  onClick={() => setDateRange(undefined)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear dates
                </button>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Guest Selection */}
        <div className="relative">
          <button
            onClick={() => { setShowGuests(!showGuests); setShowCalendar(false); }}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500 uppercase">Guests</div>
                <div className="text-sm font-medium">
                  {guests} guest{guests !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showGuests ? 'rotate-180' : ''}`} />
          </button>

          {/* Guests Dropdown */}
          {showGuests && (
            <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                    disabled={guests >= maxGuests}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Maximum {maxGuests} guests</p>
            </div>
          )}
        </div>
      </div>

      {/* Price Breakdown */}
      {nights > 0 && price && (
        <div className="py-4 border-t border-b border-gray-200 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              KES {price.toLocaleString()} × {nights} night{nights !== 1 ? 's' : ''}
            </span>
            <span>KES {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>KES {total.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Book Button */}
      {bookingUrl ? (
        <Button size="lg" className="w-full" asChild>
          <a href={buildBookingUrl() || bookingUrl} target="_blank" rel="noopener noreferrer">
            {nights > 0 ? 'Reserve on Airbnb' : 'Check Availability'}
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      ) : (
        <Button size="lg" className="w-full" asChild>
          <Link href="/contact">Contact Us to Book</Link>
        </Button>
      )}

      {/* Check-in/out times */}
      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <div className="text-xs text-gray-400 uppercase">Check-in</div>
          <div className="font-medium">{checkInTime}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 uppercase">Check-out</div>
          <div className="font-medium">{checkOutTime}</div>
        </div>
      </div>

      {/* Contact link */}
      <div className="mt-4 text-center">
        <Link href="/contact" className="text-sm text-gray-500 hover:text-primary">
          Have questions? Contact us
        </Link>
      </div>
    </div>
  );
}
