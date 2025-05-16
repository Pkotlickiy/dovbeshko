import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, Libre_Baskerville } from "next/font/google"
import "./globals.css"
import { SkipToContent } from "@/components/skip-to-content"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
})

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#741717",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Адвокат Довбешко С.Ю. | Юридические услуги в Санкт-Петербурге",
    template: `%s | Адвокат Довбешко С.Ю.`,
  },
  description:
    "Профессиональная юридическая помощь в Санкт-Петербурге. Защита ваших прав и интересов в уголовных, военных и гражданских делах.",
  keywords: ["адвокат", "юрист", "Санкт-Петербург", "юридические услуги", "правовая помощь"],
  authors: [
    {
      name: "Довбешко Светлана Юрьевна",
      url: "https://example.com",
    },
  ],
  creator: "Довбешко Светлана Юрьевна",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://example.com",
    title: "Адвокат Довбешко С.Ю. | Юридические услуги в Санкт-Петербурге",
    description:
      "Профессиональная юридическая помощь в Санкт-Петербурге. Защита ваших прав и интересов в уголовных, военных и гражданских делах.",
    siteName: "Адвокат Довбешко С.Ю.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

// Schema for attorney
const attorneySchema = {
  "@context": "https://schema.org",
  "@type": "Attorney",
  name: "Довбешко Светлана Юрьевна",
  description: "Адвокат в Санкт-Петербурге",
  url: "https://example.com",
  telephone: "+79310070752",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Московский проспект 143",
    addressLocality: "Санкт-Петербург",
    postalCode: "196084",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "59.891605",
    longitude: "30.318705",
  },
  openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00 Sa 10:00-15:00",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#741717" />
        <meta name="msapplication-TileColor" content="#741717" />
        <meta name="theme-color" content="#741717" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(attorneySchema) }} />
        <meta name="author" content="Довбешко Светлана Юрьевна" />
        <meta name="geo.region" content="RU-SPE" />
        <meta name="geo.placename" content="Санкт-Петербург" />
        <meta name="geo.position" content="59.891605;30.318705" />
        <meta name="ICBM" content="59.891605, 30.318705" />
        <meta name="format-detection" content="telephone=yes" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${libreBaskerville.variable} font-sans bg-transparent`}>
        <SkipToContent />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
