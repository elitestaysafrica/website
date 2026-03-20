import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Invest in Nairobi Short-Term Rentals | Elite Stays Africa",
  description:
    "Furnishing, setup, and management services for Nairobi Airbnb properties. 85%+ occupancy, 50% higher nightly rates than typical operators. Schedule a free consultation.",
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
    "airbnb furnishing nairobi",
  ],
  openGraph: {
    title: "Invest in Nairobi Short-Term Rentals | Elite Stays Africa",
    description:
      "Furnishing, setup, and management for Nairobi Airbnb properties. 85%+ occupancy across our portfolio. Schedule a free consultation.",
    url: "https://www.elitestaysafrica.com/invest",
    siteName: "Elite Stays Africa",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest in Nairobi Short-Term Rentals | Elite Stays Africa",
    description:
      "Furnishing, setup, and management for Nairobi Airbnb properties. 85%+ occupancy. Schedule a free consultation.",
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
      name: "For Investors",
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
        text: "Yes — when managed well. Our portfolio averages 75-85% occupancy with nightly rates well above market average. A well-furnished 1-bedroom in a good area can net the owner approximately KES 167,000 per month after Airbnb fees and management fee. These figures are based on past performance and are not guarantees.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to furnish an Airbnb in Nairobi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We estimate KES 1.2M–1.4M for a 1-bedroom and KES 1.5M–1.7M for a 2-bedroom for the furnishing itself. Our furnishing service fee covers sourcing, workmen coordination, account setup, professional photography, house manuals, and TV app setup. A site visit with detailed quote is available for KES 10,000, credited back if you hire us to furnish. Furnishing is a standalone service and does not require a management contract.",
      },
    },
    {
      "@type": "Question",
      name: "What does your management fee cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our management fee is 20% of booking revenue. Overhead costs — cleaning, supplies, utilities, and property managers — are billed monthly based on actual usage. You get paid directly by Airbnb. We never hold your money.",
      },
    },
    {
      "@type": "Question",
      name: "How much can I earn from an Airbnb in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Based on our portfolio performance, a 1-bedroom can net the owner approximately KES 167,000/month and a 2-bedroom approximately KES 226,000/month at 75% occupancy, after Airbnb fees and management fee. Overhead costs are billed separately. These figures are based on past performance and are not guarantees.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best areas for Airbnb in Nairobi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Westlands, Kilimani, Kileleshwa, and Lavington consistently perform best for short-term rentals, attracting both international tourists and business travelers with strong demand year-round. We do not take on properties in all areas.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to pay taxes on Airbnb income in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Airbnb income is subject to taxes including Withholding Tax, which Airbnb deducts automatically from your payouts. We recommend consulting a qualified tax advisor or the lawyer who handled your property purchase for personalized guidance.",
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
