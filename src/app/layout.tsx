import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elite Stays Africa | Premium Short-Term Rentals in Nairobi",
  description:
    "Book professionally-managed Airbnb apartments in Nairobi's best neighborhoods. Business-ready, fully-furnished, and guest-approved. Or partner with us to maximize your property's returns.",
  keywords: [
    "Nairobi short term rentals",
    "Airbnb Nairobi",
    "Serviced apartments Nairobi",
    "Westlands Airbnb",
    "Kilimani furnished apartment",
    "Nairobi property management",
    "Kenya STR investment",
  ],
  authors: [{ name: "Elite Stays Africa" }],
  openGraph: {
    title: "Elite Stays Africa | Premium Short-Term Rentals in Nairobi",
    description:
      "Book professionally-managed Airbnb apartments in Nairobi's best neighborhoods.",
    url: "https://elitestaysafrica.com",
    siteName: "Elite Stays Africa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Stays Africa | Premium Short-Term Rentals in Nairobi",
    description:
      "Book professionally-managed Airbnb apartments in Nairobi's best neighborhoods.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
