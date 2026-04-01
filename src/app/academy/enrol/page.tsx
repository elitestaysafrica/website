"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const tiers = [
  { value: "self-starter", label: "Self-Starter — KES 25,000" },
  { value: "guided-launch", label: "Guided Launch — KES 45,000 (Pre-Launch)" },
  { value: "done-with-you", label: "Done-With-You — KES 250,000" },
]

const experienceOptions = [
  "I haven't started yet — just researching",
  "I have a property but haven't listed it",
  "I'm already hosting but want to improve",
  "I want to start an Airbnb management business",
]

const budgetOptions = [
  "Under KES 500K",
  "KES 500K – 1M",
  "KES 1M – 2M",
  "Over KES 2M",
  "I'm not sure yet",
]

const hearAboutOptions = [
  "Google search",
  "Instagram / TikTok",
  "YouTube",
  "Friend / referral",
  "Blog post",
  "Other",
]

export default function EnrolPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedTier, setSelectedTier] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const data = {
      source: "academy-enrol",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      tier: selectedTier,
      experience: (form.elements.namedItem("experience") as HTMLSelectElement).value,
      budget: (form.elements.namedItem("budget") as HTMLSelectElement).value,
      timeline: (form.elements.namedItem("timeline") as HTMLSelectElement).value,
      hearAbout: (form.elements.namedItem("hearAbout") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">You&apos;re on the list!</h1>
          <p className="mt-4 text-gray-300">
            We&apos;ll reach out on WhatsApp when pre-sale opens. You&apos;ll get first access to the best price.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link href="/academy">← Back to Academy</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        {/* Back link */}
        <Link
          href="/academy"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Academy
        </Link>

        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Elite Stays Africa"
                width={160}
                height={55}
                className="mx-auto mb-6"
                style={{ height: "40px", width: "auto" }}
              />
            </Link>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Enrol in ESA University
            </h1>
            <p className="mt-3 text-gray-400">
              Pre-sale opens soon. Fill in your details and we&apos;ll notify you on WhatsApp with first access to the best discount.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl border border-gray-700 bg-gray-800/60 backdrop-blur p-6 sm:p-8 space-y-5">
              <h2 className="text-lg font-semibold text-white">Your Details</h2>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="John Kamau"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="+254 7XX XXX XXX"
                />
                <p className="mt-1 text-xs text-gray-500">We&apos;ll use this to notify you when pre-sale opens</p>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="john@example.com"
                />
              </div>

              {/* Tier */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Which tier are you interested in? *
                </label>
                <div className="space-y-2">
                  {tiers.map((tier) => (
                    <label
                      key={tier.value}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                        selectedTier === tier.value
                          ? "border-primary bg-primary/10 text-white"
                          : "border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tier"
                        value={tier.value}
                        checked={selectedTier === tier.value}
                        onChange={(e) => setSelectedTier(e.target.value)}
                        className="sr-only"
                        required
                      />
                      <div
                        className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedTier === tier.value ? "border-primary" : "border-gray-500"
                        }`}
                      >
                        {selectedTier === tier.value && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <span className="text-sm">{tier.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Questionnaire */}
            <div className="rounded-2xl border border-gray-700 bg-gray-800/60 backdrop-blur p-6 sm:p-8 space-y-5">
              <h2 className="text-lg font-semibold text-white">Quick Questions</h2>
              <p className="text-sm text-gray-400 -mt-2">Helps us tailor the experience for you</p>

              {/* Experience */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
                  Where are you in your Airbnb journey? *
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="" className="text-gray-500">Select one...</option>
                  {experienceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
                  What&apos;s your furnishing/setup budget?
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="">Select one...</option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Timeline */}
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-1">
                  When are you looking to launch? *
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  required
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="">Select one...</option>
                  <option value="asap">As soon as possible</option>
                  <option value="1-3months">In 1–3 months</option>
                  <option value="3-6months">In 3–6 months</option>
                  <option value="6plus">6+ months from now</option>
                  <option value="exploring">Just exploring for now</option>
                </select>
              </div>

              {/* How did you hear about us */}
              <div>
                <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-300 mb-1">
                  How did you hear about ESA University?
                </label>
                <select
                  id="hearAbout"
                  name="hearAbout"
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="">Select one...</option>
                  {hearAboutOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Anything else */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Anything else you want us to know?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                  placeholder="E.g. I already have a 2-bed in Westlands..."
                />
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" size="lg" className="w-full text-lg py-6" disabled={loading}>
              {loading ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</>
              ) : (
                "Join the Waitlist"
              )}
            </Button>

            <p className="text-center text-xs text-gray-500">
              No payment required now. We&apos;ll reach out on WhatsApp when enrolment opens.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
