"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface AnimatedIconProps {
  icon: LucideIcon
  size?: number
  color?: string
  pulseEffect?: boolean
  rotateEffect?: boolean
  pathEffect?: boolean
  className?: string
}

export function AnimatedIcon({
  icon: Icon,
  size = 24,
  color = "#741717",
  pulseEffect = false,
  rotateEffect = false,
  pathEffect = false,
  className = "",
}: AnimatedIconProps) {
  // Варианты анимации для пульсации
  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
      },
    },
  }

  // Варианты анимации для вращения
  const rotateVariants = {
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
        ease: "linear",
      },
    },
  }

  // Варианты анимации для эффекта пути
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  // Выбор анимации в зависимости от переданных пропсов
  const animationVariant = {
    ...(pulseEffect ? pulseVariants : {}),
    ...(rotateEffect ? rotateVariants : {}),
  }

  const animationState = {
    ...(pulseEffect ? { animate: "pulse" } : {}),
    ...(rotateEffect ? { animate: "rotate" } : {}),
  }

  return (
    <motion.div
      className={`relative ${className}`}
      variants={animationVariant}
      {...animationState}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {pathEffect ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <Icon size={size} color={color} strokeWidth={2} className="custom-icon" />
          <style jsx global>{`
            .custom-icon path {
              stroke-dasharray: 1;
              stroke-dashoffset: 1;
              animation: dash 2s ease-in-out forwards;
            }
            @keyframes dash {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </motion.div>
      ) : (
        <Icon size={size} color={color} />
      )}
    </motion.div>
  )
}
