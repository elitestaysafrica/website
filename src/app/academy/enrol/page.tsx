"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import PhoneInput from "@/components/PhoneInput"
import { trackAcademyInterest } from "@/lib/analytics"
import { TrackPageIntent } from "@/components/IntentTracking"

type ContactStep = {
  name: string
  whatsapp: string
  email: string
}

type QuestionsStep = {
  experience: string
  budget: string
  timeline: string
  hearAbout: string
  message: string
}

const tiers = [
  {
    value: "self-starter",
    title: "Self-Starter",
    price: "KES 25,000",
    summary: "All 10 modules. Watch on your time. WhatsApp community access.",
    benefits: [
      "Full course — all 10 modules",
      "Community access (Discord + WhatsApp)",
      "All downloadable resources & templates",
      "Quizzes + certificate",
    ],
  },
  {
    value: "guided-launch",
    title: "Guided Launch",
    price: "KES 45,000",
    summary: "Modules + 1-on-1 calls + listing audit + post-first-review check-in.",
    popular: true,
    benefits: [
      "Everything in Self-Starter",
      "3× 30-min 1-on-1 calls with Bill or Peris",
      "Post-course Q&A",
      "Pre-launch listing review",
      "Post-first-review debrief",
    ],
  },
  {
    value: "done-with-you",
    title: "Done-With-You",
    price: "KES 250,000",
    summary: "We physically help you set up and launch your unit.",
    benefits: [
      "Everything in Guided Launch",
      "On-site setup help",
      "Launch support and mentorship",
      "Limited capacity",
    ],
  },
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

async function saveAcademyLead({
  contact,
  selectedTier,
  questions,
  notify = false,
}: {
  contact: ContactStep
  selectedTier?: string
  questions?: Partial<QuestionsStep>
  notify?: boolean
}) {
  const tier = tiers.find((item) => item.value === selectedTier)
  const interestedIn = [
    tier ? `${tier.title} — ${tier.price}` : "Academy interest captured before pricing reveal",
    questions?.experience ? `Exp: ${questions.experience}` : undefined,
    questions?.budget ? `Budget: ${questions.budget}` : undefined,
    questions?.timeline ? `Timeline: ${questions.timeline}` : undefined,
    questions?.hearAbout ? `Heard: ${questions.hearAbout}` : undefined,
    questions?.message ? `Note: ${questions.message}` : undefined,
  ].filter(Boolean).join(" | ")

  return fetch("/api/invest-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: notify ? "academy-enrol" : selectedTier ? "academy-enrol-step2" : "academy-enrol-step1",
      notify,
      name: contact.name,
      email: contact.email,
      phone: contact.whatsapp,
      interestedIn,
    }),
  })
}

