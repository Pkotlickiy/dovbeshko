import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/", "/booking/confirmation/"],
    },
    sitemap: "https://advokat-dovbeshko.ru/sitemap.xml",
    host: "https://advokat-dovbeshko.ru",
  }
}
