"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useDevicePerformance } from "@/hooks/use-device-performance"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AnimatedHeroBackgroundProps {
  className?: string
  variant?: "primary" | "secondary" | "dark"
  children: ReactNode
  withPattern?: boolean
  withLines?: boolean
  withShapes?: boolean
}

export function AnimatedHeroBackground({
  className,
  variant = "primary",
  children,
  withPattern = true,
  withLines = true,
  withShapes = true,
}: AnimatedHeroBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const devicePerformance = useDevicePerformance()

  // Определяем настройки анимаций в зависимости от устройства и предпочтений
  const shouldAnimate = !prefersReducedMotion && devicePerformance !== "low"
  const shouldUseComplexEffects = !prefersReducedMotion && devicePerformance === "high"

  // Цветовые схемы для разных вариантов
  const variantStyles = {
    primary: "bg-gradient-to-br from-[#741717] to-[#8B0000]",
    secondary: "bg-gradient-to-br from-[#1a1a2e] to-[#16213e]",
    dark: "bg-gradient-to-br from-[#121212] to-[#2d2d2d]",
  }

  // Количество элементов в зависимости от производительности
  const linesCount = devicePerformance === "low" ? 3 : devicePerformance === "medium" ? 5 : 7
  const shapesCount = devicePerformance === "low" ? 2 : devicePerformance === "medium" ? 4 : 6

  return (
    <div className={cn("relative overflow-hidden", variantStyles[variant], className)}>
      {/* Фоновый узор */}
      {withPattern && shouldUseComplexEffects && (
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}

      {/* Анимированные линии */}
      {withLines && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Горизонтальные линии */}
          {shouldAnimate &&
            Array.from({ length: linesCount }).map((_, i) => (
              <motion.div
                key={`h-line-${i}`}
                className="absolute h-px bg-white opacity-10"
                style={{
                  left: 0,
                  right: 0,
                  top: `${15 + (i * 70) / linesCount}%`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.1 }}
                transition={{
                  duration: 1.5 + i * 0.2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}

          {/* Вертикальные линии */}
          {shouldAnimate &&
            Array.from({ length: linesCount }).map((_, i) => (
              <motion.div
                key={`v-line-${i}`}
                className="absolute w-px bg-white opacity-10"
                style={{
                  top: 0,
                  bottom: 0,
                  left: `${15 + (i * 70) / linesCount}%`,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.1 }}
                transition={{
                  duration: 1.5 + i * 0.2,
                  delay: 0.2 + i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
        </div>
      )}

      {/* Геометрические фигуры */}
      {withShapes && shouldAnimate && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: shapesCount }).map((_, i) => {
            // Определяем тип фигуры: 0 - квадрат, 1 - круг, 2 - треугольник
            const shapeType = i % 3
            // Размер фигуры
            const size = 20 + i * 10
            // Позиция фигуры
            const posX = 10 + ((i * 15) % 80)
            const posY = 10 + ((i * 20 + 15) % 80)

            return (
              <motion.div
                key={`shape-${i}`}
                className={cn(
                  "absolute border border-white opacity-10",
                  shapeType === 0 ? "" : shapeType === 1 ? "rounded-full" : "",
                )}
                style={{
                  width: size,
                  height: size,
                  left: `${posX}%`,
                  top: `${posY}%`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                  rotate: shapeType === 2 ? -45 : 0,
                }}
                animate={{
                  opacity: 0.1,
                  scale: 1,
                  rotate: shapeType === 2 ? 0 : 0,
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              >
                {shapeType === 2 && (
                  <div className="w-full h-full border-t border-l border-white transform rotate-45" />
                )}
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Диагональные линии для создания глубины */}
      {withShapes && shouldUseComplexEffects && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`diagonal-${i}`}
              className="absolute bg-white opacity-5"
              style={{
                height: 1,
                width: "150%",
                top: `${30 + i * 20}%`,
                left: "-25%",
                transformOrigin: "center",
                transform: `rotate(${-20 + i * 15}deg)`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 2,
                delay: 0.5 + i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Контент */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
