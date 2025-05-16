"use client"

import { useState, useEffect } from "react"

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Используем ref для отслеживания монтирования компонента
    let isMounted = true

    // Проверяем доступность API для определения предпочтений пользователя
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

      // Устанавливаем начальное значение
      if (isMounted) {
        setPrefersReducedMotion(mediaQuery.matches)
      }

      // Функция для обновления значения при изменении предпочтений
      const handleChange = () => {
        if (isMounted) {
          setPrefersReducedMotion(mediaQuery.matches)
        }
      }

      // Добавляем слушатель событий
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange)
        return () => {
          isMounted = false
          mediaQuery.removeEventListener("change", handleChange)
        }
      } else if (mediaQuery.addListener) {
        // Для старых браузеров
        mediaQuery.addListener(handleChange)
        return () => {
          isMounted = false
          mediaQuery.removeListener(handleChange)
        }
      }
    }

    return () => {
      isMounted = false
    }
  }, [])

  return prefersReducedMotion
}
