import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Providers } from "./providers"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Montserrat, Playfair_Display, Cormorant } from "next/font/google"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SkipToContent } from "@/components/skip-to-content"
import { WebsiteSchema } from "@/components/website-schema"
import { siteConfig } from "@/lib/seo"

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-montserrat" })
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-playfair" })
const cormorant = Cormorant({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@lawyer",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${playfair.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preload" href="/images/hero-bg.webp" as="image" />
      </head>
      <body className="bg-white font-montserrat">
        <Providers>
          <SkipToContent />
          <WebsiteSchema />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
