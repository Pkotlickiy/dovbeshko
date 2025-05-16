"use client"

import { motion } from "framer-motion"

export function PageDivider() {
  return (
    <div className="flex justify-center py-8">
      <motion.div
        className="w-16 h-0.5 bg-[#741717]"
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
    </div>
  )
}
