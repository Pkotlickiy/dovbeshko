"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AnimatedSection, AnimatedItem } from "@/components/animated-section"

export function HeroSection() {
  return (
    <AnimatedSection className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#741717]/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-[#f0e9e4]/60 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-[#f8f5f2]/70 blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Decorative animated lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#741717]/0 via-[#741717]/30 to-[#741717]/0"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          x: ["-100%", "100%", "-100%"],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#741717]/0 via-[#741717]/30 to-[#741717]/0"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          x: ["100%", "-100%", "100%"],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="container relative grid items-center gap-6 px-4 md:grid-cols-2 md:px-6 lg:gap-10">
        <div className="flex flex-col gap-4">
          <AnimatedItem>
            <motion.span
              className="mb-2 inline-block rounded-full bg-[#f0e9e4] px-3 py-1 text-sm font-medium text-[#741717]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Адвокат в Санкт-Петербурге
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#741717]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Адвокат в Санкт-Петербурге
              <br />
              <span className="relative inline-block">
                Довбешко Светлана Юрьевна
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-[#741717]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-[#603a30] max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Профессиональная юридическая помощь в Санкт-Петербурге. Защита, которой можно доверять
            </motion.p>
          </AnimatedItem>

          <AnimatedItem delay={0.1}>
            <motion.p
              className="max-w-[600px] text-[#603a30] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="relative font-bold text-[#741717] inline-block text-lg md:text-xl lg:text-2xl">
                Светлана Юрьевна Довбешко
              </span>
              . Квалифицированная юридическая поддержка и защита ваших интересов во всех сферах права: от Земельного
              права и наследственных споров до уголовных дел и военных вопросов. Индивидуальный подход к каждому
              доверителю с ориентацией на эффективный результат.
            </motion.p>
          </AnimatedItem>

          <AnimatedItem delay={0.2}>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                asChild
                className="relative overflow-hidden bg-[#741717] text-white transition-all duration-300 hover:bg-[#603a30]"
              >
                <a href="#contact">
                  <span className="relative z-10">Записаться на консультацию</span>
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-[#8B0000] to-[#741717] opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-[#741717] text-[#741717] transition-all duration-300 hover:bg-[#741717]/10 hover:text-[#741717]"
              >
                <a href="#about">Узнать больше</a>
              </Button>
            </motion.div>
          </AnimatedItem>
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-[#741717]/20 shadow-xl md:h-[400px] md:w-[400px]">
            {/* Animated circular border */}
            <motion.div
              className="absolute -inset-1 rounded-full border-2 border-[#741717]/30"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#f0e9e4]/60 to-transparent"></div>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.jpg-RyEQTrwVeXneStNxuetx5ySxIMBtRW.jpeg"
              alt="Адвокат Довбешко Светлана Юрьевна - профессиональная юридическая помощь в Санкт-Петербурге"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <motion.div className="absolute inset-0 bg-gradient-to-t from-[#741717]/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
          </div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-[20%] h-8 w-8 rounded-full bg-[#741717]/20"
        initial={{ y: 0 }}
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-[15%] h-6 w-6 rounded-full bg-[#741717]/30"
        initial={{ y: 0 }}
        animate={{ y: [15, -15, 15] }}
        transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[10%] h-12 w-12 rounded-full border border-[#741717]/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[25%] h-10 w-10 rounded-full border border-[#741717]/20"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Animated diagonal lines */}
      <motion.div
        className="absolute top-0 left-0 w-[150%] h-1 bg-[#741717]/10 origin-left"
        style={{ rotate: "30deg", translateY: "50vh" }}
        animate={{
          x: ["-100%", "100%", "-100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute top-0 left-0 w-[150%] h-1 bg-[#f0e9e4]/50 origin-left"
        style={{ rotate: "-30deg", translateY: "30vh" }}
        animate={{
          x: ["100%", "-100%", "100%"],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </AnimatedSection>
  )
}
