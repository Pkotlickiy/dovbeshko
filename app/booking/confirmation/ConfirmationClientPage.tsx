// Создать компонент ConfirmationClientPage
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"

const ConfirmationClientPage = () => {
  const searchParams = useSearchParams()
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
  })

  useEffect(() => {
    // Получаем данные из URL параметров
    const name = searchParams.get("name") || ""
    const email = searchParams.get("email") || ""
    const phone = searchParams.get("phone") || ""
    const date = searchParams.get("date") || ""
    const time = searchParams.get("time") || ""
    const service = searchParams.get("service") || ""

    setBookingDetails({ name, email, phone, date, time, service })
  }, [searchParams])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Запись подтверждена!</h1>
          <p className="text-gray-600 mt-2">
            Спасибо за запись на консультацию. Детали вашей записи отправлены на указанный email.
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Детали записи:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Имя:</p>
              <p className="font-medium">{bookingDetails.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email:</p>
              <p className="font-medium">{bookingDetails.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Телефон:</p>
              <p className="font-medium">{bookingDetails.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Услуга:</p>
              <p className="font-medium">{bookingDetails.service}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Дата:</p>
              <p className="font-medium">{bookingDetails.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Время:</p>
              <p className="font-medium">{bookingDetails.time}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Если у вас возникли вопросы, пожалуйста, свяжитесь с нами по телефону:</p>
          <p className="text-xl font-semibold text-blue-600">+7 (495) 123-45-67</p>
        </div>
      </div>
    </motion.div>
  )
}

export default ConfirmationClientPage
