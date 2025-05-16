import { createOgImage } from "../lib/opengraph-utils"
import { siteConfig } from "../lib/seo"

export const runtime = "edge"
export const alt = siteConfig.name
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return createOgImage({
    title: siteConfig.name,
    description: siteConfig.description,
  })
}
