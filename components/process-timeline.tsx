"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface ProcessStep {
  title: string
  description: string
  icon?: ReactNode
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="relative">
      {/* Вертикальная линия */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2" />

      {steps.map((step, index) => {
        const isEven = index % 2 === 0
        const isLast = index === steps.length - 1

        return (
          <div key={index} className="relative mb-12 last:mb-0">
            <motion.div
              className={`flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""} relative z-10`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Иконка шага */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#741717] flex items-center justify-center shadow-md">
                  {step.icon}
                </div>
              </div>

              {/* Контент */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2 text-[#741717]">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Соединительная линия к следующему шагу */}
            {!isLast && (
              <motion.div
                className="absolute left-4 md:left-1/2 w-0.5 bg-[#741717] transform md:-translate-x-1/2"
                style={{ top: "2rem", height: "3rem" }}
                initial={{ scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
