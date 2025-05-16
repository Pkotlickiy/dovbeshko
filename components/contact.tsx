"use client"

import type React from "react"

import { useState, useRef, type FormEvent, useEffect } from "react"
import type { ChangeEvent } from "react"
import Script from "next/script"
import Link from "next/link"

// Добавляем типы для Яндекс Карт
declare global {
  interface Window {
    ymaps: any
  }
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedSection, AnimatedItem } from "@/components/animated-section"
import { submitContactForm } from "@/app/actions/contact-actions"

// Типы для контактной информации
interface ContactInfo {
  icon: React.ReactNode
  title: string
  content: React.ReactNode
}

// Типы для формы
interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

interface YandexMapProps {
  apiKey: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [formError, setFormError] = useState<string>("")
  const formRef = useRef<HTMLFormElement>(null)

  // Контактная информация - вынесена для устранения дублирования
  const contactInfoItems: ContactInfo[] = [
    {
      icon: <MapPin className="h-5 w-5 text-[#741717]" />,
      title: "Адрес",
      content: <p className="text-[#603a30]">Санкт-Петербург, Московский проспект 143</p>,
    },
    {
      icon: <Phone className="h-5 w-5 text-[#741717]" />,
      title: "Телефон",
      content: <p className="text-[#603a30]">+7 (931) 007-07-52</p>,
    },
    {
      icon: <Mail className="h-5 w-5 text-[#741717]" />,
      title: "Email",
      content: <p className="text-[#603a30]">S0070752@mail.ru</p>,
    },
    {
      icon: <Clock className="h-5 w-5 text-[#741717]" />,
      title: "Часы работы",
      content: (
        <>
          <p className="text-[#603a30]">Пн-Пт: 9:00 - 18:00</p>
          <p className="text-[#603a30]">Сб: 10:00 - 15:00 (по предварительной записи)</p>
        </>
      ),
    },
  ]

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError("")

