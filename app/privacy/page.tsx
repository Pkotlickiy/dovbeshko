import type { Metadata } from "next"
import PrivacyClientPage from "./PrivacyClientPage"

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Адвокат Довбешко С.Ю.",
  description:
    "Политика конфиденциальности адвоката Довбешко С.Ю. Информация об обработке персональных данных и адвокатской тайне.",
  alternates: {
    canonical: "/privacy",
  },
  keywords: [
    "политика конфиденциальности",
    "адвокатская тайна",
    "защита персональных данных",
    "конфиденциальность адвоката",
    "обработка персональных данных",
    "юридическая конфиденциальность",
  ],
}

export default function PrivacyPolicy() {
  return <PrivacyClientPage />
}
