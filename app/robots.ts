import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/seo-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/", "*/confirmation", "*.js", "*.css"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/private/", "/admin/", "*/confirmation"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/private/", "/admin/", "*/confirmation"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
