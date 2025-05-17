import Head from "next/head"

interface SeoHeadProps {
  title: string
  description: string
  canonicalUrl: string
  keywords?: string[]
}

export function SeoHead({ title, description, canonicalUrl, keywords = [] }: SeoHeadProps) {
  const fullCanonicalUrl = `https://advokat-dovbeshko.ru${canonicalUrl}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="Адвокат Довбешко С.Ю." />
    </Head>
  )
}
