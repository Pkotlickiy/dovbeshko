import Script from "next/script"

interface ServiceStructuredDataProps {
  name: string
  description: string
  url: string
}

export function ServiceStructuredData({ name, description, url }: ServiceStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LegalService",
      name: "Адвокат Довбешко С.Ю.",
      image: "https://lawyer-website.vercel.app/confident-female-lawyer.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Московский пр-кт. 143",
        addressLocality: "Санкт-Петербург",
        postalCode: "196084",
        addressCountry: "RU",
      },
      telephone: "+79310070752",
      email: "S0070752@mail.ru",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 59.891605,
        longitude: 30.318705,
      },
      geoRadius: "50000",
    },
    serviceType: "Юридическая помощь",
    termsOfService: "https://lawyer-website.vercel.app/privacy",
  }

  return (
    <Script
      id="service-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
