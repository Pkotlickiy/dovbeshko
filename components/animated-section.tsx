"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section ref={ref} className={cn("relative", className)}>
      {children}
    </section>
  )
}

interface AnimatedItemProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedItem({ children, className, delay = 0 }: AnimatedItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.21, 0.45, 0.46, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
