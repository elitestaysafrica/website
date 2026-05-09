"use client"

import { useCallback, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import PhoneInput from "@/components/PhoneInput"
import { Price } from "@/components/Price"
import { trackAcademyInterest } from "@/lib/analytics"
import { TrackPageIntent } from "@/components/IntentTracking"

type ContactStep = {
  name: string
  whatsapp: string
  email: string
}

type QuestionsStep = {
  experience: string
  timeline: string
  support: string
  hearAbout: string
  message: string
}

type AcademyLeadSource = "academy-enrol-step1" | "academy-enrol-step2" | "academy-enrol"

const tiers = [
  {
    value: "self-starter",
    title: "Self-Starter",
    priceAmount: 25000,
    summary: "All 8 modules. Watch on your time. WhatsApp community access.",
    bestFor: "You want the full system and can execute on your own.",
    benefits: [
      "Full course — all 8 modules",
      "Community access (Discord + WhatsApp)",
      "All downloadable resources & templates",
      "Quizzes + certificate",
    ],
  },
  {
    value: "guided-launch",
    title: "Guided Launch",
    priceAmount: 45000,
    summary: "Modules + 1-on-1 calls + listing audit + post-first-review check-in.",
    bestFor: "You want the course plus operator feedback before and after launch.",
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
    priceAmount: 250000,
    summary: "We physically help you set up and launch your unit.",
    bestFor: "You have a unit or budget and want hands-on launch help.",
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

const timelineOptions = [
  "This month",
  "1–3 months",
  "3–6 months",
  "Just learning for now",
]

const supportOptions = [
  "Course only",
  "Course + calls",
  "Hands-on launch help",
  "Not sure yet",
]

const hearAboutOptions = [
  "Google search",
  "Instagram / TikTok",
  "YouTube",
  "Friend / referral",
  "Blog post",
  "Other",
]

function recommendTier(questions: QuestionsStep) {
  if (questions.support === "Hands-on launch help") return "done-with-you"
  if (questions.support === "Course + calls") return "guided-launch"
  if (questions.experience === "I have a property but haven't listed it") return "guided-launch"
  if (questions.experience === "I'm already hosting but want to improve") return "guided-launch"
  if (questions.timeline === "This month") return "guided-launch"
  return "self-starter"
}

async function saveAcademyLead({
  contact,
  selectedTier,
  questions,
  notify = false,
  source,
}: {
  contact: ContactStep
  selectedTier?: string
  questions?: Partial<QuestionsStep>
  notify?: boolean
  source: AcademyLeadSource
}) {
  const tier = tiers.find((item) => item.value === selectedTier)
  const interestedIn = [
    tier ? `${tier.title} — KES ${tier.priceAmount.toLocaleString()}` : "Academy interest captured before pricing reveal",
    questions?.experience ? `Stage: ${questions.experience}` : undefined,
    questions?.timeline ? `Timeline: ${questions.timeline}` : undefined,
    questions?.support ? `Support: ${questions.support}` : undefined,
    questions?.hearAbout ? `Heard: ${questions.hearAbout}` : undefined,
    questions?.message ? `Note: ${questions.message}` : undefined,
  ].filter(Boolean).join(" | ")

  return fetch("/api/invest-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source,
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
  const [saveError, setSaveError] = useState("")
  const [selectedTier, setSelectedTier] = useState("")
  const [contact, setContact] = useState<ContactStep>({ name: "", whatsapp: "", email: "" })
  const [questions, setQuestions] = useState<QuestionsStep>({
    experience: "",
    timeline: "",
    support: "",
    hearAbout: "",
    message: "",
  })

  const recommendedTierValue = useMemo(() => recommendTier(questions), [questions])
  const recommendedTier = tiers.find((tier) => tier.value === recommendedTierValue)

  const handleWhatsappChange = useCallback((value: string) => {
    setContact((current) => ({ ...current, whatsapp: value }))
  }, [])

  async function handleContactContinue() {
    setSaveError("")
    const nameInput = document.getElementById("name") as HTMLInputElement | null
    const emailInput = document.getElementById("email") as HTMLInputElement | null
    const currentContact = {
      ...contact,
      name: nameInput?.value.trim() || "",
      email: emailInput?.value.trim() || "",
    }

    if (!currentContact.name) {
      nameInput?.focus()
      return
    }
    if (!currentContact.whatsapp) return
    if (!currentContact.email) {
      emailInput?.focus()
      return
    }

    setContact(currentContact)
    setLoading(true)
    try {
      const res = await saveAcademyLead({
        contact: currentContact,
        notify: true,
        source: "academy-enrol-step1",
      })
      if (!res.ok) {
        setSaveError("We couldn't save your details. Please try again or WhatsApp us at +254 111 695 444.")
        return
      }
      trackAcademyInterest({
        intentType: "contact_step_submit",
        pagePath: "/academy/enrol",
        formName: "academy_enrol_step_1",
        source: "academy-enrol-step1",
      }, "Lead")
      setStep(2)
    } catch {
      setSaveError("We couldn't save your details. Please try again or WhatsApp us at +254 111 695 444.")
    } finally {
      setLoading(false)
    }
  }

  async function handleQuestionsContinue() {
    if (!questions.experience || !questions.timeline || !questions.support) return
    const recommended = recommendTier(questions)
    setSelectedTier(recommended)
    setLoading(true)
    try {
      await saveAcademyLead({
        contact,
        selectedTier: recommended,
        questions,
        source: "academy-enrol-step2",
      })
      trackAcademyInterest({
        intentType: "qualification_step_submit",
        pagePath: "/academy/enrol",
        formName: "academy_enrol_step_2",
        source: "academy-enrol-step2",
        tier: recommended,
      })
      trackAcademyInterest({
        intentType: "tier_recommendation_view",
        pagePath: "/academy/enrol",
        formName: "academy_enrol_step_3",
        source: "academy-enrol-step3",
        tier: recommended,
      })
      setStep(3)
    } finally {
      setLoading(false)
    }
  }

  function handleTierSelect(tier: string) {
    setSelectedTier(tier)
    trackAcademyInterest({
      intentType: "tier_select",
      pagePath: "/academy/enrol",
      formName: "academy_enrol_step_3",
      source: "academy-enrol-step3",
      tier,
    })
  }

  async function handleFinalSubmit() {
    if (!selectedTier) return
    setLoading(true)
    try {
      const res = await saveAcademyLead({
        contact,
        selectedTier,
        questions,
        notify: true,
        source: "academy-enrol",
      })
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
          <h1 className="text-3xl font-bold text-white">You&apos;re on the early-bird list.</h1>
          <p className="mt-4 text-gray-300">
            We saved your details and tier interest. We&apos;ll send the curriculum, launch details, and next steps on WhatsApp/email.
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
              See Pricing + Curriculum
            </h1>
            <p className="mt-3 text-gray-400">
              Start with your details so we can send the full module breakdown and match you with the right support level.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-medium text-gray-400 mb-2">
              <span className={step >= 1 ? "text-primary" : ""}>Details</span>
              <span className={step >= 2 ? "text-primary" : ""}>Fit</span>
              <span className={step >= 3 ? "text-primary" : ""}>Early-bird options</span>
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
                  We&apos;ll save this first so we can follow up even if you don&apos;t finish the full form.
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
                  name="name"
                  autoComplete="name"
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white caret-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
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
                  onValueChange={handleWhatsappChange}
                  placeholder="7XX XXX XXX"
                />
                <p className="mt-1 text-xs text-gray-500">We&apos;ll use this to send Academy details and next steps.</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  name="email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white caret-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <Button
                type="button"
                size="lg"
                className="w-full py-4 text-base sm:py-6 sm:text-lg whitespace-normal leading-snug"
                disabled={loading}
                onClick={handleContactContinue}
              >
                {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</> : "Continue"}
              </Button>
              {saveError && (
                <p className="text-center text-sm text-red-400">{saveError}</p>
              )}
              <p className="text-center text-xs text-gray-500">No payment required.</p>
            </section>
          )}

          {step === 2 && (
            <section className="rounded-2xl border border-gray-700 bg-gray-800/60 backdrop-blur p-6 sm:p-8 space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-white">Help us point you to the right option</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Three quick questions. Then we&apos;ll show the early-bird options and our recommendation.
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
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-1">
                  When do you want to launch or improve? *
                </label>
                <select
                  id="timeline"
                  required
                  value={questions.timeline}
                  onChange={(e) => setQuestions({ ...questions, timeline: e.target.value })}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="">Select one...</option>
                  {timelineOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="support" className="block text-sm font-medium text-gray-300 mb-1">
                  What level of support sounds closest? *
                </label>
                <select
                  id="support"
                  required
                  value={questions.support}
                  onChange={(e) => setQuestions({ ...questions, support: e.target.value })}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="">Select one...</option>
                  {supportOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-300 mb-1">
                  How did you hear about ESA Academy?
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
                <Button type="button" variant="outline" className="border-gray-600 text-white hover:bg-gray-700" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="flex-1 py-4 text-base sm:py-6 sm:text-lg whitespace-normal leading-snug"
                  disabled={loading || !questions.experience || !questions.timeline || !questions.support}
                  onClick={handleQuestionsContinue}
                >
                  {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</> : "Show Best Fit"}
                </Button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="rounded-2xl border border-gray-700 bg-gray-800/60 backdrop-blur p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Your early-bird options</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Based on your answers, we&apos;d start you with <span className="font-semibold text-primary">{recommendedTier?.title}</span>. You can still choose any option.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {tiers.map((tier) => {
                  const isSelected = selectedTier === tier.value
                  const isRecommended = recommendedTierValue === tier.value
                  return (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => handleTierSelect(tier.value)}
                      className={`relative rounded-xl border p-5 text-left transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-gray-600 bg-gray-700/30 hover:border-gray-500"
                      }`}
                    >
                      {(tier.popular || isRecommended) && (
                        <div className="absolute -top-3 left-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                          {isRecommended ? "Best Fit" : "Most Popular"}
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-white">{tier.title}</h3>
                      <div className="mt-2 text-2xl font-bold text-primary"><Price amount={tier.priceAmount} /></div>
                      <p className="mt-2 text-sm text-gray-300">{tier.summary}</p>
                      <p className="mt-2 text-xs text-gray-400">{tier.bestFor}</p>
                      <ul className="mt-4 space-y-2">
                        {tier.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-xs text-gray-300">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  )
                })}
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm text-gray-200">
                <strong className="text-white">No payment today.</strong> This reserves your early-bird interest so we can send the curriculum, launch date, and next steps before public enrollment opens.
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="outline" className="border-gray-600 text-white hover:bg-gray-700" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="flex-1 py-4 text-base sm:py-6 sm:text-lg whitespace-normal leading-snug"
                  disabled={loading || !selectedTier}
                  onClick={handleFinalSubmit}
                >
                  {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Reserving...</> : "Reserve My Spot"}
                </Button>
              </div>

              <p className="text-center text-xs text-gray-500">
                By joining the early-bird list, you agree we may contact you about ESA Academy and handle your information according to our <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
