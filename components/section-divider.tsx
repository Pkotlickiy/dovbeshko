"use client"

import { motion } from "framer-motion"

interface SectionDividerProps {
  className?: string
  color?: string
  variant?: "wave" | "angle" | "curve" | "triangle"
}

export function SectionDivider({ className = "", color = "#ffffff", variant = "wave" }: SectionDividerProps) {
  const renderDivider = () => {
    switch (variant) {
      case "wave":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={`absolute bottom-0 left-0 h-[60px] w-full ${className}`}
            fill={color}
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V69.81C57.1,67,118.55,47.16,184.6,37.05,263.63,25.22,292.82,47.15,321.39,56.44Z" />
          </svg>
        )
      case "angle":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={`absolute bottom-0 left-0 h-[60px] w-full ${className}`}
            fill={color}
          >
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" />
          </svg>
        )
      case "curve":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={`absolute bottom-0 left-0 h-[60px] w-full ${className}`}
            fill={color}
          >
            <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" />
          </svg>
        )
      case "triangle":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={`absolute bottom-0 left-0 h-[60px] w-full ${className}`}
            fill={color}
          >
            <path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="absolute bottom-0 left-0 h-[60px] w-full overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {renderDivider()}
      </motion.div>
    </div>
  )
}
