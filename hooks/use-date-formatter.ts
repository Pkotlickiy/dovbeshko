"use client"

import { useMemo } from "react"

type DateFormatterOptions = {
  locale?: string
  dateStyle?: "full" | "long" | "medium" | "short"
  timeStyle?: "full" | "long" | "medium" | "short"
}

export function useDateFormatter(options: DateFormatterOptions = {}) {
  const { locale = "ru-RU", dateStyle = "long", timeStyle } = options

  const formatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      dateStyle,
      ...(timeStyle && { timeStyle }),
    })
  }, [locale, dateStyle, timeStyle])

  const formatDate = (date: Date | string | number) => {
    if (typeof date === "string" || typeof date === "number") {
      date = new Date(date)
    }
    return formatter.format(date)
  }

  return formatDate
}
