"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FaqAccordion } from "@/components/faq-accordion"
import { ProcessTimeline } from "@/components/process-timeline"
import { CtaConsultation } from "@/components/cta-consultation"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PracticeAreaSchema } from "@/components/practice-area-schema"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Phone, Mail, CheckCircle, AlertTriangle, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { FAQ } from "@/types/faq"

interface PracticePageTemplateProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  services: string[]
  process: Array<{
    title: string
    description: string
    icon: React.ReactNode
  }>
  faqs: FAQ[]
  practiceSlug: string
  keyBenefits?: string[]
  risks?: string[]
  importantNotes?: string[]
}

export function PracticePageTemplate({
  title,
  description,
  imageSrc,
  imageAlt,
  services,
  process,
  faqs,
  practiceSlug,
  keyBenefits,
  risks,
  importantNotes,
}: PracticePageTemplateProps) {
  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Практика", href: "/practice" },
    { label: title, href: `/practice/${practiceSlug}` },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />

      <PracticeAreaSchema
        name={title}
        description={description}
        url={`/practice/${practiceSlug}`}
        practiceArea={title}
        attorney={{
          name: "Довбешко Светлана Юрьевна",
          regNumber: "78/8409",
          experience: "10+",
        }}
      />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#741717] to-[#8B0000] py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Breadcrumbs items={breadcrumbItems} className="mb-6 text-white/80" />

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 text-4xl font-bold md:text-5xl"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 text-xl text-white/90"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col gap-4 sm:flex-row sm:justify-center"
              >
                <Button asChild size="lg" className="bg-white text-[#741717] hover:bg-gray-100">
                  <Link href="/booking">
                    <Phone className="mr-2 h-5 w-5" />
                    Записаться на консультацию
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[#741717] bg-transparent"
                >
                  <Link href="/contacts">
                    <Mail className="mr-2 h-5 w-5" />
                    Связаться со мной
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Services List */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#741717]">Мои услуги в данной области</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {services.map((service, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#741717]" />
                            <span className="text-gray-700">{service}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center"
                >
                  <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={imageSrc || "/placeholder.svg"}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Key Benefits */}
              {keyBenefits && keyBenefits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-16"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#741717] text-center flex items-center justify-center gap-2">
                        <Award className="h-6 w-6" />
                        Ключевые преимущества
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        {keyBenefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200"
                          >
                            <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                            <span className="text-gray-700">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Risks and Important Notes */}
              {(risks && risks.length > 0) ||
                (importantNotes && importantNotes.length > 0 && (
                  <div className="mt-16 grid gap-8 md:grid-cols-2">
                    {/* Risks */}
                    {risks && risks.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-xl text-[#741717] flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-orange-500" />
                              Возможные риски
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {risks.map((risk, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: index * 0.1 }}
                                  className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-200"
                                >
                                  <AlertTriangle className="mt-1 h-4 w-4 flex-shrink-0 text-orange-500" />
                                  <span className="text-gray-700 text-sm">{risk}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {/* Important Notes */}
                    {importantNotes && importantNotes.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-xl text-[#741717] flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-blue-500" />
                              Важно знать
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {importantNotes.map((note, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: index * 0.1 }}
                                  className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200"
                                >
                                  <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-blue-500" />
                                  <span className="text-gray-700 text-sm">{note}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <h2 className="mb-4 text-3xl font-bold text-[#741717]">Как я работаю</h2>
                <p className="text-lg text-gray-600">Пошаговый процесс работы для достижения наилучшего результата</p>
              </motion.div>

              <ProcessTimeline steps={process} />
            </div>
          </div>
        </section>

        <Separator />

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <h2 className="mb-4 text-3xl font-bold text-[#741717]">Часто задаваемые вопросы</h2>
                <p className="text-lg text-gray-600">Ответы на популярные вопросы по данной области права</p>
              </motion.div>

              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CtaConsultation
          title="Нужна помощь в данной области права?"
          description="Свяжитесь со мной для получения персональной консультации по вашему вопросу"
          buttonText="Записаться на консультацию"
        />
      </main>

      <ScrollToTop />
    </>
  )
}
