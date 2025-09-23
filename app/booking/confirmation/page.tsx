import ConfirmationClientPage from "./ConfirmationClientPage"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Запись подтверждена | Адвокат Довбешко С.Ю.",
  description:
    "Ваша запись на юридическую консультацию успешно создана. Адвокат Довбешко С.Ю. свяжется с вами в ближайшее время.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ConfirmationPage() {
  return <ConfirmationClientPage />
}
