"use client"

import { useEffect } from "react"
import { useAnimate, useInView } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useDevicePerformance } from "@/hooks/use-device-performance"

interface UseAnimationControlsOptions {
  threshold?: number
  once?: boolean
  delay?: number
  duration?: number
}

export function useAnimationControls(options: UseAnimationControlsOptions = {}) {
  const { threshold = 0.1, once = true, delay = 0, duration = 0.5 } = options

  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { threshold, once })
  const prefersReducedMotion = useReducedMotion()
  const devicePerformance = useDevicePerformance()

  // Определяем, нужно ли применять анимации
  const shouldAnimate = !prefersReducedMotion && devicePerformance !== "low"

  useEffect(() => {
    if (isInView && shouldAnimate) {
      animate(scope.current, { opacity: 1, y: 0 }, { duration, delay, ease: "easeOut" })
    } else if (!once) {
      animate(scope.current, { opacity: 0, y: 20 }, { duration: 0 })
    }
  }, [isInView, shouldAnimate, animate, scope, duration, delay, once])

  return { scope, isInView, shouldAnimate }
}
