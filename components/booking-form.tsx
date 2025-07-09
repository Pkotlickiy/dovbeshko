"use client"

import { useState } from "react"
import { useActionState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Phone, Mail, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { submitAppointment } from "@/app/actions/appointment-actions"
import { FormStatus } from "@/components/form-status"

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export function BookingForm() {
  const [state, formAction, isPending] = useActionState(submitAppointment, null)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f2] to-white py-12">
      <div className="container mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto max-w-4xl">
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-[#603a30]">Записаться на консультацию</h1>
            <p className="text-lg text-gray-600">
              Выберите удобное время для встречи с адвокатом Довбешко Светланой Юрьевной
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="border-[#c4bab3]/20">
                <CardHeader>
                  <CardTitle className="text-[#603a30]">Контактная информация</CardTitle>
                  <CardDescription>Свяжитесь с нами удобным способом</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#741717]" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-sm text-gray-600">+7 (931) 007-07-52</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#741717]" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">S0070752@mail.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#741717]" />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-sm text-gray-600">Санкт-Петербург, Московский проспект 143</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#741717]" />
                    <div>
                      <p className="font-medium">Время работы</p>
                      <p className="text-sm text-gray-600">Пн-Пт: 9:00-18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Booking Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="border-[#c4bab3]/20">
                <CardHeader>
                  <CardTitle className="text-[#603a30]">Форма записи</CardTitle>
                  <CardDescription>Заполните форму, и мы свяжемся с вами для подтверждения</CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={formAction} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Ваше имя"
                          required
                          className="border-[#c4bab3]/30 focus:border-[#741717]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          required
                          className="border-[#c4bab3]/30 focus:border-[#741717]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="border-[#c4bab3]/30 focus:border-[#741717]"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Дата консультации *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal border-[#c4bab3]/30",
                                !selectedDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP", { locale: ru }) : <span>Выберите дату</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                              initialFocus
                              locale={ru}
                            />
                          </PopoverContent>
                        </Popover>
                        <input
                          type="hidden"
                          name="date"
                          value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">Время *</Label>
                        <Select name="time" required>
                          <SelectTrigger className="border-[#c4bab3]/30 focus:border-[#741717]">
                            <SelectValue placeholder="Выберите время" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Тема консультации</Label>
                      <Select name="subject">
                        <SelectTrigger className="border-[#c4bab3]/30 focus:border-[#741717]">
                          <SelectValue placeholder="Выберите область права" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="criminal">Уголовное право</SelectItem>
                          <SelectItem value="military">Военное право</SelectItem>
                          <SelectItem value="realestate">Недвижимость</SelectItem>
                          <SelectItem value="inheritance">Наследственное право</SelectItem>
                          <SelectItem value="land">Земельное право</SelectItem>
                          <SelectItem value="consumer">Защита прав потребителей</SelectItem>
                          <SelectItem value="arbitration">Арбитражные споры</SelectItem>
                          <SelectItem value="medical">Медицинское право</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Описание вопроса</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Кратко опишите вашу ситуацию..."
                        rows={4}
                        className="border-[#c4bab3]/30 focus:border-[#741717]"
                      />
                    </div>

                    <FormStatus state={state} />

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-[#741717] hover:bg-[#8B0000] text-white"
                    >
                      {isPending ? "Отправка..." : "Записаться на консультацию"}
                    </Button>

                    <p className="text-sm text-gray-600">
                      * Обязательные поля. Нажимая кнопку, вы соглашаетесь с{" "}
                      <a href="/privacy" className="text-[#741717] hover:underline">
                        политикой конфиденциальности
                      </a>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
