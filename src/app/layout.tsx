import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { BUSINESS } from "@/lib/business";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pinktouchup.example.com"),
  title: {
    default: `${BUSINESS.fullName} · ${BUSINESS.tagline} | Jaipur`,
    template: `%s · ${BUSINESS.fullName} Jaipur`,
  },
  description:
    "Pink Touch Up Beauty Parlour in Jaipur — hair, facials, makeup, bridal artistry, waxing, threading, mani-pedi & curated beauty packages. Book your beauty appointment online in minutes.",
  keywords: [
    "beauty parlour Jaipur",
    "ladies salon Jaipur",
    "bridal makeup Jaipur",
    "Pink Touch Up",
    "facial Jaipur",
    "waxing threading Jaipur",
    "book salon appointment",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: BUSINESS.fullName,
    title: `${BUSINESS.fullName} — ${BUSINESS.tagline}`,
    description:
      "A premium ladies' beauty parlour in Jaipur. Discover hair, skin, makeup & bridal rituals and book your appointment online.",
    images: [{ url: "/img/hero.jpg", width: 1600, height: 1200 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fdf8f6",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: BUSINESS.fullName,
  slogan: BUSINESS.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 10:00-20:00",
  image: "/img/hero.jpg",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
