import { ImageResponse } from "next/og"
import { ogImageFactory } from "@/lib/og-image-factory"

export const runtime = "edge"
export const alt = "Юридические услуги | Адвокат Довбешко С.Ю."
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    ogImageFactory({
      title: "Юридические услуги",
      subtitle: "Адвокат Довбешко С.Ю.",
      description: "Профессиональные юридические услуги: подготовка документов, представительство в суде, консультации",
    }),
    {
      ...size,
    },
  )
}
