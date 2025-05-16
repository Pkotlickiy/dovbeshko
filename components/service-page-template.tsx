"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { CTAConsultation } from "@/components/cta-consultation"
import { ServiceStructuredData } from "@/components/service-structured-data"
import { FormattedList } from "@/components/formatted-list"
import { ProcessTimeline } from "@/components/process-timeline"
import { FAQAccordion } from "@/components/faq-accordion"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Scale, FileText, CheckCircle, Clock, Award, Shield } from "lucide-react"

interface ProcessStep {
  title: string
  description: string
  icon: ReactNode
}

interface FAQ {
  question: string
  answer: string
}

interface ServicePageTemplateProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  services: string[]
  process: ProcessStep[]
  faqs: FAQ[]
  serviceType?: string
}

export function ServicePageTemplate({
  title,
  description,
  imageSrc,
  imageAlt,
  services,
  process,
  faqs,
  serviceType = "LegalService",
}: ServicePageTemplateProps) {
  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Услуги", href: "/services" },
    { label: title, href: "#" },
  ]

  const [activeTab, setActiveTab] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  const serviceHighlights = [
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Правовая защита",
      description: "Профессиональная защита ваших прав и интересов в соответствии с законодательством",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Документация",
      description: "Тщательная подготовка всех необходимых юридических документов",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Гарантия результата",
      description: "Ориентация на достижение максимально благоприятного результата",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Оперативность",
      description: "Быстрое реагирование на ваши запросы и соблюдение сроков",
    },
  ]

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Автоматическое переключение вкладок
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % serviceHighlights.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isHovering, serviceHighlights.length])

  return (
    <div className="bg-white">
      <Breadcrumbs items={breadcrumbItems} />
      <ServiceStructuredData name={title} description={description} serviceType={serviceType} />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{title}</h1>
              <p className="text-lg text-gray-700 mb-8">{description}</p>
            </div>

            {/* Новый интерактивный UI-элемент вместо изображения */}
            <motion.div
              ref={ref}
              className="relative h-64 md:h-80 lg:h-96 w-full rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-[#741717]/90 to-[#9c2a2a]"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Декоративные элементы */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-white/10"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />
                <motion.div
                  className="absolute bottom-[-100px] left-[-50px] w-[250px] h-[250px] rounded-full bg-white/5"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Заголовок и значок */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Shield className="h-6 w-6 mr-2 text-white/90" />
                  <span className="text-white/90 font-medium">Юридическая услуга</span>
                </motion.div>
                <motion.div
                  className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white/90 text-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Award className="h-4 w-4 inline-block mr-1" />
                  <span>Высокое качество</span>
                </motion.div>
              </div>

              {/* Вкладки с преимуществами */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {serviceHighlights.map((highlight, index) => (
                    <motion.button
                      key={index}
                      className={`relative h-1 rounded-full overflow-hidden ${
                        activeTab === index ? "bg-white/80" : "bg-white/30"
                      }`}
                      onClick={() => setActiveTab(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {activeTab === index && (
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-white"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3, ease: "linear" }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-4">{serviceHighlights[activeTab].icon}</div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{serviceHighlights[activeTab].title}</h3>
                      <p className="text-white/80 text-sm">{serviceHighlights[activeTab].description}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Интерактивные элементы */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-center mb-6">
                  <motion.div
                    className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Scale className="h-12 w-12 text-white" />
                  </motion.div>
                  <h2 className="text-white text-xl font-bold">{title}</h2>
                </div>

                <motion.div
                  className="flex space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-white/60"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Что включает услуга</h2>
          <FormattedList items={services} />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Как мы работаем</h2>
          <ProcessTimeline steps={process} />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTAConsultation />
    </div>
  )
}
