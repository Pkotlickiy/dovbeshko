"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { FAQ } from "@/types/faq"

interface FAQAccordionProps {
  items: FAQ[]
  className?: string
}

export function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index)
        return (
          <Card key={index} className="border border-gray-200">
            <CardHeader className="pb-3">
              <Button
                variant="ghost"
                className="w-full justify-between text-left p-0 h-auto font-semibold text-gray-900"
                onClick={() => toggleItem(index)}
              >
                <span className="text-lg">{item.question}</span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </Button>
            </CardHeader>
            {isOpen && (
              <CardContent className="pt-0">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">{item.answer}</div>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}

// Export with different casing for compatibility
export { FAQAccordion as FaqAccordion }
export default FAQAccordion
