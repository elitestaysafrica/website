import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Invest in Nairobi Short-Term Rentals | Elite Stays Africa",
  description:
    "Earn 12-17% annual yields on Nairobi Airbnb properties. Elite Stays Africa delivers 85%+ occupancy and 56% higher nightly rates than typical operators. Get our free investor guide.",
  keywords: [
    "invest in nairobi real estate",
    "airbnb investment kenya",
    "nairobi short term rental investment",
    "property investment nairobi",
    "airbnb property management nairobi",
    "serviced apartments nairobi investment",
    "rental yield nairobi",
    "passive income kenya real estate",
    "westlands property investment",
    "kilimani investment property",
  ],
  openGraph: {
    title: "Buy. Stay. Earn. Repeat. | Elite Stays Africa",
    description:
      "Invest in Nairobi's booming short-term rental market. 85%+ occupancy, 12-17% annual yields, fully managed. Get the free investor guide.",
    url: "https://www.elitestaysafrica.com/invest",
    siteName: "Elite Stays Africa",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy. Stay. Earn. Repeat. | Elite Stays Africa",
    description:
      "Earn 12-17% annual yields on Nairobi Airbnb properties. 85%+ occupancy, fully managed.",
  },
  alternates: {
    canonical: "https://www.elitestaysafrica.com/invest",
  },
}

export default function InvestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
