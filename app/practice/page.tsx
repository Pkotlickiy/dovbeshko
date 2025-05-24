import type { Metadata } from "next"
import { PracticeAreasShowcase } from "@/components/practice-areas-showcase"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CtaConsultation } from "@/components/cta-consultation"
import { WebsiteSchema } from "@/components/website-schema"
import { YandexAttorneySchema } from "@/components/yandex-attorney-schema"

export const metadata: Metadata = {
  title: "Области практики | Адвокат Довбешко С.Ю. | Санкт-Петербург",
  description:
    "Адвокат с 10+ летним опытом в уголовных, военных, гражданских делах. Специализация на защите прав в суде, наследственных спорах, недвижимости. Звоните: +7 (931) 007-07-52!",
  keywords: [
    "адвокат спб",
    "юрист санкт-петербург",
    "адвокат довбешко",
    "уголовный адвокат",
    "военный юрист",
    "адвокат по недвижимости",
    "наследственные споры",
  ],
}

export default function PracticePage() {
  return (
    <>
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="relative mb-12">
            <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-[#741717] to-[#741717]/20"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#741717] mb-4">Области практики</h1>
            <div className="w-20 h-1 bg-[#741717]/30 mb-6"></div>
            <div className="bg-[#f8f5f2] p-6 rounded-lg border-l-4 border-[#741717] shadow-sm">
              <p className="text-lg text-gray-700 max-w-4xl leading-relaxed">
                Я специализируюсь на широком спектре юридических вопросов, включая уголовное, военное и гражданское
                право. Мой 10+ летний опыт позволяет эффективно защищать интересы клиентов в различных правовых
                ситуациях. Выберите интересующую вас область практики, чтобы узнать больше о моем подходе и успешных
                делах.
              </p>
            </div>
          </div>

          <PracticeAreasShowcase />
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
