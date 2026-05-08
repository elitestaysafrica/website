'use client';

import { useEffect } from 'react';
import { trackStartPageView } from '@/lib/analytics';

export function StartPageTracking() {
  useEffect(() => {
    trackStartPageView({
      pagePath: '/start',
      pageTitle: 'Elite Stays Africa Start Here',
      source: 'peris_tiktok',
    });
  }, []);

  return null;
}
