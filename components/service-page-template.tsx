import type React from "react"
import Image from "next/image"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ContactForm } from "@/components/contact-form"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ServiceStructuredData } from "@/components/service-structured-data"
import { LegalServiceSchema } from "@/components/legal-service-schema"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import type { ServiceType } from "@/lib/seo"

// Это правильный интерфейс пропсов для ServicePageTemplate
interface ServicePageTemplateProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  services: string[]
  process: {
    title: string
    description: string
    icon: React.ReactNode
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  serviceType: ServiceType
  children?: React.ReactNode
}

export function ServicePageTemplate({
  title,
  description,
  imageSrc,
  imageAlt,
  services,
  process,
  faqs,
  serviceType,
  children,
}: ServicePageTemplateProps) {
  // Создание breadcrumbs для SEO и навигации
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Услуги", href: "/services" },
    { label: title, href: `/services/${title.toLowerCase().replace(/\s+/g, "-")}` },
  ]

  // Формируем keywords на основе названия услуги и первых пунктов списка услуг
  const keywords = [
    title.toLowerCase(),
    `${title.toLowerCase()} спб`,
    `адвокат ${title.toLowerCase()}`,
    ...services.slice(0, 3).map((service) => service.toLowerCase()),
    "юрист спб",
    "адвокат санкт-петербург",
  ]

  return (
    <main className="flex flex-col min-h-screen pt-16">
      {/* Микроразметка для хлебных крошек */}
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Расширенная микроразметка для юридической услуги */}
      <LegalServiceSchema
        name={title}
        description={description}
        url={`/services/${title.toLowerCase().replace(/\s+/g, "-")}`}
        serviceType={title}
        serviceOutput={services[0]}
        keywords={keywords}
        offers={{
          price: "от 2000",
          priceCurrency: "RUB",
        }}
      />

      {/* Оригинальная микроразметка для совместимости */}
      <ServiceStructuredData
        name={title}
        description={description}
        url={`https://lawyer-website.vercel.app/services/${title.toLowerCase().replace(/\s+/g, "-")}`}
        provider={{
          name: "Адвокат Довбешко Светлана Юрьевна",
          url: "https://lawyer-website.vercel.app",
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-12 mt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#741717] mb-6">{title}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <p className="text-lg text-gray-700 mb-6">{description}</p>

              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-[#741717] mb-4">Что мы предлагаем</h2>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-[#741717]">✓</span>
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
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
          <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Как мы работаем</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:translate-y-[-5px]"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[#741717] rounded-full flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

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

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Получить консультацию</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ContactForm subject={`Консультация по услуге: ${title}`} />
          </div>
        </div>

        {children}
      </div>

      <ScrollToTop />
    </main>
  )
}
