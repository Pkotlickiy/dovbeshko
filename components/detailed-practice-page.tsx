"use client"

import type React from "react"
import Link from "next/link"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PracticeAreaSchema } from "@/components/practice-area-schema"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { PracticeIcon } from "@/components/practice-icon"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { CheckCircle } from "lucide-react"

interface DetailedPracticePageProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  breadcrumbs: {
    label: string
    href: string
  }[]
  overview: string
  services: {
    title: string
    description: string
  }[]
  process: {
    title: string
    description: string
    icon: React.ReactNode
  }[]
  statistics?: {
    value: string | number
    label: string
    icon: React.ReactNode
  }[]
  faqs?: {
    question: string
    answer: string
  }[]
  cases?: {
    title: string
    description: string
    outcome: string
    imageSrc?: string
  }[]
  relatedAreas?: {
    title: string
    href: string
  }[]
  children?: React.ReactNode
  area?: string
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
  faqs = [],
  cases = [],
  relatedAreas = [],
  children,
  area,
}: DetailedPracticePageProps) {
  const prefersReducedMotion = useReducedMotion()

  // URL для страницы, извлекаем из хлебных крошек
  const url = breadcrumbs[breadcrumbs.length - 1]?.href || ""

  // Формируем keywords на основе названия и услуг
  const keywords = [
    title.toLowerCase(),
    `${title.toLowerCase()} адвокат`,
    `${title.toLowerCase()} спб`,
    ...services.slice(0, 5).map((service) => service.title.toLowerCase()),
    "адвокат санкт-петербург",
    "юридическая консультация",
  ]

  // Преобразуем услуги для микроразметки
  const schemaServices = services.map((service) => ({
    name: service.title,
    description: service.description,
  }))

  // Преобразуем кейсы для микроразметки
  const schemaCases = cases.map((caseItem) => ({
    name: caseItem.title,
    description: caseItem.description,
    result: caseItem.outcome,
  }))

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const backgroundVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  }

  // Фильтруем смежные области, исключая те, которыми адвокат не занимается
  const filteredRelatedAreas = relatedAreas.filter(
    (area) =>
      !area.href.includes("/administrative") &&
      !area.href.includes("/family") &&
      !area.href.includes("/insurance") &&
      !area.href.includes("/personal-injury"),
  )

  return (
    <main className="flex flex-col min-h-screen pt-16">
      {/* Микроразметка Schema.org */}
      <BreadcrumbSchema items={breadcrumbs} />
      <PracticeAreaSchema
        name={title}
        description={overview}
        url={url}
        image={imageSrc}
        keywords={keywords}
        specialty={title}
        services={schemaServices}
        successCases={schemaCases}
        faqItems={faqs}
        knowsAbout={[title, ...services.map((s) => s.title)]}
      />

      <motion.div
        className="relative w-full bg-gradient-to-r from-[#741717]/90 to-[#741717]/70 py-16 md:py-24"
        variants={prefersReducedMotion ? {} : backgroundVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute inset-0 bg-[url('/public/placeholder-qaedq.png')] bg-cover bg-center opacity-10 mix-blend-overlay"
          variants={
            prefersReducedMotion
              ? {}
              : {
                  hidden: { opacity: 0 },
                  visible: { opacity: 0.1, transition: { duration: 1.5 } },
                }
          }
          initial="hidden"
          animate="visible"
        ></motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {!prefersReducedMotion &&
            Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute h-[1px] bg-white/20"
                style={{
                  width: "100%",
                  top: `${20 + i * 15}%`,
                  left: 0,
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: 1,
                  opacity: 0.2,
                  transition: {
                    delay: 0.3 + i * 0.1,
                    duration: 1.5,
                    ease: "easeOut",
                  },
                }}
              />
            ))}
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className="relative z-10 max-w-4xl mx-auto text-center"
            variants={prefersReducedMotion ? {} : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="inline-block mb-6" variants={prefersReducedMotion ? {} : itemVariants}>
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm p-4">
                <PracticeIcon area={area || "default"} size={48} />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
              variants={prefersReducedMotion ? {} : itemVariants}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
              variants={prefersReducedMotion ? {} : itemVariants}
            >
              {description}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4 justify-center"
              variants={prefersReducedMotion ? {} : itemVariants}
            >
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <Link
                  href="/booking"
                  className="inline-block px-6 py-3 bg-white text-[#741717] font-medium rounded-md hover:bg-white/90 transition-colors"
                >
                  Записаться на консультацию
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {/* Добавляем хлебные крошки под hero-section */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        <div className="mb-12 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#741717] mb-4">Обзор практики</h2>
                <p className="text-gray-700">{overview}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Мои услуги</h2>
          {/* Мои услуги */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:translate-y-[-5px]"
              >
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Как я работаю</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {process.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-start">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-12 h-12 bg-[#741717] rounded-full flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {statistics && statistics.length > 0 && (
          <div className="mb-12 bg-[#f8f5f2] py-8 px-4 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6 text-center">Моя статистика</h2>
            {/* Моя статистика */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 text-center transition-transform duration-300 hover:translate-y-[-5px]"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 bg-[#741717] rounded-full flex items-center justify-center text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {faqs && faqs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Часто задаваемые вопросы</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <details className="group p-4">
                    <summary className="list-none flex justify-between items-center cursor-pointer">
                      <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                      <span className="transition group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-4 text-gray-600">{faq.answer}</div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}

        {cases && cases.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Примеры моих успешных дел</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start mb-3">
                      <div className="mr-3 mt-1 text-[#741717]">
                        <CheckCircle size={20} />
                      </div>
                      <h3 className="text-xl font-bold">{caseItem.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{caseItem.description}</p>
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-sm font-semibold text-green-800">Результат: {caseItem.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredRelatedAreas && filteredRelatedAreas.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#741717] mb-6">Смежные области практики</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRelatedAreas.map((area, index) => (
                <Link
                  key={index}
                  href={area.href}
                  className="bg-white rounded-lg shadow-md p-4 text-center transition-colors duration-300 hover:bg-gray-50"
                >
                  <span className="text-[#741717] font-medium">{area.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {children}
      </div>

      <ScrollToTop />
    </main>
  )
}
