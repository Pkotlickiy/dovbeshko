"use client"

import { StructuredData } from "@/components/structured-data"

interface ServiceStructuredDataProps {
  name: string
  description: string
  url: string
}

export function ServiceStructuredData({ name, description, url }: ServiceStructuredDataProps) {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    url: url,
    provider: {
      "@type": "LegalService",
      name: "Адвокат Довбешко Светлана Юрьевна",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Московский проспект 143",
        addressLocality: "Санкт-Петербург",
        postalCode: "196105",
        addressCountry: "RU",
        addressRegion: "Московский район",
      },
      telephone: "+79310070752",
      email: "S0070752@mail.ru",
      url: "https://advokat-dovbeshko.ru",
    },
  }

  return <StructuredData data={serviceData} />
}
