"use client"

import { CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FormStatusProps {
  success?: boolean
  message?: string
  visible: boolean
}

export function FormStatus({ success, message, visible }: FormStatusProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`mt-4 flex items-center rounded-md p-4 ${
        success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
      }`}
    >
      {success ? (
        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
      ) : (
        <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
      )}
      <span>{message}</span>
    </motion.div>
  )
}
