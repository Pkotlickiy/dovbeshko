"use client"

import { useActionState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitContact } from "@/app/actions/contact-actions"
import { FormStatus } from "@/components/form-status"

interface ContactFormProps {
  subject?: string
  title?: string
  description?: string
}

export function ContactForm({
  subject = "",
  title = "Связаться с нами",
  description = "Заполните форму, и мы свяжемся с вами в ближайшее время",
}: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitContact, null)

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="border-[#c4bab3]/20">
        <CardHeader>
          <CardTitle className="text-[#603a30]">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
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
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className="border-[#c4bab3]/30 focus:border-[#741717]"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="subject">Тема обращения</Label>
              <Select name="subject" defaultValue={subject}>
                <SelectTrigger className="border-[#c4bab3]/30 focus:border-[#741717]">
                  <SelectValue placeholder="Выберите тему" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Консультация</SelectItem>
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
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="message">Сообщение *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Опишите вашу ситуацию или вопрос..."
                rows={5}
                required
                className="border-[#c4bab3]/30 focus:border-[#741717]"
              />
            </motion.div>

            <FormStatus state={state} />

            <motion.div variants={itemVariants}>
              <Button type="submit" disabled={isPending} className="w-full bg-[#741717] hover:bg-[#8B0000] text-white">
                {isPending ? "Отправка..." : "Отправить сообщение"}
              </Button>
            </motion.div>

            <motion.p variants={itemVariants} className="text-sm text-gray-600">
              * Обязательные поля. Нажимая кнопку, вы соглашаетесь с{" "}
              <a href="/privacy" className="text-[#741717] hover:underline">
                политикой конфиденциальности
              </a>
            </motion.p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
