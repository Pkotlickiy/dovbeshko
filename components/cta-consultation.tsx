"use client"

import Link from "next/link"
import { motion } from "framer-motion"

// Обновляем имя интерфейса для согласованности
interface CtaConsultationProps {
  title?: string
  description?: string
  buttonText?: string
}

// Основная функция компонента
export function CtaConsultation({
  title = "Нужна консультация?",
  description = "Запишитесь на консультацию и получите профессиональную помощь в решении вашей юридической проблемы.",
  buttonText = "Записаться на консультацию",
}: CtaConsultationProps) {
  return (
    <section className="bg-[#741717] py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/booking"
            className="inline-block px-8 py-4 bg-white text-[#741717] font-medium rounded-md hover:bg-gray-100 transition-colors text-lg"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Добавляем дополнительный экспорт для обратной совместимости
export { CtaConsultation as CTAConsultation }
