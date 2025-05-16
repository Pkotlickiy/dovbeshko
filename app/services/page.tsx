import type { Metadata } from "next"
import { LegalServicesShowcase } from "@/components/legal-services-showcase"
import { SEOHead } from "@/components/seo-head"
import { ServiceStructuredData } from "@/components/service-structured-data"

export const metadata: Metadata = {
  title: "Юридические услуги | Адвокат Довбешко Светлана Юрьевна",
  description:
    "Профессиональные юридические услуги адвоката Довбешко Светланы Юрьевны в Санкт-Петербурге: подготовка документов, представительство в суде, консультации и другие услуги",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <SEOHead
        title="Юридические услуги | Адвокат Довбешко С.Ю."
        description="Профессиональные юридические услуги адвоката Довбешко Светланы Юрьевны в Санкт-Петербурге: подготовка документов, представительство в суде, консультации и другие услуги"
        canonicalUrl="/services"
      />
      <ServiceStructuredData
        name="Юридические услуги адвоката Довбешко С.Ю."
        description="Профессиональные юридические услуги адвоката Довбешко Светланы Юрьевны в Санкт-Петербурге"
        url="https://example.com/services"
      />
      <LegalServicesShowcase />
    </main>
  )
}
