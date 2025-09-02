import type { Metadata } from "next"
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
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#741717] to-[#8B0000] py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">Услуги адвоката</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Предлагаю полный спектр юридических услуг для физических и юридических лиц. Мой 10+ летний опыт работы
                позволяет эффективно решать правовые вопросы любой сложности.
              </p>
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <EnhancedServicesShowcase />

        {/* CTA Section */}
        <CtaConsultation
          title="Готовы получить профессиональную помощь?"
          description="Свяжитесь со мной для получения персональной консультации по вашему вопросу"
          buttonText="Записаться на консультацию"
        />
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
