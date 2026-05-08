'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

function PageViewTrackingInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/class')) return;

    let cancelled = false;
    const queryString = searchParams.toString();
    const pagePath = queryString ? `${pathname}?${queryString}` : pathname;
    const pageLocation = `${window.location.origin}${pagePath}`;

    const sendWhenReady = (attempt = 0) => {
      if (cancelled) return;

      const gaReady = typeof window.gtag === 'function';
      const metaReady = typeof window.fbq === 'function';

      if ((!gaReady || !metaReady) && attempt < 10) {
        window.setTimeout(() => sendWhenReady(attempt + 1), 250);
        return;
      }

      trackPageView({
        pagePath,
        pageLocation,
        pageTitle: document.title,
      });
    };

    // Let Next.js update route metadata/title before sending the page_view.
    window.requestAnimationFrame(() => sendWhenReady());

    return () => {
      cancelled = true;
    };
  }, [pathname, searchParams]);

  return null;
}

export function PageViewTracking() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackingInner />
    </Suspense>
  );
}
