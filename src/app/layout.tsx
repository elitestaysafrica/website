import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });
const GA_ID = "G-K2K44Z6MSN";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Stays Africa | Premium Short-Term Rentals in Nairobi",
    description:
      "Book professionally-managed Airbnb apartments in Nairobi's best neighborhoods.",
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
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
