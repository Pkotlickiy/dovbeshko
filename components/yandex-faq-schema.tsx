"use client"

import { StructuredData } from "@/components/structured-data"

interface FaqItem {
  question: string
  answer: string
}

interface YandexFaqSchemaProps {
  faqs: FaqItem[]
}

export function YandexFaqSchema({ faqs }: YandexFaqSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return <StructuredData data={faqSchema} />
}
