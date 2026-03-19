import MarketIntelContent, { type MarketData } from "./MarketIntelContent"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://staff.elitestaysafrica.com/api/website"

// FAQ items for JSON-LD (must match client FAQ)
const faqItems = [
  {
    q: "What is the average Airbnb occupancy rate in Nairobi?",
    a: "Based on our daily tracking of the Nairobi short-term rental market, the average forward-looking occupancy rate is approximately 25–35% at any given time. However, actual achieved occupancy after last-minute bookings is typically 20–30% higher. Top-performing property managers like Elite Stays achieve 80%+ actual occupancy.",
  },
  {
    q: "Which neighborhoods are best for Airbnb in Nairobi?",
    a: "Westlands and Kilimani lead in volume and demand, but Upper Hill and Kileleshwa often show higher occupancy rates with less competition. The best neighborhood depends on your target guest — corporate travelers prefer Westlands and Upper Hill, while families and long-stay guests favor Lavington and Karen.",
  },
  {
    q: "Is Airbnb profitable in Kenya?",
    a: "Yes — well-managed Airbnb properties in Nairobi can generate significantly higher returns than long-term rentals. However, over 60% of listings in Nairobi are effectively dead (under 5% occupancy), meaning most operators are not profitable. The difference is professional management, pricing strategy, and listing optimization.",
  },
  {
    q: "How much can I earn from Airbnb in Nairobi?",
    a: "Earnings vary by location, property size, and management quality. A well-managed 1-bedroom apartment in Westlands or Kilimani can generate KES 150,000–200,000+ per month. 2-bedroom units in premium locations can exceed KES 250,000/month. These figures assume professional management with 75%+ occupancy.",
  },
  {
    q: "What is the average nightly rate for Airbnb in Nairobi?",
    a: "The median nightly rate across active Nairobi listings is approximately $100–120 USD. Rates vary significantly by neighborhood — Gigiri and Upper Hill command premium rates ($60–90+/night), while Kilimani has seen rate compression due to oversupply.",
  },
  {
    q: "How does Elite Stays Africa track market data?",
    a: "We monitor every short-term rental listing in Nairobi daily, tracking calendar availability, pricing, ratings, and booking patterns. Our data comes from direct calendar monitoring — not estimates or third-party projections. This gives us the most accurate real-time view of the Nairobi STR market.",
  },
  {
    q: "How many Airbnb listings are there in Nairobi?",
    a: "We currently track hundreds of active short-term rental listings across Nairobi's key neighborhoods. However, a significant portion (60%+) are effectively inactive with near-zero bookings. The number of genuinely competitive listings is much smaller than the total count suggests.",
  },
  {
    q: "What size property performs best on Airbnb in Nairobi?",
    a: "Performance varies by bedroom count. Check our live occupancy-by-size data to see how 1-bedroom, 2-bedroom, and 3-bedroom units compare in Nairobi's current market. Generally, 1-2 bedroom units have higher occupancy rates while 3-bedroom units command higher nightly rates.",
  },
]

async function fetchMarketData(): Promise<MarketData | null> {
  try {
    const res = await fetch(`${API_URL}/market-intel`, { next: { revalidate: 3600 } })
    const json = await res.json()
    return json.success ? json.data : null
  } catch {
    return null
  }
}

export default async function MarketIntelPage() {
  const data = await fetchMarketData()

  // JSON-LD: Dataset schema
  const datasetJsonLd = data ? {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Nairobi Airbnb Market Intelligence",
    description: "Daily-updated occupancy rates, pricing trends, and performance data for Nairobi short-term rental market.",
    url: "https://elitestaysafrica.com/market-intel",
    dateModified: data.generated_at,
    provider: { "@type": "Organization", name: "Elite Stays Africa", url: "https://elitestaysafrica.com" },
    spatialCoverage: { "@type": "Place", name: "Nairobi, Kenya" },
  } : null

  // JSON-LD: FAQ schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  // JSON-LD: Breadcrumb
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://elitestaysafrica.com" },
      { "@type": "ListItem", position: 2, name: "Market Intelligence", item: "https://elitestaysafrica.com/market-intel" },
    ],
  }

  return (
    <>
      {datasetJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <MarketIntelContent initialData={data} />
    </>
  )
}
