"use client"

import { motion } from "framer-motion"
import { Scale, FileText, Home, Map, ShoppingBag, Briefcase, FileCheck, Heart, Shield, Award } from "lucide-react"

export type PracticeArea =
  | "criminal"
  | "realestate"
  | "land"
  | "consumer"
  | "arbitration"
  | "inheritance"
  | "medical"
  | "military"
  | "unjust-enrichment"

interface PracticeIconProps {
  area: PracticeArea
  size?: number
  className?: string
  delay?: number
}

export function PracticeIcon({ area, size = 24, className = "", delay = 0 }: PracticeIconProps) {
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay * 0.1,
      },
    },
  }

  const renderIcon = () => {
    switch (area) {
      case "criminal":
        return <Scale size={size} />
      case "realestate":
        return <Home size={size} />
      case "land":
        return <Map size={size} />
      case "consumer":
        return <ShoppingBag size={size} />
      case "arbitration":
        return <Briefcase size={size} />
      case "inheritance":
        return <FileCheck size={size} />
      case "medical":
        return <Heart size={size} />
      case "military":
        return <Shield size={size} />
      case "unjust-enrichment":
        return <Award size={size} />
      default:
        return <FileText size={size} />
    }
  }

  return (
    <motion.div className={`text-[#741717] ${className}`} variants={iconVariants} initial="hidden" animate="visible">
      {renderIcon()}
    </motion.div>
  )
}
