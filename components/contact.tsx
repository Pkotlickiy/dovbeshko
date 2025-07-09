"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact-actions"
import { FormStatus } from "@/components/form-status"
import { useActionState } from "react"

interface ContactProps {
  subject?: string
}

interface ContactInfo {
  icon: React.ReactNode
  title: string
  content: React.ReactNode
}

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  subject: string
}

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://example.com/#localbusiness",
  name: "Адвокат Довбешко Светлана Юрьевна",
  image: "https://example.com/confident-female-lawyer.png",
  telephone: "+79310070752",
  email: "S0070752@mail.ru",
  url: "https://example.com",
  address: {
    "@type": "PostalAddress",
    postalCode: "196105",
    addressLocality: "Санкт-Петербург",
    streetAddress: "196105, Московский проспект 143",
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
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "10:00",
      closes: "15:00",
    },
  ],
  priceRange: "От 2000 ₽",
}

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
      "Офис расположен по адресу: 196105, Санкт-Петербург, Московский проспект 143. Всего 1 минута пешком от станции метро 'Электросила'. Также можно доехать на автобусах 3, 26, 50, 62, 63, 72 или троллейбусах 17, 24, 26.",
  },
]

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

export function Contact({ subject }: ContactProps) {
  const [state, formAction, isPending] = useActionState(submitContactForm, null)

  const contactInfoItems: ContactInfo[] = [
    {
      icon: <MapPin className="h-5 w-5 text-[#741717]" />,
      title: "Адрес",
      content: <p className="text-[#603a30]">196105, Санкт-Петербург, Московский пр-кт. 143</p>,
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
          <p className="text-[#603a30]">Пн-Пт: 9:00 - 20:00</p>
          <p className="text-[#603a30]">Сб-Вс: по предварительной записи</p>
        </>
      ),
    },
  ]

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#741717] mb-4">Связаться со мной</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Готова ответить на ваши вопросы и предоставить профессиональную юридическую помощь
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Контактная информация */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#741717]">Контактная информация</CardTitle>
                <CardDescription>Свяжитесь со мной удобным для вас способом</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfoItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {item.icon}
                    {item.content}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Карта */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#741717]">Как меня найти</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A8b5c5f5e5d5c5f5e5d5c5f5e5d5c5f5e&amp;source=constructor"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Карта офиса адвоката"
                    className="border-0"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">196105, Санкт-Петербург, Московский проспект 143</p>
              </CardContent>
            </Card>
          </div>

          {/* Форма обратной связи */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#741717]">Отправить сообщение</CardTitle>
              <CardDescription>Опишите вашу ситуацию, и я свяжусь с вами в ближайшее время</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Имя *
                    </label>
                    <Input id="name" name="name" type="text" required placeholder="Ваше имя" disabled={isPending} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      disabled={isPending}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" disabled={isPending} />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Тема обращения
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Краткое описание вопроса"
                    defaultValue={subject || ""}
                    disabled={isPending}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Сообщение *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Опишите вашу ситуацию подробнее..."
                    rows={4}
                    disabled={isPending}
                  />
                </div>
                <Button type="submit" className="w-full bg-[#741717] hover:bg-[#5a1212]" disabled={isPending}>
                  {isPending ? "Отправка..." : "Отправить сообщение"}
                </Button>
                <FormStatus state={state} />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
