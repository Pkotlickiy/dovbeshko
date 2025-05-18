"use client"

import { StructuredData } from "@/components/structured-data"
import { siteConfig } from "@/lib/seo"

export function YandexAttorneySchema() {
  const attorneySchema = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    "@id": `${siteConfig.url}/#attorney`,
    name: "Довбешко Светлана Юрьевна",
    givenName: "Светлана",
    familyName: "Довбешко",
    additionalName: "Юрьевна",
    gender: "Female",
    image: `${siteConfig.url}/confident-female-lawyer.png`,
    description: "Адвокат в Санкт-Петербурге с многолетним опытом успешной практики в различных отраслях права",
    telephone: "+79310070752",
    email: "S0070752@mail.ru",
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      postalCode: "196105",
      addressLocality: "Санкт-Петербург",
      streetAddress: "Московский проспект 143",
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
    knowsLanguage: ["ru", "en"],
    knowsAbout: [
      "Уголовное право",
      "Гражданское право",
      "Земельное право",
      "Наследственное право",
      "Медицинское право",
      "Защита прав потребителей",
      "Военное право",
      "Арбитражные споры",
      "Неосновательное обогащение",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Адвокатский статус",
      recognizedBy: {
        "@type": "Organization",
        name: "Адвокатская палата Санкт-Петербурга",
      },
      validFrom: "2010",
    },
    memberOf: {
      "@type": "Organization",
      name: "Адвокатская палата Санкт-Петербурга",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Санкт-Петербургский государственный университет",
      department: "Юридический факультет",
    },
  }

  return <StructuredData data={attorneySchema} />
}
