"use client"

import React from "react"

import { useState, useRef, useCallback, useMemo, type FormEvent, useEffect } from "react"
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
import { MapPin, Phone, Mail, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
// Удалите неиспользуемые импорты
import { StructuredData } from "@/components/structured-data"
import { submitContactForm } from "@/app/actions/contact-actions"
import { siteConfig } from "@/lib/seo"
import { YandexFaqSchema } from "@/components/yandex-faq-schema"

// Типы для контактной информации
interface ContactInfo {
  icon: React.ReactNode
  title: string
  content: React.ReactNode
}

// 1. Обновить интерфейс FormData, добавив поле subject как строку
interface FormData {
  name: string
  email: string
  phone: string
  message: string
  subject: string // Изменено с опционального на обязательное
}

// Данные для микроразметки LocalBusiness
const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#localbusiness`,
  name: "Адвокат Довбешко Светлана Юрьевна",
  image: `${siteConfig.url}/confident-female-lawyer.png`,
  telephone: "+79310070752",
  email: "S0070752@mail.ru",
  url: siteConfig.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Московский проспект 143",
    addressLocality: "Санкт-Петербург",
    postalCode: "196105",
    addressCountry: "RU",
    addressRegion: "Московский район",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 59.878265,
    longitude: 30.318985,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "15:00",
    },
  ],
  priceRange: "От 2000 ₽",
}

// FAQ для страницы контактов
const contactFaqs = [
  {
    question: "Как записаться на консультацию?",
    answer:
      "Вы можете записаться на консультацию, позвонив по телефону +7 (931) 007-07-52, отправив сообщение на email S0070752@mail.ru или заполнив форму обратной связи на сайте. Мы свяжемся с вами для подтверждения даты и времени встречи.",
  },
  {
    question: "Какие документы нужно принести на консультацию?",
    answer:
      "Рекомендуется взять с собой все документы, связанные с вашим вопросом: договоры, переписку, судебные акты, претензии и квитанции. Чем больше информации будет в моем распоряжении, тем точнее я смогу оценить ситуацию и предложить оптимальное решение.",
  },
  {
    question: "Как добраться до офиса?",
    answer:
      "Офис расположен по адресу: Московский проспект 143, Санкт-Петербург, 196105. Ближайшая станция метро - 'Электросила' (30 секунд пешком). Также можно доехать на автобусах 3, 26, 50, 62, 63, 72 или троллейбусах 17, 24, 26.",
  },
]

// 2. Добавить массив тем обращения после объявления contactFaqs
const serviceTopics = [
  { value: "", label: "Выберите тему обращения" },
  { value: "Консультация", label: "Консультация" },
  { value: "Представительство в суде", label: "Представительство в суде" },
  { value: "Подготовка документов", label: "Подготовка документов" },
  { value: "Юридический анализ", label: "Юридический анализ" },
  { value: "Досудебное урегулирование", label: "Досудебное урегулирование" },
  { value: "Наследственные дела", label: "Наследственные дела" },
  { value: "Земельные споры", label: "Земельные споры" },
  { value: "Недвижимость", label: "Недвижимость" },
  { value: "Медицинское право", label: "Медицинское право" },
  { value: "Защита прав потребителей", label: "Защита прав потребителей" },
  { value: "Неосновательное обогащение", label: "Неосновательное обогащение" },
  { value: "Арбитраж", label: "Арбитраж" },
  { value: "Военное право", label: "Военное право" },
  { value: "Уголовное право", label: "Уголовное право" },
  { value: "Другое", label: "Другое" },
]

