"use client"

import type { Variants } from "framer-motion"

// Fade up animation - subtle entrance for content blocks
export const fadeUpVariants = {
  hidden: (custom: { distance?: number } = {}) => ({
    opacity: 0,
    y: custom.distance || 50,
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Subtle scale animation for cards and interactive elements
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

// Slide in from side animation
export const slideInVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

// Subtle pulse animation for emphasis
export const pulseVariants: Variants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    },
  },
}

// Анимация для изображений - плавное появление с масштабированием
export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
}

// Эффект параллакса при скролле
export const parallaxVariants = {
  hidden: { y: 0 },
  visible: (custom: { direction?: "up" | "down" } = { direction: "up" }) => ({
    y: custom.direction === "up" ? -20 : 20,
    transition: {
      repeat: 0,
      repeatType: "reverse" as const,
      duration: 1,
      ease: "easeInOut",
    },
  }),
}

// Эффект появления с размытием
export const blurInVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(20px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}
