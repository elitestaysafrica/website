import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ESA Academy Enrol | Elite Stays Africa",
  description:
    "Join the ESA Academy pre-sale list and choose the short-term rental training tier that fits your launch plan.",
}

export default function AcademyEnrolLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
