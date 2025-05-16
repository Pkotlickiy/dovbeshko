"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { CTAConsultation } from "@/components/cta-consultation"
import { FAQAccordion } from "@/components/faq-accordion"
import { PageDivider } from "@/components/page-divider"
import { useInView } from "react-intersection-observer"
import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { AnimatedHeroBackground } from "@/components/animated-hero-background"
import { useEffect } from "react"

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
  children?: ReactNode
}

export function DetailedPracticePage({
  title,
  description,
  breadcrumbs,
  overview,
  services,
  process,
  statistics,
  faqs,
  cases,
  relatedAreas,
  children,
}: DetailedPracticePageProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeIndex, setActiveIndex] = useState(0)

  // Автоматическое переключение анимированных элементов
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Анимированный Hero Section с новым компонентом */}
      <AnimatedHeroBackground className="py-20">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="mb-8 text-lg text-white/90 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link
                href="#services"
                className="rounded-md bg-white px-6 py-3 font-medium text-[#741717] transition-all hover:bg-white/90"
              >
                Наши услуги
              </Link>
              <Link
                href="#contact"
                className="rounded-md border border-white bg-transparent px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                Получить консультацию
              </Link>
            </motion.div>
          </div>

          {/* Анимированные индикаторы */}
          <div className="mt-12 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.button
                key={i}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  activeIndex === i ? "bg-white w-6" : "bg-white/50",
                )}
                onClick={() => setActiveIndex(i)}
                animate={{
                  scale: activeIndex === i ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 1, repeat: activeIndex === i ? Number.POSITIVE_INFINITY : 0 }}
              />
            ))}
          </div>

          {/* Анимированные карточки преимуществ */}
          <div className="mt-8 flex justify-center">
            <motion.div
              className="relative h-16 w-full max-w-lg overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {[
                "Профессиональная юридическая поддержка",
                "Индивидуальный подход к каждому клиенту",
                "Многолетний опыт успешной практики",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center px-4 text-center text-white"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    y: activeIndex === i ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {text}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedHeroBackground>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Overview */}
      <section id="overview" className="container mx-auto px-4 py-16">
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
      <section id="services" className="container mx-auto px-4 py-16">
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
              className="group rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 h-2 w-16 rounded-full bg-gradient-to-r from-[#741717] to-[#9c2a2a] transition-all group-hover:w-24" />
              <h3 className="mb-3 text-xl font-semibold text-[#741717]">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <PageDivider />

      {/* Process */}
      <section id="process" className="bg-gray-50 py-16">
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
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#741717] text-white"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {step.icon}
                </motion.div>
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
      <section id="statistics" className="container mx-auto px-4 py-16">
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
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="mb-4 rounded-full bg-[#741717]/10 p-4 text-[#741717]"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="mb-1 text-3xl font-bold text-[#741717]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5 + index * 0.1,
                }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <PageDivider />

      {/* Case Examples */}
      <section id="cases" className="bg-gray-50 py-16">
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
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Заменяем изображение на анимированный градиентный блок */}
                <motion.div
                  className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#741717] to-[#9c2a2a]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Декоративные элементы - отображаем только если разрешены фоновые эффекты */}

                  {/* Анимированные линии - отображаем только если разрешены фоновые эффекты */}

                  {/* Номер кейса */}
                  <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                    Кейс {index + 1}
                  </div>

                  {/* Иконка документа - анимируем только если разрешены автоматические анимации */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{ duration: 5 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <line x1="10" y1="9" x2="8" y2="9" />
                    </svg>
                  </motion.div>
                </motion.div>

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
      <section id="faq" className="container mx-auto px-4 py-16">
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
      <section id="related" className="bg-gray-50 py-16">
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
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <Link
                  href={area.href}
                  className="group block rounded-lg border border-gray-200 bg-white p-6 text-center shadow-md transition-all hover:bg-[#741717] hover:text-white"
                >
                  <motion.h3 className="text-lg font-semibold" whileHover={{ scale: 1.05 }}>
                    {area.title}
                  </motion.h3>
                  <motion.div
                    className="mx-auto mt-2 h-0.5 w-0 bg-white transition-all group-hover:w-16"
                    initial={{ width: 0 }}
                    whileHover={{ width: 64 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div id="contact">{children || <CTAConsultation />}</div>
    </div>
  )
}
