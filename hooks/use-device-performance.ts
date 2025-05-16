"use client"

import { useState, useEffect } from "react"

type PerformanceLevel = "low" | "medium" | "high"

export function useDevicePerformance(): PerformanceLevel {
  const [performanceLevel, setPerformanceLevel] = useState<PerformanceLevel>("medium")

  useEffect(() => {
    // Используем ref для отслеживания монтирования компонента
    let isMounted = true

    // Проверяем доступность API для определения производительности
    if (typeof window !== "undefined") {
      try {
        // Проверка на мобильное устройство
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        // Проверка на старые браузеры
        const isOldBrowser =
          !("IntersectionObserver" in window) || !("requestAnimationFrame" in window) || !("querySelector" in document)

        // Проверка на низкую производительность устройства
        const hasLowMemory = navigator.deviceMemory !== undefined && navigator.deviceMemory < 4
        const hasSlowProcessor = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4

        // Определение уровня производительности
        let newPerformanceLevel: PerformanceLevel
        if (isOldBrowser || (isMobile && (hasLowMemory || hasSlowProcessor))) {
          newPerformanceLevel = "low"
        } else if (isMobile || hasLowMemory || hasSlowProcessor) {
          newPerformanceLevel = "medium"
        } else {
          newPerformanceLevel = "high"
        }

        // Обновляем состояние только если компонент все еще смонтирован
        if (isMounted) {
          setPerformanceLevel(newPerformanceLevel)
        }
      } catch (error) {
        // В случае ошибки используем средний уровень производительности
        if (isMounted) {
          setPerformanceLevel("medium")
        }
      }
    }

    // Очистка при размонтировании
    return () => {
      isMounted = false
    }
  }, [])

  return performanceLevel
}
