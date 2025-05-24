"use client"

import { StructuredData } from "@/components/structured-data"

interface YandexAttorneySchemaProps {
  name?: string
  description?: string
  experience?: string
  specialization?: string[]
  address?: string
  telephone?: string
  email?: string
  url?: string
  image?: string
}

export function YandexAttorneySchema({
  name = "Довбешко Светлана Юрьевна",
  description = "Профессиональный адвокат с опытом более 10+ лет. Специализация на уголовных, гражданских и административных делах.",
  experience = "10+",
  specialization = [
    "Уголовные дела",
    "Гражданские дела",
    "Административные дела",
    "Земельные споры",
    "Наследственные дела",
  ],
  address = "Московский пр-кт. 143, Санкт-Петербург, 196105",
  telephone = "+79310070752",
  email = "S0070752@mail.ru",
  url = "https://advokat-dovbeshko.ru",
  image = "https://advokat-dovbeshko.ru/confident-female-lawyer.png",
}: YandexAttorneySchemaProps) {
  // Проверяем, что specialization - это массив
  const safeSpecialization = Array.isArray(specialization) ? specialization : []

  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "Attorney",
        name: name,
        description: description,
        image: image,
        url: url,
        telephone: telephone,
        email: email,
        address: {
          "@type": "PostalAddress",
          streetAddress: address,
          addressLocality: "Санкт-Петербург",
          postalCode: "196105",
          addressCountry: "RU",
        },
        priceRange: "По договоренности",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Юридические услуги",
          itemListElement: safeSpecialization.map((spec) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: spec,
            },
          })),
        },
        sameAs: [], // Гарантированно инициализируем как пустой массив
      }}
    />
  )
}
