import type { ReactNode } from "react"
import { PracticeHero } from "@/components/practice-hero"
import { AnimatedSection } from "@/components/animated-section"
import { ProcessTimeline } from "@/components/process-timeline"
import { FAQAccordion } from "@/components/faq-accordion"
import { CTAConsultation } from "@/components/cta-consultation"
import { PageDivider } from "@/components/page-divider"
import { CaseCard } from "@/components/case-card"
import { PracticeIcon } from "@/components/practice-icon"
import { Contact as ContactForm } from "@/components/contact"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PracticeAreaSchema } from "@/components/practice-area-schema"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { YandexFAQSchema } from "@/components/yandex-faq-schema"

interface Service {
  title: string
  description: string
}

interface ProcessStep {
  title: string
  description: string
  icon: ReactNode
}

interface FAQItem {
  question: string
  answer: string
}

interface CaseExample {
  title: string
  description: string
  outcome: string
  imageSrc: string
}

interface RelatedArea {
  title: string
  href: string
}

interface BreadcrumbItem {
  label: string
  href: string
}

interface DetailedPracticePageProps {
  area: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  breadcrumbs: BreadcrumbItem[]
  overview: string
  services?: Service[]
  process?: ProcessStep[]
  faqs?: FAQItem[]
  cases?: CaseExample[]
  relatedAreas?: RelatedArea[]
}

export function DetailedPracticePage({
  area,
  title,
  description,
  imageSrc,
  imageAlt,
  breadcrumbs,
  overview,
  services = [],
  process = [],
  faqs = [],
  cases = [],
  relatedAreas = [],
}: DetailedPracticePageProps) {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Микроразметка */}
      <BreadcrumbSchema items={breadcrumbs} />
      <PracticeAreaSchema
        name={title}
        description={description}
        url={breadcrumbs[breadcrumbs.length - 1]?.href || ""}
        practiceArea={area}
      />
      {faqs && faqs.length > 0 && <YandexFAQSchema faqs={faqs} />}

      {/* Хлебные крошки */}
      <div className="container mx-auto px-4 pt-20 pb-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Hero секция */}
      <PracticeHero title={title} description={description} />

      {/* Обзор практики */}
      <AnimatedSection className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex justify-center md:w-1/3">
              <div className="bg-gray-50 p-8 rounded-full shadow-md flex items-center justify-center">
                <PracticeIcon area={area as any} size={96} />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#741717]">Описание практики</h2>
              <p className="text-gray-700 leading-relaxed">{overview}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Услуги */}
      {services && services.length > 0 && (
        <AnimatedSection className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-[#741717]">
              Услуги в данной области
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-[#741717]">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Процесс работы */}
      {process && process.length > 0 && (
        <>
          <PageDivider />
          <AnimatedSection className="py-16 px-4 bg-[#f8f5f2]">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center text-[#741717]">
                Как я работаю
              </h2>
              <ProcessTimeline steps={process} />
            </div>
          </AnimatedSection>
        </>
      )}

      {/* Примеры дел */}
      {cases && cases.length > 0 && (
        <>
          <PageDivider />
          <AnimatedSection className="py-16 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center text-[#741717]">
                Примеры успешных дел
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cases.map((caseExample, index) => (
                  <CaseCard
                    key={index}
                    title={caseExample.title}
                    description={caseExample.description}
                    result={caseExample.outcome}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </>
      )}

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <AnimatedSection className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center text-[#741717]">
              Часто задаваемые вопросы
            </h2>
            <FAQAccordion items={faqs} />
          </div>
        </AnimatedSection>
      )}

      {/* Форма обратной связи */}
      <AnimatedSection className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center text-[#741717]">
            Получить консультацию
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <ContactForm subject={`Консультация по практике: ${title}`} />
          </div>
        </div>
      </AnimatedSection>

      {/* Связанные области */}
      {relatedAreas && relatedAreas.length > 0 && (
        <AnimatedSection className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center text-[#741717]">
              Связанные области практики
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedAreas.map((area, index) => (
                <a
                  key={index}
                  href={area.href}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center group"
                >
                  <h3 className="text-lg font-semibold text-[#741717] group-hover:text-[#5a1212] transition-colors">
                    {area.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* CTA */}
      <CTAConsultation />
    </main>
  )
}
