"use client"

import { Button } from "@/components/ui/button"
import PhoneInput from "@/components/PhoneInput"
import { ChevronDown, CheckCircle2, Bell } from "lucide-react"
import { useState, FormEvent } from "react"

const modules = [
  {
    num: 1,
    title: "Understanding Airbnb & STRs",
    videos: 7,
    desc: "How Airbnb works, the Nairobi market, business models (arbitrage vs ownership vs management), and real startup numbers.",
  },
  {
    num: 2,
    title: "Finding the Perfect Unit",
    videos: 7,
    desc: "What makes a property profitable, neighborhoods that work, the Rule of 10, running numbers before you sign, and lease negotiation.",
  },
  {
    num: 3,
    title: "Furnishing & Setup",
    videos: 7,
    desc: "Design that books, real cost breakdowns, where to buy in Nairobi, the essentials checklist, and the details that get 5 stars.",
  },
  {
    num: 4,
    title: "Creating a Listing That Sells",
    videos: 8,
    desc: "Professional photography, staging, writing titles that get clicks, descriptions that convert, and launch pricing strategy.",
  },
  {
    num: 5,
    title: "Pricing Strategies",
    videos: 7,
    desc: "Airbnb's algorithm, base pricing, seasonal patterns in Nairobi, dynamic pricing tools, and when to raise or drop rates.",
  },
  {
    num: 6,
    title: "Operations & Management",
    videos: 6,
    desc: "Building your team, check-in systems, maintenance schedules, inventory management, house manuals, and SOPs.",
  },
  {
    num: 7,
    title: "The Cleaner Deep-Dive",
    videos: 7,
    desc: "Finding and training cleaners, the ESA cleaning system walkthrough, quality control, and when to retrain or fire.",
  },
  {
    num: 8,
    title: "Guest Communications",
    videos: 5,
    desc: "The full guest journey, message templates, converting inquiries, getting 5-star reviews, and handling difficult guests.",
  },
  {
    num: 9,
    title: "When Things Go Wrong",
    videos: 6,
    desc: "Bad reviews, cancellations, property damage, guest emergencies, legal issues, and cash flow crunches.",
  },
  {
    num: 10,
    title: "Scaling & Growth",
    videos: 6,
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
                  {mod.videos} videos
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

export function NotifyForm({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const isDark = variant === "dark"

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget

    const data = {
      source: "academy-notify",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      interestedIn: (form.elements.namedItem("tier") as HTMLSelectElement).value,
    }

    try {
      const res = await fetch("/api/invest-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        alert("Something went wrong. Please try again or WhatsApp us at +254 111 695 444.")
      }
    } catch {
      alert("Something went wrong. Please try again or WhatsApp us at +254 111 695 444.")
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className={`rounded-2xl p-8 text-center ${isDark ? "bg-green-500/10 border border-green-500/30" : "bg-green-50 border border-green-200"}`}>
        <CheckCircle2 className={`h-12 w-12 mx-auto ${isDark ? "text-green-400" : "text-green-600"}`} />
        <h3 className={`mt-4 text-xl font-bold ${isDark ? "text-green-300" : "text-green-900"}`}>
          You&apos;re On the List!
        </h3>
        <p className={`mt-2 ${isDark ? "text-green-400/80" : "text-green-700"}`}>
          We&apos;ll WhatsApp you as soon as pre-sale opens. You&apos;ll get first access + the best discount.
        </p>
      </div>
    )
  }

  const inputClasses = isDark
    ? "w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    : "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

  const selectClasses = isDark
    ? "w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    : "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        type="text"
        required
        placeholder="Your name"
        className={inputClasses}
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email address"
        className={inputClasses}
      />
      <PhoneInput
        name="phone"
        required
        placeholder="WhatsApp number (e.g. 0712 345 678)"
        variant={variant}
      />
      <select name="tier" required className={selectClasses}>
        <option value="">Which tier interests you?</option>
        <option value="self-starter">Self-Starter — KES 25,000</option>
        <option value="guided-launch">Guided Launch — KES 75,000</option>
        <option value="done-with-you">Done-With-You — KES 250,000</option>
        <option value="not-sure">Not sure yet</option>
      </select>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          "Submitting..."
        ) : (
          <>
            <Bell className="mr-2 h-4 w-4" /> Notify Me When Pre-Sale Opens
          </>
        )}
      </Button>
    </form>
  )
}
