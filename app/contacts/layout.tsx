import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Контакты | Адвокат Довбешко С.Ю.",
  description:
    "Свяжитесь с адвокатом Довбешко С.Ю. для получения юридической консультации. Адрес, телефон и форма обратной связи.",
}

interface ContactsLayoutProps {
  children: ReactNode
}

export default function ContactsLayout({ children }: ContactsLayoutProps) {
  return <>{children}</>
}
