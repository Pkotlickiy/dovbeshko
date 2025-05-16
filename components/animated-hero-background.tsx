"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useDevicePerformance } from "@/hooks/use-device-performance"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

type AnimatedHeroBackgroundProps = {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "dark"
}

export function AnimatedHeroBackground({ children, className, variant = "primary" }: AnimatedHeroBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const devicePerformance = useDevicePerformance()

  // Определяем настройки анимаций в зависимости от устройства и предпочтений
  const { shouldAnimate, shouldUseBackgroundEffects, decorElementsCount } = useMemo(() => {
    return {
      shouldAnimate: !prefersReducedMotion && devicePerformance !== "low",
      shouldUseBackgroundEffects: !prefersReducedMotion && devicePerformance === "high",
      decorElementsCount: prefersReducedMotion
        ? 0
        : devicePerformance === "low"
          ? 2
          : devicePerformance === "medium"
            ? 4
            : 6,
    }
  }, [prefersReducedMotion, devicePerformance])

  // Определяем цвета в зависимости от варианта
  const colors = useMemo(() => {
    switch (variant) {
      case "primary":
        return {
          from: "#741717",
          to: "#8B0000",
          accent: "rgba(255, 255, 255, 0.1)",
        }
      case "secondary":
        return {
          from: "#1a365d",
          to: "#2c5282",
          accent: "rgba(255, 255, 255, 0.1)",
        }
      case "dark":
        return {
          from: "#1a202c",
          to: "#2d3748",
          accent: "rgba(255, 255, 255, 0.05)",
        }
      default:
        return {
          from: "#741717",
          to: "#8B0000",
          accent: "rgba(255, 255, 255, 0.1)",
        }
    }
  }, [variant])

  // Варианты анимации для линий
  const lineVariants = useMemo(() => {
    return {
      hidden: { scaleY: 0, opacity: 0 },
      visible: (i: number) => ({
        scaleY: 1,
        opacity: 0.3,
        transition: {
          delay: i * 0.1,
          duration: 1,
          ease: "easeOut",
        },
      }),
    }
  }, [])

  // Варианты анимации для геометрических фигур
  const shapeVariants = useMemo(() => {
    return {
      hidden: { opacity: 0, scale: 0 },
      visible: (i: number) => ({
        opacity: 0.2,
        scale: 1,
        transition: {
          delay: i * 0.2,
          duration: 0.8,
          ease: "easeOut",
        },
      }),
    }
  }, [])

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
      }}
    >
      {/* Сетка - для всех устройств */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Вертикальные линии - для средних и высоких устройств */}
      {shouldAnimate && (
        <div className="absolute inset-0">
          {[15, 35, 65, 85].slice(0, devicePerformance === "low" ? 2 : 4).map((position, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute top-0 w-[1px] h-full bg-white"
              style={{ left: `${position}%` }}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            />
          ))}
        </div>
      )}

      {/* Геометрические фигуры - только для высокопроизводительных устройств */}
      {shouldUseBackgroundEffects && (
        <>
          {Array.from({ length: decorElementsCount }).map((_, i) => {
            // Определяем тип фигуры: 0 - круг, 1 - квадрат, 2 - треугольник
            const shapeType = i % 3

            // Базовые стили для всех фигур
            const baseStyles = {
              position: "absolute",
              top: `${10 + ((i * 15) % 70)}%`,
              left: `${5 + ((i * 20) % 90)}%`,
              opacity: 0.2,
              backgroundColor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              width: `${20 + ((i * 5) % 15)}px`,
              height: `${20 + ((i * 5) % 15)}px`,
            } as React.CSSProperties

            // Дополнительные стили в зависимости от типа фигуры
            let additionalStyles = {}

            if (shapeType === 0) {
              // Круг
              additionalStyles = {
                borderRadius: "50%",
              }
            } else if (shapeType === 1) {
              // Квадрат (уже есть в базовых стилях)
              additionalStyles = {
                transform: `rotate(${45 * i}deg)`,
              }
            } else {
              // Треугольник (используем clip-path)
              additionalStyles = {
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }
            }

            return (
              <motion.div
                key={`shape-${i}`}
                style={{ ...baseStyles, ...additionalStyles }}
                variants={shapeVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              />
            )
          })}
        </>
      )}

      {/* Диагональные линии - для всех устройств */}
      <div className="absolute inset-0 opacity-10">
        {shouldAnimate &&
          Array.from({ length: Math.min(4, decorElementsCount) }).map((_, i) => (
            <motion.div
              key={`diagonal-${i}`}
              className="absolute bg-white"
              style={{
                height: "1px",
                width: "100%",
                top: `${20 + i * 20}%`,
                transform: "rotate(-35deg)",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: 1,
                opacity: 0.2,
                transition: { delay: i * 0.2, duration: 1.5, ease: "easeOut" },
              }}
            />
          ))}
      </div>

      {/* Контент */}
      {children}
    </div>
  )
}
