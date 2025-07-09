"use client"

import { useState } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Phone, Mail, User, MessageSquare } from "lucide-react"
import { bookAppointment } from "@/app/actions/appointment-actions"
import { FormStatus } from "@/components/form-status"

export function BookingForm() {
  const [state, formAction, isPending] = useActionState(bookAppointment, null)
  const [selectedService, setSelectedService] = useState("")

  const services = [
    "Консультация по уголовному праву",
    "Консультация по военному праву",
    "Консультация по недвижимости",
    "Консультация по защите прав потребителей",
    "Консультация по земельному праву",
    "Консультация по наследственному праву",
    "Консультация по арбитражным спорам",
    "Консультация по медицинскому праву",
    "Другое",
  ]

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Calendar className="h-6 w-6 text-[#741717]" />
          Записаться на консультацию
        </CardTitle>
        <CardDescription>Заполните форму, и мы свяжемся с вами для подтверждения времени встречи</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Имя *
              </Label>
              <Input id="name" name="name" type="text" placeholder="Ваше имя" required className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Телефон *
              </Label>
              <Input id="phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" required className="w-full" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input id="email" name="email" type="email" placeholder="your@email.com" className="w-full" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Тип консультации *
            </Label>
            <Select name="service" value={selectedService} onValueChange={setSelectedService} required>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип консультации" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Предпочтительная дата
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Предпочтительное время
              </Label>
              <Select name="time">
                <SelectTrigger>
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
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Краткое описание вопроса
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Опишите кратко суть вашего вопроса..."
              rows={4}
              className="w-full"
            />
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p className="mb-2">
              <strong>Важно:</strong> Консультация проводится по предварительной записи.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Время работы: Пн-Пт с 9:00 до 18:00</li>
              <li>Первичная консультация: 30 минут</li>
              <li>Мы свяжемся с вами в течение 2 часов для подтверждения</li>
            </ul>
          </div>

          <FormStatus state={state} />

          <Button type="submit" className="w-full bg-[#741717] hover:bg-[#5a1212]" size="lg" disabled={isPending}>
            {isPending ? "Отправка..." : "Записаться на консультацию"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default BookingForm
