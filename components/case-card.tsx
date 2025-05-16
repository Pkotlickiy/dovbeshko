"use client"

import { motion } from "framer-motion"
import { Award, CheckCircle } from "lucide-react"

interface CaseCardProps {
  title: string
  description: string
  result: string
  delay?: number
}

export function CaseCard({ title, description, result, delay = 0 }: CaseCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-6 flex-grow">
        <div className="flex items-start mb-3">
          <div className="mr-3 mt-1 text-[#741717]">
            <CheckCircle size={20} />
          </div>
          <h3 className="text-lg font-semibold text-[#741717]">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
      </div>
      <div className="bg-gray-50 p-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-[#741717]" />
          <p className="text-sm font-medium">Результат: {result}</p>
        </div>
      </div>
    </motion.div>
  )
}
