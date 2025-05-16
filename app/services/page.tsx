import type { Metadata } from "next"
import { LegalServicesShowcase } from "@/components/legal-services-showcase"
import { SEOHead } from "@/components/seo-head"
import { ServiceStructuredData } from "@/components/service-structured-data"
import { AnimatedHeroBackground } from "@/components/animated-hero-background"

export const metadata: Metadata = {
  title: "Юридическая помощь в СПб | Адвокат Довбешко | Все виды права",
  description:
    "Профессиональная юридическая помощь в СПб: представительство в суде, составление документов, консультации. Опыт 15+ лет. Московский район.",
  keywords: [
    "юридическая помощь спб",
    "помощь адвоката цены",
    "представительство в суде",
    "составление документов",
    "консультация юриста",
    "адвокат московский район",
  ],
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <SEOHead
        title="Юридическая помощь | Адвокат Довбешко С.Ю."
        description="Профессиональная юридическая помощь адвоката Довбешко С.Ю. включает представительство в суде, консультации, подготовку документов и другие виды правовой поддержки."
        canonicalUrl="/services"
      />
      <ServiceStructuredData
        name="Юридическая помощь адвоката Довбешко С.Ю."
        description="Профессиональная юридическая помощь адвоката Довбешко С.Ю. включает представительство в суде, консультации, подготовку документов и другие виды правовой поддержки."
        url="https://example.com/services"
      />

      <AnimatedHeroBackground className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Юридическая помощь в СПб</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Профессиональная юридическая поддержка в различных областях права. Индивидуальный подход к каждому клиенту,
            опыт более 15 лет и нацеленность на результат.
          </p>
        </div>
      </AnimatedHeroBackground>

      <div className="container mx-auto px-4 py-12">
        <LegalServicesShowcase />
      </div>
    </main>
  )
}
