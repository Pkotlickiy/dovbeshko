"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { PracticeIcon, type PracticeArea } from "./practice-icon"
import { cn } from "@/lib/utils"

interface PracticeAreaItem {
  id: PracticeArea
  title: string
  description: string
  href: string
}

const practiceAreas: PracticeAreaItem[] = [
  {
    id: "criminal",
    title: "Уголовное право",
    description: "Защита по уголовным делам на всех стадиях процесса",
    href: "/practice/criminal",
  },
  {
    id: "realestate",
    title: "Недвижимость",
    description: "Сопровождение сделок с недвижимостью и защита прав собственников",
    href: "/practice/realestate",
  },
  {
    id: "land",
    title: "Земельное право",
    description: "Решение споров, связанных с земельными участками",
    href: "/practice/land",
  },
  {
    id: "consumer",
    title: "Защита прав потребителей",
    description: "Помощь в спорах с продавцами и производителями",
    href: "/practice/consumer",
  },
  {
    id: "arbitration",
    title: "Арбитражные споры",
    description: "Представительство в арбитражных судах",
    href: "/practice/arbitration",
  },
  {
    id: "inheritance",
    title: "Наследственные дела",
    description: "Помощь в оформлении и разделе наследства",
    href: "/practice/inheritance",
  },
  {
    id: "medical",
    title: "Медицинское право",
    description: "Защита прав пациентов и медицинских работников",
    href: "/practice/medical",
  },
  {
    id: "military",
    title: "Военное право",
    description: "Защита прав военнослужащих и призывников",
    href: "/practice/military",
  },
  {
    id: "unjust-enrichment",
    title: "Неосновательное обогащение",
    description: "Возврат неправомерно полученных средств",
    href: "/practice/unjust-enrichment",
  },
]

export function PracticeAreasShowcase() {
  const [activeArea, setActiveArea] = useState<PracticeArea | null>(null)

  // Анимация контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  // Анимация элементов
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-serif font-bold text-center mb-12 text-[#741717]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Области практики
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {practiceAreas.map((area, index) => (
            <Link href={area.href} key={area.id}>
              <motion.div
                className={cn(
                  "flex flex-col items-center p-6 rounded-lg transition-all duration-300 cursor-pointer h-full",
                  "hover:shadow-lg hover:bg-gray-50 border border-transparent hover:border-gray-200",
                  activeArea === area.id && "bg-gray-50 shadow-lg border-gray-200",
                )}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setActiveArea(area.id)}
                onMouseLeave={() => setActiveArea(null)}
              >
                <PracticeIcon area={area.id} size={48} className="mb-4" delay={index} />
                <h3 className="text-xl font-semibold text-center mb-2">{area.title}</h3>
                <p className="text-gray-600 text-center text-sm">{area.description}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
