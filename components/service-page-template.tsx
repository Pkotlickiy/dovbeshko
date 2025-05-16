"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Link from "next/link"
import { CTAConsultation } from "@/components/cta-consultation"
import { ServiceStructuredData } from "@/components/service-structured-data"
import { FormattedList } from "@/components/formatted-list"
import { ProcessTimeline } from "@/components/process-timeline"
import { FAQAccordion } from "@/components/faq-accordion"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Scale, FileText, CheckCircle, Clock, Award, Shield, ArrowRight, Phone, Calendar } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useDevicePerformance } from "@/hooks/use-device-performance"
import { AnimatedHeroBackground } from "@/components/animated-hero-background"

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

  // Определение предпочтений пользователя и производительности устройства
  const prefersReducedMotion = useReducedMotion()
  const devicePerformance = useDevicePerformance()

  // Определяем настройки анимаций в зависимости от устройства и предпочтений
  const shouldAnimate = !prefersReducedMotion && devicePerformance !== "low"
  const shouldUseAutoRotation = !prefersReducedMotion && devicePerformance !== "low"
  const animationDelay = devicePerformance === "low" ? 0 : devicePerformance === "medium" ? 0.05 : 0.1

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
    if (isInView && shouldAnimate) {
      controls.start("visible")
    } else if (isInView) {
      // Если анимации отключены, просто показываем элемент без анимации
      controls.set("visible")
    }
  }, [controls, isInView, shouldAnimate])

  // Автоматическое переключение вкладок только если разрешено
  useEffect(() => {
    if (!isHovering && shouldUseAutoRotation) {
      const interval = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % serviceHighlights.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isHovering, serviceHighlights.length, shouldUseAutoRotation])

  return (
    <div className="bg-white pt-20 md:pt-24">
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 mx-auto pt-6 pb-12">
          <Breadcrumbs items={breadcrumbItems} />
          <ServiceStructuredData name={title} description={description} serviceType={serviceType} />

          {/* Hero Section с новым компонентом фона */}
          <AnimatedHeroBackground
            className="rounded-2xl overflow-hidden mt-8 md:mt-12"
            variant="primary"
            withPattern={true}
            withLines={true}
            withShapes={true}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-10">
                {/* Content Column */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <motion.div
                    initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldAnimate ? 0.5 : 0 }}
                  >
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full mb-4">
                      Юридическая услуга
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                      {title}
                    </h1>
                    <p className="text-lg text-white/90 mb-8 leading-relaxed">{description}</p>

                    <div className="flex flex-wrap gap-4 mt-8">
                      <Link
                        href="/booking"
                        className="inline-flex items-center px-6 py-3 bg-white hover:bg-white/90 text-[#741717] font-medium rounded-lg transition-colors duration-200"
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        Записаться на консультацию
                      </Link>
                      <Link
                        href="/contacts"
                        className="inline-flex items-center px-6 py-3 bg-transparent border border-white/30 hover:bg-white/10 text-white font-medium rounded-lg transition-colors duration-200"
                      >
                        <Phone className="mr-2 h-5 w-5" />
                        Связаться с нами
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Interactive Feature Card */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <motion.div
                    ref={ref}
                    className="relative h-auto rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm"
                    initial="hidden"
                    animate={controls}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {/* Main Content */}
                    <div className="relative p-8">
                      {/* Header */}
                      <div className="flex justify-between items-center mb-8">
                        <motion.div
                          className="flex items-center"
                          initial={shouldAnimate ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: shouldAnimate ? 0.3 : 0, duration: shouldAnimate ? 0.5 : 0 }}
                        >
                          <Shield className="h-6 w-6 mr-2 text-white/90" />
                          <span className="text-white/90 font-medium">Профессиональный подход</span>
                        </motion.div>
                        <motion.div
                          className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm"
                          initial={shouldAnimate ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: shouldAnimate ? 0.4 : 0, duration: shouldAnimate ? 0.5 : 0 }}
                        >
                          <Award className="h-4 w-4 inline-block mr-1" />
                          <span>Высокое качество услуг</span>
                        </motion.div>
                      </div>

                      {/* Central Icon */}
                      <div className="flex justify-center mb-8">
                        <motion.div
                          className="relative w-24 h-24 flex items-center justify-center"
                          initial={shouldAnimate ? { scale: 0 } : { scale: 1 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: shouldAnimate ? 0.2 : 0,
                            duration: shouldAnimate ? 0.5 : 0,
                            type: shouldAnimate ? "spring" : "tween",
                          }}
                        >
                          <div className="absolute inset-0 border border-white/20 rounded-full" />
                          <div className="absolute inset-2 border border-white/10 rounded-full" />
                          <Scale className="h-12 w-12 text-white relative z-10" />
                        </motion.div>
                      </div>

                      {/* Feature Tabs */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-6">
                        <div className="grid grid-cols-4 gap-2 mb-6">
                          {serviceHighlights.map((highlight, index) => (
                            <motion.button
                              key={index}
                              className={`relative h-1.5 rounded-full overflow-hidden ${
                                activeTab === index ? "bg-white/80" : "bg-white/20"
                              }`}
                              onClick={() => setActiveTab(index)}
                              whileHover={shouldAnimate ? { scale: 1.05 } : {}}
                              whileTap={shouldAnimate ? { scale: 0.95 } : {}}
                            >
                              {activeTab === index && shouldUseAutoRotation && (
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
                          initial={shouldAnimate ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={shouldAnimate ? { opacity: 0, y: -10 } : { opacity: 0 }}
                          transition={{ duration: shouldAnimate ? 0.3 : 0 }}
                        >
                          <div className="flex items-start">
                            <div className="bg-white/10 p-3 rounded-lg mr-4 flex-shrink-0">
                              {serviceHighlights[activeTab].icon}
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-xl mb-2">
                                {serviceHighlights[activeTab].title}
                              </h3>
                              <p className="text-white/90 leading-relaxed">
                                {serviceHighlights[activeTab].description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { value: "98%", label: "Успешных дел" },
                          { value: "10+", label: "Лет опыта" },
                          { value: "24/7", label: "Поддержка" },
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                            initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: shouldAnimate ? 0.5 + index * animationDelay : 0,
                              duration: shouldAnimate ? 0.4 : 0,
                            }}
                          >
                            <div className="text-white font-bold text-2xl mb-1">{stat.value}</div>
                            <div className="text-white/70 text-sm">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </AnimatedHeroBackground>
        </div>
      </div>

      {/* Остальной контент остается без изменений */}
      {/* ... */}

      {/* Service Details Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Что включает услуга</h2>
            <p className="text-gray-600">Полный спектр юридической поддержки для решения ваших задач</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <FormattedList items={services} />
          </div>
        </div>
      </section>

      {/* Process Section - Redesigned */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Как мы работаем</h2>
            <p className="text-gray-600">Прозрачный и эффективный процесс оказания юридической помощи</p>
          </div>
          <ProcessTimeline steps={process} />
        </div>
      </section>

      {/* FAQ Section - Redesigned */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
            <p className="text-gray-600">Ответы на популярные вопросы о наших услугах</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Testimonial Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Что говорят наши клиенты</h2>
            <p className="text-gray-600">Отзывы от тех, кому мы помогли решить юридические вопросы</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 relative">
              <div className="absolute top-6 left-8 text-6xl text-red-100">"</div>
              <div className="relative z-10">
                <p className="text-gray-700 text-lg italic mb-6 pt-4">
                  Благодаря профессиональной помощи юриста мое дело было успешно разрешено в кратчайшие сроки. Высокий
                  уровень компетенции, внимание к деталям и индивидуальный подход — именно то, что отличает данную
                  юридическую услугу.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-4">
                    АК
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Анна Ковалева</h4>
                    <p className="text-gray-500 text-sm">Клиент, Москва</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="#" className="inline-flex items-center text-red-700 hover:text-red-800 font-medium">
                Смотреть все отзывы
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTAConsultation />
    </div>
  )
}
