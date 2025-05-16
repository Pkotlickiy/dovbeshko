import type { Metadata } from "next"
import { Contact } from "@/components/contact"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Контакты | Адвокат Довбешко С.Ю.",
  description:
    "Свяжитесь с адвокатом Довбешко С.Ю. для получения юридической консультации. Адрес, телефон и форма обратной связи.",
  keywords: [
    "адвокат контакты",
    "юрист контакты",
    "Санкт-Петербург",
    "юридическая консультация",
    "записаться к адвокату",
  ],
}

// Схема для страницы контактов
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Контакты адвоката Довбешко С.Ю.",
  description: "Контактная информация и форма связи с адвокатом Довбешко С.Ю.",
  mainEntity: {
    "@type": "Attorney",
    name: "Довбешко Светлана Юрьевна",
    description: "Адвокат в Санкт-Петербурге",
    telephone: "+79310070752",
    email: "S0070752@mail.ru",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Московский проспект 143",
      addressLocality: "Санкт-Петербург",
      postalCode: "196084",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "59.891605",
      longitude: "30.318705",
    },
    openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00 Sa 10:00-15:00",
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
