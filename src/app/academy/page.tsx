import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Shield,
  Award,
  TrendingUp,
  ArrowRight,
  Home,
  Wrench,
  Users,
  Handshake,
} from "lucide-react"
import { ModuleAccordion, FAQItem } from "./AcademyClientComponents"
import { TrackPageIntent } from "@/components/IntentTracking"
import { IntentLink } from "@/components/IntentLink"

const faqs = [
  {
    q: "How is this different from YouTube tutorials?",
    a: "YouTube gives fragments. This is a complete system built from 4+ years of operating in Nairobi — with real cost data, real templates, and real support from people who actually do this every day.",
  },
  {
    q: "Do I need a property already?",
    a: "No. Module 2 teaches you how to find and evaluate properties. Many students start the course before signing a lease — that way you avoid expensive mistakes.",
  },
  {
    q: "How long do I have access?",
    a: "Lifetime access to all course materials, including future updates. The Nairobi market evolves, and so will this course.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. Complete all modules and show us you implemented the system. If it still didn't work, we'll first try to help you fix it. If we can't get you launched within 6 months of enrollment, you get a full refund.",
  },
  {
    q: "What's the difference between Guided Launch and Done-With-You?",
    a: "Guided Launch: you get three 30-minute 1-on-1 calls at key milestones — after completing the course, before going live, and after your first guest review. Done-With-You: we physically come to your property and help you set up your first unit. Both include the full course and community access.",
  },
  {
    q: "Is this just for Nairobi?",
    a: "The core principles — pricing, guest experience, operations, scaling — work anywhere. But our cost data, vendor lists, neighborhood guides, and market analysis are Nairobi-specific.",
  },
]

export default function AcademyPage() {
  return (
    <div className="pt-24">
      <TrackPageIntent
        audienceType="academy"
        intentType="page_view"
        pagePath="/academy"
        pageTitle="ESA Academy"
      />
      {/* ═══ HERO ═══ */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, white 1px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container relative mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
              <GraduationCap className="h-4 w-4" />
              ESA University
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              Learn How to Build a Profitable Airbnb Business in Nairobi
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-300">
              The complete step-by-step system from operators running 85%+
              occupancy and 4.92★ ratings across multiple properties.
            </p>

            <div className="mt-10 flex justify-center gap-8 sm:gap-12">
              <div>
                <div className="text-3xl font-bold text-white">8</div>
                <div className="text-sm text-gray-400">Modules</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">6+ hrs</div>
                <div className="text-sm text-gray-400">Content</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">27</div>
                <div className="text-sm text-gray-400">Videos</div>
              </div>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <IntentLink href="/academy/enrol" audienceType="academy" intentType="pricing_reveal_cta_click" ctaText="See Pricing + Curriculum" pagePath="/academy">
                  See Pricing + Curriculum <ArrowRight className="ml-2 h-5 w-5" />
                </IntentLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHO THIS IS FOR ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Who This Is For
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Whether you&apos;re starting from zero or trying to fix an
              underperforming listing.
            </p>
          </div>

          <div className="mt-12 mx-auto max-w-5xl grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Home,
                title: "Property Owners",
                desc: "You have a property and want to earn more from it than a long-term tenant pays. Learn how to set up and launch a profitable Airbnb.",
              },
              {
                icon: TrendingUp,
                title: "Aspiring Hosts",
                desc: "You want to start an Airbnb business but don't know where to begin. Get the complete roadmap — from finding a unit to your first booking.",
              },
              {
                icon: Wrench,
                title: "Existing Hosts",
                desc: "You're hosting but not hitting the occupancy or revenue you expected. Learn what's holding you back and how to fix it with data.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 p-8 text-center hover:border-primary/30 transition-colors"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU'LL LEARN ═══ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What You&apos;ll Learn
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              8 focused modules covering setup, launch, guests, operations,
              money, and scaling. Each includes video lessons, quizzes, and
              downloadable resources.
            </p>
          </div>

          <ModuleAccordion />

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              Certificate on completion
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              10+ downloadable resource packs
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Quizzes after every module
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MEET YOUR INSTRUCTORS ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet Your Instructors
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Learn from operators who do this every day — not consultants who
              read about it.
            </p>
          </div>

          <div className="mx-auto max-w-4xl grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                name: "Bill",
                image: "/images/team/bill.webp",
                role: "Strategy & Market Analysis",
                bio: "American expat, 4+ years operating short-term rentals in Nairobi. Tracks 500+ listings daily. Covers pricing strategy, market analysis, business models, listing optimization, and scaling.",
                videos: "~15 videos",
              },
              {
                name: "Peris",
                image: "/images/team/peris.webp",
                role: "Operations & Guest Experience",
                bio: "Kenyan operations expert. Manages day-to-day across multiple properties. Covers cleaning systems, vendor sourcing, furnishing, guest experience, staff management, and local knowledge.",
                videos: "~12 videos",
              },
            ].map((instructor) => (
              <div
                key={instructor.name}
                className="rounded-2xl border border-gray-200 p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {instructor.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {instructor.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {instructor.bio}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  <BookOpen className="h-3 w-3" />
                  {instructor.videos}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUPPORT PATHS ═══ */}
      <section
        id="pricing"
        className="relative py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, white 1px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container relative mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start With the Curriculum. Pick Support After.
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Everyone gets the same Nairobi-specific operating system. After we understand where you are, we’ll show the right level of support and founding member pricing.
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Learn the System",
                desc: "The full 8-module course, templates, checklists, quizzes, and community access.",
              },
              {
                icon: Users,
                title: "Get Operator Feedback",
                desc: "Add calls and listing review when you want Bill or Peris to check your setup before launch.",
              },
              {
                icon: Handshake,
                title: "Launch With Help",
                desc: "For serious hosts who want hands-on support setting up and launching their first unit.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-700 bg-gray-800/50 backdrop-blur p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 mx-auto max-w-2xl rounded-xl border border-green-500/30 bg-green-500/10 p-5 text-center">
            <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">
              <Shield className="h-5 w-5" />
              Money-Back Guarantee
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Complete everything and can&apos;t launch in 6 months? Full refund. No payment is due when you first submit interest.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <IntentLink href="/academy/enrol" audienceType="academy" intentType="pricing_reveal_cta_click" ctaText="See Pricing + Curriculum" pagePath="/academy">
                See Pricing + Curriculum <ArrowRight className="ml-2 h-5 w-5" />
              </IntentLink>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ GUARANTEE ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Money-Back Guarantee
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Complete all modules, implement what you learn, and if you
              can&apos;t launch a profitable Airbnb within 6 months — we&apos;ll
              refund 100% of your course fee — just show us you put in the work. 
            </p>
            <p className="mt-4 text-gray-500">
              We&apos;re that confident in the system because we use it
              ourselves, every day.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white px-6">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA FOOTER ═══ */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Join the next generation of professional Airbnb operators in
              Nairobi.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <IntentLink href="/academy/enrol" audienceType="academy" intentType="pricing_reveal_cta_click" ctaText="See Pricing + Curriculum" pagePath="/academy">
                  See Pricing + Curriculum <ArrowRight className="ml-2 h-5 w-5" />
                </IntentLink>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-gray-600 text-white hover:bg-gray-700">
                <Link href="/invest">
                  Or explore our done-for-you services →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
