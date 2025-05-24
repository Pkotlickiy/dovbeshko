import type { Metadata } from "next"
import Link from "next/link"
import { EnhancedServicesShowcase } from "@/components/enhanced-services-showcase"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CtaConsultation } from "@/components/cta-consultation"
import { WebsiteSchema } from "@/components/website-schema"
import { YandexAttorneySchema } from "@/components/yandex-attorney-schema"

export const metadata: Metadata = {
  title: "Услуги адвоката | Довбешко С.Ю. | Юридическая помощь в СПб",
  description:
    "Полный спектр юридических услуг от адвоката с 10+ летним опытом: консультации, представительство в суде, составление документов. Первая консультация бесплатно!",
  keywords: [
    "услуги адвоката спб",
    "юридические услуги санкт-петербург",
    "консультация юриста",
    "представительство в суде",
    "составление юридических документов",
    "правовой анализ",
    "досудебное урегулирование",
  ],
}

export default function ServicesPage() {
  return (
    <>
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#741717] mb-6">Услуги адвоката</h1>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl">
            Я предлагаю полный спектр юридических услуг для физических и юридических лиц. Мой 10+ летний опыт работы
            позволяет эффективно решать правовые вопросы любой сложности. Выберите интересующую вас услугу, чтобы узнать
            подробнее о моем подходе и условиях сотрудничества.
          </p>

          <EnhancedServicesShowcase />

          <div className="mt-16 bg-[#f8f5f2] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#741717] mb-4">Не нашли нужную услугу?</h2>
            <p className="text-gray-700 mb-4">
              Свяжитесь со мной для обсуждения вашей ситуации. Я предлагаю индивидуальный подход к каждому клиенту и
              готова помочь с решением нестандартных правовых вопросов.
            </p>
            <Link
              href="/contacts"
              className="inline-block px-6 py-3 bg-[#741717] text-white font-medium rounded-md hover:bg-[#8c2020] transition-colors"
            >
              Связаться со мной
            </Link>
          </div>
        </div>

        <CtaConsultation />
      </main>
      <ScrollToTop />
      <WebsiteSchema />
      <YandexAttorneySchema
        name="Довбешко Светлана Юрьевна"
        regNumber="78/8409"
        experience="10+"
        specializations={[
          "Уголовные дела",
          "Военное право",
          "Недвижимость",
          "Наследственные споры",
          "Земельные споры",
          "Защита прав потребителей",
          "Арбитраж",
          "Медицинское право",
          "Неосновательное обогащение",
        ]}
      />
    </>
  )
}
