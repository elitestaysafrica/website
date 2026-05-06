import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  Building2,
  GraduationCap,
  Home,
  MessageCircle,
  Paintbrush,
  Sparkles,
  Star,
} from 'lucide-react';
import { TrackPageIntent } from '@/components/IntentTracking';
import { PathPickerLink } from './PathPickerLink';

export const metadata: Metadata = {
  title: 'Start Here | Elite Stays Africa',
  description:
    'Choose your path with Elite Stays Africa: book a Nairobi stay, learn Airbnb/STR through ESA Academy, furnish your unit, or get property management support.',
  alternates: {
    canonical: 'https://elitestaysafrica.com/start',
  },
  openGraph: {
    title: 'Start Here | Elite Stays Africa',
    description:
      'Book a stay, learn STR, furnish a unit, or work with Elite Stays Africa.',
    url: 'https://elitestaysafrica.com/start',
    siteName: 'Elite Stays Africa',
    type: 'website',
    images: [
      {
        url: 'https://pub-fc83f3cd6db94e62b59d4ec345ce8ffe.r2.dev/website/properties/2/4a7ba536-95e6-4aa5-b13b-82a1f7f12204.jpg',
        width: 1200,
        height: 630,
        alt: 'Elite Stays Africa premium Nairobi short-term rentals',
      },
    ],
  },
};

const whatsappBase = 'https://wa.me/254111695444';

const paths = [
  {
    key: 'academy',
    label: 'Academy',
    title: 'Learn Airbnb & STR in Kenya',
    description: 'Start or improve your short-term rental business with ESA Academy.',
    href: '/academy?utm_source=tiktok&utm_medium=social&utm_campaign=peris_tiktok_start&utm_content=academy',
    cta: 'Explore ESA Academy',
    icon: GraduationCap,
    badge: 'Aspiring hosts',
  },
  {
    key: 'properties',
    label: 'Properties',
    title: 'Book a premium Nairobi stay',
    description: 'Browse fully-furnished ESA apartments for short stays, work trips, and longer visits.',
    href: '/properties?utm_source=tiktok&utm_medium=social&utm_campaign=peris_tiktok_start&utm_content=properties',
    cta: 'View available stays',
    icon: Home,
    badge: 'Guests',
  },
  {
    key: 'management',
    label: 'Management',
    title: 'Want ESA to manage your property?',
    description: 'For owners and investors who want stronger STR returns without running daily ops.',
    href: '/invest?utm_source=tiktok&utm_medium=social&utm_campaign=peris_tiktok_start&utm_content=management',
    cta: 'See management options',
    icon: Building2,
    badge: 'Owners',
  },
  {
    key: 'furnishing',
    label: 'Furnishing',
    title: 'Need help furnishing a unit?',
    description: 'Get your apartment guest-ready: setup, styling, essentials, photos, and launch prep.',
    href: `${whatsappBase}?text=${encodeURIComponent('Hi ESA, I came from TikTok and I need help furnishing or setting up a short-term rental unit.')}`,
    cta: 'Ask about furnishing',
    icon: Paintbrush,
    badge: 'Setup help',
  },
];

const secondaryLinks = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    title: 'Message us on WhatsApp',
    href: `${whatsappBase}?text=${encodeURIComponent('Hi ESA, I came from TikTok and I am not sure which path fits me yet.')}`,
    cta: 'WhatsApp ESA',
    icon: MessageCircle,
  },
  {
    key: 'blog',
    label: 'Blog',
    title: 'Read STR guides',
    href: '/blog?utm_source=tiktok&utm_medium=social&utm_campaign=peris_tiktok_start&utm_content=blog',
    cta: 'Read the blog',
    icon: BookOpen,
  },
];

export default function StartPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <TrackPageIntent
        audienceType="academy"
        intentType="tiktok_start_page_view"
        pagePath="/start"
        pageTitle="Elite Stays Africa Start Here"
      />

      <section className="relative isolate overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
        <div className="absolute -right-32 top-20 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-24 top-56 -z-10 h-64 w-64 rounded-full bg-gray-100 blur-3xl" />

        <div className="mx-auto" style={{ maxWidth: '34rem' }}>
          <div className="flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Elite Stays Africa"
              width={178}
              height={62}
              priority
              className="h-12 w-auto"
            />
          </div>

          <div className="mt-7 overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-gray-200">
            <div className="relative h-40 overflow-hidden sm:h-48">
              <Image
                src="https://pub-fc83f3cd6db94e62b59d4ec345ce8ffe.r2.dev/website/properties/2/4a7ba536-95e6-4aa5-b13b-82a1f7f12204.jpg"
                alt="Elite Stays Africa Nairobi apartment"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 520px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gray-800 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Seen us on TikTok?
                </div>
                <div className="hidden items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm sm:flex">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  4.92★
                </div>
              </div>
            </div>

            <div className="px-5 py-6 sm:px-7">
              <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Choose your Elite Stays Africa path.
              </h1>
              <p className="mx-auto mt-3 max-w-md text-center text-base leading-7 text-gray-600">
                Book a stay, learn the Airbnb business, furnish a unit, or have us manage your property.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-semibold text-gray-600">
                <span className="rounded-full bg-gray-50 px-3 py-1.5 ring-1 ring-gray-200">Nairobi operators</span>
                <span className="rounded-full bg-gray-50 px-3 py-1.5 ring-1 ring-gray-200">5,000+ guests hosted</span>
                <span className="rounded-full bg-gray-50 px-3 py-1.5 ring-1 ring-gray-200">4+ years</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {paths.map((path) => {
              const Icon = path.icon;
              return (
                <PathPickerLink
                  key={path.key}
                  href={path.href}
                  pathKey={path.key}
                  pathLabel={path.label}
                  ctaText={path.cta}
                  className="group flex items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-gray-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/80">
                      {path.badge}
                    </div>
                    <h2 className="mt-0.5 text-base font-bold text-gray-900 sm:text-lg">{path.title}</h2>
                    <p className="mt-1 text-sm leading-5 text-gray-600">{path.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-primary" />
                </PathPickerLink>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {secondaryLinks.map((link) => {
              const Icon = link.icon;
              return (
                <PathPickerLink
                  key={link.key}
                  href={link.href}
                  pathKey={link.key}
                  pathLabel={link.label}
                  ctaText={link.cta}
                  className="group flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 text-left text-sm font-bold text-gray-800 ring-1 ring-gray-200 transition hover:bg-white hover:ring-primary/30"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-5 w-5 text-primary" />
                    {link.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 transition group-hover:translate-x-1 group-hover:text-primary" />
                </PathPickerLink>
              );
            })}
          </div>

          <p className="mx-auto mt-6 max-w-md text-center text-xs leading-5 text-gray-500">
            Not sure where to start? Message us on WhatsApp and tell us whether you own a property, want to start Airbnb, or need a place to stay.
          </p>
        </div>
      </section>
    </div>
  );
}