export default function EnrolPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedTier, setSelectedTier] = useState("")
  const [contact, setContact] = useState<ContactStep>({ name: "", whatsapp: "", email: "" })
  const [questions, setQuestions] = useState<QuestionsStep>({
    experience: "",
    budget: "",
    timeline: "",
    hearAbout: "",
    message: "",
  })

  const selectedTierDetails = tiers.find((tier) => tier.value === selectedTier)

  async function handleContactContinue() {
    if (!contact.name || !contact.whatsapp || !contact.email) return
    setLoading(true)
    try {
      await saveAcademyLead({ contact })
      trackAcademyInterest({
        intentType: "contact_step_submit",
        pagePath: "/academy/enrol",
        formName: "academy_enrol_step_1",
        source: "academy-enrol-step1",
      }, "Lead")
      setStep(2)
    } catch {
      setStep(2)
    } finally {
      setLoading(false)
    }
  }

  async function handleTierContinue() {
    if (!selectedTier) return
    setLoading(true)
    try {
      await saveAcademyLead({ contact, selectedTier })
      trackAcademyInterest({
        intentType: "tier_step_submit",
        pagePath: "/academy/enrol",
        formName: "academy_enrol_step_2",
        source: "academy-enrol-step2",
        tier: selectedTier,
      }, "InitiateCheckout")
      setStep(3)
    } catch {
      setStep(3)
    } finally {
      setLoading(false)
    }
  }

  async function handleFinalSubmit() {
    if (!questions.experience || !questions.timeline) return
    setLoading(true)
    try {
      const res = await saveAcademyLead({ contact, selectedTier, questions, notify: true })
      if (res.ok) {
        trackAcademyInterest({
          intentType: "lead_submit",
          pagePath: "/academy/enrol",
          formName: "academy_enrol_form",
          source: "academy-enrol",
          tier: selectedTier,
        }, "CompleteRegistration")
        setSubmitted(true)
      } else {
        alert("Something went wrong. Please try again or WhatsApp us at +254 111 695 444.")
      }
    } catch {
      alert("Something went wrong. Please try again or WhatsApp us at +254 111 695 444.")
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
      <TrackPageIntent
        audienceType="academy"
        intentType="enrol_page_view"
        pagePath="/academy/enrol"
        pageTitle="ESA Academy Enrol"
      />
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <Link
          href="/academy"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Academy
        </Link>

        <div className="mx-auto max-w-3xl">
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
              Reserve Your ESA University Spot
            </h1>
            <p className="mt-3 text-gray-400">
              Book your spot now — no payment today. Choose your tier on the next step.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-medium text-gray-400 mb-2">
              <span className={step >= 1 ? "text-primary" : ""}>Details</span>
              <span className={step >= 2 ? "text-primary" : ""}>Tiers</span>
              <span className={step >= 3 ? "text-primary" : ""}>Questions</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`h-2 rounded-full ${step >= item ? "bg-primary" : "bg-gray-700"}`}
                />
              ))}
            </div>
          </div>

          {step === 1 && (
            <section className="rounded-2xl border border-gray-700 bg-gray-800/60 backdrop-blur p-6 sm:p-8 space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-white">Your Details</h2>
                <p className="mt-1 text-sm text-gray-400">
                  We&apos;ll save this first so we can still follow up if you don&apos;t finish the full form.
                </p>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="John Kamau"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1">
                  WhatsApp Number *
                </label>
                <PhoneInput
                  id="whatsapp"
                  name="whatsapp"
                  required
                  variant="dark"
                  onValueChange={(value) => setContact({ ...contact, whatsapp: value })}
                  placeholder="7XX XXX XXX"
                />
                <p className="mt-1 text-xs text-gray-500">We&apos;ll use this to notify you when pre-sale opens</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <Button
                type="button"
                size="lg"
                className="w-full text-lg py-6"
                disabled={loading || !contact.name || !contact.whatsapp || !contact.email}
                onClick={handleContactContinue}
              >
                {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</> : "Show Me the Tiers"}
              </Button>
            </section>
          )}

          {step === 2 && (
            <section className="rounded-2xl border border-gray-700 bg-gray-800/60 backdrop-blur p-6 sm:p-8 space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-white">Choose Your Tier</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Founding pricing is shown here after your interest is captured. You can change later.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {tiers.map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setSelectedTier(tier.value)}
                    className={`relative rounded-xl border p-5 text-left transition-colors ${
                      selectedTier === tier.value
                        ? "border-primary bg-primary/10"
                        : "border-gray-600 bg-gray-700/30 hover:border-gray-500"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-white">{tier.title}</h3>
                    <div className="mt-2 text-2xl font-bold text-primary">{tier.price}</div>
                    <p className="mt-2 text-sm text-gray-300">{tier.summary}</p>
                    <ul className="mt-4 space-y-2">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="outline" className="border-gray-600 text-white hover:bg-gray-700" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="flex-1 text-lg py-6"
                  disabled={loading || !selectedTier}
                  onClick={handleTierContinue}
                >
                  {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</> : "Continue"}
                </Button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="rounded-2xl border border-gray-700 bg-gray-800/60 backdrop-blur p-6 sm:p-8 space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-white">Quick Questions</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Helps us tailor the experience for you{selectedTierDetails ? ` — ${selectedTierDetails.title}` : ""}.
                </p>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
                  Where are you in your Airbnb journey? *
                </label>
                <select
                  id="experience"
                  required
                  value={questions.experience}
                  onChange={(e) => setQuestions({ ...questions, experience: e.target.value })}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="" className="text-gray-500">Select one...</option>
                  {experienceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
                  What&apos;s your furnishing/setup budget?
                </label>
                <select
                  id="budget"
                  value={questions.budget}
                  onChange={(e) => setQuestions({ ...questions, budget: e.target.value })}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="">Select one...</option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-1">
                  When are you looking to launch? *
                </label>
                <select
                  id="timeline"
                  required
                  value={questions.timeline}
                  onChange={(e) => setQuestions({ ...questions, timeline: e.target.value })}
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

              <div>
                <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-300 mb-1">
                  How did you hear about ESA University?
                </label>
                <select
                  id="hearAbout"
                  value={questions.hearAbout}
                  onChange={(e) => setQuestions({ ...questions, hearAbout: e.target.value })}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="">Select one...</option>
                  {hearAboutOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Anything else you want us to know?
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={questions.message}
                  onChange={(e) => setQuestions({ ...questions, message: e.target.value })}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                  placeholder="E.g. I already have a 2-bed in Westlands..."
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="outline" className="border-gray-600 text-white hover:bg-gray-700" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="flex-1 text-lg py-6"
                  disabled={loading || !questions.experience || !questions.timeline}
                  onClick={handleFinalSubmit}
                >
                  {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</> : "Join the Waitlist"}
                </Button>
              </div>

              <p className="text-center text-xs text-gray-500">
                No payment required now. By joining the waitlist, you agree we may contact you about ESA Academy and handle your information according to our <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
