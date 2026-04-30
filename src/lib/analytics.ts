export type PropertyBookingClickParams = {
  propertyId?: number;
  propertySlug: string;
  propertyName?: string;
  location?: string;
  source: 'property_card' | 'property_page_booking_widget';
  buttonText: 'Book Now' | 'Check Availability' | 'Reserve on Airbnb';
  destinationUrl: string;
  nights?: number;
  guests?: number;
  checkIn?: string;
  checkOut?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackPropertyBookingClick({
  propertyId,
  propertySlug,
  propertyName,
  location,
  source,
  buttonText,
  destinationUrl,
  nights,
  guests,
  checkIn,
  checkOut,
}: PropertyBookingClickParams) {
  if (typeof window === 'undefined') {
    return;
  }

  const eventParams = {
    property_id: propertyId,
    property_slug: propertySlug,
    property_name: propertyName,
    property_location: location,
    click_source: source,
    button_text: buttonText,
    destination_url: destinationUrl,
    nights,
    guests,
    check_in: checkIn,
    check_out: checkOut,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'property_booking_click', eventParams);
  }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'PropertyBookingIntent', eventParams);
  }
}

export function addBookingTrackingParams(
  url: string,
  {
    propertySlug,
    source,
    buttonText,
  }: Pick<PropertyBookingClickParams, 'propertySlug' | 'source' | 'buttonText'>
) {
  try {
    const trackedUrl = new URL(url);
    trackedUrl.searchParams.set('utm_source', 'elitestaysafrica.com');
    trackedUrl.searchParams.set('utm_medium', 'website');
    trackedUrl.searchParams.set('utm_campaign', 'property_booking');
    trackedUrl.searchParams.set('utm_content', `${source}_${buttonText.toLowerCase().replace(/\s+/g, '_')}_${propertySlug}`);
    return trackedUrl.toString();
  } catch {
    return url;
  }
}
