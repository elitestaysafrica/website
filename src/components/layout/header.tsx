"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CurrencySelector } from "@/components/CurrencySelector"

const navigation = [
  { name: "Properties", href: "/properties" },
  // { name: "Market Intel", href: "/market-intel" }, // Temporarily hidden
  { name: "For Investors", href: "/invest" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Main header */}
      <header 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255,255,255,0.9)',
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <nav 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
          }}
        >
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Elite Stays Africa"
              width={160}
              height={55}
              style={{ height: '40px', width: 'auto' }}
              priority
            />
          </Link>

          {/* Mobile: currency + hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
            <CurrencySelector />
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
              aria-label="Open menu"
            >
              <Menu style={{ width: '24px', height: '24px', color: '#374151' }} />
            </button>
          </div>

          {/* Desktop nav */}
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

          <div className="hidden lg:flex lg:items-center lg:gap-x-4">
            <CurrencySelector />
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button size="sm">Book Now</Button>
          </div>
        </nav>
      </header>

      {/* Full screen mobile menu */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
            backgroundColor: 'white',
            WebkitOverflowScrolling: 'touch',
            overflowY: 'auto',
          }}
          className="lg:hidden"
        >
          {/* Menu header */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src="/images/logo.png"
                alt="Elite Stays Africa"
                width={120}
                height={40}
                style={{ height: '32px', width: 'auto' }}
              />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
              aria-label="Close menu"
            >
              <X style={{ width: '24px', height: '24px', color: '#374151' }} />
            </button>
          </div>

          {/* Menu content */}
          <div style={{ padding: '24px 16px' }}>
            <nav>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '16px',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#111827',
                    textDecoration: 'none',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Currency Selector for Mobile */}
            <div style={{ marginTop: '24px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Currency</div>
              <CurrencySelector />
            </div>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button variant="outline" size="lg" className="w-full">
                Sign In
              </Button>
              <Button size="lg" className="w-full">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
