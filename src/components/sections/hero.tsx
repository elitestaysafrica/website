import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative isolate pt-14">
      {/* Background gradient */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary/50 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* Badge */}
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                500+ guests hosted across Nairobi{" "}
                <Link href="/properties" className="font-semibold text-primary">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Browse properties <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Premium Short-Term Rentals in Nairobi
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Fully-furnished apartments in the city&apos;s best neighborhoods. 
              Business-ready. Guest-approved. From Westlands to Kilimani, 
              we operate Nairobi&apos;s most sought-after short-term rentals.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/properties">
                  Browse Properties
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/investors">
                  Partner With Us
                </Link>
              </Button>
            </div>

            {/* Trust bar */}
            <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-500">
              <div className="flex items-center gap-x-2">
                <span className="font-semibold text-gray-900">500+</span>
                <span>guests hosted</span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="font-semibold text-gray-900">80%</span>
                <span>avg occupancy</span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="font-semibold text-gray-900">4.8★</span>
                <span>guest rating</span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="font-semibold text-gray-900">4</span>
                <span>years in Nairobi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-primary/50 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}
