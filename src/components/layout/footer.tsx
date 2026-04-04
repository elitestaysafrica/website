import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

const navigation = {
  properties: [
    { name: "Westlands", href: "/properties?area=westlands" },
    { name: "Kilimani", href: "/properties?area=kilimani" },
    { name: "Kileleshwa", href: "/properties?area=kileleshwa" },
    { name: "View All", href: "/properties" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  forOwners: [
    { name: "Partner With Us", href: "/invest" },
  ],
  social: [
    { name: "Instagram", href: "https://instagram.com/elitestaysafrica", icon: Instagram },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-6 pb-8 pt-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-8">
            <Image
              src="/images/logo-white.png"
              alt="Elite Stays Africa"
              width={180}
              height={62}
              className="h-12 w-auto"
            />
            <p className="text-sm text-gray-300">
              Premium short-term rentals in Nairobi. Business-ready, fully-furnished, and guest-approved.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Properties</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.properties.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">For Owners</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.forOwners.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Copyright */}
        <div className="mt-16 border-t border-gray-700 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-400 space-y-1">
              <p>hello@elitestaysafrica.com</p>
              <p>Nairobi, Kenya</p>
            </div>
            <p className="mt-8 text-xs text-gray-400 md:order-1 md:mt-0">
              &copy; {new Date().getFullYear()} Elite Stays Africa. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
