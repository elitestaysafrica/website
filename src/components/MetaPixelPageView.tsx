'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function MetaPixelPageViewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname?.startsWith('/class')) return;
    if (typeof window.fbq !== 'function') return;

    window.fbq('track', 'PageView');
  }, [pathname, searchParams]);

  return null;
}

export function MetaPixelPageView() {
  return (
    <Suspense fallback={null}>
      <MetaPixelPageViewInner />
    </Suspense>
  );
}
