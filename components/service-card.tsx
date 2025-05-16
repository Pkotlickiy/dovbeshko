"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  imageSrc?: string // Added imageSrc prop
}

export function ServiceCard({
  icon,
  title,
  description,
  className,
  onMouseEnter,
  onMouseLeave,
  imageSrc,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onMouseLeave?.()
  }

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300",
        isHovered && "shadow-md border-[#741717]/30",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#741717]/30 to-transparent transform origin-left transition-all duration-300 scale-y-0"
        style={{ transform: isHovered ? "scaleY(1)" : "scaleY(0)" }}
      />

      <motion.div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#741717]/10 text-[#741717] transition-colors duration-300"
        animate={{ backgroundColor: isHovered ? "rgba(116, 23, 23, 0.2)" : "rgba(116, 23, 23, 0.1)" }}
      >
        {icon}
      </motion.div>

      <h3 className="mb-2 font-playfair text-xl font-bold text-[#741717]">{title}</h3>

      <p className="text-gray-700">{description}</p>
    </motion.div>
  )
}
