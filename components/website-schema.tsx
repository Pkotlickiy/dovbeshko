"use client"

import { StructuredData } from "@/components/structured-data"

export function WebsiteSchema() {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Адвокат Довбешко С.Ю.",
        url: "https://advokat-dovbeshko.ru",
        description:
          "Профессиональная юридическая помощь в Санкт-Петербурге. Адвокат Довбешко С.Ю. специализируется на уголовных, гражданских и административных делах.",
        publisher: {
          "@type": "Organization",
          name: "Адвокат Довбешко С.Ю.",
          logo: {
            "@type": "ImageObject",
            url: "https://advokat-dovbeshko.ru/logo.png",
          },
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://advokat-dovbeshko.ru/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
        sameAs: [], // Гарантированно инициализируем как пустой массив
      }}
    />
  )
}
