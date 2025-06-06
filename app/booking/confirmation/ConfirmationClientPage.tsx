"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

// Функция для форматирования даты
const formatDate = (dateString: string) => {
  if (!dateString) return ""
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  } catch (e) {
    return dateString
  }
}

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

  // Use a ref to track if we've already processed the search params
  const initializedRef = useRef(false)

  useEffect(() => {
    // Only run this effect once
    if (!initializedRef.current) {
      initializedRef.current = true

      // Get data from URL parameters
      const name = searchParams.get("name") || ""
      const email = searchParams.get("email") || ""
      const phone = searchParams.get("phone") || ""
      const date = searchParams.get("date") || ""
      const time = searchParams.get("time") || ""
      const service = searchParams.get("service") || ""

      setBookingDetails({ name, email, phone, date, time, service })
    }
  }, [searchParams]) // Keep searchParams in the dependency array for correctness

  // Форматирование названия услуги для отображения
  const getServiceName = (serviceCode: string) => {
    const services: Record<string, string> = {
      consultation: "Консультация",
      document: "Подготовка документов",
      court: "Представительство в суде",
      analysis: "Юридический анализ",
      settlement: "Досудебное урегулирование",
      subscription: "Юридическое сопровождение",
      criminal: "Уголовное право",
      military: "Военное право",
      land: "Земельное право",
      consumer: "Защита прав потребителей",
      realestate: "Сделки с недвижимостью",
      arbitration: "Арбитражное право",
      inheritance: "Наследство",
      unjust_enrichment: "Неосновательное обогащение",
      medical: "Медицинское право",
    }
    return services[serviceCode] || serviceCode
  }

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
          <p className="text-gray-600 mt-2">
            Адвокат Довбешко С.Ю. свяжется с вами в ближайшее время для подтверждения записи.
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
              <p className="font-medium">{getServiceName(bookingDetails.service)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Дата:</p>
              <p className="font-medium">{formatDate(bookingDetails.date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Время:</p>
              <p className="font-medium">{bookingDetails.time}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Если у вас возникли вопросы, пожалуйста, свяжитесь с нами по телефону:</p>
          <a href="tel:+79310070752" className="text-xl font-semibold text-blue-600 hover:underline">
            + 7 931 007 07 52
          </a>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-[#741717] text-white font-medium rounded-md hover:bg-[#8a1c1c] transition-colors"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ConfirmationClientPage
