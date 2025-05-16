"use client"

import { useState, useEffect } from "react"

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Проверяем доступность API для определения предпочтений пользователя
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

      // Устанавливаем начальное значение
      setPrefersReducedMotion(mediaQuery.matches)

      // Функция для обновления значения при изменении предпочтений
      const handleChange = () => {
        setPrefersReducedMotion(mediaQuery.matches)
      }

      // Добавляем слушатель событий
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange)
        return () => {
          mediaQuery.removeEventListener("change", handleChange)
        }
      } else if (mediaQuery.addListener) {
        // Для старых браузеров
        mediaQuery.addListener(handleChange)
        return () => {
          mediaQuery.removeListener(handleChange)
        }
      }
    }
  }, [])

  return prefersReducedMotion
}
