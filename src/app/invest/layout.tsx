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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Airbnb profitable in Nairobi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — when managed well. Our portfolio averages 85%+ occupancy with nightly rates 40-56% above market average. A well-furnished 1-bedroom in a good area can net the owner KES 165,000+ per month after management fees.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to furnish an Airbnb in Nairobi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1-bedroom units: KES 1M-1.4M. 2-bedroom units: KES 1.4M-1.7M. We use local builders and craftsmen for custom furniture, plus partnerships with major electronics dealers give us up to 50% off brand-name products.",
      },
    },
    {
      "@type": "Question",
      name: "What does a property management company charge in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical Airbnb management fees in Nairobi range from 20-30% of gross revenue. This covers guest communication, cleaning coordination, maintenance, listing optimization, dynamic pricing, and monthly reporting.",
      },
    },
    {
      "@type": "Question",
      name: "How much can I earn from an Airbnb in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on location, unit size, and management quality. Well-managed 1-bedroom units gross KES 280,000+/month at 75% occupancy. 2-bedrooms gross KES 420,000+/month. After management fees, owners typically net KES 165,000-250,000+ per month.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best areas for Airbnb in Nairobi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Westlands, Kilimani, Kileleshwa, and Lavington consistently perform best for short-term rentals, attracting both international tourists and business travelers with strong demand year-round.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to pay taxes on Airbnb income in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Airbnb income is subject to Withholding Tax (5% on gross) and VAT considerations. A good management company handles KRA compliance including WHT deductions and provides all documentation for tax filing.",
      },
    },
    {
      "@type": "Question",
      name: "How long before my property starts earning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "From signing to first booking is typically 4-6 weeks. That includes furnishing, professional photography, listing creation, and optimization. First booking usually comes within 7-14 days of going live.",
      },
    },
  ],
}

export default function InvestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
