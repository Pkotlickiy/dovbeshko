"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AnimatedSection, AnimatedItem } from "@/components/animated-section"

export function HeroSection() {
  return (
    <AnimatedSection className="relative overflow-hidden bg-gradient-to-br from-[#f8f5f2] via-white to-[#f0e9e4] py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-[#741717]/5 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-[#741717]/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-[#c4bab3]/20 blur-2xl" />
      </div>

      <div className="container relative grid items-center gap-6 px-4 md:grid-cols-2 md:px-6 lg:gap-10">
        <div className="flex flex-col gap-4">
          <AnimatedItem>
            <span className="mb-2 inline-block rounded-full bg-[#741717]/10 px-3 py-1 text-sm font-medium text-[#741717]">
              Адвокат в Санкт-Петербурге
            </span>
            <h1 className="font-playfair text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl lg:text-6xl">
              Ваш надежный адвокат
            </h1>
          </AnimatedItem>

          <AnimatedItem delay={0.1}>
            <p className="max-w-[600px] text-[#603a30] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              <span className="relative font-bold text-[#741717] inline-block text-lg md:text-xl lg:text-2xl">
                Светлана Юрьевна Довбешко
                <span className="absolute -bottom-[3px] left-0 w-full h-[2px] bg-gradient-to-r from-[#741717] to-[#741717]/20"></span>
              </span>
              . Профессиональная защита ваших прав и интересов в уголовных, военных и гражданских делах с индивидуальным
              подходом и нацеленностью на результат.
            </p>
          </AnimatedItem>

          <AnimatedItem delay={0.2}>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
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
            </div>
          </AnimatedItem>
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-white shadow-xl md:h-[400px] md:w-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#741717]/20 to-transparent opacity-60"></div>
            <Image
              src="/confident-female-lawyer.png"
              alt="Адвокат Довбешко Светлана Юрьевна"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <motion.div className="absolute inset-0 bg-gradient-to-t from-[#741717]/30 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>

      <motion.div
        className="absolute top-20 left-10 h-20 w-20 rounded-full border border-[#741717]/20 bg-transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 h-32 w-32 rounded-full border border-[#741717]/20 bg-transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-[20%] h-6 w-6 rounded-full bg-[#741717]/10"
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-[15%] h-4 w-4 rounded-full bg-[#741717]/20"
        initial={{ y: 0 }}
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </AnimatedSection>
  )
}
