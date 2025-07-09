import type { FAQ } from "@/types/faq"

interface YandexFAQSchemaProps {
  faqs: FAQ[]
  title?: string
}

export function YandexFAQSchema({ faqs, title = "Часто задаваемые вопросы" }: YandexFAQSchemaProps) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  const structuredData = {
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

// Export with different casing for compatibility
export { YandexFAQSchema as YandexFaqSchema }
export default YandexFAQSchema
