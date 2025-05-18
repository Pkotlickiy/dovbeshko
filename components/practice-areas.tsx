"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedSection } from "./animated-section"
import { Home, Map, Scroll, Shield, ShieldCheck, Stethoscope } from "lucide-react"

type PracticeArea = {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}

export function PracticeAreas() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const practiceAreas = [
    {
      title: "Уголовное право",
      description: "Защита на всех стадиях уголовного процесса в Санкт-Петербурге",
      icon: <Shield className="h-10 w-10" />,
      href: "/practice/criminal",
    },
    {
      title: "Земельное право",
      description: "Решение земельных споров и оформление прав на землю в СПб",
      icon: <Map className="h-10 w-10" />,
      href: "/practice/land",
    },
    {
      title: "Недвижимость",
      description: "Сопровождение сделок с недвижимостью в Санкт-Петербурге",
      icon: <Home className="h-10 w-10" />,
      href: "/practice/realestate",
    },
    {
      title: "Наследственное право",
      description: "Оформление наследства и решение наследственных споров",
      icon: <Scroll className="h-10 w-10" />,
      href: "/practice/inheritance",
    },
    {
      title: "Медицинское право",
      description: "Защита прав пациентов и медицинских работников в СПб",
      icon: <Stethoscope className="h-10 w-10" />,
      href: "/practice/medical",
    },
    {
      title: "Защита прав потребителей",
      description: "Возврат денег за некачественные товары и услуги в СПб",
      icon: <ShieldCheck className="h-10 w-10" />,
      href: "/practice/consumer",
    },
  ].filter((area) => area.href !== "/practice/insurance" && area.href !== "/practice/personal-injury")

  return (
    <AnimatedSection className="py-16 md:py-24" id="practice-areas">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Основные направления практики в СПб</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Специализируемся на различных отраслях права, предоставляя квалифицированную юридическую помощь в
              Санкт-Петербурге и Ленинградской области.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <Link
              key={area.title}
              href={area.href}
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
                    {area.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{area.title}</h3>
                  <p className="text-sm text-gray-500">{area.description}</p>
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
