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
  title = "Нужна консультация специалиста?",
  description = "Запишитесь на бесплатную консультацию и получите профессиональную оценку вашей ситуации",
  buttonText = "Записаться на консультацию",
}: CtaConsultationProps) {
  return (
    <section className="py-16 px-4 bg-[#741717] text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-lg mb-8 max-w-2xl mx-auto text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/booking"
              className="inline-block bg-white hover:bg-gray-100 text-[#741717] px-6 py-3 rounded-md font-medium transition-colors"
            >
              {buttonText}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Добавляем дополнительный экспорт для обратной совместимости
// Это позволит использовать как CTAConsultation, так и CtaConsultation
export const CTAConsultation = CtaConsultation
