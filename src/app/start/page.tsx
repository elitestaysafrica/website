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
    accent: 'from-[#d57b66] to-[#f4b08f]',
    badge: 'For aspiring hosts',
  },
  {
    key: 'properties',
    label: 'Properties',
    title: 'Book a premium Nairobi stay',
    description: 'Browse fully-furnished ESA apartments for short stays, work trips, and longer visits.',
    href: '/properties?utm_source=tiktok&utm_medium=social&utm_campaign=peris_tiktok_start&utm_content=properties',
    cta: 'View available stays',
    icon: Home,
    accent: 'from-[#111827] to-[#374151]',
    badge: 'For guests',
  },
  {
    key: 'management',
    label: 'Management',
    title: 'Want ESA to manage your property?',
    description: 'For owners and investors who want stronger STR returns without running daily ops.',
    href: '/invest?utm_source=tiktok&utm_medium=social&utm_campaign=peris_tiktok_start&utm_content=management',
    cta: 'See management options',
    icon: Building2,
    accent: 'from-[#7c3aed] to-[#a78bfa]',
    badge: 'For owners',
  },
  {
    key: 'furnishing',
    label: 'Furnishing',
    title: 'Need help furnishing a unit?',
    description: 'Get your apartment guest-ready: setup, styling, essentials, photos, and launch prep.',
    href: `${whatsappBase}?text=${encodeURIComponent('Hi ESA, I came from TikTok and I need help furnishing or setting up a short-term rental unit.')}`,
    cta: 'Ask about furnishing',
    icon: Paintbrush,
    accent: 'from-[#0f766e] to-[#2dd4bf]',
    badge: 'For setup help',
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
    <div className="min-h-screen bg-[#0b0f17] text-white">
      <TrackPageIntent
        audienceType="academy"
        intentType="tiktok_start_page_view"
        pagePath="/start"
        pageTitle="Elite Stays Africa Start Here"
      />

      <section className="relative isolate overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(213,123,102,0.32),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.22),transparent_34%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-white/10 to-transparent" />

        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-2xl shadow-black/30">
            <Image src="/images/logo.png" alt="Elite Stays Africa" width={48} height={48} priority />
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[#f4b08f]" />
            Seen us on TikTok?
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Choose your Elite Stays Africa path.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/72 sm:text-lg">
            Whether you want to book a stay, learn the Airbnb business, furnish a unit, or have us manage your property — start here.
          </p>

          <div className="mt-5 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 ring-1 ring-white/15">
            <Star className="h-4 w-4 fill-[#f4b08f] text-[#f4b08f]" />
            Nairobi operators • 12 units • 4.92★ guest rating
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl gap-4">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <PathPickerLink
                key={path.key}
                href={path.href}
                pathKey={path.key}
                pathLabel={path.label}
                ctaText={path.cta}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.08] p-4 text-left shadow-2xl shadow-black/20 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12] hover:shadow-black/30"
              >
                <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${path.accent}`} />
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${path.accent} shadow-lg shadow-black/20`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 inline-flex rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
                      {path.badge}
                    </div>
                    <h2 className="text-lg font-extrabold text-white sm:text-xl">{path.title}</h2>
                    <p className="mt-1 text-sm leading-5 text-white/64">{path.description}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm font-bold text-[#f4b08f]">
                      {path.cta}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </PathPickerLink>
            );
          })}
        </div>

        <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          {secondaryLinks.map((link) => {
            const Icon = link.icon;
            return (
              <PathPickerLink
                key={link.key}
                href={link.href}
                pathKey={link.key}
                pathLabel={link.label}
                ctaText={link.cta}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-left text-white/86 transition hover:bg-white/[0.1]"
              >
                <span className="flex items-center gap-3 font-bold">
                  <Icon className="h-5 w-5 text-[#f4b08f]" />
                  {link.title}
                </span>
                <ArrowRight className="h-4 w-4 text-white/50 transition group-hover:translate-x-1" />
              </PathPickerLink>
            );
          })}
        </div>

        <p className="mx-auto mt-7 max-w-md text-center text-xs leading-5 text-white/45">
          Tip: if you are not sure, message us on WhatsApp and tell us whether you own a property, want to start Airbnb, or need a place to stay.
        </p>
      </section>
    </div>
  );
}
