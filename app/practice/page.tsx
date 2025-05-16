"use client"

import { motion } from "framer-motion"
import { PracticeAreasShowcase } from "@/components/practice-areas-showcase"
import { SEOHead } from "@/components/seo-head"
import { ServiceStructuredData } from "@/components/service-structured-data"
import { ChevronDown } from "lucide-react"
import { useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { AnimatedHeroBackground } from "@/components/animated-hero-background"

export default function PracticePage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
  }

  // Варианты анимации для текста
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <SEOHead
        title="Области практики | Адвокат Довбешко С.Ю."
        description="Специализации адвоката Довбешко С.Ю. включают уголовное право, военное право, недвижимость, земельное право, защиту прав потребителей и другие области юридической практики."
        canonicalUrl="/practice"
      />
      <ServiceStructuredData
        name="Области практики адвоката Довбешко С.Ю."
        description="Специализации адвоката Довбешко С.Ю. включают уголовное право, военное право, недвижимость, земельное право, защиту прав потребителей и другие области юридической практики."
        url="https://example.com/practice"
      />

      {/* Анимированный герой с новым компонентом фона */}
      <AnimatedHeroBackground className="min-h-[70vh] flex items-center justify-center">
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-6 p-2 border border-white/30 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <motion.div
                  className="text-white"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Области практики
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Адвокат Довбешко С.Ю. специализируется на различных областях права, предоставляя квалифицированную
              юридическую помощь физическим и юридическим лицам.
            </motion.p>

            <motion.div variants={textVariants} initial="hidden" animate="visible" custom={2}>
              <button
                onClick={scrollToContent}
                className="inline-flex items-center gap-2 text-white border border-white/30 rounded-full px-6 py-3 transition-all hover:bg-white/10 backdrop-blur-sm"
              >
                Узнать больше
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                  <ChevronDown size={20} />
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedHeroBackground>

      {/* Основной контент */}
      <div ref={contentRef}>
        <PracticeAreasShowcase />
      </div>
    </main>
  )
}
