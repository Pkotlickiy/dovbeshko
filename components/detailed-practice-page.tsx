"use client"

import type React from "react"
import { ArrowRight, CheckCircle, Phone, MessageCircle } from "lucide-react"
import { AnimatedSection, AnimatedItem } from "@/components/animated-section"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PracticeAreaSchema } from "@/components/practice-area-schema"
import { YandexFaqSchema } from "@/components/yandex-faq-schema"
import { FormattedList } from "@/components/formatted-list"
import { SectionDivider } from "@/components/section-divider"
import { PageDivider } from "@/components/page-divider"
import Link from "next/link"
import Image from "next/image"

interface ServiceItem {
  title: string
  description: string
}

interface ProcessStep {
  title: string
  description: string
  icon: React.ReactNode
}

interface FAQ {
  question: string
  answer: string
}

interface CaseStudy {
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
  services: (string | ServiceItem)[]
  process: ProcessStep[]
  faqs: FAQ[]
  cases: CaseStudy[]
  relatedAreas: RelatedArea[]
}

export function DetailedPracticePage({
  area,
  title,
  description,
  imageSrc,
  imageAlt,
  breadcrumbs,
  overview,
  services,
  process,
  faqs,
  cases,
  relatedAreas,
}: DetailedPracticePageProps) {
  return (
    <>
      <PracticeAreaSchema area={area} title={title} description={description} />
      <YandexFaqSchema faqs={faqs} />

      <main className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero Section */}
        <AnimatedSection className="relative bg-gradient-to-br from-[#741717] to-[#8B0000] py-16 md:py-24 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="container relative mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <AnimatedItem>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Специализация
                  </Badge>
                </AnimatedItem>

                <AnimatedItem delay={0.1}>
                  <h1 className="font-playfair text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{title}</h1>
                </AnimatedItem>

                <AnimatedItem delay={0.2}>
                  <p className="text-xl text-white/90 leading-relaxed">{description}</p>
                </AnimatedItem>

                <AnimatedItem delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-white text-[#741717] hover:bg-white/90 font-medium" asChild>
                      <a href="https://t.me/A0070752" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Связаться со мной
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-[#741717] bg-transparent"
                      asChild
                    >
                      <a href="tel:+79310070752">
                        <Phone className="mr-2 h-5 w-5" />
                        +7 (931) 007-07-52
                      </a>
                    </Button>
                  </div>
                </AnimatedItem>
              </div>

              <AnimatedItem delay={0.4} className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={imageSrc || "/placeholder.svg"}
                    alt={imageAlt}
                    width={600}
                    height={400}
                    className="object-cover w-full h-[400px]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </AnimatedItem>
            </div>
          </div>
        </AnimatedSection>

        {/* Overview Section */}
        <AnimatedSection className="py-16 md:py-24 bg-[#f8f5f2]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <AnimatedItem>
                <div className="text-center mb-12">
                  <h2 className="font-playfair text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl mb-6">
                    Обзор практики
                  </h2>
                  <PageDivider variant="simple" className="mb-8" />
                </div>
              </AnimatedItem>

              <AnimatedItem delay={0.1}>
                <div className="prose prose-lg max-w-none text-[#603a30] leading-relaxed">
                  <FormattedList items={overview} />
                </div>
              </AnimatedItem>
            </div>
          </div>
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedItem>
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl mb-6">
                  Мои услуги
                </h2>
                <p className="text-xl text-[#603a30] max-w-3xl mx-auto">
                  Полный спектр юридических услуг в области {title.toLowerCase()}
                </p>
                <PageDivider variant="simple" className="mt-8" />
              </div>
            </AnimatedItem>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <AnimatedItem key={index} delay={0.1 + index * 0.05}>
                  <Card className="h-full border-[#c4bab3]/20 hover:border-[#741717]/30 transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#741717]/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-[#741717]" />
                        </div>
                        <div className="flex-1">
                          {typeof service === "string" ? (
                            <CardTitle className="text-lg font-semibold text-[#741717] leading-tight">
                              {service}
                            </CardTitle>
                          ) : (
                            <>
                              <CardTitle className="text-lg font-semibold text-[#741717] leading-tight mb-2">
                                {service.title}
                              </CardTitle>
                              <CardDescription className="text-[#603a30] leading-relaxed">
                                {service.description}
                              </CardDescription>
                            </>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </AnimatedItem>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Process Section */}
        <AnimatedSection className="py-16 md:py-24 bg-[#f8f5f2]">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedItem>
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl mb-6">
                  Как я работаю
                </h2>
                <p className="text-xl text-[#603a30] max-w-3xl mx-auto">
                  Пошаговый процесс решения вашей юридической задачи
                </p>
                <PageDivider variant="simple" className="mt-8" />
              </div>
            </AnimatedItem>

            <div className="max-w-4xl mx-auto">
              {process.map((step, index) => (
                <AnimatedItem key={index} delay={0.1 + index * 0.1}>
                  <div className="flex gap-6 mb-8 last:mb-0">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#741717] rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-playfair text-xl font-semibold text-[#741717] mb-2">{step.title}</h3>
                      <p className="text-[#603a30] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </AnimatedItem>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <AnimatedSection className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <AnimatedItem>
                <div className="text-center mb-12">
                  <h2 className="font-playfair text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl mb-6">
                    Часто задаваемые вопросы
                  </h2>
                  <p className="text-xl text-[#603a30] max-w-3xl mx-auto">
                    Ответы на наиболее распространенные вопросы по {title.toLowerCase()}
                  </p>
                  <PageDivider variant="simple" className="mt-8" />
                </div>
              </AnimatedItem>

              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AnimatedItem key={index} delay={0.1 + index * 0.05}>
                      <AccordionItem value={`item-${index}`} className="border-b border-[#c4bab3]/20">
                        <AccordionTrigger className="text-left font-playfair font-medium text-[#603a30] hover:text-[#741717] hover:no-underline py-6">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-6">
                          <FormattedList items={faq.answer} />
                        </AccordionContent>
                      </AccordionItem>
                    </AnimatedItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Cases Section */}
        {cases.length > 0 && (
          <AnimatedSection className="py-16 md:py-24 bg-[#f8f5f2]">
            <div className="container mx-auto px-4 md:px-6">
              <AnimatedItem>
                <div className="text-center mb-12">
                  <h2 className="font-playfair text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl mb-6">
                    Примеры дел
                  </h2>
                  <p className="text-xl text-[#603a30] max-w-3xl mx-auto">
                    Успешные кейсы из моей практики (с соблюдением конфиденциальности)
                  </p>
                  <PageDivider variant="simple" className="mt-8" />
                </div>
              </AnimatedItem>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {cases.map((caseStudy, index) => (
                  <AnimatedItem key={index} delay={0.1 + index * 0.1}>
                    <Card className="h-full border-[#c4bab3]/20 hover:border-[#741717]/30 transition-all duration-300 hover:shadow-lg overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={caseStudy.imageSrc || "/placeholder.svg"}
                          alt={caseStudy.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-[#741717] mb-2">{caseStudy.title}</CardTitle>
                        <CardDescription className="text-[#603a30] leading-relaxed mb-4">
                          {caseStudy.description}
                        </CardDescription>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-green-800 mb-1">Результат:</p>
                          <p className="text-sm text-green-700">{caseStudy.outcome}</p>
                        </div>
                      </CardHeader>
                    </Card>
                  </AnimatedItem>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Related Areas Section */}
        {relatedAreas.length > 0 && (
          <AnimatedSection className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <AnimatedItem>
                <div className="text-center mb-12">
                  <h2 className="font-playfair text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl mb-6">
                    Смежные области практики
                  </h2>
                  <p className="text-xl text-[#603a30] max-w-3xl mx-auto">
                    Другие направления, в которых я могу помочь
                  </p>
                  <PageDivider variant="simple" className="mt-8" />
                </div>
              </AnimatedItem>

              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {relatedAreas.map((area, index) => (
                  <AnimatedItem key={index} delay={0.1 + index * 0.05}>
                    <Button
                      variant="outline"
                      className="border-[#741717]/30 text-[#741717] hover:bg-[#741717] hover:text-white transition-all duration-300 bg-transparent"
                      asChild
                    >
                      <Link href={area.href}>
                        {area.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </AnimatedItem>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* CTA Section */}
        <AnimatedSection className="py-16 md:py-24 bg-gradient-to-br from-[#741717] to-[#8B0000] text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <AnimatedItem>
              <h2 className="font-playfair text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Нужна помощь по {title.toLowerCase()}?
              </h2>
            </AnimatedItem>

            <AnimatedItem delay={0.1}>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Свяжитесь со мной для получения профессиональной консультации и защиты ваших интересов
              </p>
            </AnimatedItem>

            <AnimatedItem delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-[#741717] hover:bg-white/90 font-medium" asChild>
                  <a href="https://t.me/A0070752" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Написать в Telegram
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#741717] bg-transparent"
                  asChild
                >
                  <a href="tel:+79310070752">
                    <Phone className="mr-2 h-5 w-5" />
                    Позвонить сейчас
                  </a>
                </Button>
              </div>
            </AnimatedItem>
          </div>
        </AnimatedSection>

        <SectionDivider color="#f8f5f2" variant="angle" />
      </main>
    </>
  )
}
