import { ogImageFactory } from "@/lib/og-image-factory"

export const alt = "Контакты адвоката Довбешко С.Ю."
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return ogImageFactory({
    title: "Контакты",
    subtitle: "Адвокат Довбешко С.Ю.",
    description: "Свяжитесь со мной для получения юридической консультации",
  })
}
