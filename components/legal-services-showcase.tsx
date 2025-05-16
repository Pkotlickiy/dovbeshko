"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "framer-motion"
import { FileText, Scale, MessageSquare, Search, Shield, ClipboardList, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Service = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
}

export function LegalServicesShowcase() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const services: Service[] = [
    {
      id: "document-preparation",
      title: "Подготовка документов",
      description:
        "Профессиональное составление исков, жалоб, ходатайств, договоров и других юридических документов с учетом всех требований законодательства",
      href: "/services/document-preparation",
      icon: <FileText className="h-8 w-8" />,
      color: "from-red-500/20 to-amber-500/20",
    },
    {
      id: "court-representation",
      title: "Представительство в суде",
      description:
        "Защита ваших интересов в судах всех инстанций, включая подготовку к судебным заседаниям и разработку эффективной стратегии",
      href: "/services/court-representation",
      icon: <Scale className="h-8 w-8" />,
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      id: "consultations",
      title: "Юридические консультации",
      description:
        "Профессиональные консультации по всем правовым вопросам с анализом ситуации и предложением оптимальных решений",
      href: "/services/consultations",
      icon: <MessageSquare className="h-8 w-8" />,
      color: "from-green-500/20 to-teal-500/20",
    },
    {
      id: "legal-analysis",
      title: "Правовой анализ",
      description:
        "Комплексный анализ документов и правовых ситуаций с выявлением рисков и разработкой стратегии действий",
      href: "/services/legal-analysis",
      icon: <Search className="h-8 w-8" />,
      color: "from-violet-500/20 to-indigo-500/20",
    },
    {
      id: "pre-trial-settlement",
      title: "Досудебное урегулирование",
      description:
        "Эффективное разрешение споров без обращения в суд через переговоры, медиацию и претензионную работу",
      href: "/services/pre-trial-settlement",
      icon: <Shield className="h-8 w-8" />,
      color: "from-amber-500/20 to-orange-500/20",
    },
    {
      id: "subscription",
      title: "Абонентское обслуживание",
      description: "Комплексное юридическое сопровождение на постоянной основе с фиксированной ежемесячной стоимостью",
      href: "/services/subscription",
      icon: <ClipboardList className="h-8 w-8" />,
      color: "from-teal-500/20 to-cyan-500/20",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#741717] mb-4">Юридическая помощь</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Предоставляю полный спектр юридической помощи для эффективного решения ваших правовых вопросов с
            индивидуальным подходом к каждому клиенту
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="relative"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <Link href={service.href} className="block h-full">
                <motion.div
                  className={cn(
                    "h-full rounded-xl overflow-hidden shadow-sm transition-all duration-300 bg-white border border-gray-100",
                    hoveredService === service.id ? "shadow-md transform -translate-y-1" : "",
                  )}
                  whileHover={{ y: -5 }}
                >
                  {/* Градиентный верхний блок с иконкой */}
                  <div className={`h-32 bg-gradient-to-r ${service.color} relative overflow-hidden`}>
                    {/* Декоративные элементы */}
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -mr-12 -mt-12" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/10 -ml-8 -mb-8" />

                    {/* Иконка */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="bg-white/90 p-4 rounded-full shadow-md"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="text-[#741717]">{service.icon}</div>
                      </motion.div>
                    </div>

                    {/* Индикатор */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-[#741717]"
                      initial={{ width: "0%" }}
                      animate={{ width: hoveredService === service.id ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Контентная часть */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div
                      className={cn(
                        "inline-flex items-center text-sm font-medium transition-colors",
                        `text-[#741717] hover:text-[#8f2020]`,
                      )}
                    >
                      <span>Подробнее</span>
                      <motion.div
                        animate={{ x: hoveredService === service.id ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">
            Не нашли нужную услугу? Свяжитесь со мной для получения индивидуальной консультации
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#741717] hover:bg-[#8f2020] transition-colors duration-300"
          >
            Связаться со мной
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
