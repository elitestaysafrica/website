"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
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
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    console.log("Menu toggle clicked, current state:", isOpen)
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Elite Stays Africa"
              width={160}
              height={55}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Mobile menu button - using native button with explicit handler */}
          <button
            type="button"
            onClick={toggleMenu}
            onTouchEnd={(e) => {
              e.preventDefault()
              toggleMenu()
            }}
            className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 touch-manipulation"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

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
          <div className="hidden lg:flex lg:gap-x-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Book Now
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[1000] w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/images/logo.png"
              alt="Elite Stays Africa"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            onTouchEnd={(e) => {
              e.preventDefault()
              closeMenu()
            }}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 touch-manipulation"
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
                  onClick={closeMenu}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-gray-900 hover:bg-gray-50 active:bg-gray-100"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t space-y-3">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
            <Button className="w-full">
              Book Now
            </Button>
          </div>
        </nav>
      </div>
    </>
  )
}
