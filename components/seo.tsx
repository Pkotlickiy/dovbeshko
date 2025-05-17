import Head from "next/head"
import { siteConfig } from "@/lib/seo"

interface SeoProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
}

export function Seo({
  title,
  description = siteConfig.description,
  canonical,
  ogImage = siteConfig.ogImage,
  noIndex = false,
}: SeoProps) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`${siteConfig.url}${canonical}`} />}

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical ? `${siteConfig.url}${canonical}` : siteConfig.url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* No index if specified */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Head>
  )
}
