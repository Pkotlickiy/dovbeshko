import type { Metadata } from "next"
import { Contact } from "@/components/contact"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StructuredData } from "@/components/structured-data"

// Обновить метаданные для страницы "Контакты"
export const metadata: Metadata = {
  title: "Контакты адвоката в СПб | Московский район | Запись на консультацию",
  description:
    "Адвокат Довбешко С.Ю. в Московском районе СПб. Адрес: 196105, Санкт-Петербург, Московский пр-кт. 143 (м. Электросила). Тел: +7 (931) 007-07-52. Запись онлайн 24/7.",
  keywords: [
    "адвокат спб контакты",
    "юридическая консультация спб",
    "записаться на консультацию к юристу",
    "адвокат московский район спб",
    "бесплатная консультация юриста спб",
  ],
}

// Схема для страницы контактов
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Контакты адвоката Довбешко С.Ю. в Санкт-Петербурге",
  description: "Контактная информация и форма связи с адвокатом Довбешко С.Ю. в Московском районе СПб",
  mainEntity: {
    "@type": "Attorney",
    name: "Довбешко Светлана Юрьевна",
    description: "Адвокат в Санкт-Петербурге, Московский район",
    telephone: "+79310070752",
    email: "S0070752@mail.ru",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Московский проспект 143",
      addressLocality: "Санкт-Петербург",
      postalCode: "196105",
      addressCountry: "RU",
      addressRegion: "Московский район",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "59.891605",
      longitude: "30.318705",
    },
    openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00 Sa 10:00-15:00",
    url: "https://example.com/contacts",
    priceRange: "От 2000 ₽",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "59.891605",
        longitude: "30.318705",
      },
      geoRadius: "50000",
    },
  },
}

export default function ContactsPage() {
  return (
    <>
      <StructuredData data={contactPageSchema} />

      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Контакты", href: "/contacts" },
            ]}
          />

          <Contact />
        </div>
      </div>
    </>
  )
}
