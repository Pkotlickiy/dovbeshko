import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PracticeAreaSchema } from "@/components/practice-area-schema"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

interface DetailedPracticePageProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  breadcrumbs: {
    label: string
    href: string
  }[]
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
  statistics?: {
    value: string | number
    label: string
    icon: React.ReactNode
  }[]
  faqs?: {
    question: string
    answer: string
  }[]
  cases?: {
    title: string
    description: string
    outcome: string
    imageSrc?: string
  }[]
  relatedAreas?: {
    title: string
    href: string
  }[]
  children?: React.ReactNode
}

export function DetailedPracticePage({
  title,
  description,
  imageSrc,
  imageAlt,
  breadcrumbs,
  overview,
  services,
  process,
  statistics,
  faqs = [],
  cases = [],
  relatedAreas = [],
  children,
}: DetailedPracticePageProps) {
  // URL для страницы, извлекаем из хлебных крошек
  const url = breadcrumbs[breadcrumbs.length - 1]?.href || ""

  // Формируем keywords на основе названия и услуг
  const keywords = [
    title.toLowerCase(),
    `${title.toLowerCase()} адвокат`,
    `${title.toLowerCase()} спб`,
    ...services.slice(0, 5).map((service) => service.title.toLowerCase()),
    "адвокат санкт-петербург",
    "юридическая консультация",
  ]

  // Преобразуем услуги для микроразметки
  const schemaServices = services.map((service) => ({
    name: service.title,
    description: service.description,
  }))

  // Преобразуем кейсы для микроразметки
  const schemaCases = cases.map((caseItem) => ({
    name: caseItem.title,
    description: caseItem.description,
    result: caseItem.outcome,
  }))

  return (
    <main className="flex flex-col min-h-screen pt-16">
      {/* Микроразметка Schema.org */}
      <BreadcrumbSchema items={breadcrumbs} />
      <PracticeAreaSchema
        name={title}
        description={overview}
        url={url}
        image={imageSrc}
        keywords={keywords}
        specialty={title}
        services={schemaServices}
        successCases={schemaCases}
        faqItems={faqs}
        knowsAbout={[title, ...services.map((s) => s.title)]}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-12 mt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#741717] mb-6">{title}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <p className="text-lg text-gray-700 mb-6">{description}</p>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#741717] mb-4">Обзор практики</h2>
                <p className="text-gray-700">{overview}</p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden shadow-lg h-[300px] md:h-[400px]">
                <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:translate-y-[-5px]"
              >
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Как мы работаем</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {process.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-start">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-12 h-12 bg-[#741717] rounded-full flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {statistics && statistics.length > 0 && (
          <div className="mb-12 bg-[#f8f5f2] py-8 px-4 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6 text-center">Наша статистика</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 text-center transition-transform duration-300 hover:translate-y-[-5px]"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 bg-[#741717] rounded-full flex items-center justify-center text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {faqs && faqs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Часто задаваемые вопросы</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <details className="group p-4">
                    <summary className="list-none flex justify-between items-center cursor-pointer">
                      <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                      <span className="transition group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-4 text-gray-600">{faq.answer}</div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}

        {cases && cases.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Примеры успешных дел</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {caseItem.imageSrc && (
                    <div className="relative h-40">
                      <Image
                        src={caseItem.imageSrc || "/placeholder.svg"}
                        alt={caseItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{caseItem.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{caseItem.description}</p>
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-sm font-semibold text-green-800">Результат: {caseItem.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {relatedAreas && relatedAreas.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Смежные области практики</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedAreas.map((area, index) => (
                <Link
                  key={index}
                  href={area.href}
                  className="bg-white rounded-lg shadow-md p-4 text-center transition-colors duration-300 hover:bg-gray-50"
                >
                  <span className="text-[#741717] font-medium">{area.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {children}
      </div>

      <ScrollToTop />
    </main>
  )
}
