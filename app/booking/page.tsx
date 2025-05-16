import type { Metadata } from "next"
import { BookingForm } from "@/components/booking-form"

export const metadata: Metadata = {
  title: "Запись на консультацию | Адвокат Довбешко С.Ю.",
  description:
    "Запишитесь на юридическую консультацию к адвокату Довбешко Светлане Юрьевне онлайн. Профессиональная помощь по уголовным, военным и гражданским делам в Санкт-Петербурге.",
  alternates: {
    canonical: "/booking",
  },
  keywords: [
    "запись к адвокату",
    "консультация юриста СПб",
    "записаться на консультацию",
    "юридическая консультация онлайн",
    "адвокат Довбешко запись",
    "стоимость консультации адвоката",
    "юрист предварительная запись",
  ],
}

export default function BookingPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Запись на консультацию</h1>
      <div className="max-w-2xl mx-auto">
        <BookingForm />
      </div>
    </main>
  )
}
