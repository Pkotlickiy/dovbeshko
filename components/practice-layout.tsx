"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollToTop } from "@/components/scroll-to-top"
import { cn } from "@/lib/utils"

interface PracticeLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  imagePath?: string
  imageAlt?: string
  breadcrumbs?: { name: string; href: string }[]
}

export function PracticeLayout({
  children,
  title,
  description,
  imagePath = "/placeholder.svg?key=hnex0",
  imageAlt,
  breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "Практика", href: "/practice" },
  ],
}: PracticeLayoutProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Хлебные крошки */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center">
                {index > 0 && <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />}
                <Link
                  href={crumb.href}
                  className={cn(
                    "hover:text-[#741717] transition-colors",
                    index === breadcrumbs.length - 1 && "font-medium text-[#741717]",
                  )}
                >
                  {crumb.name}
                </Link>
              </div>
            ))}
            <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
            <span className="font-medium text-[#741717]">{title}</span>
          </nav>
        </div>
      </div>

      {/* Герой-секция */}
      <motion.section
        className="bg-white py-12 md:py-20"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
            <div>
              <motion.div variants={itemVariants}>
                <h1 className="font-playfair text-3xl font-bold text-[#741717] md:text-4xl lg:text-5xl">{title}</h1>
              </motion.div>
              <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-700 leading-relaxed md:text-xl">
                {description}
              </motion.p>
              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-[#741717] hover:bg-[#8f1d1d]">
                  <Link href="/booking" className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Записаться на консультацию
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-[#741717] text-[#741717]">
                  <a href="tel:+79310070752" className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Позвонить
                  </a>
                </Button>
              </motion.div>
            </div>
            <motion.div
              variants={imageVariants}
              className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#741717]/20 to-transparent z-10 rounded-lg" />
              <img
                src={imagePath || "/placeholder.svg"}
                alt={imageAlt || title}
                className="w-full h-full object-cover rounded-lg"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Основное содержимое */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {children}
          </motion.div>
        </div>
      </section>

      {/* CTA секция */}
      <motion.section
        className="py-12 md:py-16 bg-gradient-to-r from-[#741717] to-[#8f1d1d] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
            Нужна консультация по вопросу {title.toLowerCase()}?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Запишитесь на консультацию, и я помогу разобраться в вашей ситуации и предложу оптимальное решение.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-[#741717] hover:bg-gray-100">
              <Link href="/booking" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Записаться на консультацию
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <a href="tel:+79310070752" className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Позвонить сейчас
              </a>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Кнопка прокрутки вверх */}
      <ScrollToTop />
    </div>
  )
}

export default PracticeLayout
