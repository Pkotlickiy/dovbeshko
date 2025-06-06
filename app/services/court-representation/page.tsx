import type { Metadata } from "next"
import { FileCheck, Users, FileText, Scale, CheckCircle } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"
import { LegalServiceSchema } from "@/components/legal-service-schema"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

// Обновить метаданные для страницы "Представительство в суде"
export const metadata: Metadata = {
  title: "Адвокат в суд СПб | Защита интересов | 95% выигранных дел",
  description:
    "Профессиональное представительство в судах СПб. Подготовка документов, участие в заседаниях, обжалование решений. Фиксированные цены от 15000₽.",
  keywords: [
    "представительство в суде спб",
    "услуги представителя в суде",
    "стоимость представительства в суде",
    "адвокат в гражданском процессе",
    "представитель в суде по семейным делам",
  ],
}

export default function CourtRepresentationPage() {
  // Проверяем, что используются правильные пропсы
  const services = [
    "Представительство в судах общей юрисдикции всех инстанций",
    "Представительство в арбитражных судах",
    "Подготовка всех необходимых процессуальных документов",
    "Сбор и анализ доказательств",
    "Участие во всех судебных заседаниях",
    "Обжалование судебных актов",
    "Исполнительное производство",
  ]

  const process = [
    {
      title: "Анализ дела",
      description: "Изучение документов и обстоятельств дела, оценка перспектив судебного разбирательства",
      icon: <FileCheck className="h-6 w-6" />,
    },
    {
      title: "Разработка стратегии",
      description: "Определение оптимальной правовой позиции и стратегии ведения дела",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Подготовка документов",
      description: "Составление исковых заявлений, отзывов, ходатайств и других процессуальных документов",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "Представительство в суде",
      description: "Участие во всех судебных заседаниях, представление доказательств, заявление ходатайств",
      icon: <Scale className="h-6 w-6" />,
    },
    {
      title: "Обжалование и исполнение",
      description: "При необходимости обжалование судебных актов, контроль исполнительного производства",
      icon: <CheckCircle className="h-6 w-6" />,
    },
  ]

  const faqs = [
    {
      question: "Обязательно ли мое присутствие в суде?",
      answer:
        "В большинстве случаев ваше присутствие не обязательно, я могу представлять ваши интересы по доверенности. Однако в некоторых категориях дел суд может обязать стороны явиться лично.",
    },
    {
      question: "Какие документы нужны для представительства в суде?",
      answer:
        "Для представительства в суде необходима нотариально заверенная доверенность и документы, относящиеся к предмету спора. Конкретный перечень документов зависит от категории дела.",
    },
    {
      question: "Сколько времени занимает судебный процесс?",
      answer:
        "Продолжительность судебного процесса зависит от сложности дела, загруженности суда и других факторов. В среднем рассмотрение дела в первой инстанции занимает от 2 до 6 месяцев.",
    },
    {
      question: "Можно ли решить дело мирным путем в процессе судебного разбирательства?",
      answer:
        "Да, на любой стадии процесса возможно заключение мирового соглашения. Я всегда рассматриваю возможность мирного урегулирования спора, если это соответствует вашим интересам.",
    },
  ]

  // Все пропсы соответствуют ожидаемым в ServicePageTemplate
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: "Главная", href: "/" },
          { label: "Помощь", href: "/services" },
          { label: "Представительство в суде", href: "/services/court-representation" },
        ]}
      />

      <LegalServiceSchema
        name="Представительство в суде"
        description="Профессиональное представительство ваших интересов в судах всех инстанций. Защита прав и законных интересов на всех стадиях судебного процесса с максимальной эффективностью."
        url="/services/court-representation"
        serviceType="LegalRepresentation"
        serviceOutput="Судебное представительство"
        offers={{
          price: "от 15000",
          priceCurrency: "RUB",
          availability: "https://schema.org/InStock",
        }}
        audience="Физические и юридические лица"
        award="Более 500 выигранных судебных дел"
      />

      <ServicePageTemplate
        title="Представительство в суде"
        description="Профессиональное представительство ваших интересов в судах всех инстанций. Защита прав и законных интересов на всех стадиях судебного процесса с максимальной эффективностью."
        imageSrc="/female-lawyer-courtroom.png"
        imageAlt="Адвокат представляет интересы клиента в суде"
        services={services}
        process={process}
        faqs={faqs}
        serviceType="LegalService"
        serviceSlug="court-representation"
      />
    </>
  )
}
