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
  const [isOpen, setIsOpen] = useState(false)

  // Lock body scroll when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isOpen])

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

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex items-center justify-center w-12 h-12 -mr-2 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
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
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button size="sm">Book Now</Button>
          </div>
        </nav>
      </header>

      {/* Mobile menu - fullscreen overlay approach */}
      {isOpen && (
        <div 
          className="lg:hidden"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          {/* Dark backdrop */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu panel */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '280px',
              maxWidth: '85vw',
              backgroundColor: 'white',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Menu header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderBottom: '1px solid #e5e7eb',
            }}>
              <Link href="/" onClick={() => setIsOpen(false)}>
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
                onClick={() => setIsOpen(false)}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  color: '#374151',
                }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu items */}
            <nav style={{ padding: '16px', flex: 1 }}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#111827',
                        textDecoration: 'none',
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                <Button variant="outline" className="w-full mb-3">Sign In</Button>
                <Button className="w-full">Book Now</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
