"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface ContactFormProps {
  subject?: string
}

export function ContactForm({ subject }: ContactFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for form submission logic
    console.log("Form submitted:", { name, email, phone, message, subject })
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
          className="mt-1 block w-full rounded-md border-[#c4bab3] shadow-sm focus:border-[#741717] focus:ring-[#741717] sm:text-sm"
        />
      </div>
      <motion.button
        type="submit"
        className="relative inline-flex items-center justify-center rounded-md bg-[#741717] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#603a30]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Отправить
      </motion.button>
    </form>
  )
}
