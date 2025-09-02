"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items = [], className = "" }: BreadcrumbsProps) {
  // Если items пустой или не определен, не рендерим компонент
  if (!items || items.length === 0) {
    return null
  }

  return (
    <motion.nav
      className={`text-sm ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
            {index === items.length - 1 ? (
              <span className="text-[#741717] font-semibold" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-gray-600 hover:text-[#741717] transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  )
}