    try {
      const formData = new FormData(e.currentTarget)
      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitSuccess(result.message)
        formRef.current?.reset()
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      } else {
        setFormError(result.message)
      }
    } catch (error) {
      setFormError("Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.")
      console.error("Contact form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Компонент для отображения поля формы
  const FormField = ({
    id,
    name,
    label,
    value,
    onChange,
    required = false,
    type = "text",
    isTextarea = false,
  }: {
    id: string
    name: string
    label: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    required?: boolean
    type?: string
    isTextarea?: boolean
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#603a30]">
        {label} {required && <span aria-hidden="true">*</span>}
        {required && <span className="sr-only">(обязательное поле)</span>}
      </label>
      <div className="relative">
        {isTextarea ? (
          <Textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 min-h-[120px] border-[#c4bab3] transition-all duration-300 focus:border-[#741717] focus:ring-[#741717]"
          />
        ) : (
          <Input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 border-[#c4bab3] transition-all duration-300 focus:border-[#741717] focus:ring-[#741717]"
          />
        )}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#741717]/50"
          animate={value ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )

  return (
    <AnimatedSection id="contact" className="relative bg-white py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#f8f5f2] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#f8f5f2] blur-3xl" />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <AnimatedItem>
            <div className="inline-block rounded-full bg-[#741717]/10 px-3 py-1 text-sm font-medium text-[#741717]">
              Связаться
            </div>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl">
              Контактная информация
            </h2>
          </AnimatedItem>
          <AnimatedItem delay={0.1}>
            <p className="max-w-[700px] text-[#603a30] md:text-xl/relaxed">
              Свяжитесь со мной для получения юридической консультации
            </p>
          </AnimatedItem>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            {contactInfoItems.map((item, index) => (
              <AnimatedItem key={index} delay={0.1 * (index + 1)}>
                <motion.div
                  className="flex items-start gap-3 rounded-lg border border-transparent bg-[#f8f5f2] p-4 transition-all duration-300 hover:border-[#741717]/20 hover:shadow-md"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="rounded-full bg-white p-2 shadow-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-[#741717]">{item.title}</h3>
                    {item.content}
                  </div>
                </motion.div>
              </AnimatedItem>
            ))}

            <AnimatedItem delay={0.5}>
              <motion.div
                className="relative h-[300px] w-full overflow-hidden rounded-lg bg-[#f8f5f2] shadow-md"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <YandexMap apiKey="313b1e4a-4ae6-4275-bf36-aa9496dc61b6" />
              </motion.div>
            </AnimatedItem>
          </div>

          <AnimatedItem delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-lg border border-[#c4bab3]/20 bg-white p-6 shadow-md"
            >
              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Контактная форма" ref={formRef}>
                <FormField
                  id="name"
                  name="name"
                  label="Имя"
                  value={formData.name}
                  onChange={handleChange}
                  required={true}
                />

                <FormField
                  id="email"
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required={true}
                  type="email"
                />

                <FormField
                  id="phone"
                  name="phone"
                  label="Телефон"
                  value={formData.phone}
                  onChange={handleChange}
                  required={true}
                />

                <FormField
                  id="message"
                  name="message"
                  label="Сообщение"
                  value={formData.message}
                  onChange={handleChange}
                  required={true}
                  isTextarea={true}
                />

                <motion.div
                  className="relative overflow-hidden rounded-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="relative w-full bg-[#741717] text-white transition-all duration-300 hover:bg-[#603a30]"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Отправка...
                        </div>
                      ) : (
                        "Отправить сообщение"
                      )}
                    </span>
                    <motion.span
                      className="absolute inset-0 -z-0 bg-gradient-to-r from-[#8B0000] to-[#741717] opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>

                {submitSuccess !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-md bg-green-50 text-green-800"
                  >
                    {submitSuccess}
                  </motion.div>
                )}

                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-md bg-red-50 text-red-800"
                  >
                    {formError}
                  </motion.div>
                )}

                <p className="text-xs text-[#603a30]">
                  * Отправляя форму, вы соглашаетесь с{" "}
                  <Link href="/privacy" className="underline hover:text-[#741717]">
                    политикой конфиденциальности
                  </Link>
                </p>
              </form>
            </motion.div>
          </AnimatedItem>
        </div>
      </div>
    </AnimatedSection>
  )
}

// Компонент Яндекс Карты - оставляем без изменений
function YandexMap({ apiKey }: YandexMapProps) {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (mapLoaded && window.ymaps) {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map("yandex-map", {
          center: [59.891605, 30.318705],
          zoom: 16,
          controls: ["zoomControl", "fullscreenControl"],
        })

        const placemark = new window.ymaps.Placemark(
          [59.891605, 30.318705],
          {
            balloonContent: `
            <div class="p-3">
              <h3 class="font-bold text-[#741717]">Адвокат Довбешко С.Ю.</h3>
              <p>Московский проспект 143, Санкт-Петербург</p>
              <p>Тел: +7 (931) 007-07-52</p>
            </div>
          `,
          },
          {
            preset: "islands#redDotIcon",
          },
        )

        map.geoObjects.add(placemark)
        map.behaviors.disable("scrollZoom")
        map.container.fitToViewport()
      })
    }
  }, [mapLoaded])

  return (
    <>
      <Script src={`https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`} onLoad={() => setMapLoaded(true)} />
      <div
        id="yandex-map"
        className="absolute inset-0 bg-[#f8f5f2]"
        aria-label="Карта с местоположением офиса"
        role="application"
      >
        {!mapLoaded && (
          <>
            <div className="absolute left-1/4 top-1/4 h-16 w-16 rounded-full bg-[#741717]/10 animate-pulse"></div>
            <div className="absolute right-1/4 bottom-1/4 h-16 w-16 rounded-full bg-[#741717]/10 animate-pulse"></div>
            <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#741717] animate-pulse"></div>
            <div className="flex h-full items-center justify-center">
              <p className="text-[#603a30]">Загрузка карты...</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
