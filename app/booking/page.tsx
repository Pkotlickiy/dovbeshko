import type { Metadata } from "next"
import { BookingForm } from "@/components/booking-form"

export const metadata: Metadata = {
  title: "Консультация юриста СПб | Запись к адвокату | Цены",
  description:
    "Запись на консультацию к адвокату в СПб. Первичная консультация от 2000 руб. Удобное время, онлайн-запись, конфиденциальность. Московский район.",
  keywords: [
    "консультация юриста спб",
    "запись к адвокату",
    "стоимость консультации адвоката",
    "юридическая консультация онлайн",
    "цена консультации юриста спб",
    "записаться на прием к адвокату",
  ],
  alternates: {
    canonical: "/booking",
  },
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
