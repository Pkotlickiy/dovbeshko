"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Scale,
  Home,
  Landmark,
  ShoppingCart,
  Building2,
  Scroll,
  Stethoscope,
  Coins,
  Shield,
  Users,
  Briefcase,
  Receipt,
  Lightbulb,
  FileText,
  TrendingDown,
  Building,
  Umbrella,
  BanknoteIcon as Bank,
  Leaf,
  Gavel,
  Car,
  Globe,
  Heart,
  BadgeAlert,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type PracticeArea =
  | "criminal"
  | "realestate"
  | "land"
  | "consumer"
  | "arbitration"
  | "inheritance"
  | "medical"
  | "unjust-enrichment"
  | "military"
  | "family"
  | "labor"
  | "tax"
  | "intellectual"
  | "administrative"
  | "bankruptcy"
  | "corporate"
  | "insurance"
  | "banking"
  | "environmental"
  | "civil"
  | "traffic"
  | "international"
  | "divorce"
  | "immigration"

interface PracticeIconProps {
  area: PracticeArea
  className?: string
  size?: number
  animated?: boolean
  delay?: number
}

export function PracticeIcon({ area, className, size = 48, animated = true, delay = 0 }: PracticeIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  const iconMap = {
    criminal: Gavel,
    realestate: Home,
    land: Landmark,
    consumer: ShoppingCart,
    arbitration: Building2,
    inheritance: Scroll,
    medical: Stethoscope,
    "unjust-enrichment": Coins,
    military: Shield,
    family: Users,
    labor: Briefcase,
    tax: Receipt,
    intellectual: Lightbulb,
    administrative: FileText,
    bankruptcy: TrendingDown,
    corporate: Building,
    insurance: Umbrella,
    banking: Bank,
    environmental: Leaf,
    civil: Scale,
    traffic: Car,
    international: Globe,
    divorce: Heart,
    immigration: BadgeAlert,
  }

  const Icon = iconMap[area] || Scale

  // Анимация при загрузке
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut",
      },
    },
  }

  // Анимация при наведении
  const iconVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.15,
      rotate: [0, -5, 5, -3, 3, 0],
      transition: {
        scale: { duration: 0.3 },
        rotate: { duration: 0.5, ease: "easeInOut" },
      },
    },
  }

  // Анимация фона
  const backgroundVariants = {
    idle: {
      backgroundColor: "rgb(243, 244, 246)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: { duration: 0.3 },
    },
    hover: {
      backgroundColor: "rgb(255, 255, 255)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3 },
    },
  }

  if (!animated) {
    return (
      <div className={cn("flex items-center justify-center rounded-full bg-gray-100 shadow-md p-4", className)}>
        <Icon size={size} className="text-[#741717]" />
      </div>
    )
  }

  return (
    <motion.div
      className={cn("flex items-center justify-center rounded-full p-4", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={isHovered ? "hover" : "idle"}
      variants={backgroundVariants}
    >
      <motion.div variants={iconVariants}>
        <Icon size={size} className="text-[#741717]" />
      </motion.div>
    </motion.div>
  )
}
