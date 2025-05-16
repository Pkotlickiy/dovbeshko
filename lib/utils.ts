import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function formatNumberedList(text: string): string {
  // Replace numbered list patterns like "1. " with proper formatting
  return text.replace(/(\d+\.\s)/g, (match) => {
    return `${match}`
  })
}
