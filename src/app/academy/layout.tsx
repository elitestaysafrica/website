import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ESA Academy | Elite Stays Africa",
  description:
    "Learn how to build a profitable Airbnb business in Nairobi with Elite Stays Africa's operator-led short-term rental course.",
}

export default function AcademyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
