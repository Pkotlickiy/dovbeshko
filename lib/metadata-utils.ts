import type { Metadata } from "next"
import { siteConfig } from "./seo"

// Базовые метаданные для всех страниц
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Функция для создания метаданных страницы
export function createMetadata({
  title,
  description,
  keywords = [],
}: {
  title: string
  description?: string
  keywords?: string[]
}): Metadata {
  return {
    ...baseMetadata,
    title,
    description: description || baseMetadata.description,
    keywords: [...(baseMetadata.keywords as string[]), ...keywords],
    openGraph: {
      ...baseMetadata.openGraph,
      title,
      description: description || (baseMetadata.openGraph?.description as string),
    },
  }
}
