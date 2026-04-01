"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

const modules = [
  {
    num: 1,
    title: "Understanding Airbnb & STRs",
    videos: 7,
    duration: "72 min",
    desc: "How Airbnb works, the Nairobi market, business models (arbitrage vs ownership vs management), and real startup numbers.",
  },
  {
    num: 2,
    title: "Finding the Perfect Unit",
    videos: 7,
    duration: "76 min",
    desc: "What makes a property profitable, neighborhoods that work, the Rule of 10, running numbers before you sign, and lease negotiation.",
  },
  {
    num: 3,
    title: "Furnishing & Setup",
    videos: 7,
    duration: "70 min",
    desc: "Design that books, real cost breakdowns, where to buy in Nairobi, the essentials checklist, and the details that get 5 stars.",
  },
  {
    num: 4,
    title: "Creating a Listing That Sells",
    videos: 8,
    duration: "74 min",
    desc: "Professional photography, staging, writing titles that get clicks, descriptions that convert, and launch pricing strategy.",
  },
  {
    num: 5,
    title: "Pricing Strategies",
    videos: 7,
    duration: "70 min",
    desc: "Airbnb's algorithm, base pricing, seasonal patterns in Nairobi, dynamic pricing tools, and when to raise or drop rates.",
  },
  {
    num: 6,
    title: "Operations & Management",
    videos: 6,
    duration: "58 min",
    desc: "Building your team, check-in systems, maintenance schedules, inventory management, house manuals, and SOPs.",
  },
  {
    num: 7,
    title: "The Cleaner Deep-Dive",
    videos: 7,
    duration: "69 min",
    desc: "Finding and training cleaners, the ESA cleaning system walkthrough, quality control, and when to retrain or fire.",
  },
  {
    num: 8,
    title: "Guest Communications",
    videos: 5,
    duration: "50 min",
    desc: "The full guest journey, message templates, converting inquiries, getting 5-star reviews, and handling difficult guests.",
  },
  {
    num: 9,
    title: "When Things Go Wrong",
    videos: 6,
    duration: "54 min",
    desc: "Bad reviews, cancellations, property damage, guest emergencies, legal issues, and cash flow crunches.",
  },
  {
    num: 10,
    title: "Scaling & Growth",
    videos: 6,
    duration: "60 min",
    desc: "When to add your second unit, systems that scale, multi-platform expansion, building a management company, and KRA compliance.",
  },
]

export function ModuleAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-3xl divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white overflow-hidden">
      {modules.map((mod, i) => (
        <div key={mod.num}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary shrink-0">
                {String(mod.num).padStart(2, "0")}
              </span>
              <div>
                <span className="font-semibold text-gray-900">{mod.title}</span>
                <span className="ml-3 text-sm text-gray-500">
                  {mod.videos} videos · {mod.duration}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 pl-20 text-gray-600 leading-relaxed">
              {mod.desc}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="border-b border-gray-200 last:border-0 group">
      <summary className="flex w-full cursor-pointer list-none items-center justify-between py-5 text-left">
        <span className="font-semibold text-gray-900 pr-4">{q}</span>
        <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
      </summary>
      <p className="pb-5 text-gray-600 leading-relaxed">{a}</p>
    </details>
  )
}
