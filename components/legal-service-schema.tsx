import { siteConfig } from "@/lib/seo"

export interface LegalServiceSchemaProps {
  name: string
  description: string
  url: string
  serviceArea?: string
  serviceType: string
  provider?: {
    name: string
    image?: string
    url?: string
    telephone?: string
    email?: string
    address?: {
      streetAddress: string
      addressLocality: string
      postalCode: string
      addressRegion?: string
      addressCountry: string
    }
  }
  offers?: {
    price?: string
    priceCurrency?: string
    availability?: string
    validFrom?: string
    priceValidUntil?: string
  }
  areaServed?: string
  audience?: string
  hasOfferCatalog?: boolean
  serviceOutput?: string
  termsOfService?: string
  award?: string
}

export const LegalServiceSchema = ({
  name,
  description,
  url,
  serviceArea = "Санкт-Петербург и Ленинградская область",
  serviceType,
  provider = {
    name: "Адвокат Довбешко Светлана Юрьевна",
    image: `${siteConfig.url}/confident-female-lawyer.png`,
    url: siteConfig.url,
    telephone: "+79310070752",
    email: "S0070752@mail.ru",
    address: {
      streetAddress: "Московский пр-кт. 143",
      addressLocality: "Санкт-Петербург",
      postalCode: "196105",
      addressCountry: "RU",
    },
  },
  offers,
  areaServed = "Санкт-Петербург и Ленинградская область",
  audience = "Физические и юридические лица",
  hasOfferCatalog = true,
  serviceOutput,
  termsOfService,
  award,
}: LegalServiceSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name,
    description,
    url: `${siteConfig.url}${url}`,
    serviceType,
    provider: {
      "@type": "Attorney",
      ...provider,
      address: {
        "@type": "PostalAddress",
        ...provider.address,
      },
      image: provider.image,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 59.88969,
        longitude: 30.32128,
      },
      geoRadius: "50000",
      name: areaServed,
    },
    audience: {
      "@type": "Audience",
      audienceType: audience,
    },
    ...(offers && {
      offers: {
        "@type": "Offer",
        price: offers.price || "По договоренности",
        priceCurrency: offers.priceCurrency || "RUB",
        availability: offers.availability || "https://schema.org/InStock",
        validFrom: offers.validFrom || new Date().toISOString().split("T")[0],
        priceValidUntil: offers.priceValidUntil,
      },
    }),
    ...(hasOfferCatalog && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Юридические услуги",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
            },
          },
        ],
      },
    }),
    ...(serviceOutput && {
      serviceOutput: {
        "@type": "Thing",
        name: serviceOutput,
      },
    }),
    ...(termsOfService && { termsOfService }),
    ...(award && { award }),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