// Оптимизированный компонент FormField с использованием React.memo
const FormField = React.memo(
  ({
    id,
    name,
    label,
    value,
    onChange,
    required = false,
    type = "text",
    isTextarea = false,
    placeholder = "",
    isValid = true,
    errorMessage = "",
  }: {
    id: string
    name: string
    label: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    required?: boolean
    type?: string
    isTextarea?: boolean
    placeholder?: string
    isValid?: boolean
    errorMessage?: string
  }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-[#603a30] mb-1">
        {label} {required && <span aria-hidden="true">*</span>}
        {required && <span className="sr-only">(обязательное поле)</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full min-h-[120px] rounded-md border ${
            isValid ? "border-[#c4bab3]" : "border-red-500"
          } px-3 py-2 focus:border-[#741717] focus:outline-none focus:ring-1 focus:ring-[#741717]`}
          autoComplete="on"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full rounded-md border ${
            isValid ? "border-[#c4bab3]" : "border-red-500"
          } px-3 py-2 focus:border-[#741717] focus:outline-none focus:ring-1 focus:ring-[#741717]`}
          autoComplete="on"
        />
      )}
      {!isValid && errorMessage && <p className="mt-1 text-xs text-red-600">{errorMessage}</p>}
    </div>
  ),
)

FormField.displayName = "FormField"

export function Contact() {
  // 4. Изменить инициализацию состояния formData, чтобы subject был пустой строкой
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  })

  // 5. Обновить fieldErrors, добавив subject
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [formError, setFormError] = useState<string>("")
  const formRef = useRef<HTMLFormElement>(null)

  // Контактная информация - вынесена для устранения дублирования
  const contactInfoItems: ContactInfo[] = useMemo(
    () => [
      {
        icon: <MapPin className="h-5 w-5 text-[#741717]" />,
        title: "Адрес",
        content: <p className="text-[#603a30]">Санкт-Петербург, Московский пр-кт. 143, 196105</p>,
      },
      {
        icon: <Phone className="h-5 w-5 text-[#741717]" />,
        title: "Телефон",
        content: (
          <p className="text-[#603a30]">
            <a href="tel:+79310070752" className="hover:underline">
              +7 (931) 007-07-52
            </a>
          </p>
        ),
      },
      {
        icon: <Mail className="h-5 w-5 text-[#741717]" />,
        title: "Email",
        content: (
          <p className="text-[#603a30]">
            <a href="mailto:S0070752@mail.ru" className="hover:underline">
              S0070752@mail.ru
            </a>
          </p>
        ),
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
    ],
    [],
  )

  // 6. Обновить функцию validateField, добавив проверку для subject
  const validateField = useCallback((name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Имя должно содержать не менее 2 символов" : ""
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Введите корректный email адрес" : ""
      case "phone":
        return value.length < 6 ? "Введите корректный номер телефона" : ""
      case "subject":
        return value === "" ? "Пожалуйста, выберите тему обращения" : ""
      case "message":
        return value.length < 10 ? "Сообщение должно содержать не менее 10 символов" : ""
      default:
        return ""
    }
  }, [])

  // Оптимизация с помощью useCallback
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Валидация поля при изменении
      const error = validateField(name, value)
      setFieldErrors((prev) => ({ ...prev, [name]: error }))
    },
    [validateField],
  )

  // Оптимизация с помощью useCallback
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsSubmitting(true)
      setFormError("")
      setSubmitSuccess(null)

      // Проверяем валидность всех полей перед отправкой
      const errors = {
        name: validateField("name", formData.name),
        email: validateField("email", formData.email),
        phone: validateField("phone", formData.phone),
        message: validateField("message", formData.message),
        subject: validateField("subject", formData.subject || ""),
      }

      setFieldErrors(errors)

      // Если есть ошибки, прерываем отправку
      if (Object.values(errors).some((error) => error !== "")) {
        setFormError("Пожалуйста, исправьте ошибки в форме перед отправкой")
        setIsSubmitting(false)
        return
      }

      try {
        const formDataToSend = new FormData(e.currentTarget)

        // Добавляем пустую строку для subject, если оно не заполнено
        if (!formDataToSend.get("subject")) {
          formDataToSend.set("subject", "")
        }

        // Логируем данные перед отправкой для отладки
        console.log("Sending form data:", {
          name: formDataToSend.get("name"),
          email: formDataToSend.get("email"),
          phone: formDataToSend.get("phone"),
          message: formDataToSend.get("message"),
          subject: formDataToSend.get("subject"),
        })

        const result = await submitContactForm(formDataToSend)

        if (result.success) {
          setSubmitSuccess(result.message)
          formRef.current?.reset()
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            subject: "",
          })
        } else {
          setFormError(result.message || "Произошла ошибка при отправке формы")
        }
      } catch (error) {
        console.error("Contact form submission error:", error)
        setFormError("Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.")
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, validateField],
  )

  return (
    <>
      <StructuredData data={localBusinessData} />
      <YandexFaqSchema faqs={contactFaqs} />

      <section id="contact" className="relative bg-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#f8f5f2] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#f8f5f2] blur-3xl" />
        </div>

        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div>
              <div className="inline-block rounded-full bg-[#741717]/10 px-3 py-1 text-sm font-medium text-[#741717]">
                Связаться
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl">
                Контактная информация
              </h2>
            </div>
            <div>
              <p className="max-w-[700px] text-[#603a30] md:text-xl/relaxed">
                Свяжитесь со мной для получения юридической консультации
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              {contactInfoItems.map((item, index) => (
                <div key={index}>
                  <div className="flex items-start gap-3 rounded-lg border border-transparent bg-[#f8f5f2] p-4 transition-all duration-300 hover:border-[#741717]/20 hover:shadow-md">
                    <div className="rounded-full bg-white p-2 shadow-sm">{item.icon}</div>
                    <div>
                      <h3 className="font-medium text-[#741717]">{item.title}</h3>
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-[#f8f5f2] shadow-md">
                  <YandexMap apiKey="313b1e4a-4ae6-4275-bf36-aa9496dc61b6" />
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-lg border border-[#c4bab3]/20 bg-white p-6 shadow-md">
                {/* 3. Изменить блок с формой, добавив выпадающий список с темами */}
                {/* Найти место после информационного блока и перед кнопкой тестирования соединения */}
                {/* и заменить его следующим кодом: */}
                <div className="mb-4 p-3 rounded-md bg-[#f8f5f2] border-l-4 border-[#741717] text-[#603a30] text-sm">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-[#741717] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Важная информация:</p>
                      <ul className="list-disc list-inside mt-1 ml-1">
                        <li>Имя: не менее 2 символов</li>
                        <li>Email: корректный формат электронной почты</li>
                        <li>Телефон: не менее 6 символов</li>
                        <li>Тема: выберите тему обращения</li>
                        <li>Сообщение: не менее 10 символов</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Контактная форма" ref={formRef}>
                  <FormField
                    id="name"
                    name="name"
                    label="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    required={true}
                    placeholder="Введите ваше имя"
                    isValid={!fieldErrors.name}
                    errorMessage={fieldErrors.name}
                  />

                  <FormField
                    id="email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required={true}
                    type="email"
                    placeholder="example@domain.com"
                    isValid={!fieldErrors.email}
                    errorMessage={fieldErrors.email}
                  />

                  <FormField
                    id="phone"
                    name="phone"
                    label="Телефон"
                    value={formData.phone}
                    onChange={handleChange}
                    required={true}
                    placeholder="+7 (XXX) XXX-XX-XX"
                    isValid={!fieldErrors.phone}
                    errorMessage={fieldErrors.phone}
                  />

                  {/* 7. Добавить поле выбора темы в форму после поля телефона и перед полем сообщения */}
                  {/* Найти место в форме после FormField для телефона и перед FormField для сообщения */}
                  {/* и добавить следующий код: */}
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-[#603a30] mb-1">
                      Тема обращения <span aria-hidden="true">*</span>
                      <span className="sr-only">(обязательное поле)</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full rounded-md border ${
                        !fieldErrors.subject ? "border-[#c4bab3]" : "border-red-500"
                      } px-3 py-2 focus:border-[#741717] focus:outline-none focus:ring-1 focus:ring-[#741717]`}
                    >
                      {serviceTopics.map((topic) => (
                        <option key={topic.value} value={topic.value}>
                          {topic.label}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.subject && <p className="mt-1 text-xs text-red-600">{fieldErrors.subject}</p>}
                  </div>

                  <FormField
                    id="message"
                    name="message"
                    label="Сообщение"
                    value={formData.message}
                    onChange={handleChange}
                    required={true}
                    isTextarea={true}
                    placeholder="Опишите ваш вопрос..."
                    isValid={!fieldErrors.message}
                    errorMessage={fieldErrors.message}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#741717] text-white hover:bg-[#603a30]"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
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
                  </Button>

                  {submitSuccess !== null && (
                    <div className="p-3 rounded-md bg-green-50 text-green-800 flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <p>{submitSuccess}</p>
                    </div>
                  )}

                  {formError && (
                    <div className="p-3 rounded-md bg-red-50 text-red-800 flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{formError}</p>
                        <p className="text-sm mt-1">
                          Если проблема повторяется, свяжитесь с нами по телефону{" "}
                          <a href="tel:+79310070752" className="underline">
                            +7 (931) 007-07-52
                          </a>
                        </p>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-[#603a30]">
                    * Отправляя форму, вы соглашаетесь с{" "}
                    <Link href="/privacy" className="underline hover:text-[#741717]">
                      политикой конфиденциальности
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Блок с дополнительной информацией о том, как добраться */}
          <div className="mt-16">
            <div>
              <div className="bg-[#f8f5f2] rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-[#741717] mb-4">Как нас найти в Санкт-Петербурге</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-[#603a30] mb-2">Адрес офиса:</h4>
                    <p className="text-[#603a30]">Московский проспект 143, Санкт-Петербург, 196105</p>
                    <p className="text-[#603a30] mt-1">Московский район</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#603a30] mb-2">Как добраться:</h4>
                    <ul className="list-disc list-inside text-[#603a30]">
                      <li>Станция метро "Электросила" - 30 секунд пешком</li>
                      <li>Станция метро "Московские ворота" - 15 минут пешком или 5 минут на транспорте</li>
                      <li>Автобусы: 3, 26, 50, 62, 63, 72</li>
                      <li>Троллейбусы: 17, 24, 26</li>
                      <li>Маршрутные такси: К-3, К-213, К-252</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#603a30] mb-2">Парковка:</h4>
                    <p className="text-[#603a30]">Рядом с офисом есть бесплатная парковка для клиентов</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Определяем интерфейс YandexMapProps
interface YandexMapProps {
  apiKey: string
}

// Компонент Яндекс Карты - обновляем координаты
function YandexMap({ apiKey }: YandexMapProps) {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (mapLoaded && window.ymaps) {
      window.ymaps.ready(() => {
        // Точные координаты для Московского пр. 143
        const map = new window.ymaps.Map("yandex-map", {
          center: [59.878265, 30.318985], // Точные координаты для Московского пр. 143
          zoom: 16,
          controls: ["zoomControl", "fullscreenControl"],
        })

        const placemark = new window.ymaps.Placemark(
          [59.878265, 30.318985], // Точные координаты для Московского пр. 143
          {
            balloonContent: `
            <div class="p-3">
              <h3 class="font-bold text-[#741717]">Адвокат Довбешко С.Ю.</h3>
              <p>Московский пр-кт. 143, Санкт-Петербург, 196105</p>
              <p>Тел: <a href="tel:+79310070752">+7 (931) 007-07-52</a></p>
              <p><a href="https://yandex.ru/maps/?ll=30.318985,59.878265&z=16&pt=30.318985,59.878265" target="_blank">Построить маршрут</a></p>
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
