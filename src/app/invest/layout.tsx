import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Airbnb Host Services in Nairobi | Elite Stays Africa",
  description:
    "Furnishing, setup, photography, and optimization services for Nairobi Airbnb properties. 85%+ occupancy, 50% higher nightly rates. Get a free listing audit.",
  keywords: [
    "airbnb host services nairobi",
    "airbnb furnishing nairobi",
    "airbnb setup nairobi",
    "airbnb photography nairobi",
    "airbnb listing optimization kenya",
    "invest in nairobi real estate",
    "airbnb investment kenya",
    "nairobi short term rental",
    "property investment nairobi",
    "serviced apartments nairobi",
    "rental yield nairobi",
    "airbnb course nairobi",
    "str academy kenya",
    "westlands property investment",
    "kilimani airbnb",
  ],
  openGraph: {
    title: "Airbnb Host Services in Nairobi | Elite Stays Africa",
    description:
      "Furnishing, optimization, and launch services for Nairobi Airbnb properties. 85%+ occupancy. Get a free listing audit.",
    url: "https://www.elitestaysafrica.com/invest",
    siteName: "Elite Stays Africa",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airbnb Host Services in Nairobi | Elite Stays Africa",
    description:
      "Furnishing, optimization, and launch services for Nairobi Airbnb properties. 85%+ occupancy. Get a free listing audit.",
  },
  alternates: {
    canonical: "https://www.elitestaysafrica.com/invest",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.elitestaysafrica.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Host Services",
      item: "https://www.elitestaysafrica.com/invest",
    },
  ],
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
        text: "Yes — when set up well. Our portfolio averages 75-85% occupancy with nightly rates well above market average. A well-furnished 1-bedroom in a good area can net the owner approximately KES 167,000 per month after Airbnb fees. These figures are based on past performance and are not guarantees.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to furnish an Airbnb in Nairobi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Furniture and materials typically run KES 800K–1.3M for a 1-bedroom and KES 1M–1.6M for a 2-bedroom, quoted at actual cost. Our flat setup fee is KES 250K (1-bed) or KES 350K (2-bed), covering interior design, sourcing, coordination, account setup, cleaner training, house manuals, and launch strategy. A site visit is available for KES 10,000, credited back if you hire us.",
      },
    },
    {
      "@type": "Question",
      name: "How much can I earn from an Airbnb in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Based on our portfolio performance at 75% occupancy, a 1-bedroom can net approximately KES 210,000/month and a 2-bedroom approximately KES 283,000/month after Airbnb platform fees. These figures are based on past performance and are not guarantees.",
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
        text: "Airbnb income is subject to taxes including Withholding Tax, which Airbnb deducts automatically from your payouts. We recommend consulting a qualified tax advisor for personalized guidance.",
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
    {
      "@type": "Question",
      name: "What's included in the free listing audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We review your photos, title, description, pricing, calendar settings, and competitive positioning. You receive a detailed report with specific, actionable recommendations — completely free.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
