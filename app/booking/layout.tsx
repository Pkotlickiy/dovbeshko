import type React from "react"
import { Header } from "@/components/header"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Перейти к содержимому
      </a>
      <Header />
      <div id="main-content">{children}</div>
      <ScrollToTop />
    </>
  )
}
