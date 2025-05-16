"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PracticeHeroProps {
  title: string
  description: string
  className?: string
}

export function PracticeHero({ title, description, className }: PracticeHeroProps) {
  return (
    <section
      className={cn("relative py-20 md:py-32 bg-gradient-to-r from-[#741717] to-[#8B0000] overflow-hidden", className)}
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"
          initial={{ x: -100, y: -100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          initial={{ x: 100, y: 100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
