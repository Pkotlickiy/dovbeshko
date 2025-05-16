"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden bg-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <button
            className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
            onClick={() => toggleItem(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="font-medium text-lg">{item.question}</span>
            <motion.div animate={{ rotate: activeIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="h-5 w-5 text-[#741717]" />
            </motion.div>
          </button>

          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                id={`faq-answer-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 border-t border-gray-100">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
