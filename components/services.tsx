"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedSection } from "./animated-section"

type Service = {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services: Service[] = [
    {
      title: "Консультации",
      description: "Профессиональные юридические консультации по всем правовым вопросам",
      href: "/services/consultations",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          />
        </svg>
      ),
    },
    {
      title: "Представительство в суде",
      description: "Защита ваших интересов в судах всех инстанций",
      href: "/services/court-representation",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
          />
        </svg>
      ),
    },
    {
      title: "Подготовка документов",
      description: "Составление исков, жалоб, договоров и других юридических документов",
      href: "/services/document-preparation",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      ),
    },
    {
      title: "Досудебное урегулирование",
      description: "Помощь в разрешении споров без обращения в суд",
      href: "/services/pre-trial-settlement",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
    },
    {
      title: "Правовой анализ",
      description: "Анализ документов и правовых ситуаций с выработкой оптимальной стратегии",
      href: "/services/legal-analysis",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      ),
    },
    {
      title: "Абонентское обслуживание",
      description: "Комплексное юридическое сопровождение на постоянной основе",
      href: "/services/subscription",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
          />
        </svg>
      ),
    },
  ]

  return (
    <AnimatedSection className="py-16 md:py-24" id="services">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Юридическая помощь в Санкт-Петербурге</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Предоставляем полный спектр юридической помощи для физических и юридических лиц. Индивидуальный подход к
              каждому клиенту и гарантия конфиденциальности.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div
                    className={cn(
                      "mb-4 inline-flex items-center justify-center rounded-full border p-2 transition-colors duration-300",
                      hoveredIndex === index ? "border-[#741717] text-[#741717]" : "border-gray-200 text-gray-900",
                    )}
                  >
                    {service.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>
                <div
                  className={cn(
                    "mt-4 flex items-center text-sm font-medium transition-colors duration-300",
                    hoveredIndex === index ? "text-[#741717]" : "text-gray-600",
                  )}
                >
                  <span>Подробнее</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-[#741717]"
                initial={{ width: 0 }}
                animate={{ width: hoveredIndex === index ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
