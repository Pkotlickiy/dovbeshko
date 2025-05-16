import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Юридические услуги | Адвокат Довбешко Светлана Юрьевна",
  description: "Профессиональные юридические услуги адвоката Довбешко Светланы Юрьевны в Санкт-Петербурге",
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
