"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedServiceListProps {
  services: string[]
  title?: string
  className?: string
}

export function AnimatedServiceList({ services, title, className }: AnimatedServiceListProps) {
  // Варианты анимации дл�� контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  // Варианты анимации для элементов списка
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      className={cn("bg-white rounded-lg shadow-md p-6", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {title && (
        <motion.h3
          className="text-xl font-bold mb-4 text-[#741717]"
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          {title}
        </motion.h3>
      )}
      <motion.ul className="space-y-2" variants={containerVariants}>
        {services.map((service, index) => (
          <motion.li key={index} className="flex items-start" variants={itemVariants}>
            <motion.span
              className="text-[#741717] mr-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              •
            </motion.span>
            <span className="text-[#603a30]">{service}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
