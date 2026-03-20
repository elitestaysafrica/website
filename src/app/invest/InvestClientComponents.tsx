"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react"
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

export function LeadForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = {
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
      else setSubmitted(true) // Still show success to user
    } catch {
      setSubmitted(true) // Graceful fallback
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
      <input
        type="text"
        name="name"
        placeholder="Full Name"
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
      <input
        type="tel"
        name="phone"
        placeholder="Phone / WhatsApp Number"
        className={inputClasses}
      />
      <select
        name="units"
        className={inputClasses}
        defaultValue=""
      >
        <option value="" disabled>
          How many units are you considering?
        </option>
        <option value="1">1 unit</option>
        <option value="2-5">2-5 units</option>
        <option value="5-10">5-10 units</option>
        <option value="10+">10+ units</option>
      </select>
      <Button
        type="submit"
        size="lg"
        className="w-full text-lg"
        disabled={loading}
      >
        {loading ? "Sending..." : "Schedule a Consultation"}
        {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
      </Button>
      <p className={`text-xs text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        Free consultation. No obligations, no spam.
      </p>
    </form>
  )
}
