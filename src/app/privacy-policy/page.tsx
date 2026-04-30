import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Elite Stays Africa",
  description: "How Elite Stays Africa collects, uses, and protects website visitor, guest, owner, investor, and ESA Academy lead information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-24 pb-16">
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Elite Stays Africa</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Privacy Policy</h1>
            <p className="mt-5 text-lg text-gray-600">
              This page explains what information we collect, why we collect it, and how we use it across our short-term rental, property owner, investor, and ESA Academy services.
            </p>
            <p className="mt-3 text-sm text-gray-500">Last updated: 30 April 2026</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="prose prose-gray mx-auto max-w-3xl prose-headings:text-gray-900 prose-a:text-primary">
            <h2>Who we are</h2>
            <p>
              Elite Stays Africa provides premium short-term rental stays in Nairobi, property setup/management services, market intelligence, and education through ESA Academy.
            </p>

            <h2>Information you give us</h2>
            <p>When you contact us, request a listing audit, join an Academy waitlist, or submit a form, we may collect:</p>
            <ul>
              <li>your name;</li>
              <li>email address;</li>
              <li>phone or WhatsApp number;</li>
              <li>property, listing, budget, timeline, or Academy interest details;</li>
              <li>messages or questions you send us.</li>
            </ul>

            <h2>Information collected automatically</h2>
            <p>
              We use analytics and advertising tools to understand website performance and improve our marketing. These tools may collect technical information such as pages viewed, links clicked, device/browser information, approximate location, referral source, and campaign information.
            </p>
            <p>Our current tools include:</p>
            <ul>
              <li>Google Analytics 4;</li>
              <li>Meta Pixel for Facebook/Instagram measurement and retargeting;</li>
              <li>TikTok Pixel may be added later for TikTok measurement and retargeting.</li>
            </ul>

            <h2>How we use information</h2>
            <p>We use information to:</p>
            <ul>
              <li>respond to guest, owner, investor, and Academy inquiries;</li>
              <li>send requested information, reports, audits, or waitlist updates;</li>
              <li>understand which pages, properties, and services people are interested in;</li>
              <li>improve the website and our offers;</li>
              <li>create advertising audiences such as guest interest, investor/owner interest, and ESA Academy interest;</li>
              <li>measure whether our marketing is working.</li>
            </ul>

            <h2>Advertising and retargeting</h2>
            <p>
              We may use Meta, Google, and TikTok tools to show relevant ads to people who have visited our website or interacted with our content. For example, someone who views property pages may later see guest-related ads, while someone who views owner or Academy pages may see property management or training-related ads.
            </p>
            <p>
              Meta&apos;s advanced matching may use information you type into forms, such as email or phone number, to improve matching and measurement. Meta states that this information is hashed before being used for matching.
            </p>

            <h2>Cookies and similar technologies</h2>
            <p>
              Cookies and similar technologies help our website remember technical details, measure traffic, and support advertising/retargeting. You can control cookies through your browser settings. Blocking cookies may affect analytics accuracy and some website functionality.
            </p>

            <h2>Who we share information with</h2>
            <p>We do not sell your personal information. We may share limited information with service providers that help us operate the website, respond to leads, measure analytics, or run advertising, including Google, Meta, hosting providers, and form/email systems.</p>

            <h2>How long we keep information</h2>
            <p>
              We keep inquiry and lead information for as long as needed to respond, manage relationships, improve our services, and maintain business records, unless you ask us to delete it or the law requires a different retention period.
            </p>

            <h2>Your choices</h2>
            <p>You can:</p>
            <ul>
              <li>ask us what information we hold about you;</li>
              <li>ask us to correct or delete your information;</li>
              <li>unsubscribe from marketing messages;</li>
              <li>control cookies in your browser;</li>
              <li>use platform ad settings on Google, Facebook/Instagram, or TikTok.</li>
            </ul>

            <h2>Contact us</h2>
            <p>
              For privacy questions or requests, contact us at <a href="mailto:hello@elitestaysafrica.com">hello@elitestaysafrica.com</a> or through our <Link href="/contact">contact page</Link>.
            </p>

            <p className="text-sm text-gray-500">
              This policy is practical business guidance, not a substitute for legal advice. We may update it as our website, services, or marketing tools change.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
