"use client"

import { useState, useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { cn } from "@/lib/utils"
import { Cormorant, Cinzel } from "next/font/google"

// Импортируем изящный шрифт Cormorant для логотипа
const cormorantFont = Cormorant({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant-logo",
})

// Импортируем тонкий шрифт Cinzel для подписи
const cinzelFont = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-cinzel-logo",
})

interface AnimatedLogoProps {
  isScrolled: boolean
  isMobile: boolean
  className?: string
}

export function AnimatedLogo({ isScrolled, isMobile, className }: AnimatedLogoProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const controls = useAnimationControls()
  const letterControls = useAnimationControls()
  const subtitleControls = useAnimationControls()
  const decorationControls = useAnimationControls()

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    // Устанавливаем флаг загрузки и запускаем последовательность анимаций
    setIsLoaded(true)

    // Если пользователь предпочитает уменьшенное движение, показываем логотип сразу
    if (mediaQuery.matches) {
      controls.set("visible")
      letterControls.set("visible")
      subtitleControls.set("visible")
      decorationControls.set("visible")
    } else {
      // Запускаем последовательность анимаций
      const sequence = async () => {
        await controls.start("initial")
        await letterControls.start("visible")
        await subtitleControls.start("visible")
        await decorationControls.start("visible")
      }
      sequence()
    }

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [controls, letterControls, subtitleControls, decorationControls])

  // Размер логотипа в зависимости от прокрутки
  const logoSize = isScrolled ? "text-2xl" : "text-3xl"
  const subtitleSize = isScrolled ? "text-xs" : "text-sm"

  // Основной контейнер логотипа
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    initial: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  // Анимация для букв логотипа
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1], // Cubic bezier для более изысканного движения
      },
    },
  }

  // Анимация для каждой буквы
  const singleLetterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateY: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  }

  // Анимация для подзаголовка
  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.7,
        ease: "easeOut",
      },
    },
  }

  // Анимация для декоративных элементов
  const decorationVariants = {
    hidden: {
      opacity: 0,
      width: "0%",
    },
    visible: {
      opacity: 1,
      width: "100%",
      transition: {
        duration: 0.8,
        delay: 0.9,
        ease: "easeOut",
      },
    },
  }

  // Анимация при наведении
  const hoverVariants = {
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      className={cn("relative flex flex-col items-center", className)}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      whileHover="hover"
      variants={hoverVariants}
    >
      <div className="flex flex-col items-center">
        {/* Декоративная линия сверху */}
        <motion.div
          className="h-[0.5px] bg-gradient-to-r from-transparent via-[#741717]/20 to-transparent mb-1.5"
          initial="hidden"
          animate={decorationControls}
          variants={decorationVariants}
        />

        {/* Логотип "SUD" */}
        <motion.div
          className="text-center relative"
          initial="hidden"
          animate={letterControls}
          variants={letterVariants}
        >
          <div
            className={cn(
              "font-light tracking-widest text-[#741717] transition-all duration-300 flex justify-center",
              logoSize,
              cormorantFont.className,
            )}
            style={{
              letterSpacing: "0.2em",
              fontFeatureSettings: "'salt' on, 'ss01' on, 'ss02' on",
              fontVariationSettings: "'wght' 300",
            }}
          >
            {/* Анимируем каждую букву отдельно */}
            <motion.span variants={singleLetterVariants} className="inline-block origin-bottom">
              S
            </motion.span>
            <motion.span variants={singleLetterVariants} className="inline-block origin-bottom px-1">
              U
            </motion.span>
            <motion.span variants={singleLetterVariants} className="inline-block origin-bottom">
              D
            </motion.span>
          </div>

          {/* Подзаголовок "адвокат" */}
          <motion.div
            className={cn(
              "uppercase tracking-widest text-gray-500 transition-all duration-300",
              subtitleSize,
              "font-light",
              cinzelFont.className,
            )}
            style={{ letterSpacing: "0.25em" }}
            initial="hidden"
            animate={subtitleControls}
            variants={subtitleVariants}
          >
            адвокат
          </motion.div>
        </motion.div>

        {/* Декоративная линия снизу */}
        <motion.div
          className="h-[0.5px] bg-gradient-to-r from-transparent via-[#741717]/20 to-transparent mt-1.5"
          initial="hidden"
          animate={decorationControls}
          variants={decorationVariants}
        />
      </div>
    </motion.div>
  )
}
