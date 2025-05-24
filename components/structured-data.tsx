"use client"

import Script from "next/script"

interface StructuredDataProps {
  data: any
}

export function StructuredData({ data }: StructuredDataProps) {
  // Создаем безопасную версию JSON.stringify, которая обрабатывает undefined значения
  const safeStringify = (obj: any): string => {
    return JSON.stringify(obj, (key, value) => {
      // Если значение undefined, заменяем его на null
      if (value === undefined) {
        return null
      }

      // Если это массив, проверяем его перед использованием
      if (Array.isArray(value)) {
        return value.map((item) => (item === undefined ? null : item))
      }

      return value
    })
  }

  return (
    <Script
      id={`structured-data-${Math.random().toString(36).substring(2, 9)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeStringify(data) }}
    />
  )
}
