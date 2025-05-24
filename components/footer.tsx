import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1c1917] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Адвокат Довбешко С.Ю.</h3>
            <p className="mb-4 text-gray-300">
              Профессиональная юридическая помощь с опытом более 10+ лет в Санкт-Петербурге. Защита ваших прав и
              интересов в уголовных, военных и гражданских делах.
            </p>
            <p className="text-sm text-gray-400">Рег. номер 78/8409</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 mt-0.5 text-[#741717]" />
                <a href="tel:+79310070752" className="text-gray-300 hover:text-white transition-colors">
                  +7 (931) 007-07-52
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 mt-0.5 text-[#741717]" />
                <a href="mailto:S0070752@mail.ru" className="text-gray-300 hover:text-white transition-colors">
                  S0070752@mail.ru
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-[#741717]" />
                <span className="text-gray-300">Московский проспект 143, Санкт-Петербург</span>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-2 mt-0.5 text-[#741717]" />
                <span className="text-gray-300">Пн-Пт: 9:00-18:00, Сб: 10:00-15:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Услуги</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/consultations" className="text-gray-300 hover:text-white transition-colors">
                  Консультации
                </Link>
              </li>
              <li>
                <Link
                  href="/services/court-representation"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Представительство в суде
                </Link>
              </li>
              <li>
                <Link
                  href="/services/document-preparation"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Составление документов
                </Link>
              </li>
              <li>
                <Link href="/services/legal-analysis" className="text-gray-300 hover:text-white transition-colors">
                  Правовой анализ
                </Link>
              </li>
              <li>
                <Link
                  href="/services/pre-trial-settlement"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Досудебное урегулирование
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Области практики</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/practice/criminal" className="text-gray-300 hover:text-white transition-colors">
                  Уголовные дела
                </Link>
              </li>
              <li>
                <Link href="/practice/military" className="text-gray-300 hover:text-white transition-colors">
                  Военное право
                </Link>
              </li>
              <li>
                <Link href="/practice/realestate" className="text-gray-300 hover:text-white transition-colors">
                  Недвижимость
                </Link>
              </li>
              <li>
                <Link href="/practice/inheritance" className="text-gray-300 hover:text-white transition-colors">
                  Наследственные споры
                </Link>
              </li>
              <li>
                <Link href="/practice" className="text-gray-300 hover:text-white transition-colors">
                  Все области практики →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {currentYear} Адвокат Довбешко С.Ю. Все права защищены.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
