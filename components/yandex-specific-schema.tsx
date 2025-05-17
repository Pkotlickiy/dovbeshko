"use client"

import { StructuredData } from "@/components/structured-data"
import { siteConfig } from "@/lib/seo"

export function YandexSpecificSchema() {
  const yandexSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${siteConfig.url}/#legalservice`,
    name: "Адвокат Довбешко Светлана Юрьевна",
    alternateName: ["Адвокат Довбешко С.Ю.", "Юрист Довбешко", "Адвокат в Санкт-Петербурге"],
    description:
      "Профессиональная юридическая помощь в Санкт-Петербурге. Защита ваших прав и интересов в уголовных, военных и гражданских делах.",
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/confident-female-lawyer.png`,
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
      latitude: 59.88969,
      longitude: 30.32128,
    },
    hasMap: "https://yandex.ru/maps/?ll=30.32128,59.88969&z=16&pt=30.32128,59.88969",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "15:00",
      },
    ],
    priceRange: "От 2000 ₽",
    paymentAccepted: ["Наличные", "Банковская карта", "Банковский перевод"],
    currenciesAccepted: "RUB",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 59.88969,
        longitude: 30.32128,
      },
      geoRadius: "50000",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Санкт-Петербург",
      },
      {
        "@type": "State",
        name: "Ленинградская область",
      },
    ],
    potentialAction: [
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/booking`,
          inLanguage: "ru",
          actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
        },
        result: {
          "@type": "Reservation",
          name: "Запись на консультацию",
        },
      },
      {
        "@type": "CommunicateAction",
        actionStatus: "PotentialActionStatus",
        object: "Консультация",
        instrument: [
          {
            "@type": "ContactPoint",
            contactType: "Телефон",
            telephone: "+79310070752",
          },
          {
            "@type": "ContactPoint",
            contactType: "Email",
            email: "S0070752@mail.ru",
          },
        ],
      },
    ],
  }

  return <StructuredData data={yandexSchema} />
}
