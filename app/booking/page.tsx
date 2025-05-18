import type { Metadata } from "next"
import { BookingForm } from "@/components/booking-form"
import { Suspense } from "react"

// Обновить метаданные для страницы "Запись на консультацию"
export const metadata: Metadata = {
  title: "Запись к адвокату в СПб | Консультация от 2000₽ | Онлайн-запись",
  description:
    "Запись на консультацию к адвокату Довбешко в СПб. Первичная консультация от 2000₽. Выберите удобное время онлайн. Конфиденциальность гарантирована.",
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
      <h1 className="mb-6 text-center text-3xl font-bold">Запись на консультацию</h1>
      <div className="mx-auto max-w-2xl">
        <Suspense fallback={<div className="text-center">Загрузка формы...</div>}>
          <BookingForm />
        </Suspense>
      </div>
    </main>
  )
}
