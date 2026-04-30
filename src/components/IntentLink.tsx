'use client';

import Link from 'next/link';
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { trackAcademyInterest, trackContactClick, trackGuestIntent, trackInvestorIntent, type AudienceType } from '@/lib/analytics';

type IntentLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  audienceType: AudienceType;
  intentType: string;
  ctaText: string;
  pagePath: string;
  standardEvent?: 'Contact' | 'Lead' | 'ViewContent';
};

export const IntentLink = forwardRef<HTMLAnchorElement, IntentLinkProps>(function IntentLink({
  href,
  children,
  audienceType,
  intentType,
  ctaText,
  pagePath,
  standardEvent,
  onClick,
  ...props
}, ref) {
  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'] = (event) => {
    const params = {
      intentType,
      pagePath,
      ctaText,
      destinationUrl: href,
    };

    if (standardEvent === 'Contact') {
      trackContactClick({ ...params, audienceType });
    } else if (audienceType === 'investor') {
      trackInvestorIntent(params, standardEvent);
    } else if (audienceType === 'academy') {
      trackAcademyInterest(params, standardEvent);
    } else {
      trackGuestIntent(params, standardEvent);
    }

    onClick?.(event);
  };

  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
});
