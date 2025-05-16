import { siteConfig } from "@/lib/seo"

export interface PracticeAreaSchemaProps {
  name: string
  description: string
  url: string
  serviceArea?: string
  mainEntityOfPage?: string
  image?: string
  keywords?: string[]
  specialty?: string
  knowsAbout?: string | string[]
  services?: Array<{
    name: string
    description?: string
  }>
  successCases?: Array<{
    name: string
    description?: string
    result?: string
  }>
  faqItems?: Array<{
    question: string
    answer: string
  }>
}

export const PracticeAreaSchema = ({
  name,
  description,
  url,
  serviceArea = "Санкт-Петербург и Ленинградская область",
  mainEntityOfPage,
  image,
  keywords,
  specialty,
  knowsAbout,
  services = [],
  successCases = [],
  faqItems = [],
}: PracticeAreaSchemaProps) => {
  // Создаем основной объект Schema.org для практики
  const mainSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name,
    description,
    url: `${siteConfig.url}${url}`,
    provider: {
      "@type": "Attorney",
      name: "Адвокат Довбешко Светлана Юрьевна",
      image: "https://lawyer-website.vercel.app/confident-female-lawyer.png",
      url: "https://lawyer-website.vercel.app",
      telephone: "+79310070752",
      email: "S0070752@mail.ru",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Московский пр-кт. 143",
        addressLocality: "Санкт-Петербург",
        postalCode: "196084",
        addressCountry: "RU",
      },
      areaServed: serviceArea,
      ...(specialty && { specialty }),
      ...(knowsAbout && { knowsAbout: Array.isArray(knowsAbout) ? knowsAbout : [knowsAbout] }),
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 59.939095,
        longitude: 30.315868,
      },
      geoRadius: "50000",
      name: serviceArea,
    },
    ...(mainEntityOfPage && { mainEntityOfPage }),
    ...(image && { image }),
    ...(keywords && { keywords: Array.isArray(keywords) ? keywords : [keywords] }),
    // Добавляем услуги как часть предложения
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Услуги в области "${name}"`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          ...(service.description && { description: service.description }),
        },
      })),
    },
  }

  // Создаем схему для FAQ, если есть вопросы и ответы
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null

  // Создаем схему для успешных кейсов, если они есть
  const casesSchema =
    successCases.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Успешные дела",
          itemListElement: successCases.map((caseItem, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Article",
              name: caseItem.name,
              description: caseItem.description,
              ...(caseItem.result && {
                articleBody: `Результат: ${caseItem.result}`,
              }),
            },
          })),
        }
      : null

  // Объединяем все схемы в один массив
  const allSchemas = [mainSchema]
  if (faqSchema) allSchemas.push(faqSchema)
  if (casesSchema) allSchemas.push(casesSchema)

  // Если есть только один элемент в массиве, возвращаем его напрямую
  const jsonLd = allSchemas.length === 1 ? JSON.stringify(allSchemas[0]) : JSON.stringify(allSchemas)

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
}
