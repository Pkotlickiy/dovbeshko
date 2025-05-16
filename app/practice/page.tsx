import type { Metadata } from "next"
import { PracticeAreasShowcase } from "@/components/practice-areas-showcase"
import { SEOHead } from "@/components/seo-head"
import { ServiceStructuredData } from "@/components/service-structured-data"

export const metadata: Metadata = {
  title: "Области практики | Адвокат Довбешко С.Ю.",
  description:
    "Специализации адвоката Довбешко С.Ю. включают уголовное право, военное право, недвижимость, земельное право, защиту прав потребителей и другие области юридической практики.",
}

export default function PracticePage() {
  return (
    <main className="min-h-screen">
      <SEOHead
        title="Области практики | Адвокат Довбешко С.Ю."
        description="Специализации адвоката Довбешко С.Ю. включают уголовное право, военное право, недвижимость, земельное право, защиту прав потребителей и другие области юридической практики."
        canonicalUrl="/practice"
      />
      <ServiceStructuredData
        name="Области практики адвоката Довбешко С.Ю."
        description="Специализации адвоката Довбешко С.Ю. включают уголовное право, военное право, недвижимость, земельное право, защиту прав потребителей и другие области юридической практики."
        url="https://example.com/practice"
      />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold text-center mb-8 text-[#741717]">Области практики</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-12">
          Адвокат Довбешко С.Ю. специализируется на различных областях права, предоставляя квалифицированную юридическую
          помощь физическим и юридическим лицам.
        </p>
      </div>

      <PracticeAreasShowcase />
    </main>
  )
}
