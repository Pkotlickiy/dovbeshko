import { ImageResponse } from "next/og"

export type OgImageProps = {
  title: string
  subtitle: string
  description: string
}

// Переименовываем функцию в OgImageFactory и экспортируем её
export async function OgImageFactory({ title, subtitle, description }: OgImageProps) {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#741717",
        padding: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "white",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: 30,
            color: "white",
            opacity: 0.9,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          {subtitle}
        </p>

        <p
          style={{
            fontSize: 24,
            color: "white",
            opacity: 0.8,
            marginBottom: 0,
            textAlign: "center",
          }}
        >
          {description}
        </p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}

// Для обратной совместимости экспортируем также и старое имя функции
export const ogImageFactory = OgImageFactory
