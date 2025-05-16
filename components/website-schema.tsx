import { siteConfig } from "@/lib/seo"

export function WebsiteSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/confident-female-lawyer.png`,
            width: 600,
            height: 60,
          },
        },
        inLanguage: "ru-RU",
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/confident-female-lawyer.png`,
          width: 600,
          height: 400,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Московский пр-кт. 143",
          addressLocality: "Санкт-Петербург",
          postalCode: "196084",
          addressCountry: "RU",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+79310070752",
          contactType: "customer service",
          email: "S0070752@mail.ru",
          availableLanguage: "Russian",
        },
        sameAs: ["https://vk.com/yourprofile", "https://www.instagram.com/yourprofile"],
      },
      {
        "@type": "Attorney",
        "@id": `${siteConfig.url}/#attorney`,
        name: "Довбешко Светлана Юрьевна",
        url: siteConfig.url,
        image: `${siteConfig.url}/confident-female-lawyer.png`,
        description: "Адвокат по гражданским, уголовным и административным делам в Санкт-Петербурге",
        telephone: "+79310070752",
        email: "S0070752@mail.ru",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Московский пр-кт. 143",
          addressLocality: "Санкт-Петербург",
          postalCode: "196084",
          addressCountry: "RU",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 59.891605,
          longitude: 30.318705,
        },
        priceRange: "От 2000 ₽",
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 59.939095,
            longitude: 30.315868,
          },
          geoRadius: "50000",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Юридические услуги",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Консультации по юридическим вопросам",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Представительство в суде",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Составление юридических документов",
              },
            },
          ],
        },
        sameAs: ["https://vk.com/yourprofile", "https://www.instagram.com/yourprofile"],
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
