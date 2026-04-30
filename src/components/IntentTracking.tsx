'use client';

import { useEffect } from 'react';
import { trackAcademyInterest, trackGuestIntent, trackInvestorIntent, type AudienceType } from '@/lib/analytics';

type TrackPageIntentProps = {
  audienceType: AudienceType;
  intentType: string;
  pagePath: string;
  pageTitle?: string;
  propertySlug?: string;
  propertyName?: string;
  propertyLocation?: string;
};

export function TrackPageIntent({
  audienceType,
  intentType,
  pagePath,
  pageTitle,
  propertySlug,
  propertyName,
  propertyLocation,
}: TrackPageIntentProps) {
  useEffect(() => {
    const params = {
      intentType,
      pagePath,
      pageTitle,
      propertySlug,
      propertyName,
      propertyLocation,
    };

    if (audienceType === 'investor') {
      trackInvestorIntent(params, 'ViewContent');
    } else if (audienceType === 'academy') {
      trackAcademyInterest(params, 'ViewContent');
    } else {
      trackGuestIntent(params, 'ViewContent');
    }
  }, [audienceType, intentType, pagePath, pageTitle, propertySlug, propertyName, propertyLocation]);

  return null;
}
