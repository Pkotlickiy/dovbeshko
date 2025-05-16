"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { FileText, Scale, MessageSquare, Search, Shield, ClipboardList, type LucideIcon } from "lucide-react"

type ServiceType =
  | "consultations"
  | "court-representation"
  | "document-preparation"
  | "legal-analysis"
  | "pre-trial-settlement"
  | "subscription"

interface AnimatedServiceLogoProps {
  serviceType: ServiceType
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const serviceIcons: Record<ServiceType, LucideIcon> = {
  consultations: MessageSquare,
  "court-representation": Scale,
  "document-preparation": FileText,
  "legal-analysis": Search,
  "pre-trial-settlement": Shield,
  subscription: ClipboardList,
}

const serviceColors: Record<ServiceType, { primary: string; secondary: string; accent: string }> = {
  consultations: {
    primary: "#741717",
    secondary: "#9e2a2a",
    accent: "#f8e3e3",
  },
  "court-representation": {
    primary: "#741717",
    secondary: "#9e2a2a",
    accent: "#f8e3e3",
  },
  "document-preparation": {
    primary: "#741717",
    secondary: "#9e2a2a",
    accent: "#f8e3e3",
  },
  "legal-analysis": {
    primary: "#741717",
    secondary: "#9e2a2a",
    accent: "#f8e3e3",
  },
  "pre-trial-settlement": {
    primary: "#741717",
    secondary: "#9e2a2a",
    accent: "#f8e3e3",
  },
  subscription: {
    primary: "#741717",
    secondary: "#9e2a2a",
    accent: "#f8e3e3",
  },
}

const sizeDimensions = {
  sm: {
    container: "w-32 h-32",
    icon: 24,
    circleSize: "w-16 h-16",
    orbitSize: "w-24 h-24",
  },
  md: {
    container: "w-48 h-48",
    icon: 32,
    circleSize: "w-20 h-20",
    orbitSize: "w-32 h-32",
  },
  lg: {
    container: "w-64 h-64",
    icon: 40,
    circleSize: "w-24 h-24",
    orbitSize: "w-40 h-40",
  },
  xl: {
    container: "w-80 h-80",
    icon: 48,
    circleSize: "w-32 h-32",
    orbitSize: "w-48 h-48",
  },
}

export function AnimatedServiceLogo({ serviceType, size = "lg", className = "" }: AnimatedServiceLogoProps) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = serviceIcons[serviceType]
  const colors = serviceColors[serviceType]
  const dimensions = sizeDimensions[size]

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  const orbitVariants = {
    hidden: { opacity: 0, rotate: -30 },
    visible: {
      opacity: 1,
      rotate: prefersReducedMotion ? -30 : 0,
      transition: {
        opacity: { duration: 0.5 },
        rotate: {
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop" as const,
          ease: "linear",
        },
      },
    },
  }

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      },
    },
  }

  // Персонализированные элементы для каждого типа услуги
  const renderServiceSpecificElements = () => {
    switch (serviceType) {
      case "consultations":
        return (
          <>
            <motion.div
              className="absolute"
              initial={{ opacity: 0, x: -20 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, x: 0 }
                  : {
                      opacity: [0.2, 1, 0.2],
                      x: [-20, 0, -20],
                      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                    }
              }
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20"
                  stroke={colors.secondary}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </>
        )
      case "court-representation":
        return (
          <>
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: -10 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : {
                      opacity: [0.5, 1, 0.5],
                      y: [-5, 0, -5],
                      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                    }
              }
            >
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="30" height="10" rx="2" fill={colors.accent} fillOpacity="0.3" />
              </svg>
            </motion.div>
          </>
        )
      case "document-preparation":
        return (
          <>
            <motion.div
              className="absolute -bottom-2 -right-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: 1,
                      scale: [0.9, 1.1, 0.9],
                      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                    }
              }
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 5L5 10L15 15L25 10L15 5Z"
                  fill={colors.accent}
                  fillOpacity="0.3"
                  stroke={colors.secondary}
                  strokeWidth="1"
                />
              </svg>
            </motion.div>
          </>
        )
      case "legal-analysis":
        return (
          <>
            <motion.div
              className="absolute -top-3 -left-3"
              initial={{ opacity: 0, rotate: 0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, rotate: 0 }
                  : {
                      opacity: 1,
                      rotate: 360,
                      transition: {
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        ease: "linear",
                      },
                    }
              }
            >
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12.5" cy="12.5" r="10" stroke={colors.secondary} strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            </motion.div>
          </>
        )
      case "pre-trial-settlement":
        return (
          <>
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: [0.5, 1, 0.5],
                      scale: [0.9, 1, 0.9],
                      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                    }
              }
            >
              <svg width="50" height="20" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 10H45M45 10L35 5M45 10L35 15"
                  stroke={colors.secondary}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </>
        )
      case "subscription":
        return (
          <>
            <motion.div
              className="absolute -top-2 right-0"
              initial={{ opacity: 0, y: 10 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : {
                      opacity: [0.5, 1, 0.5],
                      y: [0, -5, 0],
                      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                    }
              }
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="16" height="4" rx="1" fill={colors.accent} fillOpacity="0.3" />
                <rect x="2" y="8" width="16" height="4" rx="1" fill={colors.accent} fillOpacity="0.3" />
                <rect x="2" y="14" width="16" height="4" rx="1" fill={colors.accent} fillOpacity="0.3" />
              </svg>
            </motion.div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className={`relative flex items-center justify-center ${dimensions.container} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Фоновый круг */}
      <motion.div
        className={`absolute ${dimensions.orbitSize} rounded-full border-2 border-dashed border-gray-200`}
        variants={orbitVariants}
      />

      {/* Орбитальные частицы */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-gray-200"
        variants={particleVariants}
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-gray-200"
        variants={particleVariants}
        style={{
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-gray-200"
        variants={particleVariants}
        style={{
          left: "10%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-gray-200"
        variants={particleVariants}
        style={{
          right: "10%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />

      {/* Центральный круг с иконкой */}
      <motion.div
        className={`relative flex items-center justify-center ${dimensions.circleSize} rounded-full bg-gradient-to-br from-[${colors.primary}] to-[${colors.secondary}] shadow-lg`}
        variants={circleVariants}
      >
        <motion.div variants={iconVariants}>
          <Icon size={dimensions.icon} color="white" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Персонализированные элементы для конкретной услуги */}
      {renderServiceSpecificElements()}
    </motion.div>
  )
}
