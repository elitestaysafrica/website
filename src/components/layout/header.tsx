"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Properties", href: "/properties" },
  { name: "Market Intel", href: "/market-intel" },
  { name: "For Investors", href: "/investors" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                src="/images/logo.png"
                alt="Elite Stays Africa"
                width={160}
                height={55}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Book Now
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile menu - rendered as sibling, not child */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/images/logo.png"
                  alt="Elite Stays Africa"
                  width={140}
                  height={48}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2.5 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 active:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t space-y-3">
                <Button variant="ghost" className="w-full justify-center">
                  Sign In
                </Button>
                <Button className="w-full justify-center">
                  Book Now
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
