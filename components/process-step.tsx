"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProcessStepProps {
  number: number
  title: string
  description: string
  delay?: number
  className?: string
}

export function ProcessStep({ number, title, description, delay = 0, className }: ProcessStepProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex items-start">
        <div className="relative mr-4">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#741717] text-white font-bold"
            whileHover={{ scale: 1.05 }}
          >
            {number}
          </motion.div>
          {number < 4 && (
            <motion.div
              className="absolute left-1/2 top-12 h-16 w-0.5 bg-[#741717]/20"
              initial={{ height: 0 }}
              animate={{ height: "4rem" }}
              transition={{ delay: delay + 0.3, duration: 0.5 }}
            />
          )}
        </div>
        <div>
          <h3 className="mb-2 font-playfair text-xl font-bold text-[#741717]">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
