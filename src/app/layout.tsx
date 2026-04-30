import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/Providers";
import { MetaPixelPageView } from "@/components/MetaPixelPageView";

const inter = Inter({ subsets: ["latin"] });
const GA_ID = "G-K2K44Z6MSN";
const META_PIXEL_ID = "981780637838760";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  title: "Elite Stays Africa | Premium Short-Term Rentals in Nairobi",
  description:
    "Book professionally-managed Airbnb apartments in Nairobi's best neighborhoods. Business-ready, fully-furnished, and guest-approved. Or partner with us to maximize your property's returns.",
  keywords: [
    "Nairobi short term rentals",
    "Airbnb Nairobi",
    "Serviced apartments Nairobi",
    "Westlands Airbnb",
    "Kilimani furnished apartment",
    "Nairobi property management",
    "Kenya STR investment",
  ],
  authors: [{ name: "Elite Stays Africa" }],
  openGraph: {
    title: "Elite Stays Africa | Premium Short-Term Rentals in Nairobi",
    description:
      "Book professionally-managed Airbnb apartments in Nairobi's best neighborhoods.",
    url: "https://elitestaysafrica.com",
    siteName: "Elite Stays Africa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-fc83f3cd6db94e62b59d4ec345ce8ffe.r2.dev/website/properties/2/4a7ba536-95e6-4aa5-b13b-82a1f7f12204.jpg",
        width: 1200,
        height: 630,
        alt: "Elite Stays Africa - Premium Short-Term Rentals in Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Stays Africa | Premium Short-Term Rentals in Nairobi",
    description:
      "Book professionally-managed Airbnb apartments in Nairobi's best neighborhoods.",
    images: [
      "https://pub-fc83f3cd6db94e62b59d4ec345ce8ffe.r2.dev/website/properties/2/4a7ba536-95e6-4aa5-b13b-82a1f7f12204.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <MetaPixelPageView />
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
