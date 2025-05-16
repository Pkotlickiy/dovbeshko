"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { submitContactForm } from "@/app/actions/contact-actions"
import { toast } from "@/components/ui/use-toast"

interface ContactFormProps {
  subject?: string
}

export function ContactForm({ subject }: ContactFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("phone", phone)
      formData.append("message", message)
      if (subject) formData.append("subject", subject)

      const result = await submitContactForm(formData)

      if (result.success) {
        toast({
          title: "Сообщение отправлено",
          description: "Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.",
        })
        // Очистить форму после успешной отправки
        setName("")
        setEmail("")
        setPhone("")
        setMessage("")
      } else {
        toast({
          title: "Ошибка отправки",
          description: result.message || "Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Ошибка сервера",
        description: "Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#603a30]">
          Имя:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-[#c4bab3] shadow-sm focus:border-[#741717] focus:ring-[#741717] sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#603a30]">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-[#c4bab3] shadow-sm focus:border-[#741717] focus:ring-[#741717] sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#603a30]">
          Телефон:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-[#c4bab3] shadow-sm focus:border-[#741717] focus:ring-[#741717] sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#603a30]">
          Сообщение:
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-[#c4bab3] shadow-sm focus:border-[#741717] focus:ring-[#741717] sm:text-sm"
        />
      </div>
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="relative inline-flex items-center justify-center rounded-md bg-[#741717] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#603a30] disabled:opacity-70"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? "Отправка..." : "Отправить"}
      </motion.button>
    </form>
  )
}
