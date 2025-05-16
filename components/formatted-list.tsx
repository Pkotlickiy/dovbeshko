"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface FormattedListProps {
  items?: string[] | string
  icon?: ReactNode
}

export function FormattedList({ items = [], icon }: FormattedListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Обработка случая, когда items - это строка
  if (typeof items === "string") {
    return (
      <motion.div
        className="text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {items}
      </motion.div>
    )
  }

  // Проверка на пустой массив
  if (!items || items.length === 0) {
    return null
  }

  return (
    <motion.ul
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {items.map((text, index) => (
        <motion.li
          key={index}
          className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          variants={item}
        >
          <span className="mt-1 flex-shrink-0">{icon || <CheckCircle className="h-5 w-5 text-[#741717]" />}</span>
          <span>{text}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
