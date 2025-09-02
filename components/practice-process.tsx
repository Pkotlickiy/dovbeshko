"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

interface ProcessStep {
  title: string
  description: string
  icon: React.ReactNode
}

interface PracticeProcessProps {
  steps: ProcessStep[]
}

export function PracticeProcess({ steps }: PracticeProcessProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-[#741717]">Как я работаю</h2>
            <p className="text-lg text-gray-600">Пошаговый процесс работы для достижения наилучшего результата</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#741717] text-white">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Шаг {index + 1}</div>
                        <CardTitle className="text-xl text-[#741717]">{step.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
