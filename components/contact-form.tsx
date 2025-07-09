"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, User, MessageSquare } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact-actions"
import { FormStatus } from "@/components/form-status"

interface ContactFormProps {
  subject?: string
  className?: string
}

export function ContactForm({ subject = "", className = "" }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitContactForm, null)

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Mail className="h-6 w-6 text-[#741717]" />
          Связаться с нами
        </CardTitle>
        <CardDescription>Отправьте нам сообщение, и мы ответим в течение 24 часов</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Имя *
              </Label>
              <Input id="contact-name" name="name" type="text" placeholder="Ваше имя" required className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Телефон *
              </Label>
              <Input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email *
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-subject" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Тема обращения
            </Label>
            <Input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="Тема вашего обращения"
              defaultValue={subject}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Сообщение *
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder="Опишите ваш вопрос или ситуацию..."
              rows={6}
              required
              className="w-full"
            />
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p className="mb-2">
              <strong>Конфиденциальность:</strong> Вся информация строго конфиденциальна.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Ответ в течение 24 часов</li>
              <li>Бесплатная первичная консультация по телефону</li>
              <li>Соблюдение адвокатской тайны</li>
            </ul>
          </div>

          <FormStatus state={state} />

          <Button type="submit" className="w-full bg-[#741717] hover:bg-[#5a1212]" size="lg" disabled={isPending}>
            {isPending ? "Отправка..." : "Отправить сообщение"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactForm
