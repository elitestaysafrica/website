"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "For general inquiries and bookings",
    value: "hello@elitestaysafrica.com",
    href: "mailto:hello@elitestaysafrica.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick responses, 24/7",
    value: "Message us on WhatsApp",
    href: "https://wa.me/254111695444",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Business hours: 8am - 8pm EAT",
    value: "Available via WhatsApp",
    href: "https://wa.me/254111695444",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "Based in Nairobi, Kenya",
    value: "Nairobi, Kenya",
    href: null,
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try WhatsApp or email instead.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Have a question about booking? Interested in partnering with us? 
              We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactMethods.map((method) => (
                <div
                  key={method.title}
                  className="rounded-xl bg-gray-50 p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{method.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{method.description}</p>
                  {method.href ? (
                    <a
                      href={method.href}
                      className="mt-2 block text-sm font-medium text-primary hover:underline"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm font-medium text-gray-700">
                      {method.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
              <p className="mt-2 text-gray-600">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-lg bg-green-50 p-6 text-center">
                  <h3 className="text-lg font-semibold text-green-800">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-green-700">
                    Thanks for reaching out. We&apos;ll get back to you soon.
                  </p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "general",
                        message: "",
                      })
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="booking">Booking Question</option>
                        <option value="partnership">Property Partnership</option>
                        <option value="support">Guest Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="aspect-[16/9] rounded-2xl bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="mx-auto h-12 w-12 mb-4" />
                <p>Map integration coming soon</p>
                <p className="text-sm">Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
