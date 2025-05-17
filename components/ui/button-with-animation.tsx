"use client"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonWithAnimationProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  loadingText?: string
}

export const ButtonWithAnimation = forwardRef<HTMLButtonElement, ButtonWithAnimationProps>(
  (
    { className, variant = "primary", size = "md", isLoading = false, loadingText = "Загрузка...", children, ...props },
    ref,
  ) => {
    // Определяем базовые стили для разных вариантов кнопок
    const variantStyles = {
      primary: "bg-[#741717] text-white hover:bg-[#603a30]",
      secondary: "bg-[#c4bab3] text-[#603a30] hover:bg-[#a39990]",
      outline: "border border-[#741717] text-[#741717] hover:bg-[#741717] hover:text-white",
      ghost: "text-[#741717] hover:bg-gray-100",
    }

    // Определяем размеры кнопок
    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 disabled:opacity-70",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? loadingText : children}
      </motion.button>
    )
  },
)

ButtonWithAnimation.displayName = "ButtonWithAnimation"
