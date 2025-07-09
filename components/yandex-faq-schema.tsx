"use client"

import Script from "next/script"

interface FAQ {
  question: string
  answer: string
}

interface YandexFAQSchemaProps {
  faqs: FAQ[]
  title?: string
}

export function YandexFAQSchema({ faqs, title = "Часто задаваемые вопросы" }: YandexFAQSchemaProps) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: title,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="yandex-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  )
}

// Экспорт по умолчанию для совместимости
export default YandexFAQSchema

// Именованный экспорт
export { YandexFAQSchema as YandexFAQSchemaComponent }
