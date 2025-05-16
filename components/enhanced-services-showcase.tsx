"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { MessageSquare, Scale, FileText, Shield, Search, ClipboardList, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Service = {
  id: string
  title: string
  description: string
  longDescription: string
  icon: React.ReactNode
  href: string
  color: string
}

export function EnhancedServicesShowcase() {
  const [activeService, setActiveService] = useState<string | null>(null)
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
      id: "consultations",
      title: "Консультации",
      description: "Профессиональные юридические консультации по всем правовым вопросам",
      longDescription:
        "Получите квалифицированную юридическую консультацию по любым правовым вопросам. Я помогу разобраться в сложной ситуации, оценю перспективы и предложу оптимальные пути решения вашей проблемы.",
      href: "/services/consultations",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "from-rose-500 to-red-800",
    },
    {
      id: "court-representation",
      title: "Представительство в суде",
      description: "Защита ваших интересов в судах всех инстанций",
      longDescription:
        "Профессиональное представительство ваших интересов в судах всех инстанций. Я подготовлю необходимые документы, разработаю эффективную стратегию защиты и буду отстаивать ваши права на всех этапах судебного процесса.",
      href: "/services/court-representation",
      icon: <Scale className="h-6 w-6" />,
      color: "from-blue-500 to-indigo-800",
    },
    {
      id: "document-preparation",
      title: "Подготовка документов",
      description: "Составление исков, жалоб, договоров и других юридических документов",
      longDescription:
        "Профессиональная подготовка всех видов юридических документов: исковых заявлений, жалоб, претензий, договоров, соглашений и других документов с учетом всех требований законодательства и судебной практики.",
      href: "/services/document-preparation",
      icon: <FileText className="h-6 w-6" />,
      color: "from-amber-500 to-orange-800",
    },
    {
      id: "pre-trial-settlement",
      title: "Досудебное урегулирование",
      description: "Помощь в разрешении споров без обращения в суд",
      longDescription:
        "Эффективное разрешение споров без обращения в суд. Я помогу вам урегулировать конфликт путем переговоров, медиации или претензионной работы, что сэкономит ваше время и средства.",
      href: "/services/pre-trial-settlement",
      icon: <Shield className="h-6 w-6" />,
      color: "from-emerald-500 to-green-800",
    },
    {
      id: "legal-analysis",
      title: "Правовой анализ",
      description: "Анализ документов и правовых ситуаций с выработкой оптимальной стратегии",
      longDescription:
        "Комплексный анализ документов, договоров и правовых ситуаций с выявлением рисков и разработкой оптимальной стратегии действий. Помогу предотвратить возможные проблемы и защитить ваши интересы.",
      href: "/services/legal-analysis",
      icon: <Search className="h-6 w-6" />,
      color: "from-violet-500 to-purple-800",
    },
    {
      id: "subscription",
      title: "Абонентское обслуживание",
      description: "Комплексное юридическое сопровождение на постоянной основе",
      longDescription:
        "Комплексное юридическое сопровождение вашей деятельности на постоянной основе. Регулярные консультации, подготовка документов, представительство в суде и другие юридические услуги по фиксированной ежемесячной стоимости.",
      href: "/services/subscription",
      icon: <ClipboardList className="h-6 w-6" />,
      color: "from-pink-500 to-fuchsia-800",
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

  const handleServiceClick = (id: string) => {
    setActiveService(activeService === id ? null : id)
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
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#741717] mb-4">Юридические услуги</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Предоставляю широкий спектр юридических услуг для решения ваших правовых вопросов с индивидуальным подходом
            к каждому клиенту
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
              <div
                className={cn(
                  "h-full rounded-xl overflow-hidden shadow-md transition-all duration-300 bg-white border border-gray-100",
                  activeService === service.id ? "ring-2 ring-[#741717]" : "",
                  hoveredService === service.id ? "shadow-lg transform -translate-y-1" : "",
                )}
              >
                <div className={cn("h-2 w-full bg-gradient-to-r", service.color)} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("p-3 rounded-full bg-gradient-to-r", service.color, "text-white")}>
                      {service.icon}
                    </div>
                    <button
                      onClick={() => handleServiceClick(service.id)}
                      className="text-gray-400 hover:text-[#741717] transition-colors"
                      aria-label={`${activeService === service.id ? "Свернуть" : "Развернуть"} информацию о ${
                        service.title
                      }`}
                    >
                      <ChevronRight
                        className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          activeService === service.id ? "rotate-90" : "",
                        )}
                      />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <AnimatePresence>
                    {activeService === service.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-700 mb-4">{service.longDescription}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Link
                    href={service.href}
                    className={cn(
                      "inline-flex items-center text-sm font-medium transition-colors",
                      `text-[#741717] hover:text-[#8f2020]`,
                    )}
                  >
                    <span>Подробнее</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
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
