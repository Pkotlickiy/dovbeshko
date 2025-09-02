"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Calendar } from "lucide-react"
import Link from "next/link"

interface CtaConsultationProps {
  title?: string
  description?: string
  buttonText?: string
  showMultipleButtons?: boolean
}

export function CtaConsultation({
  title = "Нужна юридическая помощь?",
  description = "Запишитесь на консультацию, и я помогу разобраться в вашей ситуации",
  buttonText = "Записаться на консультацию",
  showMultipleButtons = true,
}: CtaConsultationProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-[#741717] to-[#8f1d1d] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
          <p className="mb-8 text-xl text-white/90 max-w-2xl mx-auto">{description}</p>

          {showMultipleButtons ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-[#741717] hover:bg-gray-100">
                <Link href="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  {buttonText}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#741717] bg-transparent"
              >
                <Link href="https://t.me/A0070752" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Связаться в Telegram
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#741717] bg-transparent"
              >
                <a href="tel:+79310070752">
                  <Phone className="mr-2 h-5 w-5" />
                  Позвонить
                </a>
              </Button>
            </div>
          ) : (
            <Button asChild size="lg" className="bg-white text-[#741717] hover:bg-gray-100">
              <Link href="/booking">
                <Calendar className="mr-2 h-5 w-5" />
                {buttonText}
              </Link>
            </Button>
          )}

          <div className="mt-8 text-sm text-white/80">
            <p>Консультация поможет оценить перспективы вашего дела</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Экспорт для обратной совместимости
export { CtaConsultation as CTAConsultation }
