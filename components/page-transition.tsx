"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Обновите стили для компонента, чтобы он не перекрывал фоновое изображение
            Например, если у вас есть div с классом, содержащим background-color, 
            убедитесь, что он не имеет z-index выше, чем у фона */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-16 w-16 rounded-full border-4 border-[#741717]/20 border-t-[#741717]"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="mt-4 text-lg font-medium text-[#741717]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                Довбешко С.Ю.
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
