"use client"

import Script from "next/script"

interface StructuredDataProps {
  data: any
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id={`structured-data-${Math.random().toString(36).substring(2, 9)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
