"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import Link from "next/link"

export function Contact() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[#741717] md:text-4xl">Контакты</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Свяжитесь со мной удобным способом для получения юридической консультации
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#741717]">Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#741717] text-white">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Телефон</h3>
                      <a href="tel:+79310070752" className="text-[#741717] hover:text-[#8f1d1d] transition-colors">
                        +7 (931) 007-07-52
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#741717] text-white">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <a
                        href="mailto:S0070752@mail.ru"
                        className="text-[#741717] hover:text-[#8f1d1d] transition-colors"
                      >
                        S0070752@mail.ru
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#741717] text-white">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Telegram</h3>
                      <a
                        href="https://t.me/A0070752"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#741717] hover:text-[#8f1d1d] transition-colors"
                      >
                        @A0070752
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#741717] text-white">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Адрес</h3>
                      <p className="text-gray-600">196105, Санкт-Петербург, Московский проспект 143</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#741717] text-white">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Время работы</h3>
                      <p className="text-gray-600">Пн-Пт: 9:00-18:00</p>
                      <p className="text-gray-600">Сб-Вс: по договоренности</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-[#741717]">Быстрая связь</h3>
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-[#741717] hover:bg-[#8f1d1d]">
                      <Link href="https://t.me/A0070752" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Написать в Telegram
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-[#741717] text-[#741717] bg-transparent">
                      <a href="tel:+79310070752">
                        <Phone className="mr-2 h-5 w-5" />
                        Позвонить сейчас
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#741717]">Отправить сообщение</CardTitle>
                  <p className="text-gray-600">Заполните форму, и я свяжусь с вами в ближайшее время</p>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#741717]">Расположение офиса</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c&amp;source=constructor"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Карта офиса адвоката"
                    className="border-0"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-600">196105, Санкт-Петербург, Московский проспект 143</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
