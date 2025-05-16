import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { PracticeAreas } from "@/components/practice-areas"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { CaseTimeline } from "@/components/case-timeline"
import { FaqSection } from "@/components/faq-section"
import { Contact } from "@/components/contact"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "Адвокат Довбешко С.Ю. | Юридические услуги в Санкт-Петербурге",
  description:
    "Профессиональная юридическая помощь в Санкт-Петербурге. Защита ваших прав и интересов в уголовных, военных и гражданских делах.",
  keywords: ["адвокат", "юрист", "Санкт-Петербург", "юридические услуги", "правовая помощь"],
}

export default function Home() {
  return (
    <>
      <main className="section-padding">
        <HeroSection />
        <PracticeAreas />
        <Services />
        <About />
        <Testimonials />
        <CaseTimeline />
        <FaqSection />
        <Contact />
      </main>
      <ScrollToTop />
    </>
  )
}
