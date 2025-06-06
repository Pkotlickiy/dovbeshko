import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { PracticeAreas } from "@/components/practice-areas"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { CaseTimeline } from "@/components/case-timeline"
import { FaqSection } from "@/components/faq-section"
import { Contact } from "@/components/contact"
import { ScrollToTop } from "@/components/scroll-to-top"
import { StructuredData } from "@/components/structured-data"
// Убедимся, что импорт соответствует экспорту
import { CtaConsultation } from "@/components/cta-consultation"

// Обновить метаданные для главной страницы
export const metadata: Metadata = {
  title: "Адвокат в СПб | Довбешко С.Ю. | Бесплатная первая консультация",
  description:
    "Опытный адвокат в Санкт-Петербурге с 10+ летним стажем. Уголовные, гражданские, семейные дела. Защита в суде от 15000₽. Звоните: +7 (931) 007-07-52!",
  keywords: [
    "адвокат спб",
    "юрист санкт-петербург",
    "адвокат довбешко",
    "юридические услуги спб цены",
    "консультация адвоката спб",
    "опытный адвокат московский район спб",
  ],
}

export default function Home() {
  // Определим структурированные данные с гарантированно инициализированными массивами
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Адвокат Довбешко Светлана Юрьевна",
    description:
      "Профессиональная юридическая помощь в Санкт-Петербурге. Защита ваших прав и интересов в уголовных, военных и гражданских делах.",
    url: "https://advokat-dovbeshko.ru",
    telephone: "+79310070752",
    email: "S0070752@mail.ru",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Московский проспект 143",
      addressLocality: "Санкт-Петербург",
      postalCode: "196105",
      addressCountry: "RU",
      addressRegion: "Московский район",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "59.88969",
      longitude: "30.32128",
    },
    openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00 Sa 10:00-15:00",
    priceRange: "От 2000 ₽",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "59.88969",
        longitude: "30.32128",
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Юридическая помощь",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Представительство в суде",
            url: "https://advokat-dovbeshko.ru/services/court-representation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Составление юридических документов",
            url: "https://advokat-dovbeshko.ru/services/document-preparation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Консультации",
            url: "https://advokat-dovbeshko.ru/services/consultations",
          },
        },
      ],
    },
    areaServed: "Санкт-Петербург и Ленинградская область",
    sameAs: [], // Гарантированно инициализируем как пустой массив
  }

  return (
    <>
      <main className="section-padding pt-16 mt-0">
        <HeroSection />
        <PracticeAreas />
        <Services />
        <About />
        <Testimonials />
        <CaseTimeline />
        <FaqSection />
        <Contact />
        <CtaConsultation />
      </main>
      <ScrollToTop />
      <StructuredData data={structuredData} />
    </>
  )
}
