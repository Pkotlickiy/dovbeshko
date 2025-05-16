interface ServiceStructuredDataProps {
  name: string
  description: string
  url: string
  provider?: {
    name: string
    url: string
  }
  areaServed?: string
}

export const ServiceStructuredData = ({ name, description, url, provider, areaServed }: ServiceStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: provider
      ? {
          "@type": "Organization",
          name: provider.name,
          url: provider.url,
        }
      : undefined,
    areaServed: areaServed || "Москва и Московская область",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
