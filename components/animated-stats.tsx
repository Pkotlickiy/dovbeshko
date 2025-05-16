"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface Stat {
  value: number | string
  label: string
  suffix?: string
}

interface AnimatedStatsProps {
  stats: Stat[]
}

export function AnimatedStats({ stats }: AnimatedStatsProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [counts, setCounts] = useState<(number | string)[]>(stats.map(() => 0))

  useEffect(() => {
    if (inView) {
      controls.start("visible")

      // Анимация чисел
      stats.forEach((stat, index) => {
        if (typeof stat.value === "number") {
          let startTimestamp: number
          const duration = 2000 // 2 секунды на анимацию
          const startValue = 0
          const endValue = stat.value

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)

            setCounts((prev) => {
              const newCounts = [...prev]
              newCounts[index] = Math.floor(progress * (endValue - startValue) + startValue)
              return newCounts
            })

            if (progress < 1) {
              window.requestAnimationFrame(step)
            }
          }

          window.requestAnimationFrame(step)
        } else {
          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = stat.value
            return newCounts
          })
        }
      })
    }
  }, [inView, controls, stats])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="py-16 bg-[#741717] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} className="text-center" variants={itemVariants}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {counts[index]}
                {stat.suffix}
              </div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
