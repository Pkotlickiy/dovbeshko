import type React from "react"
import { ScrollToTop } from "@/components/scroll-to-top"

export function PracticeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <ScrollToTop />
    </>
  )
}

export default PracticeLayout
