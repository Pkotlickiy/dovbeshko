"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedLogoProps {
  isScrolled: boolean
  isMobile: boolean
  className?: string
}

export function AnimatedLogo({ isScrolled, isMobile, className }: AnimatedLogoProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Animation variants
  const logoVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  // Scale animation for hover effect
  const hoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  }

  // Текстовые варианты для инициалов и подписи
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  }

  // Размер логотипа в зависимости от прокрутки
  const logoSize = isScrolled ? "text-2xl" : "text-3xl"
  const subtitleSize = isScrolled ? "text-xs" : "text-sm"

  return (
    <motion.div
      className={cn("relative flex flex-col items-center", className)}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate="visible"
      variants={logoVariants}
      whileHover="hover"
    >
      <div className="flex flex-col items-center">
        <motion.div className="text-center" variants={textVariants}>
          <div className={cn("font-bold tracking-wider text-[#741717] transition-all duration-300", logoSize)}>SUD</div>
          <div className={cn("uppercase tracking-wider text-gray-600 transition-all duration-300", subtitleSize)}>
            адвокат
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
