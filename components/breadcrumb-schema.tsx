import { siteConfig } from "@/lib/seo"

export interface BreadcrumbItem {
  label: string
  href: string
}

export interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
