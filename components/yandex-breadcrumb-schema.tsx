"use client"

import { StructuredData } from "@/components/structured-data"

interface BreadcrumbItem {
  name: string
  item: string
}

interface YandexBreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function YandexBreadcrumbSchema({ items }: YandexBreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://advokat-dovbeshko.ru${item.item}`,
    })),
  }

  return <StructuredData data={breadcrumbSchema} />
}
