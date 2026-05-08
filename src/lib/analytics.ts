export type AudienceType = 'guest' | 'investor' | 'academy';

type MetaStandardEvent = 'ViewContent' | 'Lead' | 'Contact' | 'InitiateCheckout' | 'CompleteRegistration';

type IntentParams = {
  audienceType?: AudienceType;
  intentType: string;
  pagePath?: string;
  pageTitle?: string;
  ctaText?: string;
  destinationUrl?: string;
  formName?: string;
  source?: string;
  propertyId?: number;
  propertySlug?: string;
  propertyName?: string;
  propertyLocation?: string;
  location?: string;
  leadType?: string;
  journey?: string;
  tier?: string;
  subject?: string;
};

type PathPickerIntentParams = {
  pathKey: string;
  pathLabel: string;
  ctaText: string;
  destinationUrl: string;
  pagePath: string;
  pageTitle?: string;
  source?: string;
};

type StartPageViewParams = {
  pagePath: string;
  pageTitle?: string;
  source?: string;
};

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

function cleanParams(params: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
}

function sendAnalyticsEvent({
  gaEventName,
  metaCustomEventName,
  metaStandardEventName,
  params,
}: {
  gaEventName: string;
  metaCustomEventName?: string;
  metaStandardEventName?: MetaStandardEvent;
  params: Record<string, unknown>;
}) {
  if (typeof window === 'undefined') {
    return;
  }

  const eventParams = cleanParams(params);

  if (typeof window.gtag === 'function') {
    window.gtag('event', gaEventName, eventParams);
  }

  if (typeof window.fbq === 'function') {
    if (metaStandardEventName) {
      window.fbq('track', metaStandardEventName, eventParams);
    }

    if (metaCustomEventName) {
      window.fbq('trackCustom', metaCustomEventName, eventParams);
    }
  }
}

export function trackGuestIntent(
  params: IntentParams,
  metaStandardEventName?: MetaStandardEvent
) {
  const gaEventName = params.intentType === 'property_view'
    ? 'property_view'
    : params.intentType === 'lead_submit'
      ? 'guest_lead'
      : 'guest_intent';

  sendAnalyticsEvent({
    gaEventName,
    metaCustomEventName: 'GuestIntent',
    metaStandardEventName,
    params: {
      ...params,
      audience_type: 'guest',
      intent_type: params.intentType,
      page_path: params.pagePath,
      page_title: params.pageTitle,
      cta_text: params.ctaText,
      destination_url: params.destinationUrl,
      property_id: params.propertyId,
      property_slug: params.propertySlug,
      property_name: params.propertyName,
      property_location: params.propertyLocation ?? params.location,
    },
  });
}

export function trackInvestorIntent(
  params: IntentParams,
  metaStandardEventName?: MetaStandardEvent
) {
  const gaEventName = params.intentType === 'lead_submit' ? 'investor_lead' : 'investor_intent';

  sendAnalyticsEvent({
    gaEventName,
    metaCustomEventName: 'InvestorIntent',
    metaStandardEventName,
    params: {
      ...params,
      audience_type: 'investor',
      intent_type: params.intentType,
      page_path: params.pagePath,
      page_title: params.pageTitle,
      cta_text: params.ctaText,
      destination_url: params.destinationUrl,
      form_name: params.formName,
      lead_type: params.leadType,
      journey: params.journey,
      source: params.source,
    },
  });
}

export function trackAcademyInterest(
  params: IntentParams,
  metaStandardEventName?: MetaStandardEvent
) {
  const gaEventName = params.intentType === 'lead_submit' ? 'academy_lead' : 'academy_interest';

  sendAnalyticsEvent({
    gaEventName,
    metaCustomEventName: 'AcademyInterest',
    metaStandardEventName,
    params: {
      ...params,
      audience_type: 'academy',
      intent_type: params.intentType,
      page_path: params.pagePath,
      page_title: params.pageTitle,
      cta_text: params.ctaText,
      destination_url: params.destinationUrl,
      form_name: params.formName,
      tier: params.tier,
      source: params.source,
    },
  });
}

export function trackStartPageView({ pagePath, pageTitle, source }: StartPageViewParams) {
  sendAnalyticsEvent({
    gaEventName: 'start_page_view',
    metaCustomEventName: 'StartPageView',
    params: {
      intent_type: 'start_page_view',
      page_path: pagePath,
      page_title: pageTitle,
      source,
    },
  });
}

export function trackContactClick(params: IntentParams) {
  const audienceType = params.audienceType ?? 'guest';
  const gaEventName = `${audienceType}_contact_click`;
  const metaCustomEventName = audienceType === 'investor'
    ? 'InvestorContactIntent'
    : audienceType === 'academy'
      ? 'AcademyContactIntent'
      : 'GuestContactIntent';

  sendAnalyticsEvent({
    gaEventName,
    metaCustomEventName,
    metaStandardEventName: 'Contact',
    params: {
      ...params,
      audience_type: audienceType,
      intent_type: params.intentType,
      page_path: params.pagePath,
      cta_text: params.ctaText,
      destination_url: params.destinationUrl,
      subject: params.subject,
    },
  });
}

export function trackPathPickerIntent({
  pathKey,
  pathLabel,
  ctaText,
  destinationUrl,
  pagePath,
  pageTitle,
  source,
}: PathPickerIntentParams) {
  sendAnalyticsEvent({
    gaEventName: 'path_picker_click',
    metaCustomEventName: 'PathPickerClick',
    metaStandardEventName: 'ViewContent',
    params: {
      audience_type: pathKey,
      intent_type: 'path_picker_click',
      path_key: pathKey,
      path_label: pathLabel,
      page_path: pagePath,
      page_title: pageTitle,
      cta_text: ctaText,
      destination_url: destinationUrl,
      source,
    },
  });
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
  sendAnalyticsEvent({
    gaEventName: 'property_booking_click',
    metaCustomEventName: 'PropertyBookingIntent',
    params: {
      audience_type: 'guest',
      intent_type: 'property_booking_click',
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
    },
  });
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
