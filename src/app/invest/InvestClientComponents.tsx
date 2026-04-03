"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, ChevronDown, Mail } from "lucide-react"
import { useState, FormEvent } from "react"

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

/* ─── Smart Lead Form (adapts based on journey stage) ─── */
export function AuditForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [journey, setJourney] = useState<"" | "have-listing" | "looking-to-start">("")
  const [showOtherInput, setShowOtherInput] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget

    const base = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
    }

    let data: Record<string, string>

    if (journey === "have-listing") {
      const challengeVal = (form.elements.namedItem("biggestChallenge") as HTMLSelectElement).value
      data = {
        ...base,
        source: "listing-audit",
        listingUrl: (form.elements.namedItem("listingUrl") as HTMLInputElement).value,
        avgBookings: (form.elements.namedItem("avgBookings") as HTMLSelectElement).value,
        nightlyRate: (form.elements.namedItem("nightlyRate") as HTMLInputElement).value,
        biggestChallenge: challengeVal === "other"
          ? `Other: ${(form.elements.namedItem("otherChallenge") as HTMLInputElement)?.value || "Not specified"}`
          : challengeVal,
      }
    } else {
      data = {
        ...base,
        source: "new-host-inquiry",
        hasProperty: (form.elements.namedItem("hasProperty") as HTMLSelectElement).value,
        neighborhood: (form.elements.namedItem("neighborhood") as HTMLInputElement).value,
        unitSize: (form.elements.namedItem("unitSize") as HTMLSelectElement).value,
        interestedIn: (form.elements.namedItem("interestedIn") as HTMLSelectElement).value,
      }
    }

    try {
      const res = await fetch("/api/invest-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
      else alert("Something went wrong. Please try again or WhatsApp us at +254 111 695 444.")
    } catch {
      alert("Something went wrong. Please try again or WhatsApp us at +254 111 695 444.")
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
        <h3 className="mt-4 text-xl font-bold text-green-900">
          {journey === "have-listing" ? "Audit Request Received!" : "We\u2019ll Be In Touch!"}
        </h3>
        <p className="mt-2 text-green-700">
          {journey === "have-listing"
            ? "We\u2019ll review your listing and send you a detailed audit within 48 hours."
            : "We\u2019ll reach out within 48 hours to discuss your project."}
        </p>
      </div>
    )
  }

  const isDark = variant === "dark"
  const inputClasses = isDark
    ? "w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    : "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

  const pillClasses = (active: boolean) =>
    `flex-1 rounded-lg px-4 py-3 text-sm font-medium text-center cursor-pointer transition-all ${
      active
        ? isDark
          ? "bg-primary text-white shadow-sm"
          : "bg-primary text-white shadow-sm"
        : isDark
          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Journey selector */}
      <div className="flex gap-3">
        <div
          className={pillClasses(journey === "have-listing")}
          onClick={() => { setJourney("have-listing"); setShowOtherInput(false) }}
        >
          I have a listing
        </div>
        <div
          className={pillClasses(journey === "looking-to-start")}
          onClick={() => { setJourney("looking-to-start"); setShowOtherInput(false) }}
        >
          I&apos;m looking to start
        </div>
      </div>

      {/* Conditional fields */}
      {journey === "have-listing" && (
        <>
          <input
            type="url"
            name="listingUrl"
            placeholder="Airbnb Listing URL (https://airbnb.com/rooms/...)"
            required
            className={inputClasses}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select name="avgBookings" className={inputClasses} defaultValue="" required>
              <option value="" disabled>Avg bookings / month</option>
              <option value="0-5">0–5 bookings</option>
              <option value="5-10">5–10 bookings</option>
              <option value="10-15">10–15 bookings</option>
              <option value="15+">15+ bookings</option>
              <option value="just-starting">Just getting started</option>
            </select>
            <input
              type="text"
              name="nightlyRate"
              placeholder="Current nightly rate (KES)"
              className={inputClasses}
            />
          </div>
          <select
            name="biggestChallenge"
            className={inputClasses}
            defaultValue=""
            required
            onChange={(e) => setShowOtherInput(e.target.value === "other")}
          >
            <option value="" disabled>Biggest challenge right now</option>
            <option value="not-enough-bookings">Not enough bookings</option>
            <option value="rates-too-low">Rates feel too low</option>
            <option value="bad-reviews">Bad reviews</option>
            <option value="just-starting">Just getting started</option>
            <option value="other">Other</option>
          </select>
          {showOtherInput && (
            <input
              type="text"
              name="otherChallenge"
              placeholder="Tell us more about your challenge..."
              className={inputClasses}
            />
          )}
        </>
      )}

      {journey === "looking-to-start" && (
        <>
          <select name="hasProperty" className={inputClasses} defaultValue="" required>
            <option value="" disabled>Do you have a property?</option>
            <option value="yes-own">Yes — I own it</option>
            <option value="yes-lease">Yes — I&apos;m leasing / renting</option>
            <option value="looking">Not yet — still looking</option>
          </select>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="neighborhood"
              placeholder="Neighborhood / area"
              className={inputClasses}
            />
            <select name="unitSize" className={inputClasses} defaultValue="" required>
              <option value="" disabled>Unit size</option>
              <option value="studio">Studio</option>
              <option value="1-bed">1 Bedroom</option>
              <option value="2-bed">2 Bedrooms</option>
              <option value="3-bed">3+ Bedrooms</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>
          <select name="interestedIn" className={inputClasses} defaultValue="" required>
            <option value="" disabled>What are you interested in?</option>
            <option value="furnishing">Full furnishing & setup</option>
            <option value="management">Property management</option>
            <option value="both">Furnishing + management</option>
            <option value="exploring">Just exploring my options</option>
          </select>
        </>
      )}

      {/* Contact fields — only show after journey is selected */}
      {journey && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className={inputClasses}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className={inputClasses}
            />
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="WhatsApp Number (preferred — fastest way to reach you)"
            className={inputClasses}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg"
            disabled={loading}
          >
            {loading ? "Sending..." : journey === "have-listing" ? "Get My Free Audit" : "Get Started"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
          <p className={`text-xs text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            100% free. No obligations, no spam. We&apos;ll reply within 48 hours.
          </p>
        </>
      )}

      {/* Prompt if no journey selected */}
      {!journey && (
        <p className={`text-sm text-center py-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Select an option above to get started.
        </p>
      )}
    </form>
  )
}

/* ─── Academy Waitlist Signup ─── */
export function AcademySignup() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = {
      source: "academy-waitlist",
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
    }

    try {
      const res = await fetch("/api/invest-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
      else alert("Something went wrong. Please try again or WhatsApp us at +254 111 695 444.")
    } catch {
      alert("Something went wrong. Please try again or WhatsApp us at +254 111 695 444.")
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 justify-center">
        <CheckCircle2 className="h-6 w-6 text-green-400" />
        <span className="text-green-400 font-semibold">You&apos;re on the list! We&apos;ll notify you when we launch.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        className="flex-1 rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "..." : "Notify Me"}
        {!loading && <Mail className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  )
}

/* ─── Legacy Lead Form (kept for reference, not used on page) ─── */
export function LeadForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = {
      source: "consultation",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      units: (form.elements.namedItem("units") as HTMLSelectElement).value,
    }

    try {
      const res = await fetch("/api/invest-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
      else alert("Something went wrong. Please try again or WhatsApp us at +254 111 695 444.")
    } catch {
      alert("Something went wrong. Please try again or WhatsApp us at +254 111 695 444.")
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
        <h3 className="mt-4 text-xl font-bold text-green-900">
          We&apos;ll be in touch!
        </h3>
        <p className="mt-2 text-green-700">
          We&apos;ll reach out within 24 hours to schedule your consultation.
        </p>
      </div>
    )
  }

  const isDark = variant === "dark"
  const inputClasses = isDark
    ? "w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    : "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Full Name" required className={inputClasses} />
      <input type="email" name="email" placeholder="Email Address" required className={inputClasses} />
      <input type="tel" name="phone" placeholder="Phone / WhatsApp Number" className={inputClasses} />
      <select name="units" className={inputClasses} defaultValue="">
        <option value="" disabled>How many units are you considering?</option>
        <option value="1">1 unit</option>
        <option value="2-5">2-5 units</option>
        <option value="5-10">5-10 units</option>
        <option value="10+">10+ units</option>
      </select>
      <Button type="submit" size="lg" className="w-full text-lg" disabled={loading}>
        {loading ? "Sending..." : "Schedule a Consultation"}
        {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
      </Button>
      <p className={`text-xs text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        Free consultation. No obligations, no spam.
      </p>
    </form>
  )
}
