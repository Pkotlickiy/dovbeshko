"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Testimonial {
  text: string
  author: string
  rating: number
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  // Добавим обработку свайпов для мобильных устройств
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Свайп влево
      handleNext()
    }

    if (touchStart - touchEnd < -100) {
      // Свайп вправо
      handlePrevious()
    }
  }

  // Handle autoplay
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  const handlePrevious = () => {
    setAutoplay(false)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  return (
    <div
      className="relative mx-auto max-w-3xl px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Отзывы клиентов"
    >
      <div className="relative overflow-hidden rounded-xl bg-white p-1">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
            aria-live="polite"
            aria-atomic="true"
          >
            <Card className="border-none shadow-none overflow-hidden">
              <CardContent className="pt-6">
                <motion.div
                  className="mb-4 flex justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {Array(testimonials[currentIndex].rating)
                    .fill(0)
                    .map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ rotate: -30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                      >
                        <Star className="h-5 w-5 fill-[#741717] text-[#741717]" />
                      </motion.div>
                    ))}
                </motion.div>
                <motion.p
                  className="text-center text-lg text-[#603a30]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  "{testimonials[currentIndex].text}"
                </motion.p>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <motion.p
                  className="text-center font-medium text-[#741717]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {testimonials[currentIndex].author}
                </motion.p>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Добавим подсказку для мобильных устройств */}
      <div className="mt-2 text-center text-xs text-[#603a30] md:hidden">Свайпните для просмотра других отзывов</div>

      <div className="mt-6 flex justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          className="rounded-full border-[#741717]/20 hover:bg-[#741717]/10 hover:text-[#741717]"
          aria-label="Предыдущий отзыв"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplay(false)
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "bg-[#741717] w-4" : "bg-[#741717]/20"
              }`}
              aria-label={`Перейти к отзыву ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="rounded-full border-[#741717]/20 hover:bg-[#741717]/10 hover:text-[#741717]"
          aria-label="Следующий отзыв"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Следующий отзыв</span>
        </Button>
      </div>
    </div>
  )
}
