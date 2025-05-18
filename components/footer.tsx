"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
// Добавить импорт констант
import { CONTACT_INFO } from "@/lib/constants"

// Обновить компонент Footer для использования констант
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#741717] text-white py-12">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Колонка 1: О компании */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-white">Адвокат Довбешко С.Ю.</h3>
            <p className="text-gray-300 mb-4">
              Профессиональная юридическая помощь в СПб. Предоставляю со своей командой полный спектр юридических услуг.
              Защита ваших прав и интересов - моя главная задача.
            </p>
            <p className="text-gray-300 mb-2">Индивидуальный подход к каждому доверителю.</p>
            <p className="text-sm text-gray-300">Рег. номер в реестре адвокатов: 78/8409</p>
          </div>

          {/* Колонка 2: Навигация */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-white">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Помощь
                </Link>
              </li>
              <li>
                <Link href="/practice" className="text-gray-300 hover:text-white transition-colors">
                  Практика
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-300 hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-white transition-colors">
                  Записаться
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Контакты */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-white">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-300" />
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-300" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-300 hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-gray-300 mt-1" />
                <span className="text-gray-300">{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Часы работы */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-white">Часы работы</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-300" />
                <span className="text-gray-300">{CONTACT_INFO.workHours.weekdays}</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-300" />
                <span className="text-gray-300">{CONTACT_INFO.workHours.saturday}</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-300" />
                <span className="text-gray-300">{CONTACT_INFO.workHours.sunday}</span>
              </li>
            </ul>
            <Link href="/privacy" className="text-gray-300 hover:text-white mt-4 transition-colors text-sm">
              Политика конфиденциальности
            </Link>
          </div>
        </div>

        {/* Нижняя часть футера с копирайтом */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center md:text-left">
          <p className="text-sm text-gray-300">© {currentYear} Адвокат Довбешко С.Ю. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
