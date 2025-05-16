import type { Metadata } from "next"
import { LegalServicesShowcase } from "@/components/legal-services-showcase"
import { SEOHead } from "@/components/seo-head"
import { ServiceStructuredData } from "@/components/service-structured-data"
import { AnimatedHeroBackground } from "@/components/animated-hero-background"

export const metadata: Metadata = {
  title: "Юридические услуги | Адвокат Довбешко С.Ю.",
  description:
    "Профессиональные юридические услуги адвоката Довбешко С.Ю. включают представительство в суде, консультации, подготовку документов и другие виды правовой помощи.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <SEOHead
        title="Юридические услуги | Адвокат Довбешко С.Ю."
        description="Профессиональные юридические услуги адвоката Довбешко С.Ю. включают представительство в суде, консультации, подготовку документов и другие виды правовой помощи."
        canonicalUrl="/services"
      />
      <ServiceStructuredData
        name="Юридические услуги адвоката Довбешко С.Ю."
        description="Профессиональные юридические услуги адвоката Довбешко С.Ю. включают представительство в суде, консультации, подготовку документов и другие виды правовой помощи."
        url="https://example.com/services"
      />

      <AnimatedHeroBackground className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Юридические услуги</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Профессиональная юридическая помощь в различных областях права. Индивидуальный подход к каждому клиенту и
            нацеленность на результат.
          </p>
        </div>
      </AnimatedHeroBackground>

      <div className="container mx-auto px-4 py-12">
        <LegalServicesShowcase />
      </div>
    </main>
  )
}
