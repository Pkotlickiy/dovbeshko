import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Providers } from "@/app/providers"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SkipToContent } from "@/components/skip-to-content"
import { WebsiteSchema } from "@/components/website-schema"
import { YandexMetrika } from "@/components/yandex-metrika"
import { YandexSpecificSchema } from "@/components/yandex-specific-schema"
import { YandexAttorneySchema } from "@/components/yandex-attorney-schema"

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" })
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: {
    template: "%s | Адвокат Довбешко С.Ю.",
    default: "Адвокат Довбешко С.Ю. | Юридические услуги в Санкт-Петербурге",
  },
  description:
    "Профессиональная юридическая помощь адвоката Довбешко С.Ю. в Санкт-Петербурге. Консультации, представительство в суде, защита прав и интересов.",
  keywords: [
    "адвокат",
    "юрист",
    "юридические услуги",
    "Санкт-Петербург",
    "консультация юриста",
    "представительство в суде",
    "защита прав",
  ],
  authors: [{ name: "Довбешко Светлана Юрьевна" }],
  creator: "Довбешко Светлана Юрьевна",
  publisher: "Довбешко Светлана Юрьевна",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://advokat-dovbeshko.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Адвокат Довбешко С.Ю. | Юридические услуги в Санкт-Петербурге",
    description:
      "Профессиональная юридическая помощь адвоката Довбешко С.Ю. в Санкт-Петербурге. Консультации, представительство в суде, защита прав и интересов.",
    url: "https://advokat-dovbeshko.ru",
    siteName: "Адвокат Довбешко С.Ю.",
    locale: "ru_RU",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Providers>
          <SkipToContent />
          <WebsiteSchema />
          <YandexSpecificSchema />
          <YandexAttorneySchema />
          <YandexMetrika yandexCounterId="101596523" />
          <Header />
          <main id="main" className="pt-16">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
