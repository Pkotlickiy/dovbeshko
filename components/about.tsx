"use client"

import { GraduationCap, Award, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedSection, AnimatedItem } from "@/components/animated-section"
import { PageDivider } from "@/components/page-divider"
import { formatNumberedList } from "@/lib/utils"

export function About() {
  return (
    <AnimatedSection id="about" className="relative bg-white py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-[#f8f5f2] blur-3xl" />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <AnimatedItem>
              <div className="inline-block rounded-full bg-[#741717]/10 px-3 py-1 text-sm font-medium text-[#741717]">
                Рег. номер 78/8409
              </div>
            </AnimatedItem>

            <AnimatedItem delay={0.1}>
              <h2 className="font-playfair text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl">
                Об адвокате
              </h2>

              {/* Simple divider */}
              <PageDivider variant="simple" className="my-2" />
            </AnimatedItem>

            <AnimatedItem delay={0.2}>
              <p className="text-[#603a30] first-letter:float-left first-letter:mr-2 first-letter:font-playfair first-letter:text-4xl first-letter:font-bold first-letter:text-[#741717] md:text-lg/relaxed whitespace-pre-line">
                {formatNumberedList(`Довбешко Светлана Юрьевна — адвокат с обширным опытом успешной практики в различных отраслях права. Моя
                профессиональная философия строится на трех принципах: глубокое погружение в каждое дело, индивидуальный
                подход к каждому клиенту и безупречная репутация, основанная на реальных результатах. Я не просто решаю
                юридические проблемы — я защищаю ваши интересы с максимальной эффективностью и преданностью делу.`)}
              </p>
            </AnimatedItem>

            <div className="space-y-4">
              {[
                { icon: <GraduationCap className="h-5 w-5 text-[#741717]" />, text: "Высшее юридическое образование" },
                {
                  icon: <Award className="h-5 w-5 text-[#741717]" />,
                  text: "Член адвокатской палаты Санкт-Петербурга",
                },
                { icon: <BookOpen className="h-5 w-5 text-[#741717]" />, text: "Постоянное повышение квалификации" },
              ].map((item, index) => (
                <AnimatedItem key={index} delay={0.3 + index * 0.1}>
                  <motion.div
                    className="flex items-center gap-3 rounded-lg border border-transparent bg-[#f8f5f2] p-3 transition-all duration-300 hover:border-[#741717]/20"
                    whileHover={{ x: 5 }}
                    whileTap={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="rounded-full bg-white p-2 shadow-sm"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-[#603a30]">{item.text}</span>
                    <motion.div
                      className="ml-auto h-5 w-0 rounded-full bg-[#741717]/10"
                      whileHover={{ width: 5 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </AnimatedItem>
              ))}
            </div>
          </div>

          <AnimatedItem delay={0.2}>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-[400px] w-[300px] overflow-hidden rounded-lg shadow-xl">
                {/* Simple frame */}
                <div className="absolute inset-0 border border-[#741717]/10"></div>
                <div className="absolute inset-0 border-l-4 border-[#741717]/10"></div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -right-6 -top-6 h-12 w-12 rounded-full border border-[#741717]/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                  className="absolute -left-6 -bottom-6 h-12 w-12 rounded-full border border-[#741717]/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-[#741717]/10 to-transparent"></div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-Udp0wDLViImbt83yDgLrMUnmlwPOrn.jpeg"
                  alt="Адвокат Довбешко Светлана Юрьевна в профессиональной обстановке"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-[#741717]/30 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />

                {/* Signature-like element */}
                <motion.div
                  className="absolute bottom-4 right-4 font-playfair text-sm text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.8 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  С.Ю. Довбешко
                </motion.div>
              </div>
            </motion.div>
          </AnimatedItem>
        </div>
      </div>
    </AnimatedSection>
  )
}
