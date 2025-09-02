"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Service {
  title: string
  description: string
  features: string[]
  href: string
  category: string
  popular?: boolean
}

interface EnhancedServicesShowcaseProps {
  services?: Service[]
}

const defaultServices: Service[] = [
  {
    title: "Консультации",
    description: "Профессиональные юридические консультации по всем правовым вопросам",
    features: [
      "Первичная консультация 60 минут",
      "Анализ документов и ситуации",
      "Конкретный план действий",
      "Оценка перспектив дела",
    ],
    href: "/services/consultations",
    category: "Консультирование",
    popular: true,
  },
  {
    title: "Представительство в суде",
    description: "Защита ваших интересов в судах всех инстанций",
    features: [
      "Подготовка процессуальных документов",
      "Участие в судебных заседаниях",
      "Защита интересов на всех стадиях",
      "Обжалование судебных решений",
    ],
    href: "/services/court-representation",
    category: "Судебная защита",
  },
  {
    title: "Подготовка документов",
    description: "Составление исков, жалоб, договоров и других юридических документов",
    features: ["Исковые заявления и жалобы", "Договоры и соглашения", "Претензии и уведомления", "Правовые заключения"],
    href: "/services/document-preparation",
    category: "Документооборот",
  },
  {
    title: "Досудебное урегулирование",
    description: "Помощь в разрешении споров без обращения в суд",
    features: ["Переговоры с контрагентами", "Составление претензий", "Медиация и арбитраж", "Мировые соглашения"],
    href: "/services/pre-trial-settlement",
    category: "Урегулирование",
  },
  {
    title: "Правовой анализ",
    description: "Анализ документов и правовых ситуаций с выработкой оптимальной стратегии",
    features: ["Экспертиза документов", "Правовой аудит", "Оценка рисков", "Стратегическое планирование"],
    href: "/services/legal-analysis",
    category: "Аналитика",
  },
  {
    title: "Абонентское обслуживание",
    description: "Комплексное юридическое сопровождение на постоянной основе",
    features: ["Постоянная правовая поддержка", "Приоритетное обслуживание", "Льготные тарифы", "Комплексный подход"],
    href: "/services/subscription",
    category: "Сопровождение",
    popular: true,
  },
]

export function EnhancedServicesShowcase({ services = defaultServices }: EnhancedServicesShowcaseProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[#741717] md:text-4xl">Мои услуги</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Профессиональная юридическая помощь в различных областях права
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-[#741717]/10 text-[#741717] hover:bg-[#741717]/20">
                      {service.category}
                    </Badge>
                    {service.popular && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">Популярно</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl text-[#741717] group-hover:text-[#8f1d1d] transition-colors">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#741717] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Button
                      asChild
                      className="w-full bg-[#741717] hover:bg-[#8f1d1d] text-white group-hover:shadow-lg transition-all"
                    >
                      <Link href={service.href}>
                        Подробнее
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-[#741717] text-[#741717] hover:bg-[#741717] hover:text-white bg-transparent"
                    >
                      <Link href="https://t.me/A0070752" target="_blank" rel="noopener noreferrer">
                        Связаться со мной
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-6">
            Не нашли нужную услугу? Свяжитесь со мной для индивидуальной консультации
          </p>
          <Button asChild size="lg" className="bg-[#741717] hover:bg-[#8f1d1d]">
            <Link href="/contacts">
              Получить консультацию
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
