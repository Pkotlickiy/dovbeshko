import { createOgImage } from "../../lib/opengraph-utils"

export const runtime = "edge"
export const alt = "Практики адвоката"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return createOgImage({
    title: "Практики адвоката",
    description: "Специализации и направления юридической практики",
  })
}
