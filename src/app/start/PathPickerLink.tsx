'use client';

import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackPathPickerIntent } from '@/lib/analytics';

type PathPickerLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  pathKey: string;
  pathLabel: string;
  ctaText: string;
};

export function PathPickerLink({
  href,
  children,
  pathKey,
  pathLabel,
  ctaText,
  onClick,
  ...props
}: PathPickerLinkProps) {
  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'] = (event) => {
    trackPathPickerIntent({
      pathKey,
      pathLabel,
      ctaText,
      destinationUrl: href,
      pagePath: '/start',
      pageTitle: 'Elite Stays Africa Start Here',
      source: 'peris_tiktok',
    });

    onClick?.(event);
  };

  const shouldUsePlainAnchor =
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('/blog');

  if (shouldUsePlainAnchor) {
    return (
      <a href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} prefetch={false} {...props}>
      {children}
    </Link>
  );
}
