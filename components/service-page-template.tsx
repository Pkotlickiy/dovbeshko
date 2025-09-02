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
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Phone, Mail, CheckCircle, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { FAQ } from "@/types/faq"

interface ServiceDetails {
  title: string
  description: string
  price?: string
  duration?: string
  includes: string[]
}

interface BreadcrumbItem {
  label: string
  href: string
}

interface ServicePageTemplateProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  breadcrumbs: BreadcrumbItem[]
  overview: string
  serviceDetails: ServiceDetails
  process: Array<{
    title: string
    description: string
    icon: React.ReactNode
  }>
  faqs: FAQ[]
  benefits?: string[]
  relatedServices?: Array<{
    title: string
    href: string
  }>
}

export function ServicePageTemplate({
  title,
  description,
  imageSrc,
  imageAlt,
  breadcrumbs,
  overview,
  serviceDetails,
  process,
  faqs,
  benefits,
  relatedServices,
}: ServicePageTemplateProps) {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#741717] to-[#8B0000] py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Breadcrumbs items={breadcrumbs} className="mb-6 text-white/80" />

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
                    Заказать услугу
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[#741717] bg-transparent"
                >
                  <Link href="https://t.me/A0070752" target="_blank" rel="noopener noreferrer">
                    <Mail className="mr-2 h-5 w-5" />
                    Связаться в Telegram
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
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
                <h2 className="mb-4 text-3xl font-bold text-[#741717]">Описание услуги</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{overview}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Details Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Service Info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#741717]">{serviceDetails.title}</CardTitle>
                      <p className="text-gray-600">{serviceDetails.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Price and Duration */}
                      <div className="flex flex-wrap gap-4">
                        {serviceDetails.price && (
                          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            <span className="font-semibold text-green-800">{serviceDetails.price}</span>
                          </div>
                        )}
                        {serviceDetails.duration && (
                          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold text-blue-800">{serviceDetails.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* What's Included */}
                      <div>
                        <h3 className="text-lg font-semibold text-[#741717] mb-3">Что включено:</h3>
                        <ul className="space-y-2">
                          {serviceDetails.includes.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#741717]" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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
            </div>
          </div>
        </section>

        <Separator />

        {/* Process Section */}
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
                <h2 className="mb-4 text-3xl font-bold text-[#741717]">Как я работаю</h2>
                <p className="text-lg text-gray-600">Пошаговый процесс оказания услуги</p>
              </motion.div>

              <ProcessTimeline steps={process} />
            </div>
          </div>
        </section>

        <Separator />

        {/* Benefits Section */}
        {benefits && benefits.length > 0 && (
          <>
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
                    <h2 className="mb-4 text-3xl font-bold text-[#741717]">Преимущества</h2>
                    <p className="text-lg text-gray-600">Почему стоит выбрать эту услугу</p>
                  </motion.div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
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
                </div>
              </div>
            </section>
            <Separator />
          </>
        )}

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
                <p className="text-lg text-gray-600">Ответы на популярные вопросы об этой услуге</p>
              </motion.div>

              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices && relatedServices.length > 0 && (
          <>
            <Separator />
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
                    <h2 className="mb-4 text-3xl font-bold text-[#741717]">Смежные услуги</h2>
                    <p className="text-lg text-gray-600">Другие услуги, которые могут вас заинтересовать</p>
                  </motion.div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {relatedServices.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow">
                          <CardContent className="p-6 text-center">
                            <h3 className="text-lg font-semibold text-[#741717] mb-4">{service.title}</h3>
                            <Button asChild variant="outline" className="w-full bg-transparent">
                              <Link href={service.href}>Подробнее</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* CTA Section */}
        <CtaConsultation
          title="Готовы заказать эту услугу?"
          description="Свяжитесь со мной для получения персональной консультации и обсуждения деталей"
          buttonText="Заказать услугу"
        />
      </main>

      <ScrollToTop />
    </>
  )
}
