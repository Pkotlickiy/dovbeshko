"use client"
import { getBreadcrumbSchema, getLocalBusinessSchema, getAttorneySchema, getFaqSchema } from "@/lib/seo"
import Script from "next/script"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  breadcrumbs?: { name: string; item: string }[]
  includeFaq?: boolean
  includeAttorney?: boolean
  includeLocalBusiness?: boolean
}

export function SEOHead({
  title,
  description,
  keywords,
  ogImage,
  breadcrumbs,
  includeFaq = false,
  includeAttorney = false,
  includeLocalBusiness = false,
}: SEOHeadProps) {
  // Схемы для структурированных данных
  const breadcrumbsSchema = breadcrumbs ? getBreadcrumbSchema(breadcrumbs) : null
  const faqSchema = includeFaq ? getFaqSchema() : null
  const attorneySchema = includeAttorney ? getAttorneySchema() : null
  const localBusinessSchema = includeLocalBusiness ? getLocalBusinessSchema() : null

  return (
    <>
      {breadcrumbsSchema && (
        <Script
          id="breadcrumbs-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
        />
      )}

      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {attorneySchema && (
        <Script
          id="attorney-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(attorneySchema) }}
        />
      )}

      {localBusinessSchema && (
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}
    </>
  )
}
