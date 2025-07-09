"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MessageCircle, Calendar } from "lucide-react"
import Link from "next/link"

interface CtaConsultationProps {
  title?: string
  description?: string
  buttonText?: string
  showContactInfo?: boolean
}

export function CtaConsultation({
  title = "Нужна юридическая помощь?",
  description = "Получите профессиональную консультацию адвоката. Защитим ваши права и интересы.",
  buttonText = "Получить консультацию",
  showContactInfo = true,
}: CtaConsultationProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="bg-gradient-to-r from-[#741717] to-[#8B0000] py-16">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h2 variants={itemVariants} className="mb-4 text-3xl font-bold text-white md:text-4xl">
            {title}
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-8 text-xl text-white/90">
            {description}
          </motion.p>

          <motion.div variants={itemVariants} className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
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
              <Link href="/contacts">
                <MessageCircle className="mr-2 h-5 w-5" />
                Связаться с нами
              </Link>
            </Button>
          </motion.div>

          {showContactInfo && (
            <motion.div variants={itemVariants}>
              <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
                    <div className="flex items-center gap-2 text-white">
                      <Phone className="h-5 w-5" />
                      <span className="font-medium">+7 (931) 007-07-52</span>
                    </div>
                    <div className="hidden md:block h-6 w-px bg-white/30"></div>
                    <div className="text-white">
                      <span className="font-medium">Санкт-Петербург, Московский проспект 143</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// Экспорт по умолчанию для совместимости
export default CtaConsultation

// Именованный экспорт
export { CtaConsultation as CTAConsultation }
