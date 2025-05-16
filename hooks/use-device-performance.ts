"use client"

import { useState, useEffect } from "react"

type PerformanceLevel = "low" | "medium" | "high"

export function useDevicePerformance(): PerformanceLevel {
  const [performanceLevel, setPerformanceLevel] = useState<PerformanceLevel>("medium")

  useEffect(() => {
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
        if (isOldBrowser || (isMobile && (hasLowMemory || hasSlowProcessor))) {
          setPerformanceLevel("low")
        } else if (isMobile || hasLowMemory || hasSlowProcessor) {
          setPerformanceLevel("medium")
        } else {
          setPerformanceLevel("high")
        }
      } catch (error) {
        // В случае ошибки используем средний уровень производительности
        setPerformanceLevel("medium")
      }
    }
  }, [])

  return performanceLevel
}
