import type { ReactNode } from "react"
import type { Metadata } from "next"
import { PracticeHero } from "@/components/practice-hero"
import { AnimatedSection } from "@/components/animated-section"
import { ProcessTimeline } from "@/components/process-timeline"
import { AnimatedStats } from "@/components/animated-stats"
import { FAQAccordion } from "@/components/faq-accordion"
import { CTAConsultation } from "@/components/cta-consultation"
import { PageDivider } from "@/components/page-divider"
import { FormattedList } from "@/components/formatted-list"
import { CaseCard } from "@/components/case-card"
import { PracticeIcon } from "@/components/practice-icon"
import { Contact as ContactForm } from "@/components/contact"
import {
  FileText,
  Shield,
  Briefcase,
  Home,
  Heart,
  File,
  Coins,
  CheckCircle,
  AlertTriangle,
  Clock,
  Award,
  Users,
  Gavel,
  Scale,
  Building,
  Key,
  Landmark,
  ScrollText,
} from "lucide-react"

interface ProcessStep {
  title: string
  description: string
}

interface Stat {
  value: number | string
  label: string
  suffix?: string
}

interface FAQItem {
  question: string
  answer: string
}

interface CaseExample {
  title: string
  description: string
  result: string
}

interface PracticePageTemplateProps {
  title: string
  description: string
  metaDescription: string
  content: string[]
  services: string[]
  area:
    | "criminal"
    | "realestate"
    | "land"
    | "consumer"
    | "arbitration"
    | "inheritance"
    | "medical"
    | "unjust-enrichment"
    | "military"
  whenToContact?: string[]
  advantages?: string[]
  processSteps?: ProcessStep[]
  stats?: Stat[]
  faqs?: FAQItem[]
  caseExamples?: CaseExample[]
}

export function generateMetadata({ title, metaDescription }: PracticePageTemplateProps): Metadata {
  return {
    title,
    description: metaDescription,
  }
}

export function PracticePageTemplate({
  title,
  description,
  content,
  services,
  area,
  whenToContact = [],
  advantages = [],
  processSteps = [],
  stats = [],
  faqs = [],
  caseExamples = [],
}: PracticePageTemplateProps) {
  // Функция для получения иконки по имени
  const getIcon = (iconName: string): ReactNode => {
    const iconProps = { className: "h-6 w-6 text-white", strokeWidth: 2 }

    switch (iconName.toLowerCase()) {
      case "file-text":
        return <FileText {...iconProps} />
      case "shield":
        return <Shield {...iconProps} />
      case "briefcase":
        return <Briefcase {...iconProps} />
      case "home":
        return <Home {...iconProps} />
      case "heart":
        return <Heart {...iconProps} />
      case "file":
        return <File {...iconProps} />
      case "coins":
        return <Coins {...iconProps} />
      case "gavel":
        return <Gavel {...iconProps} />
      case "scale":
        return <Scale {...iconProps} />
      case "building":
        return <Building {...iconProps} />
      case "key":
        return <Key {...iconProps} />
      case "landmark":
        return <Landmark {...iconProps} />
      default:
        return <FileText {...iconProps} />
    }
  }

  // Функция для получения иконки для шага процесса
  const getProcessIcon = (index: number): ReactNode => {
    const iconProps = { className: "h-6 w-6 text-white", strokeWidth: 2 }

    switch (index) {
      case 0:
        return <FileText {...iconProps} />
      case 1:
        return <CheckCircle {...iconProps} />
      case 2:
        return <Briefcase {...iconProps} />
      case 3:
        return <Award {...iconProps} />
      case 4:
        return <Users {...iconProps} />
      default:
        return <Clock {...iconProps} />
    }
  }

  // Функция для получения тематической иконки для практики
  const getPracticeIcon = (): ReactNode => {
    const iconProps = { className: "w-full h-full text-[#741717]", strokeWidth: 1.5 }

    switch (area) {
      case "criminal":
        return <Gavel {...iconProps} />
      case "realestate":
        return <Building {...iconProps} />
      case "land":
        return <Shield {...iconProps} />
      case "consumer":
        return <Briefcase {...iconProps} />
      case "inheritance":
        return <Heart {...iconProps} />
      case "medical":
        return <ScrollText {...iconProps} />
      case "arbitration":
        return <Coins {...iconProps} />
      default:
        return <FileText {...iconProps} />
    }
  }

  // Добавляем иконки к шагам процесса
  const processStepsWithIcons = processSteps.map((step, index) => ({
    ...step,
    icon: getProcessIcon(index),
  }))

  return (
    <main className="flex flex-col min-h-screen">
      <PracticeHero title={title} description={description} />

      <AnimatedSection className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex justify-center md:w-1/3">
              <div className="bg-gray-50 p-8 rounded-full shadow-md flex items-center justify-center">
                <PracticeIcon area={area} size={96} />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#741717]">Описание практики</h2>
              <div className="space-y-4">
                {content.map((paragraph, index) => (
                  <p key={index} className="text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-[#741717]">
            Услуги в данной области
          </h2>
          <FormattedList items={services} />
        </div>
      </AnimatedSection>

      {/* Когда обращаться */}
      {whenToContact && whenToContact.length > 0 && (
        <>
          <PageDivider />
          <AnimatedSection className="py-16 px-4 bg-[#f8f5f2]">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center text-[#741717]">
                Когда обращаться к адвокату
              </h2>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <FormattedList items={whenToContact} icon={<AlertTriangle className="h-5 w-5 text-[#741717]" />} />
              </div>
            </div>
          </AnimatedSection>
        </>
      )}

      {/* Преимущества */}
      {advantages && advantages.length > 0 && (
        <>
          <PageDivider />
          <AnimatedSection className="py-16 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center text-[#741717]">
                Наши преимущества
              </h2>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <FormattedList items={advantages} icon={<CheckCircle className="h-5 w-5 text-[#741717]" />} />
              </div>
            </div>
          </AnimatedSection>
        </>
      )}

      {/* Процесс работы */}
      {processSteps && processSteps.length > 0 && (
        <>
          <PageDivider />
          <AnimatedSection className="py-16 px-4 bg-[#f8f5f2]">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center text-[#741717]">
                Как мы работаем
              </h2>

              <ProcessTimeline steps={processStepsWithIcons} />
            </div>
          </AnimatedSection>
        </>
      )}

      {/* Примеры дел */}
      {caseExamples && caseExamples.length > 0 && (
        <>
          <PageDivider />
          <AnimatedSection className="py-16 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center text-[#741717]">
                Примеры успешных дел
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseExamples.map((caseExample, index) => (
                  <CaseCard
                    key={index}
                    title={caseExample.title}
                    description={caseExample.description}
                    result={caseExample.result}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </>
      )}

      {/* Статистика */}
      {stats && stats.length > 0 && <AnimatedStats stats={stats} />}

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <AnimatedSection className="py-16 px-4">
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

      {/* CTA */}
      <CTAConsultation />
    </main>
  )
}
