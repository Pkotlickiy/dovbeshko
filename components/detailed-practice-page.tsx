"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { CTAConsultation } from "@/components/cta-consultation"
import { FAQAccordion } from "@/components/faq-accordion"
import { PageDivider } from "@/components/page-divider"
import type { ReactNode } from "react"

interface Service {
  title: string
  description: string
}

interface ProcessStep {
  title: string
  description: string
  icon: ReactNode
}

interface Statistic {
  value: string
  label: string
  icon: ReactNode
}

interface FAQ {
  question: string
  answer: string
}

interface Case {
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
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  breadcrumbs: BreadcrumbItem[]
  overview: string
  services: Service[]
  process: ProcessStep[]
  statistics: Statistic[]
  faqs: FAQ[]
  cases: Case[]
  relatedAreas: RelatedArea[]
}

export function DetailedPracticePage({
  title,
  description,
  imageSrc,
  imageAlt,
  breadcrumbs,
  overview,
  services,
  process,
  statistics,
  faqs,
  cases,
  relatedAreas,
}: DetailedPracticePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0">
          <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <motion.h1
            className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="max-w-2xl text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Overview */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-8 text-3xl font-bold text-[#741717]">Обзор практики</h2>
          <p className="text-lg leading-relaxed text-gray-700">{overview}</p>
        </motion.div>
      </section>

      <PageDivider />

      {/* Services */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-[#741717]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Наши услуги
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-3 text-xl font-semibold text-[#741717]">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <PageDivider />

      {/* Process */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold text-[#741717]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Как мы работаем
          </motion.h2>
          <div className="mx-auto max-w-4xl">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="mb-8 flex items-start gap-4 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#741717] text-white">
                  {step.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageDivider />

      {/* Statistics */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-[#741717]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Наши достижения
        </motion.h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 rounded-full bg-[#741717]/10 p-4 text-[#741717]">{stat.icon}</div>
              <div className="mb-1 text-3xl font-bold text-[#741717]">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <PageDivider />

      {/* Case Examples */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold text-[#741717]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Примеры успешных дел
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((caseItem, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={caseItem.imageSrc || "/placeholder.svg"}
                    alt={caseItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-[#741717]">{caseItem.title}</h3>
                  <p className="mb-4 text-gray-600">{caseItem.description}</p>
                  <div className="rounded-md bg-green-50 p-3 text-green-800">
                    <strong>Результат:</strong> {caseItem.outcome}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageDivider />

      {/* FAQs */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-[#741717]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Часто задаваемые вопросы
        </motion.h2>
        <div className="mx-auto max-w-3xl">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <PageDivider />

      {/* Related Areas */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold text-[#741717]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Смежные области практики
          </motion.h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={area.href}
                  className="block rounded-lg border border-gray-200 bg-white p-6 text-center shadow-md transition-all hover:bg-[#741717] hover:text-white"
                >
                  <h3 className="text-lg font-semibold">{area.title}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTAConsultation />
    </div>
  )
}
