"use client"

import type { ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import { fadeUpVariants, staggerContainer } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  variants?: Variants
  staggerChildren?: boolean
  viewportMargin?: string
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  variants = fadeUpVariants,
  staggerChildren = false,
  viewportMargin = "-100px",
}: AnimatedSectionProps) {
  const containerVariants = staggerChildren ? staggerContainer : variants

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={containerVariants}
      transition={{
        delay,
        duration,
        staggerChildren: staggerChildren ? 0.1 : 0,
      }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedItemProps {
  children: ReactNode
  delay?: number
}

export function AnimatedItem({ children, delay = 0 }: AnimatedItemProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return <motion.div variants={itemVariants}>{children}</motion.div>
}
