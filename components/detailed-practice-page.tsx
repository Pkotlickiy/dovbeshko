"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Scale, CheckCircle, AlertTriangle, Award } from "lucide-react"
import { CtaConsultation } from "@/components/cta-consultation"
import { ContactForm } from "@/components/contact-form"
import { YandexFAQSchema } from "@/components/yandex-faq-schema"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import Image from "next/image"
import type { FAQ } from "@/types/faq"

interface Service {
  title: string
  description: string
  price?: string
}

interface ProcessStep {
  title: string
  description: string
  icon?: React.ReactNode
}

interface CaseExample {
  title: string
  description: string
  outcome: string
  imageSrc?: string
}

interface RelatedArea {
  title: string
  href: string
}

interface Breadcrumb {
  label: string
  href: string
}

interface DetailedPracticePageProps {
  area?: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  breadcrumbs?: Breadcrumb[]
  overview: string
  services?: Service[]
  process?: ProcessStep[]
  faqs?: FAQ[]
  cases?: CaseExample[]
  relatedAreas?: RelatedArea[]
}

export function DetailedPracticePage({
  area = "general",
  title,
  description,
  imageSrc,
  imageAlt,
  breadcrumbs = [],
  overview,
  services = [],
  process = [],
  faqs = [],
  cases = [],
  relatedAreas = [],
}: DetailedPracticePageProps) {
  const isMobile = useIsMobile()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const getAreaColor = (practiceArea: string) => {
    const colors = {
      criminal: "bg-red-100 text-red-800",
      military: "bg-green-100 text-green-800",
      land: "bg-yellow-100 text-yellow-800",
      consumer: "bg-blue-100 text-blue-800",
      realestate: "bg-purple-100 text-purple-800",
      arbitration: "bg-indigo-100 text-indigo-800",
      inheritance: "bg-pink-100 text-pink-800",
      medical: "bg-teal-100 text-teal-800",
      general: "bg-gray-100 text-gray-800",
    }
    return colors[practiceArea.toLowerCase() as keyof typeof colors] || colors.general
  }

  return (
    <>
      {faqs && faqs.length > 0 && <YandexFAQSchema faqs={faqs} title={`Часто задаваемые вопросы - ${title}`} />}

      <div className="min-h-screen bg-gradient-to-br from-white to-[#f8f5f2]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#741717] to-[#8B0000] py-20">
          <div className="absolute inset-0">
            <div className="absolute -left-4 top-1/4 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -right-4 bottom-1/4 h-40 w-40 rounded-full bg-white/5 blur-2xl"></div>
          </div>

          <div className="container relative mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-4xl text-center"
            >
              <Badge variant="secondary" className={`mb-4 ${getAreaColor(area)}`}>
                {area?.charAt(0).toUpperCase() + area?.slice(1).toLowerCase() || "Юридические услуги"}
              </Badge>
              <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">{title}</h1>
              <p className="mb-8 text-xl text-white/90 md:text-2xl">{description}</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="bg-white text-[#741717] hover:bg-gray-100">
                  <Link href="/booking">Записаться на консультацию</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[#741717] bg-transparent"
                >
                  <Link href="/contacts">Связаться с нами</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 py-16"
        >
          {/* Overview Section */}
          {overview && (
            <motion.section variants={itemVariants} className="mb-16">
              <div className="mx-auto max-w-4xl">
                <Card className="border-[#c4bab3]/20">
                  <CardContent className="p-8">
                    <p className="text-lg leading-relaxed text-gray-700">{overview}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.section>
          )}

          {/* Services Section */}
          {services && services.length > 0 && (
            <motion.section variants={itemVariants} className="mb-16">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-[#603a30]">Наши услуги</h2>
                <p className="text-lg text-gray-600">Полный спектр юридических услуг в данной области</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                  <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.02 }} className="group">
                    <Card className="h-full border-[#c4bab3]/20 transition-all duration-300 hover:border-[#741717]/30 hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Scale className="h-5 w-5 text-[#741717]" />
                          <CardTitle className="text-lg text-[#603a30]">{service.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4 text-gray-600">{service.description}</CardDescription>
                        {service.price && (
                          <Badge variant="outline" className="border-[#741717] text-[#741717]">
                            {service.price}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Process Section */}
          {process && process.length > 0 && (
            <motion.section variants={itemVariants} className="mb-16">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-[#603a30]">Как мы работаем</h2>
                <p className="text-lg text-gray-600">Пошаговый процесс решения вашей проблемы</p>
              </div>

              <div className="space-y-6">
                {process.map((step, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#741717] text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <Card className="border-[#c4bab3]/20">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="mb-2 text-xl font-semibold text-[#741717] flex items-center gap-2">
                                {step.icon}
                                {step.title}
                              </h3>
                              <p className="text-gray-600">{step.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* FAQ Section */}
          {faqs && faqs.length > 0 && (
            <motion.section variants={itemVariants} className="mb-16">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-[#603a30]">Часто задаваемые вопросы</h2>
                <p className="text-lg text-gray-600">Ответы на популярные вопросы</p>
              </div>

              <div className="mx-auto max-w-4xl space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="border-[#c4bab3]/20 transition-all duration-300 hover:border-[#741717]/30">
                      <CardHeader>
                        <CardTitle className="text-lg text-[#603a30] flex items-start gap-2">
                          <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-[#741717]" />
                          {faq.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-700 leading-relaxed">{faq.answer}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Case Examples Section */}
          {cases && cases.length > 0 && (
            <motion.section variants={itemVariants} className="mb-16">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-[#603a30]">Примеры дел</h2>
                <p className="text-lg text-gray-600">Успешные кейсы из нашей практики</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cases.map((example, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full border-[#c4bab3]/20 transition-all duration-300 hover:border-[#741717]/30">
                      {example.imageSrc && (
                        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                          <Image
                            src={example.imageSrc || "/placeholder.svg"}
                            alt={example.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg text-[#603a30] flex items-center gap-2">
                          <Award className="h-5 w-5 text-green-600" />
                          {example.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-gray-600">{example.description}</CardDescription>
                        <Separator />
                        <div className="flex items-start gap-2">
                          <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-600" />
                          <p className="text-sm font-medium text-green-700">Результат: {example.outcome}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Related Areas Section */}
          {relatedAreas && relatedAreas.length > 0 && (
            <motion.section variants={itemVariants} className="mb-16">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-[#603a30]">Смежные области</h2>
                <p className="text-lg text-gray-600">Другие направления нашей практики</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {relatedAreas.map((area, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Button
                      asChild
                      variant="outline"
                      className="border-[#741717] text-[#741717] hover:bg-[#741717] hover:text-white bg-transparent"
                    >
                      <Link href={area.href}>{area.title}</Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Contact Section */}
          <motion.section variants={itemVariants} className="mb-16">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#603a30]">Получить консультацию</h2>
              <p className="text-lg text-gray-600">Свяжитесь с нами для получения профессиональной помощи</p>
            </div>

            <div className="mx-auto max-w-2xl">
              <ContactForm subject={`Консультация по ${title.toLowerCase()}`} />
            </div>
          </motion.section>
        </motion.div>

        {/* CTA Section */}
        <CtaConsultation
          title="Нужна помощь по данному вопросу?"
          description="Не откладывайте решение юридических вопросов. Запишитесь на консультацию прямо сейчас."
          buttonText="Записаться на консультацию"
        />
      </div>
    </>
  )
}

export default DetailedPracticePage
