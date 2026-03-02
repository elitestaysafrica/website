import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nairobi Airbnb Market Data & Occupancy Rates 2026 | Elite Stays Africa",
  description:
    "Live Nairobi short-term rental market intelligence. Real occupancy rates, pricing trends, neighborhood performance data for Airbnb hosts, property investors, and managers. Updated daily.",
  keywords: [
    "airbnb nairobi",
    "airbnb nairobi westlands",
    "airbnb nairobi kilimani",
    "serviced apartments nairobi",
    "nairobi airbnb occupancy rates",
    "short term rental kenya",
    "airbnb investment kenya",
    "property management nairobi",
    "nairobi rental yield",
    "airbnb market data kenya",
    "nairobi property investment",
    "airbnb hosting nairobi",
    "westlands serviced apartments",
    "kilimani airbnb",
    "lavington short term rental",
    "karen airbnb nairobi",
    "nairobi real estate investment",
    "invest in real estate kenya",
    "airbnb occupancy nairobi 2026",
    "best areas airbnb nairobi",
  ],
  openGraph: {
    title: "Nairobi Airbnb Market Intelligence — Live Data | Elite Stays Africa",
    description:
      "We track every Airbnb listing in Nairobi. Real occupancy rates, pricing trends, and neighborhood analysis. Free market data for hosts and investors.",
    type: "website",
    url: "https://elitestaysafrica.com/market-intel",
    siteName: "Elite Stays Africa",
    images: [{ url: "/market-intel/opengraph-image", width: 1200, height: 630, alt: "Nairobi Airbnb Market Data — Live Occupancy Rates" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nairobi Airbnb Market Data — Updated Daily",
    description:
      "Live occupancy rates, pricing trends, and neighborhood performance for Nairobi short-term rentals.",
    images: ["/market-intel/opengraph-image"],
  },
  alternates: {
    canonical: "https://elitestaysafrica.com/market-intel",
  },
}

export default function MarketIntelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
