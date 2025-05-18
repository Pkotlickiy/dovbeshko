// Этот компонент не будет использоваться напрямую, но содержит стандартизированную структуру
// для всех страниц практики. Он служит шаблоном для обновления существующих страниц.

import type React from "react"
import type { Metadata } from "next"
import { DetailedPracticePage } from "@/components/detailed-practice-page"

interface StandardPracticePageProps {
  title: string
  metaTitle: string
  metaDescription: string
  description: string
  imageSrc: string
  imageAlt: string
  area: string
  overview: string
  services: {
    title: string
    description: string
  }[]
  process: {
    title: string
    description: string
    icon: React.ReactNode
  }[]
  statistics: {
    value: string | number
    label: string
    icon: React.ReactNode
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  cases: {
    title: string
    description: string
    outcome: string
    imageSrc?: string
  }[]
  relatedAreas: {
    title: string
    href: string
  }[]
}

export function generateStandardMetadata({ metaTitle, metaDescription }: StandardPracticePageProps): Metadata {
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      metaTitle.toLowerCase().replace(" | ", " ").replace(" СПб", " спб"),
      "адвокат спб",
      "юрист санкт-петербург",
      "консультация юриста",
    ],
  }
}

export function StandardPracticePage(props: StandardPracticePageProps) {
  const {
    title,
    description,
    imageSrc,
    imageAlt,
    area,
    overview,
    services,
    process,
    statistics,
    faqs,
    cases,
    relatedAreas,
  } = props

  // Стандартные хлебные крошки для всех страниц практики
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Практика", href: "/practice" },
    { label: title, href: `/practice/${area}` },
  ]

  return (
    <DetailedPracticePage
      title={title}
      description={description}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      breadcrumbs={breadcrumbs}
      overview={overview}
      services={services}
      process={process}
      statistics={statistics}
      faqs={faqs}
      cases={cases}
      relatedAreas={relatedAreas}
      area={area}
    />
  )
}
