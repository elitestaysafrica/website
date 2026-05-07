"use client"

import { Button } from "@/components/ui/button"
import PhoneInput from "@/components/PhoneInput"
import Link from "next/link"
import { ChevronDown, CheckCircle2, Bell } from "lucide-react"
import { useState, FormEvent } from "react"
import { trackAcademyInterest } from "@/lib/analytics"

const modules = [
  {
    num: 1,
    title: "STR Foundations",
    videos: 1,
    desc: "STR vs Airbnb, business models, tradeoffs, location choices, deal math, red flags, and choosing your path.",
  },
  {
    num: 2,
    title: "Furnishing & Setting Up",
    videos: 5,
    desc: "Setup principles, budget, room-by-room setup, essentials, 5-star touches, photography, and pre-launch walkthrough.",
  },
  {
    num: 3,
    title: "The Listing & Launch Pricing",
    videos: 3,
    desc: "Title, description, photo order, amenities, rules, trust signals, and launch pricing strategy.",
  },
  {
    num: 4,
    title: "Guest Acquisition & Ongoing Pricing",
    videos: 4,
    desc: "Airbnb as the foundation, off-Airbnb channels, repeat guests, referrals, and ongoing market-based pricing.",
  },
  {
    num: 5,
    title: "Guest Communications",
    videos: 3,
    desc: "Message templates, the guest journey, check-in, during-stay support, complaints, checkout, and reviews.",
  },
  {
    num: 6,
    title: "Operations & Maintenance",
    videos: 3,
    desc: "Cleaning, turnover, maintenance, supplies, guest issues, protection, refunds, reviews, insurance, and post-mortems.",
  },
  {
    num: 7,
    title: "Money: Finances, Reporting & Taxes",
    videos: 3,
    desc: "Revenue vs profit, monthly review, owner reporting, and Kenya tax basics for STR operators.",
  },
  {
    num: 8,
    title: "Scaling & Implementation",
    videos: 5,
    desc: "When to scale, what breaks, SOPs before hiring, scaling models, 30/60/90 launch plan, and professional-operator mindset.",
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
        trackAcademyInterest({
          intentType: "lead_submit",
          pagePath: "/academy",
          formName: "academy_notify_form",
          source: "academy-notify",
          tier: data.interestedIn,
        }, "Lead")
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
      <p className={`text-xs text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        By joining the list, you agree we may contact you about ESA Academy and handle your information according to our <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>.
      </p>
    </form>
  )
}
