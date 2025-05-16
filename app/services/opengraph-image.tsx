import { ImageResponse } from "next/og"
import { ogImageFactory } from "@/lib/og-image-factory"

export const runtime = "edge"
export const alt = "Юридическая помощь | Адвокат Довбешко С.Ю."
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    ogImageFactory({
      title: "Юридическая помощь",
      subtitle: "Адвокат Довбешко С.Ю.",
      description: "Профессиональная юридическая помощь: подготовка документов, представительство в суде, консультации",
    }),
    {
      ...size,
    },
  )
}
