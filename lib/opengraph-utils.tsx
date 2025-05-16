import { ImageResponse } from "next/og"
import { siteConfig } from "./seo"

// Общие стили для OpenGraph изображений
export const ogStyles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom right, #741717, #8B0000)",
    color: "white",
    padding: "40px",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
    opacity: 0.9,
  },
  footer: {
    fontSize: 24,
    opacity: 0.7,
    marginTop: 20,
  },
}

// Функция для создания OpenGraph изображения
export async function createOgImage({
  title,
  description,
  siteName = siteConfig.name,
}: {
  title: string
  description?: string
  siteName?: string
}) {
  return new ImageResponse(
    <div style={ogStyles.container as any}>
      <div style={ogStyles.title as any}>{title}</div>
      {description && <div style={ogStyles.description as any}>{description}</div>}
      <div style={ogStyles.footer as any}>{siteName}</div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
